!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="http://www.memba.com/assets/",t(0)}({0:function(e,t,n){n(200),n(202),n(520),n(204),n(521)},200:function(e,t,n){var r,o,i;!function(n,a){"use strict";o=[],r=n,i="function"==typeof r?r.apply(t,o):r,!(void 0!==i&&(e.exports=i))}(function(){"use strict";return function(e){var t="string",n="object",r="function",o="undefined",i={};"Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ").forEach(function(e){i["[object "+e+"]"]=e.toLowerCase()});var a=i.toString,s=i.hasOwnProperty,c={isArray:Array.isArray,isFunction:function(e){return c.type(e)===r},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},isNumeric:function(e){return!c.isArray(e)&&e-parseFloat(e)+1>=0},isPlainObject:function(e){return c.type(e)!==n||e.nodeType||c.isWindow(e)?!1:e.constructor&&!s.call(e.constructor.prototype,"isPrototypeOf")?!1:!0},isWindow:function(e){return null!==e&&e===e.window},type:function(e){return null===e?e+"":typeof e===n||typeof e===r?i[a.call(e)]||n:typeof e}},u=window.assert=function(e,t){if(!e)throw new Error(t)};u["enum"]=function(e,t,n){if(-1===e.indexOf(t))throw new RangeError(n)},u.equal=function(e,t,n){if(e!==t)throw new RangeError(n)},u["instanceof"]=function(e,t,n){if(!(t instanceof e))throw new TypeError(n)},u.isOptionalObject=function(e,t){if(c.type(e)!==o&&(!c.isPlainObject(e)||c.isEmptyObject(e)))throw new TypeError(t)},u.isPlainObject=function(e,t){if(!c.isPlainObject(e)||c.isEmptyObject(e))throw new TypeError(t)},u.isUndefined=function(e,t){if(c.type(e)!==o)throw new TypeError(t)},u.match=function(e,n,r){if(c.type(n)!==t||!e.test(n))throw new RangeError(r)},u.ok=function(e,t){return u(e,t)},u.type=function(e,t,n){if(c.type(t)!==e)throw new TypeError(n)},u.messages={"enum":{"default":"`{0}` is expected to be any of `{1}`"},equal:{"default":"`{0}` is expected to equal `{1}`"},"instanceof":{"default":"`{0}` is expected to be an instance of `{1}`"},isOptionalObject:{"default":"`{0}` is expected to be undefined or a plain object"},isPlainObject:{"default":"`{0}` is expected to be a plain object"},isUndefined:{"default":"`{0}` is expected to be undefined"},match:{"default":"`{0}` is expected to match `{1}`"},ok:{"default":"A statement is expected to be true"},type:{"default":"`{0}` is expected to have type `{1}`"}}}(),window.assert},n(201))},201:function(e,t){e.exports=function(){throw new Error("define cannot be used indirect")}},202:function(e,t,n){var r,o,i;!function(n,a){"use strict";o=[],r=n,i="function"==typeof r?r.apply(t,o):r,!(void 0!==i&&(e.exports=i))}(function(){"use strict";return function(e){var t=window.app=window.app||{},n="string",r="function",o="undefined",i={DEBUG:{NAME:"DEBUG",VALUE:1},INFO:{NAME:"INFO",VALUE:2},WARN:{NAME:"WARN",VALUE:4},ERROR:{NAME:"ERROR",VALUE:5},CRIT:{NAME:"CRIT",VALUE:6}},a=i.INFO,s=/\n/g,c="; ",u=" = ",l="	",f="	",p=window.Logger=function(e){function p(e,t){if(typeof e!==n&&typeof t!==o)throw new TypeError("Unexpected data when message is not a string");var i;return typeof e===n?i={message:e,data:t}:e instanceof window.Error?i={message:e.message,error:e}:typeof window.ErrorEvent===r&&e instanceof window.ErrorEvent?i={message:e.message,data:{filename:e.filename,lineno:e.lineno,colno:e.colno},error:e.error}:"[object Object]"===Object.prototype.toString.call(e)?(i=JSON.parse(JSON.stringify(e)),e.error instanceof Error&&(i.error=e.error)):i={data:e},i}function d(e,t,r){if("[object Object]"!==Object.prototype.toString.call(e))throw new TypeError("logEntry is expected to be an object");e.error instanceof Error&&(typeof e.message===o&&(e.message=e.error.message),e.error.originalError instanceof window.Error?(e.original=e.error.originalError.message,typeof e.error.originalError.stack===n&&(e.stack=e.error.originalError.stack.replace(s,c))):typeof e.error.stack===n&&(e.stack=e.error.stack.replace(s,c))),e.module=typeof t===n?t:o,r=String(r).toUpperCase(),e.level=Object.keys(i).indexOf(r)>-1?r:a.NAME;var u=document.getElementById("trace");u instanceof HTMLInputElement&&"hidden"===u.type&&(e.trace=u.value)}function g(e){var n=window.console;if(t.DEBUG&&n&&typeof n.log===r){var o="["+e.level+(4===e.level.length?" ":"")+"]",i=!0;if(e.message&&(o+=(i?l:f)+"message"+u+e.message,i=!1),e.original&&(o+=(i?l:f)+"original"+u+e.original,i=!1),e.module&&(o+=(i?l:f)+"module"+u+e.module,i=!1),e.method&&(o+=(i?l:f)+"method"+u+e.method,i=!1),e.stack&&(o+=(i?l:f)+"stack"+u+e.stack,i=!1),e.data)try{o+=(i?l:f)+"data"+u+JSON.stringify(e.data)}catch(a){typeof e.data.toString===r&&(o+=(i?l:f)+"data"+u+e.data.toString())}e.trace&&(o+=(i?l:f)+"trace"+u+e.trace,i=!1),n.log(o),e.error instanceof Error&&typeof window.console.error===r&&window.console.error(e.error),e.originalError instanceof Error&&typeof window.console.error===r&&window.console.error(e.originalError)}}this._module=e,this.level=a.VALUE,this.log=function(e,n,o){if(e=String(e).toUpperCase(),-1===Object.keys(i).indexOf(e))throw new TypeError("level is either `debug`, `info`, `warn`, `error` or `crit`");if(this.level>i[e].VALUE)return!1;var a=p(n,o);d(a,this._module,e),g(a,e);var s=t.logger;return s&&typeof s["_"+e.toLowerCase()]===r&&s["_"+e.toLowerCase()](a),!0},this.debug=function(e,t){return this.log(i.DEBUG.NAME,e,t)},this.info=function(e,t){return this.log(i.INFO.NAME,e,t)},this.warn=function(e,t){return this.log(i.WARN.NAME,e,t)},this.error=function(e,t){return this.log(i.ERROR.NAME,e,t)},this.crit=function(e,t){return this.log(i.CRIT.NAME,e,t)}};window.onerror=function(e){var t=new p("global");t.crit(e)}}(),window.Logger},n(201))},204:function(e,t,n){var r,o,i;!function(a,s){"use strict";o=[n(205),n(200),n(202)],r=a,i="function"==typeof r?r.apply(t,o):r,!(void 0!==i&&(e.exports=i))}(function(e){"use strict";return e=e||window.LE,function(t){var n=window.app=window.app||{},r={DEBUG:{NAME:"DEBUG",VALUE:1},INFO:{NAME:"INFO",VALUE:2},WARN:{NAME:"WARN",VALUE:4},ERROR:{NAME:"ERROR",VALUE:5},CRIT:{NAME:"CRIT",VALUE:6}},o=r.INFO,i=n.logger=n.logger||{token:"e78bac0b-377a-49e2-ad91-20bb4ec7cedc",level:o.VALUE};e.init({token:i.token,ssl:!0,catchall:!1,trace:!1,page_info:"never",print:!1}),i._debug=function(t){return i.level>r.DEBUG.VALUE?!1:(setTimeout(function(){e.log(t)},0),!0)},i._info=function(t){return i.level>r.INFO.VALUE?!1:(setTimeout(function(){e.info(t)},0),!0)},i._warn=function(t){return i.level>r.WARN.VALUE?!1:(setTimeout(function(){e.warn(t)},0),!0)},i._error=function(t){return i.level>r.ERROR.VALUE?!1:(setTimeout(function(){e.error(t)},0),!0)},i._crit=function(t){return i.level>r.CRIT.VALUE?!1:(setTimeout(function(){e.error(t)},0),!0)}}(),window.app},n(201))},205:function(e,t,n){var r;/**
	 * @license Copyright 2013 Logentries.
	 * Please view license at https://raw.github.com/logentries/le_js/master/LICENSE
	 */
!function(o,i){r=function(){return i(o)}.call(t,n,t,e),!(void 0!==r&&(e.exports=r))}(this,function(e){"use strict";function t(t){var n,i=t.trace?(Math.random()+Math.PI).toString(36).substring(2,10):null,a=t.page_info,s=t.token,c=t.print,u=function(){return"undefined"==typeof XDomainRequest?t.ssl:"https:"===e.location.protocol?!0:!1}();n=e.LEENDPOINT?e.LEENDPOINT:"js.logentries.com/v1",n=(u?"https://":"http://")+n+"/logs/"+s;var l=!0,f=[],p=!1,d=!1;if(t.catchall){var g=e.onerror,w=function(e,t,n){return v({error:e,line:n,location:t}).level("ERROR").send(),g?g(e,t,n):!1};e.onerror=w}var m=function(){var t=e.navigator||{doNotTrack:void 0},n=e.screen||{},r=e.location||{};return{url:r.pathname,referrer:document.referrer,screen:{width:n.width,height:n.height},window:{width:e.innerWidth,height:e.innerHeight},browser:{name:t.appName,version:t.appVersion,cookie_enabled:t.cookieEnabled,do_not_track:t.doNotTrack},platform:t.platform}},y=function(){var e=null,t=Array.prototype.slice.call(arguments);if(0===t.length)throw new Error("No arguments!");return e=1===t.length?t[0]:t},v=function(e){var t=y.apply(this,arguments),n={event:t};return"never"!==a&&(d&&"per-entry"!==a||(d=!0,"undefined"==typeof t.screen&&"undefined"==typeof t.browser&&v(m()).level("PAGE").send())),i&&(n.trace=i),{level:function(e){if(c&&"undefined"!=typeof console&&"PAGE"!==e){var t=null;"undefined"!=typeof XDomainRequest&&(t=n.trace+" "+n.event);try{console[e.toLowerCase()].call(console,t||n)}catch(o){console.log(t||n)}}return n.level=e,{send:function(){var e=[],t=JSON.stringify(n,function(t,n){if("undefined"==typeof n)return"undefined";if("object"==typeof n&&null!==n){if(-1!==r(e,n))return"<?>";e.push(n)}return n});p?f.push(t):h(s,t)}}}}};this.log=v;var h=function(e,t){p=!0;var r=o();l&&(r.constructor===XMLHttpRequest?r.onreadystatechange=function(){4===r.readyState&&(r.status>=400?(console.error("Couldn't submit events."),410===r.status&&console.warn("This version of le_js is no longer supported!")):(301===r.status&&console.warn("This version of le_js is deprecated! Consider upgrading."),f.length>0?h(e,f.shift()):p=!1))}:r.onload=function(){f.length>0?h(e,f.shift()):p=!1},r.open("POST",n,!0),r.constructor===XMLHttpRequest&&(r.setRequestHeader("X-Requested-With","XMLHttpRequest"),r.setRequestHeader("Content-type","application/json")),r.overrideMimeType&&r.overrideMimeType("text"),r.send(t))}}function n(e){var n,r={ssl:!0,catchall:!1,trace:!0,page_info:"never",print:!1,endpoint:null,token:null};if("object"!=typeof e)throw new Error("Invalid parameters for createLogStream()");for(var o in e)r[o]=e[o];if(null===r.token)throw new Error("Token not present.");n=new t(r);var i=function(e){if(n)return n.log.apply(this,arguments);throw new Error("You must call LE.init(...) first.")};return{log:function(){i.apply(this,arguments).level("LOG").send()},warn:function(){i.apply(this,arguments).level("WARN").send()},error:function(){i.apply(this,arguments).level("ERROR").send()},info:function(){i.apply(this,arguments).level("INFO").send()}}}var r=function(e,t){for(var n=0;n<e.length;n++)if(t===e[n])return n;return-1},o=function(){return"undefined"!=typeof XDomainRequest?new XDomainRequest:new XMLHttpRequest},i={},a=function(e){if(!i.hasOwnProperty(e))throw new Error("Invalid name for logStream");return i[e]},s=function(e){if("string"!=typeof e.name)throw new Error("Name not present.");if(i.hasOwnProperty(e.name))throw new Error("A logger with that name already exists!");return i[e.name]=new n(e),!0},c=function(e){var t={name:"default"};if("object"==typeof e)for(var n in e)t[n]=e[n];else{if("string"!=typeof e)throw new Error("Invalid parameters for init()");t.token=e}return s(t)},u=function(e){"undefined"==typeof e&&(e="default"),delete i[e]};return{init:c,createLogStream:s,to:a,destroy:u,log:function(){for(var e in i)i[e].log.apply(this,arguments)},warn:function(){for(var e in i)i[e].warn.apply(this,arguments)},error:function(){for(var e in i)i[e].error.apply(this,arguments)},info:function(){for(var e in i)i[e].info.apply(this,arguments)}}})},520:function(e,t,n){var r,o,i;!function(a,s){"use strict";o=[n(204)],r=a,i="function"==typeof r?r.apply(t,o):r,!(void 0!==i&&(e.exports=i))}(function(){"use strict";return function(){function e(e){for(var t=0,n=e,r=/%[sdj]/;"string"==typeof n&&r.test(n);)n=n.replace(r,"{"+t+"}"),t++;return n}function t(){return Array.prototype.slice.call(arguments).join("/").replace(/([^:])[\/]{2,}/g,"$1/")}var n=window.app=window.app||{};window.assert,n.logger=n.logger||{};n.DEBUG="true"==="false".toLowerCase(),window.Logger.prototype.level=parseInt("0",10)||0,n.logger.level=parseInt("0",10)||0,n.logger.token="4d577ed8-29a8-4844-8efb-9c1ce2ae45ac",n.uris={cdn:{icons:t("https://d2rvsmwqptocm.cloudfront.net",e("/images/o_collection/svg/office/%s.svg"))},webapp:{home:"http://www.memba.com"+e("/"),feed:"http://www.memba.com"+e("/%s/index.rss"),sitemap:"http://www.memba.com"+e("/%s/sitemap.xml"),pages:"http://www.memba.com"+e("/%s/%s"),posts:"http://www.memba.com"+e("/%s/posts/%s/%s/%s")}}}(),window.app},n(201))},521:function(e,t,n){var r,o,i;!function(a,s){"use strict";o=[n(204)],r=a,i="function"==typeof r?r.apply(t,o):r,!(void 0!==i&&(e.exports=i))}(function(){"use strict";var e=window.app,t=new window.Logger("app.support");/*!
	     * modernizr v3.0.0-alpha.3
	     * Build http://v3.modernizr.com/download/#-audio-canvas-csstransforms-csstransitions-draganddrop-hashchange-localstorage-sessionstorage-svg-touchevents-video-webworkers-dontmin
	     *
	     * Copyright (c)
	     *  Faruk Ates
	     *  Paul Irish
	     *  Alex Sexton
	     *  Ryan Seddon
	     *  Alexander Farkas
	     *  Patrick Kettner
	     *  Stu Cox
	     *  Richard Herrera
	
	     * MIT License
	     */
return function(e,t,n){function r(e,t){return typeof e===t}function o(){var e,t,n,o,i,a,s;for(var c in m){if(e=[],t=m[c],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(o=r(t.fn,"function")?t.fn():t.fn,i=0;i<e.length;i++)a=e[i],s=a.split("."),1===s.length?v[s[0]]=o:(!v[s[0]]||v[s[0]]instanceof Boolean||(v[s[0]]=new Boolean(v[s[0]])),v[s[0]][s[1]]=o),h.push((o?"":"no-")+s.join("-"))}}function i(e,t){return!!~(""+e).indexOf(t)}function a(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function s(e,t){return function(){return e.apply(t,arguments)}}function c(e,t,n){var o;for(var i in e)if(e[i]in t)return n===!1?e[i]:(o=t[e[i]],r(o,"function")?s(o,n||t):o);return!1}function u(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function l(){var e=t.body;return e||(e=E("body"),e.fake=!0),e}function f(e,t,n,r){var o,i,a,s,c="modernizr",u=E("div"),f=l();if(parseInt(n,10))for(;n--;)a=E("div"),a.id=r?r[n]:c+(n+1),u.appendChild(a);return o=["&#173;",'<style id="s',c,'">',e,"</style>"].join(""),u.id=c,(f.fake?f:u).innerHTML+=o,f.appendChild(u),f.fake&&(f.style.background="",f.style.overflow="hidden",s=N.style.overflow,N.style.overflow="hidden",N.appendChild(f)),i=t(u,e),f.fake?(f.parentNode.removeChild(f),N.style.overflow=s,N.offsetHeight):u.parentNode.removeChild(u),!!i}function p(t,r){var o=t.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(u(t[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+u(t[o])+":"+r+")");return i=i.join(" or "),f("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return n}function d(e,t,o,s){function c(){l&&(delete O.style,delete O.modElem)}if(s=r(s,"undefined")?!1:s,!r(o,"undefined")){var u=p(e,o);if(!r(u,"undefined"))return u}var l,f,d,g,w;for(O.style||(l=!0,O.modElem=E("modernizr"),O.style=O.modElem.style),d=e.length,f=0;d>f;f++)if(g=e[f],w=O.style[g],i(g,"-")&&(g=a(g)),O.style[g]!==n){if(s||r(o,"undefined"))return c(),"pfx"==t?g:!0;try{O.style[g]=o}catch(m){}if(O.style[g]!=w)return c(),"pfx"==t?g:!0}return c(),!1}function g(e,t,n,o,i){var a=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+T.join(a+" ")+a).split(" ");return r(t,"string")||r(t,"undefined")?d(s,t,o,i):(s=(e+" "+A.join(a+" ")+a).split(" "),c(s,t,n))}function w(e,t,r){return g(e,n,n,t,r)}var m=[],y={_version:"3.0.0-alpha.3",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){m.push({name:e,fn:t,options:n})},addAsyncTest:function(e){m.push({name:null,fn:e})}},v=function(){};v.prototype=y,v=new v,v.addTest("localstorage",function(){var e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(t){return!1}}),v.addTest("sessionstorage",function(){var e="modernizr";try{return sessionStorage.setItem(e,e),sessionStorage.removeItem(e),!0}catch(t){return!1}}),v.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect);var h=[],E=function(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):t.createElement.apply(t,arguments)};/*!
	         {
	         "name": "Canvas",
	         "property": "canvas",
	         "caniuse": "canvas",
	         "tags": ["canvas", "graphics"],
	         "polyfills": ["flashcanvas", "excanvas", "slcanvas", "fxcanvas"]
	         }
	         !*/
v.addTest("canvas",function(){var e=E("canvas");return!(!e.getContext||!e.getContext("2d"))}),/*!
	         {
	         "name": "Drag & Drop",
	         "property": "draganddrop",
	         "caniuse": "dragndrop",
	         "knownBugs": ["Mobile browsers like Android, iOS < 6, and Firefox OS technically support the APIs, but don't expose it to the end user, resulting in a false positive."],
	         "notes": [{
	         "name": "W3C spec",
	         "href": "http://www.w3.org/TR/2010/WD-html5-20101019/dnd.html"
	         }],
	         "polyfills": ["dropfile", "moxie", "fileapi"]
	         }
	         !*/
v.addTest("draganddrop",function(){var e=E("div");return"draggable"in e||"ondragstart"in e&&"ondrop"in e}),/*!
	         {
	         "name" : "HTML5 Audio Element",
	         "property": "audio",
	         "tags" : ["html5", "audio", "media"]
	         }
	         !*/
v.addTest("audio",function(){var e=E("audio"),t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t),t.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),t.mp3=e.canPlayType("audio/mpeg;").replace(/^no$/,""),t.opus=e.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),t.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),t.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(n){}return t}),/*!
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
v.addTest("video",function(){var e=E("video"),t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t),t.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),t.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),t.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),t.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),t.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(n){}return t});var b="Moz O ms Webkit",T=y._config.usePrefixes?b.split(" "):[];y._cssomPrefixes=T;var A=y._config.usePrefixes?b.toLowerCase().split(" "):[];y._domPrefixes=A;var R={elem:E("modernizr")};v._q.push(function(){delete R.elem});var O={style:R.elem.style};v._q.unshift(function(){delete O.style});var N=t.documentElement;y.testAllProps=g,y.testAllProps=w,/*!
	         {
	         "name": "CSS Transforms",
	         "property": "csstransforms",
	         "caniuse": "transforms2d",
	         "tags": ["css"]
	         }
	         !*/
v.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&w("transform","scale(1)",!0)}),/*!
	         {
	         "name": "CSS Transitions",
	         "property": "csstransitions",
	         "caniuse": "css-transitions",
	         "tags": ["css"]
	         }
	         !*/
v.addTest("csstransitions",w("transition","all",!0)),/*!
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
v.addTest("webworkers","Worker"in e);var x=y._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):[];y._prefixes=x;var L=y.testStyles=f;/*!
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
v.addTest("touchevents",function(){var n;if("ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch)n=!0;else{var r=["@media (",x.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");L(r,function(e){n=9===e.offsetTop})}return n});var j=function(e){function n(t,n){var o;return t?(n&&"string"!=typeof n||(n=E(n||"div")),t="on"+t,o=t in n,!o&&r&&(n.setAttribute||(n=E("div")),n.setAttribute(t,""),o="function"==typeof n[t],n[t]!==e&&(n[t]=e),n.removeAttribute(t)),o):!1}var r=!("onblur"in t.documentElement);return n}(),S=y.hasEvent=j;/*!
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
v.addTest("hashchange",function(){return S("hashchange",e)===!1?!1:t.documentMode===n||t.documentMode>7}),o(),delete y.addTest,delete y.addAsyncTest;for(var P=0;P<v._q.length;P++)v._q[P]();e.Modernizr=v}(window,document),e.support=window.Modernizr,t.info({message:"browser tested by Modernizr"}),window.app},n(201))}});
//# sourceMappingURL=init.bundle.js.map