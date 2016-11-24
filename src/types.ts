

export interface Validator {
  (value: string | number | any, ruleValue?: any): boolean;
}


export interface ValidatorMap {
  [ruleKey: string]: Validator;
}

export interface Rules {
  [ruleKey: string]: boolean | string | Validator | any;
}

export interface ErrorMap {
  [ruleKey: string]: boolean;
}

export interface ErrorMapMap {
  [fieldName: string]: ErrorMap;
}
