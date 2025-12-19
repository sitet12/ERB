// resources/js/pages/dashboard.tsx
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { adminBreadcrumbs } from '@/features/partager/lib/adminBreadcrumbs';
import { DashboardStatCard } from "@/features/dashboard/components/cards/dashboard-stat-card"
import { dashboardCardsConfig } from "@/features/dashboard/config/cards"
import type { DashboardProps } from "@/features/dashboard/types/dashboard"
import { BeneficeChartArea } from "@/features/dashboard/components/chart/chart-area"
import { RevenusPieChart } from "@/features/dashboard/components/chart/revenus-pie-chart"

interface Props extends DashboardProps {}

export default function Page(props: Props) {
  const {
    totalBenefice = 0,
    totalClients = 0,
    margeBeneficiaire = null,
    pourcentageClients = 0,
  } = props

  // Générer les cartes à partir de la configuration
  const cards = dashboardCardsConfig.map((config) => {
    const value = props[config.dataKey] ?? 0
    const percentage = config.percentageCalculator(props)
    
    return {
      title: config.title,
      value: config.valueFormatter(value as number),
      percentage,
      isPositive: config.isPositiveCalculator(percentage),
      footerText: config.footerTextCalculator(percentage),
      footerDescription: config.footerDescription,
    }
  })

  return (
    <AppLayout breadcrumbs={adminBreadcrumbs.dashboard.index()}>
      <Head title="Dashboard" />
      
      <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-3 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:px-6">
          {cards.map((card) => (
            <DashboardStatCard
              key={card.title}
              title={card.title}
              value={card.value}
              percentage={card.percentage}
              isPositive={card.isPositive}
              footerText={card.footerText}
              footerDescription={card.footerDescription}
            />
          ))}
        </div>
        
        {/* Graphique de comparaison bénéfice */}
        <div className="px-4 lg:px-6">
          <div className="grid grid-cols-10 gap-4">
            {/* Graphique - 70% */}
            <div className="col-span-10 lg:col-span-7">
              <BeneficeChartArea data={props.beneficeChart} />
            </div>
            {/* Graphique en camembert - 30% */}
            <div className="col-span-10 lg:col-span-3">
              <RevenusPieChart data={props.revenusPieChart} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}