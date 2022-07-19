import { acquireReading, baseRate } from './6-9.js';

const reading = acquireReading();
export const taxableCharge = reading.taxableCharge;
console.log(taxableCharge);
