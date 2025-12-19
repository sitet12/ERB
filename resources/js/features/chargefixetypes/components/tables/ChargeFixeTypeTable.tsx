import type { Paginated } from '@/types';
import type { ChargeFixeType } from '@/features/chargefixetypes/types/';
import { DataTable, formatDateTime, type DataTableColumn } from '@/features/partager/data-table';
import { ActionButtons } from '@/features/partager/buttons/action-buttons';
import { useListData } from '@/features/partager/hooks';
import { destroy } from '@/routes/charge-fixe-types';

interface ChargeFixeTypeTableProps {
    chargeFixeTypes: Paginated<ChargeFixeType>;
    onView?: (chargeFixeType: ChargeFixeType) => void;
    onEdit?: (chargeFixeType: ChargeFixeType) => void;
}

export function ChargeFixeTypeTable({
    chargeFixeTypes,
    onView,
    onEdit,
}: ChargeFixeTypeTableProps) {
    const data = useListData(chargeFixeTypes);

    const columns: DataTableColumn<ChargeFixeType>[] = [
        {
            key: 'id',
            label: 'ID',
            render: (item) => (
                <span className="font-mono text-sm text-muted-foreground">
                    #{item.id}
                </span>
            ),
        },
        {
            key: 'nom',
            label: 'Nom',
            render: (item) => <span className="font-medium">{item.nom}</span>,
        },
        {
            key: 'created_at',
            label: 'Créé le',
            render: (item) => (
                <span className="text-sm text-muted-foreground">
                    {formatDateTime(item.created_at, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    }, 'fr-FR')}
                </span>
            ),
        },
        {
            key: 'actions',
            label: 'Actions',
            className: 'text-right',
            render: (item) => (
                <ActionButtons
                    onView={onView ? () => onView(item) : undefined}
                    onEdit={onEdit ? () => onEdit(item) : undefined}
                    onDelete={destroy.url({ charge_fixe_type: item.id })}
                    deleteItemName={item.nom}
                />
            ),
        },
    ];

    return (
        <DataTable
            data={data}
            columns={columns}
            emptyMessage="Aucun type de charge fixe trouvé"
            emptyDescription="Créez votre premier type de charge fixe pour commencer"
        />
    );
}

