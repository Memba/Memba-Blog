/**
 * Kendo UI v2023.3.1010 (http://www.telerik.com/kendo-ui)
 * Copyright 2023 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
import "./kendo.userevents.js";

var __meta__ = {
    id: "drawer",
    name: "Drawer",
    category: "web",
    description: "The Kendo Drawer widget provides slide to reveal sidebar",
    depends: [ "userevents" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        SHOW = "show",
        HIDE = "hide",
        NS = ".kendoDrawer",
        FOCUSED = "k-focus",
        keys = kendo.keys,
        ITEMCLICK = "itemClick",
        TABINDEX = "tabIndex",
        PUSH = "push",
        OVERLAY = "overlay",
        LEFT = "left",
        START = "start",
        END = "end",
        RIGHT = "right";

    var Drawer = kendo.ui.Widget.extend({
        init: function(element, options) {
            var that = this;
            var userEvents;

            Widget.fn.init.call(this, element, options);

            options = that.options;

            that._element(element);

            that._wrapper(element);

            that._navigatable();

            that.position();

            that._mode();

            if (options.mini) {
                that._miniMode();
            }

            that._initDrawerItems();

            if (options.mini && options.mode != PUSH) {
                that._setBodyOffset();
            }

            userEvents = this.userEvents = new kendo.UserEvents(options.mode != PUSH ? $(document.body) : this.drawerContainer, { fastTap: true, allowSelection: true });

            that.tap = function(e) {
                if ($.contains(that.drawerItemsWrapper[0], e.event.target)) {
                    that._itemClick(e);
                }
                if (options.autoCollapse && that.visible && !that.trigger("hide", { sender: this })) {
                    that.hide();
                    e.preventDefault();
                }
            };

            if (this.options.swipeToOpen) {
                userEvents.bind("start", function(e) { that._start(e); });
                userEvents.bind("move", function(e) { that._update(e); });
                userEvents.bind("end", function(e) { that._end(e); });
                userEvents.bind("tap", that.tap);
            } else {
                userEvents.bind("press", that.tap);
            }

            if (options.minHeight && options.mode == PUSH) {
                that.drawerContainer.css("min-height", options.minHeight);
            }


            if (that._showWatermarkOverlay) {
                that._showWatermarkOverlay(that.drawerContainer[0]);
            }

            if (options.expanded) {
                that._removeTransition();
                that.show();
            }
        },

        _element: function() {
            var that = this;

            var element = that.element;
            var options = that.options;
            that.contentElement = element.children()
                .wrapAll("<div class='k-drawer-content'></div>")
                .parent();
            that.drawerElement = $(options.template);

            element.addClass("k-widget k-drawer");
        },

        _navigatable: function() {
            var that = this;
            var element = that.element;
            var drawerItems = element.find("[data-role='drawer-item']");

            drawerItems.first().parent()
                .attr("role", "menu")
                .attr("aria-orientation", "vertical");

            if (!this.options.navigatable) {
                return;
            }

            element
                .attr(TABINDEX, 0)
                .on("focus" + NS, that._focus.bind(that))
                .on("focusout" + NS, that._blur.bind(that))
                .on("keydown" + NS, that, that._keyDown.bind(that));
        },

        _blur: function() {
            var that = this;

            if (that._current) {
                that._current.removeClass(FOCUSED);
            }
        },

        _focus: function() {
            var that = this;

            that._setCurrent(that._current ? that._current : that.drawerItemsWrapper.find("[data-role='drawer-item']").eq(0));
        },

        _setCurrent: function(current) {
            var that = this;
            var id = kendo.guid();
            var next = $(current);

            if (that._current) {
                $(that._current)
                    .removeClass(FOCUSED)
                    .removeAttr("id");

                that.element.removeAttr("aria-activedescendant");
            }

            next
                .attr("id", id)
                .addClass(FOCUSED);

            that.element.attr("aria-activedescendant", id);

            that._current = next;
        },

        _keyDown: function(e) {
            var that = this;
            var handled = false;
            var current = that._current;
            var next;

            if (e.keyCode == keys.UP) {
                handled = true;
                next = current.prevAll("[data-role='drawer-item']").first();

                if (next.length) {
                    that._setCurrent(next);
                } else {
                    that._setCurrent(current.parent().find("[data-role='drawer-item']").last());
                }

            }

            if (e.keyCode == keys.DOWN) {
                handled = true;
                next = current.nextAll("[data-role='drawer-item']").first();

                if (next.length) {
                    that._setCurrent(next);
                } else {
                    that._setCurrent(current.parent().find("[data-role='drawer-item']").first());
                }
            }

            if (e.keyCode == keys.HOME) {
                handled = true;
                that._setCurrent(that.drawerItemsWrapper.find("[data-role='drawer-item']").eq(0));
            }

            if (e.keyCode == keys.END) {
                handled = true;
                that._setCurrent(that.drawerItemsWrapper.find("[data-role='drawer-item']").last());
            }

            if (e.keyCode == keys.SPACEBAR || e.keyCode == keys.ENTER) {
                handled = true;
                that.tap({
                    event: { target: current[0] },
                    preventDefault: $.noop
                });
            }

            if (e.keyCode == keys.ESC) {
                handled = true;
                that.hide();
            }

            if (handled) {
                //prevent scrolling while pressing the keys
                e.preventDefault();
            }
        },

        _wrapper: function() {
            var options = this.options;
            var drawerElement = this.drawerElement;
            var element = this.element;
            var contentElement = this.contentElement;
            var drawerItemsWrapper = this.drawerItemsWrapper = drawerElement.wrapAll("<div class='k-drawer-items'></div>").parent();
            var drawerWrapper = this.drawerWrapper = drawerItemsWrapper.wrap("<div class='k-drawer-wrapper'></div>").parent();
            var drawerContainer = this.drawerContainer = element.wrap("<div class='k-drawer-container k-pos-relative'></div>").parent();

            if (options.mini) {
                if (options.mini.width) {
                    drawerWrapper.width(options.mini.width);
                }
            } else {
                drawerWrapper.width(0);
            }


            if (options.mode === PUSH) {
                drawerContainer.append(contentElement);
            }
            else if (options.mode === OVERLAY) {
                drawerContainer.after(contentElement);
                $(document.body).prepend(drawerContainer);
            }

            element.append( drawerWrapper );
        },

        _addTransition: function() {
            this.drawerWrapper.css("transition", "all .3s ease-out");
        },

        _removeTransition: function() {
            this.drawerWrapper.css("transition", "none");
        },

        _setBodyOffset: function() {
            var overlayMiniOffset = this.element.outerWidth();

            if (this.leftPositioned) {
                $(document.body).css("padding-left", overlayMiniOffset);
            }
            else {
                $(document.body).css("padding-right", overlayMiniOffset);
            }
        },

        _initDrawerItems: function() {
            var drawerItemsWrapper = this.drawerItemsWrapper;
            var drawerItems = drawerItemsWrapper.find("[data-role='drawer-item']");
            var separatorItems = drawerItemsWrapper.find("[data-role='drawer-separator']");

            drawerItems.addClass("k-drawer-item").attr("role", "menuitem");
            separatorItems.addClass("k-drawer-item k-drawer-separator").attr("role", "separator");

            drawerItems.each((i, item) => {
                item.setAttribute("aria-label", item.textContent.trim());
            });

            if (this._selectedItemIndex >= 0) {
                drawerItems.removeClass("k-selected");
                drawerItems.eq(this._selectedItemIndex).addClass("k-selected");
            }
        },

        _mode: function() {
            var options = this.options;
            var drawerContainer = this.drawerContainer;
            var overlayContainer;

            if (options.mode == PUSH) {
                drawerContainer.addClass('k-drawer-' + PUSH);
            }
            else {
                drawerContainer.addClass('k-drawer-' + OVERLAY);
                overlayContainer = this.overlayContainer = $('<div class="k-overlay"></div>');
                overlayContainer.hide();
                drawerContainer.prepend(overlayContainer);
            }
        },

        _miniMode: function() {
            var options = this.options;
            var drawerContainer = this.drawerContainer;
            var miniWidth = options.mini.width;
            var miniTemplate = this._miniTemplate = options.mini.template && $(options.mini.template);
            var drawerItemsWrapper = this.drawerItemsWrapper;
            var drawerWrapper = this.drawerWrapper;

            drawerContainer.addClass("k-drawer-mini");

            if (miniTemplate) {
                drawerItemsWrapper.html(miniTemplate);
            }

            if (miniWidth) {
                drawerWrapper.width(miniWidth);
            }

            this.minWidth = options.mini.width || this.drawerWrapper.width();
        },

        show: function() {
            var drawerWrapper = this.drawerWrapper;
            var drawerContainer = this.drawerContainer;
            var options = this.options;
            var isExpanded = drawerContainer.hasClass("k-drawer-expanded");
            var miniTemplate = this._miniTemplate;
            var drawerElement = this.drawerElement;
            var drawerItemsWrapper = this.drawerItemsWrapper;

            if (!isExpanded) {
                drawerContainer.addClass('k-drawer-expanded');
                this.visible = true;
            }

            if (miniTemplate) {
                drawerItemsWrapper.html(drawerElement);
                this._initDrawerItems();
                this._selectItem();
            }

            drawerWrapper.width(options.width);

            if (options.mini) {
                drawerContainer.removeClass("k-drawer-mini");
            }

            if (options.mode === OVERLAY) {
                this.overlayContainer.show();
                this.visible = true;
            }
        },

        hide: function() {
            var that = this;
            var drawerWrapper = that.drawerWrapper;
            var drawerContainer = that.drawerContainer;
            var options = this.options;
            var drawerItemsWrapper = this.drawerItemsWrapper;
            var miniTemplate = this._miniTemplate;
            var miniWidth = options.mini && options.mini.width;

            this._addTransition();

            if (this._miniTemplate) {
                drawerItemsWrapper.html(miniTemplate);
                that._initDrawerItems();
                this._selectItem();
            }

            if (options.mini) {
                drawerContainer.addClass("k-drawer-mini");
                if (miniWidth) {
                    drawerWrapper.width(miniWidth);
                } else {
                    drawerWrapper.width("");
                }
            } else {
                drawerWrapper.width(0);
            }

            if (this.visible) {
                drawerContainer.removeClass('k-drawer-expanded');
                this.visible = false;
            }

            if (options.mode === OVERLAY) {
                this.overlayContainer.hide();
            }
        },

        position: function(value) {
            var that = this;
            var options = that.options;
            var position = value || options.position;

            if (position == RIGHT) {
                that.element.removeClass('k-drawer-' + START);
                that.element.addClass('k-drawer-' + END);
            }
            else {
                that.element.removeClass('k-drawer-' + END);
                that.element.addClass('k-drawer-' + START);
            }

            this.leftPositioned = position === LEFT;
        },

        _start: function(e) {
            var that = this;
            var options = this.options;
            var drawerWrapper = this.drawerWrapper;
            var drawerItemsWrapper = this.drawerItemsWrapper;
            var userEvents = e.sender;


            // ignore non-horizontal swipes
            if (Math.abs(e.x.velocity) < Math.abs(e.y.velocity) || kendo.triggeredByInput(e.event)) {
                userEvents.cancel();
                return;
            }


            if (this.drawerMini) {
                drawerItemsWrapper.html(that.drawerElement);
            }

            this._removeTransition();

            if (options.mode != PUSH) {
                this.overlayContainer.show();
            }
        },

        _update: function(e) {
            var options = this.options;
            var mode = options.mode;

                if (mode == PUSH) {
                    this._push(e);
                }
                else {
                    this._overlay(e);
                }
        },

        _end: function(e) {
            var velocity = e.x.velocity;
            var options = this.options;
            var drawerWrapper = this.drawerWrapper;
            var elementWidth = drawerWrapper.width();
            var pastHalf = elementWidth > options.width / 2;
            var velocityThreshold = 0.8;
            var shouldShow;

            this._addTransition();

            if (this.leftPositioned) {
                shouldShow = velocity > -velocityThreshold && (velocity > velocityThreshold || pastHalf);
            }
             else {
                shouldShow = velocity < velocityThreshold && (velocity < -velocityThreshold || pastHalf);
            }

            if (shouldShow) {
                if (this.trigger("show", { sender: this })) {
                    e.preventDefault();
                    this.hide();
                } else {
                    this.show();
                }
            } else {
                if (this.trigger("hide", { sender: this })) {
                    e.preventDefault();
                    this.show();
                } else {
                    this.hide();
                }
            }
        },

        _overlay: function(moveEventArgs) {
            var options = this.options;
            var minWidth = (options.mini && options.mini.width) || this.minWidth || 0;
            var drawerWrapper = this.drawerWrapper;
            var elementWidth = drawerWrapper.width();
            var limitedPosition;
            var updatedPosition;

            updatedPosition = elementWidth + (this.leftPositioned ? moveEventArgs.x.delta : -moveEventArgs.x.delta);

            limitedPosition = Math.min(Math.max(updatedPosition, minWidth), options.width);

            moveEventArgs.event.preventDefault();
            moveEventArgs.event.stopPropagation();

            drawerWrapper.width(limitedPosition);
        },

        _push: function(moveEventArgs) {
            var options = this.options;
            var minWidth = (options.mini && options.mini.width) || this.minWidth || 0;
            var drawerWrapper = this.drawerWrapper;
            var elementWidth = drawerWrapper.width();
            var limitedPosition;
            var updatedPosition;

            updatedPosition = elementWidth + (this.leftPositioned ? moveEventArgs.x.delta : -moveEventArgs.x.delta);

            limitedPosition = Math.min(Math.max(updatedPosition, minWidth), options.width);

            moveEventArgs.event.preventDefault();
            moveEventArgs.event.stopPropagation();

            drawerWrapper.width(limitedPosition);
        },

        _selectItem: function(item) {
            var selectedItemIndex;

            if (item) {
                item.addClass("k-selected");
                this.trigger("itemClick", { item: item, sender: this });
                this._selectedItemIndex = item.index();
                return;
            }

            selectedItemIndex = this._selectedItemIndex;

            if (selectedItemIndex) {
                this.drawerItemsWrapper.find("[data-role='drawer-item']").eq(selectedItemIndex).addClass("k-selected");
            }
        },

        _itemClick: function(e) {
            var that = this;
            var item;
            var items;

            if ($(e.event.target).find(".k-drawer-item").length > 0) {
                item = $(e.event.target).find(".k-drawer-item");
            }
            else if ($(e.event.target).closest(".k-drawer-item").length > 0) {
                item = $(e.event.target).closest(".k-drawer-item");
            }
            else if ($(e.event.target).hasClass(".k-drawer-item")) {
                item = $(e.event.target);
            }
            items = that.drawerItemsWrapper.find(".k-drawer-item").removeClass("k-selected");
            that._selectItem(item);

            if (that.options.navigatable) {
                that._setCurrent(item);
            }
        },

        destroy: function() {
            var options = this.options;

            if (options.mode != PUSH) {
                if (this.leftPositioned) {
                    $(document.body).css("padding-left", 0);
                }
                else {
                    $(document.body).css("padding-right", 0);
                }
            }

            Widget.fn.destroy.call(this);

            this.userEvents.destroy();

            kendo.destroy(this.element);
            this.element = this.drawerWrapper = this.drawerElement = this.drawerContainer = this.drawerItemsWrapper = this._miniTemplate = null;
        },

        options: {
            name: "Drawer",
            autoCollapse: true,
            expanded: false,
            position: LEFT,
            mode: "overlay",
            swipeToOpen: true,
            width: 280,
            mini: false,
            navigatable: false,
            template: ""
        },

        events: [
            HIDE,
            SHOW,
            ITEMCLICK
        ]

    });
    kendo.ui.plugin(Drawer);
})(window.kendo.jQuery);
export default kendo;

