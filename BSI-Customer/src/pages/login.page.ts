// src/pages/login.page.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
 
  constructor(page: Page) {
    super(page);
    // this.usernameInput = page.locator('//input[@placeholder="Benutzer"]');
    // this.passwordInput = page.locator('//input[@placeholder="Passwort"]');
    // this.loginButton = page.locator('//button[text()="Anmelden"]');
    this.usernameInput = page.getByRole('textbox', { name: 'Benutzer' });
    this.passwordInput = page.getByRole('textbox', { name: 'Passwort' });
    this.loginButton = page.getByRole('button', { name: 'Anmelden' });
  }
  async login() {
    const userName = process.env[`USER_NAME_${process.env.TEST_ENV}`] || process.env.USER_NAME_FAIT || '';
    const password = process.env[`PASSWORD_${process.env.TEST_ENV}`] || process.env.PASSWORD_FAIT || ''; 
    await this.type(this.usernameInput, userName);
    await this.type(this.passwordInput, password);
    await this.click(this.loginButton);
  }
  async invalidLogin() {
    const userName = 'invalid.user@example.com';
    const password = 'WrongPassword123!'; 
    await this.type(this.usernameInput, userName);
    await this.type(this.passwordInput, password);
    await this.click(this.loginButton);
  }
}