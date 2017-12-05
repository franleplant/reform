import * as test from "tape";
import Context from "../Context";
import { renderInterface } from "../components";
import { INDENT_SYMBOL, CODE_TAGS_OPEN, CODE_TAGS_CLOSE } from "../constants";
import node from "./renderInterfaceFixture";
import node2 from "./renderInterfaceFixture2";

test("renderInterface", function(t) {
  t.plan(1);

  const actual = renderInterface(node, new Context());
  const expected = [
    '## FieldErrors <small>Interface [src](./src/types.ts#L17)</small> <a id="#15"></a>',
    "",
    CODE_TAGS_OPEN,
    "{",
    `${INDENT_SYMBOL}\\[ruleKey: string\\]: boolean`,
    "}",
    CODE_TAGS_CLOSE,
  ];

  t.deepEqual(actual, expected);
});

test("renderInterface2", function(t) {
  t.plan(1);

  const actual = renderInterface(node2, new Context());
  const expected = [
    '## ValidationAbleInstance <small>Interface [src](./src/types.ts#L35)</small> <a id="#24"></a>',
    "",
    CODE_TAGS_OPEN,
    "{",
    `${INDENT_SYMBOL}setState: any`,
    `${INDENT_SYMBOL}state:`,
    `${INDENT_SYMBOL}{`,
    `${INDENT_SYMBOL}${INDENT_SYMBOL}errors: [FormErrors](#user-content-#18)`,
    `${INDENT_SYMBOL}${INDENT_SYMBOL}fields: [Fields](#user-content-#21)`,
    `${INDENT_SYMBOL}${INDENT_SYMBOL}formIsDirty: boolean`,
    `${INDENT_SYMBOL}}`,
    `${INDENT_SYMBOL}validationMessages:`,
    `${INDENT_SYMBOL}{`,
    `${INDENT_SYMBOL}${
      INDENT_SYMBOL
    }\\[ruleKey: string\\]: [MessageCreator](#user-content-#36)`,
    `${INDENT_SYMBOL}}`,
    `${INDENT_SYMBOL}validationRules: [RulesMap](#user-content-#12)`,
    "}",
    CODE_TAGS_CLOSE,
  ];

  t.deepEqual(actual, expected);
});
