import { Page } from 'playwright-chromium';
export class OosManagerPage {
  constructor(private readonly page: Page) {}

  async createOosEvent() {
    await this.page.waitForSelector('#e2e-oos-form-secondary-reason');
    await this.page.click('#e2e-oos-form-secondary-reason');
    await this.page.click('#e2e-oos-form-primary-reason');
    await this.page.waitForSelector('.e2e-option-12-hr-staffed-base');
    await this.page.click('.e2e-option-12-hr-staffed-base');
    await this.page.fill('#e2e-estimated-duration-input', '2');
    await this.page.click('#e2e-oos-form-secondary-reason');
    await this.page.waitForSelector('#e2e-add-unit-oos-button:not([disabled])');
    await this.page.click('#e2e-add-unit-oos-button');
  }
  async closeOosManagerDialog() {
    await this.page.click(`#e2e-oos-manager-dialog-close-button`);
  }
  async endOosEvent() {
    await this.page.click('#e2e-edit-oos-event-button-index-0');
    await this.page.click('#e2e-end-oos-event-button');
  }
}
