"use client"

import { useMemo } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

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
import type { BeneficeChart } from "@/features/dashboard/types/dashboard"
import { formatCurrency } from "@/features/partager/utils/currency-formatters"

const chartConfig = {
  revenus: {
    label: "Revenus",
    color: "oklch(0.828 0.189 84.429)", // Vert/jaune clair pour revenus (positif)
  },
  charges: {
    label: "Charges",
    color: "oklch(0.646 0.222 41.116)", // Orange/rouge pour charges
  },
  benefice: {
    label: "Bénéfice",
    color: "oklch(0.6 0.118 184.704)", // Bleu/cyan pour bénéfice
  },
} satisfies ChartConfig

interface BeneficeChartAreaProps {
  data?: BeneficeChart
}

export function BeneficeChartArea({ data }: BeneficeChartAreaProps) {
  // Transformer les données pour le graphique
  const chartData = useMemo(() => {
    if (!data) return []
    
    return [
      {
        month: data.previous_month.month_label,
        revenus: data.previous_month.revenus,
        charges: data.previous_month.charges,
        benefice: data.previous_month.benefice,
      },
      {
        month: data.current_month.month_label,
        revenus: data.current_month.revenus,
        charges: data.current_month.charges,
        benefice: data.current_month.benefice,
      },
    ]
  }, [data])

  if (!data) {
    return (
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Comparaison Bénéfice</CardTitle>
          <CardDescription>Aucune donnée disponible</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const GrowthIcon = data.growth !== null && data.growth >= 0 ? TrendingUp : TrendingDown

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Comparaison Bénéfice</CardTitle>
        <CardDescription>
          {data.previous_month.month_label} - {data.current_month.month_label}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[180px] w-[95%] mx-auto">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => {
                // Extraire le mois (ex: "December 2025" -> "Dec")
                const parts = value.split(' ')
                return parts[0].slice(0, 3)
              }}
            />
            <ChartTooltip
              cursor={false}
              shared={false}
              content={
                <ChartTooltipContent
                  indicator="dashed"
                  formatter={(value) => formatCurrency(Number(value))}
                />
              }
            />
            <Bar dataKey="charges" fill="var(--color-charges)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => {
                  return `${Number(value).toLocaleString('fr-FR', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}`
                }}
              />
            </Bar>
            <Bar dataKey="revenus" fill="var(--color-revenus)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => {
                  return `${Number(value).toLocaleString('fr-FR', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}`
                }}
              />
            </Bar>
            <Bar dataKey="benefice" fill="var(--color-benefice)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => {
                  return `${Number(value).toLocaleString('fr-FR', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}`
                }}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
        {/* Légende avec cercles colorés */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t">
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
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {data.growth !== null && (
          <div className="flex gap-2 leading-none font-medium">
            {data.growth >= 0 ? 'Croissance' : 'Baisse'} de {Math.abs(data.growth).toFixed(1)}% ce mois
            <GrowthIcon className="h-4 w-4" />
          </div>
        )}
        <div className="text-muted-foreground leading-none">
          Comparaison des revenus et charges entre les deux mois
        </div>
      </CardFooter>
    </Card>
  )
}
