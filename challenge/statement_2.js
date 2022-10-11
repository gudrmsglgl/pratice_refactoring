export function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;
    
    const ticketCalculator = new TicketCalculator(play, perf.audience);
    thisAmount += ticketCalculator.amount;
    volumeCredits += ticketCalculator.point;
    
    // 청구 내역을 출력한다.
    result += `  ${play.name}: ${format(thisAmount / 100)} (${
        perf.audience
      }석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}

class TicketCalculator {
  #ticket;
  #play;
  constructor(play, audience) {
    this.#play = play;
    this.#ticket = this.createType(play.type, audience)
  }
  
  createType(type, audience) {
    switch (type) {
      case 'tragedy':
        return new Tragedy(40000, audience);
        break;
      case 'comedy':
        return new Comedy(30000, audience);
        break;
      default:
        return new UnknownPlay(0,0);
        break;
    }
  }

  get amount() {
    return this.#ticket.amount;
  }

  get point() {
    return this.#ticket.point;
  }

  info(format, audience) {
    return `  ${this.#play.name}: ${format(this.amount / 100)} (${
      audience
    }석)\n`;
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
  get point() {
    return Math.max(this._audience - 30, 0);
  }
}

class Tragedy extends Play {
  get amount() {
    return this._audience > 30 
      ? this._amount += 1000 * (this._audience - 30) 
      : this._amount;
  }
}

class Comedy extends Play {
  get amount() {
    return this._audience > 20 
      ? this._amount += 10000 + 500 * (this._audience - 20) + (300 * this._audience)
      : this._amount += 300 * this._audience;
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
