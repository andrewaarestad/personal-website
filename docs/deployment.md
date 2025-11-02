# Deployment Guide

This document outlines the deployment strategy, CI/CD pipeline, and database migration workflow for the personal website project.

## Overview

The application is deployed on **Vercel** with automated deployments triggered by Git pushes. Database migrations are handled automatically during the build process with safety checks enforced via GitHub Actions.

## Table of Contents

- [Architecture](#architecture)
- [Vercel Setup](#vercel-setup)
- [Database Migrations](#database-migrations)
- [CI/CD Pipeline](#cicd-pipeline)
- [Environment Variables](#environment-variables)
- [Deployment Workflow](#deployment-workflow)
- [Rollback Procedures](#rollback-procedures)
- [Troubleshooting](#troubleshooting)

## Architecture

### Deployment Flow

```
Developer → Git Push → GitHub
                        ├── PR Checks (format, lint, test, build)
                        ├── Migration Check (if PR)
                        └── Merge to main
                             ↓
                          Vercel
                             ├── 1. Run migrations (prisma migrate deploy)
                             ├── 2. Build application (turbo build)
                             └── 3. Deploy to production
```

### Key Principles

1. **Migrations run before deployment** - Ensures database is ready for new code
2. **Idempotent migrations** - Safe to run multiple times
3. **PR approval required** - Migrations must be reviewed and approved
4. **Automatic deployments** - No manual intervention needed after merge

## Vercel Setup

### Initial Configuration

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository
   - Select the repository: `andrewaarestad/personal-website`

2. **Configure Project Settings**
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (monorepo root)
   - **Build Command**: Configured via `vercel.json`
   - **Install Command**: Configured via `vercel.json`

3. **Environment Variables** (See [Environment Variables](#environment-variables))

### Vercel Configuration

The project uses `vercel.json` for configuration:

```json
{
  "buildCommand": "pnpm --filter @personal-website/db-client db:migrate:deploy && pnpm build --filter @personal-website/website",
  "installCommand": "pnpm install --frozen-lockfile",
  "framework": "nextjs",
  "outputDirectory": "apps/website/.next"
}
```

**Key Features:**

- **Migration first**: `db:migrate:deploy` runs before build
- **Monorepo support**: Uses pnpm filters for targeted builds
- **Frozen lockfile**: Ensures consistent dependencies
- **Next.js optimized**: Vercel's native Next.js support

### Deployment Types

#### Production Deployments

- **Trigger**: Push to `main` branch
- **URL**: `https://your-domain.com`
- **Process**:
  1. Migrations applied to production database
  2. Application built with production config
  3. Deployed to production edge network

#### Preview Deployments

- **Trigger**: Push to any branch (including PRs)
- **URL**: `https://your-project-git-branch-name.vercel.app`
- **Process**:
  1. Uses preview database (if configured)
  2. Application built with preview config
  3. Deployed to unique preview URL

**Note**: Preview deployments do NOT run migrations by default. If you need to test migrations in preview:

- Set up a separate preview database
- Configure `DATABASE_URL` for preview environment

## Database Migrations

### Migration Strategy

This project uses **Prisma Migrate** with the following approach:

1. **Development**: Create migrations with `pnpm db:migrate`
2. **PR Review**: Automated check detects and displays pending migrations
3. **Production**: Migrations run automatically during Vercel build

### Creating Migrations

```bash
# Navigate to db-client package
cd packages/db-client

# Create a new migration
pnpm db:migrate

# You'll be prompted to name the migration
# Example: "add_user_roles"

# This creates:
# - packages/db-client/prisma/migrations/20231201123045_add_user_roles/
#   - migration.sql
```

### Migration Safety Checks

The project includes automated migration checks that run on every PR.

#### How It Works

1. **Database Status Check**: Uses `prisma migrate status` to query the production database
2. **Pending Migration Detection**: Compares local migrations with applied migrations in `_prisma_migrations` table
3. **PR Comment Posted**: A formatted comment is added showing:
   - List of pending migrations (only those not yet applied)
   - Timestamps
   - SQL preview (expandable)
   - Required approval notice
4. **Check Fails**: The PR check fails until migrations are approved
5. **Manual Approval**: Reviewer must resolve the comment thread to approve

#### Configuration Requirements

**Database Connection**: The migration check requires `DATABASE_URL` to be set in GitHub Actions secrets.

**Current Status**: ⚠️ Migration checks are **currently disabled** because the database is not yet provisioned.

**To Enable**:

1. Provision your production database
2. Create a read-only database user:
   ```sql
   -- PostgreSQL example
   CREATE ROLE github_readonly WITH LOGIN PASSWORD 'secure_password';
   GRANT CONNECT ON DATABASE your_db TO github_readonly;
   GRANT USAGE ON SCHEMA public TO github_readonly;
   GRANT SELECT ON public._prisma_migrations TO github_readonly;
   ```
3. Add `DATABASE_URL` secret in GitHub:
   - Settings → Secrets and variables → Actions
   - Add secret: `DATABASE_URL`
   - Value: Connection string with read-only user
4. Migration checks will automatically activate on the next PR

**Graceful Degradation**: Until `DATABASE_URL` is configured, PRs will show a skip notice explaining how to enable the checks

### Example Migration Comment

````markdown
## 🔄 Database Migrations Detected

> ⚠️ IMPORTANT: This PR will run 2 database migrations when merged to production.

### Migrations to be applied:

#### 1. add user roles

- **Timestamp:** `2023-12-01 12:30:45`
- **Directory:** `20231201123045_add_user_roles`

<details>
<summary>📜 View SQL</summary>

```sql
ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user';
CREATE INDEX idx_users_role ON users(role);
```
````

</details>

---

### ✅ Required Action

Before merging this PR:

1. **Review** the migrations above carefully
2. **Verify** they are safe to run in production
3. **Resolve** this comment thread to confirm approval

````

### Production Migrations

Production migrations run automatically via Vercel:

```bash
# In vercel.json buildCommand:
pnpm --filter @personal-website/db-client db:migrate:deploy

# This command:
# - Runs only pending migrations
# - Is idempotent (safe to run multiple times)
# - Fails the build if migrations fail
# - Prevents deployment of broken code
````

### Migration Best Practices

1. **Always test locally first**

   ```bash
   DATABASE_URL="postgresql://localhost:5432/mydb" pnpm db:migrate
   ```

2. **Use descriptive names**

   ```
   ✅ Good: add_user_roles, create_posts_table
   ❌ Bad: migration1, update
   ```

3. **Make migrations backwards compatible when possible**
   - Add columns as nullable first
   - Backfill data before adding constraints
   - Use multiple migrations for complex changes

4. **Test rollback scenarios**
   - Not all migrations can be rolled back
   - Plan for data preservation

5. **Review SQL before merging**
   - Check for destructive operations
   - Verify indexes are added
   - Ensure data integrity

## CI/CD Pipeline

### GitHub Actions Workflows

#### PR Checks (`.github/workflows/pr-checks.yml`)

Runs on: Pull requests to `main`, pushes to `claude/**` branches

**Jobs:**

1. **Code Quality & Build**
   - Format check
   - Linting
   - Type checking
   - Build
   - Tests

2. **Migration Check** (PRs only)
   - Detects pending migrations
   - Posts formatted comment
   - Requires approval if migrations exist

**All checks must pass before merge.**

### Local Pre-commit Checklist

Before pushing, always run:

```bash
pnpm format        # Format all files
pnpm lint          # Check for linting errors
pnpm type-check    # Verify TypeScript
pnpm build         # Ensure builds succeed
pnpm test          # Run all tests
```

## Environment Variables

### Required Variables

#### Production (Vercel)

Set these in Vercel Dashboard → Project → Settings → Environment Variables:

| Variable       | Description                  | Example                                             |
| -------------- | ---------------------------- | --------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db?schema=public` |
| `NODE_ENV`     | Environment mode             | `production`                                        |

#### Development (Local)

Create `.env` files in relevant packages:

**`packages/db-client/.env`:**

```env
DATABASE_URL="postgresql://localhost:5432/personal_website_dev"
```

**`apps/website/.env.local`:**

```env
# Add any Next.js specific variables here
```

### Adding New Variables

1. **Add to Vercel**
   - Dashboard → Settings → Environment Variables
   - Set for Production, Preview, or both

2. **Add to local `.env`**
   - Never commit `.env` files
   - Document in `.env.example`

3. **Reference in code**
   ```typescript
   const dbUrl = process.env.DATABASE_URL;
   ```

## Deployment Workflow

### Standard PR Flow

1. **Create Feature Branch**

   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make Changes**
   - Write code
   - Add tests
   - Update docs

3. **Create/Update Migrations** (if schema changes)

   ```bash
   cd packages/db-client
   pnpm db:migrate
   ```

4. **Run Local Checks**

   ```bash
   pnpm format
   pnpm lint
   pnpm type-check
   pnpm build
   pnpm test
   ```

5. **Push Branch**

   ```bash
   git push origin feature/my-feature
   ```

6. **Create Pull Request**
   - PR checks run automatically
   - If migrations exist, review migration comment
   - Fix any failing checks

7. **Review Process**
   - Code review
   - **If migrations present**: Resolve migration comment thread to approve
   - All checks must pass

8. **Merge to Main**
   - Vercel automatically deploys
   - Migrations run first
   - Build completes
   - Production updated

### Hotfix Flow

For urgent production fixes:

1. **Create Hotfix Branch from Main**

   ```bash
   git checkout main
   git pull
   git checkout -b hotfix/critical-bug
   ```

2. **Make Minimal Changes**
   - Fix only the critical issue
   - Avoid schema changes if possible

3. **Fast-track Review**
   - Request immediate review
   - Ensure tests pass

4. **Merge and Deploy**
   - Vercel deploys within minutes
   - Monitor production logs

## Rollback Procedures

### Application Rollback

**Option 1: Vercel Dashboard**

1. Go to Deployments
2. Find the last working deployment
3. Click "Promote to Production"

**Option 2: Git Revert**

```bash
git revert <commit-hash>
git push origin main
# Vercel auto-deploys the reverted code
```

### Database Rollback

**⚠️ WARNING**: Database rollbacks are complex and risky.

#### If Migration Just Ran

1. **Check Migration History**

   ```bash
   pnpm --filter @personal-website/db-client db:migrate:status
   ```

2. **Manual Rollback** (requires database access)

   ```bash
   # Connect to production database
   # Run reverse migration SQL manually
   ```

3. **Mark Migration as Reverted**
   ```bash
   # Remove migration from _prisma_migrations table
   ```

#### Prevention is Best

- **Test migrations thoroughly** before merging
- **Use backwards-compatible migrations** when possible
- **Backup database** before major migrations
- **Plan data migrations** separately from schema migrations

### Emergency Procedures

If production is broken after deployment:

1. **Rollback application** via Vercel (immediate)
2. **Assess database state**
3. **If database corrupted**:
   - Restore from backup
   - Re-run migrations
4. **Create hotfix** to prevent recurrence

## Troubleshooting

### Build Failures

#### "Migration failed"

**Symptoms**: Vercel build fails with migration error

**Solutions**:

```bash
# Check migration status locally
DATABASE_URL="<production-url>" pnpm db:migrate:status

# Manually run migrations
DATABASE_URL="<production-url>" pnpm db:migrate:deploy

# If migration is invalid, create new migration to fix
pnpm db:migrate
```

#### "Build command exited with 1"

**Symptoms**: Build fails after migrations succeed

**Solutions**:

- Check Vercel build logs
- Verify all environment variables are set
- Test build locally:
  ```bash
  pnpm build --filter @personal-website/website
  ```

### Migration Issues

#### "Migration already applied"

**This is normal**. `prisma migrate deploy` is idempotent.

#### "Database schema is not in sync"

**Symptoms**: Migration fails with schema mismatch

**Solutions**:

```bash
# Reset local database
pnpm db:push

# Regenerate client
pnpm db:generate

# Try migration again
pnpm db:migrate
```

#### "Cannot drop column: has data"

**Symptoms**: Migration fails because it would lose data

**Solutions**:

1. Create a two-step migration:

   ```sql
   -- Migration 1: Add new column
   ALTER TABLE users ADD COLUMN new_email VARCHAR(255);

   -- (Backfill data in application code)

   -- Migration 2: Drop old column
   ALTER TABLE users DROP COLUMN old_email;
   ```

### Deployment Issues

#### "Preview deployment successful but production fails"

**Possible causes**:

- Environment variable mismatch
- Database connection issues
- Dependency version conflicts

**Solutions**:

- Compare environment variables (preview vs production)
- Check database connectivity from Vercel
- Verify `pnpm-lock.yaml` is committed

#### "Deployment is slow"

**Causes**:

- Large migrations
- Cold cache
- Heavy dependencies

**Solutions**:

- Break large migrations into smaller ones
- Optimize dependencies
- Use Vercel's caching features

### Database Connection Issues

#### "Can't connect to database"

**Checklist**:

- [ ] `DATABASE_URL` set in Vercel
- [ ] Database allows connections from Vercel IPs
- [ ] Connection string is correct
- [ ] Database is running

**Test connection**:

```bash
# In Vercel deployment logs, look for:
# "Prisma schema loaded from prisma/schema.prisma"
# "Connecting to database..."
```

## Monitoring & Observability

### Vercel Logs

Access logs via:

- Vercel Dashboard → Deployments → [deployment] → Logs
- Real-time logs during build
- Runtime logs for deployed application

### Migration Logs

Check migration status:

```bash
# Production
DATABASE_URL="<production-url>" pnpm db:migrate:status

# Local
pnpm db:migrate:status
```

### Health Checks

Consider adding:

- `/api/health` endpoint for uptime monitoring
- Database connection check
- Migration status verification

## Best Practices Summary

### Do's ✅

- Always test migrations locally first
- Review migration SQL before merging
- Resolve migration comment threads in PRs
- Run full checks before pushing (`pnpm format && pnpm lint && pnpm type-check && pnpm build && pnpm test`)
- Use descriptive migration names
- Keep migrations small and focused
- Document complex migrations

### Don'ts ❌

- Don't merge PRs with failing migration checks
- Don't skip migration reviews
- Don't create destructive migrations without backups
- Don't modify existing migrations
- Don't commit `.env` files
- Don't force-push to `main`

## Additional Resources

- [Prisma Migrate Documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Vercel Deployment Documentation](https://vercel.com/docs/deployments/overview)
- [Next.js Deployment Best Practices](https://nextjs.org/docs/deployment)
- [Project README](../README.md)
- [AI-Assisted Development Guide](./ai-agents.md)

## Support

For issues or questions:

- Check this documentation first
- Review Vercel deployment logs
- Check GitHub Actions logs
- Open an issue in the repository
