/**
 * Kendo UI v2022.3.1109 (http://www.telerik.com/kendo-ui)
 * Copyright 2022 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
import "../../kendo.core.js";

(function($, undefined) {
    var kendo = window.kendo,
        diagram = kendo.dataviz.diagram = {},
        deepExtend = kendo.deepExtend,
        isArray = Array.isArray,
        EPSILON = 1e-06;

    /*-------------------Diverse utilities----------------------------*/
    var Utils = {
    };

    deepExtend(Utils, {
        isNearZero: function(num) {
            return Math.abs(num) < EPSILON;
        },
        isDefined: function(obj) {
            return typeof obj !== 'undefined';
        },

        isUndefined: function(obj) {
            return (typeof obj === 'undefined') || obj === null;
        },
        /**
         * Returns whether the given object is an object or a value.
         */
        isObject: function(obj) {
            return obj === Object(obj);
        },
        /**
         * Returns whether the object has a property with the given name.
         */
        has: function(obj, key) {
            return Object.hasOwnProperty.call(obj, key);
        },
        /**
         * Returns whether the given object is a string.
         */
        isString: function(obj) {
            return Object.prototype.toString.call(obj) == '[object String]';
        },
        isBoolean: function(obj) {
            return Object.prototype.toString.call(obj) == '[object Boolean]';
        },
        isType: function(obj, type) {
            return Object.prototype.toString.call(obj) == '[object ' + type + ']';
        },
        /**
         * Returns whether the given object is a number.
         */
        isNumber: function(obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        },
        /**
         * Return whether the given object (array or dictionary).
         */
        isEmpty: function(obj) {
            if (obj === null) {
                return true;
            }
            if (isArray(obj) || Utils.isString(obj)) {
                return obj.length === 0;
            }
            for (var key in obj) {
                if (Utils.has(obj, key)) {
                    return false;
                }
            }
            return true;
        },
        simpleExtend: function(destination, source) {
            if (!Utils.isObject(source)) {
                return;
            }

            for (var name in source) {
                destination[name] = source[name];
            }
        },
        /**
         * Returns an array of the specified size and with each entry set to the given value.
         * @param size
         * @param value
         * @returns {Array}
         */
        initArray: function createIdArray(size, value) {
            var array = [];
            for (var i = 0; i < size; ++i) {
                array[i] = value;
            }
            return array;
        },
        serializePoints: function(points) {
            var res = [];
            for (var i = 0; i < points.length; i++) {
                var p = points[i];
                res.push(p.x + ";" + p.y);
            }
            return res.join(";");
        },
        deserializePoints: function(s) {
            var v = s.split(";"), points = [];
            if (v.length % 2 !== 0) {
                throw "Not an array of points.";
            }
            for (var i = 0; i < v.length; i += 2) {
                points.push(new diagram.Point(
                    parseInt(v[i], 10),
                    parseInt(v[i + 1], 10)
                ));
            }
            return points;
        },
        /**
         * Returns an integer within the given bounds.
         * @param lower The inclusive lower bound.
         * @param upper The exclusive upper bound.
         * @returns {number}
         */
        randomInteger: function(lower, upper) {
            return parseInt(Math.floor(Math.random() * upper) + lower, 10);
        } ,
        /*
         Depth-first traversal of the given node.
         */
        DFT: function(el, func) {
            func(el);
            if (el.childNodes) {
                for (var i = 0; i < el.childNodes.length; i++) {
                    var item = el.childNodes[i];
                    this.DFT(item, func);
                }
            }
        },
        /*
         Returns the angle in degrees for the given matrix
         */
        getMatrixAngle: function(m) {
            if (m === null || m.d === 0) {
                return 0;
            }
            return Math.atan2(m.b, m.d) * 180 / Math.PI;
        },

        /*
         Returns the scaling factors for the given matrix.
         */
        getMatrixScaling: function(m) {
            var sX = Math.sqrt(m.a * m.a + m.c * m.c);
            var sY = Math.sqrt(m.b * m.b + m.d * m.d);
            return [sX, sY];
        }

    });

    /**
     * The Range defines an array of equally separated numbers.
     * @param start The start-value of the Range.
     * @param stop The end-value of the Range.
     * @param step The separation between the values (default:1).
     * @returns {Array}
     */
    function Range(start, stop, step) {
        if (typeof start == 'undefined' || typeof stop == 'undefined') {
            return [];
        }
        if (step && Utils.sign(stop - start) != Utils.sign(step)) {
            throw "The sign of the increment should allow to reach the stop-value.";
        }
        step = step || 1;
        start = start || 0;
        stop = stop || start;
        if ((stop - start) / step === Infinity) {
            throw "Infinite range defined.";
        }
        var range = [], i = -1, j;

        function rangeIntegerScale(x) {
            var k = 1;
            while (x * k % 1) {
                k *= 10;
            }
            return k;
        }

        var k = rangeIntegerScale(Math.abs(step));
        start *= k;
        stop *= k;
        step *= k;
        if (start > stop && step > 0) {
            step = -step;
        }
        if (step < 0) {
            while ((j = start + step * ++i) >= stop) {
                range.push(j / k);
            }
        }
        else {
            while ((j = start + step * ++i) <= stop) {
                range.push(j / k);
            }
        }
        return range;
    }

    /*-------------------Diverse math functions----------------------------*/

    function findRadian(start, end) {
        if (start == end) {
            return 0;
        }
        var sngXComp = end.x - start.x,
            sngYComp = start.y - end.y,
            atan = Math.atan(sngXComp / sngYComp);
        if (sngYComp >= 0) {
            return sngXComp < 0 ? atan + (2 * Math.PI) : atan;
        }
        return atan + Math.PI;
    }

    Utils.sign = function(number) {
        return number ? number < 0 ? -1 : 1 : 0;
    };

    Utils.findAngle = function(center, end) {
        return findRadian(center, end) * 180 / Math.PI;
    };

    /*-------------------Array Helpers ----------------------------*/

    Utils.forEach = function(arr, iterator, thisRef) {
        for (var i = 0; i < arr.length; i++) {
            iterator.call(thisRef, arr[i], i, arr);
        }
    };

    Utils.any = function(arr, predicate) {
        for (var i = 0; i < arr.length; ++i) {
            if (predicate(arr[i])) {
                return arr[i];
            }
        }
        return null;
    };

    Utils.remove = function(arr, what) {
        var ax;
        while ((ax = Utils.indexOf(arr, what)) !== -1) {
            arr.splice(ax, 1);
        }
        return arr;
    };

    Utils.contains = function(arr, obj) {
        return Utils.indexOf(arr, obj) !== -1;
    };

    Utils.indexOf = function(arr, what) {
        return $.inArray(what, arr);
    };

    Utils.fold = function(list, iterator, acc, context) {
        var initial = arguments.length > 2;

        for (var i = 0; i < list.length; i++) {
            var value = list[i];
            if (!initial) {
                acc = value;
                initial = true;
            }
            else {
                acc = iterator.call(context, acc, value, i, list);
            }
        }

        if (!initial) {
            throw 'Reduce of empty array with no initial value';
        }

        return acc;
    };

    Utils.find = function(arr, iterator, context) {
        var result;
        Utils.any(arr, function(value, index, list) {
            if (iterator.call(context, value, index, list)) {
                result = value;
                return true;
            }
            return false;
        });
        return result;
    };

    Utils.first = function(arr, constraint, context) {
        if (arr.length === 0) {
            return null;
        }
        if (Utils.isUndefined(constraint)) {
            return arr[0];
        }

        return Utils.find(arr, constraint, context);
    };

    /**
     * Inserts the given element at the specified position and returns the result.
     */
    Utils.insert = function(arr, element, position) {
        arr.splice(position, 0, element);
        return arr;
    };

    Utils.all = function(arr, iterator, context) {
        var result = true;
        var value;

        for (var i = 0; i < arr.length; i++) {
            value = arr[i];
            result = result && iterator.call(context, value, i, arr);

            if (!result) {
                break;
            }
        }

        return result;
    };

    Utils.clear = function(arr) {
        arr.splice(0, arr.length);
    };

    /**
     * Sort the arrays on the basis of the first one (considered as keys and the other array as values).
     * @param a
     * @param b
     * @param sortfunc (optiona) sorting function for the values in the first array
     */
    Utils.bisort = function(a, b, sortfunc) {
        if (Utils.isUndefined(a)) {
            throw "First array is not specified.";
        }
        if (Utils.isUndefined(b)) {
            throw "Second array is not specified.";
        }
        if (a.length != b.length) {
            throw "The two arrays should have equal length";
        }

        var all = [], i;

        for (i = 0; i < a.length; i++) {
            all.push({ 'x': a[i], 'y': b[i] });
        }
        if (Utils.isUndefined(sortfunc)) {
            all.sort(function(m, n) {
                return m.x - n.x;
            });
        }
        else {
            all.sort(function(m, n) {
                return sortfunc(m.x, n.x);
            });
        }

        Utils.clear(a);
        Utils.clear(b);

        for (i = 0; i < all.length; i++) {
            a.push(all[i].x);
            b.push(all[i].y);
        }
    };

    Utils.addRange = function(arr, range) {
        arr.push.apply(arr, range);
    };

    var Easing = {
        easeInOut: function(pos) {
            return ((-Math.cos(pos * Math.PI) / 2) + 0.5);
        }
    };

    /**
     * An animation ticker driving an adapter which sets a particular
     * property in function of the tick.
     * @type {*}
     */
    var Ticker = kendo.Class.extend({
        init: function() {
            this.adapters = [];
            this.target = 0;
            this.tick = 0;
            this.interval = 20;
            this.duration = 800;
            this.lastTime = null;
            this.handlers = [];
            var _this = this;
            this.transition = Easing.easeInOut;
            this.timerDelegate = function() {
                _this.onTimerEvent();
            };
        },
        addAdapter: function(a) {
            this.adapters.push(a);
        },
        onComplete: function(handler) {
            this.handlers.push(handler);
        },
        removeHandler: function(handler) {
            this.handlers = $.grep(this.handlers, function(h) {
                return h !== handler;
            });
        },
        trigger: function() {
            var _this = this;
            if (this.handlers) {
                Utils.forEach(this.handlers, function(h) {
                    return h.call(_this.caller !== null ? _this.caller : _this);
                });
            }
        },
        onStep: function() {
        },
        seekTo: function(to) {
            this.seekFromTo(this.tick, to);
        },
        seekFromTo: function(from, to) {
            this.target = Math.max(0, Math.min(1, to));
            this.tick = Math.max(0, Math.min(1, from));
            this.lastTime = new Date().getTime();
            if (!this.intervalId) {
                this.intervalId = window.setInterval(this.timerDelegate, this.interval);
            }
        },
        stop: function() {
            if (this.intervalId) {
                window.clearInterval(this.intervalId);
                this.intervalId = null;

                //this.trigger.call(this);
                this.trigger();
                // this.next();
            }
        },
        play: function(origin) {
            if (this.adapters.length === 0) {
                return;
            }
            if (origin !== null) {
                this.caller = origin;
            }
            this.initState();
            this.seekFromTo(0, 1);
        },
        reverse: function() {
            this.seekFromTo(1, 0);
        },
        initState: function() {
            if (this.adapters.length === 0) {
                return;
            }
            for (var i = 0; i < this.adapters.length; i++) {
                this.adapters[i].initState();
            }
        },
        propagate: function() {
            var value = this.transition(this.tick);

            for (var i = 0; i < this.adapters.length; i++) {
                this.adapters[i].update(value);
            }
        },
        onTimerEvent: function() {
            var now = new Date().getTime();
            var timePassed = now - this.lastTime;
            this.lastTime = now;
            var movement = (timePassed / this.duration) * (this.tick < this.target ? 1 : -1);
            if (Math.abs(movement) >= Math.abs(this.tick - this.target)) {
                this.tick = this.target;
            } else {
                this.tick += movement;
            }

            try {
                this.propagate();
            } finally {
                this.onStep.call(this);
                if (this.target == this.tick) {
                    this.stop();
                }
            }
        }
    });

    kendo.deepExtend(diagram, {
        init: function(element) {
            kendo.init(element, diagram.ui);
        },

        Utils: Utils,
        Range: Range,
        Ticker: Ticker
    });
})(window.kendo.jQuery);
