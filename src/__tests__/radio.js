import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import Reform from '../main';
import { controlOnChangeTest, controlIntialStateTest, spy } from '../testTemplates'


const name = "test_control_1";

function render() {
  const onChange = jest.fn();

  const wrapper = shallow(
    <Reform>
      <form onSubmit={function() {}}>
        <input type="radio" name={name} value="opt1" checked={false} onChange={onChange} required />
        <input type="radio" name={name} value="opt2" checked={false} onChange={onChange} required />
        <input type="radio" name={name} value="opt3" checked={false} onChange={onChange} required />
        <input type="radio" name={name} value="opt4" checked={false} onChange={onChange} required />
      </form>
    </Reform>
  );

  return [wrapper, onChange];
}

describe('radio', () => {
  describe('with initial value: "" ', () => {
    function render() {
      const onChange = jest.fn();

      const wrapper = shallow(
        <Reform>
          <form onSubmit={function() {}}>
            <input type="radio" name={name} value="opt1" checked={false} onChange={onChange} required />
            <input type="radio" name={name} value="opt2" checked={false} onChange={onChange} required />
            <input type="radio" name={name} value="opt3" checked={false} onChange={onChange} required />
            <input type="radio" name={name} value="opt4" checked={false} onChange={onChange} required />
          </form>
        </Reform>
      );

      return [wrapper, onChange];
    }

    const [wrapper, onChange] = render();
    const reform = wrapper.instance();

    it('should parse the correct value: ""', () => {
      expect(reform.formState[name].value).toBe("")
    })

    it('should set the correct value when clicking', () => {
      wrapper.find('input[value="opt3"]').simulate('change', { target: {value: 'opt3'}});
      expect(reform.formState[name].value).toBe("opt3")
    })
  });

  describe('with initial value: "opt3" (middle radio)', () => {
    function render() {
      const onChange = jest.fn();

      const wrapper = shallow(
        <Reform>
          <form onSubmit={function() {}}>
            <input type="radio" name={name} value="opt1" checked={false} onChange={onChange} required />
            <input type="radio" name={name} value="opt2" checked={false} onChange={onChange} required />
            <input type="radio" name={name} value="opt3" checked={true} onChange={onChange} required />
            <input type="radio" name={name} value="opt4" checked={false} onChange={onChange} required />
          </form>
        </Reform>
      );

      return [wrapper, onChange];
    }

    const [wrapper, onChange] = render();
    const reform = wrapper.instance();

    it('should parse the correct value: "opt3"', () => {
      expect(reform.formState[name].value).toBe("opt3")
    })

    it('should set the correct value when clicking', () => {
      wrapper.find('input[value="opt2"]').simulate('change', { target: {value: 'opt2'}});
      expect(reform.formState[name].value).toBe("opt2")
    })
  });

  describe('with initial value: "opt1" (first radio)', () => {
    function render() {
      const onChange = jest.fn();

      const wrapper = shallow(
        <Reform>
          <form onSubmit={function() {}}>
            <input type="radio" name={name} value="opt1" checked={true} onChange={onChange} required />
            <input type="radio" name={name} value="opt2" checked={false} onChange={onChange} required />
            <input type="radio" name={name} value="opt3" checked={false} onChange={onChange} required />
            <input type="radio" name={name} value="opt4" checked={false} onChange={onChange} required />
          </form>
        </Reform>
      );

      return [wrapper, onChange];
    }

    const [wrapper, onChange] = render();
    const reform = wrapper.instance();

    it('should parse the correct value: "opt1"', () => {
      expect(reform.formState[name].value).toBe("opt1")
    })
  });

  describe('with initial value: "opt4" (last radio)', () => {
    function render() {
      const onChange = jest.fn();

      const wrapper = shallow(
        <Reform>
          <form onSubmit={function() {}}>
            <input type="radio" name={name} value="opt1" checked={false} onChange={onChange} required />
            <input type="radio" name={name} value="opt2" checked={false} onChange={onChange} required />
            <input type="radio" name={name} value="opt3" checked={false} onChange={onChange} required />
            <input type="radio" name={name} value="opt4" checked={true} onChange={onChange} required />
          </form>
        </Reform>
      );

      return [wrapper, onChange];
    }

    const [wrapper, onChange] = render();
    const reform = wrapper.instance();

    it('should parse the correct value', () => {
      expect(reform.formState[name].value).toBe("opt4")
    })
  });

})
