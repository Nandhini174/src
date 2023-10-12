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
var vehicleName = 'zxvehicle4';
var baseName = 'zxbase4';
var baseAbbr = 'zxb4';
var cityName = 'Quillayute';
var state = 'WA';
var zipCodeNumber = '98331';
var latitude = '47.94088374699352';
var longititude = '-124.56387809088534';
var eta = 1;
var region = 'cali';
var addressStreet = '510 Collins St';
var addressCity = 'Forks';
var addressState = 'WA';
var addressZip = '98331';
var addressLat = '47.5739';
var addressLong = '124.2278';

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
  await landingPage.goto();
  await landingPage.clickOps('DEV');
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

describe('Cancel Request', () => {
  beforeEach(async () => {
    await regionBoardPage.clickButton('scene-call');
    await requestPage.confirmRequestCreated();
    await requestPage.consoleLogCardUrl('Cancel Request');
    await requestPage.setSceneLocation(
      addressStreet,
      addressCity,
      addressState,
      addressZip,
      addressLat,
      addressLong,
    );
    await requestPage.setReceivingFacility('University Behavioral Health Of Denton');
    await requestPage.clickAssignUnitButton();
    await requestPage.confirmAssignUnitStep();
    await requestPage.offerTransport();
    await requestPage.unitAccepted();
    await requestPage.completeSafetyQuestionsForm();
    await requestPage.confirmUnitAccepted();
    await requestPage.closeRequestPage();
  });

  test('canceling request on depart post leg', async () => {
    await cardDetailPage.depart();
    await cardDetailPage.cancelRequest();
    await cardDetailPage.arrive();
    await cardDetailPage.closeCard();
  });

  test('canceling request on departing scene leg', async () => {
    await cardDetailPage.depart();
    await cardDetailPage.arrive();
    await cardDetailPage.cancelRequest();
    await cardDetailPage.depart();
    await cardDetailPage.arrive();
    await cardDetailPage.closeCard();
  });

  test('canceling request on arrive at receiving facility leg', async () => {
    await cardDetailPage.depart();
    await cardDetailPage.arrive();
    await cardDetailPage.depart();
    await cardDetailPage.cancelRequest();
    await cardDetailPage.arrive();
    await cardDetailPage.closeCard();
  });

  test('canceling request on depart receiving facility leg', async () => {
    await cardDetailPage.depart();
    await cardDetailPage.arrive();
    await cardDetailPage.depart();
    await cardDetailPage.arrive();
    await cardDetailPage.cancelRequest();
    await cardDetailPage.depart();
    await cardDetailPage.arrive();
    await cardDetailPage.closeCard();
  });

  test('canceling request on arrive at post leg', async () => {
    await cardDetailPage.depart();
    await cardDetailPage.arrive();
    await cardDetailPage.depart();
    await cardDetailPage.arrive();
    await cardDetailPage.depart();
    await cardDetailPage.cancelRequest();
    await cardDetailPage.arrive();
    await cardDetailPage.closeCard();
  });

  test('canceling request on at post leg', async () => {
    await cardDetailPage.depart();
    await cardDetailPage.arrive();
    await cardDetailPage.depart();
    await cardDetailPage.arrive();
    await cardDetailPage.depart();
    await cardDetailPage.arrive();
    await cardDetailPage.cancelRequest();
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
