import { Validator } from './types';
import validatorMap from './officialValidators';

const validatorInterface = {
  get(key: string): Validator {
    const validator = validatorMap[key];
    if (!validator) {
      throw new Error(`Validator ${key} not found`);
    }

    return validator;
  },

  set(key: string, value: Validator): void {
    if (validatorMap.hasOwnProperty(key)) {
      throw new Error(`Validator ${key} is already used, please use another name`);
    }

    validatorMap[key] = value;
  }
}

export default validatorInterface;
