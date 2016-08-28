
// TODO: improve this
const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
const re = new RegExp(expression);
export default function urlValidator(control) {
  return !re.test(control.value)
}
