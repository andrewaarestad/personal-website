#!/usr/bin/env node

/**
 * Check for pending Prisma migrations and format output for PR comments
 *
 * This script:
 * 1. Checks if DATABASE_URL is configured (gracefully skips if not)
 * 2. Uses `prisma migrate status` to detect pending migrations
 * 3. Formats them beautifully as markdown
 * 4. Exits with code 0 (workflow uses output variables for approval logic)
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const MIGRATIONS_DIR = path.join(__dirname, "../../packages/db-client/prisma/migrations");
const DB_CLIENT_DIR = path.join(__dirname, "../../packages/db-client");

/**
 * Check if database is configured
 */
function isDatabaseConfigured() {
  return !!process.env.DATABASE_URL;
}

/**
 * Output skip message when database is not configured
 */
function outputSkipMessage() {
  const message = `## 🔄 Database Migration Check - Skipped

> ℹ️ **Database not yet configured**: Migration checks are currently disabled.

### Current Status

The migration check is **disabled** because \`DATABASE_URL\` is not configured in GitHub Actions secrets.

### To Enable Migration Checks

Once your database is provisioned:

1. **Add the secret** in GitHub:
   - Go to: Settings → Secrets and variables → Actions
   - Add secret: \`DATABASE_URL\` with your **production** database connection string
   - Use a **read-only** user that can only access the \`_prisma_migrations\` table

2. **Migration checks will automatically activate** on the next PR

3. **Security**: Use a read-only database role:
   \`\`\`sql
   -- PostgreSQL example
   CREATE ROLE github_readonly WITH LOGIN PASSWORD 'secure_password';
   GRANT CONNECT ON DATABASE your_db TO github_readonly;
   GRANT USAGE ON SCHEMA public TO github_readonly;
   GRANT SELECT ON public._prisma_migrations TO github_readonly;
   \`\`\`

---

<sub>🤖 This check will automatically run once \`DATABASE_URL\` is configured</sub>
`;

  // Output for GitHub Actions
  const outputFile = process.env.GITHUB_OUTPUT;
  if (outputFile) {
    const delimiter = "EOF_MIGRATION_COMMENT";
    fs.appendFileSync(outputFile, `migration_comment<<${delimiter}\n${message}\n${delimiter}\n`);
    fs.appendFileSync(outputFile, `has_migrations=false\n`);
    fs.appendFileSync(outputFile, `check_skipped=true\n`);
  }

  console.log("⏭️  Migration check skipped: DATABASE_URL not configured");
  console.log("   Set DATABASE_URL in GitHub Actions secrets to enable migration checks");
}

/**
 * Get pending migrations using prisma migrate status
 */
function getPendingMigrations() {
  try {
    const output = execSync("pnpm prisma migrate status", {
      cwd: DB_CLIENT_DIR,
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    });

    // Parse output for pending migrations
    // Output format:
    // "Following migration have not yet been applied:"
    // "20231201123045_add_user_table"
    // "20231215140530_add_post_table"

    const lines = output.split("\n");
    const pendingIndex = lines.findIndex(
      (line) =>
        line.includes("have not yet been applied") || line.includes("has not yet been applied")
    );

    if (pendingIndex === -1) {
      // No pending migrations
      return [];
    }

    // Collect migration names after the "not yet been applied" line
    const migrations = [];
    for (let i = pendingIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.startsWith("To apply")) break;
      migrations.push(line);
    }

    return migrations;
  } catch (error) {
    // If prisma migrate status fails, throw error with details
    const stderr = error.stderr ? error.stderr.toString() : "";
    const stdout = error.stdout ? error.stdout.toString() : "";
    throw new Error(`Failed to check migration status: ${error.message}\n${stdout}\n${stderr}`);
  }
}

/**
 * Parse migration directory name
 * Format: 20231201123045_add_user_table
 */
function parseMigrationName(dirname) {
  const match = dirname.match(/^(\d{14})_(.+)$/);
  if (!match) return { timestamp: dirname, name: dirname };

  const timestamp = match[1];
  const name = match[2].replace(/_/g, " ");

  // Format timestamp: 20231201123045 -> 2023-12-01 12:30:45
  const year = timestamp.slice(0, 4);
  const month = timestamp.slice(4, 6);
  const day = timestamp.slice(6, 8);
  const hour = timestamp.slice(8, 10);
  const minute = timestamp.slice(10, 12);
  const second = timestamp.slice(12, 14);

  const formatted = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

  return { timestamp: formatted, name };
}

/**
 * Read migration SQL file
 */
function getMigrationSQL(dirname) {
  const sqlPath = path.join(MIGRATIONS_DIR, dirname, "migration.sql");

  if (!fs.existsSync(sqlPath)) {
    return null;
  }

  const sql = fs.readFileSync(sqlPath, "utf-8").trim();

  // Truncate long SQL
  if (sql.length > 500) {
    return sql.slice(0, 500) + "\n... (truncated)";
  }

  return sql;
}

/**
 * Format migrations as beautiful markdown
 */
function formatMigrations(migrations) {
  if (migrations.length === 0) {
    return null;
  }

  let output = `## 🔄 Database Migrations Detected\n\n`;
  output += `> **⚠️ IMPORTANT:** This PR will run **${migrations.length}** database migration${migrations.length > 1 ? "s" : ""} when merged to production.\n\n`;
  output += `### Migration${migrations.length > 1 ? "s" : ""} to be applied:\n\n`;

  migrations.forEach((migration, index) => {
    const { timestamp, name } = parseMigrationName(migration);
    const sql = getMigrationSQL(migration);

    output += `#### ${index + 1}. ${name}\n\n`;
    output += `- **Timestamp:** \`${timestamp}\`\n`;
    output += `- **Directory:** \`${migration}\`\n\n`;

    if (sql) {
      output += `<details>\n`;
      output += `<summary>📜 View SQL</summary>\n\n`;
      output += `\`\`\`sql\n${sql}\n\`\`\`\n\n`;
      output += `</details>\n\n`;
    }
  });

  output += `---\n\n`;
  output += `### ✅ Required Action\n\n`;
  output += `Before merging this PR:\n\n`;
  output += `1. **Review** the migrations above carefully\n`;
  output += `2. **Verify** they are safe to run in production\n`;
  output += `3. **Resolve** this comment thread to confirm approval\n\n`;
  output += `### 🚀 Deployment Process\n\n`;
  output += `When this PR is merged:\n\n`;
  output += `1. **Migrations run first** via \`prisma migrate deploy\` in Vercel build\n`;
  output += `2. **Build completes** with updated schema\n`;
  output += `3. **Deployment succeeds** with migrated database\n\n`;
  output += `> **Note:** If migrations fail, the build will fail and no deployment will occur.\n\n`;
  output += `---\n\n`;
  output += `<sub>🤖 This comment was automatically generated by the migration check workflow</sub>\n`;

  return output;
}

/**
 * Main execution
 */
function main() {
  // Check if database is configured
  if (!isDatabaseConfigured()) {
    outputSkipMessage();
    process.exit(0);
  }

  // Get pending migrations from database
  let migrations;
  try {
    migrations = getPendingMigrations();
  } catch (error) {
    console.error("❌ Failed to check migration status:");
    console.error(error.message);
    process.exit(1);
  }

  if (migrations.length === 0) {
    console.log("✅ No pending migrations detected");
    process.exit(0);
  }

  const formatted = formatMigrations(migrations);

  // Output to file for GitHub Actions to use
  const outputFile = process.env.GITHUB_OUTPUT;
  if (outputFile) {
    // Use multiline string format for GitHub Actions
    const delimiter = "EOF_MIGRATION_COMMENT";
    fs.appendFileSync(outputFile, `migration_comment<<${delimiter}\n${formatted}\n${delimiter}\n`);
    fs.appendFileSync(outputFile, `has_migrations=true\n`);
    fs.appendFileSync(outputFile, `check_skipped=false\n`);
  }

  // Also print to console
  console.log(formatted);

  // Exit with 0 since detection was successful
  // The workflow relies on output variables (has_migrations) for approval logic
  process.exit(0);
}

main();
