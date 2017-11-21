import { ValidatorMap } from "../types";
/**
 * These are all the official validators HTML5 validators.
 *
 *
 * They are slightly differently expressed.
 *
 * Example 1
 *
 * ```javascript
 * //HTML5
 * <input name="myEmail" type="email" min-length=5 required />
 *
 * // Reform
 * this.validationRules = {
 *  myEmail: {
 *    email: true,
 *    minLength: 5,
 *    required: true
 *  }
 * }
 * ```
 *
 * Example 2
 *
 * ```javascript
 * //HTML5
 * <input name="myField" type="number" min=5  max=15 />
 *
 * // Reform
 * this.validationRules = {
 *  myField: {
 *    number: true,
 *    minNumber: 5,
 *    maxNumber: 15,
 *  }
 * }
 * ```
 *
 *
 *
 *
 */
declare const validatorMap: ValidatorMap;
export default validatorMap;
