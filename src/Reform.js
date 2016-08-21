import React, { Component } from 'react';
import * as Element from './element'
import * as Control from './control'

export const defaultGetValue = event => event.target.value

/*

type GetValue = (event, control) => fieldValue

interface ReformConfig {
  validationRules: ValidationRules;
  getValue: GetValue;
}
*/


export class ReformErrors {
  isValid() {
    return Object.keys(this)
      .map(error => this[error])
      .every(error => error === false)
  }
}



export default class Reform extends Component {
  constructor(props) {
    super(props)
    this.formState = {}
  }

  render() {
    const newChildren = this.monkeyPatchChildrens(this.props.children)
    return <div>{newChildren}</div>
  }

  onChangeFactory(child, oldOnChange) {
    return e => {
      const name = e.target.getAttribute('name')
      // If cant found then something horrible wrong happended
      let control = this.formState[name]

      // Update value
      control.value = control.getValue(e, control)

      // Update error hash
      control = Control.validate(control)

      // TODO: figure out a proper interface for the arguments
      const args = [e, control.errors, arguments]
      oldOnChange.apply(null, args)
    }
  }


  monkeyPatchChildrens(children) {
    return React.Children.map(children, element => {
      //if (!element) {
        //debugger
      //}
      if (Element.isTextType(element)) {
        return element
      }

      const oldChildren = element.props.children

      // Recursive call
      const newChildren = this.monkeyPatchChildrens(oldChildren)


      let newProps = {};

      const REFORM_CONFIG_KEY = 'data-reform'
      // TODO: maybe a better sanity check here. Try to be smart about missing onChanges
      // et al. Maby limit to check onChange and Value and just that and alert about name
      if (  element.props.hasOwnProperty('onChange') && element.props.hasOwnProperty('value')) {
        const name = element.props.name
        if (!name) {
          throw new Error(`All controlled inputs must have "name" props. In ${element}`)
        }
        const oldOnChange = element.props.onChange
        const config = element.props[REFORM_CONFIG_KEY] || {}

        const getValue =  config.getValue || defaultGetValue
        // TODO: warn about repeated rules
        const validationRules = Object.assign(
          config.validationRules || {},
          Element.getValidationRules(element)
        );


        // TODO: Maybe switch to a class base thingy ???
        const control = {
          name: name,
          elementType: element.type,
          typeProp: element.props.type,
          errors: {},
          value: element.props.value,
          validationRules: validationRules,
          getValue: getValue,
        }


        this.formState[name] = control

        const onChange = this.onChangeFactory(element, oldOnChange)
        newProps = {onChange}

      // TODO: are these all the ways to submit a form?
      // Any element that has onSubmit
      // since html only allows <form> to have onSubmit handlers then we are covered
      // form on Submit
      } else if (element.props.onSubmit) {

        const oldOnSubmit = element.props.onSubmit;
        const onSubmit = e => {
          const isValid = this.validateForm();
          const errorMap =
            Object.keys(this.formState)
              .map(fieldName => this.formState[fieldName])
              .reduce((map, control) => {
                const name = control.name
                const errors = control.errors
                map[name] = errors
                return map
              }, {})

          const args = [e, isValid, errorMap, arguments]
          oldOnSubmit.apply(null, args);
        }

        newProps =  {onSubmit}

      // Input type submit
      // Button (submit)
      } else if (Element.isSubmitInput(element) || Element.isSubmitButton(element)) {

        const oldOnClick = element.props.onClick || function() {};
        const onClick = e => {
          const isValid = this.validateForm();
          const errorsMap =
            Object.keys(this.formState)
              .map(fieldName => this.formState[fieldName])
              .reduce((map, control) => {
                const name = control.name
                const errors = control.errors
                map[name] = errors
                return map
              }, {})

          const args = [e, isValid, errorsMap, arguments]
          oldOnClick.apply(null, args);
        }

        newProps = {onClick}
      }


      return React.cloneElement(element, newProps, newChildren)
    })
  }

  validateForm() {
    return Object.keys(this.formState)
      .map(fieldName => this.formState[fieldName])
      .map(control => Control.validate(control))
      .map(control => control.errors)
      .every(errors => errors.isValid())
  }

  isValid() {
    return Object.keys(this.formState)
      .map(fieldName => this.formState[fieldName])
      .map(control => control.errors)
      .every(errors => errors.isValid())
  }

}
