import test from "@playwright/test";

// ───────────────────────────────────────────────
//getByRole with Multiple Elements
// ───────────────────────────────────────────────
//
// Issue:
//   - When multiple elements share the same role + name,
//     Playwright throws a strict mode violation error.
//   - Example: getByRole('textbox', { name: 'Password' })
//     → may resolve to 2 elements if both match.
//
// Difference from Selenium:
//   - Selenium would typically pick the first element in DOM order.
//   - Playwright enforces strictness → requires unique match.
//
// Solution:
//   - Add one more key/value to make the locator unique.
//   - Use { exact: true } when the name must match exactly.
//
// Example:
//   // Without exact → strict mode violation
//   // await page.getByRole('textbox', { name: 'Password' }).fill("Bruno123");
//
//   // With exact → resolves correctly
//   await page.getByRole('textbox', { name: '* Password', exact: true }).fill("Bruno123");
//
// Notes:
//   - exact: true ensures the locator matches only the element
//     with the exact visible name.
//   - Useful when labels or text are similar (e.g., "Password" vs "* Password").
//   - Always prefer unique locators to avoid ambiguity.
//   - Combine with filters (hasText, has) if exact is not sufficient.
//
// ───────────────────────────────────────────────


test("multiple elements test", async ({ page }) => {
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");
    await page.getByRole('textbox', { name: '* Password', exact: true }).fill("Bruno123");

});





// ───────────────────────────────────────────────
//Index-based Locators in Playwright
// ───────────────────────────────────────────────
//
// Purpose:
//   - When multiple elements share the same role or text,
//     you can use index-based selection to target a specific one.
//
// Methods:
//   • nth(index) → Selects element at given index (0-based).
//   • first()   → Selects the first matching element.
//   • last()    → Selects the last matching element.
//
// Example:
//   // Multiple "Forgotten Password" links on the page
//   await page.getByRole('link', { name: 'Forgotten Password' }).nth(0).click();
//
//   // Using first()
//   await page.getByRole('link', { name: 'Forgotten Password' }).first().click();
//
//   // Using last()
//   await page.getByRole('link', { name: 'Forgotten Password' }).last().click();
//
// Notes:
//   - nth(0) = first element, nth(1) = second element, etc.
//   - Useful when elements are repeated in lists, tables, or menus.
//   - Combine with filters (hasText, has) for more precision.
//   - Index-based locators should be used carefully,
//     as DOM changes can shift element positions.
//
// ───────────────────────────────────────────────


test("multiple elements test index based", async ({ page }) => {
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    await page.getByRole('link', { name: 'Forgotten Password' }).nth(0).click();

});