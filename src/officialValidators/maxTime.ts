import { parseTime } from "../utils";

export const maxTime = (value: string, max: string) => {
  if (!value) return false;

  const maxDate = parseTime(max);
  const valueDate = parseTime(value);

  if (Number.isNaN(maxDate)) {
    throw new Error(
      `Reform maxTime should have a valid time as value. Found ${max}`
    );
  }

  if (Number.isNaN(valueDate)) {
    return false;
  }

  return valueDate > maxDate;
};
