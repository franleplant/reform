jest.unmock('../Reform');
jest.unmock('../validators/pattern');
jest.unmock('../testTemplates');


import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
//import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Reform from '../Reform';
import { controlOnChangeTest, controlIntialStateTest } from '../testTemplates'
import * as pattern from '../validators/pattern'


describe('pattern', () => {
  const validator = {pattern: "apple|banana"}
  pattern
  .supportedInputTypes
  .forEach(inputType => {
    describe(`<input type="${inputType}" pattern="apple|banana" />"`, () => {
      const successConfig = {type: 'input', inputType: inputType, validator, value: "banana", error: false}
      const failureConfig = {type: 'input', inputType: inputType, validator, value: "", error: true}
      controlIntialStateTest(failureConfig)
      controlOnChangeTest(successConfig)
      controlOnChangeTest(failureConfig)
    });
  })
});
