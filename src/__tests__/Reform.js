jest.unmock('../Reform');


import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
//import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Reform from '../Reform';

describe('required', () => {
  describe('<input type="text" required />"', () => {
    it('should add errors to onChange arguments: failure', () => {
      const onChange = sinon.spy();
      const wrapper = shallow(
        <Reform>
          <form>
            <input type="text" name="name" required value={""} onChange={onChange} />
          </form>
        </Reform>
      );

      wrapper.find('input').simulate('change', {target: {value: "", getAttribute: _ => "name"}});

      expect(onChange.calledOnce).toBe(true);
      const [ event, errors ] = onChange.args[0]
      expect(errors.required).toBeDefined()
      expect(errors.required).toBe(true)

      expect(event).toBeDefined()
      expect(event.target).toBeDefined()
      expect(event.target.value).toBe("")
    });

    it('should add errors to onChange arguments: success', () => {
      const onChange = sinon.spy();
      const wrapper = shallow(
        <Reform>
          <form>
            <input type="text" name="name" required value={""} onChange={onChange} />
          </form>
        </Reform>
      );

      wrapper.find('input').simulate('change', {target: {value: "ok", getAttribute: _ => "name"}});

      expect(onChange.calledOnce).toBe(true);
      let [ event, errors ] = onChange.args[0]
      expect(errors.required).toBeDefined()
      expect(errors.required).toBe(false)

      expect(event).toBeDefined()
      expect(event.target).toBeDefined()
      expect(event.target.value).toBe("ok")
    });
  });
});
