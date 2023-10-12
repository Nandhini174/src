import { BrowserContext, Page } from 'playwright-chromium';
import { AuthenticatedLandingPage } from '../pages/authenticated-landing-page';
import { createContext, disposeContext } from '../util/browser-context';

let context: BrowserContext;
let page: Page;
let landingPage: AuthenticatedLandingPage;

beforeAll(async () => {
  context = await createContext();
  page = await context.newPage();
  landingPage = new AuthenticatedLandingPage(page);
});

afterAll(async () => {
  await disposeContext(context);
});

describe('Landing Page', () => {
  test('navigating to the landing page', async () => {
    await landingPage.goto();
  });

  test('clicking the link for OPs', async () => {
    await landingPage.clickOps('DEV');
  });
});
