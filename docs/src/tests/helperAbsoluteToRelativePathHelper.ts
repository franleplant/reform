import * as test from "tape";
import { absoluteToRelativePathHelper } from "../helpers";

test("absoluteToRelativePathHelper", function(t) {
  t.plan(1);

  const input = "/Users/flp/code/reform/src/reactMixins";
  const actual = absoluteToRelativePathHelper(input);
  const expected = "./src/reactMixins";

  t.equal(actual, expected);
});
