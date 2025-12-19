import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type IconValueCellProps = {
    icon: ReactNode;
    label?: ReactNode;
    value: ReactNode;
    className?: string;
    iconClassName?: string;
    valueClassName?: string;
    fallback?: ReactNode;
};

/**
 * Small reusable cell for list rows (icon + label + value).
 * - If no label is provided, renders a single-line row (icon + value).
 * - If label is provided, renders the label on top and value below (like our detail rows).
 */
export function IconValueCell({
    icon,
    label,
    value,
    className,
    iconClassName,
    valueClassName,
    fallback,
}: IconValueCellProps) {
    if (fallback !== undefined && (value === null || value === undefined || value === '')) {
        return <>{fallback}</>;
    }

    if (!label) {
        return (
            <div className={cn('flex items-center gap-2 text-sm', className)}>
                <span className={cn('text-slate-400 dark:text-slate-500', iconClassName)}>{icon}</span>
                <span className={cn('font-medium text-slate-700 dark:text-slate-300', valueClassName)}>{value}</span>
            </div>
        );
    }

    return (
        <div className={cn('flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400 group/item', className)}>
            <div
                className={cn(
                    'mt-0.5 p-1.5 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover/item:text-blue-500 group-hover/item:bg-blue-50 dark:group-hover/item:bg-blue-900/20 transition-colors',
                    iconClassName
                )}
            >
                {icon}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider leading-none mb-0.5">
                    {label}
                </span>
                <span className={cn('font-medium text-slate-700 dark:text-slate-300', valueClassName)}>{value}</span>
            </div>
        </div>
    );
}

type DateCellProps = {
    value: string | null | undefined;
    formatter?: (v: string) => string;
    className?: string;
    emptyLabel?: string;
};

/**
 * Simple date cell with fallback.
 */
export function DateCell({
    value,
    formatter = (v) =>
        new Date(v).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    className,
    emptyLabel = 'N/A',
}: DateCellProps) {
    if (!value) return <span className={cn('text-sm text-slate-500 dark:text-slate-400', className)}>{emptyLabel}</span>;

    try {
        return <span className={cn('text-sm text-slate-500 dark:text-slate-400', className)}>{formatter(value)}</span>;
    } catch {
        return <span className={cn('text-sm text-slate-500 dark:text-slate-400', className)}>{emptyLabel}</span>;
    }
}

