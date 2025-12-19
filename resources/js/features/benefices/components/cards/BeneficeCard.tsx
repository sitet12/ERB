import { TrendingUp, TrendingDown } from 'lucide-react';
import { BaseCard } from '@/features/partager/cards/base-card';
import type { Benefice } from '@/features/benefices/types/';
import { formatCurrency } from '@/features/partager/utils/currency-formatters';
import { formatDateLong } from '@/features/partager/utils/date-formatters';
import { isBeneficePositive, getBeneficeColorClass } from '@/features/benefices/utils/benefice-helpers';

interface BeneficeCardProps {
    benefice: Benefice;
    onView?: () => void;
}

export function BeneficeCard({
    benefice,
    onView,
}: BeneficeCardProps) {
    const isPositive = isBeneficePositive(benefice.benefice);
    const beneficeFormate = benefice.benefice_formate || formatCurrency(benefice.benefice);
    
    const badgeColor = isPositive
        ? 'bg-gradient-to-r from-green-500 to-emerald-600'
        : 'bg-gradient-to-r from-red-500 to-rose-600';

    const Icon = isPositive ? TrendingUp : TrendingDown;

    return (
        <BaseCard
            title={formatDateLong(benefice.date)}
            icon={Icon}
            badge={{
                label: beneficeFormate,
                className: badgeColor,
            }}
            createdAt={benefice.created_at}
            updatedAt={benefice.updated_at}
            onClick={onView}
        >
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground min-w-[100px]">Total Revenus:</span>
                    <span className="font-medium">
                        {formatCurrency(benefice.total_revenus)}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground min-w-[100px]">Total Charges:</span>
                    <span className="font-medium">
                        {formatCurrency(benefice.total_charges)}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground min-w-[100px]">Bénéfice:</span>
                    <span className={`font-bold ${getBeneficeColorClass(isPositive)}`}>
                        {beneficeFormate}
                    </span>
                </div>
            </div>
        </BaseCard>
    );
}

