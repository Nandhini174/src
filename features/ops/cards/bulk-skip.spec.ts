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
var childCard = "";
var patientScnFirstName = 'David';
var patientScnLastName = 'Bruno';
var patientwght = 120;
var patientdob = '01011990';
var patientmrn = 'E1234';
var patientScnGender = '33 y/o adult Gender: male, born 1/1/1990';
var patientScnWeight = '120 lbs / 54.43 kg';
var crewMember1 = "";
var parentPostAddress = "";
var pcLoc = "Richardson, TX 75081";
var rgLoc = "";
var vehicleName = 'zxvehicle7';
var baseName = 'zxbase7';
var baseAbbr = 'zxb7';
var cityName = 'Allagash';
var state = 'ME';
var zipCodeNumber = '04774';
var latitude = '47.1032';
var longititude = '69.1449';
var eta = 1;
var region = 'cali';
var addressStreet = '29 Old Main St';
var addressCity = 'Eagle Lake';
var addressState = 'ME';
var addressZip = '04739';
var addressLat = '47.0240';
var addressLong = '68.3535';
var recfacility = 'Pines Health Services';
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
describe('Precautionary Laning via Internal Unit', () => {
  test('creating a scene call', async () => {
      await regionBoardPage.clickButton('scene-call');
      await requestPage.confirmRequestCreated();
  });
 test('adding a scene location', async () => {
  await requestPage.setSceneLocation(
    addressStreet,
    addressCity,
    addressState,
    addressZip,
    addressLat,
    addressLong  );
  });
  test('adding a receiving facility', async () => {
      await requestPage.setReceivingFacility(recfacility);
  });
  test('add patient info', async () => {
    await requestPage.setPatientInfoForSceneCall(
        patientScnFirstName ,
        patientScnLastName ,
        patientwght,
        patientdob,
        patientmrn,
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
  test('arrive at scene location', async () => {
    await cardDetailPage.arrive();
   });
  test('get crew member value', async () => {
    crewMember1= ((await page.innerHTML('.e2e-CrewMember.passenger-name')).trim());
  });
  test('get post address', async () => {  
    parentPostAddress= ((await page.innerHTML('.e2e-Post-address')).trim());
  });
  test('get receiving loc value', async () => {
    rgLoc= ((await page.innerHTML('.e2e-ReceivingFacility-address')).trim());
  });
   test('depart from scene location', async () => {
     await cardDetailPage.depart();
   });
  test('precautionary landing', async () => {
    await cardDetailPage.precautionaryLandingFromContextMenuInt(
      'Richardson',
      'TX' ,
      '75081',
      '33.5604',
      '096.4370', );
   });  
   test('navigate to child card', async () => {
    await requestPage.goToNewCard();
    page.waitForNavigation()
  });
  test('depart internal unit from post', async () => {
    await cardDetailPage.depart();
  });
  test('get childCard url', async () => {
    const url=  page.url();
     childCard = url.toString() 
  });
  test('validate card number', async () => {
    await cardDetailPage.ValidateCardNumber( childCard)
  });
  test('validate scene call patient name', async () => {
    await cardDetailPage.validateScnCallPatientInformtion ( 
        patientScnFirstName ,
        patientScnLastName ,
        patientScnGender ,
        patientScnWeight,      
        patientmrn,
    )
  })
  test('validate crew member', async () => {
    await cardDetailPage.validateCrewMember(crewMember1)
  });
  test('validate PL Loc for Child Card', async () => {
    await cardDetailPage.validatePLAddress3(pcLoc)
  });
  test('validate receiving loc for Child Card', async () => {
    await cardDetailPage.validateReceivingAddress(rgLoc)
  });
  test('arrive child card at precautionary landing location', async () => {
    await cardDetailPage.arrive();
  });
  test('depart child card from precautionary landing location', async () => {
    await cardDetailPage.depart();
  });
  test('arrive child card at receiving facility', async () => {
    await cardDetailPage.arrive();
  });
  test('depart child card from receiving facility', async () => {
    await cardDetailPage.depart();
  });
  test('arrive at precautionary landing location', async () => {
    await cardDetailPage.arrive();
  });
  test('depart child card from precautionary landing location', async () => {
    await cardDetailPage.depart();
  });
  test('arrive child card at post', async () => {
    await cardDetailPage.arrive();
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
    await cardDetailPage.validateAddress(parentPostAddress)
  });
  test('validate PL Loc for Parent Card', async () => {
    await cardDetailPage.validatePLAddress(pcLoc)
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
