# PR Readiness Check (prc) - Verify Branch is Ready for PR

This command runs all CI/CD checks locally and iteratively fixes any issues until the branch is ready for PR.

User-provided additional info: <user_data> $ARGUMENTS </user_data>

## Overview

Run the same checks that CI/CD runs on pull requests:
1. **format:check** - Prettier formatting checks
2. **lint** - ESLint linting checks
3. **type-check** - TypeScript type checking
4. **test** - Unit tests (Vitest)
5. **build** - Production build (Next.js + tsc)

When issues are found, attempt to fix them automatically and re-run until all pass.

---

## Phase 1: Pre-format and Run PR Readiness Check

First, run the formatter to auto-fix any formatting issues upfront (this prevents re-runs due to format failures):

```bash
pnpm format
```

Then run the full check (runs all checks in parallel via Turborepo):

```bash
pnpm pr-check
```

If all pass, report success and exit.

If any checks fail, proceed to Phase 2.

---

## Phase 2: Fix Failures

Handle failures in this order (earlier fixes often resolve later issues):

### 2.1 Lint Errors

1. **Read the lint error output** and make manual edits:
   - Unused variables/imports → remove them
   - Missing imports → add them
   - Code style issues → fix per linter suggestions
   - Complexity issues → refactor the code

2. **Re-run lint to verify:**
   ```bash
   pnpm lint
   ```

### 2.2 Format Errors

1. **Run the formatter to auto-fix:**
   ```bash
   pnpm format
   ```

2. **Re-run format check to verify:**
   ```bash
   pnpm format:check
   ```

Format errors should always be fixable with `pnpm format`.

### 2.3 Type-check Errors

TypeScript errors require manual fixes. Common issues:

- **Missing types** → Add type annotations or install @types packages
- **Type mismatches** → Fix the code to match expected types
- **Missing properties** → Add required properties to objects
- **Null/undefined issues** → Add proper null checks

Read error messages carefully and edit the relevant files.

### 2.4 Test Failures

1. **Read the test output** to understand what failed
2. **Determine if it's a code bug or test bug:**
   - If the code is wrong → fix the code
   - If the test is wrong/outdated → fix the test
3. **Re-run tests:**
   ```bash
   pnpm test
   ```

### 2.5 Build Errors

Build errors are usually caused by:
- TypeScript errors (fix those first)
- Missing dependencies
- Import/export issues
- Environment configuration

Read the build output and fix the underlying issues.

---

## Phase 3: Iterate Until All Pass

After fixing issues, run the full check again:

```bash
pnpm pr-check
```

If failures remain, return to Phase 2 and fix them.

Repeat until all checks pass.

---

## Phase 4: Report Success

When all checks pass, report to the user:

```
All PR readiness checks passed:
✓ Format
✓ Lint
✓ Type-check
✓ Test
✓ Build

The branch is ready for PR.
```

---

## Running Checks on Specific Packages

To run checks on a specific package only:

```bash
# Lint only the website app
pnpm turbo run lint --filter=@personal-website/website

# Test only the db-client package
pnpm turbo run test --filter=@personal-website/db-client

# Build only the website app
pnpm turbo run build --filter=@personal-website/website
```

---

## Task Reference

| Task | Check Command | Auto-fixable |
|------|---------------|--------------|
| format:check | `pnpm format:check` | Yes (`pnpm format`) |
| lint | `pnpm lint` | No - manual fixes required |
| type-check | `pnpm type-check` | No - manual fixes required |
| test | `pnpm test` | No - manual fixes required |
| build | `pnpm build` | No - fix underlying issues |

---

## Important Notes

1. **Always run the full check** (`pnpm pr-check`) at the end to verify everything passes together.

2. **Fix issues in order**: format/lint first, then type-check, then tests, then build.

3. **Don't skip checks**: All checks must pass for CI/CD to succeed.

4. **Read error messages carefully**: The output tells you exactly what's wrong and often suggests fixes.

---

## Success Criteria

The PR Readiness Check is complete when:

- [ ] `pnpm pr-check` passes with no errors
- [ ] All format errors resolved
- [ ] All lint errors resolved
- [ ] All type-check errors resolved
- [ ] All tests passing
- [ ] Build succeeds
