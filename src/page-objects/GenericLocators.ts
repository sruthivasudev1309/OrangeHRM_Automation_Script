import { Page, Locator } from '@playwright/test';

export class GenericLocators {
  readonly page: Page;
  constructor(page: Page) { this.page = page; }

  genericInputByPlaceHolder = (placeholder: string): Locator => this.page.locator(`input[placeholder='${placeholder}']`);
  genericMatSelectPlaceHolder = (placeholder: string): Locator => this.page.locator(`mat-select[placeholder='${placeholder}']`);
  genericInputByType = (type: string): Locator => this.page.locator(`input[type='${type}']`);
  genericInputByPlaceHolderAreaLabel = (placeholder: string): Locator => this.page.locator(`input[placeholder='${placeholder}'][aria-required='true']`);
  genericFormControlByAreaLabel = (formControlName: string): Locator => this.page.locator(`input[formcontrolname='${formControlName}'][aria-required='true']`);
  genericMatSelectByPlaceHolderAreaLabel = (placeholder: string): Locator => this.page.locator(`mat-select[placeholder='${placeholder}'][aria-disabled='true']`);
  genericMatSpan = (text: string): Locator => this.page.locator(`mat-option span:text-is('${text}')`);
  genericInputByPlaceHolderReadOnly = (placeholder: string): Locator => this.page.locator(`input[placeholder='${placeholder}'][readonly='true']`);
  genericTextAreaByPlaceHolder = (placeholder: string): Locator => this.page.locator(`textarea[placeholder='${placeholder}']`);
  genericInputByName = (name: string): Locator => this.page.locator(`input[name='${name}']`);
  genericInputByFormControlName = (formControlName: string): Locator => this.page.locator(`input[formcontrolname='${formControlName}']`);
  genericSelectByName = (name: string): Locator => this.page.locator(`select[name='${name}']`);
}
