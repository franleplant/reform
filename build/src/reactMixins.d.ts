import { ValidationAbleInstance } from "./types";
import * as helpers from "./reactHelpers";
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
export declare function objectMixin(that: ValidationAbleInstance): IReform;
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
