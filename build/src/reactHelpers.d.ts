import { ValidationAbleInstance, Rules } from './types';
export declare function validate(this: ValidationAbleInstance, fieldName: string, rules: Rules): void;
export declare function fieldIfError(this: ValidationAbleInstance, fieldName: string, errorKey: string): boolean;
export declare function fieldHasErrors(this: ValidationAbleInstance, fieldName: string): boolean;
export declare function formHasErrors(this: ValidationAbleInstance): boolean;
