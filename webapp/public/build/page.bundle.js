/*! Copyright ©2013-2017 Memba® Sarl. All rights reserved. - Version 0.3.2 dated Tue May 30 2017 15:39:42 */
webpackJsonp([19],{11:function(e,t){e.exports=jQuery},21:function(e,t,n){var a,r,i;!function(o,l){r=[n(3)],a=o,void 0!==(i="function"==typeof a?a.apply(t,r):a)&&(e.exports=i)}(function(){return function(e,t){function n(t){var n,a=l.ui.validator.ruleResolvers||{},r={};for(n in a)e.extend(!0,r,a[n].resolve(t));return r}function a(e){return e.replace(/&amp/g,"&amp;").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">")}function r(e){return e=(e+"").split("."),e.length>1?e[1].length:0}function i(t){return e(e.parseHTML?e.parseHTML(t):t)}function o(t,n){for(var a,r=e(),i=0,o=t.length;i<o;i++)a=t[i],d.test(a.className)&&a.getAttribute(l.attr("for"))===n&&(r=r.add(a));return r}var l=window.kendo,u=l.ui.Widget,s=".kendoValidator",d=new RegExp("k-invalid-msg","i"),p=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i,c=/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,F=":input:not(:button,[type=submit],[type=reset],[disabled],[readonly])",f=e.proxy,m=function(e,t){return"string"==typeof t&&(t=new RegExp("^(?:"+t+")$")),t.test(e)},g=function(e,t,n){var a=e.val();return!e.filter(t).length||""===a||m(a,n)},h=function(e,t){return!!e.length&&null!=e[0].attributes[t]};l.ui.validator||(l.ui.validator={rules:{},messages:{}});var v=u.extend({init:function(t,a){var r=this,i=n(t),o="["+l.attr("validate")+"!=false]";a=a||{},a.rules=e.extend({},l.ui.validator.rules,i.rules,a.rules),a.messages=e.extend({},l.ui.validator.messages,i.messages,a.messages),u.fn.init.call(r,t,a),r._errorTemplate=l.template(r.options.errorTemplate),r.element.is("form")&&r.element.attr("novalidate","novalidate"),r._inputSelector=F+o,r._checkboxSelector=":checkbox:not([disabled],[readonly])"+o,r._errors={},r._attachEvents(),r._isValidated=!1},events:["validate","change","validateInput"],options:{name:"Validator",errorTemplate:'<span class="k-widget k-tooltip k-tooltip-validation"><span class="k-icon k-i-warning"> </span> #=message#</span>',messages:{required:"{0} is required",pattern:"{0} is not valid",min:"{0} should be greater than or equal to {1}",max:"{0} should be smaller than or equal to {1}",step:"{0} is not valid",email:"{0} is not valid email",url:"{0} is not valid URL",date:"{0} is not valid date",dateCompare:"End date should be greater than or equal to the start date"},rules:{required:function(e){var t=e.filter("[type=checkbox]").length&&!e.is(":checked"),n=e.val();return!(h(e,"required")&&(!n||""===n||0===n.length||t))},pattern:function(e){return!e.filter("[type=text],[type=email],[type=url],[type=tel],[type=search],[type=password]").filter("[pattern]").length||""===e.val()||m(e.val(),e.attr("pattern"))},min:function(e){if(e.filter("[type=number],[type=range],["+l.attr("type")+"=number]").filter("[min]").length&&""!==e.val()){return(parseFloat(e.attr("min"))||0)<=l.parseFloat(e.val())}return!0},max:function(e){if(e.filter("[type=number],[type=range],["+l.attr("type")+"=number]").filter("[max]").length&&""!==e.val()){return(parseFloat(e.attr("max"))||0)>=l.parseFloat(e.val())}return!0},step:function(e){if(e.filter("[type=number],[type=range],["+l.attr("type")+"=number]").filter("[step]").length&&""!==e.val()){var t,n=parseFloat(e.attr("min"))||0,a=parseFloat(e.attr("step"))||1,i=parseFloat(e.val()),o=r(a);return o?(t=Math.pow(10,o),Math.floor((i-n)*t)%(a*t)/Math.pow(100,o)==0):(i-n)%a==0}return!0},email:function(e){return g(e,"[type=email],["+l.attr("type")+"=email]",p)},url:function(e){return g(e,"[type=url],["+l.attr("type")+"=url]",c)},date:function(e){return!e.filter("[type^=date],["+l.attr("type")+"=date]").length||""===e.val()||null!==l.parseDate(e.val(),e.attr(l.attr("format")))}},validateOnBlur:!0},destroy:function(){u.fn.destroy.call(this),this.element.off(s)},value:function(){return!!this._isValidated&&0===this.errors().length},_submit:function(e){return!!this.validate()||(e.stopPropagation(),e.stopImmediatePropagation(),e.preventDefault(),!1)},_checkElement:function(e){var t=this.value();this.validateInput(e),this.value()!==t&&this.trigger("change")},_attachEvents:function(){var t=this;t.element.is("form")&&t.element.on("submit"+s,f(t._submit,t)),t.options.validateOnBlur&&(t.element.is(F)?(t.element.on("blur"+s,function(){t._checkElement(t.element)}),t.element.is(":checkbox:not([disabled],[readonly])")&&t.element.on("click"+s,function(){t._checkElement(t.element)})):(t.element.on("blur"+s,t._inputSelector,function(){t._checkElement(e(this))}),t.element.on("click"+s,t._checkboxSelector,function(){t._checkElement(e(this))})))},validate:function(){var e,t,n,a=!1,r=this.value();if(this._errors={},this.element.is(F))a=this.validateInput(this.element);else{var i=!1;for(e=this.element.find(this._inputSelector),t=0,n=e.length;t<n;t++)this.validateInput(e.eq(t))||(i=!0);a=!i}return this.trigger("validate",{valid:a}),r!==a&&this.trigger("change"),a},validateInput:function(t){t=e(t),this._isValidated=!0;var n,r=this,o=r._errorTemplate,u=r._checkValidity(t),s=u.valid,d=t.attr("name")||"",p=r._findMessageContainer(d).add(t.next(".k-invalid-msg").filter(function(){var t=e(this);return!t.filter("["+l.attr("for")+"]").length||t.attr(l.attr("for"))===d})).hide(),c=!t.attr("aria-invalid");if(t.removeAttr("aria-invalid"),s)delete r._errors[d];else{n=r._extractMessage(t,u.key),r._errors[d]=n;var F=i(o({message:a(n)})),f=p.attr("id");r._decorateMessageContainer(F,d),f&&F.attr("id",f),p.replaceWith(F).length||F.insertAfter(t),F.show(),t.attr("aria-invalid",!0)}return c!==s&&this.trigger("validateInput",{valid:s,input:t}),t.toggleClass("k-invalid",!s),t.toggleClass("k-valid",s),s},hideMessages:function(){var e=this,t=e.element;t.is(F)?t.next(".k-invalid-msg").hide():t.find(".k-invalid-msg").hide()},_findMessageContainer:function(t){for(var n,a=l.ui.validator.messageLocators,r=e(),i=0,u=this.element.length;i<u;i++)r=r.add(o(this.element[i].getElementsByTagName("*"),t));for(n in a)r=r.add(a[n].locate(this.element,t));return r},_decorateMessageContainer:function(e,t){var n,a=l.ui.validator.messageLocators;e.addClass("k-invalid-msg").attr(l.attr("for"),t||"");for(n in a)a[n].decorate(e,t);e.attr("role","alert")},_extractMessage:function(e,t){var n=this,a=n.options.messages[t],r=e.attr("name");return a=l.isFunction(a)?a(e):a,l.format(e.attr(l.attr(t+"-msg"))||e.attr("validationMessage")||e.attr("title")||a||"",r,e.attr(t)||e.attr(l.attr(t)))},_checkValidity:function(e){var t,n=this.options.rules;for(t in n)if(!n[t].call(this,e))return{valid:!1,key:t};return{valid:!0}},errors:function(){var e,t=[],n=this._errors;for(e in n)t.push(n[e]);return t}});l.ui.plugin(v)}(window.kendo.jQuery),window.kendo},n(0))},24:function(e,t,n){var a=n(67);"string"==typeof a&&(a=[[e.i,a,""]]);var r={};r.transform=void 0;n(8)(a,r);a.locals&&(e.exports=a.locals)},31:function(e,t,n){var a,r,i;n(24),function(o,l){"use strict";r=[n(21),n(1),n(2),n(4),n(5),n(9),n(6)],a=o,void 0!==(i="function"==typeof a?a.apply(t,r):a)&&(e.exports=i)}(function(){"use strict";return function(e,t){var n=window.app,a=new window.Logger("app.page"),r=n.i18n;e(function(){a.info({message:"site page initialized in "+r.locale(),method:"document.ready"})})}(window.jQuery),window.app},n(0))},6:function(e,t,n){var a,r,i;n(10),function(o,l){"use strict";r=[n(3),n(1),n(2),n(4),n(5)],a=o,void 0!==(i="function"==typeof a?a.apply(t,r):a)&&(e.exports=i)}(function(){"use strict";return function(e,t){function n(t){e(t.currentTarget).removeClass(s)}function a(t){e(t.currentTarget).addClass(s)}function r(t){return t.which!==i.keys.ENTER&&t.keyCode!==i.keys.ENTER||(window.location.href=i.format(o.uris.webapp.pages,u.locale())+"?q="+encodeURIComponent(e(t.currentTarget).val()),!1)}var i=window.kendo,o=window.app,l=new window.Logger("app.menu"),u=o.i18n,s="k-state-active";e(function(){e("#navbar-search-input").on("blur",n).on("focus",a).on("keypress",r),l.debug({message:"Menu initialized in "+u.locale(),method:"document.ready"})})}(window.jQuery),window.app},n(0))},67:function(e,t,n){t=e.exports=n(7)(void 0),t.push([e.i,"/**\n * Variables\n */\n/**\n * Bootstrap mixins\n * TODO: will be deprecated in v4 - See https://github.com/passy/autoprefixer-loader\n */\n/**\n * Custom mixins\n */\n.toolbar {\n  position: absolute;\n  top: 50px;\n  width: 100%;\n  border-left: none;\n  border-right: none;\n}\n.toolbar label {\n  font-weight: normal;\n}\n.wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: auto;\n  border: none;\n  top: 50px;\n  bottom: 44px;\n  -webkit-overflow-scrolling: touch;\n}\n/*********************************************\n * Site page\n ********************************************/\n#page-wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: auto;\n  border: none;\n  top: 50px;\n  bottom: 44px;\n  -webkit-overflow-scrolling: touch;\n  overflow-y: scroll;\n}\n#page-wrapper .container article {\n  margin-top: 3em;\n}\n#page-wrapper .container article img.img-responsive {\n  margin: 1.5em 0;\n}\n#page-wrapper .container article a:not(.k-button) {\n  border-bottom: dotted 1px;\n  text-decoration: none;\n}\n#page-wrapper .container article a:not(.k-button):hover {\n  border-bottom: none;\n  text-decoration: underline;\n  color: inherit;\n}\n/*********************************************\n * Small screens\n ********************************************/\n@media (max-height: 450px) {\n  header.hidden-print {\n    display: none !important;\n  }\n  #page-wrapper {\n    top: 0;\n    bottom: 0;\n  }\n  #page-wrapper .container article {\n    margin-top: 0;\n  }\n  footer.hidden-print {\n    display: none !important;\n  }\n}\n/*********************************************\n * Printing\n ********************************************/\n@media print {\n  #page-wrapper {\n    position: relative;\n    top: 0px;\n    overflow: visible;\n  }\n  #page-wrapper .container {\n    width: auto;\n  }\n}\n",""])}},[31]);
//# sourceMappingURL=page.bundle.js.map?v=0.3.2