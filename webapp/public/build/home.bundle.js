webpackJsonp([18],{126:function(n,e,o){n.exports=o.p+"cbb99b5861be0813c86d8b564e49a468.png"},127:function(n,e,o){n.exports=o.p+"9e0bdff4970e28b99fd7c45d700c20fa.jpg"},128:function(n,e,o){n.exports=o.p+"cdfd82cd7caa66cfe027d1702b434bd9.png"},132:function(n,e,o){var t,r,i;o(55),function(a,p){"use strict";r=[o(1),o(2),o(4),o(5),o(9),o(6)],t=a,i="function"==typeof t?t.apply(e,r):t,!(void 0!==i&&(n.exports=i))}(function(){"use strict";return function(n,e){var o=window.app,t=new window.Logger("app.home"),r=o.i18n;n(function(){t.info({message:"home page initialized in "+r.locale(),method:"document.ready"})})}(window.jQuery),window.app},o(0))},43:function(n,e){n.exports=jQuery},55:function(n,e,o){var t=o(92);"string"==typeof t&&(t=[[n.i,t,""]]);o(8)(t,{});t.locals&&(n.exports=t.locals)},6:function(n,e,o){var t,r,i;o(41),function(a,p){"use strict";r=[o(3),o(1),o(2),o(4),o(5)],t=a,i="function"==typeof t?t.apply(e,r):t,!(void 0!==i&&(n.exports=i))}(function(){"use strict";return function(n,e){function o(e){n(e.currentTarget).removeClass(h)}function t(e){n(e.currentTarget).addClass(h)}function r(e){return e.which!==i.keys.ENTER&&e.keyCode!==i.keys.ENTER||(window.location.href=i.format(a.uris.webapp.pages,c.locale())+"?q="+encodeURIComponent(n(e.currentTarget).val()),!1)}var i=window.kendo,a=window.app,p=new window.Logger("app.menu"),c=a.i18n,s="blur",u="focus",l="keypress",d="#navbar-search-input",h="k-state-active";n(function(){n(d).on(s,o).on(u,t).on(l,r),p.debug({message:"Menu initialized in "+c.locale(),method:"document.ready"})})}(window.jQuery),window.app},o(0))},92:function(n,e,o){e=n.exports=o(7)(),e.push([n.i,"/**\n * Variables\n */\n/**\n * Bootstrap mixins\n * TODO: will be deprecated in v4 - See https://github.com/passy/autoprefixer-loader\n */\n/**\n * Custom mixins\n */\n.toolbar {\n  position: absolute;\n  top: 50px;\n  width: 100%;\n  border-left: none;\n  border-right: none;\n}\n.toolbar label {\n  font-weight: normal;\n}\n.wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: auto;\n  border: none;\n  top: 50px;\n  bottom: 44px;\n  -webkit-overflow-scrolling: touch;\n}\n/*********************************************\n * Site page\n ********************************************/\n#home-wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: auto;\n  border: none;\n  top: 50px;\n  bottom: 44px;\n  -webkit-overflow-scrolling: touch;\n  overflow-y: scroll;\n}\n#home-wrapper .jumbotron {\n  background: url("+o(127)+") no-repeat center center;\n  background-size: cover;\n  height: 60%;\n  margin-bottom: 4vh;\n}\n#home-wrapper .jumbotron h1 {\n  color: #FFFFFF;\n  width: 60%;\n  top: 30%;\n  right: 5%;\n  position: absolute;\n  font-size: 7vmin;\n  text-shadow: 0 0 2vmin #333333;\n}\n#home-wrapper .container .col-xs-6 {\n  text-align: center;\n}\n#home-wrapper .container .col-xs-6 .flag {\n  height: 15vh;\n  width: 15vh;\n  border-radius: 50%;\n  margin: 0 auto;\n}\n#home-wrapper .container .col-xs-6 .uk {\n  background: url("+o(128)+") no-repeat center center;\n  background-size: 15.2vh 15.2vh;\n}\n#home-wrapper .container .col-xs-6 .fr {\n  background: url("+o(126)+") no-repeat center center;\n  background-size: 15.2vh 15.2vh;\n}\n#home-wrapper .container .col-xs-6 h2 {\n  font-weight: normal;\n  font-size: 4vh;\n  line-height: 1em;\n  margin-top: 2vh;\n  margin-bottom: 1vh;\n}\n#home-wrapper .container .col-xs-6 p {\n  font-size: 2vh;\n  margin: 0 10px;\n  line-height: 1.2em;\n}\n/*********************************************\n * Small screens\n ********************************************/\n@media (max-height: 450px) {\n  header.hidden-print {\n    display: none !important;\n  }\n  #home-wrapper {\n    top: 0;\n    bottom: 0;\n  }\n  footer.hidden-print {\n    display: none !important;\n  }\n}\n/*********************************************\n * Printing\n ********************************************/\n@media print {\n  #page-wrapper {\n    position: relative;\n    top: 0px;\n    overflow: visible;\n  }\n  #page-wrapper .container {\n    width: auto;\n  }\n}\n",""])}},[132]);
//# sourceMappingURL=home.bundle.js.map?v=0.2.87