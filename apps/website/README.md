# Website App

The main Next.js application for the personal website.

## Overview

Built with Next.js 15 App Router, this application provides the public-facing website and admin interface (future) for content management.

## Tech Stack

- **Next.js 15**: React framework with App Router
- **React 19**: UI library with Server Components
- **TypeScript**: Strict type checking
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Beautiful, accessible UI components
- **Vitest**: Unit and integration testing

## Development

```bash
# Install dependencies (from root)
pnpm install

# Run development server
pnpm dev

# Or run just this app
pnpm --filter @personal-website/website dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
apps/website/
├── src/
│   ├── app/                 # App Router
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Homepage
│   │   └── globals.css      # Global styles
│   │
│   ├── components/          # React components
│   │   └── ui/              # shadcn/ui components (generated)
│   │
│   ├── lib/                 # Utilities
│   │   └── utils.ts         # cn() helper for classnames
│   │
│   └── __tests__/           # Tests
│       ├── setup.ts         # Test configuration
│       └── example.test.tsx # Example tests
│
├── public/                  # Static assets
├── components.json          # shadcn/ui config
├── next.config.ts           # Next.js config
├── tailwind.config.ts       # Tailwind config
├── tsconfig.json            # TypeScript config
├── vitest.config.ts         # Vitest config
└── package.json             # Dependencies & scripts
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Type check with TypeScript
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm clean` - Remove build artifacts

## Adding UI Components

This app is configured with shadcn/ui. To add components manually:

```bash
pnpx shadcn@latest add button
pnpx shadcn@latest add card
pnpx shadcn@latest add form
```

Or let AI agents add them for you via shadcn MCP!

## Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
# DATABASE_URL - will be used when db-client is integrated
# NEXT_PUBLIC_APP_URL - public URL of the app
```

## Database Integration

The `@personal-website/db-client` package will be integrated for:

- User management
- Content management
- Blog posts
- Admin functionality

Import the Prisma client:

```typescript
import { prisma } from "@personal-website/db-client";
```

## Testing

Tests are written with Vitest and Testing Library:

```typescript
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("Component", () => {
  it("renders correctly", () => {
    render(<Component />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

## Styling

### Tailwind CSS

Use utility classes for styling:

```tsx
<div className="flex items-center justify-between p-4 bg-background">
  <h1 className="text-2xl font-bold">Title</h1>
</div>
```

### CSS Variables

Theme colors are defined as CSS variables in `globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  /* ... */
}
```

### Dark Mode

Dark mode is supported via the `.dark` class on the `<html>` element.

## Features (Planned)

- [ ] Blog system with posts and categories
- [ ] Content management admin interface
- [ ] Image upload and optimization
- [ ] SEO optimization
- [ ] RSS feed
- [ ] Search functionality
- [ ] Comments system
- [ ] Analytics integration

## Best Practices

1. **Server Components by Default**: Use Server Components unless interactivity is needed
2. **Type Safety**: Leverage TypeScript and Prisma types
3. **Accessibility**: Follow WCAG guidelines, use semantic HTML
4. **Performance**: Optimize images, minimize client-side JavaScript
5. **SEO**: Use proper metadata, semantic HTML, and structured data

## Deployment

This app is designed to be deployed on Vercel:

```bash
# Build locally to test
pnpm build

# Deploy to Vercel
vercel deploy
```

Environment variables must be configured in your deployment platform.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Vitest Documentation](https://vitest.dev/)
