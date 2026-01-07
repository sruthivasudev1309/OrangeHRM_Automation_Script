import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';
import path from 'path';

export class PIMPage extends BasePage {
  pimMenu!: Locator;
  pimHeader!: Locator;
  employeeInfoHeader!: Locator;
  addEmployeeHeader!: Locator;
  addEmployeeButton!: Locator;
  saveButton!: Locator;

  firstNameInput!: Locator;
  middleNameInput!: Locator;
  lastNameInput!: Locator;
  employeeIdInput!: Locator;

  profileUploadInput!: Locator;
  successToast!: Locator;

  employeeIdSearchInput!: Locator;
  searchButton!: Locator;

  tableRows!: Locator;

  deletePopupHeading!: Locator;
  deletePopupMessage!: Locator;
  confirmDeleteButton!: Locator;
  noRecordsFoundText!: Locator;

  static createdEmpId: string;
  static createdEmpFullName: string;
  static updatedJobTitle: string;
  static updatedEmploymentStatus: string;

  constructor(page: Page) {
    super(page);
    this.pimMenu = page.locator("//span[text()='PIM']");
    this.pimHeader = page.locator("//h6[text()='PIM']");
    this.employeeInfoHeader = page.locator("//h5[text()='Employee Information']");
    this.addEmployeeHeader = page.locator("//h6[text()='Add Employee']");
    this.addEmployeeButton = page.getByRole('button', { name: 'Add' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.firstNameInput = page.locator("input[name='firstName']");
    this.middleNameInput = page.locator("input[name='middleName']");
    this.lastNameInput = page.locator("input[name='lastName']");
    this.employeeIdInput = page.locator("//label[normalize-space()='Employee Id']/ancestor::div[contains(@class,'oxd-input-group')]//input");
    this.profileUploadInput = page.locator("input[type='file']");
    this.successToast = page.locator("div.oxd-toast--success");
    this.employeeIdSearchInput = page.locator("//label[text()='Employee Id']/ancestor::div[contains(@class,'oxd-input-group')]//input");
    this.searchButton = page.getByRole('button', { name: ' Search ' });
    this.tableRows = page.locator('div.oxd-table-body > div.oxd-table-row');
    this.deletePopupHeading = page.locator('p.oxd-text--card-title');
    this.deletePopupMessage = page.locator('p.oxd-text--card-body');
    this.confirmDeleteButton = page.getByRole('button', { name: 'Yes, Delete' });
    this.noRecordsFoundText = page.locator('div.orangehrm-horizontal-padding span.oxd-text--span');
  } 

  private getCell(row: Locator, index: number): Locator {
    return row.locator(`div.oxd-table-cell:nth-child(${index}) div`);
  }

  private getEditButton(row: Locator): Locator {
    return row.locator('button:has(i.bi-pencil-fill)');
  }

  private getDeleteButton(row: Locator): Locator {
    return row.locator('button:has(i.bi-trash)');
  }

  async clickPIM(): Promise<void> {
    await this.pimMenu.click();
  }

  async verifyPIMPage(): Promise<void> {
    await expect(this.pimHeader).toBeVisible();
    await expect(this.employeeInfoHeader).toBeVisible();
  }

  async openAddEmployee(): Promise<void> {
    await this.addEmployeeButton.click();
    await expect(this.saveButton).toBeVisible();
  }

  async enterPersonalDetails(data: any): Promise<void> {
    const { firstName, middleName, lastName } = data.personalDetails;
    await this.firstNameInput.fill(firstName);
    await this.middleNameInput.fill(middleName);
    await this.lastNameInput.fill(lastName);
    PIMPage.createdEmpFullName = `${firstName} ${middleName} ${lastName}`.trim();
    const systemEmpId = (await this.employeeIdInput.inputValue())?.trim();
    if (!systemEmpId) {
      throw new Error('Employee ID was not auto-generated');
    }
    const nextEmpId = (parseInt(systemEmpId, 10) + 1).toString().padStart(systemEmpId.length, '0');
    await this.employeeIdInput.fill(nextEmpId);
    PIMPage.createdEmpId = nextEmpId;
  }

  async uploadProfilePicture(): Promise<void> {
    const imagePath = path.join(process.cwd(), 'src', 'assets', 'profile.jpg');
    await this.profileUploadInput.setInputFiles(imagePath);
  }

  async saveEmployee(): Promise<void> {
    await this.saveButton.click();
  }

  async verifyEmployeeCreated(): Promise<void> {
    await expect(this.successToast).toBeVisible();
  }

async searchEmployee(): Promise<void> {
  await this.employeeIdSearchInput.waitFor({ state: 'visible' });
  await this.employeeIdSearchInput.fill(PIMPage.createdEmpId);
  await this.searchButton.click();
}

  async clickSearch(): Promise<void> {
    await this.searchButton.click();
  }

  async verifyEmployeeDetailsInGrid(): Promise<void> {
    const row = this.getRowByEmployeeId(PIMPage.createdEmpId);
    expect(await this.getCell(row, 2).textContent()).toContain(PIMPage.createdEmpId);
    expect(await this.getCell(row, 3).textContent()).toContain(PIMPage.createdEmpFullName);
  }
  async openEmployeeForEdit(): Promise<void> {
    const row = this.getRowByEmployeeId(PIMPage.createdEmpId);
    await this.getEditButton(row).click();
  }

  async openJobTab(): Promise<void> {
    await this.page.locator('a.orangehrm-tabs-item[href*="viewJobDetails"]').click();
  }

  async updateJobDetails(jobTitle: string, employmentStatus: string): Promise<void> {
    await this.selectDropdownByLabel('Job Title', jobTitle);
    await this.selectDropdownByLabel('Employment Status', employmentStatus);

    PIMPage.updatedJobTitle = jobTitle;
    PIMPage.updatedEmploymentStatus = employmentStatus;
  }

  async saveJobDetails(): Promise<void> {
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async verifyUpdateSuccess(): Promise<void> {
    await expect(this.successToast).toBeVisible();
  }

  async verifyUpdatedJobDetailsInGrid(): Promise<void> {
    const row = this.getRowByEmployeeId(PIMPage.createdEmpId);

    expect(await this.getCell(row, 5).textContent()).toBe(PIMPage.updatedJobTitle);
    expect(await this.getCell(row, 6).textContent()).toBe(PIMPage.updatedEmploymentStatus);
  }

  private async selectDropdownByLabel(label: string, option: string): Promise<void> {
    const dropdown = this.page.locator(`//label[normalize-space()="${label}"]/ancestor::div[contains(@class,"oxd-input-group")]//div[contains(@class,"oxd-select-text-input")]`);
    await dropdown.click();
    await this.page.locator(`//div[@role="listbox"]//span[normalize-space()="${option}"]`).click();
  }

  async clickDeleteIconByEmployeeId(): Promise<void> {
    const row = this.getRowByEmployeeId(PIMPage.createdEmpId);
    await this.getDeleteButton(row).click();
  }

  async verifyDeletePopupHeading(expected: string): Promise<void> {
    await expect(this.deletePopupHeading).toHaveText(expected);
  }

  async verifyPermanentDeleteMessage(): Promise<void> {
    await expect(this.deletePopupMessage).toContainText('permanently deleted');
  }

  async confirmDeleteEmployee(): Promise<void> {
    await this.confirmDeleteButton.click();
  }

  async verifyDeleteSuccessToast(): Promise<void> {
    await expect(this.successToast).toBeVisible();
  }

  async verifyNoRecordsFoundInGrid(): Promise<void> {
    await expect(this.noRecordsFoundText).toHaveText('No Records Found');
  }

private getEmployeeRows(): Locator {
  return this.page.locator(
    'div.oxd-table-body div.oxd-table-row'
  );
}

private getRowByEmployeeId(empId: string): Locator {
  return this.page.locator(
    `div.oxd-table-body div.oxd-table-row:has(div:has-text("${empId}"))`
  );
}

async verifySingleResult(): Promise<void> {
  const rows = this.getRowByEmployeeId(PIMPage.createdEmpId);
  await rows.first().waitFor({
    state: 'visible',
    timeout: 15000,
  });
  const count = await rows.count();
  expect(count,`Expected exactly one employee row for ID ${PIMPage.createdEmpId}`).toBe(1);
}
}
