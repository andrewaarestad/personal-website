import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const pageContainerVariants = cva("container mx-auto px-6", {
  variants: {
    size: {
      narrow: "max-w-2xl",
      medium: "max-w-3xl",
      wide: "max-w-5xl",
      full: "max-w-7xl",
    },
  },
  defaultVariants: {
    size: "wide",
  },
});

export interface PageContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageContainerVariants> {}

const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  ({ className, size, ...props }, ref) => {
    return <div ref={ref} className={cn(pageContainerVariants({ size, className }))} {...props} />;
  }
);
PageContainer.displayName = "PageContainer";

export { PageContainer, pageContainerVariants };
