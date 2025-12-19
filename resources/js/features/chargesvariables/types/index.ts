export interface ChargeVariableType {
    id: number;
    nom: string;
}

export interface ChargeVariable {
    id: number;
    charge_variable_type_id: number;
    prix_unitaire: number;
    prix_unitaire_formate?: string;
    quantite: number;
    total: number;
    total_formate?: string;
    date: string; // YYYY-MM-DD
    created_at: string | null;
    updated_at: string | null;
    charge_variable_type?: ChargeVariableType; // Relation optionnelle
}

