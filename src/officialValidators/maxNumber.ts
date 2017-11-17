export const maxNumber = (value: number | string, max: number | string) => {
  if (!value) return false;

  const maxN = parseInt(max as string, 10);
  const valueN = parseInt(value as string, 10);

  if (!Number.isFinite(maxN)) {
    throw new Error(
      `Reform maxNumber argument should be a valid a number or a number string. Found "${
        max
      }"`
    );
  }

  if (!Number.isFinite(valueN)) {
    return false;
  }

  return valueN > maxN;
};
