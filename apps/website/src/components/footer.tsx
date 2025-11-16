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
          <div className="text-body-sm text-text-secondary text-center sm:text-left">
            <p>© {currentYear} Andrew Aarestad</p>
            <p className="text-text-tertiary text-xs mt-1">
              Code:{" "}
              <a
                href="https://github.com/andrewaarestad/personal-website/blob/main/LICENSE"
                className="underline hover:text-text-secondary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                MIT License
              </a>
              {" · "}Content & design reserved
            </p>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-body-sm text-text-tertiary hidden sm:inline">Theme:</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
