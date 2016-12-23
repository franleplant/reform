import React, { Component } from 'react';
import Reform from '../../build/index.js';

export default class Form1 extends Component {
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
  };

  validationMessages = {
    required: _ => 'Field is required',
    email: _ => 'Field must be a valid email',
    minLength: minLength => `Field must be at least ${minLength} long`,
  }

  validate = Reform.reactHelpers.validate;
  formHasErrors = Reform.reactHelpers.formHasErrors;
  getFieldErrors = Reform.reactHelpers.getFieldErrors;

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
          <ul>
            {
              this.getFieldErrors('email').map(([ruleKey, ruleArg], index) => {
                return (
                  <li key={index}>{this.validationMessages[ruleKey](ruleArg)}</li>
                );
              })
            }
          </ul>
        </div>

        <div>
          <input type="password" value={this.state.fields.password} onChange={this.onChangeFactory('password')} />
          <p>{JSON.stringify(this.state.errors.password)}</p>
          <ul>
            {
              this.getFieldErrors('password').map(([ruleKey, ruleArg], index) => {
                return (
                  <li key={index}>{this.validationMessages[ruleKey](ruleArg)}</li>
                );
              })
            }
          </ul>
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
