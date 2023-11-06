/**
 * Kendo UI v2023.3.1010 (http://www.telerik.com/kendo-ui)
 * Copyright 2023 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
import "./kendo.core.js";

var __meta__ = {
    id: "inputgroupbase",
    name: "InputGroupBase",
    category: "web",
    description: "The InputGroupBase component.",
    depends: [ "core" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        extend = $.extend,
        CHANGE = "change",
        FOCUS = "focus",
        CLICK = "click",
        SELECT = "select",
        DOT = ".",
        DISABLED = "disabled",
        VERTICAL = "vertical",
        REQUIRED = "required",
        AFTER = "after";

    var InputGroupBase = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.options = extend({}, that.options, options);

            that._iterateMarkupItems();

            that._parseItems(that.options.items);

            that._wrapper();

            that.value(that.options.value);

            that._attachEvents();
        },

        options: {
            name: "InputGroupBase"
        },

        events: [
            CHANGE,
            FOCUS,
            SELECT
        ],

        ITEM_TEMPLATE: '',
        NS: ".kendoInputGroupBase",

        groupStyles: {},

        destroy: function() {
            var that = this,
                inputs = this.items();

            inputs.each(function(i, input) {
                var widget = kendo.widgetInstance($(input));

                if (widget) {
                    widget.destroy();
                }
            });

            that.element.off(that.NS);
            Widget.fn.destroy.call(that);
        },

        item: function(index) {
            if (this._indexIsPresent(index)) {
                return $(this.items().get(index));
            }
        },

        items: function() {
            return this.wrapper.find(DOT + this.groupStyles.input);
        },

        enable: function(shouldEnable) {
            var items;

            if (shouldEnable !== false && shouldEnable !== true) {
                return;
            }

            items = this.element.find(DOT + this.groupStyles.item);

            this._disabledOnElements(items, !shouldEnable);
        },

        enableItem: function(shouldEnable, item) {
            if (shouldEnable !== false && shouldEnable !== true) {
                return;
            }

            if (this._indexIsPresent(item)) {
                item = $(this.element.find(DOT + this.groupStyles.item).get(item));
            } else if (item instanceof jQuery) {
                if (item.is("input")) {
                    item = item.closest(DOT + this.groupStyles.item);
                } else if (!item.is("li")) {
                    return;
                }
            } else {
                return;
            }

            this._disabledOnElements(item, !shouldEnable);
        },

        value: function() {
            return false;
        },

        _attachEvents: function() {
            var that = this;

            that.element
                .on(FOCUS + that.NS, DOT + that.groupStyles.input, that._focusHandler.bind(that))
                .on(CHANGE + that.NS, DOT + that.groupStyles.input, that._changeHandler.bind(that))
                .on(CLICK + that.NS, DOT + that.groupStyles.input, that._clickHandler.bind(that));
        },

        _clickHandler: function(e) {
            var target = $(e.target);

            if (this.trigger(SELECT, {
                target: target
            })) {
                e.preventDefault();
                e.stopPropagation();

                this._targetForPreventedChange = e.target;
            }
        },

        _changeHandler: function() {
            return false;
        },

        _dataValRequired: function() {
            return false;
        },

        _disabledOnElements: function(items, disabled) {
            var inputs = items.find("input");

            if (disabled) {
                inputs.attr(DISABLED, "");
                items.addClass(this.groupStyles.disabled);
            } else {
                inputs.prop(DISABLED, false);
                items.removeClass(this.groupStyles.disabled);
            }
        },

        _focusHandler: function(e) {
            var target = $(e.target);

            this.trigger(FOCUS, {
                target: target
            });
        },

        _indexIsPresent: function(index) {
            return !isNaN(index) && index !== null && index !== true && index !== false && this.wrapper.find(DOT + this.groupStyles.input).length > index;
        },

        _initializeItem: function(item, index) {
            var itemElement = $(this.wrapper.find(DOT + this.groupStyles.item).get(index) || this.ITEM_TEMPLATE);

            this._preInitItem(item, itemElement);
            this._initItem(item, itemElement);
            this._postInitItem(item, itemElement);
        },

        _preInitItem: function(item, itemElement) {
            var label = itemElement.find(DOT + this.groupStyles.label),
                input = itemElement.find(DOT + this.groupStyles.input);

            if (itemElement.closest(DOT + this.groupStyles.list).length === 0) {
                this.element.append(itemElement);
            }

            if (item.value !== null && item.value !== undefined) {
                input.val(item.value);
            }
            if (item.id) {
                input.attr("id", item.id);
                label.attr("for", item.id);
            }
        },

        _initItem: function(item, itemElement) {
            var label = itemElement.find(DOT + this.groupStyles.label),
                input = itemElement.find(DOT + this.groupStyles.input),
                options = $.extend({}, item, {
                    rounded: this.options.inputRounded,
                    size: this.options.inputSize
                });

            delete options.name;

            if (!!item.label && label.length > 0) {
                label.remove();
            }

            input[this.COMPONENT](options);
        },

        _postInitItem: function(item, itemElement) {
            var label = itemElement.find(DOT + this.groupStyles.label),
                input = itemElement.find(DOT + this.groupStyles.input);

            if (item.name) {
                input.attr("name", item.name);
            }
            if (!item.labelAfter) {
                label.after(input);
            }
            if (item.attributes) {
                itemElement.attr(item.attributes);
            }
            if (item.cssClass) {
                itemElement.addClass(item.cssClass);
            }
            if (!item.enabled) {
                this._disabledOnElements(itemElement, true);
            }
            if (item.validation) {
                input.attr(item.validation);
            }
        },

        _iterateMarkupItems: function() {
            var element = this.element;

            if (element.children("li").length > 0) {
                element.find("li").each(this._markupItem.bind(this));
            }
        },

        _markupItem: function(i, el) {
            var input = el.querySelector("input");

            if (input.hasAttribute("disabled")) {
                $(el).addClass(this.groupStyles.disabled);
            }
        },

        _parseItem: function(item, index) {
            var options = this.options,
                items = this._items;

            if (typeof item === "string" || typeof item === "number") {
                item = {
                    value: item,
                    label: item
                };
            }
            if (item.encoded !== false) {
                item.encoded = true;
            }
            if (options.labelPosition === AFTER) {
                item.labelAfter = true;
            }
            if (item.enabled === undefined) {
                item.enabled = options.enabled;
            }
            if (!item.id) {
                item.id = kendo.guid();
            }

            item.name = options.inputName || this.element.attr("name") || this.element.attr("id");

            if (items.length > index) {
                items[index] = extend({}, items[index], item);
            } else {
                items.push(item);
            }
        },

        _parseItems: function(items) {
            if (!this._items) {
                this._items = [];
            }
            if (items) {
                items.forEach(this._parseItem.bind(this));
            }
        },

        _validationSettings: function() {
            var wrapper = this.wrapper,
                items = this._items,
                validationAttributes = {},
                setValidation = function(item) {
                    item.validation = validationAttributes;
                },
                createItem = function() {
                    items.push({});
                };

            if (wrapper.is("[required]")) {
                validationAttributes.required = REQUIRED;
                wrapper.prop(REQUIRED, false);
            }
            if (wrapper.is("[data-val=true]")) {
                validationAttributes["data-val"] = "true";
                wrapper.removeAttr("data-val");
            }
            if (wrapper.is("[data-val-required]")) {
                this._dataValRequired(validationAttributes);
                wrapper.removeAttr("data-val-required");
            }
            if (wrapper.is("[data-val-server]")) {
                validationAttributes["data-val-server"] = wrapper.attr("data-val-server");
            }
            if (Object.keys(validationAttributes).length > 0 && (!items || items.length === 0)) {
                wrapper.find("li").each(createItem);
            }

            items.forEach(setValidation);
        },

        _wrapper: function() {
            var wrapper = this.wrapper = this.element,
                items = this._items,
                itemElements = wrapper.find("li"),
                inputs = wrapper.find("input");

            wrapper.addClass(this.groupStyles.list);

            if (this.options.layout === VERTICAL) {
                wrapper.addClass(this.groupStyles.vertical);
            } else {
                wrapper.addClass(this.groupStyles.horizontal);
            }

            if (itemElements.length > 0 && inputs.length > 0) {
                itemElements.addClass(this.groupStyles.item);
                inputs.addClass(this.groupStyles.input);
                wrapper.find("label").addClass(this.groupStyles.label);
            }

            this._validationSettings();

            items.forEach(this._initializeItem.bind(this));
        }
    });

    ui.plugin(InputGroupBase);
})(window.kendo.jQuery);
export default kendo;

