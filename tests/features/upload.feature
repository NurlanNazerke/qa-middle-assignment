Feature: File upload

  Scenario: Upload selected file
    Given the user is on the upload page
    When the user selects a valid file
    And clicks the Upload button
    Then the uploaded file name is displayed

  Scenario: Upload without selecting a file
    Given the user is on the upload page
    When the user clicks the Upload button without selecting a file
    Then a user-friendly error message should be displayed