
export default function emailValidator(control) {
  // Special case for empty values. This is the job of the `required` validator
  if (!control.value) {
    return false;
  }

  return !/.+@.+\..+/.test(control.value)
}
