import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import Reform from '../main';
import { controlOnChangeTest, controlIntialStateTest, nextTick } from '../testTemplates'


const responseTime = 100;
const name1 = "test_control_1";
const existingName = 'Delfina'


const apiResponse = _ => new Promise(resolve => setTimeout(_ => resolve(), responseTime + 50))

// This test simulates a username select box, where we asynchronously check against a fake api
// that checks if the username already is in use


function checkIfNameExists(name) {
  return new Promise(resolve => {
    setTimeout(_ => resolve(name === existingName), responseTime)
  })
}

async function asyncValidator(control) {
  const name = control.value;
  const result = await checkIfNameExists(name);
  return result
}

function render() {
  const onChange = jest.fn();

  const wrapper = shallow(
    <Reform>
      <form onSubmit={function (){}}>
        <input
          type="text"
          name={name1}
          value=""
          onChange={onChange}
          required
          data-reform={{
            validationRules: {
              asyncValidator: asyncValidator
            }
          }}
        />
      </form>
    </Reform>
  );

  return [wrapper, onChange];
}

xdescribe('async validators', () => {
  describe('success', () => {
    const [wrapper, onChange] = render();
    wrapper.find('input').simulate('change', {target: { value: 'Maitena'}});

    it('should work with async validators!', async () => {
      await apiResponse();
      const [control] = onChange.mock.calls[0]
      expect(onChange).toBeCalled()
      expect(control.errors.asyncValidator).toBeDefined()
      expect(control.errors.asyncValidator).toBe(false)
      expect(control.errors.required).toBeDefined()
      expect(control.errors.required).toBe(false)
    })

  })

  describe('failure', () => {
    const [wrapper, onChange] = render();
    wrapper.find('input').simulate('change', {target: { value: existingName}});
    const promise = nextTick();

    it('should work with async validators!', async () => {
      await apiResponse();
      const [control] = onChange.mock.calls[0]
      expect(onChange).toBeCalled()
      expect(control.errors.asyncValidator).toBeDefined()
      expect(control.errors.asyncValidator).toBe(true)
      expect(control.errors.required).toBeDefined()
      expect(control.errors.required).toBe(false)
    })
  })
})
