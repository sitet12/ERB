import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full text-xs font-bold text-white shadow-md backdrop-blur-sm whitespace-nowrap shrink-0 [&>svg]:pointer-events-none transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        // Partner type variants
        client: "bg-emerald-600 shadow-emerald-200",
        entreprise: "bg-blue-600 shadow-blue-200",
        fournisseur: "bg-orange-500 shadow-orange-200",
        // Count/Movement badges
        count: "bg-slate-600 shadow-slate-200",
        articles: "bg-blue-600 shadow-blue-200",
        stockReel:
          "bg-emerald-200 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800",
        // Dashboard percentage variants
        positive:
          "border-green-500 text-green-700 bg-green-50 dark:bg-green-950 dark:text-green-400 dark:border-green-600", // Couleur sémantique (succès) - pas d'équivalent dans le thème
        negative:
          "border-destructive text-destructive bg-destructive/10 dark:bg-destructive/20 dark:text-destructive", // Utilise la variable de thème
      },
      size: {
        default: "px-3 py-1 gap-1.5 [&>svg]:size-[10px]",
        small: "px-2 py-0.5 gap-1 [&>svg]:size-[8px] text-[10px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
