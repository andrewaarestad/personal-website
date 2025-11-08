import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const featureCardVariants = cva(
  "rounded-xl transition-colors",
  {
    variants: {
      background: {
        "gradient-primary": "bg-gradient-to-br from-brand-light/30 via-brand-secondary-light/30 to-highlight-light/30",
        "gradient-reverse": "bg-gradient-to-br from-brand-secondary-light/30 via-highlight-light/30 to-brand-light/30",
        "gradient-subtle": "bg-gradient-to-br from-gradient-brand-subtle via-canvas to-gradient-brand-secondary-subtle",
        surface: "bg-surface",
        canvas: "bg-canvas",
      },
      border: {
        none: "",
        light: "border border-border-default",
        default: "border-2 border-border-default",
        brand: "border-2 border-border-default hover:border-brand",
        info: "border-2 border-border-default hover:border-brand-secondary",
        highlight: "border-2 border-border-default hover:border-highlight",
      },
      padding: {
        compact: "p-6",
        default: "p-8",
        spacious: "p-10",
      },
    },
    defaultVariants: {
      background: "gradient-primary",
      border: "default",
      padding: "default",
    },
  }
)

export interface FeatureCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof featureCardVariants> {}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ className, background, border, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(featureCardVariants({ background, border, padding, className }))}
        {...props}
      />
    )
  }
)
FeatureCard.displayName = "FeatureCard"

export { FeatureCard, featureCardVariants }
