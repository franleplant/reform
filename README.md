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
while maintaining common React Idioms.

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

function onChange(control, event) { ...  }


function onSubmit(formState, event) { ...  }

```





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

How do you access it?

```javascript

type Control = {
  value: string | number | any;
  checked: boolean;
  errors: {
    [validationRuleKey: string]: boolean;
  }
}

```

Example of errors

```javascript

errors: {
  required: true,
  myCustomRule: false,
}
```

- `true` tells you that the rule has an error
- `false` tells you that there isn't one
- each `validationRuleKey` is always related to a rule. So, for example, there's a rule (function) called `required` (built-in) which will be evaluated every time the input changes value and it's result will be stored in errors. 

> Always `errors[validationRuleKey]` will `true` is there is an **error**

#### Form

#### data-reform

#### Custom Validators

### Common solutions for common problems


TODO: snippets of code showing how to `autocontrol`, reducing boilerplate, handle form state, etc

## Contributing

TODO

## Licence

MIT
