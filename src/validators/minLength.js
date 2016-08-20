import  { controlIsFunctionType } from '../utils';

const supportedTypes = ['input', 'textarea']
const supportedInputTypes = [
  'text',
  'search',
  'url',
  'tel',
  'email',
  'password',
]

export default function requiredValidator(controlState) {
  const condition =
    controlState.elementType === 'input' &&  supportedInputTypes.includes(controlState.typeProp) ||
    supportedTypes.includes(controlState.elementType) ||
    controlIsFunctionType(controlState.elementType)

  const minLength = controlState.validationRules.minLength
  const value = controlState.value

  if (condition) {
      return value.length < minLength
  }

  console.warn(`Validator: "minLength" not supported for type ${controlState.elementType}`)
  return false
}
