import * as test from "tape";
import { renderNode } from "../components";
import Context from "../Context";
import node from "./renderTypeAliasFixture";

test("renderTypeAlias", function(t) {
  t.plan(1);

  const actual = renderNode(node, new Context());
  const expected = [
    '## MessageCreator <small>Type alias [src](./src/types.ts#L29)</small> <a id="#36"></a>',
    '',
    '<big><pre>',
    '{',
    '  (ruleArgument: any, ruleKey: string, fieldName: string): string',
    '}',
    '</big></pre>'
  ]


  t.deepEqual(actual, expected);
});
