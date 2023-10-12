import {
  getVarOrThrow,
  TCS_E2E_PASSWORD,
  TCS_E2E_USERNAME,
} from '../../../util/environment-variables';
import { sleep } from '../../../util/promise';

xdescribe('Ops: Scene Request', () => {
  beforeAll(async () => {
    // TODO - convert to page object
    await page.setViewport({ width: 2560, height: 1300 });
    await page.goto(TCS_URL);
    console.log('env vars', process.env);
    const username = getVarOrThrow(TCS_E2E_USERNAME);
    const password = getVarOrThrow(TCS_E2E_PASSWORD);
    await page.waitForSelector('#e2e-username', { visible: true });
    await page.focus('#e2e-username');
    await page.keyboard.type(username);
    await page.focus('#e2e-password');
    await page.keyboard.type(password);
    await page.click('#e2e-login');
    await page.waitForFunction("!document.querySelector('title').innerText.includes('Login')", {
      timeout: 10000,
    });
  });

  it('can navigate to medical facilities page', async () => {
    await page.goto('https://tcs-qa.gmr.net/DEV/org/overview');
    await page.waitForSelector('#e2e-context-nav-medical-facilities', { visible: true });
    await page.click('#e2e-context-nav-medical-facilities');
  });

  it('can create new medical facility', async () => {
    await sleep(5_000);
    await page.waitForSelector('#e2e-add-medical-facility', { visible: true });
    await page.click('#e2e-add-medical-facility');
    await sleep(1_000);
    await page.waitForSelector('#e2e-medical-facility-name', { visible: true });
    await page.focus('#e2e-medical-facility-name');
    await page.keyboard.type('Test-Facility');
    await sleep(1_000);
    await page.focus('#e2e-medical-facility-abbreviation');
    await page.keyboard.type('Test');
    await sleep(1_000);
    await page.focus('#e2e-medical-facility-npi');
    await page.keyboard.type('0123456789');
    await sleep(1_000);
    await page.focus('.e2e-latitude');
    await page.keyboard.type('32');
    await sleep(1_000);
    await page.focus('.e2e-longitude');
    await page.keyboard.type('96');
    await sleep(1_000);
    await page.focus('#e2e-medical-facility-add-button');
    await page.click('#e2e-medical-facility-add-button');
  });

  it('can verify new medical facility has been added', async () => {
    await sleep(2_000);
    await page.waitForSelector('#e2e-search-by-facility', { visible: true });
    await page.focus('#e2e-search-by-facility');
    await page.keyboard.type('Test-Facility');
    await sleep(2_000);
    await page.waitForFunction(
      'document.querySelector("mat-cell").innerText.includes("Test-Facility")',
    );
  });

  it('can manage and delete new medical facility', async () => {
    await sleep(5_000);
    await page.waitForSelector('mat-cell .mat-raised-button', { visible: true });
    await sleep(5_000);
    await page.click('mat-cell .mat-raised-button');
    await sleep(3_000);
    await page.waitForSelector('#e2e-medical-facility-delete-button', { visible: true });
    await page.click('#e2e-medical-facility-delete-button');
    await sleep(3_000);
    await page.waitForSelector('td-dialog-actions > button.mat-button.mat-accent', {
      visible: true,
    });
    await page.click('td-dialog-actions > button.mat-button.mat-accent');
  });

  it('can verify new medical facility has been deleted', async () => {
    await sleep(5_000);
    await page.waitForSelector('#e2e-search-by-facility', { visible: true });
    await page.focus('#e2e-search-by-facility');
    await page.keyboard.type('Test-Facility');
    await sleep(3_000);
    await expect(page.$('mat-cell.cdk-column-name')).toBeNull;
  });
});
