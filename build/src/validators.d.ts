import { Validator } from './types';
declare const validatorInterface: {
    get(key: string): Validator;
    set(key: string, value: Validator): void;
};
export default validatorInterface;
