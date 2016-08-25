import  * as Control from '../control';

export const supportedInputTypes = ['text', 'search', 'url', 'tel', 'email', 'password']


export default function patternValidator(control) {
  const condition =
    ( Control.isInput(control) && Control.isInputType(control, supportedInputTypes) ) ||
    Control.isFunctionType(control)


  if (condition) {
      const re = new RegExp(control.validationRules.pattern);
      return!re.test(control.value);
  }

  console.warn(`Validator: "pattern" not supported for type ${control.elementType}`)
  return false
}
