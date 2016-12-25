import * as utils from './utils';

describe('weeksInYear', () => {
  it(`should return 52 for year 2014 `, () => {
    expect(utils.weeksInYear(2014)).toBe(52);
  });

  it(`should return 53 for year 2015 `, () => {
    expect(utils.weeksInYear(2015)).toBe(53);
  });

  it(`should return 52 for year 2016 `, () => {
    expect(utils.weeksInYear(2016)).toBe(52);
  });
});

describe('parseMonth', () => {
  it(`should work`, () => {
    expect(utils.parseMonth("2016-10")).toEqual([2016, 10]);
    expect(utils.parseMonth("-")).toEqual([]);
    expect(utils.parseMonth("Dog-Cat")).toEqual([]);
  });
});

describe('parseWeek', () => {
  it(`should work`, () => {
    expect(utils.parseWeek("2016-W10")).toEqual([2016, 10]);
    expect(utils.parseWeek("-")).toEqual([]);
    expect(utils.parseWeek("2016-10")).toEqual([]);
  });
});

describe('parseTime', () => {
  it(`should work`, () => {
    expect(Number.isFinite(utils.parseTime("17:50"))).toBe(true);
    expect(Number.isFinite(utils.parseTime("23:13"))).toBe(true);
    expect(Number.isFinite(utils.parseTime("W17:50"))).toBe(false);
    expect(Number.isFinite(utils.parseTime(":50"))).toBe(false);
    expect(Number.isFinite(utils.parseTime("50"))).toBe(false);
    expect(Number.isFinite(utils.parseTime("50:"))).toBe(false);
    expect(Number.isFinite(utils.parseTime("89:99"))).toBe(false);
  });
});
