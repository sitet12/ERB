import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface EmptyStateProps {
    title?: string;
    description?: string;
    icon?: ReactNode;
    className?: string;
}

export function EmptyState({ title = 'Aucun élément', description, icon, className }: EmptyStateProps) {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center gap-2 py-8 text-center text-sm text-muted-foreground',
                className,
            )}
        >
            {icon && <div className="text-muted-foreground/80">{icon}</div>}
            <div className="font-medium text-foreground">{title}</div>
            {description && <div className="text-xs text-muted-foreground">{description}</div>}
        </div>
    );
}

