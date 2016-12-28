import React, { Component } from 'react';
import Reform from '../../build/index.js';

/*
  Reform HTML5 mode example (validate onSubmit)
*/
export default class GettingStarted extends Component {
  /*
   Initialize your field and error state
  */
  state = {
    message: '',
    fields: {
      email: '',
      password: '',
    },

    errors: {},
  }

  /*
   Declare validation rules for your fields
  */
  validationRules = {
    email: { email: true, required: true},
    password: { required: true, minLength: 6},
  };

  /*
   [Optional] Easy way of displaying error messages
  */
  validationMessages = {
    required: (ruleKey, ruleValue, fieldName) => `${fieldName} is required`,
    email: (ruleKey, ruleValue, fieldName) => `${fieldName} must be a valid email`,
    default: (ruleKey, ruleValue, fieldName) => `${fieldName} is invalid`,
  }

  /*
    Hook Reform into your component
  */
  validateFormFromState = Reform.reactHelpers.validateFormFromState;
  formIsValid = Reform.reactHelpers.formIsValid;
  fieldIfError = Reform.reactHelpers.fieldIfError;
  mapFieldErrors = Reform.reactHelpers.mapFieldErrors;

  /*
    Regular onChange handlers from React world
  */
  onChangeFactory = (fieldName) => {
    return event => {
      const value = event.target.value;
      this.setState(state => {
        state.fields[fieldName] = value;
        state.errors[fieldName] = {};
        return state;
      });
    }
  }

  /*
   onSubmit hanlde
  */
  onSubmit = (e) => {
    e.preventDefault();
    /*
     This form will only validate onSubmit
    */
    const isValid = this.validateFormFromState();
    if (!isValid) {
      this.setState({ message: 'Invalid Form'})
      return
    }

    this.setState({ message: 'Valid Form'})
  }

  render() {
    return (
      <form>
        <div>
          {/*
            Regular React controlled component
          */}
          <input type="email" value={this.state.fields.email} onChange={this.onChangeFactory('email')} />
          {/*
            Display errors (first way)
          */}
          <ul>
            {
              this.mapFieldErrors('email')
              .map((message, index) => {
                return (
                  <li key={index}>{message}</li>
                );
              })
            }
          </ul>
        </div>


        <div>
          {/*
            Regular React controlled component
          */}
          <input type="password" value={this.state.fields.password} onChange={this.onChangeFactory('password')} />
          {/*
            Display errors (second way) (there are more)
          */}
          <ul>
            { this.fieldIfError('password', 'required') &&
              <li>password is required</li>
            }

            { this.fieldIfError('password', 'minLength') &&
              <li>password must be at least 6 characters long</li>
            }
          </ul>
        </div>

        <p>{this.state.message}</p>
        {/*
          Regular submit!
        */}
        <button onClick={this.onSubmit}>Submit</button>
      </form>
    );
  }
}
