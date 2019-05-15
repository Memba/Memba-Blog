/** 
 * Kendo UI v2019.2.514 (http://www.telerik.com/kendo-ui)                                                                                                                                               
 * Copyright 2019 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/
(function (f, define) {
    define('kendo.switch', ['kendo.core'], f);
}(function () {
    var __meta__ = {
        id: 'switch',
        name: 'Switch',
        category: 'web',
        description: 'The Switch widget is used to display two exclusive choices.',
        depends: ['core']
    };
    (function ($, undefined) {
        var kendo = window.kendo, ui = kendo.ui, NS = '.kendoSwitch', Widget = ui.Widget, support = kendo.support, CHANGE = 'change', switchStyles = {
                widget: 'k-switch k-widget',
                container: 'k-switch-container',
                handle: 'k-switch-handle',
                checked: 'k-switch-on',
                checkedLabel: 'k-switch-label-on',
                unchecked: 'k-switch-off',
                uncheckedLabel: 'k-switch-label-off',
                disabled: 'k-state-disabled',
                readonly: 'k-state-readonly',
                active: 'k-state-active'
            }, DISABLED = 'disabled', ARIA_DISABLED = 'aria-disabled', READONLY = 'readonly', ARIA_READONLY = 'aria-readonly', ARIA_CHECKED = 'aria-checked', CHECKED = 'checked', CLICK = support.click + NS, TOUCHEND = support.pointers ? 'pointerup' : 'touchend', KEYDOWN = 'keydown' + NS, LABELIDPART = '_label', proxy = $.proxy;
        var SWITCH_TEMPLATE = kendo.template('<span class="#=styles.widget#" role="switch"></span>');
        var SWITCH_CONTAINER_TEMPLATE = kendo.template('<span class=\'#=styles.container#\'>' + '<span class=\'#=styles.checkedLabel#\'>#=checked#</span>' + '<span class=\'#=styles.uncheckedLabel#\'>#=unchecked#</span>' + '<span class=\'#=styles.handle#\'></span>' + '</span>');
        var Switch = Widget.extend({
            init: function (element, options) {
                var that = this, wrapper;
                Widget.fn.init.call(that, element, options);
                options = that.options;
                element = that.element[0];
                element.type = 'checkbox';
                wrapper = $(SWITCH_TEMPLATE({ styles: switchStyles }));
                that.wrapper = that.element.wrap(wrapper).parent();
                that.wrapper.append($(SWITCH_CONTAINER_TEMPLATE({
                    styles: switchStyles,
                    checked: options.messages.checked,
                    unchecked: options.messages.unchecked
                })));
                that.wrapper.on(CLICK, proxy(that._click, that)).on(TOUCHEND, proxy(that._touchEnd, that)).on(KEYDOWN, proxy(that._keydown, that));
                if (that.options.enabled) {
                    that._tabindex();
                }
                that._initSettings();
                that._aria();
                kendo.notify(that, kendo.ui);
            },
            setOptions: function (options) {
                var that = this, messages = options.messages, checkedLabel, uncheckedLabel;
                that.options = $.extend(that.options, options);
                if (messages && messages.checked !== undefined) {
                    checkedLabel = that.wrapper.find('.' + switchStyles.checkedLabel);
                    checkedLabel.text(messages.checked);
                }
                if (messages && messages.unchecked !== undefined) {
                    uncheckedLabel = that.wrapper.find('.' + switchStyles.uncheckedLabel);
                    uncheckedLabel.text(messages.unchecked);
                }
                if (options.width) {
                    that.wrapper.css({ width: options.width });
                }
                if (options.enabled !== undefined) {
                    that.enable(options.enabled);
                }
                if (options.readonly !== undefined) {
                    that.readonly(options.readonly);
                }
                that.check(options.checked);
            },
            _initSettings: function () {
                var that = this, element = that.element[0], options = that.options;
                if (options.width) {
                    that.wrapper.css({ width: options.width });
                }
                if (options.checked === null) {
                    options.checked = element.checked;
                }
                that.check(options.checked);
                options.enabled = options.enabled && !that.element.attr(DISABLED);
                that.enable(options.enabled);
                options.readonly = options.readonly || !!that.element.attr(READONLY);
                that.readonly(options.readonly);
            },
            _aria: function () {
                var that = this, element = that.element, wrapper = that.wrapper, id = element.attr('id'), labelFor = $('label[for="' + id + '"]'), ariaLabel = element.attr('aria-label'), ariaLabelledBy = element.attr('aria-labelledby');
                if (ariaLabel) {
                    wrapper.attr('aria-label', ariaLabel);
                } else if (ariaLabelledBy) {
                    wrapper.attr('aria-labelledby', ariaLabelledBy);
                } else if (labelFor.length) {
                    var labelId = labelFor.attr('id');
                    if (!labelId) {
                        labelId = (id || kendo.guid()) + LABELIDPART;
                        labelFor.attr('id', labelId);
                    }
                    wrapper.attr('aria-labelledby', labelId);
                }
            },
            events: [CHANGE],
            options: {
                name: 'Switch',
                messages: {
                    checked: 'On',
                    unchecked: 'Off'
                },
                width: null,
                checked: null,
                enabled: true,
                readonly: false
            },
            check: function (checked) {
                var that = this, element = that.element[0];
                if (checked === undefined) {
                    return element.checked;
                }
                if (element.checked !== checked) {
                    that.options.checked = element.checked = checked;
                }
                that.wrapper.attr(ARIA_CHECKED, checked).toggleClass(switchStyles.checked, checked).toggleClass(switchStyles.unchecked, !checked);
                if (checked) {
                    that.element.attr(CHECKED, CHECKED);
                } else {
                    that.element.removeAttr(CHECKED);
                }
            },
            value: function (value) {
                if (typeof value === 'string') {
                    value = value === 'true';
                }
                return this.check.apply(this, [value]);
            },
            destroy: function () {
                Widget.fn.destroy.call(this);
                this.wrapper.off(NS);
            },
            toggle: function () {
                var that = this;
                that.check(!that.element[0].checked);
            },
            enable: function (enable) {
                var element = this.element, wrapper = this.wrapper;
                if (typeof enable == 'undefined') {
                    enable = true;
                }
                this.options.enabled = enable;
                if (enable) {
                    element.removeAttr(DISABLED);
                    wrapper.removeAttr(ARIA_DISABLED);
                } else {
                    element.attr(DISABLED, DISABLED);
                    wrapper.attr(ARIA_DISABLED, true);
                }
                wrapper.toggleClass(switchStyles.disabled, !enable);
            },
            readonly: function (readonly) {
                var that = this, element = that.element, wrapper = that.wrapper;
                if (typeof readonly == 'undefined') {
                    readonly = true;
                }
                that.options.readonly = readonly;
                if (readonly) {
                    element.attr(READONLY, true);
                    wrapper.attr(ARIA_READONLY, true);
                } else {
                    element.removeAttr(READONLY);
                    wrapper.removeAttr(ARIA_READONLY);
                }
                wrapper.toggleClass(switchStyles.readonly, readonly);
            },
            _check: function () {
                var that = this, checked = that.element[0].checked = !that.element[0].checked;
                that.wrapper.focus();
                if (!that.options.enabled || that.options.readonly || that.trigger(CHANGE, { checked: checked })) {
                    that.element[0].checked = !checked;
                    return;
                }
                that.check(checked);
            },
            _keydown: function (e) {
                if (e.keyCode === kendo.keys.SPACEBAR) {
                    this._check();
                    e.preventDefault();
                }
            },
            _isTouch: function (event) {
                return /touch/.test(event.type) || event.originalEvent && /touch/.test(event.originalEvent.pointerType);
            },
            _click: function (e) {
                if (!this._isTouch(e) && e.which === 1) {
                    this._check();
                }
            },
            _touchEnd: function (e) {
                if (this._isTouch(e)) {
                    this._check();
                    e.preventDefault();
                }
            }
        });
        ui.plugin(Switch);
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));