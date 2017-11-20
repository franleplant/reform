import Reform from "./index";

test("Reform main entry point", () => {
  expect(Reform).toBeDefined();
  expect(Reform.core).toBeDefined();
  expect(Reform.reactHelpers).toBeDefined();
  expect(Reform.validators).toBeDefined();
});
