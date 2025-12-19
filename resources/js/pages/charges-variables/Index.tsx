import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { TrendingUp } from 'lucide-react';
import { ChargeVariableTable } from '@/features/chargesvariables/components/tables/ChargeVariableTable';
import { ChargeVariableCard } from '@/features/chargesvariables/components/cards/ChargeVariableCard';
import { ChargeVariableForm } from '@/features/chargesvariables/components/forms/ChargeVariableForm';
import { CrudModal } from '@/features/partager/modals/crud-modal';
import { Pagination } from '@/features/partager/paginations/Pagination';
import { useChargeVariable } from '@/features/chargesvariables/hooks';
import { useListData, useDateFilter, useSearchFilterInertia } from '@/features/partager/hooks';
import { MainLayout } from '@/features/partager/layouts/mainlayout';
import { adminBreadcrumbs } from '@/features/partager/lib/adminBreadcrumbs';
import { destroy } from '@/routes/charges-variables';
import type { ChargeVariable, ChargeVariableType } from '@/features/chargesvariables/types/';
import type { Paginated } from '@/types';

interface Props {
    chargeVariables: Paginated<ChargeVariable>;
    chargeVariableTypes: ChargeVariableType[];
}

type ViewMode = 'cards' | 'list';

export default function ChargesVariablesIndex({ chargeVariables, chargeVariableTypes }: Props) {
    const { open, mode, current, handleCreate, handleEdit, handleView, handleClose } = useChargeVariable();
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const { filterDate, onFilterDateChange, clearFilter } = useDateFilter({ routeUrl: '/charges-variables' });
    const { searchQuery, onSearchChange } = useSearchFilterInertia({ 
        routeUrl: '/charges-variables',
    });
    const chargeVariablesList = useListData(chargeVariables);

    return (
        <AppLayout breadcrumbs={adminBreadcrumbs.chargesVariables.index()}>
            <Head title="Charges Variables" />

            <MainLayout
                header={{
                    title: "Charges Variables",
                    description: "Gérez vos charges variables",
                    icon: <TrendingUp size={28} />,
                }}
                search={{
                    query: searchQuery,
                    onChange: onSearchChange,
                }}
                view={{
                    mode: viewMode,
                    onChange: setViewMode,
                }}
                create={{
                    onClick: handleCreate,
                    label: "Créer une charge variable",
                }}
                filter={{
                    date: filterDate,
                    onDateChange: onFilterDateChange,
                    onClear: clearFilter,
                }}
                footer={{
                    totalCount: chargeVariables.total,
                    label: "charges variables",
                }}
            >
                {viewMode === 'list' ? (
                    <>
                        <ChargeVariableTable
                            chargeVariables={chargeVariables}
                            onView={handleView}
                            onEdit={handleEdit}
                        />
                        {/* Pagination centrée */}
                        {chargeVariables.links && chargeVariables.links.length > 3 && (
                            <div className="flex justify-center mt-6">
                                <Pagination links={chargeVariables.links} />
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {chargeVariablesList.map((chargeVariable) => (
                                <ChargeVariableCard
                                    key={chargeVariable.id}
                                    chargeVariable={chargeVariable}
                                    onView={() => handleView(chargeVariable)}
                                    onEdit={() => handleEdit(chargeVariable)}
                                    onDelete={destroy.url({ charges_variable: chargeVariable.id })}
                                    deleteItemName={`${chargeVariable.charge_variable_type?.nom || 'Charge'} - ${chargeVariable.total_formate || `${chargeVariable.total} DH`}`}
                                />
                            ))}
                        </div>
                        {/* Pagination centrée */}
                        {chargeVariables.links && chargeVariables.links.length > 3 && (
                            <div className="flex justify-center mt-6">
                                <Pagination links={chargeVariables.links} />
                            </div>
                        )}
                    </>
                )}
            </MainLayout>

            {/* Modal Create/Edit/View */}
            <CrudModal
                open={open}
                onOpenChange={(isOpen) => {
                    if (!isOpen) {
                        handleClose();
                    }
                }}
                mode={mode}
                titleCreate="Créer une charge variable"
                titleEdit="Modifier la charge variable"
                titleView="Détails de la charge variable"
            >
                <ChargeVariableForm
                    chargeVariable={current ?? undefined}
                    chargeVariableTypes={chargeVariableTypes}
                    onSuccess={handleClose}
                    readOnly={mode === 'view'}
                />
            </CrudModal>
        </AppLayout>
    );
}

