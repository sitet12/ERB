import type { Paginated } from '@/types';
import type { Client } from '@/features/clients/types/';
import { DataTable, type DataTableColumn } from '@/features/partager/data-table';
import { ActionButtons } from '@/features/partager/buttons/action-buttons';
import { useListData } from '@/features/partager/hooks';
import { destroy } from '@/routes/clients';
import { createCreatedAtColumn } from '@/features/partager/tables/shared-columns';

interface ClientTableProps {
    clients: Paginated<Client>;
    onView?: (client: Client) => void;
    onEdit?: (client: Client) => void;
}

export function ClientTable({
    clients,
    onView,
    onEdit,
}: ClientTableProps) {
    const data = useListData(clients);

    const columns: DataTableColumn<Client>[] = [
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
            render: (item) => (
                <span className="text-sm text-muted-foreground">
                    {item.nom}
                </span>
            ),
        },
        {
            key: 'prenom',
            label: 'Prénom',
            render: (item) => (
                <span className="text-sm text-muted-foreground">
                    {item.prenom}
                </span>
            ),
        },
        {
            key: 'telephone',
            label: 'Téléphone',
            render: (item) => (
                <span className="text-sm text-muted-foreground">
                    {item.telephone || '-'}
                </span>
            ),
        },
        createCreatedAtColumn<Client>(),
        {
            key: 'actions',
            label: 'Actions',
            className: 'text-right',
            render: (item) => (
                <ActionButtons
                    onView={onView ? () => onView(item) : undefined}
                    onEdit={onEdit ? () => onEdit(item) : undefined}
                    onDelete={destroy.url({ client: item.id })}
                    deleteItemName={`${item.prenom} ${item.nom}`.trim()}
                />
            ),
        },
    ];

    return (
        <DataTable
            data={data}
            columns={columns}
            emptyMessage="Aucun client trouvé"
            emptyDescription="Créez votre premier client pour commencer"
        />
    );
}

