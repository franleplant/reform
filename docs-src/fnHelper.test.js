const test = require('tape');
const fnHelper = require('./fnHelper');

const src = {
  id: 1,
  name: "formIsValid",
  kindString: "Function",
  "signatures": [
    {
      "id": 2,
      "name": "formIsValid",
      "kindString": "Call signature",
      "comment": { "shortText": "comments" },
      "parameters": [
        {
          "id": 3,
          "name": "fieldsValues",
          "kindString": "Parameter",
          "type": {
            "type": "reference",
            "name": "Fields",
            "id": 21
          }
        },
      ],
      "type": {
        "type": "instrinct",
        "name": "boolean"
      }
    },
    {
      "id": 21,
      "name": "formIsValid",
      "kindString": "Call signature",
      "comment": { "shortText": "commentsr2" },
      "parameters": [
        {
          "id": 3,
          "name": "fieldsValues2",
          "kindString": "Parameter",
          "type": {
            "type": "reference",
            "name": "Fields",
            "id": 21
          }
        },
      ],
      "type": {
        "type": "instrinct",
        "name": "boolean"
      }
    }
  ],
  "sources": [{
      "fileName": "core.ts",
      "line": 119,
      "character": 27
  }]
}


test('fnHelper', function (t) {
  t.plan(1);

  const result = fnHelper(src);
  const expected = ([
    '## formIsValid <small>Function [src](./src/core.ts#L119)</small> <a id="#1"></a>',
    '',
    'comments',
    '',
    '<big><pre>',
    'formIsValid(fieldsValues: [Fields](#21)): boolean',
    '</pre></big>',
    '',
    '',
    'commentsr2',
    '',
    '<big><pre>',
    'formIsValid(fieldsValues2: [Fields](#21)): boolean',
    '</pre></big>',
    '',
  ].join('\n'));

  t.equal(result, expected);
});
