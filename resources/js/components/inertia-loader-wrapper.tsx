import { useEffect, useState, useRef } from 'react';
import { router } from '@inertiajs/react';
import { Loader } from './ui/loader';

export function InertiaLoaderWrapper() {
    const [loading, setLoading] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleStart = (event: any) => {
            // Ignore prefetch requests - they shouldn't show the loader
            if (event.detail?.visit?.prefetch) {
                return;
            }
            
            // Délai de 200ms pour ignorer les navigations très rapides
            timeoutRef.current = setTimeout(() => {
                setLoading(true);
            }, 200);
        };

        const handleFinish = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            setLoading(false);
        };

        const handleError = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            setLoading(false);
        };

        router.on('start', handleStart);
        router.on('finish', handleFinish);
        router.on('error', handleError);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    if (!loading) return null;

    return <Loader />;
}