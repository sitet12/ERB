import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { DollarSign } from 'lucide-react';
import { RevenuTable } from '@/features/revenus/components/tables/RevenuTable';
import { RevenuCard } from '@/features/revenus/components/cards/RevenuCard';
import { RevenuForm } from '@/features/revenus/components/forms/RevenuForm';
import { CrudModal } from '@/features/partager/modals/crud-modal';
import { Pagination } from '@/features/partager/paginations/Pagination';
import { useRevenu } from '@/features/revenus/hooks';
import { useListData, useDateFilter, useSearchFilterInertia } from '@/features/partager/hooks';
import { MainLayout } from '@/features/partager/layouts/mainlayout';
import { adminBreadcrumbs } from '@/features/partager/lib/adminBreadcrumbs';
import { destroy } from '@/routes/revenus';
import type { Revenu, Client, Statut } from '@/features/revenus/types/';
import type { Paginated } from '@/types';

interface Props {
    revenus: Paginated<Revenu>;
    clients: Client[];
    statuts: Statut[];
}

type ViewMode = 'cards' | 'list';

export default function RevenusIndex({ revenus, clients, statuts }: Props) {
    const { open, mode, current, handleCreate, handleEdit, handleView, handleClose } = useRevenu();
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const { filterDate, onFilterDateChange, clearFilter } = useDateFilter({ routeUrl: '/revenus' });
    const { searchQuery, onSearchChange } = useSearchFilterInertia({ 
        routeUrl: '/revenus',
    });
    const revenusList = useListData(revenus);

    return (
        <AppLayout breadcrumbs={adminBreadcrumbs.revenus.index()}>
            <Head title="Revenus" />

            <MainLayout
                header={{
                    title: "Revenus",
                    description: "Gérez vos revenus",
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
                    label: "Créer un revenu",
                }}
                filter={{
                    date: filterDate,
                    onDateChange: onFilterDateChange,
                    onClear: clearFilter,
                }}
                footer={{
                    totalCount: revenus.total,
                    label: "revenus",
                }}
            >
                {viewMode === 'list' ? (
                    <>
                        <RevenuTable
                            revenus={revenus}
                            onView={handleView}
                            onEdit={handleEdit}
                        />
                        {/* Pagination centrée */}
                        {revenus.links && revenus.links.length > 3 && (
                            <div className="flex justify-center mt-6">
                                <Pagination links={revenus.links} />
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {revenusList.map((revenu) => (
                                <RevenuCard
                                    key={revenu.id}
                                    revenu={revenu}
                                    onView={() => handleView(revenu)}
                                    onEdit={() => handleEdit(revenu)}
                                    onDelete={destroy.url({ revenu: revenu.id })}
                                    deleteItemName={`Revenu de ${revenu.montant_formate || `${revenu.montant} DH`} - ${revenu.client?.nom_complet || 'Client'}`}
                                />
                            ))}
                        </div>
                        {/* Pagination centrée */}
                        {revenus.links && revenus.links.length > 3 && (
                            <div className="flex justify-center mt-6">
                                <Pagination links={revenus.links} />
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
                titleCreate="Créer un revenu"
                titleEdit="Modifier le revenu"
                titleView="Détails du revenu"
                contentClassName="sm:max-w-2xl"
            >
                <RevenuForm
                    revenu={current ?? undefined}
                    clients={clients}
                    statuts={statuts}
                    onSuccess={handleClose}
                    readOnly={mode === 'view'}
                />
            </CrudModal>
        </AppLayout>
    );
}

