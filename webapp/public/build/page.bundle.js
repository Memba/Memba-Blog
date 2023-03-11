/*! Copyright ©2013-2021 Memba® Sarl. All rights reserved. - Version 0.3.8 dated Sat Mar 11 2023 */!function(){var e,t,a,r={9e3:function(e,t,a){"use strict";var r=a(5311),n=a.n(r);a(5031);!function(e,t){var a=window.kendo,r=a.ui.Widget,n=".kendoValidator",i="k-invalid-msg",o=new RegExp(i,"i"),s="k-invalid",l="k-valid",u="k-validation-summary",d="k-text-error",c="k-messagebox k-messagebox-error",f="aria-invalid",m=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i,h=/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,p=":input:not(:button,[type=submit],[type=reset],[disabled],[readonly])",v=":checkbox:not([disabled],[readonly])",g="[type=number],[type=range]",F="blur",y="name",_="form",b="novalidate",k="validate",C="change",w="validateInput",D=function(e,t){return"string"==typeof t&&(t=new RegExp("^(?:"+t+")$")),t.test(e)},A=function(e,t,a){var r=e.val();return!e.filter(t).length||""===r||D(r,a)},E=function(e,t){return!!e.length&&null!=e[0].attributes[t]};function x(t){return e.parseHTML?e(e.parseHTML(t)):e(t)}function S(t,r){for(var n,i=e(),s=0,l=t.length;s<l;s++)n=t[s],o.test(n.className)&&n.getAttribute(a.attr("for"))===r&&(i=i.add(n));return i}function M(e,t){return!!e&&("string"==typeof e.nodeName&&"LABEL"===e.nodeName&&("string"==typeof e.getAttribute("for")&&"string"==typeof t.getAttribute("id")&&e.getAttribute("for")===t.getAttribute("id")))}a.ui.validator||(a.ui.validator={rules:{},messages:{},allowSubmit:e.noop,validateOnInit:e.noop});var O=({errors:e})=>{let t="<ul>";for(var a=0;a<e.length;a+=1)t+=`<li><a data-field="${e[a].field}" href="#">${e[a].message}</a></li>`;return t+="</ul>",t},z=r.extend({init:function(t,n){var i=this,o=function(t){var r,n=a.ui.validator.ruleResolvers||{},i={};for(r in n)e.extend(!0,i,n[r].resolve(t));return i}(t),s="["+a.attr("validate")+"!=false]";(n=n||{}).rules=e.extend({},a.ui.validator.rules,o.rules,n.rules),n.messages=e.extend({},a.ui.validator.messages,o.messages,n.messages),r.fn.init.call(i,t,n),i._errorTemplate=a.template(i.options.errorTemplate),i._summaryTemplate=a.template(i.options.validationSummary.template||O),i.element.is(_)&&i.element.attr(b,b),i._inputSelector=p+s,i._checkboxSelector=v+s,i._errors={},i._attachEvents(),i._isValidated=!1,i._validateOnInit()&&i.validate()},events:[k,C,w],options:{name:"Validator",errorTemplate:({message:e})=>`<span class="k-form-error">${e}</span>`,messages:{required:"{0} is required",pattern:"{0} is not valid",min:"{0} should be greater than or equal to {1}",max:"{0} should be smaller than or equal to {1}",step:"{0} is not valid",email:"{0} is not valid email",url:"{0} is not valid URL",date:"{0} is not valid date",dateCompare:"End date should be greater than or equal to the start date",captcha:"The text you entered doesn't match the image."},rules:{required:function(e){var t=!e.attr("name")&&!e.is(":checked"),a=e.attr("name"),r=a&&a.indexOf("'")>-1?'"':"'",n=e.attr("name")&&!this.element.find("input[name="+r+e.attr("name")+r+"]:checked").length,i=e.filter("[type=checkbox]").length&&(t||n),o=e.filter("[type=radio]").length&&!this.element.find("input[name="+r+e.attr("name")+r+"]:checked").length,s=e.val();return!(E(e,"required")&&(!s||""===s||0===s.length||i||o))},pattern:function(e){return!e.filter("[type=text],[type=email],[type=url],[type=tel],[type=search],[type=password]").filter("[pattern]").length||""===e.val()||D(e.val(),e.attr("pattern"))},min:function(e){return!e.filter(g+",["+a.attr("type")+"=number]").filter("[min]").length||""===e.val()||(parseFloat(e.attr("min"))||0)<=a.parseFloat(e.val())},max:function(e){return!e.filter(g+",["+a.attr("type")+"=number]").filter("[max]").length||""===e.val()||(parseFloat(e.attr("max"))||0)>=a.parseFloat(e.val())},step:function(e){if(e.filter(g+",["+a.attr("type")+"=number]").filter("[step]").length&&""!==e.val()){var t,r=parseFloat(e.attr("min"))||0,n=parseFloat(e.attr("step"))||1,i=parseFloat(e.val()),o=(s=((s=n)+"").split(".")).length>1?s[1].length:0;return o?(t=Math.pow(10,o),Math.floor((i-r)*t)%(n*t)/Math.pow(100,o)==0):(i-r)%n==0}var s;return!0},email:function(e){return A(e,"[type=email],["+a.attr("type")+"=email]",m)},url:function(e){return A(e,"[type=url],["+a.attr("type")+"=url]",h)},date:function(e){return!e.filter("[type^=date],["+a.attr("type")+"=date]").length||""===e.val()||null!==a.parseDate(e.val(),e.attr(a.attr("format")))},captcha:function(e){if(e.filter("["+a.attr("role")+"=captcha]").length){var t=this,r=a.widgetInstance(e),n=function(e){return null!=e};if(e.data("captcha_validating")||n(r.isValid())||!r.getCaptchaId()||(e.data("captcha_validating",!0),t._validating=!0,r.validate().done((function(){t._validating=!1,t._checkElement(e)})).fail((function(e){t._validating=!1,e.error&&"handler_not_defined"===e.error&&window.console.warn("Captcha's validationHandler is not defined! You should either define a proper validation endpoint or declare a callback function to ensure the required behavior.")}))),n(r.isValid()))return e.removeData("captcha_validating"),r.isValid()}return!0}},validateOnBlur:!0,validationSummary:!1},_allowSubmit:function(){return a.ui.validator.allowSubmit(this.element,this.errors())},_validateOnInit:function(){return a.ui.validator.validateOnInit(this.element)},destroy:function(){r.fn.destroy.call(this),this.element.off(n),this.validationSummary&&(this.validationSummary.off(n),this.validationSummary=null)},value:function(){return!!this._isValidated&&0===this.errors().length},_submit:function(e){return!(!this.validate()&&!this._allowSubmit()||this._validating)||(e.stopPropagation(),e.stopImmediatePropagation(),e.preventDefault(),!1)},_checkElement:function(e){var t=this.value();this.validateInput(e),this.value()!==t&&this.trigger(C)},_attachEvents:function(){var t=this;t.element.is(_)&&t.element.on("submit"+n,t._submit.bind(t)),t.options.validateOnBlur&&(t.element.is(p)?(t.element.on(F+n,(function(){t._checkElement(t.element)})),t.element.is(v)&&t.element.on("click"+n,(function(){t._checkElement(t.element)}))):(t.element.on(F+n,t._inputSelector,(function(){t._checkElement(e(this))})),t.element.on("click"+n,t._checkboxSelector,(function(){t._checkElement(e(this))}))))},validate:function(){var e,t,a,r=!1,n=this.value();if(this._errors={},this.element.is(p))r=this.validateInput(this.element);else{var i=!1;for(t=0,a=(e=this.element.find(this._inputSelector)).length;t<a;t++)this.validateInput(e.eq(t))||(i=!0);r=!i}return this.options.validationSummary&&!n&&this.showValidationSummary(),this.trigger(k,{valid:r,errors:this.errors()}),n!==r&&this.trigger(C),r},validateInput:function(t){t=e(t),this._isValidated=!0;var r,n,o=this,u=o._errorTemplate,c=o._checkValidity(t),m=c.valid,h="."+i,p=t.attr(y)||"",v=o._findMessageContainer(p).add(t.next(h).filter((function(){var t=e(this);return!t.filter("["+a.attr("for")+"]").length||t.attr(a.attr("for"))===p}))).addClass("k-hidden"),g=m?"":o._extractMessage(t,c.key),F=m?"":x(u({message:(n=g,n.replace(/&amp/g,"&amp;").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">")),field:p})),_=!t.attr(f),b=t.is(".k-input-inner"),k=t.parent(".k-input");if(t.removeAttr(f),t.hasClass("k-hidden")&&(r=a.widgetInstance(t.closest(".k-signature"))),m||t.data("captcha_validating"))delete o._errors[p];else{o._errors[p]=g;var C=v.attr("id");if(o._decorateMessageContainer(F,p),C&&F.attr("id",C),0!==v.length)v.replaceWith(F);else{r=r||a.widgetInstance(t);var D=t.parent().get(0),A=t.next().get(0),E=t.prev().get(0);!r&&t.is("[type=radio]")&&(r=a.widgetInstance(t.closest(".k-radio-list"))),!r&&t.is("[type=checkbox]")&&(r=a.widgetInstance(t.closest(".k-checkbox-list"))),r&&r.wrapper&&(r.element!==r.wrapper||"Signature"==r.options.name)?F.insertAfter(r.wrapper):D&&"LABEL"===D.nodeName?F.insertAfter(D):A&&M(A,t[0])?F.insertAfter(A):E&&M(E,t[0])?F.insertAfter(t):b&&k.length?F.insertAfter(k):F.insertAfter(t)}F.removeClass("k-hidden"),t.attr(f,!0)}if(_!==m&&this.trigger(w,{valid:m,input:t,error:g,field:p}),(r=r&&"Signature"==r.options.name?r:a.widgetInstance(t))&&(r._inputWrapper||r.wrapper)||(t.toggleClass(s,!m),t.toggleClass(l,m)),r){var S=r._inputWrapper||r.wrapper,O=r._inputLabel;S&&(S.toggleClass(s,!m),S.toggleClass(l,m)),O&&O.toggleClass(d,!m)}if(_!==m){var z=F?F.attr("id"):v.attr("id");o._associateMessageContainer(t,z),this.options.validationSummary&&this.options.validateOnBlur&&this.showValidationSummary()}return m},hideMessages:function(){var e="."+i,t=this.element;this._disassociateMessageContainers(),t.is(p)?t.next(e).addClass("k-hidden"):t.find(e).addClass("k-hidden")},reset:function(){var e=this,t=e.element.find("."+s),a=e.element.find("."+d);e._errors=[],e.hideMessages(),e.hideValidationSummary(),t.removeAttr(f),t.removeClass(s),a.removeClass(d)},_findMessageContainer:function(t){for(var r,n=a.ui.validator.messageLocators,i=e(),o=0,s=this.element.length;o<s;o++)i=i.add(S(this.element[o].getElementsByTagName("*"),t));for(r in n)i=i.add(n[r].locate(this.element,t));return i},_decorateMessageContainer:function(e,t){var r,n=a.ui.validator.messageLocators;for(r in e.addClass(i).attr(a.attr("for"),t||""),e.attr("id")||e.attr("id",t+"-error"),n)n[r].decorate(e,t)},_extractMessage:function(e,t){var r,n=this.options.messages[t],i=e.attr(y);return a.ui.Validator.prototype.options.messages[t]||(r=a.isFunction(n)?n(e):n),n=a.isFunction(n)?n(e):n,a.format(e.attr(a.attr(t+"-msg"))||e.attr("validationMessage")||r||n||e.attr("title")||"",i,e.attr(t)||e.attr(a.attr(t)))},_checkValidity:function(e){var t,a=this.options.rules;for(t in a)if(!a[t].call(this,e))return{valid:!1,key:t};return{valid:!0}},errors:function(){var e,t=[],a=this._errors;for(e in a)t.push(a[e]);return t},setOptions:function(e){e.validationSummary&&this.hideValidationSummary(),a.deepExtend(this.options,e),this.destroy(),this.init(this.element,this.options),this._setEvents(this.options)},_getInputNames:function(){for(var t=this.element.find(this._inputSelector),a=[],r=0,n=t.length;r<n;r++){var i=e(t[r]);E(i,y)&&(-1===a.indexOf(i.attr(y))||0===i.closest(".k-checkbox-list").length&&0===i.closest(".k-radio-list").length)&&a.push(i.attr(y))}return a},_associateMessageContainer:function(e,t){var r=a.getWidgetFocusableElement(e);r&&t&&a.toggleAttribute(r,"aria-describedby",t)},_disassociateMessageContainers:function(){for(var t,a,r=this,n=r.element.find("."+s).addBack(),o=0;o<n.length;o+=1)(t=e(n[o])).is("input")&&(a=r._findMessageContainer(t.attr(y)).add(t.next("."+i)).attr("id"),r._associateMessageContainer(t,a))},_errorsByName:function(){for(var e=this,t=e._getInputNames(),a=[],r=0;r<t.length;r+=1){var n=t[r];e._errors[n]&&a.push({field:n,message:e._errors[n]})}return a},_renderSummary:function(){var t,a=this,r=this.options.validationSummary,i=this.element.prev();return(t=r.container?e(r.container):i&&i.hasClass(u)?i:e("<div />").insertBefore(a.element)).addClass([u,c].join(" ")),t.attr("role","alert"),t.on("click"+n,a._summaryClick.bind(a)),t},_summaryClick:function(t){t.preventDefault();var r,n=e(t.target),i=this.element.find("[name='"+n.data("field")+"']");i.length&&(r=a.getWidgetFocusableElement(i))&&r.trigger("focus")},showValidationSummary:function(){var e,t=this,a=t.validationSummary,r=t._errorsByName();a||(a=t.validationSummary=t._renderSummary()),e=x(t._summaryTemplate({errors:r})),a.html(e),a.toggleClass("k-hidden",!r.length)},hideValidationSummary:function(){var e=this.validationSummary;e&&e.addClass("k-hidden")}});a.ui.plugin(z)}(window.kendo.jQuery);var i=a(5688),o=a(2582),s=a(69),l=a(7076),u=a(4383),d=a(2609),c=a(8093);o.Z.viewModel=new i.Z([s.Z,l.Z,u.Z,d.Z,c.Z]),n()((function(){o.Z.viewModel.ready()}))},2904:function(e,t,a){var r={"./app.culture.en.es6":[423,690],"./app.culture.fr.es6":[3699,517]};function n(e){if(!a.o(r,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=r[e],n=t[0];return a.e(t[1]).then((function(){return a(n)}))}n.keys=function(){return Object.keys(r)},n.id=2904,e.exports=n},5311:function(e){"use strict";e.exports=jQuery}},n={};function i(e){var t=n[e];if(void 0!==t)return t.exports;var a=n[e]={id:e,exports:{}};return r[e](a,a.exports,i),a.exports}i.m=r,e=[],i.O=function(t,a,r,n){if(!a){var o=1/0;for(d=0;d<e.length;d++){a=e[d][0],r=e[d][1],n=e[d][2];for(var s=!0,l=0;l<a.length;l++)(!1&n||o>=n)&&Object.keys(i.O).every((function(e){return i.O[e](a[l])}))?a.splice(l--,1):(s=!1,n<o&&(o=n));if(s){e.splice(d--,1);var u=r();void 0!==u&&(t=u)}}return t}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[a,r,n]},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,{a:t}),t},i.d=function(e,t){for(var a in t)i.o(t,a)&&!i.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},i.f={},i.e=function(e){return Promise.all(Object.keys(i.f).reduce((function(t,a){return i.f[a](e,t),t}),[]))},i.u=function(e){return{517:"app-culture-fr-es6",652:"app.theme.urban",690:"app-culture-en-es6"}[e]+".bundle.js?v=0.3.8"},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t={},a="Memba.Blog:",i.l=function(e,r,n,o){if(t[e])t[e].push(r);else{var s,l;if(void 0!==n)for(var u=document.getElementsByTagName("script"),d=0;d<u.length;d++){var c=u[d];if(c.getAttribute("src")==e||c.getAttribute("data-webpack")==a+n){s=c;break}}s||(l=!0,(s=document.createElement("script")).charset="utf-8",s.timeout=120,i.nc&&s.setAttribute("nonce",i.nc),s.setAttribute("data-webpack",a+n),s.src=e),t[e]=[r];var f=function(a,r){s.onerror=s.onload=null,clearTimeout(m);var n=t[e];if(delete t[e],s.parentNode&&s.parentNode.removeChild(s),n&&n.forEach((function(e){return e(r)})),a)return a(r)},m=setTimeout(f.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=f.bind(null,s.onerror),s.onload=f.bind(null,s.onload),l&&document.head.appendChild(s)}},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.j=768,i.p="https://www.memba.com/build/",function(){i.b=document.baseURI||self.location.href;var e={768:0};i.f.j=function(t,a){var r=i.o(e,t)?e[t]:void 0;if(0!==r)if(r)a.push(r[2]);else{var n=new Promise((function(a,n){r=e[t]=[a,n]}));a.push(r[2]=n);var o=i.p+i.u(t),s=new Error;i.l(o,(function(a){if(i.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var n=a&&("load"===a.type?"missing":a.type),o=a&&a.target&&a.target.src;s.message="Loading chunk "+t+" failed.\n("+n+": "+o+")",s.name="ChunkLoadError",s.type=n,s.request=o,r[1](s)}}),"chunk-"+t,t)}},i.O.j=function(t){return 0===e[t]};var t=function(t,a){var r,n,o=a[0],s=a[1],l=a[2],u=0;if(o.some((function(t){return 0!==e[t]}))){for(r in s)i.o(s,r)&&(i.m[r]=s[r]);if(l)var d=l(i)}for(t&&t(a);u<o.length;u++)n=o[u],i.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return i.O(d)},a=self.webpackChunkMemba_Blog=self.webpackChunkMemba_Blog||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}(),i.nc=void 0;var o=i.O(void 0,[592],(function(){return i(9e3)}));o=i.O(o)}();