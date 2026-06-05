import path from 'path';
import { test } from '@playwright/test';
import { UploadPage } from '../pages/UploadPage';

test.describe('File upload page', () => {
  test('uploads a selected file', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    const filePath = path.join(__dirname, '..', 'fixtures', 'upload-sample.txt');

    await uploadPage.open();
    await uploadPage.uploadFile(filePath);
    await uploadPage.expectUploadedFile('upload-sample.txt');
  });

  test('shows a user-friendly error when file is not selected', async ({ page }) => {
    const uploadPage = new UploadPage(page);

    await uploadPage.open();
    await uploadPage.submitWithoutFile();
    await uploadPage.expectUploadError();
  });
});