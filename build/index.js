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
	var validators_1 = __webpack_require__(3);
	exports.validators = validators_1.default;
	var reactHelpers = __webpack_require__(20);
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
	var validators_1 = __webpack_require__(3);
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
	var officialValidators_1 = __webpack_require__(4);
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var url_1 = __webpack_require__(5);
	var time_1 = __webpack_require__(6);
	var month_1 = __webpack_require__(7);
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
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i;
	var re = new RegExp(expression);
	exports.url = function (value) { return !!value && !re.test(value); };


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// Official docs https://www.w3.org/TR/html5/infrastructure.html#valid-date-string
	var utils_1 = __webpack_require__(8);
	// Example "02:00"
	exports.time = function (value) { return !!value && Number.isNaN(utils_1.parseTime(value)); };


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// Official docs https://www.w3.org/TR/html5/infrastructure.html#valid-month-string
	var utils_1 = __webpack_require__(8);
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
/* 8 */
/***/ function(module, exports) {

	"use strict";
	// Returns [] if something went wrong
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
	function parseWeek(value) {
	    var _a = value.split("-"), yearStr = _a[0], weekStr = _a[1];
	    var year = parseInt(yearStr, 10);
	    // Error if weekstr is not defined
	    if (!weekStr || weekStr[0] !== 'W') {
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
	    return d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52;
	}
	exports.weeksInYear = weeksInYear;
	var baseDate = "1970-01-01";
	function parseTime(time) {
	    return Date.parse(baseDate + " " + time);
	}
	exports.parseTime = parseTime;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// Official docs https://www.w3.org/TR/html5/infrastructure.html
	// 2.4.5.8 Weeks
	var utils_1 = __webpack_require__(8);
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
	var utils_1 = __webpack_require__(8);
	var month_1 = __webpack_require__(7);
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
	    ;
	    return error;
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utils_1 = __webpack_require__(8);
	var month_1 = __webpack_require__(7);
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
	    ;
	    return error;
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utils_1 = __webpack_require__(8);
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
	var utils_1 = __webpack_require__(8);
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
	var utils_1 = __webpack_require__(8);
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
	    ;
	    return error;
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utils_1 = __webpack_require__(8);
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
	    ;
	    return error;
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var core = __webpack_require__(2);
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
	    var result = [];
	    for (var ruleKey in this.state.errors[fieldName]) {
	        var errorResult = this.state.errors[fieldName][ruleKey];
	        if (!errorResult)
	            continue;
	        result.push([ruleKey, this.validationRules[fieldName][ruleKey]]);
	    }
	    return result;
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
	var mixinProperties = [
	    'validateField',
	    'validateFieldFromState',
	    'fieldIsValid',
	    'validateForm',
	    'validateFormFromState',
	    'formIsValid',
	    'getFieldErrors',
	    'fieldIfError',
	];
	function reformClassMixin(base) {
	    mixinProperties.forEach(function (prop) {
	        if (base[prop] != null) {
	            // TODO: better error message
	            throw new Error("Wrapped Component already implements method, please use another one");
	        }
	    });
	    var ReformImpl = (function (_super) {
	        __extends(ReformImpl, _super);
	        function ReformImpl() {
	            var _this = _super.apply(this, arguments) || this;
	            _this.validateField = validateField;
	            _this.validateFieldFromState = validateFieldFromState;
	            _this.fieldIsValid = fieldIsValid;
	            _this.validateForm = validateForm;
	            _this.validateFormFromState = validateFormFromState;
	            _this.formIsValid = formIsValid;
	            _this.getFieldErrors = getFieldErrors;
	            _this.fieldIfError = fieldIfError;
	            return _this;
	        }
	        return ReformImpl;
	    }(base));
	    ReformImpl.displayName = "Reform(" + base.displayName + ")";
	    return ReformImpl;
	}
	exports.reformClassMixin = reformClassMixin;
	function reformFunctionalMixin(instance) {
	    mixinProperties.forEach(function (prop) {
	        if (instance[prop] != null) {
	            // TODO: better error message
	            throw new Error("Wrapped Component already implements method, please use another one");
	        }
	    });
	    instance.validateField = validateField;
	    instance.validateFieldFromState = validateFieldFromState;
	    instance.fieldIsValid = fieldIsValid;
	    instance.validateForm = validateForm;
	    instance.validateFormFromState = validateFormFromState;
	    instance.formIsValid = formIsValid;
	    instance.getFieldErrors = getFieldErrors;
	    instance.fieldIfError = fieldIfError;
	}
	exports.reformFunctionalMixin = reformFunctionalMixin;


/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map