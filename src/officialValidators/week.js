// Official docs https://www.w3.org/TR/html5/infrastructure.html
// 2.4.5.8 Weeks
import { parseWeek } from '../utils';

// Example week: "2016-W33"
function weekValidator(control) {
  // Special case for empty values. This is the job of the `required` validator
  if (!control.value) {
    return false;
  }

  const value = control.value;
  const [year, week] = parseWeek(value);

  if (!year || !week) {
    return true;
  }

  return !(0 < year && 1 <= week && week <= weeksInYear(year));
}

function weeksInYear(year) {
  let lastDayOfTheYear = new Date(year, 11, 31);
  const [, week] = getWeekNumber(lastDayOfTheYear);
  if (week !== 1) {
    return week;
  }

  const dayOfTheMonth = lastDayOfTheYear.setDate(24);
  return getWeekNumber(dayOfTheMonth)[1];
}

function getWeekNumber(d) {
  // Copy date so don't modify original
  let date = new Date(+d);
  date.setHours(0, 0, 0);

  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  date.setDate(date.getDate() + 4 - (date.getDay()||7));

  // Get first day of year
  const yearStart = new Date(date.getFullYear(),0,1);
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil(( ( (date - yearStart) / 86400000) + 1) / 7);

  // Return array of year and week number
  return [date.getFullYear(), weekNo];
}

export {weekValidator as default, weeksInYear, getWeekNumber}
