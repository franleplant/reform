// Official docs https://www.w3.org/TR/html5/infrastructure.html

// Example "2016-08-10T11:01"
export default function datetimeValidator(control) {
  // Special case for empty values. This is the job of the `required` validator
  if (!control.value) {
    return false;
  }

  const date = Date.parse(control.value)
  return Number.isNaN(date)
}
