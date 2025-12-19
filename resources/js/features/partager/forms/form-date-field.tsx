import { Label } from '@/components/ui/label';
import { DatePicker } from '@/features/partager/components/date-picker';
import InputError from '@/components/input-error';

interface FormDateFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (date: string) => void;
    placeholder?: string;
    required?: boolean;
    error?: string;
    className?: string;
}

/**
 * Composant réutilisable pour les champs Date dans les formulaires
 * Centralise la logique répétée (hidden input + DatePicker + InputError)
 */
export function FormDateField({
    label,
    name,
    value,
    onChange,
    placeholder = 'Sélectionner une date',
    required = false,
    error,
    className,
}: FormDateFieldProps) {
    return (
        <div className={`grid gap-2 ${className || ''}`}>
            <Label htmlFor={name} className="text-foreground">
                {label} {required && <span className="text-destructive">*</span>}
            </Label>
            <input type="hidden" name={name} value={value} />
            <DatePicker
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                aria-invalid={!!error}
            />
            <InputError message={error} />
        </div>
    );
}

