# Reform [![Build Status](https://travis-ci.org/franleplant/reform.svg?branch=master)](https://travis-ci.org/franleplant/reform) [![Coverage Status](https://coveralls.io/repos/github/franleplant/reform/badge.svg?branch=master)](https://coveralls.io/github/franleplant/reform?branch=master)

Form validation library for react


> This lib is in Alpha stage

We have a separate [Repo for examples](https://github.com/franleplant/reform-examples)
that's versioned in the same sequence at this main repo, so working Examples for version `4.2.4` will be tagged
by version `4.2.4` in reform-examples

## Index

- [Quick Start](#quick-start)
- [Design Goals](#design-goals)
- [Scope](#scope)
- [Examples](#examples)
- [API](#api)
  - [`<Reform/>`](#reform)
  - [`Errors`](#errors)
  - [`Control`](#contro)
  - [`Form`](#form)
  - [`data-reform`](#data-reform)
  - [Custom Validators](#custom-validators)
- [Common solutions for common problems](#common-solutions-for-common-problems)
- [Internals explained](#internals)
- [Contributing](#contributing)

## Quick Start

Reform provides a very minimal and hopefully unobstrusive API that _mounts_ over regular Form Handling in React.
Checkout React Controlled Components documentation to see the original API.


```javascript
import React from 'react';
import Reform from '@franleplant/reform';

export default class MyForm extends React.Component {
  constructor(props) {
    super(props)

    /* 1st */
    this.state = {
      fields: {
        username: '',
      },

      errors: {
        username: {},
      }
    }
  }

  /* 2st */
  handleUsernameChange(control, event) {
    this.setState(state => {
      // Store the value of the field
      state.fields.username = control.value;
      // Optionally store the validation state, useful to display dynamic information as user types
      state.errors.username = control.errors;

      return state
    })
  }

  /* 3rd */
  handleSubmit(form, event) {
    event.preventDefault();

    this.setState(state => {
      // Store _all_ errors from the form
      state.errors = form.getErrorMap();
      return state
    });

    if (!form.isValid()) {
      console.log("FORM NOT VALID ")
    }
  }

  render() {
    /* 4th */
    return (
      <Reform>
        <form onSubmit={this.handleSubmit.bind(this)}>
          {/* Use HTML5 native validation rules */}
          {/* The important part here is that Inputs must have a name, value and onChange to be hooked by Reform */}
          <input
            type="text"
            placeholder="username"
            minLength="3"
            required
            name="username"
            value={this.state.fields.username}
            onChange={this.handleUsernameChange.bind(this)}
          />

          {this.state.errors.username.minLength ? <p>User Name should have at least 3 characters</p> : null}
          {this.state.errors.username.required ? <p>User Name is required</p> : null}

          <button type="submit">Submit</button>
        </form>
      </Reform>
    );
  }
}
```


1- Define a place in your state to store your fields and field errors

> Reform does not have opinions where these should be

2- Define `onChange` handler

> NOTE how the onChange receives a new paramater called `control`, that's Reform in the works :smile:
`control` will provide the already calculated value (`event.target.value` by default) and the validation state

3- Define your `onSubmit` handler

It's important that your form has an `onSubmit` handler to Reform to work correctly

> NOTE how onSubmit receives a new parameter called `form`, that's Reform in the works :smile:
`form` will provide you with few useful APIs such as `isValid` and `getErrorMap`

4- Render your form

The important part here is that you need to wrap everything in `<Reform>` and that `Reform` only hooks
Controlled Components with name i.e. they have `name`, `value` and `onChange` props



There are some techniques that we explore on the examples where we abstract a little bit the pumbling that's
inherent to React Form Handling, but this is the big picture, as you see, the API is super minimal



## Design Goals

There's a hole in the React ecosystem regarding Form Validation.
While there are very nice solutions such as [redux-form](https://github.com/erikras/redux-form), they tend
to be pretty minimal, verbose and difficult for beginners.

The main objectives of **Reform** are:
- Minimal, declarative and HTML5 compliant validation API
- Extensibility: validate anything you need to, the way you want to
- HTML5 compliant validation rules out of the box: `required`, `pattern`, input type `email`, etc


In a sense **Reform** is a port of HTML5 validation primitives to the React world
while maintaining common React Idioms and adding custom error display and custom validators.

People familiar with Angular 1 forms will feel at home here.


## Scope

### What does `Reform` do for you?

- Supports HTML5 native input validation attributes and their rules (out of the box, official, default validators)
- Enables you to create custom validators and re-use them.
- Enables you to use validators in a declarative way (HTML5)
- Enables you to display the errors anyway you like it to.
- Validates and maintain bookkeeping about the state of your form.
- Work well with `react-bootstrap`
- Provide input validation state on every `change` event.
- Provide form validation state on every `submit` event.


The last two are the most visible change Reforms does to your code.

You will notice that the arguments of `onChange` of your controlled components and `onSubmit` of your form
will change signatures to these ones:

```javascript

function onChange(control: Control, event: HTMLEvent) { ...  }


function onSubmit(formState: Form, event: HTMLEvent) { ...  }
```

> Note that Reform will only add a first argument to these function, the rest of
the parameters will still be there. `event` tends to be the first parameter (and the only)
for native elements (i.e. input, select, textarea), but it might be anything else for
custom form controls. Reform does not interfere with that and it's designed to work well
with anything. See Examples.





### What does `Reform` not do for you?

- Render input / form errors for you (it provides the data and methods necessary for you to do it though).
- Tell you how you should render input / form errors.
- Keep React State for you. You still need to `Control` your inputs as in React Controlled Components.
- Provide opinions about how you should handle your forms. The only requirements is that the fields are Controlled Components and have `name` attributes.


In the examples you are going to see common patterns about Controlling Inputs and Keeping React State and displaying errors but
these are solely based on our personal experiences and may not fit you well. The important thing is that one of the goals of the lib
is to provide as much freedom to you as you want to.



## Examples

For now, the examples are in a separate [Repo](https://github.com/franleplant/reform-examples) so you can also see them running, the repo it's versioned so if you look for Examples for Reform version 4.2.x you will see them tagged like 4.2.x too

# Docs
> Documentation, docs

## API

### `<Reform/>`
> form, reform, component, entry point, onSubmit, top level api

This is the entry point to the lib. The way to use it is as follow:

```javascript
<Reform>
  <form onSubmit={...}>
    {fields...}
  </form>
</Reform>
```
This Component does not receive any props, that's by design so we keep the interface as minimal and simple as possible.

`Reform` will hook **all components that have a `name`, `value` and `onChange` props** that are children of it, no more no less.


> If you do not provide the `onSubmit` in your `<form>` element then you should manually set `noValidate`
to stop HTML5 native validation from happening. Don't worry, you still get it through Reform's functionality.


> Reform needs an `onSubmit` handler on the `<form>` element or a `onClick` on submit mechanisms. Ideally you will handle everything
through `onSubmit` but you are free to do the way you want to.



### `Errors`

> getErrorMap, display errors
Common interface for reporting errors for a particular `Control`.

```typescript
type Errors = {
  isValid: () => boolean;
  
  // Probably the single most important special attribute of this Type.
  // Since this an attribute, you can safely check empty errors objects
  // for their validity (they usually are initialy valid by default).
  isInvalid: boolean;
  
  // This represents the results of each individual validation.
  // validationRuleKey can be for example `required`, `min`, `maxLength` and
  // any custom validators you might be using.
  [validationRuleKey: string]: boolean;
};

```

#### Example 1

```javascript

errors: {
  required: true,
  myCustomRule: false,
}
```

- `true`: the rule has an error. The field is not valid
- `false` the rule does not have an error. The field is Valid
- each `validationRuleKey` is always related to a rule. So, for example, there's a rule (function) called `required` (built-in) which will be evaluated every time the input changes value and it's result will be stored in errors. 

> Always `errors[validationRuleKey]` will be `true` if there is an **error**


#### Example 2: errors and styling

Suppose our error state is initialized like this

```javascript
this.state = {
  fields: {...}
  errors: {
    field1: {},
    ...
  }
}
```

Then you can style Controls accordingly like so:

```javascript

<input 
 name="field1"
 value={this.state.fields.field1}
 onChange={...}
 required
 style={{
  borderColor: this.state.errors.field1.isInvalid ? 'red': null
 }}
/>
```

See how useful the `isInvalid` attribute is, because it works well with empty objects.


### `Control`
> form control, form input, custom controls, field, input, select, textarea, radio, checkbox

You access it from the `onChange` handlers like this:

```javascript
function handleChange(control, event) {...}
```


This is the type definition (in pseudo typescript)

```typescript
type Control = {
  value: string | number | any;
  checked: boolean;
  errors: Errors;
  
  isValid: () => boolean;

  validationRules: {
    // For more info check the custom validator rules
    // This hash will be filled automatically by Reform when
    // using built-in standard rules (require, min, minLength, et al)
    [validationRuleKey: string]: boolean | Function;
  };

  // This function tells Reform how to get the value of a Control Element
  // from the arguments of the onChange event handler.
  // Check `data-form` section for more information
  getValue: Function;
  
  // The parsed or forced inputType of the component
  inputType: string;
  
  // The React element type
  elementType: string | Function;
}

```



If you have a field like this
```javascript
<input
  name="myControl"
  required
  value={this.state.myControl}
  onChange={handleChange}
/>
```

You will get a control like this in the `handleChange` whenever your input changes

```javascript
control = {
  value: "the value that you just typed",
  errors: {
    required: false,
    
    // Special attribute
    isInvalid: false,
  },
  ...
}
```

Note that `errors.required` will be `false` because the control has a value so it's not in error state.

### `Form`
> form state, formState, isValid, access to all controls

You can use this object to access all the controls in the form.
You use typically use it to prevent the form from being submited if it's invalid
and to update your Form Component error state.


You access it inside the body of your `onSubmit` function:

```javascript
function handleSubmit(form, event) {...}
```


This is the type definition

```typescript
type Form = {
  [fieldName: string]: Control;

  isValid: () => boolean;
  getErrorMap: () => { [fieldName]: Errors };
}
```


This is an example of how to check form validity before call to a hipotetical API submitting the form:

```javascript
class MyComponent extends React.Component {
  handleSubmit(form, event) {
    event.preventDefault()
  
    // Store your error state, so you can display potential errors when your component renders
    this.setState({ errors: form.getErrorMap() });

    if (!form.isValid()) {
      // If it's not valid, then do nothing and let react re render the component and
      // display the errors wherever you want to
      console.log('Form not valid');
    }

    // Everything's fine


    // There are several ways to get the value of all your fields,
    // for example (assuming you are storing your fields state there)
    const data = this.state.fields;

    MyAPI.submit(data);
  }
}
```


### `data-reform`
> configuration, config, manual, customization, custom validators, get value, parse

`data-reform` is a custom prop used to config reform on a particular form control.

Use it to:

- Define Custom Validators (ad hoc or global)
- Custom `getValue`
- Force a Component to be considered a `checkbox` or a `radio`

```javascript

const dataReform = {
  getValue: event => event.target.value.toUpperCase(),
  validationRules: {
    myRule1: ...
  }
}
```


`getValue` is useful when you are trying to validate a custom component
that instead of invoking `onChange` with an `event` object as native elements do, it
invokes `onChange` with something else.
This hooks let's you configure how Reform calculates the value of a given control
from the onChange arguments.

it's signature is:

```typescript
type GetValue = (first: Event | any, control: Control) => any
```

- `first` is an `event` for native `input` controls such as `input`, `select` and `textarea` but could also be anything that a Custom Control emits, such as a string, number, Date Object, Moment Object, Array, anything you can imagine. In fact, working with Custom Components is the main reason `getValue` exists.
- `control` is the current state of the `control` so you have all the data of that control available such as the `inputType` for example.


You can force a Custom Component to be considered by `Reform` as a `checkbox` or a `radio` like this:

```
<MyCustomComponent
  name="myField"
  value={this.state.fields.myField}
  onChange={...}
  data-reform={
    inputType:"checkbox"
  }
```

> NOTE We already work well with `react-bootstrap` so no extra verbosity needed there. Also, the plan is to support
any view libraries' Custom Components so PR us or create an issue for anything lacking.

### Custom Validators
> custom validators, validate, ad hoc, global validators, async validators

> Async validators are not supported! They are planned but right now they complicate things too
much, if you need to work with async validators you can use them directly with React, Reform wont 
get in the way

Reform supports two forms of custom validators: Ad Hoc and Global.

Validators are just functions with the following signature:

```typescript
CustomValidator: (control: Control, formState: FormState) => boolean;
```

If a validator returns `true` then that means that there is an error.

Example

```javascript
function customMinLength(control, formState) {
  const value = control.value;

  if (value.length < 5) {
    // error
    return true
  }

  // everything's fine
  return false
}
```


> FormState gives you access to the rest of the form controls, so you can implement things such
as password verification pretty easily

#### Ad Hoc Custom Validators

This type of custom validators are defined in place of the control using it.
They are similar to anonymous functions, they are intended for one time use.


Let's use `CustomMinLength` defined before as an Ad Hoc Custom Validator

```javascript
<Reform>
  <form onSubmit={...}>
    <input
      type="text"
      value={...}
      onChange={...}
      data-reform={{
        validationRules: {
          customMinLength: customMinLength
        }
      }}
    />

    <button>Submit</button>
  </form>
</Reform>

```

> Ad Hoc means _created or done for a particular purpose as necessary._


> While you could create a simple function that acts as custom validator and pass it around
like you will do with a regular function and use it ad hoc several times, you should avoid this
and use Global Validators instead.


### Global Validators

When building a big application you will probably want to create a reusable
pool of Custom Validators that are related to your app's domain.
Reform let's you define new validators and re-use them.

Let's add `customMinLength` as a Global Validator

```javascript
import { Validators } from '@franleplant/reform';
Validators.addRule('customMinLength', customMinLength);
```


Now you can use it everywhere via `data-reform`

```javascript
<Reform>
  <form onSubmit={...}>
    <input
      type="text"
      value={...}
      onChange={...}
      data-reform={{
        validationRules: {
          customMinLength: true
        }
      }}
    />

    <button>Submit</button>
  </form>
</Reform>
```


> Note that instead of passing a function to `customMinLength` we are passing a simple boolean, 
Reform will then look for a previously defined validator with that rule.




## Common solutions for common problems


### How should I manage my field and error state?

Reform does not care about how you handle your form state.
Reform only cares that you are working with [Controlled Components](https://facebook.github.io/react/docs/forms.html)

The pattern that you are going to see in the examples is the one I use the most:

```javascript
this.state = {
  // Fields will contain all form fields and no more
  fields: {
    field1: initialValue,
    field2: initialValue,
    ...
  },
  
  // Field Errors. Initializing them as empty objects will prevent you from null checking
  // every time you display an error
  errors: {
    field1: {},
    field2: {},
    ...
  }
}
```



### How can I reduce the boilerplate of React's Controlled Components?

There are several techniques to do this and they are not exclusive to `Reform` but I will list some briefly.

#### `autocontrol` pattern

The `autocontrol` pattern is used to reduce the boilerplate needed in every single Form Control (think inputs) which are namely: `value` and `onChange`. Additionally we will also add `name` to these because it's required by `Reform`

```javascript
class Login extends Component {
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

  // In here we create a generic `onChange` handler that will be used later.
  // The important parts here is that this is a function that saves the errors and the value
  // for the `fieldName` field.
  handleFieldChange(fieldName, control, event) {
    this.setState(state => {
      state.fields[fieldName] = control.value;
      
      // Note that we are updating the fields errors as the user types, so that means that we
      // are display error information in real time, that might not be what you want and `Reform`
      // does not care about it.
      state.errors[fieldName] = control.errors;
      return state
    })
  }

  handleSubmit(form, event) {...}
  render() {
    // Handy aliases
    const {fields, errors} = this.state;


    // The body of the `autocontrol` pattern.
    // This is just a function that accepts a `fieldName` and returns
    // and object that represent the props of the `fieldName` Component.
    const autocontrol = fieldName => {
      return ({
        // `name` prop required by `Reform`
        name: fieldName,
        // value prop that points out to `this.state.fields[fieldName]
        value: fields[fieldName],
        // onChange prop that is a partial application of the `handleFieldChange` method
        // We partially apply it by binding it to the context `this` and to the `fieldName`
        onChange: this.handleFieldChange.bind(this, fieldName),
      })
    }


    return (
      <Reform>
        <form onSubmit={this.handleSubmit.bind(this)}>
            <div>
              {/* 
              And finally in here we use the `autocontrol` function.
              Remember, there's no magic in here, props is just an object that it's used as function parameter
              and JSX is just sugar to these: `React.createElement('input', props, children)` so we are adding attributes
              to the `props` with `autocontrol`, nothing more nothing less.
              */}
              <input type="text" placeholder="username" minLength="3" required {...autocontrol('username')} />
              
              {/* Error display ommited */}
            </div>

            <div>
              {/* We use again the `autocontrol` function */}
              <input type="password" placeholder="password" minLength="6" required {...autocontrol('password')} />
              
              {/* Error display ommited */}
            </div>

            <button type="submit">Submit</button>
        </form>
      </Reform>
    );
  }
}
```

There's nothing special with this but it's just a more succint way of doing the two way data bindings.

This:

```javascript
<input
  type="text"
  placeholder="username"
  minLength="3"
  required
  
  {...autocontrol('username')}
/>
```

Turns to this:
```javascript
<input
  type="text"
  placeholder="username"
  minLength="3"
  required
  
  name="username"
  value={this.state.fields.username}
  onChange={this.handleFieldChange.bind(this, 'username')}
/>
```

### How to display errors?

As you've already seen, errors should be stored someplace in the state. We've been using
`this.state.errors`.

There are several ways of display erorrs, most of these techniques are not `Reform` specific so feel
free to use your React knowledge the best you can.

The simplest most verbose way is this one

```javascript
{
  this.state.errors.myField.errorName ? 
    <p>Your field is not valid</p>
    :
    null
}
```

`myField` could be `username` and `errorName` could be `required` for example.

> NOTE: this assumes you initialized `this.state.errors.myField = {}` otherwise you would also have to check if `this.state.errors.myField` is null.

The problem with this approach is the ternary operation, the verbosity, and the ugglyness, but we can do better, how? Just use React components!

```javascript

const Error = ({error, children}) => {
  if (!error) {
    return null;
  }
  
  return <p>{children}</p>
}
```

And you could use it like this:

```javascript
<Error error={this.state.errors.myField.required}>
  Input is required
</Error> 
```

Note that this also assumes you initialized `this.state.errors.myField = {}`

If you don't want to initialize `errors.myField` you could enhance `Error` component to
run the checks for you, just do whatever React black magic you want to.


# Internals
> Inner workings, internals, how it works, design, contributors, contributing

In this section we are going to explain how `Reform` works from the inside.
This documentation is useful to 

- Contributors that need to understand the core ideas of `Reform`
- Users that want to desmistify the inner workings of `Reform`. It's not at all Black Magic.

## React Controlled Components

`Reform` mounts and enhances React Controlled Components, which is basically another way of naming Two Way Data Binding (2WDB).

I believe that the main reason not to call this pattern 2WDB is because it's much less magical,
you always clearly know what are the ways the data flow from the **View** to the **Model** and viceversa.


![Diagram 1](docs/diagram1.jpg)


Reference:
- **Model**: in React world is called `this.state`
- **View**: in React world is basically what you return from your `render` function

Let's analyse this slowly.

### Model -> View

This is the simplest to spot. On each `render`, React will fill the Input (Form Control) with the expression that you
pass to the special `prop` named `value`.

```javascript
<input
  value={this.state.myValue}
  ...
/>
```

In here we are filling the value with the Component's state, which is the most useful and common thing to do, but you could pass constants or anything in here.

### View -> Model

In here React let's you hook on the `change` event so you can update your **Model** (`this.state`) according to what the **View** says. The main mechanism in React world for this is the `onChange` prop.


```javascript
<input
  onChange={event => {
    // Update your state
  }}
  ...
/>
```

This is one of the canonical uses of `this.setState` where you update your state to store the newest value of the given Input.

> NOTE: native `input` controls like `text`, `password`, `select`, `textarea` emit an `event` when the value of that control changes and you typically access the newest value via `event.target.value` or `event.target.checked`.

> This wont be necessary the case for Custom Controls, where you can directly emit the `newValue` instead of wrapping it in an event. Think of custom datepickers, timepickers, file selectors, or any custom Form Control you can imagine.
This is all fine and both React and Reform work well with this.

## Reform Controlled Components

We've basically explained everything that Reforms does, the only detail is that `Reform` highjacks the **View -> Model** flow
and adds **validation** data to the newValue or `event` that the **View** emits in the form of the `control` object.

![Diagram 2](docs/diagram2.jpg)

So we see that `Reform` takes the `event` emitted by the **View** that contains the newValue of that particular Form Control
and also emits a `control` data structure that contains validation information of that newValue.

```javascript
<input
  onChange={(control, event) => {
    // Update your state with the newest Value of your Form Control
    const newestValue = control.value; // Which is the same as event.target.value
    // Update your state with the newest errors of your Form Control
    const newestErrors = control.errors;
  }}
  ...
/>
```

This are the important changes here:

```diff
<input
-  onChange={event} => {
+  onChange={(control, event) => {
    // ....
  }}
  ...
/>
```

The pattern that `Reform` uses tends to feels super natural to old React users 
because it only adds information to the objects emitted by
the `change` event of a particular Form Control.

#### Why `control.value` if we already have `event.target.value`

It's true that they are same for native Form Controls that emit an `event` when they change but it's not true
for custom components that might emit a `value` without wrapping it inside an event object.

So, the main benefits of `control.value` are:

- Homogenous access to the new value (it enables patterns such as the `autocontrol` one)
- `Reform`'s flexibility.

Now, how does `Reform` know how to get the newValue from the `event` or whatever data structure the `change` event emits?

Here is where the [`data-reform.getValue`](#data-reform) comes into play.

`getValue` is a simple function that has this signature:

```typescript
type GetValue = (first: Event | any, control: Control) => any;
```

This is the default:

```javascript
function getValue(event) {
  return event.target.value
}
```

So, for native controls you are covered, but what about if I have a custom Control that emits a date in string format?

Then you need to set `getValue` to this:

```javascript
function getValue(date) {
  return date;
}
```

So you can basically hook any Control that emits anything on `change` into `Reform`

## Contributing

TODO

## Licence

MIT
