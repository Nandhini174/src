import {
  getVarOrThrow,
  TCS_E2E_PASSWORD,
  TCS_E2E_USERNAME,
} from '../../../util/environment-variables';
import { sleep } from '../../../util/promise';

xdescribe('Ops: Verify undo is always available', () => {
  beforeAll(async () => {
    // TODO - convert to page object
    await page.setViewport({ width: 2400, height: 1200 });
    await page.goto('http://localhost:62801/');
    console.log('env vars', process.env);
    const username = getVarOrThrow(TCS_E2E_USERNAME);
    const password = getVarOrThrow(TCS_E2E_PASSWORD);
    await sleep(10_000);
    await page.waitForSelector('#okta-signin-username', { visible: true });
    await page.focus('#okta-signin-username');
    await page.keyboard.type(username);
    await page.focus('#okta-signin-password');
    await page.keyboard.type(password);
    await page.click('#okta-signin-submit');
    // await sleep(5_000);
    // await page.waitForSelector('.o-form-input', { visible: true });
    // await page.focus('.o-form-input');
    // await page.keyboard.type(security_phrase);
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

  //Test Runner should be at Region Board to proceed from here.
  it('can create transfer request', async () => {
    await page.waitForSelector('.e2e-transfer', { visible: true });
    await page.click('.e2e-transfer');
    await page.waitForSelector('.request-data-entry', { visible: true });
  });

  it('can add sending facility', async () => {
    await sleep(5_000);
    await page.focus('#mat-input-14');
    for (let i = 0; i < 18; i++) {
      await page.keyboard.press('Backspace');
    }
    await page.keyboard.type('KentuckyCare 44');
    await sleep(2_000);
    await page.waitForSelector('.mat-option', { visible: true });
    await page.click('.mat-option');
  });

  it('can add receiving facility', async () => {
    await sleep(5_000);
    await page.focus('#mat-input-28');
    for (let i = 0; i < 18; i++) {
      await page.keyboard.press('Backspace');
    }
    await page.keyboard.type('KentuckyCare 63');
    await sleep(2_000);
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

  it('can depart from post 1', async () => {
    await sleep(5_000);
    await page.waitForSelector('.e2e-depart', { visible: true });
    await page.click('.e2e-depart');
    await sleep(5_000);
    await page.waitForSelector('#e2e-flight-plan-ok', { visible: true });
    await page.click('#e2e-flight-plan-ok');
  });

  it('can undo depart from post', async () => {
    await sleep(10_000);
    await page.waitForSelector('.e2e-undo-depart', { visible: true });
    await page.click('.e2e-undo-depart');
    await page.waitForFunction(
      'document.querySelector(".vehicle-disposition-status").innerText.includes("At Post")',
    );
  });

  it('can depart from post 2', async () => {
    await sleep(5_000);
    await page.waitForSelector('.e2e-depart', { visible: true });
    await page.click('.e2e-depart');
    await sleep(5_000);
    await page.waitForSelector('#e2e-flight-plan-ok', { visible: true });
    await page.click('#e2e-flight-plan-ok');
  });

  it('can arrive to sending facility 1', async () => {
    await sleep(5_000);
    await page.waitForSelector('.e2e-arrive', { visible: true });
    await page.click('.e2e-arrive');
  });

  it('can undo arrive to sending facility', async () => {
    await sleep(10_000);
    await page.waitForSelector('.e2e-undo-arrive', { visible: true });
    await page.click('.e2e-undo-arrive');
    await sleep(5_000);
    await page.waitForFunction(
      'document.querySelector(".vehicle-disposition-status").innerText.includes("En-Route Sending Facility")',
    );
  });

  it('can arrive to sending facility 2', async () => {
    await sleep(5_000);
    await page.waitForSelector('.e2e-arrive', { visible: true });
    await page.click('.e2e-arrive');
  });

  it('can depart to receiving facility 1', async () => {
    await sleep(5_000);
    await page.waitForSelector('.e2e-depart', { visible: true });
    await page.click('.e2e-depart');
    await sleep(5_000);
    await page.waitForSelector('#e2e-flight-plan-ok', { visible: true });
    await page.click('#e2e-flight-plan-ok');
  });

  it('can undo depart to receiving facility', async () => {
    await sleep(10_000);
    await page.waitForSelector('.e2e-undo-depart', { visible: true });
    await page.click('.e2e-undo-depart');
    await sleep(5_000);
    await page.waitForFunction(
      'document.querySelector(".vehicle-disposition-status").innerText.includes("At Sending Facility")',
    );
  });

  it('can depart  to receiving facility 2', async () => {
    await sleep(5_000);
    await page.waitForSelector('.e2e-depart', { visible: true });
    await page.click('.e2e-depart');
    await sleep(5_000);
    await page.waitForSelector('#e2e-flight-plan-ok', { visible: true });
    await page.click('#e2e-flight-plan-ok');
  });

  it('can arrive to receiving facility 1', async () => {
    await sleep(5_000);
    await page.waitForSelector('.e2e-arrive', { visible: true });
    await page.click('.e2e-arrive');
  });

  it('can undo arrive to receiving facility', async () => {
    await sleep(10_000);
    await page.waitForSelector('.e2e-undo-arrive', { visible: true });
    await page.click('.e2e-undo-arrive');
    await sleep(5_000);
    await page.waitForFunction(
      'document.querySelector(".vehicle-disposition-status").innerText.includes("En-Route Receiving Facility")',
    );
  });

  it('can arrive to receiving facility 2', async () => {
    await sleep(5_000);
    await page.waitForSelector('.e2e-arrive', { visible: true });
    await page.click('.e2e-arrive');
  });

  it('can depart to base 1', async () => {
    await sleep(5_000);
    await page.waitForSelector('.e2e-depart', { visible: true });
    await page.click('.e2e-depart');
    await sleep(5_000);
    await page.waitForSelector('#e2e-flight-plan-ok', { visible: true });
    await page.click('#e2e-flight-plan-ok');
  });

  it('can undo depart to base', async () => {
    await sleep(10_000);
    await page.waitForSelector('.e2e-undo-depart', { visible: true });
    await page.click('.e2e-undo-depart');
    await sleep(5_000);
    await page.waitForFunction(
      'document.querySelector(".vehicle-disposition-status").innerText.includes("At Receiving Facility")',
    );
  });

  it('can depart to base 2', async () => {
    await sleep(5_000);
    await page.waitForSelector('.e2e-depart', { visible: true });
    await page.click('.e2e-depart');
    await sleep(5_000);
    await page.waitForSelector('#e2e-flight-plan-ok', { visible: true });
    await page.click('#e2e-flight-plan-ok');
  });

  it('can arrive to base 1', async () => {
    await sleep(5_000);
    await page.waitForSelector('.e2e-arrive', { visible: true });
    await page.click('.e2e-arrive');
  });

  it('can undo arrive to base', async () => {
    await sleep(10_000);
    await page.waitForSelector('.e2e-undo-arrive', { visible: true });
    await page.click('.e2e-undo-arrive');
    await page.waitForFunction(
      'document.querySelector(".vehicle-disposition-status").innerText.includes("En-Route Post")',
    );
  });

  it('can arrive to base 2', async () => {
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
