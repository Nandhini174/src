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
var crewMember1 = '';
var parentPostAddress = '';
var sgLoc = '';
var rgLoc = '';
var patientFirstName = 'David';
var patientLastName = 'Bruno';
var patientweight = 120;
var gender = '33 y/o adult Gender: male, born 1/1/1990';
var weight = '120 lbs / 54.43 kg';
var mrn = 'E1234';
var drips = 1;
var dob = '01011990';
var dripsvalue = '1 Drips';
var ridealong = 'Mary';
var ridealongweight = 150;
var ridealongdob = '03032000';
var patientnotes = 'Automation Testing';
var rideAlongRequested = 'Yes';
var pcLoc = 'Morgan City, MS 38954';
var rideAlongWt = '150 lbs / 68.04 kg';
var rideAlongAge = '23, born 3/3/2000';
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
describe('Precautionary Laning via External Unit', () => {
  test('creating a transfer request', async () => {
    await regionBoardPage.clickButton('transfer');
    await requestPage.confirmRequestCreated();
    await requestPage.consoleLogCardUrl('Precautionary Laning via External Unit');
  });
  test('adding a sending facility', async () => {
    await requestPage.setSendingFacility('Baylor Scott & White Medical Center - Frisco');
  });
  test('adding a receiving facility', async () => {
    await requestPage.setReceivingFacility('Select Specialty Hospital - Dallas');
  });
  test('add patient info', async () => {
    await requestPage.setPatientInfo(
      patientFirstName,
      patientLastName,
      patientweight,
      mrn,
      drips,
      dob,
      ridealong,
      ridealongweight,
      ridealongdob,
      patientnotes,
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
  test('get crew member value', async () => {
    crewMember1 = (await page.innerHTML('.e2e-CrewMember.passenger-name')).trim();
  });
  test('get post address', async () => {
    parentPostAddress = (await page.innerHTML('.e2e-Post-address')).trim();
  });
  test('get sending loc value', async () => {
    sgLoc = (await page.innerHTML('.e2e-SendingFacility-address')).trim();
  });
  test('get receiving loc value', async () => {
    rgLoc = (await page.innerHTML('.e2e-ReceivingFacility-address')).trim();
  });
  test('precautionary landing', async () => {
    await cardDetailPage.precautionaryLandingFromContextMenuExt(
      'Morgan City',
      'MS',
      '38954',
      '33.2284',
      '090.2100',
      '9 Line Medical Solutions',
    );
  });
  test('navigate to child card', async () => {
    await requestPage.goToNewCard();
    page.waitForNavigation();
  });
  test('depart ground unit from precautinary landing location', async () => {
    await cardDetailPage.departGroundUnit();
  });
  test('validate patient name', async () => {
    await cardDetailPage.validatePatientInformtion(
      patientFirstName,
      patientLastName,
      gender,
      weight,
      mrn,
      dripsvalue,
      patientnotes,
      rideAlongRequested,
      rideAlongWt,
      ridealong,
      rideAlongAge,
    );
  });
  test('get childCard url', async () => {
    const url = page.url();
    childCard = url.toString();
  });
  test('validate card number', async () => {
    await cardDetailPage.ValidateCardNumber(childCard);
  });
  test('validate crew member', async () => {
    await cardDetailPage.validateCrewMember(crewMember1);
  });
  test('validate PL Loc for Child Card', async () => {
    await cardDetailPage.validatePLAddress2(pcLoc);
  });
  test('validate sending loc for Child Card', async () => {
    await cardDetailPage.validateSendingAddress(sgLoc);
  });
  test('validate receiving loc for Child Card', async () => {
    await cardDetailPage.validateReceivingAddress(rgLoc);
  });
  test('arrive ground unit at sending facility', async () => {
    await cardDetailPage.arriveGroundUnit();
  });
  test('depart ground unit from sending facility', async () => {
    await cardDetailPage.departGroundUnit();
  });
  test('arrive ground unit at receiving facility', async () => {
    await cardDetailPage.arriveGroundUnit();
  });
  test('depart ground unit from receiving facility', async () => {
    await cardDetailPage.departGroundUnit();
  });
  test('arrive at precautionary landing location', async () => {
    await cardDetailPage.arriveGroundUnit();
  });
  test('closing the child card', async () => {
    await cardDetailPage.closeCard();
  });
  test('navigate to parent card', async () => {
    await cardDetailPage.goToPrimaryCard();
  });
  test('arriving at precautionary landing location - parent card', async () => {
    await cardDetailPage.arrive();
  });
  test('validate postAddress', async () => {
    await cardDetailPage.validateAddress(parentPostAddress);
  });
  test('validate PL Loc for Parent Card', async () => {
    await cardDetailPage.validatePLAddress(pcLoc);
  });
  test('departing from precautionary landing location - parent card', async () => {
    await cardDetailPage.depart();
  });
  test('arriving at post - parent card', async () => {
    await cardDetailPage.arrive();
  });
  test('closing the parent card', async () => {
    await cardDetailPage.closeCard();
  });
});
