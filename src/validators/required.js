import  { controlIsFunctionType } from '../utils';

const supportedTypes = ['input', 'select', 'textarea']
const supportedInputTypes = [
  'text',
  'search',
  'url',
  'tel',
  'email',
  'password',
  'date',
  'datetime',
  'datetime-local',
  'month',
  'week',
  'time',
  'number',
  'checkbox',
  'radio',
  'file'
]

export default function requiredValidator(controlState) {
  const condition =
    controlState.elementType === 'input' &&  supportedInputTypes.includes(controlState.typeProp) ||
    supportedTypes.includes(controlState.elementType) ||
    controlIsFunctionType(controlState.elementType)

  if (condition) {
      // Todo maybe make this check a bit better
      return !controlState.value ? true : false
  }

  console.warn(`Validator: "required" not supported for type ${controlState.elementType}`)
  return false
}
