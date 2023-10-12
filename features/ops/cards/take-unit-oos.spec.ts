import { BrowserContext, Page } from 'playwright-chromium';
import { AuthenticatedLandingPage } from '../../../pages/authenticated-landing-page';
import { createContext, disposeContext } from '../../../util/browser-context';
import { OosManagerPage } from '../../../pages/oos-manager-page';
import { RegionBoardPage } from '../../../pages/region-board-page';

let context: BrowserContext;
let page: Page;
let landingPage: AuthenticatedLandingPage;
let oosManagerPage: OosManagerPage;
let regionBoardPage: RegionBoardPage;

beforeAll(async () => {
  context = await createContext();
  page = await context.newPage();
  landingPage = new AuthenticatedLandingPage(page);
  regionBoardPage = new RegionBoardPage(page);
  oosManagerPage = new OosManagerPage(page);
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

describe('Take Unit OOS', () => {
  test('the oos manager dialog can be opened', async () => {
    await regionBoardPage.clickUnitCardContextMenuButton('DEV003');
    await regionBoardPage.clickAddUnitOosEvent();
  });
  test('a unit OOS event can be created', async () => {
    await oosManagerPage.createOosEvent();
    await oosManagerPage.closeOosManagerDialog();
  });

  test('a unit can be taken out of service', async () => {
    await regionBoardPage.confirmUnitStatus('DEV003', 'OutOfService');
  });
});
