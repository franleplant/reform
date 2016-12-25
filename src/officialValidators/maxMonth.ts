import { parseMonth } from '../utils';
import { month } from './month';

export const maxMonth = (value: string, max: string) => {
  if (!value) return false

  const [vYear, vMonth] = parseMonth(value);
  const [mYear, mMonth] = parseMonth(max);

  // Invalid max
  if (!mYear || !mMonth || month(max)) {
    throw new Error(`Reform maxMonth should have a valid month as argument. Found ${max}`)
  }

  // Invalid week
  if (!vYear || !vMonth) {
    return false
  }

  let error = false;

  if (vYear > mYear) {
    error = true;
  } else if (vYear < mYear) {
    error = false;
  } else if (vYear === mYear) {
    error = vMonth > mMonth
  };

  return  error;
}
