import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { TrendingUp } from 'lucide-react';
import { ChargeVariableTypeTable } from '@/features/chargevariabletypes/components/tables/ChargeVariableTypeTable';
import { ChargeVariableTypeForm } from '@/features/chargevariabletypes/components/forms/ChargeVariableTypeForm';
import { CrudModal } from '@/features/partager/modals/crud-modal';
import { Pagination } from '@/features/partager/paginations/Pagination';
import { useChargeVariableType } from '@/features/chargevariabletypes/hooks';
import { SimpleLayout } from '@/features/partager/layouts/simplelayout';
import { adminBreadcrumbs } from '@/features/partager/lib/adminBreadcrumbs';
import type { ChargeVariableType } from '@/features/chargevariabletypes/types/';
import type { Paginated } from '@/types';

interface Props {
    chargeVariableTypes: Paginated<ChargeVariableType>;
}

export default function ChargeVariableTypesIndex({ chargeVariableTypes }: Props) {
    const { open, mode, current, handleCreate, handleEdit, handleView, handleClose } = useChargeVariableType();

    return (
        <AppLayout breadcrumbs={adminBreadcrumbs.chargeVariableTypes.index()}>
            <Head title="Types de Charges Variables" />

            <SimpleLayout
                title="Types de Charges Variables"
                description="Gérez vos types de charges variables"
                onCreateClick={handleCreate}
                createLabel="Créer un type"
                icon={<TrendingUp size={28} />}
                totalCount={chargeVariableTypes.total}
                footerLabel="types"
            >
                <ChargeVariableTypeTable
                    chargeVariableTypes={chargeVariableTypes}
                    onView={handleView}
                    onEdit={handleEdit}
                />
                {/* Pagination centrée */}
                {chargeVariableTypes.links && chargeVariableTypes.links.length > 3 && (
                    <div className="flex justify-center mt-6">
                        <Pagination links={chargeVariableTypes.links} />
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
                titleCreate="Créer un type de charge variable"
                titleEdit="Modifier le type de charge variable"
                titleView="Détails du type de charge variable"
            >
                <ChargeVariableTypeForm
                    chargeVariableType={current ?? undefined}
                    onSuccess={handleClose}
                    readOnly={mode === 'view'}
                />
            </CrudModal>
        </AppLayout>
    );
}

