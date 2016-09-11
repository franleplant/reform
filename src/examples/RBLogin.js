import React, { Component } from 'react';
import {Alert, Button, Form, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import Reform from '../main';

export default class RBLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {
        username: '',
        password: '',
        tos: false,
      },

      errors: null,
    }
  }

  handleFieldChange(fieldName, control, event) {
    this.setState(state => {
      state.fields[fieldName] = control.value;
      state.errors = null;
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
      })
    }

    const getValidationState = fieldName => {

      let state;

      if (!errors) {
        state =  null;
      } else if (errors[fieldName].isInvalid) {
        state = 'error';
      } else if (errors[fieldName].isValid()) {
        state = 'success'
      }

      return {
        validationState: state,
      }
    }

    return (
      <Reform>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup {...getValidationState('username')}>
            <ControlLabel>Username</ControlLabel>
            <FormControl type="text" placeholder="username" minLength="3" required {...autocontrol('username')} />
            {errors && errors.username.minLength ? <Alert bsStyle="danger">User Name should have at least 3 characters </Alert> : null}
            {errors && errors.username.required ? <Alert bsStyle="danger">User Name is required</Alert> : null}
          </FormGroup>

          <FormGroup {...getValidationState('username')}>
            <ControlLabel>Password</ControlLabel>
            <FormControl type="password" placeholder="password" minLength="6" required {...autocontrol('password')} />
            {errors && errors.password.minLength ? <Alert bsStyle="danger">Password should have at least 6 characters</Alert> : null}
            {errors && errors.password.required ? <Alert bsStyle="danger">Password is required</Alert> : null}
          </FormGroup>

          <FormGroup {...getValidationState('tos')}>
            <ControlLabel>Password</ControlLabel>
            <Checkbox required name="tos" checked={fields.tos} onChange={control => this.setState(state => {
              state.fields.tos = control.checked
              state.errors = null;
              return state;
            })} />
            {errors && errors.tos.required ? <Alert bsStyle="danger">TOS aceptance is required</Alert> : null}
          </FormGroup>

          <Button type="submit">Submit</Button>
      </Form>
    </Reform>
    );
  }
}
