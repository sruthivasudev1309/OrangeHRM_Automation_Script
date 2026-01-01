import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async click(selector: string) {
    await this.page.locator(selector).click();
  }

  async fillByPlaceholder(placeholder: string, text: string) {
    await this.page.locator(`input[placeholder='${placeholder}'], textarea[placeholder='${placeholder}']`).fill(text);
  }
protected genericInputByPlaceHolder = (placeholder: string): Locator =>
    this.page.locator(`input[placeholder='${placeholder}']`);

  protected genericInputByName = (name: string): Locator =>
    this.page.locator(`input[name='${name}']`);

  async getText(selector: string): Promise<string> {
    return await this.page.locator(selector).innerText();
  }

  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForVisibility(selector: string, timeout = 15000) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  async clickButton(buttonText: string) {
    await this.page.locator(`button:has-text("${buttonText}")`).click();
  }

  async selectDropdownByText(label: string, optionText: string) {
    await this.page.locator(`mat-select[formcontrolname='${label}']`).click();
    await this.page.locator(`mat-option:has-text("${optionText}")`).click();
  }

  async clickCheckbox(label: string) {
    await this.page.locator(`label:has-text("${label}")`).click();
  }

  async verifyToastMessage(message: string, timeout = 15000) {
    const toast = this.page.locator(`//app-snackbar//*[contains(text(),'${message}')]`);
    await expect(toast).toBeVisible({ timeout });
  }

  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  async waitSeconds(seconds: number) {
    await this.page.waitForTimeout(seconds * 1000);
  }
    protected inputByPlaceholder(placeholder: string): Locator {
    return this.page.locator(`input[placeholder="${placeholder}"]`);
  }

  protected buttonByText(text: string): Locator {
    return this.page.locator('button', { hasText: text });
  }

  async waitForVisible(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }

}

