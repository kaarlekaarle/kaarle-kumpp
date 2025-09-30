import { test, expect } from '@playwright/test';

const routes = ['/', '/about'];

test.describe('visual', () => {
  for (const route of routes) {
    test(`${route} desktop`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(route);
      await expect(page).toHaveScreenshot(`${route.replace('/','home')}-desktop.png`, { maxDiffPixels: 1 });
    });

    test(`${route} mobile`, async ({ page }) => {
      await page.setViewportSize({ width: 393, height: 852 }); // iPhone 14-ish
      await page.goto(route);
      await expect(page).toHaveScreenshot(`${route.replace('/','home')}-mobile.png`, { maxDiffPixels: 1 });
    });
  }
});
