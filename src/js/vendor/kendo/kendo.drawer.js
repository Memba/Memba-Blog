/** 
 * Kendo UI v2019.3.917 (http://www.telerik.com/kendo-ui)                                                                                                                                               
 * Copyright 2019 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/
(function (f, define) {
    define('kendo.drawer', ['kendo.userevents'], f);
}(function () {
    var __meta__ = {
        id: 'drawer',
        name: 'Drawer',
        category: 'web',
        description: 'The Kendo Drawer widget provides slide to reveal sidebar',
        depends: ['userevents']
    };
    (function ($, undefined) {
        var kendo = window.kendo, ui = kendo.ui, Widget = ui.Widget, SHOW = 'show', HIDE = 'hide', ITEMCLICK = 'itemClick', PUSH = 'push', OVERLAY = 'overlay', LEFT = 'left', RIGHT = 'right';
        var Drawer = kendo.ui.Widget.extend({
            init: function (element, options) {
                var that = this;
                var userEvents;
                Widget.fn.init.call(this, element, options);
                options = that.options;
                that._element(element);
                that._wrapper(element);
                that.position();
                that._mode();
                if (options.mini) {
                    that._miniMode();
                }
                that._initDrawerItems();
                if (options.mini && options.mode != PUSH) {
                    that._setBodyOffset();
                }
                userEvents = this.userEvents = new kendo.UserEvents(options.mode != PUSH ? $(document.body) : this.drawerContainer, {
                    fastTap: true,
                    allowSelection: true
                });
                var tap = function (e) {
                    if ($.contains(that.drawerItemsWrapper[0], e.event.target)) {
                        that._itemClick(e);
                    }
                    if (that.visible && !that.trigger('hide', { sender: this })) {
                        that.hide();
                        e.preventDefault();
                    }
                };
                if (this.options.swipeToOpen) {
                    userEvents.bind('start', function (e) {
                        that._start(e);
                    });
                    userEvents.bind('move', function (e) {
                        that._update(e);
                    });
                    userEvents.bind('end', function (e) {
                        that._end(e);
                    });
                    userEvents.bind('tap', tap);
                } else {
                    userEvents.bind('press', tap);
                }
                if (options.minHeight && options.mode == PUSH) {
                    that.drawerContainer.css('min-height', options.minHeight);
                }
            },
            _element: function () {
                var that = this;
                var element = that.element;
                var options = that.options;
                var contentElement = that.contentElement = element.children().first();
                that.drawerElement = $(options.template);
                contentElement.addClass('k-drawer-content');
                element.addClass('k-widget k-drawer');
            },
            _wrapper: function () {
                var options = this.options;
                var drawerElement = this.drawerElement;
                var element = this.element;
                var contentElement = this.contentElement;
                var drawerItemsWrapper = this.drawerItemsWrapper = drawerElement.wrap('<div class=\'k-drawer-items\'></div>').parent();
                var drawerWrapper = this.drawerWrapper = drawerItemsWrapper.wrap('<div class=\'k-drawer-wrapper\'></div>').parent();
                var drawerContainer = this.drawerContainer = element.wrap('<div class=\'k-drawer-container\'></div>').parent();
                if (options.mini) {
                    if (options.mini.width) {
                        drawerWrapper.width(options.mini.width);
                    }
                } else {
                    drawerWrapper.width(0);
                }
                if (options.mode === PUSH) {
                    drawerContainer.append(contentElement);
                } else if (options.mode === OVERLAY) {
                    drawerContainer.after(contentElement);
                    $(document.body).prepend(drawerContainer);
                }
                element.append(drawerWrapper);
            },
            _setBodyOffset: function () {
                var overlayMiniOffset = this.element.outerWidth();
                if (this.leftPositioned) {
                    $(document.body).css('padding-left', overlayMiniOffset);
                } else {
                    $(document.body).css('padding-right', overlayMiniOffset);
                }
            },
            _initDrawerItems: function () {
                var drawerItemsWrapper = this.drawerItemsWrapper;
                var drawerItems = drawerItemsWrapper.find('[data-role=\'drawer-item\']');
                var separatorItems = drawerItemsWrapper.find('[data-role=\'drawer-separator\']');
                drawerItems.addClass('k-drawer-item');
                separatorItems.addClass('k-drawer-item k-drawer-separator');
                if (this._selectedItemIndex >= 0) {
                    drawerItems.removeClass('k-state-selected');
                    drawerItems.eq(this._selectedItemIndex).addClass('k-state-selected');
                }
            },
            _mode: function () {
                var options = this.options;
                var drawerContainer = this.drawerContainer;
                var overlayContainer;
                if (options.mode == PUSH) {
                    drawerContainer.addClass('k-drawer-' + PUSH);
                } else {
                    drawerContainer.addClass('k-drawer-' + OVERLAY);
                    overlayContainer = this.overlayContainer = $('<div class="k-overlay"></div>');
                    overlayContainer.hide();
                    drawerContainer.prepend(overlayContainer);
                }
            },
            _miniMode: function () {
                var options = this.options;
                var drawerContainer = this.drawerContainer;
                var miniWidth = options.mini.width;
                var miniTemplate = this._miniTemplate = options.mini.template && $(options.mini.template);
                var drawerItemsWrapper = this.drawerItemsWrapper;
                var drawerWrapper = this.drawerWrapper;
                drawerContainer.addClass('k-drawer-mini');
                if (miniTemplate) {
                    drawerItemsWrapper.html(miniTemplate);
                }
                if (miniWidth) {
                    drawerWrapper.width(miniWidth);
                }
                this.minWidth = options.mini.width || this.drawerWrapper.width();
            },
            show: function () {
                var drawerWrapper = this.drawerWrapper;
                var drawerContainer = this.drawerContainer;
                var options = this.options;
                var isExpanded = drawerContainer.hasClass('k-drawer-expanded');
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
                if (options.mode === OVERLAY) {
                    this.overlayContainer.show();
                    this.visible = true;
                }
            },
            hide: function () {
                var that = this;
                var drawerWrapper = that.drawerWrapper;
                var drawerContainer = that.drawerContainer;
                var options = this.options;
                var drawerItemsWrapper = this.drawerItemsWrapper;
                var miniTemplate = this._miniTemplate;
                var miniWidth = options.mini && options.mini.width;
                if (this._miniTemplate) {
                    drawerItemsWrapper.html(miniTemplate);
                    that._initDrawerItems();
                    this._selectItem();
                }
                if (options.mini) {
                    if (miniWidth) {
                        drawerWrapper.width(miniWidth);
                    } else {
                        drawerWrapper.width('');
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
            position: function (value) {
                var that = this;
                var options = that.options;
                var position = value || options.position;
                var drawerContainer = that.drawerContainer;
                if (position == RIGHT) {
                    drawerContainer.removeClass('k-drawer-' + LEFT);
                    drawerContainer.addClass('k-drawer-' + RIGHT);
                } else {
                    drawerContainer.removeClass('k-drawer-' + RIGHT);
                    drawerContainer.addClass('k-drawer-' + LEFT);
                }
                this.leftPositioned = position === LEFT;
            },
            _start: function (e) {
                var that = this;
                var options = this.options;
                var drawerWrapper = this.drawerWrapper;
                var drawerItemsWrapper = this.drawerItemsWrapper;
                var userEvents = e.sender;
                if (Math.abs(e.x.velocity) < Math.abs(e.y.velocity) || kendo.triggeredByInput(e.event)) {
                    userEvents.cancel();
                    return;
                }
                if (this.drawerMini) {
                    drawerItemsWrapper.html(that.drawerElement);
                }
                drawerWrapper.css('transition', 'none');
                if (options.mode != PUSH) {
                    this.overlayContainer.show();
                }
            },
            _update: function (e) {
                var options = this.options;
                var mode = options.mode;
                if (mode == PUSH) {
                    this._push(e);
                } else {
                    this._overlay(e);
                }
            },
            _end: function (e) {
                var velocity = e.x.velocity;
                var options = this.options;
                var drawerWrapper = this.drawerWrapper;
                var elementWidth = drawerWrapper.width();
                var pastHalf = elementWidth > options.width / 2;
                var velocityThreshold = 0.8;
                var shouldShow;
                drawerWrapper.css('transition', 'all .3s ease-out');
                if (this.leftPositioned) {
                    shouldShow = velocity > -velocityThreshold && (velocity > velocityThreshold || pastHalf);
                } else {
                    shouldShow = velocity < velocityThreshold && (velocity < -velocityThreshold || pastHalf);
                }
                if (shouldShow) {
                    if (this.trigger('show', { sender: this })) {
                        e.preventDefault();
                        this.hide();
                    } else {
                        this.show();
                    }
                } else {
                    if (this.trigger('hide', { sender: this })) {
                        e.preventDefault();
                        this.show();
                    } else {
                        this.hide();
                    }
                }
            },
            _overlay: function (moveEventArgs) {
                var options = this.options;
                var minWidth = options.mini && options.mini.width || this.minWidth || 0;
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
            _push: function (moveEventArgs) {
                var options = this.options;
                var minWidth = options.mini && options.mini.width || this.minWidth || 0;
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
            _selectItem: function (item) {
                var selectedItemIndex;
                if (item) {
                    item.addClass('k-state-selected');
                    this.trigger('itemClick', {
                        item: item,
                        sender: this
                    });
                    this._selectedItemIndex = item.index();
                    return;
                }
                selectedItemIndex = this._selectedItemIndex;
                if (selectedItemIndex) {
                    this.drawerItemsWrapper.find('[data-role=\'drawer-item\']').eq(selectedItemIndex).addClass('k-state-selected');
                }
            },
            _itemClick: function (e) {
                var that = this;
                var item;
                if ($(e.event.target).find('.k-drawer-item').length > 0) {
                    item = $(e.event.target).find('.k-drawer-item');
                } else if ($(e.event.target).closest('.k-drawer-item').length > 0) {
                    item = $(e.event.target).closest('.k-drawer-item');
                } else if ($(e.event.target).hasClass('.k-drawer-item')) {
                    item = $(e.event.target);
                }
                that.drawerItemsWrapper.find('.k-drawer-item').removeClass('k-state-selected');
                that._selectItem(item);
            },
            destroy: function () {
                var options = this.options;
                if (options.mode != PUSH) {
                    if (this.leftPositioned) {
                        $(document.body).css('padding-left', 0);
                    } else {
                        $(document.body).css('padding-right', 0);
                    }
                }
                Widget.fn.destroy.call(this);
                this.userEvents.destroy();
                kendo.destroy(this.element);
                this.element = this.drawerWrapper = this.drawerElement = this.drawerContainer = this.drawerItemsWrapper = this._miniTemplate = null;
            },
            options: {
                name: 'Drawer',
                position: LEFT,
                mode: 'overlay',
                swipeToOpen: true,
                width: 280,
                mini: false,
                template: ''
            },
            events: [
                HIDE,
                SHOW,
                ITEMCLICK
            ]
        });
        kendo.ui.plugin(Drawer);
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));