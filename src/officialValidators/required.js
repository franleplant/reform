export const supportedTypes = ['select', 'textarea']
export const supportedInputTypes = [
  'checkbox',
  'color',
  'date',
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
  // Special case for checkboxes
  if (control.isCheckbox()) {
    //Constraint validation: If the element is required and its checkedness is false, then the element is suffering from being missing.
    return !control.checked
  }

  const condition =
    control.isInputType(supportedInputTypes) ||
    control.isType(supportedTypes) ||
    control.isFunctionType()

  if (condition) {
    // Todo maybe make this check a bit better
    return !control.value ? true : false
  }


  console.warn(`Validator: "required" not supported for type ${control.elementType}`)
  return false
}
