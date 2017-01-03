const test = require('tape');
const typeHelper = require('./typeHelper');

const type1 = {
  "type": "reference",
  "name": "Validator",
  "id": 2
}


// TODO add more test cases
test('typeHelper', function (t) {
  t.plan(1);

  const result = typeHelper(type1);
  const expected = "[Validator](#user-content-#2)"

  t.equal(result, expected);
});
