/*! Copyright ©2013-2016 Memba® Sarl. All rights reserved. - Version 0.2.23 dated 7/21/2016 */
/*! Copyright ©2013-2016 Memba® Sarl. All rights reserved. - Version 0.2.23 dated 7/21/2016 */
!function(e){function n(o){if(t[o])return t[o].exports;var r=t[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}var t={};return n.m=e,n.c=t,n.p="http://www.memba.com/build/",n(0)}({0:function(e,n,t){t(506),t(507)},185:function(e,n){e.exports=function(){throw new Error("define cannot be used indirect")}},506:function(e,n,t){var o,r,a;!function(t,i){"use strict";r=[],o=t,a="function"==typeof o?o.apply(n,r):o,!(void 0!==a&&(e.exports=a))}(function(){"use strict";return function(){function e(e){for(var n=0,t=e,o=/%[sdj]/;"string"==typeof t&&o.test(t);)t=t.replace(o,"{"+n+"}"),n++;return t}var n=window.app=window.app||{},t={join:function(){return Array.prototype.slice.call(arguments).join("/").replace(/([^:])[\/]{2,}/g,"$1/")}};n.DEBUG="true"==="false".toLowerCase(),n.version="0.2.23",n.locales=JSON.parse('["en","fr"]'),n.facebook={clientID:"765157796920609"},n.twitter={account:"memba"},n.uris={cdn:{icons:t.join("https://cdn.kidoju.com",e("/images/o_collection/svg/office/%s.svg"))},webapp:{home:t.join("http://www.memba.com",e("/")),locale:t.join("http://www.memba.com",e("/%s")),logger:t.join("http://www.memba.com",e("/logger")),feed:t.join("http://www.memba.com",e("/%s/rss.xml")),sitemap:t.join("http://www.memba.com",e("/%s/sitemap.xml")),pages:t.join("http://www.memba.com",e("/%s/%s")),posts:t.join("http://www.memba.com",e("/%s/posts/%s/%s/%s"))}},n.logger=n.logger||{},n.logger.level=parseInt("0",10)||0,n.logger.endPoint=n.uris.webapp.logger}(),window.app},t(185))},507:function(e,n,t){var o,r,a;!function(t,i){"use strict";r=[],o=t,a="function"==typeof o?o.apply(n,r):o,!(void 0!==a&&(e.exports=a))}(function(){"use strict";var e=window.app;return function(e,n,t){function o(e,n){return typeof e===n}function r(){var e,n,t,r,a,i,s;for(var c in b)if(b.hasOwnProperty(c)){if(e=[],n=b[c],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(r=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],s=i.split("."),1===s.length?T[s[0]]=r:(!T[s[0]]||T[s[0]]instanceof Boolean||(T[s[0]]=new Boolean(T[s[0]])),T[s[0]][s[1]]=r),y.push((r?"":"no-")+s.join("-"))}}function a(e){var n=x.className,t=T._config.classPrefix||"";if(C&&(n=n.baseVal),T._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}T._config.enableClasses&&(n+=" "+t+e.join(" "+t),C?x.className.baseVal=n:x.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):C?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function s(e,n){if("object"==typeof e)for(var t in e)_(e,t)&&s(t,e[t]);else{e=e.toLowerCase();var o=e.split("."),r=T[o[0]];if(2===o.length&&(r=r[o[1]]),"undefined"!=typeof r)return T;n="function"==typeof n?n():n,1===o.length?T[o[0]]=n:(!T[o[0]]||T[o[0]]instanceof Boolean||(T[o[0]]=new Boolean(T[o[0]])),T[o[0]][o[1]]=n),a([(n&&n!==!1?"":"no-")+o.join("-")]),T._trigger(e,n)}return T}function c(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function u(){var e=n.body;return e||(e=i(C?"svg":"body"),e.fake=!0),e}function l(e,t,o,r){var a,s,c,l,d="modernizr",f=i("div"),p=u();if(parseInt(o,10))for(;o--;)c=i("div"),c.id=r?r[o]:d+(o+1),f.appendChild(c);return a=i("style"),a.type="text/css",a.id="s"+d,(p.fake?p:f).appendChild(a),p.appendChild(f),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(n.createTextNode(e)),f.id=d,p.fake&&(p.style.background="",p.style.overflow="hidden",l=x.style.overflow,x.style.overflow="hidden",x.appendChild(p)),s=t(f,e),p.fake?(p.parentNode.removeChild(p),x.style.overflow=l,x.offsetHeight):f.parentNode.removeChild(f),!!s}function d(e,n){return!!~(""+e).indexOf(n)}function f(e,n){return function(){return e.apply(n,arguments)}}function p(e,n,t){var r;for(var a in e)if(e[a]in n)return t===!1?e[a]:(r=n[e[a]],o(r,"function")?f(r,t||n):r);return!1}function m(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function v(n,o){var r=n.length;if("CSS"in e&&"supports"in e.CSS){for(;r--;)if(e.CSS.supports(m(n[r]),o))return!0;return!1}if("CSSSupportsRule"in e){for(var a=[];r--;)a.push("("+m(n[r])+":"+o+")");return a=a.join(" or "),l("@supports ("+a+") { #modernizr { position: absolute; } }",function(e){return"absolute"===getComputedStyle(e,null).position})}return t}function g(e,n,r,a){function s(){l&&(delete z.style,delete z.modElem)}if(a=o(a,"undefined")?!1:a,!o(r,"undefined")){var u=v(e,r);if(!o(u,"undefined"))return u}for(var l,f,p,m,g,w=["modernizr","tspan","samp"];!z.style&&w.length;)l=!0,z.modElem=i(w.shift()),z.style=z.modElem.style;for(p=e.length,f=0;p>f;f++)if(m=e[f],g=z.style[m],d(m,"-")&&(m=c(m)),z.style[m]!==t){if(a||o(r,"undefined"))return s(),"pfx"===n?m:!0;try{z.style[m]=r}catch(h){}if(z.style[m]!==g)return s(),"pfx"===n?m:!0}return s(),!1}function w(e,n,t,r,a){var i=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+O.join(i+" ")+i).split(" ");return o(n,"string")||o(n,"undefined")?g(s,n,r,a):(s=(e+" "+L.join(i+" ")+i).split(" "),p(s,n,t))}function h(e,n,o){return w(e,t,t,n,o)}var y=[],b=[],A={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){b.push({name:e,fn:n,options:t})},addAsyncTest:function(e){b.push({name:null,fn:e})}},T=function(){};T.prototype=A,T=new T,T.addTest("blobconstructor",function(){try{return!!new Blob}catch(e){return!1}},{aliases:["blob-constructor"]}),T.addTest("history",function(){var n=navigator.userAgent;return-1===n.indexOf("Android 2.")&&-1===n.indexOf("Android 4.0")||-1===n.indexOf("Mobile Safari")||-1!==n.indexOf("Chrome")||-1!==n.indexOf("Windows Phone")?e.history&&"pushState"in e.history:!1}),T.addTest("svg",!!n.createElementNS&&!!n.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect),T.addTest("filereader",!!(e.File&&e.FileList&&e.FileReader)),T.addTest("localstorage",function(){var e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(n){return!1}}),T.addTest("sessionstorage",function(){var e="modernizr";try{return sessionStorage.setItem(e,e),sessionStorage.removeItem(e),!0}catch(n){return!1}}),T.addTest("atobbtoa","atob"in e&&"btoa"in e,{aliases:["atob-btoa"]}),T.addTest("webworkers","Worker"in e);var x=n.documentElement,C="svg"===x.nodeName.toLowerCase();/*!
	         {
	         "name" : "HTML5 Audio Element",
	         "property": "audio",
	         "tags" : ["html5", "audio", "media"]
	         }
	         !*/
T.addTest("audio",function(){var e=i("audio"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/,""),n.opus=e.canPlayType('audio/ogg; codecs="opus"')||e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/,""),n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(t){}return n}),/*!
	         {
	         "name": "Canvas",
	         "property": "canvas",
	         "caniuse": "canvas",
	         "tags": ["canvas", "graphics"],
	         "polyfills": ["flashcanvas", "excanvas", "slcanvas", "fxcanvas"]
	         }
	         !*/
T.addTest("canvas",function(){var e=i("canvas");return!(!e.getContext||!e.getContext("2d"))}),/*!
	         {
	         "name": "Canvas text",
	         "property": "canvastext",
	         "caniuse": "canvas-text",
	         "tags": ["canvas", "graphics"],
	         "polyfills": ["canvastext"]
	         }
	         !*/
T.addTest("canvastext",function(){return T.canvas===!1?!1:"function"==typeof i("canvas").getContext("2d").fillText}),/*!
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
T.addTest("video",function(){var e=i("video"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),n.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),n.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),n.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),n.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(t){}return n}),/*!
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
T.addTest("inlinesvg",function(){var e=i("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"===("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)});var P=function(){function e(e,n){var r;return e?(n&&"string"!=typeof n||(n=i(n||"div")),e="on"+e,r=e in n,!r&&o&&(n.setAttribute||(n=i("div")),n.setAttribute(e,""),r="function"==typeof n[e],n[e]!==t&&(n[e]=t),n.removeAttribute(e)),r):!1}var o=!("onblur"in n.documentElement);return e}();A.hasEvent=P,/*!
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
T.addTest("hashchange",function(){return P("hashchange",e)===!1?!1:n.documentMode===t||n.documentMode>7});var S=A._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];A._prefixes=S;var _;!function(){var e={}.hasOwnProperty;_=o(e,"undefined")||o(e.call,"undefined")?function(e,n){return n in e&&o(e.constructor.prototype[n],"undefined")}:function(n,t){return e.call(n,t)}}(),A._l={},A.on=function(e,n){this._l[e]||(this._l[e]=[]),this._l[e].push(n),T.hasOwnProperty(e)&&setTimeout(function(){T._trigger(e,T[e])},0)},A._trigger=function(e,n){if(this._l[e]){var t=this._l[e];setTimeout(function(){var e,o;for(e=0;e<t.length;e++)(o=t[e])(n)},0),delete this._l[e]}},T._q.push(function(){A.addTest=s}),/*!
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
T.addTest("svgasimg",n.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")),/*!
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
T.addAsyncTest(function(){function e(){var e=new Image;e.onerror=function(){s("datauri",!0),T.datauri=new Boolean(!0),T.datauri.over32kb=!1},e.onload=function(){s("datauri",!0),T.datauri=new Boolean(!0),T.datauri.over32kb=1===e.width&&1===e.height};for(var n="R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";n.length<33e3;)n="\r\n"+n;e.src="data:image/gif;base64,"+n}-1!==navigator.userAgent.indexOf("MSIE 7.")&&setTimeout(function(){s("datauri",!1)},10);var n=new Image;n.onerror=function(){s("datauri",!1)},n.onload=function(){1===n.width&&1===n.height?e():s("datauri",!1)},n.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="});var j=A.testStyles=l;/*!
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
	         !*/
T.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof e.DocumentTouch)t=!0;else{var o=["@media (",S.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");j(o,function(e){t=9===e.offsetTop})}return t});var E="Moz O ms Webkit",O=A._config.usePrefixes?E.split(" "):[];A._cssomPrefixes=O;var R=function(n){var o,r=S.length,a=e.CSSRule;if("undefined"==typeof a)return t;if(!n)return!1;if(n=n.replace(/^@/,""),o=n.replace(/-/g,"_").toUpperCase()+"_RULE",o in a)return"@"+n;for(var i=0;r>i;i++){var s=S[i],c=s.toUpperCase()+"_"+o;if(c in a)return"@-"+s.toLowerCase()+"-"+n}return!1};A.atRule=R;var L=A._config.usePrefixes?E.toLowerCase().split(" "):[];A._domPrefixes=L;var k={elem:i("modernizr")};T._q.push(function(){delete k.elem});var z={style:k.elem.style};T._q.unshift(function(){delete z.style}),A.testAllProps=w,A.testAllProps=h,/*!
	         {
	         "name": "CSS Transforms",
	         "property": "csstransforms",
	         "caniuse": "transforms2d",
	         "tags": ["css"]
	         }
	         !*/
T.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&h("transform","scale(1)",!0)});var B=A.prefixed=function(e,n,t){return 0===e.indexOf("@")?R(e):(-1!==e.indexOf("-")&&(e=c(e)),n?w(e,n,t):w(e,"pfx"))},I=B("URL",e,!1);I=I&&e[I],T.addTest("bloburls",I&&"revokeObjectURL"in I&&"createObjectURL"in I),r(),a(y),delete A.addTest,delete A.addAsyncTest;for(var $=0;$<T._q.length;$++)T._q[$]();e.Modernizr=T}(window,document),e.support=window.Modernizr,window.app},t(185))}});
//# sourceMappingURL=init.bundle.js.map?v=0.2.23