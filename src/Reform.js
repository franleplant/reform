import React, { Component } from 'react';
import * as Element from './element'
import Control from './control'

const noop = function() {};
/*

type GetValue = (event, control) => fieldValue

interface ReformConfig {
  validationRules: ValidationRules;
  getValue: GetValue;
  typeProp: string
}
*/

/*
  form spec!
  https://www.w3.org/TR/html5/forms.html

  good docs
  https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
*/

// TODO: docs! and examples!
// TODO: test getValue
// TODO: async validators
// TODO: error view helpers
// TODO: move example to a inner create react app app
// TODO: test with bootstrap and other third party components
// TODO: test bootstrap integration
// TODO: moment and date selectors integration?
// TODO: warnings all over the place
// TODO: warn if no form is in the children
// TODO: warn if no controls
// TODO: wanr if no submit handlers
// TODO: warn duplicated names (except for radios)
// TODO: logging generalization
// TODO: monkeypatch all submit mechanisms (contemplate bootstrap forms for example) (inputs, submits, buttons, images)
// TODO: optimize

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
    const that = this;
    return function(e) {
      const name = e.target.getAttribute('name')
      // If cant found then something horrible wrong happended
      let control = that.formState[name]

      if (!control) {
        throw new Error(`Could not find control with name ${name}. This is likely a bug with Reform :(`)
      }

      // Update value
      control.value = control.getValue(e, control)

      if (control.isInputType('checkbox')) {
        control.checked = e.target.checked
      }

      // Update error hash
      control.validate(that.formState)

      oldOnChange.apply(null, [control, ...arguments])
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
      const isControl = element.props.hasOwnProperty('onChange') && element.props.hasOwnProperty('value');
      const isForm = element.props.hasOwnProperty('onSubmit');
      // TODO: hack all submit mechanisms
      const isSubmit = Element.isSubmitInput(element) || Element.isSubmitButton(element);
      if (isControl) {
        const oldOnChange = element.props.onChange


        // TODO: how to interface with Control class
        // TODO: we need to modifiy the existing value of the named control
        // with the one that is cheked
        //if it's a radio input then value should be set for the checked input if not it should be ''
        //warn user when not all radio buttons with the same name have the same validationRules
        //
        //if (element.props.type === 'radio' || isBootstrapRadio) {
          //const control = this.formState[name]
          //if (control) {
            //const newValidationRules = Element.getValidationRules(element)
            //if (JSON.stringify(newValidationRules) !== JSON.stringify(control.validationRules)) {
              //console.error(`All <input type=radio name=${name} /> with the same name should have the same validation rules`)
              //throw new Error('Bad validation rules')
            //}

            //value = element.props.checked ? value : control.value
          //} else {
            //value = element.props.checked ? value : ''
          //}
        //}

        const control = new Control(element, element.props[REFORM_CONFIG_KEY]);
        this.formState[control.name] = control;

        const onChange = this.onChangeFactory(element, oldOnChange)
        newProps = {onChange}

      } else if (isForm) {
        const oldOnSubmit = element.props.onSubmit;
        const onSubmit = (...args) => {
          this.validateForm();
          oldOnSubmit.apply(null, [this, ...args]);
        }

        // Disable html5 native validation
        newProps =  {onSubmit, noValidate: true};

      } else if (isSubmit) {

        const oldOnClick = element.props.onClick || noop;
        const onClick = (...args) => {
          this.validateForm();
          oldOnClick.apply(null, [this, ...args]);
        }

        newProps = {onClick}
      }


      return React.cloneElement(element, newProps, newChildren)
    })
  }

  validateForm() {
    Object.keys(this.formState)
      .map(fieldName => this.formState[fieldName])
      .forEach(control => control.validate(this.formState))

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
