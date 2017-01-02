const test = require('tape');
const objectHelper = require('./objectHelper');

const src = {
  id: 1,
  name: "myObject",
  kindString: "Object literal",
  flags: {
    "isExported": true
  },
  "children": [
    {
        "id": 162,
        "name": "maxDate",
        "kind": 32,
        "kindString": "Variable",
        "flags": {
          "isExported": true
        },
        "sources": [
          {
            "fileName": "officialValidators/index.ts",
            "line": 41,
            "character": 9
          }
        ],
        "type": {
          "type": "reference",
          "name": "(Anonymous function)",
          "id": 91
        }
      },
      {
        "id": 162,
        "name": "minDate",
        "kind": 32,
        "kindString": "Variable",
        "flags": {
          "isExported": true
        },
        "sources": [
          {
            "fileName": "officialValidators/index.ts",
            "line": 41,
            "character": 9
          }
        ],
        "type": {
          "type": "reference",
          "name": "(Anonymous function)",
          "id": 91
        }
      }
  ],
  "groups": [
    {
      "title": "Functions",
      "kind": 64,
      "children": [
        171,
        174
      ]
    }
  ],
  "sources": [
    {
      "fileName": "validators.ts",
      "line": 4,
      "character": 24
    }
  ],
  "type": {
    "type": "instrinct",
    "name": "object"
  }
}


test('objectHelper', function (t) {
  t.plan(1);

  const result = objectHelper(src, false);
  const expected = ([
    '## myObject <small>Object literal [src](./src/validators.ts#L4)</small> <a id="#1"></a>',
    '',
    '<big><pre>',
    '{',
    'maxDate: Function',
    'minDate: Function',
    '}',
    '</big></pre>',
  ].join('\n'));

  t.equal(result, expected);
});
