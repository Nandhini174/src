import { Page } from 'playwright-chromium';
export class CardDetailPage {
  constructor(private readonly page: Page) {}
  navigate() {}
  async depart() {
    await this.page.click('.e2e-depart');
    await this.page.click('#e2e-flight-plan-ok');
  }
  async arrive() {
    await this.page.click('.e2e-arrive');
  }
  async closeCard() {
    await this.page.waitForSelector('.e2e-close-card');
    await this.page.click('.e2e-close-card');
    await this.page.click('.e2e-close-card-ok');
  }
  async cancelRequest() {
    await this.page.waitForSelector('.e2e-abort-or-cancel');
    await this.page.click('.e2e-abort-or-cancel');
    await this.page.click('.e2e-radio-4');
    await this.page.click('.e2e-cancellation-reason');
    await this.page.click('.e2e-option-other');
    await this.page.fill('.e2e-cancellation-notes', `Test`);
    await this.page.click('.e2e-ok-button');
  }
  async goToRegionBaord() {
    await this.page.click('div.region');
  }
  async confirmCallCancelled() {
    await this.page.waitForSelector('.request-status--Cancelled');
  }
  async confirmCChildCardPageLoaded() {
    await this.page.waitForSelector('.request-status--Offering');
  }
  async  ValidatePatientInfo(patientFirstName: string, 
    patientLastName: string,
    gender: string,
    weight: string,
    mrn: string,
    drips: string,
    patientNotes: string,
    rideAlongRequested: string,
    rideAlongWeight: string,
    rideAlongName: string,
    rideAlongAge: string ){
    expect((await this.page.innerHTML(`.e2e-patient-detail-grid-${patientFirstName.toLowerCase()}-${patientLastName.toLowerCase()} >> .e2e-patient-age-gender`)).trim()).toBe(gender.trim());
    expect((await this.page.innerHTML(`.e2e-patient-detail-grid-${patientFirstName.toLowerCase()}-${patientLastName.toLowerCase()} >> .e2e-patient-weight`)).trim()).toBe(weight.trim());
    expect((await this.page.innerHTML(`.e2e-patient-detail-grid-${patientFirstName.toLowerCase()}-${patientLastName.toLowerCase()} >> .e2e-patient-mrn`)).trim()).toContain(mrn.trim());
    expect((await this.page.innerHTML(`.e2e-patient-detail-grid-${patientFirstName.toLowerCase()}-${patientLastName.toLowerCase()} >> .e2e-patient-drips`)).trim()).toContain(drips.trim());
    expect((await this.page.innerHTML(`.e2e-patient-detail-grid-${patientFirstName.toLowerCase()}-${patientLastName.toLowerCase()} >> .e2e-patient-notes`)).trim()).toContain(patientNotes.trim());
    expect((await this.page.innerHTML(`.e2e-patient-detail-grid-${patientFirstName.toLowerCase()}-${patientLastName.toLowerCase()} >> .e2e-patient-ride-along-requested`)).trim()).toContain(rideAlongRequested.trim());
    expect((await this.page.innerHTML(`.e2e-patient-detail-grid-${patientFirstName.toLowerCase()}-${patientLastName.toLowerCase()} >> .e2e-patient-ride-along-weight`)).trim()).toContain(rideAlongWeight.trim());
    expect((await this.page.innerHTML(`.e2e-patient-detail-grid-${patientFirstName.toLowerCase()}-${patientLastName.toLowerCase()} >> .e2e-patient-ride-along-name`)).trim()).toContain(rideAlongName.trim());
    expect((await this.page.innerHTML(`.e2e-patient-detail-grid-${patientFirstName.toLowerCase()}-${patientLastName.toLowerCase()} >> .e2e-patient-ride-along-age`)).trim()).toContain(rideAlongAge.trim());  
  }
  async  ValidateRequesterInfo(requesterName: string,
    requesterPhoneNumber: string,
    requesterAgency: string
     ){
    expect((await this.page.innerHTML(`.e2e-requester-caller`)).trim()).toContain(requesterName.trim());
    expect((await this.page.innerHTML(`.e2e-requester-callback-number`)).trim()).toContain(requesterPhoneNumber.trim());
    expect((await this.page.innerHTML(`.e2e-requester-agency`)).trim()).toContain(requesterAgency.trim());     
  }
   async ValidateChiefComplaintInfo(chiefNotes: string
   ){
    expect((await this.page.innerHTML(`.e2e-chief-complaint-notes`)).trim()).toContain(chiefNotes.trim());   
  }    
  async editRequest() {
    await this.page.click('.edit-request >> mat-icon');
  }
  async abortFromContextMenu(){
    await this.page.click('.e2e-abort-or-cancel');
    await this.page.click('.e2e-radio-1');
    await this.page.click('.e2e-abort-decline-reason');
    await this.page.click('.e2e-option-crew-comfort');
    await this.page.click('.e2e-abort-decline-ok-button');    
 } 
  async goToParentCard() {
    await this.page.click('.linked-card');   
    await this.page.waitForSelector('.e2e-precautionary-landing');
}
async goToPrimaryCard() {
  await this.page.click('.linked-card');  
}
async editRequestChild() {
  await this.page.waitForSelector('.e2e-cancel');
  await this.page.click('.edit-request >> mat-icon');
}
async arriveParentCard() {
  await this.page.waitForSelector('.e2e-precautionary-landing');
  await this.page.click('.e2e-arrive');
}
async abortFromContextMenuThirdParty(){
  await this.page.click('.e2e-abort-or-cancel');
  await this.page.click('.e2e-radio-3');
  await this.page.click('.e2e-abort-decline-reason');
  await this.page.click('.e2e-option-crew-comfort');
  await this.page.click('.e2e-abort-decline-ok-button');    
} 
async departGroundUnit() {
  await this.page.click('.e2e-depart');
  await this.page.click('.e2e-gnd-ok-button');
}
async arriveGroundUnit() {
  await this.page.click('.e2e-arrive');
  await this.page.click('.e2e-gnd-ok-button');
}
async  ValidateCardNumber(cardNumber: string
   ){
  expect((await this.page.innerHTML('.card-number')).trim()).toContain(cardNumber.slice(-12));
}
async createGroundTransport(name: string)  {
  await this.page.click('.e2e-card-detail-arrange-trn-SendingFacility');
  await this.page.click('.e2e-grn-leg-rdo-ExternalAgency');
  await this.page.click('.e2e-location-input');
  await this.page.click('tcs-location-form >> .search-icon');
  await this.page.waitForSelector('.e2e-medical-facility-name-input');
  await this.page.fill('.e2e-medical-facility-name-input', `${name}`);
  await this.page.waitForSelector('.e2e-location-record-0');
  await this.page.click('.e2e-location-record-0');
  await this.page.click('.e2e-grnd-leg-ok');
}
async  completeGroundTransport() {
  await this.page.click('.e2e-card-detail-view-trn-SendingFacility');
  await this.page.click('.e2e-grnd-leg-act-btn-confirm');
  await this.page.click('.e2e-grnd-leg-act-btn-depart-lz');
  await this.page.click('.e2e-grnd-leg-act-btn-arrive-dest');
  await this.page.click('.e2e-grnd-leg-act-btn-depart-dest');
  await this.page.click('.e2e-grnd-leg-act-btn-arrive-lz');
  await this.page.click('.e2e-grnd-leg-ok');
} 
async closeCardCS() {
  await this.page.waitForSelector('.e2e-close-card');
  await this.page.click('.e2e-close-card');
  await this.page.fill('.e2e-close-card-cmts', 'Test');
  await this.page.click('.e2e-close-card-ovrd-gmr-cad');
  await this.page.click('.e2e-close-card-ok');
}
async  validatePatientInformtion(patientFirstName: string, 
  patientLastName: string,
  gender: string,
  weight: string,
  mrn: string,
  drips: string,
  patientNotes: string,
  rideAlongRequested: string,
  rideAlongWeight: string,
  rideAlongName: string,
  rideAlongAge: string ){
  expect((await this.page.innerHTML(`.e2e-patient-detail-grid-${patientFirstName.toLowerCase()}-${patientLastName.toLowerCase()} >> .e2e-patient-age-gender`)).trim()).toBe(gender.trim());
  expect((await this.page.innerHTML(`.e2e-patient-detail-grid-${patientFirstName.toLowerCase()}-${patientLastName.toLowerCase()} >> .e2e-patient-weight`)).trim()).toBe(weight.trim());
  expect((await this.page.innerHTML(`.e2e-patient-detail-grid-${patientFirstName.toLowerCase()}-${patientLastName.toLowerCase()} >> .e2e-patient-mrn`)).trim()).toContain(mrn.trim());
  expect((await this.page.innerHTML(`.e2e-patient-detail-grid-${patientFirstName.toLowerCase()}-${patientLastName.toLowerCase()} >> .e2e-patient-drips`)).trim()).toContain(drips.trim());
  expect((await this.page.innerHTML(`.e2e-patient-detail-grid-${patientFirstName.toLowerCase()}-${patientLastName.toLowerCase()} >> .e2e-patient-notes`)).trim()).toContain(patientNotes.trim());
  expect((await this.page.innerHTML(`.e2e-patient-detail-grid-${patientFirstName.toLowerCase()}-${patientLastName.toLowerCase()} >> .e2e-patient-ride-along-requested`)).trim()).toContain(rideAlongRequested.trim());
  expect((await this.page.innerHTML(`.e2e-patient-detail-grid-${patientFirstName.toLowerCase()}-${patientLastName.toLowerCase()} >> .e2e-patient-ride-along-weight`)).trim()).toContain(rideAlongWeight.trim());
  expect((await this.page.innerHTML(`.e2e-patient-detail-grid-${patientFirstName.toLowerCase()}-${patientLastName.toLowerCase()} >> .e2e-patient-ride-along-name`)).trim()).toContain(rideAlongName.trim());
  expect((await this.page.innerHTML(`.e2e-patient-detail-grid-${patientFirstName.toLowerCase()}-${patientLastName.toLowerCase()} >> .e2e-patient-ride-along-age`)).trim()).toContain(rideAlongAge.trim());  
}
async precautionaryLandingFromContextMenuExt(
  city: string,
  state: string,
  zip: string,
  lat: string,
  long: string,
  agency: string,
 ){
  await this.page.click('.e2e-precautionary-landing');
  await this.page.fill('.e2e-city', `${city}`);
  await this.page.fill('.e2e-region', `${state}`);
  await this.page.fill('.e2e-zip', `${zip}`);
  await this.page.fill('.e2e-latitude', `${lat}`);
  await this.page.fill('.e2e-longitude', `${long}`);
  await this.page.click('.e2e-other-unit-checkbox ');
  await this.page.click('.e2e-abort-reason');
  await this.page.click('.e2e-option-crew-comfort');
  await this.page.click('.e2e-third-party-radio');
  await this.page.click('.e2e-agency-option >> .search-icon');
  await this.page.waitForSelector('.e2e-medical-facility-name-input');
  await this.page.fill('.e2e-medical-facility-name-input', `${agency}`);
  await this.page.waitForSelector('.e2e-location-record-0');
  await this.page.click('.e2e-location-record-0');
  await this.page.click('.e2e-crew-return-to-aircraft');
  await this.page.click('.e2e-ok-button');  
}
async  validateCrewMember(crewMember1: string
  ){
 expect((await this.page.innerHTML('.e2e-CrewMember.passenger-name')).trim()).toContain(crewMember1);
}
async  validateAddress(parentPostAddress: string
  ){
 expect((await this.page.innerHTML('.e2e-Post-address')).trim()).toContain(parentPostAddress);
}
async  validatePLAddress(pcLoc: string
  ){
 expect((await this.page.innerHTML('.e2e-Other-address')).trim()).toContain(pcLoc);
}
async  validatePLAddress2(pcLoc: string
  ){
 expect((await this.page.innerHTML('.e2e-Other-address')).trim()).toContain(pcLoc);
}
async  validateSendingAddress(sgLoc: string
  ){
 expect((await this.page.innerHTML('.e2e-SendingFacility-address')).trim()).toContain(sgLoc);
}
async  validateReceivingAddress(rgLoc: string
  ){
 expect((await this.page.innerHTML('.e2e-ReceivingFacility-address')).trim()).toContain(rgLoc);
}
async  validatePLAddress3(pcLoc: string
  ){
 expect((await this.page.innerHTML('.e2e-RendezvousPoint-address')).trim()).toContain(pcLoc);
}
async precautionaryLandingFromContextMenuInt(
  city: string,
  state: string,
  zip: string,
  lat: string,
  long: string,
 ){
  await this.page.click('.e2e-precautionary-landing');
  await this.page.fill('.e2e-city', `${city}`);
  await this.page.fill('.e2e-region', `${state}`);
  await this.page.fill('.e2e-zip', `${zip}`);
  await this.page.fill('.e2e-latitude', `${lat}`);
  await this.page.fill('.e2e-longitude', `${long}`);
  await this.page.click('.e2e-other-unit-checkbox ');
  await this.page.click('.e2e-abort-reason');
  await this.page.click('.e2e-option-crew-comfort');
  await this.page.click('.e2e-internal-unit-radio');
  await this.page.click('.e2e-company-option');
  await this.page.waitForSelector('.e2e-option-dev004-dev004');
  await this.page.click('.e2e-option-dev004-dev004');
  await this.page.click('.e2e-ok-button');  
}
async  validateScnCallPatientInformtion(patientScnFirstName: string, 
   patientScnLastName: string,
   patientScnGender: string,
   patientScnWeight: string,
   patientmrn: string
  ){
  expect((await this.page.innerHTML(`.e2e-patient-detail-grid-${patientScnFirstName.toLowerCase()}-${patientScnLastName.toLowerCase()} >> .e2e-patient-age-gender`)).trim()).toBe(patientScnGender.trim());
  expect((await this.page.innerHTML(`.e2e-patient-detail-grid-${patientScnFirstName.toLowerCase()}-${patientScnLastName.toLowerCase()} >> .e2e-patient-weight`)).trim()).toBe(patientScnWeight.trim());
  expect((await this.page.innerHTML(`.e2e-patient-detail-grid-${patientScnFirstName.toLowerCase()}-${patientScnLastName.toLowerCase()} >> .e2e-patient-mrn`)).trim()).toContain(patientmrn.trim());
 }
}

