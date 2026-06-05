import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import users from './fixtures/users.json';

test.describe('Login page', () => {
  test('successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await loginPage.expectSuccess();
  });

  for (const invalidUser of users.invalidUsers) {
    test(`unsuccessful login with ${invalidUser.caseName}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.open();
      await loginPage.login(invalidUser.username, invalidUser.password);
      await loginPage.expectError(invalidUser.expectedMessage);
    });
  }
});