// components/shared/CreateButton.tsx
import { Link, type InertiaLinkProps } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CreateButtonBaseProps {
    label?: string;
    variant?: 'icon' | 'text' | 'full';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    disabled?: boolean;
    'aria-label'?: string;
}

interface CreateButtonWithHref extends CreateButtonBaseProps {
    href: NonNullable<InertiaLinkProps['href']>;
    onClick?: never;
}

interface CreateButtonWithOnClick extends CreateButtonBaseProps {
    onClick: () => void;
    href?: never;
}

type CreateButtonProps = CreateButtonWithHref | CreateButtonWithOnClick;

/**
 * Composant CreateButton générique pour les boutons de création
 * Supporte les variants icon-only, text, et full
 * Utilise Inertia Link pour la navigation ou onClick pour les modals
 * 
 * @example
 * ```tsx
 * // Icon-only button (PageHeader)
 * <CreateButton
 *   href={create.url()}
 *   variant="icon"
 *   aria-label="Créer une catégorie"
 * />
 * 
 * // Text button (EmptyState)
 * <CreateButton
 *   href={create.url()}
 *   variant="text"
 *   label="Créer une catégorie"
 * />
 * 
 * // Full button with onClick (Modal)
 * <CreateButton
 *   onClick={handleOpenCreateModal}
 *   variant="full"
 *   label="Créer une catégorie"
 * />
 * ```
 */
export function CreateButton({
    href,
    onClick,
    label = 'Créer',
    variant = 'icon',
    size = 'md',
    className,
    disabled = false,
    'aria-label': ariaLabel,
}: CreateButtonProps) {
    const sizeClasses = {
        sm: variant === 'icon' ? 'w-8 h-8' : 'px-3 py-1.5 text-sm',
        md: variant === 'icon' ? 'w-10 h-10' : 'px-4 py-2',
        lg: variant === 'icon' ? 'w-12 h-12' : 'px-6 py-3 text-lg',
    };

    const iconSizeClasses = {
        sm: 'w-3.5 h-3.5',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
    };

    const baseClasses = cn(
        'inline-flex items-center justify-center',
        'bg-primary text-primary-foreground rounded-md',
        'hover:opacity-90 transition shadow-elegant',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size],
        variant !== 'icon' && 'gap-2',
        className
    );

    const buttonLabel = variant === 'icon' ? (ariaLabel || label) : label;

    if (href) {
        return (
            <Link
                href={href}
                className={baseClasses}
                aria-label={buttonLabel}
                aria-disabled={disabled}
            >
                <PlusIcon className={iconSizeClasses[size]} />
                {variant !== 'icon' && <span>{label}</span>}
            </Link>
        );
    }

    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                disabled={disabled}
                className={baseClasses}
                aria-label={buttonLabel}
            >
                <PlusIcon className={iconSizeClasses[size]} />
                {variant !== 'icon' && <span>{label}</span>}
            </button>
        );
    }

    return null;
}

