// Fill Value with Delay (Character by Character)

//  Selenium
// - Selenium does not have a built-in method to type with delay.
// - Common approaches:
//   1. Use sendKeys() with Thread.sleep() between characters.
//   2. Example:
//        WebElement searchBox = driver.findElement(By.name("q"));
//        String text = "Login";
//        for (char c : text.toCharArray()) {
//            searchBox.sendKeys(Character.toString(c));
//            Thread.sleep(500); // delay in ms
//        }
// - This simulates typing character by character.

// Playwright
// - Playwright provides pressSequentially() with delay option.
// - Much cleaner and built-in compared to Selenium.


// Use Case:
// - Search functionality validation
// - Typing each character one by one to check suggestion list updates



// - Example:



import test from "@playwright/test";

test("Fill with Delay Test", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/");
    await page.getByRole('textbox', { name: 'Search' })
        .pressSequentially("Login", { delay: 500 });
    await page.pause();
});

