
// Example "#c82f13"
const re = /^#[0-9A-F]{6}$/;
export default function colorValidator(control) {
  return !re.test(control.value)
}
