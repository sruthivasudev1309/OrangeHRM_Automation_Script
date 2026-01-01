"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageFixture = void 0;
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
let browser;
let page;
exports.pageFixture = {
    page: undefined
};
(0, cucumber_1.Before)(async () => {
    browser = await test_1.chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    exports.pageFixture.page = page;
});
(0, cucumber_1.After)(async () => {
    await page.close();
    await browser.close();
});
