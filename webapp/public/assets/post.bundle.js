webpackJsonp([22],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
	 * Sources at https://github.com/Memba
	 */
	
	/* jshint browser: true, jquery: true */
	/* globals define: false, require: false */
	
	__webpack_require__(525);
	
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
	
	        var kendo = window.kendo;
	        var app = window.app;
	        var assert = window.assert;
	        var logger = new window.Logger('app.post');
	        var i18n = app.i18n;
	        var CLICK = 'click';
	        var POST_WRAPPER_SELECTOR = '#post-wrapper';
	        var SOCIAL_SELECTOR = '.social';
	        var COMMAND = {
	            FACEBOOK: 'facebook',
	            GOOGLE: 'google',
	            LINKEDIN: 'linkedin',
	            PINTEREST: 'pinterest',
	            TWITTER: 'twitter',
	            EMAIL: 'email'
	        };
	
	        /**
	         * Initialize social buttons
	         * @see http://www.sharelinkgenerator.com/
	         * Also check Kidoju.WebApp -> app.summary.js
	         */
	        function initSocialButtons() {
	
	            /* This function's cyclomatic complexity is too high. */
	            /* jshint -W074 */
	
	            $(POST_WRAPPER_SELECTOR).find(SOCIAL_SELECTOR)
	                .on(CLICK, function (e) {
	                    assert.instanceof($.Event, e, kendo.format(assert.messages.instanceof.default, 'e', 'default'));
	                    assert.instanceof(window.HTMLAnchorElement, e.currentTarget, kendo.format(assert.messages.instanceof.default, 'e.currentTarget', 'window.HTMLAnchorElement'));
	                    var sharedUrl = window.encodeURIComponent($('meta[property="og:url"]').attr('content'));
	                    var source = window.encodeURIComponent($('meta[property="og:site_name"]').attr('content'));
	                    var title = window.encodeURIComponent($('meta[property="og:title"]').attr('content'));
	                    var description = window.encodeURIComponent($('meta[property="og:description"]').attr('content'));
	                    var image = window.encodeURIComponent($('meta[property="og:image"]').attr('content'));
	                    var command = $(e.currentTarget).attr(kendo.attr('command'));
	                    var openUrl;
	                    switch (command) {
	                        case COMMAND.FACEBOOK:
	                            // Facebook share dialog
	                            // @ see https://developers.facebook.com/docs/sharing/web
	                            // @ see https://developers.facebook.com/docs/sharing/reference/share-dialog
	                            // @ see https://developers.facebook.com/docs/sharing/best-practices
	                            // @see https://developers.facebook.com/tools/debug/ <---------------- DEBUG
	                            openUrl = 'https://www.facebook.com/dialog/share' +
	                                '?display=popup' +
	                                '&app_id=' + app.facebook.clientID +
	                                '&href=' + sharedUrl +
	                                '&redirect_uri=' + sharedUrl;
	                            /*
	                            openUrl = 'https://www.facebook.com/sharer/sharer.php' +
	                                '?u=' + sharedUrl;
	                            */
	                            break;
	                        case COMMAND.GOOGLE:
	                            // @see https://developers.google.com/+/web/share/
	                            openUrl = 'https://plus.google.com/share' +
	                                '?url=' + sharedUrl +
	                                '&hl=' + i18n.locale();
	                            break;
	                        case COMMAND.LINKEDIN:
	                            // @see https://developer.linkedin.com/docs/share-on-linkedin
	                            // Note Linkedin uses open graph meta tags
	                            openUrl = 'https://www.linkedin.com/shareArticle' +
	                                '?mini=true' +
	                                '&source=' + source +
	                                '&summary=' + description +
	                                '&title=' + title +
	                                '&url=' + sharedUrl;
	
	                            break;
	                        case COMMAND.PINTEREST:
	                            // @see https://developers.pinterest.com/docs/widgets/pin-it/
	                            openUrl = 'https://pinterest.com/pin/create/button/' +
	                                '?url=' + sharedUrl +
	                                '&media=' + image +
	                                '&description=' + description;
	                            break;
	                        case COMMAND.TWITTER:
	                            // Twitter web intent
	                            // @ see https://dev.twitter.com/web/tweet-button/web-intent
	                            openUrl = 'https://twitter.com/intent/tweet' +
	                                '?text=' + title +
	                                '&url=' + sharedUrl +
	                                '&via=' + app.twitter.account;
	                            // TODO: hashtags (message size limit)?
	                            break;
	                        case COMMAND.EMAIL:
	                            // TODO add icon in summary.ejs
	                            openUrl = 'mailto:fastlec@memba.org?&subject=Shared Link&body=Hey%20loojk%20at%20that';
	                            break;
	                    }
	                    if (socialWindow === null || socialWindow.closed || socialUrl !== openUrl) {
	                        // Most social share dialogs resize themselves from a smaller window (not from a larger one)
	                        // We might improve
	                        socialWindow = window.open(openUrl, 'social', 'toolbar=0,height=450,width=600');
	                    }
	                    socialUrl = openUrl;
	                    socialWindow.focus();
	                });
	
	            /* jshint +W074 */
	        }
	        var socialWindow = null;
	        var socialUrl;
	
	        $(document).ready(function () {
	
	            initSocialButtons();
	
	            // Log page readiness
	            logger.info({
	                message: 'post page initialized in ' + i18n.locale(),
	                method: '$(document).ready'
	            });
	
	        });
	
	    }(window.jQuery));
	
	    return window.app;
	
	}, __webpack_require__(201));


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


/***/ },

/***/ 525:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(526);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(199)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./app.page.post.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./app.page.post.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 526:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(198)();
	// imports
	
	
	// module
	exports.push([module.id, "/**\n * Variables\n */\n/**\n * Bootstrap mixins\n * TODO: will be deprecated in v4 - See https://github.com/passy/autoprefixer-loader\n */\n/**\n * Custom mixins\n */\n.toolbar {\n  position: absolute;\n  top: 50px;\n  width: 100%;\n  border-left: none;\n  border-right: none;\n}\n.toolbar label {\n  font-weight: normal;\n}\n.splitter {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: auto;\n  border: none;\n  top: 50px;\n  bottom: 44px;\n}\n.wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: auto;\n  border: none;\n  top: 50px;\n  bottom: 44px;\n  overflow-y: scroll;\n}\n/*********************************************\n * Site page\n ********************************************/\n#post-wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: auto;\n  border: none;\n  top: 50px;\n  bottom: 44px;\n  overflow-y: scroll;\n}\n#post-wrapper .container article {\n  margin-top: 3em;\n}\n#post-wrapper .container article img.img-responsive,\n#post-wrapper .container article div.embed-responsive {\n  margin: 1.5em 0;\n}\n#post-wrapper .container section:not(.group) {\n  margin-bottom: 40px;\n  text-align: right;\n}\n#post-wrapper .container section:not(.group) .social {\n  border: 0;\n}\n#post-wrapper .container section:not(.group) .social img {\n  height: 40px;\n  width: 40px;\n}\n#post-wrapper .container section.group {\n  margin-bottom: 40px;\n}\n#post-wrapper .container section.group img {\n  height: 28px;\n  width: 28px;\n  vertical-align: top;\n}\n#post-wrapper .container section.group div.list-group img {\n  height: 24px;\n  width: 24px;\n}\n/*********************************************\n * Printing\n ********************************************/\n@media print {\n  #post-wrapper {\n    position: relative;\n    top: 0px;\n    overflow: visible;\n  }\n  #post-wrapper .container {\n    width: auto;\n  }\n}\n", ""]);
	
	// exports


/***/ }

});
//# sourceMappingURL=post.bundle.js.map