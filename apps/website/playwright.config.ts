import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for design mood board screenshot capture
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./design-tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "Mobile",
      use: {
        ...devices["iPhone 13"],
        viewport: { width: 375, height: 667 },
      },
    },
    {
      name: "Tablet",
      use: {
        viewport: { width: 768, height: 1024 },
      },
    },
    {
      name: "Desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
  ],

  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
