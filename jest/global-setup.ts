import type { Config } from '@jest/types';
import { LoginPage } from '../pages/login-page';
import { createContext, disposeContext } from '../util/browser-context';

module.exports = async function globalSetup(globalConfig: Config.InitialOptions) {
  const context = await createContext();
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  await loginPage.login();
  await disposeContext(context);
};
