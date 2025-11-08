"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at the very top
      if (currentScrollY < 10) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Show when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      {/* Brand accent line */}
      <div className="h-[1px] bg-brand" aria-hidden="true" />

      {/* Navigation bar */}
      <div className="bg-surface/80 backdrop-blur-md border-b border-border-light">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Site name */}
            <Link
              href="/"
              className="text-h6 font-bold text-black hover:text-brand transition-colors"
            >
              Andrew Aarestad
            </Link>

            {/* Navigation links */}
            <ul className="flex items-center gap-8">
              <li>
                <Link
                  href="/"
                  className="text-body text-text-secondary hover:text-black transition-colors relative group"
                >
                  Home
                  <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-brand scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-body text-text-secondary hover:text-black transition-colors relative group"
                >
                  Projects
                  <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-brand scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              </li>
              <li>
                <Link
                  href="/design-process"
                  className="text-body text-text-secondary hover:text-black transition-colors relative group"
                >
                  Design Process
                  <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-brand scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
