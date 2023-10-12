import { Page } from 'playwright-chromium';
import { tcsUrl } from '../util/url';

export class AuthenticatedLandingPage {
  constructor(private readonly page: Page) {}

  goto() {
    return this.page.goto(tcsUrl('/'));
  }

  async clickOps(companyCode: string) {
    await this.page.click(`#e2e-${companyCode}-ops`);
  }

  async clickOrg(companyCode: string) {
    await this.page.click(`#e2e-${companyCode}-org`);
  }
}
