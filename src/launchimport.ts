import { Browser, Page } from "@playwright/test";
import launcher from "./launch";


let browser: Browser = await launcher.launchBrowser("firefox");
let page: Page = await browser.newPage();
await page.goto("https://testautomationpractice.blogspot.com/");
let title = await page.title();
console.log("Title of the page is ", title);
await browser.close();