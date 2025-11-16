# Visual Design System

This directory contains the visual design system specification.

## Files to Create

### color-system.md

Define the color palette:

- Primary colors
- Neutral colors (backgrounds, text, borders)
- Semantic colors (success, error, warning, info)
- Dark mode variants (if applicable)
- Accessibility notes (WCAG contrast ratios)
- Tailwind configuration code

### typography.md

Define the type system:

- Font families (heading, body, monospace)
- Type scale (H1-H6, body, small, label)
- Font weights and sizes
- Line heights and letter spacing
- Responsive typography rules
- Tailwind configuration code

### spacing-layout.md

Define spacing and layout:

- Spacing scale (based on 4px or 8px units)
- Grid system
- Container widths
- Breakpoints
- Common layout patterns

### components-catalog.md

Document component design patterns:

- List of needed components
- Design specifications for each
- Variants and states
- Usage guidelines

## Order of Creation

1. **Start with colors** - establishes visual foundation
2. **Then typography** - defines content hierarchy
3. **Then spacing** - creates visual rhythm
4. **Finally components** - applies system to UI elements

## Implementation

Once approved, these specifications will be implemented in:

- `tailwind.config.ts` - Tailwind theme configuration
- `src/app/globals.css` - CSS custom properties
- Individual components - Component-level styles

---

**Base all decisions on brand guidelines from `../brand/guidelines.md`**
