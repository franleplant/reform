jest.unmock('../Reform');
jest.unmock('../testTemplates');


import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
//import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Reform from '../Reform';
import { controlOnChangeTest, controlIntialStateTest } from '../testTemplates'


describe('url', () => {
  const validator = {url: true}
  const successConfig = {type: 'input', inputType: 'url', validator, value: "www.google.com", error: false}
  const failureConfig = {type: 'input', inputType: 'url', validator, value: "", error: true}
  describe(`<input type="url" />"`, () => {
    controlIntialStateTest(failureConfig)
    controlOnChangeTest(failureConfig)
    controlOnChangeTest(successConfig)
  });
});
