export default {
  id: 24,
  name: "ValidationAbleInstance",
  kind: 256,
  kindString: "Interface",
  flags: {
    isExported: true,
    isExternal: true,
  },
  children: [
    {
      id: 35,
      name: "setState",
      kind: 1024,
      kindString: "Property",
      flags: {
        isExported: true,
        isExternal: true,
      },
      sources: [
        {
          fileName: "types.ts",
          line: 47,
          character: 10,
        },
      ],
      type: {
        type: "intrinsic",
        name: "any",
      },
    },
    {
      id: 30,
      name: "state",
      kind: 1024,
      kindString: "Property",
      flags: {
        isExported: true,
        isExternal: true,
      },
      sources: [
        {
          fileName: "types.ts",
          line: 41,
          character: 7,
        },
      ],
      type: {
        type: "reflection",
        declaration: {
          id: 31,
          name: "__type",
          kind: 65536,
          kindString: "Type literal",
          flags: {},
          children: [
            {
              id: 33,
              name: "errors",
              kind: 32,
              kindString: "Variable",
              flags: {
                isExternal: true,
              },
              sources: [
                {
                  fileName: "types.ts",
                  line: 43,
                  character: 10,
                },
              ],
              type: {
                type: "reference",
                name: "FormErrors",
                id: 18,
              },
            },
            {
              id: 32,
              name: "fields",
              kind: 32,
              kindString: "Variable",
              flags: {
                isExternal: true,
              },
              sources: [
                {
                  fileName: "types.ts",
                  line: 42,
                  character: 10,
                },
              ],
              type: {
                type: "reference",
                name: "Fields",
                id: 21,
              },
            },
            {
              id: 34,
              name: "formIsDirty",
              kind: 32,
              kindString: "Variable",
              flags: {
                isExternal: true,
                isOptional: true,
              },
              sources: [
                {
                  fileName: "types.ts",
                  line: 44,
                  character: 15,
                },
              ],
              type: {
                type: "intrinsic",
                name: "boolean",
              },
            },
          ],
          groups: [
            {
              title: "Variables",
              kind: 32,
              children: [33, 32, 34],
            },
          ],
          sources: [
            {
              fileName: "types.ts",
              line: 41,
              character: 8,
            },
          ],
        },
      },
    },
    {
      id: 26,
      name: "validationMessages",
      kind: 1024,
      kindString: "Property",
      flags: {
        isExported: true,
        isExternal: true,
        isOptional: true,
      },
      sources: [
        {
          fileName: "types.ts",
          line: 37,
          character: 20,
        },
      ],
      type: {
        type: "reflection",
        declaration: {
          id: 27,
          name: "__type",
          kind: 65536,
          kindString: "Type literal",
          flags: {},
          indexSignature: [
            {
              id: 28,
              name: "__index",
              kind: 8192,
              kindString: "Index signature",
              flags: {},
              parameters: [
                {
                  id: 29,
                  name: "ruleKey",
                  kind: 32768,
                  kindString: "Parameter",
                  flags: {},
                  type: {
                    type: "intrinsic",
                    name: "string",
                  },
                },
              ],
              type: {
                type: "reference",
                name: "MessageCreator",
                id: 36,
              },
            },
          ],
          sources: [
            {
              fileName: "types.ts",
              line: 37,
              character: 22,
            },
          ],
        },
      },
    },
    {
      id: 25,
      name: "validationRules",
      kind: 1024,
      kindString: "Property",
      flags: {
        isExported: true,
        isExternal: true,
      },
      sources: [
        {
          fileName: "types.ts",
          line: 36,
          character: 17,
        },
      ],
      type: {
        type: "reference",
        name: "RulesMap",
        id: 12,
      },
    },
  ],
  groups: [
    {
      title: "Properties",
      kind: 1024,
      children: [35, 30, 26, 25],
    },
  ],
  sources: [
    {
      fileName: "types.ts",
      line: 35,
      character: 39,
    },
  ],
};
