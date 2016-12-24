import { ValidationAbleInstance } from './types';
export declare function validate(this: ValidationAbleInstance, fieldName: string, value: any): void;
export declare function validateFromState(this: ValidationAbleInstance, fieldName: string): void;
export declare function fieldIfError(this: ValidationAbleInstance, fieldName: string, errorKey: string): boolean;
export declare function fieldHasErrors(this: ValidationAbleInstance, fieldName: string): boolean;
export declare function formHasErrors(this: ValidationAbleInstance): boolean;
export declare function getFieldErrors(this: ValidationAbleInstance, fieldName: string): any[][];
