import { parseTime } from "../utils";

export const minTime = (value: string, min: string) => {
  if (!value) return false;

  const minDate = parseTime(min);
  const valueDate = parseTime(value);

  if (Number.isNaN(minDate)) {
    throw new Error(
      `Reform minTime should have a valid time as value. Found ${min}`
    );
  }

  if (Number.isNaN(valueDate)) {
    return false;
  }

  return valueDate < minDate;
};
