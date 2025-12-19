import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

type CrudModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: 'create' | 'edit' | 'view';
    titleCreate?: string;
    titleEdit?: string;
    titleView?: string;
    descriptionCreate?: string;
    descriptionEdit?: string;
    descriptionView?: string;
    children: ReactNode; // form content passed by caller
    contentClassName?: string;
};

export function CrudModal({
    open,
    onOpenChange,
    mode,
    titleCreate = 'Créer',
    titleEdit = 'Modifier',
    titleView = 'Détails',
    descriptionCreate,
    descriptionEdit,
    descriptionView,
    children,
    contentClassName,
}: CrudModalProps) {
    const title = mode === 'create' ? titleCreate : mode === 'edit' ? titleEdit : titleView;
    const description = mode === 'create' ? descriptionCreate : mode === 'edit' ? descriptionEdit : descriptionView;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={cn(contentClassName ?? 'sm:max-w-md', 'max-h-[90vh] flex flex-col')}>
                <DialogHeader className="shrink-0">
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                {/* Scrollable form content */}
                <div className="flex-1 overflow-y-auto min-h-0 pr-1">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
}

