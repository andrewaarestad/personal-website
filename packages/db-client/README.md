# @personal-website/db-client

Shared database client package using Prisma ORM for PostgreSQL.

## Setup

1. Copy `.env.example` to `.env` and configure your database URL:

   ```bash
   cp .env.example .env
   ```

2. Generate Prisma client:

   ```bash
   pnpm db:generate
   ```

3. Push schema to database (development):

   ```bash
   pnpm db:push
   ```

4. Or create and run migrations (production):
   ```bash
   pnpm db:migrate
   ```

## Usage

Import the Prisma client in your application:

```typescript
import { prisma } from "@personal-website/db-client";

// Query users
const users = await prisma.user.findMany();

// Create a post
const post = await prisma.post.create({
  data: {
    title: "My First Post",
    slug: "my-first-post",
    content: "Hello, world!",
    author: {
      connect: { id: userId },
    },
  },
});
```

## Available Scripts

- `pnpm build` - Build the package
- `pnpm dev` - Watch mode for development
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:push` - Push schema to database (dev)
- `pnpm db:migrate` - Create and run migrations
- `pnpm db:studio` - Open Prisma Studio (database GUI)

## Database Schema

### User

- Used for admin authentication (future)
- Has many posts

### Post

- Content management (blog posts, pages)
- Belongs to a user (author)
- Supports draft/published workflow

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string (required)

## Notes

- The Prisma client is automatically cached in development to prevent connection exhaustion
- Logging is enabled in development mode for query debugging
- Connection pooling is handled automatically by Prisma
