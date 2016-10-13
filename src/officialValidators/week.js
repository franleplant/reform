// Official docs https://www.w3.org/TR/html5/infrastructure.html
// 2.4.5.8 Weeks
import { parseWeek } from '../utils';

// Example week: "2016-W33"
export default function weekValidator(control) {
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
  var d = new Date(year, 11, 31);
  var week = getWeekNumber(d)[1];
  
  return week == 1? getWeekNumber(d.setDate(24))[1] : week;
}

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0,0,0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(),0,1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7)
    
    // Return array of year and week number
    return [d.getFullYear(), weekNo];
}
