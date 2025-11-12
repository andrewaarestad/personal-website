"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface MainContentProps {
  children: React.ReactNode;
}

/**
 * Wrapper component that adds top padding to account for the fixed breadcrumb navigation.
 * The breadcrumb is hidden on the homepage, so no padding is added there.
 * The padding ensures page content is never overlapped by the breadcrumb.
 */
export function MainContent({ children }: MainContentProps) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return (
    <div
      className={cn(
        // Add top padding on all pages except homepage to account for fixed breadcrumb
        // The breadcrumb has py-4 padding and text content, resulting in ~56px height
        !isHomepage && "pt-16"
      )}
    >
      {children}
    </div>
  );
}
