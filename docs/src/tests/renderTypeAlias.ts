import * as test from "tape";
import { renderNode } from "../components";
import { CODE_TAGS_OPEN, CODE_TAGS_CLOSE } from '../constants'
import Context from "../Context";
import node from "./renderTypeAliasFixture";

test("renderTypeAlias", function(t) {
  t.plan(1);

  const actual = renderNode(node, new Context());
  const expected = [
    '## MessageCreator <small>Type alias [src](./src/types.ts#L29)</small> <a id="#36"></a>',
    "",
    CODE_TAGS_OPEN,
    "{",
    "  (ruleArgument: any, ruleKey: string, fieldName: string): string",
    "}",
    CODE_TAGS_CLOSE,
  ];

  t.deepEqual(actual, expected);
});
