import test, { Locator } from "@playwright/test";

test("Chain Locator Test", async ({ page }) => {
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");

    // ===============================
    // Chaining locators (Playwright way)
    // ===============================
    // Start from parent <form>, then locate the textbox by role and name
    await page.locator('form')
        .getByRole('textbox', { name: "First Name" })
        .fill("Bruno");

    await page.waitForTimeout(2000);

    // Start from parent #column-right, then locate the link by role and name
    await page.locator('#column-right')
        .getByRole('link', { name: "Forgotten Password" })
        .click();

    await page.pause();
});

// ===============================
//  Notes
// ===============================
// - Chain locators let you scope searches to a parent element, improving precision.
// - Example: form → textbox, or column-right → link.
// - getByRole is preferred for accessibility and stability.
// - Chaining improves readability compared to long CSS/XPath selectors.
// - Typical pattern: parent.locator(...).getByRole(...).action()
// - Use waitForTimeout only for demo/debug; prefer auto-waiting in real tests.



//CricBuzz Example

test("WebTable Handling Test for Crickbuzz", async ({ page }) => {
    await page.goto("https://www.cricbuzz.com/live-cricket-scorecard/152507/wi-vs-pak-2nd-test-pakistan-tour-of-west-indies-2026");

    // ===============================
    // Playwright chain locator approach
    // ===============================
    // Steps:
    // 1. Start from parent container (#scard-team-10-innings-3)
    // 2. Narrow down to rows (.flex.flex-col)
    // 3. Filter row by batsman name (Jayden Seales)
    // 4. Within that row, locate the wicket-taker column (div)
    let wicketTaker: string | null = await page.locator('#scard-team-10-innings-3')
        .locator('.flex.flex-col')
        .filter({ hasText: 'Jayden Seales' })
        .locator('div')
        .textContent();

    console.log("Wicket Taker:", wicketTaker);

    await page.pause();
});

// ===============================
//  Notes
// ===============================
// - filter({ hasText: '...' }) is powerful for narrowing rows by player name.
// - Once scoped to the correct row, you can chain down to the specific column.
// - textContent() returns string | null (safe if element missing).
// - innerText() always returns string (throws if element missing).
// - This pattern is reusable for any scorecard table:
//   • Parent container → row locator → filter by player → column locator.
// - Cleaner and more readable than long XPath expressions.




//Fetch Data from the table 
test("Fetch Data from the Table Test", async ({ page }) => {
    await page.goto("https://www.w3schools.com/html/html_tables.asp");
    let tablecontent: string[] = await page.locator('table').first().locator('tr').allInnerTexts();
    for (let ele of tablecontent) {
        console.log(ele);
        console.log("==============================");
    }
    await page.pause();

})


//select all checkboxes in the webtable 

test("clicking Checkboxes one by one Test", async ({ page }) => {
    await page.goto("https://naveenautomationlabs.com/opencart/ui/webtable.html");

    let checkboxes = await page.locator('table#resultTable tbody').getByRole('checkbox').all();
    for (let ele of checkboxes) {
        ele.click();
        await page.waitForTimeout(1000);
    }
})

//using for loop
test("clicking Checkboxes one by one Test using for loop ", async ({ page }) => {
    await page.goto("https://naveenautomationlabs.com/opencart/ui/webtable.html");

    let checkboxes = await page.locator('table#resultTable tbody').getByRole('checkbox').all();
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].click();
        await page.waitForTimeout(1000);
    }
})



//Gettign Wicket Taker Name 
test("Getting WicketTaker Name from the CrickInfo Test", async ({ page }) => {
    await page.goto("https://www.cricinfo.com/series/the-hundred-men-s-competition-2026-1521176/london-spirit-men-vs-mi-london-men-23rd-match-1521253/full-scorecard");
    let playerName = "Jonny Bairstow"
    let wicketTaker: string = await page.locator('table.ci-scorecard-table').first().locator('tbody tr').filter({ hasText: `${playerName}` }).locator('td').nth(1).locator('span span').innerText();
    console.log(wicketTaker);
    await page.pause();
})



test("Getting complete details of the batsman from the CrickInfo Test", async ({ page }) => {
    await page.goto("https://www.cricinfo.com/series/the-hundred-men-s-competition-2026-1521176/london-spirit-men-vs-mi-london-men-23rd-match-1521253/full-scorecard");
    let playerName = "Jonny Bairstow"
    let scoreDetails = await page.locator('table.ci-scorecard-table').first().locator('tbody tr').filter({ hasText: `David Willey` }).first().locator('td').all();
    for (let ele of scoreDetails) {
        //to print 
        console.log(await ele.innerText());
        //to print in single line 
        // process.stdout.write(await ele.innerText() + " ");
    }
    await page.pause();

})
