import { Form } from '@inertiajs/react';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';
import { SubmitButton } from '@/features/partager/buttons/submit-button';
import type { Revenu, Client, Statut } from '@/features/revenus/types/';
import { store, update } from '@/routes/revenus';
import { RevenuClientSection } from '@/features/revenus/components/fields/RevenuClientSection';
import { FormReadOnlyField } from '@/features/partager/forms/form-read-only-field';
import { useFormState } from '@/features/partager/hooks/use-form-state';
import { FormSelectField } from '@/features/partager/forms/form-select-field';
import { FormDateField } from '@/features/partager/forms/form-date-field';
import { getSubmitButtonText, getSubmitButtonVariant } from '@/features/partager/forms/form-helpers';

interface RevenuFormProps {
    revenu?: Revenu;
    clients: Client[];
    statuts: Statut[];
    onSuccess?: () => void;
    readOnly?: boolean;
}

export function RevenuForm({
    revenu,
    clients,
    statuts,
    onSuccess,
    readOnly = false,
}: RevenuFormProps) {
    const {
        isEditing,
        formAction,
        selectedDate,
        setSelectedDate,
    } = useFormState({
        item: revenu,
        storeRoute: () => store.form(),
        updateRoute: (id: number) => update.form({ revenu: id }),
        routeParamName: 'revenu',
        initialDate: revenu?.date,
    });

    const [selectedStatutId, setSelectedStatutId] = React.useState<string>(
        revenu?.statut_id?.toString() || ''
    );

    if (readOnly) {
        const clientName = revenu?.client?.nom_complet || 
            `${revenu?.client?.prenom || ''} ${revenu?.client?.nom || ''}`.trim() || '-';
        
        return (
            <div className="space-y-4">
                <FormReadOnlyField label="Client" value={clientName} />
                <FormReadOnlyField label="Statut" value={revenu?.statut?.nom} />
                <FormReadOnlyField 
                    label="Montant" 
                    value={revenu?.montant_formate || revenu?.montant} 
                />
                <FormReadOnlyField label="Date" value={revenu?.date} />
                {revenu?.note && (
                    <FormReadOnlyField label="Note" value={revenu.note} />
                )}
            </div>
        );
    }

    return (
        <Form
            id="revenu-form"
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
                    <RevenuClientSection
                        clients={clients}
                        revenu={revenu}
                        errors={errors as Record<string, string | undefined>}
                        isEditing={isEditing}
                    />

                    <FormSelectField
                        label="Statut"
                        name="statut_id"
                        value={selectedStatutId}
                        onChange={setSelectedStatutId}
                        options={statuts}
                        getOptionValue={(statut) => statut.id.toString()}
                        getOptionLabel={(statut) => statut.nom}
                        placeholder="Sélectionner un statut"
                        required
                        error={errors.statut_id}
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="montant" className="text-foreground">
                                Montant (DH) <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="montant"
                                name="montant"
                                type="number"
                                step="1"
                                min="1"
                                defaultValue={revenu?.montant || ''}
                                required
                                placeholder="500"
                                className="bg-background text-foreground border-input"
                                aria-invalid={!!errors.montant}
                            />
                            <InputError message={errors.montant} />
                        </div>

                        <FormDateField
                            label="Date"
                            name="date"
                            value={selectedDate}
                            onChange={setSelectedDate}
                            placeholder="Sélectionner une date"
                            required
                            error={errors.date}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="note" className="text-foreground">
                            Note
                        </Label>
                        <Textarea
                            id="note"
                            name="note"
                            defaultValue={revenu?.note || ''}
                            placeholder="Note optionnelle..."
                            className="bg-background text-foreground border-input min-h-[100px]"
                            aria-invalid={!!errors.note}
                        />
                        <InputError message={errors.note} />
                    </div>

                    <div className="flex justify-end gap-2 pt-6 border-t border-border">
                        <SubmitButton
                            processing={processing}
                            text={getSubmitButtonText(isEditing)}
                            variant={getSubmitButtonVariant(isEditing)}
                        />
                    </div>
                </>
            )}
        </Form>
    );
}

