import { Page } from 'playwright-chromium';
export class RegionBoardPage {
  constructor(private readonly page: Page) {}
  navigate() {}
  async clickUnitCardContextMenuButton(unitAbbreviation: string) {
    await this.page.click(`#e2e-unit-card-${unitAbbreviation} >> .e2e-context-menu-button`);
  }
  async clickAddUnitOosEvent() {
    await this.page.click('#e2e-context-menu-item-manage-oos-events');
    await this.page.click('#e2e-context-menu-item-add-unit-oos-event');
  }
  async openUnitOosHistory() {
    await this.page.click('#e2e-context-menu-item-manage-oos-events');
    await this.page.click('#e2e-context-menu-item-unit-oos-history');
  }
  async confirmUnitStatus(unitAbbreviation: string, status: string) {
    await this.page.waitForSelector(`#e2e-unit-card-${unitAbbreviation}.e2e-unit-status-${status}`);
  }
  async clickButton(name: string) {
    await this.page.click(`.e2e-${name}`);
  }
  async clickAddUnitBackToBase() {
    await this.page.click('#e2e-context-menu-item-force-unit-available-at-base');
  }
  async clickEndUnitOosEvent() {
    await this.page.click('#e2e-context-menu-item-manage-oos-events');
    await this.page.click('#e2e-context-menu-item-unit-oos-history');
  }
  async endUnitOosEvent() {
    await this.page.click('#e2e-edit-oos-event-button-index-0');
    await this.page.click('#e2e-end-oos-event-button');
  }
  async createUnit(eta: number, basename: string, region: string, name: string | null = null) {
    name = name ?? Date.now().toString();
    await this.page.click('.e2e-add-unit-button');
    await this.page.waitForSelector('.e2e-unit-name');
    await this.page.fill('.e2e-unit-name', `${name}`);
    await this.page.waitForSelector('.e2e-unit-abbreviation');
    await this.page.fill('.e2e-unit-abbreviation', `${name}`);
    await this.page.click('.e2e-unit-weather-status');
    await this.page.waitForSelector('.e2e-unit-weather-status-option-yellow');
    await this.page.click('.e2e-unit-weather-status-option-yellow');
    await this.page.click('.e2e-unit-region');
    await this.page.waitForSelector(`.e2e-unit-region-option-${region}`);
    await this.page.click(`.e2e-unit-region-option-${region}`);
    await this.page.fill('.e2e-unit-base >> input', `${basename}`);
    await this.page.waitForSelector(`.e2e-option-${basename}`);
    await this.page.click(`.e2e-option-${basename}`);
    await this.page.fill('.e2e-unit-on-base-eta ', `${eta}`);
    await this.page.click('.e2e-unit-maximum-flight-rule');
    await this.page.waitForSelector('.e2e-unit-maximum-flight-rule-option-ifr');
    await this.page.click('.e2e-unit-maximum-flight-rule-option-ifr');
    await this.page.click('.e2e-add-button');
    return name;
  }
  async addCrewAndVehicleToUnit(unitabbr: string, vehiclename: string) {
    await this.page.click(`#e2e-unit-card-${unitabbr} >> .e2e-context-menu-button`);
    await this.page.click('#e2e-context-menu-item-edit-details');
    //await this.page.click('.e2e-add-non-employee');
    //await this.page.fill('.e2e-first-name', 'Jake');
    //await this.page.fill('.e2e-last-name', 'Thomas');
    await this.page.click('.e2e-add-employee >> button');
    await this.page.fill('.e2e-crew-member-input >> input', 'Timothy Carpenter');
    await this.page.waitForSelector('.e2e-option-timothy-carpenter-26022749-');
    await this.page.click('.e2e-option-timothy-carpenter-26022749-');
    await this.page.fill('.e2e-crew-role', 'Pilot');
    await this.page.click('.e2e-crew-type');
    await this.page.waitForSelector('.e2e-crew-type-option-pilot');
    await this.page.click('.e2e-crew-type-option-pilot');
    await this.page.click('.e2e-flight-crew-checkbox');
    await this.page.click('.e2e-add-crew-member');
    await this.page.waitForSelector('.e2e-manage-vehicle-button');
    await this.page.click('.e2e-manage-vehicle-button');
    await this.page.waitForSelector('.e2e-vehicle >> input');
    await this.page.fill('.e2e-vehicle >> input', `${vehiclename}`);
    await this.page.waitForSelector(`.e2e-option-${vehiclename.toLowerCase()}`);
    await this.page.click(`.e2e-option-${vehiclename.toLowerCase()}`);
    await this.page.click('.e2e-assign-button');
    await this.page.click('.e2e-update-vehicle-button');
    await this.page.waitForSelector(`#e2e-unit-card-${unitabbr}.e2e-unit-status-Available`);
  }
  async disableUnit(unitabbr: string) {
    await this.page.click(`#e2e-unit-card-${unitabbr} >> .e2e-context-menu-button`);
    await this.page.click('#e2e-context-menu-item-edit-details');
    await this.page.waitForSelector('.e2e-manage-vehicle-button');
    await this.page.click('.e2e-manage-vehicle-button');
    await this.page.waitForSelector('.e2e-remove-vehicle-button');
    await this.page.click('.e2e-remove-vehicle-button');
    await this.page.waitForSelector('.disable-unit');
    await this.page.click('.disable-unit');
  }
  async removeCrewMember(unitabbr: string) {
    await this.page.click(`#e2e-unit-card-${unitabbr} >> .e2e-context-menu-button`);
    await this.page.click('#e2e-context-menu-item-edit-details');
    await this.page.click('.e2e-unit-position-menu-button');
    await this.page.click('#e2e-context-menu-item-remove-crew-member');
    await this.page.click('.e2e-update-vehicle-button');
  }
  async removeBase(unitabbr: string){
    await this.page.click(`#e2e-unit-card-${unitabbr} >> .e2e-context-menu-button`);
    await this.page.click('#e2e-context-menu-item-edit-details');
    await this.page.click('.e2e-unit-base');
    await this.page.waitForSelector('.e2e-option-dev001');
    await this.page.click('.e2e-option-dev001');
    await this.page.click('.e2e-update-vehicle-button');
  }
  async intializeOps(
    eta: number,
    basename: string,
    region: string,
    unitName: string, // | null = null,
    vehicleName: string,
  ) {
    // unitName = unitName ??  Date.now().toString();
    await this.createUnit(eta, basename, region, unitName);
    await this.addCrewAndVehicleToUnit(unitName, vehicleName);
  }
  async destroyOps(unitName: string) {
    await this.removeBase(unitName);
    await this.removeCrewMember(unitName);
    await this.disableUnit(unitName);
  }
}
