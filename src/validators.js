import * as officialValidators from './officialValidators';

export let rules = Object.assign({}, officialValidators.rules);

export default rules;

export function addRule(key, rule) {
  if (officialValidators.keys.includes(key)) {
    throw new Error(`validators.addRule(${key}, ${rule}). Key ${key} is a reserved key, please choose another one`);
  }
  rules[key] = rule;
}

