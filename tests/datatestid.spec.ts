// ───────────────────────────────────────────────
// getByTestId in Playwright
// ───────────────────────────────────────────────
//
// Purpose:
//   - Locates elements using the data-testid attribute.
//   - Designed to be unique and stable for testing.
//
// Usage:
//   await page.getByTestId("username-input").fill("PlaywrightTest@123");
//
// Practical Cons:
//   • Works ONLY if the DOM has the exact attribute name: data-testid.
//   • If developers use a different format (e.g., data-test-id, selenium-test-id),
//     getByTestId will NOT work by default.
//   • To support custom formats, configure in playwright.config.ts:
//
//       use: {
//         testIdAttribute: "data-test-id"
//       }
//
//   • Only ONE custom testIdAttribute can be configured at a time.
//   • Fragile if dev team changes attribute naming convention.
//   • Not useful for elements without a test ID attribute.
//
// Best Practice:
//   - Prefer getByRole, getByLabel, or getByText for semantic locators.
//   - Use getByTestId when dev team provides stable, unique test IDs.
//   - Confirm attribute naming in DOM before relying on getByTestId.
//
// ───────────────────────────────────────────────


import test, { selectors } from "@playwright/test";

//for data-testid (default) this will not work if testidattribute is configured in config.ts
test("GetBy TestID Test", async ({ page }) => {
    await page.goto("https://naveenautomationlabs.com/opencart/ui/data-testid-page.html");
    await page.getByTestId("username-input").fill("PlaywrightTest@123");
    await page.pause();
})


//for data-test-id
test("GetBy TestID Test with different format", async ({ page }) => {
    await page.goto("https://app.hubspot.com/login");
    await page.getByTestId("email-input-field").fill("PlaywrightTest@123");
    await page.pause();
})


// ───────────────────────────────────────────────
// selectors.setTestIdAttribute in Playwright
// ───────────────────────────────────────────────
//
// Purpose:
//   - Allows overriding the default testId attribute
//     (data-testid) for a specific test.
//   - Useful when the app uses a different attribute
//     (e.g., id, data-test-id, selenium-test-id).
//
// Usage Example:
//   selectors.setTestIdAttribute('id');
//   await page.getByTestId("username").fill("PlaywrightTest@123");
//
// Practical Cons:
//   • Works only within the scope of that test.
//   • Must be set before using getByTestId.
//   • Only one attribute can be active at a time.
//   • Fragile if dev team changes attribute naming convention.
//   • Not useful if elements don’t have a unique attribute.
//
// Best Practice:
//   - Use selectors.setTestIdAttribute() when testing apps
//     with non-standard test ID attributes.
//   - Prefer semantic locators (getByRole, getByLabel, getByText)
//     when possible for stability.
//   - Confirm attribute naming in DOM before relying on getByTestId.
//
// ───────────────────────────────────────────────

//Example.
test("GetBy TestID Test for Specific Test", async ({ page }) => {
    selectors.setTestIdAttribute('id');
    await page.goto("https://app.hubspot.com/login");
    await page.getByTestId("username").fill("PlaywrightTest@123");
    await page.pause();
})