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

export default function minValidator(control) {
  if (!control.isInputType(supportedInputTypes)) {
    console.warn(`Validator: "min" not supported for type ${JSON.stringify(control, null, 2)}`)
    return false
  }

  let min = control.validationRules.min
  let value = control.value

  // Special case for empty values. This is the job of the `required` validator
  if (!value) {
    return false;
  }

  if (control.isInputType(['range', 'number'])) {
    try {
      min = parseInt(min, 10);
      value = parseInt(value, 10);

      if (!Number.isFinite(min)) {
        throw new Error('not finite');
      }

    } catch (err) {
      console.error(`Validator: "min" should have a valid number as value. Found ${min}. In ${control.elementType}`)
      return false;
    }

    if (!Number.isFinite(value)) {
      return true;
    }

    return value < min
  }

  if (control.isInputType(['date', 'datetime-local'])) {
    const minDate = Date.parse(min)
    const valueDate = Date.parse(value)
    if (Number.isNaN(minDate)) {
      console.error(`Validator: "min" should have a valid date as value. Found ${min}. In ${JSON.stringify(control, null, 2)}`)
      return false
    }

    if (Number.isNaN(valueDate)) {
      return true;
    }

    return valueDate < minDate;
  }

  if (control.isInputType('month')) {
    const [vYear, vMonth] = parseMonth(value);
    const [mYear, mMonth] = parseMonth(min);

    // Invalid min
    if (!mYear || !mMonth) {
      // TODO generalize logging 
      console.error(`Validator: "min" should have a valid month as value. Found ${min}. In ${JSON.stringify(control, null, 2)}`)
      return false
    }

    // Invalid week
    if (!vYear || !vMonth) {
      return true
    }



    let error = false;

    if (vYear < mYear) {
      error = true;
    } else if (vYear > mYear) {
      error = false;
    } else if (vYear === mYear) {
      error = vMonth < mMonth
    };



    return  error;
  }

  if (control.isInputType('week')) {
    const [vYear, vWeek] = parseWeek(value);
    const [mYear, mWeek] = parseWeek(min);

    // Invalid min
    if (!mYear || !mWeek) {
      console.error(`Validator: "min" should have a valid week as value. Found ${min}. In ${JSON.stringify(control, null, 2)}`)
      return false
    }

    // Invalid week
    if (!vYear || !vWeek) {
      return true
    }

    let error = false;

    if (vYear < mYear) {
      error = true;
    } else if (vYear > mYear) {
      error = false;
    } else if (vYear === mYear) {
      error = vWeek < mWeek
    };



    return  error;
  }

  if (control.isInputType('time')) {
    // Hack to make parsing times easier
    // TODO: review this
    const baseDate = "1970-01-01"
    const minDate = Date.parse(baseDate + ' ' + min)
    const valueDate = Date.parse(baseDate + ' ' + value)
    if (Number.isNaN(minDate)) {
      console.error(`Validator: "min" should have a valid time as value. Found ${min}. In ${JSON.stringify(control, null, 2)}`)
      return false
    }

    // TODO: do we need to validate if the date is invalid
    if (Number.isNaN(valueDate)) {
      return true;
    }

    return valueDate < minDate;
  }

  console.warn(`Validator: "min" not supported for type ${JSON.stringify(control, null, 2)}`)
  return false
}
