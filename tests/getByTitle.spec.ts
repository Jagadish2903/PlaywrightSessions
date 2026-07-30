// ───────────────────────────────────────────────
// getByTitle in Playwright
// ───────────────────────────────────────────────
//
// Purpose:
//   - Locates elements using the title attribute.
//   - Works only if the element has a title attribute present.
//
// Usage Example:
//   await page.getByTitle("naveenopencart").highlight();
//
// Practical Cons:
//   • Works ONLY when the title attribute exists.
//   • Fragile if the title text changes (e.g., "naveenopencart" → "opencart home").
//   • Not suitable for elements without title attributes.
//   • Cannot be used for links, buttons, or inputs unless they have a title.
//   • Multiple elements with same title → may cause ambiguity.
//
// Best Practice:
//   - Use getByTitle for elements with stable, unique title attributes.
//   - Prefer semantic locators (getByRole, getByLabel, getByText) when available.
//   - Confirm attribute presence in DOM before relying on getByTitle.
//
// ───────────────────────────────────────────────

import test from "@playwright/test";


test("getByTitle Test", async ({ page }) => {
    await page.goto("https://naveenautomationlabs.com/opencart/");
    await page.getByTitle("naveenopencart").highlight();
    await page.pause();

})