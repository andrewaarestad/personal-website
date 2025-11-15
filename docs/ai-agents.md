# AI-Assisted Development Guide

This document outlines how to effectively use AI agents to develop features for this personal website project.

## Overview

This repository is configured as a showcase for AI-assisted development, demonstrating how modern AI tools can accelerate development while maintaining code quality and consistency.

## 🎨 Design-First Workflow

**Before building features, we establish comprehensive design guidelines.**

This project uses a design-first approach optimized for AI collaboration:
1. Define brand guidelines and personas
2. Create a visual design system (colors, typography, spacing)
3. Generate interactive mood boards
4. Deploy to Vercel for review
5. Iterate based on feedback
6. Freeze design and implement

**📖 See [Design Workflow Guide](./design-workflow.md) for complete instructions.**

This workflow is optimized for **Claude Code mobile and cloud environments**, using CLI tools and programmatic APIs.

## ✍️ Copywriting & Content Creation Workflow

**Just as we design-first for visual elements, we follow a content-first workflow for stories and pages.**

When creating long-form content (project pages, thought leadership, tutorials), follow this structured process:

1. **Preparation** - Review brand guidelines, voice & tone, existing content
2. **Research** - Conduct web research on the topic
3. **Story Outline** - Plan narrative structure and PostLayout component sequence
4. **Writing Plan** - Define tone, style, and rhetorical approaches
5. **User Approval** - ⚠️ STOP and get feedback before writing
6. **Implementation** - Write content and implement with PostLayout components

**📖 See [Copywriting Workflow Guide](./copywriting-workflow.md) for complete instructions.**

### Key Copywriting Resources

**Guidelines:**
- `design/brand/guidelines.md` - Brand mission, values, personality
- `design/brand/voice-tone.md` - Writing style, tone spectrum, do's/don'ts
- `design/brand/copywriting-checklist.md` - Quick reference during writing

**Templates:**
- `design/templates/story-outline-template.md` - Structure your content
- `design/templates/writing-plan-template.md` - Plan tone and style

**Examples:**
- `design/examples/research-example.md` - Sample research notes
- `apps/website/src/app/projects/sample-post/page.tsx` - Complete PostLayout example

### PostLayout Component System

For long-form content, use the PostLayout component system:

**Available Components:**
- `H1Section` - Main page title
- `H2Section` - Section headings
- `TextSection` - Body text (supports multi-paragraph)
- `ImageSection` - Full-width images
- `TextImageSection` - Text + image side-by-side (image-left or image-right)
- `DataVisualizationSection` - Charts, graphs, interactive widgets

**Example Usage:**

```typescript
import {
  PostLayout,
  H1Section,
  H2Section,
  TextSection,
  ImageSection,
} from "@/components/post-layout";

export default function MyStory() {
  return (
    <PostLayout>
      {[
        <H1Section key="title" text="My Story Title" />,
        <TextSection key="intro" text="Introduction paragraph..." />,
        <H2Section key="section1" text="The Challenge" />,
        <TextSection key="problem" text="Problem description..." />,
        <ImageSection
          key="diagram"
          imageUrl="https://..."
          alt="Descriptive alt text"
        />,
      ]}
    </PostLayout>
  );
}
```

### Brand Voice Quick Reference

When writing content:

✅ **DO:**
- Start with big picture before technical details
- Use specific numbers ("5,000 devices" not "at scale")
- Explain technical terms in context
- Discuss trade-offs honestly
- Write like a human (occasional fragments OK)

❌ **DON'T:**
- Use hype language (revolutionary, game-changing)
- Hide behind jargon without explanation
- Be performatively enthusiastic ("Super excited to share...")
- Use corporate speak (leverage, synergy, ideate)

**Full checklist:** `design/brand/copywriting-checklist.md`

## Tool Integrations

### For Cloud Environments (Claude Code Mobile)

When working in cloud environments (Claude Code mobile app), we use **CLI tools** instead of MCP servers:

#### shadcn/ui CLI

Use the shadcn CLI to add components:

```bash
pnpx shadcn@latest add button
pnpx shadcn@latest add card
pnpx shadcn@latest add form
```

**Configuration:**
- Configured in `apps/website/components.json`
- Components added to `apps/website/src/components/ui/`
- Automatically configured for Tailwind CSS
- Uses `cn()` utility from `@/lib/utils`

**Usage Examples:**

```
"Add a shadcn button component using the CLI"
"Add card and badge components for the blog post listing"
"Install form, input, and label components for the contact form"
```

#### Playwright API

Use Playwright programmatically for testing and screenshots:

```bash
pnpm --filter @personal-website/website add -D @playwright/test
pnpm --filter @personal-website/website exec playwright install chromium
```

**Configuration:**
- Config file: `apps/website/playwright.config.ts`
- Design tests: `apps/website/design-tests/`
- E2E tests: `apps/website/tests/e2e/` (future)

**Usage Examples:**

```
"Create a Playwright test to capture homepage screenshots"
"Write a script to take screenshots of all mood board iterations"
"Add a Playwright test for the contact form submission"
```

### For Local Environments (Optional)

If using Claude Desktop locally, MCP servers can be configured:

#### shadcn/ui MCP (Optional)

Provides semantic search and discovery of components.

**Benefits:**
- Browse component registry
- Search by purpose ("find form components")
- Get detailed component metadata

**Setup:** Configure in Claude Desktop settings (not available in cloud)

#### Playwright MCP (Optional)

Enables interactive browser automation.

**Benefits:**
- Record interactions
- Generate test code automatically
- Structured page data

**Setup:** Configure in Claude Desktop settings (not available in cloud)

## Best Practices for AI Collaboration

### 1. Clear Context

Always provide clear context when requesting changes:

✅ **Good:**

```
"Add a hero section to the homepage with a gradient background,
heading, subtitle, and CTA button using shadcn components"
```

❌ **Bad:**

```
"Make the homepage better"
```

### 2. Incremental Changes

Break large features into smaller, testable increments:

✅ **Good:**

```
1. "Create the blog post data model in Prisma schema"
2. "Add API route to fetch blog posts"
3. "Create blog post card component"
4. "Add blog post listing page"
```

❌ **Bad:**

```
"Build a complete blog system with everything"
```

### 3. Type Safety

Leverage TypeScript for better AI understanding:

- Use explicit types for function parameters and returns
- Export types from shared packages
- Use Prisma-generated types for database operations

### 4. Testing

Request tests alongside features:

```
"Add a ProductCard component and include a Vitest test
that checks it renders with proper props"
```

### 5. Documentation

Ask AI to document complex features:

```
"Add JSDoc comments to the authentication utility functions"
```

## Common Workflows

### Creating Long-Form Content (Project Pages, Stories)

```
1. "Help me create a project page about [topic]"
   Agent: Reads brand guidelines, voice-tone guide, existing content
   Agent: Conducts web research on topic

2. Agent: Creates story outline using template
   Agent: Creates writing plan using template
   Agent: Presents outline + plan for approval

3. User: Reviews and provides feedback

4. Agent: Implements approved plan with PostLayout components
   Agent: Adds metadata for SEO
   Agent: Tests locally and on Vercel preview
```

**Key Difference:** Always STOP for approval after outline/plan, before writing.

### Adding a New Page

```
1. "Create a new 'about' page at app/about/page.tsx"
2. "Add metadata for SEO"
3. "Create an AboutHero component with shadcn"
4. "Add a Vitest test for the about page"
```

### Creating a Feature

```
1. "Add a Comment model to the Prisma schema with user and post relations"
2. "Generate Prisma client and update types"
3. "Create API route for fetching comments"
4. "Create CommentList and CommentForm components"
5. "Add components to the post detail page"
6. "Write tests for comment functionality"
```

### Styling Updates

```
1. "Update the color scheme in tailwind.config.ts to use a blue theme"
2. "Adjust the homepage hero section colors to match"
3. "Update CSS variables in globals.css"
```

## Project-Specific Guidelines

### Component Organization

- **UI Components**: `apps/website/src/components/ui/` (shadcn)
- **Feature Components**: `apps/website/src/components/`
- **Layout Components**: `apps/website/src/app/` (with route)

### State Management

- Server Components by default (Next.js 15)
- Client Components only when interactivity is needed
- Use React Server Actions for mutations

### Database Access

- Always import from `@personal-website/db-client`
- Use Prisma-generated types
- Handle errors gracefully
- Use transactions for multi-step operations

### Styling Guidelines

- Use Tailwind classes for styling
- Follow shadcn/ui design patterns
- Use CSS variables from `globals.css`
- Maintain responsive design (mobile-first)

## Example Prompts

### For Layout Changes

```
"Create a three-column layout on the homepage: sidebar, main content, and widgets.
Use shadcn card components for each section."
```

### For Data Features

```
"Add a 'views' counter to blog posts:
1. Add a 'views' field to the Post model
2. Create an API route to increment views
3. Display view count on post cards
4. Add a Vitest test for the view counter logic"
```

### For Styling

```
"Implement dark mode support:
1. Add a theme toggle button using shadcn
2. Update the layout to include the toggle
3. Ensure all components work in both themes"
```

### For Testing

```
"Create comprehensive tests for the blog post listing page:
1. Test that posts render correctly
2. Test filtering by category
3. Test pagination
4. Test loading and error states"
```

## Tips for Success

1. **Be Specific**: Include file paths, component names, and exact requirements
2. **Reference Existing Code**: Point to similar implementations in the codebase
3. **Request Verification**: Ask AI to run tests and builds after changes
4. **Iterative Refinement**: Start with basic implementation, then refine
5. **Follow Conventions**: Request code that matches existing patterns

## Monorepo Considerations

When working with the monorepo:

- Specify which package you're working in
- Understand package dependencies
- Run builds in the correct order
- Test changes across dependent packages

```
"Update the db-client package to add a new User method,
then update the website package to use it in the profile page"
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Playwright Documentation](https://playwright.dev/)

## Contributing to This Guide

This guide should evolve as the project grows. When you discover effective AI collaboration patterns, document them here!
