import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Box } from 'lucide-react';
import { ChargeFixeTypeTable } from '@/features/chargefixetypes/components/tables/ChargeFixeTypeTable';
import { ChargeFixeTypeForm } from '@/features/chargefixetypes/components/forms/ChargeFixeTypeForm';
import { CrudModal } from '@/features/partager/modals/crud-modal';
import { Pagination } from '@/features/partager/paginations/Pagination';
import { useChargeFixeType } from '@/features/chargefixetypes/hooks';
import { SimpleLayout } from '@/features/partager/layouts/simplelayout';
import { adminBreadcrumbs } from '@/features/partager/lib/adminBreadcrumbs';
import type { ChargeFixeType } from '@/features/chargefixetypes/types/';
import type { Paginated } from '@/types';

interface Props {
    chargeFixeTypes: Paginated<ChargeFixeType>;
}

export default function ChargeFixeTypesIndex({ chargeFixeTypes }: Props) {
    const { open, mode, current, handleCreate, handleEdit, handleView, handleClose } = useChargeFixeType();

    return (
        <AppLayout breadcrumbs={adminBreadcrumbs.chargeFixeTypes.index()}>
            <Head title="Types de Charges Fixes" />

            <SimpleLayout
                title="Types de Charges Fixes"
                description="Gérez vos types de charges fixes"
                onCreateClick={handleCreate}
                createLabel="Créer un type"
                icon={<Box size={28} />}
                totalCount={chargeFixeTypes.total}
                footerLabel="types"
            >
                <ChargeFixeTypeTable
                    chargeFixeTypes={chargeFixeTypes}
                    onView={handleView}
                    onEdit={handleEdit}
                />
                {/* Pagination centrée */}
                {chargeFixeTypes.links && chargeFixeTypes.links.length > 3 && (
                    <div className="flex justify-center mt-6">
                        <Pagination links={chargeFixeTypes.links} />
                    </div>
                )}
            </SimpleLayout>

            {/* Modal Create/Edit/View */}
            <CrudModal
                open={open}
                onOpenChange={(isOpen) => {
                    if (!isOpen) {
                        handleClose();
                    }
                }}
                mode={mode}
                titleCreate="Créer un type de charge fixe"
                titleEdit="Modifier le type de charge fixe"
                titleView="Détails du type de charge fixe"
            >
                <ChargeFixeTypeForm
                    chargeFixeType={current ?? undefined}
                    onSuccess={handleClose}
                    readOnly={mode === 'view'}
                />
            </CrudModal>
        </AppLayout>
    );
}

