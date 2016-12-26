import { ValidationAbleInstance, Fields } from './types';
export declare function validateField(this: ValidationAbleInstance, fieldName: string, value: any): boolean;
export declare function validateFieldFromState(this: ValidationAbleInstance, fieldName: string): boolean;
export declare function validateForm(this: ValidationAbleInstance, fieldsValues: Fields): boolean;
export declare function validateFormFromState(this: ValidationAbleInstance): boolean;
export declare function fieldIsValid(this: ValidationAbleInstance, fieldName: string): boolean;
export declare function formIsValid(this: ValidationAbleInstance): boolean;
export declare function getFieldErrors(this: ValidationAbleInstance, fieldName: string): any[][];
export declare function fieldIfError(this: ValidationAbleInstance, fieldName: string, errorKey: string): boolean;
export interface Reform {
    validateField: typeof validateField;
    validateFieldFromState: typeof validateFieldFromState;
    fieldIsValid: typeof fieldIsValid;
    validateForm: typeof validateForm;
    validateFormFromState: typeof validateFormFromState;
    formIsValid: typeof formIsValid;
    getFieldErrors: typeof getFieldErrors;
    fieldIfError: typeof fieldIfError;
}
export interface Base {
}
export interface GenericClass<T> {
    new (): T;
    readonly prototype: T;
    displayName: string;
}
export declare function reformClassMixin<T extends Base>(base: GenericClass<T>): GenericClass<T & Reform>;
export declare function reformFunctionalMixin(instance: any): void;
