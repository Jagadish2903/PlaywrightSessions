import test from "@playwright/test";

test("Getall Links from the WebPage", async ({ page }) => {
    await page.goto("https://naveenautomationlabs.com/opencart/");
    let links = await page.locator("//ul[@class='nav navbar-nav']/li/a").all();

    await page.waitForTimeout(2000);
    for (let ele of links) {
        let linksValue: String | null = await ele.getAttribute('href');
        let linksText: String | null = await ele.textContent();
        console.log(linksText, ":", linksValue);
    }

})



test("Get all Links and click on specific one in WebPage", async ({ page }) => {
    await page.goto("https://naveenautomationlabs.com/opencart/");
    let links = await page.locator("//ul[@class='nav navbar-nav']/li/a").all();

    await page.waitForTimeout(2000);
    for (let ele of links) {
        let linksValue: String | null = await ele.getAttribute('href');
        let linksText: String | null = await ele.textContent();
        console.log(linksText, ":", linksValue);
        if (linksText === "Cameras") {
            await ele.click();
            break;
        }
    }

})


test("Getall images from the WebPage", async ({ page }) => {
    await page.goto("https://naveenautomationlabs.com/opencart/");
    let img = await page.locator("//div[starts-with(@class,'product-thumb')]//img").all();
    let imgCount: number = await page.locator("//div[starts-with(@class,'product-thumb')]//img").count();
    console.log("No of Images present in Specific Area : ", imgCount);
    await page.waitForTimeout(2000);
    for (let ele of img) {
        let products: String | null = await ele.getAttribute('title');
        console.log(products);
    }

})



//Getting all links from Guru99 using innerText method 

test("GetAllLinks Test", async ({ page }) => {
    await page.goto("https://www.guru99.com/");
    let footerlinks = await page.locator("//a[@class='footer-menu1']").allInnerTexts();
    for (let ele of footerlinks) {
        console.log(ele);

    }
})


test("GetAllLinks and click on Specific one Test", async ({ page }) => {
    await page.goto("https://www.guru99.com/");
    let footerlinks = await page.locator("//a[@class='footer-menu1']").all();
    for (let ele of footerlinks) {
        let footerText: String | null = await ele.innerText();
        if (footerText === "About Us") {
            await ele.click();
            await page.waitForTimeout(2000);
            let pageUrl: String = page.url()
            console.log("The Navigated Url is : ", pageUrl);
            break;
        }

    }
})


//Using For Loop 
test("GetAllLinks and click on Specific one Using For loop Test", async ({ page }) => {
    await page.goto("https://www.guru99.com/");
    let footerlinks = page.locator("//a[@class='footer-menu1']")
    let footerlinksCount: number = await page.locator("//a[@class='footer-menu1']").count();

    for (let i = 0; i < footerlinksCount; i++) {
        let text: String | null = await footerlinks.nth(i).innerText();
        console.log(text);
        if (text === "Work with Us") {
            await footerlinks.nth(i).click();
            await page.waitForTimeout(2000);
            const pageUrl: String = page.url();
            console.log("Current Url of the page is : ", pageUrl);
            break;

        }
    }
})