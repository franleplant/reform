import { Fields, FieldErrors, FormErrors, Rules, RulesMap } from './types';
export declare function validateField(value: string | number, rules?: Rules): FieldErrors;
export declare function validateForm(fieldsValues: Fields, rulesMap?: RulesMap): FormErrors;
export declare function fieldIsValid(value: string | number, rules: Rules): boolean;
export declare function fieldIsValid(fieldErrors: FieldErrors): boolean;
export declare function formIsValid(fieldsValues: Fields, rulesMap: RulesMap): boolean;
export declare function formIsValid(formErrors: FormErrors): boolean;
