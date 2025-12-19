import type { Paginated } from '@/types';
import type { Benefice } from '@/features/benefices/types/';
import { DataTable, type DataTableColumn } from '@/features/partager/data-table';
import { ActionButtons } from '@/features/partager/buttons/action-buttons';
import { useListData } from '@/features/partager/hooks';
import { formatCurrency } from '@/features/partager/utils/currency-formatters';
import { formatDateShort } from '@/features/partager/utils/date-formatters';
import { createCreatedAtColumn } from '@/features/partager/tables/shared-columns';
import { isBeneficePositive, getBeneficeColorClass } from '@/features/benefices/utils/benefice-helpers';

interface BeneficeTableProps {
    benefices: Paginated<Benefice>;
    onView?: (benefice: Benefice) => void;
}

export function BeneficeTable({
    benefices,
    onView,
}: BeneficeTableProps) {
    const data = useListData(benefices);

    const columns: DataTableColumn<Benefice>[] = [
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
            key: 'date',
            label: 'Date',
            render: (item) => (
                <span className="font-medium">
                    {formatDateShort(item.date)}
                </span>
            ),
        },
        {
            key: 'total_revenus',
            label: 'Total Revenus',
            render: (item) => (
                <span className="text-sm text-muted-foreground">
                    {formatCurrency(item.total_revenus)}
                </span>
            ),
        },
        {
            key: 'total_charges',
            label: 'Total Charges',
            render: (item) => (
                <span className="text-sm text-muted-foreground">
                    {formatCurrency(item.total_charges)}
                </span>
            ),
        },
        {
            key: 'benefice',
            label: 'Bénéfice',
            render: (item) => {
                const isPositive = isBeneficePositive(item.benefice);
                const beneficeFormate = item.benefice_formate || formatCurrency(item.benefice);
                
                return (
                    <span className={`font-bold ${getBeneficeColorClass(isPositive)}`}>
                        {beneficeFormate}
                    </span>
                );
            },
        },
        createCreatedAtColumn<Benefice>(),
        {
            key: 'actions',
            label: 'Actions',
            className: 'text-right',
            render: (item) => (
                <ActionButtons
                    onView={onView ? () => onView(item) : undefined}
                    // Pas de edit/delete car read-only
                />
            ),
        },
    ];

    return (
        <DataTable
            data={data}
            columns={columns}
            emptyMessage="Aucun bénéfice trouvé"
            emptyDescription="Les bénéfices sont calculés automatiquement à partir des revenus et charges"
        />
    );
}

