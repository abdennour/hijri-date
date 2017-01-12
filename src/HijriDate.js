import {
  GregToHijri,
  HijriToGreg,
  weekDay
} from './DateConverter';
import initializer from './initializer';
import dateFormat from './FormatDate';
import {ar, en} from './locales';

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

  get timezoneOffset() {
    return this.__proxy__.getTimezoneOffset();
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

  getTimezoneOffset() {
    return this.timezoneOffset;
  }

  addDay() {
   return this.addHours(24);
  }

  addDays(days) {
    if (typeof days  === 'number')
      Array.from({
        length: days
      }, (v, k) => k + 1).forEach(i =>
        this.addDay()
      );
    return this;
  }

  addHours(n) {
    return this.addMinutes(n * 60);
  }

  addMinutes(n) {
    return this.addSeconds(n * 60);
  }

  addSeconds(n) {
    return this.addMilliseconds(1000 * n);
  }

  addMilliseconds(n) {
    this.time +=  n;
    return this;
  }

  subtractDays(days) {
    Array.from({length: days}, (v, k) => k+1).forEach(i =>
      this.subtractDay()
    );
    return this;
  }

  subtractDay() {
   return this.subtractHours(24);
  }

  subtractHours(n) {
    return this.subtractMinutes(n * 60);
  }

  subtractMinutes(n) {
    return this.subtractSeconds(n * 60);
  }

  subtractSeconds(n) {
    return this.subtractMilliseconds(1000 * n);
  }

  subtractMilliseconds(n) {
    return this.addMilliseconds(-n);
  }

  updateProxy() {
    this.__proxy__ = HijriToGreg(this);
    return this;
  }

  toGregorian() {
    return this.__proxy__;
  }

  format(mask, options) {
    return dateFormat(this, ...arguments);
  }

  ignoreTime() {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0 ;
    this.milliseconds = 0;
    this.updateProxy();
    return this;
  }

  clone() {
    return new HijriDate(this.time);
  }

  is() {
    if (!arguments.length )
      throw new Error(`function cannot be called without arguments`);
    if (arguments.length ===1 && typeof arguments[0] === 'object' && Object.keys(arguments[0]).length)
      return Object.keys(arguments[0]).every(prop => parseInt(arguments[0][prop]) === parseInt(this[prop]))
    return Array.from(arguments).every((arg, i) => arg === this[dateProps[i]])
  }

  isToday() {
    return HijriDate.today().time == this.clone().ignoreTime().time;
  }

  isYesterday() {
    return HijriDate.yesterday().time == this.clone().ignoreTime().time;
  }

  isTomorrow() {
    return HijriDate.tomorrow().time == this.clone().ignoreTime().time;
  }

  valueOf() {
    return this.getTime();
  }

  toString() {
    return this.format('default');
  }

  static now() {
    return Date.now();
  }

  static today() {
    return new HijriDate().ignoreTime();
  }

  static yesterday() {
    return this.today().subtractDay();
  }

  static tomorrow() {
    return this.today().addDay();
  }

  static addDay() {

  }
}

HijriDate.locales = {ar,en};
HijriDate.defaultLocale = 'ar';

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

export const dateProps = [
  'year',
  'month',
  'date',
  'hours',
  'minutes',
  'seconds',
  'milliseconds'
];
export default HijriDate;
