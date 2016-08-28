jest.unmock('../Reform');
jest.unmock('../validators/min');
jest.unmock('../testTemplates');

//TODO

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
//import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Reform from '../Reform';
import { controlOnChangeTest, controlIntialStateTest } from '../testTemplates'
import * as min from '../validators/min'


const inputTypesAndValues = [
  ['range', 10, 'fail'],
  ['number', 10, 'fail'],
  ['date', '2016-08-28', 'fail'],
  ['month', '2016-08', 'fail'],
  ['week', '2016-W33', 'fail'],
  ['datetime-local', '2016-08-10T11:01', 'fail'],
  ['time', '20:03', 'fail'],
  ['time', '20:03:04', 'fail'],
]

const validatorKey = "min"
describe(validatorKey, () => {
  const validator = {[validatorKey]: 3}

  inputTypesAndValues
  .forEach(([inputType, successValue, failureValue]) => {
    describe(`<input type="${inputType}" ${validatorKey}=${validator[validatorKey]} />"`, () => {
      const successConfig = {type: 'input', inputType: inputType, validator, value: successValue, error: false}
      const failureConfig = {type: 'input', inputType: inputType, validator, value: failureValue, error: true}
      controlIntialStateTest(failureConfig)
      controlOnChangeTest(failureConfig)
      controlOnChangeTest(successConfig)
    });
  })
});
