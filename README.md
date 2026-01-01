# OrangeHRM Automation Framework

## Project Overview

This project is an **enterprise-grade Playwright + Cucumber + TypeScript automation framework** built to validate the **end-to-end Employee lifecycle** in the OrangeHRM application.

**Application Under Test:**  
https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

---

## Tech Stack

- **Language:** TypeScript
- **UI Automation:** Playwright
- **BDD Framework:** Cucumber.js (Gherkin)
- **Assertions:** Playwright Test Expect
- **API Validation:** Playwright APIRequestContext
- **Reporting:**
  - Cucumber JSON Report
  - Playwright built-in report

---

## Automation Scope

### UI Automation
- Login with valid credentials
- Navigate to PIM module
- Create a new employee
- Upload employee profile picture
- Search employee by Employee ID
- Verify single record displayed in grid
- Edit employee job details
- Validate updated job details in grid
- Delete employee with confirmation popup
- Verify successful deletion toast
- Verify **No Records Found** after deletion

### Api Validation
- Fetch employee details via OrangeHRM internal API
- Validate Employee ID existence
- Cross-check API response with UI-created data

> **Note:** API validation uses authenticated session context, reflecting real-world enterprise testing constraints.

---

## Project Structure
OrangeHRM_Automation
│
├── .vscode
│ └── launch.json # VS Code run/debug configurations
│
├── reports
│ ├── cucumber-report.json # Generated execution report
│ └── screenshots # Failure screenshots
│
├── src
│ ├── api-pages
│ │ └── EmployeeApi.ts # API layer for employee validation
│ │
│ ├── assets
│ │ └── profile.jpg # Test profile image
│ │
│ ├── config
│ │ ├── credentials.ts # Login credentials
│ │ ├── endpoints.ts # API endpoints
│ │ └── env.config.ts # Environment URLs
│ │
│ ├── core
│ │ └── BasePage.ts # Reusable Playwright helpers
│ │
│ ├── features
│ │ ├── 001_login.feature
│ │ └── 002_addEmployee.feature
│ │
│ ├── hooks
│ │ └── hooks.ts # Global hooks (browser, screenshots)
│ │
│ ├── pages
│ │ ├── LoginPage.ts
│ │ └── PIMPage.ts
│ │
│ ├── steps
│ │ ├── login.steps.ts
│ │ └── addEmployee.steps.ts
│ │
│ └── utils
│ └── employeeData.json # Test data
│
├── cucumber.js # Cucumber CLI configuration
├── package.json # Dependencies & scripts
├── tsconfig.json # TypeScript configuration
└── README.md # Project documentation
## Prerequisites

Ensure the following are installed on your system:

- **Node.js:** v18.20.8
- **npm:** 10.8.2

Verify installation:
```bash
node -v
npm -v
java -version

## Installation
###Clone the repository and install dependencies:
git clone <repository-url>
cd OrangeHRM_Automation
npm install
npx playwright install

## Run via VS Code 
Open Run & Debug
Select one of the following:
Run All Cucumber Tests
Run Cucumber @smoke
Run Cucumber @regression
Click Run
Tag-Based Execution
cucumber-js --tags @smoke
cucumber-js --tags @regression

## Reports
reports/cucumber-report.json

##Screenshots
reports/Screenshots

##Video Record Eexcution
reports/videos