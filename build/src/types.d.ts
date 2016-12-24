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
export interface ErrorMap {
    [ruleKey: string]: boolean;
}
export interface ErrorMapMap {
    [fieldName: string]: ErrorMap;
}
export interface Fields {
    [fieldName: string]: any;
}
export interface ValidationAbleInstance {
    validationRules: RulesMap;
    state: {
        fields: Fields;
        errors: {
            [fieldName: string]: any;
        };
        formIsDirty?: boolean;
    };
    setState: any;
}