import { test, expect } from '@playwright/test';

test('complete shopping flow, totals, removal, navigation and checkout', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page.getByRole('heading', { name: /Welcome to Paradise Nursery/ })).toBeVisible();
  await page.getByRole('link', { name: /Get Started/ }).click();
  const sections = page.locator('.plant-section');
  expect(await sections.count()).toBeGreaterThanOrEqual(3);
  for (const section of await sections.all()) {
    const names = await section.locator('h3').allTextContents();
    expect(new Set(names).size).toBeGreaterThanOrEqual(6);
  }
  const snake = page.locator('.product-card').filter({ has: page.getByRole('heading', { name: 'Snake Plant', exact: true }) }).first();
  await snake.getByRole('button', { name: 'Add to Cart', exact: true }).click();
  await expect(snake.getByRole('button', { name: 'Added to Cart' })).toBeDisabled();
  await page.locator('.product-card').filter({ has: page.getByRole('heading', { name: 'Spider Plant', exact: true }) }).getByRole('button').click();
  await page.getByRole('link', { name: 'Cart, 2 items', exact: true }).click();
  await expect(page.locator('.cart-total')).toHaveText('Total Cart Amount: $27.00');
  await page.getByRole('button', { name: 'Increase Snake Plant quantity' }).click();
  await expect(page.locator('.cart-total')).toHaveText('Total Cart Amount: $42.00');
  await expect(page.getByRole('link', { name: 'Cart, 3 items' })).toBeVisible();
  await expect(page.locator('.cart-item').filter({ hasText: 'Snake Plant' }).locator('.item-total')).toHaveText('Total: $30.00');
  await page.getByRole('button', { name: 'Decrease Snake Plant quantity' }).click();
  await expect(page.locator('.cart-total')).toHaveText('Total Cart Amount: $27.00');
  await page.getByRole('button', { name: 'Checkout', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Coming Soon');
  await page.getByRole('button', { name: 'Delete Spider Plant' }).click();
  await page.getByRole('button', { name: 'Decrease Snake Plant quantity' }).click();
  await expect(page.locator('.cart-total')).toHaveText('Total Cart Amount: $0.00');
  await expect(page.getByRole('button', { name: 'Checkout', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await expect(snake.getByRole('button', { name: 'Add to Cart', exact: true })).toBeEnabled();
  await snake.getByRole('button').click();
  await page.getByRole('link', { name: 'Home', exact: true }).click();
  await page.getByRole('link', { name: /Get Started/ }).click();
  await expect(page.getByRole('link', { name: 'Cart, 1 items' })).toBeVisible();
  await expect(snake.getByRole('button')).toBeDisabled();
  expect(errors).toEqual([]);
});

test('mobile layout, category navigation and browser history', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  await expect(page.getByRole('link', { name: /Get Started/ })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('link', { name: /Get Started/ }).click();
  await page.getByRole('link', { name: 'Low Maintenance Plants', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Low Maintenance Plants' })).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('link', { name: 'Cart, 0 items' }).click();
  await expect(page.getByRole('heading', { name: 'Shopping Cart' })).toBeVisible();
  await page.goBack();
  await expect(page.locator('.product-grid').first()).toBeVisible();
});


test('all local thumbnails load and desktop screenshots render', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('./');
  await page.screenshot({ path: 'test-results/landing.png', fullPage: true });
  await page.getByRole('link', { name: /Get Started/ }).click();
  for (const img of await page.locator('.product-card > img').all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: 'test-results/catalog.png' });
});
