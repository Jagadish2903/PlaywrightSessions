// ───────────────────────────────────────────────
// Notes: AuthState (storageState) in Playwright
// ───────────────────────────────────────────────
//
// Purpose:
//   - storageState captures authentication/session data
//     (cookies, localStorage, sessionStorage, IndexedDB).
//   - Allows reusing a logged-in state across tests.
//
// Typical Workflow:
//   1. Perform login once in a setup script.
//   2. Save state to a file:
//        await page.context().storageState({ path: 'auth.json' });
//   3. Reuse state in tests by loading it:
//        const context = await browser.newContext({ storageState: 'auth.json' });
//
// Benefits:
//   - Avoids repeating login steps in every test.
//   - Speeds up test execution.
//   - Ensures consistent authenticated sessions.
//
// Considerations:
//   - Tokens may expire → refresh or re-login when needed.
//   - Sensitive data → add auth.json to .gitignore.
//   - Works with OAuth2 / SSO flows, but must handle redirects,
//     token expiry, and MFA carefully.
//   - Each test context gets its own copy → prevents session leaks.
//
// Best Practices:
//   - Use UI login + storageState for validating login flows.
//   - Use API login + token injection for large suites (faster, stable).
//   - Refresh storageState before long test runs if tokens expire quickly.
//   - Keep storage files out of source control for security.
//
// ───────────────────────────────────────────────


// ───────────────────────────────────────────────
// Notes: Cons of AuthState (storageState)
// ───────────────────────────────────────────────
//
// 1. Token Expiry
//    - Saved cookies or tokens may expire.
//    - Requires re-login or refreshing storageState regularly.
//
// 2. Security Risks
//    - Auth files (auth.json) contain sensitive session data.
//    - Must be excluded from source control (.gitignore).
//    - Risk of accidental leaks if shared.
//
// 3. Environment Dependency
//    - AuthState may differ across environments (dev, QA, prod).
//    - A saved state from one environment may not work in another.
//
// 4. Flaky Tests
//    - If backend invalidates sessions, tests may fail unexpectedly.
//    - Reliance on stale storageState can cause instability.
//
// 5. Limited Coverage
//    - Skipping login steps means you don’t test the login flow itself.
//    - Potential gaps in end-to-end coverage.
//
// 6. Maintenance Overhead
//    - Requires scripts to refresh or regenerate storageState.
//    - Adds complexity to CI/CD pipelines.
//
// 7. Multi-user Scenarios
//    - Managing multiple auth states (different roles/users)
//      can become cumbersome.
//
// ───────────────────────────────────────────────



// ───────────────────────────────────────────────
// Notes: Global AuthState (storageState) usage
// ───────────────────────────────────────────────
//
// Important:
//   - You can define storageState at the project level in Playwright config.
//   - This makes the saved auth.json file a global configuration,
//     so all tests automatically start with the same authenticated state.
//
// Example (playwright.config.ts):
//   projects: [
//     {
//       name: 'authenticated',
//       use: {
//         storageState: 'auth.json'
//       }
//     }
//   ]
//
// Pros:
//   - Convenient: avoids repeating login setup in each test.
//   - Faster test execution: all tests start authenticated.
//
// Cons:
//   - Not recommended if you also need to validate the login page.
//   - May disturb login-related test cases (skips login flow).
//   - Risk of stale or expired tokens affecting all tests.
//   - Harder to isolate tests for different roles/users.
//
// Best Practice:
//   - Use global storageState only for suites where login validation
//     is not required.
//   - For login tests, keep storageState local to those specific cases.
//   - Refresh or regenerate auth.json regularly to avoid expiry issues.
//
// ───────────────────────────────────────────────


import { Browser, chromium, expect, Page } from "@playwright/test"

(async () => {
    let browser: Browser = await chromium.launch({ headless: false, channel: "chrome" });
    let page: Page = await browser.newPage();
    await page.goto("https://automationexercise.com/login");
    await page.locator(`//input[@data-qa="login-email"]`).fill("Bruno@123");
    await page.locator(`//input[@data-qa="login-password"]`).fill("Bruno1234");
    await page.getByRole('button', { name: 'Login' }).click();
    console.log(await page.title());
    expect(await page.title()).toBe("Automation Exercise");
    //Captures cookies, localStorage, sessionStorage, IndexedDB into automationSite.json.
    await page.context().storageState({ path: 'automationSiteSessionDetails.json' });
    await page.close();
})();