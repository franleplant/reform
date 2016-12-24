import { Fields, ErrorMap, ErrorMapMap, Rules, RulesMap } from './types';
export declare function validateRules(rules: Rules, value: string | number): ErrorMap;
export declare function mapHasErrors(errorMap?: ErrorMap): boolean;
export declare function mapMapHasErrors(errorMapMap: ErrorMapMap): boolean;
export declare function formHasErrors(fields: Fields, rulesMap: RulesMap): boolean;
