class Booking {
  #show;
  #date;
  constructor(show, date) {
    this.#show = show;
    this.#date = date;
  }

  get hasTalkback() {
    return this.#premiumDelegate
      ? this.#premiumDelegate.hasTalkback
      : this.#show.hasOwnProperty('talkback') && !this.isPeakDay;
  }

  get basePrice() {
    let result = this._show.price;

    if (this.isPeakDay) {
      result += Math.round(result * 0.15);
    }

    return result;
  }

  get hasDinner() {
    return this.#premiumDelegate ? this.#premiumDelegate.hasDinner : 
  }

  #bePremium(extras) {
    this.#premiumDelegate = new PreminumBookingDelegate(this, extras);
  }

  static createBooking(show, date) {
    return new Booking(show, date);
  }

  static createPremiumBooking(show, date, extras) {
    const result = new Booking(show, date, extras);
    result.#bePremium(extras);
    return result;
  }

}

class PreminumBookingDelegate {
  #host;
  #extras;
  constructor(hostBooking, extras) {
    this.#host = hostBooking;
    this.#extras = extras;
  }

  get hasTalkback() {
    return this.#host.#show.hasOwnProperty('talkback');
  }

  get basePrice() {
    return Math.round(this.#host._privateBasePrice + this.#extras.PremiumFee);
  }

  get hasDinner() {
    return this.#extras.hasOwnProperty('dinner') && !this.isPeakDay;
  }

  extendBasePrice(base) {
    return Math.round(base + this.#extras.PremiumFee);
  }
}

const booking = Booking.createBooking(show, date);
const premiumBooking = Booking.createPremiumBooking(show, date, extras);
