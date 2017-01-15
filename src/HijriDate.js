import {
  GregToHijri,
  HijriToGreg,
  weekDay
} from './DateConverter';
import initializer from './initializer';
import dateFormat from './FormatDate';
import {
  ar,
  en
} from './locales';

/**
  The class which handles Hijri 🌙 instances

  @example  new HijriDate(); //now
            new HijriDate(1438, 12, 10) ; // يوم عيد الأضحى لسنة ١٤٣٨
            new HijriDate(1438,7, 20, 18, 50, 44, 333); //  Monday Rajab 20 1438 18:50:44
            new HijriDate({year:1355, hours:17}); // Tue Muharram 01 1355 17:00:00
            new HijriDate(1484408713014);


            new HijriDate().toGregorian(); //  === new Date();
            new Date().toHijri(); //  === new HijriDate();
 */
class HijriDate {

  /**
   *
   * @param {number} time numeric value of the specified date as the number of milliseconds since Shawwal 23, 1389, 00:00:00 UTC (January 1, 1970, 00:00:00 UTC)
   * @example new HijriDate(1435454346342) // Sunday Ramadan 12 1436 04:19:06
   */


  /**
   * @param {number} year the hijri year .
   * @param {number} month  [1, 12] range .
   * @param {number} [date=1] the date of the month🌔 ∈ {1, 30} .
   * @param {number} [hours=0] ⏰ ∈ {0, 23} .
   * @param {number} [minutes=0] 🕔 ∈ {0,59} .
   * @param {number} [seconds=0] 🕰 ∈ {0,59} .
   * @param {number} [milliseconds 0] 🕰 ∈ {0,999} .
   *
   * @example  new HijriDate(1450, 3) ; //Sun Rabee1 01 1450 00:00:00
               new HijriDate(1450, 3, 5) ; //Thu Rabee1 05 1450 00:00:00
               new HijriDate(1450, 3, 5, 17) ; //Thu Rabee1 05 1450 17:00:00
               new HijriDate(1450, 3, 5, 16, 44) ; //Thu Rabee1 05 1450 16:44:00
               new HijriDate(1450, 3, 5, 16, 44, 58) ; //Thu Rabee1 05 1450 16:44:58
   */

  /**
   * @param {string} date stringified date
   * @param {string} [format = 'yyyy/mm/dd'] a compatible format with the date passed as string in the 1ˢᵗ argument.
   * @example    new HijriDate('10-09-1538', 'dd-mm-yyyy'); // Thu Rmdn 10 1538 00:00:00
                 new HijriDate('100 years since 04-1348','100 years since mm-yyyy' ); // Wed Rab2 01 1338 00:00:00
   */
  /**
  * @param {Object} dateProps literal object contains date properties .
  * @param {number} dateProps.year  the year is required .
  * @param {number} [dateProps.month = 1]  [1, 12] range .
  * @param {number} [dateProps.date = 1] the date of the month🌔 ∈ {1, 30} .
  * @param {number} [dateProps.hours = 0] ⏰ ∈ {0, 23} .
  * @param {number} [dateProps.minutes = 0] 🕔 ∈ {0,59} .
  * @param {number} [dateProps.seconds = 0] 🕰 ∈ {0,59} .
  * @param {number} [dateProps.milliseconds = 0] 🕰 ∈ {0,999} .
  *
  * @example    new HijriDate({year: 1430, minutes: 54}) // 01-01-1430 00:54:00
                new HijriDate({year: 1504, hours: 17, seconds:44}) // 01-01-1504 17:00:44
   */
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
        throw new TypeError(hijriTypeErrorMessage + '\n--- Details:\n' + e);
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
    /**
     * Get the year
     * @returns {number} the year
     */

  get year() {
    return this._year;
  }

  /**
   * Set the year
   * @param {number} newYear year modifier of the instance.
   * @returns {undefined} nothing
   *
   * @example   const d1 = new HijriDate(1399, 10, 25);
                d1.year += 2;
                assertEqual(d1.year === 1401);
   */
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

  /**
   * This method adds 1 day (24 hours) to the instance.
   * @returns {HijriDate} the instance itself after adding 1 day.
   */
  addDay() {
      return this.addHours(24);
    }
    /**
     * This method adds n day(s) to the instance.
     * @param {number} days number of days to add .
     * @returns {HijriDate} the instance itself after adding n day(s).
     */
  addDays(days) {
      if (typeof days === 'number')
        Array.from({
          length: days
        }, (v, k) => k + 1).forEach(i =>
          this.addDay()
        );
      return this;
    }
    /**
     * TODO
     */
  addHours(n) {
    return this.addMinutes(n * 60);
  }

  /**
   * TODO
   */
  addMinutes(n) {
    return this.addSeconds(n * 60);
  }

  /**
   * TODO
   */
  addSeconds(n) {
    return this.addMilliseconds(1000 * n);
  }

  /**
   * TODO
   */
  addMilliseconds(n) {
    this.time += n;
    return this;
  }

  /**
   * TODO
   */
  subtractDays(days) {
    Array.from({
      length: days
    }, (v, k) => k + 1).forEach(i =>
      this.subtractDay()
    );
    return this;
  }

  /**
   * TODO
   */
  subtractDay() {
    return this.subtractHours(24);
  }

  /**
   * TODO
   */
  subtractHours(n) {
    return this.subtractMinutes(n * 60);
  }

  /**
   * TODO
   */
  subtractMinutes(n) {
    return this.subtractSeconds(n * 60);
  }

  /**
   * TODO
   */
  subtractSeconds(n) {
    return this.subtractMilliseconds(1000 * n);
  }

  /**
   * TODO
   */
  subtractMilliseconds(n) {
    return this.addMilliseconds(-n);
  }

  /**
   * TODO
   */
  updateProxy() {
    this.__proxy__ = HijriToGreg(this);
    return this;
  }

  /**
   * TODO
   */
  toGregorian() {
    return this.__proxy__;
  }

  /**
   * TODO
   */
  format(mask, options) {
    return dateFormat(this, ...arguments);
  }

  /**
   * TODO
   */
  ignoreTime() {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.milliseconds = 0;
    this.updateProxy();
    return this;
  }

  /**
   * TODO
   */
  clone() {
    return new HijriDate(this.time);
  }

  /**
   * TODO
   */
  is() {
    if (!arguments.length)
      throw new Error(`function cannot be called without arguments`);
    if (arguments.length === 1 && typeof arguments[0] === 'object' && Object.keys(arguments[0]).length)
      return Object.keys(arguments[0]).every(prop => parseInt(arguments[0][prop]) === parseInt(this[prop]))
    return Array.from(arguments).every((arg, i) => arg === this[dateProps[i]])
  }

  /**
   * TODO
   */
  isToday() {
    return HijriDate.today().time == this.clone().ignoreTime().time;
  }

  /**
   * TODO
   */
  isYesterday() {
    return HijriDate.yesterday().time == this.clone().ignoreTime().time;
  }

  /**
   * TODO
   */
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

  ////TODO
  // static addDay() {
  //
  // }
}

HijriDate.locales = {
  ar,
  en
};
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
