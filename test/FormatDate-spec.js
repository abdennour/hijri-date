import 'jsdom-global/register';
import expect from 'expect';
import sinon from 'sinon';
import 'console-info';
import formatDate, {
  masks
} from '../src/FormatDate';
import HijriDate from '../src/safe';

const format2digits = (field) => (field >= 10) ? String(field) : '0' + field;
const format3digits = (field) => (field >= 100) ? String(field) : '0' + format2digits(field);
const range = (length) => Array.from({
  length
}, (v, k) => k + 1);
describe(`format-date`, () => {
  const fields = {
    year: 1440,
    month: 10,
    date: 3,
    hours: 7,
    minutes: 28,
    seconds: 46,
    milliseconds: 333
  };
  const aDate = new HijriDate(fields);

  it(`gives ready masks : \n${Object.keys(masks).map(k => '\t‣ '+k+'⇢  '+masks[k]).join('\n')}`, () => {
    let expected = `03 1440 07:28:46`;
    expect(formatDate(aDate, 'default')).toInclude(expected);
    expected = '10/3/40';
    expect(formatDate(aDate, 'shortDate')).toEqual(expected);
    expected = `3, 1440`;
    expect(formatDate(aDate, 'mediumDate')).toInclude(expected);
    expected = `7:28 AM`;
    expect(formatDate(aDate, 'shortTime')).toInclude(expected);

  });

  it(`parses date according to any given mask`, () => {
    const anyMask = `HH:MM dddd , dd mmmm yyyy`;
    const locale = 'en';
    const actualDayOfWeek  = aDate.getDay();

    const expected = {
      dayName: HijriDate.locales[locale].dayNames[(actualDayOfWeek === 7 ? 0 : actualDayOfWeek+1)+7],
      monthName: HijriDate.locales[locale].monthNames[12 + aDate.getMonthIndex()]
    };



    expect(formatDate(aDate, anyMask, {
        locale
      }))
      .toEqual(`07:28 ${expected.dayName } , 03 ${expected.monthName} 1440`)
  });

  it(`supports i18n of العربية and english`, () => {
    const aMask = 'mmmm yyyy';
    const formatArabic = () => formatDate(aDate, aMask, {
      locale: 'ar'
    });
    const formatEnglish = () => formatDate(aDate, aMask, {
      locale: 'en'
    });
    expect(formatArabic).toNotThrow();
    expect(formatEnglish).toNotThrow();
    expect(formatArabic()).toNotEqual(formatEnglish());
  });

  it(`does not support yet other locales like french,german,....`, () => {
    const formatFrench = () => formatDate(aDate, aMask, {
      locale: 'fr'
    });
    expect(formatFrench).toThrow();

  });

  it(`accepts plugin for other locales`, () => {
    const locale = 'emoji';
    const aMask = 'ddd mmmm yyyy';
    const formatWithNewLocale = () => formatDate(aDate, aMask, {
      locale
    });
    expect(formatWithNewLocale).toThrow();
    const addPlugin = (() =>
      HijriDate.locales[locale] = {
        dayNames: range(7*2).map(e => '☕️'),
        monthNames: range(12*2).map(e => '🗓'),
      }
    )();
   expect(formatWithNewLocale).toNotThrow();
   expect(formatWithNewLocale()).toEqual('☕️ 🗓 1440');
   const restore =(() => delete HijriDate.locales[locale])();
  });

})
