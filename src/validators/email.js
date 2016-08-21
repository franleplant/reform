import  * as Control from '../control';

export default function emailValidator(control) {

  // TODO: check this validation for custom Components
  const condition = Control.isInputOrFunctionType(control) && control.typeProp === 'email'

  if (condition) {
    return !/.+@.+\..+/.test(control.value)
  }

  console.warn(`Validator: "email" not supported for type ${control.elementType}`)
  return false
}
