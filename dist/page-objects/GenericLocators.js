"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericLocators = void 0;
class GenericLocators {
    constructor(page) {
        this.genericInputByPlaceHolder = (placeholder) => this.page.locator(`input[placeholder='${placeholder}']`);
        this.genericMatSelectPlaceHolder = (placeholder) => this.page.locator(`mat-select[placeholder='${placeholder}']`);
        this.genericInputByType = (type) => this.page.locator(`input[type='${type}']`);
        this.genericInputByPlaceHolderAreaLabel = (placeholder) => this.page.locator(`input[placeholder='${placeholder}'][aria-required='true']`);
        this.genericFormControlByAreaLabel = (formControlName) => this.page.locator(`input[formcontrolname='${formControlName}'][aria-required='true']`);
        this.genericMatSelectByPlaceHolderAreaLabel = (placeholder) => this.page.locator(`mat-select[placeholder='${placeholder}'][aria-disabled='true']`);
        this.genericMatSpan = (text) => this.page.locator(`mat-option span:text-is('${text}')`);
        this.genericInputByPlaceHolderReadOnly = (placeholder) => this.page.locator(`input[placeholder='${placeholder}'][readonly='true']`);
        this.genericTextAreaByPlaceHolder = (placeholder) => this.page.locator(`textarea[placeholder='${placeholder}']`);
        this.genericInputByName = (name) => this.page.locator(`input[name='${name}']`);
        this.genericInputByFormControlName = (formControlName) => this.page.locator(`input[formcontrolname='${formControlName}']`);
        this.genericSelectByName = (name) => this.page.locator(`select[name='${name}']`);
        this.page = page;
    }
}
exports.GenericLocators = GenericLocators;
