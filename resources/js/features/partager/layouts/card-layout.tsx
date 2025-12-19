import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CardHeaderSlots = {
    topLeft?: ReactNode;
    topRight?: ReactNode;
    bottomLeft?: ReactNode;
    bottomRight?: ReactNode;
};

type CardShellProps = {
    children: ReactNode;
    className?: string;
};

type CardHeaderProps = CardHeaderSlots & {
    className?: string;
};

type CardBodyProps = {
    children: ReactNode;
    className?: string;
};

type CardFooterProps = {
    left?: ReactNode;
    right?: ReactNode;
    className?: string;
};

type CardDetailItemProps = {
    icon: ReactNode;
    label: string;
    value: ReactNode;
    className?: string;
    iconClassName?: string;
    valueClassName?: string;
};

export function CardShell({ children, className }: CardShellProps) {
    return (
        <div
            className={cn(
                'group relative bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full',
                className
            )}
        >
            {children}
        </div>
    );
}

export function CardHeader({
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
    className,
}: CardHeaderProps) {
    return (
        <div
            className={cn(
                'relative h-16 w-full overflow-hidden shrink-0 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700',
                className
            )}
        >
            {topLeft && <div className="absolute top-2 left-2 z-10">{topLeft}</div>}
            {topRight && <div className="absolute top-2 right-2 z-10">{topRight}</div>}
            {bottomLeft && <div className="absolute bottom-2 left-2 z-10">{bottomLeft}</div>}
            {bottomRight && <div className="absolute bottom-2 right-2 z-10">{bottomRight}</div>}
        </div>
    );
}

export function CardBody({ children, className }: CardBodyProps) {
    return <div className={cn('p-5 flex flex-col flex-1', className)}>{children}</div>;
}

export function CardFooter({ left, right, className }: CardFooterProps) {
    return (
        <div
            className={cn(
                'pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto',
                className
            )}
        >
            {left}
            {right}
        </div>
    );
}

export function CardDetailItem({
    icon,
    label,
    value,
    className,
    iconClassName,
    valueClassName,
}: CardDetailItemProps) {
    return (
        <div
            className={cn(
                'flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400 group/item',
                className
            )}
        >
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
                <span className={cn('font-medium text-slate-700 dark:text-slate-300', valueClassName)}>
                    {value}
                </span>
            </div>
        </div>
    );
}

