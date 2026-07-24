import test, { BrowserContext, Page } from "@playwright/test";

test("multiusertest", async ({ browser }) => {
    // Create two separate contexts (like two isolated browser sessions)
    const context1: BrowserContext = await browser.newContext();
    const context2: BrowserContext = await browser.newContext();

    // Create pages from each context
    const page1: Page = await context1.newPage();
    const page2: Page = await context2.newPage();

    await page1.goto("https://practice.expandtesting.com/login");
    await page2.goto("https://practice.expandtesting.com/login");


    await page1.getByRole("textbox", { name: "Username" }).fill("jagadish");
    await page1.getByRole("textbox", { name: "Password" }).fill("pw123");
    await page1.getByRole("button", { name: "Login" }).click();
    await page1.close();

    await page2.getByRole("textbox", { name: "Username" }).fill("practice");
    await page2.getByRole("textbox", { name: "Password" }).fill("SuperSecretPassword!");
    await page2.getByRole("button", { name: "Login" }).click();
    await page2.close();
});
