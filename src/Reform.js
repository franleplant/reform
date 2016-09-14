import React, { Component } from 'react';
import * as Element from './element'
import Control from './control'

const noop = function() {};

export default class Reform extends Component {
  constructor(props) {
    super(props)
    this.formState = {}
  }

  render() {
    const newChildren = this.monkeyPatchChildrens(this.props.children)
    return <div>{newChildren}</div>
  }

  onChangeFactory(name, child, oldOnChange) {
    return async (e, ...args) => {
      // If cant found then something horrible wrong happended
      let control = this.formState[name]

      if (!control) {
        throw new Error(`Could not find control with name ${name}. This is likely a bug with Reform :(`)
      }

      // Update value
      control.value = control.getValue(e, control)

      try {
        control.checked = e.target.checked
      } catch(e) {
        control.checked = null;
      }

      // Update error hash
      await control.validate(this.formState)

      oldOnChange.apply(null, [control, e, ...args])
    }
  }


  monkeyPatchChildrens(children) {
    return React.Children.map(children, element => {
      if (!element) {
        return element
      }
      if (Element.isTextType(element)) {
        return element
      }

      const oldChildren = element.props.children

      // Recursive call
      const newChildren = this.monkeyPatchChildrens(oldChildren)


      let newProps = {};

      const REFORM_CONFIG_KEY = 'data-reform'

      // the way to distinguish controls from other element should be the following:
      // - checkboxes, radios and Custom checkboxes and Radios should have onChange, checked, value
      // - The rest of the inputs and their Custom counterparts should have onChanve and value
      const isControl =
        element.props.hasOwnProperty('onChange') &&
        (element.props.hasOwnProperty('value') || element.props.hasOwnProperty('checked'));
      const isForm = element.props.hasOwnProperty('onSubmit');
      // TODO: hack all submit mechanisms
      const isSubmit = Element.isSubmitInput(element) || Element.isSubmitButton(element);
      if (isControl) {
        const oldOnChange = element.props.onChange

        const control = new Control(element, element.props[REFORM_CONFIG_KEY]);

        // Special case for Radio buttons
        if (Element.isRadio(element)) {
          const existingControl = this.formState[control.name];
          if (existingControl) {
            control.value = control.checked ? control.value : existingControl.value;
          }
        }

        this.formState[control.name] = control;

        const onChange = this.onChangeFactory(control.name, element, oldOnChange)
        newProps = {onChange}

      } else if (isForm) {
        const oldOnSubmit = element.props.onSubmit;
        const onSubmit = async (...args) => {
          await this.validateForm();
          oldOnSubmit.apply(null, [this, ...args]);
        }

        // Disable html5 native validation
        newProps =  {onSubmit, noValidate: true};

      } else if (isSubmit) {

        const oldOnClick = element.props.onClick || noop;
        const onClick = async (...args) => {
          await this.validateForm();
          oldOnClick.apply(null, [this, ...args]);
        }

        newProps = {onClick}
      }


      return React.cloneElement(element, newProps, newChildren)
    })
  }

  async validateForm() {
    for (const fieldName in this.formState) {
      const control = this.formState[fieldName];
      await control.validate(this.formState);
    }

    return this.isValid();
  }

  isValid() {
    return Object.keys(this.formState)
      .map(fieldName => this.formState[fieldName])
      .every(control => control.isValid())
  }


  getErrorMap() {
    let errorMap = {}
    for (let fieldName in this.formState) {
      const control = this.formState[fieldName];
      errorMap[fieldName] = control.errors;
    }

    return errorMap;
  }

}
