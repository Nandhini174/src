import { BrowserContext, Page } from 'playwright-chromium';
import { AuthenticatedLandingPage } from '../../../pages/authenticated-landing-page';
import { createContext, disposeContext } from '../../../util/browser-context';
import { OosManagerPage } from '../../../pages/oos-manager-page';
import { RegionBoardPage } from '../../../pages/region-board-page';
import { RequestPage } from '../../../pages/request-page';
import { CardDetailPage } from '../../../pages/card-detail-page';

let context: BrowserContext;
let page: Page;
let landingPage: AuthenticatedLandingPage;
let oosManagerPage: OosManagerPage;
let regionBoardPage: RegionBoardPage;
let requestPage: RequestPage;
let cardDetailPage: CardDetailPage;

beforeAll(async () => {
  context = await createContext();
  page = await context.newPage();
  landingPage = new AuthenticatedLandingPage(page);
  regionBoardPage = new RegionBoardPage(page);
  oosManagerPage = new OosManagerPage(page);
  requestPage = new RequestPage(page);
  cardDetailPage = new CardDetailPage(page);
  await page.setViewportSize({
    width: 1920,
    height: 1080,
  });
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

describe('Abort and Cancel the call', () => {
  test('creating a scene call', async () => {
    await regionBoardPage.clickButton('scene-call');
    await requestPage.confirmRequestCreated();
    await requestPage.consoleLogCardUrl('Abort and Cancel the call');
  });
  test('adding a scene location', async () => {
    await requestPage.setSceneLocation(
      '13737 Noel Rd',
      'Dallas',
      'TX',
      '75240',
      '32.93657320914129',
      '-96.8191201419591',
    );
  });
  test('adding a receiving facility', async () => {
    await requestPage.setReceivingFacility('Texas Health Presbyterian Hospital Denton');
  });
  test('progressing to assign unit', async () => {
    await requestPage.clickAssignUnitButton();
    await requestPage.confirmAssignUnitStep();
  });
  test('offering transport', async () => {
    await requestPage.offerTransport();
  });
  test('accepting transport', async () => {
    await requestPage.unitAccepted();
    await requestPage.completeSafetyQuestionsForm();
    await requestPage.confirmUnitAccepted();
    await requestPage.closeRequestPage();
  });
  test('departing from post', async () => {
    await cardDetailPage.depart();
  });
  test('arriving at scene', async () => {
    await cardDetailPage.arrive();
  });
  test('navigate to edit request page', async () => {
    await cardDetailPage.editRequest();
  });
  test('navigate to assign unit page', async () => {
    await requestPage.clickAssignUnitButton();
    await requestPage.confirmAssignUnitStep();
  });
  test('abort call with abort button', async () => {
    await requestPage.abortCallWithAbortButton();
  });
  test('navigate to card view page', async () => {
    await requestPage.closeRequestPage();
  });
  test('departing scene to post', async () => {
    await cardDetailPage.depart();
  });
  test('arriving at post', async () => {
    await cardDetailPage.arrive();
  });
  test('closing the card', async () => {
    await cardDetailPage.closeCard();
  });
});
