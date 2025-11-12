"use client";

import { ThemeToggle } from "@/components/theme-toggle";

/**
 * Global footer component
 *
 * Features:
 * - Copyright information
 * - Theme toggle (light/dark/system)
 * - Responsive layout
 * - Consistent with site design system
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border-light bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-body-sm text-text-secondary">
            © {currentYear} Andrew Aarestad. All rights reserved.
          </p>

          {/* Theme Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-body-sm text-text-tertiary hidden sm:inline">
              Theme:
            </span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
