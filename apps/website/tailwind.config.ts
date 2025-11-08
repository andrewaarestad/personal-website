import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Font families (loaded via Google Fonts)
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      // Typography scale
      fontSize: {
        // Headings
        'h1': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'h2': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h3': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h4': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h5': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h6': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        // Body text
        'body-xl': ['1.25rem', { lineHeight: '1.6' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        // UI text
        'label': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '500' }],
        'label-sm': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '500' }],
        'code': ['0.875rem', { lineHeight: '1.6' }],
      },
      colors: {
        // shadcn/ui CSS variables (for compatibility)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },

        // Custom Design System Colors
        // Foundation
        canvas: '#FAFAFA',
        surface: '#FFFFFF',

        // Structure
        black: {
          DEFAULT: '#000000',
          accent: '#1A1A1A',
        },

        // Brand Theme Colors - Electric Modern Theme
        // Semantic names that map to current color choices
        brand: {
          light: '#FEE2E2',
          DEFAULT: '#EF4444',  // Currently: Bright Red
          dark: '#DC2626',
        },
        'brand-secondary': {
          light: '#CFFAFE',
          DEFAULT: '#06B6D4',  // Currently: Cyan
          dark: '#0891B2',
        },
        highlight: {
          light: '#ECFCCB',
          DEFAULT: '#84CC16',  // Currently: Lime
          dark: '#65A30D',
        },

        // Gradient-specific colors with explicit opacity for compatibility
        'gradient-brand-subtle': 'rgba(254, 226, 226, 0.1)',
        'gradient-brand-secondary-subtle': 'rgba(207, 250, 254, 0.1)',

        // Semantic
        success: {
          light: '#D1FAE5',
          DEFAULT: '#10B981',
        },
        error: {
          light: '#FEE2E2',
          DEFAULT: '#EF4444',
        },
        warning: {
          light: '#FEF3C7',
          DEFAULT: '#F59E0B',
        },
        info: {
          light: '#DBEAFE',
          DEFAULT: '#3B82F6',
        },

        // Text
        'text-primary': '#1A1A1A',
        'text-secondary': '#6B7280',
        'text-tertiary': '#9CA3AF',

        // Borders
        'border-light': '#E5E7EB',
        'border-default': '#D1D5DB',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
