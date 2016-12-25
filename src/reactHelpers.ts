import { ValidationAbleInstance, Fields } from './types'
import * as core from './core';

// Useful function for javascript land
// TODO: do not use it in prod? Check performance
function checkInstance(instance: any) {
  if (!instance.hasOwnProperty('validationRules')) {
    console.error(`Reform: instance does not have validationRules attribute`, instance);
    throw new Error(`Reform: instance.validationRules not found`);
  }

  if (!instance.hasOwnProperty('state')) {
    console.error(`Reform: instance does not have state attribute`, instance)
    throw new Error(`Reform: instance.state not found`);
  }

  if (!instance.state.hasOwnProperty('fields')) {
    console.error(`Reform: instance does not have state.fields attribute`, instance)
    throw new Error(`Reform: instance.state.fields not found`);
  }

  if (!instance.state.hasOwnProperty('errors')) {
    console.error(`Reform: instance does not have state.errors attribute`, instance)
    throw new Error(`Reform: instance.state.errors not found`);
  }

}

// Modified state
export function validateField(this: ValidationAbleInstance, fieldName: string, value: any) {
  checkInstance(this);
  const rules = this.validationRules[fieldName];
  const fieldErrors = core.validateField(value, rules);
  this.setState((state: any) => {
    state.formIsDirty = true;
    state.errors[fieldName] = fieldErrors;
    return state;
  });
}

// Modified state
export function validateFieldFromState(this: ValidationAbleInstance, fieldName: string) {
  const value = this.state.fields[fieldName];
  validateField.call(this, fieldName, value)
}

// Modified state
export function validateForm(this: ValidationAbleInstance, fieldsValues: Fields) {
  checkInstance(this);
  const rulesMap = this.validationRules;
  const formErrors = core.validateForm(fieldsValues, rulesMap);
  this.setState((state: any) => {
    state.formIsDirty = true;
    state.errors = formErrors;
    return state;
  });
}

// Modified state
export function validateFormFromState(this: ValidationAbleInstance) {
  const values = this.state.fields;
  validateForm.call(this, values)
}


// Important! This function will evaluate field validity based on the already
// calculated errors inside this.state.errors
// The naming is kind of contribed. This function only checks that there are no errors
// for the given field in this.state.errors
// while formIsValid calculated the validity of the form
export function fieldIsValid(this: ValidationAbleInstance, fieldName: string): boolean {
  return core.fieldIsValid(this.state.errors[fieldName]);
}


// Calculates the validity of the form
export function formIsValid(this: ValidationAbleInstance): boolean {
  checkInstance(this);
  const fields = this.state.fields;
  const rules = this.validationRules;
  return core.formIsValid(fields, rules);
}

// @Unstable
export function getFieldErrors(this: ValidationAbleInstance, fieldName: string) {
  const result = [];
  for (const ruleKey in this.state.errors[fieldName]) {
    const errorResult = this.state.errors[fieldName][ruleKey]
    if (!errorResult) continue;
    result.push([ruleKey, this.validationRules[fieldName][ruleKey]])
  }
}

export function fieldIfError(this: ValidationAbleInstance, fieldName: string, errorKey: string): boolean {
  checkInstance(this);
  if (!this.state.fields.hasOwnProperty(fieldName)) {
    throw new Error(`Field ${fieldName} not found! Did you forget to initialize it?`)
  }

  if (!this.validationRules.hasOwnProperty(fieldName)) {
    throw new Error(`Field Rules ${fieldName} not found! Did you forget to initialize them?`)
  }

  if (this.state.errors[fieldName] && this.state.errors[fieldName][errorKey]) {
    return true
  }

  return false
}


const mixinProperties = [
  'validateField',
  'validateFieldFromState',
  'fieldIsValid',
  'validateForm',
  'validateFormFromState',
  'formIsValid',
  'getFieldErrors',
  'fieldIfError',
];

export interface Reform {
  validateField: typeof validateField;
  validateFieldFromState: typeof validateFieldFromState;
  fieldIsValid: typeof fieldIsValid;
  validateForm: typeof validateForm;
  validateFormFromState: typeof validateFormFromState;
  formIsValid: typeof formIsValid;
  getFieldErrors: typeof getFieldErrors;
  fieldIfError: typeof fieldIfError;
}


export interface Base {}
export interface GenericClass<T> {
  new (): T
  readonly prototype: T;
  displayName: string;
}


export function reformClassMixin<T extends Base>(base: GenericClass<T>): GenericClass<T & Reform> {
  mixinProperties.forEach(prop => {
    if (base[prop] != null) {
      // TODO: better error message
      throw new Error(`Wrapped Component already implements method, please use another one`)
    }
  })

  class ReformImpl extends (base as GenericClass<Base>) implements Reform {
    static displayName = `Reform(${base.displayName})`;
    validateField = validateField;
    validateFieldFromState = validateFieldFromState;
    fieldIsValid = fieldIsValid;
    validateForm = validateForm;
    validateFormFromState = validateFormFromState;
    formIsValid = formIsValid;
    getFieldErrors = getFieldErrors;
    fieldIfError = fieldIfError;
  }

  return ReformImpl as GenericClass<T & Reform>;
}

export function reformFunctionalMixin(instance: any) {
  mixinProperties.forEach(prop => {
    if (instance[prop] != null) {
      // TODO: better error message
      throw new Error(`Wrapped Component already implements method, please use another one`)
    }
  })

  instance.validateField = validateField;
  instance.validateFieldFromState = validateFieldFromState;
  instance.fieldIsValid = fieldIsValid;
  instance.validateForm = validateForm;
  instance.validateFormFromState = validateFormFromState;
  instance.formIsValid = formIsValid;
  instance.getFieldErrors = getFieldErrors;
  instance.fieldIfError = fieldIfError;
}
