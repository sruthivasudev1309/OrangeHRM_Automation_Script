import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { page } from '../hooks/hooks';

let loginPage: LoginPage;

Given('I open the OrangeHRM login page', async () => {
  loginPage = new LoginPage(page);
  await loginPage.navigate(
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
  );
});

Then('Login page UI should be correct', async () => {
  await loginPage.verifyLoginPageUI();
});

When('I enter username {string}', async (username: string) => {
  await loginPage.enterUsername(username);
});

When('I enter password {string}', async (password: string) => {
  await loginPage.enterPassword(password);
});

When('I click login button', async () => {
  await loginPage.clickLogin();
});

Then('Required error should be displayed for both fields', async () => {
  expect(await loginPage.getRequiredErrorCount()).toBe(2);
  expect(await loginPage.isUsernameRequiredErrorDisplayed()).toBeTruthy();
  expect(await loginPage.isPasswordRequiredErrorDisplayed()).toBeTruthy();
});

Then('Required error should be displayed only for username', async () => {
  expect(await loginPage.getRequiredErrorCount()).toBe(1);
  expect(await loginPage.isUsernameRequiredErrorDisplayed()).toBeTruthy();
});

Then('Required error should be displayed only for password', async () => {
  expect(await loginPage.getRequiredErrorCount()).toBe(1);
  expect(await loginPage.isPasswordRequiredErrorDisplayed()).toBeTruthy();
});

Then('Invalid credentials error should be displayed', async () => {
  expect(await loginPage.getInvalidCredentialError()).toBe('Invalid credentials');
});

Then('Dashboard page should be displayed', async () => {
  await loginPage.verifyDashboardDisplayed();
});

When('I logout from the application', async () => {
  await loginPage.logout();
});

Then('Login page should be displayed again', async () => {
  await loginPage.verifyLoggedOut();
});

Then('OrangeHRM logo should be visible', async () => {
  expect(await loginPage.isLogoVisible()).toBeTruthy();
});

Then('Username field should be visible and enabled', async () => {
  expect(await loginPage.isUsernameFieldVisible()).toBeTruthy();
  expect(await loginPage.isUsernameFieldEnabled()).toBeTruthy();
});

Then('Password field should be visible and enabled', async () => {
  expect(await loginPage.isPasswordFieldVisible()).toBeTruthy();
  expect(await loginPage.isPasswordFieldEnabled()).toBeTruthy();
});

Then('Login button should be enabled', async () => {
  expect(await loginPage.isLoginButtonEnabled()).toBeTruthy();
});

Then('Username placeholder should be {string}', async (text: string) => {
  expect(await loginPage.getUsernamePlaceholder()).toBe(text);
});

Then('Password placeholder should be {string}', async (text: string) => {
  expect(await loginPage.getPasswordPlaceholder()).toBe(text);
});

Then('Password field should be masked', async () => {
  expect(await loginPage.isPasswordMasked()).toBeTruthy();
});
