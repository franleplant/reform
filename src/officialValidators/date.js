// Official docs https://www.w3.org/TR/html5/infrastructure.html#valid-date-string

export default function dateValidator(control) {
  // Special case for empty values. This is the job of the `required` validator
  if (!control.value) {
    return false;
  }

  const date = Date.parse(control.value);
  return Number.isNaN(date);
}
