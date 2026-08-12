import test from "@playwright/test";

test("Form filling test", async ({ page }) => {
    await page.goto("https://www.formsite.com/templates/registration-form-templates/vehicle-registration-form/");
    await page.getByTitle('Vehicle-Registration-Forms-and-Examples').click();
    let frameLocator = page.frameLocator('#frame-one748593425');
    await frameLocator.getByRole('textbox', { name: 'Proposal title' }).fill("Bruno Tales");
    await frameLocator.getByRole('textbox', { name: 'Location' }).fill('Bruno House');
    await frameLocator.getByRole('textbox', { name: 'Description' }).fill('Bruno loves his house always');
    let [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        frameLocator.getByRole('button', { name: 'Attach any supporting' }).click()]);

    await fileChooser.setFiles(["C:/Users/jagadish.r/OneDrive - Tavant Technologies/Documents/blank1.pdf"]);

    await frameLocator.getByRole('textbox', { name: 'First Name' }).fill('Bruno');
    await frameLocator.getByRole('textbox', { name: 'Last Name' }).fill('Jack');
    await frameLocator.getByRole('textbox', { name: 'Street Address' }).fill('#308 Vishal Enclave');
    await frameLocator.getByRole('textbox', { name: 'Address Line 2' }).fill('Koramangala');
    await frameLocator.getByRole('textbox', { name: 'City' }).fill('Bangalore');
    await frameLocator.getByRole('textbox', { name: 'City' }).fill('Bangalore');
    await frameLocator.getByRole('combobox', { name: 'State' }).selectOption("Florida");
    await frameLocator.getByRole('textbox', { name: 'Zip Code' }).fill('632511');
    await frameLocator.getByRole('textbox', { name: 'Zip Code' }).fill('632511');
    await frameLocator.getByRole('textbox', { name: 'Phone Number' }).fill('1234567890');
    await frameLocator.getByRole('textbox', { name: 'Email Address' }).fill('Brunotales@gmail.com');

    await page.pause();
})