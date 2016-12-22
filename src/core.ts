// TODO use lodash.topairs and sort out ts nightmares
import { toPairs } from 'lodash';
import { ErrorMap, ErrorMapMap, Rules } from './types';
import validatorInterface from './validators';


export function validateRules(rules: Rules, value: string | number): ErrorMap {
//TODO this does not work! Let individual validators handle this special case
  // Special case so when an input is missing, dont assert the rest of the rules
  // since it does not make sense
  if (value === '' && !rules['required']) {
    return {}
  }

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
