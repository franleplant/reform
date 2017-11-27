import * as test from "tape";
import { renderObjectLiteral } from "../components";
import { CODE_TAGS_OPEN, CODE_TAGS_CLOSE } from '../constants'
import Context from "../Context";
import node from "./renderObjectLiteralFixture";

test("renderObjectLiteral", function(t) {
  t.plan(1);

  const actual = renderObjectLiteral(node, new Context());
  const expected = [
    '## Reform <small>Object literal [src](./src/index.ts#L22)</small> <a id="#252"></a>',
    "",
    CODE_TAGS_OPEN,
    "{",
    "  core: [./src/core](#user-content-#178)",
    "  reactHelpers: [./src/reactHelpers](#user-content-#201)",
    "  reactMixins: [./src/reactMixins](#user-content-#233)",
    "  types: [./src/types](#user-content-#1)",
    "  validators: [./src/validators](./src/validators)",
    "}",
    CODE_TAGS_CLOSE,
  ];

  t.deepEqual(actual, expected);
});
