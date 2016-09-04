// Official docs https://www.w3.org/TR/html5/infrastructure.html#valid-month-string

export default function monthValidator(control) {
  const value = control.value
  let [ year, month ] = value.split("-");
  year = parseInt(year, 10)
  month = parseInt(month, 10)

  if (!Number.isFinite(year) || !Number.isFinite(month)) {
    return true
  }

  return !(0 < year && 1 <= month && month <= 12)
}
