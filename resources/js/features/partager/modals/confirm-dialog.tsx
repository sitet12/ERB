import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmDialogProps {
    /** Contrôle l'ouverture du dialogue */
    open: boolean;
    /** Callback quand l'ouverture change */
    onOpenChange: (open: boolean) => void;
    /** Message de confirmation à afficher */
    message: string;
    /** Titre du dialogue (par défaut: "Confirmer la suppression") */
    title?: string;
    /** Label du bouton de confirmation (par défaut: "Confirmer") */
    confirmLabel?: string;
    /** Label du bouton d'annulation (par défaut: "Annuler") */
    cancelLabel?: string;
    /** Variant du bouton de confirmation (par défaut: "destructive") */
    confirmVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    /** Callback quand l'utilisateur confirme */
    onConfirm: () => void;
    /** Désactiver le bouton de confirmation */
    disabled?: boolean;
}

/**
 * Composant de dialogue de confirmation personnalisé
 * Remplace les alert() natifs par une UI moderne et stylisée
 * 
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 * 
 * <ConfirmDialog
 *   open={open}
 *   onOpenChange={setOpen}
 *   message="Êtes-vous sûr de vouloir supprimer cet élément ?"
 *   onConfirm={() => {
 *     handleDelete();
 *     setOpen(false);
 *   }}
 * />
 * ```
 */
export function ConfirmDialog({
    open,
    onOpenChange,
    message,
    title = 'Confirmer la suppression',
    confirmLabel = 'Confirmer',
    cancelLabel = 'Annuler',
    confirmVariant = 'destructive',
    onConfirm,
    disabled = false,
}: ConfirmDialogProps) {
    const handleConfirm = () => {
        onConfirm();
        onOpenChange(false);
    };

    const handleCancel = () => {
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                        </div>
                        <DialogTitle className="text-left">{title}</DialogTitle>
                    </div>
                    <DialogDescription className="pt-2 text-left text-base">
                        {message}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        disabled={disabled}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        type="button"
                        variant={confirmVariant}
                        onClick={handleConfirm}
                        disabled={disabled}
                    >
                        {confirmLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

