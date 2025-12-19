import { Label } from '@/components/ui/label';
import type { Benefice } from '@/features/benefices/types/';
import { formatCurrency } from '@/features/partager/utils/currency-formatters';
import { formatDateShort, formatDateWithTime } from '@/features/partager/utils/date-formatters';
import { isBeneficePositive, getBeneficeColorClass } from '@/features/benefices/utils/benefice-helpers';

interface BeneficeViewProps {
    benefice: Benefice;
}

export function BeneficeView({ benefice }: BeneficeViewProps) {
    const isPositive = isBeneficePositive(benefice.benefice);
    const beneficeColor = getBeneficeColorClass(isPositive);

    return (
        <div className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="date" className="text-foreground">
                    Date
                </Label>
                <div className="text-foreground text-base font-medium bg-muted px-3 py-2 rounded-md border border-input">
                    {formatDateShort(benefice.date)}
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="total_revenus" className="text-foreground">
                    Total Revenus
                </Label>
                <div className="text-foreground text-base font-medium bg-muted px-3 py-2 rounded-md border border-input">
                    {formatCurrency(benefice.total_revenus)}
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="total_charges" className="text-foreground">
                    Total Charges
                </Label>
                <div className="text-foreground text-base font-medium bg-muted px-3 py-2 rounded-md border border-input">
                    {formatCurrency(benefice.total_charges)}
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="benefice" className="text-foreground">
                    Bénéfice
                </Label>
                <div className={`text-base font-bold px-3 py-2 rounded-md border border-input bg-muted ${beneficeColor}`}>
                    {benefice.benefice_formate || formatCurrency(benefice.benefice)}
                </div>
            </div>

            {benefice.created_at && (
                <div className="grid gap-2">
                    <Label htmlFor="created_at" className="text-foreground">
                        Créé le
                    </Label>
                    <div className="text-sm text-muted-foreground bg-muted px-3 py-2 rounded-md border border-input">
                        {formatDateWithTime(benefice.created_at)}
                    </div>
                </div>
            )}

            {benefice.updated_at && (
                <div className="grid gap-2">
                    <Label htmlFor="updated_at" className="text-foreground">
                        Modifié le
                    </Label>
                    <div className="text-sm text-muted-foreground bg-muted px-3 py-2 rounded-md border border-input">
                        {formatDateWithTime(benefice.updated_at)}
                    </div>
                </div>
            )}
        </div>
    );
}

