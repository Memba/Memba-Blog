/*! Copyright ©2013-2017 Memba® Sarl. All rights reserved. - Version 0.3.2 dated Sun Jun 04 2017 09:15:22 */
!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="http://www.memba.com/build/",t(t.s=30)}({0:function(e,t){e.exports=function(){throw new Error("define cannot be used indirect")}},20:function(e,t,n){var o,r,a;!function(n,i){"use strict";r=[],o=n,void 0!==(a="function"==typeof o?o.apply(t,r):o)&&(e.exports=a)}(function(){"use strict";var e=window.app;return function(e,t,n){function o(e,t){return typeof e===t}function r(e){var t=x.className,n=A._config.classPrefix||"";if(T&&(t=t.baseVal),A._config.enableJSClass){var o=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(o,"$1"+n+"js$2")}A._config.enableClasses&&(t+=" "+n+e.join(" "+n),T?x.className.baseVal=t:x.className=t)}function a(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):T?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function i(e,t){if("object"==typeof e)for(var n in e)S(e,n)&&i(n,e[n]);else{e=e.toLowerCase();var o=e.split("."),a=A[o[0]];if(2===o.length&&(a=a[o[1]]),void 0!==a)return A;t="function"==typeof t?t():t,1===o.length?A[o[0]]=t:(!A[o[0]]||A[o[0]]instanceof Boolean||(A[o[0]]=new Boolean(A[o[0]])),A[o[0]][o[1]]=t),r([(t&&!1!==t?"":"no-")+o.join("-")]),A._trigger(e,t)}return A}function s(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function c(){var e=t.body;return e||(e=a(T?"svg":"body"),e.fake=!0),e}function u(e,n,o,r){var i,s,u,l,d="modernizr",f=a("div"),p=c();if(parseInt(o,10))for(;o--;)u=a("div"),u.id=r?r[o]:d+(o+1),f.appendChild(u);return i=a("style"),i.type="text/css",i.id="s"+d,(p.fake?p:f).appendChild(i),p.appendChild(f),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(t.createTextNode(e)),f.id=d,p.fake&&(p.style.background="",p.style.overflow="hidden",l=x.style.overflow,x.style.overflow="hidden",x.appendChild(p)),s=n(f,e),p.fake?(p.parentNode.removeChild(p),x.style.overflow=l,x.offsetHeight):f.parentNode.removeChild(f),!!s}function l(e,t){return!!~(""+e).indexOf(t)}function d(e,t){return function(){return e.apply(t,arguments)}}function f(e,t,n){var r;for(var a in e)if(e[a]in t)return!1===n?e[a]:(r=t[e[a]],o(r,"function")?d(r,n||t):r);return!1}function p(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function v(t,o){var r=t.length;if("CSS"in e&&"supports"in e.CSS){for(;r--;)if(e.CSS.supports(p(t[r]),o))return!0;return!1}if("CSSSupportsRule"in e){for(var a=[];r--;)a.push("("+p(t[r])+":"+o+")");return a=a.join(" or "),u("@supports ("+a+") { #modernizr { position: absolute; } }",function(e){return"absolute"===getComputedStyle(e,null).position})}return n}function m(e,t,r,i){function c(){d&&(delete B.style,delete B.modElem)}if(i=!o(i,"undefined")&&i,!o(r,"undefined")){var u=v(e,r);if(!o(u,"undefined"))return u}for(var d,f,p,m,g,h=["modernizr","tspan","samp"];!B.style&&h.length;)d=!0,B.modElem=a(h.shift()),B.style=B.modElem.style;for(p=e.length,f=0;f<p;f++)if(m=e[f],g=B.style[m],l(m,"-")&&(m=s(m)),B.style[m]!==n){if(i||o(r,"undefined"))return c(),"pfx"!==t||m;try{B.style[m]=r}catch(e){}if(B.style[m]!==g)return c(),"pfx"!==t||m}return c(),!1}function g(e,t,n,r,a){var i=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+j.join(i+" ")+i).split(" ");return o(t,"string")||o(t,"undefined")?m(s,t,r,a):(s=(e+" "+k.join(i+" ")+i).split(" "),f(s,t,n))}function h(e,t,o){return g(e,n,n,t,o)}var w=[],y=[],b={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){y.push({name:e,fn:t,options:n})},addAsyncTest:function(e){y.push({name:null,fn:e})}},A=function(){};A.prototype=b,A=new A,A.addTest("blobconstructor",function(){try{return!!new Blob}catch(e){return!1}},{aliases:["blob-constructor"]}),A.addTest("history",function(){var t=navigator.userAgent;return(-1===t.indexOf("Android 2.")&&-1===t.indexOf("Android 4.0")||-1===t.indexOf("Mobile Safari")||-1!==t.indexOf("Chrome")||-1!==t.indexOf("Windows Phone"))&&(e.history&&"pushState"in e.history)}),A.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect),A.addTest("filereader",!!(e.File&&e.FileList&&e.FileReader)),A.addTest("localstorage",function(){var e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(e){return!1}}),A.addTest("sessionstorage",function(){var e="modernizr";try{return sessionStorage.setItem(e,e),sessionStorage.removeItem(e),!0}catch(e){return!1}}),A.addTest("atobbtoa","atob"in e&&"btoa"in e,{aliases:["atob-btoa"]}),A.addTest("webworkers","Worker"in e);var x=t.documentElement,T="svg"===x.nodeName.toLowerCase();A.addTest("audio",function(){var e=a("audio"),t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t),t.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),t.mp3=e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/,""),t.opus=e.canPlayType('audio/ogg; codecs="opus"')||e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/,""),t.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),t.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(e){}return t}),A.addTest("canvas",function(){var e=a("canvas");return!(!e.getContext||!e.getContext("2d"))}),A.addTest("canvastext",function(){return!1!==A.canvas&&"function"==typeof a("canvas").getContext("2d").fillText}),A.addTest("video",function(){var e=a("video"),t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t),t.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),t.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),t.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),t.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),t.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(e){}return t}),A.addTest("inlinesvg",function(){var e=a("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"===("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)});var C=function(){function e(e,t){var r;return!!e&&(t&&"string"!=typeof t||(t=a(t||"div")),e="on"+e,r=e in t,!r&&o&&(t.setAttribute||(t=a("div")),t.setAttribute(e,""),r="function"==typeof t[e],t[e]!==n&&(t[e]=n),t.removeAttribute(e)),r)}var o=!("onblur"in t.documentElement);return e}();b.hasEvent=C,A.addTest("hashchange",function(){return!1!==C("hashchange",e)&&(t.documentMode===n||t.documentMode>7)});var P=b._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];b._prefixes=P;var S;!function(){var e={}.hasOwnProperty;S=o(e,"undefined")||o(e.call,"undefined")?function(e,t){return t in e&&o(e.constructor.prototype[t],"undefined")}:function(t,n){return e.call(t,n)}}(),b._l={},b.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),A.hasOwnProperty(e)&&setTimeout(function(){A._trigger(e,A[e])},0)},b._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout(function(){var e;for(e=0;e<n.length;e++)(0,n[e])(t)},0),delete this._l[e]}},A._q.push(function(){b.addTest=i}),A.addTest("svgasimg",t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")),A.addAsyncTest(function(){function e(){var e=new Image;e.onerror=function(){i("datauri",!0),A.datauri=new Boolean(!0),A.datauri.over32kb=!1},e.onload=function(){i("datauri",!0),A.datauri=new Boolean(!0),A.datauri.over32kb=1===e.width&&1===e.height};for(var t="R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";t.length<33e3;)t="\r\n"+t;e.src="data:image/gif;base64,"+t}-1!==navigator.userAgent.indexOf("MSIE 7.")&&setTimeout(function(){i("datauri",!1)},10);var t=new Image;t.onerror=function(){i("datauri",!1)},t.onload=function(){1===t.width&&1===t.height?e():i("datauri",!1)},t.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="});var _=b.testStyles=u;A.addTest("touchevents",function(){var n;if("ontouchstart"in e||e.DocumentTouch&&t instanceof e.DocumentTouch)n=!0;else{var o=["@media (",P.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");_(o,function(e){n=9===e.offsetTop})}return n});var E="Moz O ms Webkit",j=b._config.usePrefixes?E.split(" "):[];b._cssomPrefixes=j;var O=function(t){var o,r=P.length,a=e.CSSRule;if(void 0===a)return n;if(!t)return!1;if(t=t.replace(/^@/,""),(o=t.replace(/-/g,"_").toUpperCase()+"_RULE")in a)return"@"+t;for(var i=0;i<r;i++){var s=P[i];if(s.toUpperCase()+"_"+o in a)return"@-"+s.toLowerCase()+"-"+t}return!1};b.atRule=O;var k=b._config.usePrefixes?E.toLowerCase().split(" "):[];b._domPrefixes=k;var L={elem:a("modernizr")};A._q.push(function(){delete L.elem});var B={style:L.elem.style};A._q.unshift(function(){delete B.style}),b.testAllProps=g,b.testAllProps=h,A.addTest("flexbox",h("flexBasis","1px",!0)),A.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&h("transform","scale(1)",!0)});var N=b.prefixed=function(e,t,n){return 0===e.indexOf("@")?O(e):(-1!==e.indexOf("-")&&(e=s(e)),t?g(e,t,n):g(e,"pfx"))},I=N("URL",e,!1);I=I&&e[I],A.addTest("bloburls",I&&"revokeObjectURL"in I&&"createObjectURL"in I),function(){var e,t,n,r,a,i,s;for(var c in y)if(y.hasOwnProperty(c)){if(e=[],t=y[c],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(r=o(t.fn,"function")?t.fn():t.fn,a=0;a<e.length;a++)i=e[a],s=i.split("."),1===s.length?A[s[0]]=r:(!A[s[0]]||A[s[0]]instanceof Boolean||(A[s[0]]=new Boolean(A[s[0]])),A[s[0]][s[1]]=r),w.push((r?"":"no-")+s.join("-"))}}(),r(w),delete b.addTest,delete b.addAsyncTest;for(var R=0;R<A._q.length;R++)A._q[R]();e.Modernizr=A}(window,document),e.support=window.Modernizr,window.app},n(0))},27:function(e,t,n){var o,r,a;!function(n,i){"use strict";r=[],o=n,void 0!==(a="function"==typeof o?o.apply(t,r):o)&&(e.exports=a)}(function(){"use strict";return function(){function e(e){for(var t=0,n=e,o=/%[sdj]/;"string"==typeof n&&o.test(n);)n=n.replace(o,"{"+t+"}"),t++;return n}var t=window.app=window.app||{},n={join:function(){return Array.prototype.slice.call(arguments).join("/").replace(/([^:])[\/]{2,}/g,"$1/")}};t.DEBUG="true"==="false".toLowerCase(),t.version="0.3.2",t.locales=JSON.parse('["en","fr"]'),t.facebook={clientID:"765157796920609"},t.twitter={account:"memba"},t.uris={cdn:{icons:n.join("https://cdn.kidoju.com",e("/images/o_collection/svg/office/%s.svg"))},webapp:{error:n.join("http://www.memba.com",e("/%s/error")),home:n.join("http://www.memba.com",e("/")),locale:n.join("http://www.memba.com",e("/%s")),logger:n.join("http://www.memba.com",e("/logger")),feed:n.join("http://www.memba.com",e("/%s/rss.xml")),sitemap:n.join("http://www.memba.com",e("/%s/sitemap.xml")),pages:n.join("http://www.memba.com",e("/%s/%s")),posts:n.join("http://www.memba.com",e("/%s/posts/%s/%s/%s"))}},t.logger=t.logger||{},t.logger.level=parseInt("2",10)||0,t.logger.endPoint=t.uris.webapp.logger}(),window.app},n(0))},30:function(e,t,n){n(27),n(20),function(){"use strict";var e=window.document,t=window.navigator;if("standalone"in t&&t.standalone){var n=e.location,o=/^(a|html)$/i;e.addEventListener("click",function(e){for(var t=e.target;!o.test(t.nodeName);)t=t.parentNode;var r=t.href;"string"===$.type(r)&&r.length>1&&r!==n.href&&r.replace(n.protocol+"//"+n.host+n.pathname,"").length>1&&r.replace(n.protocol+"//"+n.host+n.pathname,"").indexOf("#")&&(!/^[a-z\+\.\-]+:/i.test(r)||0===r.indexOf(n.protocol+"//"+n.host))&&(e.preventDefault(),n.assign(r))},!1)}}(),function(){"use strict";var e=window.app,t=window.location,n=window.document.getElementsByTagName("html")[0].getAttribute("lang"),o=e.uris.webapp.error.replace("{0}",n);if(!(e.DEBUG&&navigator.userAgent.indexOf("PhantomJS")>=0)&&t.href.substr(0,o.length)!==o){var r=e.support;r.atobbtoa&&r.audio&&(r.audio.mp3||r.audio.ogg)&&r.blobconstructor&&r.bloburls&&r.canvas&&r.canvastext&&r.csstransforms&&r.filereader&&r.flexbox&&r.hashchange&&r.history&&r.localstorage&&r.sessionstorage&&r.svg&&r.inlinesvg&&r.svgasimg&&r.video&&(r.video.h264||r.video.ogg||r.video.webm)&&r.webworkers||t.assign(o+"?code=1000")}}(),function(t){"use strict";var n=0,o=!1,r=function(e){for(var t=e.target;t!==document.body;){var o=window.getComputedStyle(t);if(!o)break;if("INPUT"===t.nodeName&&"range"===t.getAttribute("type"))return;var r=o.getPropertyValue("-webkit-overflow-scrolling"),a=o.getPropertyValue("overflow-y"),i=parseInt(o.getPropertyValue("height"),10),s="touch"===r&&("auto"===a||"scroll"===a),c=t.scrollHeight>t.offsetHeight;if(s&&c){var u=e.touches?e.touches[0].screenY:e.screenY,l=n<=u&&0===t.scrollTop,d=n>=u&&t.scrollHeight-t.scrollTop===i;return void((l||d)&&e.preventDefault())}t=t.parentNode}e.preventDefault()},a=function(e){n=e.touches?e.touches[0].screenY:e.screenY},i=function(){window.addEventListener("touchstart",a,!1),window.addEventListener("touchmove",r,!1),o=!0},s=function(){window.removeEventListener("touchstart",a,!1),window.removeEventListener("touchmove",r,!1),o=!1},c=function(){return o},u=document.createElement("div");document.documentElement.appendChild(u),u.style.WebkitOverflowScrolling="touch";var l="getComputedStyle"in window&&"touch"===window.getComputedStyle(u)["-webkit-overflow-scrolling"];document.documentElement.removeChild(u),l&&i();var d={enable:i,disable:s,isEnabled:c};void 0!==e&&e.exports&&(e.exports=d),"function"==typeof t.define?function(e){e("iNoBounce",[],function(){return d})}(t.define):t.iNoBounce=d}(this)}});
//# sourceMappingURL=init.bundle.js.map?v=0.3.2