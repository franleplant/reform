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
	Object.defineProperty(exports, "__esModule", { value: true });
	var types = __webpack_require__(1);
	exports.types = types;
	var core = __webpack_require__(2);
	exports.core = core;
	var validators_1 = __webpack_require__(3);
	exports.validators = validators_1.default;
	var reactHelpers = __webpack_require__(20);
	exports.reactHelpers = reactHelpers;
	var reactMixins = __webpack_require__(22);
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
	var Reform = {
	    types: types,
	    core: core,
	    validators: validators_1.default,
	    reactHelpers: reactHelpers,
	    reactMixins: reactMixins,
	};
	exports.default = Reform;


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var validators_1 = __webpack_require__(3);
	/**
	 *  @hidden
	 */
	var EMPTY_OBJECT = Object.freeze({});
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
	function validateField(value, rules) {
	    if (rules === void 0) { rules = {}; }
	    var fieldErrors = {};
	    for (var ruleKey in rules) {
	        var ruleValue = rules[ruleKey];
	        var validator = typeof ruleValue === "function"
	            ? ruleValue
	            : validators_1.default.get(ruleKey);
	        fieldErrors[ruleKey] = validator(value, ruleValue);
	    }
	    return fieldErrors;
	}
	exports.validateField = validateField;
	function fieldIsValid() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    var fieldErrors;
	    if (args.length === 1) {
	        _a = args[0], fieldErrors = _a === void 0 ? EMPTY_OBJECT : _a;
	    }
	    else {
	        var value = args[0], _b = args[1], rules = _b === void 0 ? EMPTY_OBJECT : _b;
	        fieldErrors = validateField(value, rules);
	    }
	    var result = true;
	    for (var errorKey in fieldErrors) {
	        var errorResult = fieldErrors[errorKey];
	        if (errorResult) {
	            return false;
	        }
	    }
	    return result;
	    var _a;
	}
	exports.fieldIsValid = fieldIsValid;
	/**
	 * A simple generalization of `validateField` but for an entire form.
	 * It will basically run `validateField` on each `value` and each `rules`
	 * indexed by `fieldName` and return `FormErrors` which is, an object that has
	 * fieldNames as keys and `FieldErrors` as values.
	 *
	 */
	function validateForm(fieldsValues, rulesMap) {
	    if (rulesMap === void 0) { rulesMap = {}; }
	    var formErrors = {};
	    for (var fieldName in fieldsValues) {
	        var fieldValue = fieldsValues[fieldName];
	        var fieldRules = rulesMap[fieldName];
	        formErrors[fieldName] = validateField(fieldValue, fieldRules);
	    }
	    return formErrors;
	}
	exports.validateForm = validateForm;
	function formIsValid() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    var formErrors;
	    if (args.length === 1) {
	        _a = args[0], formErrors = _a === void 0 ? EMPTY_OBJECT : _a;
	    }
	    else {
	        var fieldsValues = args[0], _b = args[1], rulesMap = _b === void 0 ? EMPTY_OBJECT : _b;
	        formErrors = validateForm(fieldsValues, rulesMap);
	    }
	    var result = true;
	    for (var fieldName in formErrors) {
	        var fieldErrors = formErrors[fieldName];
	        if (!fieldIsValid(fieldErrors)) {
	            return false;
	        }
	    }
	    return result;
	    var _a;
	}
	exports.formIsValid = formIsValid;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var officialValidators_1 = __webpack_require__(4);
	/**
	 * Main validator interface.
	 *
	 * It is simply a wrapper on top of an object that contains
	 * all the single functions that each `officialValidators/**` module exports.
	 *
	 * The main reasons for this abstraction to exist are:
	 *
	 * - Throw errors when a wrong validation rule key is passed (i.e. in `this.validationRules`)
	 * - Allow the user to set new global available custom validators
	 * - Throw errors when the user is trying to overwrite an already existing validator
	 *
	 * Use it if you want to add new global custom validators.
	 */
	var validatorInterface = {
	    get: function (key) {
	        var validator = officialValidators_1.default[key];
	        if (!validator) {
	            throw new Error("Validator " + key + " not found");
	        }
	        return validator;
	    },
	    set: function (key, value) {
	        if (officialValidators_1.default.hasOwnProperty(key)) {
	            throw new Error("Validator " + key + " is already used, please use another name");
	        }
	        officialValidators_1.default[key] = value;
	    },
	};
	exports.default = validatorInterface;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var url_1 = __webpack_require__(5);
	var time_1 = __webpack_require__(6);
	var month_1 = __webpack_require__(8);
	var week_1 = __webpack_require__(9);
	var minNumber_1 = __webpack_require__(10);
	var maxNumber_1 = __webpack_require__(11);
	var minDate_1 = __webpack_require__(12);
	var maxDate_1 = __webpack_require__(13);
	var minMonth_1 = __webpack_require__(14);
	var maxMonth_1 = __webpack_require__(15);
	var minTime_1 = __webpack_require__(16);
	var maxTime_1 = __webpack_require__(17);
	var minWeek_1 = __webpack_require__(18);
	var maxWeek_1 = __webpack_require__(19);
	/**
	 * @hidden
	 */
	var isNumber = function (value) {
	    return (!!value || value === 0) && !Number.isFinite(parseFloat(value));
	};
	/**
	 * These are all the official validators HTML5 validators.
	 *
	 *
	 * They are slightly differently expressed.
	 *
	 * Example 1
	 *
	 * ```javascript
	 * //HTML5
	 * <input name="myEmail" type="email" min-length=5 required />
	 *
	 * // Reform
	 * this.validationRules = {
	 *  myEmail: {
	 *    email: true,
	 *    minLength: 5,
	 *    required: true
	 *  }
	 * }
	 * ```
	 *
	 * Example 2
	 *
	 * ```javascript
	 * //HTML5
	 * <input name="myField" type="number" min=5  max=15 />
	 *
	 * // Reform
	 * this.validationRules = {
	 *  myField: {
	 *    number: true,
	 *    minNumber: 5,
	 *    maxNumber: 15,
	 *  }
	 * }
	 * ```
	 *
	 *
	 *
	 *
	 */
	var validatorMap = {
	    required: function (value) { return !value; },
	    email: function (value) { return !!value && !/\S+@\S+\.\S+/.test(value); },
	    minLength: function (value, minLength) {
	        return !!value && value.length < minLength;
	    },
	    maxLength: function (value, maxLength) {
	        return !!value && value.length > maxLength;
	    },
	    pattern: function (value, re) { return !!value && !re.test(value); },
	    number: isNumber,
	    range: isNumber,
	    color: function (value) { return !!value && !/^#[0-9A-F]{6}$/.test(value); },
	    date: function (value) { return !!value && Number.isNaN(Date.parse(value)); },
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
	exports.default = validatorMap;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * @hidden
	 */
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i;
	/**
	 * @hidden
	 */
	var re = new RegExp(expression);
	exports.url = function (value) { return !!value && !re.test(value); };


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	// Official docs https://www.w3.org/TR/html5/infrastructure.html#valid-date-string
	var utils_1 = __webpack_require__(7);
	// Example "02:00"
	exports.time = function (value) {
	    return !!value && Number.isNaN(utils_1.parseTime(value));
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	// Returns [] if something went wrong
	// TODO better return types
	function parseMonth(value) {
	    var _a = value.split("-"), yearStr = _a[0], monthStr = _a[1];
	    var year = parseInt(yearStr, 10);
	    var month = parseInt(monthStr, 10);
	    if (!Number.isFinite(year) || !Number.isFinite(month)) {
	        return [];
	    }
	    return [year, month];
	}
	exports.parseMonth = parseMonth;
	// Returns [] if something went wrong
	// TODO better return types
	function parseWeek(value) {
	    var _a = value.split("-"), yearStr = _a[0], weekStr = _a[1];
	    var year = parseInt(yearStr, 10);
	    // Error if weekstr is not defined
	    if (!weekStr || weekStr[0] !== "W") {
	        return [];
	    }
	    weekStr = weekStr.slice(1);
	    var week = parseInt(weekStr, 10);
	    if (!Number.isFinite(year) || !Number.isFinite(week)) {
	        return [];
	    }
	    return [year, week];
	}
	exports.parseWeek = parseWeek;
	function weeksInYear(year) {
	    var d = new Date(year, 0, 1);
	    var isLeap = new Date(year, 1, 29).getMonth() === 1;
	    // Check for a Jan 1 that's a Thursday or a leap year that has a
	    // Wednesday jan 1. Otherwise year has 52 weeks.
	    return d.getDay() === 4 || (isLeap && d.getDay() === 3) ? 53 : 52;
	}
	exports.weeksInYear = weeksInYear;
	/**
	 *  @hidden
	 */
	var baseDate = "1970-01-01";
	function parseTime(time) {
	    return Date.parse(baseDate + " " + time);
	}
	exports.parseTime = parseTime;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	// Official docs https://www.w3.org/TR/html5/infrastructure.html#valid-month-string
	var utils_1 = __webpack_require__(7);
	exports.month = function (value) {
	    if (!value)
	        return false;
	    var _a = utils_1.parseMonth(value), year = _a[0], month = _a[1];
	    if (!year || !month) {
	        return true;
	    }
	    return !(0 < year && 1 <= month && month <= 12);
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	// Official docs https://www.w3.org/TR/html5/infrastructure.html
	// 2.4.5.8 Weeks
	var utils_1 = __webpack_require__(7);
	// Example week: "2016-W33"
	exports.week = function (value) {
	    if (!value) {
	        return false;
	    }
	    var _a = utils_1.parseWeek(value), year = _a[0], week = _a[1];
	    if (!year || !week) {
	        return true;
	    }
	    return !(0 < year && 1 <= week && week <= utils_1.weeksInYear(year));
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.minNumber = function (value, min) {
	    if (!value)
	        return false;
	    var minN = parseInt(min, 10);
	    var valueN = parseInt(value, 10);
	    if (!Number.isFinite(minN)) {
	        throw new Error("Reform minNumber argument should be a valid a number or a number string. Found \"" + min + "\"");
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.maxNumber = function (value, max) {
	    if (!value)
	        return false;
	    var maxN = parseInt(max, 10);
	    var valueN = parseInt(value, 10);
	    if (!Number.isFinite(maxN)) {
	        throw new Error("Reform maxNumber argument should be a valid a number or a number string. Found \"" + max + "\"");
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.minDate = function (value, min) {
	    if (!value)
	        return false;
	    var minDate = Date.parse(min);
	    var valueDate = Date.parse(value);
	    if (Number.isNaN(minDate)) {
	        throw new Error("Reform minDate should have a valid date as argument. Found \"" + min + "\"");
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.maxDate = function (value, max) {
	    if (!value)
	        return false;
	    var maxDate = Date.parse(max);
	    var valueDate = Date.parse(value);
	    if (Number.isNaN(maxDate)) {
	        throw new Error("Reform maxDate should have a valid date as argument. Found \"" + max + "\"");
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
	Object.defineProperty(exports, "__esModule", { value: true });
	var utils_1 = __webpack_require__(7);
	var month_1 = __webpack_require__(8);
	exports.minMonth = function (value, min) {
	    if (!value)
	        return false;
	    var _a = utils_1.parseMonth(value), vYear = _a[0], vMonth = _a[1];
	    var _b = utils_1.parseMonth(min), mYear = _b[0], mMonth = _b[1];
	    // Check that the min month is a valid month
	    if (!mYear || !mMonth || month_1.month(min)) {
	        throw new Error("Reform minMonth should have a valid month as argument. Found \"" + min + "\"");
	    }
	    // Invalid week
	    if (!vYear || !vMonth) {
	        return false;
	    }
	    var error = false;
	    if (vYear < mYear) {
	        error = true;
	    }
	    else if (vYear > mYear) {
	        error = false;
	    }
	    else if (vYear === mYear) {
	        error = vMonth < mMonth;
	    }
	    return error;
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var utils_1 = __webpack_require__(7);
	var month_1 = __webpack_require__(8);
	exports.maxMonth = function (value, max) {
	    if (!value)
	        return false;
	    var _a = utils_1.parseMonth(value), vYear = _a[0], vMonth = _a[1];
	    var _b = utils_1.parseMonth(max), mYear = _b[0], mMonth = _b[1];
	    // Invalid max
	    if (!mYear || !mMonth || month_1.month(max)) {
	        throw new Error("Reform maxMonth should have a valid month as argument. Found " + max);
	    }
	    // Invalid week
	    if (!vYear || !vMonth) {
	        return false;
	    }
	    var error = false;
	    if (vYear > mYear) {
	        error = true;
	    }
	    else if (vYear < mYear) {
	        error = false;
	    }
	    else if (vYear === mYear) {
	        error = vMonth > mMonth;
	    }
	    return error;
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var utils_1 = __webpack_require__(7);
	exports.minTime = function (value, min) {
	    if (!value)
	        return false;
	    var minDate = utils_1.parseTime(min);
	    var valueDate = utils_1.parseTime(value);
	    if (Number.isNaN(minDate)) {
	        throw new Error("Reform minTime should have a valid time as value. Found " + min);
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
	Object.defineProperty(exports, "__esModule", { value: true });
	var utils_1 = __webpack_require__(7);
	exports.maxTime = function (value, max) {
	    if (!value)
	        return false;
	    var maxDate = utils_1.parseTime(max);
	    var valueDate = utils_1.parseTime(value);
	    if (Number.isNaN(maxDate)) {
	        throw new Error("Reform maxTime should have a valid time as value. Found " + max);
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
	Object.defineProperty(exports, "__esModule", { value: true });
	var utils_1 = __webpack_require__(7);
	var week_1 = __webpack_require__(9);
	exports.minWeek = function (value, min) {
	    if (!value)
	        return false;
	    var _a = utils_1.parseWeek(value), vYear = _a[0], vWeek = _a[1];
	    var _b = utils_1.parseWeek(min), mYear = _b[0], mWeek = _b[1];
	    // Invalid min
	    if (!mYear || !mWeek || week_1.week(min)) {
	        throw new Error("Reform minWeek should have a valid week as value. Found " + min + ".");
	    }
	    // Invalid week
	    if (!vYear || !vWeek) {
	        return false;
	    }
	    var error = false;
	    if (vYear < mYear) {
	        error = true;
	    }
	    else if (vYear > mYear) {
	        error = false;
	    }
	    else if (vYear === mYear) {
	        error = vWeek < mWeek;
	    }
	    return error;
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var utils_1 = __webpack_require__(7);
	var week_1 = __webpack_require__(9);
	exports.maxWeek = function (value, max) {
	    if (!value)
	        return false;
	    var _a = utils_1.parseWeek(value), vYear = _a[0], vWeek = _a[1];
	    var _b = utils_1.parseWeek(max), mYear = _b[0], mWeek = _b[1];
	    // Invalid max
	    if (!mYear || !mWeek || week_1.week(max)) {
	        throw new Error("Reform maxWeek should have a valid week as value. Found " + max + ".");
	    }
	    // Invalid week
	    if (!vYear || !vWeek) {
	        return false;
	    }
	    var error = false;
	    if (vYear > mYear) {
	        error = true;
	    }
	    else if (vYear < mYear) {
	        error = false;
	    }
	    else if (vYear === mYear) {
	        error = vWeek > mWeek;
	    }
	    return error;
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var core = __webpack_require__(2);
	/**
	 * Mimic react __DEV__ env.
	 * @hidden
	 */
	var __DEV__ = true;
	try {
	    if (process && process.env) {
	        __DEV__ = ("development") !== "production";
	    }
	}
	catch (e) { }
	/**
	 * Useful function for javascript land (which needs dynamic checking)
	 * @hidden
	 *
	 */
	function checkInstance(instance) {
	    if (!instance.hasOwnProperty("validationRules")) {
	        console.error("Reform: instance does not have validationRules attribute", instance);
	        throw new Error("Reform: instance.validationRules not found");
	    }
	    if (!instance.hasOwnProperty("state")) {
	        console.error("Reform: instance does not have state attribute", instance);
	        throw new Error("Reform: instance.state not found");
	    }
	    if (!instance.state.hasOwnProperty("fields")) {
	        console.error("Reform: instance does not have state.fields attribute", instance);
	        throw new Error("Reform: instance.state.fields not found");
	    }
	    if (!instance.state.hasOwnProperty("errors")) {
	        console.error("Reform: instance does not have state.errors attribute", instance);
	        throw new Error("Reform: instance.state.errors not found");
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
	    if (__DEV__) {
	        checkInstance(this);
	        if (!this.state.fields.hasOwnProperty(fieldName)) {
	            console.error("Reform: field not found!: " + fieldName, this);
	            throw new Error("Reform: instance.state.fields." + fieldName + " not found");
	        }
	    }
	    var rules = this.validationRules[fieldName];
	    var fieldErrors = core.validateField(value, rules);
	    this.setState(function (state) {
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
	    var value = this.state.fields[fieldName];
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
	    if (__DEV__)
	        checkInstance(this);
	    var rulesMap = this.validationRules;
	    var formErrors = core.validateForm(fieldsValues, rulesMap);
	    this.setState(function (state) {
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
	    var values = this.state.fields;
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
	    if (__DEV__) {
	        checkInstance(this);
	        if (!this.state.fields.hasOwnProperty(fieldName)) {
	            throw new Error("Field " + fieldName + " not found! Did you forget to initialize it?");
	        }
	    }
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
	    if (__DEV__)
	        checkInstance(this);
	    var fields = this.state.fields;
	    var rules = this.validationRules;
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
	    if (__DEV__) {
	        checkInstance(this);
	        if (!this.state.fields.hasOwnProperty(fieldName)) {
	            throw new Error("Field " + fieldName + " not found! Did you forget to initialize it?");
	        }
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
	    if (__DEV__) {
	        checkInstance(this);
	        if (!this.state.fields.hasOwnProperty(fieldName)) {
	            throw new Error("Field " + fieldName + " not found! Did you forget to initialize it?");
	        }
	    }
	    var result = [];
	    for (var ruleKey in this.state.errors[fieldName]) {
	        var errorResult = this.state.errors[fieldName][ruleKey];
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
	    var _this = this;
	    if (__DEV__) {
	        checkInstance(this);
	        if (!this.hasOwnProperty("validationMessages")) {
	            throw new Error("\"this.validationMessages\" is required when using \"mapFieldErrors\"");
	        }
	        if (!this.validationMessages.hasOwnProperty("default")) {
	            throw new Error("\"this.validationMessages.default\" must be defined when using \"mapFieldErrors\"");
	        }
	    }
	    return fieldErrors
	        .call(this, fieldName)
	        .map(function (_a) {
	        var ruleKey = _a[0], ruleValue = _a[1];
	        var creator = _this.validationMessages[ruleKey] || _this.validationMessages["default"];
	        return creator(ruleValue, ruleKey, fieldName);
	    });
	}
	exports.mapFieldErrors = mapFieldErrors;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21)))

/***/ },
/* 21 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var helpers = __webpack_require__(20);
	/**
	 *  @hidden
	 */
	var mixinProperties = Object.keys(helpers);
	/**
	 * Simplest mixin (well not really a mixin) that binds all
	 * reform helpers to your context and returns an object containing all common helerps.
	 *
	 * Use it with typescript to get type checks and autocomplete.
	 *
	 * ```typescript
	 *  class MyForm extends React.Component<any, any> {
	 *    reform = objectMixin(this)
	 *  }
	 * ```
	 *
	 */
	function objectMixin(that) {
	    var reform = {
	        validateField: helpers.validateField.bind(that),
	        validateFieldFromState: helpers.validateFieldFromState.bind(that),
	        fieldIsValid: helpers.fieldIsValid.bind(that),
	        validateForm: helpers.validateForm.bind(that),
	        validateFormFromState: helpers.validateFormFromState.bind(that),
	        formIsValid: helpers.formIsValid.bind(that),
	        fieldErrors: helpers.fieldErrors.bind(that),
	        fieldIfError: helpers.fieldIfError.bind(that),
	        mapFieldErrors: helpers.mapFieldErrors.bind(that),
	    };
	    return reform;
	}
	exports.objectMixin = objectMixin;
	/**
	 * Functional mixin to incorporate all reactHelpers methods into your Component's instance.
	 *
	 * Use it in Javascript without the need of decorators.
	 *
	 * Example
	 *
	 * ```javascript
	 * class MyComponent extends React.Component {
	 *  constructor(...args) {
	 *    super(...args)
	 *
	 *    functionalMixin(this);
	 *
	 *    // Now all reactHelpers will be available through this.[reactHelper]
	 *    this.validateForm
	 *    this.fieldIsValid
	 *    // etc
	 *  }
	 * }
	 * ```
	 */
	function functionalMixin(instance) {
	    mixinProperties.forEach(function (prop) {
	        if (instance[prop] != null) {
	            // TODO: better error message
	            throw new Error("Wrapped Component already implements method, please use another one");
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