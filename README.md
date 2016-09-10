# Reform [![Build Status](https://travis-ci.org/franleplant/reform.svg?branch=master)](https://travis-ci.org/franleplant/reform) [![Coverage Status](https://coveralls.io/repos/github/franleplant/reform/badge.svg?branch=master)](https://coveralls.io/github/franleplant/reform?branch=master)

Form validation library for react

> THIS IS A  PROTOTYPE

We are approaching Feature completeness and we are starting working with the docs.


## Quick Start


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
- Enables you to display the errors anyway you like it to.
- Validates and maintain bookkeeping about the state of your form.
- Provide input validation state on every `change` event.
- Provide form validation state on every `submit` event.


### What does `Reform` do not do for you?

- Render input / form errors for you (it provides the data and methods necessary for you to do it though).
- Tell you how you should render input / form errors.
- Keep React State for you. You still need to `Control` your inputs as in React Controlled Components.
- Provide opinions about how you should handle your forms. The only requirements is that the fields are Controlled Components.


In the examples you are going to see common patterns about Controlling Inputs and Keeping React State and displaying errors but
these are solely based on our personal experiences and may not fit you well. The important thing is that one of the goals of the lib
is to provide as much freedom to you as you want to.



## Examples

TODO


## Contributing

TODO

## Licence

MIT
