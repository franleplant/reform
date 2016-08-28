// Official docs https://www.w3.org/TR/html5/infrastructure.html

export default function numberValidator(control) {
  const value = parseFloat(control.value)
  return !Number.isFinite(value)
}
