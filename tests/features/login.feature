Feature: Login

  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When the user enters valid username and password
    And clicks the Login button
    Then the secure area page is opened
    And the success message is displayed

  Scenario: Login with an unknown username
    Given the user is on the login page
    When the user enters an unknown username
    And clicks the Login button
    Then the error message "Your username is invalid!" is displayed