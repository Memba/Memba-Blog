!function(e){function r(k){if(o[k])return o[k].exports;var t=o[k]={exports:{},id:k,loaded:!1};return e[k].call(t.exports,t,t.exports,r),t.loaded=!0,t.exports}var o={};return r.m=e,r.c=o,r.p="http://www.memba.com/assets/",r(0)}({0:function(e,r,o){o(425),o(134),o(426)},133:function(e,r){e.exports=function(){throw new Error("define cannot be used indirect")}},134:function(e,r,o){var k,t,a;!function(i,l){"use strict";t=[o(135)],k=i,a="function"==typeof k?k.apply(r,t):k,!(void 0!==a&&(e.exports=a))}(function(e){"use strict";return function(r){function o(e){"string"==typeof e?e={message:e}:e instanceof Error?e={message:e.message,stack:e.stack,error:e}:"[object Object]"!==Object.prototype.toString.call(e)&&(e={data:e});var r=document.getElementById("session");return r instanceof HTMLInputElement&&(e.session=r.value),e}function k(e,r){if(t.DEBUG&&window.console&&typeof window.console.log===i){var o="["+r+"]"+(r===d.INFO||r===d.WARN||r===d.CRIT?" ":""),k=!0;if(e.message&&(o+=(k?"  ":"  |  ")+"message = "+e.message,k=!1),e.module&&(o+=(k?"  ":"  |  ")+"module = "+e.module,k=!1),e.method&&(o+=(k?"  ":"  |  ")+"method = "+e.method,k=!1),e.data)try{o+=(k?"  ":"  |  ")+"data = "+JSON.stringify(e.data)}catch(a){typeof e.data.toString===i&&(o+=(k?"  ":"  |  ")+"data = "+e.data.toString())}window.console.log(o),e.error instanceof Error&&typeof window.console.dir===i&&window.console.dir(e.error)}}var t=window.app=window.app||{},a=t.logger=t.logger||{token:"e78bac0b-377a-49e2-ad91-20bb4ec7cedc",level:0},i="function",l={DEBUG:1,INFO:2,WARN:4,ERROR:5,CRIT:6},d={DEBUG:"DEBUG",INFO:"INFO",WARN:"WARN",ERROR:"ERROR",CRIT:"CRIT"};e.init({token:a.token,ssl:!0,catchall:!0,trace:!1,page_info:"never",print:!1}),a.debug=function(r,t){return a.level>l.DEBUG?!1:(r=o(r),k(r,d.DEBUG),t&&setTimeout(function(){e.log(r)},0),!0)},a.info=function(r){return a.level>l.INFO?!1:(r=o(r),k(r,d.INFO),setTimeout(function(){e.info(r)},0),!0)},a.warn=function(r){return a.level>l.WARN?!1:(r=o(r),k(r,d.WARN),setTimeout(function(){e.warn(r)},0),!0)},a.error=function(r){return a.level>l.ERROR?!1:(r=o(r),k(r,d.ERROR),setTimeout(function(){e.error(r)},0),!0)},a.critical=function(r){return a.level>l.CRIT?!1:(r=o(r),k(r,d.CRIT),setTimeout(function(){e.error(r)},0),!0)}}(),window.app},o(133))},135:function(e,r,o){var k;/**
	 * @license Copyright 2013 Logentries.
	 * Please view license at https://raw.github.com/logentries/le_js/master/LICENSE
	 */
!function(t,a){k=function(){return a(t)}.call(r,o,r,e),!(void 0!==k&&(e.exports=k))}(this,function(e){"use strict";function r(r){var o,k=(Math.random()+Math.PI).toString(36).substring(2,10),t=r.trace,a=r.page_info,i=r.token,l=r.print;o=e.LEENDPOINT?e.LEENDPOINT:"js.logentries.com/v1";var d=!0,c=function(){return"undefined"==typeof XDomainRequest?r.ssl:"https:"===e.location.protocol?!0:!1}(),n=[],s=!1,b=!1;if(r.catchall){var u=e.onerror,p=function(e,r,o){return h({error:e,line:o,location:r}).level("ERROR").send(),u?u(e,r,o):!1};e.onerror=p}var g=function(){var r=e.navigator||{doNotTrack:void 0},o=e.screen||{},k=e.location||{};return{url:k.pathname,referrer:document.referrer,screen:{width:o.width,height:o.height},window:{width:e.innerWidth,height:e.innerHeight},browser:{name:r.appName,version:r.appVersion,cookie_enabled:r.cookieEnabled,do_not_track:r.doNotTrack},platform:r.platform}},A=function(){var e=null,r=Array.prototype.slice.call(arguments);if(0===r.length)throw new Error("No arguments!");return e=1===r.length?r[0]:r},h=function(e){var r=A.apply(this,arguments),o={event:r};return"never"!==a&&(b&&"per-entry"!==a||(b=!0,"undefined"==typeof r.screen&&"undefined"==typeof r.browser&&h(g()).level("PAGE").send())),t&&(o.trace=k),{level:function(e){if(l&&"undefined"!=typeof console&&"PAGE"!==e){var r=null;"undefined"!=typeof XDomainRequest&&(r=o.trace+" "+o.event);try{console[e.toLowerCase()].call(console,r||o)}catch(k){console.log(r||o)}}return o.level=e,{send:function(){var e=[],r=JSON.stringify(o,function(r,o){var k=function(e,r){for(var o=0;o<e.length;o++)if(r===e[o])return o;return-1};if("undefined"==typeof o)return"undefined";if("object"==typeof o&&null!==o){if(-1!==k(e,o))return"<?>";e.push(o)}return o});s?n.push(r):f(i,r)}}}}};this.log=h;var f=function(e,r){s=!0;var k=function(){return"undefined"!=typeof XDomainRequest?new XDomainRequest:new XMLHttpRequest},t=k();if(d){t.constructor===XMLHttpRequest?t.onreadystatechange=function(){4===t.readyState&&(t.status>=400?(console.error("Couldn't submit events."),410===t.status&&console.warn("This version of le_js is no longer supported!")):(301===t.status&&console.warn("This version of le_js is deprecated! Consider upgrading."),n.length>0?f(e,n.shift()):s=!1))}:t.onload=function(){n.length>0?f(e,n.shift()):s=!1};var a=(c?"https://":"http://")+o+"/logs/"+i;t.open("POST",a,!0),t.constructor===XMLHttpRequest&&(t.setRequestHeader("X-Requested-With","XMLHttpRequest"),t.setRequestHeader("Content-type","text/json")),t.send(r)}}}function o(e){var o,k={ssl:!0,catchall:!1,trace:!0,page_info:"never",print:!1,endpoint:null,token:null};if("object"!=typeof e)throw new Error("Invalid parameters for createLogStream()");for(var t in e)k[t]=e[t];if(null===k.token)throw new Error("Token not present.");o=new r(k);var a=function(e){if(o)return o.log.apply(this,arguments);throw new Error("You must call LE.init(...) first.")};return{log:function(){a.apply(this,arguments).level("LOG").send()},warn:function(){a.apply(this,arguments).level("WARN").send()},error:function(){a.apply(this,arguments).level("ERROR").send()},info:function(){a.apply(this,arguments).level("INFO").send()}}}var k={},t=function(e){if(!k.hasOwnProperty(e))throw new Error("Invalid name for logStream");return k[e]},a=function(e){if("string"!=typeof e.name)throw new Error("Name not present.");if(k.hasOwnProperty(e.name))throw new Error("A logger with that name already exists!");return k[e.name]=new o(e),!0},i=function(e){var r={name:"default"};if("object"==typeof e)for(var o in e)r[o]=e[o];else{if("string"!=typeof e)throw new Error("Invalid parameters for init()");r.token=e}return a(r)},l=function(e){"undefined"==typeof e&&(e="default"),delete k[e]};return{init:i,createLogStream:a,to:t,destroy:l,log:function(){for(var e in k)k[e].log.apply(this,arguments)},warn:function(){for(var e in k)k[e].warn.apply(this,arguments)},error:function(){for(var e in k)k[e].error.apply(this,arguments)},info:function(){for(var e in k)k[e].info.apply(this,arguments)}}})},425:function(e,r,o){var k,t,a;!function(i,l){"use strict";t=[o(134)],k=i,a="function"==typeof k?k.apply(r,t):k,!(void 0!==a&&(e.exports=a))}(function(){"use strict";return function(){function e(e){if((e.match(/%s/g)||[]).length>5)throw new Error("app.config value has too many %s to format");return e.replace(/%s/,"{0}").replace(/%s/,"{1}").replace(/%s/,"{2}").replace(/%s/,"{3}").replace(/%s/,"{4}")}var r=window.app=window.app||{};r.logger=r.logger||{};r.DEBUG="true"==="false".toLowerCase(),r.logger.token="4d577ed8-29a8-4844-8efb-9c1ce2ae45ac",r.uris={cdn:{"default":"https://d2rvsmwqptocm.cloudfront.net"+e("/images/%s"),svg:{office:"https://d2rvsmwqptocm.cloudfront.net"+e("/images/o_collection/svg/office/%s.svg"),white:"https://d2rvsmwqptocm.cloudfront.net"+e("/images/o_collection/svg/white/%s.svg"),dark_grey:"https://d2rvsmwqptocm.cloudfront.net"+e("/images/o_collection/svg/dark_grey/%s.svg")}},webapp:{home:"http://www.memba.com"+e("/"),feed:"http://www.memba.com"+e("/%s/index.rss"),sitemap:"http://www.memba.com"+e("/%s/sitemap.xml"),pages:"http://www.memba.com"+e("/%s/%s"),posts:"http://www.memba.com"+e("/%s/posts/%s/%s/%s")}}}(),window.app},o(133))},426:function(e,r,o){var k,t,a;!function(i,l){"use strict";t=[o(134)],k=i,a="function"==typeof k?k.apply(r,t):k,!(void 0!==a&&(e.exports=a))}(function(){"use strict";var e=window.app,r=e.logger;/*!
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
return function(e,r,o){function k(e,r){return typeof e===r}function t(){var e,r,o,t,a,i,l;for(var d in A){if(e=[],r=A[d],r.name&&(e.push(r.name.toLowerCase()),r.options&&r.options.aliases&&r.options.aliases.length))for(o=0;o<r.options.aliases.length;o++)e.push(r.options.aliases[o].toLowerCase());for(t=k(r.fn,"function")?r.fn():r.fn,a=0;a<e.length;a++)i=e[a],l=i.split("."),1===l.length?f[l[0]]=t:(!f[l[0]]||f[l[0]]instanceof Boolean||(f[l[0]]=new Boolean(f[l[0]])),f[l[0]][l[1]]=t),w.push((t?"":"no-")+l.join("-"))}}function a(e,r){return!!~(""+e).indexOf(r)}function i(e){return e.replace(/([a-z])-([a-z])/g,function(e,r,o){return r+o.toUpperCase()}).replace(/^-/,"")}function l(e,r){return function(){return e.apply(r,arguments)}}function d(e,r,o){var t;for(var a in e)if(e[a]in r)return o===!1?e[a]:(t=r[e[a]],k(t,"function")?l(t,o||r):t);return!1}function c(e){return e.replace(/([A-Z])/g,function(e,r){return"-"+r.toLowerCase()}).replace(/^ms-/,"-ms-")}function n(){var e=r.body;return e||(e=m("body"),e.fake=!0),e}function s(e,r,o,k){var t,a,i,l,d="modernizr",c=m("div"),s=n();if(parseInt(o,10))for(;o--;)i=m("div"),i.id=k?k[o]:d+(o+1),c.appendChild(i);return t=["&#173;",'<style id="s',d,'">',e,"</style>"].join(""),c.id=d,(s.fake?s:c).innerHTML+=t,s.appendChild(c),s.fake&&(s.style.background="",s.style.overflow="hidden",l=Q.style.overflow,Q.style.overflow="hidden",Q.appendChild(s)),a=r(c,e),s.fake?(s.parentNode.removeChild(s),Q.style.overflow=l,Q.offsetHeight):c.parentNode.removeChild(c),!!a}function b(r,k){var t=r.length;if("CSS"in e&&"supports"in e.CSS){for(;t--;)if(e.CSS.supports(c(r[t]),k))return!0;return!1}if("CSSSupportsRule"in e){for(var a=[];t--;)a.push("("+c(r[t])+":"+k+")");return a=a.join(" or "),s("@supports ("+a+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return o}function u(e,r,t,l){function d(){n&&(delete E.style,delete E.modElem)}if(l=k(l,"undefined")?!1:l,!k(t,"undefined")){var c=b(e,t);if(!k(c,"undefined"))return c}var n,s,u,p,g;for(E.style||(n=!0,E.modElem=m("modernizr"),E.style=E.modElem.style),u=e.length,s=0;u>s;s++)if(p=e[s],g=E.style[p],a(p,"-")&&(p=i(p)),E.style[p]!==o){if(l||k(t,"undefined"))return d(),"pfx"==r?p:!0;try{E.style[p]=t}catch(A){}if(E.style[p]!=g)return d(),"pfx"==r?p:!0}return d(),!1}function p(e,r,o,t,a){var i=e.charAt(0).toUpperCase()+e.slice(1),l=(e+" "+v.join(i+" ")+i).split(" ");return k(r,"string")||k(r,"undefined")?u(l,r,t,a):(l=(e+" "+C.join(i+" ")+i).split(" "),d(l,r,o))}function g(e,r,k){return p(e,o,o,r,k)}var A=[],h={_version:"3.0.0-alpha.3",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,r){var o=this;setTimeout(function(){r(o[e])},0)},addTest:function(e,r,o){A.push({name:e,fn:r,options:o})},addAsyncTest:function(e){A.push({name:null,fn:e})}},f=function(){};f.prototype=h,f=new f,/*!
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
f.addTest("localstorage",function(){var e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(r){return!1}}),/*!
	         {
	         "name": "Session Storage",
	         "property": "sessionstorage",
	         "tags": ["storage"],
	         "polyfills": ["joshuabell-polyfill", "cupcake", "sessionstorage"]
	         }
	         !*/
f.addTest("sessionstorage",function(){var e="modernizr";try{return sessionStorage.setItem(e,e),sessionStorage.removeItem(e),!0}catch(r){return!1}}),/*!
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
f.addTest("svg",!!r.createElementNS&&!!r.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect);var w=[],m=function(){return"function"!=typeof r.createElement?r.createElement(arguments[0]):r.createElement.apply(r,arguments)};/*!
	         {
	         "name": "Canvas",
	         "property": "canvas",
	         "caniuse": "canvas",
	         "tags": ["canvas", "graphics"],
	         "polyfills": ["flashcanvas", "excanvas", "slcanvas", "fxcanvas"]
	         }
	         !*/
f.addTest("canvas",function(){var e=m("canvas");return!(!e.getContext||!e.getContext("2d"))}),/*!
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
f.addTest("draganddrop",function(){var e=m("div");return"draggable"in e||"ondragstart"in e&&"ondrop"in e}),/*!
	         {
	         "name" : "HTML5 Audio Element",
	         "property": "audio",
	         "tags" : ["html5", "audio", "media"]
	         }
	         !*/
f.addTest("audio",function(){var e=m("audio"),r=!1;try{(r=!!e.canPlayType)&&(r=new Boolean(r),r.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),r.mp3=e.canPlayType("audio/mpeg;").replace(/^no$/,""),r.opus=e.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),r.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),r.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(o){}return r}),/*!
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
f.addTest("video",function(){var e=m("video"),r=!1;try{(r=!!e.canPlayType)&&(r=new Boolean(r),r.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),r.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),r.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),r.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),r.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(o){}return r});var x="Moz O ms Webkit",v=h._config.usePrefixes?x.split(" "):[];h._cssomPrefixes=v;var C=h._config.usePrefixes?x.toLowerCase().split(" "):[];h._domPrefixes=C;var B={elem:m("modernizr")};f._q.push(function(){delete B.elem});var E={style:B.elem.style};f._q.unshift(function(){delete E.style});var Q=r.documentElement;h.testAllProps=p,h.testAllProps=g,/*!
	         {
	         "name": "CSS Transforms",
	         "property": "csstransforms",
	         "caniuse": "transforms2d",
	         "tags": ["css"]
	         }
	         !*/
f.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&g("transform","scale(1)",!0)}),/*!
	         {
	         "name": "CSS Transitions",
	         "property": "csstransitions",
	         "caniuse": "css-transitions",
	         "tags": ["css"]
	         }
	         !*/
f.addTest("csstransitions",g("transition","all",!0)),/*!
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
f.addTest("webworkers","Worker"in e);var I=h._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):[];h._prefixes=I;var y=h.testStyles=s;/*!
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
f.addTest("touchevents",function(){var o;if("ontouchstart"in e||e.DocumentTouch&&r instanceof DocumentTouch)o=!0;else{var k=["@media (",I.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");y(k,function(e){o=9===e.offsetTop})}return o});var F=function(e){function o(r,o){var t;return r?(o&&"string"!=typeof o||(o=m(o||"div")),r="on"+r,t=r in o,!t&&k&&(o.setAttribute||(o=m("div")),o.setAttribute(r,""),t="function"==typeof o[r],o[r]!==e&&(o[r]=e),o.removeAttribute(r)),t):!1}var k=!("onblur"in r.documentElement);return o}(),D=h.hasEvent=F;/*!
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
f.addTest("hashchange",function(){return D("hashchange",e)===!1?!1:r.documentMode===o||r.documentMode>7}),t(),delete h.addTest,delete h.addAsyncTest;for(var J=0;J<f._q.length;J++)f._q[J]();e.Modernizr=f}(window,document),e.support=window.Modernizr,r.info({message:"browser tested by Modernizr",module:"app.support"}),window.app},o(133))}});