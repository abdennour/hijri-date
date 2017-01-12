import 'jsdom-global/register';
import expect from 'expect';
import sinon from 'sinon';

import HijriDate, {toHijri} from '../src/safe';
import {dateProps} from '../src/HijriDate';
import initializer from '../src/initializer';

const ignoreMilliSeconds = (date) => date.milliseconds = 0 && delete date.__proxy__;
const expectAlmostEqual = ((date1, date2, toleranceMilliseconds = 2) => {
  expect(Math.abs(date1 - date2)).toBeGreaterThanOrEqualTo(0);
  expect(Math.abs(date1 - date2)).toBeLessThanOrEqualTo(toleranceMilliseconds);
});
describe(`hijri-date`, () => {

  it(`forwards instantiation to the suitable initializer according to constructor arguments`, () => {
    let initMethod = sinon.stub(initializer, 'init_number').returns({});
    new HijriDate(Date.now());
    expect(initMethod.calledOnce).toBeTruthy();
    initMethod.restore();

    initMethod = sinon.stub(initializer, 'init_number_number_number').returns({});
    new HijriDate(1435, 12, 11);
    expect(initMethod.calledOnce).toBeTruthy();
    initMethod.restore();

    initMethod = sinon.stub(initializer, 'init_number_number_number_number').returns({});
    new HijriDate(1435, 12, 11, 17);
    expect(initMethod.calledOnce).toBeTruthy();
    initMethod.restore();

    initMethod = sinon.stub(initializer, 'init_number_number_number_number_number').returns({});
    new HijriDate(1435, 12, 11, 17, 59);
    expect(initMethod.calledOnce).toBeTruthy();
    initMethod.restore();

    initMethod = sinon.stub(initializer, 'init_number_number_number_number_number_number').returns({});
    new HijriDate(1435, 12, 11, 17, 59, 44);
    expect(initMethod.calledOnce).toBeTruthy();
    initMethod.restore();

    initMethod = sinon.stub(initializer, 'init_number_number_number_number_number_number_number').returns({});
    new HijriDate(1435, 12, 11, 17, 59, 44, 98);
    expect(initMethod.calledOnce).toBeTruthy();
    initMethod.restore();
  });

  it(`protects itself from wrong instantiation`, () => {
    expect(() => new HijriDate(1453,'go',['please'])).toThrow();
  });



  it(`converts hijri to gregorian`, () => {
    const hijriDate = new HijriDate(1438, 4, 12);
    const gregDate = hijriDate.toGregorian();
    expect(gregDate.getFullYear()).toEqual(2017);
  });

  it(`converts gregorian to hijri`, () => {

    const gregDate = new Date(2017, 1, 10);
    const hijriDate = toHijri(gregDate);

    expect(hijriDate.year).toEqual(1438);
  });

  it(`gives today date in hijri format when no args is passed to constructor`, () => {
    const todayGreg = new Date();
    const hijriDate = toHijri(todayGreg);
    const todayHijri = new HijriDate();
    // ['year', 'month', 'day'].forEach(dateField =>
    //   expect(hijriDate[dateField]).toEqual(todayHijri[dateField])
    // );
    expectAlmostEqual(hijriDate, todayHijri);

  });

  it(`has the same getTime return as built-in Date class`, () => {
    const hijriDate = new HijriDate(1435, 9, 23);
    const gregHijri = hijriDate.toGregorian();
    expect(gregHijri.getTime()).toEqual(hijriDate.getTime());
  });

  it(`provides a set of getters like built-in Date getters` , () => {
    const y = 1438;
    const m = 12;
    const d = 20;
    const date = new HijriDate(y, m , d);
    expect(date.getFullYear()).toEqual(y);
    expect(date.getMonth()).toEqual(m);
    expect(date.getMonthIndex()).toEqual(m - 1);
    expect(date.getDate()).toEqual(d);
    expect(date.getTime()).toEqual(date.toGregorian().getTime());

  });

  it(`calculates the current time from static method`, () => {
    const now = HijriDate.now();
    const gregNow = Date.now();
    expectAlmostEqual(now, gregNow);
  });
  it(`allows modifying date's fields: year, month,date`, () => {
    const target = new HijriDate(1433, 10, 20, 10, 50,45,344);
    expect(() => target.year ++ ).toNotThrow();
    expect(() => target.month ++).toNotThrow();
    expect(() => target.date --).toNotThrow();
  });

  it(`allows modifying time's fields: hours, minutes,seconds...`, () => {
    const target = new HijriDate(1433, 10, 20, 10, 50,45,344);
    expect(() => target.hours = 11 ).toNotThrow();
    expect(() => target.minutes = 51).toNotThrow();
    expect(() => target.seconds = 47).toNotThrow();
    expect(() => target.milliseconds = 140).toNotThrow();

  });

  it(`restricts "day" field to be readOnly`, () => {
    const target = new HijriDate(1433, 10, 20);
    const newValue = (target.day >= 29) ? target.day-1 : target.day+1;

    expect(() => target.day = newValue).toThrow(TypeError);
  });

  it(`modifies date by timestamp`, () => {
    const defaultDate = 20;
    const target = new HijriDate(1433, 10, defaultDate);
    const oneDay = 24 * 60 * 60 * 1000 ;
    target.time +=oneDay;
    expect(target.date).toEqual(defaultDate+1);
  });

  it(`adds N days to date`, () => {
    let target = new HijriDate(1399, 12,15);
    target.addDays(4);
    expect(target.date).toEqual(15+4);

    target = new HijriDate(1399, 12, 29 );
    target.addDays(4);
    expect(target.year).toEqual(1400);
  });

  it(`subtract N days from date`, () => {
    let target = new HijriDate(1399, 12,15);
    target.subtractDays(4);
    expect(target.date).toEqual(15-4);

    target = new HijriDate(1399, 12, 4 );
    target.subtractDays(10);
    expect(target.month).toEqual(11);
  });

  it(`formats date according to default or given locale  `, () => {
      const format = {string: 'yyyy-mm-dd', regexp: /^(\d+)-(1[0-2]|0[1-9])-(30|[1-2][0-9]|0[1-9])$/};
      [[1436,12,20], [123, 11,30], [1395, 9, 11], [1232131,12,12]].forEach(ps =>
        expect(new HijriDate(...ps).format(format.string)).toMatch(format.regexp)
      )
  });

  it(`stringify instance with toString to be almost like toString of built-in class:Date`, () => {
    const hijri = new HijriDate();
    const gregorian = new Date();
    const hijriStrings = hijri.toString().split(' ');
    const gregorianString = gregorian.toString().split(' ');
    hijriStrings.forEach((chunk, i) =>{
      expect(isFinite(chunk)).toEqual(isFinite(gregorianString[i]));
      expect(chunk.indexOf(':')).toEqual(gregorianString[i].indexOf(':'))
    })
  });

  it(`ignores time by makeing time's fields null`, () => {
      const target= new HijriDate();
      target.ignoreTime();
      expect(target.hours).toBeFalsy();
      expect(target.minutes).toBeFalsy();
      expect(target.seconds).toBeFalsy();
      expect(target.milliseconds).toBeFalsy();
   });

   it(`clones instance`, () => {
      const origin = new HijriDate(1438, 12, 26, 4, 55, 33, 113);
      const cloned = origin.clone();
      dateProps.forEach(prop =>
        expect(cloned[prop]).toEqual(origin[prop])
      );
   });

   describe('"is" method :is(object), is(...props)', () => {
     it(`requires at least one argument`, () => {
        expect(() => new HijriDate().is()).toThrow();
     });
     it(`checks equality of instance to given props`, () => {
        const props = [1438, 11, 25, 8, 16, 55 ,222 ];
        const instance = new HijriDate(...props);
        expect(instance.is(...props)).toBeTruthy();
        expect(instance.is(...props.slice(0,-1))).toBeTruthy();
        expect(instance.is(...props.slice(0,-2))).toBeTruthy();
        expect(instance.is(...props.slice(0,-3))).toBeTruthy();
        expect(instance.is(...props.slice(0,-4))).toBeTruthy();
        expect(instance.is(...props.slice(0,-5))).toBeTruthy();
        expect(instance.is(...props.slice(0,-6))).toBeTruthy();
        expect(instance.is({year: props[0]})).toBeTruthy();
        expect(instance.is({year: props[0], milliseconds: props[6]})).toBeTruthy();
        expect(instance.is({year: props[0]+1, milliseconds: props[6]+1})).toBeFalsy();
     });
   });

   it(`checks if it is today`, () => {
      const now = new HijriDate();
      expect(now.isToday()).toBeTruthy();
      now.addDay();
      expect(now.isToday()).toBeFalsy();
      now.subtractDay();
      expect(now.isToday()).toBeTruthy();
   });


   it(`checks if it is yesterday`, () => {
     const now = new HijriDate();
     const target = now.subtractDay();
     expect(target.isYesterday()).toBeTruthy();
     target.addDay();
     expect(target.isYesterday()).toBeFalsy();
     now.subtractDay();
     expect(target.isYesterday()).toBeTruthy();
   });
   it(`checks if it is tomorrow`, () => {
     const now = new HijriDate();
     const target = now.addDay();
     expect(target.isTomorrow()).toBeTruthy();
     target.addDay();
     expect(target.isTomorrow()).toBeFalsy();
     now.subtractDay();
     expect(target.isTomorrow()).toBeTruthy();
   });


})
