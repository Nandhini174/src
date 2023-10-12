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
describe('Abort and Crew will transport patient via replacement unit', () => {
  test('creating a transfer request', async () => {
    await regionBoardPage.clickButton('transfer');
    await requestPage.confirmRequestCreated();
    await requestPage.consoleLogCardUrl(
      'Abort and Crew will transport patient via replacement unit',
    );
  });
  test('adding a sending facility', async () => {
    await requestPage.setSendingFacility('Baylor Scott & White Medical Center - Frisco');
  });
  test('adding a receiving facility', async () => {
    await requestPage.setReceivingFacility('Select Specialty Hospital - Dallas');
  });
  test('add patient info', async () => {
    await requestPage.setPatientInfo(
      'David',
      'Bruno',
      120,
      'E1234',
      1,
      '01011990',
      'Mary',
      150,
      '03032000',
      'Automation Testing',
    );
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
  test('abort the unit and crew will transport via replacement unit', async () => {
    await cardDetailPage.abortFromContextMenuThirdParty();
  });
  test('departing from sending facility - parent card', async () => {
    await cardDetailPage.depart();
  });
  test('arriving at post - parent card', async () => {
    await cardDetailPage.arrive();
  });
  test('closing the parent card', async () => {
    await cardDetailPage.closeCard();
  });
  test('navigate to child card', async () => {
    await requestPage.goToNewCard();
    page.waitForNavigation();
  });
  test('validate patient name', async () => {
    await cardDetailPage.ValidatePatientInfo(
      'David',
      'Bruno',
      '33 y/o adult Gender: male, born 1/1/1990',
      '120 lbs / 54.43 kg',
      'E1234',
      '1 Drips',
      'Automation Testing',
      'Yes',
      '150 lbs / 68.04 kg',
      'Mary',
      '23, born 3/3/2000',
    );
  });
  test('depart ground unit from sending facility', async () => {
    await cardDetailPage.departGroundUnit();
  });
  test('get childCard url', async () => {
    const url = page.url();
    childCard = url.toString();
  });
  test('validate card number', async () => {
    await cardDetailPage.ValidateCardNumber(childCard);
  });
  test('arrive ground unit at receiving facility', async () => {
    await cardDetailPage.arriveGroundUnit();
  });
  test('depart ground unit from receiving facility', async () => {
    await cardDetailPage.departGroundUnit();
  });
  test('arrive at parent unit post to drop the crew member', async () => {
    await cardDetailPage.arriveGroundUnit();
  });
  test('closing the child card', async () => {
    await cardDetailPage.closeCard();
  });
});
