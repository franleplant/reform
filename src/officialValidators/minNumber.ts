export const minNumber = (value: number | string, min: number | string) => {
  if (!value) return false;

  min = parseInt(min as string, 10);
  value = parseInt(value as string, 10);

  if (!Number.isFinite(min)) {
    throw new Error('Reform minNumber argument should be a valid a number or a number string');
  }

  if (!Number.isFinite(value)) {
    return true;
  }

  return value < min
}
