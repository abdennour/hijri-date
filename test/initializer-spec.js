import 'jsdom-global/register';
import expect from 'expect';
import sinon from 'sinon';
import 'console-info';
import initializer from '../src/initializer';

const minExpectedProps = ['year', 'month', 'date', 'hours', 'minutes', 'seconds', 'milliseconds'];
const arrayInclusion = (bigArray, smallArray) => smallArray.every(e => bigArray.includes(e));
describe(`initializer`, () => {

  it(`initialises date props from timestamp`, () => {
    const props = initializer.init_number(Date.now());
    expect(arrayInclusion(Object.keys(props), minExpectedProps)).toBeTruthy();
  });

  it(`initialises date props by three or more numbers in the following order: ${minExpectedProps.toString()}`, () => {
    let props = initializer.init_number_number_number(Date.now());
    expect(arrayInclusion(Object.keys(props), minExpectedProps)).toBeTruthy();

    props = initializer.init_number_number_number_number(Date.now());
    expect(arrayInclusion(Object.keys(props), minExpectedProps)).toBeTruthy();

    props = initializer.init_number_number_number_number_number(Date.now());
    expect(arrayInclusion(Object.keys(props), minExpectedProps)).toBeTruthy();

    props = initializer.init_number_number_number_number_number_number(Date.now());
    expect(arrayInclusion(Object.keys(props), minExpectedProps)).toBeTruthy();

    props = initializer.init_number_number_number_number_number_number_number(Date.now());
    expect(arrayInclusion(Object.keys(props), minExpectedProps)).toBeTruthy();
  });

  it(`initialises date props from string and given format`, () => {
    const props = initializer.init_string_string('1438-05-12', 'yyyy-mm-dd');
    expect(props.year).toEqual(1438);
    expect(props.month).toEqual(5);
    expect(props.date).toEqual(12);
    expect(arrayInclusion(Object.keys(props), minExpectedProps)).toBeTruthy();
  });

  it(`initialises date props from string with the default format ${initializer.defaultFormat} if it is not given`, () => {
    const dateString = '1438/05/12';
    const props = initializer.init_string(dateString);
    const propsWithGivenFormat = initializer.init_string_string(dateString, initializer.defaultFormat);
    expect(propsWithGivenFormat).toEqual(props);
  });

  it(`initialises date props from literal object`, () => {
    const props = initializer.init_object({year: 1439, month: 12, date: 1});
    expect(arrayInclusion(Object.keys(props), minExpectedProps)).toBeTruthy();

  });
});
