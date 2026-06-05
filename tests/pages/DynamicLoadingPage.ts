import { expect, type Page } from '@playwright/test';

export class DynamicLoadingPage {
  constructor(private page: Page) {}

  async openExample1() {
    await this.page.goto('/dynamic_loading/1');
  }

  async startLoading() {
    await this.page.getByRole('button', { name: 'Start' }).click();
  }

  async expectLoadingResult() {
    await expect(this.page.locator('#loading')).toBeVisible({ timeout: 5000 });
    await expect(this.page.locator('#loading')).toBeHidden({ timeout: 15000 });
    await expect(this.page.locator('#finish')).toContainText('Hello World!');
  }
}