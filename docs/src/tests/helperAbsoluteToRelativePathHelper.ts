import * as test from "tape";
import { absoluteToRelativePathHelper } from "../helpers";
import { fakeAbsolutePath } from "./renderObjectLiteralFixture";

test("absoluteToRelativePathHelper", function(t) {
  t.plan(1);

  const input = fakeAbsolutePath("src/reactMixins");
  const actual = absoluteToRelativePathHelper(input);
  const expected = "./src/reactMixins";

  t.equal(actual, expected);
});
