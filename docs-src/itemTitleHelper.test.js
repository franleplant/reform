const test = require('tape');
const itemTitleHelper = require('./itemTitleHelper');

const src = {
  id: 1,
  name: 'myItem',
  kindString: 'Variable',
  sources: [{
      "fileName": "core.ts",
      "line": 69,
      "character": 28
  }],
}

test('itemTitleHelper', function (t) {
  t.plan(1);

  const result = itemTitleHelper(src);
  const expected = 'myItem <small>Variable [src](./src/core.ts#L69)</small> <a id="#1"></a>'

  t.equal(result, expected);
});
