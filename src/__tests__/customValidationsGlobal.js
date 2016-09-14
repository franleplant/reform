import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import Reform, { Validators } from '../main';
import { controlOnChangeTest, controlIntialStateTest, nextTick } from '../testTemplates'



Validators.addRule('myRule', control => control.value !== 'Delfina');

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
      wrapper.find('input').simulate('change', {target: { value: '', getAttribute: _ => name1}});
      const promise = nextTick();

      it('should call the original onChange handler', async () => {
        await promise;
        const [control] = onChange.mock.calls[0]
        expect(onChange).toBeCalled()
      })

      it('should set error={myRule: true}', async () => {
        await promise;
        const [control] = onChange.mock.calls[0]
        expect(control.errors.myRule).toBeDefined()
        expect(control.errors.myRule).toBe(true)
      })

      it('should set error={required: true}', async () => {
        await promise;
        const [control] = onChange.mock.calls[0]
        expect(control.errors.required).toBeDefined()
        expect(control.errors.required).toBe(true)
      })
    })

    describe('success', () => {
      const [wrapper, onChange] = render();
      wrapper.find('input').simulate('change', {target: { value: 'Delfina' }});
      const promise = nextTick();

      it('should call the original onChange handler', async () => {
        await promise;
        const [control] = onChange.mock.calls[0]
        expect(onChange).toBeCalled()
      })

      it('should set error={myRule: true}', async () => {
        await promise;
        const [control] = onChange.mock.calls[0]
        expect(control.errors.myRule).toBeDefined()
        expect(control.errors.myRule).toBe(false)
      })

      it('should set error={required: true}', async () => {
        await promise;
        const [control] = onChange.mock.calls[0]
        expect(control.errors.required).toBeDefined()
        expect(control.errors.required).toBe(false)
      })
    })
  })


  describe('test case 2: formState', () => {

    Validators.addRule('myComposedRule', (control, formState) => {
      return control.value !== formState[name2].value
    });

    function render() {
      const onChange = jest.fn();

      const wrapper = shallow(
        <Reform>
          <form onSubmit={function() {}}>
            <input
              id={name1}
              type="text"
              name={name1}
              value=""
              onChange={onChange}
              required
              data-reform={{
                validationRules: {
                  myComposedRule: true
                }
              }}
              />
            <input
              id={name2}
              type="text"
              name={name2}
              value="Delfina"
              onChange={onChange}
              />
          </form>
        </Reform>
      );

      return [wrapper, onChange];
    }

    describe('fail', () => {
      const [wrapper, onChange] = render();
      wrapper.find(`#${name1}`).simulate('change', {target: { value: ''}});
      const promise = nextTick();

      it('should call the original onChange handler', async () => {
        await promise;
        const [control] = onChange.mock.calls[0]
        expect(onChange).toBeCalled()
      })

      it('should set error={myComposedRule: true}', async () => {
        await promise;
        const [control] = onChange.mock.calls[0]
        expect(control.errors.myComposedRule).toBeDefined()
        expect(control.errors.myComposedRule).toBe(true)
      })

      it('should set error={required: true}', async () => {
        await promise;
        const [control] = onChange.mock.calls[0]
        expect(control.errors.required).toBeDefined()
        expect(control.errors.required).toBe(true)
      })
    })

    describe('success', () => {
      const [wrapper, onChange] = render();
      wrapper.find(`#${name1}`).simulate('change', {target: { value: 'Delfina' }});
      const promise = nextTick();

      it('should call the original onChange handler', async () => {
        await promise;
        const [control] = onChange.mock.calls[0]
        expect(onChange).toBeCalled()
      })

      it('should set error={myComposedRule: true}', async () => {
        await promise;
        const [control] = onChange.mock.calls[0]
        expect(control.errors.myComposedRule).toBeDefined()
        expect(control.errors.myComposedRule).toBe(false)
      })

      it('should set error={required: true}', async () => {
        await promise;
        const [control] = onChange.mock.calls[0]
        expect(control.errors.required).toBeDefined()
        expect(control.errors.required).toBe(false)
      })
    })
  })
})

