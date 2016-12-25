export const maxNumber = (value: number | string, max: number | string) => {
  if (!value) return false;

  max = parseInt(max as string, 10);
  value = parseInt(value as string, 10);

  if (!Number.isFinite(max)) {
    throw new Error('Reform maxNumber argument should be a valid a number or a number string');
  }

  if (!Number.isFinite(value)) {
    return true;
  }

  return value > max
}
