# Reform

A form validation _library_ for Javascript, Typescript, React and the web!

## Introduction

Reform started as a form validation library for React, but it has come a long way
since to become a general purpose validation library that can be used anywhere
you would use Javascript or Typescript.

Reform is separated into two main parts: **core** and **helpers**

The **core** is a very small set of pure functions that given
a value and validation rules will yield the result of evaluating those rules on the value.
You can think of it as a mini engine to evaluate rules.
The **core** also packs all the HTML5 default validators, i.e. `required`, `minLength`, `type=email`, etc,
with a slight different way of expressing them.
This means that you have a lot of ground already covered for you, unlike other form validation libraries out there.
This also means that you could use the **core** to build your own form validation library!

The **helpers** are where all the _bindings_ for different libraries live. For now we only provide
React bindings which is basically a thin wrapper of the **core** so you can easily start validating
your React forms plus some additional helpers to display field errors.
reactHelpers will work with _any_ React view library such as `react-bootstrap` as well as with
any custom component you would like to build. One of the drivers of the current Reform design
is exactly this: maximum flexibility.
It provides some minimal opinions to maintain the usability high!
If you want more freedom you can always use the core and build your own helper anyway you like it.

The important thing here is that this library should provide the _functionality that you need_,
the _customization that you want_ and an _easy escape hatch if you need it_, which in this case is trivial.

The first item, _functionality that you need_, will be provided by the **helpers**, i.e. reactHelpers.
It will be what you are looking for 90% of the times and it will get you started with form validation
in no time.

The second item, _customization that you want_, will be provided by the **core**, which can be easily used along side
with the helpers or as a standalone module.

The third item, _escape hatch if you need it_, is provided by the inherent structure of the library as you will see
as you go along with the docs.


The central dogma that Reform trays to live by is: _be useful with little entry or exit costs_


## Getting Started

```sh
npm install --save @franleplant/reform
```

(or use yarn if you are into that)

```sh
yarn add @franleplant/reform
```


```javascript
import React, { Component } from 'react';
import Reform from '../../build/index.js';

export default class Form1 extends Component {
  state = {
    message: '',
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
      mustMatch: value => value && value !== this.state.fields.password
    },
  };

  validationMessages = {
    required: _ => 'Field is required',
    email: _ => 'Field must be a valid email',
    minLength: minLength => `Field must be at least ${minLength} long`,
    mustMatch: _ => 'Passwords must match',
    default: _ => 'Field is invalid',
  }
  //TODO
  // abstract this into a helper function
  mapRulesToMessages = ([ruleKey, ruleValue]) => {
    const creator = this.validationMessages[ruleKey] || this.validationMessages['default'];
    return creator(ruleValue)
  }

  validateFormFromState = Reform.reactHelpers.validateFormFromState;
  formIsValid = Reform.reactHelpers.formIsValid;
  getFieldErrors = Reform.reactHelpers.getFieldErrors;
  fieldIfError = Reform.reactHelpers.fieldIfError;
  fieldIsValid = Reform.reactHelpers.fieldIsValid;

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

  onSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validateFormFromState();
    if (!isValid) {
      this.setState({ message: 'Invalid Form'})
      return
    }

    this.setState({ message: 'Valid Form'})
  }

  render() {
    console.log(this.state)
    return (
      <form>
        <div>
          <p>Validate and if field is invalid the border will be red and an single error message displayed</p>
          <input type="text" value={this.state.fields.name} onChange={this.onChangeFactory('name')}
            style={{
              border: !this.fieldIsValid('name') ? '2px solid red' : undefined,
            }}
          />
          <ul>
            {
              this.getFieldErrors('name')
              .map(this.mapRulesToMessages)
              .map((message, index) => (
                <li key={index}>{message}</li>
              ))
            }
          </ul>
        </div>

        <div>
          <p>Validate and display one error per failed rule with array helper</p>
          <input type="email" value={this.state.fields.email} onChange={this.onChangeFactory('email')} />
          <ul>
            {
              this.getFieldErrors('email')
              .map(this.mapRulesToMessages)
              .map((message, index) => {
                return (
                  <li key={index}>{message}</li>
                );
              })
            }
          </ul>
        </div>


        <div>
          <p>Validate and display one error per failed rule with conditional helper</p>
          <input type="password" value={this.state.fields.password} onChange={this.onChangeFactory('password')} />
          <ul>
            { this.fieldIfError('password', 'required') &&
              <li>Password is required</li>
            }

            { this.fieldIfError('password', 'minLength') &&
              <li>Password must be at least 6 characters long</li>
            }
          </ul>
        </div>

        <div>
          <p>Validate and display one error per failed rule with array helper with special case</p>
          <input type="password" value={this.state.fields.confirmPassword} onChange={this.onChangeFactory('confirmPassword')} />
          <ul>
            {
              this.getFieldErrors('confirmPassword')
              .map(this.mapRulesToMessages)
              .map((message, index) => {
                return (
                  <li key={index}>{message}</li>
                );
              })
            }
          </ul>
        </div>
        <p>{this.state.message}</p>
        <button onClick={this.onSubmit}>Submit</button>
      </form>
    );
  }
}

```


TODO quick start

## core

TODO

## reactHelpers

TODO

## Common Solutions to Common Problems

TODO

## Contributing

## Licence

MIT


