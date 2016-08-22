jest.unmock('../Reform');
jest.unmock('../validators/required');


import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
//import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Reform from '../Reform';
import * as required from '../validators/required'


function controlRequiredTest(params) {
  const name = "testName"
  const type = params.type
  const validator = params.validator
  const inputType = params.inputType
  const initialValue = ""
  const value = params.value
  const error = params.error

  let props = Object.assign({ name: name, value: initialValue, }, validator)

  if (type === 'input') {
    props.type = inputType
  }


  it(`should add errors to onChange arguments with value = "${value}"`, () => {
    const onChange = sinon.spy();
    props.onChange = onChange;
    const wrapper = shallow(
      <Reform> <form> {React.createElement(type, props)} </form> </Reform>
    );

    wrapper.find(type).simulate('change', {target: {value: value, getAttribute: _ => name}});

    expect(onChange.calledOnce).toBe(true);
    const [ control, event ] = onChange.args[0]
    expect(control).toBeDefined()
    expect(control.errors).toBeDefined()
    expect(control.errors.required).toBeDefined()
    expect(control.errors.required).toBe(error)

    expect(event).toBeDefined()
    expect(event.target).toBeDefined()
    expect(event.target.value).toBe(value)
  });
}

describe('required', () => {
  required.supportedInputTypes.forEach(inputType => {
    describe(`<input type="${inputType}" required />"`, () => {
      controlRequiredTest({type: 'input', inputType: inputType, validator: {required: true}, value: "", error: true})
      controlRequiredTest({type: 'input', inputType: inputType, validator: {required: true}, value: "ok", error: false})
    });
  })

  describe(`<textarea required />"`, () => {
    controlRequiredTest({type: 'textarea', validator: {required: true}, value: "", error: true})
    controlRequiredTest({type: 'textarea', validator: {required: true}, value: "ok", error: false})
  });

  // TODO
  //describe(`<select required />"`, () => {
    //controlRequiredTest({type: 'textarea', validator: {required: true}})
  //});

});
