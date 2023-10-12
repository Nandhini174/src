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

describe('No Issue Transfer', () => {
  test('navigating to the landing page', async () => {
    await landingPage.goto();
  });
  test('clicking the link for OPs', async () => {
    await landingPage.clickOps('DEV');
  });
  test('creating a transfer request', async () => {
    await regionBoardPage.clickButton('transfer');
    await requestPage.confirmRequestCreated();
    await requestPage.consoleLogCardUrl('No Issue Transfer');
  });
  test('adding a sending facility', async () => {
    await requestPage.setSendingFacility('The Childrens Cl Family Health Ctr In Long Beach');
  });
  test('adding a receiving facility', async () => {
    await requestPage.setReceivingFacility('San Diego Childrens Dental Clinic');
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
  test('arriving at sending facility', async () => {
    await cardDetailPage.arrive();
  });
  test('departing sending facility', async () => {
    await cardDetailPage.depart();
  });
  test('arriving at receiving facility', async () => {
    await cardDetailPage.arrive();
  });
  test('departing receiving facility', async () => {
    await cardDetailPage.depart();
  });
  test('arriving at post', async () => {
    await cardDetailPage.arrive();
  });
  test('closing the card', async () => {
    await cardDetailPage.closeCard();
  });
});
