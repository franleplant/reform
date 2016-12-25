export const maxDate = (value: string, max: string) => {
  if (!value) return false

  const maxDate = Date.parse(max)
  const valueDate = Date.parse(value)

  if (Number.isNaN(maxDate)) {
    throw new Error(`Reform maxDate should have a valid date as argument. Found "${max}"`);
  }

  if (Number.isNaN(valueDate)) {
    return false;
  }

  return valueDate > maxDate;
}
