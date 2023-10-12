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
var vehicleName = 'zxvehicle1';
var baseName = 'zxbase1';
var baseAbbr = 'zxb1';
var cityName = 'Irving';
var state = 'TX';
var zipCodeNumber = '75063';
var latitude = '32.55';
var longititude = '96.57';
var eta = 1;
var region = 'cali';
var addressStreet = '701 S Main St';
var addressCity = 'Grapevine';
var addressState = 'TX';
var addressZip = '76051';
var addressLat = '32.5605';
var addressLong = '97.0468';
var recfacility = 'Texas Health Presbyterian Hospital Denton'

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

describe('Customer Cancel', () => {
  test('creating a scene call', async () => {
    await regionBoardPage.clickButton('scene-call');
    await requestPage.confirmRequestCreated();
    await requestPage.consoleLogCardUrl('Customer Cancel');
  });
  test('adding a scene location', async () => {
    await requestPage.setSceneLocation(
      addressStreet, addressCity, addressState, addressZip, addressLat, addressLong);
  });
  test('adding a receiving facility', async () => {
    await requestPage.setReceivingFacility(recfacility);
  });
  test('progressing to assign unit', async () => {
    await requestPage.clickAssignUnitButton();
    await requestPage.confirmAssignUnitStep();
  });
  test('offering transport', async () => {
    await requestPage.offerTransport();
  });

  test('cancel request with customer cancelled button', async () => {
    await requestPage.cancelRequestWithCustomerCancelledButton();
  });

  test('confirm call cancelled', async () => {
    await cardDetailPage.confirmCallCancelled();
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