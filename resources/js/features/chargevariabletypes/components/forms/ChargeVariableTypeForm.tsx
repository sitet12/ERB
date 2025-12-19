import { SimpleTypeForm } from '@/features/partager/forms/simple-type-form';
import type { ChargeVariableType } from '@/features/chargevariabletypes/types/';
import { store, update } from '@/routes/charge-variable-types';

interface ChargeVariableTypeFormProps {
    chargeVariableType?: ChargeVariableType;
    onSuccess?: () => void;
    readOnly?: boolean;
}

export function ChargeVariableTypeForm({
    chargeVariableType,
    onSuccess,
    readOnly = false,
}: ChargeVariableTypeFormProps) {
    return (
        <SimpleTypeForm
            item={chargeVariableType}
            onSuccess={onSuccess}
            readOnly={readOnly}
            storeRoute={store.form}
            updateRoute={(args: { charge_variable_type: string | number }) => update.form(args)}
            routeParamName="charge_variable_type"
            formId="charge-variable-type-form"
            placeholder="Ex: Essence, Nourriture..."
        />
    );
}

