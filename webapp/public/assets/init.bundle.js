!function(e){function t(o){if(r[o])return r[o].exports;var a=r[o]={exports:{},id:o,loaded:!1};return e[o].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var r={};return t.m=e,t.c=r,t.p="http://www.memba.com/assets/",t(0)}({0:function(e,t,r){r(496),r(193),r(497)},192:function(e,t){e.exports=function(){throw new Error("define cannot be used indirect")}},193:function(e,t,r){var o,a,i;!function(k,n){"use strict";a=[r(194)],o=k,i="function"==typeof o?o.apply(t,a):o,!(void 0!==i&&(e.exports=i))}(function(e){"use strict";return function(t){function r(e){"string"==typeof e?e={message:e}:e instanceof Error?e={error:e}:"[object Object]"!==Object.prototype.toString.call(e)&&(e={data:e}),e.error instanceof Error&&(e.message=e.error.message,e.error.originalError instanceof Error?(e.originalError=e.error.originalError,delete e.error.originalError,e.originalMessage=e.originalError.message,e.stack=e.originalError.stack):e.stack=e.error.stack);var t=document.getElementById("session");return t instanceof HTMLInputElement&&(e.trace=t.value),e}function o(e,t){if(i.DEBUG&&window.console&&typeof window.console.log===n){var r=t,o=!0;if(e.message&&(r+=(o?d:c)+"message"+m+e.message,o=!1),e.originalMessage&&(r+=(o?d:c)+"originalMessage"+m+e.originalMessage,o=!1),e.module&&(r+=(o?d:c)+"module"+m+e.module,o=!1),e.method&&(r+=(o?d:c)+"method"+m+e.method,o=!1),e.stack&&(r+=(o?d:c)+"stack"+m+e.stack,o=!1),e.data)try{r+=(o?d:c)+"data"+m+JSON.stringify(e.data)}catch(a){typeof e.data.toString===n&&(r+=(o?d:c)+"data"+m+e.data.toString())}e.trace&&(r+=(o?d:c)+"trace"+m+e.trace,o=!1),window.console.log(r),e.error instanceof Error&&(typeof window.console.error===n?window.console.error(e.error):typeof window.console.dir===n&&window.console.dir(e.error)),e.originalError instanceof Error&&(typeof window.console.error===n?window.console.error(e.originalError):typeof window.console.dir===n&&window.console.dir(e.originalError))}}var a=window.LE||e,i=window.app=window.app||{},k=i.logger=i.logger||{token:"e78bac0b-377a-49e2-ad91-20bb4ec7cedc",level:0},n="function",l={DEBUG:"[DEBUG]",INFO:"[INFO] ",WARN:"[WARN] ",ERROR:"[ERROR]",CRIT:"[CRIT] "},s={DEBUG:1,INFO:2,WARN:4,ERROR:5,CRIT:6},m=" = ",d="  ",c="  |  ";a.init({token:k.token,ssl:!0,catchall:!1,trace:!1,page_info:"never",print:!1}),k.debug=function(e){return k.level>s.DEBUG?!1:(e=r(e),o(e,l.DEBUG),setTimeout(function(){a.log(e)},0),!0)},k.info=function(e){return k.level>s.INFO?!1:(e=r(e),o(e,l.INFO),setTimeout(function(){a.info(e)},0),!0)},k.warn=function(e){return k.level>s.WARN?!1:(e=r(e),o(e,l.WARN),setTimeout(function(){a.warn(e)},0),!0)},k.error=function(e){return k.level>s.ERROR?!1:(e=r(e),o(e,l.ERROR),setTimeout(function(){a.error(e)},0),!0)},k.critical=function(e){return k.level>s.CRIT?!1:(e=r(e),o(e,l.CRIT),setTimeout(function(){a.error(e)},0),!0)},window.onerror=function(e,t,r){var o=e+" at "+t+" (line "+r+")",a={message:o,module:"app.logger",method:"window.onerror",error:new Error(o)};return k.critical(a),!1}}(),window.app},r(192))},194:function(e,t,r){var o;/**
	 * @license Copyright 2013 Logentries.
	 * Please view license at https://raw.github.com/logentries/le_js/master/LICENSE
	 */
!function(a,i){o=function(){return i(a)}.call(t,r,t,e),!(void 0!==o&&(e.exports=o))}(this,function(e){"use strict";function t(t){var r,o=(Math.random()+Math.PI).toString(36).substring(2,10),a=t.trace,i=t.page_info,k=t.token,n=t.print;r=e.LEENDPOINT?e.LEENDPOINT:"js.logentries.com/v1";var l=!0,s=function(){return"undefined"==typeof XDomainRequest?t.ssl:"https:"===e.location.protocol?!0:!1}(),m=[],d=!1,c=!1;if(t.catchall){var b=e.onerror,p=function(e,t,r){return u({error:e,line:r,location:t}).level("ERROR").send(),b?b(e,t,r):!1};e.onerror=p}var f=function(){var t=e.navigator||{doNotTrack:void 0},r=e.screen||{},o=e.location||{};return{url:o.pathname,referrer:document.referrer,screen:{width:r.width,height:r.height},window:{width:e.innerWidth,height:e.innerHeight},browser:{name:t.appName,version:t.appVersion,cookie_enabled:t.cookieEnabled,do_not_track:t.doNotTrack},platform:t.platform}},g=function(){var e=null,t=Array.prototype.slice.call(arguments);if(0===t.length)throw new Error("No arguments!");return e=1===t.length?t[0]:t},u=function(e){var t=g.apply(this,arguments),r={event:t};return"never"!==i&&(c&&"per-entry"!==i||(c=!0,"undefined"==typeof t.screen&&"undefined"==typeof t.browser&&u(f()).level("PAGE").send())),a&&(r.trace=o),{level:function(e){if(n&&"undefined"!=typeof console&&"PAGE"!==e){var t=null;"undefined"!=typeof XDomainRequest&&(t=r.trace+" "+r.event);try{console[e.toLowerCase()].call(console,t||r)}catch(o){console.log(t||r)}}return r.level=e,{send:function(){var e=[],t=JSON.stringify(r,function(t,r){var o=function(e,t){for(var r=0;r<e.length;r++)if(t===e[r])return r;return-1};if("undefined"==typeof r)return"undefined";if("object"==typeof r&&null!==r){if(-1!==o(e,r))return"<?>";e.push(r)}return r});d?m.push(t):h(k,t)}}}}};this.log=u;var h=function(e,t){d=!0;var o=function(){return"undefined"!=typeof XDomainRequest?new XDomainRequest:new XMLHttpRequest},a=o();if(l){a.constructor===XMLHttpRequest?a.onreadystatechange=function(){4===a.readyState&&(a.status>=400?(console.error("Couldn't submit events."),410===a.status&&console.warn("This version of le_js is no longer supported!")):(301===a.status&&console.warn("This version of le_js is deprecated! Consider upgrading."),m.length>0?h(e,m.shift()):d=!1))}:a.onload=function(){m.length>0?h(e,m.shift()):d=!1};var i=(s?"https://":"http://")+r+"/logs/"+k;a.open("POST",i,!0),a.constructor===XMLHttpRequest&&(a.setRequestHeader("X-Requested-With","XMLHttpRequest"),a.setRequestHeader("Content-type","text/json")),a.send(t)}}}function r(e){var r,o={ssl:!0,catchall:!1,trace:!0,page_info:"never",print:!1,endpoint:null,token:null};if("object"!=typeof e)throw new Error("Invalid parameters for createLogStream()");for(var a in e)o[a]=e[a];if(null===o.token)throw new Error("Token not present.");r=new t(o);var i=function(e){if(r)return r.log.apply(this,arguments);throw new Error("You must call LE.init(...) first.")};return{log:function(){i.apply(this,arguments).level("LOG").send()},warn:function(){i.apply(this,arguments).level("WARN").send()},error:function(){i.apply(this,arguments).level("ERROR").send()},info:function(){i.apply(this,arguments).level("INFO").send()}}}var o={},a=function(e){if(!o.hasOwnProperty(e))throw new Error("Invalid name for logStream");return o[e]},i=function(e){if("string"!=typeof e.name)throw new Error("Name not present.");if(o.hasOwnProperty(e.name))throw new Error("A logger with that name already exists!");return o[e.name]=new r(e),!0},k=function(e){var t={name:"default"};if("object"==typeof e)for(var r in e)t[r]=e[r];else{if("string"!=typeof e)throw new Error("Invalid parameters for init()");t.token=e}return i(t)},n=function(e){"undefined"==typeof e&&(e="default"),delete o[e]};return{init:k,createLogStream:i,to:a,destroy:n,log:function(){for(var e in o)o[e].log.apply(this,arguments)},warn:function(){for(var e in o)o[e].warn.apply(this,arguments)},error:function(){for(var e in o)o[e].error.apply(this,arguments)},info:function(){for(var e in o)o[e].info.apply(this,arguments)}}})},496:function(e,t,r){var o,a,i;!function(k,n){"use strict";a=[r(193)],o=k,i="function"==typeof o?o.apply(t,a):o,!(void 0!==i&&(e.exports=i))}(function(){"use strict";return function(){function e(e){if((e.match(/%s/g)||[]).length>5)throw new Error("app.config value has too many %s to format");return e.replace(/%s/,"{0}").replace(/%s/,"{1}").replace(/%s/,"{2}").replace(/%s/,"{3}").replace(/%s/,"{4}")}var t=window.app=window.app||{};t.logger=t.logger||{};t.DEBUG="true"==="false".toLowerCase(),t.logger.token="4d577ed8-29a8-4844-8efb-9c1ce2ae45ac",t.uris={cdn:{"default":"https://d2rvsmwqptocm.cloudfront.net"+e("/images/%s"),svg:{office:"https://d2rvsmwqptocm.cloudfront.net"+e("/images/o_collection/svg/office/%s.svg"),white:"https://d2rvsmwqptocm.cloudfront.net"+e("/images/o_collection/svg/white/%s.svg"),dark_grey:"https://d2rvsmwqptocm.cloudfront.net"+e("/images/o_collection/svg/dark_grey/%s.svg")}},webapp:{home:"http://www.memba.com"+e("/"),feed:"http://www.memba.com"+e("/%s/index.rss"),sitemap:"http://www.memba.com"+e("/%s/sitemap.xml"),pages:"http://www.memba.com"+e("/%s/%s"),posts:"http://www.memba.com"+e("/%s/posts/%s/%s/%s")}}}(),window.app},r(192))},497:function(e,t,r){var o,a,i;!function(k,n){"use strict";a=[r(193)],o=k,i="function"==typeof o?o.apply(t,a):o,!(void 0!==i&&(e.exports=i))}(function(){"use strict";var e=window.app,t=e.logger;/*!
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
return function(e,t,r){function o(e,t){return typeof e===t}function a(){var e,t,r,a,i,k,n;for(var l in g){if(e=[],t=g[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(r=0;r<t.options.aliases.length;r++)e.push(t.options.aliases[r].toLowerCase());for(a=o(t.fn,"function")?t.fn():t.fn,i=0;i<e.length;i++)k=e[i],n=k.split("."),1===n.length?h[n[0]]=a:(!h[n[0]]||h[n[0]]instanceof Boolean||(h[n[0]]=new Boolean(h[n[0]])),h[n[0]][n[1]]=a),w.push((a?"":"no-")+n.join("-"))}}function i(e,t){return!!~(""+e).indexOf(t)}function k(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,r){return t+r.toUpperCase()}).replace(/^-/,"")}function n(e,t){return function(){return e.apply(t,arguments)}}function l(e,t,r){var a;for(var i in e)if(e[i]in t)return r===!1?e[i]:(a=t[e[i]],o(a,"function")?n(a,r||t):a);return!1}function s(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function m(){var e=t.body;return e||(e=x("body"),e.fake=!0),e}function d(e,t,r,o){var a,i,k,n,l="modernizr",s=x("div"),d=m();if(parseInt(r,10))for(;r--;)k=x("div"),k.id=o?o[r]:l+(r+1),s.appendChild(k);return a=["&#173;",'<style id="s',l,'">',e,"</style>"].join(""),s.id=l,(d.fake?d:s).innerHTML+=a,d.appendChild(s),d.fake&&(d.style.background="",d.style.overflow="hidden",n=B.style.overflow,B.style.overflow="hidden",B.appendChild(d)),i=t(s,e),d.fake?(d.parentNode.removeChild(d),B.style.overflow=n,B.offsetHeight):s.parentNode.removeChild(s),!!i}function c(t,o){var a=t.length;if("CSS"in e&&"supports"in e.CSS){for(;a--;)if(e.CSS.supports(s(t[a]),o))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];a--;)i.push("("+s(t[a])+":"+o+")");return i=i.join(" or "),d("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return r}function b(e,t,a,n){function l(){m&&(delete C.style,delete C.modElem)}if(n=o(n,"undefined")?!1:n,!o(a,"undefined")){var s=c(e,a);if(!o(s,"undefined"))return s}var m,d,b,p,f;for(C.style||(m=!0,C.modElem=x("modernizr"),C.style=C.modElem.style),b=e.length,d=0;b>d;d++)if(p=e[d],f=C.style[p],i(p,"-")&&(p=k(p)),C.style[p]!==r){if(n||o(a,"undefined"))return l(),"pfx"==t?p:!0;try{C.style[p]=a}catch(g){}if(C.style[p]!=f)return l(),"pfx"==t?p:!0}return l(),!1}function p(e,t,r,a,i){var k=e.charAt(0).toUpperCase()+e.slice(1),n=(e+" "+v.join(k+" ")+k).split(" ");return o(t,"string")||o(t,"undefined")?b(n,t,a,i):(n=(e+" "+y.join(k+" ")+k).split(" "),l(n,t,r))}function f(e,t,o){return p(e,r,r,t,o)}var g=[],u={_version:"3.0.0-alpha.3",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var r=this;setTimeout(function(){t(r[e])},0)},addTest:function(e,t,r){g.push({name:e,fn:t,options:r})},addAsyncTest:function(e){g.push({name:null,fn:e})}},h=function(){};h.prototype=u,h=new h,/*!
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
h.addTest("localstorage",function(){var e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(t){return!1}}),/*!
	         {
	         "name": "Session Storage",
	         "property": "sessionstorage",
	         "tags": ["storage"],
	         "polyfills": ["joshuabell-polyfill", "cupcake", "sessionstorage"]
	         }
	         !*/
h.addTest("sessionstorage",function(){var e="modernizr";try{return sessionStorage.setItem(e,e),sessionStorage.removeItem(e),!0}catch(t){return!1}}),/*!
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
h.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect);var w=[],x=function(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):t.createElement.apply(t,arguments)};/*!
	         {
	         "name": "Canvas",
	         "property": "canvas",
	         "caniuse": "canvas",
	         "tags": ["canvas", "graphics"],
	         "polyfills": ["flashcanvas", "excanvas", "slcanvas", "fxcanvas"]
	         }
	         !*/
h.addTest("canvas",function(){var e=x("canvas");return!(!e.getContext||!e.getContext("2d"))}),/*!
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
h.addTest("draganddrop",function(){var e=x("div");return"draggable"in e||"ondragstart"in e&&"ondrop"in e}),/*!
	         {
	         "name" : "HTML5 Audio Element",
	         "property": "audio",
	         "tags" : ["html5", "audio", "media"]
	         }
	         !*/
h.addTest("audio",function(){var e=x("audio"),t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t),t.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),t.mp3=e.canPlayType("audio/mpeg;").replace(/^no$/,""),t.opus=e.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),t.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),t.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(r){}return t}),/*!
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
h.addTest("video",function(){var e=x("video"),t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t),t.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),t.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),t.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),t.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),t.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(r){}return t});var A="Moz O ms Webkit",v=u._config.usePrefixes?A.split(" "):[];u._cssomPrefixes=v;var y=u._config.usePrefixes?A.toLowerCase().split(" "):[];u._domPrefixes=y;var z={elem:x("modernizr")};h._q.push(function(){delete z.elem});var C={style:z.elem.style};h._q.unshift(function(){delete C.style});var B=t.documentElement;u.testAllProps=p,u.testAllProps=f,/*!
	         {
	         "name": "CSS Transforms",
	         "property": "csstransforms",
	         "caniuse": "transforms2d",
	         "tags": ["css"]
	         }
	         !*/
h.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&f("transform","scale(1)",!0)}),/*!
	         {
	         "name": "CSS Transitions",
	         "property": "csstransitions",
	         "caniuse": "css-transitions",
	         "tags": ["css"]
	         }
	         !*/
h.addTest("csstransitions",f("transition","all",!0)),/*!
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
h.addTest("webworkers","Worker"in e);var E=u._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):[];u._prefixes=E;var Q=u.testStyles=d;/*!
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
h.addTest("touchevents",function(){var r;if("ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch)r=!0;else{var o=["@media (",E.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");Q(o,function(e){r=9===e.offsetTop})}return r});var I=function(e){function r(t,r){var a;return t?(r&&"string"!=typeof r||(r=x(r||"div")),t="on"+t,a=t in r,!a&&o&&(r.setAttribute||(r=x("div")),r.setAttribute(t,""),a="function"==typeof r[t],r[t]!==e&&(r[t]=e),r.removeAttribute(t)),a):!1}var o=!("onblur"in t.documentElement);return r}(),F=u.hasEvent=I;/*!
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
h.addTest("hashchange",function(){return F("hashchange",e)===!1?!1:t.documentMode===r||t.documentMode>7}),a(),delete u.addTest,delete u.addAsyncTest;for(var J=0;J<h._q.length;J++)h._q[J]();e.Modernizr=h}(window,document),e.support=window.Modernizr,t.info({message:"browser tested by Modernizr",module:"app.support"}),window.app},r(192))}});