export class Shipment {
  #shippingCompany;
  #trackingNumber;
  
  constructor(trackingNumber, shippingCompany) {
    this.#trackingNumber = trackingNumber;
    this.#shippingCompany = shippingCompany;
  }

  get trackingInfo() {
    return `${this.#shippingCompany}: ${this.#trackingNumber}`;
  }

  set shippingCompany(value) {
    this.#shippingCompany = value;
  }

}

const shipment = new Shipment(999, 'Maersk');
console.log(shipment.trackingInfo);

shipment.shippingCompany = 'COSCO';
console.log(shipment.trackingInfo);
