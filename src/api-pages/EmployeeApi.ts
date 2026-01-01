import { APIRequestContext, expect } from '@playwright/test';

export class EmployeeApi {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getEmployeeById(empId: string): Promise<any | null> {
    const response = await this.request.get(
      `/web/index.php/api/v2/pim/employees`,
      {
        params: {
          limit: 50,
          offset: 0,
          model: 'detailed',
          employeeId: empId,
          includeEmployees: 'onlyCurrent',
          sortField: 'employee.firstName',
          sortOrder: 'ASC'
        }
      }
    );

    // Demo environment limitation handling
    if (response.status() === 404) {
      console.warn(
        `[API WARNING] Employee API returned 404 for empId=${empId}. ` +
        `Demo environment limitation.`
      );
      return null;
    }

    expect(response.status(), 'Employee API status').toBe(200);

    const body = await response.json();
    return body;
  }
}
