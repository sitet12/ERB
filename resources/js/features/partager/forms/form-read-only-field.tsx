import { Label } from '@/components/ui/label';

interface FormReadOnlyFieldProps {
    label: string;
    value: string | number | null | undefined;
    className?: string;
}

/**
 * Composant réutilisable pour afficher un champ en mode read-only
 * Centralise la logique d'affichage pour éviter la duplication
 */
export function FormReadOnlyField({ label, value, className }: FormReadOnlyFieldProps) {
    const displayValue = value ?? '-';
    
    return (
        <div className={`grid gap-2 ${className || ''}`}>
            <Label className="text-foreground">
                {label}
            </Label>
            <div className="text-foreground text-base font-medium bg-muted px-3 py-2 rounded-md border border-input">
                {displayValue}
            </div>
        </div>
    );
}

