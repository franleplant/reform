import * as test from "tape";
import { renderObjectLiteral } from "../components";
import { INDENT_SYMBOL, CODE_TAGS_OPEN, CODE_TAGS_CLOSE } from "../constants";
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
    `${INDENT_SYMBOL}core: [./src/core](#user-content-#178)`,
    `${INDENT_SYMBOL}reactHelpers: [./src/reactHelpers](#user-content-#201)`,
    `${INDENT_SYMBOL}reactMixins: [./src/reactMixins](#user-content-#233)`,
    `${INDENT_SYMBOL}types: [./src/types](#user-content-#1)`,
    `${INDENT_SYMBOL}validators: [./src/validators](./src/validators)`,
    "}",
    CODE_TAGS_CLOSE,
  ];

  t.deepEqual(actual, expected);
});
