import 'jsdom-global/register';
import expect from 'expect';
import sinon from 'sinon';

import StringDateParser from '../src/StringDateParser';
const ignoreMilliSeconds = (date) => date.milliseconds = 0;

describe(`string-date-parser`, () => {
  let dateString, dateFormat;
  beforeEach(() => {
    dateString = 'Eïd  Al-Adha of this year will be : 10-12-1438, Salat will be at 05:15:20.13';
    dateFormat = 'Eïd  Al-Adha of this year will be : dd-mm-yyyy, Salat will be at hh:MM:ss.SS';
  });
  it(`extracts "chunk" of numbers from "string" according to "format"`, () => {
    const string = 'He got 99% in Math subject at school 123';
    const format = 'He got xx% in Math subject at school sss'; // object-verb-adjective
    const formatChunk = 'xx';
    expect(StringDateParser.extract(string, format, formatChunk)).toEqual('99');
  });

  it(`extracts the year from date string`, () => {
    const actual = StringDateParser.extractYear(dateString, dateFormat);
    const expected = 1438;
    expect(actual).toEqual(expected);
  });

  it(`parses year of two digits and it will belong to 14ᵗʰ century`, () => {
    dateString='at the year 40';dateFormat='at the year yy';
    const actual = StringDateParser.extractYear(dateString, dateFormat);
    const expected = 1440;
    expect(actual).toEqual(expected);
  });

  it(`extracts the month from date string`, () => {
    const actual = StringDateParser.extractMonth(dateString, dateFormat);
    const expected = 12;
    expect(actual).toEqual(expected);
  });

  it(`extracts the day of month from date string`, () => {
    const actual = StringDateParser.extractDate(dateString, dateFormat);
    const expected = 10;
    expect(actual).toEqual(expected);
  });

  it(`extracts the hours from date string`, () => {
    const actual = StringDateParser.extractHours(dateString, dateFormat);
    const expected = 5;
    expect(actual).toEqual(expected);
  });

  it(`extracts the minutes of month from date string`, () => {
    const actual = StringDateParser.extractMinutes(dateString, dateFormat);
    const expected = 15;
    expect(actual).toEqual(expected);
  });

  it(`extracts the seconds of month from date string`, () => {
    const actual = StringDateParser.extractSeconds(dateString, dateFormat);
    const expected = 20;
    expect(actual).toEqual(expected);
  });

  it(`extracts the milliseconds of month from date string.`, () => {
    const actual = StringDateParser.extractMilliseconds(dateString, dateFormat);
    const expected = 13;
    expect(actual).toEqual(expected);
  });


  it(`proposes Muharram  as default month`, () => {
    dateString = '';
    dateFormat = '';
    const actual = StringDateParser.extractMonth(dateString, dateFormat);
    const expected = 1;
    expect(actual).toEqual(expected);
  });

  it(`proposes the 1ˢᵗ day of month as the default day`, () => {
    dateString = '';
    dateFormat = '';
    const actual = StringDateParser.extractDate(dateString, dateFormat);
    const expected = 1;
    expect(actual).toEqual(expected);
  });

  it(`proposes 0 as the default hour`, () => {
    dateString = '';
    dateFormat = '';
    const actual = StringDateParser.extractHours(dateString, dateFormat);
    const expected = 0;
    expect(actual).toEqual(expected);
  });

  it(`proposes 0 as the default minute`, () => {
    dateString = '';
    dateFormat = '';
    const actual = StringDateParser.extractMinutes(dateString, dateFormat);
    const expected = 0;
    expect(actual).toEqual(expected);
  });

  it(`proposes 0 as the default second`, () => {
    dateString = '';
    dateFormat = '';
    const actual = StringDateParser.extractSeconds(dateString, dateFormat);
    const expected = 0;
    expect(actual).toEqual(expected);
  });

  it(`proposes 0 as the default milliseconds`, () => {
    dateString = '';
    dateFormat = '';
    const actual = StringDateParser.extractMilliseconds(dateString, dateFormat);
    const expected = 0;
    expect(actual).toEqual(expected);
  });


})
