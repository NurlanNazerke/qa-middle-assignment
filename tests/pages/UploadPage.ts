import { expect, type Page } from '@playwright/test';

export class UploadPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('/upload');
  }

  async uploadFile(filePath: string) {
    await this.page.locator('#file-upload').setInputFiles(filePath);
    await this.page.locator('#file-submit').click();
  }

  async submitWithoutFile() {
    await this.page.locator('#file-submit').click();
  }

  async expectUploadedFile(fileName: string) {
    await expect(this.page.locator('h3')).toHaveText('File Uploaded!');
    await expect(this.page.locator('#uploaded-files')).toContainText(fileName);
  }

  async expectUploadError() {
    await expect(this.page.locator('body')).not.toContainText('Internal Server Error');
  }
}