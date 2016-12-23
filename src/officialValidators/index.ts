import { ValidatorMap, Validator } from '../types';
import { url } from './url'
import { time } from './time'
import { month } from './month'
import { week } from './week'


//TODO
//import min from './min'
//import max from './max'

const isNumber: Validator = value => !Number.isFinite(parseFloat(value));

const validatorMap: ValidatorMap = {
  required: value => !value,
  email: (value: string) => !/\S+@\S+\.\S+/.test(value),
  minLength: (value: string, minLength: number) => value.length < minLength,
  maxLength: (value: string, maxLength: number) => value.length > maxLength,
  pattern: (value: string, pattern: string) => !(new RegExp(pattern)).test(value),
  number: isNumber,
  range: isNumber,
  color: value => !/^#[0-9A-F]{6}$/.test(value),
  date: value => Number.isNaN(Date.parse(value)),
  time,
  url,
  month,
  week,
}

export default validatorMap;


