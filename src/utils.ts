
// Return undef if something went wrong
export function parseMonth(value) {
  let [ year, month ] = value.split("-");
  year = parseInt(year, 10)
  month = parseInt(month, 10)

  if (!Number.isFinite(year) || !Number.isFinite(month)) {
    return [];
  }

  return [year, month];
}


// Return undef if something went wrong
export function parseWeek(value) {
  let [ year, weekstr ] = value.split("-");
  year = parseInt(year, 10)

  // Error if weekstr is not defined
  if (!weekstr) {
    return [];
  }

  // We remove the "W" from "W33"
  let week = weekstr.slice(1)
  week = parseInt(week, 10)

  if (!Number.isFinite(year) || !Number.isFinite(week)) {
    return
  }

  return [year, week]
}

export function weeksInYear(year) {
  const d = new Date(year, 0, 1);
  const isLeap = new Date(year, 1, 29).getMonth() === 1;

  // Check for a Jan 1 that's a Thursday or a leap year that has a
  // Wednesday jan 1. Otherwise year has 52 weeks.
  return d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52
}
