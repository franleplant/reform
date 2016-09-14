# Reform [![Build Status](https://travis-ci.org/franleplant/reform.svg?branch=master)](https://travis-ci.org/franleplant/reform) [![Coverage Status](https://coveralls.io/repos/github/franleplant/reform/badge.svg?branch=master)](https://coveralls.io/github/franleplant/reform?branch=master)

Form validation library for react


> This lib is in Alpha stage

## Quick Start


TODO


## Index

TODO

## Design Goals

There's a hole in the React ecosystem regarding Form Validation.
While there are very nice solutions such as [redux-form](https://github.com/erikras/redux-form), they tend
to be pretty minimal, verbose and difficult for beginners.

The main objectives of **Reform** are:
- Minimal, declarative and HTML5 compliant validation API
- Extensibility: validate anything you need to, the way you want to
- HTML5 compliant validation rules out of the box: `required`, `pattern`, input type `email`, etc


In a sense **Reform** is a port of HTML5 validation primitives to the React world
while maintaining common React Idioms and adding custom error display and custom async validators.

People familiar with Angular 1 forms will feel at home here.


## Scope

### What does `Reform` do for you?

- Supports HTML5 native input validation attributes and their rules (out of the box, official, default validators)
- Enables you to create custom validators and re-use them.
- Enables you to use validators in a declarative way (HTML5)
- Enables you to display the errors anyway you like it to.
- Validates and maintain bookkeeping about the state of your form.
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

TODO

## Docs

### API

TODO: add keywords for better searching

#### <Reform/>
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


> If you do not provide the `onSubmit` in your `<form>` element then you should manually set `noValidate`
to stop HTML5 native validation from happening. Don't worry, you still get it through Reform's functionality.


> Reform needs an `onSubmit` handler on the `<form>` element or a `onClick` on submit mechanisms. Ideally you will handle everything
through `onSubmit` but you are free to do the way you want to.




#### Control
> form control, form input, custom controls, field, input, select, textarea, radio, checkbox

How do you access it?

```typescript

type Control = {
  value: string | number | any;
  checked: boolean;
  errors: {
    [validationRuleKey: string]: boolean;
  };

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
}

```

Example of errors

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


TODO: show snippets of common form Controls

#### Form
> form state, formState, isValid, access to all controls

You can use this object to access all the controls in the form.
It's useful when you want to do validations that take in account more than one field.

```typescript
type Form = {
  [fieldName: string]: Control;

  isValid: () => boolean;

  // You will probably never use this method.
  // It's used internally by Reform
  async validate: () => boolean;
}
```


#### data-reform
> configuration, config, manual, customization, custom validators, get value, parse

`data-reform` is a custom prop used to config reform on a particular form control.

Use it to:

- Define Custom Validators (ad hoc or global)
- Custom `getValue`

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
GetValue: (first: Event | any, control: Control) => any
```


TODO: example about this

#### Custom Validators
> custom validators, validate, ad hoc, global validators, async validators

Reform supports two forms of custom validators: Ad Hoc and Global.
Both support out of the box and transparently async validations.

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

##### Ad Hoc Custom Validators

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

> Ad Hoc means exactly..... TODO

> While you could create a simple function that acts as custom validator and pass it around
like you will do with a regular function and use it ad hoc several times, you should avoid this
and use Global Validators instead.


#### Global Validators

When building a big application you will probably want to create a reusable
pool of Custom Validators that are related to your app's domain.
Reform let's you define new validators and re-use them.

Let's add `customMinLength` as a Global Validator

```javascript
import { Validators } from '../main';
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




### Common solutions for common problems


TODO: snippets of code showing how to `autocontrol`, reducing boilerplate, handle form state, etc

## Contributing

TODO

## Licence

MIT
