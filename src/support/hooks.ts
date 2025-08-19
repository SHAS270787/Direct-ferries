import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';

setDefaultTimeout(60 * 1000);

let browser: Browser;
let page: Page;

Before(async function () {
  browser = await chromium.launch({ headless: true }); // headless for CI
  page = await browser.newPage();
  this.page = page;
});

After(async function () {
  if (page) await page.close();
  if (browser) await browser.close();
});
