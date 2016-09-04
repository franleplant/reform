jest.unmock('../Reform');
jest.unmock('../validators/max');
jest.unmock('../testTemplates');

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
//import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Reform from '../Reform';
import { controlOnChangeTest, controlIntialStateTest } from '../testTemplates'
import * as max from '../validators/max'


const inputTypesAndValues = [
  ['range', 5, 4, 6],
  ['range', 5, 4, 'fail'],

  ['number', 5, 4, 6],
  ['number', 5, 4, 'fail'],

  ['date', '2016-08-27', '2016-08-26', '2016-08-28'],
  ['date', '2016-08-27', '2016-08-26', 'fail'],

  ['month', '2016-08', '2016-07', '2016-09'],
  ['month', '2016-08', '2016-07', 'fail'],

  ['week', '2016-W33', '2016-W32', '2016-W34'],
  ['week', '2016-W33', '2016-W32', 'fail'],

  ['datetime-local', '2016-08-10T00:00', '2016-08-09T00:00', '2016-08-11T00:00'],
  ['datetime-local', '2016-08-10T00:00', '2016-08-09T00:00', 'fail'],

  ['time', '20:03', '20:02', '20:04'],
  ['time', '20:03', '20:02', 'fail'],

  ['time', '20:03:04', '20:03:03', '20:03:05'],
  ['time', '20:03:04', '20:03:03', 'fail'],
]

const validatorKey = "max"
describe(validatorKey, () => {

  inputTypesAndValues
  .forEach(([inputType, max, successValue, failureValue]) => {
    describe(`<input type="${inputType}" ${validatorKey}=${max} />"`, () => {
      const successConfig = {type: 'input', inputType: inputType, validator: {[validatorKey]: max}, value: successValue, error: false}
      const failureConfig = {type: 'input', inputType: inputType, validator: {[validatorKey]: max}, value: failureValue, error: true}

      // TODO: don't know why this doesn't work
      //const initialConfig = {type: 'input', inputType: inputType, validator: {[validatorKey]: max}, value: failureValue, error: false}
      //controlIntialStateTest(initialConfig)
      controlOnChangeTest(failureConfig)
      controlOnChangeTest(successConfig)
    });
  })
});
