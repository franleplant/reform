import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import Reform, { Validators } from '../index';
import { controlOnChangeTest, controlIntialStateTest } from '../testTemplates'



Validators.addRule('myRule', control => control.value !== control.params.word);

const name1 = "test_control_1";
const name2 = "test_control_2";

function render() {
  const onChange = jest.fn();

  const wrapper = shallow(
    <Reform>
      <form onSubmit={function() {}}>
        <input
          type="text"
          name={name1}
          value=""
          onChange={onChange}
          required
          data-reform={{
            params: {
              word: 'Delfina',
            },
            validationRules: {
              myRule: true
            }
          }}
          />
      </form>
    </Reform>
  );

  return [wrapper, onChange];
}

describe('Custom Validations: Globals', () => {
  describe('test case 1', () => {
    describe('fail', () => {
      const [wrapper, onChange] = render();
      wrapper.find('input').simulate('change', {target: { value: '' }});

      it('should call the original onChange handler', () => {
        const [control] = onChange.mock.calls[0]
        expect(onChange).toBeCalled()
      })

      it('should set error={myRule: true}', () => {
        const [control] = onChange.mock.calls[0]
        expect(control.errors.myRule).toBeDefined()
        expect(control.errors.myRule).toBe(true)
      })

      it('should set error={required: true}', () => {
        const [control] = onChange.mock.calls[0]
        expect(control.errors.required).toBeDefined()
        expect(control.errors.required).toBe(true)
      })
    })

    describe('success', () => {
      const [wrapper, onChange] = render();
      wrapper.find('input').simulate('change', {target: { value: 'Delfina' }});

      it('should call the original onChange handler', () => {
        const [control] = onChange.mock.calls[0]
        expect(onChange).toBeCalled()
      })

      it('should set error={myRule: true}', () => {
        const [control] = onChange.mock.calls[0]
        expect(control.errors.myRule).toBeDefined()
        expect(control.errors.myRule).toBe(false)
      })

      it('should set error={required: true}', () => {
        const [control] = onChange.mock.calls[0]
        expect(control.errors.required).toBeDefined()
        expect(control.errors.required).toBe(false)
      })
    })
  })
})

