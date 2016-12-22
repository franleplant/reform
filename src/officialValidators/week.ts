// Official docs https://www.w3.org/TR/html5/infrastructure.html
// 2.4.5.8 Weeks
import { parseWeek, weeksInYear } from '../utils';

// Example week: "2016-W33"
export const week = (value: string) => {
  const [year, week] = parseWeek(value);

  if (!year || !week) {
    return true;
  }

  return !(0 < year && 1 <= week && week <= weeksInYear(year));
}

