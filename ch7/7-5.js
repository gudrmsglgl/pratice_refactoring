class Person {
  #name;
  #telephoneNumber;
  constructor(name, telephoneNumber) {
    this.#name = name;
    this.#telephoneNumber = telephoneNumber
  }

  get name() {
    return this.#name;
  }

  set name(arg) {
    this.#name = arg;
  }

  get telephoneNumber() {
    return this.#telephoneNumber.toString;
  }

  get officeAreaCode() {
    return this.#telephoneNumber.officeAreaCode;
  }

  get officeNumber() {
    return this.#telephoneNumber.officeNumber;
  }

}

class TelephoneNumber {
  #officeAreaCode;
  #officeNumber;
  constructor(areaCode, number) {
    this.#officeAreaCode = areaCode;
    this.#officeNumber = number;
  }

  get toString() {
    return `(${this.officeAreaCode}) ${this.officeNumber}`;
  }

  get officeAreaCode() {
    return this.#officeAreaCode;
  }

  set officeAreaCode(arg) {
    this.#officeAreaCode = arg;
  }

  get officeNumber() {
    return this.#officeNumber;
  }

  set officeNumber(arg) {
    this.#officeNumber = arg;
  }

}
const phone = new TelephoneNumber('010', '12349987')
const person = new Person('david', phone);
console.log(person.name);
console.log(person.officeAreaCode);
console.log(person.officeNumber);
console.log(person.telephoneNumber);
