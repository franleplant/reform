import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import Reform from '../Reform';
import { controlOnChangeTest, controlIntialStateTest, spy } from '../testTemplates'


//describe('reform instance methods', () => {
//// TODO: we also need to test the form instances internally:
//// - render a form with some fields
//// - modify the instance formState diretctly (monkey-simulating change event on controls)
//// - assert the isValid and getErrorsMap work correctly
//// TODO: add more fields

  //const name = "test_control";
  //const wrapper = shallow(
    //<Reform>
      //<form onSubmit={function() {}}>
        //<input type="text" name="does not matter" required value="" onChange={function() {}} />
        //<button></button>
      //</form>
    //</Reform>
  //);

  //const reform = wrapper.instance();

  ////expect(reform.formState).toBeDefined();
  ////reform.formState[name1] = {
    ////value: "",
    ////getValue: function() {},
    ////errors: {},

  ////}

  //let errorMap;
  //let control1;
  //expect(reform.isValid()).toBe(false);
  //expect(reform.validateForm()).toBe(false);
  //expect(reform.isValid()).toBe(false);
  //errorMap = reform.getErrorMap();
  //expect(errorMap).toBeDefined();
  //expect(errorMap.required).toBeDefined();
  //expect(errorMap.required).toBe(?????);


  //expect(reform.formState[name]).toBeDefined();
  //control1 = reform.formState[name]
  //control1.value = "some valid value"
  //expect(reform.isValid()).toBe(false);
  //expect(reform.validateForm()).toBe(true);
  //expect(reform.isValid()).toBe(true);
  //errorMap = reform.getErrorMap();
  //expect(errorMap).toBeDefined();
  //expect(errorMap.required).toBeDefined();
  //expect(errorMap.required).toBe(false);

//});
//
// render a form with a control and a submit mechanism (test all submit mechanisms)
// submit with errors and assert errorMap is ok
// submit without errors and assert errorMap is ok
// submit first time and check the above
// submit after triggering some changes and check the above
//
const name1 = "test_control_1";
const name2 = "test_control_2";

function render() {
  const onSubmit = jest.fn();

  const wrapper = shallow(
    <Reform>
      <form onSubmit={onSubmit}>
        <input type="text" name={name1} required value="" onChange={function() {}} />
        <input type="email" name={name2} required value="" onChange={function() {}} />
        <button></button>
      </form>
    </Reform>
  );

  return [wrapper, onSubmit];
}
describe('reform onSubmit', () => {
  describe('empty form', () => {
    let errorMap;
    const [wrapper, onSubmit] = render();
    wrapper.find('form').simulate('submit', {target: {}});
    const [form] = onSubmit.mock.calls[0]
    errorMap = form.getErrorMap();

    it('should call the original onSubmit handler', () => {
      expect(onSubmit).toBeCalled()
    })


    it('should call the original onSubmit handler with a form object', () => {
      expect(form).toBeDefined();
    })

    it('should validate each control and maintain their state', () => {
      expect(errorMap[name1].required).toBe(true);
      expect(errorMap[name2].required).toBe(true);
      expect(errorMap[name2].email).toBe(true);
    });

    it('should be invalid when all the controls are invalid', () => {
      expect(form.isValid()).toBe(false);
    })
  })

  describe('mixed valid / invalid fields', () => {
    let errorMap;
    const [wrapper, onSubmit] = render();
    const reform = wrapper.instance();
    reform.formState[name1].value = "valid value";
    wrapper.find('form').simulate('submit', {target: {}});
    const [form] = onSubmit.mock.calls[0]
    errorMap = form.getErrorMap();

    it('should call the original onSubmit handler', () => {
      expect(onSubmit).toBeCalled()
    })


    it('should call the original onSubmit handler with a form object', () => {
      expect(form).toBeDefined();
    })

    it('should validate each control and maintain their state (1 valid control and 1 invalid)', () => {
      expect(errorMap[name1].required).toBe(false);
      expect(errorMap[name2].required).toBe(true);
      expect(errorMap[name2].email).toBe(true);
    })

    it('should be invalid when some controls are invalid', () => {
      expect(form.isValid()).toBe(false);
    })
  })

  describe('all valid fields', () => {
    let errorMap;
    const [wrapper, onSubmit] = render();
    const reform = wrapper.instance();
    reform.formState[name1].value = "valid value";
    reform.formState[name2].value = "hi@valid.com";

    wrapper.find('form').simulate('submit', {target: {}});
    const [form] = onSubmit.mock.calls[0]
    errorMap = form.getErrorMap();

    it('should call the original onSubmit handler', () => {
      expect(onSubmit).toBeCalled()
    })


    it('should call the original onSubmit handler with a form object', () => {
      expect(form).toBeDefined();
    })

    it('should validate each control and maintain their state (all valid)', () => {
      expect(errorMap[name1].required).toBe(false);
      expect(errorMap[name2].required).toBe(false);
      expect(errorMap[name2].email).toBe(false);
    })

    it('should be valid when ALL controls are valid', () => {
      expect(form.isValid()).toBe(true);
    })
  })
});
