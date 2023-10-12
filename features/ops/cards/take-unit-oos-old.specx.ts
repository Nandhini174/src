import {
  getVarOrThrow,
  TCS_E2E_PASSWORD,
  TCS_E2E_USERNAME,
} from '../../../util/environment-variables';
import { sleep } from '../../../util/promise';

xdescribe('Ops: Take Unit OOS', () => {
  beforeAll(async () => {
    // TODO - convert to page object
    await page.setViewport({ width: 2400, height: 1200 });
    await page.goto(TCS_URL);
    // console.log('env vars', process.env);
    // const username = getVarOrThrow(TCS_E2E_USERNAME);
    // const password = getVarOrThrow(TCS_E2E_PASSWORD);
    // await sleep(10_000);
    // await page.waitForSelector('#okta-signin-username', { visible: true });
    // await page.focus('#okta-signin-username');
    // await page.keyboard.type('amghdevtest@gmail.com');
    // await page.focus('#okta-signin-password');
    // await page.keyboard.type('AmghTesting123');
    // await page.click('#okta-signin-submit');
    // await sleep(5_000);
    // await page.waitForSelector('.o-form-input', { visible: true });
    // await page.focus('.o-form-input');
    // await page.keyboard.type('amghtest123');
    // await page.click('.button-primary');
    // await page.waitForSelector('.mat-icon-logo-button', { visible: true });
    // await sleep(2_000);
    // await page.waitForSelector('.company-code-button', { visible: true });
    // await page.click('.company-code-button');
    // await sleep(2_000);
    // await page.waitForSelector('#e2e-AEL-button', { visible: true });
    // await page.click('#e2e-AEL-button');
    // await sleep(5_000);
    // await page.waitForSelector('.mat-icon-logo', { visible: true });
    // await page.click('.mat-icon-logo');
    // await sleep(2_000);
    // await page.waitForSelector('#e2e-operations-button', { visible: true });
    // await page.click('#e2e-operations-button');
  });
  it('can log in using okta', async () => {
    await sleep(5_000);
    await page.waitForSelector('#okta-signin-username', { visible: true });
    await page.focus('#okta-signin-username');
    await page.keyboard.type('amghdevtest@gmail.com');
    await page.focus('#okta-signin-password');
    await page.keyboard.type('AmghTesting123');
    await page.click('#okta-signin-submit');
    await sleep(5_000);
    await page.waitForSelector('.o-form-input', { visible: true });
    await page.focus('.o-form-input');
    await page.keyboard.type('amghtest123');
    await page.click('.button-primary');
  });

  //Test Runner should be at Region Board to proceed from here.
  it('can be taken oos', async () => {
    await sleep(10_000);
    await page.waitForSelector('.e2e-unit-card-N891GT', { visible: true });
    await sleep(2_000);
    await page.click('#e2e-unit-card-N891GT-context-menu-button');
    await sleep(2_000);
    await page.waitForSelector('#e2e-take-out-of-service', { visible: true });
    await page.click('#e2e-take-out-of-service');
    await sleep(2_000);
    await page.waitForSelector('.e2e-option-aircraft-swap', { visible: true });
    await page.click('.e2e-option-aircraft-swap');
    await sleep(2_000);
    await page.focus('.e2e-oos-end-time');
    await page.click('.e2e-oos-end-time');
    await page.keyboard.press('Backspace', { delay: 1000 });
    await page.keyboard.press('Backspace', { delay: 1000 });
    await page.keyboard.type('22220222222');
    await sleep(2_000);
    await page.click('.e2e-add-event-button');
  });

  it('can verify unit is oos', async () => {
    await sleep(10_000);
    await page.waitForSelector('.e2e-oos-reason-N891GT', { visible: true });
    await page.waitForFunction(
      'document.querySelector(".e2e-oos-reason-N891GT").innerText.includes("Unscheduled - Aircraft Swap")',
    );
  });

  it('can return unit to base', async () => {
    await sleep(2_000);
    await page.click('#e2e-unit-card-N891GT-context-menu-button');
    await sleep(2_000);
    await page.click('#e2e-manage-oos-events');
    await sleep(5_000);
    await page.waitForSelector('#e2e-end-oos-event-button', { visible: true });
    await page.click('#e2e-end-oos-event-button');
  });

  it('can verify the unit is available', async () => {
    await sleep(2_000);
    await page.waitForSelector('.e2e-unit-card-N891GT', { visible: true });
    await page.waitForSelector('#e2e-unit-card-status-N891GT', { visible: true });
    await page.waitForFunction(
      'document.querySelector("#e2e-unit-card-status-N891GT").innerText.includes("Available at Post")',
    );
  });
});
