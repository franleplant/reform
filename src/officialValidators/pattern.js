//import  * as Control from '../control';

export const supportedInputTypes = ['text', 'search', 'url', 'tel', 'email', 'password']


export default function patternValidator(control) {
  // Special case for empty values. This is the job of the `required` validator
  if (!control.value) {
    return false;
  }

  const condition = control.isInputType(supportedInputTypes) || control.isFunctionType()


  if (condition) {
      const re = new RegExp(control.validationRules.pattern);
      return!re.test(control.value);
  }

  console.warn(`Validator: "pattern" not supported for type ${control.elementType}`)
  return false
}
