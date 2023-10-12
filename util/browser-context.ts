import { BrowserContext, chromium } from 'playwright-chromium';
import { TCS_E2E_HEADLESS, TCS_E2E_URL } from './environment-variables';
import { readTmpFileSync } from './temp-files';

export async function disposeContext(context: BrowserContext) {
  await context.browser()?.close();
}

export async function createContext(): Promise<BrowserContext> {
  const browser = await chromium.launch({ headless: TCS_E2E_HEADLESS, devtools: TCS_E2E_HEADLESS });
  const context = await browser.newContext({});
  const cookiesJson = readTmpFileSync('cookies.json');
  if (cookiesJson != null) {
    const deserializedCookies = JSON.parse(cookiesJson);
    await context.addCookies(deserializedCookies);
  }

  // Set local storage in a new context
  const localStorageJson = readTmpFileSync('localstorage.json');
  if (localStorageJson != null) {
    await context.addInitScript((storage: string) => {
      if (TCS_E2E_URL.endsWith(window.location.hostname)) {
        const entries = JSON.parse(storage);
        Object.keys(entries).forEach((key) => {
          window.localStorage.setItem(key, entries[key]);
        });
      }
    }, localStorageJson);
  }

  const sessionStorageJson = readTmpFileSync('sessionstorage.json');
  if (sessionStorageJson != null) {
    await context.addInitScript((storage: string) => {
      if (TCS_E2E_URL.endsWith(window.location.hostname)) {
        const entries = JSON.parse(storage);
        Object.keys(entries).forEach((key) => {
          window.sessionStorage.setItem(key, entries[key]);
        });
      }
    }, sessionStorageJson);
  }
  return context;
}
