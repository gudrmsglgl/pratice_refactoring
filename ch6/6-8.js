export function readingsOutsideRange(station, min, max) {
  return station.readings.filter((r) => r.temp < min || r.temp > max);
}

// refactoring1 > operationPlan 을 통째로 넘기기
export function readingsOutsideRange1(station, operationPlan) {
  return station.readings.filter((r) => r.temp < operationPlan.temperatureFloor || r.temp > operationPlan.temperatureCeiling);
}

// refactoring2 > operationPlan 을 클래스화하여 범위 계산 함수 생성 사용
export function readingsOutsideRange2(station, range) {
  return station.readings.filter((r) => range.contains(r.temp));
}

const station = {
  name: 'ZB1',
  readings: [
    { temp: 47, time: '2016-11-10 09:10' },
    { temp: 53, time: '2016-11-10 09:20' },
    { temp: 58, time: '2016-11-10 09:30' },
    { temp: 53, time: '2016-11-10 09:40' },
    { temp: 51, time: '2016-11-10 09:50' },
  ],
};

const operationPlan = {
  temperatureFloor: 51,
  temperatureCeiling: 53,
};

class NumberRange {
  #min;
  #max;

  constructor(min, max) {
    this.#min = min;
    this.#max = max;
  }

  get min() {
    return this.#min;
  }

  get max() {
    return this.#max;
  }

  contains(temperature) {
    return temperature < this.min || temperature > this.max
  }

}


readingsOutsideRange(
  station,
  operationPlan.temperatureFloor,
  operationPlan.temperatureCeiling
);

const result1 = readingsOutsideRange1(
  station,
  operationPlan
)

const result2 = readingsOutsideRange2(
  station,
  new NumberRange(51, 53)
)

console.log(result2)
