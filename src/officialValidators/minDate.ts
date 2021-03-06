export const minDate = (value: string, min: string) => {
  if (!value) return false;

  const minDate = Date.parse(min);
  const valueDate = Date.parse(value);

  if (Number.isNaN(minDate)) {
    throw new Error(
      `Reform minDate should have a valid date as argument. Found "${min}"`
    );
  }

  if (Number.isNaN(valueDate)) {
    return false;
  }

  return valueDate < minDate;
};
