/** 
 * Kendo UI v2019.3.1023 (http://www.telerik.com/kendo-ui)                                                                                                                                              
 * Copyright 2019 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/
(function (f, define) {
    define('kendo.rating', [
        'kendo.core',
        'kendo.dom'
    ], f);
}(function () {
    var __meta__ = {
        id: 'rating',
        name: 'Rating',
        category: 'web',
        description: 'The Rating component.',
        depends: ['core']
    };
    (function ($, undefined) {
        var kendo = window.kendo, ui = kendo.ui, NS = '.kendoRating', Widget = ui.Widget, extend = $.extend, proxy = $.proxy, keys = kendo.keys, parseFloat = kendo.parseFloat, CHANGE = 'change', SELECT = 'select', SELECTED = 'selected', HOVERED = 'hovered', DISABLED = 'disabled', READONLY = 'readonly', KEYDOWN = 'keydown' + NS, CLICK = 'click' + NS, MOUSEENTER = 'mouseenter' + NS, MOUSELEAVE = 'mouseleave' + NS, MOUSEMOVE = 'mousemove' + NS, MOUSEDOWN = 'mousedown' + NS, FOCUS = 'focus' + NS, BLUR = 'blur' + NS, ARIA_LABEL = 'aria-label', ARIA_LABELLEDBY = 'aria-labelledby', ARIA_VALUEMIN = 'aria-valuemin', ARIA_VALUEMAX = 'aria-valuemax', ARIA_VALUENOW = 'aria-valuenow', ARIA_DISABLED = 'aria-disabled', ARIA_READONLY = 'aria-readonly', PRECISION_PART = 'k-rating-precision-part', PRECISION_COMPLEMENT = 'k-rating-precision-complement', PRECISION_HALF_VALUE = 0.5, LABELIDPART = '_label', KITEM = 'k-rating-item', FOCUSED = 'k-state-focused', TABINDEX = 'tabindex', DOT = '.', ROLE = 'role', MIN = 'min', MAX = 'max';
        var ratingSelection = {
            single: 'single',
            continuous: 'continuous'
        };
        var ratingPrecision = {
            item: 'item',
            half: 'half'
        };
        var ratingItemTemplates = {
            item: 'itemTemplate',
            hovered: 'hoveredTemplate',
            selected: 'selectedTemplate'
        };
        var ratingItemStates = {
            selected: 'k-state-selected',
            hovered: 'k-state-hover',
            hoveredPrecise: 'k-state-hover-precise'
        };
        var ratingItemAttributes = {
            partValue: 'part-value',
            dataValue: 'data-value',
            value: 'value',
            title: 'title'
        };
        var ratingStyles = {
            widget: 'k-rating k-widget',
            container: 'k-rating-container',
            item: 'k-rating-item',
            icon: 'k-icon k-i-star-outline',
            iconSelected: 'k-icon k-i-star',
            label: 'k-rating-label',
            disabled: 'k-state-disabled',
            readonly: 'k-state-readonly',
            active: 'k-state-active',
            hidden: 'k-hidden'
        };
        var RATING_TEMPLATE = kendo.template('<span class="#=styles.widget#"></span>');
        var RATING_CONTAINER_TEMPLATE = kendo.template('<span class="#=styles.container#"></span>');
        var RATING_LABEL_WRAPPER_TEMPLATE = kendo.template('<span class="#=styles.label#"></span>');
        var RATING_LABEL_TEMPLATE = kendo.template('<span>#=value# / #=maxValue#</span>');
        var RATING_ITEM_WRAPPER_TEMPLATE = kendo.template('<span class="#=styles.item#" data-value="#=value#"></span>');
        var RATING_ITEM_TEMPLATE = kendo.template('<span class="#=icon#"></span>');
        var Rating = Widget.extend({
            init: function (element, options) {
                var that = this;
                Widget.fn.init.call(that, element, options);
                that.options = extend({}, that.options, options);
                that._element();
                that._wrapper();
                that._aria();
                that._initSettings();
                that._renderItems();
                that._renderTooltip();
                that._renderLabel();
                that._selectInitial();
                that._attachEvents();
                kendo.notify(this);
            },
            events: [
                SELECT,
                CHANGE
            ],
            options: {
                name: 'Rating',
                messages: {},
                min: 1,
                max: 5,
                selection: ratingSelection.continuous,
                precision: ratingPrecision.item,
                tooltip: true,
                label: true,
                readonly: false,
                enabled: true,
                selectValueOnFocus: null,
                itemTemplate: null,
                selectedTemplate: null,
                hoveredTemplate: null
            },
            _element: function () {
                var that = this;
                that.element.attr('type', 'number');
                that.element.addClass(ratingStyles.hidden);
            },
            _wrapper: function () {
                var that = this;
                that.wrapper = $(RATING_TEMPLATE({ styles: ratingStyles }));
                that.wrapper = that.element.wrap(that.wrapper).parent();
                that.wrapper.addClass(that.element[0].className.replace(ratingStyles.hidden, '')).append($(RATING_CONTAINER_TEMPLATE({ styles: ratingStyles })));
                that.wrapper[0].style.cssText = that.element[0].style.cssText;
                that.container = that.wrapper.find(DOT + ratingStyles.container);
            },
            _aria: function () {
                var that = this, wrapper = that.wrapper, element = that.element, id = element.attr('id'), labelFor = $('label[for="' + id + '"]'), ariaLabel = element.attr(ARIA_LABEL), ariaLabelledBy = element.attr(ARIA_LABELLEDBY);
                that.wrapper.attr(TABINDEX, 0).attr(ROLE, 'slider').attr(ARIA_VALUEMIN, parseFloat(that.element.attr(MIN)) || that.options.min).attr(ARIA_VALUEMAX, parseFloat(that.element.attr(MAX)) || that.options.max).attr(ARIA_VALUENOW, that.options.value);
                if (ariaLabel) {
                    wrapper.attr(ARIA_LABEL, ariaLabel);
                } else if (ariaLabelledBy) {
                    wrapper.attr(ARIA_LABELLEDBY, ariaLabelledBy);
                } else if (labelFor.length) {
                    var labelId = labelFor.attr('id');
                    if (!labelId) {
                        labelId = (id || kendo.guid()) + LABELIDPART;
                        labelFor.attr('id', labelId);
                    }
                    wrapper.attr(ARIA_LABELLEDBY, labelId);
                }
            },
            _initSettings: function () {
                var that = this, isPrecise = that.options.precision != ratingPrecision.item, options = that.options;
                options.value = parseFloat(options.value);
                if (options.value === null) {
                    options.value = parseFloat(that.element.val());
                }
                options.min = parseFloat(that.element.attr(MIN)) || that.options.min;
                options.max = parseFloat(that.element.attr(MAX)) || that.options.max;
                that._valueMin = isPrecise ? that.options.min - PRECISION_HALF_VALUE : that.options.min;
                options.enabled = options.enabled && !that.element.attr(DISABLED);
                options.readonly = options.readonly || !!that.element.attr(READONLY);
                that._setState();
            },
            _renderItems: function () {
                var that = this, container = that.container, min = that.options.min, max = that.options.max, itemTemplate = that.options.itemTemplate ? kendo.template(that.options.itemTemplate) : RATING_ITEM_TEMPLATE;
                for (var i = min; i <= max; i += 1) {
                    var itemWrapper = $(RATING_ITEM_WRAPPER_TEMPLATE({
                        styles: ratingStyles,
                        value: i
                    }));
                    itemWrapper.append(itemTemplate({
                        icon: ratingStyles.icon,
                        index: i
                    }));
                    container.append(itemWrapper);
                }
            },
            _renderTooltip: function () {
                var that = this, items = that.container.find(DOT + KITEM), enabled = that.options.tooltip === true;
                if (!enabled) {
                    items.removeAttr(ratingItemAttributes.title);
                    return;
                }
                for (var i = 0; i < items.length; i += 1) {
                    $(items[i]).attr(ratingItemAttributes.title, $(items[i]).data(ratingItemAttributes.value));
                }
            },
            _renderLabel: function () {
                var that = this, label = that.wrapper.find(DOT + ratingStyles.label), enabled = that.options.label === true || that.options.label.template !== undefined, template = that.options.label && that.options.label.template ? kendo.template(that.options.label.template) : RATING_LABEL_TEMPLATE;
                if (!enabled || that.value() === null) {
                    label.remove();
                    that.label = null;
                    return;
                }
                if (!label.length) {
                    that.label = label = $(RATING_LABEL_WRAPPER_TEMPLATE({ styles: ratingStyles }));
                    that.wrapper.append(label);
                }
                label.html(template({
                    styles: ratingStyles,
                    value: that.value(),
                    maxValue: that.options.max
                }));
            },
            _selectInitial: function () {
                var that = this;
                if (!isNaN(that.options.value)) {
                    that.value(that.options.value);
                }
            },
            _attachEvents: function () {
                var that = this, isHalfPrecision = that.options.precision == ratingPrecision.half;
                that.wrapper.on(FOCUS, proxy(that._focus, that)).on(BLUR, proxy(that._blur, that)).on(KEYDOWN, proxy(that._keydown, that));
                that.container.on(CLICK, DOT + KITEM, proxy(that._click, that)).on(MOUSEENTER, DOT + KITEM, proxy(that._mouseenter, that)).on(MOUSELEAVE, DOT + KITEM, proxy(that._mouseleave, that)).on(MOUSEDOWN, proxy(that._mousedown, that));
                if (isHalfPrecision) {
                    that.container.on(MOUSEMOVE, DOT + KITEM, proxy(that._mousemove, that));
                }
            },
            _focus: function () {
                var that = this, container = that.container, wrapper = that.wrapper, focusedItems = that.container.find(DOT + FOCUSED), selectValueOnFocus = that.options.selectValueOnFocus, firstElement = container.children().first(), selectedElement, hoveredElement, itemToFocus;
                if (!that.options.enabled || that.options.readonly || that.preventFocus) {
                    if (that.options.readonly) {
                        that.wrapper.addClass(FOCUSED);
                    }
                    return;
                }
                wrapper.addClass(FOCUSED);
                focusedItems.removeClass(FOCUSED);
                if (that.value() === null && selectValueOnFocus !== null) {
                    that.value(selectValueOnFocus);
                }
                selectedElement = container.find(DOT + ratingItemStates.selected).last();
                hoveredElement = container.find(DOT + ratingItemStates.hovered).last();
                itemToFocus = selectedElement.length ? selectedElement : hoveredElement;
                itemToFocus = itemToFocus.length ? itemToFocus : firstElement;
                itemToFocus.addClass(FOCUSED);
            },
            _blur: function () {
                var that = this;
                that.preventFocus = false;
                that.wrapper.removeClass(FOCUSED);
                that.container.find(DOT + FOCUSED).removeClass(FOCUSED);
                that.element.blur();
            },
            _mousedown: function () {
                var that = this;
                that.preventFocus = true;
            },
            _keydown: function (e) {
                var that = this, container = that.container, currentValue = that.parsedValue, isPrecise = that.options.precision != ratingPrecision.item, step = isPrecise ? PRECISION_HALF_VALUE : 1, focusableItems = container.find(DOT + KITEM), focusedElement = container.find(DOT + FOCUSED), currentIndex = focusableItems.index(focusedElement), isRtl = kendo.support.isRtl(that.wrapper), isEmpty = isNaN(currentValue), keyCode = e.keyCode, left, right, itemToFocus, itemValue;
                if (!that.options.enabled || that.options.readonly) {
                    return;
                }
                left = keyCode === keys.RIGHT && isRtl || keyCode === keys.LEFT && !isRtl;
                right = keyCode === keys.LEFT && isRtl || keyCode === keys.RIGHT && !isRtl;
                if (left || keyCode === keys.DOWN) {
                    itemToFocus = isEmpty ? focusableItems.eq(0) : $(focusableItems[currentIndex - 1]);
                    itemValue = isEmpty ? that._valueMin : currentValue - step;
                    that._select(itemToFocus, itemValue);
                    e.preventDefault();
                } else if (right || keyCode === keys.UP) {
                    itemToFocus = isEmpty ? focusableItems.eq(0) : $(focusableItems[currentIndex + 1]);
                    itemValue = isEmpty ? that._valueMin : currentValue + step;
                    that._select(itemToFocus, itemValue);
                    e.preventDefault();
                } else if (keyCode === keys.HOME) {
                    itemToFocus = focusableItems.eq(0);
                    that._select(itemToFocus, that._valueMin);
                    e.preventDefault();
                } else if (keyCode === keys.END) {
                    itemToFocus = focusableItems.eq(focusableItems.length - 1);
                    that._select(itemToFocus);
                    e.preventDefault();
                }
            },
            _getTemplateType: function (type) {
                var that = this, template;
                if (that.options[type]) {
                    template = kendo.template(that.options[type]);
                } else {
                    template = RATING_ITEM_TEMPLATE;
                }
                return template;
            },
            _renderTemplate: function (target, type) {
                var that = this, template = that._getTemplateType(type), defaultIcon = ratingStyles.icon;
                if (type == ratingItemTemplates.selected || type == ratingItemTemplates.hovered) {
                    defaultIcon = ratingStyles.iconSelected;
                }
                for (var i = 0; i < target.length; i += 1) {
                    $(target[i]).html(template({
                        icon: defaultIcon,
                        index: $(target[i]).index()
                    }));
                }
            },
            _updateItemTemplates: function (state, target) {
                var that = this, isSingle = ratingSelection.single == that.options.selection, isHalfPrecision = that.options.precision == ratingPrecision.half, previousSelection = that.container.find(DOT + ratingItemStates.selected), currentSelection = isSingle ? target : target.prevAll().addBack(), resetItems = isSingle ? previousSelection : target.nextAll(), templateType = ratingItemTemplates[state], stateClass = ratingItemStates[state];
                resetItems.removeClass(stateClass);
                currentSelection.addClass(stateClass);
                that._renderTemplate(currentSelection, templateType);
                if (!isSingle || isSingle && state == SELECTED && currentSelection.get(0) != previousSelection.get(0)) {
                    that._renderTemplate(resetItems, ratingItemTemplates.item);
                }
                if (isHalfPrecision) {
                    that._renderTemplate(target, ratingItemTemplates.item);
                }
            },
            _change: function (target, newValue) {
                var that = this, currentValue = that.value();
                that.value(newValue);
                that.trigger(CHANGE, {
                    target: target,
                    oldValue: currentValue,
                    newValue: that.value()
                });
            },
            _click: function (e) {
                var that = this, target = $(e.target).closest(DOT + KITEM), valueToSelect = target.attr(ratingItemAttributes.dataValue);
                if (!that.options.enabled || that.options.readonly) {
                    return;
                }
                if (target.data(ratingItemAttributes.partValue)) {
                    valueToSelect = target.data(ratingItemAttributes.partValue);
                }
                that._select(target, valueToSelect);
            },
            _select: function (target, newValue) {
                var that = this, value = isNaN(newValue) ? target.attr(ratingItemAttributes.dataValue) : newValue;
                if (value == that.value() || value < that._valueMin || value > that.options.max) {
                    return;
                }
                that.trigger(SELECT, { target: target });
                that._change(target, value);
                that._focus();
            },
            _mouseenter: function (e) {
                var that = this, target = $(e.target), item = target.closest(DOT + KITEM);
                if (!that.options.enabled || that.options.readonly) {
                    return;
                }
                that.enableMove = true;
                if (target.is(DOT + KITEM)) {
                    that._updateItemTemplates(HOVERED, item);
                }
            },
            _mouseleave: function (e) {
                var that = this, selection = that.options.selection, isHalfPrecision = that.options.precision == ratingPrecision.half, isSingle = selection == ratingSelection.single, item = $(e.target).closest(DOT + KITEM), items = that.container.find(DOT + KITEM), hasPart, template;
                that.enableMove = false;
                var setTemplate = function (item) {
                    hasPart = that.parsedValue % 1 !== 0 && item.is(that.container.find('[data-value=' + Math.ceil(that.value()) + ']'));
                    template = (item.hasClass(ratingItemStates.selected) || item.hasClass(ratingItemStates.hovered)) && !hasPart ? ratingItemTemplates.selected : ratingItemTemplates.item;
                    that._renderTemplate(item, template);
                    if (isHalfPrecision && hasPart && item.hasClass(ratingItemStates.selected)) {
                        that._togglePrecisionElements(item, SELECTED);
                    }
                };
                items.removeClass(ratingItemStates.hovered);
                if (isSingle) {
                    setTemplate(item);
                } else {
                    for (var i = 0; i < items.length; i += 1) {
                        var currentItem = $(items[i]);
                        setTemplate(currentItem);
                    }
                }
            },
            _mousemove: function (e) {
                var that = this, item = $(e.target).closest(DOT + KITEM), mousePosition, itemOffset, partSize;
                if (!that.enableMove) {
                    return;
                }
                if (item.length) {
                    mousePosition = e.clientX;
                    itemOffset = item.offset().left;
                    partSize = Math.abs(mousePosition - itemOffset);
                    that._togglePrecisionElements(item, HOVERED);
                    that._updatePrecisionElements(item, partSize);
                }
                e.preventDefault();
            },
            _togglePrecisionElements: function (item, templateType) {
                var that = this, part = item.find(DOT + PRECISION_PART), partTemplate = that._getTemplateType(ratingItemTemplates[templateType]), isFraction;
                if (!part.length) {
                    isFraction = that.parsedValue % 1 !== 0;
                    part = $('<span></span>').addClass(PRECISION_PART);
                    part.append(partTemplate({ icon: ratingStyles.iconSelected }));
                    part.width(isFraction ? item.width() / 2 : item.width());
                    item.append(part);
                    item.append($('<span></span>').css({
                        'width': item.width(),
                        'height': item.height(),
                        'display': 'block'
                    }));
                    that._createUpdatePrecisionComplement(item, isFraction);
                } else {
                    part.html(partTemplate({ icon: ratingStyles.iconSelected }));
                }
            },
            _createUpdatePrecisionComplement: function (item, isHalf) {
                var that = this, complement = item.find(DOT + PRECISION_COMPLEMENT), iconElement = item.children().first(), isRtl = kendo.support.isRtl(that.wrapper), dir = !isRtl ? 'left' : 'right';
                if (!complement.length) {
                    complement = iconElement.wrap($('<span></span>').addClass(PRECISION_COMPLEMENT)).parent();
                }
                complement.width(isHalf ? item.width() / 2 : 0);
                complement.css(dir, isHalf || isRtl ? '50%' : 0);
            },
            _updatePrecisionElements: function (item, partSize) {
                var that = this, itemPart = item.find(DOT + PRECISION_PART), itemValue = kendo.parseFloat(item.data(ratingItemAttributes.value)), isRtl = kendo.support.isRtl(this.wrapper), itemWidth = item.width(), halfWidth = itemWidth / 2, halfOffset = parseFloat(item.outerWidth() / 2), isHalf = !isRtl ? partSize < halfOffset : partSize > halfOffset;
                if (item.length && itemPart.length) {
                    itemPart.width(isHalf ? halfWidth : itemWidth);
                    if (this.options.tooltip) {
                        item.attr(ratingItemAttributes.title, isHalf ? itemValue - PRECISION_HALF_VALUE : itemValue);
                    }
                    item.data(ratingItemAttributes.partValue, isHalf ? itemValue - PRECISION_HALF_VALUE : itemValue);
                    that._createUpdatePrecisionComplement(item, isHalf);
                }
            },
            _updateElement: function (value) {
                var that = this, elementValue = value === null ? '' : value;
                that.element.val(elementValue);
                if (that.value === null) {
                    that.wrapper.removeAttr(ARIA_VALUENOW);
                } else {
                    that.wrapper.attr(ARIA_VALUENOW, value);
                }
            },
            _updateItemsRendering: function (value) {
                var that = this, isHalfPrecision = that.options.precision == ratingPrecision.half, updateTemplate = value === null ? 'item' : SELECTED, valueItem = value === null ? that.container.find(DOT + ratingItemStates.selected).last() : that.container.find(DOT + KITEM + '[data-value=\'' + Math.ceil(value) + '\']');
                if (value === null) {
                    that.container.find(DOT + KITEM).removeClass(ratingItemStates.selected);
                }
                that._updateItemTemplates(updateTemplate, valueItem);
                if (isHalfPrecision && value !== null) {
                    that._togglePrecisionElements(valueItem, SELECTED);
                }
                that._renderLabel();
            },
            _setState: function () {
                var that = this, element = that.element, wrapper = that.wrapper, readonly = that.options.readonly, enabled = that.options.enabled;
                if (readonly && enabled) {
                    element.attr(READONLY, READONLY);
                    wrapper.attr(ARIA_READONLY, true);
                } else {
                    element.removeAttr(READONLY);
                    wrapper.removeAttr(ARIA_READONLY);
                }
                if (enabled) {
                    element.removeAttr(DISABLED);
                    wrapper.removeAttr(ARIA_DISABLED);
                    wrapper.attr(TABINDEX, 0);
                } else {
                    element.attr(DISABLED, DISABLED);
                    wrapper.attr(ARIA_DISABLED, true);
                    wrapper.removeAttr(TABINDEX);
                }
                wrapper.toggleClass(ratingStyles.disabled, !enabled);
                wrapper.toggleClass(ratingStyles.readonly, readonly && enabled);
            },
            value: function (value) {
                var that = this, isHalfPrecision = that.options.precision == ratingPrecision.half;
                if (value === null) {
                    that._updateElement(value);
                    that._updateItemsRendering(value);
                    return;
                }
                value = parseFloat(value);
                if (value === null) {
                    value = parseFloat(that.element.val());
                    return value;
                }
                value = Math.max(that._valueMin, Math.min(value, that.options.max));
                if (isHalfPrecision) {
                    that.parsedValue = parseFloat((Math.ceil(value * 2) / 2).toFixed(1));
                } else {
                    that.parsedValue = Math.round(value);
                }
                that._updateElement(value);
                that._updateItemsRendering(value);
            },
            reset: function () {
                var that = this;
                that.value(null);
            },
            enable: function (enable) {
                var that = this;
                if (typeof enable == 'undefined') {
                    enable = true;
                }
                that.options.enabled = enable;
                that.options.readonly = false;
                that._setState();
            },
            readonly: function (readonly) {
                var that = this;
                if (typeof readonly == 'undefined') {
                    readonly = true;
                }
                that.options.readonly = readonly;
                that.options.enabled = true;
                that._setState();
            },
            setOptions: function (options) {
                var that = this;
                that.options = $.extend(that.options, options);
                if (options.enabled !== undefined) {
                    that.enable(options.enabled);
                }
                if (options.readonly !== undefined) {
                    that.readonly(options.readonly);
                }
                if (options.label !== undefined) {
                    that._renderLabel();
                }
                if (options.tooltip !== undefined) {
                    that._renderTooltip();
                }
                if (options.value !== undefined) {
                    that.value(options.value);
                }
                if (options.min || options.max !== undefined || options.itemTemplate !== undefined || options.selectedTemplate !== undefined || options.hoveredTemplate !== undefined) {
                    that.container.empty();
                    that._renderItems();
                    that._renderLabel();
                    that._renderTooltip();
                    that._selectInitial();
                }
            },
            destroy: function () {
                var that = this;
                that.wrapper.off(NS);
                that.container.off(NS);
                Widget.fn.destroy.call(that);
            }
        });
        ui.plugin(Rating);
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));