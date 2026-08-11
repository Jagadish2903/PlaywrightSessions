//  File Upload Handling

import test from "@playwright/test";

// In Selenium:
// - File upload is usually done using sendKeys()
//   Example:
//      driver.findElement(By.id("fileUpload")).sendKeys("C:\\path\\to\\file.txt");
// - For advanced cases, third‑party APIs or Robot class may be used.

// In Playwright:
// - Playwright provides direct API for file uploads
// - Scenarios:
//   1. Single File Upload
//      await page.setInputFiles('#fileUpload', 'C:/path/to/file.txt');

//   2. Multiple File Upload
//      await page.setInputFiles('#fileUpload', [
//          'C:/path/to/file1.txt',
//          'C:/path/to/file2.txt'
//      ]);

// - Notes:
//   • Works only with <input type="file"> elements
//   • No need for external libraries
//   • Can dynamically clear files using:
//        await page.setInputFiles('#fileUpload', []);



// Works only with <input type="file"> elements
test('single FileUpload Test', async ({ page }) => {
    await page.goto("https://naveenautomationlabs.com/opencart/ui/file-upload.html");
    //uploading the single file
    await page.locator("#single-file").setInputFiles("C:/Users/jagadish.r/OneDrive - Tavant Technologies/Documents/blank.pdf");
    await page.waitForTimeout(2000);
    //To remove the uploaded file 
    await page.locator('#single-file').setInputFiles([]);
    await page.pause();
});


//Works only with <input type="file"> elements
test('Multiple FileUpload Test', async ({ page }) => {
    await page.goto("https://naveenautomationlabs.com/opencart/ui/file-upload.html");
    //uploading the single file
    await page.locator("#multi-file").
        setInputFiles(["C:/Users/jagadish.r/OneDrive - Tavant Technologies/Documents/blank.pdf",
            "C:/Users/jagadish.r/OneDrive - Tavant Technologies/Documents/blank1.pdf"]);
    await page.waitForTimeout(2000);
    //To remove the uploaded file 
    await page.locator('#multi-file').setInputFiles([]);
    await page.pause();
});



//  File Upload Handling (No <input type="file">)

// Scenario: When the element is not a direct <input type="file">
// - Use Playwright's FileChooser API
// - Steps:
//   1. Wait for 'filechooser' event
//   2. Trigger the custom upload button
//   3. Set files using fileChooser.setFiles()

test('FileUpload with custom button', async ({ page }) => {
    await page.goto("https://naveenautomationlabs.com/opencart/ui/file-upload.html");

    // Wait for file chooser when clicking custom upload button
    let [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.locator('#custom-upload-btn').click()
    ]);

    // Upload multiple files
    await fileChooser.setFiles([
        "C:/Users/jagadish.r/OneDrive - Tavant Technologies/Documents/blank.pdf",
        "C:/Users/jagadish.r/OneDrive - Tavant Technologies/Documents/blank1.pdf"
    ]);
    await page.waitForTimeout(2000);

    // Upload single file
    await fileChooser.setFiles([
        "C:/Users/jagadish.r/OneDrive - Tavant Technologies/Documents/blank.pdf"
    ]);
    await page.waitForTimeout(2000);

    // Clear uploaded files
    await fileChooser.setFiles([]);
    await page.pause();
});
