import { Page } from 'playwright-chromium';
import { sleep } from '../util/promise';
export class OrgPage {
  constructor(private readonly page: Page) {}
  async createVehicle(registrationNumber: string, type: string) {
    // REQUIRED FIELDS: Registration Number, Role, Type, FL Process, Company

    //Click on vehicles menu item
    await this.page.waitForSelector('#e2e-context-nav-vehicles');
    await this.page.click('#e2e-context-nav-vehicles');
    //Click on "Add vehicle"
    await this.page.waitForSelector('.e2e-add-vehicle-button');
    await this.page.click('.e2e-add-vehicle-button');
    // Fill in form
    // Registration number
    await this.page.waitForSelector('.e2e-vehicle-registration-number');
    await this.page.fill('.e2e-vehicle-registration-number', registrationNumber);
    // Role e2e-vehicle-role
    await this.page.waitForSelector('.e2e-vehicle-role');
    await this.page.click('.e2e-vehicle-role');
    await this.page.waitForSelector('.e2e-vehicle-role-option-Primary');
    await this.page.click('.e2e-vehicle-role-option-Primary');
    // Type e2e-vehicle-type
    // Type options are Fixed, Ground, Rotor, Unspecified
    await this.page.waitForSelector('.e2e-vehicle-type');
    await this.page.click('.e2e-vehicle-type');
    await this.page.waitForSelector(`.e2e-vehicle-type-option-${type}`);
    await this.page.click(`.e2e-vehicle-type-option-${type}`);
    // FL Process e2e-vehicle-fl-process
    await this.page.waitForSelector('.e2e-vehicle-fl-process');
    await this.page.click('.e2e-vehicle-fl-process');
    await this.page.waitForSelector('.e2e-vehicle-fl-process-option-External');
    await this.page.click('.e2e-vehicle-fl-process-option-External');
    // Company e2e-vehicle-company
    await this.page.waitForSelector('.e2e-vehicle-company');
    await this.page.click('.e2e-vehicle-company');
    await this.page.waitForSelector('.e2e-vehicle-company-option-Dev');
    await this.page.click('.e2e-vehicle-company-option-Dev');
    // Click Form Add button
    await this.page.waitForSelector('.e2e-vehicle-form-add');
    await this.page.click('.e2e-vehicle-form-add');
    // Confirm vehicle is in vehicles list table
    await this.page.waitForSelector(`.e2e-${registrationNumber}-actions`);
  }

  async deleteVehicle(registrationNumber: string) {
    // Click on vehicles menu item
    await this.page.waitForSelector('#e2e-context-nav-vehicles');
    await this.page.click('#e2e-context-nav-vehicles');
    // Click on specified vehicle action menu
    await this.page.waitForSelector(`.e2e-${registrationNumber}-actions`);
    await this.page.click(`.e2e-${registrationNumber}-actions`);
    // Click on delete
    await this.page.waitForSelector(`.e2e-${registrationNumber}-delete`);
    await this.page.click(`.e2e-${registrationNumber}-delete`);
    // Click on delete in confirm dialog
    await this.page.waitForSelector('td-dialog-actions > button.mat-button.mat-accent', {
      state: 'visible',
    });
    await this.page.click('td-dialog-actions > button.mat-button.mat-accent');
    await this.page.waitForSelector(`.e2e-${registrationNumber}-actions`, { state: 'detached' });
  }
  async createBase(
    baseName: string,
    baseAbbr: string,
    cityName: string,
    regionName: string,
    zipCodeNumber: string,
    latitude: string,
    longititude: string,
  ) {
    await this.page.waitForSelector('#e2e-context-nav-bases');
    await this.page.click('#e2e-context-nav-bases');
    await this.page.waitForSelector('.e2e-add-base');
    await this.page.click('.e2e-add-base');
    await this.page.fill('.e2e-city', cityName);
    await this.page.fill('.e2e-region', regionName);
    await this.page.fill('.e2e-zip', zipCodeNumber);
    await this.page.fill('.e2e-latitude', latitude);
    await this.page.fill('.e2e-longitude', longititude);
    await this.page.waitForSelector('.e2e-base-name');
    await this.page.fill('.e2e-base-name', baseName);
    await this.page.fill('.e2e-base-abbreviation', baseAbbr);
    await this.page.waitForSelector('.e2e-base-business-model');
    await this.page.click('.e2e-base-business-model');
    await this.page.waitForSelector('.e2e-base-business-model-option-community');
    await this.page.click('.e2e-base-business-model-option-community');
    await this.page.click('.e2e-add-base-button');
    await this.page.waitForSelector(`.e2e-base-actions-${baseAbbr}`);
  }
  async deleteBase(baseAbbr: string) {
    // Click on base menu item
    await this.page.waitForSelector('#e2e-context-nav-bases');
    await this.page.click('#e2e-context-nav-bases');
    // Click on specified BASE action menu
    await this.page.waitForSelector(`.e2e-base-actions-${baseAbbr}`);
    await this.page.click(`.e2e-base-actions-${baseAbbr}`);
    // Click on delete OPTION
    await this.page.waitForSelector(`.e2e-base-actions-delete-${baseAbbr}`);
    await this.page.click(`.e2e-base-actions-delete-${baseAbbr}`);
    // click on delete button
    await this.page.waitForSelector('td-dialog-actions > button.mat-button.mat-accent', {
      state: 'visible',
    });
    await this.page.click('td-dialog-actions > button.mat-button.mat-accent');
    await this.page.waitForSelector(`.e2e-base-actions-${baseAbbr}`, { state: 'detached' });
  }
  async intializeOrg(
    vehicleName: string,
    type: string,
    baseName: string,
    baseAbbr: string,
    cityName: string,
    state: string,
    zipCodeNumber: string,
    latitude: string,
    longititude: string,
  ) {
    await this.createVehicle(vehicleName, type);
    await this.createBase(
      baseName,
      baseAbbr,
      cityName,
      state,
      zipCodeNumber,
      latitude,
      longititude,
    );
  }
  async destroyOrg(vehicleName: string, baseAbbr: string) {
    await this.deleteVehicle(vehicleName);
    await this.deleteBase(baseAbbr);
  }
}
