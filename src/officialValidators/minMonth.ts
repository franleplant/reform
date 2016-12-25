import { parseMonth } from '../utils';


export const minMonth = (value: string, min: string) => {
  if (!value) return false

  const [vYear, vMonth] = parseMonth(value);
  const [mYear, mMonth] = parseMonth(min);

  if (!mYear || !mMonth) {
    throw new Error(`Reform minMonth should have a valid month as argument. Found "${min}"`)
  }

  // Invalid week
  if (!vYear || !vMonth) {
    return false
  }

  let error = false;

  if (vYear < mYear) {
    error = true;
  } else if (vYear > mYear) {
    error = false;
  } else if (vYear === mYear) {
    error = vMonth < mMonth
  };



  return  error;
}
