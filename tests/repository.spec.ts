import { test, expect } from "@playwright/test";

test.describe("GitHub Repository Search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("should display a list of repositories by default", async ({ page }) => {
    const repositories = await page.locator("div.repository-list__item");
    await expect(repositories).toHaveCount(10);
  });

  test("should display results when searching for repositories", async ({
    page,
  }) => {
    const searchTerm = "react";
    const searchInput = await page.locator('input[type="search"]');
    await searchInput.fill(searchTerm);
    await page.waitForResponse((response) => response.status() === 200);
    const repositories = await page.locator("div.repository-list__item");
    await expect(repositories).toHaveCount(10);
    await expect(repositories.first()).toContainText(searchTerm);
  });

  test("should paginate results", async ({ page }) => {
    await page.click('button:has-text("2")');
    const repositories = await page.locator("div.repository-list__item");
    await expect(repositories).toHaveCount(10);
    const firstRepo = await repositories.first();
    await expect(firstRepo).toContainText("11.");
  });

  test("should display repository details", async ({ page }) => {
    await page.click("div.repository-list__item:nth-child(1) a");
    await expect(page).toHaveURL(/\/repository\/.*/);
    const details = await page.locator("div.repository-details");
    await expect(details).toBeVisible();
    await expect(details).toContainText("Rating:");
    await expect(details).toContainText("Last updated:");
    await expect(details).toContainText("Owner:");
  });
});
