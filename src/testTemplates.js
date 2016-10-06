import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import Reform from './index';


export const nextTick = delay => new Promise(resolve => setTimeout(_ => resolve(), delay));

export function spy() {
  function spyInstance() {
    spyInstance.args.push(arguments);
    spyInstance.calledOnce = true;
    spyInstance.calls += 1;
  }


  spyInstance.calledOnce = false;
  spyInstance.args = [];
  spyInstance.calls = 0;

  return spyInstance;
}

export function controlOnChangeTest(params) {
  const name = params.name || "testName"
  const type = params.type || "input"
  const validator = params.validator || {}
  const validatorKey = Object.keys(validator)[0]
  const inputType = params.inputType

  const initialValue = params.intialValue || ""
  const value = params.value || ""
  const error = params.error
  const onChange = jest.fn();


  let props = Object.assign({ name, onChange, value: initialValue}, validator)

  if (type === 'input') {
    props.type = inputType
  }

  const wrapper = shallow(
    <Reform> <form> {React.createElement(type, props)} </form> </Reform>
  );

  wrapper.find(type).simulate('change', {target: { value }, persist: function() {}});
  const [control, event] = onChange.mock.calls[0]


  it(`should call original onChange when 'change' event is triggered`,  () => {
    expect(onChange).toBeCalled();
  });

  it(`should pass a valid control as first argument of the original onChange`,  () => {
    expect(control).toBeDefined()
  });

  it(`control should have errors = { ${validatorKey}: ${error} } with value = ${value}`,  () => {
    expect(control.errors[validatorKey]).toBeDefined()
    expect(control.errors[validatorKey]).toBe(error)
  });

  it(`should keep the original event untouched `,  () => {
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
  const onChange = spy();


  let props = Object.assign({ name, onChange, value: initialValue}, validator)

  if (type === 'input') {
    props.type = inputType
  }

  const wrapper = shallow(
    <Reform> <form> {React.createElement(type, props)} </form> </Reform>
  );

  const reform = wrapper.instance();
  const promise = reform.validateForm();

  const control = reform.formState[name];

  it(`should set the correct value. control = { value: ${value} }`,  () => {
    expect(control.value).toBe(initialValue)
  });

  it(`should set the correct errors map.`,  () => {
    expect(control.errors).toBeDefined();
  });

  it(`should set the correct error. error = { ${validatorKey}: ${error} }. With value = ${value}`,  () => {
    expect(control.errors[validatorKey]).toBeDefined();
    expect(control.errors[validatorKey]).toBe(error);
  });
}
