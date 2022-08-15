class Person {
  #name;
  #telephoneNumber;
  constructor(name, areaCode, number) {
    this.#name = name;
    this.#telephoneNumber = new TelephoneNumber(areaCode, number);
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
    return this.#telephoneNumber.areaCode;
  }
  // 참조를 마치 값처럼 사용하게 만들기(Immutable)
  set officeAreaCode(value) {
    this.#telephoneNumber = new TelephoneNumber(value, this.officeNumber);
  }

  get officeNumber() {
    return this.#telephoneNumber.number;
  }
  // 참조를 마치 값처럼 사용하게 만들기(Immutable)
  set officeNumber(value) {
    this.#telephoneNumber = new TelephoneNumber(this.officeAreaCode, value);
  }
}

class TelephoneNumber {
  #areaCode;
  #number;
  constructor(area, number) {
    this.#areaCode = area;
    this.#number = number;
  }

  get areaCode() {
    return this.#areaCode;
  }

  get number() {
    return this.#number;
  }

  get toString() {
    return `(${this.#areaCode}) ${this.#number}`;
  }
}

const person = new Person('엘리', '010', '12345678');
console.log(person.name);
console.log(person.officeAreaCode);
console.log(person.officeNumber);
console.log(person.telephoneNumber);
