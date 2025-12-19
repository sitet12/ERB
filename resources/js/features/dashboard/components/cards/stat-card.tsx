// resources/js/features/dashboard/components/cards/stat-card.tsx
import { TrendingDown, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatCurrency } from "@/features/partager/utils/currency-formatters"

interface StatCardProps {
  title: string
  value: number
  percentage?: number
  footer?: string
  valueFormatter?: (value: number) => string
  percentageFormatter?: (percentage: number) => string
}

export function StatCard({
  title,
  value,
  percentage,
  footer,
  valueFormatter = formatCurrency,
  percentageFormatter = (p) => `${p >= 0 ? '+' : ''}${p.toFixed(1)}%`,
}: StatCardProps) {
  const isPositive = percentage !== undefined ? percentage >= 0 : true
  const Icon = isPositive ? TrendingUp : TrendingDown

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {valueFormatter(value)}
        </CardTitle>
        {percentage !== undefined && (
          <div className="flex justify-end">
            <Badge variant={isPositive ? "default" : "destructive"}>
              <Icon className="h-4 w-4 mr-1" />
              {percentageFormatter(percentage)}
            </Badge>
          </div>
        )}
      </CardHeader>
      {footer && (
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {isPositive ? 'En hausse' : 'En baisse'} ce mois <Icon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {footer}
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

