import React, { Component } from 'react';
import Reform from './Reform';


// TODO: settle an interface for Submit and errorMap
// TODO: monkeypatch all submit mechanisms (contemplate bootstrap forms for example)
// TODO: more validators
// TODO: test with all form inputs
// good docs https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
// TODO: test with bootstrap and other third party components
// TODO: tests
// TODO: (probably the most difficult part) get all official HTML rules working
// TODO: custom validations? (inside the config object)
// TODO: optimize



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

  handleSubmit(e, isValid, errorMap) {
    console.log(errorMap)
    if (!isValid) {
      alert("FORM NOT VALID ")
    }
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
          {JSON.stringify(this.state.nameErrors, null, 2)}
          <div>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
 {JSON.stringify(this.state.emailErrors, null, 2)}
          </div>
          <div>
            <input
              type="text"
              name="fruit"
              pattern="apple|banana|grape"
              value={this.state.fruit}
              onChange={this.handleFruitChange}
            />
 {JSON.stringify(this.state.fruitErrors, null, 2)}
          </div>

          <button type="submit">Submit</button>
      </form>
    </Reform>
    );
  }
}

export default App;
