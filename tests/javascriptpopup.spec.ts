import test from '@playwright/test'


//  JavaScript Pop‑ups Handling

// Types of Pop‑ups
// 1. Normal Alert
//    - Simple message box with only OK button
// 2. Confirmation Pop‑up
//    - Provides OK and Cancel options
// 3. Prompt Pop‑up
//    - Allows user input (text field) with OK and Cancel

// Selenium Handling
// - Selenium provides Alerts API
// - Usage:
//      driver.switchTo().alert();
//      alert.accept();   // Clicks OK
//      alert.dismiss();  // Clicks Cancel
//      alert.sendKeys("text"); // For prompt input

// Playwright Handling
// - Playwright uses event listeners for dialogs and it automatically kills it 
// - but we can capture message and perform actions using a customized one like below by overriding the default one
// - Example:
//      page.on('dialog', async (dialog) => {
//          console.log(dialog.message());
//          await dialog.dismiss(); // Default auto-dismiss
//          // Or: await dialog.accept("input text");
//      });
// - Listener automatically catches pop‑ups
// - Can be customized to accept, dismiss, or provide input

// Key Difference: Selenium vs Playwright
// | Feature   | Selenium                  | Playwright                  |
// |-----------|---------------------------|-----------------------------|
// | API       | switchTo().alert()        | page.on('dialog') listener  |
// | Default   | Manual handling           | Auto-dismiss unless customized |
// | Input     | sendKeys()                | dialog.accept("text")       |
// | Style     | Blocking call             | Event-driven                |



test('JS Alert Test', async ({ page }) => {

    //Creating a customised listener to override the defalut listeners to capture the event 
    // Pop‑ups come in three types:
    // 1. Alert
    // 2. Confirm
    // 3. Prompt
    page.on('dialog', async (popup) => {
        //To Handle Normal Alert 
        if (popup.type() === 'alert') {
            console.log(popup.message());
            await popup.accept();
        }

        //To Handle Confirm Alert 
        if (popup.type() === 'confirm') {
            console.log(popup.message());
            await popup.accept();
        }

        //To Handle Prompt Alert 
        if (popup.type() === 'prompt') {
            console.log(popup.message());
            await popup.accept('Hi This is for testing Popups');
        }
    })
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
    await page.getByRole('button', { name: 'Click for JS Alert' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
    await page.waitForTimeout(2000);
    await page.pause();
})




//Example 2: Rediff Mail site 

test('Handle JS Popups Test', async ({ page }) => {
    page.on('dialog', async (popup) => {
        if (popup.type() === 'alert') {
            console.log(popup.message());
            await popup.accept();
        }
    })
    await page.goto("https://mail.rediff.com/cgi-bin/login.cgi");
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.locator('#login1').fill("bruno123");
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.pause();
})