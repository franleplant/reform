import React, { Component } from 'react';
import * as Element from './element'
import Control from './control'
import { validatorKeys as standardValidatorKeys } from './validators';

export const defaultGetValue = event => event.target.value

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

// TODO: settle an interface for Submit and errorMap
// TODO: monkeypatch all submit mechanisms (contemplate bootstrap forms for example) (inputs, submits, buttons, images)
// TODO: test with bootstrap and other third party components
// TODO: test bootstrap integration
// TODO: moment and date selectors integration?
// TODO: custom validations? (inside the config object)
// TODO: warnings all over the place
// TODO: warn if no form is in the children
// TODO: warn if no controls
// TODO: wanr if no submit handlers
// TODO: warn duplicated names (except for radios)
// TODO: validation apis (adding, composing, et al)
// TODO: FormState api: think better about it
// TODO: logging generalization
// TODO: optimize





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
    const that = this;
    return function(e) {
      const name = e.target.getAttribute('name')
      // If cant found then something horrible wrong happended
      let control = that.formState[name]

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
      if (  element.props.hasOwnProperty('onChange') && element.props.hasOwnProperty('value')) {
        const oldOnChange = element.props.onChange


        // TODO: how to interface with Control class
        // TODO: we need to modifiy the existing value of the named control
        // with the one that is cheked
        //if it's a radio input then value should be set for the checked input if not it should be ''
        //warn user when not all radio buttons with the same name have the same validationRules
        //let type = element.type
        //// TODO: test all this with minified builds of react-bootstrap
        //let isBootstrapRadio = false;
        //try {
          //if (type.name === 'Radio') {
            //isBootstrapRadio = true
          //}
        //} catch (e) {}

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

  // TODO use Control class
  validateForm() {
    return Object.keys(this.formState)
      .map(fieldName => this.formState[fieldName])
      .map(control => control.validate(this.formState))
      .every(isValid => isValid)
  }

  isValid() {
    return Object.keys(this.formState)
      .map(fieldName => this.formState[fieldName])
      .every(control => control.isValid())
  }

}
