# Spacing & Layout System

## Design Philosophy

The spacing and layout system creates **visual rhythm and breathing room** that supports the art studio aesthetic. Think of it as the invisible grid that organizes the creative work - structured but not rigid, spacious but not wasteful.

**Key principles:**
- Mobile-first responsive design
- Consistent vertical rhythm (4px base unit)
- Generous whitespace for clarity
- Flexible layouts that adapt to content
- Clear visual hierarchy through spacing

---

## Spacing Scale

Based on a **4px base unit** with an 8px rhythm for larger spacing. This provides fine-grained control for tight spacing while maintaining visual consistency.

| Token | Value | Rem | Usage |
|-------|-------|-----|-------|
| `xs` | 4px | 0.25rem | Tight spacing, icon gaps |
| `sm` | 8px | 0.5rem | Small gaps, compact elements |
| `md` | 12px | 0.75rem | Default element spacing |
| `base` | 16px | 1rem | Standard spacing unit |
| `lg` | 24px | 1.5rem | Comfortable spacing |
| `xl` | 32px | 2rem | Large spacing |
| `2xl` | 48px | 3rem | Section spacing |
| `3xl` | 64px | 4rem | Major section breaks |
| `4xl` | 96px | 6rem | Hero/featured spacing |
| `5xl` | 128px | 8rem | Extra large spacing |

### Spacing Usage Guide

**Tight Spacing (4px - 8px)**
- Gap between icon and text
- Padding in small badges
- Spacing between inline elements

**Standard Spacing (12px - 24px)**
- Padding inside buttons
- Margin between paragraphs
- Gap between form elements
- Card internal padding

**Section Spacing (32px - 64px)**
- Margin between content sections
- Spacing between major UI elements
- Vertical rhythm in layouts

**Hero Spacing (96px - 128px)**
- Hero section padding
- Major page section breaks
- Landing page spacing

---

## Responsive Breakpoints

Following Tailwind's default breakpoint system, optimized for modern device sizes:

| Breakpoint | Min Width | Target Devices | Columns |
|------------|-----------|----------------|---------|
| `xs` | 0px | Mobile (default) | 4 |
| `sm` | 640px | Large mobile / small tablet | 8 |
| `md` | 768px | Tablet portrait | 8 |
| `lg` | 1024px | Tablet landscape / laptop | 12 |
| `xl` | 1280px | Desktop | 12 |
| `2xl` | 1536px | Large desktop | 12 |

### Mobile-First Approach

Design for mobile first, then progressively enhance:

```html
<!-- Mobile default, then tablet, then desktop -->
<div class="p-4 md:p-8 lg:p-12">
  Content
</div>
```

---

## Container System

Containers center content and provide consistent max-widths across the site.

### Container Sizes

| Size | Max Width | Usage |
|------|-----------|-------|
| `container-sm` | 640px | Narrow content (articles, forms) |
| `container-md` | 768px | Standard content width |
| `container-lg` | 1024px | Wide content (dashboards, tables) |
| `container-xl` | 1280px | Full-width content sections |
| `container-full` | 100% | Edge-to-edge content |

### Container Padding

Responsive padding ensures content never touches screen edges:

- **Mobile (<640px)**: 16px (1rem) horizontal padding
- **Tablet (640px - 1024px)**: 32px (2rem) horizontal padding
- **Desktop (>1024px)**: 48px (3rem) horizontal padding

### Implementation

```html
<!-- Standard container -->
<div class="max-w-container-lg mx-auto px-4 md:px-8 lg:px-12">
  <h1>Content stays centered with padding</h1>
</div>

<!-- Narrow content container (articles) -->
<article class="max-w-container-sm mx-auto px-4 md:px-8">
  <p>Readable line length for long-form content</p>
</article>

<!-- Full-width container -->
<section class="max-w-container-full px-4 md:px-8 lg:px-12">
  <div>Edge-to-edge with safe padding</div>
</section>
```

---

## Grid System

12-column grid system that adapts to content needs.

### Grid Configuration

- **Columns**: 12 (flexible down to 4 on mobile)
- **Gap**: 16px mobile, 24px tablet, 32px desktop
- **Max Width**: Defined by container size

### Grid Examples

```html
<!-- Two-column layout (responsive) -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
  <div>Column 1</div>
  <div>Column 2</div>
</div>

<!-- Three-column layout -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>

<!-- Asymmetric layout (2/3 - 1/3) -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div class="lg:col-span-2">Main content</div>
  <div class="lg:col-span-1">Sidebar</div>
</div>

<!-- Four-column responsive -->
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
  <!-- Cards -->
</div>
```

---

## Layout Patterns

Common layout patterns used throughout the site.

### Page Container

Standard page wrapper with centered content and responsive padding.

```html
<div class="min-h-screen bg-canvas">
  <div class="max-w-container-xl mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16">
    <!-- Page content -->
  </div>
</div>
```

### Hero Section

Large, impactful header section with generous spacing.

```html
<section class="bg-canvas">
  <div class="max-w-container-xl mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24 lg:py-32">
    <h1 class="text-h1 font-extrabold text-black mb-4 md:mb-6">
      Andrew Aarestad
    </h1>
    <p class="text-body-xl text-text-secondary max-w-2xl mb-8">
      15+ years building ML systems
    </p>
    <button class="bg-vermillion hover:bg-vermillion-dark text-white px-6 py-3 rounded-lg">
      View Projects
    </button>
  </div>
</section>
```

### Content Section

Standard content section with breathing room.

```html
<section class="bg-canvas py-12 md:py-16 lg:py-24">
  <div class="max-w-container-lg mx-auto px-4 md:px-8 lg:px-12">
    <h2 class="text-h2 font-bold text-black-accent mb-6 md:mb-8">
      Featured Projects
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      <!-- Project cards -->
    </div>
  </div>
</section>
```

### Card Layout

Cards with consistent padding and spacing.

```html
<div class="bg-surface border border-border rounded-lg p-6 md:p-8">
  <h3 class="text-h3 font-bold text-black-accent mb-3">
    FLUID Water Meter
  </h3>
  <p class="text-body text-text-primary mb-4">
    IoT + Signal Processing + Machine Learning
  </p>
  <div class="flex flex-wrap gap-2">
    <!-- Tags -->
  </div>
</div>
```

### Article Layout

Optimized for long-form reading with narrow line length.

```html
<article class="bg-canvas py-12 md:py-16">
  <div class="max-w-container-sm mx-auto px-4 md:px-8">
    <h1 class="text-h1 font-extrabold text-black mb-6">
      Building Production ML Systems
    </h1>

    <p class="text-body-xl text-text-primary mb-8">
      Lead paragraph with larger text...
    </p>

    <div class="prose prose-lg">
      <!-- Article content with automatic spacing -->
    </div>
  </div>
</article>
```

### Split Layout (Image + Text)

Side-by-side layout that stacks on mobile.

```html
<section class="bg-canvas py-12 md:py-16 lg:py-24">
  <div class="max-w-container-xl mx-auto px-4 md:px-8 lg:px-12">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <div>
        <h2 class="text-h2 font-bold text-black-accent mb-4">
          About Me
        </h2>
        <p class="text-body text-text-primary">
          I'm an AI/ML engineer...
        </p>
      </div>
      <div>
        <!-- Image or visual element -->
      </div>
    </div>
  </div>
</section>
```

---

## Vertical Rhythm

Consistent spacing creates visual flow and hierarchy.

### Paragraph Spacing

```css
/* Between paragraphs */
.prose p + p {
  margin-top: 1rem; /* 16px */
}

/* After headings */
.prose h2 + p,
.prose h3 + p {
  margin-top: 1rem; /* 16px */
}

/* Before headings */
.prose h2,
.prose h3 {
  margin-top: 2rem; /* 32px */
}
```

### Section Spacing

Use consistent spacing tokens:

```html
<!-- Small spacing between related elements -->
<div class="space-y-2">
  <p>Related item 1</p>
  <p>Related item 2</p>
</div>

<!-- Standard spacing between content blocks -->
<div class="space-y-4">
  <div>Block 1</div>
  <div>Block 2</div>
</div>

<!-- Large spacing between major sections -->
<div class="space-y-8 md:space-y-12">
  <section>Section 1</section>
  <section>Section 2</section>
</div>
```

---

## Component Spacing

Internal spacing for common UI components.

### Buttons

```html
<!-- Small button -->
<button class="px-4 py-2 text-body-sm">
  Small Button
</button>

<!-- Standard button -->
<button class="px-6 py-3 text-body">
  Standard Button
</button>

<!-- Large button -->
<button class="px-8 py-4 text-body-lg">
  Large Button
</button>
```

### Input Fields

```html
<!-- Standard input -->
<input class="px-4 py-3 border border-border rounded-lg" />

<!-- Large input -->
<input class="px-6 py-4 text-body-lg border border-border rounded-lg" />
```

### Cards

```html
<!-- Compact card -->
<div class="p-4 bg-surface border border-border rounded-lg">
  Compact content
</div>

<!-- Standard card -->
<div class="p-6 md:p-8 bg-surface border border-border rounded-lg">
  Standard content
</div>

<!-- Spacious card -->
<div class="p-8 md:p-12 bg-surface border border-border rounded-lg">
  Spacious content
</div>
```

### Badges/Tags

```html
<!-- Compact badge -->
<span class="px-2 py-1 text-label-sm bg-blue-light text-blue-dark rounded">
  Tag
</span>

<!-- Standard badge -->
<span class="px-3 py-1.5 text-label bg-blue-light text-blue-dark rounded-md">
  Tag
</span>
```

---

## Responsive Spacing Patterns

### Stack Spacing

Vertical spacing that increases on larger screens:

```html
<div class="space-y-4 md:space-y-6 lg:space-y-8">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Grid Gaps

Grid gaps that scale with viewport:

```html
<div class="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
  <div>Item</div>
  <div>Item</div>
</div>
```

### Section Padding

Responsive vertical padding for sections:

```html
<section class="py-8 md:py-12 lg:py-16">
  Content with responsive vertical spacing
</section>

<section class="py-12 md:py-16 lg:py-24">
  Major section with generous spacing
</section>
```

---

## Border Radius

Consistent corner rounding for visual cohesion.

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 2px | Small elements, badges |
| `rounded` | 4px | Buttons, inputs (default) |
| `rounded-md` | 6px | Cards, panels |
| `rounded-lg` | 8px | Large cards, modals |
| `rounded-xl` | 12px | Hero cards, featured content |
| `rounded-2xl` | 16px | Extra large elements |
| `rounded-full` | 9999px | Pills, circular avatars |

### Usage Examples

```html
<!-- Buttons -->
<button class="rounded-lg">Standard Button</button>

<!-- Cards -->
<div class="rounded-lg border">Card</div>

<!-- Badges -->
<span class="rounded-md">Badge</span>

<!-- Pills -->
<span class="rounded-full">Pill</span>
```

---

## Shadows

Subtle elevation for depth and hierarchy.

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `shadow` | `0 1px 3px rgba(0,0,0,0.1)` | Cards, buttons |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Elevated cards |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `shadow-xl` | `0 20px 25px rgba(0,0,0,0.1)` | Featured content |

### Usage

```html
<!-- Card with subtle shadow -->
<div class="bg-surface rounded-lg shadow-sm p-6">
  Card content
</div>

<!-- Elevated card -->
<div class="bg-surface rounded-lg shadow-md p-8">
  Elevated content
</div>

<!-- Card with hover effect -->
<div class="bg-surface rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
  Interactive card
</div>
```

---

## Tailwind Configuration

Add spacing, container, and layout settings to `apps/website/tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      spacing: {
        'xs': '0.25rem',    // 4px
        'sm': '0.5rem',     // 8px
        'md': '0.75rem',    // 12px
        'base': '1rem',     // 16px
        'lg': '1.5rem',     // 24px
        'xl': '2rem',       // 32px
        '2xl': '3rem',      // 48px
        '3xl': '4rem',      // 64px
        '4xl': '6rem',      // 96px
        '5xl': '8rem',      // 128px
      },
      maxWidth: {
        'container-sm': '640px',
        'container-md': '768px',
        'container-lg': '1024px',
        'container-xl': '1280px',
        'container-full': '100%',
      },
      borderRadius: {
        'sm': '2px',
        DEFAULT: '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
        'full': '9999px',
      },
    },
  },
};

export default config;
```

---

## Layout Best Practices

### Mobile-First Development

1. **Start mobile** - Design for smallest screen first
2. **Add breakpoints** - Enhance for larger screens
3. **Test on devices** - Use real devices, not just browser DevTools

```html
<!-- Mobile: Stack vertically, Desktop: Side by side -->
<div class="flex flex-col lg:flex-row gap-4 lg:gap-8">
  <div class="flex-1">Content 1</div>
  <div class="flex-1">Content 2</div>
</div>
```

### Content-First Spacing

Let content dictate spacing, not arbitrary values:

```html
<!-- ✅ Good: Spacing relates to content hierarchy -->
<article>
  <h1 class="mb-4">Title</h1>
  <p class="text-body-xl mb-8">Lead paragraph needs more space</p>
  <p class="mb-4">Standard paragraph</p>
  <p class="mb-4">Standard paragraph</p>
</article>

<!-- ❌ Bad: Inconsistent, arbitrary spacing -->
<article>
  <h1 class="mb-3">Title</h1>
  <p class="mb-7">Lead</p>
  <p class="mb-5">Paragraph</p>
</article>
```

### Consistent Container Usage

Always use containers for centered content:

```html
<!-- ✅ Good: Consistent container pattern -->
<section>
  <div class="max-w-container-lg mx-auto px-4 md:px-8 lg:px-12">
    Content
  </div>
</section>

<!-- ❌ Bad: Inconsistent max-widths -->
<section>
  <div class="max-w-7xl mx-auto px-6">
    Content
  </div>
</section>
```

### Responsive Images

Images should adapt to container width:

```html
<!-- Responsive image -->
<img
  src="/project.jpg"
  alt="Project screenshot"
  class="w-full h-auto rounded-lg"
/>

<!-- With Next.js Image component -->
<Image
  src="/project.jpg"
  alt="Project screenshot"
  width={1200}
  height={800}
  className="w-full h-auto rounded-lg"
/>
```

---

## Accessibility Considerations

### Focus States

Ensure interactive elements have clear focus indicators:

```html
<button class="focus:outline-none focus:ring-2 focus:ring-vermillion focus:ring-offset-2">
  Accessible Button
</button>

<a href="#" class="focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2">
  Accessible Link
</a>
```

### Skip Links

Provide keyboard navigation shortcuts:

```html
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-vermillion text-white px-4 py-2 rounded-lg">
  Skip to main content
</a>

<main id="main-content">
  <!-- Content -->
</main>
```

### Touch Targets

Ensure interactive elements are large enough (minimum 44×44px):

```html
<!-- ✅ Good: Large enough touch target -->
<button class="px-6 py-3 min-h-[44px]">
  Tap me
</button>

<!-- ❌ Bad: Too small for touch -->
<button class="px-2 py-1 text-xs">
  Tiny button
</button>
```

---

## Common Layout Components

### Header/Navigation

```html
<header class="bg-surface border-b border-border sticky top-0 z-50">
  <div class="max-w-container-xl mx-auto px-4 md:px-8 lg:px-12">
    <nav class="flex items-center justify-between h-16 md:h-20">
      <a href="/" class="text-h4 font-bold text-black">
        Andrew Aarestad
      </a>
      <div class="flex items-center gap-6">
        <a href="/projects" class="text-body text-text-primary hover:text-vermillion">
          Projects
        </a>
        <a href="/about" class="text-body text-text-primary hover:text-vermillion">
          About
        </a>
      </div>
    </nav>
  </div>
</header>
```

### Footer

```html
<footer class="bg-surface border-t border-border mt-auto">
  <div class="max-w-container-xl mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 class="text-h5 font-semibold text-black mb-4">
          Andrew Aarestad
        </h3>
        <p class="text-body-sm text-text-secondary">
          AI/ML Engineer
        </p>
      </div>
      <div>
        <h4 class="text-label font-medium text-text-primary mb-3">
          Links
        </h4>
        <ul class="space-y-2">
          <li><a href="/projects" class="text-body-sm text-text-secondary hover:text-vermillion">Projects</a></li>
          <li><a href="/about" class="text-body-sm text-text-secondary hover:text-vermillion">About</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-label font-medium text-text-primary mb-3">
          Connect
        </h4>
        <ul class="space-y-2">
          <li><a href="#" class="text-body-sm text-text-secondary hover:text-vermillion">GitHub</a></li>
          <li><a href="#" class="text-body-sm text-text-secondary hover:text-vermillion">LinkedIn</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-border mt-8 pt-8">
      <p class="text-body-sm text-text-secondary text-center">
        © 2025 Andrew Aarestad. All rights reserved.
      </p>
    </div>
  </div>
</footer>
```

---

## Next Steps

Before moving to the components catalog:

1. **Spacing scale** - Does the 4px base unit feel right? Need different increments?
2. **Container widths** - Are these max-widths appropriate for your content?
3. **Grid patterns** - Any specific layouts you know you'll need?
4. **Anything missing?** - Specific spacing patterns or layout needs?

Once approved, we'll create the components catalog with all the UI elements!
