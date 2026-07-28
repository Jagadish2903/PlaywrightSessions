import test from "@playwright/test";


// ───────────────────────────────────────────────
// getByLabel in Playwright
// ───────────────────────────────────────────────
//
// Purpose:
//   - Locates input fields tied to <label> tags.
//   - Works well for textboxes, password fields, dropdowns,RadioButtons etc.
//
// Practical Cons:
//   • Does NOT work for links, buttons, or headings.
//   • Fails if the input has no <label> or is not linked via "for" attribute.
//   • Cannot locate inputs that rely only on placeholder text (no label).
//   • Hidden or dynamically generated labels may not be exposed → locator fails.
//   • Label text changes (e.g., "First Name" → "Given Name") will break tests.
//
// Example:
//   await page.getByLabel('First Name', { exact: true }).fill("Bruno123");
//
// Best Practice:
//   - Use getByLabel for stable, well‑structured forms.
//   - Fall back to getByRole or getByPlaceholder when labels are missing.
//   - Always confirm label association in DevTools → Accessibility tab.
//
// ───────────────────────────────────────────────

test("GetBy Label method test", async ({ page }) => {
    await page.goto("https://www.shapemyinterview.com/study/playwright-locator-playground.html?v=2026-07-26");
    await page.getByLabel('First Name', { exact: true }).fill("Bruno123");
    await page.pause();
});





// ───────────────────────────────────────────────
// getByPlaceholder in Playwright
// ───────────────────────────────────────────────
//
// Purpose:
//   - Locates input fields using their placeholder text.
//   - Works only on text fields (e.g., <input>, <textarea>).
//
// Example:
//   await page.getByPlaceholder('Amount in INR').fill("20000");
//
// Practical Cons:
//   • Does NOT work for links, buttons, or headings.
//   • Only works if the element has a placeholder attribute.
//   • Fragile → if placeholder text changes, locator breaks.
//   • Not suitable for inputs without placeholder (must use getByLabel or getByRole).
//
//
// Best Practice:
//   - Use getByPlaceholder for quick targeting of text fields.
//   - Prefer getByLabel when forms are well-structured with labels.
//   - Avoid over-reliance on placeholder text (often changes in UI updates).
//
// ───────────────────────────────────────────────

test("GetBy PlaceHolder method test", async ({ page }) => {
    await page.goto("https://www.shapemyinterview.com/study/playwright-locator-playground.html?v=2026-07-26");
    await page.getByPlaceholder('Amount in INR').fill("20000");
    await page.pause();
});




// ───────────────────────────────────────────────
// getByAltText in Playwright
// ───────────────────────────────────────────────
//
// Purpose:
//   - Locates <img> elements using their alt attribute value.
//   - Works only for images.
//
// Usage:
//   await page.getByAltText("Playwright logo placeholder").highlight();
//
//
// Practical Cons:
//   • Works only for <img> elements → cannot be used for links, buttons, or inputs.
//   • Requires alt attribute → fails if alt is missing or empty.
//   • Fragile if alt text changes (e.g., "logo" → "brand logo").
//   • Hidden or decorative images without alt text are not accessible via this method.
//
// Best Practice:
//   - Always ensure images have meaningful alt attributes.
//   - Use getByAltText for accessibility-compliant images.
//   - Fall back to getByRole('img') or CSS selectors if alt text is absent.
//
// ───────────────────────────────────────────────

test("GetBy AltText method test", async ({ page }) => {
    await page.goto("https://www.shapemyinterview.com/study/playwright-locator-playground.html?v=2026-07-26");
    await page.getByAltText("Playwright logo placeholder").highlight();
    await page.pause();
});



// ───────────────────────────────────────────────
// getByText in Playwright
// ───────────────────────────────────────────────
//
// Purpose:
//   - Locates elements based on their visible text content.
//   - Works for headings, paragraphs, spans, buttons, links, etc.
//
// Example:
//   let header: string | null = await page
//       .getByText('Heading Level 1', { exact: true })
//       .textContent();
//   console.log("The Header value is ", header);
//
// Practical Cons:
//   • Fragile if text changes (e.g., "Heading Level 1" → "Title").
//   • Case sensitivity and whitespace can cause mismatches.
//   • Multiple elements with same text → requires { exact: true } or filters.
//   • Not suitable for inputs without visible text (use getByLabel or getByPlaceholder).
//
// Debugging:
//   - Use highlight() to visually confirm the locator.
//   - Use page.pause() to inspect interactively in Playwright Inspector.
//
// Best Practice:
//   - Use getByText for static, unique text content.
//   - Prefer getByRole for accessibility‑based locators when available.
//   - Combine with filters (hasText, exact) for precision.
//
// ───────────────────────────────────────────────

test("GetBy Text method test", async ({ page }) => {
    await page.goto("https://www.shapemyinterview.com/study/playwright-locator-playground.html?v=2026-07-26");
    let header: String | null = await page.getByText('Heading Level 1', { exact: true }).textContent();
    console.log("The Header value is ", header);
    await page.pause();
});




// ───────────────────────────────────────────────
// Recommended Locator Methods (Priority Order)
// ───────────────────────────────────────────────
//
// Text Fields / Inputs
//   1. getByRole('textbox', { name: '...' })
//   2. getByLabel('...') → if <label> exists
//   3. getByPlaceholder('...') → if only placeholder is present
//   4. page.locator("input[name='...']") → CSS fallback
//   5. page.locator("//input[@name='...']") → XPath fallback
//
// Password Fields
//   1. getByRole('textbox', { name: 'Password' })
//   2. getByLabel('Password')
//   3. CSS/XPath fallback if no label or role
//
// Buttons
//   1. getByRole('button', { name: '...' })
//   2. page.locator("button:has-text('...')") → CSS
//   3. page.locator("//button[text()='...']") → XPath
//
// Links
//   1. getByRole('link', { name: '...' })
//   2. page.locator("a:has-text('...')") → CSS
//   3. page.locator("//a[text()='...']") → XPath
//
// Headings
//   1. getByRole('heading', { name: '...', level: n })
//   2. page.locator("h1,h2,h3:has-text('...')") → CSS
//   3. page.locator("//h1[text()='...']") → XPath
//
// Radio Buttons
//   1. getByRole('radio', { name: '...' })
//   2. page.locator("input[type='radio'][value='...']") → CSS
//   3. page.locator("//input[@type='radio' and @value='...']") → XPath
//
// Checkboxes
//   1. getByRole('checkbox', { name: '...' })
//   2. page.locator("input[type='checkbox'][value='...']") → CSS
//   3. page.locator("//input[@type='checkbox' and @value='...']") → XPath
//
// Images
//   1. getByAltText('...') → alt attribute
//   2. getByRole('img', { name: '...' })
//   3. page.locator("img[alt='...']") → CSS
//   4. page.locator("//img[@alt='...']") → XPath
//
// Generic Text Content
//   1. getByText('...') → for headings, spans, paragraphs, etc.
//   2. page.locator("xpath=//*[text()='...']") → XPath fallback
//
// Titles / Tooltips
//   1. getByTitle('...')
//   2. page.locator("[title='...']") → CSS
//
// Test IDs
//   1. getByTestId('...')
//   2. page.locator("[data-testid='...']") → CSS
//
//
// Fallbacks
//   • CSS selectors → page.locator("css-selector")
//   • XPath selectors → page.locator("//xpath-expression")
//   • Use only when semantic locators (role/label/text) aren’t possible
//
// ───────────────────────────────────────────────
