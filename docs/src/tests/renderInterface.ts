import * as test from "tape";
import Context from "../Context";
import { renderInterface } from "../components";
import { CODE_TAGS_OPEN, CODE_TAGS_CLOSE } from "../constants";
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
    "  \\[ruleKey: string\\]: boolean",
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
    "  setState: any",
    "  state:",
    "  {",
    "    errors: [FormErrors](#user-content-#18)",
    "    fields: [Fields](#user-content-#21)",
    "    formIsDirty: boolean",
    "  }",
    "  validationMessages:",
    "  {",
    "    \\[ruleKey: string\\]: [MessageCreator](#user-content-#36)",
    "  }",
    "  validationRules: [RulesMap](#user-content-#12)",
    "}",
    CODE_TAGS_CLOSE,
  ];

  t.deepEqual(actual, expected);
});
