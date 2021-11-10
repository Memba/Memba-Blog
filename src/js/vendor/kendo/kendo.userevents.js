/** 
 * Kendo UI v2021.3.1109 (http://www.telerik.com/kendo-ui)                                                                                                                                              
 * Copyright 2021 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/
(function (f, define) {
    define('kendo.userevents', ['kendo.core'], f);
}(function () {
    var __meta__ = {
        id: 'userevents',
        name: 'User Events',
        category: 'framework',
        depends: ['core'],
        hidden: true
    };
    (function ($, undefined) {
        var kendo = window.kendo, support = kendo.support, Class = kendo.Class, Observable = kendo.Observable, now = Date.now, extend = $.extend, OS = support.mobileOS, invalidZeroEvents = OS && OS.android, DEFAULT_MIN_HOLD = 800, CLICK_DELAY = 300, DEFAULT_THRESHOLD = support.browser.msie ? 5 : 0, PRESS = 'press', HOLD = 'hold', SELECT = 'select', START = 'start', MOVE = 'move', END = 'end', CANCEL = 'cancel', TAP = 'tap', DOUBLETAP = 'doubleTap', RELEASE = 'release', GESTURESTART = 'gesturestart', GESTURECHANGE = 'gesturechange', GESTUREEND = 'gestureend', GESTURETAP = 'gesturetap';
        var THRESHOLD = {
            'api': 0,
            'touch': 0,
            'mouse': 9,
            'pointer': 9
        };
        var ENABLE_GLOBAL_SURFACE = !support.touch || support.mouseAndTouchPresent;
        function touchDelta(touch1, touch2) {
            var x1 = touch1.x.location, y1 = touch1.y.location, x2 = touch2.x.location, y2 = touch2.y.location, dx = x1 - x2, dy = y1 - y2;
            return {
                center: {
                    x: (x1 + x2) / 2,
                    y: (y1 + y2) / 2
                },
                distance: Math.sqrt(dx * dx + dy * dy)
            };
        }
        function getTouches(e) {
            var touches = [], originalEvent = e.originalEvent, currentTarget = e.currentTarget, idx = 0, length, changedTouches, touch;
            if (e.api) {
                touches.push({
                    id: 2,
                    event: e,
                    target: e.target,
                    currentTarget: e.target,
                    location: e,
                    type: 'api'
                });
            } else if (e.type.match(/touch/)) {
                changedTouches = originalEvent ? originalEvent.changedTouches : [];
                for (length = changedTouches.length; idx < length; idx++) {
                    touch = changedTouches[idx];
                    touches.push({
                        location: touch,
                        event: e,
                        target: touch.target,
                        currentTarget: currentTarget,
                        id: touch.identifier,
                        type: 'touch'
                    });
                }
            } else if (support.pointers || support.msPointers) {
                touches.push({
                    location: originalEvent,
                    event: e,
                    target: e.target,
                    currentTarget: currentTarget,
                    id: originalEvent.pointerId,
                    type: 'pointer'
                });
            } else {
                touches.push({
                    id: 1,
                    event: e,
                    target: e.target,
                    currentTarget: currentTarget,
                    location: e,
                    type: 'mouse'
                });
            }
            return touches;
        }
        var TouchAxis = Class.extend({
            init: function (axis, location) {
                var that = this;
                that.axis = axis;
                that._updateLocationData(location);
                that.startLocation = that.location;
                that.velocity = that.delta = 0;
                that.timeStamp = now();
            },
            move: function (location) {
                var that = this, offset = location['page' + that.axis], timeStamp = now(), timeDelta = timeStamp - that.timeStamp || 1;
                if (!offset && invalidZeroEvents) {
                    return;
                }
                that.delta = offset - that.location;
                that._updateLocationData(location);
                that.initialDelta = offset - that.startLocation;
                that.velocity = that.delta / timeDelta;
                that.timeStamp = timeStamp;
            },
            _updateLocationData: function (location) {
                var that = this, axis = that.axis;
                that.location = location['page' + axis];
                that.client = location['client' + axis];
                that.screen = location['screen' + axis];
            }
        });
        var Touch = Class.extend({
            init: function (userEvents, target, touchInfo) {
                extend(this, {
                    x: new TouchAxis('X', touchInfo.location),
                    y: new TouchAxis('Y', touchInfo.location),
                    type: touchInfo.type,
                    useClickAsTap: userEvents.useClickAsTap,
                    threshold: userEvents.threshold || THRESHOLD[touchInfo.type],
                    userEvents: userEvents,
                    target: target,
                    currentTarget: touchInfo.currentTarget,
                    initialTouch: touchInfo.target,
                    id: touchInfo.id,
                    pressEvent: touchInfo,
                    _clicks: userEvents._clicks,
                    supportDoubleTap: userEvents.supportDoubleTap,
                    _moved: false,
                    _finished: false
                });
            },
            press: function () {
                this._holdTimeout = setTimeout($.proxy(this, '_hold'), this.userEvents.minHold);
                this._trigger(PRESS, this.pressEvent);
            },
            _tap: function (touchInfo) {
                var that = this;
                that.userEvents._clicks++;
                if (that.userEvents._clicks == 1) {
                    that._clickTimeout = setTimeout(function () {
                        if (that.userEvents._clicks == 1) {
                            that._trigger(TAP, touchInfo);
                        } else {
                            that._trigger(DOUBLETAP, touchInfo);
                        }
                        that.userEvents._clicks = 0;
                    }, CLICK_DELAY);
                }
            },
            _hold: function () {
                this._trigger(HOLD, this.pressEvent);
            },
            move: function (touchInfo) {
                var that = this;
                var preventMove = touchInfo.type !== 'api' && that.userEvents._shouldNotMove;
                if (that._finished || preventMove) {
                    return;
                }
                that.x.move(touchInfo.location);
                that.y.move(touchInfo.location);
                if (!that._moved) {
                    if (that._withinIgnoreThreshold()) {
                        return;
                    }
                    if (!UserEvents.current || UserEvents.current === that.userEvents) {
                        that._start(touchInfo);
                    } else {
                        return that.dispose();
                    }
                }
                if (!that._finished) {
                    that._trigger(MOVE, touchInfo);
                }
            },
            end: function (touchInfo) {
                this.endTime = now();
                if (this._finished) {
                    return;
                }
                this._finished = true;
                this._trigger(RELEASE, touchInfo);
                if (this._moved) {
                    this._trigger(END, touchInfo);
                } else {
                    if (!this.useClickAsTap) {
                        if (this.supportDoubleTap) {
                            this._tap(touchInfo);
                        } else {
                            this._trigger(TAP, touchInfo);
                        }
                    }
                }
                clearTimeout(this._holdTimeout);
                this.dispose();
            },
            dispose: function () {
                var userEvents = this.userEvents, activeTouches = userEvents.touches;
                this._finished = true;
                this.pressEvent = null;
                clearTimeout(this._holdTimeout);
                activeTouches.splice($.inArray(this, activeTouches), 1);
            },
            skip: function () {
                this.dispose();
            },
            cancel: function () {
                this.dispose();
            },
            isMoved: function () {
                return this._moved;
            },
            _start: function (touchInfo) {
                clearTimeout(this._holdTimeout);
                this.startTime = now();
                this._moved = true;
                this._trigger(START, touchInfo);
            },
            _trigger: function (name, touchInfo) {
                var that = this, jQueryEvent = touchInfo.event, data = {
                        touch: that,
                        x: that.x,
                        y: that.y,
                        target: that.target,
                        event: jQueryEvent
                    };
                if (that.userEvents.notify(name, data)) {
                    jQueryEvent.preventDefault();
                }
            },
            _withinIgnoreThreshold: function () {
                var xDelta = this.x.initialDelta, yDelta = this.y.initialDelta;
                return Math.sqrt(xDelta * xDelta + yDelta * yDelta) <= this.threshold;
            }
        });
        function withEachUpEvent(callback) {
            var downEvents = kendo.eventMap.up.split(' '), idx = 0, length = downEvents.length;
            for (; idx < length; idx++) {
                callback(downEvents[idx]);
            }
        }
        var UserEvents = Observable.extend({
            init: function (element, options) {
                var that = this, filter, ns = kendo.guid();
                options = options || {};
                filter = that.filter = options.filter;
                that.threshold = options.threshold || DEFAULT_THRESHOLD;
                that.minHold = options.minHold || DEFAULT_MIN_HOLD;
                that.touches = [];
                that._maxTouches = options.multiTouch ? 2 : 1;
                that.allowSelection = options.allowSelection;
                that.captureUpIfMoved = options.captureUpIfMoved;
                that.useClickAsTap = !options.fastTap && !support.delayedClick();
                that.eventNS = ns;
                that._clicks = 0;
                that.supportDoubleTap = options.supportDoubleTap;
                element = $(element).handler(that);
                Observable.fn.init.call(that);
                extend(that, {
                    element: element,
                    surface: options.global && ENABLE_GLOBAL_SURFACE ? $(element[0].ownerDocument.documentElement) : $(options.surface || element),
                    stopPropagation: options.stopPropagation,
                    pressed: false
                });
                that.surface.handler(that).on(kendo.applyEventMap('move', ns), '_move').on(kendo.applyEventMap('up cancel', ns), '_end');
                element.on(kendo.applyEventMap('down', ns), filter, '_start');
                if (that.useClickAsTap) {
                    element.on(kendo.applyEventMap('click', ns), filter, '_click');
                }
                if (support.pointers || support.msPointers) {
                    if (support.browser.version < 11) {
                        var defaultAction = 'pinch-zoom double-tap-zoom';
                        element.css('-ms-touch-action', options.touchAction && options.touchAction != 'none' ? defaultAction + ' ' + options.touchAction : defaultAction);
                    } else {
                        element.css('touch-action', options.touchAction || 'none');
                    }
                }
                if (options.preventDragEvent) {
                    element.on(kendo.applyEventMap('dragstart', ns), kendo.preventDefault);
                }
                element.on(kendo.applyEventMap('mousedown', ns), filter, { root: element }, '_select');
                if (that.captureUpIfMoved && support.eventCapture) {
                    var surfaceElement = that.surface[0], preventIfMovingProxy = $.proxy(that.preventIfMoving, that);
                    withEachUpEvent(function (eventName) {
                        surfaceElement.addEventListener(eventName, preventIfMovingProxy, true);
                    });
                }
                that.bind([
                    PRESS,
                    HOLD,
                    TAP,
                    DOUBLETAP,
                    START,
                    MOVE,
                    END,
                    RELEASE,
                    CANCEL,
                    GESTURESTART,
                    GESTURECHANGE,
                    GESTUREEND,
                    GESTURETAP,
                    SELECT
                ], options);
            },
            preventIfMoving: function (e) {
                if (this._isMoved()) {
                    e.preventDefault();
                }
            },
            destroy: function () {
                var that = this;
                if (that._destroyed) {
                    return;
                }
                that._destroyed = true;
                if (that.captureUpIfMoved && support.eventCapture) {
                    var surfaceElement = that.surface[0];
                    withEachUpEvent(function (eventName) {
                        surfaceElement.removeEventListener(eventName, that.preventIfMoving);
                    });
                }
                that.element.kendoDestroy(that.eventNS);
                that.surface.kendoDestroy(that.eventNS);
                that.element.removeData('handler');
                that.surface.removeData('handler');
                that._disposeAll();
                that.unbind();
                delete that.surface;
                delete that.element;
                delete that.currentTarget;
            },
            capture: function () {
                UserEvents.current = this;
            },
            cancel: function () {
                this._disposeAll();
                this.trigger(CANCEL);
            },
            notify: function (eventName, data) {
                var that = this, touches = that.touches;
                if (this._isMultiTouch()) {
                    switch (eventName) {
                    case MOVE:
                        eventName = GESTURECHANGE;
                        break;
                    case END:
                        eventName = GESTUREEND;
                        break;
                    case TAP:
                        eventName = GESTURETAP;
                        break;
                    }
                    extend(data, { touches: touches }, touchDelta(touches[0], touches[1]));
                }
                return this.trigger(eventName, extend(data, { type: eventName }));
            },
            press: function (x, y, target) {
                this._apiCall('_start', x, y, target);
            },
            move: function (x, y) {
                this._apiCall('_move', x, y);
            },
            end: function (x, y) {
                this._apiCall('_end', x, y);
            },
            _isMultiTouch: function () {
                return this.touches.length > 1;
            },
            _maxTouchesReached: function () {
                return this.touches.length >= this._maxTouches;
            },
            _disposeAll: function () {
                var touches = this.touches;
                while (touches.length > 0) {
                    touches.pop().dispose();
                }
            },
            _isMoved: function () {
                return $.grep(this.touches, function (touch) {
                    return touch.isMoved();
                }).length;
            },
            _select: function (e) {
                if (!this.allowSelection || this.trigger(SELECT, { event: e })) {
                    e.preventDefault();
                }
            },
            _start: function (e) {
                var that = this, idx = 0, filter = that.filter, target, touches = getTouches(e), length = touches.length, touch, which = e.which;
                if (which && which > 1 || that._maxTouchesReached()) {
                    return;
                }
                UserEvents.current = null;
                that.currentTarget = e.currentTarget;
                if (that.stopPropagation) {
                    e.stopPropagation();
                }
                for (; idx < length; idx++) {
                    if (that._maxTouchesReached()) {
                        break;
                    }
                    touch = touches[idx];
                    if (filter) {
                        target = $(touch.currentTarget);
                    } else {
                        target = that.element;
                    }
                    if (!target.length) {
                        continue;
                    }
                    touch = new Touch(that, target, touch);
                    that.touches.push(touch);
                    touch.press();
                    if (that._isMultiTouch()) {
                        that.notify('gesturestart', {});
                    }
                }
            },
            _move: function (e) {
                this._eachTouch('move', e);
            },
            _end: function (e) {
                this._eachTouch('end', e);
            },
            _click: function (e) {
                var data = {
                    touch: {
                        initialTouch: e.target,
                        target: $(e.currentTarget),
                        endTime: now(),
                        x: {
                            location: e.pageX,
                            client: e.clientX
                        },
                        y: {
                            location: e.pageY,
                            client: e.clientY
                        }
                    },
                    x: e.pageX,
                    y: e.pageY,
                    target: $(e.currentTarget),
                    event: e,
                    type: 'tap'
                };
                if (this.trigger('tap', data)) {
                    e.preventDefault();
                }
            },
            _eachTouch: function (methodName, e) {
                var that = this, dict = {}, touches = getTouches(e), activeTouches = that.touches, idx, touch, touchInfo, matchingTouch;
                for (idx = 0; idx < activeTouches.length; idx++) {
                    touch = activeTouches[idx];
                    dict[touch.id] = touch;
                }
                for (idx = 0; idx < touches.length; idx++) {
                    touchInfo = touches[idx];
                    matchingTouch = dict[touchInfo.id];
                    if (matchingTouch) {
                        matchingTouch[methodName](touchInfo);
                    }
                }
            },
            _apiCall: function (type, x, y, target) {
                this[type]({
                    api: true,
                    pageX: x,
                    pageY: y,
                    clientX: x,
                    clientY: y,
                    target: $(target || this.element)[0],
                    stopPropagation: $.noop,
                    preventDefault: $.noop
                });
            }
        });
        UserEvents.defaultThreshold = function (value) {
            DEFAULT_THRESHOLD = value;
        };
        UserEvents.minHold = function (value) {
            DEFAULT_MIN_HOLD = value;
        };
        kendo.getTouches = getTouches;
        kendo.touchDelta = touchDelta;
        kendo.UserEvents = UserEvents;
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));