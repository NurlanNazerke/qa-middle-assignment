# Task 2: UI Test Cases

Tested website: https://the-internet.herokuapp.com

Selected pages:

- Form Authentication: `/login`
- File Upload: `/upload`
- Dynamic Loading: `/dynamic_loading/1`

## Test Design Technique

The test cases use Equivalence Partitioning and Boundary Value Analysis.

Equivalence Partitioning is used for login scenarios: valid credentials, invalid username, invalid password, and empty fields are treated as separate input classes. Boundary Value Analysis is used for file upload and dynamic loading checks: no selected file, long file name, first loading attempt, and repeated loading after refresh. These techniques help cover positive, negative, and edge scenarios without testing every possible input combination.

## Test Cases

| Test ID | Page | Title | Priority | Preconditions | Steps | Expected result | Actual result | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-LOGIN-001 | /login | Successful login with valid credentials | High | Login page is opened | 1. Enter username `tomsmith`<br>2. Enter password `SuperSecretPassword!`<br>3. Click Login | Secure Area page is opened; success message is displayed | Secure Area page is opened; success message is displayed; Logout button is visible | Pass |
| TC-LOGIN-002 | /login | Login with nonexistent username | High | Login page is opened; user is not authenticated | 1. Enter username `wrong-user`<br>2. Enter password `SuperSecretPassword!`<br>3. Click Login | Login is rejected; `Your username is invalid!` message is displayed | Login is rejected; `Your username is invalid!` message is displayed | Pass |
| TC-LOGIN-003 | /login | Login with invalid password | High | Login page is opened; user is not authenticated | 1. Enter username `tomsmith`<br>2. Enter password `wrong-password`<br>3. Click Login | Login is rejected; `Your password is invalid!` message is displayed | Login is rejected; `Your password is invalid!` message is displayed | Pass |
| TC-LOGIN-004 | /login | Login with empty fields | High | Login page is opened; user is not authenticated | 1. Leave Username empty<br>2. Leave Password empty<br>3. Click Login | Login is rejected; validation/error message is displayed | Login is rejected; `Your username is invalid!` message is displayed | Pass |
| TC-LOGIN-005 | /login | Logout after successful login | High | User is logged in and is on Secure Area page | 1. Click Logout | Login page is opened; `You logged out of the secure area!` message is displayed | Login page is opened; `You logged out of the secure area!` message is displayed | Pass |
| TC-UPLOAD-001 | /upload | Upload valid text file | High | Upload page is opened; valid file is available on local machine | 1. Click Choose File<br>2. Select text file<br>3. Click Upload | File is uploaded; `File Uploaded!` message and uploaded file name are displayed | `File Uploaded!` message and uploaded file name are displayed | Pass |
| TC-UPLOAD-002 | /upload | Submit upload form without selected file | Medium | Upload page is opened; no file is selected | 1. Do not choose a file<br>2. Click Upload | Upload is rejected; user-friendly validation message is displayed | Page displays `Internal Server Error` | Fail |
| TC-UPLOAD-003 | /upload | Upload file with long file name | Low | Upload page is opened; file with long name is available | 1. Click Choose File<br>2. Select file with long name<br>3. Click Upload | File is uploaded; long file name is displayed without breaking the layout | File is uploaded; long file name is displayed on result page | Pass |
| TC-DYN-001 | /dynamic_loading/1 | Hidden element appears after loading | High | Dynamic Loading Example 1 page is opened | 1. Click Start<br>2. Wait until loading finishes | Loading indicator disappears; `Hello World!` message is displayed | Loading indicator disappears; `Hello World!` message is displayed | Pass |
| TC-DYN-002 | /dynamic_loading/1 | Repeat dynamic loading after result appears | Medium | `Hello World!` is already displayed on Dynamic Loading Example 1 page | 1. Refresh page<br>2. Click Start again<br>3. Wait until loading finishes | `Hello World!` is displayed again; page state remains correct | After refresh and repeated start, `Hello World!` is displayed again | Pass |

## Found Defects

### BUG-UI-001: Upload without selected file returns Internal Server Error

Page: `/upload`

Severity: Medium

Steps to reproduce:

1. Open the `/upload` page.
2. Do not select a file.
3. Click Upload.

Expected result:

A user-friendly validation message is displayed, for example: `Please select a file.`

Actual result:

The page displays `Internal Server Error`.
