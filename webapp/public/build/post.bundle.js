/*! Copyright ©2013-2018 Memba® Sarl. All rights reserved. - Version 0.3.8 dated 18-Sep-2018 */!function(t){function e(e){for(var r,i,s=e[0],c=e[1],p=e[2],l=0,f=[];l<s.length;l++)i=s[l],o[i]&&f.push(o[i][0]),o[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);for(u&&u(e);f.length;)f.shift()();return a.push.apply(a,p||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,s=1;s<n.length;s++){var c=n[s];0!==o[c]&&(r=!1)}r&&(a.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},o={5:0},a=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(t){var e=[],n=o[t];if(0!==n)if(n)e.push(n[2]);else{var r=new Promise(function(e,r){n=o[t]=[e,r]});e.push(n[2]=r);var a,s=document.getElementsByTagName("head")[0],c=document.createElement("script");c.charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.src=function(t){return i.p+""+({7:"app.culture.en",8:"app.culture.fr",9:"app.theme.black",10:"app.theme.blueopal",11:"app.theme.bootstrap",12:"app.theme.default",13:"app.theme.fiori",14:"app.theme.flat",15:"app.theme.highcontrast",16:"app.theme.material",17:"app.theme.materialblack",18:"app.theme.metro",19:"app.theme.metroblack",20:"app.theme.moonlight",21:"app.theme.nova",22:"app.theme.office365",23:"app.theme.silver",24:"app.theme.uniform"}[t]||t)+".bundle.js?v=0.3.8"}(t),a=function(e){c.onerror=c.onload=null,clearTimeout(p);var n=o[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src,i=new Error("Loading chunk "+t+" failed.\n("+r+": "+a+")");i.type=r,i.request=a,n[1](i)}o[t]=void 0}};var p=setTimeout(function(){a({type:"timeout",target:c})},12e4);c.onerror=c.onload=a,s.appendChild(c)}return Promise.all(e)},i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="https://www.memba.com/build/",i.oe=function(t){throw console.error(t),t};var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var p=0;p<s.length;p++)e(s[p]);var u=c;a.push([380,0]),n()}({14:function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var o=function(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}(r),a=r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"});return[n].concat(a).concat([o]).join("\n")}return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},o=0;o<this.length;o++){var a=this[o][0];"number"==typeof a&&(r[a]=!0)}for(o=0;o<t.length;o++){var i=t[o];"number"==typeof i[0]&&r[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),e.push(i))}},e}},15:function(t,e,n){var r={},o=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),a=function(t){var e={};return function(t,n){if("function"==typeof t)return t();if(void 0===e[t]){var r=function(t,e){return e?e.querySelector(t):document.querySelector(t)}.call(this,t,n);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}e[t]=r}return e[t]}}(),i=null,s=0,c=[],p=n(35);function u(t,e){for(var n=0;n<t.length;n++){var o=t[n],a=r[o.id];if(a){a.refs++;for(var i=0;i<a.parts.length;i++)a.parts[i](o.parts[i]);for(;i<o.parts.length;i++)a.parts.push(b(o.parts[i],e))}else{var s=[];for(i=0;i<o.parts.length;i++)s.push(b(o.parts[i],e));r[o.id]={id:o.id,refs:1,parts:s}}}}function l(t,e){for(var n=[],r={},o=0;o<t.length;o++){var a=t[o],i=e.base?a[0]+e.base:a[0],s={css:a[1],media:a[2],sourceMap:a[3]};r[i]?r[i].parts.push(s):n.push(r[i]={id:i,parts:[s]})}return n}function f(t,e){var n=a(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=c[c.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),c.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=a(t.insertAt.before,n);n.insertBefore(e,o)}}function d(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=c.indexOf(t);e>=0&&c.splice(e,1)}function h(t){var e=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var r=function(){0;return n.nc}();r&&(t.attrs.nonce=r)}return m(e,t.attrs),f(t,e),e}function m(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function b(t,e){var n,r,o,a;if(e.transform&&t.css){if(!(a=e.transform(t.css)))return function(){};t.css=a}if(e.singleton){var c=s++;n=i||(i=h(e)),r=g.bind(null,n,c,!1),o=g.bind(null,n,c,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",m(e,t.attrs),f(t,e),e}(e),r=function(t,e,n){var r=n.css,o=n.sourceMap,a=void 0===e.convertToAbsoluteUrls&&o;(e.convertToAbsoluteUrls||a)&&(r=p(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var i=new Blob([r],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(i),s&&URL.revokeObjectURL(s)}.bind(null,n,e),o=function(){d(n),n.href&&URL.revokeObjectURL(n.href)}):(n=h(e),r=function(t,e){var n=e.css,r=e.media;r&&t.setAttribute("media",r);if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){d(n)});return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else o()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=o()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=l(t,e);return u(n,e),function(t){for(var o=[],a=0;a<n.length;a++){var i=n[a];(s=r[i.id]).refs--,o.push(s)}t&&u(l(t,e),e);for(a=0;a<o.length;a++){var s;if(0===(s=o[a]).refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete r[s.id]}}}};var v=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}();function g(t,e,n,r){var o=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=v(e,o);else{var a=document.createTextNode(o),i=t.childNodes;i[e]&&t.removeChild(i[e]),i.length?t.insertBefore(a,i[e]):t.appendChild(a)}}},35:function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,r=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var o,a=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(a)?t:(o=0===a.indexOf("//")?a:0===a.indexOf("/")?n+a:r+a.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},36:function(t,e){t.exports=function(t){return"string"!=typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),/["'() \t\n]/.test(t)?'"'+t.replace(/"/g,'\\"').replace(/\n/g,"\\n")+'"':t)}},380:function(t,e,n){"use strict";n.r(e);var r,o=n(6),a=n.n(o),i=(n(16),n(23)),s=n(12),c=n(13),p=(n(34),n(47),n(61),n(90),n(381),window),u=p.app,l=u.constants,f=u.i18n,d=p.HTMLAnchorElement,h=p.kendo.attr,m=new c.default("page.post"),b={SOCIAL:".social",WRAPPER:"#post-wrapper"},v={FACEBOOK:"facebook",GOOGLE:"google",LINKEDIN:"linkedin",PINTEREST:"pinterest",TWITTER:"twitter",EMAIL:"email"},g=null;a()(function(){a()(b.WRAPPER).find(b.SOCIAL).on(s.a.CLICK,function(t){i.default.instanceof(a.a.Event,t,i.default.format(i.default.messages.instanceof.default,"e","default")),i.default.instanceof(d,t.currentTarget,i.default.format(i.default.messages.instanceof.default,"e.currentTarget","HTMLAnchorElement"));var e,n=encodeURIComponent(a()('meta[property="og:url"]').attr("content")),o=encodeURIComponent(a()('meta[property="og:site_name"]').attr("content")),s=encodeURIComponent(a()('meta[property="og:title"]').attr("content")),c=encodeURIComponent(a()('meta[property="og:description"]').attr("content")),p=encodeURIComponent(a()('meta[property="og:image"]').attr("content"));switch(a()(t.currentTarget).attr(h("command"))){case v.FACEBOOK:e="".concat("https://www.facebook.com/dialog/share?display=popup&app_id=").concat(l.facebookAppId,"&href=").concat(n,"&redirect_uri=").concat(n);break;case v.GOOGLE:e="".concat("https://plus.google.com/share?url=").concat(n,"&hl=").concat(f.locale());break;case v.LINKEDIN:e="".concat("https://www.linkedin.com/shareArticle?mini=true&source=").concat(o,"&summary=").concat(c,"&title=").concat(s,"&url=").concat(n);break;case v.PINTEREST:e="".concat("https://pinterest.com/pin/create/button/?url=").concat(n,"&media=").concat(p,"&description=").concat(c);break;case v.TWITTER:e="".concat("https://twitter.com/intent/tweet?text=").concat(s,"&url=").concat(n,"&via=").concat(l.twitterAccount);break;case v.EMAIL:e="mailto:info@memba.org?&subject=Shared Link&body=Hey%20loojk%20at%20that"}(null===g||g.closed||r!==e)&&(g=window.open(e,"social","toolbar=0,status=0,menubar=0,height=450,width=600")),r=e,g&&a.a.isFunction(g.focus)&&g.focus()}),m.info({message:"post page initialized in ".concat(f.locale()),method:"document.ready"})})},381:function(t,e,n){var r=n(382);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(15)(r,o);r.locals&&(t.exports=r.locals)},382:function(t,e,n){(t.exports=n(14)(!1)).push([t.i,".toolbar{position:absolute;top:51px;width:100%;border-left-width:0;border-right-width:0}.toolbar label{font-weight:normal}.wrapper{position:absolute;left:0;right:0;height:auto;border-width:0;top:51px;bottom:44px;-webkit-overflow-scrolling:touch}#post-wrapper{position:absolute;left:0;right:0;height:auto;border-width:0;top:51px;bottom:44px;-webkit-overflow-scrolling:touch;overflow-y:scroll}#post-wrapper .container article{margin-top:3em}#post-wrapper .container article img.img-responsive,#post-wrapper .container article div.embed-responsive{margin:1.5em 0}#post-wrapper .container article a:not(.k-button){border-bottom:dotted 1px;text-decoration:none}#post-wrapper .container article a:not(.k-button):hover{border-bottom:none;text-decoration:underline;color:inherit}#post-wrapper .container section:not(.group){margin-bottom:40px;text-align:right}#post-wrapper .container section:not(.group) .social{border:0}#post-wrapper .container section:not(.group) .social img{height:40px;width:40px}#post-wrapper .container section.group{margin-bottom:40px}#post-wrapper .container section.group img{height:28px;width:28px;vertical-align:top}#post-wrapper .container section.group div.list-group img{height:24px;width:24px}@media (max-height:450px){header.hidden-print{display:none !important}#post-wrapper{top:0;bottom:0}footer.hidden-print{display:none !important}}@media print{#post-wrapper{position:relative;top:0px;overflow:visible}#post-wrapper .container{width:auto}}",""])},4:function(t,e){t.exports=function(){throw new Error("define cannot be used indirect")}},55:function(t,e,n){var r={"./app.theme.black.less":62,"./app.theme.blueopal.less":63,"./app.theme.bootstrap.less":64,"./app.theme.default.less":65,"./app.theme.fiori.less":66,"./app.theme.flat.less":67,"./app.theme.highcontrast.less":68,"./app.theme.material.less":69,"./app.theme.materialblack.less":70,"./app.theme.metro.less":71,"./app.theme.metroblack.less":72,"./app.theme.moonlight.less":73,"./app.theme.nova.less":74,"./app.theme.office365.less":75,"./app.theme.silver.less":76,"./app.theme.uniform.less":77};function o(t){var e=a(t);return n(e)}function a(t){var e=r[t];if(!(e+1)){var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}return e}o.keys=function(){return Object.keys(r)},o.resolve=a,t.exports=o,o.id=55},58:function(t,e,n){var r={"./app.culture.en.js":59,"./app.culture.fr.js":60};function o(t){var e=a(t);return n(e)}function a(t){var e=r[t];if(!(e+1)){var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}return e}o.keys=function(){return Object.keys(r)},o.resolve=a,t.exports=o,o.id=58},6:function(t,e){t.exports=jQuery}});