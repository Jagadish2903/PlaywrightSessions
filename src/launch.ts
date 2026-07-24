import { Browser, chromium, firefox, Page, webkit } from "playwright/test"

//writing a code and launching a browser with url ...and this is without tets runner ...
//since its inside the src folder not the tets folder 
//to run this also we need to run it manually wont work on npx playwright commands 
//and its not recommnded apprach to write test here 

//browser -> page -> locator -> url 

//1. Scenario 1
// (async () => {

//     let browser: Browser = await chromium.launch({ headless: false, channel: "chrome" })
//     let page: Page = await browser.newPage();
//     await page.goto("https://testautomationpractice.blogspot.com/");
//     let title = await page.title();
//     console.log("Title of the page : " + title);
//     browser.close();
// })();




//2. Scenario 2
type BrowserName = "chrome" | "firefox" | "safari" | "edge"

async function launchBrowser(browserName: BrowserName) {

    console.log("browser name : ", browserName);

    switch (browserName.trim().toLowerCase()) {
        case 'chrome':
            return await chromium.launch({ headless: false, channel: 'chrome' })


        case 'edge':
            return await chromium.launch({ headless: false, channel: 'msedge' })


        case 'firefox':
            return await firefox.launch({ headless: false })


        case 'safari':
            return await webkit.launch({ headless: false })


        default:
            console.log("Browser given is ", browserName);
            throw new Error("Please pass the correct browser")

    }

}


export default {
    launchBrowser
}



