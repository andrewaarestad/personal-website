# Personal Website

> A modern personal website built with Next.js 15 - A playground and showcase for AI-assisted development

[![PR Checks](https://github.com/andrewaarestad/personal-website/actions/workflows/pr-checks.yml/badge.svg)](https://github.com/andrewaarestad/personal-website/actions/workflows/pr-checks.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

This repository houses a personal website with a focus on modern web technologies and AI-assisted development workflows. It serves as both a functional website and a public example of how AI agents can effectively contribute to software development.

### Tech Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **Language**: TypeScript 5.7 (strict mode)
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS 3 with shadcn/ui
- **Monorepo**: Turborepo with pnpm workspaces
- **Testing**: Vitest + Testing Library + Playwright
- **CI/CD**: GitHub Actions

## Project Structure

```
personal-website/
├── apps/
│   └── website/              # Next.js application
│       ├── src/
│       │   ├── app/         # App Router pages
│       │   ├── components/  # React components
│       │   └── lib/         # Utilities
│       └── public/          # Static assets
│
├── packages/
│   └── db-client/           # Shared database client (Prisma)
│       ├── src/             # Client code
│       └── prisma/          # Database schema
│
├── .github/
│   └── workflows/           # CI/CD workflows
│
└── docs/                    # Documentation
```

## Getting Started

### Prerequisites

- **Node.js**: 22 or higher
- **pnpm**: 9 or higher
- **PostgreSQL**: 14 or higher (for database features)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/andrewaarestad/personal-website.git
   cd personal-website
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   cp apps/website/.env.example apps/website/.env
   cp packages/db-client/.env.example packages/db-client/.env
   # Edit .env files with your configuration
   ```

4. Generate Prisma client:

   ```bash
   cd packages/db-client
   pnpm db:generate
   ```

5. Start development server:
   ```bash
   pnpm dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see the website.

## Available Scripts

### Root Commands

- `pnpm dev` - Start all packages in development mode
- `pnpm build` - Build all packages
- `pnpm test` - Run tests across all packages
- `pnpm lint` - Lint all packages
- `pnpm type-check` - Type check all packages
- `pnpm format` - Format all files with Prettier
- `pnpm format:check` - Check formatting
- `pnpm clean` - Clean all build artifacts and dependencies

### Package-Specific Commands

```bash
# Run commands in specific packages
pnpm --filter @personal-website/website dev
pnpm --filter @personal-website/db-client build
```

## Monorepo Architecture

This project uses Turborepo for high-performance monorepo management:

- **Intelligent Caching**: Turborepo caches task outputs for faster rebuilds
- **Parallel Execution**: Tasks run in parallel when possible
- **Dependency Graph**: Automatic task ordering based on package dependencies

### Packages

#### `@personal-website/website`

The main Next.js application with:

- Server Components for optimal performance
- shadcn/ui integration for beautiful UI components
- Configured for content management (future)
- Admin interface (future)

#### `@personal-website/db-client`

Shared database client with:

- Prisma ORM for type-safe database access
- PostgreSQL schema with migrations
- Reusable across applications

## AI-Assisted Development

This repository is designed as a showcase for AI agent collaboration. See [docs/ai-agents.md](./docs/ai-agents.md) for details on:

- Using shadcn MCP for UI component generation
- Using Playwright MCP for E2E testing
- Best practices for AI-assisted development
- Example prompts and workflows

## Database

The project uses PostgreSQL with Prisma ORM:

```bash
# Generate Prisma client
pnpm --filter @personal-website/db-client db:generate

# Push schema to database (development)
pnpm --filter @personal-website/db-client db:push

# Create and run migrations (production)
pnpm --filter @personal-website/db-client db:migrate

# Open Prisma Studio (database GUI)
pnpm --filter @personal-website/db-client db:studio
```

## Testing

### Unit & Integration Tests

```bash
# Run all tests
pnpm test

# Watch mode
pnpm --filter @personal-website/website test:watch
```

### E2E Tests (Future)

Playwright tests will be added for end-to-end testing with MCP integration.

## Deployment

Deployment configurations will be added in future updates. The application is designed to work with:

- **Vercel** - Recommended for Next.js
- **Railway** - For PostgreSQL database
- **Docker** - For containerized deployment

## Contributing

This is a personal project, but contributions and suggestions are welcome! Feel free to:

1. Open issues for bugs or feature requests
2. Submit PRs for improvements
3. Use this as a template for your own projects

## CI/CD

GitHub Actions automatically runs on pull requests:

- ✅ Format checking
- ✅ Linting
- ✅ Type checking
- ✅ Building
- ✅ Testing

See [.github/workflows/pr-checks.yml](./.github/workflows/pr-checks.yml) for details.

## Development Roadmap

- [x] Initial monorepo setup
- [x] Next.js app with shadcn/ui configuration
- [x] Database client with Prisma
- [x] GitHub Actions CI/CD
- [ ] Content management system
- [ ] Admin interface with authentication
- [ ] Blog functionality
- [ ] Image management
- [ ] Playwright E2E tests
- [ ] Production deployment

## License

MIT © [Andrew Aarestad](https://github.com/andrewaarestad)
