import * as test from "tape";
import Context from "../Context";
import { renderFunction } from "../components";
import node from "./renderFunctionFixture";

test("renderFunction", function(t) {
  t.plan(1);

  const actual = renderFunction(node, new Context());
  const expected = [
    '## fieldIsValid <small>Function [src](./src/core.ts#L73)</small> <a id="#185"></a>',
    "",
    "",
    "",
    "<big><pre>",
    "fieldIsValid(value: string | number, rules: [Rules](#user-content-#9)): boolean",
    "</pre></big>",
    "",
    "",
    "",
    "",
    "<big><pre>",
    "fieldIsValid(fieldErrors: [FieldErrors](#user-content-#15)): boolean",
    "</pre></big>",
    "",
  ];

  t.deepEqual(actual, expected);
});
