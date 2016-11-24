import { weeksInYear, getWeekNumber } from './week';



describe('weeksInYear', () => {
  it(`should return 52 for year 2014 `, () => {
    expect(weeksInYear(2014)).toBe(52);
  });

  it(`should return 53 for year 2015 `, () => {
    expect(weeksInYear(2015)).toBe(53);
  });

  it(`should return 52 for year 2016 `, () => {
    expect(weeksInYear(2016)).toBe(52);
  });
});
