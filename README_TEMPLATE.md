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
```replaceFile
./examples/src/GettingStarted.js
```
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


