import validatorMap from './index';



describe('required', () => {
  const validator = validatorMap.required;
  it(`should work!`, () => {
    expect(validator("")).toBe(true);
    expect(validator("hello")).toBe(false);
  });

});

describe('email', () => {
  const validator = validatorMap.email;
  it(`should work!`, () => {
    expect(validator("hellow")).toBe(true);
    expect(validator("hello@gmail.com")).toBe(false);
  });

  it(`should not validate when no value`, () => {
    expect(validator("")).toBe(false);
  });
  it(`should not validate when value is null`, () => {
    expect(validator(null)).toBe(false);
  });
  it(`should not validate when value is undefined`, () => {
    expect(validator(undefined)).toBe(false);
  });
});

describe('url', () => {
  const validator = validatorMap.url;
  it(`should work!`, () => {
    expect(validator("hellow")).toBe(true);
    expect(validator("google")).toBe(true);

    expect(validator("google.com")).toBe(false);
    expect(validator("www.google.com")).toBe(false);
    expect(validator("http://www.google.com")).toBe(false);
    expect(validator("https://www.google.com")).toBe(false);
    expect(validator("https://www.google.com/hi?name=reform&version=5#")).toBe(false);
  });

  it(`should not validate when no value`, () => {
    expect(validator("")).toBe(false);
  });
  it(`should not validate when value is null`, () => {
    expect(validator(null)).toBe(false);
  });
  it(`should not validate when value is undefined`, () => {
    expect(validator(undefined)).toBe(false);
  });
});

describe('minLength', () => {
  const validator = validatorMap.minLength;
  it(`should work!`, () => {
    expect(validator("12", 5)).toBe(true);
    expect(validator("12345")).toBe(false);
  });

  it(`should not validate when no value`, () => {
    expect(validator("", 5)).toBe(false);
  });
  it(`should not validate when value is null`, () => {
    expect(validator(null, 5)).toBe(false);
  });
  it(`should not validate when value is undefined`, () => {
    expect(validator(undefined, 5)).toBe(false);
  });
});

describe('maxLength', () => {
  const validator = validatorMap.maxLength;
  it(`should work!`, () => {
    expect(validator("123456", 5)).toBe(true);
    expect(validator("12345")).toBe(false);
  });

  it(`should not validate when no value`, () => {
    expect(validator("", 5)).toBe(false);
  });
  it(`should not validate when value is null`, () => {
    expect(validator(null, 5)).toBe(false);
  });
  it(`should not validate when value is undefined`, () => {
    expect(validator(undefined, 5)).toBe(false);
  });
});

describe('pattern', () => {
  const validator = validatorMap.pattern;
  const re = /banana|apple/
  it(`should work!`, () => {
    expect(validator("nothing", re)).toBe(true);
    expect(validator("banana", re)).toBe(false);
    expect(validator("apple", re)).toBe(false);
  });

  it(`should not validate when no value`, () => {
    expect(validator("", re)).toBe(false);
  });
  it(`should not validate when value is null`, () => {
    expect(validator(null, re)).toBe(false);
  });
  it(`should not validate when value is undefined`, () => {
    expect(validator(undefined, re)).toBe(false);
  });
});

describe('number', () => {
  const validator = validatorMap.number;
  it(`should work!`, () => {
    expect(validator("not")).toBe(true);
    expect(validator("1")).toBe(false);
    expect(validator(1)).toBe(false);
  });

  it(`should not validate when no value`, () => {
    expect(validator("")).toBe(false);
  });
  it(`should not validate when value is null`, () => {
    expect(validator(null)).toBe(false);
  });
  it(`should not validate when value is undefined`, () => {
    expect(validator(undefined)).toBe(false);
  });
});

describe('range', () => {
  const validator = validatorMap.range;
  it(`should work!`, () => {
    expect(validator("not")).toBe(true);
    expect(validator("1")).toBe(false);
    expect(validator(1)).toBe(false);
  });

  it(`should not validate when no value`, () => {
    expect(validator("")).toBe(false);
  });
  it(`should not validate when value is null`, () => {
    expect(validator(null)).toBe(false);
  });
  it(`should not validate when value is undefined`, () => {
    expect(validator(undefined)).toBe(false);
  });
});

describe('color', () => {
  const validator = validatorMap.color;
  it(`should work!`, () => {
    expect(validator("not")).toBe(true);
    expect(validator("#GGGGGG")).toBe(true);
    expect(validator("#FFFFFF")).toBe(false);
    expect(validator("#FAB123")).toBe(false);
  });

  it(`should not validate when no value`, () => {
    expect(validator("")).toBe(false);
  });
  it(`should not validate when value is null`, () => {
    expect(validator(null)).toBe(false);
  });
  it(`should not validate when value is undefined`, () => {
    expect(validator(undefined)).toBe(false);
  });
});

describe('date', () => {
  const validator = validatorMap.date;
  it(`should work!`, () => {
    expect(validator("not")).toBe(true);
    expect(validator("2016-13-56")).toBe(true);
    expect(validator("1/12/2016")).toBe(false);
    expect(validator("2015/12/01")).toBe(false);
  });

  it(`should not validate when no value`, () => {
    expect(validator("")).toBe(false);
  });
  it(`should not validate when value is null`, () => {
    expect(validator(null)).toBe(false);
  });
  it(`should not validate when value is undefined`, () => {
    expect(validator(undefined)).toBe(false);
  });
});



describe('time', () => {
  const validator = validatorMap.time;
  it(`should work!`, () => {
    expect(validator("not")).toBe(true);
    expect(validator("42:99")).toBe(true);
    expect(validator("02:00")).toBe(false);
    expect(validator("22:34")).toBe(false);
  });

  it(`should not validate when no value`, () => {
    expect(validator("")).toBe(false);
  });
  it(`should not validate when value is null`, () => {
    expect(validator(null)).toBe(false);
  });
  it(`should not validate when value is undefined`, () => {
    expect(validator(undefined)).toBe(false);
  });
});

describe('month', () => {
  const validator = validatorMap.month;
  it(`should work!`, () => {
    expect(validator("not")).toBe(true);
    expect(validator("2016-53")).toBe(true);
    expect(validator("2016-0")).toBe(true);
    expect(validator("2016-1")).toBe(false);
    expect(validator("2016-01")).toBe(false);
    expect(validator("2016-6")).toBe(false);
    expect(validator("2016-12")).toBe(false);
  });

  it(`should not validate when no value`, () => {
    expect(validator("")).toBe(false);
  });
  it(`should not validate when value is null`, () => {
    expect(validator(null)).toBe(false);
  });
  it(`should not validate when value is undefined`, () => {
    expect(validator(undefined)).toBe(false);
  });
});

describe('week', () => {
  const validator = validatorMap.week;
  it(`should work!`, () => {
    expect(validator("not")).toBe(true);
    expect(validator("2016-W00")).toBe(true);
    expect(validator("2016-W68")).toBe(true);
    expect(validator("2016-W33")).toBe(false);
    expect(validator("2016-W01")).toBe(false);
  });

  it(`should calculate the correct number of weeks for the given year`, () => {
    expect(validator("2016-W52")).toBe(false);
    expect(validator("2016-W53")).toBe(true);

    expect(validator("2015-W53")).toBe(false);
    expect(validator("2015-W54")).toBe(true);
  });


  it(`should not validate when no value`, () => {
    expect(validator("")).toBe(false);
  });
  it(`should not validate when value is null`, () => {
    expect(validator(null)).toBe(false);
  });
  it(`should not validate when value is undefined`, () => {
    expect(validator(undefined)).toBe(false);
  });
});