import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import Reform from '../main';
import { controlOnChangeTest, controlIntialStateTest, nextTick } from '../testTemplates'


const name = "test_control_1";

function render() {
  const onChange = jest.fn();

  const wrapper = shallow(
    <Reform>
      <form onSubmit={function() {}}>
        <input
          type="text"
          name={name}
          value=""
          onChange={onChange}
          required
          data-reform={{
            getValue: value => value
          }}
          />
      </form>
    </Reform>
  );

  return [wrapper, onChange];
}

describe('Custom Get Value', () => {
  const value = 'im a value';

  const [wrapper, onChange] = render();
  wrapper.find('input').simulate('change', value);

  const promise = nextTick();

  it('should use the custom getValue to get the value from the onChange params', async () => {
    await promise;
    expect(onChange).toBeCalled();
    const [control] = onChange.mock.calls[0]
    expect(control.value).toBe(value)
  })
})
