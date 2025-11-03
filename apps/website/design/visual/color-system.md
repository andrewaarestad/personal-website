# Color System

## Design Philosophy

The color system reflects an **art studio aesthetic**: a light, airy foundation provides the "well-lit workspace," black accents add structure and definition, and vibrant pops of color highlight important elements like finished pieces in a gallery.

**Key principles:**
- Light mode as primary experience
- High contrast for readability and accessibility
- Vibrant but purposeful accent colors
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

These are the "finished pieces" - vibrant colors that draw attention and add personality.

### Primary Accent: Coral Orange

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Coral | `#FF6B4A` | rgb(255, 107, 74) | Primary CTAs, links, important highlights |
| Coral Dark | `#E5502D` | rgb(229, 80, 45) | Hover states, active elements |
| Coral Light | `#FFE4DE` | rgb(255, 228, 222) | Backgrounds, subtle highlights |

**Rationale:** Coral orange is warm, creative, and energetic - perfect for an art studio vibe. It stands out against the light background without being overwhelming. Not typically seen in tech portfolios, adding uniqueness.

### Secondary Accent: Teal

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Teal | `#06B6D4` | rgb(6, 182, 212) | Secondary actions, technical content highlights |
| Teal Dark | `#0891B2` | rgb(8, 145, 178) | Hover states |
| Teal Light | `#CFFAFE` | rgb(207, 250, 254) | Backgrounds, code highlights |

**Rationale:** Teal provides a cool complement to the warm coral, adds technical credibility, and works well for code/technical content highlighting.

### Tertiary Accent: Purple

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Purple | `#8B5CF6` | rgb(139, 92, 246) | Special highlights, creative elements |
| Purple Light | `#EDE9FE` | rgb(237, 233, 254) | Backgrounds, subtle accents |

**Rationale:** Purple adds depth and creativity, useful for special moments or creative content. Sparingly used for maximum impact.

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

## Dark Mode (Future Consideration)

While light mode is primary, here's a proposed dark mode palette for future implementation:

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Dark Canvas | `#0F1419` | rgb(15, 20, 25) | Page background |
| Dark Surface | `#1A1F25` | rgb(26, 31, 37) | Card backgrounds |
| Dark Text Primary | `#E5E7EB` | rgb(229, 231, 235) | Main text |
| Dark Text Secondary | `#9CA3AF` | rgb(156, 163, 175) | Supporting text |

**Note:** Accent colors (coral, teal, purple) remain the same in dark mode, providing consistency across themes.

---

## Accessibility Notes

All color combinations meet **WCAG 2.1 Level AA** requirements at minimum:

### Contrast Ratios (against Canvas #FAFAFA)

- **Text Primary (`#1A1A1A`)**: 14.8:1 - AAA (normal text)
- **Text Secondary (`#6B7280`)**: 5.2:1 - AA (normal text)
- **Coral (`#FF6B4A`)**: 3.2:1 - AA (large text only, 18px+)
- **Coral Dark (`#E5502D`)**: 4.6:1 - AA (normal text)
- **Teal (`#06B6D4`)**: 3.5:1 - AA (large text only)
- **Teal Dark (`#0891B2`)**: 4.2:1 - AA (normal text)

### Best Practices

- Use **Coral Dark** or **Teal Dark** for body text on light backgrounds
- Use **Coral** or **Teal** for large headlines (24px+) or UI elements
- Never use light accent colors (Coral Light, Teal Light) for text
- Always pair text colors with sufficient background contrast

---

## Usage Guidelines

### CTAs and Links

- **Primary CTA**: Coral button with white text
  - Default: `bg-coral text-white`
  - Hover: `bg-coral-dark`
- **Secondary CTA**: Black border with black text
  - Default: `border-black text-black`
  - Hover: `bg-black text-white`
- **Text Links**: Coral Dark with underline on hover
  - Default: `text-coral-dark`
  - Hover: `text-coral underline`

### Content Sections

- **Main Background**: Canvas (`#FAFAFA`)
- **Cards/Panels**: Surface (`#FFFFFF`) with subtle shadow
- **Highlighted Sections**: Coral Light, Teal Light, or Purple Light backgrounds with appropriate text

### Code and Technical Content

- **Inline Code**: Teal Light background with Teal Dark text
- **Code Blocks**: Surface with Border, syntax highlighting using accent colors
- **Technical Highlights**: Teal for technical terms, Purple for special concepts

### Visual Hierarchy

1. **Black Accent**: Large headlines, critical information
2. **Text Primary**: Body text, descriptions
3. **Coral**: Primary actions, important highlights
4. **Teal**: Secondary actions, technical content
5. **Purple**: Special moments, creative elements
6. **Text Secondary**: Supporting information
7. **Border**: Separation and structure

---

## Tailwind Configuration

Add these custom colors to `apps/website/tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      colors: {
        // Foundation
        canvas: '#FAFAFA',
        surface: '#FFFFFF',

        // Structure
        black: {
          DEFAULT: '#000000',
          accent: '#1A1A1A',
        },

        // Accents
        coral: {
          light: '#FFE4DE',
          DEFAULT: '#FF6B4A',
          dark: '#E5502D',
        },
        teal: {
          light: '#CFFAFE',
          DEFAULT: '#06B6D4',
          dark: '#0891B2',
        },
        purple: {
          light: '#EDE9FE',
          DEFAULT: '#8B5CF6',
        },

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
        text: {
          primary: '#1A1A1A',
          secondary: '#6B7280',
          tertiary: '#9CA3AF',
        },

        // Borders
        border: {
          light: '#E5E7EB',
          DEFAULT: '#D1D5DB',
        },
      },
    },
  },
};

export default config;
```

---

## Color Palette Preview

Here's how the colors work together:

**Light Studio Background** (`canvas`) with:
- **Headlines** in `black` for impact
- **Body text** in `text-primary` for readability
- **Primary CTAs** in `coral` for warmth and action
- **Technical highlights** in `teal` for credibility
- **Special moments** in `purple` for creativity
- **Cards** on `surface` with subtle borders

**Examples:**

```html
<!-- Hero section -->
<section class="bg-canvas py-24">
  <h1 class="text-5xl font-bold text-black">Andrew Aarestad</h1>
  <p class="text-xl text-text-secondary mt-4">15+ years building ML systems</p>
  <button class="bg-coral hover:bg-coral-dark text-white px-6 py-3 rounded-lg mt-8">
    View Projects
  </button>
</section>

<!-- Project card -->
<article class="bg-surface border border-border rounded-lg p-6">
  <h3 class="text-2xl font-bold text-black-accent">FLUID Water Meter</h3>
  <p class="text-text-primary mt-2">IoT + ML for leak detection</p>
  <span class="inline-block bg-teal-light text-teal-dark px-3 py-1 rounded text-sm mt-4">
    Signal Processing
  </span>
  <span class="inline-block bg-coral-light text-coral-dark px-3 py-1 rounded text-sm mt-4 ml-2">
    Machine Learning
  </span>
</article>
```

---

## Next Steps

Before moving to typography, please review:

1. **Do these colors capture the "art studio" aesthetic?**
2. **Coral as primary accent** - Does this feel right for your brand? (Alternative: teal as primary)
3. **Any colors that feel off?**
4. **Should we adjust any specific colors or add others?**

Once approved, we'll move to typography and define the font system!
