import {
  GregToHijri,
  HijriToGreg,
  weekDay
} from './DateConverter';
import initializer from './initializer';
class HijriDate {

  constructor() {
    return this.init(...arguments);
  }

  init() {
    let props = {};
    if (!arguments.length) {
      props = initializer.initDefault();
    } else {
      try {
        let methodNameSuffix = Array.from(arguments).map((arg) => typeof arg).join('_');
        props = initializer['init_' + methodNameSuffix](...arguments);
      } catch (e) {
        throw new TypeError(hijriTypeErrorMessage + '\n--- Details:' + e);
      }
    }

    Object.keys(props).forEach((prop) => {
      this['_' + prop] = props[prop];
    });
    this.__proxy__ = HijriToGreg(this);
    this.initDayOfWeek();
    return this;

  }
  initDayOfWeek() {
    if (!this.__proxy__) return;
    this._day = this._day || this.__proxy__.getDay();
    this._dayName = this._dayName || weekDay(this._day);
  }

  get year() {
    return this._year;
  }

  set year(newYear) {
    this._year = newYear;
    this.updateProxy();
  }

  get month() {
    return this._month;
  }

  set month(newMonth) {
    this._month = newMonth;
    this.updateProxy();
  }

  get date() {
    return this._date;
  }

  set date(newDate) {
      this._date = newDate;
      this.updateProxy();
    }
    //---time getters and setters
  get time() {
    return this.__proxy__.getTime();
  }

  set time(newTime) {
    const props = initializer.init_number(newTime);
    Object.keys(props).forEach((prop) => {
      this['_' + prop] = props[prop];
    });
    this.__proxy__ = new Date(newTime);
  }

  get hours() {
    return this._hours || 0;
  }
  get minutes() {
    return this._minutes || 0;
  }

  get seconds() {
    return this._seconds || 0;
  }

  get milliseconds() {
    return this._milliseconds || 0;
  }
  set hours(hours) {
    this._hours = hours;
    this.updateProxy();
  }


  set minutes(minutes) {
    this._minutes = minutes;
    this.updateProxy();
  }

  set seconds(seconds) {
    this._seconds = seconds;
    this.updateProxy();
  }

  set milliseconds(milliseconds) {
    this._milliseconds = milliseconds;
    this.updateProxy();
  }

  get day() {
    return this._day;
  }

  get dayName() {
    return this._dayName;
  }

  getFullYear() {
    return this.year;
  }

  getMonthIndex() {
    return this.month - 1;
  }

  getMonth() {
    return this.month;
  }

  getDate() {
    return this.date;
  }

  getDay() {
    return this.day;
  }

  getHours() {
    return this.hours;
  }

  getMinutes() {
    return this.minutes;
  }

  getSeconds() {
    return this.seconds;
  }

  getMilliseconds() {
    return this.milliseconds;
  }

  getTime() {
    return this.time;
  }


  addDay() {
   this.addHours(24);
  }

  addDays(days) {
    if (typeof days  === 'number')
      Array.from({
        length: days
      }, (v, k) => k + 1).forEach(i =>
        this.addDay()
      );
  }

  addHours(n) {
    this.addMinutes(n * 60);
  }

  addMinutes(n) {
    this.addSeconds(n * 60);
  }

  addSeconds(n) {
    this.addMilliseconds(1000 * n);
  }

  addMilliseconds(n) {
    this.time +=  n;
  }

  updateProxy() {
    this.__proxy__ = HijriToGreg(this);
  }

  toGregorian() {
    return this.__proxy__;
  }

  valueOf() {
    return this.getTime();
  }

  static now() {
    return Date.now();
  }
}

const hijriTypeErrorMessage = `
  Wrong call of constructor !
  Please, try to use of the following constructors:
    ⇢ new HijriDate() ; //current date
      or
    ⇢ new HijriDate(year, month, day [, hour][, minutes][, seconds][, milliseconds]);
         .i.e: new HijriDate(1438, 12, 23)
      or
    ⇢ new HijriDate(date[, format])
         .i.e: new HijriDate('1438-12-23', 'yyyy-mm-dd')
  `;
export default HijriDate;
