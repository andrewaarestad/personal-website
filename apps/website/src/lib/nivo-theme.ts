/**
 * Shared Nivo chart theme matching the Electric Modern design system
 *
 * This theme ensures all charts across the site have consistent:
 * - Typography (Inter font family)
 * - Colors (matching brand palette, adapts to light/dark mode)
 * - Spacing and sizing
 * - Grid and axis styling
 *
 * Usage:
 * ```tsx
 * 'use client'
 * import { useTheme } from 'next-themes';
 * import { getNivoTheme } from "@/lib/nivo-theme";
 *
 * function MyChart() {
 *   const { resolvedTheme } = useTheme();
 *   const theme = getNivoTheme(resolvedTheme === 'dark');
 *   return <ResponsiveLine theme={theme} ... />
 * }
 * ```
 */
export function getNivoTheme(isDark: boolean) {
  return {
    // Typography - Match Inter font from design system
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    fontSize: 14,
    textColor: isDark ? "#9CA3AF" : "#6B7280", // text-secondary

    // Background
    background: "transparent",

    // Axis styling
    axis: {
      domain: {
        line: {
          stroke: isDark ? "#2D333A" : "#E5E7EB", // border-light
          strokeWidth: 1,
        },
      },
      ticks: {
        line: {
          stroke: isDark ? "#2D333A" : "#E5E7EB", // border-light
          strokeWidth: 1,
        },
        text: {
          fill: isDark ? "#9CA3AF" : "#6B7280", // text-secondary
          fontSize: 12,
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        },
      },
      legend: {
        text: {
          fill: isDark ? "#E5E7EB" : "#1A1A1A", // text-primary
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        },
      },
    },

    // Grid styling
    grid: {
      line: {
        stroke: isDark ? "#2D333A" : "#E5E7EB", // border-light
        strokeWidth: 1,
        strokeDasharray: "4 4", // Subtle dashed grid
      },
    },

    // Legends
    legends: {
      text: {
        fill: isDark ? "#E5E7EB" : "#1A1A1A", // text-primary
        fontSize: 14,
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      },
      ticks: {
        line: {
          stroke: isDark ? "#2D333A" : "#E5E7EB",
          strokeWidth: 1,
        },
        text: {
          fill: isDark ? "#9CA3AF" : "#6B7280",
          fontSize: 12,
        },
      },
    },

    // Tooltip styling
    tooltip: {
      container: {
        background: isDark ? "#1A1F25" : "#FFFFFF", // card surface
        color: isDark ? "#E5E7EB" : "#1A1A1A", // text-primary
        fontSize: 14,
        borderRadius: "0.5rem", // --radius
        boxShadow: isDark
          ? "0 10px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.3)"
          : "0 10px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        padding: "12px 16px",
        border: isDark ? "1px solid #2D333A" : "1px solid #E5E7EB", // border-light
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      },
      basic: {
        whiteSpace: "pre-wrap",
        display: "flex",
        alignItems: "center",
      },
      chip: {
        marginRight: 8,
      },
      table: {},
      tableCell: {
        padding: "4px 8px",
      },
      tableCellValue: {
        fontWeight: 600,
      },
    },

    // Labels
    labels: {
      text: {
        fill: isDark ? "#E5E7EB" : "#1A1A1A", // text-primary
        fontSize: 12,
        fontWeight: 600,
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      },
    },

    // Dots
    dots: {
      text: {
        fill: isDark ? "#E5E7EB" : "#1A1A1A",
        fontSize: 12,
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      },
    },

    // Markers
    markers: {
      lineColor: isDark ? "#2D333A" : "#E5E7EB",
      lineStrokeWidth: 1,
      text: {
        fill: isDark ? "#E5E7EB" : "#1A1A1A",
        fontSize: 12,
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      },
    },

    // Annotations
    annotations: {
      text: {
        fill: isDark ? "#E5E7EB" : "#1A1A1A",
        fontSize: 12,
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        outlineWidth: 2,
        outlineColor: isDark ? "#1A1F25" : "#FFFFFF",
      },
      link: {
        stroke: isDark ? "#2D333A" : "#E5E7EB",
        strokeWidth: 1,
        outlineWidth: 2,
        outlineColor: isDark ? "#1A1F25" : "#FFFFFF",
      },
      outline: {
        stroke: isDark ? "#2D333A" : "#E5E7EB",
        strokeWidth: 2,
        outlineWidth: 2,
        outlineColor: isDark ? "#1A1F25" : "#FFFFFF",
      },
      symbol: {
        fill: isDark ? "#2D333A" : "#E5E7EB",
        outlineWidth: 2,
        outlineColor: isDark ? "#1A1F25" : "#FFFFFF",
      },
    },
  };
}

/**
 * Brand color palette for chart data series
 * Use these for consistent, accessible data visualization
 */
export const chartColors = {
  // Primary brand colors
  brand: "#EF4444", // Bright Red
  brandSecondary: "#06B6D4", // Cyan
  highlight: "#84CC16", // Lime

  // Semantic colors
  success: "#10B981", // Success green
  warning: "#F59E0B", // Warning orange
  error: "#EF4444", // Error red
  info: "#3B82F6", // Info blue

  // Extended palette for multi-series charts
  palette: [
    "#06B6D4", // Cyan - primary for most charts
    "#EF4444", // Red
    "#84CC16", // Lime
    "#10B981", // Green
    "#F59E0B", // Orange
    "#3B82F6", // Blue
    "#8B5CF6", // Purple
    "#EC4899", // Pink
  ],
};

/**
 * Common motion config for smooth, polished animations
 * Matches the site's 600ms fadeInUp animations
 */
export const chartMotionConfig = {
  mass: 1,
  tension: 170,
  friction: 26,
  clamp: false,
  precision: 0.01,
  velocity: 0,
} as const;
