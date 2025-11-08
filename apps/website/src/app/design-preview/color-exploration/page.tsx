import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import { PageContainer } from "@/components/ui/page-container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Color Palette Exploration | Design Preview",
  description: "Exploring alternative color palette options for the design system",
};

type ColorPalette = {
  name: string;
  description: string;
  primary: { name: string; hex: string };
  secondary: { name: string; hex: string };
  tertiary: { name: string; hex: string };
};

const palettes: ColorPalette[] = [
  {
    name: "Initial Exploration",
    description: "Our first exploration - bold vermillion, trustworthy blue, creative gold",
    primary: { name: "Vermillion", hex: "#E63946" },
    secondary: { name: "True Blue", hex: "#1D70B8" },
    tertiary: { name: "Golden Yellow", hex: "#F7B32B" },
  },
  {
    name: "Nature's Studio",
    description: "Swap gold for emerald - bringing nature indoors while keeping the energy",
    primary: { name: "Vermillion", hex: "#E63946" },
    secondary: { name: "True Blue", hex: "#1D70B8" },
    tertiary: { name: "Emerald", hex: "#10B981" },
  },
  {
    name: "Ocean Breeze",
    description: "Softer coral with refreshing teal - lighter, more playful feel",
    primary: { name: "Coral", hex: "#FF6B6B" },
    secondary: { name: "Teal", hex: "#20C997" },
    tertiary: { name: "Sunset Gold", hex: "#FFB84D" },
  },
  {
    name: "Deep & Rich",
    description: "Sophisticated burgundy and navy - more formal, premium feeling",
    primary: { name: "Burgundy", hex: "#9B2C2C" },
    secondary: { name: "Navy", hex: "#1E3A8A" },
    tertiary: { name: "Amber", hex: "#D97706" },
  },
  {
    name: "Electric Modern",
    description: "High energy with cyan and lime - very contemporary, tech-forward",
    primary: { name: "Bright Red", hex: "#EF4444" },
    secondary: { name: "Cyan", hex: "#06B6D4" },
    tertiary: { name: "Lime", hex: "#84CC16" },
  },
  {
    name: "Warm Earth",
    description: "Grounded rust with natural tones - organic, approachable feel",
    primary: { name: "Rust", hex: "#C2410C" },
    secondary: { name: "Slate", hex: "#475569" },
    tertiary: { name: "Sage", hex: "#84A98C" },
  },
  {
    name: "Bold Primary",
    description: "True primary colors - confident, clear, classic",
    primary: { name: "Crimson", hex: "#DC2626" },
    secondary: { name: "Cobalt", hex: "#2563EB" },
    tertiary: { name: "Sunflower", hex: "#FACC15" },
  },
  {
    name: "Sophisticated Studio",
    description: "Wine red with indigo and champagne - elegant, refined aesthetic",
    primary: { name: "Wine", hex: "#991B1B" },
    secondary: { name: "Indigo", hex: "#4F46E5" },
    tertiary: { name: "Champagne", hex: "#FDE68A" },
  },
  {
    name: "Vibrant Energy",
    description: "Orange-red with electric blue - maximum energy and excitement",
    primary: { name: "Orange Red", hex: "#FF5733" },
    secondary: { name: "Electric Blue", hex: "#3B82F6" },
    tertiary: { name: "Citron", hex: "#BEF264" },
  },
  {
    name: "Balanced Neutral",
    description: "Muted tones with brick and olive - professional, balanced approach",
    primary: { name: "Brick Red", hex: "#B91C1C" },
    secondary: { name: "Steel Blue", hex: "#475569" },
    tertiary: { name: "Olive", hex: "#A3A380" },
  },
];

export default function ColorExplorationPage() {
  return (
    <main className="min-h-screen bg-canvas">
      {/* Header */}
      <Section className="bg-surface border-b border-border-light">
        <PageContainer>
          <Link
            href="/"
            className="text-text-secondary no-underline text-body-sm mb-2 inline-block hover:text-text-primary"
          >
            ← Back to Home
          </Link>
          <h1 className="text-h1 font-extrabold text-black mb-2">
            Color Palette Exploration
          </h1>
          <p className="text-body-lg text-text-secondary max-w-2xl">
            Exploring alternative color combinations for the design system. The
            active theme uses semantic component variants, while explorations
            below show alternative color options.
          </p>
        </PageContainer>
      </Section>

      {/* Current Active Theme - Uses Real Component System */}
      <Section>
        <PageContainer>
          <div className="mb-8">
            <h2 className="text-h3 font-bold text-black mb-2">Current Active Theme</h2>
            <p className="text-body text-text-secondary max-w-3xl mb-8">
              This section uses the actual shared component system with semantic
              variant names. If theme colors change in tailwind.config.ts, these
              components will automatically reflect the new colors.
            </p>
          </div>

          <FeatureCard className="mb-8">
            <h3 className="text-h5 font-bold text-black mb-4">
              Semantic Component Variants
            </h3>
            <p className="text-body text-text-secondary mb-6">
              These buttons use semantic variants (brand, info, highlight, emphasis)
              that map to the current theme colors. Change the theme, and these
              update automatically.
            </p>

            <div className="flex gap-3 mb-6 flex-wrap">
              <Button variant="brand" size="lg">Brand (Primary)</Button>
              <Button variant="info" size="lg">Info (Secondary)</Button>
              <Button variant="highlight" size="lg">Highlight (Tertiary)</Button>
              <Button variant="emphasis" size="lg">Emphasis (Contrast)</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FeatureCard background="surface" border="brand" padding="compact">
                <h4 className="text-h6 font-semibold text-black mb-2">Brand Accent</h4>
                <p className="text-body-sm text-text-secondary">
                  Primary brand color for key actions
                </p>
              </FeatureCard>

              <FeatureCard background="surface" border="info" padding="compact">
                <h4 className="text-h6 font-semibold text-black mb-2">Info Accent</h4>
                <p className="text-body-sm text-text-secondary">
                  Secondary color for informational elements
                </p>
              </FeatureCard>

              <FeatureCard background="surface" border="highlight" padding="compact">
                <h4 className="text-h6 font-semibold text-black mb-2">Highlight Accent</h4>
                <p className="text-body-sm text-text-secondary">
                  Tertiary color for highlights and accents
                </p>
              </FeatureCard>
            </div>
          </FeatureCard>
        </PageContainer>
      </Section>

      {/* Divider */}
      <div className="border-t border-border-light" />

      {/* Exploratory Palettes Header */}
      <Section className="pt-12">
        <PageContainer>
          <h2 className="text-h3 font-bold text-black mb-2">
            Exploratory Color Variations
          </h2>
          <p className="text-body text-text-secondary max-w-3xl mb-8">
            These are alternative color palette explorations using inline styles.
            They show different color combinations we've considered but haven't
            integrated into the component system yet.
          </p>
        </PageContainer>
      </Section>

      {/* Palettes Grid */}
      <Section spacing="small">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {palettes.map((palette, index) => (
              <PaletteCard key={index} palette={palette} index={index + 1} />
            ))}
          </div>
        </PageContainer>
      </Section>

      {/* Footer Note */}
      <Section className="border-t border-border-light">
        <PageContainer>
          <p className="text-body-sm text-text-secondary text-center">
            Exploratory palettes use inline styles for rapid iteration. The
            Current Active Theme section above uses the production component
            system and will update automatically when theme colors change.
          </p>
        </PageContainer>
      </Section>
    </main>
  );
}

function PaletteCard({
  palette,
  index,
}: {
  palette: ColorPalette;
  index: number;
}) {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #D1D5DB",
        borderRadius: "0.75rem",
        padding: "2rem",
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "#9CA3AF",
              letterSpacing: "0.05em",
            }}
          >
            OPTION {index}
          </span>
        </div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#1A1A1A",
            marginBottom: "0.5rem",
          }}
        >
          {palette.name}
        </h2>
        <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>
          {palette.description}
        </p>
      </div>

      {/* Color Swatches */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0.75rem",
          marginBottom: "1.5rem",
        }}
      >
        <ColorSwatch
          name={palette.primary.name}
          hex={palette.primary.hex}
          label="Primary"
        />
        <ColorSwatch
          name={palette.secondary.name}
          hex={palette.secondary.hex}
          label="Secondary"
        />
        <ColorSwatch
          name={palette.tertiary.name}
          hex={palette.tertiary.hex}
          label="Tertiary"
        />
      </div>

      {/* Example Components */}
      <div style={{ marginTop: "1.5rem" }}>
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: "600",
            color: "#6B7280",
            marginBottom: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Component Preview
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "1rem",
            flexWrap: "wrap",
          }}
        >
          <button
            style={{
              backgroundColor: palette.primary.hex,
              color: "#FFFFFF",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "none",
              fontSize: "0.875rem",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Primary
          </button>
          <button
            style={{
              backgroundColor: palette.secondary.hex,
              color: "#FFFFFF",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "none",
              fontSize: "0.875rem",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Secondary
          </button>
          <button
            style={{
              backgroundColor: "#FFFFFF",
              color: "#1A1A1A",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: `1px solid ${palette.primary.hex}`,
              fontSize: "0.875rem",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Outline
          </button>
        </div>

        {/* Mini Card Example */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "0.5rem",
            padding: "1rem",
          }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              color: "#1A1A1A",
              marginBottom: "0.5rem",
            }}
          >
            Example Card
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#6B7280",
              marginBottom: "0.75rem",
            }}
          >
            This shows how the palette works in a realistic component.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-block",
                backgroundColor: `${palette.secondary.hex}20`,
                color: palette.secondary.hex,
                padding: "0.25rem 0.75rem",
                borderRadius: "0.25rem",
                fontSize: "0.75rem",
                fontWeight: "600",
              }}
            >
              Tag 1
            </span>
            <span
              style={{
                display: "inline-block",
                backgroundColor: `${palette.primary.hex}20`,
                color: palette.primary.hex,
                padding: "0.25rem 0.75rem",
                borderRadius: "0.25rem",
                fontSize: "0.75rem",
                fontWeight: "600",
              }}
            >
              Tag 2
            </span>
            <span
              style={{
                display: "inline-block",
                backgroundColor: `${palette.tertiary.hex}20`,
                color: palette.tertiary.hex,
                padding: "0.25rem 0.75rem",
                borderRadius: "0.25rem",
                fontSize: "0.75rem",
                fontWeight: "600",
              }}
            >
              Tag 3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorSwatch({
  name,
  hex,
  label,
}: {
  name: string;
  hex: string;
  label: string;
}) {
  return (
    <div>
      <div
        style={{
          backgroundColor: hex,
          borderRadius: "0.5rem",
          height: "4rem",
          marginBottom: "0.5rem",
          border: "1px solid rgba(0,0,0,0.1)",
        }}
      />
      <div
        style={{
          fontSize: "0.75rem",
          fontWeight: "600",
          color: "#6B7280",
          marginBottom: "0.125rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "0.875rem",
          fontWeight: "600",
          color: "#1A1A1A",
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontSize: "0.75rem",
          fontFamily: "monospace",
          color: "#6B7280",
        }}
      >
        {hex}
      </div>
    </div>
  );
}
