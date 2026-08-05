import test from "@playwright/test";

// ===============================
// Dropdown Selection Notes
// ===============================

// Locator
// Use getByRole("combobox", { name: "Country" }) → ensures accessibility alignment.

// Single‑select dropdowns

// By visible text
// Equivalent to Selenium’s selectByVisibleText
test("SelectBased Dropdown Test (by visibleText shown in DOM)", async ({ page }) => {
    await page.goto("https://orangehrm.com/contact-sales");
    let selectedVal: String[] = await page.getByRole("combobox", { name: "Country" })
        .selectOption({ label: "Angola" });
    console.log(selectedVal);
    await page.pause();
});

// By value attribute
// Equivalent to Selenium’s selectByValue
test("SelectBased Dropdown Test (by value attribute shown in DOM)", async ({ page }) => {
    await page.goto("https://orangehrm.com/contact-sales");
    let selectedVal: String[] = await page.getByRole("combobox", { name: "Country" })
        .selectOption({ value: "Belgium" });
    console.log(selectedVal);
    await page.pause();
});

// By index
// Equivalent to Selenium’s selectByIndex
// Fragile if order changes; only recommended for predictable lists (e.g., months)
test("SelectBased Dropdown Test (by Index)", async ({ page }) => {
    await page.goto("https://orangehrm.com/contact-sales");
    let selectedVal: String[] = await page.getByRole("combobox", { name: "Country" })
        .selectOption({ index: 9 });
    console.log(selectedVal);
    await page.pause();
});

// By direct string
// Shorthand when <option value="India">India</option>
// Returns an array of selected values
test("SelectBased Dropdown Test (for UIVisibleone)", async ({ page }) => {
    await page.goto("https://orangehrm.com/contact-sales");
    let selectedVal: String[] = await page.getByRole("combobox", { name: "Country" })
        .selectOption("India");
    console.log(selectedVal);
    // - inputValue() returns the current single value as string.
    //works for text,text area and dropdown with select tag
    let currentVal: string = await page.getByRole("combobox", { name: "Country" })
        .inputValue();
    console.log(currentVal);
    await page.pause();
});

// ===============================
//  General Notes
// ===============================
// - selectOption accepts: string, { label }, { value }, { index }.
// - Returns an array of strings → useful for multi-select dropdowns.
// - inputValue() returns the current single value as string and works for <input>, <textarea> or <select> element
// - Prefer label or value for stability and clarity.
// - Comparison with Selenium:
//   • selectByVisibleText → { label: "..." }
//   • selectByValue       → { value: "..." }
//   • selectByIndex       → { index: ... }



// Multi‑select dropdowns
// -----------------------
// Multiple choice dropdowns with <select multiple> tag
// Example: ListBox
test("Multiple choice dropdown Test", async ({ page }) => {
    await page.goto("https://selenium08.blogspot.com/2019/11/dropdown.html");
    let selectedVal: string[] = await page.locator('[name="Month"]')
        .selectOption(["March", "April", "June"]);
    console.log(selectedVal);//[ 'Ma', 'Ap', 'June' ]
    let currentVal: string = await page.locator('[name="Month"]')
        .inputValue();
    console.log(currentVal);//Ma
    await page.pause();
});



test("Multiple choice dropdown Test (Print all values)", async ({ page }) => {
    await page.goto("https://selenium08.blogspot.com/2019/11/dropdown.html");

    // Select multiple options
    await page.locator('[name="Month"]').selectOption(["March", "April", "June"]);

    // Get all selected options
    const selectedOptions = await page.locator('[name="Month"] option:checked').all();

    // Print their value attributes
    for (const option of selectedOptions) {
        const valueAttr = await option.getAttribute("value");
        console.log("Selected value attribute:", valueAttr);
    }

    await page.pause();
});

