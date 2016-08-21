
export const isFunctionType = element => typeof element.type === 'function'

// Slumpy way of detecting text elements
export const isTextType = el => !el.type

export const isType = (element, types) => {
  types = Array.isArray(types) ? types : [types]
  return types.includes(element.type)
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

  if (props.pattern) {
    rules.pattern = props.pattern
  }

  if (props.type === 'email') {
    rules.email = 'email'
  }

  return rules
}


// TODO: support all kind of submit elements
export const isSubmitButton = element => element.type === 'button' && element.props.type === 'submit'
export const isForm = element => element.type === 'form'

