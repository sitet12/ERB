import { Form } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { SubmitButton } from '@/features/partager/buttons/submit-button';
import type { Client } from '@/features/clients/types/';
import { store, update } from '@/routes/clients';
import { FormReadOnlyField } from '@/features/partager/forms/form-read-only-field';

interface ClientFormProps {
    client?: Client;
    onSuccess?: () => void;
    readOnly?: boolean;
}

export function ClientForm({
    client,
    onSuccess,
    readOnly = false,
}: ClientFormProps) {
    const isEditing = !!client;
    const formAction = isEditing
        ? update.form({ client: client.id })
        : store.form();

    // En mode readOnly, on n'utilise pas le Form d'Inertia, juste l'affichage
    if (readOnly) {
        return (
            <div className="space-y-4">
                <FormReadOnlyField label="Nom" value={client?.nom} />
                <FormReadOnlyField label="Prénom" value={client?.prenom} />
                <FormReadOnlyField label="Téléphone" value={client?.telephone} />
                {client?.nom_complet && (
                    <FormReadOnlyField label="Nom Complet" value={client.nom_complet} />
                )}
            </div>
        );
    }

    return (
        <Form
            id="client-form"
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
                            type="text"
                            defaultValue={client?.nom || ''}
                            required
                            maxLength={100}
                            placeholder="Ex: Aakki"
                            className="bg-background text-foreground border-input"
                            aria-invalid={!!errors.nom}
                        />
                        <InputError message={errors.nom} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="prenom" className="text-foreground">
                            Prénom <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="prenom"
                            name="prenom"
                            type="text"
                            defaultValue={client?.prenom || ''}
                            required
                            maxLength={100}
                            placeholder="Ex: Oussama"
                            className="bg-background text-foreground border-input"
                            aria-invalid={!!errors.prenom}
                        />
                        <InputError message={errors.prenom} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="telephone" className="text-foreground">
                            Téléphone
                        </Label>
                        <Input
                            id="telephone"
                            name="telephone"
                            type="tel"
                            defaultValue={client?.telephone || ''}
                            maxLength={20}
                            placeholder="Ex: 0770451659"
                            className="bg-background text-foreground border-input"
                            aria-invalid={!!errors.telephone}
                        />
                        <InputError message={errors.telephone} />
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

