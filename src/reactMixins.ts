//import { ValidationAbleInstance, Fields } from './types'
import * as helpers from './reactHelpers';


/**
 *  @hidden
 */
const mixinProperties = Object.keys(helpers);

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
export interface Base {}
/**
 *  @hidden
 */
export interface GenericClass<T> {
  new (): T
  readonly prototype: T;
  displayName: string;
}


export function classMixin<T extends Base>(base: GenericClass<T>): GenericClass<T & Reform> {
  mixinProperties.forEach(prop => {
    if (base[prop] != null) {
      // TODO: better error message
      throw new Error(`Wrapped Component already implements method, please use another one`)
    }
  })

  class ReformImpl extends (base as GenericClass<Base>) implements Reform {
    static displayName = `Reform(${base.displayName})`;
    validateField = helpers.validateField;
    validateFieldFromState = helpers.validateFieldFromState;
    fieldIsValid = helpers.fieldIsValid;
    validateForm = helpers.validateForm;
    validateFormFromState = helpers.validateFormFromState;
    formIsValid = helpers.formIsValid;
    fieldErrors = helpers.fieldErrors;
    fieldIfError = helpers.fieldIfError;
    mapFieldErrors = helpers.mapFieldErrors
  }

  return ReformImpl as GenericClass<T & Reform>;
}

export function functionalMixin(instance: any) {
  mixinProperties.forEach(prop => {
    if (instance[prop] != null) {
      // TODO: better error message
      throw new Error(`Wrapped Component already implements method, please use another one`)
    }
  })

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
