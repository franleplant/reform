import * as officialValidators from './officialValidators';

export let rules = Object.assign({}, officialValidators.rules);

export default rules;

export function addRule(key, rule) {
  if (officialValidators.keys.includes(key)) {
    throw new Error(`Error at: validators.addRule(${key}, ${rule}). Key ${key} is a reserved key, please choose another one`);
  }

  if (keys().includes(key)) {
    throw new Error(`Error at: validators.addRule(${key}, ${rule}). Key ${key} already exists. Please choose another one`);
  }
  rules[key] = rule;
}

export const keys = _ => Object.keys(rules);
