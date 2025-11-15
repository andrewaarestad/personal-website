# Mood Board: v1-initial

**Created**: January 2025
**Status**: 🚧 In Review
**Live Preview**: Available after Vercel deployment

## Design Goals

This first iteration establishes the "art studio aesthetic" defined in our brand guidelines. The goal is to create a light, airy foundation with bold accent colors that feel like an artist's workspace—clean and professional, with pops of color that draw attention like finished pieces in a gallery.

### Key Objectives
1. Demonstrate the complete color system (vermillion, blue, gold)
2. Show typography hierarchy with system fonts
3. Showcase component library in realistic contexts
4. Prove the design system works across different content types

## Key Decisions

### Color System
- **Vermillion Red (#E63946)** as primary action color - Bold and confident for CTAs
- **True Blue (#1D70B8)** as secondary - Technical credibility and trust
- **Golden Yellow (#F7B32B)** as tertiary - Warmth and creative highlights
- **Canvas (#FAFAFA)** as page background - Light, airy studio feeling
- **Black (#000000) for headlines** - Impact and definition

**Rationale**: These colors capture the "primary hues from an art supply store" concept while maintaining WCAG AA accessibility standards. The vermillion provides energy without aggression, blue adds technical credibility, and gold brings creative warmth.

### Typography
- **System font stack** instead of Google Fonts (due to environment constraints)
- **Sans-serif for both headings and body** - Unified, modern approach
- **Monospace for code** - Clear technical content distinction
- **Type scale based on 1.250 ratio** - Clear hierarchy without excessive jumps

**Rationale**: Using system fonts ensures fast loading and consistent rendering. The unified sans-serif approach is cleaner and more modern than mixing serif/sans-serif, while still providing clear hierarchy through weight and size.

### Component Approach
- **shadcn/ui base components** - Production-quality, accessible foundation
- **Custom color mapping** - Map shadcn variants to our design system
- **Responsive design** - Mobile-first with thoughtful breakpoints

## Mood Board Sections

The mood board demonstrates:

1. **Color Palette** - All foundation, accent, and semantic colors with hex values
2. **Typography** - Complete heading hierarchy (H1-H6), body text variations, code samples
3. **Buttons** - All variants (primary, secondary, outline, ghost, destructive) and sizes
4. **Form Components** - Input fields, labels, textarea in a realistic contact form
5. **Cards** - Project showcase cards with badges and different button styles
6. **Hero Section** - Full homepage hero with gradient background
7. **Blog Post** - Long-form content with proper typography, code blocks, callouts
8. **Data Table** - Structured data presentation with our color system
9. **Embedded Media** - Responsive video placeholder (16:9 aspect ratio)

## Technical Implementation

### Stack
- **Next.js 15** - App Router with Server Components
- **Tailwind CSS** - Custom configuration with design system tokens
- **shadcn/ui** - Accessible component primitives
- **TypeScript** - Full type safety

### File Structure
```
apps/website/
├── src/
│   ├── app/
│   │   └── design-preview/
│   │       └── v1-initial/
│   │           └── page.tsx          # Mood board page
│   ├── components/
│   │   └── ui/                       # shadcn components
│   └── lib/
│       └── utils.ts                  # cn() utility
├── design/
│   └── mood-boards/
│       └── v1-initial/
│           ├── README.md             # This file
│           └── screenshots/          # (Available on Vercel)
└── tailwind.config.ts                # Design system configuration
```

### Accessibility
- **WCAG AA compliant** color contrasts
- **Semantic HTML** throughout
- **Keyboard navigation** support in all interactive elements
- **Focus states** visible on all controls

## Feedback & Iteration

### Questions for Review
1. **Color balance** - Do the vermillion, blue, and gold accents work together? Too bold or just right?
2. **Typography hierarchy** - Is the heading scale clear? Does body text feel comfortable to read?
3. **Component styling** - Do buttons and cards feel polished? Any rough edges?
4. **Overall aesthetic** - Does this capture the "art studio" feeling we're aiming for?

### Known Limitations
- **System fonts only** - Using fallback fonts instead of Inter/JetBrains Mono due to environment constraints
- **No local screenshots** - Playwright browser crashes on the large page; screenshots will be available on Vercel
- **Placeholder video** - Video section shows placeholder instead of actual embedded content

### Next Steps
- Deploy to Vercel for live review
- Gather feedback on visual direction
- Iterate on any elements that need refinement
- Create v2 iteration if major changes are needed

## Design System Tokens

### Colors (Tailwind Classes)
```
Backgrounds: bg-canvas, bg-surface
Accents: bg-brand, bg-brand-secondary, bg-highlight (with -light, -dark variants)
Text: text-text-primary, text-text-secondary, text-black, text-black-accent
Borders: border-border-light, border-border-default
```

### Typography (Tailwind Classes)
```
Headings: text-h1 through text-h6
Body: text-body-xl, text-body-lg, text-body, text-body-sm
Labels: text-label, text-label-sm
Code: font-mono text-code
```

### Components
- Button: 6 variants, 4 sizes
- Card: Header, Content, Footer with flexible layouts
- Input/Textarea: Consistent styling with focus states
- Table: Clean data presentation
- Badge: Accent color backgrounds for tags

## Notes

This mood board is intentionally comprehensive to showcase the full design system. In production, individual pages would use subsets of these elements as needed. The goal here is to validate that all pieces work together cohesively before building actual site features.

---

**Review the live mood board at**: `/design-preview/v1-initial` (after Vercel deployment)
