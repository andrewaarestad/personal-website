# Design-First Development Workflow

This document outlines the design-first development workflow for this project, specifically optimized for AI agent collaboration using Claude Code mobile in a cloud environment.

## Philosophy

Before writing production code, we establish comprehensive design guidelines through:
1. **Brand & Strategy** - Who we are and who we serve
2. **Visual Design System** - Colors, typography, spacing, components
3. **Mood Board Iterations** - Live previews deployed to Vercel
4. **Multimodal Review** - Claude sees designs, provides feedback, iterates

## Workflow Overview

```
┌─────────────────┐
│ 1. Define Brand │
│    Guidelines   │
└────────┬────────┘
         │
┌────────▼────────┐
│ 2. Create Visual│
│  Design System  │
└────────┬────────┘
         │
┌────────▼────────┐
│ 3. Generate     │
│   Mood Boards   │
└────────┬────────┘
         │
┌────────▼────────┐
│ 4. Take         │
│  Screenshots    │
└────────┬────────┘
         │
┌────────▼────────┐
│ 5. Deploy to    │
│    Vercel       │
└────────┬────────┘
         │
┌────────▼────────┐
│ 6. Review &     │
│    Iterate      │
└────────┬────────┘
         │
┌────────▼────────┐
│ 7. Freeze &     │
│   Implement     │
└─────────────────┘
```

## Tools & Technologies

Since this workflow is designed for Claude Code mobile (cloud environment), we use **CLI/API approaches** rather than MCP servers:

### shadcn/ui
- **Tool**: `pnpx shadcn@latest add [component]`
- **Config**: `apps/website/components.json` (already configured)
- **Usage**: Direct CLI commands to add components

### Playwright
- **Tool**: `@playwright/test` package
- **Config**: `apps/website/playwright.config.ts` (to be created)
- **Usage**: Programmatic Node.js API for screenshots and testing

### Vercel Deployment
- **Tool**: Git push triggers automatic deployment
- **Config**: `vercel.json` (already configured)
- **Usage**: Push to branch → Vercel creates preview URL

## Directory Structure

```
apps/website/
├── design/                         # Design documentation
│   ├── brand/                      # Brand & strategy
│   │   ├── guidelines.md           # Brand mission, values, personality
│   │   ├── persona.md              # Target audience definitions
│   │   └── voice-tone.md           # Writing style guide
│   ├── visual/                     # Visual design system
│   │   ├── color-system.md         # Color palette & usage
│   │   ├── typography.md           # Font system & hierarchy
│   │   ├── spacing-layout.md       # Spacing scale & grid
│   │   └── components-catalog.md   # Component patterns
│   └── mood-boards/                # Mood board iterations
│       └── [iteration-name]/       # e.g., "v1-minimal", "v2-bold"
│           ├── README.md           # Iteration notes & decisions
│           └── screenshots/        # Generated screenshots
├── design-tests/                   # Playwright tests for design
│   ├── mood-boards/                # Tests that generate mood boards
│   └── helpers/                    # Shared test utilities
└── src/
    └── app/
        └── design-preview/         # Special routes for design review
            └── [board]/            # Dynamic routes: /design-preview/v1-minimal
                └── page.tsx        # Mood board display page
```

## Phase 1: Define Brand Guidelines

### Agent Instructions

When asked to create brand guidelines, follow these steps:

1. **Create the brand directory structure** if it doesn't exist
2. **Engage with the user** to understand:
   - Brand mission and purpose
   - Target audience characteristics
   - Brand personality traits
   - Competitive positioning
3. **Document in structured markdown** with clear sections
4. **Reference these guidelines** in all subsequent design decisions

### Template: `design/brand/guidelines.md`

```markdown
# Brand Guidelines

## Mission Statement
[What is the purpose of this website/brand?]

## Core Values
- [Value 1]
- [Value 2]
- [Value 3]

## Brand Personality
[Adjectives: professional, playful, minimal, bold, etc.]

## Competitive Positioning
[How is this different from similar sites/brands?]

## Key Messages
[What should users take away from this site?]
```

### Template: `design/brand/persona.md`

```markdown
# Target Personas

## Primary Persona: [Name]

**Demographics:**
- Age range
- Professional background
- Technical expertise level

**Goals:**
- What they want to achieve
- Why they visit the site

**Pain Points:**
- Challenges they face
- Frustrations with current solutions

**User Journey:**
1. Discovery
2. Exploration
3. Engagement
4. Return visits
```

### Template: `design/brand/voice-tone.md`

```markdown
# Voice & Tone Guide

## Writing Style
- [Formal/Casual]
- [Technical/Accessible]
- [Concise/Detailed]

## Tone Spectrum

| Context | Tone | Example |
|---------|------|---------|
| Homepage | [e.g., Welcoming, Professional] | "Welcome to..." |
| Error Messages | [e.g., Helpful, Apologetic] | "Oops, something went wrong..." |
| Technical Content | [e.g., Clear, Authoritative] | "This feature allows..." |

## Do's and Don'ts
- ✅ Do: [Example]
- ❌ Don't: [Example]
```

## Phase 2: Create Visual Design System

### Agent Instructions

1. **Base decisions on brand guidelines** created in Phase 1
2. **Start with colors**, then typography, then spacing
3. **Document accessibility considerations** (WCAG contrast ratios)
4. **Provide code snippets** for Tailwind config when appropriate
5. **Get user approval** before moving to next element

### Template: `design/visual/color-system.md`

```markdown
# Color System

## Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Primary | #XXXXXX | rgb(XXX, XXX, XXX) | CTAs, links, primary actions |
| Primary Dark | #XXXXXX | rgb(XXX, XXX, XXX) | Hover states, emphasis |
| Primary Light | #XXXXXX | rgb(XXX, XXX, XXX) | Backgrounds, subtle highlights |

## Neutral Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Background | #XXXXXX | rgb(XXX, XXX, XXX) | Page background |
| Surface | #XXXXXX | rgb(XXX, XXX, XXX) | Card backgrounds |
| Border | #XXXXXX | rgb(XXX, XXX, XXX) | Borders, dividers |
| Text Primary | #XXXXXX | rgb(XXX, XXX, XXX) | Main text |
| Text Secondary | #XXXXXX | rgb(XXX, XXX, XXX) | Supporting text |

## Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| Success | #XXXXXX | Success messages, confirmations |
| Error | #XXXXXX | Error messages, destructive actions |
| Warning | #XXXXXX | Warnings, cautions |
| Info | #XXXXXX | Informational messages |

## Dark Mode

[If applicable, document dark mode variants]

## Accessibility Notes

- Primary/Background contrast: X:1 (WCAG AAA)
- Text/Background contrast: X:1 (WCAG AA Large Text)
- Link/Background contrast: X:1 (WCAG AA)

## Tailwind Configuration

```typescript
// tailwind.config.ts additions
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#XXXXXX',
        dark: '#XXXXXX',
        light: '#XXXXXX',
      },
      // ... more colors
    }
  }
}
```
```

### Template: `design/visual/typography.md`

```markdown
# Typography System

## Font Families

**Primary Font (Headings):**
- Font: [Font Name]
- Weights: [e.g., 400, 600, 700]
- Source: [Google Fonts, local, etc.]
- Fallback: [fallback stack]

**Secondary Font (Body):**
- Font: [Font Name]
- Weights: [e.g., 400, 500, 600]
- Source: [Google Fonts, local, etc.]
- Fallback: [fallback stack]

**Monospace Font (Code):**
- Font: [Font Name]
- Usage: Code blocks, technical content

## Type Scale

| Level | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| H1 | XXpx / Xrem | X.X | XXX | Page titles |
| H2 | XXpx / Xrem | X.X | XXX | Section headings |
| H3 | XXpx / Xrem | X.X | XXX | Subsection headings |
| H4 | XXpx / Xrem | X.X | XXX | Card titles |
| Body Large | XXpx / Xrem | X.X | XXX | Intro paragraphs |
| Body | XXpx / Xrem | X.X | XXX | Main content |
| Body Small | XXpx / Xrem | X.X | XXX | Captions, footnotes |
| Label | XXpx / Xrem | X.X | XXX | Form labels, UI labels |

## Responsive Typography

- Mobile (< 768px): [adjustments]
- Tablet (768px - 1024px): [adjustments]
- Desktop (> 1024px): [base scale]

## Tailwind Configuration

```typescript
// tailwind.config.ts additions
theme: {
  extend: {
    fontFamily: {
      heading: ['Font Name', 'fallback'],
      body: ['Font Name', 'fallback'],
    },
    fontSize: {
      // ... type scale
    }
  }
}
```
```

### Template: `design/visual/spacing-layout.md`

```markdown
# Spacing & Layout System

## Spacing Scale

Based on [4px/8px] base unit:

| Name | Value | Usage |
|------|-------|-------|
| xs | Xpx | Tight spacing |
| sm | Xpx | Small spacing |
| md | Xpx | Default spacing |
| lg | Xpx | Large spacing |
| xl | Xpx | Extra large spacing |
| 2xl | Xpx | Section spacing |
| 3xl | Xpx | Page section spacing |

## Grid System

- Columns: [12-column / custom]
- Gutter: [Xpx]
- Container max-width: [Xpx]
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

## Layout Patterns

### Page Container
- Max width: [Xpx]
- Padding: [Xpx mobile, Xpx desktop]

### Card Spacing
- Padding: [Xpx]
- Gap between cards: [Xpx]

### Section Spacing
- Top/Bottom: [Xpx mobile, Xpx desktop]
```

### Template: `design/visual/components-catalog.md`

```markdown
# Component Catalog

List of components needed for the site, with design specifications.

## Navigation Components

### Header
- **Type**: [Fixed / Sticky / Static]
- **Height**: [Xpx]
- **Background**: [Color / Transparent]
- **Elements**: Logo, Navigation links, CTA button
- **States**: Default, Scrolled, Mobile menu open

### Footer
- **Layout**: [Multi-column / Simple]
- **Elements**: Links, Social icons, Copyright
- **Background**: [Color]

## Content Components

### Hero Section
- **Layout**: [Centered / Split / Full-width]
- **Elements**: Heading, Subtitle, CTA, Optional image/graphic
- **Background**: [Gradient / Solid / Image]
- **Height**: [Viewport height / Fixed]

### Card
- **Variants**: [Default / Elevated / Bordered]
- **Padding**: [Xpx]
- **Border Radius**: [Xpx]
- **Shadow**: [none / sm / md / lg]
- **Hover State**: [Transform / Shadow change / Border change]

## Interactive Components

### Button
- **Variants**: Primary, Secondary, Ghost, Destructive
- **Sizes**: Small, Medium, Large
- **States**: Default, Hover, Active, Disabled, Loading
- **Border Radius**: [Xpx]

### Form Input
- **Height**: [Xpx]
- **Border**: [Color, width]
- **Focus State**: [Border color, ring]
- **Error State**: [Border color, message color]

[Add more components as needed]
```

## Phase 3: Generate Mood Boards

### Agent Instructions

Mood boards are **live, interactive pages** that showcase the design system in action.

#### Step 1: Create Mood Board Page

1. **Create iteration directory**: `design/mood-boards/[iteration-name]/`
2. **Create Next.js page**: `src/app/design-preview/[board]/page.tsx`
3. **Implement design showcase** with:
   - Color palette swatches
   - Typography examples
   - Component variations
   - Layout patterns
   - Real content examples

#### Step 2: Document Iteration

Create `design/mood-boards/[iteration-name]/README.md`:

```markdown
# Mood Board: [Iteration Name]

**Created**: [Date]
**Status**: [In Review / Approved / Superseded]

## Design Goals

[What were we trying to achieve with this iteration?]

## Key Decisions

- Color: [Why these colors?]
- Typography: [Why these fonts?]
- Layout: [Why this approach?]

## Feedback Received

- [ ] [Feedback item 1]
- [ ] [Feedback item 2]

## Changes for Next Iteration

[What will we change based on feedback?]

## Screenshots

See `screenshots/` directory for visual captures.
```

#### Example Mood Board Page Structure

```typescript
// src/app/design-preview/[board]/page.tsx
export default async function MoodBoardPage({
  params
}: {
  params: Promise<{ board: string }>
}) {
  const { board } = await params;

  return (
    <main className="min-h-screen">
      {/* Color Palette Section */}
      <section className="p-24">
        <h1>Color Palette</h1>
        <div className="grid grid-cols-5 gap-4">
          {/* Color swatches with hex values */}
        </div>
      </section>

      {/* Typography Section */}
      <section className="p-24">
        <h1>Typography</h1>
        {/* All heading levels, body text examples */}
      </section>

      {/* Components Section */}
      <section className="p-24">
        <h1>Components</h1>
        {/* Button variants, cards, forms, etc. */}
      </section>

      {/* Layout Examples */}
      <section className="p-24">
        <h1>Layout Examples</h1>
        {/* Hero section, content layouts, etc. */}
      </section>
    </main>
  );
}
```

## Phase 4: Generate Screenshots

### Agent Instructions

Use Playwright to programmatically capture screenshots of mood boards.

#### Setup (First Time Only)

1. **Install Playwright** (if not in package.json):
   ```bash
   pnpm --filter @personal-website/website add -D @playwright/test
   ```

2. **Install browsers**:
   ```bash
   pnpm --filter @personal-website/website exec playwright install chromium
   ```

3. **Create Playwright config**:
   Create `apps/website/playwright.config.ts` (see configuration template below)

#### Configuration Template

```typescript
// apps/website/playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './design-tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },
    {
      name: 'Tablet',
      use: {
        viewport: { width: 768, height: 1024 }
      },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

#### Screenshot Generation Script

Create `apps/website/design-tests/mood-boards/capture.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const BOARDS = ['v1-minimal', 'v2-bold']; // Update with your boards

for (const board of BOARDS) {
  test.describe(`Mood Board: ${board}`, () => {
    test.beforeAll(async () => {
      // Ensure screenshot directory exists
      const dir = join(__dirname, '../../design/mood-boards', board, 'screenshots');
      await mkdir(dir, { recursive: true });
    });

    test('capture full page', async ({ page, browserName }) => {
      await page.goto(`/design-preview/${board}`);
      await expect(page).toHaveTitle(/Design Preview/);

      const screenshotPath = join(
        __dirname,
        '../../design/mood-boards',
        board,
        'screenshots',
        `full-page-${browserName}.png`
      );

      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      });
    });

    test('capture color section', async ({ page, browserName }) => {
      await page.goto(`/design-preview/${board}`);

      const colorSection = page.locator('section').first();
      const screenshotPath = join(
        __dirname,
        '../../design/mood-boards',
        board,
        'screenshots',
        `colors-${browserName}.png`
      );

      await colorSection.screenshot({ path: screenshotPath });
    });

    // Add more sections as needed
  });
}
```

#### Running Screenshots

```bash
# From project root
pnpm --filter @personal-website/website exec playwright test design-tests/mood-boards/capture.spec.ts

# With UI
pnpm --filter @personal-website/website exec playwright test design-tests/mood-boards/capture.spec.ts --ui
```

### Screenshot Workflow

1. **Create mood board page**
2. **Run dev server**: `pnpm dev`
3. **Run Playwright test**: Captures screenshots to `design/mood-boards/[iteration]/screenshots/`
4. **Review screenshots**: Read the files and show to user in conversation
5. **Commit screenshots**: Include in git commit for documentation

## Phase 5: Deploy to Vercel

### Agent Instructions

Vercel automatically deploys on every push to any branch. The workflow is:

1. **Commit mood board changes**:
   ```bash
   git add apps/website/src/app/design-preview/
   git add apps/website/design/
   git commit -m "Add mood board iteration: [iteration-name]"
   ```

2. **Push to branch**:
   ```bash
   git push -u origin [branch-name]
   ```

3. **Get preview URL**:
   - Vercel creates deployment automatically
   - URL pattern: `https://personal-website-[hash]-andrewaarestad.vercel.app`
   - Check GitHub PR for Vercel bot comment with URL
   - Or check Vercel dashboard

4. **Share URL with user** for external review

### Preview URL Structure

User can visit:
- Full site: `https://[preview-url].vercel.app`
- Specific mood board: `https://[preview-url].vercel.app/design-preview/[board]`

## Phase 6: Review & Iterate

### Agent Instructions

1. **Show screenshots** in conversation (use multimodal capability)
2. **Explain design decisions** based on brand guidelines
3. **Ask for feedback**:
   - Colors: Do they match brand personality?
   - Typography: Is hierarchy clear?
   - Components: Do they serve user needs?
   - Layout: Is it intuitive?

4. **Document feedback** in mood board README
5. **Create new iteration** based on feedback
6. **Repeat** until user approves

### Review Checklist

```markdown
## Design Review Checklist

### Brand Alignment
- [ ] Colors reflect brand personality
- [ ] Typography matches brand voice
- [ ] Overall feel matches brand guidelines

### User Experience
- [ ] Clear visual hierarchy
- [ ] Intuitive navigation
- [ ] Readable text (contrast, size)
- [ ] Responsive across devices

### Accessibility
- [ ] Color contrast meets WCAG AA
- [ ] Text is resizable
- [ ] Focus states are visible
- [ ] Alt text for images

### Technical
- [ ] Loads quickly
- [ ] No console errors
- [ ] Works across browsers
- [ ] Mobile-friendly
```

## Phase 7: Freeze & Implement

### Agent Instructions

Once design is approved:

1. **Mark iteration as approved** in README:
   ```markdown
   **Status**: ✅ Approved - Implementation Ready
   ```

2. **Update Tailwind config** with final design tokens:
   ```typescript
   // apps/website/tailwind.config.ts
   theme: {
     extend: {
       colors: { /* final colors */ },
       fontFamily: { /* final fonts */ },
       spacing: { /* final spacing */ },
     }
   }
   ```

3. **Update globals.css** with CSS custom properties:
   ```css
   @layer base {
     :root {
       --background: XXX XXX XXX;
       --foreground: XXX XXX XXX;
       /* ... more variables */
     }
   }
   ```

4. **Begin component implementation**:
   - Use `pnpx shadcn@latest add [component]` for base components
   - Customize to match design system
   - Build custom components as needed

5. **Reference approved mood board** for all design decisions

## Best Practices for Agents

### Communication

- **Be visual**: Take screenshots and show them in conversation
- **Explain reasoning**: Tie decisions back to brand guidelines
- **Ask questions**: Clarify ambiguous requirements
- **Iterate quickly**: Small changes, fast feedback loops

### Code Quality

- **Type-safe**: Use TypeScript strictly
- **Accessible**: Follow WCAG guidelines
- **Performant**: Optimize images, use Next.js Image component
- **Responsive**: Mobile-first approach

### Documentation

- **Keep it updated**: Update design docs as decisions change
- **Be specific**: Include exact values (colors, sizes, etc.)
- **Show examples**: Include code snippets and screenshots
- **Link related docs**: Reference brand guidelines in visual docs

### Git Workflow

- **Descriptive commits**: "Add mood board v1: minimal professional style"
- **Atomic commits**: One logical change per commit
- **Branch naming**: `claude/design-[iteration-name]-[session-id]`
- **Clean history**: Commits tell the design evolution story

## Common Commands Reference

```bash
# Development
pnpm dev                                           # Start dev server

# Add shadcn component
pnpx shadcn@latest add button                      # Add button component
pnpx shadcn@latest add card                        # Add card component

# Playwright
pnpm --filter @personal-website/website exec playwright install chromium
pnpm --filter @personal-website/website exec playwright test design-tests/
pnpm --filter @personal-website/website exec playwright test --ui

# Quality checks
pnpm pr-check                                      # Run all checks
pnpm format                                        # Format code
pnpm type-check                                    # Check TypeScript

# Git
git add apps/website/design/
git commit -m "Add design iteration"
git push -u origin [branch-name]
```

## Troubleshooting

### Playwright Issues

**Error: "Browser not installed"**
```bash
pnpm --filter @personal-website/website exec playwright install chromium
```

**Error: "Cannot find module"**
```bash
pnpm install
```

**Screenshots are blank**
- Ensure dev server is running: `pnpm dev`
- Check baseURL in playwright.config.ts
- Add wait: `await page.waitForLoadState('networkidle')`

### Deployment Issues

**Vercel build fails**
- Run `pnpm pr-check` locally first
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json

**Preview URL not working**
- Wait for deployment to complete (1-2 minutes)
- Check GitHub PR for Vercel comment
- Verify branch is pushed to GitHub

### Design Issues

**Colors look different on mobile**
- Check dark mode support
- Verify color values in multiple contexts
- Test on actual devices via Vercel preview

**Fonts not loading**
- Ensure fonts are imported in layout.tsx
- Check font file paths
- Verify Google Fonts URL if using

## Next Steps

After completing this workflow:

1. **Archive design docs**: Move to `design/archive/` for reference
2. **Update README**: Document the implemented design system
3. **Create component library**: Build out all approved components
4. **Write tests**: Add Vitest tests for components
5. **Build features**: Start implementing actual site functionality

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Playwright](https://playwright.dev/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

**This workflow is optimized for Claude Code mobile and cloud environments, using CLI tools and programmatic APIs rather than MCP servers.**
