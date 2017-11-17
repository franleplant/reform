// Returns [] if something went wrong
export function parseMonth(value: string): number[] {
  const [yearStr, monthStr] = value.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);

  if (!Number.isFinite(year) || !Number.isFinite(month)) {
    return [];
  }

  return [year, month];
}

// Returns [] if something went wrong
export function parseWeek(value: string): number[] {
  let [yearStr, weekStr] = value.split("-");
  const year = parseInt(yearStr, 10);

  // Error if weekstr is not defined
  if (!weekStr || weekStr[0] !== "W") {
    return [];
  }

  weekStr = weekStr.slice(1);
  const week = parseInt(weekStr, 10);

  if (!Number.isFinite(year) || !Number.isFinite(week)) {
    return [];
  }

  return [year, week];
}

export function weeksInYear(year: number): number {
  const d = new Date(year, 0, 1);
  const isLeap = new Date(year, 1, 29).getMonth() === 1;

  // Check for a Jan 1 that's a Thursday or a leap year that has a
  // Wednesday jan 1. Otherwise year has 52 weeks.
  return d.getDay() === 4 || (isLeap && d.getDay() === 3) ? 53 : 52;
}

/**
 *  @hidden
 */
const baseDate = "1970-01-01";
export function parseTime(time: string): number {
  return Date.parse(`${baseDate} ${time}`);
}
