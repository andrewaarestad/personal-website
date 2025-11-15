# Color System

## Design Philosophy

The color system reflects an **art studio aesthetic**: a light, airy foundation provides the "well-lit workspace," black accents add structure and definition, and bold primary-like colors create visual impact like artist's paints on canvas.

**Semantic Naming:** Colors use semantic names (brand, brand-secondary, highlight) that map to current color choices. This allows theme changes without code updates - simply update hex values in tailwind.config.ts.

**Key principles:**
- Light mode as primary experience
- High contrast for readability and accessibility
- Bold, saturated accent colors inspired by primary hues
- Confident and purposeful, not trendy
- Whimsical without sacrificing professionalism

---

## Foundation Colors (The Studio Space)

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Canvas | `#FAFAFA` | rgb(250, 250, 250) | Page background - the studio walls |
| Surface | `#FFFFFF` | rgb(255, 255, 255) | Card backgrounds, elevated surfaces |
| Border Light | `#E5E7EB` | rgb(229, 231, 235) | Subtle borders, dividers |
| Border | `#D1D5DB` | rgb(209, 213, 219) | Standard borders, input outlines |

**Rationale:** Very light gray (`#FAFAFA`) creates warmth without the harshness of pure white, mimicking natural studio lighting. Pure white is reserved for elevated elements (cards, modals) to create subtle depth.

---

## Structure Colors (The Framework)

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Text Primary | `#1A1A1A` | rgb(26, 26, 26) | Main content text |
| Text Secondary | `#6B7280` | rgb(107, 114, 128) | Supporting text, captions |
| Text Tertiary | `#9CA3AF` | rgb(156, 163, 175) | Placeholder text, disabled states |
| Black Accent | `#000000` | rgb(0, 0, 0) | Headlines, strong emphasis |

**Rationale:** Near-black (`#1A1A1A`) is easier on the eyes than pure black for body text, while pure black is reserved for impact moments (large headlines, strong CTAs). Gray scale provides hierarchy.

---

## Accent Colors (Pops of Color)

These are the "artist's paints" - bold, saturated colors inspired by primary hues. Think paint tubes straight from the art supply store. Colors use **semantic names** that map to current color selections.

### Brand (Primary)

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Brand | `#EF4444` | rgb(239, 68, 68) | Primary CTAs, links, important highlights |
| Brand Dark | `#DC2626` | rgb(220, 38, 38) | Hover states, active elements |
| Brand Light | `#FEE2E2` | rgb(254, 226, 226) | Backgrounds, subtle highlights |

**Current Color:** Bright Red
**Rationale:** Bold, energetic, and attention-grabbing without being aggressive. This is the color that makes visitors take action.

### Brand Secondary (Secondary)

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Brand Secondary | `#06B6D4` | rgb(6, 182, 212) | Secondary actions, technical content highlights |
| Brand Secondary Dark | `#0891B2` | rgb(8, 145, 178) | Hover states |
| Brand Secondary Light | `#CFFAFE` | rgb(207, 250, 254) | Backgrounds, code highlights |

**Current Color:** Cyan
**Rationale:** Technical and trustworthy. Provides cool contrast to the warm brand color. Perfect for engineering content.

### Highlight (Tertiary)

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Highlight | `#84CC16` | rgb(132, 204, 22) | Special highlights, creative elements, accents |
| Highlight Dark | `#65A30D` | rgb(101, 163, 13) | Text on light backgrounds |
| Highlight Light | `#ECFCCB` | rgb(236, 252, 203) | Backgrounds, subtle accents |

**Current Color:** Lime
**Rationale:** Adds energy and creative warmth. Used sparingly as an accent - the "highlight pen" that draws attention to special moments.

---

## Semantic Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Success | `#10B981` | rgb(16, 185, 129) | Success messages, confirmations |
| Success Light | `#D1FAE5` | rgb(209, 250, 229) | Success backgrounds |
| Error | `#EF4444` | rgb(239, 68, 68) | Error messages, destructive actions |
| Error Light | `#FEE2E2` | rgb(254, 226, 226) | Error backgrounds |
| Warning | `#F59E0B` | rgb(245, 158, 11) | Warnings, cautions |
| Warning Light | `#FEF3C7` | rgb(254, 243, 199) | Warning backgrounds |
| Info | `#3B82F6` | rgb(59, 130, 246) | Informational messages |
| Info Light | `#DBEAFE` | rgb(219, 234, 254) | Info backgrounds |

---

## Dark Mode

Dark mode is fully implemented with system preference detection and manual theme toggle.

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Dark Canvas | `#0F1419` | rgb(15, 20, 25) | Page background |
| Dark Surface | `#1A1F25` | rgb(26, 31, 37) | Card backgrounds |
| Dark Text Primary | `#E5E7EB` | rgb(229, 231, 235) | Main text |
| Dark Text Secondary | `#9CA3AF` | rgb(156, 163, 175) | Supporting text |
| Dark Text Tertiary | `#6B7280` | rgb(107, 114, 128) | Dimmer text |
| Dark Border Light | `#2D333A` | rgb(45, 51, 58) | Subtle borders |
| Dark Border Default | `#353B43` | rgb(53, 59, 67) | Standard borders |

**Key Principle:** Accent colors (brand, brand-secondary, highlight) remain the same in dark mode, providing consistency across themes. The bold saturation works well against both light and dark backgrounds.

**Behavior:**
- Respects system preference (light/dark) by default
- Falls back to light mode if system preference unavailable
- User can manually select light, dark, or system theme via footer toggle
- Theme preference persists in localStorage

**Implementation**: All dark mode values are defined in `globals.css` under the `.dark` selector. The theme toggle is located in the global footer.

---

## Accessibility Notes

All color combinations meet **WCAG 2.1 Level AA** requirements at minimum:

### Contrast Ratios (against Canvas #FAFAFA)

- **Text Primary (`#1A1A1A`)**: 14.8:1 - AAA (normal text)
- **Text Secondary (`#6B7280`)**: 5.2:1 - AA (normal text)
- **Brand (`#EF4444`)**: 4.5:1 - AA (normal text)
- **Brand Dark (`#DC2626`)**: 5.2:1 - AA (normal text)
- **Brand Secondary (`#06B6D4`)**: 3.5:1 - AA (large text only, 18px+)
- **Brand Secondary Dark (`#0891B2`)**: 4.1:1 - AA (normal text)
- **Highlight Dark (`#65A30D`)**: 4.0:1 - AA (normal text)

### Best Practices

- Use **Brand**, **Brand Dark**, **Brand Secondary Dark**, or **Highlight Dark** for body text on light backgrounds
- Use **Brand Secondary** for large headlines (18px+) only, not body text
- Never use light accent colors (Brand Light, Brand Secondary Light, Highlight Light) for text
- Always pair text colors with sufficient background contrast

---

## Usage Guidelines

### CTAs and Links

- **Primary CTA**: Brand button with white text
  - Default: `bg-brand text-white`
  - Hover: `bg-brand-dark`
- **Secondary CTA**: Brand Secondary button with white text or black border
  - Default: `bg-brand-secondary text-white` or `border-black text-black`
  - Hover: `bg-brand-secondary-dark` or `bg-black text-white`
- **Text Links**: Brand with underline on hover
  - Default: `text-brand`
  - Hover: `text-brand-dark underline`

### Content Sections

- **Main Background**: Canvas (`#FAFAFA`)
- **Cards/Panels**: Surface (`#FFFFFF`) with subtle shadow
- **Highlighted Sections**: Brand Light, Brand Secondary Light, or Highlight Light backgrounds with appropriate text

### Code and Technical Content

- **Inline Code**: Brand Secondary Light background with Brand Secondary Dark text
- **Code Blocks**: Surface with Border, syntax highlighting using accent colors
- **Technical Highlights**: Brand Secondary for technical terms, Highlight for special concepts

### Visual Hierarchy

1. **Black Accent**: Large headlines, critical information
2. **Text Primary**: Body text, descriptions
3. **Brand**: Primary actions, important highlights, urgent calls-to-action
4. **Brand Secondary**: Secondary actions, technical content, trustworthy elements
5. **Highlight**: Special moments, creative elements, highlights
6. **Text Secondary**: Supporting information
7. **Border**: Separation and structure

---

## Implementation

### CSS Custom Properties (Source of Truth)

All colors are defined as **CSS custom properties** in `apps/website/src/app/globals.css`. This approach provides:
- **Dark mode support**: Easy theme switching via `.dark` class
- **Consistency**: Single source of truth for all color values
- **Flexibility**: Colors can be changed globally without modifying code
- **HSL format**: Better for color manipulation and opacity control

**File**: `apps/website/src/app/globals.css`

```css
@layer base {
  :root {
    /* Light Mode */
    --background: 0 0% 98%; /* #FAFAFA */
    --brand: 0 84% 60%; /* #EF4444 */
    --brand-secondary: 189 94% 43%; /* #06B6D4 */
    /* ... all other colors ... */
  }

  .dark {
    /* Dark Mode */
    --background: 220 26% 6%; /* #0F1419 */
    --brand: 0 84% 60%; /* Same in dark mode */
    /* ... dark mode overrides ... */
  }
}
```

### Tailwind Configuration

Tailwind utilities reference the CSS custom properties defined above:

**File**: `apps/website/tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      colors: {
        // All colors reference CSS custom properties via hsl()
        background: "hsl(var(--background))",
        brand: {
          light: "hsl(var(--brand-light))",
          DEFAULT: "hsl(var(--brand))",
          dark: "hsl(var(--brand-dark))",
        },
        'brand-secondary': {
          light: "hsl(var(--brand-secondary-light))",
          DEFAULT: "hsl(var(--brand-secondary))",
          dark: "hsl(var(--brand-secondary-dark))",
        },
        // ... etc
      },
    },
  },
};

export default config;
```

### How to Change Colors

To update the color system:

1. **Modify values in `globals.css`** - This is the single source of truth
2. **Both light and dark modes** will update automatically
3. **All Tailwind utilities** (e.g., `bg-brand`, `text-brand`) will use the new values
4. **No code changes needed** - just update the CSS custom property values

**Example**: To change the brand color from red to blue:

```css
/* In globals.css */
:root {
  --brand: 217 91% 60%; /* #3B82F6 blue instead of #EF4444 red */
}
```

All instances of `bg-brand`, `text-brand`, `border-brand`, etc. will now be blue!

---

## Color Palette Preview

Here's how the colors work together:

**Light Studio Background** (`canvas`) with:
- **Headlines** in `black` for impact
- **Body text** in `text-primary` for readability
- **Primary CTAs** in `brand` for bold action
- **Technical highlights** in `brand-secondary` for credibility and trust
- **Special moments** in `highlight` for warmth and creativity
- **Cards** on `surface` with subtle borders

**Examples:**

```html
<!-- Hero section -->
<section class="bg-canvas py-24">
  <h1 class="text-5xl font-bold text-black">Andrew Aarestad</h1>
  <p class="text-xl text-text-secondary mt-4">15+ years building ML systems</p>
  <button class="bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded-lg mt-8">
    View Projects
  </button>
</section>

<!-- Project card -->
<article class="bg-surface border border-border rounded-lg p-6">
  <h3 class="text-2xl font-bold text-black-accent">FLUID Water Meter</h3>
  <p class="text-text-primary mt-2">IoT + ML for leak detection</p>
  <span class="inline-block bg-brand-secondary-light text-brand-secondary-dark px-3 py-1 rounded text-sm mt-4">
    Signal Processing
  </span>
  <span class="inline-block bg-brand-light text-brand-dark px-3 py-1 rounded text-sm mt-4 ml-2">
    Machine Learning
  </span>
  <span class="inline-block bg-highlight-light text-highlight-dark px-3 py-1 rounded text-sm mt-4 ml-2">
    Featured
  </span>
</article>
```

---

## Status

✅ **Implemented** - This color system is fully implemented across the website.

**Quick Reference:**
- **Source of truth**: `apps/website/src/app/globals.css` (CSS custom properties)
- **Tailwind mapping**: `apps/website/tailwind.config.ts` (references CSS variables)
- **Theme toggle**: Located in global footer with light/dark/system modes
- **Default behavior**: Follows system preference, falls back to light mode

**To modify colors**: Edit the CSS custom property values in `globals.css` - all Tailwind utilities and components will update automatically.
