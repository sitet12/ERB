import type { Paginated } from '@/types';
import type { ChargeVariableType } from '@/features/chargevariabletypes/types/';
import { DataTable, formatDateTime, type DataTableColumn } from '@/features/partager/data-table';
import { ActionButtons } from '@/features/partager/buttons/action-buttons';
import { useListData } from '@/features/partager/hooks';
import { destroy } from '@/routes/charge-variable-types';

interface ChargeVariableTypeTableProps {
    chargeVariableTypes: Paginated<ChargeVariableType>;
    onView?: (chargeVariableType: ChargeVariableType) => void;
    onEdit?: (chargeVariableType: ChargeVariableType) => void;
}

export function ChargeVariableTypeTable({
    chargeVariableTypes,
    onView,
    onEdit,
}: ChargeVariableTypeTableProps) {
    const data = useListData(chargeVariableTypes);

    const columns: DataTableColumn<ChargeVariableType>[] = [
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
                    onDelete={destroy.url({ charge_variable_type: item.id })}
                    deleteItemName={item.nom}
                />
            ),
        },
    ];

    return (
        <DataTable
            data={data}
            columns={columns}
            emptyMessage="Aucun type de charge variable trouvé"
            emptyDescription="Créez votre premier type de charge variable pour commencer"
        />
    );
}

