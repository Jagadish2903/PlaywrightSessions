//  Frames / iFrames Handling

//Frames vs iFrames : i frames are standard that are designed based for modern applications as per w3c standard
//frames are kinda legacy one old way ...

//to identify whether frames are there or not in webpage 
//just right click and we can see whether view frames source is diaplyed 
//if so then frames are there 


//  What are Frames?
// - Frames (or <iframe> tags) embed another HTML document inside the current page.
// - Often used for third‑party content or security isolation.
// - Each frame has its own DOM, separate from the main page.

//  Selenium
// - Selenium requires switching the driver context to the frame.
// - Example:
//      driver.switchTo().frame("frameNameOrId");
//      driver.findElement(By.name("RESULT_TextField-1")).sendKeys("Bruno Tales");
// - To go back to main page:
//      driver.switchTo().defaultContent();
// - Limitation: Must explicitly switch in/out of frames.

//  Playwright
// - Playwright provides frameLocator() for direct interaction.
// - No need to switch context manually.
// - Example:



//  Key Differences
// | Feature   | Selenium                        | Playwright                        |
// |-----------|---------------------------------|-----------------------------------|
// | API       | driver.switchTo().frame()       | page.frameLocator()               |
// | Context   | Must switch explicitly          | Direct locator, no switching      |
// | Ease      | More verbose, manual switching  | Cleaner, concise, built‑in        |

import test, { Frame } from "@playwright/test";

test("iframes handle test", async ({ page }) => {
    await page.goto("https://www.formsite.com/templates/registration-form-templates/vehicle-registration-form/");
    await page.getByTitle('Vehicle-Registration-Forms-and-Examples').click();

    // Get iframe element from DOM
    let iframeLocator = page.frameLocator("#frame-one748593425");

    // Interact with elements inside the frame
    await iframeLocator.getByRole('textbox', { name: 'Proposal title' }).fill("Bruno Tales");
    await iframeLocator.getByRole('textbox', { name: 'Location' }).fill("Bruno House");
    await iframeLocator.getByRole('textbox', { name: 'Description ' }).fill("Hi this is Bruno Tales and Please look into it...");
    //to handle the outer layer we need to use page object directly and to handle elements inside the frames 
    //we need to use the framelocator object 
    let pagedetails: string = await page.locator('#tooltip').innerText();
    console.log("The detail of the page is : ", pagedetails);

    await page.pause();
});



//Handle Frames 

test("frameHandle Test", async ({ page }) => {
    await page.goto("https://www.londonfreelance.org/courses/frames/");
    let frameLocator = page.frameLocator('[name=main]');
    let header = await frameLocator.getByRole('heading', { level: 2 }).textContent();
    console.log("The Header of the page is : ", header);
    //we can also create a chain and get the details if needed 
    // let frameLocator = await page.frameLocator('[name=main]').getByRole('heading', { level: 2 }).textContent();
    // console.log("The Header of the page is : ", frameLocator);

})


//To get the total no of frames count we can use the existing method in playwright (page.frames())

test("frame count test", async ({ page }) => {
    await page.goto("https://www.londonfreelance.org/courses/frames/");
    let noOfFrames: Frame[] = page.frames();
    let total = noOfFrames.length;
    console.log("Total frames in the page is : ", total);

    //we can also get that through another way like below but its not recommended ...alway we need to use the playwright way 
    console.log(await page.locator('//frame').count());


    //we can also get the frame deatils like below 
    for (let ele of noOfFrames) {
        let frameName = ele.name();
        let frameUrl = ele.url();
        console.log(frameName, ": ", frameUrl);

    }
})


//  Handling Nested Frames

//  Concept
// - Nested frames = iframe inside another iframe.
// - To interact, you must traverse from parent → child → grandchild.
// - Each frame has its own DOM context.

//  Selenium
// - Requires explicit switching between frames.
// - Example:
//      driver.switchTo().frame("parent_iframe");
//      driver.switchTo().frame("child_iframe");
//      driver.findElement(By.id("processing")).getText();
// - To return to parent or main page:
//      driver.switchTo().parentFrame();   // go one level up
//      driver.switchTo().defaultContent(); // go back to main page
// - Limitation: verbose, manual switching needed.

//  Playwright
// - Provides frameLocator() for direct nested frame access.
// - No need to switch context manually.
// - Example:


test("handle nested frames", async ({ page }) => {
    await page.goto("https://www.dezlearn.com/nested-iframes-example/");

    // Parent frame
    let parentFrame = page.frameLocator("#parent_iframe");
    await parentFrame.getByRole('button', { name: 'Click Here' }).click();

    // Child frame inside parent
    let childFrame = parentFrame.frameLocator("#iframe1");
    await childFrame.getByRole('button', { name: 'Click Here' }).click();

    // Extract text from parent and child frames
    let parentFrameText: string = await parentFrame.locator("#processing").innerText();
    let childFrameText: string = await childFrame.locator("#processing").innerText();

    console.log("ParentFrameText is : ", parentFrameText);
    console.log("ChildFrameText is : ", childFrameText);

    // Extract text from main page
    let title: string = await page.getByRole('heading', { level: 2 }).innerText();
    console.log("Main Title is : ", title);

    await page.pause();
});



