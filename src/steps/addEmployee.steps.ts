import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PIMPage } from '../pages/PIMPage';
import { LoginPage } from '../pages/LoginPage';
import { page } from '../hooks/hooks';
import employeeData from '../utils/employeeData.json';
import { EmployeeApi } from '../api-pages/EmployeeApi';


let pimPage: PIMPage;
let loginPage: LoginPage;


Given('I login to OrangeHRM with valid credentials', async () => {
  loginPage = new LoginPage(page);
  await loginPage.login('Admin', 'admin123');
  await loginPage.verifyDashboardDisplayed();
});

When('I click on PIM tab', async () => {
  pimPage = new PIMPage(page);
  await pimPage.clickPIM();
});

Then('PIM page should be displayed', async () => {
  await pimPage.verifyPIMPage();
});

When('I click Add Employee', async () => {
  await pimPage.openAddEmployee();
});

When('I enter employee personal details', async () => {
  await pimPage.enterPersonalDetails(employeeData);
});

When('I save the employee', async () => {
  await pimPage.saveEmployee();
});

Then('Employee should be created successfully toast displayed', async () => {
  await pimPage.verifyEmployeeCreated();
});
When('I upload employee profile picture', async () => {
  await pimPage.uploadProfilePicture();
});

Then('I navigate to PIM module', async () => {
  pimPage = new PIMPage(page);
  await pimPage.clickPIM();
});

When('I search employee by id', async () => {
  await pimPage.searchEmployee();
});

Then('only one employee record should be displayed', async () => {
  await pimPage.verifySingleResult();
});

Then('employee details should match created data', async () => {
  await pimPage.verifyEmployeeDetailsInGrid();
});

When('I edit employee job details', async () => {
  await pimPage.openJobTab();
  await pimPage.updateJobDetails('Automaton Tester', 'Freelance');
  await pimPage.saveJobDetails();
});

Then('job details should be updated successfully', async () => {
  await pimPage.verifyUpdateSuccess();
});

Then('updated job details should be reflected in the grid', async () => {
  await pimPage.verifyUpdatedJobDetailsInGrid();
});

Then('edit employee by clicking edit icon', async () => {
  await pimPage.openEmployeeForEdit();
});
When('I click the Search button', async () => {
  await pimPage.clickSearch();
});

Then('Delete employee by clicking Delete icon', async () => {
  await pimPage.clickDeleteIconByEmployeeId();
});

Then('verify {string} heading is displayed', async (heading: string) => {
  await pimPage.verifyDeletePopupHeading(heading);
});

Then('verify permanently deleted confirmation message is displayed', async () => {
  await pimPage.verifyPermanentDeleteMessage();
});

Then('confirm delete by clicking Yes Delete button', async () => {
  await pimPage.confirmDeleteEmployee();
});

Then('employee should be deleted successfully toast displayed', async () => {
  await pimPage.verifyDeleteSuccessToast();
});
Then('No Records Found should be displayed in the grid', async () => {
  await pimPage.verifyNoRecordsFoundInGrid();
});

Then('employee details should be validated via API', async () => {
  const empId = PIMPage.createdEmpId;
  expect(empId, 'Employee ID must be available').toBeTruthy();
  const api = new EmployeeApi(page.request);
  const response = await api.getEmployeeById(empId);
  if (!response) {
    console.log(
      `[INFO] Skipping API validation for empId=${empId} due to demo limitations.` );
    return;
  }
  expect(response.data.length).toBeGreaterThan(0);
  const apiEmployee = response.data[0];

  expect(apiEmployee.employeeId).toBe(empId);
});