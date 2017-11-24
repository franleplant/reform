export default {
  id: 185,
  name: "fieldIsValid",
  kind: 64,
  kindString: "Function",
  flags: {
    isExported: true,
    isExternal: true,
  },
  signatures: [
    {
      id: 186,
      name: "fieldIsValid",
      kind: 4096,
      kindString: "Call signature",
      flags: {},
      comment: {},
      parameters: [
        {
          id: 187,
          name: "value",
          kind: 32768,
          kindString: "Parameter",
          flags: {},
          type: {
            type: "union",
            types: [
              {
                type: "intrinsic",
                name: "string",
              },
              {
                type: "intrinsic",
                name: "number",
              },
            ],
          },
        },
        {
          id: 188,
          name: "rules",
          kind: 32768,
          kindString: "Parameter",
          flags: {},
          type: {
            type: "reference",
            name: "Rules",
            id: 9,
          },
        },
      ],
      type: {
        type: "intrinsic",
        name: "boolean",
      },
    },
    {
      id: 189,
      name: "fieldIsValid",
      kind: 4096,
      kindString: "Call signature",
      flags: {},
      parameters: [
        {
          id: 190,
          name: "fieldErrors",
          kind: 32768,
          kindString: "Parameter",
          flags: {},
          type: {
            type: "reference",
            name: "FieldErrors",
            id: 15,
          },
        },
      ],
      type: {
        type: "intrinsic",
        name: "boolean",
      },
    },
  ],
  sources: [
    {
      fileName: "core.ts",
      line: 73,
      character: 28,
    },
    {
      fileName: "core.ts",
      line: 74,
      character: 28,
    },
    {
      fileName: "core.ts",
      line: 75,
      character: 28,
    },
  ],
};
