import React, { Component } from 'react';
import Reform from './Reform';





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
      errors: {}
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleFruitChange = this.handleFruitChange.bind(this)
  }

  handleNameChange(e, errors) {
    const isValid = errors.isValid();
    const value = e.target.value
    this.setState(state => {
      state.name = value
      state.errors.name = errors
      return state
    })
  }

  handleEmailChange(e, errors) {
    const value = e.target.value
    this.setState(state => {
      state.email = value
      state.errors.email =  errors
      return state
    })
  }

  handleFruitChange(e, errors) {
    const value = e.target.value
    this.setState(state => {
      state.fruit = value
      state.errors.fruit = errors
      return state
    })
  }

  handleSubmit(e, isValid, errorMap) {
    this.setState(state => {
      state.errors = errorMap
      return state
    })
    //if (!isValid) {
      //alert("FORM NOT VALID ")
    //}
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
              borderColor: this.state.errors.name && !this.state.errors.name.isValid() ?  'red' : null
            }}
          />
          {JSON.stringify(this.state.errors.name, null, 2)}
          <div>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            {JSON.stringify(this.state.errors.email, null, 2)}
          </div>
          <div>
            <input
              type="text"
              name="fruit"
              pattern="apple|banana|grape"
              value={this.state.fruit}
              onChange={this.handleFruitChange}
            />
            {JSON.stringify(this.state.errors.fruit, null, 2)}
          </div>

          <button type="submit">Submit</button>
      </form>
    </Reform>
    );
  }
}

export default App;
