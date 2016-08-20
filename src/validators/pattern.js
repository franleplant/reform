import  { controlIsFunctionType } from '../utils';

const supportedInputTypes = ['text', 'search', 'url', 'tel', 'email', 'password']


export default function requiredValidator(controlState) {
  const condition =
    controlState.elementType === 'input' &&  supportedInputTypes.includes(controlState.typeProp) ||
    controlIsFunctionType(controlState.elementType)

  if (condition) {
      const re = new RegExp(child.props.pattern);
      return!re.test(value);
  }

  console.warn(`Validator: "pattern" not supported for type ${controlState.elementType}`)
  return false
}
