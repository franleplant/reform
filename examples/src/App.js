import React, { Component } from 'react';
import Reform from '../../build/index.js';

class App extends Component {
  state = {
    fields: {
      email: '',
      password: '',
      confirmPassword: '',
    },

    errors: {},
  }

  validationRules = {
    email: { email: true, required: true},
    password: { required: true, minLength: 6},
    confirmPassword: {
      required: true,
      mustMatch: value => value && value !== this.state.fields.password
    },
  }

  validate = Reform.reactHelpers.validate;
  formHasErrors = Reform.reactHelpers.formHasErrors;

  onChangeFactory = (fieldName) => {
    return event => {
      const value = event.target.value;
      this.setState(state => {
        state.fields[fieldName] = value;
        return state;
      });
      this.validate(fieldName, value);
    }
  }

  render() {
    console.log(this.state)
    return (
      <form>
        <div>
          <input type="email" value={this.state.fields.email} onChange={this.onChangeFactory('email')} />
          <p>{JSON.stringify(this.state.errors.email)}</p>
        </div>

        <div>
          <input type="password" value={this.state.fields.password} onChange={this.onChangeFactory('password')} />
          <p>{JSON.stringify(this.state.errors.password)}</p>
        </div>

        <div>
          <input type="password" value={this.state.fields.confirmPassword} onChange={this.onChangeFactory('confirmPassword')} />
          <p>{JSON.stringify(this.state.errors.confirmPassword)}</p>
        </div>
        <button disabled={this.formHasErrors()}>Submit</button>
      </form>
    );
  }
}

export default App;
