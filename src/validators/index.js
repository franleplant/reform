import required from './required'
import minLength from './minLength'
import maxLength from './maxLength'
import pattern from './pattern'
import min from './min'
//import max from './max'

// TODO Do we really need to validate step? It doesn't look like it
//import step from './step'

// Input Types
import email from './email'
import url from './url'
import number from './number'
import range from './range'
import date from './date'
import month from './month'
import week from './week'
import time from './time'
import datetimeLocal from './datetime-local'
import color from './color'


export const validators = {
  required,
  minLength,
  maxLength,
  pattern,
  min,
  //max,
  email,
  url,
  number,
  range,
  date,
  month,
  week,
  time,
  'datetime-local': datetimeLocal,
  color,
}


export const validatorKeys = Object.keys(validators);
