
export const isFunctionType = element => typeof element.type === 'function'

// Slumpy way of detecting text elements
export const isTextType = el => !el.type

export const isType = (element, types) => {
  types = Array.isArray(types) ? types : [types]
  return types.includes(element.type)
}

export const isForm = element => element.type === 'form'
export const isSubmitInput = element => element.type === 'input' && element.props.type === 'submit'

// TODO: should we follow HTML convention of every button wihout a type diffierent to 'submit' is a submit button?
export const isSubmitButton = element => element.type === 'button' && element.props.type === 'submit'


export function isRadio(element) {
  //if it's a radio input then value should be set for the checked input if not it should be ''
  //warn user when not all radio buttons with the same name have the same validationRules
  const elementType = element.type;
  const inputType = element.props.type;
  // TODO: test all this with minified builds of react-bootstrap
  let isBootstrapRadio = false;
  try {
    if (type.name === 'Radio') {
      isBootstrapRadio = true
    }
  } catch (e) {}

  return inputType === 'radio' || isBootstrapRadio
}


export const getValidationRules = (element = {}) => {
  const props = element.props || {}

  let rules = {}

  if (props.required) {
    rules.required = props.required
  }

  if (props.minLength) {
    rules.minLength = props.minLength;
  }

  if (props.maxLength) {
    rules.maxLength = props.maxLength;
  }

  if (props.pattern) {
    rules.pattern = props.pattern
  }

  if (props.min) {
    rules.min = props.min
  }

  if (props.max) {
    rules.max = props.max
  }

  // The important part is the key, the value can be anything truthy
  if (props.type === 'email') {
    rules.email = 'email'
  }

  if (props.type === 'url') {
    rules.url = 'url'
  }

  // TODOs!
  if (props.type === 'date') {
    rules.date = 'date'
  }

  if (props.type === 'month') {
    rules.month = 'month'
  }

  if (props.type === 'week') {
    rules.week = 'week'
  }

  if (props.type === 'datetime') {
    console.error(`<input type='datetime' /> is not supported any more. In ${element}`)
    rules.datetime = 'datetime'
  }

  if (props.type === 'datetime-local') {
    rules['datetime-local'] = 'datetime-local'
  }

  if (props.type === 'time') {
    rules.time = 'time'
  }

  if (props.type === 'number') {
    rules.number = 'number'
  }

  if (props.type === 'range') {
    rules.range = 'range'
  }

  return rules
}


