// Official docs https://www.w3.org/TR/html5/infrastructure.html#valid-month-string
import { parseMonth } from '../utils';

export const month = (value: string) => {
  if (!value) return false

  const [ year, month ] = parseMonth(value)

  if (!year || !month) {
    return true
  }

  return !(0 < year && 1 <= month && month <= 12)
}
