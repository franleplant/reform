# Reform [![Build Status](https://travis-ci.org/franleplant/reform.svg?branch=master)](https://travis-ci.org/franleplant/reform) [![Coverage Status](https://coveralls.io/repos/github/franleplant/reform/badge.svg?branch=master)](https://coveralls.io/github/franleplant/reform?branch=master)

A form validation _library_ for Javascript, Typescript, React and the web!

[API Docs](./API.md)

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

## Quick Start


This is a complete working example of a React Form plus Reform validation

```javascript
import React, { Component } from 'react';
// In your case it will be something like this
//import Reform from '@franleplant/reform';
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
        state.message = ''
        state.fields[fieldName] = value;
        state.errors = {};
        return state;
      });
    }
  }

  /*
   onSubmit handler
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
```



## React Helpers Guide


### Hooking Reform into our component

There are several ways of hooking Reform reactHelpers into your components

```javascript
// by hand and selectively with property initializers
class MyComp extends React.Component {
  fieldIsValid = Reform.reactHelpers.fieldIsValid;
  formIsValid = Reform.reactHelpers.formIsValid;
}

// by hand and selectively inside the constructor
class MyComp extends React.Component {
  constructor(props) {
    super(props);
    this.fieldIsValid = Reform.reactHelpers.fieldIsValid.bind(this);
    this.formIsValid = Reform.reactHelpers.formIsValid.bind(this);
  }
}


// With functional mixin (not selectively)
class MyComp extends React.Component {
  constructor(props) {
    super(props);
    Reform.reactMixins.functionalMixin(this);

    //All Reform.reactHelper methods are available inside `this`
  }
}

// With Class mixin (not selectively)
class MyComp extends React.Component {
  //All Reform.reactHelper methods are available inside `this`
}

const MyCompWithReform = Reform.reactMixins.classMixin(MyComp);

// With Class mixin (not selectively) and decorators
@Reform.reactMixins.classMixin
class MyComp extends React.Component {
  //All Reform.reactHelper methods are available inside `this`
}

```

The last two are probably the more appropiate to use with Typescript
since they will give you autocomplete and not type errors or at least that's how it's
supposed to work. If you have any problems please report, decorators and mixins are kind of
an untamed beast in Typescript land. You can always use the `functionalMixin` but you are going
to need to express the new attributes by hand.

###  Triggering Validation

There are several ways you can trigger validation, let's checkout how:

**Fields**

```javascript
//onChange
handleChange(e) {
  const value = e.target.value;
  // this function will validate `value` with `this.validationRules[fieldName]`
  // and update `this.state.fields[fieldName]` and `this.state.errors[fieldName]`
  this.validateField(fieldName, value);
}

//onBlur
handleBlur() {
  // this function will validate `this.state.fields[fieldName]` with `this.validationRules[fieldName]`
  // and update the state `this.state.fields[fieldName]` and `this.state.errors[fieldName]`
  // Note that we assume that we already have the latest value inside `this.state.fields[fieldName]`
  this.validateFieldFromState(fieldName);
}

//you can use any other event you might like
```

NOTE: You can get `fieldName` from a closure, from a partial application (bind), form a dom attribute, etc

**Form**

```javascript
// validate on submit
handleSubmit() {
  // Validate the form with all the field values in `this.state.fields`
  // with `this.validationRules` and update `this.state.errors`
  const isValid = this.validateFormFromState();
  if (!isValid) {
    // Handle invalid case
  } else {
    // Handle valid case
  }
}
```

### Managing `fieldName`

Most of the time I use this pattern


```javascript
handleChangeFactory(fieldName) {
  return function handleChange(e) {
    const value = e.target.value;
    // Update your state
    this.setState(state => {
      state.fields[fieldName] = value;
      return state;
    })
    // Validate and update your validation state
    this.validateField(fieldName, value);
  }
}
```

Sometimes this pattern can affect _performance_ since it will
create a new function on every render causing any children like this:

```javascript
<input onChange={this.handleChangeFactory(fieldName)} {...otherProps}/>
```

To be re-rendered because it's props will change!.
So if you want to avoid this, the most easy thing to do is
to cache the `handleChange` functions generated by `handleChangeFactory`.

A very simple implementation

```javascript
handleChangeFactory(fieldName) {
  if (!this.handleChangeCache[fieldName]) {
    this.handleChangeCache[fieldName] = function handleChange(e) {
      const value = e.target.value;
      // Update your state
      this.setState(state => {
        state.fields[fieldName] = value;
        return state;
      })
      // Validate and update your validation state
      this.validateField(fieldName, value);
    }
  }

  return this.handleChangeCache[fieldName];
}
```

I've only run with performance problem with this when using custom native components in React Native, but not on the web.


### Field Validity?


These are all the ways you can check if a field is valid or not:

```javascript
// After triggering a validation (these update `this.state.errors[fieldName]`)
const isValid = this.validateField(fieldName, value);
const isValid = this.validateFieldFromState(fieldName);

// By asking (this will use `this.state.errors[fieldName]` to check validity)
const isValid = this.fieldIsValid(fieldName)

// With the core (but don't use it unless you really know what you are doing)
const isValid = Reform.core.fieldIsValid(this.state.errors[fieldName]);
// With the core but re-evaluating the validity of the field
const isValid = Reform.core.fieldIsValid(value, this.validationRules[fieldName]);
```


### Form Validity?


```javascript
// After triggering form validation (these update `this.state.errors`)
const isValid = this.validateForm(this.state.fields);
const isValid = this.validateFormFromState();

// By asking (this will validate `this.state.fields` with `this.validationRules`)
const isValid = this.formIsValid();
```


### Displaying errors

A very important part of form validation, and `Reforms` gives you greate versatility in this

```javascript

// Manual manipulation
// check that there are errors for that field, then check that the rule we care about
// is true (which means there is an error) and then display error message
{ this.state.errors.myField && this.state.errors.myField.required &&
  <p>myField is required!</p>
}

// With helper 1
{ this.fieldIfError('myField', 'required') &&
  <p>myField is required!</p>
}

// With helper 2 (unstable)
// first declare your validation messages
this.validationMessages = {
  required: _ => 'Field is required!',
  // default message
  default: _ => 'Field is invalid',
}

//inside render
{ this.mapFieldErrors('myField').map((errorMessage, index) => (
  <p key={index}>{message}</p>
))}
```

Check the api for `this.validationMessages` for more details, but it offers a lot of options.
You can for example do this

```javascript
this.validationMessages = {
  minLength: (ruleValue, ruleKey, fieldName) => `${fieldName} needs at least ${ruleValue} characters`,
  // default message
  default: _ => 'Field is invalid',
}
```


## Common Solutions to Common Problems

TODO

## Contributing

## Licence

MIT


