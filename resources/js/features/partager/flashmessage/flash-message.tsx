// ============================================================================
// FlashMessages.tsx - ONE FILE, EVERYTHING INCLUDED
// ============================================================================
import { useEffect, useState, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlashData {
    success?: string;
    error?: string;
    info?: string;
}

type FlashType = 'success' | 'error' | 'info';

interface Message {
    id: string;
    text: string;
    type: FlashType;
}

/**
 * Affiche les flash messages Laravel
 * Gère les duplications automatiquement
 */
export function FlashMessages() {
    const { flash } = usePage().props as { flash?: FlashData };
    const [messages, setMessages] = useState<Message[]>([]);
    const lastShownRef = useRef<FlashData>({});

    useEffect(() => {
        const newMessages: Message[] = [];

        // Success
        if (flash?.success && flash.success !== lastShownRef.current.success) {
            newMessages.push({
                id: crypto.randomUUID(),
                text: flash.success,
                type: 'success',
            });
            lastShownRef.current.success = flash.success;
        }

        // Error
        if (flash?.error && flash.error !== lastShownRef.current.error) {
            newMessages.push({
                id: crypto.randomUUID(),
                text: flash.error,
                type: 'error',
            });
            lastShownRef.current.error = flash.error;
        }

        // Info
        if (flash?.info && flash.info !== lastShownRef.current.info) {
            newMessages.push({
                id: crypto.randomUUID(),
                text: flash.info,
                type: 'info',
            });
            lastShownRef.current.info = flash.info;
        }

        // Add new messages
        if (newMessages.length > 0) {
            setMessages((prev) => [...prev, ...newMessages]);
        }

        // Reset tracking when no flash messages
        if (!flash?.success && !flash?.error && !flash?.info) {
            lastShownRef.current = {};
        }
    }, [flash]);

    const removeMessage = (id: string) => {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
    };

    if (messages.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-50 w-full max-w-md space-y-2">
            {messages.map((msg) => (
                <FlashMessageItem
                    key={msg.id}
                    message={msg.text}
                    type={msg.type}
                    onClose={() => removeMessage(msg.id)}
                />
            ))}
        </div>
    );
}

// ============================================================================
// Message Item Component (Internal)
// ============================================================================
interface FlashMessageItemProps {
    message: string;
    type: FlashType;
    onClose: () => void;
}

function FlashMessageItem({ message, type, onClose }: FlashMessageItemProps) {
    const [isExiting, setIsExiting] = useState(false);

    // Auto close after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(onClose, 200); // Wait for animation
    };

    const styles = {
        success: {
            // Utilise le vert pour success (convention universelle)
            // Note: Pas de variable "success" dans le thème, donc on garde le vert hardcodé
            container: 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900',
            text: 'text-green-900 dark:text-green-200',
            icon: <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0" />,
        },
        error: {
            // Utilise les variables de thème pour les erreurs
            container: 'bg-destructive/10 border-destructive/20 dark:bg-destructive/20 dark:border-destructive/40',
            text: 'text-destructive dark:text-destructive',
            icon: <AlertCircle className="h-5 w-5 text-destructive shrink-0" />,
        },
        info: {
            // Utilise les variables de thème primary pour les infos
            container: 'bg-primary/10 border-primary/20 dark:bg-primary/20 dark:border-primary/40',
            text: 'text-primary dark:text-primary-foreground',
            icon: <Info className="h-5 w-5 text-primary shrink-0" />,
        },
    };

    const currentStyle = styles[type];

    return (
        <div
            role="alert"
            className={cn(
                'flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all duration-200',
                'animate-in fade-in slide-in-from-top-2',
                isExiting && 'animate-out fade-out slide-out-to-right-full',
                currentStyle.container,
                currentStyle.text
            )}
        >
            {currentStyle.icon}
            <div className="flex-1 text-sm font-medium leading-relaxed">
                {message}
            </div>
            <button
                onClick={handleClose}
                className="ml-auto inline-flex h-5 w-5 items-center justify-center rounded-md opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label="Fermer"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}
