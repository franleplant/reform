import React, { Component } from 'react';


// TODO: a way to force the form to validate (click submit without filling any input)
// TODO: make handy lambdas to identify elements
// TODO: more validators
// TODO: virgine and reform own isValid et all
// TODO: test with all form inputs
// good docs https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
// TODO: test with bootstrap and other third party components
// TODO: tests
// TODO: maybe global validation/error state kept by Reform and passed through onChange?
// TODO: config object with getValue et al
// TODO: Reform component should also expose onChange? with a global error object? witg global isValid() et al?
// - doesnt look like it
// TODO: probably make Reform wrap everything in a Form? dont want to make this to much of a problem
// the only advante is less markup and no manual `noValidate` from user
// TODO: (probably the most difficult part) get all official HTML rules working
// TODO: custom validations? (inside the config object)
// TODO: validators and error procesing architecture
// TODO: add custom css classes the the elemtns? or is it too much?


const supportedNativeTypes = ['input', 'select', 'textarea'];
const getValue = e => e.target.value
// Slumpy way of detecting text elements
const isTextElement = el => !el.type
const isFunctionElement = type => typeof type === 'function'
const isSupportedType = type => supportedNativeTypes.indexOf(type) !== -1 || isFunctionElement(type)

// TODO: support all kind of submit elements
const isSubmit = element => element.type === 'button' && element.props.type === 'submit'
const isForm = element => element.type === 'form'

class ReformErrors {
  isValid() {
    return Object.keys(this)
      .map(error => this[error])
      .every(error => error === false)
  }
}


// validator api
// function validator(value, type, props) {
//   if (type === type1) {
//     return ....
//   } else if (type === type2) {
//     return ...
//   }
//
//   return false
// }

// pattern
// TODO: <select> <textarea>
function onChangeFactory(child, oldOnChange) {
  return function onChange(e) {
    const value = getValue(e);
    let errors = new ReformErrors();
    if (child.props.minLength && value.length < child.props.minLength) {
      errors.minLength = true
    }

    if (child.props.type) {
      if (child.props.type === 'email') {
        errors.email = !/.+@.+\..+/.test(value)
      }
    }

    if (child.props.pattern) {
      const supportedInputTypes = ['text', 'search', 'url', 'tel', 'email', 'password']
      if (
        (child.type === 'input' &&  supportedInputTypes.indexOf(child.props.type) !== -1) ||
        isFunctionElement(child.type)) {

        const re = new RegExp(child.props.pattern);
        errors.pattern = !re.test(value);
      }
      console.warn(`Validator: "pattern" not supported for type ${child.type}`)
    }

    if (child.props.required) {
      const supportedInputTypes = [
        'text',
        'search',
        'url',
        'tel',
        'email',
        'password',
        'date',
        'datetime',
        'datetime-local',
        'month',
        'week',
        'time',
        'number',
        'checkbox',
        'radio',
        'file'
      ]
      if (
        (child.type === 'input' &&  supportedInputTypes.indexOf(child.props.type) !== -1) ||
        child.type in ['select', 'textarea'] ||
        isFunctionElement(child.type)) {

        // Todo maybe make this check a bit better
        errors.required = !value ? true : false
      }
      console.warn(`Validator: "required" not supported for type ${child.type}`)
    }

    let args = Array.from(arguments)
    args.push(errors)
    oldOnChange.apply(null, args)
  }
}

function monkeyPatchChildrens(children, context) {
  return React.Children.map(children, element => {
    if (isTextElement(element)) {
      return element
    }

    const type = element.type
    const oldChildren = element.props.children
    const oldOnChange = element.props.onChange

    // Recursive call
    const newChildren = monkeyPatchChildrens(oldChildren, context)


    if (isSupportedType(element.type) && element.props.onChange) {
      const onChange = onChangeFactory(element, oldOnChange)
      // TODO: maintain old refs
      return React.cloneElement(element, {onChange, ref: el => context.controls.push(el)}, newChildren)
    } else if (isForm(element)) {

      // TODO: do the same with form onSubmit and input type submit and any other possible submit thing
      const oldOnSubmit = element.props.onSubmit;
      //const inputs = this.inputRefs;
      function onSubmit(e) {
        // Force update to all inputs
        const event = new Event('input', { bubbles: true });
        context.controls.forEach(c => c.dispatchEvent(event));
        oldOnSubmit.apply(null, arguments);
        //TODO: trigger validation to all elements
        //do I have to retain a ref to all inputs to do this?
        //inputs.forEach(input => input.) //???
        //if (allInputsAreValid) {
        //}
        //context.forceUpdate()
        e.preventDefault();
      }
      return React.cloneElement(element, {onSubmit}, newChildren)
    } else {
      return React.cloneElement(element, {}, newChildren)
    }
  })
}

class Reform extends Component {
  constructor(props) {
    super(props)
    this.controls = []
  }
  render() {
    const newChildren = monkeyPatchChildrens(this.props.children, this)
    return <div>{newChildren}</div>
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      nameErrors: {},
      email: '',
      emailErrors: {},
      fruit: '',
      fruitErrors: {},
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleFruitChange = this.handleFruitChange.bind(this)
  }

  handleNameChange(e, errors) {
    const isValid = errors.isValid();
    this.setState({
      name: e.target.value,
      nameErrors: errors
    })
  }

  handleEmailChange(e, errors) {
    this.setState({
      email: e.target.value,
      emailErrors: errors
    })
  }

  handleFruitChange(e, errors) {
    this.setState({
      fruit: e.target.value,
      fruitErrors: errors
    })
  }

  handleSubmit(e) {
    // TODO: race condition. The error state isn't updated yet
    debugger
    e.preventDefault();
  }
  render() {
    const nameValidationConfig = {}
    return (
      <Reform>
        <form noValidate onSubmit={this.handleSubmit.bind(this)}>
          <h2>Welcome to React</h2>
          <input
            type="text"
            name="name"
            minLength="3"
            required
            data-reform={nameValidationConfig}
            value={this.state.name}
            onChange={this.handleNameChange}
            style={{
              borderColor: Object.keys(this.state.nameErrors).length ? 'red' : null
            }}
          />
          <div>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="fruit"
              pattern="apple|banana|grape"
              value={this.state.fruit}
              onChange={this.handleFruitChange}
            />
          </div>

          <button type="submit">Submit</button>
        <div>
          <h3>Errors</h3>
          <p>{JSON.stringify(this.state.nameErrors, null, 2)}</p>
          <p>{JSON.stringify(this.state.emailErrors, null, 2)}</p>
          <p>{JSON.stringify(this.state.fruitErrors, null, 2)}</p>
        </div>
      </form>
    </Reform>
    );
  }
}

export default App;



//let validators = {
  //required:  value => !value ? true : false,
  //email: value => /.+@.+\..+/.test(value),
  //minLength: (value, child) => value.length < child.props.minLength,
//}

//const value
//const child

//function isValidatorForType(validator, type) {
  //if (type === 'email') {
    //if (validator === '')
  //}
//}

//Object.keys(validators)
  //.filter(val => isValidatorForType(val, child.props.type))
  //.map(val => {
    //if (child.props[val]) {
      //return validators[val](value, child)
    //}
  //})

