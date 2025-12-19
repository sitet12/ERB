// resources/js/features/dashboard/components/cards/section-cards.tsx
import { StatCard } from "./stat-card"
import type { DashboardStats, DashboardComparison } from "@/features/dashboard/types/dashboard"
import { formatCurrency, formatNumber } from "@/features/partager/utils/currency-formatters"

interface SectionCardsProps {
  stats: DashboardStats & { 
    comparison: DashboardComparison
    benefice_daily?: { benefice: number; percentage: number }
    benefice_month_comparison?: { benefice: number; percentage: number }
  }
  recentCharges: Array<{
    id: number
    type: 'fixe' | 'variable'
    nom: string
    montant: number
    date: string
  }>
  selectedMonth: string
}

export function SectionCards({ stats }: SectionCardsProps) {
  const { comparison } = stats || {}

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {/* Carte 1: Bénéfice Total - Croissance quotidienne */}
      <StatCard
        title="Bénéfice Total"
        value={stats?.benefice_daily?.benefice ?? 0}
        percentage={stats?.benefice_daily?.percentage}
        valueFormatter={formatCurrency}
      />

      {/* Carte 2: Bénéfice Comparison - M vs M-1 */}
      <StatCard
        title="Bénéfice (Mois)"
        value={stats?.benefice_month_comparison?.benefice ?? 0}
        percentage={stats?.benefice_month_comparison?.percentage}
        valueFormatter={formatCurrency}
      />

      {/* Carte 3: Revenus total (revenus payés pour le mois) */}
      <StatCard
        title="Revenus Total"
        value={stats?.revenus_payes ?? 0}
        percentage={comparison?.revenus_payes?.percentage}
        footer={`Total revenus: ${formatCurrency(stats?.total_revenus)} (payés + impayés)`}
        valueFormatter={formatCurrency}
      />

      {/* Carte 4: Revenus non payés du mois */}
      <StatCard
        title="Revenus Non Payés"
        value={stats?.revenus_impayes ?? 0}
        percentage={comparison?.revenus_impayes?.percentage}
        footer={`En attente de paiement pour ${stats?.month_label || 'ce mois'}`}
        valueFormatter={formatCurrency}
      />

      {/* Carte 4: Total clients du mois */}
      <StatCard
        title="Clients (Mois)"
        value={stats?.total_clients ?? 0}
        percentage={comparison?.clients?.percentage}
        footer={`Total clients créés ce mois (Total: ${formatNumber(stats?.total_clients_all_time)})`}
        valueFormatter={formatNumber}
      />
    </div>
  )
}