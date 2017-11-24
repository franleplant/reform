import * as test from "tape";
import Context from "../Context";
import { renderInterface } from "../components";
import node from "./renderInterfaceFixture";
import node2 from "./renderInterfaceFixture2";

test("renderInterface", function(t) {
  t.plan(1);

  const actual = renderInterface(node, new Context());
  const expected = [
    '## FieldErrors <small>Interface [src](./src/types.ts#L17)</small> <a id="#15"></a>',
    "",
    "<big><pre>",
    "{",
    "  \\[ruleKey: string\\]: boolean",
    "}",
    "</big></pre>",
  ];

  t.deepEqual(actual, expected);
});

test("renderInterface2", function(t) {
  t.plan(1);

  const actual = renderInterface(node2, new Context());
  const expected = [
    '## ValidationAbleInstance <small>Interface [src](./src/types.ts#L35)</small> <a id="#24"></a>',
    "",
    "<big><pre>",
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
    "</big></pre>",
  ];

  t.deepEqual(actual, expected);
});
