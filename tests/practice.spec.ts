import test from "@playwright/test";


//Gettign the table content from all 
test("gettingComplete Data from the Table Test", async ({ page }) => {
    await page.goto("https://qavbox.github.io/demo/webtable/");
    let tableContents = await page.locator('table tbody').last().locator('tr').all();
    for (let ele of tableContents) {
        let tableData = await ele.innerText();
        console.log(tableData);
        console.log("=======================");
    }
})


//Get Bowing Stats from CricInfo 

test("Getting Bowling stats from CricInfo Test", async ({ page }) => {
    await page.goto("https://www.cricinfo.com/series/the-hundred-men-s-competition-2026-1521176/london-spirit-men-vs-mi-london-men-23rd-match-1521253/full-scorecard");
    let bowlerName = 'Liam Livingstone';
    let bowlingStats = await page.locator('table tbody tr').filter({ hasText: `${bowlerName}` }).last().locator('td').all();
    for (let i = 1; i < bowlingStats.length; i++) {
        let value = await bowlingStats[i].innerText();
        console.log(value);
    }
    await page.pause();
})


