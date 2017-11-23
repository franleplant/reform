import { parseWeek } from "../utils";
import { week } from "./week";

export const minWeek = (value: string, min: string) => {
  if (!value) return false;

  const [vYear, vWeek] = parseWeek(value);
  const [mYear, mWeek] = parseWeek(min);

  // Invalid min
  if (!mYear || !mWeek || week(min)) {
    throw new Error(
      `Reform minWeek should have a valid week as value. Found ${min}.`
    );
  }

  // Invalid week
  if (!vYear || !vWeek) {
    return false;
  }

  let error = false;

  if (vYear < mYear) {
    error = true;
  } else if (vYear > mYear) {
    error = false;
  } else if (vYear === mYear) {
    error = vWeek < mWeek;
  }

  return error;
};
