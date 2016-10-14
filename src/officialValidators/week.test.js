import { weeksInYear, getWeekNumber } from './week';



describe('weeksInYear', () => {
  it(`should return 52 for year 2014 `, () => {
    expect(weeksInYear(2014)).toBe(52);
  })

  it(`should return 53 for year 2015 `, () => {
    expect(weeksInYear(2015)).toBe(53);
  })

  it(`should return 52 for year 2016 `, () => {
    expect(weeksInYear(2016)).toBe(52);
  })
})

describe('getWeekNumber', () => {
  it(`should return 1 for new Date(2014, 11, 31)`, () => {
    expect(getWeekNumber(new Date(2014, 11, 31))[1]).toBe(1);
  })

  it(`should return 53 for new Date(2015, 11, 31)`, () => {
    expect(getWeekNumber(new Date(2015, 11, 31))[1]).toBe(53);
  })

  it(`should return 52 for new Date(2016, 11, 31)`, () => {
    expect(getWeekNumber(new Date(2016, 11, 31))[1]).toBe(52);
  })
})
