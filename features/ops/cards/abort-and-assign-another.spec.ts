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
var childCard = '';

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
describe('Abort and Assign Another Unit', () => {
  test('creating a transfer request', async () => {
    await regionBoardPage.clickButton('transfer');
    await requestPage.confirmRequestCreated();
    await requestPage.consoleLogCardUrl('Abort and Assign Another Unit');
  });
  test('adding a sending facility', async () => {
    await requestPage.setSendingFacility('Baylor Scott & White Medical Center - Frisco');
  });
  test('adding a receiving facility', async () => {
    await requestPage.setReceivingFacility('Select Specialty Hospital - Dallas');
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
  test('abort the unit and assign another one', async () => {
    await cardDetailPage.abortFromContextMenu();
  });
  test('navigate to child card', async () => {
    await requestPage.goToNewCard();
    page.waitForNavigation();
  });
  test('get childCard url', async () => {
    const url = page.url();
    page.waitForNavigation();
    childCard = url.toString();
  });
  test('navigate to child card essentials page', async () => {
    await cardDetailPage.editRequestChild();
  });
  test('navigate to child card assignment page', async () => {
    await requestPage.clickChildAssignUnitButton();
  });
  test('offer transport to child card', async () => {
    await requestPage.confirmAssignUnitStep();
    await requestPage.offerTransport();
  });
  test('accepting transport for child card', async () => {
    await requestPage.unitAccepted();
    //await requestPage.confirmUnitAccepted();
    //await requestPage.closeRequestPage();
  });
  test('departing from post - child card', async () => {
    await cardDetailPage.depart();
  });
  test('arriving at sending facility - child card', async () => {
    await cardDetailPage.arrive();
  });
  test('departing sending facility - child card', async () => {
    await cardDetailPage.depart();
  });
  test('arriving at receiving facility - child card', async () => {
    await cardDetailPage.arrive();
  });
  test('departing receiving facility - child card', async () => {
    await cardDetailPage.depart();
  });
  test('arriving at post - child card', async () => {
    await cardDetailPage.arrive();
  });
  test('closing the child card', async () => {
    await cardDetailPage.closeCard();
  });
  test('navigate to parent card', async () => {
    await cardDetailPage.goToParentCard();
  });
  test('arriving at post - parent card', async () => {
    await cardDetailPage.arriveParentCard();
  });
  test('closing the parent card', async () => {
    await cardDetailPage.closeCard();
  });
});
