//  Shadow DOM Handling

//  Concept
// - Shadow DOM encapsulates elements inside a shadow root.
// - Provides isolation for styles and markup.
// - Elements inside shadow DOM are not directly accessible with normal locators.
// - Two types: Open shadow root (accessible) vs Closed shadow root (not accessible).

//  Selenium
// - Selenium cannot directly pierce shadow DOM.
// - Requires JavaScriptExecutor to access shadowRoot.
// - Example:
//      WebElement shadowHost = driver.findElement(By.cssSelector("#shadow-host"));
//      SearchContext shadowRoot = (SearchContext) ((JavascriptExecutor) driver)
//          .executeScript("return arguments[0].shadowRoot", shadowHost);
//      shadowRoot.findElement(By.cssSelector("button")).click();
// - Limitation: Complex, verbose, and fails for closed shadow roots.

//  Playwright
// - Playwright automatically pierces open shadow DOM.
// - No need for special syntax or JS executor.
// - Works with semantic locators (getByRole, getByText, getByLabel).
// - Limitation: Cannot access closed shadow roots.

//  Examples:

import { test } from "@playwright/test";

// Single layer Shadow DOM
test('shadowDom Button test', async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/shadow-dom.html");
  await page.getByRole('button', { name: 'Click Me' }).click();
  await page.pause();
});

// Shadow DOM Form
test('shadowDom Form test', async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/shadow-dom.html");
  await page.getByRole('textbox', { name: 'Username' }).fill('Bruno');
  await page.getByRole('textbox', { name: 'Email' }).fill('bruno@gmail.com');
  await page.getByRole('textbox', { name: 'Bio' }).fill('Bruno Tales is a site which helps us to entertain');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.pause();
});

// Two level nested Shadow DOM
test('Two level shadowdom element', async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/shadow-dom.html");
  await page.getByPlaceholder('Type inside nested shadow').fill("Hello, I am a Nested Shadow Dom");
  await page.pause();
});

// Three level deep Shadow DOM
test('Three level shadowdom element', async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/shadow-dom.html");
  await page.getByRole('button', { name: 'Deep Click' }).click();
  await page.pause();
});

// Slotted element inside Shadow DOM
test('shadowdom with slotted element', async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/shadow-dom.html");
  await page.getByRole('button', { name: 'Slotted Button' }).click();
  await page.pause();
});

// Closed Shadow DOM (will fail)
test('Closed shadowdom fail test', async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/shadow-dom.html");
  await page.getByRole('textbox', { name: 'Type in closed shadow' }).fill('Bruno tales');
  await page.pause();
});

// Shadow DOM Dropdown
test('shadowdom Dropdown handle test', async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/shadow-dom.html");
  await page.getByRole('combobox').selectOption({ label: 'Playwright' });
  await page.pause();
});

//  Key Differences
// | Feature   | Selenium (JS Executor)           | Playwright (Auto-piercing)        |
// |-----------|----------------------------------|-----------------------------------|
// | API       | JavascriptExecutor + shadowRoot  | getByRole / frameLocator          |
// | Ease      | Verbose, complex                 | Simple, built-in                  |
// | Closed    | Not supported                    | Not supported                     |
// | Open      | Manual JS required               | Auto-pierces shadow DOM           |
