import { APIRequestContext, expect } from '@playwright/test';
import { ENV } from '../config/env.config';

export class EmployeeApi {
  constructor(private request: APIRequestContext) {}

  async getEmployeeById(empId: string): Promise<any | null> {
    const response = await this.request.get(
      `${ENV.API_BASE_URL}/web/index.php/api/v2/pim/employees`,
      {
        params: {
          limit: 50,
          offset: 0,
          model: 'detailed',
          employeeId: empId,
          includeEmployees: 'onlyCurrent'
        }
      }
    );

    if ([401, 403].includes(response.status())) {
      console.warn(
        `[API WARNING] API access restricted for empId=${empId}. Skipping validation.`
      );
      return null;
    }

    expect(response.status(), 'Employee API status').toBe(200);
    return await response.json();
  }
}

