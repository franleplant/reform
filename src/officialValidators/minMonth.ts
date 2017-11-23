import { parseMonth } from "../utils";
import { month } from "./month";

export const minMonth = (value: string, min: string) => {
  if (!value) return false;

  const [vYear, vMonth] = parseMonth(value);
  const [mYear, mMonth] = parseMonth(min);

  // Check that the min month is a valid month
  if (!mYear || !mMonth || month(min)) {
    throw new Error(
      `Reform minMonth should have a valid month as argument. Found "${min}"`
    );
  }

  // Invalid week
  if (!vYear || !vMonth) {
    return false;
  }

  let error = false;

  if (vYear < mYear) {
    error = true;
  } else if (vYear > mYear) {
    error = false;
  } else if (vYear === mYear) {
    error = vMonth < mMonth;
  }

  return error;
};
