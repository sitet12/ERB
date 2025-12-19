import { useState, useEffect } from 'react';
import type { Revenu } from '@/features/revenus/types/';

interface UseClientFormStateProps {
    revenu?: Revenu;
    isEditing: boolean;
}

interface UseClientFormStateReturn {
    clientMode: 'exist' | 'new';
    selectedClientId: string;
    newClientNom: string;
    newClientPrenom: string;
    newClientTelephone: string;
    setClientMode: (mode: 'exist' | 'new') => void;
    setSelectedClientId: (id: string) => void;
    setNewClientNom: (value: string) => void;
    setNewClientPrenom: (value: string) => void;
    setNewClientTelephone: (value: string) => void;
}

/**
 * Hook pour gérer l'état du formulaire client dans RevenuForm
 * Centralise la logique d'état pour simplifier RevenuClientSection
 */
export function useClientFormState({ revenu, isEditing }: UseClientFormStateProps): UseClientFormStateReturn {
    const [clientMode, setClientMode] = useState<'exist' | 'new'>('exist');
    const [selectedClientId, setSelectedClientId] = useState<string>(
        revenu?.client_id?.toString() || ''
    );
    const [newClientNom, setNewClientNom] = useState('');
    const [newClientPrenom, setNewClientPrenom] = useState('');
    const [newClientTelephone, setNewClientTelephone] = useState('');

    // En mode édition, forcer le mode 'exist'
    useEffect(() => {
        if (isEditing && clientMode === 'new') {
            setClientMode('exist');
        }
    }, [isEditing, clientMode]);

    return {
        clientMode,
        selectedClientId,
        newClientNom,
        newClientPrenom,
        newClientTelephone,
        setClientMode,
        setSelectedClientId,
        setNewClientNom,
        setNewClientPrenom,
        setNewClientTelephone,
    };
}

