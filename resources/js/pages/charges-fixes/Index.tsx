import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { DollarSign } from 'lucide-react';
import { ChargeFixeTable } from '@/features/chargesfixes/components/tables/ChargeFixeTable';
import { ChargeFixeCard } from '@/features/chargesfixes/components/cards/ChargeFixeCard';
import { ChargeFixeForm } from '@/features/chargesfixes/components/forms/ChargeFixeForm';
import { CrudModal } from '@/features/partager/modals/crud-modal';
import { Pagination } from '@/features/partager/paginations/Pagination';
import { useChargeFixe } from '@/features/chargesfixes/hooks';
import { useListData, useDateFilter, useSearchFilterInertia } from '@/features/partager/hooks';
import { MainLayout } from '@/features/partager/layouts/mainlayout';
import { adminBreadcrumbs } from '@/features/partager/lib/adminBreadcrumbs';
import { destroy } from '@/routes/charges-fixes';
import type { ChargeFixe, ChargeFixeType } from '@/features/chargesfixes/types/';
import type { Paginated } from '@/types';

interface Props {
    chargeFixes: Paginated<ChargeFixe>;
    chargeFixeTypes: ChargeFixeType[];
}

type ViewMode = 'cards' | 'list';

export default function ChargesFixesIndex({ chargeFixes, chargeFixeTypes }: Props) {
    const { open, mode, current, handleCreate, handleEdit, handleView, handleClose } = useChargeFixe();
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const { filterDate, onFilterDateChange, clearFilter } = useDateFilter({ routeUrl: '/charges-fixes' });
    const { searchQuery, onSearchChange } = useSearchFilterInertia({ 
        routeUrl: '/charges-fixes',
    });
    const chargeFixesList = useListData(chargeFixes);

    return (
        <AppLayout breadcrumbs={adminBreadcrumbs.chargesFixes.index()}>
            <Head title="Charges Fixes" />

            <MainLayout
                header={{
                    title: "Charges Fixes",
                    description: "Gérez vos charges fixes",
                    icon: <DollarSign size={28} />,
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
                    label: "Créer une charge fixe",
                }}
                filter={{
                    date: filterDate,
                    onDateChange: onFilterDateChange,
                    onClear: clearFilter,
                }}
                footer={{
                    totalCount: chargeFixes.total,
                    label: "charges fixes",
                }}
            >
                {viewMode === 'list' ? (
                    <>
                        <ChargeFixeTable
                            chargeFixes={chargeFixes}
                            onView={handleView}
                            onEdit={handleEdit}
                        />
                        {/* Pagination centrée */}
                        {chargeFixes.links && chargeFixes.links.length > 3 && (
                            <div className="flex justify-center mt-6">
                                <Pagination links={chargeFixes.links} />
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {chargeFixesList.map((chargeFixe) => (
                                <ChargeFixeCard
                                    key={chargeFixe.id}
                                    chargeFixe={chargeFixe}
                                    onView={() => handleView(chargeFixe)}
                                    onEdit={() => handleEdit(chargeFixe)}
                                    onDelete={destroy.url({ charges_fix: chargeFixe.id })}
                                    deleteItemName={`${chargeFixe.charge_fixe_type?.nom || 'Charge'} de ${chargeFixe.montant_formate || `${chargeFixe.montant} DH`}`}
                                />
                            ))}
                        </div>
                        {/* Pagination centrée */}
                        {chargeFixes.links && chargeFixes.links.length > 3 && (
                            <div className="flex justify-center mt-6">
                                <Pagination links={chargeFixes.links} />
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
                titleCreate="Créer une charge fixe"
                titleEdit="Modifier la charge fixe"
                titleView="Détails de la charge fixe"
            >
                <ChargeFixeForm
                    chargeFixe={current ?? undefined}
                    chargeFixeTypes={chargeFixeTypes}
                    onSuccess={handleClose}
                    readOnly={mode === 'view'}
                />
            </CrudModal>
        </AppLayout>
    );
}

