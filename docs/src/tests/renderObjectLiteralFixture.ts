import * as path from "path";

export function fakeAbsolutePath(fileUnderSrc: string): string {
  return path.resolve(__dirname, "../../../", fileUnderSrc);
}

export default {
  id: 252,
  name: "Reform",
  kind: 2097152,
  kindString: "Object literal",
  flags: {
    isExported: true,
  },
  comment: {},
  sources: [
    {
      fileName: "index.ts",
      line: 22,
      character: 12,
    },
  ],
  children: [
    {
      id: 254,
      name: "core",
      kind: 32,
      kindString: "Variable",
      flags: {
        isExported: true,
      },
      sources: [
        {
          fileName: "index.ts",
          line: 24,
          character: 6,
        },
      ],
      type: {
        type: "reference",
        name: `"${fakeAbsolutePath("src/core")}"`,
        id: 178,
      },
    },
    {
      id: 264,
      name: "reactHelpers",
      kind: 32,
      kindString: "Variable",
      flags: {
        isExported: true,
      },
      sources: [
        {
          fileName: "index.ts",
          line: 26,
          character: 14,
        },
      ],
      type: {
        type: "reference",
        name: `"${fakeAbsolutePath("src/reactHelpers")}"`,
        id: 201,
      },
    },
    {
      id: 265,
      name: "reactMixins",
      kind: 32,
      kindString: "Variable",
      flags: {
        isExported: true,
      },
      sources: [
        {
          fileName: "index.ts",
          line: 27,
          character: 13,
        },
      ],
      type: {
        type: "reference",
        name: `"${fakeAbsolutePath("src/reactMixins")}"`,
        id: 233,
      },
    },
    {
      id: 253,
      name: "types",
      kind: 32,
      kindString: "Variable",
      flags: {
        isExported: true,
      },
      sources: [
        {
          fileName: "index.ts",
          line: 23,
          character: 7,
        },
      ],
      type: {
        type: "reference",
        name: `"${fakeAbsolutePath("src/types")}"`,
        id: 1,
      },
    },
    {
      id: 255,
      name: "validators",
      kind: 32,
      kindString: "Variable",
      flags: {
        isExported: true,
      },
      sources: [
        {
          fileName: "index.ts",
          line: 25,
          character: 12,
        },
      ],
      type: {
        type: "reflection",
        declaration: {
          id: 256,
          name: "__type",
          kind: 65536,
          kindString: "Type literal",
          flags: {
            isExported: true,
          },
          children: [
            {
              id: 257,
              name: "get",
              kind: 64,
              kindString: "Function",
              flags: {
                isExported: true,
              },
              signatures: [
                {
                  id: 258,
                  name: "get",
                  kind: 4096,
                  kindString: "Call signature",
                  flags: {},
                  parameters: [
                    {
                      id: 259,
                      name: "key",
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
                    name: "Validator",
                    id: 2,
                  },
                },
              ],
              sources: [
                {
                  fileName: "validators.ts",
                  line: 19,
                  character: 5,
                },
              ],
            },
            {
              id: 260,
              name: "set",
              kind: 64,
              kindString: "Function",
              flags: {
                isExported: true,
              },
              signatures: [
                {
                  id: 261,
                  name: "set",
                  kind: 4096,
                  kindString: "Call signature",
                  flags: {},
                  parameters: [
                    {
                      id: 262,
                      name: "key",
                      kind: 32768,
                      kindString: "Parameter",
                      flags: {},
                      type: {
                        type: "intrinsic",
                        name: "string",
                      },
                    },
                    {
                      id: 263,
                      name: "value",
                      kind: 32768,
                      kindString: "Parameter",
                      flags: {},
                      type: {
                        type: "reference",
                        name: "Validator",
                        id: 2,
                      },
                    },
                  ],
                  type: {
                    type: "intrinsic",
                    name: "void",
                  },
                },
              ],
              sources: [
                {
                  fileName: "validators.ts",
                  line: 28,
                  character: 5,
                },
              ],
            },
          ],
          groups: [
            {
              title: "Functions",
              kind: 64,
              children: [257, 260],
            },
          ],
        },
      },
    },
  ],
  type: {
    type: "intrinsic",
    name: "object",
  },
};
