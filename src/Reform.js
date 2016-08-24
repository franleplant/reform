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

/*
 form spec!
  https://www.w3.org/TR/html5/forms.html
*/

// TODO: input type is by default "text"
// TODO: work on the user side of the error state interface. Maybe use classes or
// objects to smooth the interface
// TODO: Control api: it should be a class for easy data + functionality api
// TODO: settle an interface for Submit and errorMap
// TODO:  ---- monkeypatch all submit mechanisms (contemplate bootstrap forms for example) ----
// TODO: more validators
// TODO: test with all form inputs
// good docs https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
// TODO: test with bootstrap and other third party components
// TODO: (probably the most difficult part) get all official HTML rules working
// TODO: custom validations? (inside the config object)
// TODO: warnings all over the place
// TODO: warn if no form is in the children
// TODO: warn if no controls
// TODO: wanr if no submit handlers
// TODO: warn about radio buttons with different validation rules
// TODO: warn duplicated names (except for radios)
// TODO: validation apis (adding, composing, et al)
// TODO: FormState api: think better about it
// TODO: a way to force CustomComponents to validate as a radio, or a specific input type
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

      if (Control.isInputType(control, 'checkbox')) {
        control.checked = e.target.checked
      }

      // Update error hash
      control = Control.validate(control)

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
      // TODO: maybe a better sanity check here. Try to be smart about missing onChanges
      // et al. Maby limit to check onChange and Value and just that and alert about name
      if (  element.props.hasOwnProperty('onChange') && element.props.hasOwnProperty('value')) {
        const name = element.props.name
        if (!name) {
          throw new Error(`All controlled inputs must have "name" props. In ${element}`)
        }
        const oldOnChange = element.props.onChange
        const config = element.props[REFORM_CONFIG_KEY] || {}

        let value = element.props.value
        let getValue = defaultGetValue;

        if (config.getValue) {
          getValue = config.getValue
        }


        // TODO: warn about repeated rules
        const validationRules = Object.assign(
          config.validationRules || {},
          Element.getValidationRules(element)
        );


        //if it's a radio input then value should be set for
        //the checked input if not it should be ''
        //TODO: validate this
        //TODO: this might be solve when we start to optimize the control
        //object creation
        if (element.props.type === 'radio') {
          value = element.props.checked ? value : ''
        }

        // TODO: Maybe switch to a class base thingy ???
        const control = {
          name: name,
          elementType: element.type,
          typeProp: element.props.type,
          errors: {},
          value: value,
          validationRules: validationRules,
          getValue: getValue,
          checked: element.props.checked,
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
