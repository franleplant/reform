import  * as Control from '../control';


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

  if (Control.isInputType(control, supportedInputTypes)) {
    const min = control.validationRules.min
    const value = control.value

    if (Control.isInputType(control, ['range', 'number'])) {
      if (!Number.isFinite(min)) {
        console.error(`Validator: "min" should have a valid number as value. Found ${min}. In ${control.elementType}`)
        return false
      }

      if (!Number.isFinite(value)) {
        return true;
      }

      return value < min
    }

    if (Control.isInputType(control, ['date', 'month', 'week', 'datetime-local'])) {
      const minDate = Date.parse(min)
      const valueDate = Date.parse(value)
      if (Number.isNaN(minDate)) {
        console.error(`Validator: "min" should have a valid date as value. Found ${min}. In ${control.elementType}`)
        return false
      }

      if (Number.isNaN(valueDate)) {
        return true;
      }

      return valueDate < min
    }

    if (Control.isInputType(control, ['time'])) {
      // Hack to make parsing times easier
      // TODO: review this
      const baseDate = "1970-01-01"
      const minDate = Date.parse(baseDate + ' ' + min)
      const valueDate = Date.pare(baseDate + ' ' + value)
      if (Number.isNaN(minDate)) {
        console.error(`Validator: "min" should have a valid time as value. Found ${min}. In ${control.elementType}`)
        return false
      }

      // TODO: do we need to validate if the date is invalid
      if (Number.isNaN(valueDate)) {
        return true;
      }

      return valueDate.getTime() < min.getTime()
    }
  }

  console.warn(`Validator: "min" not supported for type ${JSON.stringify(control, null, 2)}`)
  return false
}
