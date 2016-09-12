import Reform from './Reform';
import * as Validators from './validators.js';

export default Reform;
export { Validators };

/*

type GetValue = (event, control) => fieldValue

interface ReformConfig {
  validationRules: ValidationRules;
  getValue: GetValue;
  typeProp: string
}
*/

/*
  form spec!
  https://www.w3.org/TR/html5/forms.html

  good docs
  https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
*/

// TODO: work a bit more with checkboxes
// TODO: docs! and examples!
// TODO: async validators
// TODO: error view helpers
// TODO: test with bootstrap and other third party components
// TODO: test bootstrap integration
// TODO: warnings all over the place
// TODO: warn if no form is in the children
// TODO: warn if no controls
// TODO: wanr if no submit handlers
// TODO: warn duplicated names (except for radios)
// TODO: logging generalization
// TODO: monkeypatch all submit mechanisms (contemplate bootstrap forms for example) (inputs, submits, buttons, images)
// TODO: optimize
