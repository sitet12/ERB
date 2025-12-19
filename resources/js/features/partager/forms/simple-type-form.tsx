import { Form } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { SubmitButton } from '@/features/partager/buttons/submit-button';

interface SimpleTypeItem {
    id: number;
    nom: string;
}

interface SimpleTypeFormProps {
    item?: SimpleTypeItem;
    onSuccess?: () => void;
    readOnly?: boolean;
    storeRoute: () => { action: string; method: 'post' };
    updateRoute: (args: any) => { action: string; method: 'post' };
    routeParamName: string;
    formId: string;
    placeholder?: string;
}

export function SimpleTypeForm({
    item,
    onSuccess,
    readOnly = false,
    storeRoute,
    updateRoute,
    routeParamName,
    formId,
    placeholder = 'Ex: Nom...',
}: SimpleTypeFormProps) {
    const isEditing = !!item;
    const formAction = isEditing
        ? updateRoute({ [routeParamName]: item.id })
        : storeRoute();

    // En mode readOnly, on n'utilise pas le Form d'Inertia, juste l'affichage
    if (readOnly) {
        return (
            <div className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="nom" className="text-foreground">
                        Nom
                    </Label>
                    <div className="text-foreground text-base font-medium bg-muted px-3 py-2 rounded-md border border-input">
                        {item?.nom || '-'}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Form
            id={formId}
            {...formAction}
            onSuccess={() => {
                if (onSuccess) {
                    onSuccess();
                }
            }}
            className="space-y-4"
        >
            {({ processing, errors }) => (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="nom" className="text-foreground">
                            Nom <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="nom"
                            name="nom"
                            defaultValue={item?.nom || ''}
                            required
                            maxLength={100}
                            placeholder={placeholder}
                            className="bg-background text-foreground border-input"
                            aria-invalid={!!errors.nom}
                        />
                        <InputError message={errors.nom} />
                    </div>

                    <div className="flex justify-end gap-2 pt-6 border-t border-border">
                        <SubmitButton
                            processing={processing}
                            text={isEditing ? 'Modifier' : 'Créer'}
                            variant={isEditing ? 'update' : 'create'}
                        />
                    </div>
                </>
            )}
        </Form>
    );
}

