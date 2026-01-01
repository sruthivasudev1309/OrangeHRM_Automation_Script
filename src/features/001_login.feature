@smoke
Feature: OrangeHRM Login

  Scenario: Login page UI validation
    Given I open the OrangeHRM login page
    Then OrangeHRM logo should be visible
    And Username field should be visible and enabled
    And Password field should be visible and enabled
    And Login button should be enabled
    And Username placeholder should be "Username"
    And Password placeholder should be "Password"
    And Password field should be masked

 Scenario: Required validation when both fields are empty
  Given I open the OrangeHRM login page
  When I click login button
  Then Required error should be displayed for both fields

Scenario: Required validation when username is empty
  Given I open the OrangeHRM login page
  When I enter password "admin123"
  And I click login button
  Then Required error should be displayed only for username

Scenario: Required validation when password is empty
  Given I open the OrangeHRM login page
  When I enter username "Admin"
  And I click login button
  Then Required error should be displayed only for password

 Scenario: Invalid credentials validation
    Given I open the OrangeHRM login page
    When I enter username "Admin"
    And I enter password "wrongPassword"
    And I click login button
    Then Invalid credentials error should be displayed
    
Scenario: Login with valid credentials and logout
  Given I open the OrangeHRM login page
  When I enter username "Admin"
  And I enter password "admin123"
  And I click login button
  Then Dashboard page should be displayed
  When I logout from the application
  Then Login page should be displayed again
