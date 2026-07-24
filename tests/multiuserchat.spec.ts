//Before Running this Ensure Multiuserchat application s running in localhost 

import test, { BrowserContext, Page } from "@playwright/test";


test("multiUserChat", async ({ browser }) => {
    let ctx1: BrowserContext = await browser.newContext();
    let ctx2: BrowserContext = await browser.newContext();

    let page1: Page = await ctx1.newPage();
    let page2: Page = await ctx2.newPage();

    await page1.goto(" http://localhost:3000");
    await page1.getByTestId('username-input').fill("jagadish")
    await page1.getByRole('button', { name: 'Join Chat' }).click();
    await page1.locator('#messageInput').fill("Hi Bruno");
    await page1.locator('#sendBtn').click();


    await page2.goto(" http://localhost:3000");
    await page2.getByTestId('username-input').fill("Bruno")
    await page2.getByRole('button', { name: 'Join Chat' }).click();
    await page2.locator('#messageInput').fill("Hi papa");
    await page2.locator('#sendBtn').click();


    await page1.locator('#messageInput').fill("Are you playing?");
    await page1.locator('#sendBtn').click();


    await page2.locator('#messageInput').fill("Yes along with mummy");
    await page2.locator('#sendBtn').click();


    await page1.locator('#messageInput').fill("did you ate?");
    await page1.locator('#sendBtn').click();

    await page2.locator('#messageInput').fill("Yes papa");
    await page2.locator('#sendBtn').click();


    await page1.locator('#messageInput').fill("Enjoy");
    await page1.locator('#sendBtn').click();


    await page1.pause();
    await page2.pause();
})