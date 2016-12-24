import { ValidationAbleInstance } from './types'
import * as core from './core';
import {toPairs} from './utils';


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

// onlyone that modifies the state
export function validate(this: ValidationAbleInstance, fieldName: string, value: any) {
  checkInstance(this);
  const rules = this.validationRules[fieldName];
  const errors = core.validateRules(rules, value);
  this.setState((state: any) => {
    state.formIsDirty = true;
    state.errors[fieldName] = errors;
    return state;
  });
}

// onlyone that modifies the state
export function validateFromState(this: ValidationAbleInstance, fieldName: string) {
  const value = this.state.fields[fieldName];
  validate.call(this, fieldName, value)
}

export function fieldIfError(this: ValidationAbleInstance, fieldName: string, errorKey: string): boolean {
  if (this.state.errors[fieldName] && this.state.errors[fieldName][errorKey]) {
    return true
  }

  return false
}

// This function will only use the already calculated errors, useful
// for not displaying the fields as invalid when the form is untouched
export function fieldHasErrors(this: ValidationAbleInstance, fieldName: string): boolean {
  return core.mapHasErrors(this.state.errors[fieldName]);
}


export function formHasErrors(this: ValidationAbleInstance): boolean {
  checkInstance(this);
  const fields = this.state.fields;
  const rules = this.validationRules;
  return core.formHasErrors(fields, rules);
}

// @Unstable
export function getFieldErrors(this: ValidationAbleInstance, fieldName: string) {
  return toPairs(this.state.errors[fieldName])
    .filter(([, value]) => Boolean(value))
    .map(([ruleKey]) => {
      return [ruleKey, this.validationRules[fieldName][ruleKey]];
    })
}
