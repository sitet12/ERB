import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { ConfirmDialog } from '@/features/partager/modals/confirm-dialog';

interface DeleteButtonProps {
    /** URL de la route de suppression ou fonction à exécuter */
    onDelete: (() => void) | string;
    /** Message de confirmation personnalisé */
    confirmMessage?: string;
    /** Nom de l'élément à supprimer (pour le message par défaut) */
    itemName?: string;
    /** Variant du bouton : 'icon' pour icône seule, 'full' pour bouton complet */
    variant?: 'icon' | 'full';
    /** Taille du bouton */
    size?: 'sm' | 'md' | 'lg';
    /** Classe CSS personnalisée */
    className?: string;
    /** Désactiver le bouton */
    disabled?: boolean;
    /** Titre/tooltip du bouton */
    title?: string;
    /** Label pour le bouton full variant */
    label?: string;
}

/**
 * Composant DeleteButton centralisé avec confirmation
 * Gère la confirmation avant suppression et peut utiliser router.delete() ou une fonction personnalisée
 * 
 * @example
 * ```tsx
 * // Avec URL Inertia (recommandé)
 * <DeleteButton
 *   onDelete={destroy.url({ id: item.id })}
 *   itemName={item.nom}
 *   variant="icon"
 * />
 * 
 * // Avec fonction personnalisée
 * <DeleteButton
 *   onDelete={() => handleDelete(item.id)}
 *   confirmMessage="Êtes-vous sûr ?"
 *   variant="full"
 *   label="Supprimer"
 * />
 * ```
 */
export function DeleteButton({
    onDelete,
    confirmMessage,
    itemName,
    variant = 'icon',
    size = 'md',
    className,
    disabled = false,
    title = 'Supprimer',
    label = 'Supprimer',
}: DeleteButtonProps) {
    const [open, setOpen] = useState(false);

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

    const getConfirmMessage = (): string => {
        if (confirmMessage) {
            return confirmMessage;
        }
        if (itemName) {
            return `Êtes-vous sûr de vouloir supprimer "${itemName}" ?`;
        }
        return 'Êtes-vous sûr de vouloir supprimer cet élément ?';
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleConfirm = () => {
        if (typeof onDelete === 'string') {
            // URL Inertia - utiliser router.delete()
            router.delete(onDelete);
        } else {
            // Fonction personnalisée
            onDelete();
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={handleClick}
                disabled={disabled}
                className={cn(
                    'inline-flex items-center justify-center gap-2',
                    'text-muted-foreground',
                    'hover:text-destructive',
                    'hover:bg-destructive/10',
                    'rounded-lg transition-colors',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    sizeClasses[size],
                    className
                )}
                title={title}
                aria-label={title}
            >
                <Trash2 className={iconSizeClasses[size]} />
                {variant === 'full' && <span>{label}</span>}
            </button>

            <ConfirmDialog
                open={open}
                onOpenChange={setOpen}
                message={getConfirmMessage()}
                title="Confirmer la suppression"
                confirmLabel="Confirmer"
                cancelLabel="Annuler"
                confirmVariant="destructive"
                onConfirm={handleConfirm}
                disabled={disabled}
            />
        </>
    );
}

