# Claude Code Context

This repository is a **personal website project** designed as both a functional application and a **showcase for AI-assisted development**. When working on this project, please follow the guidelines below.

## Project Overview

- **Framework**: Next.js 15 with App Router and React 19
- **Database**: PostgreSQL with Prisma ORM
- **Monorepo**: Turborepo with pnpm workspaces
- **Styling**: Tailwind CSS with shadcn/ui
- **Testing**: Vitest + Testing Library + Playwright (future)
- **Target**: Node 22

## Architecture

```
personal-website/
├── apps/
│   └── website/          # Main Next.js application
├── packages/
│   └── db-client/        # Shared Prisma database client
└── docs/
    └── ai-agents.md      # Detailed AI development guide (READ THIS!)
```

## 📖 Essential Reading

**Before making changes, review:**

- [Agent Quick Reference](./docs/agent-quick-reference.md) - Quick start guide for AI agents
- [Design Workflow Guide](./docs/design-workflow.md) - Design-first development workflow
- [AI-Assisted Development Guide](./docs/ai-agents.md) - Comprehensive guide for AI collaboration
- [Root README](./README.md) - Project setup and architecture
- Package READMEs in `apps/website/` and `packages/db-client/`

## Key Conventions

### Design-First Approach

**Before implementing features, establish design guidelines:**

1. **Brand Foundation** - Define mission, persona, voice & tone
2. **Visual System** - Colors, typography, spacing, components
3. **Mood Boards** - Interactive previews deployed to Vercel
4. **Iteration** - Review, refine, repeat until approved
5. **Implementation** - Build with approved design system

**📖 See [Design Workflow Guide](./docs/design-workflow.md) for complete instructions.**

This workflow is optimized for **Claude Code mobile** using CLI tools (shadcn, Playwright) instead of MCP servers.

### Content-First Approach (Copywriting)

**When creating long-form content (project pages, stories), follow a structured copywriting workflow:**

1. **Preparation** - Review brand guidelines, voice & tone, existing content
2. **Research** - Conduct web research on the topic
3. **Story Outline** - Plan narrative structure and component sequence
4. **Writing Plan** - Define tone, style, and rhetorical approaches
5. **User Approval** - ⚠️ STOP and get feedback before writing
6. **Implementation** - Write content using PostLayout components

**📖 See [Copywriting Workflow Guide](./docs/copywriting-workflow.md) for complete instructions.**

**Key Resources:**
- Brand guidelines: `design/brand/guidelines.md`
- Voice & tone guide: `design/brand/voice-tone.md`
- Templates: `design/templates/`
- PostLayout example: `apps/website/src/app/projects/sample-post/page.tsx`

### Code Quality

- **TypeScript**: Strict mode enabled - all code must be fully typed
- **Formatting**: Prettier (run `pnpm format` before committing)
- **Linting**: ESLint with flat config
- **Testing**: Write tests alongside features using Vitest

### Monorepo Workflow

```bash
# Install dependencies
pnpm install

# Run all checks (ALWAYS run before committing)
pnpm pr-check      # ⚡ FASTEST: Runs all checks in parallel

# Or run checks individually for targeted debugging:
pnpm format:check  # Check code formatting
pnpm lint          # Check for linting errors
pnpm type-check    # Verify TypeScript types
pnpm build         # Build all packages
pnpm test          # Run all tests

# Development
pnpm dev                                        # All packages
pnpm --filter @personal-website/website dev    # Just website

# Database (requires PostgreSQL)
cd packages/db-client
pnpm db:generate  # Generate Prisma client
pnpm db:push      # Push schema to database
```

### Git & CI/CD

- **Branch naming**: `claude/*` for AI-assisted work
- **Commits**: Descriptive messages with context
- **PR Checks**: Format, lint, type-check, build, test (all must pass)
- Always verify checks pass locally before pushing

## MCP Integrations

This project is configured for Model Context Protocol integrations:

### shadcn/ui MCP

- **Config**: `apps/website/components.json`
- **Usage**: Generate UI components on demand
- **Example**: "Add a shadcn button component and use it in the homepage"

### Playwright MCP (Future)

- **Purpose**: E2E testing
- **Usage**: Generate and run end-to-end tests
- **Example**: "Create a Playwright test for the homepage navigation"

## Database Guidelines

### Current State

- Prisma schema defined in `packages/db-client/prisma/schema.prisma`
- Stub models: User, Post (for future content management)
- **Important**: Types in `packages/db-client/src/types.ts` are stubs until `pnpm db:generate` is run

### When Adding Models

1. Update `schema.prisma`
2. Run `pnpm db:generate` to generate Prisma client
3. Create migration: `pnpm db:migrate`
4. Update type exports in `src/types.ts`
5. Add to package exports if needed

## Common Tasks

### Adding a New Page

1. Create route in `apps/website/src/app/[route]/page.tsx`
2. Add metadata for SEO
3. Use Server Components by default
4. Write tests in `__tests__` directory

### Adding UI Components

1. Use shadcn MCP: "Add shadcn [component-name]"
2. Or manually: `pnpx shadcn@latest add [component]`
3. Components go in `apps/website/src/components/ui/`
4. Use `cn()` utility from `@/lib/utils` for className merging

### Adding Database Features

1. Update Prisma schema
2. Generate client: `pnpm db:generate`
3. Create migration: `pnpm db:migrate`
4. Import from `@personal-website/db-client`
5. Use in Server Components or API routes

### Before Committing

```bash
# ⚡ FASTEST: Run all checks in parallel (recommended)
pnpm pr-check      # Runs format:check, lint, type-check, build, test

# Alternative: Run checks individually for targeted debugging
pnpm format        # Format all files
pnpm lint          # Check for linting errors
pnpm type-check    # Verify TypeScript
pnpm build         # Ensure builds succeed
pnpm test          # Run all tests
```

**Pro tip for AI agents**: Use `pnpm pr-check` for the fastest validation. Only run individual commands if you need to debug a specific check failure.

## Future Features

The following are planned but not yet implemented:

- [ ] Admin authentication system
- [ ] Content management interface
- [ ] Blog with posts and categories
- [ ] Image upload and optimization
- [ ] Comprehensive Playwright E2E tests
- [ ] Production deployment configuration

## Best Practices

1. **Be Explicit**: Provide file paths, specific requirements, and exact changes needed
2. **Test-Driven**: Write tests alongside features
3. **Type-Safe**: Leverage TypeScript for better code quality
4. **Document**: Update READMEs and comments for complex features
5. **Verify**: Always run checks before committing
6. **Incremental**: Break large features into smaller, testable chunks

## Project Goals

This repository demonstrates:

- Modern monorepo architecture with Turborepo
- Type-safe full-stack development with Next.js and Prisma
- AI-assisted development workflows
- Best practices for testing and code quality
- MCP integrations for rapid development

## Getting Help

- **Setup Issues**: See [README.md](./README.md#getting-started)
- **AI Development**: See [docs/ai-agents.md](./docs/ai-agents.md)
- **Package Details**: Check individual package READMEs
- **CI/CD**: Review [.github/workflows/pr-checks.yml](./.github/workflows/pr-checks.yml)

---

**Remember**: This is both a functional project AND a showcase. Code should be production-quality, well-tested, and demonstrate best practices for AI-assisted development.
