import React, { Component } from 'react';
import Reform from './Reform';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      fruit: '',
      checkbox: '',
      select: '',
      errors: {}
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleFruitChange = this.handleFruitChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  handleNameChange(control, event) {
    const isValid = control.errors.isValid();
    const value = control.value
    this.setState(state => {
      state.name = value
      state.errors.name = control.errors
      return state
    })
  }

  handleEmailChange(control, event) {
    const value = control.value
    this.setState(state => {
      state.email = value
      state.errors.email =  control.errors
      return state
    })
  }

  handleFruitChange(control, event) {
    const value = control.value
    this.setState(state => {
      state.fruit = value
      state.errors.fruit = control.errors
      return state
    })
  }

  // TODO: fix checkboxes!
  handleCheckboxChange(control, event) {
    const value = control.value
    this.setState(state => {
      state.checkbox = value
      state.errors.checkbox =  control.errors
      return state
    })
  }

  handleSelectChange(control, event) {
  debugger
    const value = control.value
    this.setState(state => {
      state.select = value
      state.errors.select =  control.errors
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

          <div>
            <input type="checkbox" name="checkbox" value="hot dogs" onChange={this.handleCheckboxChange} required/>
            <input type="checkbox" name="checkbox" value="pizza" onChange={this.handleCheckboxChange} required/>
            <input type="checkbox" name="checkbox" value="cake" onChange={this.handleCheckboxChange} required/>
            {JSON.stringify(this.state.errors.checkbox, null, 2)}
          </div>

          <div>
            <select name="select" required value={this.state.select} onChange={this.handleSelectChange}>
              <option value="" disabled>Select food</option>
              <option value="hot dogs">Hot Dogs</option>
              <option value="pizza">Pizza</option>
              <option value="cake">Cake</option>
            </select>
            {JSON.stringify(this.state.errors.select, null, 2)}
          </div>

          <button type="submit">Submit</button>
      </form>
    </Reform>
    );
  }
}

export default App;
