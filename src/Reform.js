import React, { Component } from 'react';
import * as Element from './element'
import * as Control from './control'

const supportedNativeTypes = ['input', 'select', 'textarea'];
export const getValue = event => event.target.value

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
      if (  element.props.onChange && element.props.value && element.props.name) {
        const oldOnChange = element.props.onChange
        const config = element.props[REFORM_CONFIG_KEY] || {}

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
          getValue: config.getValue || getValue
        }


        this.formState[name] = control

        const onChange = this.onChangeFactory(element, oldOnChange)
        newProps = {onChange}

      // TODO: revisit this
      // TODO: do the same with form onSubmit and input type submit and any other possible submit thing
      } else if (Element.isForm(element)) {

        const oldOnSubmit = element.props.onSubmit;
        const onSubmit = e => {
          const isValid = this.validateForm();
          const args = [e, isValid, arguments]
          oldOnSubmit.apply(null, args);
        }

        newProps =  {onSubmit}
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
