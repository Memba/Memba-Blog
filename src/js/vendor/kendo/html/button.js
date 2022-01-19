/**
* Kendo UI v2022.1.119 (http://www.telerik.com/kendo-ui)
* Copyright 2022 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
*
* Kendo UI commercial licenses may be obtained at
* http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
* If you do not own a commercial license, this file shall be governed by the trial license terms.
















*/
(function (f, define) {
    define('html/button', ['html/htmlbase'], f);
}(function () {
    (function ($, undefined) {
        var kendo = window.kendo, HTMLBase = kendo.html.HTMLBase, KBUTTON = 'k-button', KBUTTONICON = 'k-button-icon', KBUTTONTEXT = 'k-button-text';
        var renderButton = function (element, options) {
            if (arguments[0] === undefined || $.isPlainObject(arguments[0])) {
                options = element;
                element = $('<button></button>');
            }
            return new HTMLButton(element, options).html();
        };
        var HTMLButton = HTMLBase.extend({
            init: function (element, options) {
                var that = this;
                HTMLBase.fn.init.call(that, element, options);
                that.wrapper = that.element.addClass(KBUTTON);
                that.element.attr('type', that.options.type);
                that._addClasses();
                that.iconElement();
                that._textElement();
            },
            options: {
                name: 'HTMLButton',
                type: 'button',
                icon: '',
                iconClass: '',
                spriteCssClass: '',
                imageUrl: '',
                size: 'medium',
                shape: 'rectangle',
                rounded: 'medium',
                fillMode: 'solid',
                themeColor: 'base',
                stylingOptions: [
                    'size',
                    'shape',
                    'rounded',
                    'fillMode',
                    'themeColor'
                ]
            },
            iconElement: function () {
                var that = this, element = that.element, options = that.options, icon = options.icon, iconClass = options.iconClass, spriteCssClass = options.spriteCssClass, imageUrl = options.imageUrl, span, img, isEmpty;
                if (spriteCssClass || imageUrl || icon || iconClass) {
                    isEmpty = true;
                    element.contents().filter(function () {
                        return !$(this).hasClass('k-sprite') && !$(this).hasClass('k-icon') && !$(this).hasClass('k-image');
                    }).each(function (idx, el) {
                        if (el.nodeType == 1 || el.nodeType == 3 && kendo.trim(el.nodeValue).length > 0) {
                            isEmpty = false;
                        }
                    });
                }
                if (isEmpty) {
                    that.element.addClass('k-icon-button');
                }
                if (imageUrl) {
                    img = element.children('img.k-image').first();
                    if (!img[0]) {
                        img = $('<img alt="icon" class="k-image" />').prependTo(element);
                    }
                    img.attr('src', imageUrl);
                    img.addClass(KBUTTONICON);
                } else if (icon || iconClass) {
                    span = element.children('span.k-icon').first();
                    if (!span[0]) {
                        span = $('<span></span>').prependTo(element);
                    }
                    span.attr('class', icon ? 'k-icon k-i-' + icon : iconClass);
                    span.addClass(KBUTTONICON);
                } else if (spriteCssClass) {
                    span = element.children('span.k-sprite').first();
                    if (!span[0]) {
                        span = $('<span class="k-sprite"></span>').prependTo(element);
                    }
                    span.addClass(spriteCssClass + ' ' + KBUTTONICON);
                }
            },
            _textElement: function () {
                var element = this.element;
                element.contents().filter(function () {
                    return !$(this).hasClass(KBUTTONICON) && !$(this).hasClass('k-sprite') && !$(this).hasClass('k-icon') && !$(this).hasClass('k-image');
                }).each(function (idx, el) {
                    if (el.nodeType == 1 || el.nodeType == 3 && kendo.trim(el.nodeValue).length > 0) {
                        if (el.nodeType === 3) {
                            var parent = el.parentNode;
                            var newSpan = document.createElement('span');
                            newSpan.appendChild(document.createTextNode(el.nodeValue));
                            parent.replaceChild(newSpan, el);
                            el = newSpan;
                        }
                        el.classList.add(KBUTTONTEXT);
                    }
                });
            }
        });
        $.extend(kendo.html, {
            renderButton: renderButton,
            HTMLButton: HTMLButton
        });
        kendo.cssProperties.registerPrefix('HTMLButton', 'k-button-');
        kendo.cssProperties.registerValues('HTMLButton', [
            {
                prop: 'fillMode',
                values: kendo.cssProperties.fillModeValues.concat(['link'])
            },
            {
                prop: 'rounded',
                values: kendo.cssProperties.roundedValues.concat([[
                    'full',
                    'full'
                ]])
            }
        ]);
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
