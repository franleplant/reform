import React, { Component } from 'react';
import Reform from '../main';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {
        username: '',
        password: '',
      },

      errors: {
        username: {},
        password: {},
      }
    }
  }

  handleFieldChange(fieldName, control, event) {
    this.setState(state => {
      state.fields[fieldName] = control.value;
      state.errors[fieldName] = control.errors;
      return state
    })
  }

  handleSubmit(form, event) {
    event.preventDefault();
    this.setState(state => {
      state.errors = form.getErrorMap();
      return state
    });

    if (!form.isValid()) {
      alert("FORM NOT VALID ")
    }
  }
  render() {
    const {fields, errors} = this.state;


    const autocontrol = fieldName => {
      return ({
        name: fieldName,
        value: fields[fieldName],
        onChange: this.handleFieldChange.bind(this, fieldName),
        style: {
          borderColor: errors[fieldName].isInvalid ? 'red' : null,
        },
      })
    }


    return (
      <Reform>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <input type="text" placeholder="username" minLength="3" required {...autocontrol('username')} />
            {errors.username.minLength ? <p>User Name should have at least 3 characters</p> : null}
            {errors.username.required ? <p>User Name is required</p> : null}
          </div>

          <div>
            <input type="password" placeholder="password" minLength="6" required {...autocontrol('password')} />
            {errors.password.minLength ? <p>Password should have at least 6 characters</p> : null}
            {errors.password.required ? <p>Password is required</p> : null}
          </div>

          <button type="submit">Submit</button>
      </form>
    </Reform>
    );
  }
}
