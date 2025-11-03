# Design Tests

Playwright tests for design workflow automation.

## Purpose

These tests are **not** traditional E2E tests. They are automation scripts for:
- Capturing screenshots of mood boards
- Generating visual documentation
- Comparing design iterations
- Validating responsive behavior

## Structure

```
design-tests/
├── mood-boards/        # Mood board screenshot capture
│   └── capture.spec.ts
└── helpers/            # Shared test utilities
    └── (future helpers)
```

## Prerequisites

1. **Install Playwright**:
   ```bash
   pnpm --filter @personal-website/website add -D @playwright/test
   ```

2. **Install browsers**:
   ```bash
   pnpm --filter @personal-website/website exec playwright install chromium
   ```

3. **Create Playwright config**:
   Create `playwright.config.ts` in `apps/website/`

## Running Tests

```bash
# Run all design tests
pnpm --filter @personal-website/website exec playwright test design-tests/

# Run with UI (interactive mode)
pnpm --filter @personal-website/website exec playwright test design-tests/ --ui

# Run specific test file
pnpm --filter @personal-website/website exec playwright test design-tests/mood-boards/capture.spec.ts
```

## Screenshot Capture Workflow

1. **Create mood board page** in `src/app/design-preview/[board]/`
2. **Update capture.spec.ts** with new board name
3. **Run dev server**: `pnpm dev`
4. **Run tests**: Generates screenshots to `design/mood-boards/[board]/screenshots/`

## Configuration

Playwright config should include:
- Multiple viewports (mobile, tablet, desktop)
- headless mode for CI
- Screenshots saved to design directory
- Dev server auto-start

See `docs/design-workflow.md` for configuration template.

## Future Enhancements

- [ ] Visual diff between iterations
- [ ] Accessibility testing (color contrast, etc.)
- [ ] Performance metrics
- [ ] Component variation capture

---

**These are design automation scripts, not production E2E tests.**
