import * as test from "tape";
import { renderType } from "../components";
import Context from "../Context";
import node from "./renderTypeFixture";
import typeNode from "./renderTypeFixture2";

test("renderType", function(t) {
  t.plan(1);

  const actual = renderType(node.type, new Context());
  const expected = ["Array\\<[string, any]\\>"];

  t.deepEqual(actual, expected);
});

test("renderType2", function(t) {
  t.plan(1);

  const actual = renderType(typeNode, new Context());
  const expected = ["Array\\<number\\>"];

  t.deepEqual(actual, expected);
});
