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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utils_1 = __webpack_require__(10);
	var validators_1 = __webpack_require__(5);
	// TODO, each single validator must solve the case of empty values
	// for example, email validator usually does not want to throw an error if that email is void
	function validateRules(rules, value) {
	    if (rules === void 0) { rules = {}; }
	    var errorMap = {};
	    utils_1.toPairs(rules).forEach(function (_a) {
	        var ruleKey = _a[0], ruleValue = _a[1];
	        var validator = typeof ruleValue === 'function' ? ruleValue : validators_1.default.get(ruleKey);
	        var errorState = validator(value, ruleValue);
	        errorMap[ruleKey] = errorState;
	    });
	    return errorMap;
	}
	exports.validateRules = validateRules;
	function mapHasErrors(errorMap) {
	    if (errorMap === void 0) { errorMap = {}; }
	    return Object.values(errorMap).some(Boolean);
	}
	exports.mapHasErrors = mapHasErrors;
	function mapMapHasErrors(errorMapMap) {
	    return Object.values(errorMapMap).some(mapHasErrors);
	}
	exports.mapMapHasErrors = mapMapHasErrors;


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
	var isNumber = function (value) { return !Number.isFinite(parseFloat(value)); };
	var validatorMap = {
	    required: function (value) { return !value; },
	    email: function (value) { return !/\S+@\S+\.\S+/.test(value); },
	    minLength: function (value, minLength) { return value.length < minLength; },
	    maxLength: function (value, maxLength) { return value.length > maxLength; },
	    pattern: function (value, pattern) { return !(new RegExp(pattern)).test(value); },
	    number: isNumber,
	    range: isNumber,
	    color: function (value) { return !/^#[0-9A-F]{6}$/.test(value); },
	    date: function (value) { return Number.isNaN(Date.parse(value)); },
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
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var re = new RegExp(expression);
	exports.url = function (value) { return !re.test(value); };


/***/ },
/* 8 */
/***/ function(module, exports) {

	// Official docs https://www.w3.org/TR/html5/infrastructure.html#valid-date-string
	"use strict";
	// Example "02:00"
	// Hack to make parsing times easier
	// TODO: review this
	var BASE_DATE = "1970-01-01";
	exports.time = function (value) { return Number.isNaN(Date.parse(BASE_DATE + ' ' + value)); };


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// Official docs https://www.w3.org/TR/html5/infrastructure.html#valid-month-string
	var utils_1 = __webpack_require__(10);
	exports.month = function (value) {
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
	function validate(fieldName, value) {
	    //TODO check validationRules exist , if not throw an error for javascripters
	    var rules = this.validationRules[fieldName];
	    var errors = core.validateRules(rules, value);
	    this.setState(function (state) {
	        state.formIsDirty = true;
	        state.errors[fieldName] = errors;
	        return state;
	    });
	}
	exports.validate = validate;
	function fieldIfError(fieldName, errorKey) {
	    if (this.state.errors[fieldName] && this.state.errors[fieldName][errorKey]) {
	        return true;
	    }
	    return false;
	}
	exports.fieldIfError = fieldIfError;
	function fieldHasErrors(fieldName) {
	    return core.mapHasErrors(this.state.errors[fieldName]);
	}
	exports.fieldHasErrors = fieldHasErrors;
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
	function formHasErrors() {
	    var _this = this;
	    return utils_1.toPairs(this.state.fields)
	        .map(function (_a) {
	        var fieldName = _a[0], fieldValue = _a[1];
	        var rules = _this.validationRules[fieldName];
	        var errors = core.validateRules(rules, fieldValue);
	        return core.mapHasErrors(errors);
	    })
	        .some(Boolean);
	}
	exports.formHasErrors = formHasErrors;


/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map