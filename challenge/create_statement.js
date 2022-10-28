class Performance {
    #audience;
    #play;
    constructor(audience, play) {
        this.#audience = audience;
        this.#play = play;
    }

    get play() {
        return this.#play;
    }

    get audience() {
        return this.#audience;
    }

    get amount() {
        let result = 0;
        switch (this.#play.type) {
            case 'tragedy': // 비극
                result = 40000;
                if (this.#audience > 30) {
                    result += 1000 * (this.#audience - 30);
                }
                break;
            case 'comedy': // 희극
                result = 30000;
                if (this.#audience > 20) {
                    result += 10000 + 500 * (this.#audience - 20);
                }
                result += 300 * performance.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${this.#play.type}`);
        }
        return result;
    }

    get credits() {
        let result = 0;
        result += Math.max(this.#audience - 30, 0);
        // 희극 관객 5명마다 추가 포인트를 제공한다.
        if ('comedy' === this.#play.type) {
            result += Math.floor(this.#audience / 5);
        }
        return result;
    }
}



export function createStatement(invoice, plays) {
    const statement = {};
    statement.customer = invoice.customer;
    statement.performances = invoice.performances.map(
        (p) => new Performance(p.audience, plays[p.playID])
    );
    statement.totalAmount = totalAmount(statement.performances);
    statement.totalCredits = totalCredits(statement.performances);
    return statement;

    function enrichPerformance(performance) {
        const result = {...performance};
        //result.play = playFor(performance);
        //result.amount = amountFor(result);
        //result.credit = creditFor(result); 
        return result;
    }

    function playFor(performance) {
        return plays[performance.playID];
    }

    function amountFor(performance) {
        let result = 0;
        switch (performance.play.type) {
            case 'tragedy': // 비극
                result = 40000;
                if (performance.audience > 30) {
                    result += 1000 * (performance.audience - 30);
                }
                break;
            case 'comedy': // 희극
                result = 30000;
                if (performance.audience > 20) {
                    result += 10000 + 500 * (performance.audience - 20);
                }
                result += 300 * performance.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${performance.play.type}`);
        }
        return result;
    }

    function creditFor(performance) {
        let result = 0;
        result += Math.max(performance.audience - 30, 0);
        // 희극 관객 5명마다 추가 포인트를 제공한다.
        if ('comedy' === performance.play.type) {
            result += Math.floor(performance.audience / 5);
        }
        return result;
        }

    function totalAmount(performances) {
        return performances.reduce((sum, p) => sum += p.amount, 0);
    }

    function totalCredits(performances) {
        return performances.reduce((sum, p) => sum += p.credit, 0);
    }
}