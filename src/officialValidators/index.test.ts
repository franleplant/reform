import validators from '../validators';



describe('required', () => {
  const validator = validators.get('required')
  it(`should work!`, () => {
    expect(validator("")).toBe(true);
    expect(validator("hello")).toBe(false);
  });

});

describe('email', () => {
  const validator = validators.get('email');
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
  const validator = validators.get('url')
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
  const validator = validators.get('minLength')
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
  const validator = validators.get('maxLength')
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
  const validator = validators.get('pattern')
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
  const validator = validators.get('number')
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
  const validator = validators.get('range')
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
  const validator = validators.get('color')
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
  const validator = validators.get('date')
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
  const validator = validators.get('time')
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
  const validator = validators.get('month')
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
  const validator = validators.get('week')
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

describe('minNumber', () => {
  const validator = validators.get('minNumber')
  it(`should work!`, () => {
    expect(validator(1, 5)).toBe(true);
    expect(validator("1", "5")).toBe(true);
    expect(validator(5, 5)).toBe(false);
    expect(validator("5", "5")).toBe(false);
    expect(validator(6, 5)).toBe(false);
    expect(validator("6", "5")).toBe(false);
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
  it(`should not validate when value is malformed`, () => {
    expect(validator("malformed", 5)).toBe(false);
  });
  it(`should not validate when argument is malformed`, () => {
    expect(() => validator(1, "malformed")).toThrow();
  });
});

describe('maxNumber', () => {
  const validator = validators.get('maxNumber')
  it(`should work!`, () => {
    expect(validator(6, 5)).toBe(true);
    expect(validator("6", "5")).toBe(true);
    expect(validator(5, 5)).toBe(false);
    expect(validator("5", "5")).toBe(false);
    expect(validator(4, 5)).toBe(false);
    expect(validator("4", "5")).toBe(false);
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
  it(`should not validate when value is malformed`, () => {
    expect(validator("malformed", 5)).toBe(false);
  });
  it(`should not validate when argument is malformed`, () => {
    expect(() => validator(1, "malformed")).toThrow();
  });
});

describe('minDate', () => {
  const validator = validators.get('minDate')
  it(`should work!`, () => {
    expect(validator("2016-12-24", "2016-12-25")).toBe(true);
    expect(validator("2016-12-25", "2016-12-25")).toBe(false);
    expect(validator("2016-12-26", "2016-12-25")).toBe(false);
  });

  it(`should not validate when no value`, () => {
    expect(validator("", "2016-12-25")).toBe(false);
  });
  it(`should not validate when value is null`, () => {
    expect(validator(null, "2016-12-25")).toBe(false);
  });
  it(`should not validate when value is undefined`, () => {
    expect(validator(undefined, "2016-12-25")).toBe(false);
  });
  it(`should not validate when value is malformed`, () => {
    expect(validator("malformed", "2016-12-25")).toBe(false);
  });
  it(`should not validate when argument is malformed`, () => {
    expect(() => validator("2016-12-25", "malformed")).toThrow();
  });
});

describe('maxDate', () => {
  const validator = validators.get('maxDate')
  it(`should work!`, () => {
    expect(validator("2016-12-26", "2016-12-25")).toBe(true);
    expect(validator("2016-12-25", "2016-12-25")).toBe(false);
    expect(validator("2016-12-24", "2016-12-25")).toBe(false);
  });

  it(`should not validate when no value`, () => {
    expect(validator("", "2016-12-25")).toBe(false);
  });
  it(`should not validate when value is null`, () => {
    expect(validator(null, "2016-12-25")).toBe(false);
  });
  it(`should not validate when value is undefined`, () => {
    expect(validator(undefined, "2016-12-25")).toBe(false);
  });
  it(`should not validate when value is malformed`, () => {
    expect(validator("malformed", "2016-12-25")).toBe(false);
  });
  it(`should not validate when argument is malformed`, () => {
    expect(() => validator("2016-12-25", "malformed")).toThrow();
  });
});

describe('minMonth', () => {
  const validator = validators.get('minMonth')
  it(`should work!`, () => {
    expect(validator("2016-9", "2016-11")).toBe(true);
    expect(validator("2016-10", "2016-11")).toBe(true);
    expect(validator("2016-11", "2016-11")).toBe(false);
    expect(validator("2016-12", "2016-11")).toBe(false);
  });

  it(`should not validate when no value`, () => {
    expect(validator("", "2016-11")).toBe(false);
  });
  it(`should not validate when value is null`, () => {
    expect(validator(null, "2016-11")).toBe(false);
  });
  it(`should not validate when value is undefined`, () => {
    expect(validator(undefined, "2016-11")).toBe(false);
  });
  it(`should not validate when value is malformed`, () => {
    expect(validator("malformed", "2016-11")).toBe(false);
  });
  it(`should not validate when argument is malformed`, () => {
    expect(() => validator("2016-11", "malformed")).toThrow();
    expect(() => validator("2016-11", "2016-54")).toThrow();
  });
});

describe('maxMonth', () => {
  const validator = validators.get('maxMonth')
  it(`should work!`, () => {
    expect(validator("2016-12", "2016-11")).toBe(true);
    expect(validator("2016-11", "2016-11")).toBe(false);
    expect(validator("2016-10", "2016-11")).toBe(false);
  });

  it(`should not validate when no value`, () => {
    expect(validator("", "2016-11")).toBe(false);
  });
  it(`should not validate when value is null`, () => {
    expect(validator(null, "2016-11")).toBe(false);
  });
  it(`should not validate when value is undefined`, () => {
    expect(validator(undefined, "2016-11")).toBe(false);
  });
  it(`should not validate when value is malformed`, () => {
    expect(validator("malformed", "2016-11")).toBe(false);
  });
  it(`should not validate when argument is malformed`, () => {
    expect(() => validator("2016-11", "malformed")).toThrow();
    expect(() => validator("2016-11", "2016-54")).toThrow();
  });
});

describe('minTime', () => {
  const validator = validators.get('minTime')
  it(`should work!`, () => {
    expect(validator("17:45", "17:50")).toBe(true);
    expect(validator("17:50", "17:50")).toBe(false);
    expect(validator("17:55", "17:50")).toBe(false);
  });

  it(`should not validate when no value`, () => {
    expect(validator("", "17:50")).toBe(false);
  });
  it(`should not validate when value is null`, () => {
    expect(validator(null, "17:50")).toBe(false);
  });
  it(`should not validate when value is undefined`, () => {
    expect(validator(undefined, "17:50")).toBe(false);
  });
  it(`should not validate when value is malformed`, () => {
    expect(validator("malformed", "17:50")).toBe(false);
  });
  it(`should not validate when argument is malformed`, () => {
    expect(() => validator("17:50", "malformed")).toThrow();
    expect(() => validator("17:50", "45:89")).toThrow();
  });
});

describe('maxTime', () => {
  const validator = validators.get('maxTime')
  it(`should work!`, () => {
    expect(validator("17:55", "17:50")).toBe(true);
    expect(validator("17:50", "17:50")).toBe(false);
    expect(validator("17:45", "17:50")).toBe(false);
  });

  it(`should not validate when no value`, () => {
    expect(validator("", "17:50")).toBe(false);
  });
  it(`should not validate when value is null`, () => {
    expect(validator(null, "17:50")).toBe(false);
  });
  it(`should not validate when value is undefined`, () => {
    expect(validator(undefined, "17:50")).toBe(false);
  });
  it(`should not validate when value is malformed`, () => {
    expect(validator("malformed", "17:50")).toBe(false);
  });
  it(`should not validate when argument is malformed`, () => {
    expect(() => validator("17:50", "malformed")).toThrow();
    expect(() => validator("17:50", "45:89")).toThrow();
  });
});

describe('minWeek', () => {
  const validator = validators.get('minWeek')
  it(`should work!`, () => {
    expect(validator("2016-W32", "2016-W33")).toBe(true);
    expect(validator("2016-W33", "2016-W33")).toBe(false);
    expect(validator("2016-W34", "2016-W33")).toBe(false);
  });

  it(`should not validate when no value`, () => {
    expect(validator("", "2016-W33")).toBe(false);
  });
  it(`should not validate when value is null`, () => {
    expect(validator(null, "2016-W33")).toBe(false);
  });
  it(`should not validate when value is undefined`, () => {
    expect(validator(undefined, "2016-W33")).toBe(false);
  });
  it(`should not validate when value is malformed`, () => {
    expect(validator("malformed", "2016-W33")).toBe(false);
  });
  it(`should not validate when argument is malformed`, () => {
    expect(() => validator("2016-W33", "malformed")).toThrow();
    expect(() => validator("2016-W33", "2016-W99")).toThrow();
  });
});


describe('maxWeek', () => {
  const validator = validators.get('maxWeek')
  it(`should work!`, () => {
    expect(validator("2016-W34", "2016-W33")).toBe(true);
    expect(validator("2016-W33", "2016-W33")).toBe(false);
    expect(validator("2016-W32", "2016-W33")).toBe(false);
  });

  it(`should not validate when no value`, () => {
    expect(validator("", "2016-W33")).toBe(false);
  });
  it(`should not validate when value is null`, () => {
    expect(validator(null, "2016-W33")).toBe(false);
  });
  it(`should not validate when value is undefined`, () => {
    expect(validator(undefined, "2016-W33")).toBe(false);
  });
  it(`should not validate when value is malformed`, () => {
    expect(validator("malformed", "2016-W33")).toBe(false);
  });
  it(`should not validate when argument is malformed`, () => {
    expect(() => validator("2016-W33", "malformed")).toThrow();
    expect(() => validator("2016-W33", "2016-W99")).toThrow();
  });
});
