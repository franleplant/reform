// Official docs https://www.w3.org/TR/html5/infrastructure.html#valid-date-string

// Hack to make parsing times easier
// TODO: review this
const BASE_DATE = "1970-01-01"

// Example "02:00"
export default function timeValidator(control) {
  // Special case for empty values. This is the job of the `required` validator
  if (!control.value) {
    return false;
  }

  const date = Date.parse(BASE_DATE + ' ' + control.value)
  return Number.isNaN(date)
}
