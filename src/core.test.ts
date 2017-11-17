import * as core from "./core";

test("validateField", () => {
  expect(core.validateField("")).toEqual({});
  expect(core.validateField("", {})).toEqual({});
  expect(core.validateField("", { required: true })).toEqual({
    required: true,
  });
  expect(core.validateField("", { required: true, email: true })).toEqual({
    required: true,
    email: false,
  });
  expect(core.validateField("test", { required: true, email: true })).toEqual({
    required: false,
    email: true,
  });
  expect(
    core.validateField("a@b.com", { required: true, email: true })
  ).toEqual({ required: false, email: false });

  expect(
    core.validateField("custom", {
      required: true,
      customValidator: value => value !== "custom",
    })
  ).toEqual({ required: false, customValidator: false });

  expect(
    core.validateField("wrong", {
      required: true,
      customValidator: value => value !== "custom",
    })
  ).toEqual({ required: false, customValidator: true });

  expect(
    core.validateField("", {
      required: true,
      customValidator: value => value !== "custom",
    })
  ).toEqual({ required: true, customValidator: true });
});

test("fieldIsValid(value, rules)", () => {
  expect(core.fieldIsValid("", { email: true, required: true })).toBe(false);
  expect(core.fieldIsValid("a@b.com", { email: true, required: true })).toBe(
    true
  );
  expect(core.fieldIsValid("", {})).toBe(true);
  expect(core.fieldIsValid("")).toBe(true);
});

test("fieldIsValid(fieldErrors)", () => {
  expect(core.fieldIsValid({ email: true, required: true })).toBe(false);
  expect(core.fieldIsValid({ email: false, required: true })).toBe(false);
  expect(core.fieldIsValid({ email: true, required: false })).toBe(false);
  expect(core.fieldIsValid({ email: false, required: false })).toBe(true);

  expect(core.fieldIsValid({})).toBe(true);
  expect(core.fieldIsValid()).toBe(true);
});

test("validateForm", () => {
  expect(
    core.validateForm(
      { email: "", password: "" },
      {
        email: { email: true, required: true },
        password: { required: true, minLength: 6 },
      }
    )
  ).toEqual({
    email: { email: false, required: true },
    password: { required: true, minLength: false },
  });

  expect(
    core.validateForm(
      { email: "a@b.com", password: "" },
      {
        email: { email: true, required: true },
        password: { required: true, minLength: 6 },
      }
    )
  ).toEqual({
    email: { email: false, required: false },
    password: { required: true, minLength: false },
  });

  expect(
    core.validateForm(
      { email: "", password: "123456" },
      {
        email: { email: true, required: true },
        password: { required: true, minLength: 6 },
      }
    )
  ).toEqual({
    email: { email: false, required: true },
    password: { required: false, minLength: false },
  });

  expect(
    core.validateForm(
      { email: "", password: "123" },
      {
        email: { email: true, required: true },
        password: { required: true, minLength: 6 },
      }
    )
  ).toEqual({
    email: { email: false, required: true },
    password: { required: false, minLength: true },
  });

  expect(
    core.validateForm(
      { email: "a@b.com", password: "123456" },
      {
        email: { email: true, required: true },
        password: { required: true, minLength: 6 },
      }
    )
  ).toEqual({
    email: { email: false, required: false },
    password: { required: false, minLength: false },
  });
});

test("formIsValid(fieldsValues, rulesMap)", () => {
  expect(
    core.formIsValid(
      { email: "", password: "" },
      {
        email: { email: true, required: true },
        password: { required: true, minLength: 6 },
      }
    )
  ).toBe(false);

  expect(
    core.formIsValid(
      { email: "a@b.com", password: "" },
      {
        email: { email: true, required: true },
        password: { required: true, minLength: 6 },
      }
    )
  ).toBe(false);

  expect(
    core.formIsValid(
      { email: "", password: "123456" },
      {
        email: { email: true, required: true },
        password: { required: true, minLength: 6 },
      }
    )
  ).toBe(false);

  expect(
    core.formIsValid(
      { email: "", password: "123" },
      {
        email: { email: true, required: true },
        password: { required: true, minLength: 6 },
      }
    )
  ).toBe(false);

  expect(
    core.formIsValid(
      { email: "a@b.com", password: "123456" },
      {
        email: { email: true, required: true },
        password: { required: true, minLength: 6 },
      }
    )
  ).toBe(true);
});

test("formIsValid(formErrors)", () => {
  expect(
    core.formIsValid({
      email: { email: false, required: true },
      password: { required: true, minLength: false },
    })
  ).toBe(false);

  expect(
    core.formIsValid({
      email: { email: false, required: false },
      password: { required: true, minLength: false },
    })
  ).toBe(false);

  expect(
    core.formIsValid({
      email: { email: false, required: true },
      password: { required: false, minLength: false },
    })
  ).toBe(false);

  expect(
    core.formIsValid({
      email: { email: false, required: true },
      password: { required: false, minLength: true },
    })
  ).toBe(false);

  expect(
    core.formIsValid({
      email: { email: false, required: false },
      password: { required: false, minLength: false },
    })
  ).toBe(true);
});
