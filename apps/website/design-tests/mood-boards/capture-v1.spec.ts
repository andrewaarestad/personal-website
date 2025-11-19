import { test, expect } from "@playwright/test";
import { mkdir } from "fs/promises";
import { join } from "path";

const MOOD_BOARD = "v1-initial";
const MOOD_BOARD_URL = `/design-preview/${MOOD_BOARD}`;

test.describe(`Mood Board: ${MOOD_BOARD}`, () => {
  test.beforeAll(async () => {
    // Ensure screenshot directory exists
    const dir = join(__dirname, "../../design/mood-boards", MOOD_BOARD, "screenshots");
    await mkdir(dir, { recursive: true });
  });

  test("capture full page @Mobile", async ({ page, browserName }) => {
    await page.goto(MOOD_BOARD_URL);

    // Wait for fonts to load
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000); // Additional wait for font rendering

    // Verify page loaded by checking h1 exists (flexible - doesn't check exact text)
    await expect(page.locator("h1")).toBeVisible();

    const screenshotPath = join(
      __dirname,
      "../../design/mood-boards",
      MOOD_BOARD,
      "screenshots",
      `full-page-mobile.png`
    );

    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });
  });

  test("capture full page @Tablet", async ({ page, browserName }) => {
    await page.goto(MOOD_BOARD_URL);

    // Wait for fonts to load
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Verify page loaded by checking h1 exists (flexible - doesn't check exact text)
    await expect(page.locator("h1")).toBeVisible();

    const screenshotPath = join(
      __dirname,
      "../../design/mood-boards",
      MOOD_BOARD,
      "screenshots",
      `full-page-tablet.png`
    );

    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });
  });

  test("capture full page @Desktop", async ({ page, browserName }) => {
    await page.goto(MOOD_BOARD_URL);

    // Wait for fonts to load
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Verify page loaded by checking h1 exists (flexible - doesn't check exact text)
    await expect(page.locator("h1")).toBeVisible();

    const screenshotPath = join(
      __dirname,
      "../../design/mood-boards",
      MOOD_BOARD,
      "screenshots",
      `full-page-desktop.png`
    );

    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });
  });

  test("capture color palette section @Desktop", async ({ page, browserName }) => {
    await page.goto(MOOD_BOARD_URL);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    const section = page.locator("section").filter({ hasText: "Color Palette" }).first();

    const screenshotPath = join(
      __dirname,
      "../../design/mood-boards",
      MOOD_BOARD,
      "screenshots",
      `section-colors-desktop.png`
    );

    await section.screenshot({ path: screenshotPath });
  });

  test("capture typography section @Desktop", async ({ page, browserName }) => {
    await page.goto(MOOD_BOARD_URL);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    const section = page.locator("section").filter({ hasText: "Typography" }).first();

    const screenshotPath = join(
      __dirname,
      "../../design/mood-boards",
      MOOD_BOARD,
      "screenshots",
      `section-typography-desktop.png`
    );

    await section.screenshot({ path: screenshotPath });
  });

  test("capture hero section @Desktop", async ({ page, browserName }) => {
    await page.goto(MOOD_BOARD_URL);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    const section = page.locator("section").filter({ hasText: "Andrew Aarestad" }).first();

    const screenshotPath = join(
      __dirname,
      "../../design/mood-boards",
      MOOD_BOARD,
      "screenshots",
      `section-hero-desktop.png`
    );

    await section.screenshot({ path: screenshotPath });
  });
});
