/*! Copyright ©2013-2017 Memba® Sarl. All rights reserved. - Version 0.3.4 dated Mon Jan 22 2018 11:18:07 */
webpackJsonp([18],{8:function(o,e,t){var n,r,i;t(11),function(a,p){"use strict";r=[t(1),t(2),t(3),t(4),t(7)],n=a,void 0!==(i="function"==typeof n?n.apply(e,r):n)&&(o.exports=i)}(function(){"use strict";return function(o,e){function t(e){o(e.currentTarget).removeClass(s)}function n(e){o(e.currentTarget).addClass(s)}function r(e){return e.which!==i.keys.ENTER&&e.keyCode!==i.keys.ENTER||(window.location.href=i.format(a.uris.webapp.pages,c.locale())+"?q="+encodeURIComponent(o(e.currentTarget).val()),!1)}var i=window.kendo,a=window.app,p=new window.Logger("app.menu"),c=a.i18n,s="k-state-active";o(function(){o("#navbar-search-input").on("blur",t).on("focus",n).on("keypress",r),p.debug({message:"Menu initialized in "+c.locale(),method:"document.ready"})})}(window.jQuery),window.app},t(0))},9:function(o,e){o.exports=jQuery},91:function(o,e,t){var n,r,i;t(92),function(a,p){"use strict";r=[t(2),t(3),t(4),t(7),t(10),t(8)],n=a,void 0!==(i="function"==typeof n?n.apply(e,r):n)&&(o.exports=i)}(function(){"use strict";return function(o,e){var t=window.app,n=new window.Logger("app.home"),r=t.i18n;o(function(){n.info({message:"home page initialized in "+r.locale(),method:"document.ready"})})}(window.jQuery),window.app},t(0))},92:function(o,e,t){var n=t(93);"string"==typeof n&&(n=[[o.i,n,""]]);var r={hmr:!0};r.transform=void 0;t(6)(n,r);n.locals&&(o.exports=n.locals)},93:function(o,e,t){var n=t(12);e=o.exports=t(5)(!1),e.push([o.i,".toolbar{position:absolute;top:50px;width:100%;border-left-width:0;border-right-width:0;-webkit-box-sizing:border-box;box-sizing:border-box}.toolbar label{font-weight:normal}.wrapper{position:absolute;left:0;right:0;height:auto;border-width:0;top:50px;bottom:44px;-webkit-overflow-scrolling:touch}#home-wrapper{position:absolute;left:0;right:0;height:auto;border-width:0;top:50px;bottom:44px;-webkit-overflow-scrolling:touch;overflow-y:scroll}#home-wrapper .jumbotron{background:url("+n(t(94))+") no-repeat center center;background-size:cover;height:60%;margin-bottom:4vh}#home-wrapper .jumbotron h1{color:#FFFFFF;width:60%;top:30%;right:5%;position:absolute;font-size:7vmin;text-shadow:0 0 2vmin #333333}#home-wrapper .container .col-xs-6{text-align:center}#home-wrapper .container .col-xs-6 .flag{height:15vh;width:15vh;border-radius:50%;margin:0 auto}#home-wrapper .container .col-xs-6 .uk{background:url("+n(t(95))+") no-repeat center center;background-size:15.2vh 15.2vh}#home-wrapper .container .col-xs-6 .fr{background:url("+n(t(96))+") no-repeat center center;background-size:15.2vh 15.2vh}#home-wrapper .container .col-xs-6 h2{font-weight:normal;font-size:4vh;line-height:1em;margin-top:2vh;margin-bottom:1vh}#home-wrapper .container .col-xs-6 p{font-size:2vh;margin:0 10px;line-height:1.2em}@media (max-height:450px){header.hidden-print{display:none !important}#home-wrapper{top:0;bottom:0}footer.hidden-print{display:none !important}}@media print{#page-wrapper{position:relative;top:0;overflow:visible}#page-wrapper .container{width:auto}}",""])},94:function(o,e,t){o.exports=t.p+"9e0bdff4970e28b99fd7c45d700c20fa.jpg"},95:function(o,e,t){o.exports=t.p+"cdfd82cd7caa66cfe027d1702b434bd9.png"},96:function(o,e,t){o.exports=t.p+"cbb99b5861be0813c86d8b564e49a468.png"}},[91]);
//# sourceMappingURL=home.bundle.js.map?v=0.3.4