export interface ChargeFixeType {
    id: number;
    nom: string;
}

export interface ChargeFixe {
    id: number;
    charge_fixe_type_id: number;
    montant: number;
    montant_formate?: string;
    date: string;
    created_at: string | null;
    updated_at: string | null;
    charge_fixe_type?: ChargeFixeType;
}

