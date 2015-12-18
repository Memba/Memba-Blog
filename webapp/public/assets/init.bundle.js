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
/******/ 	__webpack_require__.p = "http://localhost:3000/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
	 * Sources at https://github.com/Memba
	 */
	
	/* jshint browser: true */
	/* globals require: false, process: false */
	
	'use strict';
	
	if (true) {
	    __webpack_require__(200);
	    __webpack_require__(202);
	    __webpack_require__(204);
	    __webpack_require__(521);
	    __webpack_require__(522);
	}
	
	// TODO Consider javascript disabled
	// TODO use app.support to display a message for older browsers


/***/ },

/***/ 200:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
	 * Sources at https://github.com/Memba
	 */
	
	/* jshint browser: true, jquery: true */
	/* globals define: false */
	
	(function (f, define) {
	    'use strict';
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function () {
	
	    'use strict';
	
	    (function (undefined) {
	
	        var STRING = 'string';
	        var OBJECT = 'object';
	        var FUNCTION = 'function';
	        var UNDEFINED = 'undefined';
	
	        // Populate the class2type map
	        var class2type = {};
	        'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' ').forEach(function (name) {
	            class2type[ '[object ' + name + ']' ] = name.toLowerCase();
	        });
	        var toString = class2type.toString;
	        var hasOwn = class2type.hasOwnProperty;
	
	        // jQuery core functions to remove any dependencies
	        // @see https://github.com/jquery/jquery/blob/99e8ff1baa7ae341e94bb89c3e84570c7c3ad9ea/src/core.js
	        var $ = {
	            isArray: Array.isArray,
	            isFunction: function (obj) {
	                return $.type(obj) === FUNCTION;
	            },
	            isEmptyObject: function (obj) {
	                var name;
	                for (name in obj) {
	                    return false;
	                }
	                return true;
	            },
	            isNumeric: function (obj) {
	                // parseFloat NaNs numeric-cast false positives (null|true|false|"")
	                // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
	                // subtraction forces infinities to NaN
	                // adding 1 corrects loss of precision from parseFloat (#15100)
	                return !$.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
	            },
	            isPlainObject: function (obj) {
	                // Not plain objects:
	                // - Any object or value whose internal [[Class]] property is not "[object Object]"
	                // - DOM nodes
	                // - window
	                if ($.type(obj) !== OBJECT || obj.nodeType || $.isWindow(obj)) {
	                    return false;
	                }
	                if (obj.constructor && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
	                    return false;
	                }
	                // If the function hasn't returned already, we're confident that
	                // |obj| is a plain object, created by {} or constructed with new Object
	                return true;
	            },
	            isWindow: function (obj) {
	                return obj !== null && obj === obj.window;
	            },
	            type: function (obj) {
	                if (obj === null) {
	                    return obj + '';
	                }
	                // Support: Android<4.0 (functionish RegExp)
	                return typeof obj === OBJECT || typeof obj === FUNCTION ? class2type[toString.call(obj)] || OBJECT : typeof obj;
	            }
	        };
	
	        /**
	         * Asserts
	         * Note: Use asserts where unmet conditions are independent from user entries, and
	         * developers should be warned that there is probably something unexpected in their code
	         */
	        var assert = window.assert = function (test, message) {
	            if (!test) { throw new Error(message); }
	        };
	
	        // By extending assert, we ensure we can call both assert() and assert.ok() for the same result (like in nodeJS)
	
	        /**
	         * Assert enumeration
	         * @param array
	         * @param value
	         * @param message
	         */
	        assert.enum = function (array, value, message) {
	            if (array.indexOf(value) === -1) {
	                throw new RangeError(message);
	            }
	        };
	
	        /**
	         * Assert equal
	         * @param expected
	         * @param actual
	         * @param message
	         */
	        assert.equal = function (expected, actual, message) {
	            if (expected !== actual) {
	                throw new RangeError(message);
	            }
	        };
	
	        /**
	         * Assert the length property (for Arrays and jQuery)
	         * @param el
	         * @param message
	         */
	        assert.hasLength = function (el, message) {
	            if (!el || !el.length) {
	                throw new TypeError(message);
	            }
	        };
	
	        /**
	         * Assert instance of
	         * @param Class
	         * @param value
	         * @param message
	         */
	        assert.instanceof = function (Class, value, message) {
	            if (!(value instanceof Class)) {
	                throw new TypeError(message);
	            }
	        };
	
	        /**
	         * Assert optional object (can be undefined but mot an empty object, i.e. {})
	         * @param value
	         * @param message
	         */
	        assert.isOptionalObject = function (value, message) {
	            if ($.type(value) !== UNDEFINED && (!$.isPlainObject(value) || $.isEmptyObject(value))) {
	                throw new TypeError(message);
	            }
	        };
	
	        /**
	         * Assert a plain object (not empty)
	         * @param value
	         * @param message
	         */
	        assert.isPlainObject = function (value, message) {
	            if (!$.isPlainObject(value) || $.isEmptyObject(value)) {
	                throw new TypeError(message);
	            }
	        };
	
	        /**
	         * Assert undefined
	         * @param value
	         * @param message
	         */
	        assert.isUndefined = function (value, message) {
	            if ($.type(value) !== UNDEFINED) {
	                throw new TypeError(message);
	            }
	        };
	
	        /**
	         * Assert regular expression match
	         * @param rx
	         * @param value
	         * @param message
	         */
	        assert.match = function (rx, value, message) {
	            if ($.type(value) !== STRING || !rx.test(value)) {
	                throw new RangeError(message);
	            }
	        };
	
	        /**
	         * Assert true condition
	         * @param test
	         * @param message
	         * @returns {*}
	         */
	        assert.ok = function (test, message) {
	            return assert(test, message);
	        };
	
	        /**
	         * Assert type
	         * @param type
	         * @param value
	         * @param message
	         */
	        assert.type = function (type, value, message) {
	            if ($.type(value) !== type) {
	                throw new TypeError(message);
	            }
	        };
	
	        assert.messages = {
	            enum: {
	                default: '`{0}` is expected to be any of `{1}`'
	            },
	            equal: {
	                default: '`{0}` is expected to equal `{1}`'
	            },
	            hasLength: {
	                default: '`{0}` has neither length nor any item'
	            },
	            instanceof: {
	                default: '`{0}` is expected to be an instance of `{1}`'
	            },
	            isOptionalObject: {
	                default: '`{0}` is expected to be undefined or a plain object'
	            },
	            isPlainObject: {
	                default: '`{0}` is expected to be a plain object'
	            },
	            isUndefined: {
	                default: '`{0}` is expected to be undefined'
	            },
	            match: {
	                default: '`{0}` is expected to match `{1}`'
	            },
	            ok: {
	                default: 'A statement is expected to be true'
	            },
	            type: {
	                default: '`{0}` is expected to have type `{1}`'
	            }
	        };
	
	    }());
	
	    return window.assert;
	
	}, __webpack_require__(201));


/***/ },

/***/ 201:
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },

/***/ 202:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
	 * Sources at https://github.com/Memba
	 */
	
	/* jshint browser: true, jquery: true */
	/* globals define: false */
	
	(function (f, define) {
	    'use strict';
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function () {
	
	    'use strict';
	
	    (function (undefined) {
	
	        var app = window.app = window.app || {};
	        var STRING = 'string';
	        var FUNCTION = 'function';
	        var UNDEFINED = 'undefined';
	        var LEVELS = {
	            // See https://github.com/logentries/le_node#log-levels
	            DEBUG: { NAME: 'DEBUG', VALUE: 1 },
	            INFO: { NAME: 'INFO', VALUE: 2 },
	            WARN: { NAME: 'WARN', VALUE: 4 },
	            ERROR: { NAME: 'ERROR', VALUE: 5 },
	            CRIT: { NAME: 'CRIT', VALUE: 6 }
	        };
	        var DEFAULT = LEVELS.INFO;
	        var LINEFEEDS = /\n/g;
	        var LINESEP = '; ';
	        var EQUAL = ' = ';
	        var FIRST = '\t';
	        var SEPARATOR = '\t'; // '  |  ';
	
	        /**
	         * Logger class
	         * @class Logger
	         */
	        var Logger = window.Logger = function (module/*, appLogger*/) {
	
	            this._module = module;
	            this.level = DEFAULT.VALUE;
	
	            /**
	             * Preprocess message + data
	             * @param message
	             * @param data
	             */
	            function preProcess(message, data) {
	                if (typeof message !== STRING && typeof data !== UNDEFINED) {
	                    throw new TypeError('Unexpected data when message is not a string');
	                }
	                var logEntry;
	                if (typeof message === STRING) {
	                    logEntry = { message: message, data: data };
	                } else if (message instanceof window.Error) {
	                    logEntry = {
	                        message: message.message,
	                        error: message
	                    };
	                } else if (typeof window.ErrorEvent === FUNCTION && message instanceof window.ErrorEvent) {
	                    // window.ErrorEvent does not exist in PhantomJS
	                    logEntry = {
	                        message: message.message,
	                        data: { filename: message.filename, lineno: message.lineno, colno: message.colno },
	                        error: message.error
	                    };
	                } else if (Object.prototype.toString.call(message) === '[object Object]') {
	                    logEntry = JSON.parse(JSON.stringify(message));
	                    if (message.error instanceof Error) {
	                        // We need to do that because JSON.stringify(new Error('Oops)) === {}
	                        logEntry.error = message.error;
	                    }
	                } else {
	                    logEntry = { data: message };
	                }
	                return logEntry;
	            }
	
	            /**
	             * Enhance a log entry
	             * @param logEntry
	             * @param module
	             * @param level
	             */
	            function enhance(logEntry, module, level) {
	                if (Object.prototype.toString.call(logEntry) !== '[object Object]') {
	                    throw new TypeError('logEntry is expected to be an object');
	                }
	
	                // Improve error logging
	                if (logEntry.error instanceof Error) {
	                    if (typeof logEntry.message === UNDEFINED) {
	                        logEntry.message = logEntry.error.message;
	                    }
	                    if (logEntry.error.originalError instanceof window.Error) {
	                        logEntry.original = logEntry.error.originalError.message;
	                        if (typeof logEntry.error.originalError.stack === STRING) { // To care for an exception in PhantomJS
	                            logEntry.stack = logEntry.error.originalError.stack.replace(LINEFEEDS, LINESEP);
	                        }
	                    } else {
	                        if (typeof logEntry.error.stack === STRING) { // To care for an exception in PhantomJS
	                            logEntry.stack = logEntry.error.stack.replace(LINEFEEDS, LINESEP);
	                        }
	                    }
	                }
	
	                // Add module
	                logEntry.module = typeof module === STRING ? module : UNDEFINED;
	
	                // Add level
	                level = String(level).toUpperCase();
	                logEntry.level = Object.keys(LEVELS).indexOf(level) > -1 ? level : DEFAULT.NAME;
	
	                // If there is a hidden input field named `trace` on the page, read it and add it
	                var input = document.getElementById('trace');
	                if (input instanceof HTMLInputElement && input.type === 'hidden') {
	                    logEntry.trace = input.value;
	                }
	            }
	
	            /* This function has too many statements. */
	            /* jshint -W071 */
	
	            /* This function's cyclomatic complexity is too high. */
	            /* jshint -W074 */
	
	            /**
	             * Print a formatted log entry to the console
	             * @param logEntry
	             * @private
	             */
	            function log2Console(logEntry) {
	                /* jshint maxcomplexity: 22 */
	                /* jshint maxstatements: 32 */
	                var console = window.console;
	                if (app.DEBUG && console && typeof console.log === FUNCTION) {
	                    var message = '[' + logEntry.level + (logEntry.level.length === 4 ? ' ' : '') + ']';
	                    var first = true;
	                    if (logEntry.message) {
	                        message += (first ? FIRST : SEPARATOR) + 'message' + EQUAL + logEntry.message;
	                        first = false;
	                    }
	                    if (logEntry.original) {
	                        message += (first ? FIRST : SEPARATOR) + 'original' + EQUAL + logEntry.original;
	                        first = false;
	                    }
	                    if (logEntry.module) {
	                        message += (first ? FIRST : SEPARATOR) + 'module' + EQUAL + logEntry.module;
	                        first = false;
	                    }
	                    if (logEntry.method) {
	                        message += (first ? FIRST : SEPARATOR) + 'method' + EQUAL + logEntry.method;
	                        first = false;
	                    }
	                    if (logEntry.stack) {
	                        message += (first ? FIRST : SEPARATOR) + 'stack' + EQUAL + logEntry.stack;
	                        first = false;
	                    }
	                    if (logEntry.data) {
	                        try {
	                            message += (first ? FIRST : SEPARATOR) + 'data' + EQUAL + JSON.stringify(logEntry.data);
	                        } catch (exception) {
	                            if (typeof logEntry.data.toString === FUNCTION) {
	                                message += (first ? FIRST : SEPARATOR) + 'data' + EQUAL + logEntry.data.toString();
	                            }
	                        }
	                    }
	                    if (logEntry.trace) {
	                        message += (first ? FIRST : SEPARATOR) + 'trace' + EQUAL + logEntry.trace;
	                        first = false;
	                    }
	                    console.log(message);
	                    if (logEntry.error instanceof Error) {
	                        if (typeof window.console.error === FUNCTION) {
	                            window.console.error(logEntry.error);
	                        }
	                    }
	                    if (logEntry.originalError instanceof Error) {
	                        if (typeof window.console.error === FUNCTION) {
	                            window.console.error(logEntry.originalError);
	                        }
	                    }
	                }
	            }
	
	            /* jshint +W074 */
	            /* jshint +W071 */
	
	            /**
	             * Log message
	             * @param level
	             * @param message
	             * @param data
	             */
	            this.log = function (level, message, data) {
	                level = String(level).toUpperCase();
	                if (Object.keys(LEVELS).indexOf(level) === -1) {
	                    throw new TypeError('level is either `debug`, `info`, `warn`, `error` or `crit`');
	                }
	                if (this.level > LEVELS[level].VALUE) {
	                    return false;
	                }
	                var logEntry = preProcess(message, data);
	                enhance(logEntry, this._module, level);
	                log2Console(logEntry, level);
	                var logger = app.logger;
	                if (logger && typeof logger['_' + level.toLowerCase()] === FUNCTION) {
	                    logger['_' + level.toLowerCase()](logEntry);
	                }
	                return true;
	            };
	
	            /**
	             * Debug message
	             * @param message
	             * @param data
	             */
	            this.debug = function (message, data) {
	                return this.log(LEVELS.DEBUG.NAME, message, data);
	            };
	
	            /**
	             * Info message
	             * @param message
	             * @param data
	             */
	            this.info = function (message, data) {
	                return this.log(LEVELS.INFO.NAME, message, data);
	            };
	
	            /**
	             * Warning message
	             * @param message
	             * @param data
	             */
	            this.warn = function (message, data) {
	                return this.log(LEVELS.WARN.NAME, message, data);
	            };
	
	            /**
	             * Error message
	             * @param message
	             * @param data
	             */
	            this.error = function (message, data) {
	                return this.log(LEVELS.ERROR.NAME, message, data);
	            };
	
	            /**
	             * Critical message
	             * @param message
	             * @param data
	             */
	            this.crit = function (message, data) {
	                return this.log(LEVELS.CRIT.NAME, message, data);
	            };
	
	        };
	
	        /**
	         * OnError global event handler
	         * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
	         * @param e
	         */
	        window.onerror = function (e) {
	            // TODO window.onerror = function (msg, url, line) {
	            var gl = new Logger('global');
	            gl.crit(e);
	        };
	
	    }());
	
	    return window.Logger;
	
	}, __webpack_require__(201));


/***/ },

/***/ 204:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
	 * Sources at https://github.com/Memba
	 */
	
	/* jshint browser: true */
	/* globals define: false */
	
	(function (f, define) {
	    'use strict';
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(205), // <-- keep first or adapt function (LE)
	        __webpack_require__(200),
	        __webpack_require__(202)
	    ], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function (LE) {
	
	    'use strict';
	
	    // Depending how le.js is loaded
	    // We need `LE` for webpack and `window.LE` for grunt mocha
	    LE = LE || window.LE;
	
	    (function (undefined) {
	
	        var app = window.app = window.app || {};
	        var LEVELS = {
	            // See https://github.com/logentries/le_node#log-levels
	            DEBUG: { NAME: 'DEBUG', VALUE: 1 },
	            INFO: { NAME: 'INFO', VALUE: 2 },
	            WARN: { NAME: 'WARN', VALUE: 4 },
	            ERROR: { NAME: 'ERROR', VALUE: 5 },
	            CRIT: { NAME: 'CRIT', VALUE: 6 }
	        };
	        var DEFAULT = LEVELS.INFO;
	        var logger = app.logger = app.logger || {
	            token: 'e78bac0b-377a-49e2-ad91-20bb4ec7cedc', // Our localhost value (basically junk)
	            level: DEFAULT.VALUE
	        };
	
	        /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
	
	        /**
	         * Intialize LogEntries
	         * @see https://logentries.com/doc/javascript/
	         * @see https://github.com/logentries/le_js
	         */
	        LE.init({
	            token: logger.token,
	            ssl: true,
	            /**
	             * Important: catchall: true is equivalent to setting window.onerror
	             * See https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
	             */
	            catchall: false, // we have our own global handler in window.logger
	            trace: false, // not as good as our own trace
	            page_info: 'never', // does not work - see https://github.com/logentries/le_js/issues/41
	            print: false // let's print to the console ourselves in window.logger
	        });
	
	        /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
	
	        /**
	         * IMPORTANT: the following functions are prefixed with underscores
	         * because they should not be called, i.e. always call window.logger
	         */
	
	        /**
	         * Log a debug entry
	         * @param entry
	         */
	        logger._debug = function (entry) {
	            if (logger.level > LEVELS.DEBUG.VALUE) {
	                return false;
	            }
	            setTimeout(function () {
	                // Note: LE has no debug logging as of June 2015
	                LE.log(entry);
	            }, 0);
	            return true;
	        };
	
	        /**
	         * Log an info entry
	         * @param entry
	         */
	        logger._info = function (entry) {
	            if (logger.level > LEVELS.INFO.VALUE) {
	                return false;
	            }
	            setTimeout(function () {
	                LE.info(entry);
	            }, 0);
	            return true;
	        };
	
	        /**
	         * Log a warn entry
	         * @param entry
	         */
	        logger._warn = function (entry) {
	            if (logger.level > LEVELS.WARN.VALUE) {
	                return false;
	            }
	            setTimeout(function () {
	                LE.warn(entry);
	            }, 0);
	            return true;
	        };
	
	        /**
	         * Log an error entry (the application can survive an error entry)
	         * @param entry
	         */
	        logger._error = function (entry) {
	            if (logger.level > LEVELS.ERROR.VALUE) {
	                return false;
	            }
	            setTimeout(function () {
	                LE.error(entry);
	            }, 0);
	            return true;
	        };
	
	        /**
	         * Log a critical entry (the application cannot survive a critical entry)
	         * @param entry
	         */
	        logger._crit = function (entry) {
	            if (logger.level > LEVELS.CRIT.VALUE) {
	                return false;
	            }
	            setTimeout(function () {
	                // Note: LE has no critical logging as of June 2015
	                LE.error(entry);
	            }, 0);
	            return true;
	        };
	
	    }());
	
	    return window.app;
	
	}, __webpack_require__(201));


/***/ },

/***/ 205:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @license Copyright 2013 Logentries.
	 * Please view license at https://raw.github.com/logentries/le_js/master/LICENSE
	 */
	
	/*jslint browser:true*/
	/*global define, module, exports, console, global */
	
	/** @param {Object} window */
	(function (root, factory) {
	    if (true) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	            return factory(root);
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        // Node. Does not work with strict CommonJS, but
	        // only CommonJS-like environments that support module.exports,
	        // like Node.
	        if (typeof global === 'object') {
	            // Browserify. The calling object `this` does not reference window.
	            // `global` and `this` are equivalent in Node, preferring global
	            // adds support for Browserify.
	            root = global;
	        }
	        module.exports = factory(root);
	    } else {
	        // Browser globals (root is window)
	        root.LE = factory(root);
	    }
	}(this, function (window) {
	    "use strict";
	    // cross-browser indexOf fix
	    var _indexOf = function (array, obj) {
	        for (var i = 0; i < array.length; i++) {
	            if (obj === array[i]) {
	                return i;
	            }
	        }
	        return -1;
	    };
	
	    // Obtain a browser-specific XHR object
	    var _getAjaxObject = function () {
	        if (typeof XDomainRequest !== "undefined") {
	            // We're using IE8/9
	            return new XDomainRequest();
	        }
	        return new XMLHttpRequest();
	    };
	
	    /**
	     * A single log event stream.
	     * @constructor
	     * @param {Object} options
	     */
	    function LogStream(options) {
	        /**
	         * @const
	         * @type {string} */
	        var _traceCode = options.trace ? (Math.random() + Math.PI).toString(36).substring(2, 10) : null;
	        /** @type {string} */
	        var _pageInfo = options.page_info;
	        /** @type {string} */
	        var _token = options.token;
	        /** @type {boolean} */
	        var _print = options.print;
	        /** @type {boolean} */
	        var _SSL = function() {
	            if (typeof XDomainRequest === "undefined") {
	                return options.ssl;
	            }
	            // If we're relying on XDomainRequest, we
	            // must adhere to the page's encryption scheme.
	            return window.location.protocol === "https:" ? true : false;
	        }();
	        /** @type {string} */
	        var _endpoint;
	        if (window.LEENDPOINT) {
	            _endpoint = window.LEENDPOINT;
	        } else {
	            _endpoint = "js.logentries.com/v1";
	        }
	        _endpoint = (_SSL ? "https://" : "http://") + _endpoint + "/logs/" + _token;
	
	        /**
	         * Flag to prevent further invocations on network err
	         ** @type {boolean} */
	        var _shouldCall = true;
	        /** @type {Array.<string>} */
	        var _backlog = [];
	        /** @type {boolean} */
	        var _active = false;
	        /** @type {boolean} */
	        var _sentPageInfo = false;
	
	        if (options.catchall) {
	            var oldHandler = window.onerror;
	            var newHandler = function(msg, url, line) {
	                _rawLog({error: msg, line: line, location: url}).level('ERROR').send();
	                if (oldHandler) {
	                    return oldHandler(msg, url, line);
	                } else {
	                    return false;
	                }
	            };
	            window.onerror = newHandler;
	        }
	
	        var _agentInfo = function() {
	            var nav = window.navigator || {doNotTrack: undefined};
	            var screen = window.screen || {};
	            var location = window.location || {};
	
	            return {
	              url: location.pathname,
	              referrer: document.referrer,
	              screen: {
	                width: screen.width,
	                height: screen.height
	              },
	              window: {
	                width: window.innerWidth,
	                height: window.innerHeight
	              },
	              browser: {
	                name: nav.appName,
	                version: nav.appVersion,
	                cookie_enabled: nav.cookieEnabled,
	                do_not_track: nav.doNotTrack
	              },
	              platform: nav.platform
	            };
	        };
	
	        var _getEvent = function() {
	            var raw = null;
	            var args = Array.prototype.slice.call(arguments);
	            if (args.length === 0) {
	                throw new Error("No arguments!");
	            } else if (args.length === 1) {
	                raw = args[0];
	            } else {
	                // Handle a variadic overload,
	                // e.g. _rawLog("some text ", x, " ...", 1);
	              raw = args;
	            }
	            return raw;
	        };
	
	        // Single arg stops the compiler arity warning
	        var _rawLog = function(msg) {
	            var event = _getEvent.apply(this, arguments);
	
	            var data = {event: event};
	
	            // Add agent info if required
	            if (_pageInfo !== 'never') {
	                if (!_sentPageInfo || _pageInfo === 'per-entry') {
	                    _sentPageInfo = true;
	                    if (typeof event.screen === "undefined" &&
	                        typeof event.browser === "undefined")
	                      _rawLog(_agentInfo()).level('PAGE').send();
	                }
	            }
	
	            if (_traceCode) {
	                data.trace = _traceCode;
	            }
	
	            return {level: function(l) {
	                // Don't log PAGE events to console
	                // PAGE events are generated for the agentInfo function
	                    if (_print && typeof console !== "undefined" && l !== 'PAGE') {
	                      var serialized = null;
	                      if (typeof XDomainRequest !== "undefined") {
	                        // We're using IE8/9
	                        serialized = data.trace + ' ' + data.event;
	                      }
	                      try {
	                        console[l.toLowerCase()].call(console, (serialized || data));
	                      } catch (ex) {
	                        // IE compat fix
	                        console.log((serialized || data));
	                      }
	                    }
	                    data.level = l;
	
	                    return {send: function() {
	                        var cache = [];
	                        var serialized = JSON.stringify(data, function(key, value) {
	
	                              if (typeof value === "undefined") {
	                                return "undefined";
	                              } else if (typeof value === "object" && value !== null) {
	                                if (_indexOf(cache, value) !== -1) {
	                                  // We've seen this object before;
	                                  // return a placeholder instead to prevent
	                                  // cycles
	                                  return "<?>";
	                                }
	                                cache.push(value);
	                              }
	                          return value;
	                        });
	
	                            if (_active) {
	                                _backlog.push(serialized);
	                            } else {
	                                _apiCall(_token, serialized);
	                            }
	                        }};
	                }};
	        };
	
	        /** @expose */
	        this.log = _rawLog;
	
	        var _apiCall = function(token, data) {
	            _active = true;
	
	            var request = _getAjaxObject();
	
	            if (_shouldCall) {
	                if (request.constructor === XMLHttpRequest) {
	                    // Currently we don't support fine-grained error
	                    // handling in older versions of IE
	                    request.onreadystatechange = function() {
	                    if (request.readyState === 4) {
	                        // Handle any errors
	                        if (request.status >= 400) {
	                            console.error("Couldn't submit events.");
	                            if (request.status === 410) {
	                                // This API version has been phased out
	                                console.warn("This version of le_js is no longer supported!");
	                            }
	                        } else {
	                            if (request.status === 301) {
	                                // Server issued a deprecation warning
	                                console.warn("This version of le_js is deprecated! Consider upgrading.");
	                            }
	                            if (_backlog.length > 0) {
	                                // Submit the next event in the backlog
	                                _apiCall(token, _backlog.shift());
	                            } else {
	                                _active = false;
	                            }
	                        }
	                    }
	
	                    };
	                } else {
	                  request.onload = function() {
	                    if (_backlog.length > 0) {
	                      // Submit the next event in the backlog
	                      _apiCall(token, _backlog.shift());
	                    } else {
	                      _active = false;
	                    }
	                  };
	                }
	
	                request.open("POST", _endpoint, true);
	                if (request.constructor === XMLHttpRequest) {
	                    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	                    request.setRequestHeader('Content-type', 'application/json');
	                }
	                
	                if (request.overrideMimeType) {
	                    request.overrideMimeType('text');
	                }
	
	                request.send(data);
	            }
	        };
	    }
	
	    /**
	     * A single log object
	     * @constructor
	     * @param {Object} options
	     */
	    function Logger(options) {
	        var logger;
	
	        // Default values
	        var dict = {
	            ssl: true,
	            catchall: false,
	            trace: true,
	            page_info: 'never',
	            print: false,
	            endpoint: null,
	            token: null
	        };
	
	        if (typeof options === "object")
	            for (var k in options)
	                dict[k] = options[k];
	        else
	            throw new Error("Invalid parameters for createLogStream()");
	
	        if (dict.token === null) {
	            throw new Error("Token not present.");
	        } else {
	            logger = new LogStream(dict);
	        }
	
	        var _log = function(msg) {
	            if (logger) {
	                return logger.log.apply(this, arguments);
	            } else
	                throw new Error("You must call LE.init(...) first.");
	        };
	
	         // The public interface
	        return {
	            log: function() {
	                _log.apply(this, arguments).level('LOG').send();
	            },
	            warn: function() {
	                _log.apply(this, arguments).level('WARN').send();
	            },
	            error: function() {
	                _log.apply(this, arguments).level('ERROR').send();
	            },
	            info: function() {
	                _log.apply(this, arguments).level('INFO').send();
	            }
	        };
	    }
	
	    // Array of Logger elements
	    var loggers = {};
	
	    var _getLogger = function(name) {
	        if (!loggers.hasOwnProperty(name))
	           throw new Error("Invalid name for logStream");
	
	        return loggers[name];
	    };
	
	    var  _createLogStream = function(options) {
	        if (typeof options.name !== "string")
	            throw new Error("Name not present.");
	        else if (loggers.hasOwnProperty(options.name))
	            throw new Error("A logger with that name already exists!");
	        loggers[options.name] = new Logger(options);
	
	        return true;
	    };
	
	    var _deprecatedInit = function(options) {
	        var dict = {
	            name : "default"
	        };
	
	        if (typeof options === "object")
	            for (var k in options)
	                dict[k] = options[k];
	        else if (typeof options === "string")
	            dict.token = options;
	        else
	            throw new Error("Invalid parameters for init()");
	
	        return _createLogStream(dict);
	    };
	
	    var _destroyLogStream = function(name) {
	        if (typeof name === 'undefined'){
	            name = 'default';
	        }
	
	        delete loggers[name];
	    };
	
	    // The public interface
	    return {
	        init: _deprecatedInit,
	        createLogStream: _createLogStream,
	        to: _getLogger,
	        destroy: _destroyLogStream,
	        log: function() {
	            for (var k in loggers)
	                loggers[k].log.apply(this, arguments);
	        },
	        warn: function() {
	            for (var k in loggers)
	                loggers[k].warn.apply(this, arguments);
	        },
	        error: function() {
	            for (var k in loggers)
	                loggers[k].error.apply(this, arguments);
	        },
	        info: function() {
	            for (var k in loggers)
	                loggers[k].info.apply(this, arguments);
	        }
	    };
	}));


/***/ },

/***/ 521:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
	 * Sources at https://github.com/Memba
	 */
	
	/* jshint browser: true */
	/* globals define: false */
	
	(function (f, define) {
	    'use strict';
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(200),
	        __webpack_require__(202),
	        __webpack_require__(204)
	    ], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function () {
	
	    'use strict';
	
	    /**
	     * Note: This file is built with webpack using ./web_modules/jsx-loader.
	     * Values are read from any of the JSON config files in ./webapp/config
	     * depending on NODE_ENV: development, test or production (by default).
	     */
	
	    (function () {
	
	        var app = window.app = window.app || {};
	        // var assert = window.assert;
	        var logger = new window.Logger('app.config');
	
	        /**
	         * application DEBUG mode
	         * @type {boolean}
	         */
	        app.DEBUG = 'true'.toLowerCase() === 'true';
	
	        /**
	         * application locales
	         */
	        app.locales = JSON.parse('["en","fr"]');
	
	        /**
	         * Logger token
	         */
	        window.Logger.prototype.level = parseInt('0', 10) || 0;
	        app.logger.level = parseInt('0', 10) || 0;
	        app.logger.token = 'e78bac0b-377a-49e2-ad91-20bb4ec7cedc';
	
	        /**
	         * Facebook
	         * @type {{clientId: string}}
	         */
	        app.facebook = { clientID: '765158596920529' };
	
	        /**
	         * Twitter
	         * @type {{clientId: string}}
	         */
	        app.twitter = { account: 'memba' };
	
	        /**
	         * Convert nodejs printf like formatting strings into Kendo UI formatting strings
	         * where %s placeholders are replaced with {i} placeholders
	         * @see https://nodejs.org/api/util.html#util_util_format_format
	         * @see http://docs.telerik.com/kendo-ui/api/javascript/kendo#methods-format
	         * @param value
	         * @returns {*}
	         */
	        function convertFormat (value) {
	            var i = 0;
	            var ret = value;
	            var rx = /%[sdj]/;
	            while (typeof ret === 'string' && rx.test(ret)) {
	                ret = ret.replace(rx, '{' + i + '}');
	                i++;
	            }
	            return ret;
	        }
	
	        /**
	         * Join url bits, adding slashes where required
	         * TODO: This could be improved to account for . and ..
	         */
	        function urljoin() {
	            // Actually we first join with slashes, then we replace double or triple slashes, except when preceded by colons like in http://
	            return Array.prototype.slice.call(arguments).join('/').replace(/([^:])[\/]{2,}/g, '$1/');
	        }
	
	        /**
	         * Application URIs
	         * See /wepapp/middleware/locals.js
	         */
	        app.uris = {
	            cdn: {
	                icons: urljoin('https://d2rvsmwqptocm.cloudfront.net', convertFormat('/images/o_collection/svg/office/%s.svg'))
	            },
	            webapp: {
	                home: 'http://localhost:3000' + convertFormat('/'),
	                locale: 'http://localhost:3000' + convertFormat('/%s'), // redirection when changing locale
	                feed:  'http://localhost:3000' + convertFormat('/%s/index.rss'),
	                sitemap:  'http://localhost:3000' + convertFormat('/%s/sitemap.xml'),
	                pages:  'http://localhost:3000' + convertFormat('/%s/%s'),
	                posts:  'http://localhost:3000' + convertFormat('/%s/posts/%s/%s/%s')
	            }
	        };
	
	        logger.info({
	            message: 'app configured'
	        });
	
	    }());
	
	    return window.app;
	
	}, __webpack_require__(201));


/***/ },

/***/ 522:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
	 * Sources at https://github.com/Memba
	 */
	
	/* jshint browser: true */
	/* globals define: false */
	
	(function (f, define) {
	    'use strict';
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(204)
	    ], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function () {
	
	    'use strict';
	
	    var app = window.app;
	    var logger = new window.Logger('app.support');
	
	    /* This function has too many statements. */
	    /* jshint -W071 */
	
	    /* Blocks are nested too deeply. */
	    /* jshint -W073 */
	
	    /* This function's cyclomatic complexity is too high. */
	    /* jshint -W074 */
	
	    /**
	     * IMPORTANT
	     * Use the Build link below to update
	     */
	
	    /*!
	     * modernizr v3.2.0
	     * Build http://modernizr.com/download?-atobbtoa-audio-blobconstructor-bloburls-canvas-canvastext-csstransforms-datauri-filereader-hashchange-history-inlinesvg-localstorage-sessionstorage-svg-svgasimg-touchevents-video-webworkers-dontmin
	     *
	     * Copyright (c)
	     *  Faruk Ates
	     *  Paul Irish
	     *  Alex Sexton
	     *  Ryan Seddon
	     *  Patrick Kettner
	     *  Stu Cox
	     *  Richard Herrera
	
	     * MIT License
	     */
	
	    /*
	     * Modernizr tests which native CSS3 and HTML5 features are available in the
	     * current UA and makes the results available to you in two ways: as properties on
	     * a global `Modernizr` object, and as classes on the `<html>` element. This
	     * information allows you to progressively enhance your pages with a granular level
	     * of control over the experience.
	     */
	
	    ;(function (window, document, undefined) {
	        var tests = [];
	
	
	        /**
	         *
	         * ModernizrProto is the constructor for Modernizr
	         *
	         * @class
	         * @access public
	         */
	
	        var ModernizrProto = {
	            // The current version, dummy
	            _version: '3.2.0',
	
	            // Any settings that don't work as separate modules
	            // can go in here as configuration.
	            _config: {
	                classPrefix: '',
	                enableClasses: true,
	                enableJSClass: true,
	                usePrefixes: true
	            },
	
	            // Queue of tests
	            _q: [],
	
	            // Stub these for people who are listening
	            on: function (test, cb) {
	                // I don't really think people should do this, but we can
	                // safe guard it a bit.
	                // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
	                // This is in case people listen to synchronous tests. I would leave it out,
	                // but the code to *disallow* sync tests in the real version of this
	                // function is actually larger than this.
	                var self = this;
	                setTimeout(function () {
	                    cb(self[test]);
	                }, 0);
	            },
	
	            addTest: function (name, fn, options) {
	                tests.push({ name: name, fn: fn, options: options });
	            },
	
	            addAsyncTest: function (fn) {
	                tests.push({ name: null, fn: fn });
	            }
	        };
	
	
	
	        // Fake some of Object.create so we can force non test results to be non "own" properties.
	        var Modernizr = function () {};
	        Modernizr.prototype = ModernizrProto;
	
	        // Leak modernizr globally when you `require` it rather than force it here.
	        // Overwrite name so constructor name is nicer :D
	        Modernizr = new Modernizr();
	
	
	        /*!
	         {
	         "name": "Blob constructor",
	         "property": "blobconstructor",
	         "aliases": ["blob-constructor"],
	         "builderAliases": ["blob_constructor"],
	         "caniuse": "blobbuilder",
	         "notes": [{
	         "name": "W3C spec",
	         "href": "http://dev.w3.org/2006/webapi/FileAPI/#constructorBlob"
	         }],
	         "polyfills": ["blobjs"]
	         }
	         !*/
	        /* DOC
	         Detects support for the Blob constructor, for creating file-like objects of immutable, raw data.
	         */
	
	        Modernizr.addTest('blobconstructor', function () {
	            try {
	                return !!new Blob();
	            } catch (e) {
	                return false;
	            }
	        }, {
	            aliases: ['blob-constructor']
	        });
	
	        /*!
	         {
	         "name": "History API",
	         "property": "history",
	         "caniuse": "history",
	         "tags": ["history"],
	         "authors": ["Hay Kranen", "Alexander Farkas"],
	         "notes": [{
	         "name": "W3C Spec",
	         "href": "http://www.w3.org/TR/html51/browsers.html#the-history-interface"
	         }, {
	         "name": "MDN documentation",
	         "href": "https://developer.mozilla.org/en-US/docs/Web/API/window.history"
	         }],
	         "polyfills": ["historyjs", "html5historyapi"]
	         }
	         !*/
	        /* DOC
	         Detects support for the History API for manipulating the browser session history.
	         */
	
	        Modernizr.addTest('history', function () {
	            // Issue #733
	            // The stock browser on Android 2.2 & 2.3, and 4.0.x returns positive on history support
	            // Unfortunately support is really buggy and there is no clean way to detect
	            // these bugs, so we fall back to a user agent sniff :(
	            var ua = navigator.userAgent;
	
	            // We only want Android 2 and 4.0, stock browser, and not Chrome which identifies
	            // itself as 'Mobile Safari' as well, nor Windows Phone (issue #1471).
	            if ((ua.indexOf('Android 2.') !== -1 ||
	                (ua.indexOf('Android 4.0') !== -1)) &&
	                ua.indexOf('Mobile Safari') !== -1 &&
	                ua.indexOf('Chrome') === -1 &&
	                ua.indexOf('Windows Phone') === -1) {
	                return false;
	            }
	
	            // Return the regular check
	            return (window.history && 'pushState' in window.history);
	        });
	
	        /*!
	         {
	         "name": "SVG",
	         "property": "svg",
	         "caniuse": "svg",
	         "tags": ["svg"],
	         "authors": ["Erik Dahlstrom"],
	         "polyfills": [
	         "svgweb",
	         "raphael",
	         "amplesdk",
	         "canvg",
	         "svg-boilerplate",
	         "sie",
	         "dojogfx",
	         "fabricjs"
	         ]
	         }
	         !*/
	        /* DOC
	         Detects support for SVG in `<embed>` or `<object>` elements.
	         */
	
	        Modernizr.addTest('svg', !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);
	
	        /*!
	         {
	         "name": "File API",
	         "property": "filereader",
	         "caniuse": "fileapi",
	         "notes": [{
	         "name": "W3C Working Draft",
	         "href": "http://www.w3.org/TR/FileAPI/"
	         }],
	         "tags": ["file"],
	         "builderAliases": ["file_api"],
	         "knownBugs": ["Will fail in Safari 5 due to its lack of support for the standards defined FileReader object"]
	         }
	         !*/
	        /* DOC
	         `filereader` tests for the File API specification
	
	         Tests for objects specific to the File API W3C specification without
	         being redundant (don't bother testing for Blob since it is assumed
	         to be the File object's prototype.)
	         */
	
	        Modernizr.addTest('filereader', !!(window.File && window.FileList && window.FileReader));
	
	        /*!
	         {
	         "name": "Local Storage",
	         "property": "localstorage",
	         "caniuse": "namevalue-storage",
	         "tags": ["storage"],
	         "knownBugs": [],
	         "notes": [],
	         "warnings": [],
	         "polyfills": [
	         "joshuabell-polyfill",
	         "cupcake",
	         "storagepolyfill",
	         "amplifyjs",
	         "yui-cacheoffline"
	         ]
	         }
	         !*/
	
	        // In FF4, if disabled, window.localStorage should === null.
	
	        // Normally, we could not test that directly and need to do a
	        //   `('localStorage' in window) && ` test first because otherwise Firefox will
	        //   throw bugzil.la/365772 if cookies are disabled
	
	        // Also in iOS5 Private Browsing mode, attempting to use localStorage.setItem
	        // will throw the exception:
	        //   QUOTA_EXCEEDED_ERROR DOM Exception 22.
	        // Peculiarly, getItem and removeItem calls do not throw.
	
	        // Because we are forced to try/catch this, we'll go aggressive.
	
	        // Just FWIW: IE8 Compat mode supports these features completely:
	        //   www.quirksmode.org/dom/html5.html
	        // But IE8 doesn't support either with local files
	
	        Modernizr.addTest('localstorage', function () {
	            var mod = 'modernizr';
	            try {
	                localStorage.setItem(mod, mod);
	                localStorage.removeItem(mod);
	                return true;
	            } catch (e) {
	                return false;
	            }
	        });
	
	        /*!
	         {
	         "name": "Session Storage",
	         "property": "sessionstorage",
	         "tags": ["storage"],
	         "polyfills": ["joshuabell-polyfill", "cupcake", "sessionstorage"]
	         }
	         !*/
	
	        // Because we are forced to try/catch this, we'll go aggressive.
	
	        // Just FWIW: IE8 Compat mode supports these features completely:
	        //   www.quirksmode.org/dom/html5.html
	        // But IE8 doesn't support either with local files
	        Modernizr.addTest('sessionstorage', function () {
	            var mod = 'modernizr';
	            try {
	                sessionStorage.setItem(mod, mod);
	                sessionStorage.removeItem(mod);
	                return true;
	            } catch (e) {
	                return false;
	            }
	        });
	
	        /*!
	         {
	         "name": "Base 64 encoding/decoding",
	         "property": ["atobbtoa"],
	         "builderAliases": ["atob-btoa"],
	         "caniuse" : "atob-btoa",
	         "tags": ["atob", "base64", "WindowBase64", "btoa"],
	         "authors": ["Christian Ulbrich"],
	         "notes": [{
	         "name": "WindowBase64",
	         "href": "http://www.w3.org/TR/html5/webappapis.html#windowbase64"
	         }, {
	         "name": "MDN documentation",
	         "href": "https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/atob"
	         }],
	         "polyfills": ["base64js"]
	         }
	         !*/
	        /* DOC
	
	         Detects support for WindowBase64 API (window.atob && window.btoa).
	
	         */
	
	        Modernizr.addTest('atobbtoa', 'atob' in window && 'btoa' in window, { aliases: ['atob-btoa'] });
	
	        /*!
	         {
	         "name": "Web Workers",
	         "property": "webworkers",
	         "caniuse" : "webworkers",
	         "tags": ["performance", "workers"],
	         "notes": [{
	         "name": "W3C Reference",
	         "href": "http://www.w3.org/TR/workers/"
	         }, {
	         "name": "HTML5 Rocks article",
	         "href": "http://www.html5rocks.com/en/tutorials/workers/basics/"
	         }, {
	         "name": "MDN documentation",
	         "href": "https://developer.mozilla.org/en-US/docs/Web/Guide/Performance/Using_web_workers"
	         }],
	         "polyfills": ["fakeworker", "html5shims"]
	         }
	         !*/
	        /* DOC
	         Detects support for the basic `Worker` API from the Web Workers spec. Web Workers provide a simple means for web content to run scripts in background threads.
	         */
	
	        Modernizr.addTest('webworkers', 'Worker' in window);
	
	
	        var classes = [];
	
	
	        /**
	         * is returns a boolean if the typeof an obj is exactly type.
	         *
	         * @access private
	         * @function is
	         * @param {*} obj - A thing we want to check the type of
	         * @param {string} type - A string to compare the typeof against
	         * @returns {boolean}
	         */
	
	        function is(obj, type) {
	            return typeof obj === type;
	        }
	
	        /**
	         * Run through all tests and detect their support in the current UA.
	         *
	         * @access private
	         */
	
	        function testRunner() {
	            var featureNames;
	            var feature;
	            var aliasIdx;
	            var result;
	            var nameIdx;
	            var featureName;
	            var featureNameSplit;
	
	            for (var featureIdx in tests) {
	                if (tests.hasOwnProperty(featureIdx)) {
	                    featureNames = [];
	                    feature = tests[featureIdx];
	                    // run the test, throw the return value into the Modernizr,
	                    // then based on that boolean, define an appropriate className
	                    // and push it into an array of classes we'll join later.
	                    //
	                    // If there is no name, it's an 'async' test that is run,
	                    // but not directly added to the object. That should
	                    // be done with a post-run addTest call.
	                    if (feature.name) {
	                        featureNames.push(feature.name.toLowerCase());
	
	                        if (feature.options && feature.options.aliases && feature.options.aliases.length) {
	                            // Add all the aliases into the names list
	                            for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
	                                featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
	                            }
	                        }
	                    }
	
	                    // Run the test, or use the raw value if it's not a function
	                    result = is(feature.fn, 'function') ? feature.fn() : feature.fn;
	
	
	                    // Set each of the names on the Modernizr object
	                    for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
	                        featureName = featureNames[nameIdx];
	                        // Support dot properties as sub tests. We don't do checking to make sure
	                        // that the implied parent tests have been added. You must call them in
	                        // order (either in the test, or make the parent test a dependency).
	                        //
	                        // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
	                        // hashtag famous last words
	                        featureNameSplit = featureName.split('.');
	
	                        if (featureNameSplit.length === 1) {
	                            Modernizr[featureNameSplit[0]] = result;
	                        } else {
	                            // cast to a Boolean, if not one already
	                            /* jshint -W053 */
	                            if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
	                                Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
	                            }
	
	                            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
	                        }
	
	                        classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
	                    }
	                }
	            }
	        }
	
	        /**
	         * List of property values to set for css tests. See ticket #21
	         * http://git.io/vUGl4
	         *
	         * @memberof Modernizr
	         * @name Modernizr._prefixes
	         * @optionName Modernizr._prefixes
	         * @optionProp prefixes
	         * @access public
	         * @example
	         *
	         * Modernizr._prefixes is the internal list of prefixes that we test against
	         * inside of things like [prefixed](#modernizr-prefixed) and [prefixedCSS](#-code-modernizr-prefixedcss). It is simply
	         * an array of kebab-case vendor prefixes you can use within your code.
	         *
	         * Some common use cases include
	         *
	         * Generating all possible prefixed version of a CSS property
	         * ```js
	         * var rule = Modernizr._prefixes.join('transform: rotate(20deg); ');
	         *
	         * rule === 'transform: rotate(20deg); webkit-transform: rotate(20deg); moz-transform: rotate(20deg); o-transform: rotate(20deg); ms-transform: rotate(20deg);'
	         * ```
	         *
	         * Generating all possible prefixed version of a CSS value
	         * ```js
	         * rule = 'display:' +  Modernizr._prefixes.join('flex; display:') + 'flex';
	         *
	         * rule === 'display:flex; display:-webkit-flex; display:-moz-flex; display:-o-flex; display:-ms-flex; display:flex'
	         * ```
	         */
	
	        var prefixes = (ModernizrProto._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : []);
	
	        // expose these for the plugin API. Look in the source for how to join() them against your input
	        ModernizrProto._prefixes = prefixes;
	
	
	
	        /**
	         * hasOwnProp is a shim for hasOwnProperty that is needed for Safari 2.0 support
	         *
	         * @author kangax
	         * @access private
	         * @function hasOwnProp
	         * @param {object} object - The object to check for a property
	         * @param {string} property - The property to check for
	         * @returns {boolean}
	         */
	
	        // hasOwnProperty shim by kangax needed for Safari 2.0 support
	        var hasOwnProp;
	
	        (function () {
	            var _hasOwnProperty = ({}).hasOwnProperty;
	            /* istanbul ignore else */
	            /* we have no way of testing IE 5.5 or safari 2,
	             * so just assume the else gets hit */
	            if (!is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined')) {
	                hasOwnProp = function (object, property) {
	                    return _hasOwnProperty.call(object, property);
	                };
	            }
	            else {
	                hasOwnProp = function (object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
	                    return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
	                };
	            }
	        })();
	
	
	
	        /**
	         * cssToDOM takes a kebab-case string and converts it to camelCase
	         * e.g. box-sizing -> boxSizing
	         *
	         * @access private
	         * @function cssToDOM
	         * @param {string} name - String name of kebab-case prop we want to convert
	         * @returns {string} The camelCase version of the supplied name
	         */
	
	        function cssToDOM(name) {
	            return name.replace(/([a-z])-([a-z])/g, function (str, m1, m2) {
	                return m1 + m2.toUpperCase();
	            }).replace(/^-/, '');
	        }
	
	        /**
	         * docElement is a convenience wrapper to grab the root element of the document
	         *
	         * @access private
	         * @returns {HTMLElement|SVGElement} The root element of the document
	         */
	
	        var docElement = document.documentElement;
	
	
	        /**
	         * A convenience helper to check if the document we are running in is an SVG document
	         *
	         * @access private
	         * @returns {boolean}
	         */
	
	        var isSVG = docElement.nodeName.toLowerCase() === 'svg';
	
	
	        /**
	         * createElement is a convenience wrapper around document.createElement. Since we
	         * use createElement all over the place, this allows for (slightly) smaller code
	         * as well as abstracting away issues with creating elements in contexts other than
	         * HTML documents (e.g. SVG documents).
	         *
	         * @access private
	         * @function createElement
	         * @returns {HTMLElement|SVGElement} An HTML or SVG element
	         */
	
	        function createElement() {
	            if (typeof document.createElement !== 'function') {
	                // This is the case in IE7, where the type of createElement is "object".
	                // For this reason, we cannot call apply() as Object is not a Function.
	                return document.createElement(arguments[0]);
	            } else if (isSVG) {
	                return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
	            } else {
	                return document.createElement.apply(document, arguments);
	            }
	        }
	
	        /*!
	         {
	         "name" : "HTML5 Audio Element",
	         "property": "audio",
	         "tags" : ["html5", "audio", "media"]
	         }
	         !*/
	        /* DOC
	         Detects the audio element
	         */
	
	        // This tests evaluates support of the audio element, as well as
	        // testing what types of content it supports.
	        //
	        // We're using the Boolean constructor here, so that we can extend the value
	        // e.g.  Modernizr.audio     // true
	        //       Modernizr.audio.ogg // 'probably'
	        //
	        // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
	        //                     thx to NielsLeenheer and zcorpan
	
	        // Note: in some older browsers, "no" was a return value instead of empty string.
	        //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
	        //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5
	        Modernizr.addTest('audio', function () {
	            /* jshint -W053 */
	            var elem = createElement('audio');
	            var bool = false;
	
	            try {
	                if (bool = !!elem.canPlayType) {
	                    bool      = new Boolean(bool);
	                    bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '');
	                    bool.mp3  = elem.canPlayType('audio/mpeg; codecs="mp3"')  .replace(/^no$/, '');
	                    bool.opus  = elem.canPlayType('audio/ogg; codecs="opus"') .replace(/^no$/, '');
	
	                    // Mimetypes accepted:
	                    //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
	                    //   bit.ly/iphoneoscodecs
	                    bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/, '');
	                    bool.m4a  = (elem.canPlayType('audio/x-m4a;')            ||
	                    elem.canPlayType('audio/aac;'))             .replace(/^no$/, '');
	                }
	            } catch (e) { }
	
	            return bool;
	        });
	
	        /*!
	         {
	         "name": "Canvas",
	         "property": "canvas",
	         "caniuse": "canvas",
	         "tags": ["canvas", "graphics"],
	         "polyfills": ["flashcanvas", "excanvas", "slcanvas", "fxcanvas"]
	         }
	         !*/
	        /* DOC
	         Detects support for the `<canvas>` element for 2D drawing.
	         */
	
	        // On the S60 and BB Storm, getContext exists, but always returns undefined
	        // so we actually have to call getContext() to verify
	        // github.com/Modernizr/Modernizr/issues/issue/97/
	        Modernizr.addTest('canvas', function () {
	            var elem = createElement('canvas');
	            return !!(elem.getContext && elem.getContext('2d'));
	        });
	
	        /*!
	         {
	         "name": "Canvas text",
	         "property": "canvastext",
	         "caniuse": "canvas-text",
	         "tags": ["canvas", "graphics"],
	         "polyfills": ["canvastext"]
	         }
	         !*/
	        /* DOC
	         Detects support for the text APIs for `<canvas>` elements.
	         */
	
	        Modernizr.addTest('canvastext',  function () {
	            if (Modernizr.canvas  === false) {
	                return false;
	            }
	            return typeof createElement('canvas').getContext('2d').fillText === 'function';
	        });
	
	        /*!
	         {
	         "name": "HTML5 Video",
	         "property": "video",
	         "caniuse": "video",
	         "tags": ["html5"],
	         "knownBugs": [
	         "Without QuickTime, `Modernizr.video.h264` will be `undefined`; http://github.com/Modernizr/Modernizr/issues/546"
	         ],
	         "polyfills": [
	         "html5media",
	         "mediaelementjs",
	         "sublimevideo",
	         "videojs",
	         "leanbackplayer",
	         "videoforeverybody"
	         ]
	         }
	         !*/
	        /* DOC
	         Detects support for the video element, as well as testing what types of content it supports.
	
	         Subproperties are provided to describe support for `ogg`, `h264` and `webm` formats, e.g.:
	
	         ```javascript
	         Modernizr.video         // true
	         Modernizr.video.ogg     // 'probably'
	         ```
	         */
	
	        // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
	        //                     thx to NielsLeenheer and zcorpan
	
	        // Note: in some older browsers, "no" was a return value instead of empty string.
	        //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
	        //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5
	
	        Modernizr.addTest('video', function () {
	            /* jshint -W053 */
	            var elem = createElement('video');
	            var bool = false;
	
	            // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
	            try {
	                if (bool = !!elem.canPlayType) {
	                    bool = new Boolean(bool);
	                    bool.ogg = elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, '');
	
	                    // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
	                    bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, '');
	
	                    bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, '');
	
	                    bool.vp9 = elem.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, '');
	
	                    bool.hls = elem.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, '');
	                }
	            } catch (e) {}
	
	            return bool;
	        });
	
	        /*!
	         {
	         "name": "Inline SVG",
	         "property": "inlinesvg",
	         "caniuse": "svg-html5",
	         "tags": ["svg"],
	         "notes": [{
	         "name": "Test page",
	         "href": "http://paulirish.com/demo/inline-svg"
	         }, {
	         "name": "Test page and results",
	         "href": "http://codepen.io/eltonmesquita/full/GgXbvo/"
	         }],
	         "polyfills": ["inline-svg-polyfill"],
	         "knownBugs": ["False negative on some Chromia browsers."]
	         }
	         !*/
	        /* DOC
	         Detects support for inline SVG in HTML (not within XHTML).
	         */
	
	        Modernizr.addTest('inlinesvg', function () {
	            var div = createElement('div');
	            div.innerHTML = '<svg/>';
	            return (typeof SVGRect !== 'undefined' && div.firstChild && div.firstChild.namespaceURI) === 'http://www.w3.org/2000/svg';
	        });
	
	
	        /**
	         * Modernizr.hasEvent() detects support for a given event
	         *
	         * @memberof Modernizr
	         * @name Modernizr.hasEvent
	         * @optionName Modernizr.hasEvent()
	         * @optionProp hasEvent
	         * @access public
	         * @function hasEvent
	         * @param  {string|*} eventName - the name of an event to test for (e.g. "resize")
	         * @param  {Element|string} [element=HTMLDivElement] - is the element|document|window|tagName to test on
	         * @returns {boolean}
	         * @example
	         *  `Modernizr.hasEvent` lets you determine if the browser supports a supplied event.
	         *  By default, it does this detection on a div element
	         *
	         * ```js
	         *  hasEvent('blur') // true;
	         * ```
	         *
	         * However, you are able to give an object as a second argument to hasEvent to
	         * detect an event on something other than a div.
	         *
	         * ```js
	         *  hasEvent('devicelight', window) // true;
	         * ```
	         *
	         */
	
	        var hasEvent = (function () {
	
	            // Detect whether event support can be detected via `in`. Test on a DOM element
	            // using the "blur" event b/c it should always exist. bit.ly/event-detection
	            var needsFallback = !('onblur' in document.documentElement);
	
	            function inner(eventName, element) {
	
	                var isSupported;
	                if (!eventName) { return false; }
	                if (!element || typeof element === 'string') {
	                    element = createElement(element || 'div');
	                }
	
	                // Testing via the `in` operator is sufficient for modern browsers and IE.
	                // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and
	                // "resize", whereas `in` "catches" those.
	                eventName = 'on' + eventName;
	                isSupported = eventName in element;
	
	                // Fallback technique for old Firefox - bit.ly/event-detection
	                if (!isSupported && needsFallback) {
	                    if (!element.setAttribute) {
	                        // Switch to generic element if it lacks `setAttribute`.
	                        // It could be the `document`, `window`, or something else.
	                        element = createElement('div');
	                    }
	
	                    element.setAttribute(eventName, '');
	                    isSupported = typeof element[eventName] === 'function';
	
	                    if (element[eventName] !== undefined) {
	                        // If property was created, "remove it" by setting value to `undefined`.
	                        element[eventName] = undefined;
	                    }
	                    element.removeAttribute(eventName);
	                }
	
	                return isSupported;
	            }
	            return inner;
	        })();
	
	
	        ModernizrProto.hasEvent = hasEvent;
	
	        /*!
	         {
	         "name": "Hashchange event",
	         "property": "hashchange",
	         "caniuse": "hashchange",
	         "tags": ["history"],
	         "notes": [{
	         "name": "MDN documentation",
	         "href": "https://developer.mozilla.org/en-US/docs/Web/API/window.onhashchange"
	         }],
	         "polyfills": [
	         "jquery-hashchange",
	         "moo-historymanager",
	         "jquery-ajaxy",
	         "hasher",
	         "shistory"
	         ]
	         }
	         !*/
	        /* DOC
	         Detects support for the `hashchange` event, fired when the current location fragment changes.
	         */
	
	        Modernizr.addTest('hashchange', function () {
	            if (hasEvent('hashchange', window) === false) {
	                return false;
	            }
	
	            // documentMode logic from YUI to filter out IE8 Compat Mode
	            //   which false positives.
	            return (document.documentMode === undefined || document.documentMode > 7);
	        });
	
	
	        /**
	         * setClasses takes an array of class names and adds them to the root element
	         *
	         * @access private
	         * @function setClasses
	         * @param {string[]} classes - Array of class names
	         */
	
	        // Pass in an and array of class names, e.g.:
	        //  ['no-webp', 'borderradius', ...]
	        function setClasses(classes) {
	            var className = docElement.className;
	            var classPrefix = Modernizr._config.classPrefix || '';
	
	            if (isSVG) {
	                className = className.baseVal;
	            }
	
	            // Change `no-js` to `js` (independently of the `enableClasses` option)
	            // Handle classPrefix on this too
	            if (Modernizr._config.enableJSClass) {
	                var reJS = new RegExp('(^|\\s)' + classPrefix + 'no-js(\\s|$)');
	                className = className.replace(reJS, '$1' + classPrefix + 'js$2');
	            }
	
	            if (Modernizr._config.enableClasses) {
	                // Add the new classes
	                className += ' ' + classPrefix + classes.join(' ' + classPrefix);
	                isSVG ? docElement.className.baseVal = className : docElement.className = className;
	            }
	
	        }
	
	        // _l tracks listeners for async tests, as well as tests that execute after the initial run
	        ModernizrProto._l = {};
	
	        /**
	         * Modernizr.on is a way to listen for the completion of async tests. Being
	         * asynchronous, they may not finish before your scripts run. As a result you
	         * will get a possibly false negative `undefined` value.
	         *
	         * @memberof Modernizr
	         * @name Modernizr.on
	         * @access public
	         * @function on
	         * @param {string} feature - String name of the feature detect
	         * @param {function} cb - Callback function returning a Boolean - true if feature is supported, false if not
	         * @example
	         *
	         * ```js
	         * Modernizr.on('flash', function ( result ) {
	   *   if (result) {
	   *    // the browser has flash
	   *   } else {
	   *     // the browser does not have flash
	   *   }
	   * });
	         * ```
	         */
	
	        ModernizrProto.on = function (feature, cb) {
	            // Create the list of listeners if it doesn't exist
	            if (!this._l[feature]) {
	                this._l[feature] = [];
	            }
	
	            // Push this test on to the listener list
	            this._l[feature].push(cb);
	
	            // If it's already been resolved, trigger it on next tick
	            if (Modernizr.hasOwnProperty(feature)) {
	                // Next Tick
	                setTimeout(function () {
	                    Modernizr._trigger(feature, Modernizr[feature]);
	                }, 0);
	            }
	        };
	
	        /**
	         * _trigger is the private function used to signal test completion and run any
	         * callbacks registered through [Modernizr.on](#modernizr-on)
	         *
	         * @memberof Modernizr
	         * @name Modernizr._trigger
	         * @access private
	         * @function _trigger
	         * @param {string} feature - string name of the feature detect
	         * @param {function|boolean} [res] - A feature detection function, or the boolean =
	         * result of a feature detection function
	         */
	
	        ModernizrProto._trigger = function (feature, res) {
	            if (!this._l[feature]) {
	                return;
	            }
	
	            var cbs = this._l[feature];
	
	            // Force async
	            setTimeout(function () {
	                var i;
	                var cb;
	                for (i = 0; i < cbs.length; i++) {
	                    cb = cbs[i];
	                    cb(res);
	                }
	            }, 0);
	
	            // Don't trigger these again
	            delete this._l[feature];
	        };
	
	        /**
	         * addTest allows you to define your own feature detects that are not currently
	         * included in Modernizr (under the covers it's the exact same code Modernizr
	         * uses for its own [feature detections](https://github.com/Modernizr/Modernizr/tree/master/feature-detects)). Just like the offical detects, the result
	         * will be added onto the Modernizr object, as well as an appropriate className set on
	         * the html element when configured to do so
	         *
	         * @memberof Modernizr
	         * @name Modernizr.addTest
	         * @optionName Modernizr.addTest()
	         * @optionProp addTest
	         * @access public
	         * @function addTest
	         * @param {string|object} feature - The string name of the feature detect, or an
	         * object of feature detect names and test
	         * @param {function|boolean} test - Function returning true if feature is supported,
	         * false if not. Otherwise a boolean representing the results of a feature detection
	         * @example
	         *
	         * The most common way of creating your own feature detects is by calling
	         * `Modernizr.addTest` with a string (preferably just lowercase, without any
	         * punctuation), and a function you want executed that will return a boolean result
	         *
	         * ```js
	         * Modernizr.addTest('itsTuesday', function () {
	   *  var d = new Date();
	   *  return d.getDay() === 2;
	   * });
	         * ```
	         *
	         * When the above is run, it will set Modernizr.itstuesday to `true` when it is tuesday,
	         * and to `false` every other day of the week. One thing to notice is that the names of
	         * feature detect functions are always lowercased when added to the Modernizr object. That
	         * means that `Modernizr.itsTuesday` will not exist, but `Modernizr.itstuesday` will.
	         *
	         *
	         *  Since we only look at the returned value from any feature detection function,
	         *  you do not need to actually use a function. For simple detections, just passing
	         *  in a statement that will return a boolean value works just fine.
	         *
	         * ```js
	         * Modernizr.addTest('hasJquery', 'jQuery' in window);
	         * ```
	         *
	         * Just like before, when the above runs `Modernizr.hasjquery` will be true if
	         * jQuery has been included on the page. Not using a function saves a small amount
	         * of overhead for the browser, as well as making your code much more readable.
	         *
	         * Finally, you also have the ability to pass in an object of feature names and
	         * their tests. This is handy if you want to add multiple detections in one go.
	         * The keys should always be a string, and the value can be either a boolean or
	         * function that returns a boolean.
	         *
	         * ```js
	         * var detects = {
	   *  'hasjquery': 'jQuery' in window,
	   *  'itstuesday': function () {
	   *    var d = new Date();
	   *    return d.getDay() === 2;
	   *  }
	   * }
	         *
	         * Modernizr.addTest(detects);
	         * ```
	         *
	         * There is really no difference between the first methods and this one, it is
	         * just a convenience to let you write more readable code.
	         */
	
	        function addTest(feature, test) {
	
	            if (typeof feature === 'object') {
	                for (var key in feature) {
	                    if (hasOwnProp(feature, key)) {
	                        addTest(key, feature[ key ]);
	                    }
	                }
	            } else {
	
	                feature = feature.toLowerCase();
	                var featureNameSplit = feature.split('.');
	                var last = Modernizr[featureNameSplit[0]];
	
	                // Again, we don't check for parent test existence. Get that right, though.
	                if (featureNameSplit.length === 2) {
	                    last = last[featureNameSplit[1]];
	                }
	
	                if (typeof last !== 'undefined') {
	                    // we're going to quit if you're trying to overwrite an existing test
	                    // if we were to allow it, we'd do this:
	                    //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
	                    //   docElement.className = docElement.className.replace( re, '' );
	                    // but, no rly, stuff 'em.
	                    return Modernizr;
	                }
	
	                test = typeof test === 'function' ? test() : test;
	
	                // Set the value (this is the magic, right here).
	                if (featureNameSplit.length === 1) {
	                    Modernizr[featureNameSplit[0]] = test;
	                } else {
	                    // cast to a Boolean, if not one already
	                    /* jshint -W053 */
	                    if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
	                        Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
	                    }
	
	                    Modernizr[featureNameSplit[0]][featureNameSplit[1]] = test;
	                }
	
	                // Set a single class (either `feature` or `no-feature`)
	                /* jshint -W041 */
	                setClasses([(!!test && test !== false ? '' : 'no-') + featureNameSplit.join('-')]);
	                /* jshint +W041 */
	
	                // Trigger the event
	                Modernizr._trigger(feature, test);
	            }
	
	            return Modernizr; // allow chaining.
	        }
	
	        // After all the tests are run, add self to the Modernizr prototype
	        Modernizr._q.push(function () {
	            ModernizrProto.addTest = addTest;
	        });
	
	
	
	        /*!
	         {
	         "name": "SVG as an <img> tag source",
	         "property": "svgasimg",
	         "caniuse" : "svg-img",
	         "tags": ["svg"],
	         "authors": ["Chris Coyier"],
	         "notes": [{
	         "name": "HTML5 Spec",
	         "href": "http://www.w3.org/TR/html5/embedded-content-0.html#the-img-element"
	         }]
	         }
	         !*/
	
	
	        // Original Async test by Stu Cox
	        // https://gist.github.com/chriscoyier/8774501
	
	        // Now a Sync test based on good results here
	        // http://codepen.io/chriscoyier/pen/bADFx
	
	        // Note http://www.w3.org/TR/SVG11/feature#Image is *supposed* to represent
	        // support for the `<image>` tag in SVG, not an SVG file linked from an `<img>`
	        // tag in HTML – but it’s a heuristic which works
	        Modernizr.addTest('svgasimg', document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1'));
	
	        /*!
	         {
	         "name": "Data URI",
	         "property": "datauri",
	         "caniuse": "datauri",
	         "tags": ["url"],
	         "builderAliases": ["url_data_uri"],
	         "async": true,
	         "notes": [{
	         "name": "Wikipedia article",
	         "href": "http://en.wikipedia.org/wiki/Data_URI_scheme"
	         }],
	         "warnings": ["Support in Internet Explorer 8 is limited to images and linked resources like CSS files, not HTML files"]
	         }
	         !*/
	        /* DOC
	         Detects support for data URIs. Provides a subproperty to report support for data URIs over 32kb in size:
	
	         ```javascript
	         Modernizr.datauri           // true
	         Modernizr.datauri.over32kb  // false in IE8
	         ```
	         */
	
	        // https://github.com/Modernizr/Modernizr/issues/14
	        Modernizr.addAsyncTest(function () {
	            /* jshint -W053 */
	
	            // IE7 throw a mixed content warning on HTTPS for this test, so we'll
	            // just blacklist it (we know it doesn't support data URIs anyway)
	            // https://github.com/Modernizr/Modernizr/issues/362
	            if (navigator.userAgent.indexOf('MSIE 7.') !== -1) {
	                // Keep the test async
	                setTimeout(function () {
	                    addTest('datauri', false);
	                }, 10);
	            }
	
	            var datauri = new Image();
	
	            datauri.onerror = function () {
	                addTest('datauri', false);
	            };
	            datauri.onload = function () {
	                if (datauri.width === 1 && datauri.height === 1) {
	                    testOver32kb();
	                }
	                else {
	                    addTest('datauri', false);
	                }
	            };
	
	            datauri.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
	
	            // Once we have datauri, let's check to see if we can use data URIs over
	            // 32kb (IE8 can't). https://github.com/Modernizr/Modernizr/issues/321
	            function testOver32kb() {
	
	                var datauriBig = new Image();
	
	                datauriBig.onerror = function () {
	                    addTest('datauri', true);
	                    Modernizr.datauri = new Boolean(true);
	                    Modernizr.datauri.over32kb = false;
	                };
	                datauriBig.onload = function () {
	                    addTest('datauri', true);
	                    Modernizr.datauri = new Boolean(true);
	                    Modernizr.datauri.over32kb = (datauriBig.width === 1 && datauriBig.height === 1);
	                };
	
	                var base64str = 'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
	                while (base64str.length < 33000) {
	                    base64str = '\r\n' + base64str;
	                }
	                datauriBig.src = 'data:image/gif;base64,' + base64str;
	            }
	
	        });
	
	
	        /**
	         * getBody returns the body of a document, or an element that can stand in for
	         * the body if a real body does not exist
	         *
	         * @access private
	         * @function getBody
	         * @returns {HTMLElement|SVGElement} Returns the real body of a document, or an
	         * artificially created element that stands in for the body
	         */
	
	        function getBody() {
	            // After page load injecting a fake body doesn't work so check if body exists
	            var body = document.body;
	
	            if (!body) {
	                // Can't use the real body create a fake one.
	                body = createElement(isSVG ? 'svg' : 'body');
	                body.fake = true;
	            }
	
	            return body;
	        }
	
	        /**
	         * injectElementWithStyles injects an element with style element and some CSS rules
	         *
	         * @access private
	         * @function injectElementWithStyles
	         * @param {string} rule - String representing a css rule
	         * @param {function} callback - A function that is used to test the injected element
	         * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
	         * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
	         * @returns {boolean}
	         */
	
	        function injectElementWithStyles(rule, callback, nodes, testnames) {
	            var mod = 'modernizr';
	            var style;
	            var ret;
	            var node;
	            var docOverflow;
	            var div = createElement('div');
	            var body = getBody();
	
	            if (parseInt(nodes, 10)) {
	                // In order not to give false positives we create a node for each test
	                // This also allows the method to scale for unspecified uses
	                while (nodes--) {
	                    node = createElement('div');
	                    node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
	                    div.appendChild(node);
	                }
	            }
	
	            style = createElement('style');
	            style.type = 'text/css';
	            style.id = 's' + mod;
	
	            // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
	            // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
	            (!body.fake ? div : body).appendChild(style);
	            body.appendChild(div);
	
	            if (style.styleSheet) {
	                style.styleSheet.cssText = rule;
	            } else {
	                style.appendChild(document.createTextNode(rule));
	            }
	            div.id = mod;
	
	            if (body.fake) {
	                // avoid crashing IE8, if background image is used
	                body.style.background = '';
	                // Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
	                body.style.overflow = 'hidden';
	                docOverflow = docElement.style.overflow;
	                docElement.style.overflow = 'hidden';
	                docElement.appendChild(body);
	            }
	
	            ret = callback(div, rule);
	            // If this is done after page load we don't want to remove the body so check if body exists
	            if (body.fake) {
	                body.parentNode.removeChild(body);
	                docElement.style.overflow = docOverflow;
	                // Trigger layout so kinetic scrolling isn't disabled in iOS6+
	                docElement.offsetHeight;
	            } else {
	                div.parentNode.removeChild(div);
	            }
	
	            return !!ret;
	
	        }
	
	        /**
	         * testStyles injects an element with style element and some CSS rules
	         *
	         * @memberof Modernizr
	         * @name Modernizr.testStyles
	         * @optionName Modernizr.testStyles()
	         * @optionProp testStyles
	         * @access public
	         * @function testStyles
	         * @param {string} rule - String representing a css rule
	         * @param {function} callback - A function that is used to test the injected element
	         * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
	         * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
	         * @returns {boolean}
	         * @example
	         *
	         * `Modernizr.testStyles` takes a CSS rule and injects it onto the current page
	         * along with (possibly multiple) DOM elements. This lets you check for features
	         * that can not be detected by simply checking the [IDL](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Interface_development_guide/IDL_interface_rules).
	         *
	         * ```js
	         * Modernizr.testStyles('#modernizr { width: 9px; color: papayawhip; }', function (elem, rule) {
	   *   // elem is the first DOM node in the page (by default #modernizr)
	   *   // rule is the first argument you supplied - the CSS rule in string form
	   *
	   *   addTest('widthworks', elem.style.width === '9px')
	   * });
	         * ```
	         *
	         * If your test requires multiple nodes, you can include a third argument
	         * indicating how many additional div elements to include on the page. The
	         * additional nodes are injected as children of the `elem` that is returned as
	         * the first argument to the callback.
	         *
	         * ```js
	         * Modernizr.testStyles('#modernizr {width: 1px}; #modernizr2 {width: 2px}', function (elem) {
	   *   document.getElementById('modernizr').style.width === '1px'; // true
	   *   document.getElementById('modernizr2').style.width === '2px'; // true
	   *   elem.firstChild === document.getElementById('modernizr2'); // true
	   * }, 1);
	         * ```
	         *
	         * By default, all of the additional elements have an ID of `modernizr[n]`, where
	         * `n` is its index (e.g. the first additional, second overall is `#modernizr2`,
	         * the second additional is `#modernizr3`, etc.).
	         * If you want to have more meaningful IDs for your function, you can provide
	         * them as the fourth argument, as an array of strings
	         *
	         * ```js
	         * Modernizr.testStyles('#foo {width: 10px}; #bar {height: 20px}', function (elem) {
	   *   elem.firstChild === document.getElementById('foo'); // true
	   *   elem.lastChild === document.getElementById('bar'); // true
	   * }, 2, ['foo', 'bar']);
	         * ```
	         *
	         */
	
	        var testStyles = ModernizrProto.testStyles = injectElementWithStyles;
	
	        /*!
	         {
	         "name": "Touch Events",
	         "property": "touchevents",
	         "caniuse" : "touch",
	         "tags": ["media", "attribute"],
	         "notes": [{
	         "name": "Touch Events spec",
	         "href": "http://www.w3.org/TR/2013/WD-touch-events-20130124/"
	         }],
	         "warnings": [
	         "Indicates if the browser supports the Touch Events spec, and does not necessarily reflect a touchscreen device"
	         ],
	         "knownBugs": [
	         "False-positive on some configurations of Nokia N900",
	         "False-positive on some BlackBerry 6.0 builds – https://github.com/Modernizr/Modernizr/issues/372#issuecomment-3112695"
	         ]
	         }
	         !*/
	        /* DOC
	         Indicates if the browser supports the W3C Touch Events API.
	
	         This *does not* necessarily reflect a touchscreen device:
	
	         * Older touchscreen devices only emulate mouse events
	         * Modern IE touch devices implement the Pointer Events API instead: use `Modernizr.pointerevents` to detect support for that
	         * Some browsers & OS setups may enable touch APIs when no touchscreen is connected
	         * Future browsers may implement other event models for touch interactions
	
	         See this article: [You Can't Detect A Touchscreen](http://www.stucox.com/blog/you-cant-detect-a-touchscreen/).
	
	         It's recommended to bind both mouse and touch/pointer events simultaneously – see [this HTML5 Rocks tutorial](http://www.html5rocks.com/en/mobile/touchandmouse/).
	
	         This test will also return `true` for Firefox 4 Multitouch support.
	         */
	
	        // Chrome (desktop) used to lie about its support on this, but that has since been rectified: http://crbug.com/36415
	        Modernizr.addTest('touchevents', function () {
	            var bool;
	            if (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch) {
	                bool = true;
	            } else {
	                var query = ['@media (', prefixes.join('touch-enabled),('), 'heartz', ')', '{#modernizr{top:9px;position:absolute}}'].join('');
	                testStyles(query, function (node) {
	                    bool = node.offsetTop === 9;
	                });
	            }
	            return bool;
	        });
	
	
	        /**
	         * If the browsers follow the spec, then they would expose vendor-specific style as:
	         *   elem.style.WebkitBorderRadius
	         * instead of something like the following, which would be technically incorrect:
	         *   elem.style.webkitBorderRadius
	
	         * Webkit ghosts their properties in lowercase but Opera & Moz do not.
	         * Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
	         *   erik.eae.net/archives/2008/03/10/21.48.10/
	
	         * More here: github.com/Modernizr/Modernizr/issues/issue/21
	         *
	         * @access private
	         * @returns {string} The string representing the vendor-specific style properties
	         */
	
	        var omPrefixes = 'Moz O ms Webkit';
	
	
	        var cssomPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : []);
	        ModernizrProto._cssomPrefixes = cssomPrefixes;
	
	
	        /**
	         * atRule returns a given CSS property at-rule (eg @keyframes), possibly in
	         * some prefixed form, or false, in the case of an unsupported rule
	         *
	         * @memberof Modernizr
	         * @name Modernizr.atRule
	         * @optionName Modernizr.atRule()
	         * @optionProp atRule
	         * @access public
	         * @function atRule
	         * @param {string} prop - String name of the @-rule to test for
	         * @returns {string|boolean} The string representing the (possibly prefixed)
	         * valid version of the @-rule, or `false` when it is unsupported.
	         * @example
	         * ```js
	         *  var keyframes = Modernizr.atRule('@keyframes');
	         *
	         *  if (keyframes) {
	   *    // keyframes are supported
	   *    // could be `@-webkit-keyframes` or `@keyframes`
	   *  } else {
	   *    // keyframes === `false`
	   *  }
	         * ```
	         *
	         */
	
	        var atRule = function (prop) {
	            var length = prefixes.length;
	            var cssrule = window.CSSRule;
	            var rule;
	
	            if (typeof cssrule === 'undefined') {
	                return undefined;
	            }
	
	            if (!prop) {
	                return false;
	            }
	
	            // remove literal @ from beginning of provided property
	            prop = prop.replace(/^@/, '');
	
	            // CSSRules use underscores instead of dashes
	            rule = prop.replace(/-/g, '_').toUpperCase() + '_RULE';
	
	            if (rule in cssrule) {
	                return '@' + prop;
	            }
	
	            for (var i = 0; i < length; i++) {
	                // prefixes gives us something like -o-, and we want O_
	                var prefix = prefixes[i];
	                var thisRule = prefix.toUpperCase() + '_' + rule;
	
	                if (thisRule in cssrule) {
	                    return '@-' + prefix.toLowerCase() + '-' + prop;
	                }
	            }
	
	            return false;
	        };
	
	        ModernizrProto.atRule = atRule;
	
	
	
	        /**
	         * List of JavaScript DOM values used for tests
	         *
	         * @memberof Modernizr
	         * @name Modernizr._domPrefixes
	         * @optionName Modernizr._domPrefixes
	         * @optionProp domPrefixes
	         * @access public
	         * @example
	         *
	         * Modernizr._domPrefixes is exactly the same as [_prefixes](#modernizr-_prefixes), but rather
	         * than kebab-case properties, all properties are their Capitalized variant
	         *
	         * ```js
	         * Modernizr._domPrefixes === [ "Moz", "O", "ms", "Webkit" ];
	         * ```
	         */
	
	        var domPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : []);
	        ModernizrProto._domPrefixes = domPrefixes;
	
	
	
	        /**
	         * contains checks to see if a string contains another string
	         *
	         * @access private
	         * @function contains
	         * @param {string} str - The string we want to check for substrings
	         * @param {string} substr - The substring we want to search the first string for
	         * @returns {boolean}
	         */
	
	        function contains(str, substr) {
	            return !!~('' + str).indexOf(substr);
	        }
	
	        /**
	         * fnBind is a super small [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) polyfill.
	         *
	         * @access private
	         * @function fnBind
	         * @param {function} fn - a function you want to change `this` reference to
	         * @param {object} that - the `this` you want to call the function with
	         * @returns {function} The wrapped version of the supplied function
	         */
	
	        function fnBind(fn, that) {
	            return function () {
	                return fn.apply(that, arguments);
	            };
	        }
	
	        /**
	         * testDOMProps is a generic DOM property test; if a browser supports
	         *   a certain property, it won't return undefined for it.
	         *
	         * @access private
	         * @function testDOMProps
	         * @param {array.<string>} props - An array of properties to test for
	         * @param {object} obj - An object or Element you want to use to test the parameters again
	         * @param {boolean|object} elem - An Element to bind the property lookup again. Use `false` to prevent the check
	         */
	        function testDOMProps(props, obj, elem) {
	            var item;
	
	            for (var i in props) {
	                if (props[i] in obj) {
	
	                    // return the property name as a string
	                    if (elem === false) {
	                        return props[i];
	                    }
	
	                    item = obj[props[i]];
	
	                    // let's bind a function
	                    if (is(item, 'function')) {
	                        // bind to obj unless overriden
	                        return fnBind(item, elem || obj);
	                    }
	
	                    // return the unbound function or obj or value
	                    return item;
	                }
	            }
	            return false;
	        }
	
	        /**
	         * Create our "modernizr" element that we do most feature tests on.
	         *
	         * @access private
	         */
	
	        var modElem = {
	            elem: createElement('modernizr')
	        };
	
	        // Clean up this element
	        Modernizr._q.push(function () {
	            delete modElem.elem;
	        });
	
	
	
	        var mStyle = {
	            style: modElem.elem.style
	        };
	
	        // kill ref for gc, must happen before mod.elem is removed, so we unshift on to
	        // the front of the queue.
	        Modernizr._q.unshift(function () {
	            delete mStyle.style;
	        });
	
	
	
	        /**
	         * domToCSS takes a camelCase string and converts it to kebab-case
	         * e.g. boxSizing -> box-sizing
	         *
	         * @access private
	         * @function domToCSS
	         * @param {string} name - String name of camelCase prop we want to convert
	         * @returns {string} The kebab-case version of the supplied name
	         */
	
	        function domToCSS(name) {
	            return name.replace(/([A-Z])/g, function (str, m1) {
	                return '-' + m1.toLowerCase();
	            }).replace(/^ms-/, '-ms-');
	        }
	
	        /**
	         * nativeTestProps allows for us to use native feature detection functionality if available.
	         * some prefixed form, or false, in the case of an unsupported rule
	         *
	         * @access private
	         * @function nativeTestProps
	         * @param {array} props - An array of property names
	         * @param {string} value - A string representing the value we want to check via @supports
	         * @returns {boolean|undefined} A boolean when @supports exists, undefined otherwise
	         */
	
	        // Accepts a list of property names and a single value
	        // Returns `undefined` if native detection not available
	        function nativeTestProps(props, value) {
	            var i = props.length;
	            // Start with the JS API: http://www.w3.org/TR/css3-conditional/#the-css-interface
	            if ('CSS' in window && 'supports' in window.CSS) {
	                // Try every prefixed variant of the property
	                while (i--) {
	                    if (window.CSS.supports(domToCSS(props[i]), value)) {
	                        return true;
	                    }
	                }
	                return false;
	            }
	            // Otherwise fall back to at-rule (for Opera 12.x)
	            else if ('CSSSupportsRule' in window) {
	                // Build a condition string for every prefixed variant
	                var conditionText = [];
	                while (i--) {
	                    conditionText.push('(' + domToCSS(props[i]) + ':' + value + ')');
	                }
	                conditionText = conditionText.join(' or ');
	                return injectElementWithStyles('@supports (' + conditionText + ') { #modernizr { position: absolute; } }', function (node) {
	                    return getComputedStyle(node, null).position === 'absolute';
	                });
	            }
	            return undefined;
	        }
	
	        // testProps is a generic CSS / DOM property test.
	
	        // In testing support for a given CSS property, it's legit to test:
	        //    `elem.style[styleName] !== undefined`
	        // If the property is supported it will return an empty string,
	        // if unsupported it will return undefined.
	
	        // We'll take advantage of this quick test and skip setting a style
	        // on our modernizr element, but instead just testing undefined vs
	        // empty string.
	
	        // Property names can be provided in either camelCase or kebab-case.
	
	        function testProps(props, prefixed, value, skipValueTest) {
	            skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest;
	
	            // Try native detect first
	            if (!is(value, 'undefined')) {
	                var result = nativeTestProps(props, value);
	                if (!is(result, 'undefined')) {
	                    return result;
	                }
	            }
	
	            // Otherwise do it properly
	            var afterInit;
	            var i;
	            var propsLength;
	            var prop;
	            var before;
	
	            // If we don't have a style element, that means we're running async or after
	            // the core tests, so we'll need to create our own elements to use
	
	            // inside of an SVG element, in certain browsers, the `style` element is only
	            // defined for valid tags. Therefore, if `modernizr` does not have one, we
	            // fall back to a less used element and hope for the best.
	            var elems = ['modernizr', 'tspan'];
	            while (!mStyle.style) {
	                afterInit = true;
	                mStyle.modElem = createElement(elems.shift());
	                mStyle.style = mStyle.modElem.style;
	            }
	
	            // Delete the objects if we created them.
	            function cleanElems() {
	                if (afterInit) {
	                    delete mStyle.style;
	                    delete mStyle.modElem;
	                }
	            }
	
	            propsLength = props.length;
	            for (i = 0; i < propsLength; i++) {
	                prop = props[i];
	                before = mStyle.style[prop];
	
	                if (contains(prop, '-')) {
	                    prop = cssToDOM(prop);
	                }
	
	                if (mStyle.style[prop] !== undefined) {
	
	                    // If value to test has been passed in, do a set-and-check test.
	                    // 0 (integer) is a valid property value, so check that `value` isn't
	                    // undefined, rather than just checking it's truthy.
	                    if (!skipValueTest && !is(value, 'undefined')) {
	
	                        // Needs a try catch block because of old IE. This is slow, but will
	                        // be avoided in most cases because `skipValueTest` will be used.
	                        try {
	                            mStyle.style[prop] = value;
	                        } catch (e) {}
	
	                        // If the property value has changed, we assume the value used is
	                        // supported. If `value` is empty string, it'll fail here (because
	                        // it hasn't changed), which matches how browsers have implemented
	                        // CSS.supports()
	                        if (mStyle.style[prop] !== before) {
	                            cleanElems();
	                            return prefixed === 'pfx' ? prop : true;
	                        }
	                    }
	                    // Otherwise just return true, or the property name if this is a
	                    // `prefixed()` call
	                    else {
	                        cleanElems();
	                        return prefixed === 'pfx' ? prop : true;
	                    }
	                }
	            }
	            cleanElems();
	            return false;
	        }
	
	        /**
	         * testPropsAll tests a list of DOM properties we want to check against.
	         * We specify literally ALL possible (known and/or likely) properties on
	         * the element including the non-vendor prefixed one, for forward-
	         * compatibility.
	         *
	         * @access private
	         * @function testPropsAll
	         * @param {string} prop - A string of the property to test for
	         * @param {string|object} [prefixed] - An object to check the prefixed properties on. Use a string to skip
	         * @param {HTMLElement|SVGElement} [elem] - An element used to test the property and value against
	         * @param {string} [value] - A string of a css value
	         * @param {boolean} [skipValueTest] - An boolean representing if you want to test if value sticks when set
	         */
	        function testPropsAll(prop, prefixed, elem, value, skipValueTest) {
	
	            var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1);
	            var props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');
	
	            // did they call .prefixed('boxSizing') or are we just testing a prop?
	            if (is(prefixed, 'string') || is(prefixed, 'undefined')) {
	                return testProps(props, prefixed, value, skipValueTest);
	
	                // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
	            } else {
	                props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
	                return testDOMProps(props, prefixed, elem);
	            }
	        }
	
	        // Modernizr.testAllProps() investigates whether a given style property,
	        // or any of its vendor-prefixed variants, is recognized
	        //
	        // Note that the property names must be provided in the camelCase variant.
	        // Modernizr.testAllProps('boxSizing')
	        ModernizrProto.testAllProps = testPropsAll;
	
	        /**
	         * testAllProps determines whether a given CSS property is supported in the browser
	         *
	         * @memberof Modernizr
	         * @name Modernizr.testAllProps
	         * @optionName Modernizr.testAllProps()
	         * @optionProp testAllProps
	         * @access public
	         * @function testAllProps
	         * @param {string} prop - String naming the property to test (either camelCase or kebab-case)
	         * @param {string} [value] - String of the value to test
	         * @param {boolean} [skipValueTest=false] - Whether to skip testing that the value is supported when using non-native detection
	         * @example
	         *
	         * testAllProps determines whether a given CSS property, in some prefixed form,
	         * is supported by the browser.
	         *
	         * ```js
	         * testAllProps('boxSizing')  // true
	         * ```
	         *
	         * It can optionally be given a CSS value in string form to test if a property
	         * value is valid
	         *
	         * ```js
	         * testAllProps('display', 'block') // true
	         * testAllProps('display', 'penguin') // false
	         * ```
	         *
	         * A boolean can be passed as a third parameter to skip the value check when
	         * native detection (@supports) isn't available.
	         *
	         * ```js
	         * testAllProps('shapeOutside', 'content-box', true);
	         * ```
	         */
	
	        function testAllProps(prop, value, skipValueTest) {
	            return testPropsAll(prop, undefined, undefined, value, skipValueTest);
	        }
	        ModernizrProto.testAllProps = testAllProps;
	
	        /*!
	         {
	         "name": "CSS Transforms",
	         "property": "csstransforms",
	         "caniuse": "transforms2d",
	         "tags": ["css"]
	         }
	         !*/
	
	        Modernizr.addTest('csstransforms', function () {
	            // Android < 3.0 is buggy, so we sniff and blacklist
	            // http://git.io/hHzL7w
	            return navigator.userAgent.indexOf('Android 2.') === -1 &&
	                testAllProps('transform', 'scale(1)', true);
	        });
	
	
	        /**
	         * prefixed returns the prefixed or nonprefixed property name variant of your input
	         *
	         * @memberof Modernizr
	         * @name Modernizr.prefixed
	         * @optionName Modernizr.prefixed()
	         * @optionProp prefixed
	         * @access public
	         * @function prefixed
	         * @param {string} prop - String name of the property to test for
	         * @param {object} [obj] - An object to test for the prefixed properties on
	         * @param {HTMLElement} [elem] - An element used to test specific properties against
	         * @returns {string|false} The string representing the (possibly prefixed) valid
	         * version of the property, or `false` when it is unsupported.
	         * @example
	         *
	         * Modernizr.prefixed takes a string css value in the DOM style camelCase (as
	         * opposed to the css style kebab-case) form and returns the (possibly prefixed)
	         * version of that property that the browser actually supports.
	         *
	         * For example, in older Firefox...
	         * ```js
	         * prefixed('boxSizing')
	         * ```
	         * returns 'MozBoxSizing'
	         *
	         * In newer Firefox, as well as any other browser that support the unprefixed
	         * version would simply return `boxSizing`. Any browser that does not support
	         * the property at all, it will return `false`.
	         *
	         * By default, prefixed is checked against a DOM element. If you want to check
	         * for a property on another object, just pass it as a second argument
	         *
	         * ```js
	         * var rAF = prefixed('requestAnimationFrame', window);
	         *
	         * raf(function () {
	   *  renderFunction();
	   * })
	         * ```
	         *
	         * Note that this will return _the actual function_ - not the name of the function.
	         * If you need the actual name of the property, pass in `false` as a third argument
	         *
	         * ```js
	         * var rAFProp = prefixed('requestAnimationFrame', window, false);
	         *
	         * rafProp === 'WebkitRequestAnimationFrame' // in older webkit
	         * ```
	         *
	         * One common use case for prefixed is if you're trying to determine which transition
	         * end event to bind to, you might do something like...
	         * ```js
	         * var transEndEventNames = {
	   *     'WebkitTransition' : 'webkitTransitionEnd', * Saf 6, Android Browser
	   *     'MozTransition'    : 'transitionend',       * only for FF < 15
	   *     'transition'       : 'transitionend'        * IE10, Opera, Chrome, FF 15+, Saf 7+
	   * };
	         *
	         * var transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];
	         * ```
	         *
	         * If you want a similar lookup, but in kebab-case, you can use [prefixedCSS](#modernizr-prefixedcss).
	         */
	
	        var prefixed = ModernizrProto.prefixed = function (prop, obj, elem) {
	            if (prop.indexOf('@') === 0) {
	                return atRule(prop);
	            }
	
	            if (prop.indexOf('-') !== -1) {
	                // Convert kebab-case to camelCase
	                prop = cssToDOM(prop);
	            }
	            if (!obj) {
	                return testPropsAll(prop, 'pfx');
	            } else {
	                // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
	                return testPropsAll(prop, obj, elem);
	            }
	        };
	
	
	        /*!
	         {
	         "name": "Blob URLs",
	         "property": "bloburls",
	         "caniuse": "bloburls",
	         "notes": [{
	         "name": "W3C Working Draft",
	         "href": "http://www.w3.org/TR/FileAPI/#creating-revoking"
	         }],
	         "tags": ["file", "url"],
	         "authors": ["Ron Waldon (@jokeyrhyme)"]
	         }
	         !*/
	        /* DOC
	         Detects support for creating Blob URLs
	         */
	
	        var url = prefixed('URL', window, false);
	        url = url && window[url];
	        Modernizr.addTest('bloburls', url && 'revokeObjectURL' in url && 'createObjectURL' in url);
	
	
	        // Run each test
	        testRunner();
	
	        delete ModernizrProto.addTest;
	        delete ModernizrProto.addAsyncTest;
	
	        // Run the things that are supposed to run after the tests
	        for (var i = 0; i < Modernizr._q.length; i++) {
	            Modernizr._q[i]();
	        }
	
	        // Leak Modernizr namespace
	        window.Modernizr = Modernizr;
	
	    })(window, document);
	
	    /* jshint -W074 */
	    /* jshint -W073 */
	    /* jshint -W071 */
	
	    app.support = window.Modernizr;
	
	    logger.info({
	        message: 'browser tested by Modernizr'
	        // method: 'none'
	    });
	
	    return window.app;
	
	}, __webpack_require__(201));


/***/ }

/******/ });
//# sourceMappingURL=init.bundle.js.map