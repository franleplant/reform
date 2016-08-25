import  * as Control from '../control';

export const supportedTypes = ['select', 'textarea']
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

// TODO: all this needs to be improved once Validator Architecture arrives
export default function requiredValidator(control) {
  // Special case for checkboxes
  if (Control.isInputType(control, 'checkbox')) {
    //Constraint validation: If the element is required and its checkedness is false, then the element is suffering from being missing.
    return !control.checked
  }

  const condition =
    ( Control.isInput(control) && Control.isInputType(control, supportedInputTypes) ) ||
    Control.isType(control, supportedTypes) ||
    Control.isFunctionType(control.elementType)

  if (condition) {
    // Todo maybe make this check a bit better
    return !control.value ? true : false
  }


  // Special case for radio
  // need to check that one radio with the same name is checked
  //if (Control.isInputType(control, 'radio')) {
    //return !control.checked
  //}

  console.warn(`Validator: "required" not supported for type ${control.elementType}`)
  return false
}
