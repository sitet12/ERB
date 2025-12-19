import { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export type FlashType = 'success' | 'error' | 'info';

interface FlashMessageProps {
    message: string;
    type?: FlashType;
    onClose?: () => void;
    autoClose?: boolean;
    duration?: number;
    className?: string;
}

export const FlashMessage: React.FC<FlashMessageProps> = ({
    message,
    type = 'info',
    onClose,
    autoClose = true,
    duration = 5000,
    className,
}) => {
    useEffect(() => {
        if (autoClose && onClose) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [autoClose, duration, onClose]);

    const styles = {
        success: {
            container: 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900',
            text: 'text-green-900 dark:text-green-200',
            icon: (
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0" />
            ),
        },
        error: {
            container: 'bg-destructive/10 border-destructive/20 dark:bg-destructive/10',
            text: 'text-destructive dark:text-red-200',
            icon: <AlertCircle className="h-5 w-5 text-destructive shrink-0" />,
        },
        info: {
            container: 'bg-primary/10 border-primary/20 dark:bg-primary/10',
            text: 'text-primary dark:text-primary-foreground',
            icon: <Info className="h-5 w-5 text-primary shrink-0" />,
        },
    };

    const currentStyle = styles[type];

    return (
        <div
            role="alert"
            className={cn(
                'flex items-start gap-3 rounded-lg border p-4 mb-6 shadow-sm transition-all animate-in fade-in slide-in-from-top-2',
                currentStyle.container,
                currentStyle.text,
                className
            )}
        >
            {currentStyle.icon}
            <div className="flex-1 text-sm font-medium leading-relaxed">{message}</div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="ml-auto inline-flex h-5 w-5 items-center justify-center rounded-md opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    aria-label="Fermer"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Fermer</span>
                </button>
            )}
        </div>
    );
};

