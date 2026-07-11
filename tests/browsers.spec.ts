import test, { chromium, firefox, Page, webkit } from "@playwright/test";


// 1. Using the `page` Fixture
// - Playwright Test runner automatically provides a `page` object.
// - No need to launch browser manually.
// - Lifecycle (browser/page setup & teardown) handled by Playwright.
// Example:
test('title test', async ({ page }) => {
    await page.goto("https://flipkart.com");
    console.log("Title:", await page.title()); // Promise<string>
    console.log("URL:", page.url());           // string
});


//In the above test u can see we start from page ...usually the flow is in Playwright we need
//to launch the browser --> then set the page --> then interatct with browser page (Eg.getTitle etc)
//since playwright provides page we used directly the page object using desctructuing 

//without page we can use as below 



//2.
// Note : Channel is used to launch from the desktop but in case of firefox and safari it still launches the 
//nightly build and webkit only not from desktop 

test('multibrowser test', async () => {
    //using chromiun ..to launch the cft 
    // let browser = await chromium.launch({ headless: false });

    //using chromium and to launch the desktop chrome browser 
    //let browser = await chromium.launch({ headless: false, channel: 'chrome' });

    //using chromium and to launch the desktop chrome browser 
    //let browser = await chromium.launch({ headless: false, channel: 'msedge' });

    //using firefox and to launch from the nightly build 
    //let browser = await firefox.launch({ headless: false });

    //using Webkit and to launch from the patch version of Webkit  
    let browser = await webkit.launch({ headless: false });

    let page: Page = await browser.newPage();
    await page.goto("https://www.google.com/")
    let url = page.url();
    console.log("Url is : ", url);
    let title = page.title();
    console.log("Title of Page is : ", title);
})

//For Opera and Brave Browser we need to pass the executable path 


test('opera test', async () => {
    const browser = await chromium.launch({
        headless: false, executablePath: "C:\\Program Files\\Opera\\launcher.exe" // adjust path
    });
    const page = await browser.newPage();
    await page.goto("https://example.com");
    console.log("Title:", await page.title());
});


//  Key Points
// - page.title() → returns Promise<string>, requires await.
// - page.url()   → returns string, no await.
// - Fixture vs manual launch:
//   * Fixture → concise, integrated with test runner.
//   * Manual  → flexible, good for custom setups or non-test runner scripts.