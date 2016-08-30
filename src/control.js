import { ReformErrors } from './Reform';
import { validators } from './validators';

function mergeRulesSafely(obj1, obj2) {
  Object.keys(obj2).forEach(key => {
    if (standardValidatorKeys.includes(key)) {
      throw new Error(`You are overwriting default validation rules. In ${element}. Rule ${key}`)
    }
  });

  return Object.assign({}, obj1, obj2);
}


class Control {
  constructor(element, config = {}) {

    let value = element.props.value
    //if it's a radio input then value should be set for the checked input if not it should be ''
    //warn user when not all radio buttons with the same name have the same validationRules
    // TODO: abstract this in the element module 
    let type = element.type
    // TODO: test all this with minified builds of react-bootstrap
    let isBootstrapRadio = false;
    try {
      if (type.name === 'Radio') {
        isBootstrapRadio = true
      }
    } catch (e) {}

    // TODO: from reform I need to check the correct value of the only checked radio button
    if (element.props.type === 'radio' || isBootstrapRadio) {
      value = element.props.checked ? value : ''
    }

    this.elementType = element.type;
    this.name = element.props.name
    this.errors =  new ReformErrors();
    this.value = value;
    this.checked = element.props.checked;
    // Hackable
    // TODO: change name across the board
    this.inputType = config.inputType || element.props.type;
    // Hackable
    this.validationRules = mergeRulesSafely(Element.getValidationRules(element), config.validationRules);
    // Hackable
    this.getValue = config.getValue || defaultGetValue;

    if (!this.name) {
      throw new Error(`All controlled inputs must have "name" props. In ${element}`)
    }
  }

  validate(formState) {
    const validationRules = this.validationRules

    for (ruleKey in validationRules) {
      if (!validationRules.hasOwnProperty(ruleKey)) continue;
      const ruleValue = validationRules[ruleKey];
      // TODO test ad hoc validationRules
      // Allow custom ad hoc validationRules
      const validator = typeof  ruleValue === 'function' ? ruleValue : validators[key];
      control.errors[ruleKey] = validator(this, formState)
    }

    return this.isValid();
  }

  isValid() {
    const errors = this.errors;
    let hasErrors = false;
    for (let error of errors) {
      hasErrors = hasErrors || error;
    }

    return !hasErrors;
  }


  isInputType(types) {
    types = Array.isArray(types) ? types : [types]
    return types.includes(this.control.inputType)
  }



  isFunctionType() {
    return typeof control.elementType === 'function';
  }

}

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

// TODO superseded by Control class
export const isFunctionType = control => typeof control.elementType === 'function'

export const isInput = control => control.elementType === 'input'

export const isInputOrFunctionType = control => control.elementType === 'input' || isFunctionType(control.elementType)

export const isType = (control, types) => {
  types = Array.isArray(types) ? types : [types]
  return types.includes(control.elementType)
}

// TODO superseded by Control class
export const isInputType = (control, types) => {
  types = Array.isArray(types) ? types : [types]
  return types.includes(control.typeProp)
}



// TODO superseded by Control class
export const validate = (control, formState) => {
  const validationRules = control.validationRules

  control.errors =
    Object.keys(validationRules)
      .reduce((map, key) => {
        let validator

        // TODO test ad hoc validationRules
        // Allow custom ad hoc validationRules
        if (typeof validationRules[key] === 'function') {
          validator = validationRules[key]
        } else {
          validator = validators[key]
        }

        map[key] = validator(control, formState)
        return map
      }, new ReformErrors())

  return control
}
