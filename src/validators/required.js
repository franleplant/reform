import  * as Control from '../control';

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

export default function requiredValidator(control) {
  const condition =
    ( Control.isInput(control) && Control.isInputType(control, supportedInputTypes) ) ||
    Control.isType(control, supportedTypes) ||
    Control.isFunctionType(control.elementType)

  if (condition) {
      // Todo maybe make this check a bit better
      return !control.value ? true : false
  }

  console.warn(`Validator: "required" not supported for type ${control.elementType}`)
  return false
}
