import { TrendingDown, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface DashboardPercentageBadgeProps {
  percentage: number
  isPositive: boolean
}

export function DashboardPercentageBadge({
  percentage,
  isPositive,
}: DashboardPercentageBadgeProps) {
  const Icon = isPositive ? TrendingUp : TrendingDown

  return (
    <Badge variant={isPositive ? "positive" : "negative"} size="small">
      <Icon className="h-3 w-3 mr-0.5" />
      {isPositive ? '+' : ''}{percentage.toFixed(1)}%
    </Badge>
  )
}
