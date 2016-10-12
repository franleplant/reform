// Official docs https://www.w3.org/TR/html5/infrastructure.html
// 2.4.5.8 Weeks
import { parseWeek } from '../utils';

// Example week: "2016-W33"
// TODO: this needs to be improved since some years have 52 weeks
const MAX_WEEK = 53
export default function weekValidator(control) {
  // Special case for empty values. This is the job of the `required` validator
  if (!control.value) {
    return false;
  }

  const value = control.value
  const [year, week] = parseWeek(value)

  if (!year || !week) {
    return true
  }

  return !(0 < year && 1 <= week && week <= MAX_WEEK)
}
