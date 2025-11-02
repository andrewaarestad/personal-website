# AI-Assisted Development Guide

This document outlines how to effectively use AI agents to develop features for this personal website project.

## Overview

This repository is configured as a showcase for AI-assisted development, demonstrating how modern AI tools can accelerate development while maintaining code quality and consistency.

## MCP Integrations

### shadcn/ui MCP

The shadcn/ui Model Context Protocol (MCP) integration allows AI agents to generate and install UI components on demand.

#### Prerequisites

- shadcn/ui is configured in `apps/website/components.json`
- Tailwind CSS is properly set up
- The `cn()` utility is available at `@/lib/utils`

#### Usage Examples

**Adding a Button Component:**

```
"Add a shadcn button component to the project"
```

**Creating a Card Layout:**

```
"Create a card component using shadcn and use it to display blog posts on the homepage"
```

**Building a Form:**

```
"Add shadcn form components (input, label, button) and create a contact form"
```

#### How It Works

1. AI agent invokes shadcn MCP
2. MCP downloads the requested component
3. Component is added to `apps/website/src/components/ui/`
4. Component is automatically configured for the project
5. AI agent can then use the component in pages/layouts

### Playwright MCP

Playwright MCP integration enables AI agents to create and run end-to-end tests.

#### Prerequisites

- Playwright will be configured when E2E testing is implemented
- Test files will be located in `tests/e2e/`

#### Usage Examples (Future)

**Creating a Homepage Test:**

```
"Create a Playwright test that verifies the homepage loads and displays the correct heading"
```

**Testing Navigation:**

```
"Add a Playwright test for the navigation menu that checks all links work"
```

**Form Submission Test:**

```
"Create an E2E test for the contact form submission flow"
```

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
