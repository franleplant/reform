import * as React from 'react';
import { reactMixins } from '@franleplant/reform';

interface State {
  message: string
  fields: {
    radio: string
  }

  errors: Partial<{
    radio: any
  }>
}

/*
 *  Validate on every input change
 */
export default class Radios extends React.Component<{}, State> {
  re = reactMixins.objectMixin(this)

  state = {
    message: '',
    fields: {
      radio: '',
    },

    errors: {},
  }

  validationRules = {
    radio: { required: true }
  };

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

  onSubmit = (e: any) => {
    e.preventDefault();
    const isValid = this.re.validateFormFromState();
    if (!isValid) {
      this.setState({ message: 'Invalid Form'})
      return
    }

    this.setState({ message: 'Valid Form'})
  }

  render() {
    console.log(this.state.fields)
    return (
      <form>
        <div>
          <p>Validate and if field is invalid the border will be red and an single error message displayed</p>
          <div>
            {['email', 'phone', 'mail']
              .map((value, index) => (
                <div key={value}>
                  <input
                    type="radio"
                    id={`contactChoice${index}`}
                    name="contact"
                    value={value}
                    onChange={this.onChangeFactory('radio')}
                  />
                  <label htmlFor={`contactChoice${index}`}>{value}</label>
                </div>
              ))
            }
          </div>
          <p>{ !this.re.fieldIsValid('radio') && `Field Is Required` } </p>
        </div>

        <button onClick={this.onSubmit}>Submit</button>
        <p>{this.state.message}</p>
      </form>
    );
  }
}
