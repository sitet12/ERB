import { TrendingDown, TrendingUp } from "lucide-react"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DashboardPercentageBadge } from "@/features/dashboard/components/badge/card_badge"

interface DashboardStatCardProps {
  title: string
  value: string
  percentage: number
  isPositive: boolean
  footerText: string
  footerDescription: string
}

export function DashboardStatCard({
  title,
  value,
  percentage,
  isPositive,
  footerText,
  footerDescription,
}: DashboardStatCardProps) {
  const Icon = isPositive ? TrendingUp : TrendingDown

  return (
    <Card className="@container/card flex flex-col h-full">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardDescription className="text-xs mb-1">{title}</CardDescription>
            <CardTitle className="text-lg font-semibold tabular-nums leading-tight min-h-[2.5rem]">
              {value}
            </CardTitle>
          </div>
          <CardAction className="mt-0 flex-shrink-0">
            <DashboardPercentageBadge
              percentage={percentage}
              isPositive={isPositive}
            />
          </CardAction>
        </div>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 pt-2 pb-3 mt-auto">
        <div className="line-clamp-1 flex gap-1.5 text-xs font-medium">
          {footerText} <Icon className="size-3" />
        </div>
        <div className="text-muted-foreground text-xs">
          {footerDescription}
        </div>
      </CardFooter>
    </Card>
  )
}

