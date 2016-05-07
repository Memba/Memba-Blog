/*! Copyright ©2013-2016 Memba® Sarl. All rights reserved. - Version 0.1.8 dated 5/7/2016 */
/*! Copyright ©2013-2016 Memba® Sarl. All rights reserved. - Version 0.1.8 dated 5/7/2016 */
!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="http://www.memba.com/assets/",t(0)}({0:function(e,t,n){n(200),n(202),n(204),n(523),n(524)},200:function(e,t,n){var r,o,i;!function(n,a){"use strict";o=[],r=n,i="function"==typeof r?r.apply(t,o):r,!(void 0!==i&&(e.exports=i))}(function(){"use strict";return function(e){var t="string",n="object",r="function",o="undefined",i={};"Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ").forEach(function(e){i["[object "+e+"]"]=e.toLowerCase()});var a=i.toString,s=i.hasOwnProperty,c={isArray:Array.isArray,isFunction:function(e){return c.type(e)===r},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},isNumeric:function(e){return!c.isArray(e)&&e-parseFloat(e)+1>=0},isPlainObject:function(e){return c.type(e)!==n||e.nodeType||c.isWindow(e)?!1:!e.constructor||s.call(e.constructor.prototype,"isPrototypeOf")},isWindow:function(e){return null!==e&&e===e.window},type:function(e){return null===e?e+"":typeof e===n||typeof e===r?i[a.call(e)]||n:typeof e}},u=window.assert=function(e,t){if(!e)throw new Error(t)};u["enum"]=function(e,t,n){if(-1===e.indexOf(t))throw new RangeError(n)},u.equal=function(e,t,n){if(e!==t)throw new RangeError(n)},u.hasLength=function(e,t){if(!e||!e.length)throw new TypeError(t)},u["instanceof"]=function(e,t,n){if(!(t instanceof e))throw new TypeError(n)},u.isOptionalObject=function(e,t){if(c.type(e)!==o&&(!c.isPlainObject(e)||c.isEmptyObject(e)))throw new TypeError(t)},u.isPlainObject=function(e,t){if(!c.isPlainObject(e)||c.isEmptyObject(e))throw new TypeError(t)},u.isUndefined=function(e,t){if(c.type(e)!==o)throw new TypeError(t)},u.match=function(e,n,r){if(c.type(n)!==t||!e.test(n))throw new RangeError(r)},u.ok=function(e,t){return u(e,t)},u.type=function(e,t,n){if(c.type(t)!==e)throw new TypeError(n)},u.messages={"enum":{"default":"`{0}` is expected to be any of `{1}`"},equal:{"default":"`{0}` is expected to equal `{1}`"},hasLength:{"default":"`{0}` has neither length nor any item"},"instanceof":{"default":"`{0}` is expected to be an instance of `{1}`"},isOptionalObject:{"default":"`{0}` is expected to be undefined or a plain object"},isPlainObject:{"default":"`{0}` is expected to be a plain object"},isUndefined:{"default":"`{0}` is expected to be undefined"},match:{"default":"`{0}` is expected to match `{1}`"},ok:{"default":"A statement is expected to be true"},type:{"default":"`{0}` is expected to have type `{1}`"}}}(),window.assert},n(201))},201:function(e,t){e.exports=function(){throw new Error("define cannot be used indirect")}},202:function(e,t,n){var r,o,i;!function(n,a){"use strict";o=[],r=n,i="function"==typeof r?r.apply(t,o):r,!(void 0!==i&&(e.exports=i))}(function(){"use strict";return function(e){var t=window.app=window.app||{},n="string",r="function",o="undefined",i={DEBUG:{NAME:"DEBUG",VALUE:1},INFO:{NAME:"INFO",VALUE:2},WARN:{NAME:"WARN",VALUE:4},ERROR:{NAME:"ERROR",VALUE:5},CRIT:{NAME:"CRIT",VALUE:6}},a=i.INFO,s=/\n/g,c="; ",u=" = ",f="	",l="	",d=window.Logger=function(e){function d(e,t){if(typeof e!==n&&typeof t!==o)throw new TypeError("Unexpected data when message is not a string");var i;return typeof e===n?i={message:e,data:t}:e instanceof window.Error?i={message:e.message,error:e}:typeof window.ErrorEvent===r&&e instanceof window.ErrorEvent?i={message:e.message,data:{filename:e.filename,lineno:e.lineno,colno:e.colno},error:e.error}:"[object Object]"===Object.prototype.toString.call(e)?(i=JSON.parse(JSON.stringify(e)),e.error instanceof Error&&(i.error=e.error)):i={data:e},i}function p(e,t,r){if("[object Object]"!==Object.prototype.toString.call(e))throw new TypeError("logEntry is expected to be an object");e.error instanceof Error&&(typeof e.message===o&&(e.message=e.error.message),e.error.originalError instanceof window.Error?(e.original=e.error.originalError.message,typeof e.error.originalError.stack===n&&(e.stack=e.error.originalError.stack.replace(s,c))):typeof e.error.stack===n&&(e.stack=e.error.stack.replace(s,c))),e.module=typeof t===n?t:o,r=String(r).toUpperCase(),e.level=Object.keys(i).indexOf(r)>-1?r:a.NAME;var u=document.getElementById("trace");u instanceof HTMLInputElement&&"hidden"===u.type&&(e.trace=u.value)}function w(e){var n=window.console;if(t.DEBUG&&n&&typeof n.log===r){var o="["+e.level+(4===e.level.length?" ":"")+"]",i=!0;if(e.message&&(o+=(i?f:l)+"message"+u+e.message,i=!1),e.original&&(o+=(i?f:l)+"original"+u+e.original,i=!1),e.module&&(o+=(i?f:l)+"module"+u+e.module,i=!1),e.method&&(o+=(i?f:l)+"method"+u+e.method,i=!1),e.stack&&(o+=(i?f:l)+"stack"+u+e.stack,i=!1),e.data)try{o+=(i?f:l)+"data"+u+JSON.stringify(e.data)}catch(a){typeof e.data.toString===r&&(o+=(i?f:l)+"data"+u+e.data.toString())}e.trace&&(o+=(i?f:l)+"trace"+u+e.trace,i=!1),n.log(o),e.error instanceof Error&&typeof window.console.error===r&&window.console.error(e.error),e.originalError instanceof Error&&typeof window.console.error===r&&window.console.error(e.originalError)}}this._module=e,this.level=a.VALUE,this.log=function(e,n,o){if(e=String(e).toUpperCase(),-1===Object.keys(i).indexOf(e))throw new TypeError("level is either `debug`, `info`, `warn`, `error` or `crit`");if(this.level>i[e].VALUE)return!1;var a=d(n,o);p(a,this._module,e),w(a,e);var s=t.logger;return s&&typeof s["_"+e.toLowerCase()]===r&&s["_"+e.toLowerCase()](a),!0},this.debug=function(e,t){return this.log(i.DEBUG.NAME,e,t)},this.info=function(e,t){return this.log(i.INFO.NAME,e,t)},this.warn=function(e,t){return this.log(i.WARN.NAME,e,t)},this.error=function(e,t){return this.log(i.ERROR.NAME,e,t)},this.crit=function(e,t){return this.log(i.CRIT.NAME,e,t)}};window.onerror=function(e){var t=new d("global");t.crit(e)}}(),window.Logger},n(201))},204:function(e,t,n){var r,o,i;!function(a,s){"use strict";o=[n(205),n(200),n(202)],r=a,i="function"==typeof r?r.apply(t,o):r,!(void 0!==i&&(e.exports=i))}(function(e){"use strict";return e=e||window.LE,function(t){var n=window.app=window.app||{},r={DEBUG:{NAME:"DEBUG",VALUE:1},INFO:{NAME:"INFO",VALUE:2},WARN:{NAME:"WARN",VALUE:4},ERROR:{NAME:"ERROR",VALUE:5},CRIT:{NAME:"CRIT",VALUE:6}},o=r.INFO,i=n.logger=n.logger||{token:"e78bac0b-377a-49e2-ad91-20bb4ec7cedc",level:o.VALUE};e.init({token:i.token,ssl:!0,catchall:!1,trace:!1,page_info:"never",print:!1}),i._debug=function(t){return i.level>r.DEBUG.VALUE?!1:(setTimeout(function(){e.log(t)},0),!0)},i._info=function(t){return i.level>r.INFO.VALUE?!1:(setTimeout(function(){e.info(t)},0),!0)},i._warn=function(t){return i.level>r.WARN.VALUE?!1:(setTimeout(function(){e.warn(t)},0),!0)},i._error=function(t){return i.level>r.ERROR.VALUE?!1:(setTimeout(function(){e.error(t)},0),!0)},i._crit=function(t){return i.level>r.CRIT.VALUE?!1:(setTimeout(function(){e.error(t)},0),!0)}}(),window.app},n(201))},205:function(e,t,n){var r;/**
	 * @license Copyright 2013 Logentries.
	 * Please view license at https://raw.github.com/logentries/le_js/master/LICENSE
	 */
!function(o,i){r=function(){return i(o)}.call(t,n,t,e),!(void 0!==r&&(e.exports=r))}(this,function(e){"use strict";function t(t){var n,i=t.trace?(Math.random()+Math.PI).toString(36).substring(2,10):null,a=t.page_info,s=t.token,c=t.print,u=function(){return"undefined"==typeof XDomainRequest?t.ssl:"https:"===e.location.protocol}();n=e.LEENDPOINT?e.LEENDPOINT:"js.logentries.com/v1",n=(u?"https://":"http://")+n+"/logs/"+s;var f=!0,l=[],d=!1,p=!1;if(t.catchall){var w=e.onerror,g=function(e,t,n){return y({error:e,line:n,location:t}).level("ERROR").send(),w?w(e,t,n):!1};e.onerror=g}var h=function(){var t=e.navigator||{doNotTrack:void 0},n=e.screen||{},r=e.location||{};return{url:r.pathname,referrer:document.referrer,screen:{width:n.width,height:n.height},window:{width:e.innerWidth,height:e.innerHeight},browser:{name:t.appName,version:t.appVersion,cookie_enabled:t.cookieEnabled,do_not_track:t.doNotTrack},platform:t.platform}},v=function(){var e=null,t=Array.prototype.slice.call(arguments);if(0===t.length)throw new Error("No arguments!");return e=1===t.length?t[0]:t},y=function(e){var t=v.apply(this,arguments),n={event:t};return"never"!==a&&(p&&"per-entry"!==a||(p=!0,"undefined"==typeof t.screen&&"undefined"==typeof t.browser&&y(h()).level("PAGE").send())),i&&(n.trace=i),{level:function(e){if(c&&"undefined"!=typeof console&&"PAGE"!==e){var t=null;"undefined"!=typeof XDomainRequest&&(t=n.trace+" "+n.event);try{console[e.toLowerCase()].call(console,t||n)}catch(o){console.log(t||n)}}return n.level=e,{send:function(){var e=[],t=JSON.stringify(n,function(t,n){if("undefined"==typeof n)return"undefined";if("object"==typeof n&&null!==n){if(-1!==r(e,n))return"<?>";e.push(n)}return n});d?l.push(t):m(s,t)}}}}};this.log=y;var m=function(e,t){d=!0;var r=o();f&&(r.constructor===XMLHttpRequest?r.onreadystatechange=function(){4===r.readyState&&(r.status>=400?(console.error("Couldn't submit events."),410===r.status&&console.warn("This version of le_js is no longer supported!")):(301===r.status&&console.warn("This version of le_js is deprecated! Consider upgrading."),l.length>0?m(e,l.shift()):d=!1))}:r.onload=function(){l.length>0?m(e,l.shift()):d=!1},r.open("POST",n,!0),r.constructor===XMLHttpRequest&&(r.setRequestHeader("X-Requested-With","XMLHttpRequest"),r.setRequestHeader("Content-type","application/json")),r.overrideMimeType&&r.overrideMimeType("text"),r.send(t))}}function n(e){var n,r={ssl:!0,catchall:!1,trace:!0,page_info:"never",print:!1,endpoint:null,token:null};if("object"!=typeof e)throw new Error("Invalid parameters for createLogStream()");for(var o in e)r[o]=e[o];if(null===r.token)throw new Error("Token not present.");n=new t(r);var i=function(e){if(n)return n.log.apply(this,arguments);throw new Error("You must call LE.init(...) first.")};return{log:function(){i.apply(this,arguments).level("LOG").send()},warn:function(){i.apply(this,arguments).level("WARN").send()},error:function(){i.apply(this,arguments).level("ERROR").send()},info:function(){i.apply(this,arguments).level("INFO").send()}}}var r=function(e,t){for(var n=0;n<e.length;n++)if(t===e[n])return n;return-1},o=function(){return"undefined"!=typeof XDomainRequest?new XDomainRequest:new XMLHttpRequest},i={},a=function(e){if(!i.hasOwnProperty(e))throw new Error("Invalid name for logStream");return i[e]},s=function(e){if("string"!=typeof e.name)throw new Error("Name not present.");if(i.hasOwnProperty(e.name))throw new Error("A logger with that name already exists!");return i[e.name]=new n(e),!0},c=function(e){var t={name:"default"};if("object"==typeof e)for(var n in e)t[n]=e[n];else{if("string"!=typeof e)throw new Error("Invalid parameters for init()");t.token=e}return s(t)},u=function(e){"undefined"==typeof e&&(e="default"),delete i[e]};return{init:c,createLogStream:s,to:a,destroy:u,log:function(){for(var e in i)i[e].log.apply(this,arguments)},warn:function(){for(var e in i)i[e].warn.apply(this,arguments)},error:function(){for(var e in i)i[e].error.apply(this,arguments)},info:function(){for(var e in i)i[e].info.apply(this,arguments)}}})},523:function(e,t,n){var r,o,i;!function(a,s){"use strict";o=[n(200),n(202),n(204)],r=a,i="function"==typeof r?r.apply(t,o):r,!(void 0!==i&&(e.exports=i))}(function(){"use strict";return function(){function e(e){for(var t=0,n=e,r=/%[sdj]/;"string"==typeof n&&r.test(n);)n=n.replace(r,"{"+t+"}"),t++;return n}function t(){return Array.prototype.slice.call(arguments).join("/").replace(/([^:])[\/]{2,}/g,"$1/")}var n=window.app=window.app||{},r=new window.Logger("app.config");n.DEBUG="true"==="false".toLowerCase(),n.version="0.1.8",n.locales=JSON.parse('["en","fr"]'),window.Logger.prototype.level=parseInt("0",10)||0,n.logger.level=parseInt("0",10)||0,n.logger.token="4d577ed8-29a8-4844-8efb-9c1ce2ae45ac",n.facebook={clientID:"765157796920609"},n.twitter={account:"memba"},n.uris={cdn:{icons:t("https://cdn.kidoju.com",e("/images/o_collection/svg/office/%s.svg"))},webapp:{home:"http://www.memba.com"+e("/"),locale:"http://www.memba.com"+e("/%s"),feed:"http://www.memba.com"+e("/%s/rss.xml"),sitemap:"http://www.memba.com"+e("/%s/sitemap.xml"),pages:"http://www.memba.com"+e("/%s/%s"),posts:"http://www.memba.com"+e("/%s/posts/%s/%s/%s")}},r.info({message:"app configured"})}(),window.app},n(201))},524:function(e,t,n){var r,o,i;!function(a,s){"use strict";o=[n(204)],r=a,i="function"==typeof r?r.apply(t,o):r,!(void 0!==i&&(e.exports=i))}(function(){"use strict";var e=window.app,t=new window.Logger("app.support");return function(e,t,n){function r(e,t){return typeof e===t}function o(){var e,t,n,o,i,a,s;for(var c in m)if(m.hasOwnProperty(c)){if(e=[],t=m[c],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(o=r(t.fn,"function")?t.fn():t.fn,i=0;i<e.length;i++)a=e[i],s=a.split("."),1===s.length?A[s[0]]=o:(!A[s[0]]||A[s[0]]instanceof Boolean||(A[s[0]]=new Boolean(A[s[0]])),A[s[0]][s[1]]=o),b.push((o?"":"no-")+s.join("-"))}}function i(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function a(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):x?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function s(e){var t=R.className,n=A._config.classPrefix||"";if(x&&(t=t.baseVal),A._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}A._config.enableClasses&&(t+=" "+n+e.join(" "+n),x?R.className.baseVal=t:R.className=t)}function c(e,t){if("object"==typeof e)for(var n in e)O(e,n)&&c(n,e[n]);else{e=e.toLowerCase();var r=e.split("."),o=A[r[0]];if(2===r.length&&(o=o[r[1]]),"undefined"!=typeof o)return A;t="function"==typeof t?t():t,1===r.length?A[r[0]]=t:(!A[r[0]]||A[r[0]]instanceof Boolean||(A[r[0]]=new Boolean(A[r[0]])),A[r[0]][r[1]]=t),s([(t&&t!==!1?"":"no-")+r.join("-")]),A._trigger(e,t)}return A}function u(){var e=t.body;return e||(e=a(x?"svg":"body"),e.fake=!0),e}function f(e,n,r,o){var i,s,c,f,l="modernizr",d=a("div"),p=u();if(parseInt(r,10))for(;r--;)c=a("div"),c.id=o?o[r]:l+(r+1),d.appendChild(c);return i=a("style"),i.type="text/css",i.id="s"+l,(p.fake?p:d).appendChild(i),p.appendChild(d),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(t.createTextNode(e)),d.id=l,p.fake&&(p.style.background="",p.style.overflow="hidden",f=R.style.overflow,R.style.overflow="hidden",R.appendChild(p)),s=n(d,e),p.fake?(p.parentNode.removeChild(p),R.style.overflow=f,R.offsetHeight):d.parentNode.removeChild(d),!!s}function l(e,t){return!!~(""+e).indexOf(t)}function d(e,t){return function(){return e.apply(t,arguments)}}function p(e,t,n){var o;for(var i in e)if(e[i]in t)return n===!1?e[i]:(o=t[e[i]],r(o,"function")?d(o,n||t):o);return!1}function w(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function g(t,r){var o=t.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(w(t[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+w(t[o])+":"+r+")");return i=i.join(" or "),f("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"===getComputedStyle(e,null).position})}return n}function h(e,t,o,s){function c(){f&&(delete U.style,delete U.modElem)}if(s=r(s,"undefined")?!1:s,!r(o,"undefined")){var u=g(e,o);if(!r(u,"undefined"))return u}for(var f,d,p,w,h,v=["modernizr","tspan"];!U.style;)f=!0,U.modElem=a(v.shift()),U.style=U.modElem.style;for(p=e.length,d=0;p>d;d++)if(w=e[d],h=U.style[w],l(w,"-")&&(w=i(w)),U.style[w]!==n){if(s||r(o,"undefined"))return c(),"pfx"===t?w:!0;try{U.style[w]=o}catch(y){}if(U.style[w]!==h)return c(),"pfx"===t?w:!0}return c(),!1}function v(e,t,n,o,i){var a=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+S.join(a+" ")+a).split(" ");return r(t,"string")||r(t,"undefined")?h(s,t,o,i):(s=(e+" "+j.join(a+" ")+a).split(" "),p(s,t,n))}function y(e,t,r){return v(e,n,n,t,r)}var m=[],E={_version:"3.2.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){m.push({name:e,fn:t,options:n})},addAsyncTest:function(e){m.push({name:null,fn:e})}},A=function(){};A.prototype=E,A=new A,A.addTest("blobconstructor",function(){try{return!!new Blob}catch(e){return!1}},{aliases:["blob-constructor"]}),A.addTest("history",function(){var t=navigator.userAgent;return-1===t.indexOf("Android 2.")&&-1===t.indexOf("Android 4.0")||-1===t.indexOf("Mobile Safari")||-1!==t.indexOf("Chrome")||-1!==t.indexOf("Windows Phone")?e.history&&"pushState"in e.history:!1}),A.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect),A.addTest("filereader",!!(e.File&&e.FileList&&e.FileReader)),A.addTest("localstorage",function(){var e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(t){return!1}}),A.addTest("sessionstorage",function(){var e="modernizr";try{return sessionStorage.setItem(e,e),sessionStorage.removeItem(e),!0}catch(t){return!1}}),A.addTest("atobbtoa","atob"in e&&"btoa"in e,{aliases:["atob-btoa"]}),A.addTest("webworkers","Worker"in e);var b=[],T=E._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):[];E._prefixes=T;var O;!function(){var e={}.hasOwnProperty;O=r(e,"undefined")||r(e.call,"undefined")?function(e,t){return t in e&&r(e.constructor.prototype[t],"undefined")}:function(t,n){return e.call(t,n)}}();var R=t.documentElement,x="svg"===R.nodeName.toLowerCase();/*!
	         {
	         "name" : "HTML5 Audio Element",
	         "property": "audio",
	         "tags" : ["html5", "audio", "media"]
	         }
	         !*/
A.addTest("audio",function(){var e=a("audio"),t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t),t.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),t.mp3=e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/,""),t.opus=e.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),t.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),t.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(n){}return t}),/*!
	         {
	         "name": "Canvas",
	         "property": "canvas",
	         "caniuse": "canvas",
	         "tags": ["canvas", "graphics"],
	         "polyfills": ["flashcanvas", "excanvas", "slcanvas", "fxcanvas"]
	         }
	         !*/
A.addTest("canvas",function(){var e=a("canvas");return!(!e.getContext||!e.getContext("2d"))}),/*!
	         {
	         "name": "Canvas text",
	         "property": "canvastext",
	         "caniuse": "canvas-text",
	         "tags": ["canvas", "graphics"],
	         "polyfills": ["canvastext"]
	         }
	         !*/
A.addTest("canvastext",function(){return A.canvas===!1?!1:"function"==typeof a("canvas").getContext("2d").fillText}),/*!
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
A.addTest("video",function(){var e=a("video"),t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t),t.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),t.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),t.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),t.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),t.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(n){}return t}),/*!
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
A.addTest("inlinesvg",function(){var e=a("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"===("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)});var N=function(){function e(e,t){var o;return e?(t&&"string"!=typeof t||(t=a(t||"div")),e="on"+e,o=e in t,!o&&r&&(t.setAttribute||(t=a("div")),t.setAttribute(e,""),o="function"==typeof t[e],t[e]!==n&&(t[e]=n),t.removeAttribute(e)),o):!1}var r=!("onblur"in t.documentElement);return e}();E.hasEvent=N,/*!
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
A.addTest("hashchange",function(){return N("hashchange",e)===!1?!1:t.documentMode===n||t.documentMode>7}),E._l={},E.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),A.hasOwnProperty(e)&&setTimeout(function(){A._trigger(e,A[e])},0)},E._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout(function(){var e,r;for(e=0;e<n.length;e++)(r=n[e])(t)},0),delete this._l[e]}},A._q.push(function(){E.addTest=c}),/*!
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
A.addTest("svgasimg",t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")),/*!
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
A.addAsyncTest(function(){function e(){var e=new Image;e.onerror=function(){c("datauri",!0),A.datauri=new Boolean(!0),A.datauri.over32kb=!1},e.onload=function(){c("datauri",!0),A.datauri=new Boolean(!0),A.datauri.over32kb=1===e.width&&1===e.height};for(var t="R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";t.length<33e3;)t="\r\n"+t;e.src="data:image/gif;base64,"+t}-1!==navigator.userAgent.indexOf("MSIE 7.")&&setTimeout(function(){c("datauri",!1)},10);var t=new Image;t.onerror=function(){c("datauri",!1)},t.onload=function(){1===t.width&&1===t.height?e():c("datauri",!1)},t.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="});var L=E.testStyles=f;/*!
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
A.addTest("touchevents",function(){var n;if("ontouchstart"in e||e.DocumentTouch&&t instanceof e.DocumentTouch)n=!0;else{var r=["@media (",T.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");L(r,function(e){n=9===e.offsetTop})}return n});var C="Moz O ms Webkit",S=E._config.usePrefixes?C.split(" "):[];E._cssomPrefixes=S;var _=function(t){var r,o=T.length,i=e.CSSRule;if("undefined"==typeof i)return n;if(!t)return!1;if(t=t.replace(/^@/,""),r=t.replace(/-/g,"_").toUpperCase()+"_RULE",r in i)return"@"+t;for(var a=0;o>a;a++){var s=T[a],c=s.toUpperCase()+"_"+r;if(c in i)return"@-"+s.toLowerCase()+"-"+t}return!1};E.atRule=_;var j=E._config.usePrefixes?C.toLowerCase().split(" "):[];E._domPrefixes=j;var P={elem:a("modernizr")};A._q.push(function(){delete P.elem});var U={style:P.elem.style};A._q.unshift(function(){delete U.style}),E.testAllProps=v,E.testAllProps=y,/*!
	         {
	         "name": "CSS Transforms",
	         "property": "csstransforms",
	         "caniuse": "transforms2d",
	         "tags": ["css"]
	         }
	         !*/
A.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&y("transform","scale(1)",!0)});var k=E.prefixed=function(e,t,n){return 0===e.indexOf("@")?_(e):(-1!==e.indexOf("-")&&(e=i(e)),t?v(e,t,n):v(e,"pfx"))},I=k("URL",e,!1);I=I&&e[I],A.addTest("bloburls",I&&"revokeObjectURL"in I&&"createObjectURL"in I),o(),delete E.addTest,delete E.addAsyncTest;for(var M=0;M<A._q.length;M++)A._q[M]();e.Modernizr=A}(window,document),e.support=window.Modernizr,t.info({message:"browser tested by Modernizr"}),window.app},n(201))}});
//# sourceMappingURL=init.bundle.js.map?v=0.1.8