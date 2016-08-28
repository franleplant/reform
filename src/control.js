import { ReformErrors } from './Reform';
import { validators } from './validators';

/*

interface ValidationRules {
  required: (controlState) => bool,
  minLength: ...
}

interface ControlState {
  elementType: string | function,
  name: string,
  value: any,
  // TODO: this should be named to inputType
  typeProp: string | void,
  errors: ReformErrors,
  validationRules: ValidationRules
}

*/

export const isFunctionType = control => typeof control.elementType === 'function'

export const isInput = control => control.elementType === 'input'

export const isInputOrFunctionType = control => control.elementType === 'input' || isFunctionType(control.elementType)

export const isType = (control, types) => {
  types = Array.isArray(types) ? types : [types]
  return types.includes(control.elementType)
}

export const isInputType = (control, types) => {
  types = Array.isArray(types) ? types : [types]
  return types.includes(control.typeProp)
}



export const validate = control => {
  const validationRules = control.validationRules

  control.errors =
    Object.keys(validationRules)
      .reduce((map, key) => {
        const validator = validators[key]
        map[key] = validator(control)
        return map
      }, new ReformErrors())

  return control
}
