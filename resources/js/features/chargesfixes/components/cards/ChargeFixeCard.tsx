import { DollarSign } from 'lucide-react';
import { BaseCard } from '@/features/partager/cards/base-card';
import type { ChargeFixe } from '@/features/chargesfixes/types/';
import { formatDateShort } from '@/features/partager/utils/date-formatters';

interface ChargeFixeCardProps {
    chargeFixe: ChargeFixe;
    onEdit?: () => void;
    onDelete?: (() => void) | string;
    deleteItemName?: string;
    onView?: () => void;
}

export function ChargeFixeCard({
    chargeFixe,
    onEdit,
    onDelete,
    deleteItemName,
    onView,
}: ChargeFixeCardProps) {
    const typeName = chargeFixe.charge_fixe_type?.nom || 'Type inconnu';
    const montantFormate = chargeFixe.montant_formate || `${chargeFixe.montant} DH`;

    return (
        <BaseCard
            title={typeName}
            icon={DollarSign}
            badge={{
                label: montantFormate,
                className: 'bg-gradient-to-r from-green-500 to-emerald-600',
            }}
            createdAt={chargeFixe.created_at}
            updatedAt={chargeFixe.updated_at}
            onEdit={onEdit}
            onDelete={onDelete}
            deleteItemName={deleteItemName}
            onClick={onView}
        >
            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">
                        {formatDateShort(chargeFixe.date)}
                    </span>
                </div>
            </div>
        </BaseCard>
    );
}

