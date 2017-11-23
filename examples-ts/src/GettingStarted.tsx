import * as React from 'react';
import { reactMixins } from '@franleplant/reform';


interface State {
  message: string;

  fields: {
    email: string;
    password: string;
  };

  errors: Partial<{
    email: boolean;
    password: boolean;
  }>
}

/*
  Reform HTML5 mode example (validate onSubmit)
*/
export default class GettingStarted extends React.Component<{}, State> {
  /*
    Hook Reform into your component
  */
  re = reactMixins.objectMixin(this)

  /*
   Initialize your field and error state
  */
  state = {
    fields: {
      email: '',
      password: '',
    },

    errors: {},

    // This is not reform specific
    message: '',
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
    required: (_ruleKey: string, _ruleValue: any, fieldName: string) => `${fieldName} is required`,
    email: (_ruleKey: string, _ruleValue: any, fieldName: string) => `${fieldName} must be a valid email`,
    default: (_ruleKey: string, _ruleValue: any, fieldName: string) => `${fieldName} is invalid`,
  }


  /*
    Regular onChange handlers from React world
  */
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
    }
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
          <input type="password" value={this.state.fields.password} onChange={this.onChangeFactory('password')} />
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
