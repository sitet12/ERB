import { SimpleTypeForm } from '@/features/partager/forms/simple-type-form';
import type { ChargeFixeType } from '@/features/chargefixetypes/types/';
import { store, update } from '@/routes/charge-fixe-types';

interface ChargeFixeTypeFormProps {
    chargeFixeType?: ChargeFixeType;
    onSuccess?: () => void;
    readOnly?: boolean;
}

export function ChargeFixeTypeForm({
    chargeFixeType,
    onSuccess,
    readOnly = false,
}: ChargeFixeTypeFormProps) {
    return (
        <SimpleTypeForm
            item={chargeFixeType}
            onSuccess={onSuccess}
            readOnly={readOnly}
            storeRoute={store.form}
            updateRoute={(args: { charge_fixe_type: string | number }) => update.form(args)}
            routeParamName="charge_fixe_type"
            formId="charge-fixe-type-form"
            placeholder="Ex: Loyer, Électricité..."
        />
    );
}

