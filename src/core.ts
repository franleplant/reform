import { toPairs } from './utils';
import { Fields, ErrorMap, ErrorMapMap, Rules, RulesMap } from './types';
import validatorInterface from './validators';


// TODO, each single validator must solve the case of empty values
// for example, email validator usually does not want to throw an error if that email is void
export function validateRules(rules: Rules = {}, value: string | number): ErrorMap {
  const errorMap = {};

  toPairs(rules).forEach(([ruleKey, ruleValue]) => {
    const validator = typeof ruleValue === 'function' ? ruleValue : validatorInterface.get(ruleKey);
    const errorState = validator(value, ruleValue);
    errorMap[ruleKey] = errorState;
  });

  return errorMap;
}

export function mapHasErrors(errorMap: ErrorMap = {}): boolean {
  return (Object as any).values(errorMap).some(Boolean);
}

export function mapMapHasErrors(errorMapMap: ErrorMapMap): boolean {
  return (Object as any).values(errorMapMap).some(mapHasErrors);
}

export function formHasErrors(fields: Fields, rulesMap: RulesMap): boolean {
  return toPairs(fields)
    .map(([fieldName, fieldValue]) => {
      const rules = rulesMap[fieldName];
      const errors = validateRules(rules, fieldValue);
      return mapHasErrors(errors)
    })
    .some(Boolean);
}
