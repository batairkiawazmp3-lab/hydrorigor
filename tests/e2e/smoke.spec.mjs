import { expect, test } from '@playwright/test';
import { fixtureRoutes, representativeRoutes, retiredRoutes } from './routes.mjs';

function collectBrowserFailures(page) {
  const failures = [];
  page.on('pageerror', (error) => failures.push(`pageerror: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') failures.push(`console: ${message.text()}`);
  });
  page.on('request', (request) => {
    if (/_vercel\/insights|vercel-insights|vercel-analytics/.test(request.url())) {
      failures.push(`unauthorized default analytics request: ${request.url()}`);
    }
  });
  return failures;
}

test.describe('representative route smoke', () => {
  for (const route of representativeRoutes) {
    test(`${route.path} renders meaningful static content`, async ({ page }) => {
      const browserFailures = collectBrowserFailures(page);
      const response = await page.goto(route.path, { waitUntil: 'networkidle' });

      expect(response?.ok(), `${route.path} returned ${response?.status()}`).toBeTruthy();
      await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://hydrorigor.com${route.path}`,
      );
      expect(browserFailures).toEqual([]);
    });
  }
});

test('desktop primary navigation reaches a real section', async ({ page }) => {
  await page.goto('/');
  const primary = page.getByRole('navigation', { name: 'Primary navigation' });
  await expect(primary.getByRole('link', { name: 'Start Here' })).toBeVisible();
  await primary.locator('summary').click();
  await primary.getByRole('link', { name: 'Systems' }).click();
  await expect(page).toHaveURL('/systems/');
  await expect(page.getByRole('heading', { level: 1, name: /Hydroponic systems/i })).toBeVisible();
});

test('mobile navigation remains visible, keyboard operable, and contained', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto('/');

  const primary = page.getByRole('navigation', { name: 'Primary navigation' });
  await expect(primary).toBeVisible();
  await expect(primary.getByRole('link', { name: 'Start Here' })).toBeVisible();
  const summary = primary.locator('summary');
  await summary.focus();
  await expect(summary).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(primary.getByRole('link', { name: 'Crops' })).toBeVisible();
  await primary.getByRole('link', { name: 'Crops' }).click();
  await expect(page).toHaveURL('/crops/');

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('guide tables become cards and diagrams open full size on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto('/systems/hydroponic-tower-garden/');

  const table = page.locator('table.hr-table-stack').first();
  await expect(table).toBeVisible();
  await expect(table.locator('thead')).toHaveCSS('position', 'absolute');
  await expect(table.locator('tbody tr').first()).toHaveCSS('display', 'block');
  await expect(page.getByRole('table').first()).toBeVisible();

  const diagram = page.locator('figure.hr-figure a.hr-figure-link').first();
  await expect(diagram).toHaveAttribute('href', /^\/images\/guides\/.+\.svg$/u);
  await expect(diagram.locator('.hr-figure-zoom-phone')).toBeVisible();
  await expect(diagram.locator('.hr-figure-zoom-wide')).toBeHidden();
  await expect(page.locator('figure.hr-figure figcaption').first()).toContainText('Oklahoma State');

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('static search returns a legitimate public page and an honest empty state', async ({ page }) => {
  const browserFailures = collectBrowserFailures(page);
  await page.goto('/search/');
  const input = page.getByRole('searchbox', { name: 'Search terms' });

  await input.fill('nutrient mixing calculator');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.getByRole('status')).toContainText(/result/i);
  await expect(page.locator('#search-results a[href="/tools/nutrient-mixing-calculator/"]')).toBeVisible();

  await input.fill('hydroponic strawberries');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.locator('#search-results a[href="/crops/hydroponic-strawberries/"]')).toBeVisible();

  await input.fill('zzzx-hydrorigor-no-result-zzzx');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.getByRole('status')).toContainText('No results found');
  expect(browserFailures).toEqual([]);
});

test('nutrient calculator validates and produces the independent known answer', async ({ page }) => {
  await page.goto('/tools/nutrient-mixing-calculator/');
  await page.getByLabel('Volume', { exact: true }).fill('10');
  await page.getByLabel('Dose printed on the label').fill('2');
  await page.getByRole('button', { name: 'Scale label dose' }).click();
  await expect(page.getByRole('status')).toContainText('Scaled amount: 20 mL');

  await page.getByLabel('Volume', { exact: true }).fill('0');
  await page.getByRole('button', { name: 'Scale label dose' }).click();
  await expect(page.getByRole('status')).toContainText(/positive finite number/i);
});

for (const route of retiredRoutes) {
  test(`${route} retains honest 404 behavior`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1, name: 'That channel runs dry.' })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  });
}

for (const route of fixtureRoutes) {
  test(`${route} remains non-public and noindex`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    await expect(page.locator('main')).not.toHaveAttribute('data-pagefind-body', 'true');
  });
}

for (const route of ['/systems/', '/crops/', '/nutrients-water/', '/best/', '/reviews/']) {
  test(`${route} lists dated guides compactly on a phone and never repeats a photo`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(route);

    const guides = page.getByRole('region', { name: 'Published guides' }).getByRole('listitem');
    expect(await guides.count()).toBeGreaterThan(0);
    await expect(guides.first()).toContainText(/Updated [A-Z][a-z]{2} \d{1,2}, 20\d\d/u);
    const firstCard = await guides.first().boundingBox();
    expect(firstCard.height, 'phone guide cards are compact rows, not tall photo cards').toBeLessThan(170);
    await expect(page.getByText('What this section will cover')).toHaveCount(0);

    const photoSources = await page.locator('main img[src^="/_astro/"]').evaluateAll((images) =>
      images.map((image) => image.getAttribute('src').replace(/^\/_astro\//u, '').split('.')[0]));
    expect(new Set(photoSources).size, `${route} repeats a photo`).toBe(photoSources.length);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test('the email sign-up posts to Kit and is labelled, on the home page and a guide', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  for (const route of ['/', '/systems/hydroponic-tower-garden/']) {
    await page.goto(route);
    const region = page.getByRole('region', { name: 'Get new guides by email' });
    await expect(region).toBeVisible();
    const email = region.getByLabel('Email address');
    await expect(email).toHaveAttribute('type', 'email');
    await expect(email).toHaveAttribute('required', '');
    const form = region.locator('form');
    await expect(form).toHaveAttribute('action', /^https:\/\/app\.kit\.com\/forms\/\d+\/subscriptions$/u);
    await expect(form).toHaveAttribute('method', 'post');
    await expect(region.getByRole('button', { name: 'Subscribe' })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  }
});
