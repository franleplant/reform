
// TODO: improve this
const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
const re = new RegExp(expression);
export default function urlValidator(control) {
  if (control.typeProp === 'url') {
    return !re.test(control.value)
  }

  console.warn(`Validator: "email" not supported for type ${control.elementType}`)
  return false
}
