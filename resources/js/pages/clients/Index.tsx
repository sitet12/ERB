import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { User } from 'lucide-react';
import { ClientTable } from '@/features/clients/components/tables/ClientTable';
import { ClientCard } from '@/features/clients/components/cards/ClientCard';
import { ClientForm } from '@/features/clients/components/forms/ClientForm';
import { CrudModal } from '@/features/partager/modals/crud-modal';
import { Pagination } from '@/features/partager/paginations/Pagination';
import { useClient } from '@/features/clients/hooks';
import { useListData, useDateFilter, useSearchFilterInertia } from '@/features/partager/hooks';
import { MainLayout } from '@/features/partager/layouts/mainlayout';
import { adminBreadcrumbs } from '@/features/partager/lib/adminBreadcrumbs';
import { destroy } from '@/routes/clients';
import type { Client } from '@/features/clients/types/';
import type { Paginated } from '@/types';

interface Props {
    clients: Paginated<Client>;
}

type ViewMode = 'cards' | 'list';

export default function ClientsIndex({ clients }: Props) {
    const { open, mode, current, handleCreate, handleEdit, handleView, handleClose } = useClient();
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const { filterDate, onFilterDateChange, clearFilter } = useDateFilter({ routeUrl: '/clients' });
    const { searchQuery, onSearchChange } = useSearchFilterInertia({ 
        routeUrl: '/clients',
    });
    const clientsList = useListData(clients);

    return (
        <AppLayout breadcrumbs={adminBreadcrumbs.clients.index()}>
            <Head title="Clients" />

            <MainLayout
                header={{
                    title: "Clients",
                    description: "Gérez vos clients",
                    icon: <User size={28} />,
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
                    label: "Créer un client",
                }}
                filter={{
                    date: filterDate,
                    onDateChange: onFilterDateChange,
                    onClear: clearFilter,
                }}
                footer={{
                    totalCount: clients.total,
                    label: "clients",
                }}
            >
                {viewMode === 'list' ? (
                    <>
                        <ClientTable
                            clients={clients}
                            onView={handleView}
                            onEdit={handleEdit}
                        />
                        {/* Pagination centrée */}
                        {clients.links && clients.links.length > 3 && (
                            <div className="flex justify-center mt-6">
                                <Pagination links={clients.links} />
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {clientsList.map((client) => (
                                <ClientCard
                                    key={client.id}
                                    client={client}
                                    onView={() => handleView(client)}
                                    onEdit={() => handleEdit(client)}
                                    onDelete={destroy.url({ client: client.id })}
                                    deleteItemName={`${client.prenom} ${client.nom}`.trim()}
                                />
                            ))}
                        </div>
                        {/* Pagination centrée */}
                        {clients.links && clients.links.length > 3 && (
                            <div className="flex justify-center mt-6">
                                <Pagination links={clients.links} />
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
                titleCreate="Créer un client"
                titleEdit="Modifier le client"
                titleView="Détails du client"
            >
                <ClientForm
                    client={current ?? undefined}
                    onSuccess={handleClose}
                    readOnly={mode === 'view'}
                />
            </CrudModal>
        </AppLayout>
    );
}

