import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import Reform from '../Reform';
import { controlOnChangeTest, controlIntialStateTest } from '../testTemplates'


describe('email', () => {
  const validator = {email: true}
  const successConfig = {type: 'input', inputType: 'email', validator, value: "a@ab.com", error: false}
  const failureConfig = {type: 'input', inputType: 'email', validator, value: "", error: true}
  describe(`<input type="email" />"`, () => {
    controlIntialStateTest(failureConfig)
    controlOnChangeTest(failureConfig)
    controlOnChangeTest(successConfig)
  });
});
