/*! Copyright ©2013-2017 Memba® Sarl. All rights reserved. - Version 0.3.3 dated Thu Jul 13 2017 10:35:24 */
webpackJsonp([22],{23:function(n,o,t){var r,e,i;t(24),function(p,a){"use strict";e=[t(2),t(3),t(7),t(10)],r=p,void 0!==(i="function"==typeof r?r.apply(o,e):r)&&(n.exports=i)}(function(){"use strict";return function(n,o){var t=window.app,r=new window.Logger("app.error"),e=t.i18n;n(function(){n("#back-button").click(function(){window.history.back()}),r.info({message:"error page initialized in "+e.locale(),method:"document.ready"})})}(window.jQuery),window.app},t(0))},24:function(n,o,t){var r=t(25);"string"==typeof r&&(r=[[n.i,r,""]]);var e={};e.transform=void 0;t(6)(r,e);r.locals&&(n.exports=r.locals)},25:function(n,o,t){o=n.exports=t(5)(void 0),o.push([n.i,"/**\n * Variables\n */\n/**\n * Bootstrap mixins\n * TODO: will be deprecated in v4 - See https://github.com/passy/autoprefixer-loader\n */\n/**\n * Custom mixins\n */\n.toolbar {\n  position: absolute;\n  top: 50px;\n  width: 100%;\n  border-left: none;\n  border-right: none;\n}\n.toolbar label {\n  font-weight: normal;\n}\n.wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: auto;\n  border: none;\n  top: 50px;\n  bottom: 44px;\n  -webkit-overflow-scrolling: touch;\n}\n/*********************************************\n * Error page\n ********************************************/\n#error-wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: auto;\n  border: none;\n  top: 50px;\n  bottom: 44px;\n  -webkit-overflow-scrolling: touch;\n}\n/*********************************************\n * Small screens\n ********************************************/\n@media (max-height: 450px) {\n  header.hidden-print {\n    display: none !important;\n  }\n  #error-wrapper {\n    top: 0;\n    bottom: 0;\n  }\n  footer.hidden-print {\n    display: none !important;\n  }\n}\n/*********************************************\n * Printing\n ********************************************/\n@media print {\n  #error-wrapper {\n    position: relative;\n    top: 0px;\n    overflow: visible;\n  }\n  #error-wrapper .container {\n    width: auto;\n  }\n}\n",""])},9:function(n,o){n.exports=jQuery}},[23]);
//# sourceMappingURL=error.bundle.js.map?v=0.3.3