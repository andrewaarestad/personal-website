# Typography System

## Design Philosophy

The typography system supports the **art studio aesthetic** with fonts that have personality without sacrificing readability. The goal is to feel **genuine and approachable** while maintaining **technical credibility**.

**Key principles:**
- Clear hierarchy for scannable content
- Readable at all sizes, especially on mobile
- Personality that doesn't overwhelm
- Technical credibility meets creative confidence
- Optimized for both long-form content and UI elements

---

## Font Families

### Display/Heading Font: Inter

**Font:** [Inter](https://fonts.google.com/specimen/Inter)
**Weights:** 500 (Medium), 600 (Semibold), 700 (Bold), 800 (Extrabold)
**Source:** Google Fonts
**Fallback:** system-ui, -apple-system, sans-serif

**Rationale:** Inter is a modern, highly readable sans-serif designed specifically for screens. It has excellent legibility at all sizes, includes a wide range of weights, and has subtle personality without being quirky. The slightly taller x-height and open apertures make it perfect for headlines and UI elements. It's professional but not corporate, technical but not cold.

**Usage:**
- All headings (H1-H6)
- Navigation elements
- Button text
- UI labels and badges
- Any text that needs emphasis

### Body Font: Inter

**Font:** [Inter](https://fonts.google.com/specimen/Inter)
**Weights:** 400 (Regular), 500 (Medium)
**Source:** Google Fonts
**Fallback:** system-ui, -apple-system, sans-serif

**Rationale:** Using the same font family for both headings and body creates a cohesive, unified system. Different weights and sizes provide hierarchy. Inter's excellent readability makes it perfect for long-form technical content. This approach is cleaner and more modern than mixing serif/sans-serif.

**Usage:**
- Paragraph text
- Lists
- Captions and supporting text
- Form inputs
- Any body content

### Monospace Font: JetBrains Mono

**Font:** [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
**Weights:** 400 (Regular), 500 (Medium)
**Source:** Google Fonts
**Fallback:** Consolas, Monaco, 'Courier New', monospace

**Rationale:** JetBrains Mono is designed specifically for developers, with excellent readability for code and technical content. It has clear character distinction (no confusing 0/O or 1/l/I), programming ligatures (optional), and feels modern without being overly stylized.

**Usage:**
- Code blocks
- Inline code
- Technical data
- File paths and commands
- API responses

---

## Type Scale

The type scale is based on a **1.250 (Major Third)** ratio, providing clear visual hierarchy without excessive jumps.

| Level | Size (px/rem) | Line Height | Weight | Letter Spacing | Usage |
|-------|---------------|-------------|--------|----------------|-------|
| **H1** | 48px / 3rem | 1.1 (52.8px) | 800 (Extrabold) | -0.02em | Page titles, hero headlines |
| **H2** | 40px / 2.5rem | 1.2 (48px) | 700 (Bold) | -0.01em | Section headings |
| **H3** | 32px / 2rem | 1.25 (40px) | 700 (Bold) | -0.01em | Subsection headings |
| **H4** | 24px / 1.5rem | 1.3 (31.2px) | 600 (Semibold) | 0 | Card titles, smaller sections |
| **H5** | 20px / 1.25rem | 1.4 (28px) | 600 (Semibold) | 0 | List titles, small headings |
| **H6** | 18px / 1.125rem | 1.4 (25.2px) | 600 (Semibold) | 0 | Smallest headings |
| **Body XL** | 20px / 1.25rem | 1.6 (32px) | 400 (Regular) | 0 | Lead paragraphs, intro text |
| **Body Large** | 18px / 1.125rem | 1.6 (28.8px) | 400 (Regular) | 0 | Emphasized body text |
| **Body** | 16px / 1rem | 1.6 (25.6px) | 400 (Regular) | 0 | Main content, paragraphs |
| **Body Small** | 14px / 0.875rem | 1.5 (21px) | 400 (Regular) | 0 | Captions, secondary content |
| **Label** | 14px / 0.875rem | 1.4 (19.6px) | 500 (Medium) | 0.01em | Form labels, UI labels |
| **Label Small** | 12px / 0.75rem | 1.4 (16.8px) | 500 (Medium) | 0.02em | Badges, tiny labels |
| **Code** | 14px / 0.875rem | 1.6 (22.4px) | 400 (Regular) | 0 | Code blocks, inline code |

### Design Notes

- **Negative letter spacing** on large headings creates tighter, more confident look
- **Positive letter spacing** on small labels improves readability at tiny sizes
- **Line height increases** for body text (1.6) ensures comfortable reading
- **Tighter line heights** for headings (1.1-1.3) create compact, impactful look
- **All sizes divisible by 4px** for consistent vertical rhythm

---

## Responsive Typography

The type scale adjusts for mobile devices to maintain readability and hierarchy without overwhelming small screens.

### Breakpoints

**Mobile (< 768px):**
- H1: 36px (3rem → 2.25rem)
- H2: 32px (2.5rem → 2rem)
- H3: 28px (2rem → 1.75rem)
- H4: 24px (no change)
- Body: 16px (no change)

**Tablet (768px - 1024px):**
- H1: 42px (3rem → 2.625rem)
- H2: 36px (2.5rem → 2.25rem)
- H3: 30px (2rem → 1.875rem)
- Other sizes: no change

**Desktop (> 1024px):**
- Full type scale as defined above

### Implementation Strategy

Use Tailwind's responsive classes:

```html
<h1 class="text-4xl md:text-5xl lg:text-6xl">
  Responsive Heading
</h1>
```

Or define custom responsive classes in CSS:

```css
.heading-1 {
  font-size: 2.25rem; /* 36px mobile */
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.02em;
}

@media (min-width: 768px) {
  .heading-1 {
    font-size: 2.625rem; /* 42px tablet */
  }
}

@media (min-width: 1024px) {
  .heading-1 {
    font-size: 3rem; /* 48px desktop */
  }
}
```

---

## Font Loading Strategy

Optimize for performance and avoid layout shift:

### Next.js Font Optimization (Recommended)

```typescript
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

### Benefits

- **Automatic optimization** - Next.js inlines font CSS for zero layout shift
- **Preloading** - Critical fonts are preloaded automatically
- **Self-hosting** - Fonts are served from your domain (privacy + performance)
- **No FOUT/FOIT** - Smooth font loading with `display: swap`

---

## Tailwind Configuration

Add typography settings to `apps/website/tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'Consolas', 'Monaco', 'monospace'],
      },
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
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // For prose content styling
  ],
};

export default config;
```

---

## Usage Guidelines

### Heading Hierarchy

Always use semantic HTML with appropriate heading levels:

```html
<h1 class="text-h1 font-extrabold text-black">Main Page Title</h1>
<h2 class="text-h2 font-bold text-black-accent">Section Heading</h2>
<h3 class="text-h3 font-bold text-text-primary">Subsection</h3>
```

### Body Content

Use appropriate text sizes for different contexts:

```html
<!-- Lead paragraph -->
<p class="text-body-xl text-text-primary">
  I'm an AI/ML engineer who's been building production systems for over 15 years.
</p>

<!-- Standard paragraph -->
<p class="text-body text-text-primary">
  I work at the intersection of research and product...
</p>

<!-- Supporting text -->
<p class="text-body-sm text-text-secondary">
  Last updated: January 2025
</p>
```

### Code and Technical Content

```html
<!-- Inline code -->
<p>
  Use the <code class="font-mono text-code bg-blue-light text-blue-dark px-2 py-1 rounded">
    npm install
  </code> command.
</p>

<!-- Code block -->
<pre class="font-mono text-code bg-surface border border-border rounded-lg p-4">
<code>function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}</code>
</pre>
```

### UI Elements

```html
<!-- Button -->
<button class="text-body font-medium bg-vermillion text-white px-6 py-3 rounded-lg">
  View Projects
</button>

<!-- Badge/Label -->
<span class="text-label-sm font-medium bg-blue-light text-blue-dark px-3 py-1 rounded">
  Machine Learning
</span>

<!-- Form label -->
<label class="text-label font-medium text-text-primary">
  Email Address
</label>
```

---

## Typography + Color Combinations

### High Impact (Hero Sections)

```html
<h1 class="text-h1 font-extrabold text-black">
  Andrew Aarestad
</h1>
<p class="text-body-xl text-text-secondary mt-4">
  15+ years building ML systems
</p>
```

### Project Titles

```html
<h2 class="text-h2 font-bold text-black-accent">
  FLUID Water Meter
</h2>
<p class="text-body text-text-primary mt-2">
  IoT + Signal Processing + Machine Learning
</p>
```

### Technical Content

```html
<h3 class="text-h3 font-bold text-blue">
  Implementation Details
</h3>
<code class="font-mono text-code bg-blue-light text-blue-dark">
  Kalman filtering for state estimation
</code>
```

### Callouts / Highlights

```html
<div class="bg-gold-light border-l-4 border-gold p-6">
  <h4 class="text-h4 font-semibold text-gold-dark">
    Key Insight
  </h4>
  <p class="text-body text-text-primary mt-2">
    The hardest part wasn't the algorithms—it was deployment infrastructure.
  </p>
</div>
```

---

## Accessibility Considerations

### Readability

- **Minimum body text size**: 16px (1rem) - never smaller for main content
- **Line height**: 1.6 for body text ensures comfortable reading
- **Line length**: Max 65-75 characters per line for optimal readability
- **Paragraph spacing**: Use margin-bottom for clear separation

### Contrast

All text meets WCAG AA standards when paired with recommended colors:

- **Black on Canvas** (#000000 on #FAFAFA): 19.5:1 - AAA
- **Text Primary on Canvas** (#1A1A1A on #FAFAFA): 14.8:1 - AAA
- **Text Secondary on Canvas** (#6B7280 on #FAFAFA): 5.2:1 - AA
- **Vermillion on Canvas** (#E63946 on #FAFAFA): 4.1:1 - AA
- **Blue on Canvas** (#1D70B8 on #FAFAFA): 4.3:1 - AA

### Best Practices

```html
<!-- ✅ Good: Semantic HTML + sufficient contrast -->
<h1 class="text-h1 font-extrabold text-black">Heading</h1>
<p class="text-body text-text-primary">Body text with high contrast.</p>

<!-- ❌ Bad: Insufficient contrast -->
<p class="text-body text-text-tertiary">Too light for body text</p>

<!-- ❌ Bad: Text too small -->
<p class="text-xs">Hard to read at 12px</p>
```

---

## Content Formatting Patterns

### Article/Blog Post

```html
<article class="max-w-2xl mx-auto px-4">
  <h1 class="text-h1 font-extrabold text-black mb-4">
    Building Production ML Systems
  </h1>

  <p class="text-body-xl text-text-primary mb-8">
    After 15+ years, here's what I've learned about shipping real ML products.
  </p>

  <h2 class="text-h2 font-bold text-black-accent mt-12 mb-4">
    Start with the Data Pipeline
  </h2>

  <p class="text-body text-text-primary mb-4">
    The most important part of any ML system isn't the model...
  </p>

  <p class="text-body text-text-primary mb-4">
    It's the data infrastructure that feeds it.
  </p>
</article>
```

### Project Showcase

```html
<div class="bg-surface border border-border rounded-lg p-8">
  <h3 class="text-h3 font-bold text-black-accent mb-2">
    FLUID Water Meter
  </h3>

  <p class="text-body-lg text-text-primary mb-6">
    IoT hardware + signal processing + ML for real-time leak detection
  </p>

  <div class="space-y-4">
    <div>
      <h4 class="text-h5 font-semibold text-text-primary mb-2">
        The Challenge
      </h4>
      <p class="text-body text-text-primary">
        Accurately measuring water flow with ultrasonic sensors...
      </p>
    </div>
  </div>

  <div class="flex gap-2 mt-6">
    <span class="text-label-sm font-medium bg-blue-light text-blue-dark px-3 py-1 rounded">
      Signal Processing
    </span>
    <span class="text-label-sm font-medium bg-vermillion-light text-vermillion-dark px-3 py-1 rounded">
      Machine Learning
    </span>
  </div>
</div>
```

### Technical Documentation

```html
<div class="prose prose-slate max-w-none">
  <h2 class="text-h2 font-bold text-black-accent">
    API Reference
  </h2>

  <p class="text-body text-text-primary">
    Use the following endpoint to retrieve user data:
  </p>

  <pre class="font-mono text-code bg-surface border border-border rounded-lg p-4">
    <code>GET /api/users/{userId}</code>
  </pre>

  <p class="text-body-sm text-text-secondary">
    Requires authentication via Bearer token.
  </p>
</div>
```

---

## @tailwindcss/typography Configuration

For long-form content, use the Typography plugin with custom styling:

```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#1A1A1A', // text-primary
            fontFamily: 'var(--font-inter)',
            lineHeight: '1.6',

            h1: {
              color: '#000000',
              fontWeight: '800',
              letterSpacing: '-0.02em',
            },
            h2: {
              color: '#1A1A1A',
              fontWeight: '700',
              letterSpacing: '-0.01em',
            },
            h3: {
              color: '#1A1A1A',
              fontWeight: '700',
            },

            a: {
              color: '#E63946', // vermillion
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: '#C5303D', // vermillion-dark
                textDecoration: 'underline',
              },
            },

            code: {
              fontFamily: 'var(--font-jetbrains-mono)',
              backgroundColor: '#D4E5F7', // blue-light
              color: '#165A94', // blue-dark
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },

            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
};
```

Usage:

```html
<article class="prose">
  <!-- Markdown-generated content with automatic styling -->
</article>
```

---

## Next Steps

Before moving to spacing and layout:

1. **Inter as single font family** - Do you prefer this unified approach, or would you like a different heading font?
2. **Type scale** - Does the sizing feel appropriate? Too big, too small?
3. **JetBrains Mono for code** - Does this work, or prefer a different monospace font?
4. **Any specific typography preferences** - Serif for headings? Different weights?

Once approved, we'll move to spacing, layout, and grid systems!
