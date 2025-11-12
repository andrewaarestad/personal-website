'use client'

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

/**
 * Theme provider with time-based dark mode switching
 *
 * Features:
 * - Respects system preference (via "system" theme option)
 * - Time-based auto-switching: dark mode from 6pm-6am, light mode from 6am-6pm
 * - Persists user's manual theme selection (light/dark override)
 * - Prevents flash of unstyled content (FOUC)
 *
 * Time-based logic:
 * - When theme is "system", automatically switches based on time of day
 * - Dark mode: 6pm (18:00) to 6am (06:00)
 * - Light mode: 6am (06:00) to 6pm (18:00)
 * - If user manually selects light or dark, their choice is preserved
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
      <TimeBasedThemeSync />
      {children}
    </NextThemesProvider>
  )
}

/**
 * Internal component that syncs theme based on time of day
 * Only runs when theme is set to "system" to respect user preferences
 */
function TimeBasedThemeSync() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Wait for hydration to prevent mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!mounted) return

    // Only apply time-based switching if using system theme
    if (theme !== 'system') return

    const updateThemeBasedOnTime = () => {
      const hour = new Date().getHours()
      // Dark mode: 6pm (18) to 6am (6)
      // Light mode: 6am (6) to 6pm (18)
      const shouldBeDark = hour >= 18 || hour < 6
      const preferredTheme = shouldBeDark ? 'dark' : 'light'

      // Only update if different from system theme to avoid unnecessary re-renders
      if (preferredTheme !== systemTheme) {
        // Set the theme directly based on time
        // This overrides system preference with time-based preference
        setTheme(preferredTheme)
      }
    }

    // Check immediately
    updateThemeBasedOnTime()

    // Check every minute to catch time changes
    const interval = setInterval(updateThemeBasedOnTime, 60000)

    return () => clearInterval(interval)
  }, [mounted, theme, systemTheme, setTheme])

  return null
}
