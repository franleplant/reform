// Generated by dts-bundle v0.6.1

declare module '@franleplant/reform' {
    import * as types from "@franleplant/reform/types";
    import * as core from "@franleplant/reform/core";
    import validators from "@franleplant/reform/validators";
    import * as reactHelpers from "@franleplant/reform/reactHelpers";
    import * as reactMixins from "@franleplant/reform/reactMixins";
    export { types, core, validators, reactHelpers, reactMixins };
    /**
      *  `default` export for the entire library.
      *
      *  ```javascript
      *  // using the default export
      *  import Reform from '@franleplant/reform'
      *
      *  // importing only the needed parts
      *  import { reactMixins } from '@franleplant/reform'
      *
      *  ```
      *
      */
    const Reform: {
        types: typeof types;
        core: typeof core;
        validators: {
            get(key: string): types.Validator;
            set(key: string, value: types.Validator): void;
        };
        reactHelpers: typeof reactHelpers;
        reactMixins: typeof reactMixins;
    };
    export default Reform;
}

declare module '@franleplant/reform/types' {
    export interface Validator {
        (value: string | number | any, ruleValue?: any): boolean;
    }
    export interface ValidatorMap {
        [ruleKey: string]: Validator;
    }
    export interface Rules {
        [ruleKey: string]: boolean | string | Validator | any;
    }
    export interface RulesMap {
        [fieldName: string]: Rules;
    }
    export interface FieldErrors {
        [ruleKey: string]: boolean;
    }
    export interface FormErrors {
        [fieldName: string]: FieldErrors;
    }
    export interface Fields {
        [fieldName: string]: any;
    }
    export type MessageCreator = (ruleArgument?: any, ruleKey?: string, fieldName?: string) => string;
    export interface ValidationAbleInstance {
        validationRules: RulesMap;
        validationMessages?: {
            [ruleKey: string]: MessageCreator;
        };
        state: {
            fields: Fields;
            errors: FormErrors;
            formIsDirty?: boolean;
        };
        setState: any;
    }
}

declare module '@franleplant/reform/core' {
    import { Fields, FieldErrors, FormErrors, Rules, RulesMap } from "@franleplant/reform/types";
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
    export function validateField(value: string | number, rules?: Rules): FieldErrors;
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
    export function fieldIsValid(value: string | number, rules: Rules): boolean;
    export function fieldIsValid(fieldErrors: FieldErrors): boolean;
    /**
        * A simple generalization of `validateField` but for an entire form.
        * It will basically run `validateField` on each `value` and each `rules`
        * indexed by `fieldName` and return `FormErrors` which is, an object that has
        * fieldNames as keys and `FieldErrors` as values.
        *
        */
    export function validateForm(fieldsValues: Fields, rulesMap?: RulesMap): FormErrors;
    /**
        * Analogous to `fieldIsValid` but operating for forms. There are also
        * two variants, the first one accepts values and rules and calculates the
        * `formErrors` and then check that all fields are valid, and the second
        * one accepts an already calculated `formErrors`.
        *
        */
    export function formIsValid(fieldsValues: Fields, rulesMap: RulesMap): boolean;
    export function formIsValid(formErrors: FormErrors): boolean;
}

declare module '@franleplant/reform/validators' {
    import { Validator } from "@franleplant/reform/types";
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
    const validatorInterface: {
        get(key: string): Validator;
        set(key: string, value: Validator): void;
    };
    export default validatorInterface;
}

declare module '@franleplant/reform/reactHelpers' {
    import { Fields } from "@franleplant/reform/types";
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
    export function validateField(fieldName: string, value: any): boolean;
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
    export function validateFieldFromState(fieldName: string): boolean;
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
    export function validateForm(fieldsValues: Fields): boolean;
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
    export function validateFormFromState(): boolean;
    /**
        * Calculate whether a field is valid or not depending on the already calculated
        * `fieldErrors` stored in the state.
        *
        * Use it to render _invalid_ state in your inputs.
        *
        * **Important** this function will **not re calculate your field's validity**
        */
    export function fieldIsValid(fieldName: string): boolean;
    /**
        *  Calculate the form's validity from the `values` in `this.state.fields` and
        *  the rules in `this.validationRules`.
        *
        *  This function, in contrast to `fieldIsValid`, **will effectively re-calculate your form's validity**
        *
        *  Use it to disable the submit button, or to prevent `onSubmit` callback from normal
        *  processing of the form.
        */
    export function formIsValid(): boolean;
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
    export function fieldIfError(fieldName: string, errorKey: string): boolean;
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
    export function fieldErrors(fieldName: string): Array<[string, any]>;
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
    export function mapFieldErrors(fieldName: string): Array<string>;
}

declare module '@franleplant/reform/reactMixins' {
    import { ValidationAbleInstance } from "@franleplant/reform/types";
    import * as helpers from "@franleplant/reform/reactHelpers";
    /**
        * Handy interface that contains attributes corresponding to each
        * `Reform.reactHelpers.*` method.
        */
    export interface IReform {
            validateField: typeof helpers.validateField;
            validateFieldFromState: typeof helpers.validateFieldFromState;
            fieldIsValid: typeof helpers.fieldIsValid;
            validateForm: typeof helpers.validateForm;
            validateFormFromState: typeof helpers.validateFormFromState;
            formIsValid: typeof helpers.formIsValid;
            fieldErrors: typeof helpers.fieldErrors;
            fieldIfError: typeof helpers.fieldIfError;
            mapFieldErrors: typeof helpers.mapFieldErrors;
    }
    /**
        * Simplest mixin (well not really a mixin) that binds all
        * reform helpers to your context and returns an object containing all common helerps.
        *
        * Use it with typescript to get type checks and autocomplete.
        *
        * ```typescript
        *  class MyForm extends React.Component<any, any> {
        *    reform = objectMixin(this)
        *  }
        * ```
        *
        */
    export function objectMixin(that: ValidationAbleInstance): IReform;
    /**
        * Functional mixin to incorporate all reactHelpers methods into your Component's instance.
        *
        * Use it in Javascript without the need of decorators.
        *
        * Example
        *
        * ```javascript
        * class MyComponent extends React.Component {
        *  constructor(...args) {
        *    super(...args)
        *
        *    functionalMixin(this);
        *
        *    // Now all reactHelpers will be available through this.[reactHelper]
        *    this.validateForm
        *    this.fieldIsValid
        *    // etc
        *  }
        * }
        * ```
        */
    export function functionalMixin(instance: any): void;
}

