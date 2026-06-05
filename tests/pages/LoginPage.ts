import { expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    await this.page.locator('#username').fill(username);
    await this.page.locator('#password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async expectSuccess() {
    await expect(this.page.locator('#flash')).toContainText('You logged into a secure area!');
    await expect(this.page).toHaveURL(/secure/);
  }

  async expectError(message: string) {
    await expect(this.page.locator('#flash')).toContainText(message);
  }

  async logout() {
    await this.page.getByRole('link', { name: 'Logout' }).click();
  }
}