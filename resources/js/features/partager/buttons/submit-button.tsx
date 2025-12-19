import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

interface SubmitButtonProps {
    processing: boolean;
    text: string;
    variant?: 'create' | 'update' | 'default';
    className?: string;
}

const variantStyles = {
    create: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    update: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground',
    default: '',
};

export function SubmitButton({
    processing,
    text,
    variant = 'default',
    className,
}: SubmitButtonProps) {
    return (
        <Button
            type="submit"
            disabled={processing}
            className={cn(
                variant !== 'default' && variantStyles[variant],
                className
            )}
        >
            {processing && <Spinner className="mr-2" />}
            {text}
        </Button>
    );
}

