import { parseWeek } from '../utils';
import { week } from './week'

export const maxWeek = (value: string, max: string) => {
  if (!value) return false

  const [vYear, vWeek] = parseWeek(value);
  const [mYear, mWeek] = parseWeek(max);

  // Invalid max
  if (!mYear || !mWeek || week(max)) {
    throw new Error(`Reform maxWeek should have a valid week as value. Found ${max}.`);
  }

  // Invalid week
  if (!vYear || !vWeek) {
    return false
  }

  let error = false;

  if (vYear > mYear) {
    error = true;
  } else if (vYear < mYear) {
    error = false;
  } else if (vYear === mYear) {
    error = vWeek > mWeek
  };

  return  error;
}
