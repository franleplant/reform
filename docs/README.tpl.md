# Reform [![Build Status](https://travis-ci.org/franleplant/reform.svg?branch=master)](https://travis-ci.org/franleplant/reform) [![Coverage Status](https://coveralls.io/repos/github/franleplant/reform/badge.svg?branch=master)](https://coveralls.io/github/franleplant/reform?branch=master)

A form validation _library_ for Javascript, Typescript, React, React Native and the web!

[API Docs](./API.md)

## Why should I use Reform? How Reform compares to existing solutions?

While there are already solutions for the problem of Form Validation in React,
Reform is an attempt to make form validation as simple and versatile as possible.

### Characteristics of Reform

#### Works on React and React Native

Because of it's nature, because it does not rely on the DOM, Reform is just
a plain javascript library which runs on anything that runs javascript, and that
of course includes React Native. Bonus points: all HTML5 validators such as 
`required`, `minLength`, et al, also work on React Native.

#### Works with **any** React view framework and with any custom components

Some libraries like [`react-validation`](https://www.npmjs.com/package/react-validation)
use Components as their API. The problem with this approach is that it does not play well
with libraries such as `react-bootstrap` which already provide their own input components, or
your own custom input components.

Reform works with any component that receives a value and a change function as its props,
it does not matter what are the names for this props, whether they are `value`, `text`, `onChange`,
`onChangeText`, `onChangeValue` or whatever the component author decided to call them, Reform
will work with that component.

#### Works right out of the box without further stuff.

The great [`redux-form`](http://redux-form.com/6.5.0/) which we've used extensively, does
not provide any validators by default.

Reform **provides** all HTML5 validators right out of the box,
for you to start validating your forms right away.

#### Does not depend on Redux

We love Redux, but except for particular use cases, we don't see the point
in storing form state in the _application global state_, and also, we don't tend
to connect Form Component to the Redux Store and that's why Reform only requires that
you use the regular React Controlled Components pattern for form Handling.

#### Does not have dependencies

Reform does not depend on anything, not even in React.

#### Absurd versatility

Reform provides common abstraction to use with React. Don't like them? Simply
build your own using the `core` (described below)



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
{{includeFile './examples/src/GettingStarted.js'}}
```

## Validators

Reform provides all the HTML5 validators, they are slightly differently expressed


These are the rules of thumb for translating HTML5 validator attributes to Reform validation rules:
- All validation attributes, such as `required`, `min-length=6` and `max-length=6` are expresed as `{required: true}`, `{minLength: 5}`, {`maxLenght: 6}`
- All `type="something"` are expressed as `{something: true}`, i.e.`type="email` is `{email: true}`
- All validation rules that depend on the `type` of the field are expresed like `${rule}${type}`. i.e. `minNumber`, `maxDate`, `minWeek` etc.

Dates, week, time and color types are supported exactly as the HTML5 standard says, so if you find
any differences please report a bug.

A complete list and their API is available in the API docs.

Example

```javascript

// Use all the HTML5 validation Rules in a single field
this.validationRules = {
  myField: {
    // Regular validation attributes
    // attributes with no value in HTML5 use true as value in Reform
    required: true,
    // validation attributes with an actual value in HTML5
    // use that same value in Reform
    minLength: 5,
    maxLength: 15,
    // pattern accepts directly a RegExp object instead of a string
    pattern: /banana|apple/,


    // type validation attributes
    // type attributes in HTML5 use true as value in Reform
    email: true,
    number: true,
    range: true,
    color: true,
    date: true,
    time: true,
    url: true,
    month: true,
    week: true,


    // type dependent validation attributes
    minNumber: 5,
    maxNumber: 15,
    minDate: '2016-12-26',
    maxDate: '2016-12-26',
    minMonth: '2016-9',
    maxMonth: '2016-9',
    minTime: '17:45',
    maxTime: '17:45',
    minWeek: '2015-W32',
    maxWeek: '2015-W32',
  }
}


```


### Custom validators

There are two ways of using a custom validator in Reform:

- ad hoc
- Global

Example: ad hoc

```javascript

// Instead of an attribute pass a function that conforms to the
// Validator type (see api docs)
this.validationRules = {
  myField: {
    myAdHocValidator: (value, validatorArgument) => {/*return true if the value is erroneus*/}
    // Example of confirm a password
    passwordShouldMatch: (value) => value !== this.state.fields.password
  }
}

```

Example: global

```javascript

// Define a global validator
Reform.validators.set('myCustomGlobalValidator', (value, validatorArgument) => {/*return a boolean*/});

// Now you can use it in any place of your app

this.validationRules = {
  myField: {
    myCustomGlobalValidator: validatorArgument,
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

// With object mixin (use it in typescript to get type information)
class MyComp extends React.Component {
  re = Reform.reactMixins.objectMixin(this);
  //All Reform.reactHelper methods are available inside `this.re`
  //you can use any other attribute name
}
```

objectMixin is the most appropiate with Typescript
since it will give you autocomplete and proper typechecking.

###  Triggering Validation

There are several ways you can trigger validation, let's checkout how:

**Fields**

```javascript
//onChange
handleChange(e) {
  const value = e.target.value;
  // this function will validate `value` with `this.validationRules[fieldName]`
  // and update `this.state.errors[fieldName]`
  // NOTE: this wont update `this.state.fields[fieldName]` with the newest value
  this.validateField(fieldName, value);
}

//onBlur
handleBlur() {
  // this function will validate `this.state.fields[fieldName]` with `this.validationRules[fieldName]`
  // and update `this.state.errors[fieldName]`
  // Note that we assume that we already have the latest value inside `this.state.fields[fieldName]`
  // NOTE: this wont update `this.state.fields[fieldName]` with the newest value
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


