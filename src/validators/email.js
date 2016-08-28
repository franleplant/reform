
export default function emailValidator(control) {
  return !/.+@.+\..+/.test(control.value)
}
