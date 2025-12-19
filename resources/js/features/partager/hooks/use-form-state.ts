import { useState } from 'react';
import { router } from '@inertiajs/react';

/**
 * Hook pour gérer l'état commun des formulaires (isEditing, formAction, selectedTypeId, selectedDate)
 * Centralise la logique répétée dans tous les formulaires
 */
interface UseFormStateProps<T> {
    item?: T;
    storeRoute: () => any; // Retourne un objet spreadable pour Form
    updateRoute: (id: number) => any; // Retourne un objet spreadable pour Form
    routeParamName: string;
    initialTypeId?: string | number | null;
    initialDate?: string | null;
}

interface UseFormStateReturn {
    isEditing: boolean;
    formAction: any; // Objet spreadable pour Form d'Inertia
    selectedTypeId: string;
    setSelectedTypeId: (id: string) => void;
    selectedDate: string;
    setSelectedDate: (date: string) => void;
}

export function useFormState<T extends { id: number }>({
    item,
    storeRoute,
    updateRoute,
    routeParamName,
    initialTypeId,
    initialDate,
}: UseFormStateProps<T>): UseFormStateReturn {
    const isEditing = !!item;
    const formAction = isEditing
        ? updateRoute(item.id)
        : storeRoute();

    const [selectedTypeId, setSelectedTypeId] = useState<string>(
        initialTypeId?.toString() || ''
    );
    const [selectedDate, setSelectedDate] = useState<string>(
        initialDate || ''
    );

    return {
        isEditing,
        formAction,
        selectedTypeId,
        setSelectedTypeId,
        selectedDate,
        setSelectedDate,
    };
}

