/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:3000/assets/";

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

	__webpack_require__(131);
	__webpack_require__(133);
	__webpack_require__(135);


/***/ },

/***/ 131:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
	 * Sources at https://github.com/Memba
	 */

	/* jshint browser: true */
	/* globals define: false */

	(function(f, define){
	    'use strict';
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function(){

	    'use strict';

	    /**
	     * Note: This file is built with webpack using ./web_modules/jsx-loader.
	     * Values are read from any of the JSON config files in ./webapp/config
	     * depending on NODE_ENV: development, test or production (by default).
	     */

	    (function () {

	        var app = window.app = window.app || {};

	        /**
	         * application DEBUG mode
	         * @type {boolean}
	         */
	        app.DEBUG = 'true'.toLowerCase() === 'true';

	        /**
	         * Logger token
	         */
	        app.logger = { token: 'e78bac0b-377a-49e2-ad91-20bb4ec7cedc' };

	        /**
	         * Get formatting strings for Kendo UI from nodejs
	         * where %s placeholders are replaced with {i} placeholders
	         */
	        function format(value) {
	            if ((value.match(/%s/g) || []).length > 5) {
	                throw new Error('app.config value has too many %s to format');
	            }
	            return value.replace(/%s/, '{0}').replace(/%s/, '{1}').replace(/%s/, '{2}').replace(/%s/, '{3}').replace(/%s/, '{4}');
	        }

	        /**
	         * Application URIs
	         * See /wepapp/middleware/locals.js
	         */
	        app.uris = {
	            cdn: {
	                default: 'https://d2rvsmwqptocm.cloudfront.net' + format('/images/%s'),
	                svg: {
	                    office: 'https://d2rvsmwqptocm.cloudfront.net' + format('/images/o_collection/svg/office/%s.svg'),
	                    white: 'https://d2rvsmwqptocm.cloudfront.net' + format('/images/o_collection/svg/white/%s.svg'),
	                    dark_grey: 'https://d2rvsmwqptocm.cloudfront.net' + format('/images/o_collection/svg/dark_grey/%s.svg')
	                }
	            },
	            webapp: {
	                home: 'http://localhost:3000' + format('/'),
	                feed:  'http://localhost:3000' + format('/%s/index.rss'),
	                sitemap:  'http://localhost:3000' + format('/%s/sitemap.xml'),
	                pages:  'http://localhost:3000' + format('/%s/%s'),
	                posts:  'http://localhost:3000' + format('/%s/posts/%s/%s/%s')
	            }
	        };

	    }());

	    return window.app.uris;

	}, __webpack_require__(132));


/***/ },

/***/ 132:
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },

/***/ 133:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
	 * Sources at https://github.com/Memba
	 */

	/* jshint browser: true */
	/* globals define: false */

	(function(f, define){
	    'use strict';
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(134)], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function(LE) {

	    'use strict';

	    (function () {

	        var app = window.app = window.app || {},
	            logger = app.logger = app.logger || {};

	        // Intialize LogEntries
	        // see https://logentries.com/doc/javascript/
	        // see https://github.com/logentries/le_js
	        LE.init({
	            token: app.logger.token,
	            ssl: true,
	            catchall: true,
	            trace: false, //not as good as our sessionId
	            page_info: 'per-entry',
	            print: typeof app.DEBUG === 'undefined' ? false : app.DEBUG
	        });

	        logger.info = LE.info;
	        logger.warning = LE.warn;
	        logger.error = LE.error;
	        //critical?

	    }());

	    return window.app.logger;

	}, __webpack_require__(132));


/***/ },

/***/ 134:
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
	}(this, function(window) {
	    "use strict";

	    /**
	     * A single log event stream.
	     * @constructor
	     * @param {Object} options
	     */
	    function LogStream(options) {
	        /**
	         * @const
	         * @type {string} */
	        var _traceCode = (Math.random() + Math.PI).toString(36).substring(2, 10);
	        /** @type {boolean} */
	        var _doTrace = options.trace;
	        /** @type {string} */
	        var _pageInfo = options.page_info;
	        /** @type {string} */
	        var _token = options.token;
	        /** @type {boolean} */
	        var _print = options.print;
	        /**
	         * @type {string} */
	        var _endpoint;
	        if (window.LEENDPOINT) {
	            _endpoint = window.LEENDPOINT;
	        } else {
	            _endpoint = "js.logentries.com/v1";
	        }

	        /**
	         * Flag to prevent further invocations on network err
	         ** @type {boolean} */
	        var _shouldCall = true;
	        /** @type {boolean} */
	        var _SSL = function() {
	            if (typeof XDomainRequest === "undefined") {
	                return options.ssl;
	            }
	            // If we're relying on XDomainRequest, we
	            // must adhere to the page's encryption scheme.
	            return window.location.protocol === "https:" ? true : false;
	        }();
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

	            // Add trace code if required
	            if (_doTrace) {
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

	                          // cross-browser indexOf fix
	                          var _indexOf = function(array, obj) {
	                            for (var i = 0; i < array.length; i++) {
	                              if (obj === array[i]) {
	                                return i;
	                              }
	                            }
	                            return -1;
	                          };
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

	            // Obtain a browser-specific XHR object
	            var _getAjaxObject = function() {
	              if (typeof XDomainRequest !== "undefined") {
	                // We're using IE8/9
	                return new XDomainRequest();
	              }
	              return new XMLHttpRequest();
	            };

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

	                var uri = (_SSL ? "https://" : "http://") + _endpoint + "/logs/" + _token;
	                request.open("POST", uri, true);
	                if (request.constructor === XMLHttpRequest) {
	                    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	                    request.setRequestHeader('Content-type', 'text/json');
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

/***/ 135:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
	 * Sources at https://github.com/Memba
	 */

	/* jshint browser: true, jquery: true */
	/* globals define: false */

	(function(f, define){
	    'use strict';
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function(){

	    'use strict';

	    (function () {

	        var app = window.app = window.app || {};

	        /**
	         * Log a message
	         * @param message
	         */
	        function log(message) {
	            if (app.DEBUG && window.console && (typeof window.console.log === 'function')) {
	                window.console.log('app.support: ' + message);
	            }
	        }

	        /**
	         * Test features/application requirements
	         */
	        app.support = {
	            _test: function () {

	                /**
	                 * CSS transforms support
	                 */
	                app.support.cssTransforms = (function () {
	                    return false; //TODO
	                }());

	                //TODO web workers

	                /**
	                 * drag and drop support (see Modernizr)
	                 */
	                app.support.dragAndDrop = (function () {
	                    var element = document.createElement('div');
	                    return ('draggable' in element) || ('ondragstart' in element && 'ondrop' in element);
	                }());

	                /**
	                 * hashchange support
	                 */
	                app.support.hashChange = (function () {
	                    return ('onhashchange' in window);
	                }());
	                //

	                /**
	                 * localStorage support (from Modernizr)
	                 */
	                app.support.localStorage = (function () {
	                    var TEST = '__test__';
	                    try {
	                        localStorage.setItem(TEST, TEST);
	                        localStorage.removeItem(TEST);
	                        return true;
	                    } catch (e) {
	                        return false;
	                    }
	                }());

	                /**
	                 * Canvas support (frm Modernizr)
	                 */
	                app.support.canvas = (function () {
	                    var elem = document.createElement('canvas');
	                    return !!(elem.getContext && elem.getContext('2d'));
	                }());

	                /**
	                 * SVG support (from Modernizr)
	                 */
	                app.support.svg = (function () {
	                    return !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
	                }());

	                //TODO: audio and video
	            }
	        };

	        /**
	         * Launch browser test
	         */
	        app.support._test();
	        log('browser tested');

	        //TODO: Test Minimum requirements and display error message if requirements are not met

	    }());

	    return window.app.support;

	}, __webpack_require__(132));


/***/ }

/******/ });