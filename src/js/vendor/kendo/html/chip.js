/**
 * Kendo UI v2022.1.119 (http://www.telerik.com/kendo-ui)
 * Copyright 2022 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
















 */
(function (f, define) {
    define('html/chip', ['html/htmlbase'], f);
}(function () {
    (function ($, undefined) {
        var kendo = window.kendo, HTMLBase = kendo.html.HTMLBase;
        var renderChip = function (element, options) {
            if (!element || $.isPlainObject(element)) {
                options = element;
                element = $('<span></span>');
            }
            return new HTMLChip(element, options).html();
        };
        var HTMLChip = HTMLBase.extend({
            init: function (element, options) {
                var that = this;
                HTMLBase.fn.init.call(that, element, options);
                that._wrapper();
            },
            options: {
                name: 'HTMLChip',
                size: 'medium',
                rounded: 'medium',
                fillMode: 'solid',
                themeColor: 'base',
                attr: {},
                icon: '',
                iconAttr: {},
                removable: false,
                removableAttr: {},
                removeIcon: 'x',
                content: '',
                text: '',
                stylingOptions: [
                    'size',
                    'rounded',
                    'fillMode',
                    'themeColor'
                ]
            },
            _wrapper: function () {
                var that = this, options = that.options;
                that.wrapper = that.element.wrap('<span class=\'k-chip\'></span>').parent().attr(options.attr);
                that._addClasses();
                if (options.icon) {
                    that.wrapper.prepend($('<span class=\'k-chip-icon k-icon k-i-' + options.icon + '\'></span>').attr(options.iconAttr));
                }
                that.element.addClass('k-chip-content');
                if (options.text) {
                    that.element.text(options.text);
                }
                if (options.removable) {
                    that.wrapper.append($('<span class=\'k-chip-icon k-icon k-i-' + options.removeIcon + '\'></span>').attr(options.removableAttr));
                }
            }
        });
        $.extend(kendo.html, {
            renderChip: renderChip,
            HTMLChip: HTMLChip
        });
        kendo.cssProperties.registerPrefix('HTMLChip', 'k-chip-');
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
