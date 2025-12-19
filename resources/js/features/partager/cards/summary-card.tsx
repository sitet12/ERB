import { DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SummaryPeriod = 'jour' | 'semaine' | 'mois';

interface SummaryCardProps {
    period: SummaryPeriod;
    date: string;
    totalAmount: number;
    formattedAmount?: string;
    onClose?: () => void;
    className?: string;
}

export function SummaryCard({
    period,
    date,
    totalAmount,
    formattedAmount,
    onClose,
    className,
}: SummaryCardProps) {
    const periodLabels = {
        jour: 'Jour',
        semaine: 'Semaine',
        mois: 'Mois',
    };

    const periodIcons = {
        jour: Calendar,
        semaine: TrendingUp,
        mois: DollarSign,
    };

    const Icon = periodIcons[period];
    const displayAmount = formattedAmount || `${totalAmount.toFixed(2)} DH`;

    const formatDateLabel = () => {
        if (!date) return '';
        
        switch (period) {
            case 'jour':
                return new Date(date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                });
            case 'semaine':
                // For week input, format appropriately
                const weekDate = new Date(date);
                return `Semaine du ${weekDate.toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                })}`;
            case 'mois':
                return new Date(date + '-01').toLocaleDateString('fr-FR', {
                    month: 'long',
                    year: 'numeric',
                });
            default:
                return date;
        }
    };

    return (
        <div
            className={cn(
                'bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg p-6 text-white animate-in fade-in slide-in-from-top-4',
                className
            )}
        >
            <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-xl bg-slate-700 flex items-center justify-center border-2 border-slate-600 shadow-md">
                        <Icon size={32} className="text-slate-300" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-slate-700/50 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider border border-slate-600 text-slate-300">
                                {periodLabels[period].toUpperCase()}
                            </span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">{formatDateLabel()}</h2>
                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-300">
                            <span>Période sélectionnée</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 md:border-l md:border-slate-700 md:pl-6">
                    <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-600/50 min-w-[140px]">
                        <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-2">
                            <DollarSign size={14} /> Total
                        </div>
                        <div className="text-3xl font-mono font-bold text-white">
                            {displayAmount}
                        </div>
                    </div>
                    
                    {onClose && (
                        <div className="flex items-center">
                            <button
                                onClick={onClose}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl transition-colors duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl border border-red-500/30"
                                title="Effacer le filtre"
                            >
                                <span className="text-sm font-semibold">✕</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

