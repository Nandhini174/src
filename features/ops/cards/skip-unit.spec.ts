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

let unitName = Date.now().toString();
var vehicleName = 'zxvehicle3';
var baseName = 'zxbase3';
var baseAbbr = 'zxb3';
var cityName = 'Mt Hope';
var state = 'WA';
var zipCodeNumber = '99012';
var latitude = '47.2696';
var longititude = '117.1301';
var eta = 1;
var region = 'cali';
var addressStreet = '99 Fairgrounds Rd';
var addressCity = 'Pomeroy';
var addressState = 'WA';
var addressZip = '99347';
var addressLat = '46.2849';
var addressLong = '117.3616';
var recfacility = 'State Hospital North';

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
    await orgPage.intializeOrg(
      vehicleName,
      'Rotor',
      baseName,
      baseAbbr,
      cityName,
      state,
      zipCodeNumber,
      latitude,
      longititude,
    );
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

describe('Skip Unit', () => {
  test('creating a scene call', async () => {
    await regionBoardPage.clickButton('scene-call');
    await requestPage.confirmRequestCreated();
    await requestPage.consoleLogCardUrl('Skip Unit');
  });
  test('adding a scene location', async () => {
    await requestPage.setSceneLocation(
      addressStreet,
      addressCity,
      addressState,
      addressZip,
      addressLat,
      addressLong,
    );
  });
  test('adding a receiving facility', async () => {
    await requestPage.setReceivingFacility(recfacility);
  });
  test('progressing to assign unit', async () => {
    await requestPage.clickAssignUnitButton();
    await requestPage.confirmAssignUnitStep();
  });
  test('skip unit with skip button', async () => {
    await requestPage.skipTransport();
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
  test('departing scene', async () => {
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
