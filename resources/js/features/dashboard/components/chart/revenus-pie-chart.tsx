"use client"

import { useMemo } from "react"
import { Pie, PieChart, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { RevenusPieChart } from "@/features/dashboard/types/dashboard"
import { formatCurrency } from "@/features/partager/utils/currency-formatters"

const chartConfig = {
  paye: {
    label: "Payé",
    color: "oklch(0.696 0.17 162.48)", // Vert pour payé (chart-2)
  },
  impaye: {
    label: "Impayé",
    color: "oklch(0.646 0.222 41.116)", // Orange/rouge pour impayé (chart-1)
  },
} satisfies ChartConfig

interface RevenusPieChartProps {
  data?: RevenusPieChart
}

export function RevenusPieChart({ data }: RevenusPieChartProps) {
  const chartData = useMemo(() => {
    if (!data || data.total === 0) return []
    
    return [
      {
        status: "paye",
        montant: data.paye,
        fill: "var(--color-paye)",
      },
      {
        status: "impaye",
        montant: data.impaye,
        fill: "var(--color-impaye)",
      },
    ]
  }, [data])

  if (!data || data.total === 0) {
    return (
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Revenus par Statut</CardTitle>
          <CardDescription>Aucune donnée disponible</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const pourcentagePaye = data.total > 0 ? ((data.paye / data.total) * 100).toFixed(1) : "0"
  const pourcentageImpaye = data.total > 0 ? ((data.impaye / data.total) * 100).toFixed(1) : "0"

  return (
    <Card className="@container/card">
      <CardHeader className="items-center pb-0">
        <CardTitle>Revenus par Statut</CardTitle>
        <CardDescription>Répartition des revenus</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => formatCurrency(Number(value))}
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="montant"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ status, montant }) => {
                const percentage = status === "paye" ? pourcentagePaye : pourcentageImpaye
                return `${chartConfig[status as keyof typeof chartConfig]?.label}: ${percentage}%`
              }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        {/* Légende avec cercles colorés */}
        <div className="flex items-center justify-center gap-4 mt-2 pt-2 border-t">
          {Object.entries(chartConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: config.color }}
              />
              <span 
                className="text-xs font-medium"
                style={{ color: config.color }}
              >
                {config.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[var(--color-paye)]" />
            <span className="text-xs">
              Payé: {formatCurrency(data.paye)} ({pourcentagePaye}%)
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[var(--color-impaye)]" />
            <span className="text-xs">
              Impayé: {formatCurrency(data.impaye)} ({pourcentageImpaye}%)
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

