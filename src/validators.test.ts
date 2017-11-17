import validators from "./validators";

describe("validatorInterface", () => {
  describe("get", () => {
    it(`should get the validator if validator is found`, () => {
      expect(validators.get("required")).toBeTruthy();
    });

    it(`should throw if no validator was found`, () => {
      expect(() => validators.get("notFound")).toThrow();
    });
  });

  describe("set", () => {
    it(`should set the validator if validator is not already set`, () => {
      const validatorKey = "myCustomValidator";
      validators.set(validatorKey, _ => false);
      expect(validators.get(validatorKey)).toBeTruthy();
    });

    it(`should throw if validator is already set`, () => {
      expect(() => validators.set("required")).toThrow();
    });
  });
});
