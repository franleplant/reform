import * as Element from './element';
import * as officialValidators from './officialValidators';
import * as validators from './validators';

/*

interface ValidationRules {
  required: (controlState) => bool,
  minLength: ...
}

interface ControlState {
  elementType: string | function,
  name: string,
  value: any,
  inputType: string | void,
  errors: ReformErrors,
  validationRules: ValidationRules
}

*/


const defaultGetValue = event => event.target.value

function mergeRulesSafely(obj1 = {}, obj2) {
  if (!obj2) {
    return obj1;
  }

  Object.keys(obj2).forEach(key => {
    if (officialValidators.keys.includes(key)) {
      throw new Error(`You are overwriting default validation rules.  Rule ${key}`)
    }
  });

  return Object.assign({}, obj1, obj2);
}

export class ReformErrors {
  isValid() {
    let hasErrors = false;
    for (let errorKey in this) {
      if (!this.hasOwnProperty(errorKey)) {
        continue;
      }

      hasErrors = hasErrors || this[errorKey];
    }

    return !hasErrors;
  }


  // This improves a lot the interface of errors userside
  // The use can initialize this.state.errors[fieldName] with an empty object
  // and then go around without asking if that object has the function isValid
  // or if it has the errors already loaded.
  // This mostly covers continuous validation and in particular the initial render
  // before a `change` event is triggered and the user's component saves the real
  // error object
  get isInvalid() {
    return !this.isValid();
  }
}


export default class Control {
  constructor(element, config = {}) {

    let value = element.props.value
    //if it's a radio input then value should be set for the checked input if not it should be ''
    //warn user when not all radio buttons with the same name have the same validationRules
    // TODO: from reform I need to check the correct value of the only checked radio button
    if (Element.isRadio(element)) {
      value = element.props.checked ? value : ''
    }


    let inputType = element.props.type;
    if (!inputType && element.type === 'input') {
      // Text is the default
      inputType = 'text'
    }

    if (config.inputType) {
      inputType = config.inputType
    }

    this.elementType = element.type;
    this.name = element.props.name
    this.errors =  new ReformErrors();
    this.value = value;
    this.checked = element.props.checked;
    // Hackable
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

    for (let ruleKey in validationRules) {
      if (!validationRules.hasOwnProperty(ruleKey)) continue;
      const ruleValue = validationRules[ruleKey];
      // Allow custom ad hoc validationRules
      const validator = typeof ruleValue === 'function' ? ruleValue : validators.rules[ruleKey];

      if (!validator) {
        throw new Error(`Validator ${ruleKey} not found in control ${JSON.stringify(this)}`);
      }

      if (typeof validator.then === 'function') {
        throw new Error(`Async validators are not implemented yet`)
      }

      this.errors[ruleKey] = validator(this, formState)
    }

    return this.isValid();
  }

  isValid() {
    const errors = this.errors;
    let hasErrors = false;
    for (let errorKey in errors) {
      if (!errors.hasOwnProperty(errorKey)) {
        continue;
      }

      hasErrors = hasErrors || errors[errorKey];
    }

    return !hasErrors;
  }


  isInputType(types) {
    types = Array.isArray(types) ? types : [types]
    return types.includes(this.inputType)
  }


  isType(types) {
    types = Array.isArray(types) ? types : [types]
    return types.includes(this.elementType)
  }

  isFunctionType() {
    return typeof this.elementType === 'function';
  }

  isCheckbox() {
    const type = this.elementType;
    const inputType = this.inputType;

    // native checkbox
    return inputType === 'checkbox' ||
      // React-Bootstrap
      (typeof type === 'function' && type.name === 'Checkbox')
  }



}

