import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect, Page, chromium } from '@playwright/test';
import { GenericLocators } from '../page-objects/GenericLocators';

setDefaultTimeout(60 * 1000);

let page: Page;
let locators: GenericLocators;

Given('I open the login page', async function () {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  locators = new GenericLocators(page);
  await page.goto('https://opensource-demo.orangehrmlive.com/');
});

When('I enter username {string}', async function (username: string) {
  await locators.genericInputByPlaceHolder('Username').fill(username);
});

When('I enter password {string}', async function (password: string) {
  await locators.genericInputByPlaceHolder('Password').fill(password);
});

Then('I click login button', async function () {
  await page.click('button[type="submit"]');
});

Then('I should see dashboard', async function () {
  await expect(page.locator('h6:has-text("Dashboard")')).toBeVisible();
});

