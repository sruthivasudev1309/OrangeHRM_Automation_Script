"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
const GenericLocators_1 = require("../page-objects/GenericLocators");
(0, cucumber_1.setDefaultTimeout)(60 * 1000);
let page;
let locators;
let browserContext;
let browserInstance;
(0, cucumber_1.Given)('I open the login page', async function () {
    browserInstance = await test_1.chromium.launch({ headless: false });
    browserContext = await browserInstance.newContext();
    page = await browserContext.newPage();
    locators = new GenericLocators_1.GenericLocators(page);
    await page.goto('https://opensource-demo.orangehrmlive.com/');
});
(0, cucumber_1.When)('I enter username {string}', async function (username) {
    await locators.genericInputByPlaceHolder('Username').fill(username);
});
(0, cucumber_1.When)('I enter password {string}', async function (password) {
    await locators.genericInputByPlaceHolder('Password').fill(password);
});
(0, cucumber_1.Then)('I click login button', async function () {
    await page.click('button[type="submit"]');
});
(0, cucumber_1.Then)('I should see dashboard', async function () {
    await (0, test_1.expect)(page.locator('h6:has-text("Dashboard")')).toBeVisible();
    await browserInstance.close();
});
