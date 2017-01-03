import * as helpers from './reactHelpers';
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
    displayName: string;
}
export declare function classMixin<T extends Base>(base: GenericClass<T>): GenericClass<T & Reform>;
export declare function functionalMixin(instance: any): void;
