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
  const failureValue = ""
  const successValue = "ok"
  const type = params.type
  const validator = params.validator
  const inputType = params.inputType

  let props = Object.assign({ name: name, value: "", }, validator)

  if (type === 'input') {
    props.type = inputType
  }


  it('should add errors to onChange arguments: failure', () => {
    const onChange = sinon.spy();
    props.onChange = onChange;
    const wrapper = shallow(
      <Reform> <form> {React.createElement(type, props)} </form> </Reform>
    );

    wrapper.find(type).simulate('change', {target: {value: failureValue, getAttribute: _ => name}});

    expect(onChange.calledOnce).toBe(true);
    const [ event, errors ] = onChange.args[0]
    expect(errors.required).toBeDefined()
    expect(errors.required).toBe(true)

    expect(event).toBeDefined()
    expect(event.target).toBeDefined()
    expect(event.target.value).toBe(failureValue)
  });

  it('should add errors to onChange arguments: success', () => {
    const onChange = sinon.spy();
    props.onChange = onChange;
    const wrapper = shallow(
      <Reform> <form> {React.createElement(type, props)} </form> </Reform>
    );

    wrapper.find(type).simulate('change', {target: {value: successValue, getAttribute: _ => name}});

    expect(onChange.calledOnce).toBe(true);
    let [ event, errors ] = onChange.args[0]
    expect(errors.required).toBeDefined()
    expect(errors.required).toBe(false)

    expect(event).toBeDefined()
    expect(event.target).toBeDefined()
    expect(event.target.value).toBe(successValue)
  });
}

describe('required', () => {
  required.supportedInputTypes.forEach(inputType => {
    describe(`<input type="${inputType}" required />"`, () => {
      controlRequiredTest({type: 'input', inputType: inputType, validator: {required: true}})
    });
  })

  describe(`<textarea required />"`, () => {
    controlRequiredTest({type: 'textarea', validator: {required: true}})
  });

  // TODO
  describe(`<select required />"`, () => {
    controlRequiredTest({type: 'textarea', validator: {required: true}})
  });

});
