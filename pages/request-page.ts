import { Page } from 'playwright-chromium';
export class RequestPage {
  constructor(private readonly page: Page) {}
  navigate() {}
  async confirmRequestCreated() {
    await this.page.waitForSelector('.request-section');
  }
  async setSceneLocation(
    address: string,
    city: string,
    state: string,
    zip: string,
    lat: string,
    long: string,
  ) {
    await this.page.fill('.e2e-SceneLocation >> .e2e-address', `${address}`);
    await this.page.fill('.e2e-SceneLocation >> .e2e-city', `${city}`);
    await this.page.fill('.e2e-SceneLocation >> .e2e-region', `${state}`);
    await this.page.fill('.e2e-SceneLocation >> .e2e-zip', `${zip}`);
    await this.page.fill('.e2e-SceneLocation >> .e2e-latitude', `${lat}`);
    await this.page.fill('.e2e-SceneLocation >> .e2e-longitude', `${long}`);
  }
  async setSendingFacility(name: string) {
    await this.page.click('.e2e-SendingFacility');
    await this.page.click('.e2e-SendingFacility >> .search-icon');
    await this.page.waitForSelector('.e2e-medical-facility-name-input');
    await this.page.fill('.e2e-medical-facility-name-input', `${name}`);
    await this.page.waitForSelector('.e2e-location-record-0');
    await this.page.click('.e2e-location-record-0');
  }
  async setReceivingFacility(name: string) {
    await this.page.click('.e2e-ReceivingFacility');
    await this.page.click('.e2e-ReceivingFacility >> .search-icon');
    await this.page.waitForSelector('.e2e-medical-facility-name-input');
    await this.page.fill('.e2e-medical-facility-name-input', `${name}`);
    await this.page.waitForSelector('.e2e-location-record-0');
    await this.page.click('.e2e-location-record-0');
  }
  async clickAssignUnitButton() {
    await this.page.waitForSelector('.transport-offer');
    await this.page.click('#e2e-assign-unit-step');
  }
  async clickChildAssignUnitButton() {
    await this.page.waitForSelector('#e2e-assign-unit-step');
    await this.page.click('#e2e-assign-unit-step');
  }
  async confirmAssignUnitStep() {
    await this.page.waitForSelector('.candidate-unit');
  }
  async offerTransport() {
    await this.page.click('.e2e-offer-transport');
  }
  async unitAccepted() {
    await this.page.click('.e2e-unit-accepted');
  }
  async completeSafetyQuestionsForm() {
    await this.page.click('#e2e-safety-radio-no-1');
    await this.page.click('#e2e-safety-radio-no-2');
    await this.page.click('#e2e-safety-accept-button');
  }
  async confirmUnitAccepted() {
    await this.page.waitForSelector('.e2e-cancel-unit');
  }
  async closeRequestPage() {
    await this.page.click('.cancel-bar >> .close');
  }
  async bulkSkipOffer(unit: string) {
    await this.page.waitForSelector(`.e2e-transport-offer-${unit}`);
    await this.page.click(`.e2e-transport-offer-${unit} >> .e2e-bulk-skip-offer-button`);
    await this.page.fill('.e2e-bulk-skip-reason >> input', 'Other');
    await this.page.click('.e2e-option-other');
    await this.page.fill('.e2e-bulk-skip-notes', 'Test');
    await this.page.click('.e2e-bulk-skip-dialog-offer-unit-button');
  }

  async cancelRequestWithCustomerCancelledButton() {
    await this.page.click('.e2e-customer-cancelled');
    await this.page.waitForSelector('.e2e-cancellation-reason');
    await this.page.click('.e2e-cancellation-reason');
    await this.page.waitForSelector('.e2e-option-other');
    await this.page.click('.e2e-option-other');
    await this.page.fill('.e2e-cancellation-notes', `Test`);
    await this.page.waitForSelector('.e2e-cancel-request-ok-button');
    await this.page.click('.e2e-cancel-request-ok-button');
  }
  async skipTransport() {
    await this.page.click('.e2e-skip');
    await this.page.waitForSelector('.e2e-skip-transport-reason');
    await this.page.click('.e2e-skip-transport-reason');
    await this.page.waitForSelector('.e2e-option-other');
    await this.page.click('.e2e-option-other');
    await this.page.waitForSelector('.e2e-skip-transport-dialog-ok-button');
    await this.page.click('.e2e-skip-transport-dialog-ok-button');
  }
  async setPatientInfo(
    first: string,
    last: string,
    weight: number,
    mrn: string,
    drips: number,
    dob: string,
    ridealongname: string,
    ridealongweight: number,
    ridealongdob: string,
    ridealongnotes: string,
  ) {
    await this.page.fill('.e2e-patient-first-name', `${first}`);
    await this.page.fill('.e2e-patient-last-name', `${last}`);
    await this.page.fill('.e2e-patient-weight-input >> .e2e-weight-input', `${weight}`);
    await this.page.fill('.e2e-patient-mrn-input', `${mrn}`);
    await this.page.fill('.e2e-patient-drips-input', `${drips}`);
    await this.page.click('.e2e-patient-gender-select');
    await this.page.waitForSelector('.e2e-gender-option-Male');
    await this.page.click('.e2e-gender-option-Male');
    await this.page.type('.e2e-patient-dob-input >> .k-input', `${dob}`, { delay: 100 });
    await this.page.click('.e2e-ride-along-requested-select');
    await this.page.waitForSelector('.e2e-ride-along-requested-option-Yes');
    await this.page.click('.e2e-ride-along-requested-option-Yes');
    await this.page.fill('.e2e-ride-along-name-input', `${ridealongname}`);
    await this.page.fill('.e2e-ride-along-weight-input >> .e2e-weight-input', `${ridealongweight}`);
    await this.page.type('.e2e-ride-along-dob-input >> .k-input', `${ridealongdob}`, {
      delay: 100,
    });
    await this.page.fill('.e2e-patient-notes-input', `${ridealongnotes}`);
  }
  async setRequesterInfo(caller: string, callBackNumber: number, agencyName: string) {
    await this.page.click('.e2e-requester-caller');
    await this.page.type('.e2e-requester-caller', `${caller}`);
    await this.page.click('.e2e-requester-callback-number');
    await this.page.fill('.e2e-requester-callback-number >> .k-textbox', `${callBackNumber}`);
    await this.page.click('.e2e-location-input');
    await this.page.fill('.e2e-location-input', `${agencyName}`);
    await this.page.waitForSelector('.location-form-autocomplete-option');
    await this.page.click('.location-form-autocomplete-option');
    await this.page.click('.e2e-requester-requested-vehicle-type');
    await this.page.waitForSelector('.e2e-requester-requested-vehicle-type-rotorwing');
    await this.page.click('.e2e-requester-requested-vehicle-type-rotorwing');
  }
  async setChiefComplaintInfo(cheifCompalintNotes: string) {
    await this.page.click('.e2e-chief-complaint-nature');
    await this.page.waitForSelector('.e2e-option-burn-adult');
    await this.page.click('.e2e-option-burn-adult');
    await this.page.click('.e2e-chief-complaint-notes');
    await this.page.type('.e2e-chief-complaint-notes', `${cheifCompalintNotes}`);
  }
  async abortCallWithAbortButton() {
    await this.page.click('.e2e-abort-decline-unit');
    await this.page.click('.e2e-radio-2');
    await this.page.waitForSelector('.e2e-non-referral-reason');
    await this.page.click('.e2e-non-referral-reason');
    await this.page.click('.e2e-option-caller-refused');
    await this.page.click('.e2e-abort-decline-reason');
    await this.page.click('.e2e-option-asset-out-of-service');
    await this.page.click('.e2e-cancellation-reason');
    await this.page.click('.e2e-option-other');
    await this.page.fill('.e2e-cancellation-notes', `Test`);
    await this.page.click('.e2e-abort-decline-ok-button');
  }
  async goToNewCard() {
    await this.page.click('.linked-card');
  }
  async declineRequest() {
    await this.page.waitForSelector('.e2e-abort-decline-unit');
    await this.page.click('.e2e-abort-decline-unit');
    await this.page.click('.e2e-radio-2');
    await this.page.click('.e2e-non-referral-reason');
    await this.page.click('.e2e-option-caller-refused');
    await this.page.click('.e2e-abort-decline-reason');
    await this.page.click('.e2e-option-crew-comfort');
    await this.page.click('.e2e-cancellation-reason');
    await this.page.click('.e2e-option-other');
    await this.page.fill('.e2e-cancellation-notes', `Test`);
    await this.page.click('.e2e-abort-decline-ok-button');
  }
  async confirmCallDeclined() {
    await this.page.waitForSelector('.request-status--Cancelled');
  }
  async setPatientInfoForSceneCall(
    firstname: string,
    lastname: string,
    patientwt: number,
    ptdob: string,
    ptmrn: string,
  ) {
    await this.page.click('.e2e-mat-exp-pnl-patient');
    await this.page.waitForSelector('.e2e-patient-first-name');
    await this.page.click('.e2e-patient-first-name');
    await this.page.fill('.e2e-patient-first-name', `${firstname}`);
    await this.page.fill('.e2e-patient-last-name', `${lastname}`);
    await this.page.fill('.e2e-patient-weight-input >> .e2e-weight-input', `${patientwt}`);
    await this.page.click('.e2e-patient-gender-select');
    await this.page.waitForSelector('.e2e-gender-option-Male');
    await this.page.click('.e2e-gender-option-Male');
    await this.page.type('.e2e-patient-dob-input >> .k-input', `${ptdob}`, { delay: 100 });
    await this.page.fill('.e2e-patient-mrn-input', `${ptmrn}`);
  }
  async captureCardNumber() {
    await this.page.waitForSelector('.card-number');
    const test = await this.page.innerText('.card-number');
    return test;
  }
  async consoleLogCardUrl(testName: string) {
    console.log(`${testName} - Card Url: `, this.page.url());
  }
}
