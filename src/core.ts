import { Fields, FieldErrors, FormErrors, Rules, RulesMap } from './types';
import validatorInterface from './validators';


//TDO freeze
const EMPTY_OBJECT = {};

export function validateField(value: string | number, rules: Rules = {}): FieldErrors {
  const fieldErrors = {};

  for (const ruleKey in rules) {
    const ruleValue = rules[ruleKey];
    const validator = typeof ruleValue === 'function' ? ruleValue : validatorInterface.get(ruleKey);
    fieldErrors[ruleKey] = validator(value, ruleValue);
  }

  return fieldErrors;
}

export function validateForm(fieldsValues: Fields, rulesMap: RulesMap = {}): FormErrors {
  const formErrors = {}

  for (const fieldName in fieldsValues) {
    const fieldValue = fieldsValues[fieldName];
    const fieldRules = rulesMap[fieldName];
    formErrors[fieldName] = validateField(fieldValue, fieldRules);
  }

  return formErrors;
}


export function fieldIsValid(value: string | number, rules: Rules) : boolean;
export function fieldIsValid(fieldErrors: FieldErrors) : boolean;
export function fieldIsValid(...args: Array<any>): any {
  let fieldErrors: FieldErrors;

  if (args.length === 1) {
    [fieldErrors = EMPTY_OBJECT] = args;
  } else {
    const [value, rules = EMPTY_OBJECT] = args;
    fieldErrors = validateField(value, rules);
  }

  const result = true
  for (const errorKey in fieldErrors) {
    const errorResult = fieldErrors[errorKey];
    if (errorResult) {
      return false;
    }
  }

  return result;
}

export function formIsValid(fieldsValues: Fields, rulesMap: RulesMap): boolean;
export function formIsValid(formErrors: FormErrors) : boolean;
export function formIsValid(...args: Array<any>): any {
  let formErrors: FormErrors;

  if (args.length === 1) {
    [formErrors = EMPTY_OBJECT] = args;
  } else {
    const [fieldsValues, rulesMap = EMPTY_OBJECT] = args;
    formErrors = validateForm(fieldsValues, rulesMap);
  }

  const result = true
  for (const fieldName in formErrors) {
    const fieldErrors = formErrors[fieldName];
    if (!fieldIsValid(fieldErrors)) {
      return false;
    }
  }

  return result;
}
