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
/******/ 	__webpack_require__.p = "/assets/";

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

	/* jshint browser: true, jquery: true */
	/* globals require: false */

	__webpack_require__(3);
	__webpack_require__(1);


/***/ },

/***/ 1:
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

	}, __webpack_require__(21));


/***/ },

/***/ 3:
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
	         * Log a message
	         * @param message
	         */
	        function log(message) {
	            if (app.DEBUG && window.console && (typeof window.console.log === 'function')) {
	                window.console.log('app.config: ' + message);
	            }
	        }

	        /**
	         * Get formatting strings for Kendo UI from nodejs
	         * where %s placeholders are replaced with {i} placeholders
	         */
	        function format(value) {
	            if (app.DEBUG && (value.match(/%s/g) || []).length > 5) {
	                var msg = 'value has too many %s to format';
	                log(msg); throw new Error(msg);
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
	                home: format('/'),
	                page: format('/%s/%s'),
	                blog: format('/%s/posts/%s/%s/%s/%s')
	            }
	        };

	    }());

	    return window.app.uris;

	}, __webpack_require__(21));


/***/ },

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }

/******/ });