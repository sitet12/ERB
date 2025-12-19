import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

interface FlashMessagesProps {
    className?: string;
}

interface FlashData {
    success?: string;
    error?: string;
}

/**
 * Composant pour afficher les messages flash (success, error)
 * Utilise les messages de session Laravel partagés via HandleInertiaRequests
 * 
 * Les messages disparaissent automatiquement après 5 secondes ou peuvent être fermés manuellement
 */
export function FlashMessages({ className }: FlashMessagesProps) {
    const { flash } = usePage().props as { flash?: FlashData };
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (flash?.success) {
            setSuccessMessage(flash.success);
            setShowSuccess(true);
            
            // Auto-fermeture après 5 secondes
            const timer = setTimeout(() => {
                setShowSuccess(false);
                setTimeout(() => setSuccessMessage(null), 200); // Wait for animation
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [flash?.success]);

    useEffect(() => {
        if (flash?.error) {
            setErrorMessage(flash.error);
            setShowError(true);
            
            // Auto-fermeture après 5 secondes
            const timer = setTimeout(() => {
                setShowError(false);
                setTimeout(() => setErrorMessage(null), 200); // Wait for animation
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [flash?.error]);

    if (!successMessage && !errorMessage) {
        return null;
    }

    return (
        <div className={cn('fixed top-4 right-4 z-50 w-full max-w-md space-y-2', className)}>
            {successMessage && (
                <Alert
                    variant="default"
                    className={cn(
                        'border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-900/20',
                        'transition-all duration-200',
                        showSuccess
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 -translate-y-2 pointer-events-none'
                    )}
                >
                    <CheckCircle2 className="text-green-600 dark:text-green-400" />
                    <AlertTitle className="text-green-900 dark:text-green-100">
                        Succès
                    </AlertTitle>
                    <AlertDescription className="text-green-800 dark:text-green-200">
                        {successMessage}
                    </AlertDescription>
                    <button
                        onClick={() => {
                            setShowSuccess(false);
                            setTimeout(() => setSuccessMessage(null), 200);
                        }}
                        className="absolute top-3 right-3 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        aria-label="Fermer"
                    >
                        <X className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </button>
                </Alert>
            )}

            {errorMessage && (
                <Alert
                    variant="destructive"
                    className={cn(
                        'transition-all duration-200',
                        showError
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 -translate-y-2 pointer-events-none'
                    )}
                >
                    <AlertCircle />
                    <AlertTitle>Erreur</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                    <button
                        onClick={() => {
                            setShowError(false);
                            setTimeout(() => setErrorMessage(null), 200);
                        }}
                        className="absolute top-3 right-3 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        aria-label="Fermer"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </Alert>
            )}
        </div>
    );
}

