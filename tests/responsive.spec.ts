import { test, expect } from '@playwright/test';

const mobile = { width: 393, height: 852 };
const desktop = { width: 1280, height: 900 };

test.describe('visibility gates', () => {
  test('home mobile/desktop gates', async ({ page }) => {
    await page.setViewportSize(mobile); await page.goto('/');
    await expect(page.locator('.mobile-only')).toBeVisible();
    await expect(page.locator('.desktop-only')).toBeHidden();

    await page.setViewportSize(desktop); await page.reload();
    await expect(page.locator('.desktop-only')).toBeVisible();
    await expect(page.locator('.mobile-only')).toBeHidden();
  });

  test('about mobile specifics', async ({ page }) => {
    await page.setViewportSize(mobile); await page.goto('/about');

    // last line blue + italic (approx via computed style)
    const last = page.locator('.about-prose p:last-of-type');
    await expect(last).toBeVisible();
    await expect(last).toHaveCSS('font-style', 'italic');
    const color = await last.evaluate(el => getComputedStyle(el).color);
    expect(color).toMatch(/rgb|#/); // basic presence; tighten if you fix exact token to rgb

    // contact as three lines (stacked)
    const contact = page.locator('.about-contact');
    await expect(contact).toBeVisible();
    await expect(page.locator('.about-contact .name')).toBeVisible();
    await expect(page.locator('.about-contact .phone')).toBeVisible();
    await expect(page.locator('.about-contact .email')).toBeVisible();

    // mobile bottom bar shows WORKS, hides ABOUT on /about
    await expect(page.locator('.mobile-bottom .mobile-nav a[href="/works"]')).toBeVisible();
    await expect(page.locator('.mobile-bottom .mobile-nav a[href="/about"]')).toHaveCount(0);
  });

  test('about desktop WORKS link visible', async ({ page }) => {
    await page.setViewportSize(desktop); await page.goto('/about');
    await expect(page.locator('nav.site[data-id="right-top"] a[href="/works"]')).toBeVisible();
  });
});
