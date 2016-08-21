import  * as Control from '../control';

const supportedTypes = ['input', 'textarea']
const supportedInputTypes = [
  'text',
  'search',
  'url',
  'tel',
  'email',
  'password',
]

export default function minLengthValidator(control) {
  const condition =
    ( Control.isInput(control) && Control.isInputType(control, supportedInputTypes) ) ||
    Control.isFunctionType(control) ||
    Control.isType(control, supportedTypes)

  const minLength = control.validationRules.minLength
  const value = control.value

  if (condition) {
      return value.length < minLength
  }

  console.warn(`Validator: "minLength" not supported for type ${control.elementType}`)
  return false
}
