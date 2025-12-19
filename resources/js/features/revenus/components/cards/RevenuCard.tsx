import { DollarSign } from 'lucide-react';
import { BaseCard } from '@/features/partager/cards/base-card';
import type { Revenu } from '@/features/revenus/types/';
import { formatDateShort } from '@/features/partager/utils/date-formatters';
import { getStatutBadgeGradientClass } from '@/features/revenus/utils/statut-helpers';

interface RevenuCardProps {
    revenu: Revenu;
    onEdit?: () => void;
    onDelete?: (() => void) | string;
    deleteItemName?: string;
    onView?: () => void;
}

export function RevenuCard({
    revenu,
    onEdit,
    onDelete,
    deleteItemName,
    onView,
}: RevenuCardProps) {
    const clientName = revenu.client?.nom_complet || `${revenu.client?.prenom || ''} ${revenu.client?.nom || ''}`.trim() || 'Client inconnu';
    const montantFormate = revenu.montant_formate || `${revenu.montant} DH`;
    const statutNom = revenu.statut?.nom || 'N/A';
    const statutColor = getStatutBadgeGradientClass(revenu.statut?.badge_color);

    return (
        <BaseCard
            title={clientName}
            icon={DollarSign}
            badge={{
                label: montantFormate,
                className: statutColor,
            }}
            createdAt={revenu.created_at}
            updatedAt={revenu.updated_at}
            onEdit={onEdit}
            onDelete={onDelete}
            deleteItemName={deleteItemName}
            onClick={onView}
        >
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground min-w-[80px]">Statut:</span>
                    <span className="font-medium">
                        {statutNom}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground min-w-[80px]">Date:</span>
                    <span className="font-medium">
                        {formatDateShort(revenu.date)}
                    </span>
                </div>
                {revenu.note && (
                    <div className="flex items-start gap-2 text-sm">
                        <span className="text-muted-foreground min-w-[80px]">Note:</span>
                        <span className="font-medium line-clamp-2">
                            {revenu.note}
                        </span>
                    </div>
                )}
            </div>
        </BaseCard>
    );
}

