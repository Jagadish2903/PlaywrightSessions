import test from "@playwright/test";

// ───────────────────────────────────────────────
// Highlighting Elements in Playwright
// ───────────────────────────────────────────────
//
// Purpose:
//   - highlight() is used to visually mark a locator during test execution.
//   - Helpful for debugging → shows which element Playwright is targeting.
//
// Usage:
//   await page.getByRole('heading', { name: 'Returning Customer', exact: true }).highlight();
//
//  
//
// Notes:
//   - highlight() does not perform any action (click, fill, etc.).
//   - It only draws a temporary outline around the element in the browser.
//   - Useful when verifying locator correctness before interacting.
//   - highlight() is intended for debugging only → not for production test logic.
//
// ───────────────────────────────────────────────

test("Highlight Element Test", async ({ page }) => {
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    await page.getByRole('heading', { name: 'Returning Customer', exact: true }).highlight();
    await page.pause();
})