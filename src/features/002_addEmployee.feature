@pim @smoke
Feature: Add New Employee
  Scenario: Create employee with basic details only
    Given I login to OrangeHRM with valid credentials

    #Create New Employee
    When I click on PIM tab
    Then PIM page should be displayed
    When I click Add Employee
    And I enter employee personal details
    And I upload employee profile picture
    And I save the employee
    Then Employee should be created successfully toast displayed
    Then I navigate to PIM module
    When I search employee by id
    When I click the Search button
    Then only one employee record should be displayed

    #Edit
    Then edit employee by clicking edit icon
    And I edit employee job details
    Then job details should be updated successfully
    When I click on PIM tab
    When I search employee by id
    When I click the Search button
    And updated job details should be reflected in the grid
   
    #Delete the Employee
    When I click on PIM tab
    When I search employee by id
    When I click the Search button
    Then Delete employee by clicking Delete icon
    Then verify "Are you Sure?" heading is displayed
    Then verify permanently deleted confirmation message is displayed
    Then confirm delete by clicking Yes Delete button
    Then employee should be deleted successfully toast displayed
    When I search employee by id
    When I click the Search button
    Then No Records Found should be displayed in the grid

   #Logout
   When I logout from the application
   Then Login page should be displayed again

    #Validate Employee Via Api
    Then employee details should be validated via API