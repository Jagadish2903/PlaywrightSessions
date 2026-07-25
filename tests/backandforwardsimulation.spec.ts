
import test, { Page } from "@playwright/test"

test("Back And Forward Simulation Test", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.goto("https://www.google.com/");

    //to navigate back 
    await page.goBack();
    let title1 = await page.title();
    console.log("Title of the Page 1 is :", title1);
    //waitfor timeout something similar to Thread.sleep 
    await page.waitForTimeout(2000);

    //to navigate forward 
    await page.goForward();
    let title2 = await page.title();
    console.log("Title of the Page 2 is :", title2);
    await page.waitForTimeout(2000);

    await page.goBack();
    let title3 = await page.title();
    console.log("Title of the Page 3 is :", title3);
    await page.waitForTimeout(2000);


    //To refresh the page 
    await page.reload();
})