"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Breadcrumb() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY.current;

      // Always show at the very top
      if (currentScrollY < 10) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Add tolerance: only hide/show after scrolling 5px in a direction
      if (Math.abs(scrollDifference) > 5) {
        if (scrollDifference > 0) {
          // Scrolling down - hide
          setIsVisible(false);
        } else {
          // Scrolling up - show
          setIsVisible(true);
        }
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      className={cn(
        "fixed top-0 left-0 right-0 z-40 flex items-center gap-2 text-body-sm px-6 py-4 bg-canvas/80 backdrop-blur-sm border-b border-border-light",
        "transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
      aria-label="Breadcrumb"
    >
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
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
