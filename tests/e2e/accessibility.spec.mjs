import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { representativeRoutes } from './routes.mjs';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

async function expectNoWcagViolations(page, context) {
  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
  expect(results.violations, `${context}\n${JSON.stringify(results.violations, null, 2)}`).toEqual([]);
}

test.describe('representative WCAG A/AA scans', () => {
  for (const route of representativeRoutes) {
    test(`${route.path} has no automated WCAG A/AA violations`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: 'networkidle' });
      await expectNoWcagViolations(page, route.path);
    });
  }
});

test('mobile expanded navigation remains accessible', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto('/');
  const primary = page.getByRole('navigation', { name: 'Primary navigation' });
  await primary.locator('summary').click();
  await expect(primary.getByRole('link', { name: 'Systems' })).toBeVisible();
  await expectNoWcagViolations(page, 'expanded mobile primary navigation');
});

test('search result and empty-result states remain accessible', async ({ page }) => {
  await page.goto('/search/');
  const input = page.getByRole('searchbox', { name: 'Search terms' });
  await input.fill('hydroponic systems');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.getByRole('status')).toContainText(/result/i);
  await expectNoWcagViolations(page, 'populated search results');

  await input.fill('zzzx-hydrorigor-no-result-zzzx');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.getByRole('status')).toContainText('No results found');
  await expectNoWcagViolations(page, 'empty search results');
});

test('calculator validation and success states remain accessible', async ({ page }) => {
  await page.goto('/tools/nutrient-mixing-calculator/');
  const volume = page.getByLabel('Volume', { exact: true });
  const dose = page.getByLabel('Dose printed on the label');

  await volume.fill('0');
  await dose.fill('2');
  await page.getByRole('button', { name: 'Scale label dose' }).click();
  await expect(page.getByRole('status')).toContainText(/positive finite number/i);
  await expectNoWcagViolations(page, 'calculator validation error');

  await volume.fill('10');
  await page.getByRole('button', { name: 'Scale label dose' }).click();
  await expect(page.getByRole('status')).toContainText('Scaled amount: 20 mL');
  await expectNoWcagViolations(page, 'calculator success');
});

test('skip link and visible focus treatment are keyboard usable', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Skip to content' });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();

  const focusStyle = await skipLink.evaluate((element) => {
    const style = getComputedStyle(element);
    return { outlineStyle: style.outlineStyle, outlineWidth: Number.parseFloat(style.outlineWidth) };
  });
  expect(focusStyle.outlineStyle).not.toBe('none');
  expect(focusStyle.outlineWidth).toBeGreaterThanOrEqual(3);

  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main-content$/);
  expect(await page.evaluate(() => document.activeElement?.id)).toBe('main-content');
});
