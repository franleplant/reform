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

export interface FieldErrors {
  [ruleKey: string]: boolean;
}

export interface FormErrors {
  [fieldName: string]: FieldErrors;
}

export interface Fields {
  [fieldName: string]: any;
}

export type MessageCreator = (
  ruleArgument?: any,
  ruleKey?: string,
  fieldName?: string
) => string;

export interface ValidationAbleInstance {
  validationRules: RulesMap;
  validationMessages?: {
    [ruleKey: string]: MessageCreator;
  };

  state: {
    fields: Fields;
    errors: FormErrors;
    formIsDirty?: boolean;
  };

  setState: any;
}
