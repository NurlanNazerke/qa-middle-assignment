# QA Middle Assignment

## Overview

This project contains E2E automated tests for The Internet test application.

Tested website:
https://the-internet.herokuapp.com

## Tools

- Playwright
- TypeScript
- Node.js
- Gherkin-style feature files

## Covered areas

- Login page
- File upload page
- Dynamic loading page

## Project Structure

- `postman/` — Postman collection and environment for Task 1
- `test-cases/` — manual UI test cases for Task 2
- `tests/` — Playwright E2E autotests for Task 3
- `sql/` — SQL queries for Task 4
- `nosql/` — MongoDB written answer for Task 4
- `diagrams/` — booking process diagrams for Task 5

## How to run Postman collection with Newman

```bash
newman run postman/collection.json -e postman/environment.json
```
  
## Task 4: SQL and NoSQL

SQL queries are located in `sql/queries.sql`.

MongoDB written answer is located in `nosql/mongodb-answer.md`.

SQL dialect: PostgreSQL.

## Task 5: Documentation and Diagrams

Booking process documentation and diagrams are located in `diagrams/booking-process.md`.

BPMN source file is located in `diagrams/booking-bpmn.drawio`.

The diagrams include:
- BPMN-style booking creation process with happy path and two exception flows
- Sequence Diagram for User, Frontend, API, Database, and Email Service interaction
- Booking State Transition diagram with required test coverage notes

## How to install dependencies

npm install

## How to run tests

npx playwright test

## How to open test report

npx playwright show-report

## Test run result

Latest run:

- 18 passed
- 3 failed

The 3 failed tests are related to the same found defect on the file upload page. The test fails in Chromium, Firefox, and WebKit.

## Found defect

### BUG-UI-001: Upload without selected file returns Internal Server Error

Page: /upload

Steps to reproduce:

1. Open the upload page.
2. Do not select a file.
3. Click the Upload button.

Expected result:

A user-friendly validation message is displayed, for example:
Please select a file.

Actual result:

The page displays:
Internal Server Error

Severity: Medium
