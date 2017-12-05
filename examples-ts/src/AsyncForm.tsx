import * as React from 'react';
import * as Reform from '@franleplant/reform';



function isEmailUsed(isUsed: boolean): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(isUsed), 1000)
  })
}

interface State {
  message: string;

  fields: {
    email: string;
    password: string;
  };

  errors: Partial<{
    email: {[ruleKey: string]: boolean};
    password: Reform.types.FieldErrors;
  }>
}

export default class GettingStarted extends React.Component<{}, State> {
  re = Reform.reactMixins.objectMixin(this)

  state = {
    fields: {
      email: '',
      password: '',
    },

    errors: {},

    // This is not reform specific
    message: '',
  }

  validationRules = {
    email: {required: true, email: true},
    password: { required: true, minLength: 6},
  };

  validationMessages = {
    required: () => `Field is required`,
    email: () => `Field must be a valid email`,
    validating: () => `Validating...`,
    isUsed: () => `Email is already in use`,
    default: () => `Field is invalid`,
  }

  onEmailChange = async (event: any) => {
    const value = event.target.value;
    this.re.validateField('email', value)
    this.setState(state => {
      const fields = {
        ...state.fields,
        email: value,
      };

      return {...state, message: '', errors: { ...state.errors, email: {...state.errors.email, validating: true}}, fields};
    });

    // TODO this should be debounced
    const isUsed = await isEmailUsed(true)
    this.setState(state => {
      const errors = {
        ...state.errors,
        email: {
          ...state.errors.email,
          validating: false,
          isUsed,
        }
      }
      return {...state, errors };
    });
  }


  onPasswordChange = (event: any) => {
    const value = event.target.value;
    this.setState(state => {
      const fields = {
        ...state.fields,
        password: value,
      };

      return {...state, message: '', error: {}, fields};
    });
    this.re.validateField('password', value);
  }

  /*
   onSubmit handler
  */
  onSubmit = (e: any) => {
    e.preventDefault();
    /*
     This form will only validate onSubmit
    */
    const isValid = this.re.validateFormFromState();
    if (!isValid) {
      this.setState({ message: 'Invalid Form'})
      return
    }

    this.setState({ message: 'Valid Form'})
  }

  render() {
    console.log(this.state.errors)
    return (
      <form>
        <div>
          {/*
            Regular React controlled component
          */}
          <input type="email" value={this.state.fields.email} onChange={this.onEmailChange} />
          {/*
            Display errors (first way)
          */}
          <ul>
            {
              this.re.mapFieldErrors('email')
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
          <input type="password" value={this.state.fields.password} onChange={this.onPasswordChange} />
          {/*
            Display errors (second way) (there are more)
          */}
          <ul>
            { this.re.fieldIfError('password', 'required') &&
              <li>password is required</li>
            }

            { this.re.fieldIfError('password', 'minLength') &&
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
