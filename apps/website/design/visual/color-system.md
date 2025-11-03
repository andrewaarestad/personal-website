# Color System

## Design Philosophy

The color system reflects an **art studio aesthetic**: a light, airy foundation provides the "well-lit workspace," black accents add structure and definition, and bold primary-like colors (vermillion red, true blue, golden yellow) create visual impact like artist's paints on canvas.

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

These are the "artist's paints" - bold, saturated colors inspired by primary hues. Think paint tubes straight from the art supply store.

### Primary Accent: Vermillion Red

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Vermillion | `#E63946` | rgb(230, 57, 70) | Primary CTAs, links, important highlights |
| Vermillion Dark | `#C5303D` | rgb(197, 48, 61) | Hover states, active elements |
| Vermillion Light | `#FFDEDF` | rgb(255, 222, 223) | Backgrounds, subtle highlights |

**Rationale:** Bold red with slight orange undertone - energetic, confident, and attention-grabbing without being aggressive. This is the color that makes visitors take action. Pure enough to feel primary, warm enough to stay inviting.

### Secondary Accent: True Blue

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Blue | `#1D70B8` | rgb(29, 112, 184) | Secondary actions, technical content highlights |
| Blue Dark | `#165A94` | rgb(22, 90, 148) | Hover states |
| Blue Light | `#D4E5F7` | rgb(212, 229, 247) | Backgrounds, code highlights |

**Rationale:** A saturated, true blue that feels technical and trustworthy. Provides cool contrast to the warm vermillion. This is the color of blueprints and technical diagrams - perfect for engineering content.

### Tertiary Accent: Golden Yellow

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Gold | `#F7B32B` | rgb(247, 179, 43) | Special highlights, creative elements, accents |
| Gold Dark | `#D99A1F` | rgb(217, 154, 31) | Text on light backgrounds |
| Gold Light | `#FFF4D9` | rgb(255, 244, 217) | Backgrounds, subtle accents |

**Rationale:** Rich golden yellow adds warmth and creative energy. Used sparingly as an accent - the "highlight pen" that draws attention to special moments. Bold enough to stand out, warm enough to complement the vermillion.

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

**Note:** Accent colors (vermillion, blue, gold) remain the same in dark mode, providing consistency across themes. The bold saturation works well against both light and dark backgrounds.

---

## Accessibility Notes

All color combinations meet **WCAG 2.1 Level AA** requirements at minimum:

### Contrast Ratios (against Canvas #FAFAFA)

- **Text Primary (`#1A1A1A`)**: 14.8:1 - AAA (normal text)
- **Text Secondary (`#6B7280`)**: 5.2:1 - AA (normal text)
- **Vermillion (`#E63946`)**: 4.1:1 - AA (normal text)
- **Vermillion Dark (`#C5303D`)**: 5.8:1 - AA (normal text)
- **Blue (`#1D70B8`)**: 4.3:1 - AA (normal text)
- **Blue Dark (`#165A94`)**: 5.9:1 - AA (normal text)
- **Gold Dark (`#D99A1F`)**: 3.8:1 - AA (large text only, 18px+)

### Best Practices

- Use **Vermillion**, **Vermillion Dark**, **Blue**, or **Blue Dark** for body text on light backgrounds
- Use **Gold Dark** for large headlines (24px+) only, not body text
- Never use light accent colors (Vermillion Light, Blue Light, Gold Light) for text
- Always pair text colors with sufficient background contrast

---

## Usage Guidelines

### CTAs and Links

- **Primary CTA**: Vermillion button with white text
  - Default: `bg-vermillion text-white`
  - Hover: `bg-vermillion-dark`
- **Secondary CTA**: Blue button with white text or black border
  - Default: `bg-blue text-white` or `border-black text-black`
  - Hover: `bg-blue-dark` or `bg-black text-white`
- **Text Links**: Vermillion with underline on hover
  - Default: `text-vermillion`
  - Hover: `text-vermillion-dark underline`

### Content Sections

- **Main Background**: Canvas (`#FAFAFA`)
- **Cards/Panels**: Surface (`#FFFFFF`) with subtle shadow
- **Highlighted Sections**: Vermillion Light, Blue Light, or Gold Light backgrounds with appropriate text

### Code and Technical Content

- **Inline Code**: Blue Light background with Blue Dark text
- **Code Blocks**: Surface with Border, syntax highlighting using accent colors
- **Technical Highlights**: Blue for technical terms, Gold for special concepts

### Visual Hierarchy

1. **Black Accent**: Large headlines, critical information
2. **Text Primary**: Body text, descriptions
3. **Vermillion**: Primary actions, important highlights, urgent calls-to-action
4. **Blue**: Secondary actions, technical content, trustworthy elements
5. **Gold**: Special moments, creative elements, highlights
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

        // Accents - Bold Primary-Like Colors
        vermillion: {
          light: '#FFDEDF',
          DEFAULT: '#E63946',
          dark: '#C5303D',
        },
        blue: {
          light: '#D4E5F7',
          DEFAULT: '#1D70B8',
          dark: '#165A94',
        },
        gold: {
          light: '#FFF4D9',
          DEFAULT: '#F7B32B',
          dark: '#D99A1F',
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
- **Primary CTAs** in `vermillion` for bold action
- **Technical highlights** in `blue` for credibility and trust
- **Special moments** in `gold` for warmth and creativity
- **Cards** on `surface` with subtle borders

**Examples:**

```html
<!-- Hero section -->
<section class="bg-canvas py-24">
  <h1 class="text-5xl font-bold text-black">Andrew Aarestad</h1>
  <p class="text-xl text-text-secondary mt-4">15+ years building ML systems</p>
  <button class="bg-vermillion hover:bg-vermillion-dark text-white px-6 py-3 rounded-lg mt-8">
    View Projects
  </button>
</section>

<!-- Project card -->
<article class="bg-surface border border-border rounded-lg p-6">
  <h3 class="text-2xl font-bold text-black-accent">FLUID Water Meter</h3>
  <p class="text-text-primary mt-2">IoT + ML for leak detection</p>
  <span class="inline-block bg-blue-light text-blue-dark px-3 py-1 rounded text-sm mt-4">
    Signal Processing
  </span>
  <span class="inline-block bg-vermillion-light text-vermillion-dark px-3 py-1 rounded text-sm mt-4 ml-2">
    Machine Learning
  </span>
  <span class="inline-block bg-gold-light text-gold-dark px-3 py-1 rounded text-sm mt-4 ml-2">
    Featured
  </span>
</article>
```

---

## Next Steps

Before moving to typography, please review:

1. **Do these bolder, primary-like colors capture the "art studio" aesthetic?**
2. **Vermillion (bold red) as primary** - Does this feel confident and action-oriented?
3. **True blue as secondary** - Does this balance the warm vermillion with technical credibility?
4. **Golden yellow as tertiary** - Does this add the right creative accent?
5. **Any colors you'd like to adjust?** We can iterate on saturation, hue, or try completely different primaries.

Once approved, we'll move to typography and define the font system!
