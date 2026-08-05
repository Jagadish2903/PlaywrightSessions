import test from "@playwright/test";

test("Chain Locator Test (WebtableHandle)", async ({ page }) => {
    await page.goto("https://naveenautomationlabs.com/opencart/ui/webtable.html");

    // ===============================
    // XPath way (traditional Selenium style)
    // ===============================
    // Directly target the checkbox preceding the cell with text 'Joe.Root'
    await page.locator("//table//td[text()='Joe.Root']/preceding-sibling::td/input").click();

    // ===============================
    // Playwright way (recommended)
    // ===============================
    // Steps:
    // 1. Start from parent table
    // 2. Go to rows (tr)
    // 3. Filter row by text (Joe.Root)
    // 4. Within that row, locate the checkbox by role
    await page.locator('table')
        .locator('tr')
        .filter({ hasText: 'Joe.Root' })
        .getByRole('checkbox')
        .click();

    await page.waitForTimeout(2000);

    // ===============================
    // Getting value from a specific column
    // ===============================
    // Use textContent() or innerText()
    // - textContent() → returns string or null
    // - innerText()   → always returns string
    let isEnabled: string | null = await page.locator('table')
        .locator('tr')
        .filter({ hasText: 'Joe.Root' })
        .locator('td')
        .nth(4) // 5th column (0-based index)
        .textContent();

    console.log(isEnabled); // prints the cell value
    await page.pause();
});

// ===============================
//  Notes
// ===============================
// - Playwright chain locators are cleaner and more readable than raw XPath.
// - Use filter({ hasText: '...' }) to narrow down to the correct row.
// - Then navigate to the specific column with locator('td').nth(index).
// - Use getByRole for semantic elements like checkboxes, buttons, links.
// - textContent() vs innerText():
//   • textContent() → returns string or null (safe for missing values).
//   • innerText()   → returns string only (throws if element missing).
