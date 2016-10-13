import React from 'react'
import {validate, getConstraints} from './validators'



//TODO:
//- filter their attributes when sending down as props => NOTE: I think react is already doing this
export default function Reform(WrappedComponent) {
  return class Reform extends React.Component {

    static displayName = `Reform(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
    constructor(props) {
      super(props)

      this.state = {
        fields: {}
      }

      this.reform = this.reform.bind(this)
      this.reformHandleSubmit = this.reformHandleSubmit.bind(this)
    }

    /**
     * @param {required} field.name
     * @param {required} field.value
     * @param {optional} field.constraints
     * @param {optional} field.touched
     */
    fieldFactory(field) {
      const {ok, error} = validate(field.value, field.constraints)
      let onChange;
      if (this.state.fields[field.name]) {
        onChange = this.state.fields[field.name].onChange
      } else {
        onChange = this.handlerFactory(field.name)
      }
      const defaults = {
        onChange: onChange,
        "data-reform-field-name": field.name,
        name: name,
        error: error,
        valid: ok,
        touched: true
      }
      return Object.assign(defaults, field)
    }

    handlerFactory(field_name) {
      return (function handleChange(event) {
        const constraints = getConstraints(event.target)

        this.state.fields[field_name] = this.fieldFactory({
          name: field_name,
          value: event.target.value,
          constraints: constraints,
        })
        // may the force be with you
        this.forceUpdate()
      }).bind(this)
    }

    reformHandleSubmit(callback) {
      return (function reformHandleSubmitInner(event) {
        const form = event.target;
        let fields = {}

        const fieldElements = form.querySelectorAll('[data-reform-field-name]')
        const allValid =
          Array.from(fieldElements)
            .map(f => {
              const constraints = getConstraints(f)
              const field_name = f.attributes['data-reform-field-name'].value

              this.state.fields[field_name] = this.fieldFactory({
                name: field_name,
                value: f.value,
                constraints: constraints,
              })

              return this.state.fields[field_name].valid
            })
            .every(valid => valid)


        // Re render with the new errors
        this.forceUpdate()

        if (allValid) {
          callback.call(null, ...arguments)
        } else {
          //Is this right?
          event.preventDefault()
          return false
        }
      }).bind(this)

    }


    reform(field_name) {
      if (!this.state.fields[field_name]) {
        this.state.fields[field_name] = this.fieldFactory({
          name: field_name,
          value: '',
          touched: false,
        })
      }

      // - return props
      return this.state.fields[field_name]
    }

    render() {
      this.reform.handleSubmit = this.reformHandleSubmit

      const props = Object.assign({}, this.props, { reform: this.reform })
      this.originalInstance = React.createElement(WrappedComponent, props)
      return this.originalInstance
    }
  }
}
