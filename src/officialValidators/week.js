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
  const d = new Date(year, 0, 1);
  const isLeap = new Date(year, 1, 29).getMonth() === 1;

  // Check for a Jan 1 that's a Thursday or a leap year that has a
  // Wednesday jan 1. Otherwise year has 52 weeks.
  return d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52
}

export {weekValidator as default, weeksInYear}
