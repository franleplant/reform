import { ValidationAbleInstance } from "./types";
import * as helpers from "./reactHelpers";

/**
 *  @hidden
 */
const mixinProperties = Object.keys(helpers);

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
export function objectMixin(that: ValidationAbleInstance): IReform {
  const reform = {
    validateField: helpers.validateField.bind(that),
    validateFieldFromState: helpers.validateFieldFromState.bind(that),
    fieldIsValid: helpers.fieldIsValid.bind(that),
    validateForm: helpers.validateForm.bind(that),
    validateFormFromState: helpers.validateFormFromState.bind(that),
    formIsValid: helpers.formIsValid.bind(that),
    fieldErrors: helpers.fieldErrors.bind(that),
    fieldIfError: helpers.fieldIfError.bind(that),
    mapFieldErrors: helpers.mapFieldErrors.bind(that),
  };

  return reform;
}

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
export function functionalMixin(instance: any) {
  mixinProperties.forEach(prop => {
    if (instance[prop] != null) {
      // TODO: better error message
      throw new Error(
        `Wrapped Component already implements method, please use another one`
      );
    }
  });

  instance.validateField = helpers.validateField;
  instance.validateFieldFromState = helpers.validateFieldFromState;
  instance.fieldIsValid = helpers.fieldIsValid;
  instance.validateForm = helpers.validateForm;
  instance.validateFormFromState = helpers.validateFormFromState;
  instance.formIsValid = helpers.formIsValid;
  instance.fieldErrors = helpers.fieldErrors;
  instance.fieldIfError = helpers.fieldIfError;
  instance.mapFieldErrors = helpers.mapFieldErrors;
}
