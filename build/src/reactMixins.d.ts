import * as helpers from './reactHelpers';
/**
 * Handy interface that contains attributes corresponding to each
 * `Reform.reactHelpers.*` method.
 *
 * Used by the `classMixin`.
 */
export interface Reform {
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
 *  @hidden
 */
export interface Base {
}
/**
 *  @hidden
 */
export interface GenericClass<T> {
    new (): T;
    readonly prototype: T;
    displayName?: string;
}
/**
 * Class based mixin to auto-bind all `Reform.reactHelpers.*` methods into the `base` Component.
 *
 * Use it if you want to have all reactHelpers available in your component's instance.
 *
 * Recommended when using Typescript since will give you good autocomplete type suggestions
 * support.
 *
 * Note: This is implementing something very similar to Inheritance Inversion, but it's completely
 * independent from React.
 *
 * Example1
 *
 * ```javascript
 * const MyComponentPlusReform = classMixin(MyComponent);
 * ```
 *
 * Example 2: with decorators
 *
 * ```javascript
 * $classMixin
 * class MyComponent extends React.Component {}
 * ```
 *
 * NOTE: since limitations of the tool generating the docs I cannot use `@` as decorator, demands.
 * So replace `$` with `@`
 */
export declare function classMixin<T extends Base>(base: GenericClass<T>): GenericClass<T & Reform>;
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
export declare function functionalMixin(instance: any): void;
