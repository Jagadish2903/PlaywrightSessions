//Playwright Notes

//  Reliable Web Automation
// - Enables fast, consistent browser automation for testing modern web apps.
// - Built-in auto-waiting and robust selectors reduce flaky tests.


//  API Testing
// - Supports direct API request/response validation.
// - Useful for end-to-end scenarios combining UI + backend checks.

//  AI Agents (MCP)
// - Can integrate with AI-driven agents for intelligent automation flows.
// - MCP (Model Context Protocol) allows advanced orchestration.

//  Language Support
// - Available for Java
// - Available for TypeScript / JavaScript
// - Available for .NET (C#)
// - Available for Python

//  Documentation
// - Official docs: https://playwright.dev



//  Built for Testing
// - Reliable automation framework designed for modern web apps.
// - Auto-wait ensures elements are actionable before actions.
// - Web-first assertions retry until conditions are met.
// - Eliminates artificial timeouts → fewer flaky tests.

//  Test Isolation
// - Each test runs in a fresh browser context (like a new profile).
// - Full isolation with minimal overhead.
// - Authentication state can be saved once and reused across tests.

//  Resilient Locators
// - Use selectors that mirror how users see the page.
// - Examples: getByRole, getByLabel, getByPlaceholder, getByTestId.
// - Avoid brittle CSS/XPath paths.


//  Parallelism & Sharding
// - Tests run in parallel by default across browsers. (using workers (in testng we call threads))
// - Shard tests across multiple machines for faster CI pipelines.
// - Ensures full cross-browser coverage on every commit.


//Sharding in Playwright refers to splitting your test suite across multiple machines
// or processes so they can run in parallel, reducing overall execution time.
// It’s especially useful in CI/CD pipelines where you want faster feedback
// and full cross-browser coverage.


//Limitations :
//Playwright does not automate native mobile apps (like Appium does).
//It focuses on mobile web automation — testing websites and PWAs in mobile-like environments.
//For native app automation, you’d need tools like Appium or Detox.



//  Selenium vs Playwright vs Cypress Comparison

//  Architecture
// - Selenium: WebDriver protocol (W3C), out-of-process, per-command HTTP calls
// - Playwright: Out-of-process, CDP + patched protocols, WebSocket bi-directional
// - Cypress: Runs inside the browser, same event loop as app

//  Language Support
// - Selenium: Strong → Java, Python, C#, JS, Ruby, Kotlin
// - Playwright: Strong → TS/JS, Python, Java, .NET
// - Cypress: Weak → JS/TS only

//  Browser Support
// - Selenium: Chrome, Firefox, Edge, Safari, IE, Opera
// - Playwright: Chromium, Firefox, WebKit, branded Chrome/Edge
// - Cypress: Chrome, Edge, Firefox, Electron (no Safari/WebKit)

//  Test Runner
// - Selenium: External (TestNG, JUnit, Pytest, Mocha)
// - Playwright: Built-in @playwright/test
// - Cypress: Built-in Mocha-based runner

//  Setup Complexity
// - Selenium: High → drivers, bindings, runner, reporter separately
// - Playwright: Low → one npm init command
// - Cypress: Low → npm install cypress

//  Auto-waiting
// - Selenium: Manual explicit/implicit waits, WebDriverWait
// - Playwright: Automatic actionability + assertion retries
// - Cypress: Automatic command retries built-in

//  Speed
// - Selenium: Medium → HTTP overhead per command
// - Playwright: Fast → WebSocket + parallel contexts
// - Cypress: Fast → in-browser, single session

//  Parallel Execution
// - Selenium: Via Grid/Selenoid, needs infra setup
// - Playwright: Native, file + test level, free workers
// - Cypress: Free tier serial; parallelism requires paid Dashboard

//  Multi-tab / Windows
// - Selenium: Yes via window handles
// - Playwright: Yes native contexts + pages
// - Cypress: No → single tab only

// iFrames & Shadow DOM
// - Selenium: Works, needs explicit switching
// - Playwright: First-class frameLocator, pierces shadow DOM
// - Cypress: Requires plugins/workarounds

//  Cross-domain / Origin
// - Selenium: Yes
// - Playwright: Yes
// - Cypress: Limited via cy.origin()

//  Mobile / Device Emulation
// - Selenium: Via Appium (separate)
// - Playwright: Built-in device presets (Pixel, iPhone, etc.)
// - Cypress: Viewport only, no device emulation

//  API Testing
// - Selenium: Needs RestAssured / requests library
// - Playwright: Native request fixture, same runner
// - Cypress: Native cy.request()

//  Network Interception
// - Selenium: Weak via BiDi (new), CDP hacks
// - Playwright: Strong route/fulfill/abort, HAR record
// - Cypress: Strong cy.intercept()

//  Debugging
// - Selenium: Logs, browser DevTools, IDE debugger
// - Playwright: Trace Viewer, UI Mode, VS Code inline debug
// - Cypress: Time-travel debugger, DOM snapshots in Test Runner

//  Reporting
// - Selenium: Depends on runner (Allure, ExtentReports)
// - Playwright: HTML, JSON, JUnit built-in + Allure plugin
// - Cypress: Basic Mocha, Dashboard (paid) for rich reports

//  Authentication Reuse
// - Selenium: Manual cookie/token handling
// - Playwright: storageState — save & reuse session
// - Cypress: Custom commands or session()

//  File Upload / Download
// - Selenium: Works, driver-specific quirks
// - Playwright: First-class APIs Upload OK, download tricky
// - Cypress: Upload OK, download tricky

//  CI/CD Support
// - Selenium: Universal, Grid/Docker mature
// - Playwright: Official Docker images, GH Action ready
// - Cypress: Official Docker images, GH Action ready

//  Community & Ecosystem
// - Selenium: Largest, oldest, tons of plugins
// - Playwright: Rapidly growing, MS-backed
// - Cypress: Large JS-centric community

//  Learning Curve
// - Selenium: Steeper — protocols, waits, drivers
// - Playwright: Gentle — modern APIs, TS-native
// - Cypress: Gentle — great DX for JS devs

//  Pricing / License
// - Selenium: Free, Apache 2.0
// - Playwright: Free, Apache 2.0
// - Cypress: OSS free; Dashboard paid for parallel/cloud

//  Pros & Cons

// Selenium
// Pros: Every major language + browser (incl. Safari, IE)
//       Huge community, mature ecosystem, tons of jobs
//       W3C standard — vendor neutral
//       Pairs with Appium for mobile automation
// Cons: Slower — HTTP round trips per command
//       No auto-wait, flakiness without discipline
//       Setup pain: drivers, runner, reporter separately
//       Weak network mocking, no built-in trace viewer

// Playwright
// Pros: Fast, reliable, auto-wait + web-first assertions
//       All 3 engines (Chromium, WebKit, Firefox)
//       Trace Viewer, UI Mode, codegen — best DX today
//       Multi-tab, multi-origin, mobile emulation, API testing built-in
//       Free parallelism, storageState, network route
// Cons: Newer — smaller talent pool than Selenium
//       No real device / Safari-on-iPhone support (WebKit ≠ Safari)
//       Team needs Node/TS comfort

// Cypress
// Pros: Superb developer experience, time-travel debugging
//       Great for component + E2E for JS/TS apps
//       Auto-wait, network stubbing, live reload
// Cons: JS/TS only — hard sell in Java/Python shops
//       Single tab, no true multi-origin at scale
//       No WebKit / Safari
//       Parallelism & cloud reporting behind paid Dashboard




