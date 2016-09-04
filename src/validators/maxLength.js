export const supportedTypes = ['textarea']
export const supportedInputTypes = [
  'text',
  'search',
  'url',
  'tel',
  'email',
  'password',
]

export default function maxLengthValidator(control) {
  const condition =
    control.isInputType(supportedInputTypes) ||
    control.isFunctionType() ||
    control.isType(supportedTypes)

  const maxLength = control.validationRules.maxLength
  const value = control.value

  if (condition) {
      return value.length > maxLength
  }

  console.warn(`Validator: "maxLength" not supported for type ${control.elementType}`)
  return false
}
