/*! Copyright ©2013-2016 Memba® Sarl. All rights reserved. - Version 0.2.56 dated 9/30/2016 */
/*! Copyright ©2013-2016 Memba® Sarl. All rights reserved. - Version 0.2.56 dated 9/30/2016 */
webpackJsonp([19],{0:function(o,e,n){var t,r,i;n(504),function(a,p){"use strict";r=[n(186),n(188),n(190),n(189),n(204),n(509)],t=a,i="function"==typeof t?t.apply(e,r):t,!(void 0!==i&&(o.exports=i))}(function(){"use strict";return function(o,e){var n=window.app,t=new window.Logger("app.home"),r=n.i18n;o(function(){t.info({message:"home page initialized in "+r.locale(),method:"document.ready"})})}(window.jQuery),window.app},n(187))},504:function(o,e,n){var t=n(505);"string"==typeof t&&(t=[[o.id,t,""]]);n(185)(t,{});t.locals&&(o.exports=t.locals)},505:function(o,e,n){e=o.exports=n(184)(),e.push([o.id,".toolbar{position:absolute;top:50px;width:100%;border-left:none;border-right:none}.toolbar label{font-weight:400}#home-wrapper,.wrapper{position:absolute;left:0;right:0;height:auto;border:none;top:50px;bottom:44px}#home-wrapper{overflow-y:scroll}#home-wrapper .jumbotron{background:url("+n(506)+") no-repeat 50%;background-size:cover;height:60%;margin-bottom:4vh}#home-wrapper .jumbotron h1{color:#fff;width:60%;top:30%;right:5%;position:absolute;font-size:7vmin;text-shadow:0 0 2vmin #333}#home-wrapper .container .col-xs-6{text-align:center}#home-wrapper .container .col-xs-6 .flag{height:15vh;width:15vh;border-radius:50%;margin:0 auto}#home-wrapper .container .col-xs-6 .uk{background:url("+n(507)+") no-repeat 50%;background-size:15.2vh 15.2vh}#home-wrapper .container .col-xs-6 .fr{background:url("+n(508)+") no-repeat 50%;background-size:15.2vh 15.2vh}#home-wrapper .container .col-xs-6 h2{font-weight:400;font-size:4vh;line-height:1em;margin-top:2vh;margin-bottom:1vh}#home-wrapper .container .col-xs-6 p{font-size:2vh;margin:0 10px;line-height:1.2em}@media (max-height:450px){header.hidden-print{display:none!important}#home-wrapper{top:0;bottom:0}footer.hidden-print{display:none!important}}@media print{#page-wrapper{position:relative;top:0;overflow:visible}#page-wrapper .container{width:auto}}",""])},506:function(o,e,n){o.exports=n.p+"9e0bdff4970e28b99fd7c45d700c20fa.jpg"},507:function(o,e,n){o.exports=n.p+"cdfd82cd7caa66cfe027d1702b434bd9.png"},508:function(o,e,n){o.exports=n.p+"cbb99b5861be0813c86d8b564e49a468.png"},509:function(o,e,n){var t,r,i;n(243),function(a,p){"use strict";r=[n(195),n(186),n(188),n(190),n(189)],t=a,i="function"==typeof t?t.apply(e,r):t,!(void 0!==i&&(o.exports=i))}(function(){"use strict";return function(o,e){function n(e){o(e.currentTarget).removeClass(l)}function t(e){o(e.currentTarget).addClass(l)}function r(e){return e.which!==i.keys.ENTER&&e.keyCode!==i.keys.ENTER||(window.location.href=i.format(a.uris.webapp.pages,c.locale())+"?q="+encodeURIComponent(o(e.currentTarget).val()),!1)}var i=window.kendo,a=window.app,p=new window.Logger("app.menu"),c=a.i18n,d="blur",s="focus",u="keypress",h="#navbar-search-input",l="k-state-active";o(function(){o(h).on(d,n).on(s,t).on(u,r),p.debug({message:"Menu initialized in "+c.locale(),method:"document.ready"})})}(window.jQuery),window.app},n(187))}});
//# sourceMappingURL=home.bundle.js.map?v=0.2.56