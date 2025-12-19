import type { Paginated } from '@/types';
import type { Revenu } from '@/features/revenus/types/';
import { DataTable, type DataTableColumn } from '@/features/partager/data-table';
import { ActionButtons } from '@/features/partager/buttons/action-buttons';
import { useListData } from '@/features/partager/hooks';
import { destroy } from '@/routes/revenus';
import { formatDateShort } from '@/features/partager/utils/date-formatters';
import { createCreatedAtColumn } from '@/features/partager/tables/shared-columns';
import { getStatutBadgeClass } from '@/features/revenus/utils/statut-helpers';

interface RevenuTableProps {
    revenus: Paginated<Revenu>;
    onView?: (revenu: Revenu) => void;
    onEdit?: (revenu: Revenu) => void;
}

export function RevenuTable({
    revenus,
    onView,
    onEdit,
}: RevenuTableProps) {
    const data = useListData(revenus);

    const columns: DataTableColumn<Revenu>[] = [
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
            key: 'client.nom_complet',
            label: 'Client',
            render: (item) => (
                <span className="font-medium">
                    {item.client?.nom_complet || `${item.client?.prenom || ''} ${item.client?.nom || ''}`.trim() || 'N/A'}
                </span>
            ),
        },
        {
            key: 'statut.nom',
            label: 'Statut',
            render: (item) => {
                const statutNom = item.statut?.nom || 'N/A';
                const statutColor = getStatutBadgeClass(item.statut?.badge_color);
                
                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statutColor}`}>
                        {statutNom}
                    </span>
                );
            },
        },
        {
            key: 'montant',
            label: 'Montant',
            render: (item) => (
                <span className="font-medium">
                    {item.montant_formate || `${item.montant} DH`}
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
        {
            key: 'note',
            label: 'Note',
            render: (item) => (
                <span className="text-sm text-muted-foreground line-clamp-1 max-w-[200px]">
                    {item.note || '-'}
                </span>
            ),
        },
        createCreatedAtColumn<Revenu>(),
        {
            key: 'actions',
            label: 'Actions',
            className: 'text-right',
            render: (item) => (
                <ActionButtons
                    onView={onView ? () => onView(item) : undefined}
                    onEdit={onEdit ? () => onEdit(item) : undefined}
                    onDelete={destroy.url({ revenu: item.id })}
                    deleteItemName={`Revenu de ${item.montant_formate || `${item.montant} DH`} - ${item.client?.nom_complet || 'Client'}`}
                />
            ),
        },
    ];

    return (
        <DataTable
            data={data}
            columns={columns}
            emptyMessage="Aucun revenu trouvé"
            emptyDescription="Créez votre premier revenu pour commencer"
        />
    );
}

