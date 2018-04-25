/*! Copyright ©2013-2018 Memba® Sarl. All rights reserved. - Version 0.3.8 dated Wed Apr 25 2018 13:17:40 */!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="https://www.memba.com/build/",n(n.s=106)}({0:function(e,t){e.exports=function(){throw new Error("define cannot be used indirect")}},104:function(e,t,n){var o,r,a;!function(n,i){"use strict";r=[],void 0===(a="function"==typeof(o=function(){var e=window.app;
/*!
     * modernizr v3.3.1
     * Build https://modernizr.com/download?-atobbtoa-audio-blobconstructor-bloburls-canvas-canvastext-csstransforms-datauri-filereader-flexbox-hashchange-history-inlinesvg-localstorage-sessionstorage-svg-svgasimg-touchevents-video-webworkers-setclasses-dontmin
     *
     * Copyright (c)
     *  Faruk Ates
     *  Paul Irish
     *  Alex Sexton
     *  Ryan Seddon
     *  Patrick Kettner
     *  Stu Cox
     *  Richard Herrera

     * MIT License
     */return function(e,t,n){var o=[],r=[],a={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){r.push({name:e,fn:t,options:n})},addAsyncTest:function(e){r.push({name:null,fn:e})}},i=function(){};function s(e,t){return typeof e===t}i.prototype=a,
/*!
         {
         "name": "Blob constructor",
         "property": "blobconstructor",
         "aliases": ["blob-constructor"],
         "builderAliases": ["blob_constructor"],
         "caniuse": "blobbuilder",
         "notes": [{
         "name": "W3C spec",
         "href": "https://w3c.github.io/FileAPI/#constructorBlob"
         }],
         "polyfills": ["blobjs"]
         }
         !*/
(i=new i).addTest("blobconstructor",function(){try{return!!new Blob}catch(e){return!1}},{aliases:["blob-constructor"]}),
/*!
         {
         "name": "History API",
         "property": "history",
         "caniuse": "history",
         "tags": ["history"],
         "authors": ["Hay Kranen", "Alexander Farkas"],
         "notes": [{
         "name": "W3C Spec",
         "href": "https://www.w3.org/TR/html51/browsers.html#the-history-interface"
         }, {
         "name": "MDN documentation",
         "href": "https://developer.mozilla.org/en-US/docs/Web/API/window.history"
         }],
         "polyfills": ["historyjs", "html5historyapi"]
         }
         !*/
i.addTest("history",function(){var t=navigator.userAgent;return(-1===t.indexOf("Android 2.")&&-1===t.indexOf("Android 4.0")||-1===t.indexOf("Mobile Safari")||-1!==t.indexOf("Chrome")||-1!==t.indexOf("Windows Phone")||"file:"===location.protocol)&&e.history&&"pushState"in e.history}),
/*!
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
i.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect),
/*!
         {
         "name": "File API",
         "property": "filereader",
         "caniuse": "fileapi",
         "notes": [{
         "name": "W3C Working Draft",
         "href": "https://www.w3.org/TR/FileAPI/"
         }],
         "tags": ["file"],
         "builderAliases": ["file_api"],
         "knownBugs": ["Will fail in Safari 5 due to its lack of support for the standards defined FileReader object"]
         }
         !*/
i.addTest("filereader",!!(e.File&&e.FileList&&e.FileReader)),
/*!
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
i.addTest("localstorage",function(){var e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(e){return!1}}),
/*!
         {
         "name": "Session Storage",
         "property": "sessionstorage",
         "tags": ["storage"],
         "polyfills": ["joshuabell-polyfill", "cupcake", "sessionstorage"]
         }
         !*/
i.addTest("sessionstorage",function(){var e="modernizr";try{return sessionStorage.setItem(e,e),sessionStorage.removeItem(e),!0}catch(e){return!1}}),
/*!
         {
         "name": "Base 64 encoding/decoding",
         "property": ["atobbtoa"],
         "builderAliases": ["atob-btoa"],
         "caniuse" : "atob-btoa",
         "tags": ["atob", "base64", "WindowBase64", "btoa"],
         "authors": ["Christian Ulbrich"],
         "notes": [{
         "name": "WindowBase64",
         "href": "https://www.w3.org/TR/html5/webappapis.html#windowbase64"
         }, {
         "name": "MDN documentation",
         "href": "https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/atob"
         }],
         "polyfills": ["base64js"]
         }
         !*/
i.addTest("atobbtoa","atob"in e&&"btoa"in e,{aliases:["atob-btoa"]}),
/*!
         {
         "name": "Web Workers",
         "property": "webworkers",
         "caniuse" : "webworkers",
         "tags": ["performance", "workers"],
         "notes": [{
         "name": "W3C Reference",
         "href": "https://www.w3.org/TR/workers/"
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
i.addTest("webworkers","Worker"in e);var c=t.documentElement,l="svg"===c.nodeName.toLowerCase();function u(e){var t=c.className,n=i._config.classPrefix||"";if(l&&(t=t.baseVal),i._config.enableJSClass){var o=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(o,"$1"+n+"js$2")}i._config.enableClasses&&(t+=" "+n+e.join(" "+n),l?c.className.baseVal=t:c.className=t)}function d(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):l?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}
/*!
         {
         "name" : "HTML5 Audio Element",
         "property": "audio",
         "tags" : ["html5", "audio", "media"]
         }
         !*/i.addTest("audio",function(){var e=d("audio"),t=!1;try{(t=!!e.canPlayType)&&((t=new Boolean(t)).ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),t.mp3=e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/,""),t.opus=e.canPlayType('audio/ogg; codecs="opus"')||e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/,""),t.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),t.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(e){}return t}),
/*!
         {
         "name": "Canvas",
         "property": "canvas",
         "caniuse": "canvas",
         "tags": ["canvas", "graphics"],
         "polyfills": ["flashcanvas", "excanvas", "slcanvas", "fxcanvas"]
         }
         !*/
i.addTest("canvas",function(){var e=d("canvas");return!(!e.getContext||!e.getContext("2d"))}),
/*!
         {
         "name": "Canvas text",
         "property": "canvastext",
         "caniuse": "canvas-text",
         "tags": ["canvas", "graphics"],
         "polyfills": ["canvastext"]
         }
         !*/
i.addTest("canvastext",function(){return!1!==i.canvas&&"function"==typeof d("canvas").getContext("2d").fillText}),
/*!
         {
         "name": "HTML5 Video",
         "property": "video",
         "caniuse": "video",
         "tags": ["html5"],
         "knownBugs": [
         "Without QuickTime, `Modernizr.video.h264` will be `undefined`; https://github.com/Modernizr/Modernizr/issues/546"
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
i.addTest("video",function(){var e=d("video"),t=!1;try{(t=!!e.canPlayType)&&((t=new Boolean(t)).ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),t.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),t.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),t.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),t.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(e){}return t}),
/*!
         {
         "name": "Inline SVG",
         "property": "inlinesvg",
         "caniuse": "svg-html5",
         "tags": ["svg"],
         "notes": [{
         "name": "Test page",
         "href": "https://paulirish.com/demo/inline-svg"
         }, {
         "name": "Test page and results",
         "href": "https://codepen.io/eltonmesquita/full/GgXbvo/"
         }],
         "polyfills": ["inline-svg-polyfill"],
         "knownBugs": ["False negative on some Chromia browsers."]
         }
         !*/
i.addTest("inlinesvg",function(){var e=d("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"===("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)});var f,p=(f=!("onblur"in t.documentElement),function(e,t){var o;return!!e&&(t&&"string"!=typeof t||(t=d(t||"div")),!(o=(e="on"+e)in t)&&f&&(t.setAttribute||(t=d("div")),t.setAttribute(e,""),o="function"==typeof t[e],t[e]!==n&&(t[e]=n),t.removeAttribute(e)),o)});a.hasEvent=p,
/*!
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
i.addTest("hashchange",function(){return!1!==p("hashchange",e)&&(t.documentMode===n||t.documentMode>7)});var v,m,g=a._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];function h(e,t){if("object"==typeof e)for(var n in e)v(e,n)&&h(n,e[n]);else{var o=(e=e.toLowerCase()).split("."),r=i[o[0]];if(2===o.length&&(r=r[o[1]]),void 0!==r)return i;t="function"==typeof t?t():t,1===o.length?i[o[0]]=t:(!i[o[0]]||i[o[0]]instanceof Boolean||(i[o[0]]=new Boolean(i[o[0]])),i[o[0]][o[1]]=t),u([(t&&!1!==t?"":"no-")+o.join("-")]),i._trigger(e,t)}return i}function w(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function y(e,n,o,r){var a,i,s,u,f="modernizr",p=d("div"),v=function(){var e=t.body;return e||((e=d(l?"svg":"body")).fake=!0),e}();if(parseInt(o,10))for(;o--;)(s=d("div")).id=r?r[o]:f+(o+1),p.appendChild(s);return(a=d("style")).type="text/css",a.id="s"+f,(v.fake?v:p).appendChild(a),v.appendChild(p),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(t.createTextNode(e)),p.id=f,v.fake&&(v.style.background="",v.style.overflow="hidden",u=c.style.overflow,c.style.overflow="hidden",c.appendChild(v)),i=n(p,e),v.fake?(v.parentNode.removeChild(v),c.style.overflow=u,c.offsetHeight):p.parentNode.removeChild(p),!!i}a._prefixes=g,v=s(m={}.hasOwnProperty,"undefined")||s(m.call,"undefined")?function(e,t){return t in e&&s(e.constructor.prototype[t],"undefined")}:function(e,t){return m.call(e,t)},a._l={},a.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),i.hasOwnProperty(e)&&setTimeout(function(){i._trigger(e,i[e])},0)},a._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout(function(){var e;for(e=0;e<n.length;e++)(0,n[e])(t)},0),delete this._l[e]}},i._q.push(function(){a.addTest=h}),
/*!
         {
         "name": "SVG as an <img> tag source",
         "property": "svgasimg",
         "caniuse" : "svg-img",
         "tags": ["svg"],
         "aliases": ["svgincss"],
         "authors": ["Chris Coyier"],
         "notes": [{
         "name": "HTML5 Spec",
         "href": "http://www.w3.org/TR/html5/embedded-content-0.html#the-img-element"
         }]
         }
         !*/
i.addTest("svgasimg",t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")),
/*!
         {
         "name": "Data URI",
         "property": "datauri",
         "caniuse": "datauri",
         "tags": ["url"],
         "builderAliases": ["url_data_uri"],
         "async": true,
         "notes": [{
         "name": "Wikipedia article",
         "href": "https://en.wikipedia.org/wiki/Data_URI_scheme"
         }],
         "warnings": ["Support in Internet Explorer 8 is limited to images and linked resources like CSS files, not HTML files"]
         }
         !*/
i.addAsyncTest(function(){-1!==navigator.userAgent.indexOf("MSIE 7.")&&setTimeout(function(){h("datauri",!1)},10);var e=new Image;e.onerror=function(){h("datauri",!1)},e.onload=function(){1===e.width&&1===e.height?h("datauri",!0):h("datauri",!1)},e.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="});var b=a.testStyles=y;
/*!
         {
         "name": "Touch Events",
         "property": "touchevents",
         "caniuse" : "touch",
         "tags": ["media", "attribute"],
         "notes": [{
         "name": "Touch Events spec",
         "href": "https://www.w3.org/TR/2013/WD-touch-events-20130124/"
         }],
         "warnings": [
         "Indicates if the browser supports the Touch Events spec, and does not necessarily reflect a touchscreen device"
         ],
         "knownBugs": [
         "False-positive on some configurations of Nokia N900",
         "False-positive on some BlackBerry 6.0 builds – https://github.com/Modernizr/Modernizr/issues/372#issuecomment-3112695"
         ]
         }
         !*/i.addTest("touchevents",function(){var n;if("ontouchstart"in e||e.DocumentTouch&&t instanceof e.DocumentTouch)n=!0;else{var o=["@media (",g.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");b(o,function(e){n=9===e.offsetTop})}return n});var x=a._config.usePrefixes?"Moz O ms Webkit".split(" "):[];a._cssomPrefixes=x;var T=function(t){var o,r=g.length,a=e.CSSRule;if(void 0===a)return n;if(!t)return!1;if((o=(t=t.replace(/^@/,"")).replace(/-/g,"_").toUpperCase()+"_RULE")in a)return"@"+t;for(var i=0;i<r;i++){var s=g[i];if(s.toUpperCase()+"_"+o in a)return"@-"+s.toLowerCase()+"-"+t}return!1};a.atRule=T;var A=a._config.usePrefixes?"Moz O ms Webkit".toLowerCase().split(" "):[];function C(e,t){return function(){return e.apply(t,arguments)}}a._domPrefixes=A;var S={elem:d("modernizr")};i._q.push(function(){delete S.elem});var P={style:S.elem.style};function _(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function E(t,o){var r=t.length;if("CSS"in e&&"supports"in e.CSS){for(;r--;)if(e.CSS.supports(_(t[r]),o))return!0;return!1}if("CSSSupportsRule"in e){for(var a=[];r--;)a.push("("+_(t[r])+":"+o+")");return y("@supports ("+(a=a.join(" or "))+") { #modernizr { position: absolute; } }",function(t){return"absolute"===function(t,n,o){var r;if("getComputedStyle"in e){r=getComputedStyle.call(e,t,n);var a=e.console;null!==r?o&&(r=r.getPropertyValue(o)):a&&a[a.error?"error":"log"].call(a,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}else r=!n&&t.currentStyle&&t.currentStyle[o];return r}(t,null,"position")})}return n}function O(e,t,o,r,a){var i=e.charAt(0).toUpperCase()+e.slice(1),c=(e+" "+x.join(i+" ")+i).split(" ");return s(t,"string")||s(t,"undefined")?function(e,t,o,r){if(r=!s(r,"undefined")&&r,!s(o,"undefined")){var a=E(e,o);if(!s(a,"undefined"))return a}for(var i,c,l,u,f,p=["modernizr","tspan","samp"];!P.style&&p.length;)i=!0,P.modElem=d(p.shift()),P.style=P.modElem.style;function v(){i&&(delete P.style,delete P.modElem)}for(l=e.length,c=0;c<l;c++)if(u=e[c],f=P.style[u],~(""+u).indexOf("-")&&(u=w(u)),P.style[u]!==n){if(r||s(o,"undefined"))return v(),"pfx"!==t||u;try{P.style[u]=o}catch(e){}if(P.style[u]!==f)return v(),"pfx"!==t||u}return v(),!1}(c,t,r,a):function(e,t,n){var o;for(var r in e)if(e[r]in t)return!1===n?e[r]:s(o=t[e[r]],"function")?C(o,n||t):o;return!1}(c=(e+" "+A.join(i+" ")+i).split(" "),t,o)}function L(e,t,o){return O(e,n,n,t,o)}i._q.unshift(function(){delete P.style}),a.testAllProps=O,a.testAllProps=L,
/*!
         {
         "name": "Flexbox",
         "property": "flexbox",
         "caniuse": "flexbox",
         "tags": ["css"],
         "notes": [{
         "name": "The _new_ flexbox",
         "href": "http://dev.w3.org/csswg/css3-flexbox"
         }],
         "warnings": [
         "A `true` result for this detect does not imply that the `flex-wrap` property is supported; see the `flexwrap` detect."
         ]
         }
         !*/
i.addTest("flexbox",L("flexBasis","1px",!0)),
/*!
         {
         "name": "CSS Transforms",
         "property": "csstransforms",
         "caniuse": "transforms2d",
         "tags": ["css"]
         }
         !*/
i.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&L("transform","scale(1)",!0)});var j=(a.prefixed=function(e,t,n){return 0===e.indexOf("@")?T(e):(-1!==e.indexOf("-")&&(e=w(e)),t?O(e,t,n):O(e,"pfx"))})("URL",e,!1);
/*!
         {
         "name": "Blob URLs",
         "property": "bloburls",
         "caniuse": "bloburls",
         "notes": [{
         "name": "W3C Working Draft",
         "href": "https://www.w3.org/TR/FileAPI/#creating-revoking"
         }],
         "tags": ["file", "url"],
         "authors": ["Ron Waldon (@jokeyrhyme)"]
         }
         !*/j=j&&e[j],i.addTest("bloburls",j&&"revokeObjectURL"in j&&"createObjectURL"in j),function(){var e,t,n,a,c,l;for(var u in r)if(r.hasOwnProperty(u)){if(e=[],(t=r[u]).name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(a=s(t.fn,"function")?t.fn():t.fn,c=0;c<e.length;c++)1===(l=e[c].split(".")).length?i[l[0]]=a:(!i[l[0]]||i[l[0]]instanceof Boolean||(i[l[0]]=new Boolean(i[l[0]])),i[l[0]][l[1]]=a),o.push((a?"":"no-")+l.join("-"))}}(),u(o),delete a.addTest,delete a.addAsyncTest;for(var k=0;k<i._q.length;k++)i._q[k]();e.Modernizr=i}(window,document),e.support=window.Modernizr,window.app})?o.apply(t,r):o)||(e.exports=a)}(0,n(0))},105:function(e,t,n){var o,r,a;!function(n,i){"use strict";r=[],void 0===(a="function"==typeof(o=function(){return function(){var e=window.app=window.app||{},t=function(){return Array.prototype.slice.call(arguments).join("/").replace(/([^:])[\/]{2,}/g,"$1/")};function n(e){for(var t=0,n=e,o=/%[sdj]/;"string"==typeof n&&o.test(n);)n=n.replace(o,"{"+t+"}"),t++;return n}e.DEBUG="true"==="false".toLowerCase(),e.version="0.3.8",e.locales=JSON.parse('["en","fr"]'),e.constants={facebookAppId:"765157796920609",twitterAccount:"memba"},e.uris={cdn:{icons:t("https://cdn.kidoju.com",n("/images/o_collection/svg/office/%s.svg"))},webapp:{error:t("https://www.memba.com",n("/%s/error")),home:t("https://www.memba.com",n("/")),locale:t("https://www.memba.com",n("/%s")),logger:t("https://www.memba.com",n("/logger")),feed:t("https://www.memba.com",n("/%s/rss.xml")),sitemap:t("https://www.memba.com",n("/%s/sitemap.xml")),pages:t("https://www.memba.com",n("/%s/%s")),posts:t("https://www.memba.com",n("/%s/posts/%s/%s/%s"))}},e.logger=e.logger||{},e.logger.level=parseInt("2",10)||0,e.logger.endPoint=e.uris.webapp.logger}(),window.app})?o.apply(t,r):o)||(e.exports=a)}(0,n(0))},106:function(e,t,n){n(105),n(104),function(){"use strict";var e=window.document,t=window.navigator;if("standalone"in t&&t.standalone){var n=e.location,o=/^(a|html)$/i;e.addEventListener("click",function(e){for(var t=e.target;!o.test(t.nodeName);)t=t.parentNode;var r=t.href;"string"===$.type(r)&&r.length>1&&r!==n.href&&r.replace(n.protocol+"//"+n.host+n.pathname,"").length>1&&r.replace(n.protocol+"//"+n.host+n.pathname,"").indexOf("#")&&(!/^[a-z\+\.\-]+:/i.test(r)||0===r.indexOf(n.protocol+"//"+n.host))&&(e.preventDefault(),n.assign(r))},!1)}}(),function(){"use strict";var e=window.app,t=window.location,n=window.document.getElementsByTagName("html")[0].getAttribute("lang"),o=e.uris.webapp.error.replace("{0}",n),r=e.DEBUG&&navigator.userAgent.indexOf("PhantomJS")>=0,a=/bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);if(!r&&!a&&t.href.substr(0,o.length)!==o){var i=e.support;i.atobbtoa&&i.audio&&(i.audio.mp3||i.audio.ogg)&&i.blobconstructor&&i.bloburls&&i.canvas&&i.canvastext&&i.csstransforms&&i.filereader&&i.flexbox&&i.hashchange&&i.history&&i.localstorage&&i.sessionstorage&&i.svg&&i.inlinesvg&&i.svgasimg&&i.video&&(i.video.h264||i.video.ogg||i.video.webm)&&i.webworkers||t.assign(o+"?code=1000")}}(),function(t){"use strict";var n=0,o=!1,r=function(e){for(var t=e.target;t!==document.body&&t!==document;){var o=window.getComputedStyle(t);if(!o)break;if("INPUT"===t.nodeName&&"range"===t.getAttribute("type"))return;var r=o.getPropertyValue("-webkit-overflow-scrolling"),a=o.getPropertyValue("overflow-y"),i=parseInt(o.getPropertyValue("height"),10),s="touch"===r&&("auto"===a||"scroll"===a),c=t.scrollHeight>t.offsetHeight;if(s&&c){var l=e.touches?e.touches[0].screenY:e.screenY,u=n<=l&&0===t.scrollTop,d=n>=l&&t.scrollHeight-t.scrollTop===i;return void((u||d)&&e.preventDefault())}t=t.parentNode}e.preventDefault()},a=function(e){n=e.touches?e.touches[0].screenY:e.screenY},i=function(){window.addEventListener("touchstart",a,!1),window.addEventListener("touchmove",r,!1),o=!0},s=document.createElement("div");document.documentElement.appendChild(s),s.style.WebkitOverflowScrolling="touch";var c="getComputedStyle"in window&&"touch"===window.getComputedStyle(s)["-webkit-overflow-scrolling"];document.documentElement.removeChild(s),c&&i();var l={enable:i,disable:function(){window.removeEventListener("touchstart",a,!1),window.removeEventListener("touchmove",r,!1),o=!1},isEnabled:function(){return o}};void 0!==e&&e.exports&&(e.exports=l),"function"==typeof t.define?(0,t.define)("iNoBounce",[],function(){return l}):t.iNoBounce=l}(this)}});