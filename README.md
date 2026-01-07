# OrangeHRM Automation Framework

## Tech Stack
- Playwright + TypeScript
- Cucumber (BDD)
- Page Object Model
- Allure Reporting
- API + UI Validation

## Project Structure
src/
├─ api-pages/ # API clients
├─ assets/ # Files for upload
├─ config/ # Environment configs
├─ core/ # BasePage, helpers
├─ page-objects/ # Generic locators
├─ pages/ # Application pages
├─ steps/ # Step definitions
├─ utils/ # Test data (JSON)

## Key Design Decisions
- No locators in step definitions
- All form values driven via JSON
- Generic reusable locators
- One Save/Add/File locator reused across tabs
- API validation implemented with graceful fallback

## Running Tests
Run by Tags
npm test -- --tags "@smoke"
npm test -- --tags "@pim"


## Reporting
- Allure results generated after execution
- Run `allure serve` to view report
