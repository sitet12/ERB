import { User } from 'lucide-react';
import { BaseCard } from '@/features/partager/cards/base-card';
import type { Client } from '@/features/clients/types/';

interface ClientCardProps {
    client: Client;
    onEdit?: () => void;
    onDelete?: (() => void) | string;
    deleteItemName?: string;
    onView?: () => void;
}

export function ClientCard({
    client,
    onEdit,
    onDelete,
    deleteItemName,
    onView,
}: ClientCardProps) {
    const clientName = `${client.prenom} ${client.nom}`.trim();

    return (
        <BaseCard
            title={clientName}
            icon={User}
            badge={
                client.telephone
                    ? {
                          label: client.telephone,
                          className: 'bg-gradient-to-r from-blue-500 to-cyan-600',
                      }
                    : undefined
            }
            createdAt={client.created_at}
            updatedAt={client.updated_at}
            onEdit={onEdit}
            onDelete={onDelete}
            deleteItemName={deleteItemName}
            onClick={onView}
        >
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground min-w-[80px]">Nom:</span>
                    <span className="font-medium">
                        {client.nom}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground min-w-[80px]">Prénom:</span>
                    <span className="font-medium">
                        {client.prenom}
                    </span>
                </div>
                {client.telephone && (
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground min-w-[80px]">Téléphone:</span>
                        <span className="font-medium">
                            {client.telephone}
                        </span>
                    </div>
                )}
            </div>
        </BaseCard>
    );
}

