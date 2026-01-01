import { BasePage } from '../core/BasePage';
import { Locator, expect } from '@playwright/test';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logo: Locator;
  readonly requiredError: Locator;
  readonly invalidCredentialError: Locator;
  readonly dashboardHeading: Locator;
  readonly userDropdown: Locator;
  readonly logoutButton: Locator;

  constructor(page: any) {
    super(page);

    this.usernameInput = this.inputByPlaceholder('Username');
    this.passwordInput = this.inputByPlaceholder('Password');
    this.loginButton = page.locator('button[type="submit"]');
    this.logo = page.locator('div.orangehrm-login-branding img[alt="company-branding"]');
    this.requiredError = page.locator('span.oxd-input-field-error-message:text-is("Required")');
    this.invalidCredentialError = page.locator('p.oxd-alert-content-text:text-is("Invalid credentials")');
    this.dashboardHeading = page.locator('h6.oxd-topbar-header-breadcrumb-module:text-is("Dashboard")');
    this.userDropdown = page.locator('span.oxd-userdropdown-tab');
    this.logoutButton = page.locator('a.oxd-userdropdown-link:text-is("Logout")');
  }

  async verifyLoginPageUI(): Promise<void> {
    await expect(this.logo).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.usernameInput).toBeEnabled();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.passwordInput).toBeEnabled();
    await expect(this.loginButton).toBeEnabled();
    await expect(this.usernameInput).toHaveAttribute('placeholder', 'Username');
    await expect(this.passwordInput).toHaveAttribute('placeholder', 'Password');
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
  }
  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async isRequiredErrorDisplayed(): Promise<boolean> {
    return this.requiredError.isVisible();
  }

  async getRequiredErrorText(): Promise<string> {
    return (await this.requiredError.textContent()) ?? '';
  }

  async getInvalidCredentialError(): Promise<string> {
    return (await this.invalidCredentialError.textContent()) ?? '';
  }

  async verifyDashboardDisplayed(): Promise<void> {
    await expect(this.dashboardHeading).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.userDropdown.click();
    await this.logoutButton.click();
  }

 async verifyLoggedOut(): Promise<void> {
  await this.logo.waitFor({ state: 'visible', timeout: 10000 });
  await expect(this.logo).toBeVisible();
}

  async isUsernameRequiredErrorDisplayed(): Promise<boolean> {
  return await this.page.locator('(//input[@name="username"]/ancestor::div[contains(@class,"oxd-input-group")]//span[text()="Required"])[1]' ).isVisible();
}
async isPasswordRequiredErrorDisplayed(): Promise<boolean> {
  return await this.page.locator('(//input[@name="password"]/ancestor::div[contains(@class,"oxd-input-group")]//span[text()="Required"])[1]').isVisible();
}

async getRequiredErrorCount(): Promise<number> {
  return await this.page.locator('span.oxd-input-field-error-message:text-is("Required")').count();
}

async isLogoVisible(): Promise<boolean> {
  await this.logo.waitFor({ state: 'visible', timeout: 10000 });
  return await this.logo.isVisible();
}


async isUsernameFieldVisible(): Promise<boolean> {
  return this.page.locator('input[name="username"]').isVisible();
}

async isUsernameFieldEnabled(): Promise<boolean> {
  return this.page.locator('input[name="username"]').isEnabled();
}

async isPasswordFieldVisible(): Promise<boolean> {
  return this.page.locator('input[name="password"]').isVisible();
}

async isPasswordFieldEnabled(): Promise<boolean> {
  return this.page.locator('input[name="password"]').isEnabled();
}

async isLoginButtonEnabled(): Promise<boolean> {
  return this.page.locator('button[type="submit"]').isEnabled();
}

async getUsernamePlaceholder(): Promise<string> {
  return (await this.page.locator('input[name="username"]').getAttribute('placeholder')) ?? '';
}

async getPasswordPlaceholder(): Promise<string> {
  return (await this.page.locator('input[name="password"]').getAttribute('placeholder')) ?? '';
}

async isPasswordMasked(): Promise<boolean> {
  const type = await this.page.locator('input[name="password"]').getAttribute('type');
  return type === 'password';
}
}

