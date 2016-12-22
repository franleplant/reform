import { ValidationAbleInstance, Rules } from './types'
import * as core from './core';

export function validate(this: ValidationAbleInstance, fieldName: string, rules: Rules) {
  const value = this.state.fields[fieldName];
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
  return core.mapMapHasErrors(this.state.errors);
}
