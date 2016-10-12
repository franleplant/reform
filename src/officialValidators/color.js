
// Example "#c82f13"
const re = /^#[0-9A-F]{6}$/;
export default function colorValidator(control) {
  // Special case for empty values. This is the job of the `required` validator
  if (!control.value) {
    return false;
  }

  return !re.test(control.value)
}
