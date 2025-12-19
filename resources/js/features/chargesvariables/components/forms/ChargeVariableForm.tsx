import { Form } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { SubmitButton } from '@/features/partager/buttons/submit-button';
import type { ChargeVariable, ChargeVariableType } from '@/features/chargesvariables/types/';
import { store, update } from '@/routes/charges-variables';
import { FormReadOnlyField } from '@/features/partager/forms/form-read-only-field';
import { useFormState } from '@/features/partager/hooks/use-form-state';
import { FormSelectField } from '@/features/partager/forms/form-select-field';
import { FormDateField } from '@/features/partager/forms/form-date-field';
import { getSubmitButtonText, getSubmitButtonVariant } from '@/features/partager/forms/form-helpers';

interface ChargeVariableFormProps {
    chargeVariable?: ChargeVariable;
    chargeVariableTypes: ChargeVariableType[];
    onSuccess?: () => void;
    readOnly?: boolean;
}

export function ChargeVariableForm({
    chargeVariable,
    chargeVariableTypes,
    onSuccess,
    readOnly = false,
}: ChargeVariableFormProps) {
    const {
        isEditing,
        formAction,
        selectedTypeId,
        setSelectedTypeId,
        selectedDate,
        setSelectedDate,
    } = useFormState({
        item: chargeVariable,
        storeRoute: () => store.form(),
        updateRoute: (id: number) => update.form({ charges_variable: id }),
        routeParamName: 'charges_variable',
        initialTypeId: chargeVariable?.charge_variable_type_id,
        initialDate: chargeVariable?.date,
    });

    // En mode readOnly, on n'utilise pas le Form d'Inertia, juste l'affichage
    if (readOnly) {
        return (
            <div className="space-y-4">
                <FormReadOnlyField 
                    label="Type" 
                    value={chargeVariable?.charge_variable_type?.nom} 
                />
                <FormReadOnlyField 
                    label="Prix Unitaire" 
                    value={chargeVariable?.prix_unitaire_formate || chargeVariable?.prix_unitaire} 
                />
                <FormReadOnlyField label="Quantité" value={chargeVariable?.quantite} />
                <FormReadOnlyField 
                    label="Total" 
                    value={chargeVariable?.total_formate || chargeVariable?.total} 
                />
                <FormReadOnlyField label="Date" value={chargeVariable?.date} />
            </div>
        );
    }

    return (
        <Form
            id="charge-variable-form"
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
                    <FormSelectField
                        label="Type"
                        name="charge_variable_type_id"
                        value={selectedTypeId}
                        onChange={setSelectedTypeId}
                        options={chargeVariableTypes}
                        getOptionValue={(type) => type.id.toString()}
                        getOptionLabel={(type) => type.nom}
                        placeholder="Sélectionner un type"
                        required
                        error={errors.charge_variable_type_id}
                    />

                    <div className="grid gap-2">
                        <Label htmlFor="prix_unitaire" className="text-foreground">
                            Prix Unitaire (DH) <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="prix_unitaire"
                            name="prix_unitaire"
                            type="number"
                            step="1"
                            min="1"
                            max="9999"
                            defaultValue={chargeVariable?.prix_unitaire || ''}
                            required
                            placeholder="15"
                            className="bg-background text-foreground border-input"
                            aria-invalid={!!errors.prix_unitaire}
                        />
                        <InputError message={errors.prix_unitaire} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="quantite" className="text-foreground">
                            Quantité <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="quantite"
                            name="quantite"
                            type="number"
                            step="1"
                            min="1"
                            defaultValue={chargeVariable?.quantite || ''}
                            required
                            placeholder="5"
                            className="bg-background text-foreground border-input"
                            aria-invalid={!!errors.quantite}
                        />
                        <InputError message={errors.quantite} />
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

