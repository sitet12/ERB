// resources/js/types/dashboard.ts
export interface DashboardStats {
    total_revenus: number;
    revenus_payes: number;
    revenus_impayes: number;
    total_charges: number;
    charges_fixes: number;
    charges_variables: number;
    benefice: number;
    total_clients: number;
    total_clients_all_time: number;
    month: string;
    month_label: string;
}

export interface DashboardComparison {
    benefice: {
        current: number;
        previous: number;
        difference: number;
        percentage: number;
    };
    revenus: {
        current: number;
        previous: number;
        difference: number;
        percentage: number;
    };
    revenus_payes: {
        current: number;
        previous: number;
        difference: number;
        percentage: number;
    };
    revenus_impayes: {
        current: number;
        previous: number;
        difference: number;
        percentage: number;
    };
    charges: {
        current: number;
        previous: number;
        difference: number;
        percentage: number;
    };
    clients: {
        current: number;
        previous: number;
        difference: number;
        percentage: number;
    };
}

export interface BeneficeDaily {
    benefice: number;
    percentage: number;
}

export interface BeneficeMonthComparison {
    benefice: number;
    percentage: number;
}

export interface BeneficeChartMonth {
    month: string;
    month_label: string;
    revenus: number;
    charges: number;
    benefice: number;
}

export interface BeneficeChart {
    current_month: BeneficeChartMonth;
    previous_month: BeneficeChartMonth;
    growth: number | null;
}

export interface RevenusPieChart {
    paye: number;
    impaye: number;
    total: number;
}

export interface DashboardData {
    current_month: DashboardStats;
    previous_month: DashboardStats;
    comparison: DashboardComparison;
    benefice_daily: BeneficeDaily;
    benefice_month_comparison: BeneficeMonthComparison;
    recentCharges: Array<{
        id: number;
        type: 'fixe' | 'variable';
        nom: string;
        montant: number;
        date: string;
    }>;
    selectedMonth: string;
}


// Props utilisées uniquement par les cards de statistiques
export interface DashboardCardsProps {
  totalBenefice?: number
  totalClients?: number
  totalRevenus?: number
  totalChargesFixes?: number
  totalChargesVariables?: number
  margeBeneficiaire?: number | null
  pourcentageClients?: number
  pourcentageRevenus?: number
  pourcentageChargesFixes?: number | null
  pourcentageChargesVariables?: number | null
}

// Props complètes du dashboard (cards + graphiques)
export interface DashboardProps extends DashboardCardsProps {
  beneficeChart?: BeneficeChart
  revenusPieChart?: RevenusPieChart
}