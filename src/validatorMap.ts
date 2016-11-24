import { ValidatorMap } from './types';


const validatorMap: ValidatorMap = {
  required: value => !value,
  email: (value: string) => !/\S+@\S+\.\S+/.test(value),
  minLength: (value: string, minLength: number) => value.length < minLength,
}

export default validatorMap;
