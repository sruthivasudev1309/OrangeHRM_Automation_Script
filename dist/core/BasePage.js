"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
const test_1 = require("@playwright/test");
class BasePage {
    constructor(page) {
        this.page = page;
    }
    async navigate(url) {
        await this.page.goto(url);
    }
    async click(selector) {
        await this.page.locator(selector).click();
    }
    async fillByPlaceholder(placeholder, text) {
        await this.page.locator(`input[placeholder='${placeholder}'], textarea[placeholder='${placeholder}']`).fill(text);
    }
    async getText(selector) {
        return await this.page.locator(selector).innerText();
    }
    async waitForNetworkIdle() {
        await this.page.waitForLoadState('networkidle');
    }
    async waitForVisibility(selector, timeout = 15000) {
        await this.page.locator(selector).waitFor({ state: 'visible', timeout });
    }
    async clickButton(buttonText) {
        await this.page.locator(`button:has-text("${buttonText}")`).click();
    }
    async selectDropdownByText(label, optionText) {
        await this.page.locator(`mat-select[formcontrolname='${label}']`).click();
        await this.page.locator(`mat-option:has-text("${optionText}")`).click();
    }
    async clickCheckbox(label) {
        await this.page.locator(`label:has-text("${label}")`).click();
    }
    async verifyToastMessage(message, timeout = 15000) {
        const toast = this.page.locator(`//app-snackbar//*[contains(text(),'${message}')]`);
        await (0, test_1.expect)(toast).toBeVisible({ timeout });
    }
    async isElementVisible(selector) {
        return await this.page.locator(selector).isVisible();
    }
    async waitSeconds(seconds) {
        await this.page.waitForTimeout(seconds * 1000);
    }
}
exports.BasePage = BasePage;
