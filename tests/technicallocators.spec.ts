// ───────────────────────────────────────────────
// XPath and CSS Locators in Playwright
// ───────────────────────────────────────────────
//
// Purpose:
//   - Technical way of locating elements when semantic
//     locators (getByRole, getByLabel, etc.) are not available.
//
// XPath
//   • Absolute XPath → /html/body/... → NOT recommended
//     - Very fragile, breaks if DOM structure changes.
//   • Relative XPath → tag[@attribute='value']
//     - Example: //input[@name='first_name']
//     - More stable, targets specific attributes.
//
// CSS Selectors
//   • Example: input[name='first_name']
//   • Can combine attributes, classes, IDs.
//   • Example: div.container > input#username
//
// Practical Cons:
//   • Fragile if DOM changes (class names, IDs updated).
//   • Harder to maintain compared to semantic locators.
//   • Readability is lower than getByRole/getByLabel.
//   • XPath can be verbose and error-prone.
//
// Best Practice:
//   - Always prefer semantic locators (getByRole, getByLabel, getByText).
//   - Use CSS/XPath only as a fallback when accessibility attributes are missing.
//   - Prefer relative XPath over absolute XPath.
//   - Keep selectors simple and attribute-based for stability.
//
// Example Usage:
//   await page.locator("input[name='first_name']").fill("Jagadish");
//   await page.locator("//input[@name='first_name']").fill("Jagadish");
//
// ───────────────────────────────────────────────

import test from "@playwright/test";



test("xpathLocater Test", async ({ page }) => {
    await page.goto("https://www.shapemyinterview.com/study/playwright-locator-playground.html?v=2026-07-26");
    await page.locator("//input[@name='first_name']").fill("playwrighttest@123");
    await page.pause();
})


//we can use multiple attributes as well in xpath
// //input[@name='first_name' and @type='text']

//for text function
// //htmltag[text()='value'];
// //h3[text()='Register Account'];

//contains function
// //htmltag[contains(@attribute,'value')];
// //input[contains(@id,'password')]
// //h3[contains(text(),'User Registration Form')]



//starts with
// //h3[starts-with(text(),'User Registration')]


//Parent Child relationship concepts
// //h2//preceding-sibling::h1
// //h2//following-sibling::h3
// //h2//parent::div[@class='section-header']




//CSS - Cascaded Style Sheet

// Common Usage:
//   • ID Selector → use #
//       Example: #firstname
//       (matches element with id="firstname")
//
//   • Class Selector → use .
//       Example: h1.classvalue
//       (matches <h1> element with class="classvalue")
//
//   • Attribute Selector
//       Example: input[name='first_name']
//       (matches <input> with name="first_name")
//
//   • Descendant / Child Selector
//       Example: div.container > input#username
//       (matches <input id="username"> inside div.container)




// ───────────────────────────────────────────────
// Playwright vs Selenium Locator Execution
// ───────────────────────────────────────────────
//
// Playwright
//   • Example: let firstname: Locator = page.locator("#firstname");
//   • Uses WebSocket connection between test script and browser.
//   • Locator creation does NOT immediately query the DOM.
//   • No error is thrown at declaration time.
//   • Errors only occur when an action is executed (e.g., .fill(), .click()).
//   • Benefit: resilient → auto-waits and retries until element is ready.
//
// Selenium
//   • Example: driver.findElement(By.id("firstname"));
//   • Uses HTTP request/response for each command.
//   • Query is executed immediately when findElement is called.
//   • If element is not found → throws NoSuchElementException instantly.
//   • Less resilient → requires explicit waits to handle dynamic DOM.
//
// ───────────────────────────────────────────────
