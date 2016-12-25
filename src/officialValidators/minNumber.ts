export const minNumber = (value: number | string, min: number | string) => {
  if (!value) return false;

  const minN = parseInt(min as string, 10);
  const valueN = parseInt(value as string, 10);

  if (!Number.isFinite(minN)) {
    throw new Error(`Reform minNumber argument should be a valid a number or a number string. Found "${min}"`);
  }

  if (!Number.isFinite(valueN)) {
    return false;
  }

  return valueN < minN
}
