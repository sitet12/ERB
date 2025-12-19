import type { DashboardCardsProps } from "@/features/dashboard/types/dashboard"
import { formatCurrency, formatNumber } from "@/features/partager/utils/currency-formatters"

interface CardConfig {
  title: string
  valueFormatter: (value: number) => string
  percentageCalculator: (props: DashboardCardsProps) => number
  isPositiveCalculator: (percentage: number) => boolean
  footerTextCalculator: (percentage: number) => string
  footerDescription: string
  dataKey: keyof DashboardCardsProps
}

export const dashboardCardsConfig: CardConfig[] = [
  {
    title: "Bénéfice Total",
    valueFormatter: formatCurrency,
    percentageCalculator: (props) => props.margeBeneficiaire ?? 0,
    isPositiveCalculator: (percentage) => percentage >= 0,
    footerTextCalculator: (percentage) => 
      percentage >= 0 ? "Marge bénéficiaire positive" : "Déficit détecté",
    footerDescription: "Performance globale du bénéfice",
    dataKey: "totalBenefice",
  },
  {
    title: "Total Clients",
    valueFormatter: formatNumber,
    percentageCalculator: (props) => props.pourcentageClients ?? 0,
    isPositiveCalculator: () => true,
    footerTextCalculator: (percentage) => 
      percentage >= 100 ? "Objectif atteint" : "Progression vers l'objectif",
    footerDescription: "Performance globale des clients",
    dataKey: "totalClients",
  },
  {
    title: "Revenus Total",
    valueFormatter: formatCurrency,
    percentageCalculator: (props) => props.pourcentageRevenus ?? 0,
    isPositiveCalculator: () => true,
    footerTextCalculator: (percentage) => 
      percentage >= 100 ? "Objectif atteint" : "Progression vers l'objectif",
    footerDescription: "Performance globale des revenus",
    dataKey: "totalRevenus",
  },
  {
    title: "Charge Fixe",
    valueFormatter: formatCurrency,
    percentageCalculator: (props) => props.pourcentageChargesFixes ?? 0,
    isPositiveCalculator: (percentage) => percentage <= 50, // Considéré positif si ≤ 50% des revenus
    footerTextCalculator: (percentage) => 
      percentage <= 30 ? "Ratio optimal" : percentage <= 50 ? "Ratio acceptable" : "Ratio élevé",
    footerDescription: "Pourcentage des revenus",
    dataKey: "totalChargesFixes",
  },
  {
    title: "Charge Variable",
    valueFormatter: formatCurrency,
    percentageCalculator: (props) => props.pourcentageChargesVariables ?? 0,
    isPositiveCalculator: (percentage) => percentage <= 50, // Considéré positif si ≤ 50% des revenus
    footerTextCalculator: (percentage) => 
      percentage <= 30 ? "Ratio optimal" : percentage <= 50 ? "Ratio acceptable" : "Ratio élevé",
    footerDescription: "Pourcentage des revenus",
    dataKey: "totalChargesVariables",
  },
]

export type { CardConfig }

