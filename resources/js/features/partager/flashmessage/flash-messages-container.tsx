import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { FlashMessage, FlashType } from '@/features/partager/flashmessage/flash-message';

interface FlashData {
    success?: string;
    error?: string;
}

/**
 * Composant qui affiche automatiquement les flash messages Laravel
 * Utilise FlashMessage pour l'affichage
 */
export function FlashMessagesContainer() {
    const { flash } = usePage().props as { flash?: FlashData };
    const [messages, setMessages] = useState<Array<{ id: string; message: string; type: FlashType }>>([]);

    useEffect(() => {
        if (flash?.success) {
            const id = crypto.randomUUID();
            setMessages((prev) => [...prev, { id, message: flash.success!, type: 'success' as FlashType }]);
        }
    }, [flash?.success]);

    useEffect(() => {
        if (flash?.error) {
            const id = crypto.randomUUID();
            setMessages((prev) => [...prev, { id, message: flash.error!, type: 'error' as FlashType }]);
        }
    }, [flash?.error]);

    if (messages.length === 0) {
        return null;
    }

    return (
        <div className="fixed top-4 right-4 z-50 w-full max-w-md space-y-2">
            {messages.map((msg) => (
                <FlashMessage
                    key={msg.id}
                    message={msg.message}
                    type={msg.type}
                    onClose={() => {
                        setMessages((prev) => prev.filter((m) => m.id !== msg.id));
                    }}
                    autoClose={true}
                    duration={5000}
                    className="mb-0"
                />
            ))}
        </div>
    );
}

