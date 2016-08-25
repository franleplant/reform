jest.unmock('../Reform');
jest.unmock('../validators/required');
jest.unmock('../validators/minLength');


import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
//import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Reform from '../Reform';
import * as required from '../validators/required'
import * as minLength from '../validators/minLength'


function controlIntialStateTest(params) {
  const name = "testName"
  const initialValue = ""
  const type = params.type
  const inputType = params.inputType
  const validator = params.validator
  const validatorKey = Object.keys(validator)[0]
  const onChange = sinon.spy();

  let props = Object.assign({ name: name, value: initialValue, onChange: onChange}, validator)

  if (type === 'input') {
    props.type = inputType
  }

  it(`should set correct initial control state`, () => {
    const wrapper = shallow(
      <Reform> <form> {React.createElement(type, props)} </form> </Reform>
    );

    const reform = wrapper.instance();
    reform.validateForm();

    const control = reform.formState[name];
    expect(control.value).toBe(initialValue)
    expect(control.errors).toBeDefined();
    expect(control.errors[validatorKey]).toBeDefined();
    expect(control.errors[validatorKey]).toBe(true);
  });
}

function controlOnChangeTest(params) {
  const name = "testName"
  const type = params.type
  const validator = params.validator
  const validatorKey = Object.keys(validator)[0]
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
    expect(control.errors[validatorKey]).toBeDefined()
    expect(control.errors[validatorKey]).toBe(error)

    expect(event).toBeDefined()
    expect(event.target).toBeDefined()
    expect(event.target.value).toBe(value)
  });
}

describe('required', () => {
  required
  .supportedInputTypes
  .filter(t => t !== 'radio')
  .filter(t => t !== 'checkbox')
  .forEach(inputType => {
    describe(`<input type="${inputType}" required />"`, () => {
      controlIntialStateTest({type: 'input', inputType: inputType, validator: {required: true}, value: "ok", error: false})
      controlOnChangeTest({type: 'input', inputType: inputType, validator: {required: true}, value: "", error: true})
      controlOnChangeTest({type: 'input', inputType: inputType, validator: {required: true}, value: "ok", error: false})
    });
  })

  describe(`<textarea required />"`, () => {
    controlIntialStateTest({type: 'textarea', validator: {required: true}, value: "", error: true})
    controlOnChangeTest({type: 'textarea', validator: {required: true}, value: "", error: true})
    controlOnChangeTest({type: 'textarea', validator: {required: true}, value: "ok", error: false})
  });

  describe(`<select required />"`, () => {
    const name = "test"
    const initialValue = ""
    const successValue = "pizza"
    const failureValue = ""

    it(`should add errors to onChange arguments with value = "${successValue}"`, () => {
      const onChange = sinon.spy();
      const wrapper = shallow(
        <Reform>
          <form>
            <select name={name} required value={initialValue} onChange={onChange}>
              <option value="" disabled>Select food</option>
              <option value="hot dogs">Hot Dogs</option>
              <option value="pizza">Pizza</option>
              <option value="cake">Cake</option>
            </select>
          </form>
        </Reform>
      );

      wrapper.find('select').simulate('change', {target: {value: successValue, getAttribute: _ => name}});

      expect(onChange.calledOnce).toBe(true);
      const [ control, event ] = onChange.args[0]
      expect(control).toBeDefined()
      expect(control.errors).toBeDefined()
      expect(control.errors.required).toBeDefined()
      expect(control.errors.required).toBe(false)

      expect(event).toBeDefined()
      expect(event.target).toBeDefined()
      expect(event.target.value).toBe(successValue)
    });

    it(`should add errors to onChange arguments with value = "${failureValue}"`, () => {
      const onChange = sinon.spy();
      const wrapper = shallow(
        <Reform>
          <form>
            <select name={name} required value={initialValue} onChange={onChange}>
              <option value="" disabled>Select food</option>
              <option value="hot dogs">Hot Dogs</option>
              <option value="pizza">Pizza</option>
              <option value="cake">Cake</option>
            </select>
          </form>
        </Reform>
      );

      wrapper.find('select').simulate('change', {target: {value: failureValue, getAttribute: _ => name}});

      expect(onChange.calledOnce).toBe(true);
      const [ control, event ] = onChange.args[0]
      expect(control).toBeDefined()
      expect(control.errors).toBeDefined()
      expect(control.errors.required).toBeDefined()
      expect(control.errors.required).toBe(true)

      expect(event).toBeDefined()
      expect(event.target).toBeDefined()
      expect(event.target.value).toBe(failureValue)
    });
  });

  describe(`<input type="checkbox" required />"`, () => {
    const name = "test"
    const initialValue = ""
    const value = "checkbox_a"

    it(`should add errors to onChange arguments with checked = true`, () => {
      const onChange = sinon.spy();
      const wrapper = shallow(
        <Reform>
          <form>
            <input type="checkbox" name={name} value={value} onChange={onChange}  checked={initialValue} required/>
          </form>
        </Reform>
      );

      wrapper.find('input').simulate('change', {target: {value: value, checked: true, getAttribute: _ => name}});

      expect(onChange.calledOnce).toBe(true);
      const [ control, event ] = onChange.args[0]
      expect(control).toBeDefined()
      expect(control.errors).toBeDefined()
      expect(control.errors.required).toBeDefined()
      expect(control.errors.required).toBe(false)

      expect(event).toBeDefined()
      expect(event.target).toBeDefined()
      expect(event.target.value).toBe(value)
      expect(event.target.checked).toBe(true)
    });

    it(`should add errors to onChange arguments with checked = false`, () => {
      const onChange = sinon.spy();
      const wrapper = shallow(
        <Reform>
          <form>
            <input type="checkbox" name={name} value={value} onChange={onChange}  checked={initialValue} required/>
          </form>
        </Reform>
      );

      wrapper.find('input').simulate('change', {target: {value: value, checked: false, getAttribute: _ => name}});

      expect(onChange.calledOnce).toBe(true);
      const [ control, event ] = onChange.args[0]
      expect(control).toBeDefined()
      expect(control.errors).toBeDefined()
      expect(control.errors.required).toBeDefined()
      expect(control.errors.required).toBe(true)

      expect(event).toBeDefined()
      expect(event.target).toBeDefined()
      expect(event.target.value).toBe(value)
      expect(event.target.checked).toBe(false)
    });

  });



  describe(`<input type="radio" required />"`, () => {
    const name = "test"
    const initialValue = ""

    it(`should initially set value='' when no radio is checked`, () => {
      const onChange = sinon.spy();
      const wrapper = shallow(
        <Reform>
          <form>
            <input type="radio" name={name} value="opt1" onChange={onChange} checked={false} required/>
            <input type="radio" name={name} value="opt2" onChange={onChange} checked={false} required/>
          </form>
        </Reform>
      );

      const reform = wrapper.instance();
      reform.validateForm();

      const control = reform.formState[name];
      expect(control.value).toBe('')
      expect(control.errors).toBeDefined();
      expect(control.errors.required).toBeDefined();
      expect(control.errors.required).toBe(true);
    });

    it(`should add errors to onChange arguments with checked = true`, () => {
      const onChange = sinon.spy();
      const wrapper = shallow(
        <Reform>
          <form>
            <input type="radio" name={name} value="opt1" onChange={onChange} checked={false} required id="opt1"/>
            <input type="radio" name={name} value="opt2" onChange={onChange} checked={false} required/>
          </form>
        </Reform>
      );

      wrapper.find('#opt1').simulate('change', {target: {value: 'opt1', checked: true, getAttribute: _ => name}});

      expect(onChange.calledOnce).toBe(true);
      const [ control, event ] = onChange.args[0]
      expect(control).toBeDefined()
      expect(control.errors).toBeDefined()
      expect(control.errors.required).toBeDefined()
      expect(control.errors.required).toBe(false)

      expect(event).toBeDefined()
      expect(event.target).toBeDefined()
      expect(event.target.value).toBe('opt1')
      expect(event.target.checked).toBe(true)
    });

    // TODO: apprently this test does not make any sense
    xit(`should add errors to onChange arguments with checked = false`, () => {
      const onChange = sinon.spy();
      const wrapper = shallow(
        <Reform>
          <form>
            <input type="radio" name={name} value="opt1" onChange={onChange} checked={true} required id="opt1"/>
            <input type="radio" name={name} value="opt2" onChange={onChange} checked={false} required/>
          </form>
        </Reform>
      );

      wrapper.find('#opt1').simulate('change', {target: {value: 'opt1', checked: false, getAttribute: _ => name}});

      expect(onChange.calledOnce).toBe(true);
      const [ control, event ] = onChange.args[0]
      expect(control).toBeDefined()
      expect(control.errors).toBeDefined()
      expect(control.errors.required).toBeDefined()
      expect(control.errors.required).toBe(true)

      expect(event).toBeDefined()
      expect(event.target).toBeDefined()
      expect(event.target.value).toBe('opt1')
      expect(event.target.checked).toBe(false)
    });

  });

  // TODO: this isn't working, we might need to go Enzyme Full DOM rendering to do this
  xdescribe(`<Custom required />"`, () => {
    const name = "test"
    const initialValue = ""
    const successValue = "ok"
    const failureValue = ""

    const Custom = (props) => <input type="text" {...props} />

    it(`should add errors to onChange arguments with value = "${successValue}"`, () => {
      const onChange = sinon.spy();
      const wrapper = shallow(
        <Reform>
          <form>
            <Custom name={name} value={initialValue} onChange={onChange} required/>
          </form>
        </Reform>
      );

      wrapper.find('input').simulate('change', {target: {value: successValue, getAttribute: _ => name}});

      expect(onChange.calledOnce).toBe(true);
      const [ control, event ] = onChange.args[0]
      expect(control).toBeDefined()
      expect(control.errors).toBeDefined()
      expect(control.errors.required).toBeDefined()
      expect(control.errors.required).toBe(false)

      expect(event).toBeDefined()
      expect(event.target).toBeDefined()
      expect(event.target.value).toBe(sucessValue)
    });

    it(`should add errors to onChange arguments with value = "${failureValue}"`, () => {
      const onChange = sinon.spy();
      const wrapper = shallow(
        <Reform>
          <form>
            <Custom name={name} value={initialValue} onChange={onChange} required/>
          </form>
        </Reform>
      );

      wrapper.find('input').simulate('change', {target: {value: failureValue, getAttribute: _ => name}});

      expect(onChange.calledOnce).toBe(true);
      const [ control, event ] = onChange.args[0]
      expect(control).toBeDefined()
      expect(control.errors).toBeDefined()
      expect(control.errors.required).toBeDefined()
      expect(control.errors.required).toBe(true)

      expect(event).toBeDefined()
      expect(event.target).toBeDefined()
      expect(event.target.value).toBe(failureValue)
    });

  });
});

describe('email', () => {
  describe(`<input type="email" />"`, () => {
    controlIntialStateTest({type: 'input', inputType: 'email', validator: {email: true}, value: "a@ab.com", error: false})
    controlOnChangeTest({type: 'input', inputType: 'email', validator: {email: true}, value: "", error: true})
    controlOnChangeTest({type: 'input', inputType: 'email', validator: {email: true}, value: "a@ab.com", error: false})
  });
});

describe('minLength', () => {
  const validator = {minLength: 3}
  minLength
  .supportedInputTypes
  //.filter(t => t !== 'radio')
  //.filter(t => t !== 'checkbox')
  .forEach(inputType => {
    describe(`<input type="${inputType}" minLength=3 />"`, () => {
      controlIntialStateTest({type: 'input', inputType: inputType, validator , value: "okk", error: false})
      controlOnChangeTest({type: 'input', inputType: inputType, validator, value: "", error: true})
      controlOnChangeTest({type: 'input', inputType: inputType, validator, value: "okk", error: false})
    });
  })

  describe(`<textarea minLength=3 />"`, () => {
    controlIntialStateTest({type: 'textarea', validator, value: "okk", error: true})
    controlOnChangeTest({type: 'textarea', validator, value: "", error: true})
    controlOnChangeTest({type: 'textarea', validator, value: "okk", error: false})
  });
});