import * as test from "tape";
import { renderTitle } from "../helpers";
//import node from "./objectLiteralFixture";

const node = {
  id: 1,
  name: "myItem",
  kind: 0,
  kindString: "Variable",
  sources: [
    {
      fileName: "core.ts",
      line: 69,
      character: 28,
    },
  ],
};

test("renderTitlte", function(t) {
  t.plan(1);

  const actual = renderTitle(node);
  const expected =
    'myItem <small>Variable [src](./src/core.ts#L69)</small> <a id="#1"></a>';

  t.equal(actual, expected);
});
