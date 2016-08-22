import  * as Control from '../control';

export const supportedTypes = ['input', 'select', 'textarea']
export const supportedInputTypes = [
  'checkbox',
  'date',
  'datetime',
  'datetime-local',
  'email',
  'file',
  'month',
  'number',
  'password',
  'radio',
  'search',
  'tel',
  'text',
  'time',
  'url',
  'week',
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
