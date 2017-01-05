import * as reactHelpers from './reactHelpers';

function createInstance() {
  const instance = {
    state: {
      fields: {
        email: '',
        password: '',
      },
      errors: {},
      formIsDirty: false,
    },

    validationRules: {
      email: {required: true, email: true},
      password: {required: true, minLength: 6},
    },

    validationMessages: {
      required: _ => `required failed`,
      email: _ => `email failed`,
      minLength: _ => `minLength failed`,
      default: _ => `validation failed`,
    }

    setState: function(callback) {
      this.newState = callback(this.state);
    }
  }

  return instance;
}

describe('validateField', () => {
  it(`should work when invalid`, () => {
    const instance = createInstance()
    const isValid = reactHelpers.validateField.call(instance, 'email', 'a')
    expect(isValid).toBe(false);
    expect(instance.newState.errors.email).toEqual({required: false, email: true});
    expect(instance.newState.formIsDirty).toEqual(true);
  })

  it(`should work when valid`, () => {
    const instance = createInstance()
    const isValid = reactHelpers.validateField.call(instance, 'email', 'a@b.com')
    expect(isValid).toBe(true);
    expect(instance.newState.errors.email).toEqual({required: false, email: false});
    expect(instance.newState.formIsDirty).toEqual(true);
  })

  it(`should throw error on __DEV__ (implicit) and malformed instnace`, () => {
    const instance = {}
    expect(() => reactHelpers.validateField.call(instance, 'email', 'a')).toThrow();
  })

  it(`should throw error on __DEV__ (implicit) and malformed instance (2)`, () => {
    const instance = { validationRules: {}}
    expect(() => reactHelpers.validateField.call(instance, 'email', 'a')).toThrow();
  })

  it(`should throw error on __DEV__ (implicit) and malformed instance (3)`, () => {
    const instance = { validationRules: {}, state: {}}
    expect(() => reactHelpers.validateField.call(instance, 'email', 'a')).toThrow();
  })

  it(`should throw error on __DEV__ (implicit) and malformed instance (3)`, () => {
    const instance = { validationRules: {}, state: { fields: {}}}
    expect(() => reactHelpers.validateField.call(instance, 'email', 'a')).toThrow();
  })

  it(`should throw error on __DEV__ (implicit) and field does not exist`, () => {
    const instance = createInstance()
    expect(() => reactHelpers.validateField.call(instance, 'doesnotexist', 'a')).toThrow();
  })
});



describe('validateFieldFromState', () => {
  it(`should work when invalid`, () => {
    const instance = createInstance()
    instance.state.fields.email = 'a';
    const isValid = reactHelpers.validateFieldFromState.call(instance, 'email')
    expect(isValid).toBe(false);
    expect(instance.newState.errors.email).toEqual({required: false, email: true});
    expect(instance.newState.formIsDirty).toEqual(true);
  })

  it(`should work when invalid`, () => {
    const instance = createInstance()
    instance.state.fields.email = 'a@b.com';
    const isValid = reactHelpers.validateFieldFromState.call(instance, 'email')
    expect(isValid).toBe(true);
    expect(instance.newState.errors.email).toEqual({required: false, email: false});
    expect(instance.newState.formIsDirty).toEqual(true);
  })

  it(`should throw error on __DEV__ (implicit) and malformed instnace`, () => {
    const instance = {}
    expect(() => reactHelpers.validateFieldFromState.call(instance, 'email')).toThrow();
  })

  it(`should throw error on __DEV__ (implicit) and field does not exist`, () => {
    const instance = createInstance()
    expect(() => reactHelpers.validateFieldFromState.call(instance, 'doesnotexist')).toThrow();
  })
});

describe('validateForm', () => {
  it(`should work when invalid`, () => {
    const instance = createInstance()
    const isValid = reactHelpers.validateForm.call(instance, {email: '', password: ''})
    expect(isValid).toBe(false);
    expect(instance.newState.errors).toEqual({email: {required: true, email: false}, password: {required: true, minLength: false}});
    expect(instance.newState.formIsDirty).toEqual(true);
  })

  it(`should work when valid`, () => {
    const instance = createInstance()
    const isValid = reactHelpers.validateForm.call(instance, {email: 'a@b.com', password: '1234567'})
    expect(isValid).toBe(true);
    expect(instance.newState.errors).toEqual({email: {required: false, email: false}, password: {required: false, minLength: false}});
    expect(instance.newState.formIsDirty).toEqual(true);
  })

  it(`should throw error on __DEV__ (implicit) and malformed instnace`, () => {
    const instance = {}
    expect(() => reactHelpers.validateForm.call(instance, {email: '', password: ''})).toThrow();
  })

});

describe('validateFormFromState', () => {
  it(`should work when invalid`, () => {
    const instance = createInstance()
    const isValid = reactHelpers.validateFormFromState.call(instance)
    expect(isValid).toBe(false);
    expect(instance.newState.errors).toEqual({email: {required: true, email: false}, password: {required: true, minLength: false}});
    expect(instance.newState.formIsDirty).toEqual(true);
  })

  it(`should work when invalid`, () => {
    const instance = createInstance()
    instance.state.fields = {email: 'a@b.com', password: '1234567'}
    const isValid = reactHelpers.validateFormFromState.call(instance)
    expect(isValid).toBe(true);
    expect(instance.newState.errors).toEqual({email: {required: false, email: false}, password: {required: false, minLength: false}});
    expect(instance.newState.formIsDirty).toEqual(true);
  })

  it(`should throw error on __DEV__ (implicit) and malformed instnace`, () => {
    const instance = {}
    expect(() => reactHelpers.validateFormFromState.call(instance)).toThrow();
  })
});




describe('fieldIsValid', () => {
  it(`should work when invalid`, () => {
    const instance = createInstance()
    instance.state.errors.email = {required: true, minLength: false}
    const isValid = reactHelpers.fieldIsValid.call(instance, 'email')
    expect(isValid).toBe(false);
  })

  it(`should work when valid`, () => {
    const instance = createInstance()
    instance.state.errors.email = {required: false, minLength: false}
    const isValid = reactHelpers.fieldIsValid.call(instance, 'email')
    expect(isValid).toBe(true);
  })

  it(`should throw error on __DEV__ (implicit) and malformed instance`, () => {
    const instance = {}
    expect(() => reactHelpers.fieldIsValid.call(instance, 'email')).toThrow();
  })

  it(`should throw error on __DEV__ (implicit) and field does not exist`, () => {
    const instance = createInstance()
    expect(() => reactHelpers.fieldIsValid.call(instance, 'doesnotexist', 'a')).toThrow();
  })
});



describe('formIsValid', () => {
  it(`should work when invalid`, () => {
    const instance = createInstance()
    const isValid = reactHelpers.formIsValid.call(instance)
    expect(isValid).toBe(false);
  })

  it(`should work when invalid`, () => {
    const instance = createInstance()
    instance.state.fields = {email: 'a@b.com', password: '1234567'}
    const isValid = reactHelpers.formIsValid.call(instance)
    expect(isValid).toBe(true);
  })

  it(`should throw error on __DEV__ (implicit) and malformed instnace`, () => {
    const instance = {}
    expect(() => reactHelpers.formIsValid.call(instance)).toThrow();
  })
});



describe('fieldIfError', () => {
  it(`should work positive case`, () => {
    const instance = createInstance()
    instance.state.errors.email = {required: true, email: false}
    const requiredInvalid = reactHelpers.fieldIfError.call(instance, 'email', 'required')
    expect(requiredInvalid).toBe(true);
  })

  it(`should work negative case`, () => {
    const instance = createInstance()
    instance.state.errors.email = {required: false, email: false}
    const requiredInvalid = reactHelpers.fieldIfError.call(instance, 'email', 'required')
    expect(requiredInvalid).toBe(false);
  })

  it(`should work empty errors`, () => {
    const instance = createInstance()
    instance.state.errors.email = {}
    const requiredInvalid = reactHelpers.fieldIfError.call(instance, 'email', 'required')
    expect(requiredInvalid).toBe(false);
  })

  it(`should throw error on __DEV__ (implicit) and malformed instance`, () => {
    const instance = {}
    expect(() => reactHelpers.fieldIfError.call(instance, 'email', 'required')).toThrow();
  })

  it(`should throw error on __DEV__ (implicit) and field does not exist`, () => {
    const instance = createInstance()
    expect(() => reactHelpers.fieldIfError.call(instance, 'doesnotexist', 'a')).toThrow();
  })
});

describe('fieldErrors', () => {
  it(`should work when all rules are invalid`, () => {
    const instance = createInstance()
    instance.state.errors.password = {required: true, minLength: true}
    const result = reactHelpers.fieldErrors.call(instance, 'password')
    expect(result).toEqual([['required', true], ['minLength', instance.validationRules.password.minLength]]);
  })

  it(`should work when some rules are invalid`, () => {
    const instance = createInstance()
    instance.state.errors.password = {required: false, minLength: true}
    const result = reactHelpers.fieldErrors.call(instance, 'password')
    expect(result).toEqual([['minLength', instance.validationRules.password.minLength]]);
  })

  it(`should work when none rules are invalid`, () => {
    const instance = createInstance()
    instance.state.errors.password = {required: false, minLength: false}
    const result = reactHelpers.fieldErrors.call(instance, 'password')
    expect(result).toEqual([]);
  })

  it(`should throw error on __DEV__ (implicit) and malformed instance`, () => {
    const instance = {}
    expect(() => reactHelpers.fieldErrors.call(instance, 'email')).toThrow();
  })

  it(`should throw error on __DEV__ (implicit) and field does not exist`, () => {
    const instance = createInstance()
    expect(() => reactHelpers.fieldErrors.call(instance, 'doesnotexist')).toThrow();
  })
});


describe('mapFieldErrors', () => {
  it(`should work when all rules are invalid`, () => {
    const instance = createInstance()
    instance.state.errors.password = {required: true, minLength: true}
    const result = reactHelpers.mapFieldErrors.call(instance, 'password')
    expect(result).toEqual([instance.validationMessages.required(), instance.validationMessages.minLength()]);
  })

  it(`should work when some rules are invalid`, () => {
    const instance = createInstance()
    instance.state.errors.password = {required: false, minLength: true}
    const result = reactHelpers.mapFieldErrors.call(instance, 'password')
    expect(result).toEqual([instance.validationMessages.minLength()]);
  })

  it(`should work when none rules are invalid`, () => {
    const instance = createInstance()
    instance.state.errors.password = {required: false, minLength: false}
    const result = reactHelpers.mapFieldErrors.call(instance, 'password')
    expect(result).toEqual([]);
  })

  it(`should throw error on __DEV__ (implicit) and malformed instance`, () => {
    const instance = {}
    expect(() => reactHelpers.mapFieldErrors.call(instance, 'email')).toThrow();
  })

  it(`should throw error on __DEV__ (implicit) and instance.validationMessages is undefined`, () => {
    const instance = createInstance();
    delete instance.validationMessages
    expect(() => reactHelpers.mapFieldErrors.call(instance, 'email')).toThrow();
  })

  it(`should throw error on __DEV__ (implicit) and instance.validationMessages.default is undefined`, () => {
    const instance = createInstance();
    delete instance.validationMessages.default
    expect(() => reactHelpers.mapFieldErrors.call(instance, 'email')).toThrow();
  })
});
