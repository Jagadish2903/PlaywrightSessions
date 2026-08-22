//  Pseudo Elements (::before / ::after)

//  Concept
// - Pseudo elements (::before, ::after) are used in CSS to insert content.
// - Example: A mandatory field label showing "*" via ::after.
// - These elements are not part of the DOM tree, so cannot be located directly.
// - Must be accessed via CSS styles.

//  Selenium
// - Selenium cannot directly locate pseudo elements.
// - Requires JavascriptExecutor to fetch computed styles.
// - Example:
//      WebElement element = driver.findElement(By.id("usernameLabel"));
//      JavascriptExecutor js = (JavascriptExecutor) driver;
//      String content = (String) js.executeScript(
//          "return window.getComputedStyle(arguments[0], '::after').getPropertyValue('content');",
//          element
//      );
//      System.out.println("Pseudo element content: " + content);
// - Limitation: Verbose, must rely on JS execution.

//  Playwright
// - Playwright provides evaluate() to run JS directly on elements.
// - Much simpler compared to Selenium.
// - Example: 


//we need to go to DOM and then go to console and since its a  css style one ...we need to write as 
//getComputedStyle and it taskes two params (element location) and then the css value whihc we need 
//like below 
// window.getComputedStyle(document.queryselector('')!,'::before').getPropertyvalue()

//Note: Window and Document library are not coming from playwright or node its coming from DOM one sp we need 
//to explicitly emention the lib as DOM in tsconfig.json 
//and also the module should be updated to es2020
//after this actions only we will not get error on the line 

import test from "@playwright/test";



//Getting Psedo Element
test("PseudoElements Handle Test", async ({ page }) => {
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");
    let content = await page.evaluate(() => {
        return window.getComputedStyle(document.querySelector('label[for="input-firstname"]')!, '::before').getPropertyValue('content')
    })

    console.log(content);
    await page.pause();
})


//get the title using Javascript legacy one without playwright default commands s
test("Get the Title Test using Javascript", async ({ page }) => {
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");
    let title = await page.evaluate(() => {
        return document.title;
    })

    console.log("The title of the page is", title);
})






