class Priority {
    #value;
    constructor(value) {
        // 아무 값이나 들어와서 셋하면 안되기 때문에 유효성 검사
        if (Priority.legalValues().includes(value)) {
            this.#value = value;
        } else {
            throw new Error(`${value} is invalid for Priority`);
        }
    }

    get index() {
        return Priority.legalValues().indexOf(this.#value);
    }

    equals(other) {
        return this.index === other.index;
    }

    higherThan(other) {
        return this.index > other.index;
    }

    static legalValues() {
        return ['low', 'normal', 'high', 'rush'];
    }
}



// order 안에서 priority 가 할일이 많다면 priority 클래스를 만들어보자
export class Order {
    #priority;
    constructor(data) {
      this.#priority = data;
    }
    isHighPriority() {
      return this.#priority.higherThan(new Priority('normal'));
    }
  }
  
  const orders = [
    new Order(new Priority('normal')),
    new Order(new Priority('high')),
    new Order(new Priority('rush')),
  ];
  
  const highPriorityCount = orders.filter( (o) => o.isHighPriority() ).length;
  
  console.log(highPriorityCount);