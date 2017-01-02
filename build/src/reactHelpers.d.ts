import { ValidationAbleInstance, Fields } from './types';
/**
 * Calculate the validity of a field, by `fieldName`, with a new value and store it in the
 * `this.state.errors[fieldName]`
 *
 * Will return, to improve usability, whether that field is valid or not.
 *
 * Use it if you are validating `onChange`, because `this.state.fields[fieldName]` (field's value)
 * wont be already set.
 *
 *
 * **Important**: This function needs to be executed in the context of a `ValidationAbleInstance`
 * and will **not** save the `value` of the field in the state, that's your job.
 *
 * You can either use `Reform.reactMixins` to automatically bind this function to your instance (`this` inside your Component)
 * and use them as regular methods, or you can use `bind`, `apply` and `call` to run them as functions.
 *
 * ```javascript
 * // Create a new bounded function (very similar to what `reactMixins` do)
 * const boundedFunction = Reform.reactHelpers.validateField.bind(this)
 *
 * // Run it in the proper context
 * const isValid = Reform.reactHelpers.validateField.call(this, 'myField', 'new value');
 * ```
 *
 * Ultimately, the way you use it does not matter as long as it fits your style.
 * However, if you are undecided, I suggest you start by using `React.reactMixins`
 *
 * **Important** this function **will modify your component state**
 *
 * This function will also set your form to `dirty` in `this.state.formIsDirty`
 *
 */
export declare function validateField(this: ValidationAbleInstance, fieldName: string, value: any): boolean;
/**
 * A minimal variant of `validateField` but with the particularity of using the `value` already set in
 * your component's state.
 *
 * Use it if you are validating **after** updating your state, i.e.: `onBlur`, `onSubmit` et al,
 *
 * **Important** this function **will modify your component's state**
 *
 * This function will also set your form to `dirty` in `this.state.formIsDirty`
 *
 */
export declare function validateFieldFromState(this: ValidationAbleInstance, fieldName: string): boolean;
/**
 * Calculate the validity of your form from `fieldsValues` as parameters, update your state, and
 * return whether your form is valid or not.
 *
 * Unless you have a very specific use case, most of the time you should be using `validateFormFromState`.
 *
 * **Important** this function **will modify your component's state**
 *
 * This function will also set your form to `dirty` in `this.state.formIsDirty`
 */
export declare function validateForm(this: ValidationAbleInstance, fieldsValues: Fields): boolean;
/**
 * Calculate the validity of your form from `fieldsValues` as parameters, update your state, and
 * return whether your form is valid or not.
 *
 * Use it `onSubmit`.
 *
 * **Important** this function **will modify your component's state**
 *
 * This function will also set your form to `dirty` in `this.state.formIsDirty`
 */
export declare function validateFormFromState(this: ValidationAbleInstance): boolean;
/**
 * Calculate whether a field is valid or not depending on the already calculated
 * `fieldErrors` stored in the state.
 *
 * Use it to render _invalid_ state in your inputs.
 *
 * **Important** this function will **not re calculate your field's validity**
 */
export declare function fieldIsValid(this: ValidationAbleInstance, fieldName: string): boolean;
/**
 *  Calculate the form's validity from the `values` in `this.state.fields` and
 *  the rules in `this.validationRules`.
 *
 *  This function, in contrast to `fieldIsValid`, **will effectively re-calculate your form's validity**
 *
 *  Use it to disable the submit button, or to prevent `onSubmit` callback from normal
 *  processing of the form.
 */
export declare function formIsValid(this: ValidationAbleInstance): boolean;
/**
 * Simple helper to make conditional displaying field errors more ergonomic.
 *
 * Use it if to render field errors only if that field has a particular failed rule.
 *
 * ```javascript
 * { this.fieldIfError('myField', 'required') && <span> myField is required! </span>
 * ```
 *
 * This function is purely for ergonomic purposes.
 */
export declare function fieldIfError(this: ValidationAbleInstance, fieldName: string, errorKey: string): boolean;
/**
 *
 * Another error helper to make displaying field errors easier. Instead of `fieldIfError` which
 * is more procedural, use this helper if you have an structured way of displaying your errors.
 *
 * It returns an Array of Failed Rules.
 * Each Failed Rule will be, in turn, an array of the form `['ruleName', 'ruleArgument']`.
 *
 * Where `ruleName` will be the name of a failed rule, for example `required`, `minLenght, etc.
 * And `ruleArgument` will be the value of the rule, as defined by the user. For example `true`, '6', etc, respectively.
 *
 * This will enable you to create functions, or components, that will render your errors _automatically_ for you.
 *
 * Check mapFieldErrors for an even more easier way.
 *
 * ```javascript
 * const errors = this.fieldErrors('myField')
 * assert(errors, [['required', true], ['minLenght', 6], ['pattern', 'banana|apple'])
 * ```
 *
 * @Unstable
 */
export declare function fieldErrors(this: ValidationAbleInstance, fieldName: string): Array<Array<any>>;
/**
 *
 * An abstraction of `fieldErrors` for structured field error rendering.
 * Use it if you have a very standard way of displaying field errors.
 *
 * This function will use the `MessageCreator` map defined in `this.validationMessages`.
 * It will map over the failed rules of a given field and create messages for you to display
 * how ever you want.
 *
 * ```javascript
 * //Define your validationMessages
 * this.validationMessages = {
 *   // Define a per-rule message creator
 *   minLenght: (ruleValue, ruleKey, fieldName) => `${fieldName} must have at least ${ruleValue} characters`
 *   // Define a fall back for missing message creators
 *   default: (ruleValue, ruleKey, fieldName) => `{fieldName} is invalid according to rule ${ruleKey}: ${ruleValue}`
 * }
 *
 * // Example validationRules
 * this.validationRules = {
 *   myField: {minLength: 6}
 * }
 *
 * // Use inside your render function
 * {this.mapFieldErrors('myField')
 *    .map(message => (
 *      <span>{message}</span>
 *    ))
 * }
 *
 * //In our example it will render something like this
 * <span>myField must have at least 6 characters</span>
 * ```
 *
 * @Unstable
 *
 */
export declare function mapFieldErrors(this: ValidationAbleInstance, fieldName: string): Array<string>;
