import {
  getVarOrThrow,
  TCS_E2E_PASSWORD,
  TCS_E2E_USERNAME,
} from '../../../util/environment-variables';
import { sleep } from '../../../util/promise';

xdescribe('Ops: Scene Request', () => {
  beforeAll(async () => {
    // TODO - convert to page object
    await page.setViewport({ width: 2400, height: 1200 });
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

  it('can be created"', async () => {
    await page.goto('https://tcs-qa.gmr.net/AEL/ops/regions/');
    await page.waitForSelector('.e2e-scene-call', { visible: true });
    await page.click('.e2e-scene-call');
    await page.waitForSelector('.request-data-entry', { visible: true });
  });

  it('can add scene location', async () => {
    await sleep(5_000);
    await page.focus('#mat-input-8');
    await page.keyboard.type('St. Louis');
    await page.focus('#mat-input-9');
    await page.keyboard.type('MO');
    await sleep(2_000);
    await page.click('.matching-address');
  });

  it('can add receiving facility', async () => {
    await sleep(5_000);
    await page.waitForSelector('#mat-expansion-panel-header-2', { visible: true });
    await page.click('#mat-expansion-panel-header-2');
    await sleep(2_000);
    await page.focus('#mat-input-19');
    await page.keyboard.type('Parkland Memorial');
    await page.waitForSelector('.mat-option', { visible: true });
    await page.click('.mat-option');
  });

  it('can assign a unit', async () => {
    await sleep(5_000);
    await page.click('#e2e-assign-unit-step');
    await sleep(5_000);
    await page.waitForSelector('.e2e-offer-transport', { visible: true });
    await page.click('.e2e-offer-transport');
    await sleep(5_000);
    await page.waitForSelector('.e2e-unit-accepted', { visible: true });
    await page.click('.e2e-unit-accepted');
    await sleep(5_000);
    await page.waitForSelector('#e2e-safety-radio-no-1', { visible: true });
    await page.click('#e2e-safety-radio-no-1');
    await sleep(5_000);
    await page.click('#e2e-safety-radio-no-2');
    await sleep(5_000);
    await page.click('#e2e-safety-accept-button');
  });

  it('can depart and arrive to scene', async () => {
    await sleep(5_000);
    await page.waitForSelector('.e2e-depart', { visible: true });
    await page.click('.e2e-depart');
    await sleep(5_000);
    await page.waitForSelector('#e2e-flight-plan-ok', { visible: true });
    await page.click('#e2e-flight-plan-ok');
    await sleep(5_000);
    await page.waitForSelector('.e2e-arrive', { visible: true });
    await page.click('.e2e-arrive');
  });

  it('can depart and arrive to receiving facility', async () => {
    await sleep(5_000);
    await page.waitForSelector('.e2e-depart', { visible: true });
    await page.click('.e2e-depart');
    await sleep(5_000);
    await page.waitForSelector('#e2e-flight-plan-ok', { visible: true });
    await page.click('#e2e-flight-plan-ok');
    await sleep(5_000);
    await page.waitForSelector('.e2e-arrive', { visible: true });
    await page.click('.e2e-arrive');
  });

  it('can depart and return to post', async () => {
    await sleep(5_000);
    await page.waitForSelector('.e2e-depart', { visible: true });
    await page.click('.e2e-depart');
    await sleep(5_000);
    await page.waitForSelector('#e2e-flight-plan-ok', { visible: true });
    await page.click('#e2e-flight-plan-ok');
    await sleep(5_000);
    await page.waitForSelector('.e2e-arrive', { visible: true });
    await page.click('.e2e-arrive');
  });

  it('can close the card', async () => {
    await sleep(5_000);
    await page.waitForSelector('.e2e-close-card', { visible: true });
    await page.click('.e2e-close-card');
    await page.waitForSelector('.e2e-close-card-ok', { visible: true });
    await page.click('.e2e-close-card-ok');
  });
});
