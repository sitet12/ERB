import { Pencil, Eye, CreditCard } from 'lucide-react';
import { DeleteButton } from '@/features/partager/buttons/delete-button';

interface ActionButtonsProps {
    onView?: () => void;
    onEdit?: () => void;
    /** URL de la route de suppression ou fonction à exécuter */
    onDelete?: (() => void) | string;
    /** Nom de l'élément à supprimer (pour le message de confirmation) */
    deleteItemName?: string;
    /** Message de confirmation personnalisé pour la suppression */
    deleteConfirmMessage?: string;
    /** Fonction à exécuter lors du clic sur le bouton de paiement */
    onPayment?: () => void;
    /** Afficher ou masquer le bouton de paiement */
    showPayment?: boolean;
    viewTitle?: string;
    editTitle?: string;
    deleteTitle?: string;
    paymentTitle?: string;
}

export function ActionButtons({ 
    onView,
    onEdit, 
    onDelete,
    deleteItemName,
    deleteConfirmMessage,
    onPayment,
    showPayment = false,
    viewTitle = 'Voir', 
    editTitle = 'Modifier', 
    deleteTitle = 'Supprimer',
    paymentTitle = 'Payer',
}: ActionButtonsProps) {
    if (!onView && !onEdit && !onDelete && !(onPayment && showPayment)) return null;

    return (
        <div className="flex items-center justify-end gap-2">
            {onView && (
                <button
                    onClick={onView}
                    className="p-1.5 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
                    title={viewTitle}
                >
                    <Eye size={16} />
                </button>
            )}
            {onEdit && (
                <button
                    onClick={onEdit}
                    className="p-1.5 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
                    title={editTitle}
                >
                    <Pencil size={16} />
                </button>
            )}
            {onDelete && (
                <DeleteButton
                    onDelete={onDelete}
                    itemName={deleteItemName}
                    confirmMessage={deleteConfirmMessage}
                    variant="icon"
                    size="md"
                    title={deleteTitle}
                />
            )}
            {onPayment && showPayment && (
                <button
                    onClick={onPayment}
                    className="p-1.5 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
                    title={paymentTitle}
                >
                    <CreditCard size={16} />
                </button>
            )}
        </div>
    );
}

