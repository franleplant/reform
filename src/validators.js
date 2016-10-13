let typeValidators = {
  email: value => {
    return value.includes('@')? {ok: true, error: ''} : {ok: false, error: 'Invalid email format'}
  }
}


export const ATTRS = ['type', 'required', 'value']
export function getConstraints(el) {
  let constraints = {}
  ATTRS.forEach(attr => constraints[attr] = el[attr])
  return constraints
}

//TODO:
//error should be an object for generic messages:
//- error = new TypeMismatchError('invalid email address')
//so users can, basing on the Type, display different errors
export function validate(value, constraints) {
    if (!constraints) return {ok: true, error: ''}
    let {type} = constraints;

    const {ok, error} = typeValidators[type](value)
    //TODO: need to decide if we want to pass all errors or not
    if (ok) {
      //keep checking for other contraint errors
    }

    return {ok, error}
}
