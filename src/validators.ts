import { Validator } from "./types";
import validatorMap from "./officialValidators";

/**
 * Main validator interface.
 *
 * It is simply a wrapper on top of an object that contains
 * all the single functions that each `officialValidators/**` module exports.
 *
 * The main reasons for this abstraction to exist are:
 *
 * - Throw errors when a wrong validation rule key is passed (i.e. in `this.validationRules`)
 * - Allow the user to set new global available custom validators
 * - Throw errors when the user is trying to overwrite an already existing validator
 *
 * Use it if you want to add new global custom validators.
 */
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
      throw new Error(
        `Validator ${key} is already used, please use another name`
      );
    }

    validatorMap[key] = value;
  },
};

export default validatorInterface;
