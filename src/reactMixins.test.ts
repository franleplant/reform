import * as reactMixins from "./reactMixins";

function createInstance() {
  const instance: any = {
    state: {
      fields: {
        email: "",
        password: "",
      },
      errors: {},
      formIsDirty: false,
    },

    validationRules: {
      email: { required: true, email: true },
      password: { required: true, minLength: 6 },
    },

    validationMessages: {
      required: () => `required failed`,
      email: () => `email failed`,
      minLength: () => `minLength failed`,
      default: () => `validation failed`,
    },

    setState: function(callback: any) {
      this.newState = callback(this.state);
    },
  };

  return instance;
}

describe("objectMixin", () => {
  it(`should work when invalid`, () => {
    const instance = createInstance();
    instance.re = reactMixins.objectMixin(instance);
    const isValid = instance.re.validateField("email", "a");
    expect(isValid).toBe(false);
    expect(instance.newState.errors.email).toEqual({
      required: false,
      email: true,
    });
    expect(instance.newState.formIsDirty).toEqual(true);
  });
});

describe("functionalMixin", () => {
  it(`should work when invalid`, () => {
    const instance = createInstance();
    reactMixins.functionalMixin(instance);
    const isValid = instance.validateField("email", "a");
    expect(isValid).toBe(false);
    expect(instance.newState.errors.email).toEqual({
      required: false,
      email: true,
    });
    expect(instance.newState.formIsDirty).toEqual(true);
  });
});
