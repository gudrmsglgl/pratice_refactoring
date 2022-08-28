import { extend } from 'lodash';

export class Site {
  constructor(customer) {
    this._customer = customer;
  }

  get customer() {
    return this._customer === 'unknown'
     ? new UnknownCustomer()
     : new Customer(this._customer);
  }
}

class UnknownCustomer extends Customer {
  get name() {
    return 'occupant';
  }
}

export class Customer {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get billingPlan() {
    //
  }

  set billingPlan(arg) {
    //
  }

  get paymentHistory() {
    //
  }
}

// 사용하는 부분
export function customerName(site) {
  const aCustomer = site.customer;
  return aCustomer.name;
}
