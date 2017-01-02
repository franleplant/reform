const test = require('tape');
const srcHelper = require('./srcHelper');

const sources = [
  {
    "fileName": "validators.ts",
    "line": 4,
    "character": 24
  }
];


test('srcHelper', function (t) {
  t.plan(1);

  const result = srcHelper(sources);
  const expected = './src/validators.ts#L4';

  t.equal(result, expected);
});
