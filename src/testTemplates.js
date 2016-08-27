import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Reform from './Reform';

export function controlOnChangeTest(params) {
  const name = params.name || "testName"
  const type = params.type || "input"
  const validator = params.validator || {}
  const validatorKey = Object.keys(validator)[0]
  const inputType = params.inputType

  const initialValue = params.intialValue || ""
  const value = params.value || ""
  const error = params.error
  const onChange = sinon.spy();


  let props = Object.assign({ name, onChange, value: initialValue}, validator)

  if (type === 'input') {
    props.type = inputType
  }


  it(`should add errors to onChange arguments with value = "${value}"`, () => {
    const wrapper = shallow(
      <Reform> <form> {React.createElement(type, props)} </form> </Reform>
    );

    wrapper.find(type).simulate('change', {target: {value: value, getAttribute: _ => name}});

    expect(onChange.calledOnce).toBe(true);
    const [ control, event ] = onChange.args[0]
    expect(control).toBeDefined()
    expect(control.errors).toBeDefined()
    expect(control.errors[validatorKey]).toBeDefined()
    expect(control.errors[validatorKey]).toBe(error)

    expect(event).toBeDefined()
    expect(event.target).toBeDefined()
    expect(event.target.value).toBe(value)
  });
}




export function controlIntialStateTest(params) {
  const name = params.name || "testName"
  const type = params.type || "input"
  const validator = params.validator || {}
  const validatorKey = Object.keys(validator)[0]
  const inputType = params.inputType
  const validity = params.validity || true

  const initialValue = params.intialValue || ""
  const value = params.value || ""
  const error = params.error
  const onChange = sinon.spy();


  let props = Object.assign({ name, onChange, value: initialValue}, validator)

  if (type === 'input') {
    props.type = inputType
  }


  it(`should set correct initial control state`, () => {
    const wrapper = shallow(
      <Reform> <form> {React.createElement(type, props)} </form> </Reform>
    );

    const reform = wrapper.instance();
    reform.validateForm();
    console.log(validatorKey, JSON.stringify(reform.formState, null, 2))

    const control = reform.formState[name];
    expect(control.value).toBe(initialValue)
    expect(control.errors).toBeDefined();
    expect(control.errors[validatorKey]).toBeDefined();
    expect(control.errors[validatorKey]).toBe(error);
  });
}
