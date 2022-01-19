/**
 * Kendo UI v2022.1.119 (http://www.telerik.com/kendo-ui)
 * Copyright 2022 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
















 */
(function (f, define) {
    define('html/input', ['html/htmlbase'], f);
}(function () {
    (function ($, undefined) {
        var kendo = window.kendo, HTMLBase = kendo.html.HTMLBase;
        var renderCheckBox = function (element, options) {
            if (arguments[0] === undefined || $.isPlainObject(arguments[0])) {
                options = element;
                element = $('<input />');
            }
            return new HTMLCheckBox(element, options).html();
        };
        var renderRadioButton = function (element, options) {
            if (arguments[0] === undefined || $.isPlainObject(arguments[0])) {
                options = element;
                element = $('<input />');
            }
            return new HTMLRadioButton(element, options).html();
        };
        var HTMLInput = HTMLBase.extend({
            init: function (element, options) {
                var that = this;
                HTMLBase.fn.init.call(that, element, options);
                that._wrapper();
                that._addClasses();
            },
            options: {
                label: null,
                labelPosition: 'after',
                encoded: true
            },
            _wrapper: function () {
                var that = this, element = that.element[0], options = that.options, elementId = element.id;
                that.wrapper = that.element.addClass(options.inputClass).prop('type', options.type);
                if (!elementId && !!options.label) {
                    element.id = elementId = kendo.guid();
                }
                if (!!options.label) {
                    that.labelEl = $('<label for=\'' + elementId + '\' class=\'' + options.labelClass + '\'>');
                    if (options.encoded) {
                        that.labelEl.text(options.label);
                    } else {
                        that.labelEl.html(options.label);
                    }
                    that.element[options.labelPosition](that.labelEl);
                }
            },
            html: function () {
                var that = this, after = that.options.labelPosition === 'after', wrapperHtml = HTMLBase.fn.html.call(that);
                if (!that.labelEl) {
                    return wrapperHtml;
                }
                if (after) {
                    return wrapperHtml + that.labelEl[0].outerHTML;
                }
                return that.labelEl[0].outerHTML + wrapperHtml;
            }
        });
        var HTMLCheckBox = HTMLInput.extend({
            init: function (element, options) {
                var that = this;
                HTMLInput.fn.init.call(that, element, options);
                that._addClasses();
            },
            options: {
                name: 'HTMLCheckBox',
                inputClass: 'k-checkbox',
                labelClass: 'k-checkbox-label',
                type: 'checkbox',
                rounded: 'medium',
                size: 'medium',
                stylingOptions: [
                    'size',
                    'rounded'
                ]
            }
        });
        var HTMLRadioButton = HTMLInput.extend({
            init: function (element, options) {
                var that = this;
                HTMLInput.fn.init.call(that, element, options);
                that._addClasses();
            },
            options: {
                name: 'HTMLRadioButton',
                inputClass: 'k-radio',
                labelClass: 'k-radio-label',
                type: 'radio',
                size: 'medium',
                stylingOptions: ['size']
            }
        });
        $.extend(kendo.html, {
            renderCheckBox: renderCheckBox,
            renderRadioButton: renderRadioButton,
            HTMLInput: HTMLInput,
            HTMLCheckBox: HTMLCheckBox,
            HTMLRadioButton: HTMLRadioButton
        });
        kendo.cssProperties.registerPrefix('HTMLCheckBox', 'k-checkbox-');
        kendo.cssProperties.registerValues('HTMLCheckBox', [{
            prop: 'rounded',
            values: kendo.cssProperties.roundedValues.concat([[
                'full',
                'full'
            ]])
        }]);
        kendo.cssProperties.registerPrefix('HTMLRadioButton', 'k-radio-');
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));