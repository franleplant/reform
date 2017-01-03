module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const types = __webpack_require__(1);
	exports.types = types;
	const core = __webpack_require__(2);
	exports.core = core;
	const validators_1 = __webpack_require__(3);
	exports.validators = validators_1.default;
	const reactHelpers = __webpack_require__(20);
	exports.reactHelpers = reactHelpers;
	const reactMixins = __webpack_require__(21);
	exports.reactMixins = reactMixins;
	/**
	 *  `default` export for the entire library.
	 *
	 *  ```javascript
	 *  // using the default export
	 *  import Reform from '@franleplant/reform'
	 *
	 *  // importing only the needed parts
	 *  import { reactMixins } from '@franleplant/reform'
	 *
	 *  ```
	 *
	 */
	const Reform = {
	    types,
	    core,
	    validators: validators_1.default,
	    reactHelpers,
	    reactMixins,
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Reform;


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const validators_1 = __webpack_require__(3);
	/**
	 *  @hidden
	 */
	const EMPTY_OBJECT = Object.freeze({});
	/**
	 * Validate `value` against `rules` and return which rules are valid with a value `false`
	 * and which rules ar invalid with a value of `true`.
	 *
	 * One of the central functions in `Reform.core`.
	 * Accepts inline, ad-hoc, validators as well as available ones (`required`, `pattern`, etc).
	 *
	 * Example
	 *
	 * ```javascript
	 * // a required empty value should be invalid.
	 * const fieldErrors = validateField('', {required: true});
	 * assert(fieldErrors, {required: true});
	 *
	 * // an invalid email value
	 * const fieldErrors = validateField('not an email', {email: true});
	 * assert(fieldErrors, {email: true});
	 * // a valid email value
	 * const fieldErrors = validateField('email@domain.com', {email: true});
	 * assert(fieldErrors, {email: false});
	 *
	 * // And of course you can combine them
	 * const fieldErrors = validateField('email@domain.com', {required: true, email: true});
	 * assert(fieldErrors, {required: false, email: false});
	 * ```
	 *
	 * The most important part is that the result of this function, which is of the type `FieldErrors`
	 * will be an object that has rule names as keys with boolean values. If the value is `true` it means
	 * that there is an error, otherwise, it does not have an error, and that rule is passing.
	 *
	 */
	function validateField(value, rules = {}) {
	    const fieldErrors = {};
	    for (const ruleKey in rules) {
	        const ruleValue = rules[ruleKey];
	        const validator = typeof ruleValue === 'function' ? ruleValue : validators_1.default.get(ruleKey);
	        fieldErrors[ruleKey] = validator(value, ruleValue);
	    }
	    return fieldErrors;
	}
	exports.validateField = validateField;
	function fieldIsValid(...args) {
	    let fieldErrors;
	    if (args.length === 1) {
	        [fieldErrors = EMPTY_OBJECT] = args;
	    }
	    else {
	        const [value, rules = EMPTY_OBJECT] = args;
	        fieldErrors = validateField(value, rules);
	    }
	    const result = true;
	    for (const errorKey in fieldErrors) {
	        const errorResult = fieldErrors[errorKey];
	        if (errorResult) {
	            return false;
	        }
	    }
	    return result;
	}
	exports.fieldIsValid = fieldIsValid;
	/**
	 * A simple generalization of `validateField` but for an entire form.
	 * It will basically run `validateField` on each `value` and each `rules`
	 * indexed by `fieldName` and return `FormErrors` which is, an object that has
	 * fieldNames as keys and `FieldErrors` as values.
	 *
	 */
	function validateForm(fieldsValues, rulesMap = {}) {
	    const formErrors = {};
	    for (const fieldName in fieldsValues) {
	        const fieldValue = fieldsValues[fieldName];
	        const fieldRules = rulesMap[fieldName];
	        formErrors[fieldName] = validateField(fieldValue, fieldRules);
	    }
	    return formErrors;
	}
	exports.validateForm = validateForm;
	function formIsValid(...args) {
	    let formErrors;
	    if (args.length === 1) {
	        [formErrors = EMPTY_OBJECT] = args;
	    }
	    else {
	        const [fieldsValues, rulesMap = EMPTY_OBJECT] = args;
	        formErrors = validateForm(fieldsValues, rulesMap);
	    }
	    const result = true;
	    for (const fieldName in formErrors) {
	        const fieldErrors = formErrors[fieldName];
	        if (!fieldIsValid(fieldErrors)) {
	            return false;
	        }
	    }
	    return result;
	}
	exports.formIsValid = formIsValid;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const officialValidators_1 = __webpack_require__(4);
	const validatorInterface = {
	    get(key) {
	        const validator = officialValidators_1.default[key];
	        if (!validator) {
	            throw new Error(`Validator ${key} not found`);
	        }
	        return validator;
	    },
	    set(key, value) {
	        if (officialValidators_1.default.hasOwnProperty(key)) {
	            throw new Error(`Validator ${key} is already used, please use another name`);
	        }
	        officialValidators_1.default[key] = value;
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = validatorInterface;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const url_1 = __webpack_require__(5);
	const time_1 = __webpack_require__(6);
	const month_1 = __webpack_require__(8);
	const week_1 = __webpack_require__(9);
	const minNumber_1 = __webpack_require__(10);
	const maxNumber_1 = __webpack_require__(11);
	const minDate_1 = __webpack_require__(12);
	const maxDate_1 = __webpack_require__(13);
	const minMonth_1 = __webpack_require__(14);
	const maxMonth_1 = __webpack_require__(15);
	const minTime_1 = __webpack_require__(16);
	const maxTime_1 = __webpack_require__(17);
	const minWeek_1 = __webpack_require__(18);
	const maxWeek_1 = __webpack_require__(19);
	const isNumber = value => (!!value || value === 0) && !Number.isFinite(parseFloat(value));
	const validatorMap = {
	    required: value => !value,
	    email: (value) => !!value && !/\S+@\S+\.\S+/.test(value),
	    minLength: (value, minLength) => !!value && value.length < minLength,
	    maxLength: (value, maxLength) => !!value && value.length > maxLength,
	    pattern: (value, re) => !!value && !re.test(value),
	    number: isNumber,
	    range: isNumber,
	    color: value => !!value && !/^#[0-9A-F]{6}$/.test(value),
	    date: value => !!value && Number.isNaN(Date.parse(value)),
	    time: time_1.time,
	    url: url_1.url,
	    month: month_1.month,
	    week: week_1.week,
	    minNumber: minNumber_1.minNumber,
	    maxNumber: maxNumber_1.maxNumber,
	    minDate: minDate_1.minDate,
	    maxDate: maxDate_1.maxDate,
	    minMonth: minMonth_1.minMonth,
	    maxMonth: maxMonth_1.maxMonth,
	    minTime: minTime_1.minTime,
	    maxTime: maxTime_1.maxTime,
	    minWeek: minWeek_1.minWeek,
	    maxWeek: maxWeek_1.maxWeek,
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = validatorMap;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i;
	const re = new RegExp(expression);
	exports.url = (value) => !!value && !re.test(value);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// Official docs https://www.w3.org/TR/html5/infrastructure.html#valid-date-string
	const utils_1 = __webpack_require__(7);
	// Example "02:00"
	exports.time = (value) => !!value && Number.isNaN(utils_1.parseTime(value));


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	// Returns [] if something went wrong
	function parseMonth(value) {
	    const [yearStr, monthStr] = value.split("-");
	    const year = parseInt(yearStr, 10);
	    const month = parseInt(monthStr, 10);
	    if (!Number.isFinite(year) || !Number.isFinite(month)) {
	        return [];
	    }
	    return [year, month];
	}
	exports.parseMonth = parseMonth;
	// Returns [] if something went wrong
	function parseWeek(value) {
	    let [yearStr, weekStr] = value.split("-");
	    const year = parseInt(yearStr, 10);
	    // Error if weekstr is not defined
	    if (!weekStr || weekStr[0] !== 'W') {
	        return [];
	    }
	    weekStr = weekStr.slice(1);
	    const week = parseInt(weekStr, 10);
	    if (!Number.isFinite(year) || !Number.isFinite(week)) {
	        return [];
	    }
	    return [year, week];
	}
	exports.parseWeek = parseWeek;
	function weeksInYear(year) {
	    const d = new Date(year, 0, 1);
	    const isLeap = new Date(year, 1, 29).getMonth() === 1;
	    // Check for a Jan 1 that's a Thursday or a leap year that has a
	    // Wednesday jan 1. Otherwise year has 52 weeks.
	    return d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52;
	}
	exports.weeksInYear = weeksInYear;
	const baseDate = "1970-01-01";
	function parseTime(time) {
	    return Date.parse(`${baseDate} ${time}`);
	}
	exports.parseTime = parseTime;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// Official docs https://www.w3.org/TR/html5/infrastructure.html#valid-month-string
	const utils_1 = __webpack_require__(7);
	exports.month = (value) => {
	    if (!value)
	        return false;
	    const [year, month] = utils_1.parseMonth(value);
	    if (!year || !month) {
	        return true;
	    }
	    return !(0 < year && 1 <= month && month <= 12);
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// Official docs https://www.w3.org/TR/html5/infrastructure.html
	// 2.4.5.8 Weeks
	const utils_1 = __webpack_require__(7);
	// Example week: "2016-W33"
	exports.week = (value) => {
	    if (!value) {
	        return false;
	    }
	    const [year, week] = utils_1.parseWeek(value);
	    if (!year || !week) {
	        return true;
	    }
	    return !(0 < year && 1 <= week && week <= utils_1.weeksInYear(year));
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	exports.minNumber = (value, min) => {
	    if (!value)
	        return false;
	    const minN = parseInt(min, 10);
	    const valueN = parseInt(value, 10);
	    if (!Number.isFinite(minN)) {
	        throw new Error(`Reform minNumber argument should be a valid a number or a number string. Found "${min}"`);
	    }
	    if (!Number.isFinite(valueN)) {
	        return false;
	    }
	    return valueN < minN;
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	exports.maxNumber = (value, max) => {
	    if (!value)
	        return false;
	    const maxN = parseInt(max, 10);
	    const valueN = parseInt(value, 10);
	    if (!Number.isFinite(maxN)) {
	        throw new Error(`Reform maxNumber argument should be a valid a number or a number string. Found "${max}"`);
	    }
	    if (!Number.isFinite(valueN)) {
	        return false;
	    }
	    return valueN > maxN;
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	exports.minDate = (value, min) => {
	    if (!value)
	        return false;
	    const minDate = Date.parse(min);
	    const valueDate = Date.parse(value);
	    if (Number.isNaN(minDate)) {
	        throw new Error(`Reform minDate should have a valid date as argument. Found "${min}"`);
	    }
	    if (Number.isNaN(valueDate)) {
	        return false;
	    }
	    return valueDate < minDate;
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	exports.maxDate = (value, max) => {
	    if (!value)
	        return false;
	    const maxDate = Date.parse(max);
	    const valueDate = Date.parse(value);
	    if (Number.isNaN(maxDate)) {
	        throw new Error(`Reform maxDate should have a valid date as argument. Found "${max}"`);
	    }
	    if (Number.isNaN(valueDate)) {
	        return false;
	    }
	    return valueDate > maxDate;
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const utils_1 = __webpack_require__(7);
	const month_1 = __webpack_require__(8);
	exports.minMonth = (value, min) => {
	    if (!value)
	        return false;
	    const [vYear, vMonth] = utils_1.parseMonth(value);
	    const [mYear, mMonth] = utils_1.parseMonth(min);
	    // Check that the min month is a valid month
	    if (!mYear || !mMonth || month_1.month(min)) {
	        throw new Error(`Reform minMonth should have a valid month as argument. Found "${min}"`);
	    }
	    // Invalid week
	    if (!vYear || !vMonth) {
	        return false;
	    }
	    let error = false;
	    if (vYear < mYear) {
	        error = true;
	    }
	    else if (vYear > mYear) {
	        error = false;
	    }
	    else if (vYear === mYear) {
	        error = vMonth < mMonth;
	    }
	    ;
	    return error;
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const utils_1 = __webpack_require__(7);
	const month_1 = __webpack_require__(8);
	exports.maxMonth = (value, max) => {
	    if (!value)
	        return false;
	    const [vYear, vMonth] = utils_1.parseMonth(value);
	    const [mYear, mMonth] = utils_1.parseMonth(max);
	    // Invalid max
	    if (!mYear || !mMonth || month_1.month(max)) {
	        throw new Error(`Reform maxMonth should have a valid month as argument. Found ${max}`);
	    }
	    // Invalid week
	    if (!vYear || !vMonth) {
	        return false;
	    }
	    let error = false;
	    if (vYear > mYear) {
	        error = true;
	    }
	    else if (vYear < mYear) {
	        error = false;
	    }
	    else if (vYear === mYear) {
	        error = vMonth > mMonth;
	    }
	    ;
	    return error;
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const utils_1 = __webpack_require__(7);
	exports.minTime = (value, min) => {
	    if (!value)
	        return false;
	    const minDate = utils_1.parseTime(min);
	    const valueDate = utils_1.parseTime(value);
	    if (Number.isNaN(minDate)) {
	        throw new Error(`Reform minTime should have a valid time as value. Found ${min}`);
	    }
	    if (Number.isNaN(valueDate)) {
	        return false;
	    }
	    return valueDate < minDate;
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const utils_1 = __webpack_require__(7);
	exports.maxTime = (value, max) => {
	    if (!value)
	        return false;
	    const maxDate = utils_1.parseTime(max);
	    const valueDate = utils_1.parseTime(value);
	    if (Number.isNaN(maxDate)) {
	        throw new Error(`Reform maxTime should have a valid time as value. Found ${max}`);
	    }
	    if (Number.isNaN(valueDate)) {
	        return false;
	    }
	    return valueDate > maxDate;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const utils_1 = __webpack_require__(7);
	const week_1 = __webpack_require__(9);
	exports.minWeek = (value, min) => {
	    if (!value)
	        return false;
	    const [vYear, vWeek] = utils_1.parseWeek(value);
	    const [mYear, mWeek] = utils_1.parseWeek(min);
	    // Invalid min
	    if (!mYear || !mWeek || week_1.week(min)) {
	        throw new Error(`Reform minWeek should have a valid week as value. Found ${min}.`);
	    }
	    // Invalid week
	    if (!vYear || !vWeek) {
	        return false;
	    }
	    let error = false;
	    if (vYear < mYear) {
	        error = true;
	    }
	    else if (vYear > mYear) {
	        error = false;
	    }
	    else if (vYear === mYear) {
	        error = vWeek < mWeek;
	    }
	    ;
	    return error;
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const utils_1 = __webpack_require__(7);
	const week_1 = __webpack_require__(9);
	exports.maxWeek = (value, max) => {
	    if (!value)
	        return false;
	    const [vYear, vWeek] = utils_1.parseWeek(value);
	    const [mYear, mWeek] = utils_1.parseWeek(max);
	    // Invalid max
	    if (!mYear || !mWeek || week_1.week(max)) {
	        throw new Error(`Reform maxWeek should have a valid week as value. Found ${max}.`);
	    }
	    // Invalid week
	    if (!vYear || !vWeek) {
	        return false;
	    }
	    let error = false;
	    if (vYear > mYear) {
	        error = true;
	    }
	    else if (vYear < mYear) {
	        error = false;
	    }
	    else if (vYear === mYear) {
	        error = vWeek > mWeek;
	    }
	    ;
	    return error;
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const core = __webpack_require__(2);
	/**
	 * Useful function for javascript land (which needs dynamic checking)
	 * @hidden
	 * @TODO do not use it in prod? Check performance
	 *
	 */
	function checkInstance(instance) {
	    if (!instance.hasOwnProperty('validationRules')) {
	        console.error(`Reform: instance does not have validationRules attribute`, instance);
	        throw new Error(`Reform: instance.validationRules not found`);
	    }
	    if (!instance.hasOwnProperty('state')) {
	        console.error(`Reform: instance does not have state attribute`, instance);
	        throw new Error(`Reform: instance.state not found`);
	    }
	    if (!instance.state.hasOwnProperty('fields')) {
	        console.error(`Reform: instance does not have state.fields attribute`, instance);
	        throw new Error(`Reform: instance.state.fields not found`);
	    }
	    if (!instance.state.hasOwnProperty('errors')) {
	        console.error(`Reform: instance does not have state.errors attribute`, instance);
	        throw new Error(`Reform: instance.state.errors not found`);
	    }
	}
	/**
	 * Calculate the validity of a field, by `fieldName`, with a new value and store it in the
	 * `this.state.errors[fieldName]`
	 *
	 * Will return, to improve usability, whether that field is valid or not.
	 *
	 * Use it if you are validating `onChange`, because `this.state.fields[fieldName]` (field's value)
	 * wont be already set.
	 *
	 *
	 * **Important**: This function needs to be executed in the context of a `ValidationAbleInstance`
	 * and will **not** save the `value` of the field in the state, that's your job.
	 *
	 * You can either use `Reform.reactMixins` to automatically bind this function to your instance (`this` inside your Component)
	 * and use them as regular methods, or you can use `bind`, `apply` and `call` to run them as functions.
	 *
	 * ```javascript
	 * // Create a new bounded function (very similar to what `reactMixins` do)
	 * const boundedFunction = Reform.reactHelpers.validateField.bind(this)
	 *
	 * // Run it in the proper context
	 * const isValid = Reform.reactHelpers.validateField.call(this, 'myField', 'new value');
	 * ```
	 *
	 * Ultimately, the way you use it does not matter as long as it fits your style.
	 * However, if you are undecided, I suggest you start by using `React.reactMixins`
	 *
	 * **Important** this function **will modify your component state**
	 *
	 * This function will also set your form to `dirty` in `this.state.formIsDirty`
	 *
	 */
	function validateField(fieldName, value) {
	    checkInstance(this);
	    const rules = this.validationRules[fieldName];
	    const fieldErrors = core.validateField(value, rules);
	    this.setState((state) => {
	        state.formIsDirty = true;
	        state.errors[fieldName] = fieldErrors;
	        return state;
	    });
	    return core.fieldIsValid(fieldErrors);
	}
	exports.validateField = validateField;
	/**
	 * A minimal variant of `validateField` but with the particularity of using the `value` already set in
	 * your component's state.
	 *
	 * Use it if you are validating **after** updating your state, i.e.: `onBlur`, `onSubmit` et al,
	 *
	 * **Important** this function **will modify your component's state**
	 *
	 * This function will also set your form to `dirty` in `this.state.formIsDirty`
	 *
	 */
	function validateFieldFromState(fieldName) {
	    const value = this.state.fields[fieldName];
	    return validateField.call(this, fieldName, value);
	}
	exports.validateFieldFromState = validateFieldFromState;
	/**
	 * Calculate the validity of your form from `fieldsValues` as parameters, update your state, and
	 * return whether your form is valid or not.
	 *
	 * Unless you have a very specific use case, most of the time you should be using `validateFormFromState`.
	 *
	 * **Important** this function **will modify your component's state**
	 *
	 * This function will also set your form to `dirty` in `this.state.formIsDirty`
	 */
	function validateForm(fieldsValues) {
	    checkInstance(this);
	    const rulesMap = this.validationRules;
	    const formErrors = core.validateForm(fieldsValues, rulesMap);
	    this.setState((state) => {
	        state.formIsDirty = true;
	        state.errors = formErrors;
	        return state;
	    });
	    return core.formIsValid(formErrors);
	}
	exports.validateForm = validateForm;
	/**
	 * Calculate the validity of your form from `fieldsValues` as parameters, update your state, and
	 * return whether your form is valid or not.
	 *
	 * Use it `onSubmit`.
	 *
	 * **Important** this function **will modify your component's state**
	 *
	 * This function will also set your form to `dirty` in `this.state.formIsDirty`
	 */
	function validateFormFromState() {
	    const values = this.state.fields;
	    return validateForm.call(this, values);
	}
	exports.validateFormFromState = validateFormFromState;
	/**
	 * Calculate whether a field is valid or not depending on the already calculated
	 * `fieldErrors` stored in the state.
	 *
	 * Use it to render _invalid_ state in your inputs.
	 *
	 * **Important** this function will **not re calculate your field's validity**
	 */
	function fieldIsValid(fieldName) {
	    return core.fieldIsValid(this.state.errors[fieldName]);
	}
	exports.fieldIsValid = fieldIsValid;
	/**
	 *  Calculate the form's validity from the `values` in `this.state.fields` and
	 *  the rules in `this.validationRules`.
	 *
	 *  This function, in contrast to `fieldIsValid`, **will effectively re-calculate your form's validity**
	 *
	 *  Use it to disable the submit button, or to prevent `onSubmit` callback from normal
	 *  processing of the form.
	 */
	function formIsValid() {
	    checkInstance(this);
	    const fields = this.state.fields;
	    const rules = this.validationRules;
	    return core.formIsValid(fields, rules);
	}
	exports.formIsValid = formIsValid;
	/**
	 * Simple helper to make conditional displaying field errors more ergonomic.
	 *
	 * Use it if to render field errors only if that field has a particular failed rule.
	 *
	 * ```javascript
	 * { this.fieldIfError('myField', 'required') && <span> myField is required! </span>
	 * ```
	 *
	 * This function is purely for ergonomic purposes.
	 */
	function fieldIfError(fieldName, errorKey) {
	    checkInstance(this);
	    if (!this.state.fields.hasOwnProperty(fieldName)) {
	        throw new Error(`Field ${fieldName} not found! Did you forget to initialize it?`);
	    }
	    if (!this.validationRules.hasOwnProperty(fieldName)) {
	        throw new Error(`Field Rules ${fieldName} not found! Did you forget to initialize them?`);
	    }
	    if (this.state.errors[fieldName] && this.state.errors[fieldName][errorKey]) {
	        return true;
	    }
	    return false;
	}
	exports.fieldIfError = fieldIfError;
	/**
	 *
	 * Another error helper to make displaying field errors easier. Instead of `fieldIfError` which
	 * is more procedural, use this helper if you have an structured way of displaying your errors.
	 *
	 * It returns an Array of Failed Rules.
	 * Each Failed Rule will be, in turn, an array of the form `['ruleName', 'ruleArgument']`.
	 *
	 * Where `ruleName` will be the name of a failed rule, for example `required`, `minLenght, etc.
	 * And `ruleArgument` will be the value of the rule, as defined by the user. For example `true`, '6', etc, respectively.
	 *
	 * This will enable you to create functions, or components, that will render your errors _automatically_ for you.
	 *
	 * Check mapFieldErrors for an even more easier way.
	 *
	 * ```javascript
	 * const errors = this.fieldErrors('myField')
	 * assert(errors, [['required', true], ['minLenght', 6], ['pattern', 'banana|apple'])
	 * ```
	 *
	 * @Unstable
	 */
	function fieldErrors(fieldName) {
	    checkInstance(this);
	    const result = [];
	    for (const ruleKey in this.state.errors[fieldName]) {
	        const errorResult = this.state.errors[fieldName][ruleKey];
	        if (!errorResult)
	            continue;
	        result.push([ruleKey, this.validationRules[fieldName][ruleKey]]);
	    }
	    return result;
	}
	exports.fieldErrors = fieldErrors;
	/**
	 *
	 * An abstraction of `fieldErrors` for structured field error rendering.
	 * Use it if you have a very standard way of displaying field errors.
	 *
	 * This function will use the `MessageCreator` map defined in `this.validationMessages`.
	 * It will map over the failed rules of a given field and create messages for you to display
	 * how ever you want.
	 *
	 * ```javascript
	 * //Define your validationMessages
	 * this.validationMessages = {
	 *   // Define a per-rule message creator
	 *   minLenght: (ruleValue, ruleKey, fieldName) => `${fieldName} must have at least ${ruleValue} characters`
	 *   // Define a fall back for missing message creators
	 *   default: (ruleValue, ruleKey, fieldName) => `{fieldName} is invalid according to rule ${ruleKey}: ${ruleValue}`
	 * }
	 *
	 * // Example validationRules
	 * this.validationRules = {
	 *   myField: {minLength: 6}
	 * }
	 *
	 * // Use inside your render function
	 * {this.mapFieldErrors('myField')
	 *    .map(message => (
	 *      <span>{message}</span>
	 *    ))
	 * }
	 *
	 * //In our example it will render something like this
	 * <span>myField must have at least 6 characters</span>
	 * ```
	 *
	 * @Unstable
	 *
	 */
	function mapFieldErrors(fieldName) {
	    if (!this.hasOwnProperty('validationMessages')) {
	        throw new Error(`"this.validationMessages" is required when using "mapFieldErrors"`);
	    }
	    if (!this.validationMessages.hasOwnProperty('default')) {
	        throw new Error(`"this.validationMessages.default" must be defined when using "mapFieldErrors"`);
	    }
	    return fieldErrors.call(this, 'email')
	        .map(([ruleKey, ruleValue]) => {
	        const creator = this.validationMessages[ruleKey] || this.validationMessages['default'];
	        return creator(ruleValue, ruleKey, fieldName);
	    });
	}
	exports.mapFieldErrors = mapFieldErrors;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	//import { ValidationAbleInstance, Fields } from './types'
	const helpers = __webpack_require__(20);
	/**
	 *  @hidden
	 */
	const mixinProperties = Object.keys(helpers);
	function classMixin(base) {
	    mixinProperties.forEach(prop => {
	        if (base[prop] != null) {
	            // TODO: better error message
	            throw new Error(`Wrapped Component already implements method, please use another one`);
	        }
	    });
	    class ReformImpl extends base {
	        constructor() {
	            super(...arguments);
	            this.validateField = helpers.validateField;
	            this.validateFieldFromState = helpers.validateFieldFromState;
	            this.fieldIsValid = helpers.fieldIsValid;
	            this.validateForm = helpers.validateForm;
	            this.validateFormFromState = helpers.validateFormFromState;
	            this.formIsValid = helpers.formIsValid;
	            this.fieldErrors = helpers.fieldErrors;
	            this.fieldIfError = helpers.fieldIfError;
	            this.mapFieldErrors = helpers.mapFieldErrors;
	        }
	    }
	    ReformImpl.displayName = `Reform(${base.displayName})`;
	    return ReformImpl;
	}
	exports.classMixin = classMixin;
	function functionalMixin(instance) {
	    mixinProperties.forEach(prop => {
	        if (instance[prop] != null) {
	            // TODO: better error message
	            throw new Error(`Wrapped Component already implements method, please use another one`);
	        }
	    });
	    instance.validateField = helpers.validateField;
	    instance.validateFieldFromState = helpers.validateFieldFromState;
	    instance.fieldIsValid = helpers.fieldIsValid;
	    instance.validateForm = helpers.validateForm;
	    instance.validateFormFromState = helpers.validateFormFromState;
	    instance.formIsValid = helpers.formIsValid;
	    instance.fieldErrors = helpers.fieldErrors;
	    instance.fieldIfError = helpers.fieldIfError;
	    instance.mapFieldErrors = helpers.mapFieldErrors;
	}
	exports.functionalMixin = functionalMixin;


/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map