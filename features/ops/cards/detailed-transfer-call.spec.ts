import { BrowserContext, Page } from 'playwright-chromium';
import { AuthenticatedLandingPage } from '../../../pages/authenticated-landing-page';
import { createContext, disposeContext } from '../../../util/browser-context';
import { OosManagerPage } from '../../../pages/oos-manager-page';
import { RegionBoardPage } from '../../../pages/region-board-page';
import { RequestPage } from '../../../pages/request-page';
import { CardDetailPage } from '../../../pages/card-detail-page';
import { OrgPage } from '../../../pages/org-page';

let context: BrowserContext;
let page: Page;
let landingPage: AuthenticatedLandingPage;
let oosManagerPage: OosManagerPage;
let regionBoardPage: RegionBoardPage;
let requestPage: RequestPage;
let cardDetailPage: CardDetailPage;
let orgPage: OrgPage;

let unitName =  Date.now().toString();
var vehicleName = 'zxvehicle9';
var baseName = 'zxbase9';
var baseAbbr = 'zxb9';
var cityName = 'Morristown';
var state = 'VT';
var zipCodeNumber = '05661';
var latitude = '44.3090';
var longititude = '72.3833';
var eta = 1;
var region = 'cali';
var sendfacility = 'Green Mountain Nursing Home';
var recfacility = 'The Health Center';


beforeAll(async () => {
  context = await createContext();
  page = await context.newPage();
  landingPage = new AuthenticatedLandingPage(page);
  regionBoardPage = new RegionBoardPage(page);
  oosManagerPage = new OosManagerPage(page);
  requestPage = new RequestPage(page);
  cardDetailPage = new CardDetailPage(page);
  orgPage = new OrgPage(page);
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
  test('clicking the link for Org', async () => {
    await landingPage.clickOrg('DEV');
  });
});

describe('Intialize Org Data', () => {
  test('initialize Org', async () => {
   await orgPage.intializeOrg(vehicleName, 'Rotor', baseName, baseAbbr, cityName, state, zipCodeNumber, latitude, longititude);
   });
});

describe('Landing Page', () => {
  test('navigating to the landing page', async () => {
    await landingPage.goto();
  });

  test('clicking the link for OPs', async () => {
    await landingPage.clickOps('DEV');
  });
});

describe('Intialize Ops Data', () => {
  test('initialize Ops', async () => {
   await regionBoardPage.intializeOps(eta, baseName, region, unitName, vehicleName);
  });
});

describe('Detailed Transfer', () => {
  test('creating a transfer request', async () => {
    await regionBoardPage.clickButton('transfer');
    await requestPage.confirmRequestCreated();
    await requestPage.consoleLogCardUrl('Detailed Transfer');
  });
  test('adding a sending facility', async () => {
    await requestPage.setSendingFacility(sendfacility);
  });
  test('adding a receiving facility', async () => {
    await requestPage.setReceivingFacility(recfacility);
  });
  test('add requester info', async () => {
    await requestPage.setRequesterInfo('Matt', 9722444488, 'Abbeville Police (Wilcox, GA)');
  });
  test('add chief complaint info', async () => {
    await requestPage.setChiefComplaintInfo('Oxygen Needed');
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
  test('validate patient name', async () => {
    await cardDetailPage.ValidatePatientInfo(
      'David',
      'Bruno',
      '33 y/o adult Gender: male, born 01/01/1990',
      '120 lbs / 54.43 kg',
      'E1234',
      '1 Drips',
      'Automation Testing',
      'Yes',
      '150 lbs / 68.04 kg',
      'Mary',
      '23, born 03/03/2000',
    );
  });
  test('validate requester section', async () => {
    await cardDetailPage.ValidateRequesterInfo(
      'Matt',
      '(972) 244-4488',
      'Abbeville Police (Wilcox, GA)',
    );
  });
  test('validate chief complaint section', async () => {
    await cardDetailPage.ValidateChiefComplaintInfo('Oxygen Needed');
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

describe('Destroy Ops Data', () => {
  test('destroy Ops', async () => {
    await regionBoardPage.destroyOps(unitName);
  });
});
describe('Landing Page', () => {
  test('navigating to the landing page', async () => {
    await landingPage.goto();
  });
  test('clicking the link for Org', async () => {
    await landingPage.clickOrg('DEV');
  });
});
describe('Destroy Org Data', () => {
  test('destroy Org', async () => {
    await orgPage.destroyOrg(vehicleName, baseAbbr);
  });
});
