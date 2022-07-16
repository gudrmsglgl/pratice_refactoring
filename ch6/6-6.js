let defaultOwner = { firstName: '마틴', lastName: '파울러' };

// swallow copy - spread operator
export function getDefaultOwner() {
  return { ...defaultOwner }
}

// class 로 만들어 getter 만 제공하기
class Person {
  #firstName;
  #lastName;

  constructor(data) {
    this.#firstName = data.firstName;
    this.#lastName = data.lastName;
  }

  get firstName() {
    return this.#firstName;
  }

  get lastName() {
    return this.#lastName;
  }

  toString() {
    return { firstName: this.firstName, lastName: this.lastName };
  }
}

let defaultOwner2 = new Person({ firstName: '마틴', lastName: '파울러' });

export function getDefaultOwner2() {
  return defaultOwner2;
}

