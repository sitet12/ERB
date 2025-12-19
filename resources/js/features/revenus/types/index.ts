export interface Client {
    id: number;
    nom: string;
    prenom: string;
    nom_complet?: string;
}

export interface Statut {
    id: number;
    nom: string;
    badge_color?: string;
}

export interface Revenu {
    id: number;
    client_id: number;
    statut_id: number;
    montant: number;
    montant_formate?: string;
    date: string; // YYYY-MM-DD
    note?: string | null;
    created_at: string | null;
    updated_at: string | null;
    client?: Client; // Relation optionnelle
    statut?: Statut; // Relation optionnelle
}

