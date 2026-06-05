import { test } from '@playwright/test';
import { DynamicLoadingPage } from '../pages/DynamicLoadingPage';

test.describe('Dynamic loading page', () => {
  test('shows hidden element after loading finishes', async ({ page }) => {
    const dynamicLoadingPage = new DynamicLoadingPage(page);

    await dynamicLoadingPage.openExample1();
    await dynamicLoadingPage.startLoading();
    await dynamicLoadingPage.expectLoadingResult();
  });

  test('can start loading again after page reload', async ({ page }) => {
    const dynamicLoadingPage = new DynamicLoadingPage(page);

    await dynamicLoadingPage.openExample1();
    await dynamicLoadingPage.startLoading();
    await dynamicLoadingPage.expectLoadingResult();

    await page.reload();

    await dynamicLoadingPage.startLoading();
    await dynamicLoadingPage.expectLoadingResult();
  });
});