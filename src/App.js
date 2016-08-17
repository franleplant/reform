import React, { Component } from 'react';


// TODO: config object with getValue et al
// TODO: test with all form inputs
// good docs https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
// TODO: test with bootstrap and other third party components
// TODO: maybe global validation/error state kept by Reform and passed through onChange?
// TODO: probably make Reform wrap everything in a Form? dont want to make this to much of a problem
// the only advante is less markup and no manual `noValidate` from user
// TODO: probably the errors object could have a better/richer API
//  - more description of the error? (for more complex validations)
// TODO: (probably the most difficult part) get all official HTML rules working
// TODO: custom validations? (inside the config object)
// TODO: Reform component should also expose onChange? with a global error object? witg global isValid() et al?
// TODO: add custom css classes the the elemtns? or is it too much?


const getValue = e => e.target.value
// Slumpy way of detecting text elements
const isTextElement = el => !el.type


class ReformErrors {
  isValid() {
    return Object.keys(this)
      .map(error => this[error])
      .every(error => error === false)
  }
}


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

    if (child.props.required) {
      errors.required = !value ? true : false
    }

    let args = Array.from(arguments)
    args.push(errors)
    oldOnChange.apply(null, args)
  }
}

function monkeyPatchChildrens(children) {
  return React.Children.map(children, element => {
    if (isTextElement(element)) {
      return element
    }

    const type = element.type
    const oldChildren = element.props.children
    const oldOnChange = element.props.onChange

    // Recursive call
    const newChildren = monkeyPatchChildrens(oldChildren)


    // TODO: make this filter a bit more harder
    // - only include form inputs (input, textarear, checkboxes, select, etc)
    // - only include if they have onChange
    if (element.props.onChange) {
      const onChange = onChangeFactory(element, oldOnChange)
      return React.cloneElement(element, {onChange}, newChildren)
    } else {
      return React.cloneElement(element, {}, newChildren)
    }
  })
}

class Reform extends Component {
  render() {
    const newChildren = monkeyPatchChildrens(this.props.children)
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
      emailErrors: {}
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
  }

  handleNameChange(e, errors) {
    const isValid = errors.isValid();
    debugger
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
  render() {
    const nameValidationConfig = {}
    return (
      <form noValidate>
        <Reform>
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
        </Reform>
        <div>
          <h3>Errors</h3>
          <p>{JSON.stringify(this.state.nameErrors, null, 2)}</p>
          <p>{JSON.stringify(this.state.emailErrors, null, 2)}</p>
        </div>
        <button>Submit</button>
      </form>
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

