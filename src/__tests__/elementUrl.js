import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import Reform from '../index';
import { controlOnChangeTest, controlIntialStateTest } from '../testTemplates'


describe('url', () => {
  const validator = {url: true}
  const successConfig = {type: 'input', inputType: 'url', validator, value: "www.google.com", error: false}
  const failureConfig = {type: 'input', inputType: 'url', validator, value: "", error: false}
  describe(`<input type="url" />"`, () => {
    controlIntialStateTest(failureConfig)
    controlOnChangeTest(failureConfig)
    controlOnChangeTest(successConfig)
  });
});
