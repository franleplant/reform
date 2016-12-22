import { ValidationAbleInstance } from './types'
import * as core from './core';
import {toPairs} from './utils';

export function validate(this: ValidationAbleInstance, fieldName: string, value: any) {
  //TODO check validationRules exist , if not throw an error for javascripters
  const rules = this.validationRules[fieldName];
  const errors = core.validateRules(rules, value);
  this.setState((state: any) => {
    state.formIsDirty = true;
    state.errors[fieldName] = errors;
    return state;
  });
}

export function fieldIfError(this: ValidationAbleInstance, fieldName: string, errorKey: string): boolean {
  if (this.state.errors[fieldName] && this.state.errors[fieldName][errorKey]) {
    return true
  }

  return false
}

export function fieldHasErrors(this: ValidationAbleInstance, fieldName: string): boolean {
  return core.mapHasErrors(this.state.errors[fieldName]);
}


export function formHasErrors(this: ValidationAbleInstance): boolean {
  return toPairs(this.state.fields)
    .map(([fieldName, fieldValue]) => {
      const rules = this.validationRules[fieldName];
      const errors = core.validateRules(rules, fieldValue);
      return core.mapHasErrors(errors)
    })
    .some(Boolean);
}
