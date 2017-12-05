import * as test from "tape";
import Context from "../Context";
import { renderFunction } from "../components";
import { CODE_TAGS_OPEN, CODE_TAGS_CLOSE } from "../constants";
import node from "./renderFunctionFixture";

test("renderFunction", function(t) {
  t.plan(1);

  const actual = renderFunction(node, new Context());
  const expected = [
    '## fieldIsValid <small>Function [src](./src/core.ts#L73)</small> <a id="#185"></a>',
    "",
    "",
    "",
    CODE_TAGS_OPEN,
    "fieldIsValid(value: string | number, rules: [Rules](#user-content-#9)): boolean",
    CODE_TAGS_CLOSE,
    "",
    "",
    "",
    "",
    CODE_TAGS_OPEN,
    "fieldIsValid(fieldErrors: [FieldErrors](#user-content-#15)): boolean",
    CODE_TAGS_CLOSE,
    "",
  ];

  t.deepEqual(actual, expected);
});
