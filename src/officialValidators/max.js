import { parseMonth, parseWeek } from '../utils';

export const supportedInputTypes = [
  'range',
  'number',
  'date',
  'month',
  'week',
  'datetime-local',
  'time',
]

export default function maxValidator(control) {
  if (!control.isInputType(supportedInputTypes)) {
    console.warn(`Validator: "max" not supported for type ${JSON.stringify(control, null, 2)}`)
    return false
  }

  let max = control.validationRules.max
  let value = control.value

  // Special case for empty values. This is the job of the `required` validator
  if (!value) {
    return false;
  }

  if (control.isInputType(['range', 'number'])) {
    try {
      max = parseInt(max, 10);
      value = parseInt(value, 10);

      if (!Number.isFinite(max)) {
        throw new Error('not finite');
      }

    } catch (err) {
      console.error(`Validator: "max" should have a valid number as value. Found ${max}. In ${control.elementType}`)
      return false;
    }

    if (!Number.isFinite(value)) {
      return true;
    }

    return value > max
  }

  if (control.isInputType(['date', 'datetime-local'])) {
    const maxDate = Date.parse(max)
    const valueDate = Date.parse(value)
    if (Number.isNaN(maxDate)) {
      console.error(`Validator: "max" should have a valid date as value. Found ${max}. In ${JSON.stringify(control, null, 2)}`)
      return false
    }

    if (Number.isNaN(valueDate)) {
      return true;
    }

    return valueDate > maxDate;
  }

  if (control.isInputType('month')) {
    const [vYear, vMonth] = parseMonth(value);
    const [mYear, mMonth] = parseMonth(max);

    // Invalid max
    if (!mYear || !mMonth) {
      console.error(`Validator: "max" should have a valid month as value. Found ${max}. In ${JSON.stringify(control, null, 2)}`)
      return false
    }

    // Invalid week
    if (!vYear || !vMonth) {
      return true
    }



    let error = false;

    if (vYear > mYear) {
      error = true;
    } else if (vYear < mYear) {
      error = false;
    } else if (vYear === mYear) {
      error = vMonth > mMonth
    };



    return  error;
  }

  if (control.isInputType('week')) {
    const [vYear, vWeek] = parseWeek(value);
    const [mYear, mWeek] = parseWeek(max);

    // Invalid max
    if (!mYear || !mWeek) {
      console.error(`Validator: "max" should have a valid week as value. Found ${max}. In ${JSON.stringify(control, null, 2)}`)
      return false
    }

    // Invalid week
    if (!vYear || !vWeek) {
      return true
    }

    let error = false;

    if (vYear > mYear) {
      error = true;
    } else if (vYear < mYear) {
      error = false;
    } else if (vYear === mYear) {
      error = vWeek > mWeek
    };



    return  error;
  }

  if (control.isInputType('time')) {
    // Hack to make parsing times easier
    // TODO: review this
    const baseDate = "1970-01-01"
    const maxDate = Date.parse(baseDate + ' ' + max)
    const valueDate = Date.parse(baseDate + ' ' + value)
    if (Number.isNaN(maxDate)) {
      console.error(`Validator: "max" should have a valid time as value. Found ${max}. In ${JSON.stringify(control, null, 2)}`)
      return false
    }

    // TODO: do we need to validate if the date is invalid
    if (Number.isNaN(valueDate)) {
      return true;
    }



    return valueDate > maxDate;
  }

  console.warn(`Validator: "max" not supported for type ${JSON.stringify(control, null, 2)}`)
  return false
}
