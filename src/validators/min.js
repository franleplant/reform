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

  if (control.isInputType(supportedInputTypes)) {
    const min = control.validationRules.min
    const value = control.value

    if (control.isInputType(['range', 'number'])) {
      if (!Number.isFinite(min)) {
        console.error(`Validator: "min" should have a valid number as value. Found ${min}. In ${control.elementType}`)
        return false
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

      //if (control.isInputType('date')) {
      //console.warn(`
      //min & date
      //=========

        //rawValue = ${value}
        //valueDate = ${valueDate}

        //rawMin = ${min}
        //minDate = ${minDate}

        //error = ${valueDate < minDate}

       //${JSON.stringify(control, null, 2)} 
      //`)
      //}
      return valueDate < minDate;
    }

    if (control.isInputType('month')) {
      // TODO re-use this
      function parseMonth(value) {
        let [ year, month ] = value.split("-");
        year = parseInt(year, 10)
        month = parseInt(month, 10)

        if (!Number.isFinite(year) || !Number.isFinite(month)) {
          return;
        }

        return [year, month];
      }

      const valueMonth = parseMonth(value);
      const minMonth = parseMonth(min);

      // Invalid min
      if (!minMonth) {
        // TODO generalize logging 
        console.error(`Validator: "min" should have a valid month as value. Found ${min}. In ${JSON.stringify(control, null, 2)}`)
        return false
      }

      // Invalid week
      if (!valueMonth) {
        return true
      }


      const [vYear, vMonth] = valueMonth;
      const [mYear, mMonth] = minMonth;

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
      // TODO: probably refactor this along with validators/week since they do pretty much the same
      function parseWeek(value) {
        let [ year, weekstr ] = value.split("-");
        year = parseInt(year, 10)

        // Error if weekstr is not defined
        if (!weekstr) {
          return
        }

        // We remove the "W" from "W33"
        let week = weekstr.slice(1)
        week = parseInt(week, 10)

        if (!Number.isFinite(year) || !Number.isFinite(week)) {
          return
        }

        return [year, week]
      }

      const valueWeek = parseWeek(value);
      const minWeek = parseWeek(min);

      // Invalid min
      if (!minWeek) {
        console.error(`Validator: "min" should have a valid week as value. Found ${min}. In ${JSON.stringify(control, null, 2)}`)
        return false
      }

      // Invalid week
      if (!valueWeek) {
        return true
      }


      const [vYear, vWeek] = valueWeek;
      const [mYear, mWeek] = minWeek;

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
  }

  console.warn(`Validator: "min" not supported for type ${JSON.stringify(control, null, 2)}`)
  return false
}
