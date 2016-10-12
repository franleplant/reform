// Official docs https://www.w3.org/TR/html5/infrastructure.html

export default function numberValidator(control) {
  // Special case for empty values. This is the job of the `required` validator
  if (!control.value) {
    return false;
  }

  const value = parseFloat(control.value)
  return !Number.isFinite(value)
}
