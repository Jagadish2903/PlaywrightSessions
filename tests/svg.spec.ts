//  Handling SVG Elements

//  Concept
// - SVG (Scalable Vector Graphics) are XML-based elements used for charts, maps, icons.
// - They often use <svg>, <path>, <circle>, <text>, <g> tags.
// - Locating them can be tricky because they are XML nodes, not standard HTML.

//  Selenium
// - Selenium requires XPath with local-name() or name() to handle SVGs.
// - Example:
//      WebElement element = driver.findElement(By.xpath("//*[name()='svg']//*[name()='path']"));
//      element.click();
// - Limitation: Verbose, error-prone, must use XML namespace tricks.
// - CSS selectors sometimes fail because of namespaces.

//  Playwright
// - Playwright handles SVGs easily with normal CSS or role-based locators.
// - No need for local-name hacks.
// - Example:
import test from "@playwright/test";

test('svg handle test', async ({ page }) => {
    await page.goto("https://petdiseasealerts.org/forecast-map#/");
    await page.waitForTimeout(5000);

    // Locate frame containing SVG map
    let frameLocator = page.locator('.forecast-map-container')
        .frameLocator("//*[starts-with(@id,'map-instance')]");

    // Collect all regions inside SVG
    let allRegions = await frameLocator.locator(
        'svg#map-svg #features g#regions .region'
    ).all();

    console.log("Total Regions are : ", allRegions.length);

    // Iterate through regions
    for (let ele of allRegions) {
        await ele.hover({ force: true }); // hover over each region
        let regionId: string | null = await ele.getAttribute('id');
        console.log(regionId);
        await page.waitForTimeout(500);
    }
});

//  Key Differences
// | Feature   | Selenium (XPath hacks)           | Playwright (Simple locators)      |
// |-----------|----------------------------------|-----------------------------------|
// | API       | XPath with local-name()          | CSS / role locators               |
// | Ease      | Verbose, complex                 | Cleaner, concise, built-in        |
// | Namespace | Must handle XML namespaces       | Auto-pierces, no namespace issues |
// | Actions   | Limited, manual                  | Full support (hover, click, read) |




//Example:2

test('Gold Graph Test', async ({ page }) => {
    await page.goto("https://goldprice.org/");
    

})