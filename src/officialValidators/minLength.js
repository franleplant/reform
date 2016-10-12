export const supportedTypes = ['textarea']
export const supportedInputTypes = [
  'text',
  'search',
  'url',
  'tel',
  'email',
  'password',
]

export default function minLengthValidator(control) {
  // Special case for empty values. This is the job of the `required` validator
  if (!control.value) {
    return false;
  }

  const condition =
    control.isInputType(supportedInputTypes) ||
    control.isFunctionType() ||
    control.isType(supportedTypes)

  const minLength = control.validationRules.minLength
  const value = control.value

  if (condition) {
      return value.length < minLength
  }

  console.warn(`Validator: "minLength" not supported for type ${control.elementType}`)
  return false
}
