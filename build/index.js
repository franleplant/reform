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
	var types = __webpack_require__(1);
	exports.types = types;
	var core = __webpack_require__(2);
	exports.core = core;
	var validators_1 = __webpack_require__(5);
	exports.validators = validators_1.default;
	var reactHelpers = __webpack_require__(12);
	exports.reactHelpers = reactHelpers;
	var exposing = {
	    types: types,
	    core: core,
	    reactHelpers: reactHelpers,
	    validators: validators_1.default,
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = exposing;


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var validators_1 = __webpack_require__(5);
	//TDO freeze
	var EMPTY_OBJECT = {};
	function validateField(value, rules) {
	    if (rules === void 0) { rules = {}; }
	    var fieldErrors = {};
	    for (var ruleKey in rules) {
	        var ruleValue = rules[ruleKey];
	        var validator = typeof ruleValue === 'function' ? ruleValue : validators_1.default.get(ruleKey);
	        fieldErrors[ruleKey] = validator(value, ruleValue);
	    }
	    return fieldErrors;
	}
	exports.validateField = validateField;
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
	function fieldIsValid() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i - 0] = arguments[_i];
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
	function formIsValid() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i - 0] = arguments[_i];
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
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var officialValidators_1 = __webpack_require__(6);
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
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = validatorInterface;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var url_1 = __webpack_require__(7);
	var time_1 = __webpack_require__(8);
	var month_1 = __webpack_require__(9);
	var week_1 = __webpack_require__(11);
	//TODO
	//import min from './min'
	//import max from './max'
	var isNumber = function (value) { return (!!value || value === 0) && !Number.isFinite(parseFloat(value)); };
	var validatorMap = {
	    required: function (value) { return !value; },
	    email: function (value) { return !!value && !/\S+@\S+\.\S+/.test(value); },
	    minLength: function (value, minLength) { return !!value && value.length < minLength; },
	    maxLength: function (value, maxLength) { return !!value && value.length > maxLength; },
	    pattern: function (value, re) { return !!value && !re.test(value); },
	    number: isNumber,
	    range: isNumber,
	    color: function (value) { return !!value && !/^#[0-9A-F]{6}$/.test(value); },
	    date: function (value) { return !!value && Number.isNaN(Date.parse(value)); },
	    time: time_1.time,
	    url: url_1.url,
	    month: month_1.month,
	    week: week_1.week,
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = validatorMap;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i;
	var re = new RegExp(expression);
	exports.url = function (value) { return !!value && !re.test(value); };


/***/ },
/* 8 */
/***/ function(module, exports) {

	// Official docs https://www.w3.org/TR/html5/infrastructure.html#valid-date-string
	"use strict";
	// Example "02:00"
	// Hack to make parsing times easier
	// TODO: review this
	var BASE_DATE = "1970-01-01";
	exports.time = function (value) { return !!value && Number.isNaN(Date.parse(BASE_DATE + ' ' + value)); };


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// Official docs https://www.w3.org/TR/html5/infrastructure.html#valid-month-string
	var utils_1 = __webpack_require__(10);
	exports.month = function (value) {
	    if (!value) {
	        return false;
	    }
	    var _a = utils_1.parseMonth(value), year = _a[0], month = _a[1];
	    if (!year || !month) {
	        return true;
	    }
	    return !(0 < year && 1 <= month && month <= 12);
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	function toPairs(obj) {
	    var result = [];
	    for (var key in obj) {
	        if (!obj.hasOwnProperty(key))
	            continue;
	        result.push([key, obj[key]]);
	    }
	    return result;
	}
	exports.toPairs = toPairs;
	// Return undef if something went wrong
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
	// Return undef if something went wrong
	function parseWeek(value) {
	    var _a = value.split("-"), yearStr = _a[0], weekStr = _a[1];
	    var year = parseInt(yearStr, 10);
	    // Error if weekstr is not defined
	    if (!weekStr) {
	        return [];
	    }
	    // We remove the "W" from "W33"
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
	    return d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52;
	}
	exports.weeksInYear = weeksInYear;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// Official docs https://www.w3.org/TR/html5/infrastructure.html
	// 2.4.5.8 Weeks
	var utils_1 = __webpack_require__(10);
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core = __webpack_require__(2);
	var utils_1 = __webpack_require__(10);
	// Useful function for javascript land
	// TODO: do not use it in prod? Check performance
	function checkInstance(instance) {
	    if (!instance.hasOwnProperty('validationRules')) {
	        console.error("Reform: instance does not have validationRules attribute", instance);
	        throw new Error("Reform: instance.validationRules not found");
	    }
	    if (!instance.hasOwnProperty('state')) {
	        console.error("Reform: instance does not have state attribute", instance);
	        throw new Error("Reform: instance.state not found");
	    }
	    if (!instance.state.hasOwnProperty('fields')) {
	        console.error("Reform: instance does not have state.fields attribute", instance);
	        throw new Error("Reform: instance.state.fields not found");
	    }
	    if (!instance.state.hasOwnProperty('errors')) {
	        console.error("Reform: instance does not have state.errors attribute", instance);
	        throw new Error("Reform: instance.state.errors not found");
	    }
	}
	// Modified state
	function validateField(fieldName, value) {
	    checkInstance(this);
	    var rules = this.validationRules[fieldName];
	    var fieldErrors = core.validateField(value, rules);
	    this.setState(function (state) {
	        state.formIsDirty = true;
	        state.errors[fieldName] = fieldErrors;
	        return state;
	    });
	}
	exports.validateField = validateField;
	// Modified state
	function validateFieldFromState(fieldName) {
	    var value = this.state.fields[fieldName];
	    validateField.call(this, fieldName, value);
	}
	exports.validateFieldFromState = validateFieldFromState;
	// Modified state
	function validateForm(fieldsValues) {
	    checkInstance(this);
	    var rulesMap = this.validationRules;
	    var formErrors = core.validateForm(fieldsValues, rulesMap);
	    this.setState(function (state) {
	        state.formIsDirty = true;
	        state.errors = formErrors;
	        return state;
	    });
	}
	exports.validateForm = validateForm;
	// Modified state
	function validateFormFromState() {
	    var values = this.state.fields;
	    validateForm.call(this, values);
	}
	exports.validateFormFromState = validateFormFromState;
	// Important! This function will evaluate field validity based on the already
	// calculated errors inside this.state.errors
	// The naming is kind of contribed. This function only checks that there are no errors
	// for the given field in this.state.errors
	// while formIsValid calculated the validity of the form
	function fieldIsValid(fieldName) {
	    return core.fieldIsValid(this.state.errors[fieldName]);
	}
	exports.fieldIsValid = fieldIsValid;
	// Calculates the validity of the form
	function formIsValid() {
	    checkInstance(this);
	    var fields = this.state.fields;
	    var rules = this.validationRules;
	    return core.formIsValid(fields, rules);
	}
	exports.formIsValid = formIsValid;
	// @Unstable
	function getFieldErrors(fieldName) {
	    var _this = this;
	    return utils_1.toPairs(this.state.errors[fieldName])
	        .filter(function (_a) {
	        var value = _a[1];
	        return Boolean(value);
	    })
	        .map(function (_a) {
	        var ruleKey = _a[0];
	        return [ruleKey, _this.validationRules[fieldName][ruleKey]];
	    });
	}
	exports.getFieldErrors = getFieldErrors;
	function fieldIfError(fieldName, errorKey) {
	    checkInstance(this);
	    if (!this.state.fields.hasOwnProperty(fieldName)) {
	        throw new Error("Field " + fieldName + " not found! Did you forget to initialize it?");
	    }
	    if (!this.validationRules.hasOwnProperty(fieldName)) {
	        throw new Error("Field Rules " + fieldName + " not found! Did you forget to initialize them?");
	    }
	    if (this.state.errors[fieldName] && this.state.errors[fieldName][errorKey]) {
	        return true;
	    }
	    return false;
	}
	exports.fieldIfError = fieldIfError;


/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map