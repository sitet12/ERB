export interface Benefice {
    id: number;
    date: string; // YYYY-MM-DD
    total_revenus: number;
    total_charges: number;
    benefice: number;
    benefice_formate?: string;
    created_at: string | null;
    updated_at: string | null;
}

