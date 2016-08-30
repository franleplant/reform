jest.unmock('../Reform');
jest.unmock('../testTemplates');


import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
//import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Reform from '../Reform';
import { controlOnChangeTest, controlIntialStateTest } from '../testTemplates'


const validatorKey = "date"
describe(validatorKey, () => {
  const validator = {[validatorKey]: true}
  const successConfig = {type: 'input', inputType: validatorKey, validator, value: "2016-08-05", error: false}
  const failureConfig = {type: 'input', inputType: validatorKey, validator, value: "fail", error: true}
  const initialConfig = {type: 'input', inputType: validatorKey, validator, value: "", error: true}
  describe(`<input type=${validatorKey} />"`, () => {
    controlIntialStateTest(initialConfig)
    controlOnChangeTest(failureConfig)
    controlOnChangeTest(successConfig)
  });
});
