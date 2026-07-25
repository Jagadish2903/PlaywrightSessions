import test from "@playwright/test";


// ───────────────────────────────────────────────
// waitUntil option in page.goto()
// ───────────────────────────────────────────────
//
// Purpose:
//   Defines when Playwright considers navigation finished.
//
// Options:
//   1. "load"
//      → Waits for the 'load' event.
//      → Page + all resources (images, scripts, styles) are fully loaded.
//
//   2. "domcontentloaded"
//      → Waits for the 'DOMContentLoaded' event.
//      → Elements are loaded in the Dom but there is no guarentee that elements are visible on the page
//      → Faster than "load".
//
//   3. "commit"
//      → Navigation is considered finished once the response is received
//        and the document starts loading.
//      → Minimal waiting, just confirms navigation started.
//
//   4. "networkidle"
//      → Waits until there are no network connections for at least 500 ms.
//      → Useful for SPAs or AJAX-heavy pages.
//
// Default:
//   If not specified, Playwright uses "load".
//
// Example:
//   await page.goto("https://testautomationpractice.blogspot.com/", {
//     waitUntil: "domcontentloaded"
//   });
//
// Key Notes:
//   - Use "domcontentloaded" for faster DOM interactions.
//   - Use "load" when you need all resources ready.
//   - Use "networkidle" for dynamic apps with background requests.
//   - Use "commit" for minimal waiting, just confirming navigation started.
//
// ───────────────────────────────────────────────



// ───────────────────────────────────────────────
// commit vs domcontentloaded in waitUntil
// ───────────────────────────────────────────────
//
// commit:
//   - Navigation is considered finished once the response headers
//     are received and the document starts loading.
//   - This is the earliest possible stage.
//   - Best for: confirming navigation started (e.g., redirects, URL checks).
//   - Risk: DOM is not yet available, so element interactions will fail.
//
// domcontentloaded:
//   - Waits until the 'DOMContentLoaded' event fires.
//   - HTML is parsed and the DOM tree is built.
//   - Resources like images, CSS, and scripts may still be loading.
//   - Best for: interacting with DOM elements quickly.
//   - Faster than "load" but safer than "commit".
//
// Comparison:
//   - commit → minimal wait, only confirms navigation began.
//   - domcontentloaded → ensures DOM is ready for interaction.
//   - Use commit for navigation validation.
//   - Use domcontentloaded for tests that need the DOM structure.
//
// Example:
// await page.goto("https://example.com", { waitUntil: "commit" });
// await page.goto("https://example.com", { waitUntil: "domcontentloaded" });
//
// ───────────────────────────────────────────────


//Imp: Network title/DomContent/

test("Page loading Wait Test", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/", { waitUntil: "load" });

})