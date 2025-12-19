export interface Client {
    id: number;
    nom: string;
    prenom: string;
    nom_complet?: string;
    telephone: string | null;
    created_at: string | null;
    updated_at: string | null;
}

