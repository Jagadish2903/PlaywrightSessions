//handling NonSelect based Dropdowns : 

import test, { Page } from "@playwright/test";

test("Selecting dropdown for Non Select tag", async ({ page }) => {
    await page.goto("https://www.jqueryscript.net/demo/Drop-Down-Combo-Tree/#google_vignette");
    await page.locator('#justAnInputBox').click();
    await page.waitForTimeout(2000);
    await page.locator('span.comboTreeItemTitle').filter({ hasText: 'choice 2 3' }).first().click();
    await page.pause();

})


//MultiSelcting the value 
test("Multi Selecting dropdown for Non Select tag", async ({ page }) => {
    await page.goto("https://www.jqueryscript.net/demo/Drop-Down-Combo-Tree/#google_vignette");
    await page.locator('#justAnInputBox').click();
    await page.waitForTimeout(2000);
    let selctiontoByDone = ['choice 2 3', 'choice 3', 'choice 6 2', 'choice 6 2 3']

    for (let i = 0; i < selctiontoByDone.length; i++) {
        let optiontoSelect = selctiontoByDone[i]
        await page.locator('span.comboTreeItemTitle').filter({ hasText: `${optiontoSelect}` }).first().click();

    }
    await page.pause();
})

//MultiSelect the Value using different approach : 

test("Multi Selecting dropdown for Non Select tag Apprach 2", async ({ page }) => {
    await page.goto("https://www.jqueryscript.net/demo/Drop-Down-Combo-Tree/#google_vignette");
    await page.locator('#justAnInputBox').click();
    await page.waitForTimeout(2000);
    //since selectChoice is async we are writing as await
    await selectChoice(page, ['choice 2 3', 'choice 3', 'choice 6 2', 'choice 6 2 3']);
    await page.pause();
})


//since this function has await we are making this util function as ASync
async function selectChoice(page: Page, choices: String[]) {
    for (let ch of choices) {
        await page.locator('span.comboTreeItemTitle').filter({ hasText: `${ch}` }).first().click();
        await page.waitForTimeout(2000);
    }
}



