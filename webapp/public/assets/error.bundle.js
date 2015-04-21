webpackJsonp([4],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
	 * Sources at https://github.com/Memba
	 */

	/* jshint browser: true, jquery: true */
	/* globals require: false */

	(function ($, undefined) {

	    'use strict';

	    var app = window.app = window.app || {},
	        LOCALE = app.locale && $.isFunction(app.locale.getValue) ? app.locale.getValue() : 'en';

	    __webpack_require__(8);
	    __webpack_require__(2);

	    /**
	     * Logs a message
	     * @param message
	     */
	    function log(message) {
	        if (app.DEBUG && window.console && ($.isFunction(window.console.log))) {
	            window.console.log('app.error: ' + message);
	        }
	    }

	    /**
	     * Wait until document is ready to initialize UI
	     */
	    $(document).ready(function () {
	        $(document).on('locale.loaded', function() {
	            log('Error page initialized in ' + LOCALE);
	        });
	    });

	}(window.jQuery));


/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(23)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./app.page.error.less", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./app.page.error.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(79)();
	exports.push([module.id, "/**\n * Variables\n */\n/**\n * Bootstrap mixins\n * TODO: will be deprecated in v4 - See https://github.com/passy/autoprefixer-loader\n */\n/**\n * Custom mixins\n */\n.toolbar {\n  position: absolute;\n  top: 50px;\n  width: 100%;\n  border-left: none;\n  border-right: none;\n}\n.toolbar label {\n  font-weight: normal;\n}\n.splitter {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: auto;\n  border: none;\n  top: 50px;\n  bottom: 44px;\n}\n.wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: auto;\n  border: none;\n  top: 50px;\n  bottom: 44px;\n  overflow-y: scroll;\n}\n/*********************************************\n * Error page\n ********************************************/\n/*********************************************\n * Printing\n ********************************************/\n", ""]);

/***/ }

});