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
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      // Typography scale
      fontSize: {
        // Headings
        h1: ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
        h2: ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        h3: ["2rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "700" }],
        h4: ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        h5: ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
        h6: ["1.125rem", { lineHeight: "1.4", fontWeight: "600" }],
        // Body text
        "body-xl": ["1.25rem", { lineHeight: "1.6" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        // UI text
        label: ["0.875rem", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" }],
        "label-sm": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.02em", fontWeight: "500" }],
        code: ["0.875rem", { lineHeight: "1.6" }],
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

        // Custom Design System Colors - Now all reference CSS variables
        // Foundation (aliases for compatibility)
        canvas: "hsl(var(--background))",
        surface: "hsl(var(--card))",

        // Structure
        black: {
          DEFAULT: "hsl(var(--black))",
          accent: "hsl(var(--black-accent))",
        },

        // Brand Theme Colors - Electric Modern Theme
        // Semantic names that map to current color choices
        brand: {
          light: "hsl(var(--brand-light))",
          DEFAULT: "hsl(var(--brand))",
          dark: "hsl(var(--brand-dark))",
        },
        "brand-secondary": {
          light: "hsl(var(--brand-secondary-light))",
          DEFAULT: "hsl(var(--brand-secondary))",
          dark: "hsl(var(--brand-secondary-dark))",
        },
        highlight: {
          light: "hsl(var(--highlight-light))",
          DEFAULT: "hsl(var(--highlight))",
          dark: "hsl(var(--highlight-dark))",
        },

        // Gradient-specific colors with CSS variables
        "gradient-brand-subtle": "hsl(var(--gradient-brand-subtle))",
        "gradient-brand-secondary-subtle": "hsl(var(--gradient-brand-secondary-subtle))",

        // Semantic
        success: {
          light: "hsl(var(--success-light))",
          DEFAULT: "hsl(var(--success))",
        },
        error: {
          light: "hsl(var(--error-light))",
          DEFAULT: "hsl(var(--error))",
        },
        warning: {
          light: "hsl(var(--warning-light))",
          DEFAULT: "hsl(var(--warning))",
        },
        info: {
          light: "hsl(var(--info-light))",
          DEFAULT: "hsl(var(--info))",
        },

        // Text
        "text-primary": "hsl(var(--text-primary))",
        "text-secondary": "hsl(var(--text-secondary))",
        "text-tertiary": "hsl(var(--text-tertiary))",

        // Borders
        "border-light": "hsl(var(--border-light))",
        "border-default": "hsl(var(--border-default))",
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
