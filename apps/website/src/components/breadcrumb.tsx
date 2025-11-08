"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Breadcrumb() {
  const pathname = usePathname();

  // Don't show on homepage
  if (pathname === "/") {
    return null;
  }

  // Parse pathname into breadcrumb segments
  const segments = pathname.split("/").filter(Boolean);

  // Build breadcrumb trail
  const breadcrumbs = [
    { label: "Home", href: "/" },
    ...segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      // Convert slug to readable label
      const label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return { label, href };
    }),
  ];

  return (
    <nav
      className="fixed top-6 left-6 z-40 flex items-center gap-2 text-body-sm"
      aria-label="Breadcrumb"
    >
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <div key={crumb.href} className="flex items-center gap-2">
            {isLast ? (
              <span className="text-text-secondary">{crumb.label}</span>
            ) : (
              <>
                <Link
                  href={crumb.href}
                  className={cn(
                    "text-text-primary hover:text-brand transition-colors font-medium",
                    "relative group"
                  )}
                >
                  {crumb.label}
                  <span className="absolute left-0 right-0 -bottom-0.5 h-[1px] bg-brand scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
                <span className="text-text-tertiary" aria-hidden="true">
                  /
                </span>
              </>
            )}
          </div>
        );
      })}
    </nav>
  );
}
