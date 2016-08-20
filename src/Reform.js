import React, { Component } from 'react';
import * as validators from './validators';

// TODO:
// - improve utils to be modularized with controlState and element
// - merge controlState with data-reform
const supportedNativeTypes = ['input', 'select', 'textarea'];
const getValue = e => e.target.value
// Slumpy way of detecting text elements
const isTextElement = el => !el.type
const isFunctionElement = type => typeof type === 'function'
const isSupportedType = type => supportedNativeTypes.indexOf(type) !== -1 || isFunctionElement(type)

// TODO: support all kind of submit elements
const isSubmit = element => element.type === 'button' && element.props.type === 'submit'
const isForm = element => element.type === 'form'

function getValidationRules(props = {}) {
  return {
    required: props.required,
    minLength: props.minLength,
    pattern: props.pattern,
  }
}

/*

interface ValidationRules {
  required: (controlState) => bool,
  minLength: ...
}

interface ControlState {
  elementType: string | function,
  name: string,
  value: any,
  typeProp: string | void,
  errors: ReformErrors,
  validationRules: ValidationRules
}
*/


class ReformErrors {
  isValid() {
    return Object.keys(this)
      .map(error => this[error])
      .every(error => error === false)
  }
}





class Reform extends Component {
  constructor(props) {
    super(props)
    this.reformState = {}
  }
  render() {
    const newChildren = this.monkeyPatchChildrens(this.props.children)
    return <div>{newChildren}</div>
  }

  onChangeFactory(child, oldOnChange) {
    return e => {
      // TODO: test this
      const name = e.target.getAttribute('name')
      // If cant found then something horrible wrong happended
      const controlState = this.formState[name]

      let errors = new ReformErrors();

      // Update value
      controlState.value = getValue(e);

      // Update error hash
      const validationRules = controlState.validationRules
      Object.keys(validationRules)
        .reduce((map, key) => {
          map[key] = validationRules[key](controlState)
          return map
        }, errors)



      let args = Array.from(arguments)
      args.push(errors)
      oldOnChange.apply(null, args)
    }
  }


  monkeyPatchChildrens(children) {
    return React.Children.map(children, element => {
      if (isTextElement(element)) {
        return element
      }

      const type = element.type
      const oldChildren = element.props.children
      const oldOnChange = element.props.onChange

      // Recursive call
      const newChildren = monkeyPatchChildrens(oldChildren)


      let newProps = {};
      if (isSupportedType(element.type) && element.props.onChange) {

        const name = element.props.name
        if (!name) {
          throw new Error("form controls must have name")
        }

        const validationRules = getValidationRules(element)
        const controlState = {
          name: name,
          elementType: element.type,
          typeProp: element.props.type,
          errors: {},
          value: element.props.value,
          valitionRules: valitionRules
        }


        // save it!
        this.formState[name] = controlState

        const onChange = this.onChangeFactory(element, oldOnChange)
        newProps = {onChange}
      } else if (isForm(element)) {

        // TODO: revisit this
        // TODO: do the same with form onSubmit and input type submit and any other possible submit thing
        const oldOnSubmit = element.props.onSubmit;
        //const inputs = this.inputRefs;
        const onSubmit = e => {
          // TODO
          this.validateForm();
          // TODO
          const isValid = this.isFormValid()
          let args = Array.from(arguments)
          args.push(isValid)
          oldOnSubmit.apply(null, args);
        }

        newProps =  {onSubmit}
      }

      return React.cloneElement(element, {}, newChildren)
    })
  }

  validateForm() {
  
  }

  isValid() {
  
          //Object.keys(this.formState)
            //.map(fieldName => this.formState[fieldName].errors)
            //.map(field =>)
  }
}
