import * as React from 'react';
import * as Reform from '@franleplant/reform';

interface State {
  fields: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  errors: Partial<{
    name: Reform.types.FieldErrors;
    email: Reform.types.FieldErrors;
    password: Reform.types.FieldErrors;
    confirmPassword: Reform.types.FieldErrors;
  }>
}

/*
 *  Validate on every input change
 */
export default class Form1 extends React.Component<{}, State> {
  re = Reform.reactMixins.objectMixin(this)

  state = {
    fields: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    errors: {},
  }

  validationRules = {
    name: { required: true, minLength: 2},
    email: { email: true, required: true},
    password: { required: true, minLength: 6},
    confirmPassword: {
      required: true,
      mustMatch: (value: string) => value && value !== this.state.fields.password
    },
  };

  validationMessages = {
    required: () => 'Field is required',
    email: () => 'Field must be a valid email',
    minLength: (minLength: number) => `Field must be at least ${minLength} long`,
    default: () => `Invalid field`,
  }

  onChangeFactory = (fieldName: string) => {
    return (event: any) => {
      const value = event.target.value;
      this.setState(state => {
        const fields = {
          ...state.fields,
          [fieldName]: value,
        };

        return {...state, message: '', error: {}, fields};
      });
      this.re.validateField(fieldName, value);
    }
  }

  render() {
    return (
      <form>
        <div>
          <p>Validate and if field is invalid the border will be red and an single error message displayed</p>
          <input type="text" value={this.state.fields.name} onChange={this.onChangeFactory('name')}
            style={{
              border: !this.re.fieldIsValid('name') ? '2px solid red' : undefined,
            }}
          />
          <p>{ !this.re.fieldIsValid('name') && `Incorrect field! Please do it right` } </p>
        </div>

        <div>
          <p>Validate and display one error per failed rule with array helper</p>
          <input type="email" value={this.state.fields.email} onChange={this.onChangeFactory('email')} />
          <ul>
            {
              this.re.mapFieldErrors('email').map((message, index) => (
                <li key={index}>{message}</li>
              ))
            }
          </ul>
        </div>


        <div>
          <p>Validate and display one error per failed rule with conditional helper</p>
          <input type="password" value={this.state.fields.password} onChange={this.onChangeFactory('password')} />
          <ul>
            { this.re.fieldIfError('password', 'required') &&
              <li>Password is required</li>
            }

            { this.re.fieldIfError('password', 'minLength') &&
              <li>Password must be at least 6 characters long</li>
            }
          </ul>
        </div>

        <div>
          <p>Validate and display one error per failed rule with array helper with special case</p>
          <input type="password" value={this.state.fields.confirmPassword} onChange={this.onChangeFactory('confirmPassword')} />
          <ul>
            {
              this.re.mapFieldErrors('confirmPassword').map((message, index) => (
                <li key={index}>{message}</li>
              ))
            }
          </ul>
        </div>
        <button disabled={!this.re.formIsValid()}>Submit</button>
      </form>
    );
  }
}
