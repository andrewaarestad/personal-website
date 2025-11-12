'use client'

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * Theme provider with system preference detection
 *
 * Features:
 * - Respects system preference (light/dark)
 * - Falls back to light mode if system preference unavailable
 * - Allows manual theme selection (light/dark/system)
 * - Persists user's choice in localStorage
 * - Prevents flash of unstyled content (FOUC)
 */
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
