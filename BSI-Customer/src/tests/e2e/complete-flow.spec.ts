import { test } from '../../fixtures/base.fixture';
import { expect } from '@playwright/test';

test.describe('Complete E2E Flow (FAIT)', () => {
  const userName = process.env[`USER_NAME_${process.env.TEST_ENV}`] || process.env.USER_NAME_FAIT || '';
  const password = process.env[`PASSWORD_${process.env.TEST_ENV}`] || process.env.PASSWORD_FAIT || '';

  test('Login -> Home -> Search flow', async ({ loginPage, homePage, searchPage, page }) => {
    await loginPage.navigateTo('');
    //await loginPage.login(userName, password);
    await loginPage.login();
    await expect(page).toHaveURL(/\/bsicrm\/?/);

    await homePage.verifyWelcomeMessage();

    await searchPage.searchClick();
    await searchPage.verifySearchResults();
    await searchPage.verifySearchOptions(['Alle Kunden', 'Personen', 'Organisationen', 'Verträge', 'Versicherungsfälle', 'Geschäftsvorfälle', 'Feedback']);
  });
});
