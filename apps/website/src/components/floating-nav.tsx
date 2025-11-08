"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Overlay - click to close */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Floating navigation */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Navigation menu */}
        <div
          className={cn(
            "absolute bottom-20 right-0 bg-surface border border-border-default rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-out origin-bottom-right",
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-2 pointer-events-none"
          )}
        >
          <nav className="p-2 min-w-[200px]">
            <Link
              href="/"
              onClick={closeMenu}
              className="block px-4 py-3 text-body text-text-primary hover:bg-gradient-to-r hover:from-brand-light/30 hover:to-transparent rounded-lg transition-colors"
            >
              Home
            </Link>
            <Link
              href="/projects"
              onClick={closeMenu}
              className="block px-4 py-3 text-body text-text-primary hover:bg-gradient-to-r hover:from-brand-light/30 hover:to-transparent rounded-lg transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/design-process"
              onClick={closeMenu}
              className="block px-4 py-3 text-body text-text-primary hover:bg-gradient-to-r hover:from-brand-light/30 hover:to-transparent rounded-lg transition-colors"
            >
              Design Process
            </Link>
          </nav>
        </div>

        {/* Floating button */}
        <button
          onClick={toggleMenu}
          className="w-14 h-14 bg-brand hover:bg-brand-dark text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group relative"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          {/* Menu icon - animated hamburger */}
          <div className="relative w-5 h-5">
            <span
              className={cn(
                "absolute left-0 w-5 h-0.5 bg-white transition-all duration-300",
                isOpen ? "top-2.5 rotate-45" : "top-1"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-2.5 w-5 h-0.5 bg-white transition-all duration-300",
                isOpen ? "opacity-0" : "opacity-100"
              )}
            />
            <span
              className={cn(
                "absolute left-0 w-5 h-0.5 bg-white transition-all duration-300",
                isOpen ? "top-2.5 -rotate-45" : "top-4"
              )}
            />
          </div>

          {/* Brand accent ring on hover */}
          <div className="absolute inset-0 rounded-full border-2 border-brand-secondary opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-125 transition-all duration-300" />
        </button>
      </div>
    </>
  );
}
