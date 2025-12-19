import type { Paginated } from '@/types';
import type { ChargeFixe } from '@/features/chargesfixes/types/';
import { DataTable, type DataTableColumn } from '@/features/partager/data-table';
import { ActionButtons } from '@/features/partager/buttons/action-buttons';
import { useListData } from '@/features/partager/hooks';
import { destroy } from '@/routes/charges-fixes';
import { formatDateShort } from '@/features/partager/utils/date-formatters';
import { createCreatedAtColumn } from '@/features/partager/tables/shared-columns';

interface ChargeFixeTableProps {
    chargeFixes: Paginated<ChargeFixe>;
    onView?: (chargeFixe: ChargeFixe) => void;
    onEdit?: (chargeFixe: ChargeFixe) => void;
}

export function ChargeFixeTable({
    chargeFixes,
    onView,
    onEdit,
}: ChargeFixeTableProps) {
    const data = useListData(chargeFixes);

    const columns: DataTableColumn<ChargeFixe>[] = [
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
            key: 'type',
            label: 'Type',
            render: (item) => (
                <span className="font-medium">
                    {item.charge_fixe_type?.nom || '-'}
                </span>
            ),
        },
        {
            key: 'montant',
            label: 'Montant',
            render: (item) => (
                <span className="font-medium">
                    {item.montant_formate || `${item.montant.toFixed(2)} DH`}
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
        createCreatedAtColumn<ChargeFixe>(),
        {
            key: 'actions',
            label: 'Actions',
            className: 'text-right',
            render: (item) => (
                <ActionButtons
                    onView={onView ? () => onView(item) : undefined}
                    onEdit={onEdit ? () => onEdit(item) : undefined}
                    onDelete={destroy.url({ charges_fix: item.id })}
                    deleteItemName={`${item.charge_fixe_type?.nom || 'Charge'} - ${item.montant_formate || item.montant} DH`}
                />
            ),
        },
    ];

    return (
        <DataTable
            data={data}
            columns={columns}
            emptyMessage="Aucune charge fixe trouvée"
            emptyDescription="Créez votre première charge fixe pour commencer"
        />
    );
}

