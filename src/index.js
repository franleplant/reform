import Reform from './Reform';
import * as Validators from './validators.js';

export default Reform;
export { Validators };

/*
  form spec!
  https://www.w3.org/TR/html5/forms.html

  good docs
  https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
*/

// TODO: example: dusplicate password input equality check
// TODO: examples and checkboxes tests. Document the way to force something to be treated as a checkbox
// TODO: support for asyn validators extra error details (say connection error et al). Probably a simple meta
// field inside the control will suffice
// TODO: test with bootstrap and other third party components
// TODO: warnings all over the place
// TODO: warn if no form is in the children
// TODO: warn if no controls
// TODO: wanr if no submit handlers
// TODO: warn duplicated names (except for radios)
// TODO: logging generalization
// TODO: monkeypatch all submit mechanisms (contemplate bootstrap forms for example) (inputs, submits, buttons, images)
// TODO: optimize
