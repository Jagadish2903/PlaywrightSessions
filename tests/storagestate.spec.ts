import { test, Page, expect } from "@playwright/test";


test.use({ storageState: "./automationSiteSessionDetails.json" })
test("Storage State Test", async ({ page }) => {
    await page.goto("https://automationexercise.com/view_cart");
    expect(page.getByRole('link', { name: 'Blue Top' })).toBeVisible();

})