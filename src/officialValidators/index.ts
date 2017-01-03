import { ValidatorMap, Validator } from '../types';
import { url } from './url'
import { time } from './time'
import { month } from './month'
import { week } from './week'
import { minNumber } from './minNumber'
import { maxNumber } from './maxNumber'
import { minDate } from './minDate'
import { maxDate } from './maxDate'
import { minMonth } from './minMonth'
import { maxMonth } from './maxMonth'
import { minTime } from './minTime'
import { maxTime } from './maxTime'
import { minWeek } from './minWeek'
import { maxWeek } from './maxWeek'


/**
 * @hidden
 */
const isNumber: Validator = value => (!!value || value === 0) && !Number.isFinite(parseFloat(value));

/**
 * @hidden
 */
const validatorMap: ValidatorMap = {
  required: value => !value,
  email: (value: string) => !!value && !/\S+@\S+\.\S+/.test(value),
  minLength: (value: string, minLength: number) => !!value && value.length < minLength,
  maxLength: (value: string, maxLength: number) => !!value && value.length > maxLength,
  pattern: (value: string, re: RegExp) => !!value && !re.test(value),
  number: isNumber,
  range: isNumber,
  color: value => !!value && !/^#[0-9A-F]{6}$/.test(value),
  date: value => !!value && Number.isNaN(Date.parse(value)),
  time,
  url,
  month,
  week,
  minNumber,
  maxNumber,
  minDate,
  maxDate,
  minMonth,
  maxMonth,
  minTime,
  maxTime,
  minWeek,
  maxWeek,
}

export default validatorMap;


