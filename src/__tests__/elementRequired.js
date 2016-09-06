import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import Reform from '../Reform';
import { controlOnChangeTest, controlIntialStateTest, spy } from '../testTemplates'
import * as required from '../validators/required'



describe('required', () => {
   const validator =  {required: true}

  required
  .supportedInputTypes
  .filter(t => t !== 'radio')
  .filter(t => t !== 'checkbox')
  .filter(t => t !== 'date')
  .filter(t => t !== 'datetime-local')
  .filter(t => t !== 'time')
  .filter(t => t !== 'month')
  .filter(t => t !== 'week')
  .forEach(inputType => {
    describe(`<input type="${inputType}" required />"`, () => {
      const successConfig =  {type: 'input', inputType, validator, value: "ok", error: false}
      const failureConfig =  {type: 'input', inputType, validator, value: "", error: true}
      controlIntialStateTest(failureConfig)
      controlOnChangeTest(failureConfig)
      controlOnChangeTest(successConfig)
    });
  })

  describe(`<input type=date required />"`, () => {
      const successConfig =  {type: 'input', inputType: "date", validator, value: "2016-08-27", error: false}
      const failureConfig =  {type: 'input', inputType: "date", validator, value: "", error: true}
      controlIntialStateTest(failureConfig)
      controlOnChangeTest(failureConfig)
      controlOnChangeTest(successConfig)
  });

  describe(`<input type=datetime-local required />"`, () => {
      const successConfig =  {type: 'input', inputType: "datetime-local", validator, value: "2016-08-10T11:01", error: false}
      const failureConfig =  {type: 'input', inputType: "datetime-local", validator, value: "", error: true}
      controlIntialStateTest(failureConfig)
      controlOnChangeTest(failureConfig)
      controlOnChangeTest(successConfig)
  });

  describe(`<input type=month required />"`, () => {
      const successConfig =  {type: 'input', inputType: "month", validator, value: "2016-08", error: false}
      const failureConfig =  {type: 'input', inputType: "month", validator, value: "", error: true}
      controlIntialStateTest(failureConfig)
      controlOnChangeTest(failureConfig)
      controlOnChangeTest(successConfig)
  });

  describe(`<input type=week required />"`, () => {
      const successConfig =  {type: 'input', inputType: "week", validator, value: "2016-W33", error: false}
      const failureConfig =  {type: 'input', inputType: "week", validator, value: "", error: true}
      controlIntialStateTest(failureConfig)
      controlOnChangeTest(failureConfig)
      controlOnChangeTest(successConfig)
  });

  describe(`<input type=time required />"`, () => {
      const successConfig =  {type: 'input', inputType: "time", validator, value: "20:03", error: false}
      const failureConfig =  {type: 'input', inputType: "time", validator, value: "", error: true}
      controlIntialStateTest(failureConfig)
      controlOnChangeTest(failureConfig)
      controlOnChangeTest(successConfig)
  });

  describe(`<textarea required />"`, () => {
      const successConfig =  {type: 'textarea', validator, value: "ok", error: false}
      const failureConfig =  {type: 'textarea', validator, value: "", error: true}
      controlIntialStateTest(failureConfig)
      controlOnChangeTest(failureConfig)
      controlOnChangeTest(successConfig)
  });

  // TODO: make this reusable
  // TODO: test initial state
  describe(`<select required />"`, () => {
    const name = "test"
    const initialValue = ""
    const successValue = "pizza"
    const failureValue = ""

    it(`should add errors to onChange arguments with value = "${successValue}"`, () => {
      const onChange = spy();
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
      const onChange = spy();
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


  // TODO: test initial state
  describe(`<input type="checkbox" required />"`, () => {
    const name = "test"
    const initialValue = ""
    const value = "checkbox_a"

    it(`should add errors to onChange arguments with checked = true`, () => {
      const onChange = spy();
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
      const onChange = spy();
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
      const onChange = spy();
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

    it(`should initially set value='opt2' (edit mode)`, () => {
      const onChange = spy();
      const wrapper = shallow(
        <Reform>
          <form>
            <input type="radio" name={name} value="opt1" onChange={onChange} checked={false} required/>
            <input type="radio" name={name} value="opt2" onChange={onChange} checked={true} required/>
          </form>
        </Reform>
      );

      const reform = wrapper.instance();
      reform.validateForm();

      const control = reform.formState[name];
      expect(control.value).toBe('opt2')
      expect(control.errors).toBeDefined();
      expect(control.errors.required).toBeDefined();
      expect(control.errors.required).toBe(false);
    });

    it(`should add errors to onChange arguments with checked = true`, () => {
      const onChange = spy();
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
      const onChange = spy();
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
      const onChange = spy();
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
      const onChange = spy();
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
