import React, { Component } from 'react';
import Reform from './Reform';


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
