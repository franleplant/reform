// Official docs https://www.w3.org/TR/html5/infrastructure.html#valid-month-string
import { parseMonth } from '../utils';

export default function monthValidator(control) {
  // Special case for empty values. This is the job of the `required` validator
  if (!control.value) {
    return false;
  }

  const value = control.value
  const [ year, month ] = parseMonth(value)

  if (!year || !month) {
    return true
  }

  return !(0 < year && 1 <= month && month <= 12)
}
