const test = require('tape');
const interfaceHelper = require('./interfaceHelper');



test('interfaceHelper', function (t) {
  t.plan(1);

  const result = interfaceHelper(src);
  const expected = ([
    '## ValidationAbleInstance <small>Interface [src](./src/types.ts#L29)</small> <a id="#24"></a>',
    '',
    '<big><pre>',
    '{',
    'setState: any;',
    'state: {',
    '  errors: [FormErrors](#user-content-#18);',
    '  fields: [Fields](#user-content-#21);',
    '  formIsDirty: boolean',
    '};',
    'validationMessages: {',
    '  \\[ruleKey: string\\]: [MessageCreator](#user-content-#36)',
    '};',
    'validationRules: [RulesMap](#user-content-#12)',
    '}',
    '</big></pre>',
  ].join('\n'));

  t.equal(result, expected);
});

const src = {
  "id": 24,
  "name": "ValidationAbleInstance",
  "kind": 256,
  "kindString": "Interface",
  "flags": {
    "isExported": true
  },
  "children": [
    {
      "id": 35,
      "name": "setState",
      "kind": 1024,
      "kindString": "Property",
      "flags": {
        "isExported": true
      },
      "sources": [
        {
          "fileName": "types.ts",
          "line": 41,
          "character": 10
        }
      ],
      "type": {
        "type": "instrinct",
        "name": "any"
      }
    },
    {
      "id": 30,
      "name": "state",
      "kind": 1024,
      "kindString": "Property",
      "flags": {
        "isExported": true
      },
      "sources": [
        {
          "fileName": "types.ts",
          "line": 35,
          "character": 7
        }
      ],
      "type": {
        "type": "reflection",
        "declaration": {
          "id": 31,
          "name": "__type",
          "kind": 65536,
          "kindString": "Type literal",
          "flags": {},
          "children": [
            {
              "id": 33,
              "name": "errors",
              "kind": 32,
              "kindString": "Variable",
              "flags": {},
              "sources": [
                {
                  "fileName": "types.ts",
                  "line": 37,
                  "character": 10
                }
              ],
              "type": {
                "type": "reference",
                "name": "FormErrors",
                "id": 18
              }
            },
            {
              "id": 32,
              "name": "fields",
              "kind": 32,
              "kindString": "Variable",
              "flags": {},
              "sources": [
                {
                  "fileName": "types.ts",
                  "line": 36,
                  "character": 10
                }
              ],
              "type": {
                "type": "reference",
                "name": "Fields",
                "id": 21
              }
            },
            {
              "id": 34,
              "name": "formIsDirty",
              "kind": 32,
              "kindString": "Variable",
              "flags": {
                "isOptional": true
              },
              "sources": [
                {
                  "fileName": "types.ts",
                  "line": 38,
                  "character": 15
                }
              ],
              "type": {
                "type": "instrinct",
                "name": "boolean"
              }
            }
          ],
          "groups": [
            {
              "title": "Variables",
              "kind": 32,
              "children": [
                33,
                32,
                34
              ]
            }
          ],
          "sources": [
            {
              "fileName": "types.ts",
              "line": 35,
              "character": 8
            }
          ]
        }
      }
    },
    {
      "id": 26,
      "name": "validationMessages",
      "kind": 1024,
      "kindString": "Property",
      "flags": {
        "isExported": true,
        "isOptional": true
      },
      "sources": [
        {
          "fileName": "types.ts",
          "line": 31,
          "character": 20
        }
      ],
      "type": {
        "type": "reflection",
        "declaration": {
          "id": 27,
          "name": "__type",
          "kind": 65536,
          "kindString": "Type literal",
          "flags": {},
          "indexSignature": [
            {
              "id": 28,
              "name": "__index",
              "kind": 8192,
              "kindString": "Index signature",
              "flags": {},
              "parameters": [
                {
                  "id": 29,
                  "name": "ruleKey",
                  "kind": 32768,
                  "kindString": "Parameter",
                  "flags": {},
                  "type": {
                    "type": "instrinct",
                    "name": "string"
                  }
                }
              ],
              "type": {
                "type": "reference",
                "name": "MessageCreator",
                "id": 36
              }
            }
          ],
          "sources": [
            {
              "fileName": "types.ts",
              "line": 31,
              "character": 22
            }
          ]
        }
      }
    },
    {
      "id": 25,
      "name": "validationRules",
      "kind": 1024,
      "kindString": "Property",
      "flags": {
        "isExported": true
      },
      "sources": [
        {
          "fileName": "types.ts",
          "line": 30,
          "character": 17
        }
      ],
      "type": {
        "type": "reference",
        "name": "RulesMap",
        "id": 12
      }
    }
  ],
  "groups": [
    {
      "title": "Properties",
      "kind": 1024,
      "children": [
        35,
        30,
        26,
        25
      ]
    }
  ],
  "sources": [
    {
      "fileName": "types.ts",
      "line": 29,
      "character": 39
    }
  ]
}
