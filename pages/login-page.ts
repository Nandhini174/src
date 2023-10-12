import { Page } from 'playwright-chromium';
import {
  TCS_E2E_PASSWORD,
  TCS_E2E_SECURITY_ANSWER,
  TCS_E2E_USERNAME,
} from '../util/environment-variables';
import { writeTmpFileSync } from '../util/temp-files';
import { tcsUrl } from '../util/url';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(tcsUrl('/login'));
  }

  async logout() {
    await this.page.goto(tcsUrl('/login'));
    await this.page.waitForSelector('#okta-signin-username');
  }

  async login() {
    await this.goto();
   // await this.page.fill('#okta-signin-username', TCS_E2E_USERNAME);
    //await this.page.fill('#okta-signin-password', TCS_E2E_PASSWORD);
    //await this.page.click('#okta-signin-submit');
    //await this.page.fill('input[name="answer"]', TCS_E2E_SECURITY_ANSWER);
    //await this.page.click('input[type="submit"]');
    await this.page.waitForSelector('#e2e-DEV-ops');
    await persistTempFiles(this.page);
  }
}

async function persistTempFiles(page: Page) {
  // Get cookies and store as an env variable
  try {
    const cookies = await page.context().cookies();
    const cookiesJson = JSON.stringify(cookies, null, 2);
    writeTmpFileSync('cookies.json', cookiesJson);
  } catch (err) {
    throw new Error(`Error setting COOKIES environment variable: ${err}`);
  }

  try {
    const localStorageJson = await page.evaluate(() =>
      JSON.stringify(window.localStorage, null, 2),
    );
    writeTmpFileSync('localstorage.json', localStorageJson);
  } catch (err) {
    throw new Error(`Error setting LOCAL_STORAGE environment variable: ${err}`);
  }

  try {
    const sessionStorage = await page.evaluate(() =>
      JSON.stringify(window.sessionStorage, null, 2),
    );
    writeTmpFileSync('sessionstorage.json', sessionStorage);
  } catch (err) {
    throw new Error(`Error setting SESSION_STORAGE environment variable: ${err}`);
  }
}
