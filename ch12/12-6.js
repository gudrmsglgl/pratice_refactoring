class Employee {
  #name;
  constructor(name) {
    this.#name = name;
  }

  get type() {
    return 'employee';
  }
  
  toString() {
    return `${this.#name} (${this.type})`;
  }

  // 자체적으로 타입별로 클래스 생성 못할 때 > ex. 서버에서 json 으로 받아서 생성할 때
  static createEmployee(name, type) {
    switch (type) {
      case 'engineer':
        return new Engineer(name);
      case 'salesperson':
        return new Salesperson(name);
      case 'manager':
        return new Manager(name);
      default:
        throw new Error(`${type}라는 직원 유형은 없습니다.`);
    }
  }
}

class Engineer extends Employee {
  get type() {
    return 'engineer';
  }
}

class Salesperson extends Employee {
  get type() {
    return 'salesperson';
  }
}

class Manager extends Employee {
  get type() {
    return 'manager';
  }
}

const david = new Engineer('다비드');
const bob = new Manager('밥');
