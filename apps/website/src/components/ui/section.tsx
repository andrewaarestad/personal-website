import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      none: "",
      small: "py-8",
      medium: "py-16",
      large: "py-24",
    },
  },
  defaultVariants: {
    spacing: "medium",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing, ...props }, ref) => {
    return <section ref={ref} className={cn(sectionVariants({ spacing, className }))} {...props} />;
  }
);
Section.displayName = "Section";

export { Section, sectionVariants };
