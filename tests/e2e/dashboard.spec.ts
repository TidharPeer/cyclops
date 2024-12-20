import { expect, test } from '@playwright/test'

const defaultTitle = 'CyclopS'

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('dashboard details', async ({page}) => {
    await expect(page).toHaveTitle(defaultTitle)
    await expect(page.locator('h1').first()).toHaveText('Stocks Dashboard')
  });

  test('should load page on start', async ({page}) => {
    await expect(page.getByText("Loading stocks...")).toBeVisible();
    await expect(page.getByText("Loading stocks...")).not.toBeVisible();
  });

  test('should see some og the stocks', async ({page}) => {
    await expect(page.getByText("AAPL")).toBeVisible();
    await expect(page.getByText("TSLA")).not.toBeVisible();
  });

  test('should click stock and see graph, and click back', async ({page}) => {
    await expect(page.getByText("AMZN")).toBeVisible();
    await expect(page.locator("canvas")).not.toBeVisible();
    await expect(page.getByText("Volume")).not.toBeVisible();
    await page.getByText("AAPL").click();
    await expect(page.locator("canvas")).toBeVisible();
    await expect(page.getByText("Volume")).toBeVisible();
    await expect(page.getByText("AMZN")).not.toBeVisible();
    await page.locator("button").click();
    await expect(page.locator("canvas")).not.toBeVisible();
    await expect(page.getByText("Volume")).not.toBeVisible();
    await expect(page.getByText("AMZN")).toBeVisible();
  });

  test('should select stock from dropdown', async ({ page }) => {
    await page.waitForSelector('select[name="stocks"]');
    await page.selectOption('select[name="stocks"]', 'TSLA');
    await expect(page.locator("canvas")).toBeVisible();
    await expect(page.getByText("Volume")).toBeVisible();
  });
});
