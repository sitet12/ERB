import { TrendingUp } from 'lucide-react';
import { BaseCard } from '@/features/partager/cards/base-card';
import type { ChargeVariable } from '@/features/chargesvariables/types/';
import { formatDateShort } from '@/features/partager/utils/date-formatters';

interface ChargeVariableCardProps {
    chargeVariable: ChargeVariable;
    onEdit?: () => void;
    onDelete?: (() => void) | string;
    deleteItemName?: string;
    onView?: () => void;
}

export function ChargeVariableCard({
    chargeVariable,
    onEdit,
    onDelete,
    deleteItemName,
    onView,
}: ChargeVariableCardProps) {
    const typeName = chargeVariable.charge_variable_type?.nom || 'Type inconnu';
    const totalFormate = chargeVariable.total_formate || `${chargeVariable.total} DH`;

    return (
        <BaseCard
            title={typeName}
            icon={TrendingUp}
            badge={{
                label: totalFormate,
                className: 'bg-gradient-to-r from-orange-500 to-red-600',
            }}
            createdAt={chargeVariable.created_at}
            updatedAt={chargeVariable.updated_at}
            onEdit={onEdit}
            onDelete={onDelete}
            deleteItemName={deleteItemName}
            onClick={onView}
        >
            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Prix unitaire:</span>
                    <span className="font-medium">
                        {chargeVariable.prix_unitaire_formate || `${chargeVariable.prix_unitaire} DH`}
                    </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Quantité:</span>
                    <span className="font-medium">
                        {chargeVariable.quantite}
                    </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">
                        {formatDateShort(chargeVariable.date)}
                    </span>
                </div>
            </div>
        </BaseCard>
    );
}

