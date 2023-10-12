import { BrowserContext, Page } from 'playwright-chromium';
import { AuthenticatedLandingPage } from '../../../pages/authenticated-landing-page';
import { createContext, disposeContext } from '../../../util/browser-context';
import { OrgPage } from '../../../pages/org-page';

let context: BrowserContext;
let page: Page;
let landingPage: AuthenticatedLandingPage;
let orgPage: OrgPage;

beforeAll(async () => {
  context = await createContext();
  page = await context.newPage();
  landingPage = new AuthenticatedLandingPage(page);
  orgPage = new OrgPage(page);
});

afterAll(async () => {
  await disposeContext(context);
});

describe('Landing Page', () => {
  test('navigating to the landing page', async () => {
    await landingPage.goto();
  });

  test('clicking the link for Org', async () => {
    await landingPage.clickOrg('DEV');
  });
});

describe('Delete Vehicle', () => {
  test('delete a vehicle', async () => {
    await orgPage.deleteVehicle('123456');
  });
});
