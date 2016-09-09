import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import Reform from '../main';
import { controlOnChangeTest, controlIntialStateTest } from '../testTemplates'
import * as min from '../officialValidators/min'


const inputTypesAndValues = [
  ['range', 5, 6, 4],
  ['range', 5, 6, 'fail'],
  ['number', 5, 6, 4],
  ['number', 5, 6, 'fail'],
  ['date', '2016-08-27', '2016-08-28', '2016-08-26'],
  ['date', '2016-08-27', '2016-08-28', 'fail'],
  ['month', '2016-08', '2016-09', '2016-07'],
  ['month', '2016-08', '2016-09', 'fail'],
  ['week', '2016-W33', '2016-W34', '2016-W32'],
  ['week', '2016-W33', '2016-W34', 'fail'],
  ['datetime-local', '2016-08-10T00:00', '2016-08-11T00:00', '2016-08-09T00:00'],
  ['datetime-local', '2016-08-10T00:00', '2016-08-11T00:00', 'fail'],
  ['time', '20:03', '20:04', '20:02'],
  ['time', '20:03', '20:04', 'fail'],
  ['time', '20:03:04', '20:03:05', '20:03:03'],
  ['time', '20:03:04', '20:03:05', 'fail'],
]

const validatorKey = "min"
describe(validatorKey, () => {

  inputTypesAndValues
  .forEach(([inputType, min, successValue, failureValue]) => {
    describe(`<input type="${inputType}" ${validatorKey}=${min} />" with failureValue = ${failureValue}}`, () => {
      const successConfig = {type: 'input', inputType: inputType, validator: {[validatorKey]: min}, value: successValue, error: false}
      const failureConfig = {type: 'input', inputType: inputType, validator: {[validatorKey]: min}, value: failureValue, error: true}
      controlIntialStateTest(failureConfig)
      controlOnChangeTest(failureConfig)
      controlOnChangeTest(successConfig)
    });
  })
});
