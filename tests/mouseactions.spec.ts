//  Mouse Actions (Right Click, Drag & Drop, etc.)

//  Selenium
// - Selenium uses Actions class for advanced mouse interactions.
// - Example (Right Click):
//      Actions actions = new Actions(driver);
//      WebElement element = driver.findElement(By.xpath("//span[text()='right click me']"));
//      actions.contextClick(element).perform();
// - Example (Drag & Drop):
//      actions.dragAndDrop(sourceElement, targetElement).perform();
// - Limitation: Verbose, requires Actions object for each scenario.

//  Playwright
// - Playwright provides built-in mouse actions directly via locators.
// - Example (Right Click , dragTo):
import test from "@playwright/test";


test("Right Click Test", async ({ page }) => {
    await page.goto("https://swisnl.github.io/jQuery-contextMenu/demo.html");

    // Right click on element
    await page.getByText('right click me', { exact: true }).click({ button: 'right' });

    // Select option from context menu
    await page.getByText('Copy', { exact: true }).click();

    await page.pause();
});


test('Drag and Drop Test', async ({ page }) => {
    await page.goto("https://jqueryui.com/resources/demos/droppable/default.html");
    let source = page.locator('//div[@id="draggable"]');
    let target = page.locator('//div[@id="droppable"]');
    source.dragTo(target);
    await page.pause();
})



test('moveToElement Test (2 level menus)', async ({ page }) => {
    await page.goto("https://www.spicejet.com/");
    await page.getByText('Travel Policies', { exact: true }).hover();
    //wait for submenu 
    await page.getByText('Passenger Rights', { exact: true }).waitFor({ state: "visible" })
    await page.getByText('Passenger Rights', { exact: true }).click();
    await page.pause();
})


test('move to Element test(3 level submenu)', async ({ page }) => {
    await page.goto("https://www.bigbasket.com/");
    await page.getByText('Category', { exact: true }).last().click()
    await page.locator('//div[@role="menu"]').last().getByRole('link', { name: 'Beverages', exact: true }).last().waitFor({ state: "visible" });
    await page.locator('//div[@role="menu"]').last().getByRole('link', { name: 'Beverages', exact: true }).last().hover();
    await page.locator('//div[@role="menu"]').last().getByRole('link', { name: 'Tea', exact: true }).last().waitFor({ state: "attached" });
    await page.locator('//div[@role="menu"]').last().getByRole('link', { name: 'Tea', exact: true }).last().hover();
    await page.locator('//div[@role="menu"]').last().getByRole('link', { name: "Tea Bags", exact: true }).waitFor({ state: "attached" });
    await page.locator('//div[@role="menu"]').last().getByRole('link', { name: "Tea Bags", exact: true }).click();
    await page.pause();

})