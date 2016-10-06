import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import Reform from '../index';
import { controlOnChangeTest, controlIntialStateTest } from '../testTemplates'
import * as minLength from '../officialValidators/minLength'


describe('minLength', () => {
  const validator = {minLength: 3}
  minLength
  .supportedInputTypes
  .forEach(inputType => {
    describe(`<input type="${inputType}" minLength=3 />"`, () => {
      const successConfig = {type: 'input', inputType: inputType, validator, value: "okk", error: false}
      const failureConfig = {type: 'input', inputType: inputType, validator, value: "", error: true}
      controlIntialStateTest(failureConfig)
      controlOnChangeTest(failureConfig)
      controlOnChangeTest(successConfig)
    });
  })

  describe(`<textarea minLength=3 />"`, () => {
    const successConfig = {type: 'textarea', validator, value: "okk", error: false}
    const failureConfig = {type: 'textarea', validator, value: "", error: true}
    controlIntialStateTest(failureConfig)
    controlOnChangeTest(failureConfig)
    controlOnChangeTest(successConfig)
  });
});
