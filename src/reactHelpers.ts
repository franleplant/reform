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
export function validateField(this: ValidationAbleInstance, fieldName: string, value: any): boolean {
  checkInstance(this);
  const rules = this.validationRules[fieldName];
  const fieldErrors = core.validateField(value, rules);
  this.setState((state: any) => {
    state.formIsDirty = true;
    state.errors[fieldName] = fieldErrors;
    return state;
  });

  return core.fieldIsValid(fieldErrors);
}

// Modified state
export function validateFieldFromState(this: ValidationAbleInstance, fieldName: string): boolean {
  const value = this.state.fields[fieldName];
  return validateField.call(this, fieldName, value)
}

// Modified state
export function validateForm(this: ValidationAbleInstance, fieldsValues: Fields): boolean {
  checkInstance(this);
  const rulesMap = this.validationRules;
  const formErrors = core.validateForm(fieldsValues, rulesMap);
  this.setState((state: any) => {
    state.formIsDirty = true;
    state.errors = formErrors;
    return state;
  });

  return core.formIsValid(formErrors);
}

// Modified state
export function validateFormFromState(this: ValidationAbleInstance): boolean {
  const values = this.state.fields;
  return validateForm.call(this, values)
}


// Important! This function will evaluate field validity based on the already
// calculated errors inside this.state.errors
// The naming is kind of contribed. This function only checks that there are no errors
// for the given field in this.state.errors
// while formIsValid calculated the validity of the form
export function fieldIsValid(this: ValidationAbleInstance, fieldName: string): boolean {
  return core.fieldIsValid(this.state.errors[fieldName]);
}


// ReCalculates the validity of the form
export function formIsValid(this: ValidationAbleInstance): boolean {
  checkInstance(this);
  const fields = this.state.fields;
  const rules = this.validationRules;
  return core.formIsValid(fields, rules);
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

// @Unstable
export function fieldErrors(this: ValidationAbleInstance, fieldName: string): Array<Array<any>> {
  const result = [];
  for (const ruleKey in this.state.errors[fieldName]) {
    const errorResult = this.state.errors[fieldName][ruleKey]
    if (!errorResult) continue;
    result.push([ruleKey, this.validationRules[fieldName][ruleKey]])
  }

  return result;
}

//@unstable
export function mapFieldErrors(this: ValidationAbleInstance, fieldName: string): Array<string> {
  //TODO check this.validationMessages exist
  //TODO check this.validationMessages default exist
  return fieldErrors.call(this, 'email')
    .map(([ruleKey, ruleValue]: Array<any>) => {
      const creator = this.validationMessages[ruleKey] || this.validationMessages['default'];
      return creator(ruleValue, ruleKey, fieldName)
    })
}
