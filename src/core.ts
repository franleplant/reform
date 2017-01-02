import { Fields, FieldErrors, FormErrors, Rules, RulesMap } from './types';
import validatorInterface from './validators';


/**
 *  @hidden
 */
const EMPTY_OBJECT = Object.freeze({});

/**
 * Validate `value` against `rules` and return which rules are valid with a value `false`
 * and which rules ar invalid with a value of `true`.
 *
 * One of the central functions in `Reform.core`.
 * Accepts inline, ad-hoc, validators as well as available ones (`required`, `pattern`, etc).
 *
 * Example
 *
 * ```javascript
 * // a required empty value should be invalid.
 * const fieldErrors = validateField('', {required: true});
 * assert(fieldErrors, {required: true});
 *
 * // an invalid email value
 * const fieldErrors = validateField('not an email', {email: true});
 * assert(fieldErrors, {email: true});
 * // a valid email value
 * const fieldErrors = validateField('email@domain.com', {email: true});
 * assert(fieldErrors, {email: false});
 *
 * // And of course you can combine them
 * const fieldErrors = validateField('email@domain.com', {required: true, email: true});
 * assert(fieldErrors, {required: false, email: false});
 * ```
 *
 * The most important part is that the result of this function, which is of the type `FieldErrors`
 * will be an object that has rule names as keys with boolean values. If the value is `true` it means
 * that there is an error, otherwise, it does not have an error, and that rule is passing.
 *
 */
export function validateField(value: string | number, rules: Rules = {}): FieldErrors {
  const fieldErrors = {};

  for (const ruleKey in rules) {
    const ruleValue = rules[ruleKey];
    const validator = typeof ruleValue === 'function' ? ruleValue : validatorInterface.get(ruleKey);
    fieldErrors[ruleKey] = validator(value, ruleValue);
  }

  return fieldErrors;
}


/**
 * Evaluate whether a field is valid or not.
 *
 * This function is a lightweight wrapper of `validateField`.
 * It has two variants, as listed below.
 * The first one is not so different from `validateField`, the only difference is that
 * it will return whether that field is valid (all values in `FieldErrors` are false)
 * or is invalid (at least one value in `FieldErrors` is true).
 *
 * The second variant accepts an already calculated `FieldErrors` and just check
 * if all values are false (valid field) or some are true (invalid field).
 * This is useful if you already calculated `FieldErrors` in another event. In this
 * way you can avoid re calculating them again each time you want to know if the field is valid.
 *
 */
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


/**
 * A simple generalization of `validateField` but for an entire form.
 * It will basically run `validateField` on each `value` and each `rules`
 * indexed by `fieldName` and return `FormErrors` which is, an object that has
 * fieldNames as keys and `FieldErrors` as values.
 *
 */
export function validateForm(fieldsValues: Fields, rulesMap: RulesMap = {}): FormErrors {
  const formErrors = {}

  for (const fieldName in fieldsValues) {
    const fieldValue = fieldsValues[fieldName];
    const fieldRules = rulesMap[fieldName];
    formErrors[fieldName] = validateField(fieldValue, fieldRules);
  }

  return formErrors;
}

/**
 * Analogous to `fieldIsValid` but operating for forms. There are also
 * two variants, the first one accepts values and rules and calculates the
 * `formErrors` and then check that all fields are valid, and the second
 * one accepts an already calculated `formErrors`.
 *
 */
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
