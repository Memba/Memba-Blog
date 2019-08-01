/*! Copyright ©2013-2019 Memba® Sarl. All rights reserved. - Version 0.3.8 dated 01-Aug-2019 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"page": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"app-culture-en-es6":"app-culture-en-es6","app-culture-fr-es6":"app-culture-fr-es6","app.theme.black":"app.theme.black","app.theme.bootstrap":"app.theme.bootstrap","app.theme.flat":"app.theme.flat","app.theme.highcontrast":"app.theme.highcontrast","app.theme.indigo":"app.theme.indigo","app.theme.memba":"app.theme.memba","app.theme.nordic":"app.theme.nordic","app.theme.turquoise":"app.theme.turquoise","app.theme.urban":"app.theme.urban","app.theme.vintage":"app.theme.vintage"}[chunkId]||chunkId) + ".bundle.js?v=0.3.8"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:3000/build/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/ui/page.page.es6","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (url, needQuotes) {
  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, '\\n'), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./node_modules/webpack/buildin/amd-define.js":
/*!***************************************!*\
  !*** (webpack)/buildin/amd-define.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/js/cultures lazy recursive ^\\.\\/app\\.culture\\..*\\.es6$":
/*!***************************************************************************!*\
  !*** ./src/js/cultures lazy ^\.\/app\.culture\..*\.es6$ namespace object ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.culture.en.es6": [
		"./src/js/cultures/app.culture.en.es6",
		"app-culture-en-es6"
	],
	"./app.culture.fr.es6": [
		"./src/js/cultures/app.culture.fr.es6",
		"app-culture-fr-es6"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/js/cultures lazy recursive ^\\.\\/app\\.culture\\..*\\.es6$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/js/ui/page.page.es6":
/*!*********************************!*\
  !*** ./src/js/ui/page.page.es6 ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vendor_kendo_kendo_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vendor/kendo/kendo.validator */ "./src/js/vendor/kendo/kendo.validator.js");
/* harmony import */ var _vendor_kendo_kendo_validator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_vendor_kendo_kendo_validator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_app_i18n_es6__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app/app.i18n.es6 */ "./src/js/app/app.i18n.es6");
/* harmony import */ var _app_app_controller_es6__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../app/app.controller.es6 */ "./src/js/app/app.controller.es6");
/* harmony import */ var _common_window_logger_es6__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/window.logger.es6 */ "./src/js/common/window.logger.es6");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */
// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-unresolved

 // For page forms




var logger = new _common_window_logger_es6__WEBPACK_IMPORTED_MODULE_4__["default"]('page.page');
/**
 * Controller
 * @class Controller
 * @extends AppController
 */

var Controller = _app_app_controller_es6__WEBPACK_IMPORTED_MODULE_3__["default"].extend({
  /**
   * init
   * @constructor init
   */
  init: function init() {
    _app_app_controller_es6__WEBPACK_IMPORTED_MODULE_3__["default"].fn.init.call(this); // Wait until document is ready to initialize UI

    jquery__WEBPACK_IMPORTED_MODULE_0___default.a.when.apply(jquery__WEBPACK_IMPORTED_MODULE_0___default.a, _toConsumableArray(this.initializers)).then(function () {
      logger.info({
        message: "site page initialized in ".concat(_app_app_i18n_es6__WEBPACK_IMPORTED_MODULE_2__["default"].locale),
        method: 'init'
      });
    });
  }
});
/**
 * Initialize page controller
 */

var controller = new Controller();
/**
 * Default export
 */

/* harmony default export */ __webpack_exports__["default"] = (controller);

/***/ }),

/***/ "./src/js/vendor/kendo/kendo.validator.js":
/*!************************************************!*\
  !*** ./src/js/vendor/kendo/kendo.validator.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/** 
 * Kendo UI v2019.2.619 (http://www.telerik.com/kendo-ui)                                                                                                                                               
 * Copyright 2019 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/
(function (f, define) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! kendo.core */ "./src/js/vendor/kendo/kendo.core.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(function () {
    var __meta__ = {
        id: 'validator',
        name: 'Validator',
        category: 'web',
        description: 'The Validator offers an easy way to do a client-side form validation.',
        depends: ['core']
    };
    (function ($, undefined) {
        var kendo = window.kendo, Widget = kendo.ui.Widget, NS = '.kendoValidator', INVALIDMSG = 'k-invalid-msg', invalidMsgRegExp = new RegExp(INVALIDMSG, 'i'), INVALIDINPUT = 'k-invalid', VALIDINPUT = 'k-valid', emailRegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i, urlRegExp = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i, INPUTSELECTOR = ':input:not(:button,[type=submit],[type=reset],[disabled],[readonly])', CHECKBOXSELECTOR = ':checkbox:not([disabled],[readonly])', NUMBERINPUTSELECTOR = '[type=number],[type=range]', BLUR = 'blur', NAME = 'name', FORM = 'form', NOVALIDATE = 'novalidate', VALIDATE = 'validate', CHANGE = 'change', VALIDATE_INPUT = 'validateInput', proxy = $.proxy, patternMatcher = function (value, pattern) {
                if (typeof pattern === 'string') {
                    pattern = new RegExp('^(?:' + pattern + ')$');
                }
                return pattern.test(value);
            }, matcher = function (input, selector, pattern) {
                var value = input.val();
                if (input.filter(selector).length && value !== '') {
                    return patternMatcher(value, pattern);
                }
                return true;
            }, hasAttribute = function (input, name) {
                if (input.length) {
                    return input[0].attributes[name] != null;
                }
                return false;
            };
        if (!kendo.ui.validator) {
            kendo.ui.validator = {
                rules: {},
                messages: {}
            };
        }
        function resolveRules(element) {
            var resolvers = kendo.ui.validator.ruleResolvers || {}, rules = {}, name;
            for (name in resolvers) {
                $.extend(true, rules, resolvers[name].resolve(element));
            }
            return rules;
        }
        function decode(value) {
            return value.replace(/&amp/g, '&amp;').replace(/&quot;/g, '"').replace(/&#39;/g, '\'').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        }
        function numberOfDecimalDigits(value) {
            value = (value + '').split('.');
            if (value.length > 1) {
                return value[1].length;
            }
            return 0;
        }
        function parseHtml(text) {
            if ($.parseHTML) {
                return $($.parseHTML(text));
            }
            return $(text);
        }
        function searchForMessageContainer(elements, fieldName) {
            var containers = $(), element, attr;
            for (var idx = 0, length = elements.length; idx < length; idx++) {
                element = elements[idx];
                if (invalidMsgRegExp.test(element.className)) {
                    attr = element.getAttribute(kendo.attr('for'));
                    if (attr === fieldName) {
                        containers = containers.add(element);
                    }
                }
            }
            return containers;
        }
        var Validator = Widget.extend({
            init: function (element, options) {
                var that = this, resolved = resolveRules(element), validateAttributeSelector = '[' + kendo.attr('validate') + '!=false]';
                options = options || {};
                options.rules = $.extend({}, kendo.ui.validator.rules, resolved.rules, options.rules);
                options.messages = $.extend({}, kendo.ui.validator.messages, resolved.messages, options.messages);
                Widget.fn.init.call(that, element, options);
                that._errorTemplate = kendo.template(that.options.errorTemplate);
                if (that.element.is(FORM)) {
                    that.element.attr(NOVALIDATE, NOVALIDATE);
                }
                that._inputSelector = INPUTSELECTOR + validateAttributeSelector;
                that._checkboxSelector = CHECKBOXSELECTOR + validateAttributeSelector;
                that._errors = {};
                that._attachEvents();
                that._isValidated = false;
            },
            events: [
                VALIDATE,
                CHANGE,
                VALIDATE_INPUT
            ],
            options: {
                name: 'Validator',
                errorTemplate: '<span class="k-widget k-tooltip k-tooltip-validation">' + '<span class="k-icon k-i-warning"> </span> #=message#</span>',
                messages: {
                    required: '{0} is required',
                    pattern: '{0} is not valid',
                    min: '{0} should be greater than or equal to {1}',
                    max: '{0} should be smaller than or equal to {1}',
                    step: '{0} is not valid',
                    email: '{0} is not valid email',
                    url: '{0} is not valid URL',
                    date: '{0} is not valid date',
                    dateCompare: 'End date should be greater than or equal to the start date'
                },
                rules: {
                    required: function (input) {
                        var checkbox = input.filter('[type=checkbox]').length && !input.is(':checked'), value = input.val();
                        return !(hasAttribute(input, 'required') && (!value || value === '' || value.length === 0 || checkbox));
                    },
                    pattern: function (input) {
                        if (input.filter('[type=text],[type=email],[type=url],[type=tel],[type=search],[type=password]').filter('[pattern]').length && input.val() !== '') {
                            return patternMatcher(input.val(), input.attr('pattern'));
                        }
                        return true;
                    },
                    min: function (input) {
                        if (input.filter(NUMBERINPUTSELECTOR + ',[' + kendo.attr('type') + '=number]').filter('[min]').length && input.val() !== '') {
                            var min = parseFloat(input.attr('min')) || 0, val = kendo.parseFloat(input.val());
                            return min <= val;
                        }
                        return true;
                    },
                    max: function (input) {
                        if (input.filter(NUMBERINPUTSELECTOR + ',[' + kendo.attr('type') + '=number]').filter('[max]').length && input.val() !== '') {
                            var max = parseFloat(input.attr('max')) || 0, val = kendo.parseFloat(input.val());
                            return max >= val;
                        }
                        return true;
                    },
                    step: function (input) {
                        if (input.filter(NUMBERINPUTSELECTOR + ',[' + kendo.attr('type') + '=number]').filter('[step]').length && input.val() !== '') {
                            var min = parseFloat(input.attr('min')) || 0, step = parseFloat(input.attr('step')) || 1, val = parseFloat(input.val()), decimals = numberOfDecimalDigits(step), raise;
                            if (decimals) {
                                raise = Math.pow(10, decimals);
                                return Math.floor((val - min) * raise) % (step * raise) / Math.pow(100, decimals) === 0;
                            }
                            return (val - min) % step === 0;
                        }
                        return true;
                    },
                    email: function (input) {
                        return matcher(input, '[type=email],[' + kendo.attr('type') + '=email]', emailRegExp);
                    },
                    url: function (input) {
                        return matcher(input, '[type=url],[' + kendo.attr('type') + '=url]', urlRegExp);
                    },
                    date: function (input) {
                        if (input.filter('[type^=date],[' + kendo.attr('type') + '=date]').length && input.val() !== '') {
                            return kendo.parseDate(input.val(), input.attr(kendo.attr('format'))) !== null;
                        }
                        return true;
                    }
                },
                validateOnBlur: true
            },
            destroy: function () {
                Widget.fn.destroy.call(this);
                this.element.off(NS);
            },
            value: function () {
                if (!this._isValidated) {
                    return false;
                }
                return this.errors().length === 0;
            },
            _submit: function (e) {
                if (!this.validate()) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return false;
                }
                return true;
            },
            _checkElement: function (element) {
                var state = this.value();
                this.validateInput(element);
                if (this.value() !== state) {
                    this.trigger(CHANGE);
                }
            },
            _attachEvents: function () {
                var that = this;
                if (that.element.is(FORM)) {
                    that.element.on('submit' + NS, proxy(that._submit, that));
                }
                if (that.options.validateOnBlur) {
                    if (!that.element.is(INPUTSELECTOR)) {
                        that.element.on(BLUR + NS, that._inputSelector, function () {
                            that._checkElement($(this));
                        });
                        that.element.on('click' + NS, that._checkboxSelector, function () {
                            that._checkElement($(this));
                        });
                    } else {
                        that.element.on(BLUR + NS, function () {
                            that._checkElement(that.element);
                        });
                        if (that.element.is(CHECKBOXSELECTOR)) {
                            that.element.on('click' + NS, function () {
                                that._checkElement(that.element);
                            });
                        }
                    }
                }
            },
            validate: function () {
                var inputs;
                var idx;
                var result = false;
                var length;
                var isValid = this.value();
                this._errors = {};
                if (!this.element.is(INPUTSELECTOR)) {
                    var invalid = false;
                    inputs = this.element.find(this._inputSelector);
                    for (idx = 0, length = inputs.length; idx < length; idx++) {
                        if (!this.validateInput(inputs.eq(idx))) {
                            invalid = true;
                        }
                    }
                    result = !invalid;
                } else {
                    result = this.validateInput(this.element);
                }
                this.trigger(VALIDATE, { valid: result });
                if (isValid !== result) {
                    this.trigger(CHANGE);
                }
                return result;
            },
            validateInput: function (input) {
                input = $(input);
                this._isValidated = true;
                var that = this, template = that._errorTemplate, result = that._checkValidity(input), valid = result.valid, className = '.' + INVALIDMSG, fieldName = input.attr(NAME) || '', lbl = that._findMessageContainer(fieldName).add(input.next(className).filter(function () {
                        var element = $(this);
                        if (element.filter('[' + kendo.attr('for') + ']').length) {
                            return element.attr(kendo.attr('for')) === fieldName;
                        }
                        return true;
                    })).hide(), messageText, wasValid = !input.attr('aria-invalid');
                input.removeAttr('aria-invalid');
                if (!valid) {
                    messageText = that._extractMessage(input, result.key);
                    that._errors[fieldName] = messageText;
                    var messageLabel = parseHtml(template({ message: decode(messageText) }));
                    var lblId = lbl.attr('id');
                    that._decorateMessageContainer(messageLabel, fieldName);
                    if (lblId) {
                        messageLabel.attr('id', lblId);
                    }
                    if (!lbl.replaceWith(messageLabel).length) {
                        messageLabel.insertAfter(input);
                    }
                    messageLabel.show();
                    input.attr('aria-invalid', true);
                } else {
                    delete that._errors[fieldName];
                }
                if (wasValid !== valid) {
                    this.trigger(VALIDATE_INPUT, {
                        valid: valid,
                        input: input
                    });
                }
                input.toggleClass(INVALIDINPUT, !valid);
                input.toggleClass(VALIDINPUT, valid);
                if (kendo.widgetInstance(input)) {
                    var inputWrap = kendo.widgetInstance(input)._inputWrapper;
                    if (inputWrap) {
                        inputWrap.toggleClass(INVALIDINPUT, !valid);
                        inputWrap.toggleClass(INVALIDINPUT, !valid);
                    }
                }
                return valid;
            },
            hideMessages: function () {
                var that = this, className = '.' + INVALIDMSG, element = that.element;
                if (!element.is(INPUTSELECTOR)) {
                    element.find(className).hide();
                } else {
                    element.next(className).hide();
                }
            },
            _findMessageContainer: function (fieldName) {
                var locators = kendo.ui.validator.messageLocators, name, containers = $();
                for (var idx = 0, length = this.element.length; idx < length; idx++) {
                    containers = containers.add(searchForMessageContainer(this.element[idx].getElementsByTagName('*'), fieldName));
                }
                for (name in locators) {
                    containers = containers.add(locators[name].locate(this.element, fieldName));
                }
                return containers;
            },
            _decorateMessageContainer: function (container, fieldName) {
                var locators = kendo.ui.validator.messageLocators, name;
                container.addClass(INVALIDMSG).attr(kendo.attr('for'), fieldName || '');
                for (name in locators) {
                    locators[name].decorate(container, fieldName);
                }
                container.attr('role', 'alert');
            },
            _extractMessage: function (input, ruleKey) {
                var that = this, customMessage = that.options.messages[ruleKey], fieldName = input.attr(NAME), nonDefaultMessage;
                if (!kendo.ui.Validator.prototype.options.messages[ruleKey]) {
                    nonDefaultMessage = kendo.isFunction(customMessage) ? customMessage(input) : customMessage;
                }
                customMessage = kendo.isFunction(customMessage) ? customMessage(input) : customMessage;
                return kendo.format(input.attr(kendo.attr(ruleKey + '-msg')) || input.attr('validationMessage') || nonDefaultMessage || input.attr('title') || customMessage || '', fieldName, input.attr(ruleKey) || input.attr(kendo.attr(ruleKey)));
            },
            _checkValidity: function (input) {
                var rules = this.options.rules, rule;
                for (rule in rules) {
                    if (!rules[rule].call(this, input)) {
                        return {
                            valid: false,
                            key: rule
                        };
                    }
                }
                return { valid: true };
            },
            errors: function () {
                var results = [], errors = this._errors, error;
                for (error in errors) {
                    results.push(errors[error]);
                }
                return results;
            }
        });
        kendo.ui.plugin(Validator);
    }(window.kendo.jQuery));
    return window.kendo;
}, __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));

/***/ }),

/***/ "./src/styles/themes sync recursive ^\\.\\/app\\.theme\\..*\\.scss$":
/*!***********************************************************!*\
  !*** ./src/styles/themes sync ^\.\/app\.theme\..*\.scss$ ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.theme.black.scss": "./src/styles/themes/app.theme.black.scss",
	"./app.theme.bootstrap.scss": "./src/styles/themes/app.theme.bootstrap.scss",
	"./app.theme.flat.scss": "./src/styles/themes/app.theme.flat.scss",
	"./app.theme.highcontrast.scss": "./src/styles/themes/app.theme.highcontrast.scss",
	"./app.theme.indigo.scss": "./src/styles/themes/app.theme.indigo.scss",
	"./app.theme.memba.scss": "./src/styles/themes/app.theme.memba.scss",
	"./app.theme.nordic.scss": "./src/styles/themes/app.theme.nordic.scss",
	"./app.theme.turquoise.scss": "./src/styles/themes/app.theme.turquoise.scss",
	"./app.theme.urban.scss": "./src/styles/themes/app.theme.urban.scss",
	"./app.theme.vintage.scss": "./src/styles/themes/app.theme.vintage.scss"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/styles/themes sync recursive ^\\.\\/app\\.theme\\..*\\.scss$";

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });