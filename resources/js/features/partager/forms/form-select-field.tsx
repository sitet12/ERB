import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import InputError from '@/components/input-error';

interface FormSelectFieldProps<T> {
    label: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    options: T[];
    getOptionValue: (option: T) => string;
    getOptionLabel: (option: T) => string;
    placeholder?: string;
    required?: boolean;
    error?: string;
    className?: string;
}

/**
 * Composant réutilisable pour les champs Select dans les formulaires
 * Centralise la logique répétée (hidden input + Select + InputError)
 */
export function FormSelectField<T>({
    label,
    name,
    value,
    onChange,
    options,
    getOptionValue,
    getOptionLabel,
    placeholder = 'Sélectionner...',
    required = false,
    error,
    className,
}: FormSelectFieldProps<T>) {
    return (
        <>
            <input type="hidden" name={name} value={value} />
            <div className={`grid gap-2 ${className || ''}`}>
                <Label htmlFor={name} className="text-foreground">
                    {label} {required && <span className="text-destructive">*</span>}
                </Label>
                <Select value={value} onValueChange={onChange} required={required}>
                    <SelectTrigger
                        className="bg-background text-foreground border-input"
                        aria-invalid={!!error}
                    >
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem key={getOptionValue(option)} value={getOptionValue(option)}>
                                {getOptionLabel(option)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={error} />
            </div>
        </>
    );
}

