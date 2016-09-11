import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import Reform from '../main';
import { controlOnChangeTest, controlIntialStateTest, spy } from '../testTemplates'


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




describe('reform submit mechanisms', () => {
  describe('<button>', () => {
    const onSubmit = jest.fn();

    const wrapper = shallow(
      <Reform>
        <form onSubmit={function() {}}>
          <input type="text" name={name1} required value="" onChange={function() {}} />
          <input type="email" name={name2} required value="" onChange={function() {}} />
          <button onClick={onSubmit}></button>
        </form>
      </Reform>
    );

    let errorMap;
    wrapper.find('button').simulate('click', {target: {}});
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
  });


  describe('<button type="submit">', () => {
    const onSubmit = jest.fn();

    const wrapper = shallow(
      <Reform>
        <form onSubmit={function() {}}>
          <input type="text" name={name1} required value="" onChange={function() {}} />
          <input type="email" name={name2} required value="" onChange={function() {}} />
          <button type="submit" onClick={onSubmit}></button>
        </form>
      </Reform>
    );

    let errorMap;
    wrapper.find('button').simulate('click', {target: {}});
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
  });

  describe('<input type="submit">', () => {
    const onSubmit = jest.fn();

    const wrapper = shallow(
      <Reform>
        <form onSubmit={function() {}}>
          <input type="text" name={name1} required value="" onChange={function() {}} />
          <input type="email" name={name2} required value="" onChange={function() {}} />
          <input type="submit" onClick={onSubmit}/>
        </form>
      </Reform>
    );

    let errorMap;
    wrapper.find('input[type="submit"]').simulate('click', {target: {}});
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
  });
})