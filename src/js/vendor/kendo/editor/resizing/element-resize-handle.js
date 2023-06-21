/**
 * Kendo UI v2023.2.606 (http://www.telerik.com/kendo-ui)
 * Copyright 2023 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
import "../main.js";
import "../../kendo.draganddrop.js";
import "./resizing-utils.js";

(function(kendo, undefined) {
    var $ = kendo.jQuery;
    var extend = $.extend;
    var noop = $.noop;

    var Editor = kendo.ui.editor;
    var Class = kendo.Class;
    var Draggable = kendo.ui.Draggable;
    var Observable = kendo.Observable;
    var getScrollBarWidth = Editor.ResizingUtils.getScrollBarWidth;
    var outerWidth = kendo._outerWidth;
    var outerHeight = kendo._outerHeight;

    var NS = ".kendoEditorElementResizeHandle";
    var RESIZE_HANDLE_CLASS = "k-element-resize-handle";

    var DRAG_START = "dragStart";
    var DRAG = "drag";
    var DRAG_END = "dragEnd";
    var HALF_INSIDE = "halfInside";
    var MOUSE_OVER = "mouseover";
    var MOUSE_OUT = "mouseout";

    var BODY = "body";
    var TABLE = "table";

    var EAST = "east";
    var NORTH = "north";
    var NORTHEAST = "northeast";
    var NORTHWEST = "northwest";
    var SOUTH = "south";
    var SOUTHEAST = "southeast";
    var SOUTHWEST = "southwest";
    var WEST = "west";

    var DOT = ".";

    var ElementResizeHandle = Observable.extend({
        init: function(options) {
            var that = this;

            Observable.fn.init.call(that);

            that.options = extend({}, that.options, options);
            that.element = $(that.options.template).appendTo(that.options.appendTo)[0];

            that._attachEventHandlers();
            that._addStyles();
            that._initDraggable();
            that._initPositioningStrategy();
            that._initDraggingStrategy();

            $(that.element).data(TABLE, that.options.resizableElement);
        },

        destroy: function() {
            var that = this;

            $(that.element).off(NS).remove();
            that.element = null;

            that._destroyDraggable();

            that.unbind();
        },

        options: {
            appendTo: null,
            direction: SOUTHEAST,
            resizableElement: null,
            rtl: false,
            template:
                "<div class='k-element-resize-handle-wrapper' unselectable='on' contenteditable='false'>" +
                    "<div class='" + RESIZE_HANDLE_CLASS + "'></div>" +
                "</div>"
        },

        events: [
            DRAG_START,
            DRAG,
            DRAG_END,
            MOUSE_OVER,
            MOUSE_OUT
        ],

        show: function() {
            this._setPosition();
        },

        _setPosition: function() {
            var that = this;
            var position = that._positioningStrategy.getPosition();

            $(that.element).css({
                top: position.top,
                left: position.left,
                position: "absolute"
            });
        },

        _attachEventHandlers: function() {
            var that = this;

            $(that.element)
                .on(MOUSE_OVER + NS, that._onMouseOver.bind(that))
                .on(MOUSE_OUT + NS, that._onMouseOut.bind(that));
        },

        _onMouseOver: function() {
            this.trigger(MOUSE_OVER);
        },

        _onMouseOut: function() {
            this.trigger(MOUSE_OUT);
        },

        _addStyles: function() {
            var that = this;
            $(that.element).children(DOT + RESIZE_HANDLE_CLASS).addClass("k-resize-" + that.options.direction);
        },

        _initPositioningStrategy: function() {
            var that = this;
            var options = that.options;

            that._positioningStrategy = HandlePositioningStrategy.create({
                name: options.direction,
                handle: that.element,
                resizableElement: options.resizableElement,
                rootElement: options.rootElement,
                rtl: options.rtl
            });
        },

        _initDraggable: function() {
            var that = this;
            var element = that.element;

            if (that._draggable || !element) {
                return;
            }

            that._draggable = new Draggable(element, {
                dragstart: that._onDragStart.bind(that),
                drag: that._onDrag.bind(that),
                dragend: that._onDragEnd.bind(that)
            });
        },

        _onDragStart: function() {
            this.trigger(DRAG_START);
        },

        _onDrag: function(e) {
            var that = this;

            that.trigger(DRAG, that._draggingStrategy.adjustDragDelta({
                deltaX: e.x.delta,
                deltaY: e.y.delta,
                initialDeltaX: e.x.initialDelta,
                initialDeltaY: e.y.initialDelta
            }));
        },

        _onDragEnd: function() {
            this.trigger(DRAG_END);
        },

        _destroyDraggable: function() {
            var that = this;

            if (that._draggable) {
                that._draggable.destroy();
                that._draggable = null;
            }
        },

        _initDraggingStrategy: function() {
            var that = this;

            that._draggingStrategy = HandleDraggingStrategy.create({
                name: that.options.direction
            });
        }
    });

    var StrategyFactory = Class.extend({
        init: function() {
            this._items = [];
        },

        register: function(name, type) {
            this._items.push({
                name: name,
                type: type
            });
        },

        create: function(options) {
            var items = this._items;
            var itemsLength = items.length;
            var name = options.name ? options.name.toLowerCase() : "";
            var match;
            var item;
            var i;

            for (i = 0; i < itemsLength; i++) {
                item = items[i];

                if (item.name.toLowerCase() === name) {
                    match = item;
                    break;
                }
            }

            if (match) {
                return new match.type(options);
            }
        }
    });

    var PositioningStrategyFactory = StrategyFactory.extend({});
    PositioningStrategyFactory.current = new PositioningStrategyFactory();

    var HandlePositioningStrategy = Class.extend({
        init: function(options) {
            var that = this;
            that.options = extend({}, that.options, options);
        },

        options: {
            handle: null,
            offset: HALF_INSIDE,
            resizableElement: null,
            rootElement: null,
            rtl: false
        },

        getPosition: function() {
            var that = this;

            var position = that.calculatePosition();
            var handleOffsetPosition = that.applyHandleOffset(position);
            var scrollOffsetPosition = that.applyScrollOffset(handleOffsetPosition);

            return scrollOffsetPosition;
        },

        calculatePosition: noop,

        applyHandleOffset: function(position) {
            var options = this.options;
            var handle = $(options.handle);

            if (options.offset === HALF_INSIDE) {
                return {
                    top: position.top - (outerHeight(handle) / 2),
                    left: position.left - (outerWidth(handle) / 2)
                };
            }

            return position;
        },

        applyScrollOffset: function(position) {
            var options = this.options;
            var rootElement = $(options.rootElement);
            var scrollBarWidth = options.rtl ? getScrollBarWidth(rootElement[0]) : 0;
            var browser = kendo.support.browser;
            var rootLeft;

            if (!rootElement.is(BODY)) {
                rootLeft = kendo.scrollLeft(rootElement) || 0;

                if (options.rtl && (browser.mozilla || (browser.webkit && browser.version >= 85))) {
                    rootLeft = rootLeft * -1;
                }

                return {
                    top: position.top + (rootElement.scrollTop() || 0),
                    left: position.left + rootLeft - scrollBarWidth
                };
            }

            return position;
        }
    });

    HandlePositioningStrategy.create = function(options) {
        return PositioningStrategyFactory.current.create(options);
    };

    var EastPositioningStrategy = HandlePositioningStrategy.extend({
        calculatePosition: function() {
            var resizableElement = $(this.options.resizableElement);
            var offset = resizableElement.position();
            var marginLeft = parseInt(resizableElement.css("marginLeft"), 10);

            return {
                top: offset.top + (outerHeight(resizableElement) / 2),
                left: offset.left + outerWidth(resizableElement) + marginLeft
            };
        }
    });
    PositioningStrategyFactory.current.register(EAST, EastPositioningStrategy);

    var NorthPositioningStrategy = HandlePositioningStrategy.extend({
        calculatePosition: function() {
            var resizableElement = $(this.options.resizableElement);
            var offset = resizableElement.position();
            var marginLeft = parseInt(resizableElement.css("marginLeft"), 10);

            return {
                top: offset.top,
                left: offset.left + (outerWidth(resizableElement) / 2) + marginLeft
            };
        }
    });
    PositioningStrategyFactory.current.register(NORTH, NorthPositioningStrategy);

    var NortheastPositioningStrategy = HandlePositioningStrategy.extend({
        calculatePosition: function() {
            var resizableElement = $(this.options.resizableElement);
            var offset = resizableElement.position();
            var marginLeft = parseInt(resizableElement.css("marginLeft"), 10);

            return {
                top: offset.top,
                left: offset.left + outerWidth(resizableElement) + marginLeft
            };
        }
    });
    PositioningStrategyFactory.current.register(NORTHEAST, NortheastPositioningStrategy);

    var NorthwestPositioningStrategy = HandlePositioningStrategy.extend({
        calculatePosition: function() {
            var resizableElement = $(this.options.resizableElement);
            var offset = resizableElement.position();
            var marginLeft = parseInt(resizableElement.css("marginLeft"), 10);

            return {
                top: offset.top,
                left: offset.left + marginLeft
            };
        }
    });
    PositioningStrategyFactory.current.register(NORTHWEST, NorthwestPositioningStrategy);

    var SouthPositioningStrategy = HandlePositioningStrategy.extend({
        calculatePosition: function() {
            var resizableElement = $(this.options.resizableElement);
            var offset = resizableElement.position();
            var marginLeft = parseInt(resizableElement.css("marginLeft"), 10);

            return {
                top: offset.top + outerHeight(resizableElement),
                left: offset.left + (outerWidth(resizableElement) / 2) + marginLeft
            };
        }
    });
    PositioningStrategyFactory.current.register(SOUTH, SouthPositioningStrategy);

    var SoutheastPositioningStrategy = HandlePositioningStrategy.extend({
        calculatePosition: function() {
            var resizableElement = $(this.options.resizableElement);
            var offset = resizableElement.position();
            var marginLeft = parseInt(resizableElement.css("marginLeft"), 10);

            return {
                top: offset.top + outerHeight(resizableElement),
                left: offset.left + outerWidth(resizableElement) + marginLeft
            };
        }
    });
    PositioningStrategyFactory.current.register(SOUTHEAST, SoutheastPositioningStrategy);

    var SouthwestPositioningStrategy = HandlePositioningStrategy.extend({
        calculatePosition: function() {
            var resizableElement = $(this.options.resizableElement);
            var offset = resizableElement.position();
            var marginLeft = parseInt(resizableElement.css("marginLeft"), 10);

            return {
                top: offset.top + outerHeight(resizableElement),
                left: offset.left + marginLeft
            };
        }
    });
    PositioningStrategyFactory.current.register(SOUTHWEST, SouthwestPositioningStrategy);

    var WestPositioningStrategy = HandlePositioningStrategy.extend({
        calculatePosition: function() {
            var resizableElement = $(this.options.resizableElement);
            var offset = resizableElement.position();
            var marginLeft = parseInt(resizableElement.css("marginLeft"), 10);

            return {
                top: offset.top + (outerHeight(resizableElement) / 2),
                left: offset.left + marginLeft
            };
        }
    });
    PositioningStrategyFactory.current.register(WEST, WestPositioningStrategy);

    var DraggingStrategyFactory = StrategyFactory.extend({});
    DraggingStrategyFactory.current = new DraggingStrategyFactory();

    var HandleDraggingStrategy = Class.extend({
        init: function(options) {
            var that = this;
            that.options = extend({}, that.options, options);
        },

        options: {
            deltaX: {
                adjustment: null,
                modifier: null
            },
            deltaY: {
                adjustment: null,
                modifier: null
            }
        },

        adjustDragDelta: function(deltas) {
            var options = this.options;
            var xAxisAdjustment = options.deltaX.adjustment * options.deltaX.modifier;
            var yAxisAdjustment = options.deltaY.adjustment * options.deltaY.modifier;

            return {
                deltaX: deltas.deltaX * xAxisAdjustment,
                deltaY: deltas.deltaY * yAxisAdjustment,
                initialDeltaX: deltas.initialDeltaX * xAxisAdjustment,
                initialDeltaY: deltas.initialDeltaY * yAxisAdjustment
            };
        }
    });

    HandleDraggingStrategy.create = function(options) {
        return DraggingStrategyFactory.current.create(options);
    };

    var HorizontalDraggingStrategy = HandleDraggingStrategy.extend({
        options: {
            deltaX: {
                adjustment: 1,
                modifier: 1
            },
            deltaY: {
                adjustment: 0,
                modifier: 0
            }
        }
    });

    var EastDraggingStrategy = HorizontalDraggingStrategy.extend({
        options: {
            deltaX: {
                modifier: 1
            }
        }
    });
    DraggingStrategyFactory.current.register(EAST, EastDraggingStrategy);

    var WestDraggingStrategy = HorizontalDraggingStrategy.extend({
        options: {
            deltaX: {
                modifier: (-1)
            }
        }
    });
    DraggingStrategyFactory.current.register(WEST, WestDraggingStrategy);

    var VerticalDraggingStrategy = HandleDraggingStrategy.extend({
        options: {
            deltaX: {
                adjustment: 0,
                modifier: 0
            },
            deltaY: {
                adjustment: 1,
                modifier: 1
            }
        }
    });

    var NorthDraggingStrategy = VerticalDraggingStrategy.extend({
        options: {
            deltaY: {
                modifier: (-1)
            }
        }
    });
    DraggingStrategyFactory.current.register(NORTH, NorthDraggingStrategy);

    var SouthDraggingStrategy = VerticalDraggingStrategy.extend({
        options: {
            deltaY: {
                modifier: 1
            }
        }
    });
    DraggingStrategyFactory.current.register(SOUTH, SouthDraggingStrategy);

    var HorizontalAndVerticalDraggingStrategy = HandleDraggingStrategy.extend({
        options: {
            deltaX: {
                adjustment: 1,
                modifier: 1
            },
            deltaY: {
                adjustment: 1,
                modifier: 1
            }
        }
    });

    var NorthEastDraggingStrategy = HorizontalAndVerticalDraggingStrategy.extend({
        options: {
            deltaX: {
                modifier: 1
            },
            deltaY: {
                modifier: (-1)
            }
        }
    });
    DraggingStrategyFactory.current.register(NORTHEAST, NorthEastDraggingStrategy);

    var NorthWestDraggingStrategy = HorizontalAndVerticalDraggingStrategy.extend({
        options: {
            deltaX: {
                modifier: (-1)
            },
            deltaY: {
                modifier: (-1)
            }
        }
    });
    DraggingStrategyFactory.current.register(NORTHWEST, NorthWestDraggingStrategy);

    var SouthEastDraggingStrategy = HorizontalAndVerticalDraggingStrategy.extend({
        options: {
            deltaX: {
                modifier: 1
            },
            deltaY: {
                modifier: 1
            }
        }
    });
    DraggingStrategyFactory.current.register(SOUTHEAST, SouthEastDraggingStrategy);

    var SouthWestDraggingStrategy = HorizontalAndVerticalDraggingStrategy.extend({
        options: {
            deltaX: {
                modifier: (-1)
            },
            deltaY: {
                modifier: 1
            }
        }
    });
    DraggingStrategyFactory.current.register(SOUTHWEST, SouthWestDraggingStrategy);

    extend(Editor, {
        ElementResizeHandle: ElementResizeHandle
    });
})(window.kendo);
