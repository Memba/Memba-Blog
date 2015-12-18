webpackJsonp([19],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
	 * Sources at https://github.com/Memba
	 */
	
	/* jshint browser: true, jquery: true */
	/* globals define: false, require: false */
	
	__webpack_require__(515);
	
	(function (f, define) {
	    'use strict';
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(200),
	        __webpack_require__(202),
	        __webpack_require__(204),
	        __webpack_require__(203),
	        __webpack_require__(216),
	        __webpack_require__(520)
	    ], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function () {
	
	    'use strict';
	
	    (function ($, undefined) {
	
	        var app = window.app;
	        var logger = new window.Logger('app.home');
	        var i18n = app.i18n;
	
	        $(document).ready(function () {
	
	            // Log page readiness
	            logger.info({
	                message: 'home page initialized in ' + i18n.locale(),
	                method: '$(document).ready'
	            });
	
	        });
	
	    }(window.jQuery));
	
	    return window.app;
	
	}, __webpack_require__(201));


/***/ },

/***/ 515:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(516);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(199)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./app.page.home.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./app.page.home.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 516:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(198)();
	// imports
	
	
	// module
	exports.push([module.id, "/**\n * Variables\n */\n/**\n * Bootstrap mixins\n * TODO: will be deprecated in v4 - See https://github.com/passy/autoprefixer-loader\n */\n/**\n * Custom mixins\n */\n.toolbar {\n  position: absolute;\n  top: 50px;\n  width: 100%;\n  border-left: none;\n  border-right: none;\n}\n.toolbar label {\n  font-weight: normal;\n}\n.splitter {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: auto;\n  border: none;\n  top: 50px;\n  bottom: 44px;\n}\n.wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: auto;\n  border: none;\n  top: 50px;\n  bottom: 44px;\n  overflow-y: scroll;\n}\n/*********************************************\n * Site page\n ********************************************/\n#home-wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: auto;\n  border: none;\n  top: 50px;\n  bottom: 44px;\n  overflow-y: scroll;\n}\n#home-wrapper .jumbotron {\n  background: url(" + __webpack_require__(517) + ") no-repeat center center;\n  background-size: cover;\n  height: 60%;\n  margin-bottom: 4vh;\n}\n#home-wrapper .jumbotron h1 {\n  color: #FFFFFF;\n  width: 60%;\n  top: 30%;\n  right: 5%;\n  position: absolute;\n  font-size: 7vmin;\n  text-shadow: 0 0 2vmin #333333;\n}\n#home-wrapper .container .col-xs-6 {\n  text-align: center;\n}\n#home-wrapper .container .col-xs-6 .flag {\n  height: 15vh;\n  width: 15vh;\n  border-radius: 50%;\n  margin: 0 auto;\n}\n#home-wrapper .container .col-xs-6 .uk {\n  background: url(" + __webpack_require__(518) + ") no-repeat center center;\n  background-size: 15.2vh 15.2vh;\n}\n#home-wrapper .container .col-xs-6 .fr {\n  background: url(" + __webpack_require__(519) + ") no-repeat center center;\n  background-size: 15.2vh 15.2vh;\n}\n#home-wrapper .container .col-xs-6 h2 {\n  font-weight: normal;\n  font-size: 4vh;\n  line-height: 1em;\n  margin-top: 2vh;\n  margin-bottom: 1vh;\n}\n#home-wrapper .container .col-xs-6 p {\n  font-size: 2vh;\n  margin: 0 10px;\n  line-height: 1.2em;\n}\n/*********************************************\n * Printing\n ********************************************/\n@media print {\n  #page-wrapper {\n    position: relative;\n    top: 0px;\n    overflow: visible;\n  }\n  #page-wrapper .container {\n    width: auto;\n  }\n}\n", ""]);
	
	// exports


/***/ },

/***/ 517:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "9e0bdff4970e28b99fd7c45d700c20fa.jpg";

/***/ },

/***/ 518:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "cdfd82cd7caa66cfe027d1702b434bd9.png";

/***/ },

/***/ 519:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "cbb99b5861be0813c86d8b564e49a468.png";

/***/ },

/***/ 520:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
	 * Sources at https://github.com/Memba
	 */
	
	/* jshint browser: true, jquery: true */
	/* globals define: false, require: false */
	
	// Bootstrap menus
	__webpack_require__(256);
	
	(function (f, define) {
	    'use strict';
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(503),
	        __webpack_require__(200),
	        __webpack_require__(202),
	        __webpack_require__(204),
	        __webpack_require__(203)
	    ], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function () {
	
	    'use strict';
	
	    (function ($, undefined) {
	
	        var kendo = window.kendo;
	        var app = window.app;
	        var logger = new window.Logger('app.menu');
	        var i18n = app.i18n;
	        var BLUR = 'blur';
	        var FOCUS = 'focus';
	        var KEYPRESS = 'keypress';
	        var searchInputWidth;
	
	        /**
	         * Event handler triggered when the search input loses focus
	         * @param e
	         */
	        function onSearchInputBlur(e) {
	            $(e.currentTarget).width(searchInputWidth);
	        }
	
	        /**
	         * Event handler triggered when the search input gets focus
	         * @param e
	         */
	        function onSearchInputFocus(e) {
	            $(e.currentTarget).width(400);
	        }
	
	        /**
	         * Event handler triggered when pressing any key when the search input has focus
	         * @param e
	         */
	        function onSearchInputKeyPress(e) {
	            if (e.which === kendo.keys.ENTER || e.keyCode === kendo.keys.ENTER) {
	                window.location.href = kendo.format(app.uris.webapp.pages, i18n.locale()) +
	                    '?q=' + encodeURIComponent($(e.currentTarget).val());
	                return false; // Prevent a form submission
	            } else {
	                return true; // Accept any other character
	            }
	        }
	
	        /**
	         * Initialization code to execute when document is ready
	         */
	        $(document).ready(function () {
	            var searchInput =  $('#navbar-search-input');
	            searchInputWidth = searchInput.width();
	
	            // Search input event handlers
	            searchInput
	                .on(BLUR, onSearchInputBlur)
	                .on(FOCUS, onSearchInputFocus)
	                .on(KEYPRESS, onSearchInputKeyPress);
	
	            // Log page readiness
	            logger.info({
	                message: 'Menu initialized in ' + i18n.locale(),
	                method: '$(document).ready'
	            });
	        });
	
	    }(window.jQuery));
	
	    return window.app;
	
	}, __webpack_require__(201));


/***/ }

});
//# sourceMappingURL=home.bundle.js.map