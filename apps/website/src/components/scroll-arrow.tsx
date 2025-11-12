"use client";

import { useEffect, useState } from "react";

interface ScrollArrowProps {
  /**
   * Minimum viewport height (in pixels) required for the arrow to show.
   * This ensures the arrow only appears when there's likely to be blank space.
   */
  minViewportHeight?: number;
}

export function ScrollArrow({ minViewportHeight = 700 }: ScrollArrowProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if viewport is tall enough that blank space would be visible
    const shouldShow = window.innerHeight >= minViewportHeight;
    setIsVisible(shouldShow);

    if (!shouldShow) return;

    // Hide arrow on first scroll
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [minViewportHeight]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce pointer-events-none transition-opacity duration-500"
      aria-hidden="true"
    >
      <svg
        className="w-6 h-6 text-brand"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div>
  );
}
