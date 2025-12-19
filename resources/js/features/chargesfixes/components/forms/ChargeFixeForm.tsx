import { Form } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { SubmitButton } from '@/features/partager/buttons/submit-button';
import type { ChargeFixe, ChargeFixeType } from '@/features/chargesfixes/types/';
import { store, update } from '@/routes/charges-fixes';
import { FormReadOnlyField } from '@/features/partager/forms/form-read-only-field';
import { useFormState } from '@/features/partager/hooks/use-form-state';
import { FormSelectField } from '@/features/partager/forms/form-select-field';
import { FormDateField } from '@/features/partager/forms/form-date-field';
import { getSubmitButtonText, getSubmitButtonVariant } from '@/features/partager/forms/form-helpers';

interface ChargeFixeFormProps {
    chargeFixe?: ChargeFixe;
    chargeFixeTypes: ChargeFixeType[];
    onSuccess?: () => void;
    readOnly?: boolean;
}

export function ChargeFixeForm({
    chargeFixe,
    chargeFixeTypes,
    onSuccess,
    readOnly = false,
}: ChargeFixeFormProps) {
    const {
        isEditing,
        formAction,
        selectedTypeId,
        setSelectedTypeId,
        selectedDate,
        setSelectedDate,
    } = useFormState({
        item: chargeFixe,
        storeRoute: () => store.form(),
        updateRoute: (id: number) => update.form({ charges_fix: id }),
        routeParamName: 'charges_fix',
        initialTypeId: chargeFixe?.charge_fixe_type_id,
        initialDate: chargeFixe?.date,
    });

    // En mode readOnly, on n'utilise pas le Form d'Inertia, juste l'affichage
    if (readOnly) {
        return (
            <div className="space-y-4">
                <FormReadOnlyField 
                    label="Type" 
                    value={chargeFixe?.charge_fixe_type?.nom} 
                />
                <FormReadOnlyField 
                    label="Montant" 
                    value={chargeFixe?.montant_formate || chargeFixe?.montant} 
                />
                <FormReadOnlyField label="Date" value={chargeFixe?.date} />
            </div>
        );
    }

    return (
        <Form
            id="charge-fixe-form"
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
                        name="charge_fixe_type_id"
                        value={selectedTypeId}
                        onChange={setSelectedTypeId}
                        options={chargeFixeTypes}
                        getOptionValue={(type) => type.id.toString()}
                        getOptionLabel={(type) => type.nom}
                        placeholder="Sélectionner un type"
                        required
                        error={errors.charge_fixe_type_id}
                    />

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
                            max="9999"
                            defaultValue={chargeFixe?.montant || ''}
                            required
                            placeholder="255,55"
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

