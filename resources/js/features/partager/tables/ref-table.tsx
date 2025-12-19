import { formatDateTime } from '@/features/partager/data-table';
import { type DataTableColumn } from '@/features/partager/data-table';

/**
 * Type minimal pour les tables de référentiel (id, name, dates).
 */
export type RefRow = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
};

/**
 * Colonnes partagées pour les tables de référentiel en lecture seule.
 * Utilisable pour PaymentModes, CashActions, etc.
 */
export const refColumns: DataTableColumn<RefRow>[] = [
    { key: 'id', label: 'ID', className: 'w-[80px] text-muted-foreground' },
    { key: 'name', label: 'Nom', className: 'font-medium' },
    {
        key: 'created_at',
        label: 'Créé le',
        className: 'text-muted-foreground whitespace-nowrap',
        render: (row: RefRow) => formatDateTime(row.created_at),
    },
    {
        key: 'updated_at',
        label: 'Modifié le',
        className: 'text-muted-foreground whitespace-nowrap',
        render: (row: RefRow) => formatDateTime(row.updated_at),
    },
];

