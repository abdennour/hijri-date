import {
  GregToHijri,
  HijriToGreg
} from './DateConverter';
import helper from './Initializer';
class HijriDate {

  constructor() {
    this.init(...arguments);
    return this;
  }

  init() {
    let props = {};
    if (!arguments.length) {
      props = helper.initDefault();
    } else if ( arguments.length >= 3 ) {
      props = helper.initNumbers(...arguments);
    } else {
      throw new Error(`
        Wrong call of constructor:
          ⇢ new HijriDate() ; //current date
            or
          ⇢ new HijriDate(year, month, day [, hour][, minutes][, seconds][, milliseconds]);
        `)
    }

    Object.keys(props).forEach((prop) => {
      this[prop] = props[prop];
    });

  }

  getHours() {
    return this.hours || 0;
  }

  getMinutes() {
    return this.minutes || 0;
  }

  getSeconds() {
    return this.seconds || 0;
  }

  getMilliseconds() {
    return this.milliseconds || 0;
  }

  getTime() {
    return this.toGreg().getTime();
  }

  toGreg() {
    return HijriToGreg(this);
  }

  static now() {
    return Date.now();
  }
}

export default HijriDate;
