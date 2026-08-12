//  File Download Handling

//  Selenium
// - Selenium WebDriver itself does not provide a direct API for downloads.
// - Common approaches:
//   1. Configure browser profile (e.g., ChromeOptions, FirefoxProfile) 
//      → set default download directory, auto‑accept downloads.
//   2. Use external libraries (Apache Commons IO, Java NIO) to verify file existence.
//   3. For advanced cases, use Chrome DevTools Protocol (CDP) or third‑party tools.
// - Example (Chrome):
//      ChromeOptions options = new ChromeOptions();
//      HashMap<String, Object> prefs = new HashMap<>();
//      prefs.put("download.default_directory", "C:\\downloads");
//      options.setExperimentalOption("prefs", prefs);
//      WebDriver driver = new ChromeDriver(options);

//  Playwright
// - Playwright provides a native Download API.
// - Steps:
//   1. Wait for 'download' event when clicking a link/button.
//   2. Verify download success with download.failure().
//   3. Get file name using download.suggestedFilename().
//   4. Save file to custom path using download.saveAs(path).
//   5. Verify file existence and size using Node's fs module.
// - Example:
import test, { expect } from "@playwright/test";
import fs from 'fs';

test("File Download Test", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/download");

    // Wait for download event
    let [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('link', { name: 'archivo-de-prueba.txt' }).click()
    ]);

    //  Verify download succeeded
    expect(await download.failure()).toBeNull();

    //  Verify file name
    console.log("The downloaded file is " + download.suggestedFilename());

    //  Save file to specific path
    let filepath = "./downloads/" + download.suggestedFilename();
    await download.saveAs(filepath);

    // Verify file exists
    expect(fs.existsSync(filepath)).toBeTruthy();

    // Verify file size > 0
    let filesize = fs.statSync(filepath).size;
    console.log("Size of the file is : ", filesize);
    expect(filesize).toBeGreaterThan(0);
});
