import 'jsdom-global/register';
import expect from 'expect';
import sinon from 'sinon';

import HijriDate, {toHijri} from '../src/safe';
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
})
