import  {controlIsFunctionType} from '../utils';

export default function requiredValidator(controlState) {
  const condition =
    ( controlState.elementType === 'input' || controlIsFunctionType(controlState.elementType) ) &&
    controlState.typeProp === 'email'


  if (condition) {
    return !/.+@.+\..+/.test(value)
  }

  console.warn(`Validator: "email" not supported for type ${controlState.elementType}`)
  return false
}
