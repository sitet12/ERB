import type { Paginated } from '@/types';
import type { ChargeVariable } from '@/features/chargesvariables/types/';
import { DataTable, type DataTableColumn } from '@/features/partager/data-table';
import { ActionButtons } from '@/features/partager/buttons/action-buttons';
import { useListData } from '@/features/partager/hooks';
import { destroy } from '@/routes/charges-variables';
import { formatDateShort } from '@/features/partager/utils/date-formatters';
import { createCreatedAtColumn } from '@/features/partager/tables/shared-columns';

interface ChargeVariableTableProps {
    chargeVariables: Paginated<ChargeVariable>;
    onView?: (chargeVariable: ChargeVariable) => void;
    onEdit?: (chargeVariable: ChargeVariable) => void;
}

export function ChargeVariableTable({
    chargeVariables,
    onView,
    onEdit,
}: ChargeVariableTableProps) {
    const data = useListData(chargeVariables);

    const columns: DataTableColumn<ChargeVariable>[] = [
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
            key: 'charge_variable_type.nom',
            label: 'Type',
            render: (item) => (
                <span className="font-medium">
                    {item.charge_variable_type?.nom || 'N/A'}
                </span>
            ),
        },
        {
            key: 'prix_unitaire',
            label: 'Prix Unitaire',
            render: (item) => (
                <span className="text-sm text-muted-foreground">
                    {item.prix_unitaire_formate || `${item.prix_unitaire} DH`}
                </span>
            ),
        },
        {
            key: 'quantite',
            label: 'Quantité',
            render: (item) => (
                <span className="text-sm text-muted-foreground">
                    {item.quantite}
                </span>
            ),
        },
        {
            key: 'total',
            label: 'Total',
            render: (item) => (
                <span className="font-medium">
                    {item.total_formate || `${item.total} DH`}
                </span>
            ),
        },
        {
            key: 'date',
            label: 'Date',
            render: (item) => (
                <span className="text-sm text-muted-foreground">
                    {formatDateShort(item.date)}
                </span>
            ),
        },
        createCreatedAtColumn<ChargeVariable>(),
        {
            key: 'actions',
            label: 'Actions',
            className: 'text-right',
            render: (item) => (
                <ActionButtons
                    onView={onView ? () => onView(item) : undefined}
                    onEdit={onEdit ? () => onEdit(item) : undefined}
                    onDelete={destroy.url({ charges_variable: item.id })}
                    deleteItemName={`${item.charge_variable_type?.nom || 'Charge'} - ${item.total_formate || `${item.total} DH`}`}
                />
            ),
        },
    ];

    return (
        <DataTable
            data={data}
            columns={columns}
            emptyMessage="Aucune charge variable trouvée"
            emptyDescription="Créez votre première charge variable pour commencer"
        />
    );
}

