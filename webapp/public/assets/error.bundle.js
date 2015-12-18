webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
	 * Sources at https://github.com/Memba
	 */
	
	/* jshint browser: true, jquery: true */
	/* globals define: false, require: false */
	
	'use strict';
	
	if (true) {
	    // Load styles
	    __webpack_require__(196);
	}
	
	(function (f, define) {
	    // 'use strict';
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(200),
	        __webpack_require__(202),
	        __webpack_require__(203),
	        __webpack_require__(216) // <----- errors have no menu in case the error comes from the menu
	    ], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function () {
	
	    // 'use strict';
	
	    (function ($, undefined) {
	
	        var app = window.app;
	        var logger = new window.Logger('app.error');
	        var i18n = app.i18n;
	
	        /**
	         * Wait for document to be ready to initialize UI
	         * Note: no need to use the i18n.loaded event here
	         */
	        $(document).ready(function () {
	
	            // Add click handler on back button
	            $('#back-button').click(function () {
	                window.history.back();
	            });
	
	            // Log page readiness
	            logger.info({
	                message: 'error page initialized in ' + i18n.locale(),
	                method: '$(document).ready'
	            });
	
	        });
	
	    }(window.jQuery));
	
	    return window.app;
	
	}, __webpack_require__(201));


/***/ },

/***/ 196:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(197);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(199)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./app.page.error.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./app.page.error.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 197:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(198)();
	// imports
	
	
	// module
	exports.push([module.id, "/**\n * Variables\n */\n/**\n * Bootstrap mixins\n * TODO: will be deprecated in v4 - See https://github.com/passy/autoprefixer-loader\n */\n/**\n * Custom mixins\n */\n.toolbar {\n  position: absolute;\n  top: 50px;\n  width: 100%;\n  border-left: none;\n  border-right: none;\n}\n.toolbar label {\n  font-weight: normal;\n}\n.splitter {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: auto;\n  border: none;\n  top: 50px;\n  bottom: 44px;\n}\n.wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: auto;\n  border: none;\n  top: 50px;\n  bottom: 44px;\n  overflow-y: scroll;\n}\n/*********************************************\n * Error page\n ********************************************/\n#error-wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: auto;\n  border: none;\n  top: 50px;\n  bottom: 44px;\n  overflow-y: scroll;\n}\n/*********************************************\n * Printing\n ********************************************/\n@media print {\n  #error-wrapper {\n    position: relative;\n    top: 0px;\n    overflow: visible;\n  }\n  #error-wrapper .container {\n    width: auto;\n  }\n}\n", ""]);
	
	// exports


/***/ }

});
//# sourceMappingURL=error.bundle.js.map