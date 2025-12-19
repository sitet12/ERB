// components/shared/TableActionButton.tsx
import { Link, type InertiaLinkProps } from '@inertiajs/react';
import { 
    PencilIcon, 
    TrashIcon, 
    Settings2Icon, 
    Eye, 
    Loader2,
    MoreVertical 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

type ActionType = 'view' | 'edit' | 'delete' | 'manage' | 'custom';

interface TableActionButtonProps {
    type: ActionType;
    onClick?: () => void;
    href?: NonNullable<InertiaLinkProps['href']>;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
}

const ACTION_CONFIG: Record<ActionType, {
    icon: React.ComponentType<{ className?: string }>;
    className: string;
}> = {
    view: {
        icon: Eye,
        className: 'text-primary hover:text-primary/80',
    },
    edit: {
        icon: PencilIcon,
        className: 'text-primary hover:text-primary/80',
    },
    delete: {
        icon: TrashIcon,
        className: 'text-destructive hover:text-destructive/80',
    },
    manage: {
        icon: Settings2Icon,
        className: 'text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300',
    },
    custom: {
        icon: MoreVertical,
        className: 'text-primary hover:text-primary/80',
    },
};

export function TableActionButton({
    type,
    onClick,
    href,
    label,
    icon,
    disabled = false,
    loading = false,
    className,
}: TableActionButtonProps) {
    const config = ACTION_CONFIG[type];
    const Icon = icon || config.icon;
    
    const buttonContent = (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled || loading}
            className={cn(
                'transition p-1 rounded-sm',
                config.className,
                (disabled || loading) && 'opacity-50 cursor-not-allowed',
                !disabled && !loading && 'hover:bg-muted/50',
                className
            )}
            aria-label={label}
        >
            {loading ? (
                <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
            ) : (
                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
            )}
        </button>
    );
    
    const content = href ? (
        <Link href={href} className="inline-flex">
            {buttonContent}
        </Link>
    ) : (
        buttonContent
    );
    
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {content}
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
                {label}
            </TooltipContent>
        </Tooltip>
    );
}

