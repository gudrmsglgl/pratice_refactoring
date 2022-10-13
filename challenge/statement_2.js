export function statement(invoice, plays) {
  
  const ticketCalculator = new TicketCalculator();
  ticketCalculator.addTicketUserInfo(invoice.customer);

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    ticketCalculator.createType(play.type, perf.audience);
    ticketCalculator.addAmount(ticketCalculator.amount);
    ticketCalculator.addPoint(ticketCalculator.point);
    ticketCalculator.addTicketInfo(play.name);
  }
  
  return ticketCalculator.printTicketInfo();
}

class TicketCalculator {
  #ticket;
  #totalAmount = 0;
  #totalPoint = 0;
  #ticketInfo = "";

  #format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  createType(type, audience) {
    switch (type) {
      case 'tragedy':
        this.#ticket = new Tragedy(40000, audience);
        break;
      case 'comedy':
        this.#ticket = new Comedy(30000, audience);
        break;
      default:
        this.#ticket = new UnknownPlay(0,0);
        break;
    }
  }

  get amount() {
    console.log('get amount call');
    return this.#ticket.amount;
  }

  get totalAmount() {
    return this.#totalAmount;
  }

  get totalPoint() {
    return this.#totalPoint;
  }

  get point() {
    return this.#ticket.point;
  }

  addAmount(param) {
    this.#totalAmount += param;
  }

  addPoint(param) {
    this.#totalPoint += param;
  }

  addTicketUserInfo(customer) {
    this.#ticketInfo += `청구 내역 (고객명: ${customer})\n`;
  }

  addTicketInfo(name) {
    this.#ticketInfo += `  ${name}: ${this.#format(this.amount / 100)} (${
        this.#ticket.audience
    }석)\n`;
  }

  printTicketInfo() {
    this.#ticketInfo += `총액: ${this.#format(this.#totalAmount / 100)}\n`;
    this.#ticketInfo += `적립 포인트: ${this.#totalPoint}점\n`;
    return this.#ticketInfo;
  }
  
}

class Play {
  _amount;
  _audience;
  constructor(amount, audience) {
    this._amount = amount;
    this._audience = audience;
  }
  get amount() {
    return this._amount;
  }
  get audience() {
    return this._audience;
  }
  get point() {
    return Math.max(this._audience - 30, 0);
  }
}

class Tragedy extends Play {
  get amount() {
    let result = 0;
    return this._audience > 30 
      ? result += this._amount + 1000 * (this._audience - 30) 
      : result += this._amount;
  }
}

class Comedy extends Play {
  get amount() {
    let result = 0;
    return this._audience > 20 
      ? result += this._amount + 10000 + 500 * (this._audience - 20) + (300 * this._audience)
      : result += this._amount + 300 * this._audience;
  }
  get point() {
    let result = super.point;
    return result += Math.floor(this._audience / 5);
  }
}

class UnknownPlay extends Play {

}

// 사용예:
const playsJSON = {
  hamlet: { name: 'Hamlet', type: 'tragedy' },
  'as-like': { name: 'As You Like It', type: 'comedy' },
  othello: { name: 'Othello', type: 'tragedy' },
};

const invoicesJSON = [
  {
    customer: 'BigCo',
    performances: [
      {
        playID: 'hamlet',
        audience: 55,
      },
      {
        playID: 'as-like',
        audience: 35,
      },
      {
        playID: 'othello',
        audience: 40,
      },
    ],
  },
];

const result = statement(invoicesJSON[0], playsJSON);
const expected =
  '청구 내역 (고객명: BigCo)\n' +
  '  Hamlet: $650.00 (55석)\n' +
  '  As You Like It: $580.00 (35석)\n' +
  '  Othello: $500.00 (40석)\n' +
  '총액: $1,730.00\n' +
  '적립 포인트: 47점\n';
console.log(result);
console.log(result === expected);
