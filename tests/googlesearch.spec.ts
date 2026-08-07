import test from "@playwright/test";

test("googleSearch Test", async ({ page }) => {
    await page.goto("https://www.google.com/");
    await page.waitForTimeout(10000);
    await page.getByRole('combobox', { name: 'Search' }).fill("Tamilnadu");
    await page.waitForTimeout(1000);
    await page.locator('div[role=option] span').filter({ hasText: 'election results' }).click();
    console.log(page.url());
})


//Amazon search

test("Amazon Search Test", async ({ page }) => {
    await page.goto("https://www.amazon.in/ref=nav_logo");
    await page.getByRole('searchbox').fill("MacBook");
    await page.locator('div.two-pane-results-container').locator('div[role=button]').filter({ hasText: ' pro m5' }).click();
    console.log(page.url());
    await page.pause();
})



//Flipkart search with suggestion going (Freeze the page and get the details)

//Type something in Searchbox and it gives suggestion and it will go off once u click outside to inspect 
//to handle this case :
//First type something in searchbox (example macbook)
//go to console in dom 
//type    setTimeout(()=>{debugger;},5000)
//and again click on the search box ..
//after 5 sec it will freeze the page 
//now inspect the element 



//or we can use locator labs 
//First type something in searchbox (example macbook)
//go to console in dom 
//click freeze icon in the locator labs 
//and again click on the search box ..

test("Flipkart Search Test", async ({ page }) => {
    await page.goto("https://www.flipkart.com/");
    await page.getByRole('textbox', { name: 'Search for Products, Brands' }).fill("MacBook");
    await page.locator('ul li a div').filter({ hasText: 'air m4' }).click();
    console.log(page.url());
    await page.pause();

})