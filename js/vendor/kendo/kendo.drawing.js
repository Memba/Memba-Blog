/** 
 * Kendo UI v2017.2.504 (http://www.telerik.com/kendo-ui)                                                                                                                                               
 * Copyright 2017 Telerik AD. All rights reserved.                                                                                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/
(function (f, define) {
    define('drawing/util', ['kendo.core'], f);
}(function () {
    (function ($) {
        function createPromise() {
            return $.Deferred();
        }
        function promiseAll(promises) {
            return $.when.apply($, promises);
        }
        kendo.drawing.util = kendo.drawing.util || {};
        kendo.deepExtend(kendo.drawing.util, {
            createPromise: createPromise,
            promiseAll: promiseAll
        });
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('util/text-metrics', ['kendo.core'], f);
}(function () {
    (function ($) {
        window.kendo.util = window.kendo.util || {};
        var LRUCache = kendo.Class.extend({
            init: function (size) {
                this._size = size;
                this._length = 0;
                this._map = {};
            },
            put: function (key, value) {
                var map = this._map;
                var entry = {
                    key: key,
                    value: value
                };
                map[key] = entry;
                if (!this._head) {
                    this._head = this._tail = entry;
                } else {
                    this._tail.newer = entry;
                    entry.older = this._tail;
                    this._tail = entry;
                }
                if (this._length >= this._size) {
                    map[this._head.key] = null;
                    this._head = this._head.newer;
                    this._head.older = null;
                } else {
                    this._length++;
                }
            },
            get: function (key) {
                var entry = this._map[key];
                if (entry) {
                    if (entry === this._head && entry !== this._tail) {
                        this._head = entry.newer;
                        this._head.older = null;
                    }
                    if (entry !== this._tail) {
                        if (entry.older) {
                            entry.older.newer = entry.newer;
                            entry.newer.older = entry.older;
                        }
                        entry.older = this._tail;
                        entry.newer = null;
                        this._tail.newer = entry;
                        this._tail = entry;
                    }
                    return entry.value;
                }
            }
        });
        function objectKey(object) {
            var parts = [];
            for (var key in object) {
                parts.push(key + object[key]);
            }
            return parts.sort().join('');
        }
        function hashKey(str) {
            var hash = 2166136261;
            for (var i = 0; i < str.length; ++i) {
                hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
                hash ^= str.charCodeAt(i);
            }
            return hash >>> 0;
        }
        function zeroSize() {
            return {
                width: 0,
                height: 0,
                baseline: 0
            };
        }
        var DEFAULT_OPTIONS = { baselineMarkerSize: 1 };
        var defaultMeasureBox;
        if (typeof document !== 'undefined') {
            defaultMeasureBox = document.createElement('div');
            defaultMeasureBox.style.cssText = 'position: absolute !important; top: -4000px !important; width: auto !important; height: auto !important;' + 'padding: 0 !important; margin: 0 !important; border: 0 !important;' + 'line-height: normal !important; visibility: hidden !important; white-space: nowrap!important;';
        }
        var TextMetrics = kendo.Class.extend({
            init: function (options) {
                this._cache = new LRUCache(1000);
                this.options = $.extend({}, DEFAULT_OPTIONS, options);
            },
            measure: function (text, style, box) {
                if (!text) {
                    return zeroSize();
                }
                var styleKey = objectKey(style);
                var cacheKey = hashKey(text + styleKey);
                var cachedResult = this._cache.get(cacheKey);
                if (cachedResult) {
                    return cachedResult;
                }
                var size = zeroSize();
                var measureBox = box || defaultMeasureBox;
                var baselineMarker = this._baselineMarker().cloneNode(false);
                for (var key in style) {
                    var value = style[key];
                    if (typeof value !== 'undefined') {
                        measureBox.style[key] = value;
                    }
                }
                measureBox.textContent = text;
                measureBox.appendChild(baselineMarker);
                document.body.appendChild(measureBox);
                if (String(text).length) {
                    size.width = measureBox.offsetWidth - this.options.baselineMarkerSize;
                    size.height = measureBox.offsetHeight;
                    size.baseline = baselineMarker.offsetTop + this.options.baselineMarkerSize;
                }
                if (size.width > 0 && size.height > 0) {
                    this._cache.put(cacheKey, size);
                }
                measureBox.parentNode.removeChild(measureBox);
                return size;
            },
            _baselineMarker: function () {
                var marker = document.createElement('div');
                marker.style.cssText = 'display: inline-block; vertical-align: baseline;width: ' + this.options.baselineMarkerSize + 'px; height: ' + this.options.baselineMarkerSize + 'px;overflow: hidden;';
                return marker;
            }
        });
        TextMetrics.current = new TextMetrics();
        function measureText(text, style, measureBox) {
            return TextMetrics.current.measure(text, style, measureBox);
        }
        kendo.deepExtend(kendo.util, {
            LRUCache: LRUCache,
            TextMetrics: TextMetrics,
            measureText: measureText,
            objectKey: objectKey,
            hashKey: hashKey
        });
    }(window.kendo.jQuery));
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('drawing/kendo-drawing', [
        'drawing/util',
        'kendo.color',
        'util/text-metrics'
    ], f);
}(function () {
    (function ($) {
        window.kendo = window.kendo || {};
        var kendoDrawing = kendo.drawing;
        var kendoDrawingUtil = kendoDrawing.util;
        var Class = kendo.Class;
        var kendoUtil = kendo.util;
        var support = kendo.support;
        var createPromise = kendoDrawingUtil.createPromise;
        var promiseAll = kendoDrawingUtil.promiseAll;
        var ObserversMixin = {
            extend: function (proto) {
                var this$1 = this;
                for (var method in this) {
                    if (method !== 'extend') {
                        proto[method] = this$1[method];
                    }
                }
            },
            observers: function () {
                this._observers = this._observers || [];
                return this._observers;
            },
            addObserver: function (element) {
                if (!this._observers) {
                    this._observers = [element];
                } else {
                    this._observers.push(element);
                }
                return this;
            },
            removeObserver: function (element) {
                var observers = this.observers();
                var index = observers.indexOf(element);
                if (index !== -1) {
                    observers.splice(index, 1);
                }
                return this;
            },
            trigger: function (methodName, event) {
                var observers = this._observers;
                if (observers && !this._suspended) {
                    for (var idx = 0; idx < observers.length; idx++) {
                        var observer = observers[idx];
                        if (observer[methodName]) {
                            observer[methodName](event);
                        }
                    }
                }
                return this;
            },
            optionsChange: function (e) {
                if (e === void 0) {
                    e = {};
                }
                e.element = this;
                this.trigger('optionsChange', e);
            },
            geometryChange: function () {
                this.trigger('geometryChange', { element: this });
            },
            suspend: function () {
                this._suspended = (this._suspended || 0) + 1;
                return this;
            },
            resume: function () {
                this._suspended = Math.max((this._suspended || 0) - 1, 0);
                return this;
            },
            _observerField: function (field, value) {
                if (this[field]) {
                    this[field].removeObserver(this);
                }
                this[field] = value;
                value.addObserver(this);
            }
        };
        function append(first, second) {
            first.push.apply(first, second);
            return first;
        }
        var literals = {
            1: 'i',
            10: 'x',
            100: 'c',
            2: 'ii',
            20: 'xx',
            200: 'cc',
            3: 'iii',
            30: 'xxx',
            300: 'ccc',
            4: 'iv',
            40: 'xl',
            400: 'cd',
            5: 'v',
            50: 'l',
            500: 'd',
            6: 'vi',
            60: 'lx',
            600: 'dc',
            7: 'vii',
            70: 'lxx',
            700: 'dcc',
            8: 'viii',
            80: 'lxxx',
            800: 'dccc',
            9: 'ix',
            90: 'xc',
            900: 'cm',
            1000: 'm'
        };
        function arabicToRoman(n) {
            var values = [
                1000,
                900,
                800,
                700,
                600,
                500,
                400,
                300,
                200,
                100,
                90,
                80,
                70,
                60,
                50,
                40,
                30,
                20,
                10,
                9,
                8,
                7,
                6,
                5,
                4,
                3,
                2,
                1
            ];
            var roman = '';
            while (n > 0) {
                if (n < values[0]) {
                    values.shift();
                } else {
                    roman += literals[values[0]];
                    n -= values[0];
                }
            }
            return roman;
        }
        var UNDEFINED = 'undefined';
        function defined(value) {
            return typeof value !== UNDEFINED;
        }
        var defId = 1;
        function definitionId() {
            return 'kdef' + defId++;
        }
        var DEG_TO_RAD = Math.PI / 180;
        var MAX_NUM = Number.MAX_VALUE;
        var MIN_NUM = -Number.MAX_VALUE;
        function deg(radians) {
            return radians / DEG_TO_RAD;
        }
        var KEY_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var fromCharCode = String.fromCharCode;
        function encodeUTF8(input) {
            var output = '';
            for (var i = 0; i < input.length; i++) {
                var c = input.charCodeAt(i);
                if (c < 128) {
                    output += fromCharCode(c);
                } else if (c < 2048) {
                    output += fromCharCode(192 | c >>> 6);
                    output += fromCharCode(128 | c & 63);
                } else if (c < 65536) {
                    output += fromCharCode(224 | c >>> 12);
                    output += fromCharCode(128 | c >>> 6 & 63);
                    output += fromCharCode(128 | c & 63);
                }
            }
            return output;
        }
        function encodeBase64(input) {
            var output = '';
            var i = 0;
            var utfInput = encodeUTF8(input);
            while (i < utfInput.length) {
                var chr1 = utfInput.charCodeAt(i++);
                var chr2 = utfInput.charCodeAt(i++);
                var chr3 = utfInput.charCodeAt(i++);
                var enc1 = chr1 >> 2;
                var enc2 = (chr1 & 3) << 4 | chr2 >> 4;
                var enc3 = (chr2 & 15) << 2 | chr3 >> 6;
                var enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output + KEY_STR.charAt(enc1) + KEY_STR.charAt(enc2) + KEY_STR.charAt(enc3) + KEY_STR.charAt(enc4);
            }
            return output;
        }
        function eventCoordinates(e) {
            if (defined((e.x || {}).location)) {
                return {
                    x: e.x.location,
                    y: e.y.location
                };
            }
            return {
                x: e.pageX || e.clientX || 0,
                y: e.pageY || e.clientY || 0
            };
        }
        function eventElement(e) {
            if (e === void 0) {
                e = {};
            }
            return e.touch ? e.touch.initialTouch : e.target;
        }
        function isTransparent(color) {
            return color === '' || color === null || color === 'none' || color === 'transparent' || !defined(color);
        }
        function last(array) {
            if (array) {
                return array[array.length - 1];
            }
        }
        function limitValue(value, min, max) {
            return Math.max(Math.min(value, max), min);
        }
        function mergeSort(a, cmp) {
            if (a.length < 2) {
                return a.slice();
            }
            function merge(a, b) {
                var r = [], ai = 0, bi = 0, i = 0;
                while (ai < a.length && bi < b.length) {
                    if (cmp(a[ai], b[bi]) <= 0) {
                        r[i++] = a[ai++];
                    } else {
                        r[i++] = b[bi++];
                    }
                }
                if (ai < a.length) {
                    r.push.apply(r, a.slice(ai));
                }
                if (bi < b.length) {
                    r.push.apply(r, b.slice(bi));
                }
                return r;
            }
            return function sort(a) {
                if (a.length <= 1) {
                    return a;
                }
                var m = Math.floor(a.length / 2);
                var left = a.slice(0, m);
                var right = a.slice(m);
                left = sort(left);
                right = sort(right);
                return merge(left, right);
            }(a);
        }
        function rad(degrees) {
            return degrees * DEG_TO_RAD;
        }
        function pow(p) {
            if (p) {
                return Math.pow(10, p);
            }
            return 1;
        }
        function round(value, precision) {
            var power = pow(precision);
            return Math.round(value * power) / power;
        }
        function valueOrDefault(value, defaultValue) {
            return defined(value) ? value : defaultValue;
        }
        function bindEvents(element, events) {
            for (var eventName in events) {
                var eventNames = eventName.trim().split(' ');
                for (var idx = 0; idx < eventNames.length; idx++) {
                    element.addEventListener(eventNames[idx], events[eventName], false);
                }
            }
        }
        function elementOffset(element) {
            var box = element.getBoundingClientRect();
            var documentElement = document.documentElement;
            return {
                top: box.top + (window.pageYOffset || documentElement.scrollTop) - (documentElement.clientTop || 0),
                left: box.left + (window.pageXOffset || documentElement.scrollLeft) - (documentElement.clientLeft || 0)
            };
        }
        function elementStyles(element, styles) {
            var result = {};
            var style = window.getComputedStyle(element);
            var stylesArray = Array.isArray(styles) ? styles : [styles];
            for (var idx = 0; idx < stylesArray.length; idx++) {
                var field = stylesArray[idx];
                result[field] = style[field];
            }
            return result;
        }
        function getPixels(value) {
            if (isNaN(value)) {
                return value;
            }
            return value + 'px';
        }
        function elementSize(element, size) {
            if (size) {
                var width = size.width;
                var height = size.height;
                if (defined(width)) {
                    element.style.width = getPixels(width);
                }
                if (defined(height)) {
                    element.style.height = getPixels(height);
                }
            } else {
                var size$1 = elementStyles(element, [
                    'width',
                    'height'
                ]);
                return {
                    width: parseInt(size$1.width, 10),
                    height: parseInt(size$1.height, 10)
                };
            }
        }
        function unbindEvents(element, events) {
            if (events === void 0) {
                events = {};
            }
            for (var name in events) {
                var eventNames = name.trim().split(' ');
                for (var idx = 0; idx < eventNames.length; idx++) {
                    element.removeEventListener(eventNames[idx], events[name], false);
                }
            }
        }
        var util = {
            append: append,
            arabicToRoman: arabicToRoman,
            createPromise: createPromise,
            defined: defined,
            definitionId: definitionId,
            deg: deg,
            encodeBase64: encodeBase64,
            eventCoordinates: eventCoordinates,
            eventElement: eventElement,
            isTransparent: isTransparent,
            last: last,
            limitValue: limitValue,
            mergeSort: mergeSort,
            promiseAll: promiseAll,
            rad: rad,
            round: round,
            valueOrDefault: valueOrDefault,
            bindEvents: bindEvents,
            elementOffset: elementOffset,
            elementSize: elementSize,
            elementStyles: elementStyles,
            unbindEvents: unbindEvents,
            DEG_TO_RAD: DEG_TO_RAD,
            MAX_NUM: MAX_NUM,
            MIN_NUM: MIN_NUM
        };
        var toString = {}.toString;
        var OptionsStore = Class.extend({
            init: function (options, prefix) {
                var this$1 = this;
                if (prefix === void 0) {
                    prefix = '';
                }
                this.prefix = prefix;
                for (var field in options) {
                    var member = options[field];
                    member = this$1._wrap(member, field);
                    this$1[field] = member;
                }
            },
            get: function (field) {
                var parts = field.split('.');
                var result = this;
                while (parts.length && result) {
                    var part = parts.shift();
                    result = result[part];
                }
                return result;
            },
            set: function (field, value) {
                var current = this.get(field);
                if (current !== value) {
                    this._set(field, this._wrap(value, field));
                    this.optionsChange({
                        field: this.prefix + field,
                        value: value
                    });
                }
            },
            _set: function (field, value) {
                var this$1 = this;
                var composite = field.indexOf('.') >= 0;
                var parentObj = this;
                var fieldName = field;
                if (composite) {
                    var parts = fieldName.split('.');
                    var prefix = this.prefix;
                    while (parts.length > 1) {
                        fieldName = parts.shift();
                        prefix += fieldName + '.';
                        var obj = parentObj[fieldName];
                        if (!obj) {
                            obj = new OptionsStore({}, prefix);
                            obj.addObserver(this$1);
                            parentObj[fieldName] = obj;
                        }
                        parentObj = obj;
                    }
                    fieldName = parts[0];
                }
                parentObj._clear(fieldName);
                parentObj[fieldName] = value;
            },
            _clear: function (field) {
                var current = this[field];
                if (current && current.removeObserver) {
                    current.removeObserver(this);
                }
            },
            _wrap: function (object, field) {
                var type = toString.call(object);
                var wrapped = object;
                if (wrapped !== null && defined(wrapped) && type === '[object Object]') {
                    if (!(object instanceof OptionsStore) && !(object instanceof Class)) {
                        wrapped = new OptionsStore(wrapped, this.prefix + field + '.');
                    }
                    wrapped.addObserver(this);
                }
                return wrapped;
            }
        });
        ObserversMixin.extend(OptionsStore.prototype);
        function setAccessor(field) {
            return function (value) {
                if (this[field] !== value) {
                    this[field] = value;
                    this.geometryChange();
                }
                return this;
            };
        }
        function getAccessor(field) {
            return function () {
                return this[field];
            };
        }
        function defineAccessors(fn, fields) {
            for (var i = 0; i < fields.length; i++) {
                var name = fields[i];
                var capitalized = name.charAt(0).toUpperCase() + name.substring(1, name.length);
                fn['set' + capitalized] = setAccessor(name);
                fn['get' + capitalized] = getAccessor(name);
            }
        }
        var Matrix = Class.extend({
            init: function (a, b, c, d, e, f) {
                if (a === void 0) {
                    a = 0;
                }
                if (b === void 0) {
                    b = 0;
                }
                if (c === void 0) {
                    c = 0;
                }
                if (d === void 0) {
                    d = 0;
                }
                if (e === void 0) {
                    e = 0;
                }
                if (f === void 0) {
                    f = 0;
                }
                this.a = a;
                this.b = b;
                this.c = c;
                this.d = d;
                this.e = e;
                this.f = f;
            },
            multiplyCopy: function (matrix) {
                return new Matrix(this.a * matrix.a + this.c * matrix.b, this.b * matrix.a + this.d * matrix.b, this.a * matrix.c + this.c * matrix.d, this.b * matrix.c + this.d * matrix.d, this.a * matrix.e + this.c * matrix.f + this.e, this.b * matrix.e + this.d * matrix.f + this.f);
            },
            invert: function () {
                var ref = this;
                var a = ref.a;
                var b = ref.b;
                var d = ref.c;
                var e = ref.d;
                var g = ref.e;
                var h = ref.f;
                var det = a * e - b * d;
                if (det === 0) {
                    return null;
                }
                return new Matrix(e / det, -b / det, -d / det, a / det, (d * h - e * g) / det, (b * g - a * h) / det);
            },
            clone: function () {
                return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f);
            },
            equals: function (other) {
                if (!other) {
                    return false;
                }
                return this.a === other.a && this.b === other.b && this.c === other.c && this.d === other.d && this.e === other.e && this.f === other.f;
            },
            round: function (precision) {
                this.a = round(this.a, precision);
                this.b = round(this.b, precision);
                this.c = round(this.c, precision);
                this.d = round(this.d, precision);
                this.e = round(this.e, precision);
                this.f = round(this.f, precision);
                return this;
            },
            toArray: function (precision) {
                var result = [
                    this.a,
                    this.b,
                    this.c,
                    this.d,
                    this.e,
                    this.f
                ];
                if (defined(precision)) {
                    for (var i = 0; i < result.length; i++) {
                        result[i] = round(result[i], precision);
                    }
                }
                return result;
            },
            toString: function (precision, separator) {
                if (separator === void 0) {
                    separator = ',';
                }
                return this.toArray(precision).join(separator);
            }
        });
        Matrix.translate = function (x, y) {
            return new Matrix(1, 0, 0, 1, x, y);
        };
        Matrix.unit = function () {
            return new Matrix(1, 0, 0, 1, 0, 0);
        };
        Matrix.rotate = function (angle, x, y) {
            var matrix = new Matrix();
            matrix.a = Math.cos(rad(angle));
            matrix.b = Math.sin(rad(angle));
            matrix.c = -matrix.b;
            matrix.d = matrix.a;
            matrix.e = x - x * matrix.a + y * matrix.b || 0;
            matrix.f = y - y * matrix.a - x * matrix.b || 0;
            return matrix;
        };
        Matrix.scale = function (scaleX, scaleY) {
            return new Matrix(scaleX, 0, 0, scaleY, 0, 0);
        };
        Matrix.IDENTITY = Matrix.unit();
        function toMatrix(transformation) {
            if (transformation && typeof transformation.matrix === 'function') {
                return transformation.matrix();
            }
            return transformation;
        }
        var Point = Class.extend({
            init: function (x, y) {
                this.x = x || 0;
                this.y = y || 0;
            },
            equals: function (other) {
                return other && other.x === this.x && other.y === this.y;
            },
            clone: function () {
                return new Point(this.x, this.y);
            },
            rotate: function (angle, origin) {
                var originPoint = Point.create(origin) || Point.ZERO;
                return this.transform(Matrix.rotate(angle, originPoint.x, originPoint.y));
            },
            translate: function (x, y) {
                this.x += x;
                this.y += y;
                this.geometryChange();
                return this;
            },
            translateWith: function (point) {
                return this.translate(point.x, point.y);
            },
            move: function (x, y) {
                this.x = this.y = 0;
                return this.translate(x, y);
            },
            scale: function (scaleX, scaleY) {
                if (scaleY === void 0) {
                    scaleY = scaleX;
                }
                this.x *= scaleX;
                this.y *= scaleY;
                this.geometryChange();
                return this;
            },
            scaleCopy: function (scaleX, scaleY) {
                return this.clone().scale(scaleX, scaleY);
            },
            transform: function (transformation) {
                var matrix = toMatrix(transformation);
                var ref = this;
                var x = ref.x;
                var y = ref.y;
                this.x = matrix.a * x + matrix.c * y + matrix.e;
                this.y = matrix.b * x + matrix.d * y + matrix.f;
                this.geometryChange();
                return this;
            },
            transformCopy: function (transformation) {
                var point = this.clone();
                if (transformation) {
                    point.transform(transformation);
                }
                return point;
            },
            distanceTo: function (point) {
                var dx = this.x - point.x;
                var dy = this.y - point.y;
                return Math.sqrt(dx * dx + dy * dy);
            },
            round: function (digits) {
                this.x = round(this.x, digits);
                this.y = round(this.y, digits);
                this.geometryChange();
                return this;
            },
            toArray: function (digits) {
                var doRound = defined(digits);
                var x = doRound ? round(this.x, digits) : this.x;
                var y = doRound ? round(this.y, digits) : this.y;
                return [
                    x,
                    y
                ];
            },
            toString: function (digits, separator) {
                if (separator === void 0) {
                    separator = ' ';
                }
                var ref = this;
                var x = ref.x;
                var y = ref.y;
                if (defined(digits)) {
                    x = round(x, digits);
                    y = round(y, digits);
                }
                return x + separator + y;
            }
        });
        Point.create = function (arg0, arg1) {
            if (defined(arg0)) {
                if (arg0 instanceof Point) {
                    return arg0;
                } else if (arguments.length === 1 && arg0.length === 2) {
                    return new Point(arg0[0], arg0[1]);
                }
                return new Point(arg0, arg1);
            }
        };
        Point.min = function () {
            var arguments$1 = arguments;
            var minX = MAX_NUM;
            var minY = MAX_NUM;
            for (var i = 0; i < arguments.length; i++) {
                var point = arguments$1[i];
                minX = Math.min(point.x, minX);
                minY = Math.min(point.y, minY);
            }
            return new Point(minX, minY);
        };
        Point.max = function () {
            var arguments$1 = arguments;
            var maxX = MIN_NUM;
            var maxY = MIN_NUM;
            for (var i = 0; i < arguments.length; i++) {
                var point = arguments$1[i];
                maxX = Math.max(point.x, maxX);
                maxY = Math.max(point.y, maxY);
            }
            return new Point(maxX, maxY);
        };
        Point.minPoint = function () {
            return new Point(MIN_NUM, MIN_NUM);
        };
        Point.maxPoint = function () {
            return new Point(MAX_NUM, MAX_NUM);
        };
        if (Object.defineProperties) {
            Object.defineProperties(Point, {
                ZERO: {
                    get: function () {
                        return new Point(0, 0);
                    }
                }
            });
        }
        defineAccessors(Point.prototype, [
            'x',
            'y'
        ]);
        ObserversMixin.extend(Point.prototype);
        var Size = Class.extend({
            init: function (width, height) {
                this.width = width || 0;
                this.height = height || 0;
            },
            equals: function (other) {
                return other && other.width === this.width && other.height === this.height;
            },
            clone: function () {
                return new Size(this.width, this.height);
            },
            toArray: function (digits) {
                var doRound = defined(digits);
                var width = doRound ? round(this.width, digits) : this.width;
                var height = doRound ? round(this.height, digits) : this.height;
                return [
                    width,
                    height
                ];
            }
        });
        Size.create = function (arg0, arg1) {
            if (defined(arg0)) {
                if (arg0 instanceof Size) {
                    return arg0;
                } else if (arguments.length === 1 && arg0.length === 2) {
                    return new Size(arg0[0], arg0[1]);
                }
                return new Size(arg0, arg1);
            }
        };
        if (Object.defineProperties) {
            Object.defineProperties(Size, {
                ZERO: {
                    get: function () {
                        return new Size(0, 0);
                    }
                }
            });
        }
        defineAccessors(Size.prototype, [
            'width',
            'height'
        ]);
        ObserversMixin.extend(Size.prototype);
        var Rect = Class.extend({
            init: function (origin, size) {
                if (origin === void 0) {
                    origin = new Point();
                }
                if (size === void 0) {
                    size = new Size();
                }
                this.setOrigin(origin);
                this.setSize(size);
            },
            clone: function () {
                return new Rect(this.origin.clone(), this.size.clone());
            },
            equals: function (other) {
                return other && other.origin.equals(this.origin) && other.size.equals(this.size);
            },
            setOrigin: function (value) {
                this._observerField('origin', Point.create(value));
                this.geometryChange();
                return this;
            },
            getOrigin: function () {
                return this.origin;
            },
            setSize: function (value) {
                this._observerField('size', Size.create(value));
                this.geometryChange();
                return this;
            },
            getSize: function () {
                return this.size;
            },
            width: function () {
                return this.size.width;
            },
            height: function () {
                return this.size.height;
            },
            topLeft: function () {
                return this.origin.clone();
            },
            bottomRight: function () {
                return this.origin.clone().translate(this.width(), this.height());
            },
            topRight: function () {
                return this.origin.clone().translate(this.width(), 0);
            },
            bottomLeft: function () {
                return this.origin.clone().translate(0, this.height());
            },
            center: function () {
                return this.origin.clone().translate(this.width() / 2, this.height() / 2);
            },
            bbox: function (matrix) {
                var tl = this.topLeft().transformCopy(matrix);
                var tr = this.topRight().transformCopy(matrix);
                var br = this.bottomRight().transformCopy(matrix);
                var bl = this.bottomLeft().transformCopy(matrix);
                return Rect.fromPoints(tl, tr, br, bl);
            },
            transformCopy: function (m) {
                return Rect.fromPoints(this.topLeft().transform(m), this.bottomRight().transform(m));
            },
            expand: function (x, y) {
                if (y === void 0) {
                    y = x;
                }
                this.size.width += 2 * x;
                this.size.height += 2 * y;
                this.origin.translate(-x, -y);
                return this;
            },
            expandCopy: function (x, y) {
                return this.clone().expand(x, y);
            },
            containsPoint: function (point) {
                var origin = this.origin;
                var bottomRight = this.bottomRight();
                return !(point.x < origin.x || point.y < origin.y || bottomRight.x < point.x || bottomRight.y < point.y);
            },
            _isOnPath: function (point, width) {
                var rectOuter = this.expandCopy(width, width);
                var rectInner = this.expandCopy(-width, -width);
                return rectOuter.containsPoint(point) && !rectInner.containsPoint(point);
            }
        });
        Rect.fromPoints = function () {
            var topLeft = Point.min.apply(null, arguments);
            var bottomRight = Point.max.apply(null, arguments);
            var size = new Size(bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
            return new Rect(topLeft, size);
        };
        Rect.union = function (a, b) {
            return Rect.fromPoints(Point.min(a.topLeft(), b.topLeft()), Point.max(a.bottomRight(), b.bottomRight()));
        };
        Rect.intersect = function (a, b) {
            var rect1 = {
                left: a.topLeft().x,
                top: a.topLeft().y,
                right: a.bottomRight().x,
                bottom: a.bottomRight().y
            };
            var rect2 = {
                left: b.topLeft().x,
                top: b.topLeft().y,
                right: b.bottomRight().x,
                bottom: b.bottomRight().y
            };
            if (rect1.left <= rect2.right && rect2.left <= rect1.right && rect1.top <= rect2.bottom && rect2.top <= rect1.bottom) {
                return Rect.fromPoints(new Point(Math.max(rect1.left, rect2.left), Math.max(rect1.top, rect2.top)), new Point(Math.min(rect1.right, rect2.right), Math.min(rect1.bottom, rect2.bottom)));
            }
        };
        ObserversMixin.extend(Rect.prototype);
        var Transformation = Class.extend({
            init: function (matrix) {
                if (matrix === void 0) {
                    matrix = Matrix.unit();
                }
                this._matrix = matrix;
            },
            clone: function () {
                return new Transformation(this._matrix.clone());
            },
            equals: function (other) {
                return other && other._matrix.equals(this._matrix);
            },
            translate: function (x, y) {
                this._matrix = this._matrix.multiplyCopy(Matrix.translate(x, y));
                this._optionsChange();
                return this;
            },
            scale: function (scaleX, scaleY, origin) {
                if (scaleY === void 0) {
                    scaleY = scaleX;
                }
                if (origin === void 0) {
                    origin = null;
                }
                var originPoint = origin;
                if (originPoint) {
                    originPoint = Point.create(originPoint);
                    this._matrix = this._matrix.multiplyCopy(Matrix.translate(originPoint.x, originPoint.y));
                }
                this._matrix = this._matrix.multiplyCopy(Matrix.scale(scaleX, scaleY));
                if (originPoint) {
                    this._matrix = this._matrix.multiplyCopy(Matrix.translate(-originPoint.x, -originPoint.y));
                }
                this._optionsChange();
                return this;
            },
            rotate: function (angle, origin) {
                var originPoint = Point.create(origin) || Point.ZERO;
                this._matrix = this._matrix.multiplyCopy(Matrix.rotate(angle, originPoint.x, originPoint.y));
                this._optionsChange();
                return this;
            },
            multiply: function (transformation) {
                var matrix = toMatrix(transformation);
                this._matrix = this._matrix.multiplyCopy(matrix);
                this._optionsChange();
                return this;
            },
            matrix: function (value) {
                if (value) {
                    this._matrix = value;
                    this._optionsChange();
                    return this;
                }
                return this._matrix;
            },
            _optionsChange: function () {
                this.optionsChange({
                    field: 'transform',
                    value: this
                });
            }
        });
        ObserversMixin.extend(Transformation.prototype);
        function transform(matrix) {
            if (matrix === null) {
                return null;
            }
            if (matrix instanceof Transformation) {
                return matrix;
            }
            return new Transformation(matrix);
        }
        var Element$1 = Class.extend({
            init: function (options) {
                this._initOptions(options);
            },
            _initOptions: function (options) {
                if (options === void 0) {
                    options = {};
                }
                var clip = options.clip;
                var transform$$1 = options.transform;
                if (transform$$1) {
                    options.transform = transform(transform$$1);
                }
                if (clip && !clip.id) {
                    clip.id = definitionId();
                }
                this.options = new OptionsStore(options);
                this.options.addObserver(this);
            },
            transform: function (value) {
                if (defined(value)) {
                    this.options.set('transform', transform(value));
                } else {
                    return this.options.get('transform');
                }
            },
            parentTransform: function () {
                var element = this;
                var parentMatrix;
                while (element.parent) {
                    element = element.parent;
                    var transformation = element.transform();
                    if (transformation) {
                        parentMatrix = transformation.matrix().multiplyCopy(parentMatrix || Matrix.unit());
                    }
                }
                if (parentMatrix) {
                    return transform(parentMatrix);
                }
            },
            currentTransform: function (parentTransform) {
                if (parentTransform === void 0) {
                    parentTransform = this.parentTransform();
                }
                var elementTransform = this.transform();
                var elementMatrix = toMatrix(elementTransform);
                var parentMatrix = toMatrix(parentTransform);
                var combinedMatrix;
                if (elementMatrix && parentMatrix) {
                    combinedMatrix = parentMatrix.multiplyCopy(elementMatrix);
                } else {
                    combinedMatrix = elementMatrix || parentMatrix;
                }
                if (combinedMatrix) {
                    return transform(combinedMatrix);
                }
            },
            visible: function (value) {
                if (defined(value)) {
                    this.options.set('visible', value);
                    return this;
                }
                return this.options.get('visible') !== false;
            },
            clip: function (value) {
                var options = this.options;
                if (defined(value)) {
                    if (value && !value.id) {
                        value.id = definitionId();
                    }
                    options.set('clip', value);
                    return this;
                }
                return options.get('clip');
            },
            opacity: function (value) {
                if (defined(value)) {
                    this.options.set('opacity', value);
                    return this;
                }
                return valueOrDefault(this.options.get('opacity'), 1);
            },
            clippedBBox: function (transformation) {
                var bbox = this._clippedBBox(transformation);
                if (bbox) {
                    var clip = this.clip();
                    return clip ? Rect.intersect(bbox, clip.bbox(transformation)) : bbox;
                }
            },
            containsPoint: function (point, parentTransform) {
                if (this.visible()) {
                    var transform$$1 = this.currentTransform(parentTransform);
                    var transformedPoint = point;
                    if (transform$$1) {
                        transformedPoint = point.transformCopy(transform$$1.matrix().invert());
                    }
                    return this._hasFill() && this._containsPoint(transformedPoint) || this._isOnPath && this._hasStroke() && this._isOnPath(transformedPoint);
                }
                return false;
            },
            _hasFill: function () {
                var fill = this.options.fill;
                return fill && !isTransparent(fill.color);
            },
            _hasStroke: function () {
                var stroke = this.options.stroke;
                return stroke && stroke.width > 0 && !isTransparent(stroke.color);
            },
            _clippedBBox: function (transformation) {
                return this.bbox(transformation);
            }
        });
        Element$1.prototype.nodeType = 'Element';
        ObserversMixin.extend(Element$1.prototype);
        function ellipseExtremeAngles(center, rx, ry, matrix) {
            var extremeX = 0;
            var extremeY = 0;
            if (matrix) {
                extremeX = Math.atan2(matrix.c * ry, matrix.a * rx);
                if (matrix.b !== 0) {
                    extremeY = Math.atan2(matrix.d * ry, matrix.b * rx);
                }
            }
            return {
                x: extremeX,
                y: extremeY
            };
        }
        var PI_DIV_2 = Math.PI / 2;
        var Circle$2 = Class.extend({
            init: function (center, radius) {
                if (center === void 0) {
                    center = new Point();
                }
                if (radius === void 0) {
                    radius = 0;
                }
                this.setCenter(center);
                this.setRadius(radius);
            },
            setCenter: function (value) {
                this._observerField('center', Point.create(value));
                this.geometryChange();
                return this;
            },
            getCenter: function () {
                return this.center;
            },
            equals: function (other) {
                return other && other.center.equals(this.center) && other.radius === this.radius;
            },
            clone: function () {
                return new Circle$2(this.center.clone(), this.radius);
            },
            pointAt: function (angle) {
                return this._pointAt(rad(angle));
            },
            bbox: function (matrix) {
                var this$1 = this;
                var extremeAngles = ellipseExtremeAngles(this.center, this.radius, this.radius, matrix);
                var minPoint = Point.maxPoint();
                var maxPoint = Point.minPoint();
                for (var i = 0; i < 4; i++) {
                    var currentPointX = this$1._pointAt(extremeAngles.x + i * PI_DIV_2).transformCopy(matrix);
                    var currentPointY = this$1._pointAt(extremeAngles.y + i * PI_DIV_2).transformCopy(matrix);
                    var currentPoint = new Point(currentPointX.x, currentPointY.y);
                    minPoint = Point.min(minPoint, currentPoint);
                    maxPoint = Point.max(maxPoint, currentPoint);
                }
                return Rect.fromPoints(minPoint, maxPoint);
            },
            _pointAt: function (angle) {
                var ref = this;
                var center = ref.center;
                var radius = ref.radius;
                return new Point(center.x + radius * Math.cos(angle), center.y + radius * Math.sin(angle));
            },
            containsPoint: function (point) {
                var ref = this;
                var center = ref.center;
                var radius = ref.radius;
                var inCircle = Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2) <= Math.pow(radius, 2);
                return inCircle;
            },
            _isOnPath: function (point, width) {
                var ref = this;
                var center = ref.center;
                var radius = ref.radius;
                var pointDistance = center.distanceTo(point);
                return radius - width <= pointDistance && pointDistance <= radius + width;
            }
        });
        defineAccessors(Circle$2.prototype, ['radius']);
        ObserversMixin.extend(Circle$2.prototype);
        var GRADIENT = 'Gradient';
        var Paintable = {
            extend: function (proto) {
                proto.fill = this.fill;
                proto.stroke = this.stroke;
            },
            fill: function (color, opacity) {
                var options = this.options;
                if (defined(color)) {
                    if (color && color.nodeType !== GRADIENT) {
                        var newFill = { color: color };
                        if (defined(opacity)) {
                            newFill.opacity = opacity;
                        }
                        options.set('fill', newFill);
                    } else {
                        options.set('fill', color);
                    }
                    return this;
                }
                return options.get('fill');
            },
            stroke: function (color, width, opacity) {
                if (defined(color)) {
                    this.options.set('stroke.color', color);
                    if (defined(width)) {
                        this.options.set('stroke.width', width);
                    }
                    if (defined(opacity)) {
                        this.options.set('stroke.opacity', opacity);
                    }
                    return this;
                }
                return this.options.get('stroke');
            }
        };
        var IDENTITY_MATRIX_HASH = Matrix.IDENTITY.toString();
        var Measurable = {
            extend: function (proto) {
                proto.bbox = this.bbox;
                proto.geometryChange = this.geometryChange;
            },
            bbox: function (transformation) {
                var combinedMatrix = toMatrix(this.currentTransform(transformation));
                var matrixHash = combinedMatrix ? combinedMatrix.toString() : IDENTITY_MATRIX_HASH;
                var bbox;
                if (this._bboxCache && this._matrixHash === matrixHash) {
                    bbox = this._bboxCache.clone();
                } else {
                    bbox = this._bbox(combinedMatrix);
                    this._bboxCache = bbox ? bbox.clone() : null;
                    this._matrixHash = matrixHash;
                }
                var strokeWidth = this.options.get('stroke.width');
                if (strokeWidth && bbox) {
                    bbox.expand(strokeWidth / 2);
                }
                return bbox;
            },
            geometryChange: function () {
                delete this._bboxCache;
                this.trigger('geometryChange', { element: this });
            }
        };
        function geometryAccessor(name) {
            var fieldName = '_' + name;
            return function (value) {
                if (defined(value)) {
                    this._observerField(fieldName, value);
                    this.geometryChange();
                    return this;
                }
                return this[fieldName];
            };
        }
        function defineGeometryAccessors(fn, names) {
            for (var i = 0; i < names.length; i++) {
                fn[names[i]] = geometryAccessor(names[i]);
            }
        }
        var DEFAULT_STROKE = '#000';
        var Circle = Element$1.extend({
            init: function (geometry, options) {
                if (geometry === void 0) {
                    geometry = new Circle$2();
                }
                if (options === void 0) {
                    options = {};
                }
                Element$1.fn.init.call(this, options);
                this.geometry(geometry);
                if (!defined(this.options.stroke)) {
                    this.stroke(DEFAULT_STROKE);
                }
            },
            rawBBox: function () {
                return this._geometry.bbox();
            },
            _bbox: function (matrix) {
                return this._geometry.bbox(matrix);
            },
            _containsPoint: function (point) {
                return this.geometry().containsPoint(point);
            },
            _isOnPath: function (point) {
                return this.geometry()._isOnPath(point, this.options.stroke.width / 2);
            }
        });
        Circle.prototype.nodeType = 'Circle';
        Paintable.extend(Circle.prototype);
        Measurable.extend(Circle.prototype);
        defineGeometryAccessors(Circle.prototype, ['geometry']);
        var PRECISION = 10;
        function close(a, b, tolerance) {
            if (tolerance === void 0) {
                tolerance = PRECISION;
            }
            return round(Math.abs(a - b), tolerance) === 0;
        }
        function closeOrLess(a, b, tolerance) {
            return a < b || close(a, b, tolerance);
        }
        function lineIntersection(p0, p1, p2, p3) {
            var s1x = p1.x - p0.x;
            var s2x = p3.x - p2.x;
            var s1y = p1.y - p0.y;
            var s2y = p3.y - p2.y;
            var nx = p0.x - p2.x;
            var ny = p0.y - p2.y;
            var d = s1x * s2y - s2x * s1y;
            var s = (s1x * ny - s1y * nx) / d;
            var t = (s2x * ny - s2y * nx) / d;
            if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
                return new Point(p0.x + t * s1x, p0.y + t * s1y);
            }
        }
        var MAX_INTERVAL = 45;
        var pow$1 = Math.pow;
        var Arc$2 = Class.extend({
            init: function (center, options) {
                if (center === void 0) {
                    center = new Point();
                }
                if (options === void 0) {
                    options = {};
                }
                this.setCenter(center);
                this.radiusX = options.radiusX;
                this.radiusY = options.radiusY || options.radiusX;
                this.startAngle = options.startAngle;
                this.endAngle = options.endAngle;
                this.anticlockwise = options.anticlockwise || false;
            },
            clone: function () {
                return new Arc$2(this.center, {
                    radiusX: this.radiusX,
                    radiusY: this.radiusY,
                    startAngle: this.startAngle,
                    endAngle: this.endAngle,
                    anticlockwise: this.anticlockwise
                });
            },
            setCenter: function (value) {
                this._observerField('center', Point.create(value));
                this.geometryChange();
                return this;
            },
            getCenter: function () {
                return this.center;
            },
            pointAt: function (angle) {
                var center = this.center;
                var radian = rad(angle);
                return new Point(center.x + this.radiusX * Math.cos(radian), center.y + this.radiusY * Math.sin(radian));
            },
            curvePoints: function () {
                var this$1 = this;
                var startAngle = this.startAngle;
                var dir = this.anticlockwise ? -1 : 1;
                var curvePoints = [this.pointAt(startAngle)];
                var interval = this._arcInterval();
                var intervalAngle = interval.endAngle - interval.startAngle;
                var subIntervalsCount = Math.ceil(intervalAngle / MAX_INTERVAL);
                var subIntervalAngle = intervalAngle / subIntervalsCount;
                var currentAngle = startAngle;
                for (var i = 1; i <= subIntervalsCount; i++) {
                    var nextAngle = currentAngle + dir * subIntervalAngle;
                    var points = this$1._intervalCurvePoints(currentAngle, nextAngle);
                    curvePoints.push(points.cp1, points.cp2, points.p2);
                    currentAngle = nextAngle;
                }
                return curvePoints;
            },
            bbox: function (matrix) {
                var this$1 = this;
                var interval = this._arcInterval();
                var startAngle = interval.startAngle;
                var endAngle = interval.endAngle;
                var extremeAngles = ellipseExtremeAngles(this.center, this.radiusX, this.radiusY, matrix);
                var extremeX = deg(extremeAngles.x);
                var extremeY = deg(extremeAngles.y);
                var endPoint = this.pointAt(endAngle).transformCopy(matrix);
                var currentAngleX = bboxStartAngle(extremeX, startAngle);
                var currentAngleY = bboxStartAngle(extremeY, startAngle);
                var currentPoint = this.pointAt(startAngle).transformCopy(matrix);
                var minPoint = Point.min(currentPoint, endPoint);
                var maxPoint = Point.max(currentPoint, endPoint);
                while (currentAngleX < endAngle || currentAngleY < endAngle) {
                    var currentPointX = void 0;
                    if (currentAngleX < endAngle) {
                        currentPointX = this$1.pointAt(currentAngleX).transformCopy(matrix);
                        currentAngleX += 90;
                    }
                    var currentPointY = void 0;
                    if (currentAngleY < endAngle) {
                        currentPointY = this$1.pointAt(currentAngleY).transformCopy(matrix);
                        currentAngleY += 90;
                    }
                    currentPoint = new Point(currentPointX.x, currentPointY.y);
                    minPoint = Point.min(minPoint, currentPoint);
                    maxPoint = Point.max(maxPoint, currentPoint);
                }
                return Rect.fromPoints(minPoint, maxPoint);
            },
            _arcInterval: function () {
                var ref = this;
                var startAngle = ref.startAngle;
                var endAngle = ref.endAngle;
                var anticlockwise = ref.anticlockwise;
                if (anticlockwise) {
                    var oldStart = startAngle;
                    startAngle = endAngle;
                    endAngle = oldStart;
                }
                if (startAngle > endAngle || anticlockwise && startAngle === endAngle) {
                    endAngle += 360;
                }
                return {
                    startAngle: startAngle,
                    endAngle: endAngle
                };
            },
            _intervalCurvePoints: function (startAngle, endAngle) {
                var p1 = this.pointAt(startAngle);
                var p2 = this.pointAt(endAngle);
                var p1Derivative = this._derivativeAt(startAngle);
                var p2Derivative = this._derivativeAt(endAngle);
                var t = (rad(endAngle) - rad(startAngle)) / 3;
                var cp1 = new Point(p1.x + t * p1Derivative.x, p1.y + t * p1Derivative.y);
                var cp2 = new Point(p2.x - t * p2Derivative.x, p2.y - t * p2Derivative.y);
                return {
                    p1: p1,
                    cp1: cp1,
                    cp2: cp2,
                    p2: p2
                };
            },
            _derivativeAt: function (angle) {
                var radian = rad(angle);
                return new Point(-this.radiusX * Math.sin(radian), this.radiusY * Math.cos(radian));
            },
            containsPoint: function (point) {
                var interval = this._arcInterval();
                var intervalAngle = interval.endAngle - interval.startAngle;
                var ref = this;
                var center = ref.center;
                var radiusX = ref.radiusX;
                var radiusY = ref.radiusY;
                var distance = center.distanceTo(point);
                var angleRad = Math.atan2(point.y - center.y, point.x - center.x);
                var pointRadius = radiusX * radiusY / Math.sqrt(pow$1(radiusX, 2) * pow$1(Math.sin(angleRad), 2) + pow$1(radiusY, 2) * pow$1(Math.cos(angleRad), 2));
                var startPoint = this.pointAt(this.startAngle).round(PRECISION);
                var endPoint = this.pointAt(this.endAngle).round(PRECISION);
                var intersection = lineIntersection(center, point.round(PRECISION), startPoint, endPoint);
                var containsPoint;
                if (intervalAngle < 180) {
                    containsPoint = intersection && closeOrLess(center.distanceTo(intersection), distance) && closeOrLess(distance, pointRadius);
                } else {
                    var angle = calculateAngle(center.x, center.y, radiusX, radiusY, point.x, point.y);
                    if (angle !== 360) {
                        angle = (360 + angle) % 360;
                    }
                    var inAngleRange = interval.startAngle <= angle && angle <= interval.endAngle;
                    containsPoint = inAngleRange && closeOrLess(distance, pointRadius) || !inAngleRange && (!intersection || intersection.equals(point));
                }
                return containsPoint;
            },
            _isOnPath: function (point, width) {
                var interval = this._arcInterval();
                var center = this.center;
                var angle = calculateAngle(center.x, center.y, this.radiusX, this.radiusY, point.x, point.y);
                if (angle !== 360) {
                    angle = (360 + angle) % 360;
                }
                var inAngleRange = interval.startAngle <= angle && angle <= interval.endAngle;
                return inAngleRange && this.pointAt(angle).distanceTo(point) <= width;
            }
        });
        Arc$2.fromPoints = function (start, end, rx, ry, largeArc, swipe) {
            var arcParameters = normalizeArcParameters({
                x1: start.x,
                y1: start.y,
                x2: end.x,
                y2: end.y,
                rx: rx,
                ry: ry,
                largeArc: largeArc,
                swipe: swipe
            });
            return new Arc$2(arcParameters.center, {
                startAngle: arcParameters.startAngle,
                endAngle: arcParameters.endAngle,
                radiusX: rx,
                radiusY: ry,
                anticlockwise: swipe === 0
            });
        };
        defineAccessors(Arc$2.prototype, [
            'radiusX',
            'radiusY',
            'startAngle',
            'endAngle',
            'anticlockwise'
        ]);
        ObserversMixin.extend(Arc$2.prototype);
        function elipseAngle(start, end, swipe) {
            var endAngle = end;
            if (start > endAngle) {
                endAngle += 360;
            }
            var alpha = Math.abs(endAngle - start);
            if (!swipe) {
                alpha = 360 - alpha;
            }
            return alpha;
        }
        function calculateAngle(cx, cy, rx, ry, x, y) {
            var cos = round((x - cx) / rx, 3);
            var sin = round((y - cy) / ry, 3);
            return round(deg(Math.atan2(sin, cos)));
        }
        function normalizeArcParameters(parameters) {
            var x1 = parameters.x1;
            var y1 = parameters.y1;
            var x2 = parameters.x2;
            var y2 = parameters.y2;
            var rx = parameters.rx;
            var ry = parameters.ry;
            var largeArc = parameters.largeArc;
            var swipe = parameters.swipe;
            var cx, cy;
            var cx1, cy1;
            var a, b, c, sqrt;
            if (y1 !== y2) {
                var x21 = x2 - x1;
                var y21 = y2 - y1;
                var rx2 = pow$1(rx, 2), ry2 = pow$1(ry, 2);
                var k = (ry2 * x21 * (x1 + x2) + rx2 * y21 * (y1 + y2)) / (2 * rx2 * y21);
                var yk2 = k - y2;
                var l = -(x21 * ry2) / (rx2 * y21);
                a = 1 / rx2 + pow$1(l, 2) / ry2;
                b = 2 * (l * yk2 / ry2 - x2 / rx2);
                c = pow$1(x2, 2) / rx2 + pow$1(yk2, 2) / ry2 - 1;
                sqrt = Math.sqrt(pow$1(b, 2) - 4 * a * c);
                cx = (-b - sqrt) / (2 * a);
                cy = k + l * cx;
                cx1 = (-b + sqrt) / (2 * a);
                cy1 = k + l * cx1;
            } else if (x1 !== x2) {
                b = -2 * y2;
                c = pow$1((x2 - x1) * ry / (2 * rx), 2) + pow$1(y2, 2) - pow$1(ry, 2);
                sqrt = Math.sqrt(pow$1(b, 2) - 4 * c);
                cx = cx1 = (x1 + x2) / 2;
                cy = (-b - sqrt) / 2;
                cy1 = (-b + sqrt) / 2;
            } else {
                return false;
            }
            var start = calculateAngle(cx, cy, rx, ry, x1, y1);
            var end = calculateAngle(cx, cy, rx, ry, x2, y2);
            var alpha = elipseAngle(start, end, swipe);
            if (largeArc && alpha <= 180 || !largeArc && alpha > 180) {
                cx = cx1;
                cy = cy1;
                start = calculateAngle(cx, cy, rx, ry, x1, y1);
                end = calculateAngle(cx, cy, rx, ry, x2, y2);
            }
            return {
                center: new Point(cx, cy),
                startAngle: start,
                endAngle: end
            };
        }
        function bboxStartAngle(angle, start) {
            var startAngle = angle;
            while (startAngle < start) {
                startAngle += 90;
            }
            return startAngle;
        }
        var push = [].push;
        var pop = [].pop;
        var splice = [].splice;
        var shift = [].shift;
        var slice = [].slice;
        var unshift = [].unshift;
        var ElementsArray = Class.extend({
            init: function (array) {
                if (array === void 0) {
                    array = [];
                }
                this.length = 0;
                this._splice(0, array.length, array);
            },
            elements: function (value) {
                if (value) {
                    this._splice(0, this.length, value);
                    this._change();
                    return this;
                }
                return this.slice(0);
            },
            push: function () {
                var elements = arguments;
                var result = push.apply(this, elements);
                this._add(elements);
                return result;
            },
            slice: function () {
                return slice.call(this);
            },
            pop: function () {
                var length = this.length;
                var result = pop.apply(this);
                if (length) {
                    this._remove([result]);
                }
                return result;
            },
            splice: function (index, howMany) {
                var elements = slice.call(arguments, 2);
                var result = this._splice(index, howMany, elements);
                this._change();
                return result;
            },
            shift: function () {
                var length = this.length;
                var result = shift.apply(this);
                if (length) {
                    this._remove([result]);
                }
                return result;
            },
            unshift: function () {
                var elements = arguments;
                var result = unshift.apply(this, elements);
                this._add(elements);
                return result;
            },
            indexOf: function (element) {
                var this$1 = this;
                var length = this.length;
                for (var idx = 0; idx < length; idx++) {
                    if (this$1[idx] === element) {
                        return idx;
                    }
                }
                return -1;
            },
            _splice: function (index, howMany, elements) {
                var result = splice.apply(this, [
                    index,
                    howMany
                ].concat(elements));
                this._clearObserver(result);
                this._setObserver(elements);
                return result;
            },
            _add: function (elements) {
                this._setObserver(elements);
                this._change();
            },
            _remove: function (elements) {
                this._clearObserver(elements);
                this._change();
            },
            _setObserver: function (elements) {
                var this$1 = this;
                for (var idx = 0; idx < elements.length; idx++) {
                    elements[idx].addObserver(this$1);
                }
            },
            _clearObserver: function (elements) {
                var this$1 = this;
                for (var idx = 0; idx < elements.length; idx++) {
                    elements[idx].removeObserver(this$1);
                }
            },
            _change: function () {
            }
        });
        ObserversMixin.extend(ElementsArray.prototype);
        var GeometryElementsArray = ElementsArray.extend({
            _change: function () {
                this.geometryChange();
            }
        });
        function pointAccessor(name) {
            var fieldName = '_' + name;
            return function (value) {
                if (defined(value)) {
                    this._observerField(fieldName, Point.create(value));
                    this.geometryChange();
                    return this;
                }
                return this[fieldName];
            };
        }
        function definePointAccessors(fn, names) {
            for (var i = 0; i < names.length; i++) {
                fn[names[i]] = pointAccessor(names[i]);
            }
        }
        function isOutOfEndPoint(endPoint, controlPoint, point) {
            var angle = deg(Math.atan2(controlPoint.y - endPoint.y, controlPoint.x - endPoint.x));
            var rotatedPoint = point.transformCopy(transform().rotate(-angle, endPoint));
            return rotatedPoint.x < endPoint.x;
        }
        function calculateCurveAt(t, field, points) {
            var t1 = 1 - t;
            return Math.pow(t1, 3) * points[0][field] + 3 * Math.pow(t1, 2) * t * points[1][field] + 3 * Math.pow(t, 2) * t1 * points[2][field] + Math.pow(t, 3) * points[3][field];
        }
        function toCubicPolynomial(points, field) {
            return [
                -points[0][field] + 3 * points[1][field] - 3 * points[2][field] + points[3][field],
                3 * (points[0][field] - 2 * points[1][field] + points[2][field]),
                3 * (-points[0][field] + points[1][field]),
                points[0][field]
            ];
        }
        var ComplexNumber = Class.extend({
            init: function (real, img) {
                if (real === void 0) {
                    real = 0;
                }
                if (img === void 0) {
                    img = 0;
                }
                this.real = real;
                this.img = img;
            },
            add: function (cNumber) {
                return new ComplexNumber(round(this.real + cNumber.real, PRECISION), round(this.img + cNumber.img, PRECISION));
            },
            addConstant: function (value) {
                return new ComplexNumber(this.real + value, this.img);
            },
            negate: function () {
                return new ComplexNumber(-this.real, -this.img);
            },
            multiply: function (cNumber) {
                return new ComplexNumber(this.real * cNumber.real - this.img * cNumber.img, this.real * cNumber.img + this.img * cNumber.real);
            },
            multiplyConstant: function (value) {
                return new ComplexNumber(this.real * value, this.img * value);
            },
            nthRoot: function (n) {
                var rad$$1 = Math.atan2(this.img, this.real);
                var r = Math.sqrt(Math.pow(this.img, 2) + Math.pow(this.real, 2));
                var nthR = Math.pow(r, 1 / n);
                return new ComplexNumber(nthR * Math.cos(rad$$1 / n), nthR * Math.sin(rad$$1 / n));
            },
            equals: function (cNumber) {
                return this.real === cNumber.real && this.img === cNumber.img;
            },
            isReal: function () {
                return this.img === 0;
            }
        });
        function numberSign(x) {
            return x < 0 ? -1 : 1;
        }
        function solveQuadraticEquation(a, b, c) {
            var squareRoot = Math.sqrt(Math.pow(b, 2) - 4 * a * c);
            return [
                (-b + squareRoot) / (2 * a),
                (-b - squareRoot) / (2 * a)
            ];
        }
        function solveCubicEquation(a, b, c, d) {
            if (a === 0) {
                return solveQuadraticEquation(b, c, d);
            }
            var p = (3 * a * c - Math.pow(b, 2)) / (3 * Math.pow(a, 2));
            var q = (2 * Math.pow(b, 3) - 9 * a * b * c + 27 * Math.pow(a, 2) * d) / (27 * Math.pow(a, 3));
            var Q = Math.pow(p / 3, 3) + Math.pow(q / 2, 2);
            var i = new ComplexNumber(0, 1);
            var b3a = -b / (3 * a);
            var x1, x2, y1, y2, y3, z1, z2;
            if (Q < 0) {
                x1 = new ComplexNumber(-q / 2, Math.sqrt(-Q)).nthRoot(3);
                x2 = new ComplexNumber(-q / 2, -Math.sqrt(-Q)).nthRoot(3);
            } else {
                x1 = -q / 2 + Math.sqrt(Q);
                x1 = new ComplexNumber(numberSign(x1) * Math.pow(Math.abs(x1), 1 / 3));
                x2 = -q / 2 - Math.sqrt(Q);
                x2 = new ComplexNumber(numberSign(x2) * Math.pow(Math.abs(x2), 1 / 3));
            }
            y1 = x1.add(x2);
            z1 = x1.add(x2).multiplyConstant(-1 / 2);
            z2 = x1.add(x2.negate()).multiplyConstant(Math.sqrt(3) / 2);
            y2 = z1.add(i.multiply(z2));
            y3 = z1.add(i.negate().multiply(z2));
            var result = [];
            if (y1.isReal()) {
                result.push(round(y1.real + b3a, PRECISION));
            }
            if (y2.isReal()) {
                result.push(round(y2.real + b3a, PRECISION));
            }
            if (y3.isReal()) {
                result.push(round(y3.real + b3a, PRECISION));
            }
            return result;
        }
        function hasRootsInRange(points, point, field, rootField, range) {
            var polynomial = toCubicPolynomial(points, rootField);
            var roots = solveCubicEquation(polynomial[0], polynomial[1], polynomial[2], polynomial[3] - point[rootField]);
            var intersection;
            for (var idx = 0; idx < roots.length; idx++) {
                if (0 <= roots[idx] && roots[idx] <= 1) {
                    intersection = calculateCurveAt(roots[idx], field, points);
                    if (Math.abs(intersection - point[field]) <= range) {
                        return true;
                    }
                }
            }
        }
        function curveIntersectionsCount(points, point, bbox) {
            var polynomial = toCubicPolynomial(points, 'x');
            var roots = solveCubicEquation(polynomial[0], polynomial[1], polynomial[2], polynomial[3] - point.x);
            var rayIntersection, intersectsRay;
            var count = 0;
            for (var i = 0; i < roots.length; i++) {
                rayIntersection = calculateCurveAt(roots[i], 'y', points);
                intersectsRay = close(rayIntersection, point.y) || rayIntersection > point.y;
                if (intersectsRay && ((roots[i] === 0 || roots[i] === 1) && bbox.bottomRight().x > point.x || 0 < roots[i] && roots[i] < 1)) {
                    count++;
                }
            }
            return count;
        }
        function lineIntersectionsCount(a, b, point) {
            var intersects;
            if (a.x !== b.x) {
                var minX = Math.min(a.x, b.x);
                var maxX = Math.max(a.x, b.x);
                var minY = Math.min(a.y, b.y);
                var maxY = Math.max(a.y, b.y);
                var inRange = minX <= point.x && point.x < maxX;
                if (minY === maxY) {
                    intersects = point.y <= minY && inRange;
                } else {
                    intersects = inRange && (maxY - minY) * ((a.x - b.x) * (a.y - b.y) > 0 ? point.x - minX : maxX - point.x) / (maxX - minX) + minY - point.y >= 0;
                }
            }
            return intersects ? 1 : 0;
        }
        var Segment = Class.extend({
            init: function (anchor, controlIn, controlOut) {
                this.anchor(anchor || new Point());
                this.controlIn(controlIn);
                this.controlOut(controlOut);
            },
            bboxTo: function (toSegment, matrix) {
                var segmentAnchor = this.anchor().transformCopy(matrix);
                var toSegmentAnchor = toSegment.anchor().transformCopy(matrix);
                var rect;
                if (this.controlOut() && toSegment.controlIn()) {
                    rect = this._curveBoundingBox(segmentAnchor, this.controlOut().transformCopy(matrix), toSegment.controlIn().transformCopy(matrix), toSegmentAnchor);
                } else {
                    rect = this._lineBoundingBox(segmentAnchor, toSegmentAnchor);
                }
                return rect;
            },
            _lineBoundingBox: function (p1, p2) {
                return Rect.fromPoints(p1, p2);
            },
            _curveBoundingBox: function (p1, cp1, cp2, p2) {
                var points = [
                    p1,
                    cp1,
                    cp2,
                    p2
                ];
                var extremesX = this._curveExtremesFor(points, 'x');
                var extremesY = this._curveExtremesFor(points, 'y');
                var xLimits = arrayLimits([
                    extremesX.min,
                    extremesX.max,
                    p1.x,
                    p2.x
                ]);
                var yLimits = arrayLimits([
                    extremesY.min,
                    extremesY.max,
                    p1.y,
                    p2.y
                ]);
                return Rect.fromPoints(new Point(xLimits.min, yLimits.min), new Point(xLimits.max, yLimits.max));
            },
            _curveExtremesFor: function (points, field) {
                var extremes = this._curveExtremes(points[0][field], points[1][field], points[2][field], points[3][field]);
                return {
                    min: calculateCurveAt(extremes.min, field, points),
                    max: calculateCurveAt(extremes.max, field, points)
                };
            },
            _curveExtremes: function (x1, x2, x3, x4) {
                var a = x1 - 3 * x2 + 3 * x3 - x4;
                var b = -2 * (x1 - 2 * x2 + x3);
                var c = x1 - x2;
                var sqrt = Math.sqrt(b * b - 4 * a * c);
                var t1 = 0;
                var t2 = 1;
                if (a === 0) {
                    if (b !== 0) {
                        t1 = t2 = -c / b;
                    }
                } else if (!isNaN(sqrt)) {
                    t1 = (-b + sqrt) / (2 * a);
                    t2 = (-b - sqrt) / (2 * a);
                }
                var min = Math.max(Math.min(t1, t2), 0);
                if (min < 0 || min > 1) {
                    min = 0;
                }
                var max = Math.min(Math.max(t1, t2), 1);
                if (max > 1 || max < 0) {
                    max = 1;
                }
                return {
                    min: min,
                    max: max
                };
            },
            _intersectionsTo: function (segment, point) {
                var intersectionsCount;
                if (this.controlOut() && segment.controlIn()) {
                    intersectionsCount = curveIntersectionsCount([
                        this.anchor(),
                        this.controlOut(),
                        segment.controlIn(),
                        segment.anchor()
                    ], point, this.bboxTo(segment));
                } else {
                    intersectionsCount = lineIntersectionsCount(this.anchor(), segment.anchor(), point);
                }
                return intersectionsCount;
            },
            _isOnCurveTo: function (segment, point, width, endSegment) {
                var bbox = this.bboxTo(segment).expand(width, width);
                if (bbox.containsPoint(point)) {
                    var p1 = this.anchor();
                    var p2 = this.controlOut();
                    var p3 = segment.controlIn();
                    var p4 = segment.anchor();
                    if (endSegment === 'start' && p1.distanceTo(point) <= width) {
                        return !isOutOfEndPoint(p1, p2, point);
                    } else if (endSegment === 'end' && p4.distanceTo(point) <= width) {
                        return !isOutOfEndPoint(p4, p3, point);
                    }
                    var points = [
                        p1,
                        p2,
                        p3,
                        p4
                    ];
                    if (hasRootsInRange(points, point, 'x', 'y', width) || hasRootsInRange(points, point, 'y', 'x', width)) {
                        return true;
                    }
                    var rotation = transform().rotate(45, point);
                    var rotatedPoints = [
                        p1.transformCopy(rotation),
                        p2.transformCopy(rotation),
                        p3.transformCopy(rotation),
                        p4.transformCopy(rotation)
                    ];
                    return hasRootsInRange(rotatedPoints, point, 'x', 'y', width) || hasRootsInRange(rotatedPoints, point, 'y', 'x', width);
                }
            },
            _isOnLineTo: function (segment, point, width) {
                var p1 = this.anchor();
                var p2 = segment.anchor();
                var angle = deg(Math.atan2(p2.y - p1.y, p2.x - p1.x));
                var rect = new Rect([
                    p1.x,
                    p1.y - width / 2
                ], [
                    p1.distanceTo(p2),
                    width
                ]);
                return rect.containsPoint(point.transformCopy(transform().rotate(-angle, p1)));
            },
            _isOnPathTo: function (segment, point, width, endSegment) {
                var isOnPath;
                if (this.controlOut() && segment.controlIn()) {
                    isOnPath = this._isOnCurveTo(segment, point, width / 2, endSegment);
                } else {
                    isOnPath = this._isOnLineTo(segment, point, width);
                }
                return isOnPath;
            }
        });
        definePointAccessors(Segment.prototype, [
            'anchor',
            'controlIn',
            'controlOut'
        ]);
        ObserversMixin.extend(Segment.prototype);
        function arrayLimits(arr) {
            var length = arr.length;
            var min = MAX_NUM;
            var max = MIN_NUM;
            for (var i = 0; i < length; i++) {
                max = Math.max(max, arr[i]);
                min = Math.min(min, arr[i]);
            }
            return {
                min: min,
                max: max
            };
        }
        var Path = Element$1.extend({
            init: function (options) {
                Element$1.fn.init.call(this, options);
                this.segments = new GeometryElementsArray();
                this.segments.addObserver(this);
                if (!defined(this.options.stroke)) {
                    this.stroke('#000');
                    if (!defined(this.options.stroke.lineJoin)) {
                        this.options.set('stroke.lineJoin', 'miter');
                    }
                }
            },
            moveTo: function (x, y) {
                this.suspend();
                this.segments.elements([]);
                this.resume();
                this.lineTo(x, y);
                return this;
            },
            lineTo: function (x, y) {
                var point = defined(y) ? new Point(x, y) : x;
                var segment = new Segment(point);
                this.segments.push(segment);
                return this;
            },
            curveTo: function (controlOut, controlIn, point) {
                if (this.segments.length > 0) {
                    var lastSegment = last(this.segments);
                    var segment = new Segment(point, controlIn);
                    this.suspend();
                    lastSegment.controlOut(controlOut);
                    this.resume();
                    this.segments.push(segment);
                }
                return this;
            },
            arc: function (startAngle, endAngle, radiusX, radiusY, anticlockwise) {
                if (this.segments.length > 0) {
                    var lastSegment = last(this.segments);
                    var anchor = lastSegment.anchor();
                    var start = rad(startAngle);
                    var center = new Point(anchor.x - radiusX * Math.cos(start), anchor.y - radiusY * Math.sin(start));
                    var arc = new Arc$2(center, {
                        startAngle: startAngle,
                        endAngle: endAngle,
                        radiusX: radiusX,
                        radiusY: radiusY,
                        anticlockwise: anticlockwise
                    });
                    this._addArcSegments(arc);
                }
                return this;
            },
            arcTo: function (end, rx, ry, largeArc, swipe) {
                if (this.segments.length > 0) {
                    var lastSegment = last(this.segments);
                    var anchor = lastSegment.anchor();
                    var arc = Arc$2.fromPoints(anchor, end, rx, ry, largeArc, swipe);
                    this._addArcSegments(arc);
                }
                return this;
            },
            _addArcSegments: function (arc) {
                var this$1 = this;
                this.suspend();
                var curvePoints = arc.curvePoints();
                for (var i = 1; i < curvePoints.length; i += 3) {
                    this$1.curveTo(curvePoints[i], curvePoints[i + 1], curvePoints[i + 2]);
                }
                this.resume();
                this.geometryChange();
            },
            close: function () {
                this.options.closed = true;
                this.geometryChange();
                return this;
            },
            rawBBox: function () {
                return this._bbox();
            },
            _containsPoint: function (point) {
                var segments = this.segments;
                var length = segments.length;
                var intersectionsCount = 0;
                var previous, current;
                for (var idx = 1; idx < length; idx++) {
                    previous = segments[idx - 1];
                    current = segments[idx];
                    intersectionsCount += previous._intersectionsTo(current, point);
                }
                if (this.options.closed || !segments[0].anchor().equals(segments[length - 1].anchor())) {
                    intersectionsCount += lineIntersectionsCount(segments[0].anchor(), segments[length - 1].anchor(), point);
                }
                return intersectionsCount % 2 !== 0;
            },
            _isOnPath: function (point, width) {
                var segments = this.segments;
                var length = segments.length;
                var pathWidth = width || this.options.stroke.width;
                if (length > 1) {
                    if (segments[0]._isOnPathTo(segments[1], point, pathWidth, 'start')) {
                        return true;
                    }
                    for (var idx = 2; idx <= length - 2; idx++) {
                        if (segments[idx - 1]._isOnPathTo(segments[idx], point, pathWidth)) {
                            return true;
                        }
                    }
                    if (segments[length - 2]._isOnPathTo(segments[length - 1], point, pathWidth, 'end')) {
                        return true;
                    }
                }
                return false;
            },
            _bbox: function (matrix) {
                var segments = this.segments;
                var length = segments.length;
                var boundingBox;
                if (length === 1) {
                    var anchor = segments[0].anchor().transformCopy(matrix);
                    boundingBox = new Rect(anchor, Size.ZERO);
                } else if (length > 0) {
                    for (var i = 1; i < length; i++) {
                        var segmentBox = segments[i - 1].bboxTo(segments[i], matrix);
                        if (boundingBox) {
                            boundingBox = Rect.union(boundingBox, segmentBox);
                        } else {
                            boundingBox = segmentBox;
                        }
                    }
                }
                return boundingBox;
            }
        });
        Path.fromRect = function (rect, options) {
            return new Path(options).moveTo(rect.topLeft()).lineTo(rect.topRight()).lineTo(rect.bottomRight()).lineTo(rect.bottomLeft()).close();
        };
        Path.fromPoints = function (points, options) {
            if (points) {
                var path = new Path(options);
                for (var i = 0; i < points.length; i++) {
                    var point = Point.create(points[i]);
                    if (point) {
                        if (i === 0) {
                            path.moveTo(point);
                        } else {
                            path.lineTo(point);
                        }
                    }
                }
                return path;
            }
        };
        Path.fromArc = function (arc, options) {
            var path = new Path(options);
            var startAngle = arc.startAngle;
            var start = arc.pointAt(startAngle);
            path.moveTo(start.x, start.y);
            path.arc(startAngle, arc.endAngle, arc.radiusX, arc.radiusY, arc.anticlockwise);
            return path;
        };
        Path.prototype.nodeType = 'Path';
        Paintable.extend(Path.prototype);
        Measurable.extend(Path.prototype);
        var DEFAULT_STROKE$1 = '#000';
        var Arc = Element$1.extend({
            init: function (geometry, options) {
                if (geometry === void 0) {
                    geometry = new Arc$2();
                }
                if (options === void 0) {
                    options = {};
                }
                Element$1.fn.init.call(this, options);
                this.geometry(geometry);
                if (!defined(this.options.stroke)) {
                    this.stroke(DEFAULT_STROKE$1);
                }
            },
            _bbox: function (matrix) {
                return this._geometry.bbox(matrix);
            },
            rawBBox: function () {
                return this.geometry().bbox();
            },
            toPath: function () {
                var path = new Path();
                var curvePoints = this.geometry().curvePoints();
                if (curvePoints.length > 0) {
                    path.moveTo(curvePoints[0].x, curvePoints[0].y);
                    for (var i = 1; i < curvePoints.length; i += 3) {
                        path.curveTo(curvePoints[i], curvePoints[i + 1], curvePoints[i + 2]);
                    }
                }
                return path;
            },
            _containsPoint: function (point) {
                return this.geometry().containsPoint(point);
            },
            _isOnPath: function (point) {
                return this.geometry()._isOnPath(point, this.options.stroke.width / 2);
            }
        });
        Arc.prototype.nodeType = 'Arc';
        Paintable.extend(Arc.prototype);
        Measurable.extend(Arc.prototype);
        defineGeometryAccessors(Arc.prototype, ['geometry']);
        function elementsBoundingBox(elements, applyTransform, transformation) {
            var boundingBox;
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                if (element.visible()) {
                    var elementBoundingBox = applyTransform ? element.bbox(transformation) : element.rawBBox();
                    if (elementBoundingBox) {
                        if (boundingBox) {
                            boundingBox = Rect.union(boundingBox, elementBoundingBox);
                        } else {
                            boundingBox = elementBoundingBox;
                        }
                    }
                }
            }
            return boundingBox;
        }
        function elementsClippedBoundingBox(elements, transformation) {
            var boundingBox;
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                if (element.visible()) {
                    var elementBoundingBox = element.clippedBBox(transformation);
                    if (elementBoundingBox) {
                        if (boundingBox) {
                            boundingBox = Rect.union(boundingBox, elementBoundingBox);
                        } else {
                            boundingBox = elementBoundingBox;
                        }
                    }
                }
            }
            return boundingBox;
        }
        var MultiPath = Element$1.extend({
            init: function (options) {
                Element$1.fn.init.call(this, options);
                this.paths = new GeometryElementsArray();
                this.paths.addObserver(this);
                if (!defined(this.options.stroke)) {
                    this.stroke('#000');
                }
            },
            moveTo: function (x, y) {
                var path = new Path();
                path.moveTo(x, y);
                this.paths.push(path);
                return this;
            },
            lineTo: function (x, y) {
                if (this.paths.length > 0) {
                    last(this.paths).lineTo(x, y);
                }
                return this;
            },
            curveTo: function (controlOut, controlIn, point) {
                if (this.paths.length > 0) {
                    last(this.paths).curveTo(controlOut, controlIn, point);
                }
                return this;
            },
            arc: function (startAngle, endAngle, radiusX, radiusY, anticlockwise) {
                if (this.paths.length > 0) {
                    last(this.paths).arc(startAngle, endAngle, radiusX, radiusY, anticlockwise);
                }
                return this;
            },
            arcTo: function (end, rx, ry, largeArc, swipe) {
                if (this.paths.length > 0) {
                    last(this.paths).arcTo(end, rx, ry, largeArc, swipe);
                }
                return this;
            },
            close: function () {
                if (this.paths.length > 0) {
                    last(this.paths).close();
                }
                return this;
            },
            _bbox: function (matrix) {
                return elementsBoundingBox(this.paths, true, matrix);
            },
            rawBBox: function () {
                return elementsBoundingBox(this.paths, false);
            },
            _containsPoint: function (point) {
                var paths = this.paths;
                for (var idx = 0; idx < paths.length; idx++) {
                    if (paths[idx]._containsPoint(point)) {
                        return true;
                    }
                }
                return false;
            },
            _isOnPath: function (point) {
                var paths = this.paths;
                var width = this.options.stroke.width;
                for (var idx = 0; idx < paths.length; idx++) {
                    if (paths[idx]._isOnPath(point, width)) {
                        return true;
                    }
                }
                return false;
            },
            _clippedBBox: function (transformation) {
                return elementsClippedBoundingBox(this.paths, this.currentTransform(transformation));
            }
        });
        MultiPath.prototype.nodeType = 'MultiPath';
        Paintable.extend(MultiPath.prototype);
        Measurable.extend(MultiPath.prototype);
        var DEFAULT_FONT = '12px sans-serif';
        var DEFAULT_FILL = '#000';
        var Text = Element$1.extend({
            init: function (content, position, options) {
                if (position === void 0) {
                    position = new Point();
                }
                if (options === void 0) {
                    options = {};
                }
                Element$1.fn.init.call(this, options);
                this.content(content);
                this.position(position);
                if (!this.options.font) {
                    this.options.font = DEFAULT_FONT;
                }
                if (!defined(this.options.fill)) {
                    this.fill(DEFAULT_FILL);
                }
            },
            content: function (value) {
                if (defined(value)) {
                    this.options.set('content', value);
                    return this;
                }
                return this.options.get('content');
            },
            measure: function () {
                var metrics = kendoUtil.measureText(this.content(), { font: this.options.get('font') });
                return metrics;
            },
            rect: function () {
                var size = this.measure();
                var pos = this.position().clone();
                return new Rect(pos, [
                    size.width,
                    size.height
                ]);
            },
            bbox: function (transformation) {
                var combinedMatrix = toMatrix(this.currentTransform(transformation));
                return this.rect().bbox(combinedMatrix);
            },
            rawBBox: function () {
                return this.rect().bbox();
            },
            _containsPoint: function (point) {
                return this.rect().containsPoint(point);
            }
        });
        Text.prototype.nodeType = 'Text';
        Paintable.extend(Text.prototype);
        definePointAccessors(Text.prototype, ['position']);
        var Image$1 = Element$1.extend({
            init: function (src, rect, options) {
                if (rect === void 0) {
                    rect = new Rect();
                }
                if (options === void 0) {
                    options = {};
                }
                Element$1.fn.init.call(this, options);
                this.src(src);
                this.rect(rect);
            },
            src: function (value) {
                if (defined(value)) {
                    this.options.set('src', value);
                    return this;
                }
                return this.options.get('src');
            },
            bbox: function (transformation) {
                var combinedMatrix = toMatrix(this.currentTransform(transformation));
                return this._rect.bbox(combinedMatrix);
            },
            rawBBox: function () {
                return this._rect.bbox();
            },
            _containsPoint: function (point) {
                return this._rect.containsPoint(point);
            },
            _hasFill: function () {
                return this.src();
            }
        });
        Image$1.prototype.nodeType = 'Image';
        defineGeometryAccessors(Image$1.prototype, ['rect']);
        var Traversable = {
            extend: function (proto, childrenField) {
                proto.traverse = function (callback) {
                    var children = this[childrenField];
                    for (var i = 0; i < children.length; i++) {
                        var child = children[i];
                        if (child.traverse) {
                            child.traverse(callback);
                        } else {
                            callback(child);
                        }
                    }
                    return this;
                };
            }
        };
        var Group = Element$1.extend({
            init: function (options) {
                Element$1.fn.init.call(this, options);
                this.children = [];
            },
            childrenChange: function (action, items, index) {
                this.trigger('childrenChange', {
                    action: action,
                    items: items,
                    index: index
                });
            },
            append: function () {
                append(this.children, arguments);
                this._reparent(arguments, this);
                this.childrenChange('add', arguments);
                return this;
            },
            insert: function (index, element) {
                this.children.splice(index, 0, element);
                element.parent = this;
                this.childrenChange('add', [element], index);
                return this;
            },
            insertAt: function (element, index) {
                return this.insert(index, element);
            },
            remove: function (element) {
                var index = this.children.indexOf(element);
                if (index >= 0) {
                    this.children.splice(index, 1);
                    element.parent = null;
                    this.childrenChange('remove', [element], index);
                }
                return this;
            },
            removeAt: function (index) {
                if (0 <= index && index < this.children.length) {
                    var element = this.children[index];
                    this.children.splice(index, 1);
                    element.parent = null;
                    this.childrenChange('remove', [element], index);
                }
                return this;
            },
            clear: function () {
                var items = this.children;
                this.children = [];
                this._reparent(items, null);
                this.childrenChange('remove', items, 0);
                return this;
            },
            bbox: function (transformation) {
                return elementsBoundingBox(this.children, true, this.currentTransform(transformation));
            },
            rawBBox: function () {
                return elementsBoundingBox(this.children, false);
            },
            _clippedBBox: function (transformation) {
                return elementsClippedBoundingBox(this.children, this.currentTransform(transformation));
            },
            currentTransform: function (transformation) {
                return Element$1.prototype.currentTransform.call(this, transformation) || null;
            },
            containsPoint: function (point, parentTransform) {
                if (this.visible()) {
                    var children = this.children;
                    var transform = this.currentTransform(parentTransform);
                    for (var idx = 0; idx < children.length; idx++) {
                        if (children[idx].containsPoint(point, transform)) {
                            return true;
                        }
                    }
                }
                return false;
            },
            _reparent: function (elements, newParent) {
                var this$1 = this;
                for (var i = 0; i < elements.length; i++) {
                    var child = elements[i];
                    var parent = child.parent;
                    if (parent && parent !== this$1 && parent.remove) {
                        parent.remove(child);
                    }
                    child.parent = newParent;
                }
            }
        });
        Group.prototype.nodeType = 'Group';
        Traversable.extend(Group.prototype, 'children');
        function translateToPoint(point, bbox, element) {
            var transofrm = element.transform() || transform();
            var matrix = transofrm.matrix();
            matrix.e += point.x - bbox.origin.x;
            matrix.f += point.y - bbox.origin.y;
            transofrm.matrix(matrix);
            element.transform(transofrm);
        }
        function alignStart(size, rect, align, axis, sizeField) {
            var start;
            if (align === 'start') {
                start = rect.origin[axis];
            } else if (align === 'end') {
                start = rect.origin[axis] + rect.size[sizeField] - size;
            } else {
                start = rect.origin[axis] + (rect.size[sizeField] - size) / 2;
            }
            return start;
        }
        var DEFAULT_OPTIONS = {
            alignContent: 'start',
            justifyContent: 'start',
            alignItems: 'start',
            spacing: 0,
            orientation: 'horizontal',
            lineSpacing: 0,
            wrap: true
        };
        var Layout = Group.extend({
            init: function (rect, options) {
                Group.fn.init.call(this, $.extend({}, DEFAULT_OPTIONS, options));
                this._rect = rect;
                this._fieldMap = {};
            },
            rect: function (value) {
                if (value) {
                    this._rect = value;
                    return this;
                }
                return this._rect;
            },
            _initMap: function () {
                var options = this.options;
                var fieldMap = this._fieldMap;
                if (options.orientation === 'horizontal') {
                    fieldMap.sizeField = 'width';
                    fieldMap.groupsSizeField = 'height';
                    fieldMap.groupAxis = 'x';
                    fieldMap.groupsAxis = 'y';
                } else {
                    fieldMap.sizeField = 'height';
                    fieldMap.groupsSizeField = 'width';
                    fieldMap.groupAxis = 'y';
                    fieldMap.groupsAxis = 'x';
                }
            },
            reflow: function () {
                if (!this._rect || this.children.length === 0) {
                    return;
                }
                this._initMap();
                if (this.options.transform) {
                    this.transform(null);
                }
                var options = this.options;
                var rect = this._rect;
                var ref = this._initGroups();
                var groups = ref.groups;
                var groupsSize = ref.groupsSize;
                var ref$1 = this._fieldMap;
                var sizeField = ref$1.sizeField;
                var groupsSizeField = ref$1.groupsSizeField;
                var groupAxis = ref$1.groupAxis;
                var groupsAxis = ref$1.groupsAxis;
                var groupOrigin = new Point();
                var elementOrigin = new Point();
                var size = new Size();
                var groupStart = alignStart(groupsSize, rect, options.alignContent, groupsAxis, groupsSizeField);
                var elementStart, bbox, element, group, groupBox;
                for (var groupIdx = 0; groupIdx < groups.length; groupIdx++) {
                    group = groups[groupIdx];
                    groupOrigin[groupAxis] = elementStart = alignStart(group.size, rect, options.justifyContent, groupAxis, sizeField);
                    groupOrigin[groupsAxis] = groupStart;
                    size[sizeField] = group.size;
                    size[groupsSizeField] = group.lineSize;
                    groupBox = new Rect(groupOrigin, size);
                    for (var idx = 0; idx < group.bboxes.length; idx++) {
                        element = group.elements[idx];
                        bbox = group.bboxes[idx];
                        elementOrigin[groupAxis] = elementStart;
                        elementOrigin[groupsAxis] = alignStart(bbox.size[groupsSizeField], groupBox, options.alignItems, groupsAxis, groupsSizeField);
                        translateToPoint(elementOrigin, bbox, element);
                        elementStart += bbox.size[sizeField] + options.spacing;
                    }
                    groupStart += group.lineSize + options.lineSpacing;
                }
                if (!options.wrap && group.size > rect.size[sizeField]) {
                    var scale = rect.size[sizeField] / groupBox.size[sizeField];
                    var scaledStart = groupBox.topLeft().scale(scale, scale);
                    var scaledSize = groupBox.size[groupsSizeField] * scale;
                    var newStart = alignStart(scaledSize, rect, options.alignContent, groupsAxis, groupsSizeField);
                    var transform$$1 = transform();
                    if (groupAxis === 'x') {
                        transform$$1.translate(rect.origin.x - scaledStart.x, newStart - scaledStart.y);
                    } else {
                        transform$$1.translate(newStart - scaledStart.x, rect.origin.y - scaledStart.y);
                    }
                    transform$$1.scale(scale, scale);
                    this.transform(transform$$1);
                }
            },
            _initGroups: function () {
                var this$1 = this;
                var ref = this;
                var options = ref.options;
                var children = ref.children;
                var lineSpacing = options.lineSpacing;
                var wrap = options.wrap;
                var spacing = options.spacing;
                var sizeField = this._fieldMap.sizeField;
                var group = this._newGroup();
                var groups = [];
                var addGroup = function () {
                    groups.push(group);
                    groupsSize += group.lineSize + lineSpacing;
                };
                var groupsSize = -lineSpacing;
                for (var idx = 0; idx < children.length; idx++) {
                    var element = children[idx];
                    var bbox = children[idx].clippedBBox();
                    if (element.visible() && bbox) {
                        if (wrap && group.size + bbox.size[sizeField] + spacing > this$1._rect.size[sizeField]) {
                            if (group.bboxes.length === 0) {
                                this$1._addToGroup(group, bbox, element);
                                addGroup();
                                group = this$1._newGroup();
                            } else {
                                addGroup();
                                group = this$1._newGroup();
                                this$1._addToGroup(group, bbox, element);
                            }
                        } else {
                            this$1._addToGroup(group, bbox, element);
                        }
                    }
                }
                if (group.bboxes.length) {
                    addGroup();
                }
                return {
                    groups: groups,
                    groupsSize: groupsSize
                };
            },
            _addToGroup: function (group, bbox, element) {
                group.size += bbox.size[this._fieldMap.sizeField] + this.options.spacing;
                group.lineSize = Math.max(bbox.size[this._fieldMap.groupsSizeField], group.lineSize);
                group.bboxes.push(bbox);
                group.elements.push(element);
            },
            _newGroup: function () {
                return {
                    lineSize: 0,
                    size: -this.options.spacing,
                    bboxes: [],
                    elements: []
                };
            }
        });
        var Rect$2 = Element$1.extend({
            init: function (geometry, options) {
                if (geometry === void 0) {
                    geometry = new Rect();
                }
                if (options === void 0) {
                    options = {};
                }
                Element$1.fn.init.call(this, options);
                this.geometry(geometry);
                if (!defined(this.options.stroke)) {
                    this.stroke('#000');
                }
            },
            _bbox: function (matrix) {
                return this._geometry.bbox(matrix);
            },
            rawBBox: function () {
                return this._geometry.bbox();
            },
            _containsPoint: function (point) {
                return this._geometry.containsPoint(point);
            },
            _isOnPath: function (point) {
                return this.geometry()._isOnPath(point, this.options.stroke.width / 2);
            }
        });
        Rect$2.prototype.nodeType = 'Rect';
        Paintable.extend(Rect$2.prototype);
        Measurable.extend(Rect$2.prototype);
        defineGeometryAccessors(Rect$2.prototype, ['geometry']);
        function alignElements(elements, rect, alignment, axis, sizeField) {
            for (var idx = 0; idx < elements.length; idx++) {
                var bbox = elements[idx].clippedBBox();
                if (bbox) {
                    var point = bbox.origin.clone();
                    point[axis] = alignStart(bbox.size[sizeField], rect, alignment || 'start', axis, sizeField);
                    translateToPoint(point, bbox, elements[idx]);
                }
            }
        }
        function align(elements, rect, alignment) {
            alignElements(elements, rect, alignment, 'x', 'width');
        }
        function vAlign(elements, rect, alignment) {
            alignElements(elements, rect, alignment, 'y', 'height');
        }
        function stackElements(elements, stackAxis, otherAxis, sizeField) {
            if (elements.length > 1) {
                var origin = new Point();
                var previousBBox = elements[0].bbox;
                for (var idx = 1; idx < elements.length; idx++) {
                    var element = elements[idx].element;
                    var bbox = elements[idx].bbox;
                    origin[stackAxis] = previousBBox.origin[stackAxis] + previousBBox.size[sizeField];
                    origin[otherAxis] = bbox.origin[otherAxis];
                    translateToPoint(origin, bbox, element);
                    bbox.origin[stackAxis] = origin[stackAxis];
                    previousBBox = bbox;
                }
            }
        }
        function createStackElements(elements) {
            var stackElements = [];
            for (var idx = 0; idx < elements.length; idx++) {
                var element = elements[idx];
                var bbox = element.clippedBBox();
                if (bbox) {
                    stackElements.push({
                        element: element,
                        bbox: bbox
                    });
                }
            }
            return stackElements;
        }
        function stack(elements) {
            stackElements(createStackElements(elements), 'x', 'y', 'width');
        }
        function vStack(elements) {
            stackElements(createStackElements(elements), 'y', 'x', 'height');
        }
        function getStacks(elements, rect, sizeField) {
            var maxSize = rect.size[sizeField];
            var stacks = [];
            var stack = [];
            var stackSize = 0;
            var element, bbox;
            var addElementToStack = function () {
                stack.push({
                    element: element,
                    bbox: bbox
                });
            };
            for (var idx = 0; idx < elements.length; idx++) {
                element = elements[idx];
                bbox = element.clippedBBox();
                if (bbox) {
                    var size = bbox.size[sizeField];
                    if (stackSize + size > maxSize) {
                        if (stack.length) {
                            stacks.push(stack);
                            stack = [];
                            addElementToStack();
                            stackSize = size;
                        } else {
                            addElementToStack();
                            stacks.push(stack);
                            stack = [];
                            stackSize = 0;
                        }
                    } else {
                        addElementToStack();
                        stackSize += size;
                    }
                }
            }
            if (stack.length) {
                stacks.push(stack);
            }
            return stacks;
        }
        function wrapElements(elements, rect, axis, otherAxis, sizeField) {
            var stacks = getStacks(elements, rect, sizeField);
            var origin = rect.origin.clone();
            var result = [];
            for (var idx = 0; idx < stacks.length; idx++) {
                var stack = stacks[idx];
                var startElement = stack[0];
                origin[otherAxis] = startElement.bbox.origin[otherAxis];
                translateToPoint(origin, startElement.bbox, startElement.element);
                startElement.bbox.origin[axis] = origin[axis];
                stackElements(stack, axis, otherAxis, sizeField);
                result.push([]);
                for (var elementIdx = 0; elementIdx < stack.length; elementIdx++) {
                    result[idx].push(stack[elementIdx].element);
                }
            }
            return result;
        }
        function wrap(elements, rect) {
            return wrapElements(elements, rect, 'x', 'y', 'width');
        }
        function vWrap(elements, rect) {
            return wrapElements(elements, rect, 'y', 'x', 'height');
        }
        function fit(element, rect) {
            var bbox = element.clippedBBox();
            if (bbox) {
                var elementSize = bbox.size;
                var rectSize = rect.size;
                if (rectSize.width < elementSize.width || rectSize.height < elementSize.height) {
                    var scale = Math.min(rectSize.width / elementSize.width, rectSize.height / elementSize.height);
                    var transform$$1 = element.transform() || transform();
                    transform$$1.scale(scale, scale);
                    element.transform(transform$$1);
                }
            }
        }
        var StopsArray = ElementsArray.extend({
            _change: function () {
                this.optionsChange({ field: 'stops' });
            }
        });
        function optionsAccessor(name) {
            return function (value) {
                if (defined(value)) {
                    this.options.set(name, value);
                    return this;
                }
                return this.options.get(name);
            };
        }
        function defineOptionsAccessors(fn, names) {
            for (var i = 0; i < names.length; i++) {
                fn[names[i]] = optionsAccessor(names[i]);
            }
        }
        var GradientStop = Class.extend({
            init: function (offset, color, opacity) {
                this.options = new OptionsStore({
                    offset: offset,
                    color: color,
                    opacity: defined(opacity) ? opacity : 1
                });
                this.options.addObserver(this);
            }
        });
        GradientStop.create = function (arg) {
            if (defined(arg)) {
                var stop;
                if (arg instanceof GradientStop) {
                    stop = arg;
                } else if (arg.length > 1) {
                    stop = new GradientStop(arg[0], arg[1], arg[2]);
                } else {
                    stop = new GradientStop(arg.offset, arg.color, arg.opacity);
                }
                return stop;
            }
        };
        defineOptionsAccessors(GradientStop.prototype, [
            'offset',
            'color',
            'opacity'
        ]);
        ObserversMixin.extend(GradientStop.prototype);
        var Gradient = Class.extend({
            init: function (options) {
                if (options === void 0) {
                    options = {};
                }
                this.stops = new StopsArray(this._createStops(options.stops));
                this.stops.addObserver(this);
                this._userSpace = options.userSpace;
                this.id = definitionId();
            },
            userSpace: function (value) {
                if (defined(value)) {
                    this._userSpace = value;
                    this.optionsChange();
                    return this;
                }
                return this._userSpace;
            },
            _createStops: function (stops) {
                if (stops === void 0) {
                    stops = [];
                }
                var result = [];
                for (var idx = 0; idx < stops.length; idx++) {
                    result.push(GradientStop.create(stops[idx]));
                }
                return result;
            },
            addStop: function (offset, color, opacity) {
                this.stops.push(new GradientStop(offset, color, opacity));
            },
            removeStop: function (stop) {
                var index = this.stops.indexOf(stop);
                if (index >= 0) {
                    this.stops.splice(index, 1);
                }
            }
        });
        Gradient.prototype.nodeType = 'Gradient';
        ObserversMixin.extend(Gradient.prototype);
        $.extend(Gradient.prototype, {
            optionsChange: function (e) {
                this.trigger('optionsChange', {
                    field: 'gradient' + (e ? '.' + e.field : ''),
                    value: this
                });
            },
            geometryChange: function () {
                this.optionsChange();
            }
        });
        var LinearGradient = Gradient.extend({
            init: function (options) {
                if (options === void 0) {
                    options = {};
                }
                Gradient.fn.init.call(this, options);
                this.start(options.start || new Point());
                this.end(options.end || new Point(1, 0));
            }
        });
        definePointAccessors(LinearGradient.prototype, [
            'start',
            'end'
        ]);
        var RadialGradient = Gradient.extend({
            init: function (options) {
                if (options === void 0) {
                    options = {};
                }
                Gradient.fn.init.call(this, options);
                this.center(options.center || new Point());
                this._radius = defined(options.radius) ? options.radius : 1;
                this._fallbackFill = options.fallbackFill;
            },
            radius: function (value) {
                if (defined(value)) {
                    this._radius = value;
                    this.geometryChange();
                    return this;
                }
                return this._radius;
            },
            fallbackFill: function (value) {
                if (defined(value)) {
                    this._fallbackFill = value;
                    this.optionsChange();
                    return this;
                }
                return this._fallbackFill;
            }
        });
        definePointAccessors(RadialGradient.prototype, ['center']);
        function swing(position) {
            return 0.5 - Math.cos(position * Math.PI) / 2;
        }
        function linear(position) {
            return position;
        }
        function easeOutElastic(position, time, start, diff) {
            var s = 1.70158, p = 0, a = diff;
            if (position === 0) {
                return start;
            }
            if (position === 1) {
                return start + diff;
            }
            if (!p) {
                p = 0.5;
            }
            if (a < Math.abs(diff)) {
                a = diff;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(diff / a);
            }
            return a * Math.pow(2, -10 * position) * Math.sin((Number(position) - s) * (1.1 * Math.PI) / p) + diff + start;
        }
        var easingFunctions = {
            swing: swing,
            linear: linear,
            easeOutElastic: easeOutElastic
        };
        var now = Date.now || function () {
            return new Date().getTime();
        };
        var Animation = Class.extend({
            init: function (element, options) {
                this.options = $.extend({}, this.options, options);
                this.element = element;
            },
            setup: function () {
            },
            step: function () {
            },
            play: function () {
                var this$1 = this;
                var options = this.options;
                var duration = options.duration;
                var delay = options.delay;
                if (delay === void 0) {
                    delay = 0;
                }
                var easing = easingFunctions[options.easing];
                var start = now() + delay;
                var finish = start + duration;
                if (duration === 0) {
                    this.step(1);
                    this.abort();
                } else {
                    setTimeout(function () {
                        var loop = function () {
                            if (this$1._stopped) {
                                return;
                            }
                            var wallTime = now();
                            var time = limitValue(wallTime - start, 0, duration);
                            var position = time / duration;
                            var easingPosition = easing(position, time, 0, 1, duration);
                            this$1.step(easingPosition);
                            if (wallTime < finish) {
                                kendo.animationFrame(loop);
                            } else {
                                this$1.abort();
                            }
                        };
                        loop();
                    }, delay);
                }
            },
            abort: function () {
                this._stopped = true;
            },
            destroy: function () {
                this.abort();
            }
        });
        Animation.prototype.options = {
            duration: 500,
            easing: 'swing'
        };
        var AnimationFactory = Class.extend({
            init: function () {
                this._items = [];
            },
            register: function (name, type) {
                this._items.push({
                    name: name,
                    type: type
                });
            },
            create: function (element, options) {
                var items = this._items;
                var match;
                if (options && options.type) {
                    var type = options.type.toLowerCase();
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].name.toLowerCase() === type) {
                            match = items[i];
                            break;
                        }
                    }
                }
                if (match) {
                    return new match.type(element, options);
                }
            }
        });
        AnimationFactory.current = new AnimationFactory();
        Animation.create = function (type, element, options) {
            return AnimationFactory.current.create(type, element, options);
        };
        var ShapeMap = {
            l: function (path, options) {
                var parameters = options.parameters;
                var position = options.position;
                for (var i = 0; i < parameters.length; i += 2) {
                    var point = new Point(parameters[i], parameters[i + 1]);
                    if (options.isRelative) {
                        point.translateWith(position);
                    }
                    path.lineTo(point.x, point.y);
                    position.x = point.x;
                    position.y = point.y;
                }
            },
            c: function (path, options) {
                var parameters = options.parameters;
                var position = options.position;
                for (var i = 0; i < parameters.length; i += 6) {
                    var controlOut = new Point(parameters[i], parameters[i + 1]);
                    var controlIn = new Point(parameters[i + 2], parameters[i + 3]);
                    var point = new Point(parameters[i + 4], parameters[i + 5]);
                    if (options.isRelative) {
                        controlIn.translateWith(position);
                        controlOut.translateWith(position);
                        point.translateWith(position);
                    }
                    path.curveTo(controlOut, controlIn, point);
                    position.x = point.x;
                    position.y = point.y;
                }
            },
            v: function (path, options) {
                var value = options.isRelative ? 0 : options.position.x;
                toLineParamaters(options.parameters, true, value);
                this.l(path, options);
            },
            h: function (path, options) {
                var value = options.isRelative ? 0 : options.position.y;
                toLineParamaters(options.parameters, false, value);
                this.l(path, options);
            },
            a: function (path, options) {
                var parameters = options.parameters;
                var position = options.position;
                for (var i = 0; i < parameters.length; i += 7) {
                    var radiusX = parameters[i];
                    var radiusY = parameters[i + 1];
                    var largeArc = parameters[i + 3];
                    var swipe = parameters[i + 4];
                    var endPoint = new Point(parameters[i + 5], parameters[i + 6]);
                    if (options.isRelative) {
                        endPoint.translateWith(position);
                    }
                    path.arcTo(endPoint, radiusX, radiusY, largeArc, swipe);
                    position.x = endPoint.x;
                    position.y = endPoint.y;
                }
            },
            s: function (path, options) {
                var parameters = options.parameters;
                var position = options.position;
                var previousCommand = options.previousCommand;
                var lastControlIn;
                if (previousCommand === 's' || previousCommand === 'c') {
                    lastControlIn = last(last(path.paths).segments).controlIn();
                }
                for (var i = 0; i < parameters.length; i += 4) {
                    var controlIn = new Point(parameters[i], parameters[i + 1]);
                    var endPoint = new Point(parameters[i + 2], parameters[i + 3]);
                    var controlOut = void 0;
                    if (options.isRelative) {
                        controlIn.translateWith(position);
                        endPoint.translateWith(position);
                    }
                    if (lastControlIn) {
                        controlOut = reflectionPoint(lastControlIn, position);
                    } else {
                        controlOut = position.clone();
                    }
                    lastControlIn = controlIn;
                    path.curveTo(controlOut, controlIn, endPoint);
                    position.x = endPoint.x;
                    position.y = endPoint.y;
                }
            },
            q: function (path, options) {
                var parameters = options.parameters;
                var position = options.position;
                for (var i = 0; i < parameters.length; i += 4) {
                    var controlPoint = new Point(parameters[i], parameters[i + 1]);
                    var endPoint = new Point(parameters[i + 2], parameters[i + 3]);
                    if (options.isRelative) {
                        controlPoint.translateWith(position);
                        endPoint.translateWith(position);
                    }
                    var cubicControlPoints = quadraticToCubicControlPoints(position, controlPoint, endPoint);
                    path.curveTo(cubicControlPoints.controlOut, cubicControlPoints.controlIn, endPoint);
                    position.x = endPoint.x;
                    position.y = endPoint.y;
                }
            },
            t: function (path, options) {
                var parameters = options.parameters;
                var position = options.position;
                var previousCommand = options.previousCommand;
                var controlPoint;
                if (previousCommand === 'q' || previousCommand === 't') {
                    var lastSegment = last(last(path.paths).segments);
                    controlPoint = lastSegment.controlIn().clone().translateWith(position.scaleCopy(-1 / 3)).scale(3 / 2);
                }
                for (var i = 0; i < parameters.length; i += 2) {
                    var endPoint = new Point(parameters[i], parameters[i + 1]);
                    if (options.isRelative) {
                        endPoint.translateWith(position);
                    }
                    if (controlPoint) {
                        controlPoint = reflectionPoint(controlPoint, position);
                    } else {
                        controlPoint = position.clone();
                    }
                    var cubicControlPoints = quadraticToCubicControlPoints(position, controlPoint, endPoint);
                    path.curveTo(cubicControlPoints.controlOut, cubicControlPoints.controlIn, endPoint);
                    position.x = endPoint.x;
                    position.y = endPoint.y;
                }
            }
        };
        function toLineParamaters(parameters, isVertical, value) {
            var insertPosition = isVertical ? 0 : 1;
            for (var i = 0; i < parameters.length; i += 2) {
                parameters.splice(i + insertPosition, 0, value);
            }
        }
        function reflectionPoint(point, center) {
            if (point && center) {
                return center.scaleCopy(2).translate(-point.x, -point.y);
            }
        }
        var third = 1 / 3;
        function quadraticToCubicControlPoints(position, controlPoint, endPoint) {
            var scaledPoint = controlPoint.clone().scale(2 / 3);
            return {
                controlOut: scaledPoint.clone().translateWith(position.scaleCopy(third)),
                controlIn: scaledPoint.translateWith(endPoint.scaleCopy(third))
            };
        }
        var SEGMENT_REGEX = /([a-df-z]{1})([^a-df-z]*)(z)?/gi;
        var SPLIT_REGEX = /[,\s]?([+\-]?(?:\d*\.\d+|\d+)(?:[eE][+\-]?\d+)?)/g;
        var MOVE = 'm';
        var CLOSE = 'z';
        function parseParameters(str) {
            var parameters = [];
            str.replace(SPLIT_REGEX, function (match, number) {
                parameters.push(parseFloat(number));
            });
            return parameters;
        }
        var PathParser = Class.extend({
            parse: function (str, options) {
                var multiPath = new MultiPath(options);
                var position = new Point();
                var previousCommand;
                str.replace(SEGMENT_REGEX, function (match, element, params, closePath) {
                    var command = element.toLowerCase();
                    var isRelative = command === element;
                    var parameters = parseParameters(params.trim());
                    if (command === MOVE) {
                        if (isRelative) {
                            position.x += parameters[0];
                            position.y += parameters[1];
                        } else {
                            position.x = parameters[0];
                            position.y = parameters[1];
                        }
                        multiPath.moveTo(position.x, position.y);
                        if (parameters.length > 2) {
                            command = 'l';
                            parameters.splice(0, 2);
                        }
                    }
                    if (ShapeMap[command]) {
                        ShapeMap[command](multiPath, {
                            parameters: parameters,
                            position: position,
                            isRelative: isRelative,
                            previousCommand: previousCommand
                        });
                        if (closePath && closePath.toLowerCase() === CLOSE) {
                            multiPath.close();
                        }
                    } else if (command !== MOVE) {
                        throw new Error('Error while parsing SVG path. Unsupported command: ' + command);
                    }
                    previousCommand = command;
                });
                return multiPath;
            }
        });
        PathParser.current = new PathParser();
        Path.parse = function (str, options) {
            return PathParser.current.parse(str, options);
        };
        var SurfaceFactory = Class.extend({
            init: function () {
                this._items = [];
            },
            register: function (name, type, order) {
                var items = this._items;
                var first = items[0];
                var entry = {
                    name: name,
                    type: type,
                    order: order
                };
                if (!first || order < first.order) {
                    items.unshift(entry);
                } else {
                    items.push(entry);
                }
            },
            create: function (element, options) {
                var items = this._items;
                var match = items[0];
                if (options && options.type) {
                    var preferred = options.type.toLowerCase();
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].name === preferred) {
                            match = items[i];
                            break;
                        }
                    }
                }
                if (match) {
                    return new match.type(element, options);
                }
                kendo.logToConsole('Warning: Unable to create Kendo UI Drawing Surface. Possible causes:\n' + '- The browser does not support SVG and Canvas. User agent: ' + navigator.userAgent);
            }
        });
        SurfaceFactory.current = new SurfaceFactory();
        var events = [
            'click',
            'mouseenter',
            'mouseleave',
            'mousemove',
            'resize',
            'tooltipOpen',
            'tooltipClose'
        ];
        var Surface = kendo.Observable.extend({
            init: function (element, options) {
                kendo.Observable.fn.init.call(this);
                this.options = $.extend({}, options);
                this.element = element;
                this._click = this._handler('click');
                this._mouseenter = this._handler('mouseenter');
                this._mouseleave = this._handler('mouseleave');
                this._mousemove = this._handler('mousemove');
                this._visual = new Group();
                elementSize(element, this.options);
                this.bind(events, this.options);
                this._enableTracking();
            },
            draw: function (element) {
                this._visual.children.push(element);
            },
            clear: function () {
                this._visual.children = [];
            },
            destroy: function () {
                this._visual = null;
                this.unbind();
            },
            eventTarget: function (e) {
                var this$1 = this;
                var domNode = eventElement(e);
                var node;
                while (!node && domNode) {
                    node = domNode._kendoNode;
                    if (domNode === this$1.element) {
                        break;
                    }
                    domNode = domNode.parentElement;
                }
                if (node) {
                    return node.srcElement;
                }
            },
            exportVisual: function () {
                return this._visual;
            },
            getSize: function () {
                return elementSize(this.element);
            },
            currentSize: function (size) {
                if (size) {
                    this._size = size;
                } else {
                    return this._size;
                }
            },
            setSize: function (size) {
                elementSize(this.element, size);
                this.currentSize(size);
                this._resize();
            },
            resize: function (force) {
                var size = this.getSize();
                var currentSize = this.currentSize();
                if (force || (size.width > 0 || size.height > 0) && (!currentSize || size.width !== currentSize.width || size.height !== currentSize.height)) {
                    this.currentSize(size);
                    this._resize(size, force);
                    this.trigger('resize', size);
                }
            },
            size: function (value) {
                if (!value) {
                    return this.getSize();
                }
                this.setSize(value);
            },
            suspendTracking: function () {
                this._suspendedTracking = true;
            },
            resumeTracking: function () {
                this._suspendedTracking = false;
            },
            _enableTracking: function () {
            },
            _resize: function () {
            },
            _handler: function (eventName) {
                var this$1 = this;
                return function (e) {
                    var node = this$1.eventTarget(e);
                    if (node && !this$1._suspendedTracking) {
                        this$1.trigger(eventName, {
                            element: node,
                            originalEvent: e,
                            type: eventName
                        });
                    }
                };
            },
            _elementOffset: function () {
                var element = this.element;
                var ref = elementStyles(element, [
                    'paddingLeft',
                    'paddingTop'
                ]);
                var paddingLeft = ref.paddingLeft;
                var paddingTop = ref.paddingTop;
                var ref$1 = elementOffset(element);
                var left = ref$1.left;
                var top = ref$1.top;
                return {
                    left: left + parseInt(paddingLeft, 10),
                    top: top + parseInt(paddingTop, 10)
                };
            },
            _surfacePoint: function (e) {
                var offset = this._elementOffset();
                var coord = eventCoordinates(e);
                var x = coord.x - offset.left;
                var y = coord.y - offset.top;
                return new Point(x, y);
            }
        });
        Surface.create = function (element, options) {
            return SurfaceFactory.current.create(element, options);
        };
        Surface.support = {};
        var BaseNode = Class.extend({
            init: function (srcElement) {
                this.childNodes = [];
                this.parent = null;
                if (srcElement) {
                    this.srcElement = srcElement;
                    this.observe();
                }
            },
            destroy: function () {
                var this$1 = this;
                if (this.srcElement) {
                    this.srcElement.removeObserver(this);
                }
                var children = this.childNodes;
                for (var i = 0; i < children.length; i++) {
                    this$1.childNodes[i].destroy();
                }
                this.parent = null;
            },
            load: function () {
            },
            observe: function () {
                if (this.srcElement) {
                    this.srcElement.addObserver(this);
                }
            },
            append: function (node) {
                this.childNodes.push(node);
                node.parent = this;
            },
            insertAt: function (node, pos) {
                this.childNodes.splice(pos, 0, node);
                node.parent = this;
            },
            remove: function (index, count) {
                var this$1 = this;
                var end = index + count;
                for (var i = index; i < end; i++) {
                    this$1.childNodes[i].removeSelf();
                }
                this.childNodes.splice(index, count);
            },
            removeSelf: function () {
                this.clear();
                this.destroy();
            },
            clear: function () {
                this.remove(0, this.childNodes.length);
            },
            invalidate: function () {
                if (this.parent) {
                    this.parent.invalidate();
                }
            },
            geometryChange: function () {
                this.invalidate();
            },
            optionsChange: function () {
                this.invalidate();
            },
            childrenChange: function (e) {
                if (e.action === 'add') {
                    this.load(e.items, e.index);
                } else if (e.action === 'remove') {
                    this.remove(e.index, e.items.length);
                }
                this.invalidate();
            }
        });
        function renderAttr(name, value) {
            return defined(value) && value !== null ? ' ' + name + '=\'' + value + '\' ' : '';
        }
        function renderAllAttr(attrs) {
            var output = '';
            for (var i = 0; i < attrs.length; i++) {
                output += renderAttr(attrs[i][0], attrs[i][1]);
            }
            return output;
        }
        function renderStyle(attrs) {
            var output = '';
            for (var i = 0; i < attrs.length; i++) {
                var value = attrs[i][1];
                if (defined(value)) {
                    output += attrs[i][0] + ':' + value + ';';
                }
            }
            if (output !== '') {
                return output;
            }
        }
        var NODE_MAP = {};
        var SVG_NS = 'http://www.w3.org/2000/svg';
        var NONE = 'none';
        var renderSVG = function (container, svg) {
            container.innerHTML = svg;
        };
        if (typeof document !== 'undefined') {
            var testFragment = '<svg xmlns=\'' + SVG_NS + '\'></svg>';
            var testContainer = document.createElement('div');
            var hasParser = typeof DOMParser !== 'undefined';
            testContainer.innerHTML = testFragment;
            if (hasParser && testContainer.firstChild.namespaceURI !== SVG_NS) {
                renderSVG = function (container, svg) {
                    var parser = new DOMParser();
                    var chartDoc = parser.parseFromString(svg, 'text/xml');
                    var importedDoc = document.adoptNode(chartDoc.documentElement);
                    container.innerHTML = '';
                    container.appendChild(importedDoc);
                };
            }
        }
        var renderSVG$1 = renderSVG;
        var TRANSFORM = 'transform';
        var DefinitionMap = {
            clip: 'clip-path',
            fill: 'fill'
        };
        function isDefinition(type, value) {
            return type === 'clip' || type === 'fill' && (!value || value.nodeType === 'Gradient');
        }
        function baseUrl() {
            var base = document.getElementsByTagName('base')[0];
            var href = document.location.href;
            var hashIndex = href.indexOf('#');
            var url = '';
            if (base && !support.browser.msie) {
                if (hashIndex !== -1) {
                    href = href.substring(0, hashIndex);
                }
                url = href;
            }
            return url;
        }
        function refUrl(id) {
            return 'url(' + baseUrl() + '#' + id + ')';
        }
        var Node = BaseNode.extend({
            init: function (srcElement) {
                BaseNode.fn.init.call(this, srcElement);
                this.definitions = {};
            },
            destroy: function () {
                if (this.element) {
                    this.element._kendoNode = null;
                    this.element = null;
                }
                this.clearDefinitions();
                BaseNode.fn.destroy.call(this);
            },
            load: function (elements, pos) {
                var this$1 = this;
                for (var i = 0; i < elements.length; i++) {
                    var srcElement = elements[i];
                    var children = srcElement.children;
                    var childNode = new NODE_MAP[srcElement.nodeType](srcElement);
                    if (defined(pos)) {
                        this$1.insertAt(childNode, pos);
                    } else {
                        this$1.append(childNode);
                    }
                    childNode.createDefinitions();
                    if (children && children.length > 0) {
                        childNode.load(children);
                    }
                    var element = this$1.element;
                    if (element) {
                        childNode.attachTo(element, pos);
                    }
                }
            },
            root: function () {
                var root = this;
                while (root.parent) {
                    root = root.parent;
                }
                return root;
            },
            attachTo: function (domElement, pos) {
                var container = document.createElement('div');
                renderSVG$1(container, '<svg xmlns=\'' + SVG_NS + '\' version=\'1.1\'>' + this.render() + '</svg>');
                var element = container.firstChild.firstChild;
                if (element) {
                    if (defined(pos)) {
                        domElement.insertBefore(element, domElement.childNodes[pos] || null);
                    } else {
                        domElement.appendChild(element);
                    }
                    this.setElement(element);
                }
            },
            setElement: function (element) {
                if (this.element) {
                    this.element._kendoNode = null;
                }
                this.element = element;
                this.element._kendoNode = this;
                var nodes = this.childNodes;
                for (var i = 0; i < nodes.length; i++) {
                    var childElement = element.childNodes[i];
                    nodes[i].setElement(childElement);
                }
            },
            clear: function () {
                this.clearDefinitions();
                if (this.element) {
                    this.element.innerHTML = '';
                }
                var children = this.childNodes;
                for (var i = 0; i < children.length; i++) {
                    children[i].destroy();
                }
                this.childNodes = [];
            },
            removeSelf: function () {
                if (this.element) {
                    var parentNode = this.element.parentNode;
                    if (parentNode) {
                        parentNode.removeChild(this.element);
                    }
                    this.element = null;
                }
                BaseNode.fn.removeSelf.call(this);
            },
            template: function () {
                return this.renderChildren();
            },
            render: function () {
                return this.template();
            },
            renderChildren: function () {
                var nodes = this.childNodes;
                var output = '';
                for (var i = 0; i < nodes.length; i++) {
                    output += nodes[i].render();
                }
                return output;
            },
            optionsChange: function (e) {
                var field = e.field;
                var value = e.value;
                if (field === 'visible') {
                    this.css('display', value ? '' : NONE);
                } else if (DefinitionMap[field] && isDefinition(field, value)) {
                    this.updateDefinition(field, value);
                } else if (field === 'opacity') {
                    this.attr('opacity', value);
                } else if (field === 'cursor') {
                    this.css('cursor', value);
                }
                BaseNode.fn.optionsChange.call(this, e);
            },
            attr: function (name, value) {
                if (this.element) {
                    this.element.setAttribute(name, value);
                }
            },
            allAttr: function (attrs) {
                var this$1 = this;
                for (var i = 0; i < attrs.length; i++) {
                    this$1.attr(attrs[i][0], attrs[i][1]);
                }
            },
            css: function (name, value) {
                if (this.element) {
                    this.element.style[name] = value;
                }
            },
            allCss: function (styles) {
                var this$1 = this;
                for (var i = 0; i < styles.length; i++) {
                    this$1.css(styles[i][0], styles[i][1]);
                }
            },
            removeAttr: function (name) {
                if (this.element) {
                    this.element.removeAttribute(name);
                }
            },
            mapTransform: function (transform) {
                var attrs = [];
                if (transform) {
                    attrs.push([
                        TRANSFORM,
                        'matrix(' + transform.matrix().toString(6) + ')'
                    ]);
                }
                return attrs;
            },
            renderTransform: function () {
                return renderAllAttr(this.mapTransform(this.srcElement.transform()));
            },
            transformChange: function (value) {
                if (value) {
                    this.allAttr(this.mapTransform(value));
                } else {
                    this.removeAttr(TRANSFORM);
                }
            },
            mapStyle: function () {
                var options = this.srcElement.options;
                var style = [[
                        'cursor',
                        options.cursor
                    ]];
                if (options.visible === false) {
                    style.push([
                        'display',
                        NONE
                    ]);
                }
                return style;
            },
            renderStyle: function () {
                return renderAttr('style', renderStyle(this.mapStyle(true)));
            },
            renderOpacity: function () {
                return renderAttr('opacity', this.srcElement.options.opacity);
            },
            createDefinitions: function () {
                var srcElement = this.srcElement;
                var definitions = this.definitions;
                if (srcElement) {
                    var options = srcElement.options;
                    var hasDefinitions;
                    for (var field in DefinitionMap) {
                        var definition = options.get(field);
                        if (definition && isDefinition(field, definition)) {
                            definitions[field] = definition;
                            hasDefinitions = true;
                        }
                    }
                    if (hasDefinitions) {
                        this.definitionChange({
                            action: 'add',
                            definitions: definitions
                        });
                    }
                }
            },
            definitionChange: function (e) {
                if (this.parent) {
                    this.parent.definitionChange(e);
                }
            },
            updateDefinition: function (type, value) {
                var definitions = this.definitions;
                var current = definitions[type];
                var attr = DefinitionMap[type];
                var definition = {};
                if (current) {
                    definition[type] = current;
                    this.definitionChange({
                        action: 'remove',
                        definitions: definition
                    });
                    delete definitions[type];
                }
                if (!value) {
                    if (current) {
                        this.removeAttr(attr);
                    }
                } else {
                    definition[type] = value;
                    this.definitionChange({
                        action: 'add',
                        definitions: definition
                    });
                    definitions[type] = value;
                    this.attr(attr, refUrl(value.id));
                }
            },
            clearDefinitions: function () {
                var definitions = this.definitions;
                this.definitionChange({
                    action: 'remove',
                    definitions: definitions
                });
                this.definitions = {};
            },
            renderDefinitions: function () {
                return renderAllAttr(this.mapDefinitions());
            },
            mapDefinitions: function () {
                var definitions = this.definitions;
                var attrs = [];
                for (var field in definitions) {
                    attrs.push([
                        DefinitionMap[field],
                        refUrl(definitions[field].id)
                    ]);
                }
                return attrs;
            }
        });
        var GradientStopNode = Node.extend({
            template: function () {
                return '<stop ' + this.renderOffset() + ' ' + this.renderStyle() + ' />';
            },
            renderOffset: function () {
                return renderAttr('offset', this.srcElement.offset());
            },
            mapStyle: function () {
                var srcElement = this.srcElement;
                return [
                    [
                        'stop-color',
                        srcElement.color()
                    ],
                    [
                        'stop-opacity',
                        srcElement.opacity()
                    ]
                ];
            },
            optionsChange: function (e) {
                if (e.field === 'offset') {
                    this.attr(e.field, e.value);
                } else if (e.field === 'color' || e.field === 'opacity') {
                    this.css('stop-' + e.field, e.value);
                }
            }
        });
        var GradientNode = Node.extend({
            init: function (srcElement) {
                Node.fn.init.call(this, srcElement);
                this.id = srcElement.id;
                this.loadStops();
            },
            loadStops: function () {
                var this$1 = this;
                var stops = this.srcElement.stops;
                var element = this.element;
                for (var idx = 0; idx < stops.length; idx++) {
                    var stopNode = new GradientStopNode(stops[idx]);
                    this$1.append(stopNode);
                    if (element) {
                        stopNode.attachTo(element);
                    }
                }
            },
            optionsChange: function (e) {
                if (e.field === 'gradient.stops') {
                    BaseNode.prototype.clear.call(this);
                    this.loadStops();
                } else if (e.field === 'gradient') {
                    this.allAttr(this.mapCoordinates());
                }
            },
            renderCoordinates: function () {
                return renderAllAttr(this.mapCoordinates());
            },
            mapSpace: function () {
                return [
                    'gradientUnits',
                    this.srcElement.userSpace() ? 'userSpaceOnUse' : 'objectBoundingBox'
                ];
            }
        });
        var LinearGradientNode = GradientNode.extend({
            template: function () {
                return '<linearGradient id=\'' + this.id + '\' ' + this.renderCoordinates() + '>' + this.renderChildren() + '</linearGradient>';
            },
            mapCoordinates: function () {
                var srcElement = this.srcElement;
                var start = srcElement.start();
                var end = srcElement.end();
                var attrs = [
                    [
                        'x1',
                        start.x
                    ],
                    [
                        'y1',
                        start.y
                    ],
                    [
                        'x2',
                        end.x
                    ],
                    [
                        'y2',
                        end.y
                    ],
                    this.mapSpace()
                ];
                return attrs;
            }
        });
        var RadialGradientNode = GradientNode.extend({
            template: function () {
                return '<radialGradient id=\'' + this.id + '\' ' + this.renderCoordinates() + '>' + this.renderChildren() + '</radialGradient>';
            },
            mapCoordinates: function () {
                var srcElement = this.srcElement;
                var center = srcElement.center();
                var radius = srcElement.radius();
                var attrs = [
                    [
                        'cx',
                        center.x
                    ],
                    [
                        'cy',
                        center.y
                    ],
                    [
                        'r',
                        radius
                    ],
                    this.mapSpace()
                ];
                return attrs;
            }
        });
        var ClipNode = Node.extend({
            init: function (srcElement) {
                Node.fn.init.call(this);
                this.srcElement = srcElement;
                this.id = srcElement.id;
                this.load([srcElement]);
            },
            template: function () {
                return '<clipPath id=\'' + this.id + '\'>' + this.renderChildren() + '</clipPath>';
            }
        });
        var DefinitionNode = Node.extend({
            init: function () {
                Node.fn.init.call(this);
                this.definitionMap = {};
            },
            attachTo: function (domElement) {
                this.element = domElement;
            },
            template: function () {
                return '<defs>' + this.renderChildren() + '</defs>';
            },
            definitionChange: function (e) {
                var definitions = e.definitions;
                var action = e.action;
                if (action === 'add') {
                    this.addDefinitions(definitions);
                } else if (action === 'remove') {
                    this.removeDefinitions(definitions);
                }
            },
            createDefinition: function (type, item) {
                var nodeType;
                if (type === 'clip') {
                    nodeType = ClipNode;
                } else if (type === 'fill') {
                    if (item instanceof LinearGradient) {
                        nodeType = LinearGradientNode;
                    } else if (item instanceof RadialGradient) {
                        nodeType = RadialGradientNode;
                    }
                }
                return new nodeType(item);
            },
            addDefinitions: function (definitions) {
                var this$1 = this;
                for (var field in definitions) {
                    this$1.addDefinition(field, definitions[field]);
                }
            },
            addDefinition: function (type, srcElement) {
                var ref = this;
                var element = ref.element;
                var definitionMap = ref.definitionMap;
                var id = srcElement.id;
                var mapItem = definitionMap[id];
                if (!mapItem) {
                    var node = this.createDefinition(type, srcElement);
                    definitionMap[id] = {
                        element: node,
                        count: 1
                    };
                    this.append(node);
                    if (element) {
                        node.attachTo(this.element);
                    }
                } else {
                    mapItem.count++;
                }
            },
            removeDefinitions: function (definitions) {
                var this$1 = this;
                for (var field in definitions) {
                    this$1.removeDefinition(definitions[field]);
                }
            },
            removeDefinition: function (srcElement) {
                var definitionMap = this.definitionMap;
                var id = srcElement.id;
                var mapItem = definitionMap[id];
                if (mapItem) {
                    mapItem.count--;
                    if (mapItem.count === 0) {
                        this.remove(this.childNodes.indexOf(mapItem.element), 1);
                        delete definitionMap[id];
                    }
                }
            }
        });
        var RootNode = Node.extend({
            init: function (options) {
                Node.fn.init.call(this);
                this.options = options;
                this.defs = new DefinitionNode();
            },
            attachTo: function (domElement) {
                this.element = domElement;
                this.defs.attachTo(domElement.firstElementChild);
            },
            clear: function () {
                BaseNode.prototype.clear.call(this);
            },
            template: function () {
                return this.defs.render() + this.renderChildren();
            },
            definitionChange: function (e) {
                this.defs.definitionChange(e);
            }
        });
        function alignToScreen(element) {
            var ctm;
            try {
                ctm = element.getScreenCTM ? element.getScreenCTM() : null;
            } catch (e) {
            }
            if (ctm) {
                var left = -ctm.e % 1;
                var top = -ctm.f % 1;
                var style = element.style;
                if (left !== 0 || top !== 0) {
                    style.left = left + 'px';
                    style.top = top + 'px';
                }
            }
        }
        var Surface$1 = Surface.extend({
            init: function (element, options) {
                Surface.fn.init.call(this, element, options);
                this._root = new RootNode(this.options);
                renderSVG$1(this.element, this._template());
                this._rootElement = this.element.firstElementChild;
                alignToScreen(this._rootElement);
                this._root.attachTo(this._rootElement);
                bindEvents(this.element, {
                    click: this._click,
                    mouseover: this._mouseenter,
                    mouseout: this._mouseleave,
                    mousemove: this._mousemove
                });
                this.resize();
            },
            destroy: function () {
                if (this._root) {
                    this._root.destroy();
                    this._root = null;
                    this._rootElement = null;
                    unbindEvents(this.element, {
                        click: this._click,
                        mouseover: this._mouseenter,
                        mouseout: this._mouseleave,
                        mousemove: this._mousemove
                    });
                }
                Surface.fn.destroy.call(this);
            },
            translate: function (offset) {
                var viewBox = Math.round(offset.x) + ' ' + Math.round(offset.y) + ' ' + this._size.width + ' ' + this._size.height;
                this._offset = offset;
                this._rootElement.setAttribute('viewBox', viewBox);
            },
            draw: function (element) {
                Surface.fn.draw.call(this, element);
                this._root.load([element]);
            },
            clear: function () {
                Surface.fn.clear.call(this);
                this._root.clear();
            },
            svg: function () {
                return '<?xml version=\'1.0\' ?>' + this._template();
            },
            exportVisual: function () {
                var ref = this;
                var visual = ref._visual;
                var offset = ref._offset;
                if (offset) {
                    var wrap = new Group();
                    wrap.children.push(visual);
                    wrap.transform(transform().translate(-offset.x, -offset.y));
                    visual = wrap;
                }
                return visual;
            },
            _resize: function () {
                if (this._offset) {
                    this.translate(this._offset);
                }
            },
            _template: function () {
                return '<svg style=\'width: 100%; height: 100%; overflow: hidden;\' xmlns=\'' + SVG_NS + '\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' version=\'1.1\'>' + this._root.render() + '</svg>';
            }
        });
        Surface$1.prototype.type = 'svg';
        if (typeof document !== 'undefined' && document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1')) {
            Surface.support.svg = true;
            SurfaceFactory.current.register('svg', Surface$1, 10);
        }
        var GroupNode = Node.extend({
            template: function () {
                return '<g' + (this.renderTransform() + this.renderStyle() + this.renderOpacity() + this.renderDefinitions()) + '>' + this.renderChildren() + '</g>';
            },
            optionsChange: function (e) {
                if (e.field === 'transform') {
                    this.transformChange(e.value);
                }
                Node.fn.optionsChange.call(this, e);
            }
        });
        NODE_MAP.Group = GroupNode;
        var DASH_ARRAYS = {
            dot: [
                1.5,
                3.5
            ],
            dash: [
                4,
                3.5
            ],
            longdash: [
                8,
                3.5
            ],
            dashdot: [
                3.5,
                3.5,
                1.5,
                3.5
            ],
            longdashdot: [
                8,
                3.5,
                1.5,
                3.5
            ],
            longdashdotdot: [
                8,
                3.5,
                1.5,
                3.5,
                1.5,
                3.5
            ]
        };
        var SOLID = 'solid';
        var BUTT = 'butt';
        var ATTRIBUTE_MAP = {
            'fill.opacity': 'fill-opacity',
            'stroke.color': 'stroke',
            'stroke.width': 'stroke-width',
            'stroke.opacity': 'stroke-opacity'
        };
        var SPACE = ' ';
        var PathNode = Node.extend({
            geometryChange: function () {
                this.attr('d', this.renderData());
                this.invalidate();
            },
            optionsChange: function (e) {
                switch (e.field) {
                case 'fill':
                    if (e.value) {
                        this.allAttr(this.mapFill(e.value));
                    } else {
                        this.removeAttr('fill');
                    }
                    break;
                case 'fill.color':
                    this.allAttr(this.mapFill({ color: e.value }));
                    break;
                case 'stroke':
                    if (e.value) {
                        this.allAttr(this.mapStroke(e.value));
                    } else {
                        this.removeAttr('stroke');
                    }
                    break;
                case 'transform':
                    this.transformChange(e.value);
                    break;
                default:
                    var name = ATTRIBUTE_MAP[e.field];
                    if (name) {
                        this.attr(name, e.value);
                    }
                    break;
                }
                Node.fn.optionsChange.call(this, e);
            },
            content: function () {
                if (this.element) {
                    this.element.textContent = this.srcElement.content();
                }
            },
            renderData: function () {
                return this.printPath(this.srcElement);
            },
            printPath: function (path) {
                var this$1 = this;
                var segments = path.segments;
                var length = segments.length;
                if (length > 0) {
                    var parts = [];
                    var output, currentType;
                    for (var i = 1; i < length; i++) {
                        var segmentType = this$1.segmentType(segments[i - 1], segments[i]);
                        if (segmentType !== currentType) {
                            currentType = segmentType;
                            parts.push(segmentType);
                        }
                        if (segmentType === 'L') {
                            parts.push(this$1.printPoints(segments[i].anchor()));
                        } else {
                            parts.push(this$1.printPoints(segments[i - 1].controlOut(), segments[i].controlIn(), segments[i].anchor()));
                        }
                    }
                    output = 'M' + this.printPoints(segments[0].anchor()) + SPACE + parts.join(SPACE);
                    if (path.options.closed) {
                        output += 'Z';
                    }
                    return output;
                }
            },
            printPoints: function () {
                var points = arguments;
                var length = points.length;
                var result = [];
                for (var i = 0; i < length; i++) {
                    result.push(points[i].toString(3));
                }
                return result.join(' ');
            },
            segmentType: function (segmentStart, segmentEnd) {
                return segmentStart.controlOut() && segmentEnd.controlIn() ? 'C' : 'L';
            },
            mapStroke: function (stroke) {
                var attrs = [];
                if (stroke && !isTransparent(stroke.color)) {
                    attrs.push([
                        'stroke',
                        stroke.color
                    ]);
                    attrs.push([
                        'stroke-width',
                        stroke.width
                    ]);
                    attrs.push([
                        'stroke-linecap',
                        this.renderLinecap(stroke)
                    ]);
                    attrs.push([
                        'stroke-linejoin',
                        stroke.lineJoin
                    ]);
                    if (defined(stroke.opacity)) {
                        attrs.push([
                            'stroke-opacity',
                            stroke.opacity
                        ]);
                    }
                    if (defined(stroke.dashType)) {
                        attrs.push([
                            'stroke-dasharray',
                            this.renderDashType(stroke)
                        ]);
                    }
                } else {
                    attrs.push([
                        'stroke',
                        NONE
                    ]);
                }
                return attrs;
            },
            renderStroke: function () {
                return renderAllAttr(this.mapStroke(this.srcElement.options.stroke));
            },
            renderDashType: function (stroke) {
                var dashType = stroke.dashType;
                var width = stroke.width;
                if (width === void 0) {
                    width = 1;
                }
                if (dashType && dashType !== SOLID) {
                    var dashArray = DASH_ARRAYS[dashType.toLowerCase()];
                    var result = [];
                    for (var i = 0; i < dashArray.length; i++) {
                        result.push(dashArray[i] * width);
                    }
                    return result.join(' ');
                }
            },
            renderLinecap: function (stroke) {
                var dashType = stroke.dashType;
                var lineCap = stroke.lineCap;
                return dashType && dashType !== 'solid' ? BUTT : lineCap;
            },
            mapFill: function (fill) {
                var attrs = [];
                if (!(fill && fill.nodeType === 'Gradient')) {
                    if (fill && !isTransparent(fill.color)) {
                        attrs.push([
                            'fill',
                            fill.color
                        ]);
                        if (defined(fill.opacity)) {
                            attrs.push([
                                'fill-opacity',
                                fill.opacity
                            ]);
                        }
                    } else {
                        attrs.push([
                            'fill',
                            NONE
                        ]);
                    }
                }
                return attrs;
            },
            renderFill: function () {
                return renderAllAttr(this.mapFill(this.srcElement.options.fill));
            },
            template: function () {
                return '<path ' + this.renderStyle() + ' ' + this.renderOpacity() + ' ' + renderAttr('d', this.renderData()) + '' + this.renderStroke() + this.renderFill() + this.renderDefinitions() + this.renderTransform() + '></path>';
            }
        });
        NODE_MAP.Path = PathNode;
        var ArcNode = PathNode.extend({
            renderData: function () {
                return this.printPath(this.srcElement.toPath());
            }
        });
        NODE_MAP.Arc = ArcNode;
        var CircleNode = PathNode.extend({
            geometryChange: function () {
                var center = this.center();
                this.attr('cx', center.x);
                this.attr('cy', center.y);
                this.attr('r', this.radius());
                this.invalidate();
            },
            center: function () {
                return this.srcElement.geometry().center;
            },
            radius: function () {
                return this.srcElement.geometry().radius;
            },
            template: function () {
                return '<circle ' + this.renderStyle() + ' ' + this.renderOpacity() + 'cx=\'' + this.center().x + '\' cy=\'' + this.center().y + '\' r=\'' + this.radius() + '\'' + this.renderStroke() + ' ' + this.renderFill() + ' ' + this.renderDefinitions() + this.renderTransform() + ' ></circle>';
            }
        });
        NODE_MAP.Circle = CircleNode;
        var RectNode = PathNode.extend({
            geometryChange: function () {
                var geometry = this.srcElement.geometry();
                this.attr('x', geometry.origin.x);
                this.attr('y', geometry.origin.y);
                this.attr('width', geometry.size.width);
                this.attr('height', geometry.size.height);
                this.invalidate();
            },
            size: function () {
                return this.srcElement.geometry().size;
            },
            origin: function () {
                return this.srcElement.geometry().origin;
            },
            template: function () {
                return '<rect ' + this.renderStyle() + ' ' + this.renderOpacity() + ' x=\'' + this.origin().x + '\' y=\'' + this.origin().y + '\' ' + 'width=\'' + this.size().width + '\' height=\'' + this.size().height + '\' ' + this.renderStroke() + ' ' + this.renderFill() + ' ' + this.renderDefinitions() + ' ' + this.renderTransform() + ' />';
            }
        });
        NODE_MAP.Rect = RectNode;
        var ImageNode = PathNode.extend({
            geometryChange: function () {
                this.allAttr(this.mapPosition());
                this.invalidate();
            },
            optionsChange: function (e) {
                if (e.field === 'src') {
                    this.allAttr(this.mapSource());
                }
                PathNode.fn.optionsChange.call(this, e);
            },
            mapPosition: function () {
                var rect = this.srcElement.rect();
                var tl = rect.topLeft();
                return [
                    [
                        'x',
                        tl.x
                    ],
                    [
                        'y',
                        tl.y
                    ],
                    [
                        'width',
                        rect.width() + 'px'
                    ],
                    [
                        'height',
                        rect.height() + 'px'
                    ]
                ];
            },
            renderPosition: function () {
                return renderAllAttr(this.mapPosition());
            },
            mapSource: function (encode) {
                var src = this.srcElement.src();
                if (encode) {
                    src = kendo.htmlEncode(src);
                }
                return [[
                        'xlink:href',
                        src
                    ]];
            },
            renderSource: function () {
                return renderAllAttr(this.mapSource(true));
            },
            template: function () {
                return '<image preserveAspectRatio=\'none\' ' + this.renderStyle() + ' ' + this.renderTransform() + ' ' + this.renderOpacity() + this.renderPosition() + ' ' + this.renderSource() + ' ' + this.renderDefinitions() + '>' + '</image>';
            }
        });
        NODE_MAP.Image = ImageNode;
        function decodeEntities(text) {
            if (!text || !text.indexOf || text.indexOf('&') < 0) {
                return text;
            }
            var element = decodeEntities._element;
            element.innerHTML = text;
            return element.textContent || element.innerText;
        }
        if (typeof document !== 'undefined') {
            decodeEntities._element = document.createElement('span');
        }
        var TextNode = PathNode.extend({
            geometryChange: function () {
                var pos = this.pos();
                this.attr('x', pos.x);
                this.attr('y', pos.y);
                this.invalidate();
            },
            optionsChange: function (e) {
                if (e.field === 'font') {
                    this.attr('style', renderStyle(this.mapStyle()));
                    this.geometryChange();
                } else if (e.field === 'content') {
                    PathNode.fn.content.call(this, this.srcElement.content());
                }
                PathNode.fn.optionsChange.call(this, e);
            },
            mapStyle: function (encode) {
                var style = PathNode.fn.mapStyle.call(this, encode);
                var font = this.srcElement.options.font;
                if (encode) {
                    font = kendo.htmlEncode(font);
                }
                style.push([
                    'font',
                    font
                ]);
                return style;
            },
            pos: function () {
                var pos = this.srcElement.position();
                var size = this.srcElement.measure();
                return pos.clone().setY(pos.y + size.baseline);
            },
            renderContent: function () {
                var content = this.srcElement.content();
                content = decodeEntities(content);
                content = kendo.htmlEncode(content);
                return content;
            },
            template: function () {
                return '<text ' + this.renderStyle() + ' ' + this.renderOpacity() + ' x=\'' + this.pos().x + '\' y=\'' + this.pos().y + '\'' + this.renderStroke() + ' ' + this.renderTransform() + ' ' + this.renderDefinitions() + this.renderFill() + '>' + this.renderContent() + '</text>';
            }
        });
        NODE_MAP.Text = TextNode;
        var MultiPathNode = PathNode.extend({
            renderData: function () {
                var this$1 = this;
                var paths = this.srcElement.paths;
                if (paths.length > 0) {
                    var result = [];
                    for (var i = 0; i < paths.length; i++) {
                        result.push(this$1.printPath(paths[i]));
                    }
                    return result.join(' ');
                }
            }
        });
        NODE_MAP.MultiPath = MultiPathNode;
        var geometry = {
            Circle: Circle$2,
            Arc: Arc$2,
            Rect: Rect,
            Point: Point,
            Segment: Segment,
            Matrix: Matrix,
            Size: Size,
            toMatrix: toMatrix,
            Transformation: Transformation,
            transform: transform
        };
        function exportGroup(group) {
            var root = new RootNode();
            var bbox = group.clippedBBox();
            var rootGroup = group;
            if (bbox) {
                var origin = bbox.getOrigin();
                var exportRoot = new Group();
                exportRoot.transform(transform().translate(-origin.x, -origin.y));
                exportRoot.children.push(group);
                rootGroup = exportRoot;
            }
            root.load([rootGroup]);
            var svg = '<?xml version=\'1.0\' ?><svg xmlns=\'' + SVG_NS + '\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' version=\'1.1\'>' + root.render() + '</svg>';
            root.destroy();
            return svg;
        }
        var svg = {
            Surface: Surface$1,
            RootNode: RootNode,
            Node: Node,
            GroupNode: GroupNode,
            ArcNode: ArcNode,
            CircleNode: CircleNode,
            RectNode: RectNode,
            ImageNode: ImageNode,
            TextNode: TextNode,
            PathNode: PathNode,
            MultiPathNode: MultiPathNode,
            DefinitionNode: DefinitionNode,
            ClipNode: ClipNode,
            GradientStopNode: GradientStopNode,
            LinearGradientNode: LinearGradientNode,
            RadialGradientNode: RadialGradientNode,
            exportGroup: exportGroup
        };
        var NODE_MAP$2 = {};
        function renderPath(ctx, path) {
            var segments = path.segments;
            if (segments.length === 0) {
                return;
            }
            var segment = segments[0];
            var anchor = segment.anchor();
            ctx.moveTo(anchor.x, anchor.y);
            for (var i = 1; i < segments.length; i++) {
                segment = segments[i];
                anchor = segment.anchor();
                var prevSeg = segments[i - 1];
                var prevOut = prevSeg.controlOut();
                var controlIn = segment.controlIn();
                if (prevOut && controlIn) {
                    ctx.bezierCurveTo(prevOut.x, prevOut.y, controlIn.x, controlIn.y, anchor.x, anchor.y);
                } else {
                    ctx.lineTo(anchor.x, anchor.y);
                }
            }
            if (path.options.closed) {
                ctx.closePath();
            }
        }
        var Node$2 = BaseNode.extend({
            init: function (srcElement) {
                BaseNode.fn.init.call(this, srcElement);
                if (srcElement) {
                    this.initClip();
                }
            },
            initClip: function () {
                var clip = this.srcElement.clip();
                if (clip) {
                    this.clip = clip;
                    clip.addObserver(this);
                }
            },
            clear: function () {
                if (this.srcElement) {
                    this.srcElement.removeObserver(this);
                }
                this.clearClip();
                BaseNode.fn.clear.call(this);
            },
            clearClip: function () {
                if (this.clip) {
                    this.clip.removeObserver(this);
                    delete this.clip;
                }
            },
            setClip: function (ctx) {
                if (this.clip) {
                    ctx.beginPath();
                    renderPath(ctx, this.clip);
                    ctx.clip();
                }
            },
            optionsChange: function (e) {
                if (e.field === 'clip') {
                    this.clearClip();
                    this.initClip();
                }
                BaseNode.fn.optionsChange.call(this, e);
            },
            setTransform: function (ctx) {
                if (this.srcElement) {
                    var transform = this.srcElement.transform();
                    if (transform) {
                        ctx.transform.apply(ctx, transform.matrix().toArray(6));
                    }
                }
            },
            loadElements: function (elements, pos, cors) {
                var this$1 = this;
                for (var i = 0; i < elements.length; i++) {
                    var srcElement = elements[i];
                    var children = srcElement.children;
                    var childNode = new NODE_MAP$2[srcElement.nodeType](srcElement, cors);
                    if (children && children.length > 0) {
                        childNode.load(children, pos, cors);
                    }
                    if (defined(pos)) {
                        this$1.insertAt(childNode, pos);
                    } else {
                        this$1.append(childNode);
                    }
                }
            },
            load: function (elements, pos, cors) {
                this.loadElements(elements, pos, cors);
                this.invalidate();
            },
            setOpacity: function (ctx) {
                if (this.srcElement) {
                    var opacity = this.srcElement.opacity();
                    if (defined(opacity)) {
                        this.globalAlpha(ctx, opacity);
                    }
                }
            },
            globalAlpha: function (ctx, value) {
                var opactity = value;
                if (opactity && ctx.globalAlpha) {
                    opactity *= ctx.globalAlpha;
                }
                ctx.globalAlpha = opactity;
            },
            visible: function () {
                var src = this.srcElement;
                return !src || src && src.options.visible !== false;
            }
        });
        var GroupNode$2 = Node$2.extend({
            renderTo: function (ctx) {
                if (!this.visible()) {
                    return;
                }
                ctx.save();
                this.setTransform(ctx);
                this.setClip(ctx);
                this.setOpacity(ctx);
                var childNodes = this.childNodes;
                for (var i = 0; i < childNodes.length; i++) {
                    var child = childNodes[i];
                    if (child.visible()) {
                        child.renderTo(ctx);
                    }
                }
                ctx.restore();
            }
        });
        Traversable.extend(GroupNode$2.prototype, 'childNodes');
        NODE_MAP$2.Group = GroupNode$2;
        var FRAME_DELAY = 1000 / 60;
        var RootNode$2 = GroupNode$2.extend({
            init: function (canvas) {
                GroupNode$2.fn.init.call(this);
                this.canvas = canvas;
                this.ctx = canvas.getContext('2d');
                var invalidateHandler = this._invalidate.bind(this);
                this.invalidate = kendo.throttle(function () {
                    kendo.animationFrame(invalidateHandler);
                }, FRAME_DELAY);
            },
            destroy: function () {
                GroupNode$2.fn.destroy.call(this);
                this.canvas = null;
                this.ctx = null;
            },
            load: function (elements, pos, cors) {
                this.loadElements(elements, pos, cors);
                this._invalidate();
            },
            _invalidate: function () {
                if (!this.ctx) {
                    return;
                }
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.renderTo(this.ctx);
            }
        });
        Traversable.extend(RootNode$2.prototype, 'childNodes');
        var QuadRoot = Class.extend({
            init: function () {
                this.shapes = [];
            },
            _add: function (shape, bbox) {
                this.shapes.push({
                    bbox: bbox,
                    shape: shape
                });
                shape._quadNode = this;
            },
            pointShapes: function (point) {
                var shapes = this.shapes;
                var length = shapes.length;
                var result = [];
                for (var idx = 0; idx < length; idx++) {
                    if (shapes[idx].bbox.containsPoint(point)) {
                        result.push(shapes[idx].shape);
                    }
                }
                return result;
            },
            insert: function (shape, bbox) {
                this._add(shape, bbox);
            },
            remove: function (shape) {
                var shapes = this.shapes;
                var length = shapes.length;
                for (var idx = 0; idx < length; idx++) {
                    if (shapes[idx].shape === shape) {
                        shapes.splice(idx, 1);
                        break;
                    }
                }
            }
        });
        var QuadNode = QuadRoot.extend({
            init: function (rect) {
                QuadRoot.fn.init.call(this);
                this.children = [];
                this.rect = rect;
            },
            inBounds: function (rect) {
                var nodeRect = this.rect;
                var nodeBottomRight = nodeRect.bottomRight();
                var bottomRight = rect.bottomRight();
                var inBounds = nodeRect.origin.x <= rect.origin.x && nodeRect.origin.y <= rect.origin.y && bottomRight.x <= nodeBottomRight.x && bottomRight.y <= nodeBottomRight.y;
                return inBounds;
            },
            pointShapes: function (point) {
                var children = this.children;
                var length = children.length;
                var result = QuadRoot.fn.pointShapes.call(this, point);
                for (var idx = 0; idx < length; idx++) {
                    append(result, children[idx].pointShapes(point));
                }
                return result;
            },
            insert: function (shape, bbox) {
                var children = this.children;
                var inserted = false;
                if (this.inBounds(bbox)) {
                    if (this.shapes.length < 4) {
                        this._add(shape, bbox);
                    } else {
                        if (!children.length) {
                            this._initChildren();
                        }
                        for (var idx = 0; idx < children.length; idx++) {
                            if (children[idx].insert(shape, bbox)) {
                                inserted = true;
                                break;
                            }
                        }
                        if (!inserted) {
                            this._add(shape, bbox);
                        }
                    }
                    inserted = true;
                }
                return inserted;
            },
            _initChildren: function () {
                var ref = this;
                var rect = ref.rect;
                var children = ref.children;
                var center = rect.center();
                var halfWidth = rect.width() / 2;
                var halfHeight = rect.height() / 2;
                children.push(new QuadNode(new Rect([
                    rect.origin.x,
                    rect.origin.y
                ], [
                    halfWidth,
                    halfHeight
                ])), new QuadNode(new Rect([
                    center.x,
                    rect.origin.y
                ], [
                    halfWidth,
                    halfHeight
                ])), new QuadNode(new Rect([
                    rect.origin.x,
                    center.y
                ], [
                    halfWidth,
                    halfHeight
                ])), new QuadNode(new Rect([
                    center.x,
                    center.y
                ], [
                    halfWidth,
                    halfHeight
                ])));
            }
        });
        var ROOT_SIZE = 3000;
        var LEVEL_STEP = 10000;
        var MAX_LEVEL = 75;
        var ShapesQuadTree = Class.extend({
            init: function () {
                this.initRoots();
            },
            initRoots: function () {
                this.rootMap = {};
                this.root = new QuadRoot();
                this.rootElements = [];
            },
            clear: function () {
                var this$1 = this;
                var rootElements = this.rootElements;
                for (var idx = 0; idx < rootElements.length; idx++) {
                    this$1.remove(rootElements[idx]);
                }
                this.initRoots();
            },
            pointShape: function (point) {
                var sectorRoot = (this.rootMap[Math.floor(point.x / ROOT_SIZE)] || {})[Math.floor(point.y / ROOT_SIZE)];
                var result = this.root.pointShapes(point);
                if (sectorRoot) {
                    result = result.concat(sectorRoot.pointShapes(point));
                }
                this.assignZindex(result);
                result.sort(zIndexComparer);
                for (var idx = 0; idx < result.length; idx++) {
                    if (result[idx].containsPoint(point)) {
                        return result[idx];
                    }
                }
            },
            assignZindex: function (elements) {
                var this$1 = this;
                for (var idx = 0; idx < elements.length; idx++) {
                    var element = elements[idx];
                    var zIndex = 0;
                    var levelWeight = Math.pow(LEVEL_STEP, MAX_LEVEL);
                    var parents = [];
                    while (element) {
                        parents.push(element);
                        element = element.parent;
                    }
                    while (parents.length) {
                        element = parents.pop();
                        zIndex += ((element.parent ? element.parent.children : this$1.rootElements).indexOf(element) + 1) * levelWeight;
                        levelWeight /= LEVEL_STEP;
                    }
                    elements[idx]._zIndex = zIndex;
                }
            },
            optionsChange: function (e) {
                if (e.field === 'transform' || e.field === 'stroke.width') {
                    this.bboxChange(e.element);
                }
            },
            geometryChange: function (e) {
                this.bboxChange(e.element);
            },
            bboxChange: function (element) {
                var this$1 = this;
                if (element.nodeType === 'Group') {
                    for (var idx = 0; idx < element.children.length; idx++) {
                        this$1.bboxChange(element.children[idx]);
                    }
                } else {
                    if (element._quadNode) {
                        element._quadNode.remove(element);
                    }
                    this._insertShape(element);
                }
            },
            add: function (elements) {
                var elementsArray = Array.isArray(elements) ? elements.slice(0) : [elements];
                append(this.rootElements, elementsArray);
                this._insert(elementsArray);
            },
            childrenChange: function (e) {
                var this$1 = this;
                if (e.action === 'remove') {
                    for (var idx = 0; idx < e.items.length; idx++) {
                        this$1.remove(e.items[idx]);
                    }
                } else {
                    this._insert(Array.prototype.slice.call(e.items, 0));
                }
            },
            _insert: function (elements) {
                var this$1 = this;
                var element;
                while (elements.length > 0) {
                    element = elements.pop();
                    element.addObserver(this$1);
                    if (element.nodeType === 'Group') {
                        append(elements, element.children);
                    } else {
                        this$1._insertShape(element);
                    }
                }
            },
            _insertShape: function (shape) {
                var bbox = shape.bbox();
                if (bbox) {
                    var sectors = this.getSectors(bbox);
                    var x = sectors[0][0];
                    var y = sectors[1][0];
                    if (this.inRoot(sectors)) {
                        this.root.insert(shape, bbox);
                    } else {
                        var rootMap = this.rootMap;
                        if (!rootMap[x]) {
                            rootMap[x] = {};
                        }
                        if (!rootMap[x][y]) {
                            rootMap[x][y] = new QuadNode(new Rect([
                                x * ROOT_SIZE,
                                y * ROOT_SIZE
                            ], [
                                ROOT_SIZE,
                                ROOT_SIZE
                            ]));
                        }
                        rootMap[x][y].insert(shape, bbox);
                    }
                }
            },
            remove: function (element) {
                var this$1 = this;
                element.removeObserver(this);
                if (element.nodeType === 'Group') {
                    var children = element.children;
                    for (var idx = 0; idx < children.length; idx++) {
                        this$1.remove(children[idx]);
                    }
                } else if (element._quadNode) {
                    element._quadNode.remove(element);
                    delete element._quadNode;
                }
            },
            inRoot: function (sectors) {
                return sectors[0].length > 1 || sectors[1].length > 1;
            },
            getSectors: function (rect) {
                var bottomRight = rect.bottomRight();
                var bottomX = Math.floor(bottomRight.x / ROOT_SIZE);
                var bottomY = Math.floor(bottomRight.y / ROOT_SIZE);
                var sectors = [
                    [],
                    []
                ];
                for (var x = Math.floor(rect.origin.x / ROOT_SIZE); x <= bottomX; x++) {
                    sectors[0].push(x);
                }
                for (var y = Math.floor(rect.origin.y / ROOT_SIZE); y <= bottomY; y++) {
                    sectors[1].push(y);
                }
                return sectors;
            }
        });
        function zIndexComparer(x1, x2) {
            if (x1._zIndex < x2._zIndex) {
                return 1;
            }
            if (x1._zIndex > x2._zIndex) {
                return -1;
            }
            return 0;
        }
        var SurfaceCursor = Class.extend({
            init: function (surface) {
                surface.bind('mouseenter', this._mouseenter.bind(this));
                surface.bind('mouseleave', this._mouseleave.bind(this));
                this.element = surface.element;
            },
            clear: function () {
                this._resetCursor();
            },
            destroy: function () {
                this._resetCursor();
                delete this.element;
            },
            _mouseenter: function (e) {
                var cursor = this._shapeCursor(e);
                if (!cursor) {
                    this._resetCursor();
                } else {
                    if (!this._current) {
                        this._defaultCursor = this._getCursor();
                    }
                    this._setCursor(cursor);
                }
            },
            _mouseleave: function () {
                this._resetCursor();
            },
            _shapeCursor: function (e) {
                var shape = e.element;
                while (shape && !defined(shape.options.cursor)) {
                    shape = shape.parent;
                }
                if (shape) {
                    return shape.options.cursor;
                }
            },
            _getCursor: function () {
                if (this.element) {
                    return this.element.style.cursor;
                }
            },
            _setCursor: function (cursor) {
                if (this.element) {
                    this.element.style.cursor = cursor;
                    this._current = cursor;
                }
            },
            _resetCursor: function () {
                if (this._current) {
                    this._setCursor(this._defaultCursor || '');
                    delete this._current;
                }
            }
        });
        var Surface$3 = Surface.extend({
            init: function (element, options) {
                Surface.fn.init.call(this, element, options);
                this.element.innerHTML = this._template(this);
                var canvas = this.element.firstElementChild;
                var size = elementSize(element);
                canvas.width = size.width;
                canvas.height = size.height;
                this._rootElement = canvas;
                this._root = new RootNode$2(canvas);
                this._mouseTrackHandler = this._trackMouse.bind(this);
                bindEvents(this.element, {
                    click: this._mouseTrackHandler,
                    mousemove: this._mouseTrackHandler
                });
            },
            destroy: function () {
                Surface.fn.destroy.call(this);
                if (this._root) {
                    this._root.destroy();
                    this._root = null;
                }
                if (this._searchTree) {
                    this._searchTree.clear();
                    delete this._searchTree;
                }
                if (this._cursor) {
                    this._cursor.destroy();
                    delete this._cursor;
                }
                unbindEvents(this.element, {
                    click: this._mouseTrackHandler,
                    mousemove: this._mouseTrackHandler
                });
            },
            draw: function (element) {
                Surface.fn.draw.call(this, element);
                this._root.load([element], undefined, this.options.cors);
                if (this._searchTree) {
                    this._searchTree.add([element]);
                }
            },
            clear: function () {
                Surface.fn.clear.call(this);
                this._root.clear();
                if (this._searchTree) {
                    this._searchTree.clear();
                }
                if (this._cursor) {
                    this._cursor.clear();
                }
            },
            eventTarget: function (e) {
                if (this._searchTree) {
                    var point = this._surfacePoint(e);
                    var shape = this._searchTree.pointShape(point);
                    return shape;
                }
            },
            image: function () {
                var ref = this;
                var root = ref._root;
                var rootElement = ref._rootElement;
                var loadingStates = [];
                root.traverse(function (childNode) {
                    if (childNode.loading) {
                        loadingStates.push(childNode.loading);
                    }
                });
                var promise = createPromise();
                var resolveDataURL = function () {
                    root._invalidate();
                    try {
                        var data = rootElement.toDataURL();
                        promise.resolve(data);
                    } catch (e) {
                        promise.reject(e);
                    }
                };
                promiseAll(loadingStates).then(resolveDataURL, resolveDataURL);
                return promise;
            },
            suspendTracking: function () {
                Surface.fn.suspendTracking.call(this);
                if (this._searchTree) {
                    this._searchTree.clear();
                    delete this._searchTree;
                }
            },
            resumeTracking: function () {
                Surface.fn.resumeTracking.call(this);
                if (!this._searchTree) {
                    this._searchTree = new ShapesQuadTree();
                    var childNodes = this._root.childNodes;
                    var rootElements = [];
                    for (var idx = 0; idx < childNodes.length; idx++) {
                        rootElements.push(childNodes[idx].srcElement);
                    }
                    this._searchTree.add(rootElements);
                }
            },
            _resize: function () {
                this._rootElement.width = this._size.width;
                this._rootElement.height = this._size.height;
                this._root.invalidate();
            },
            _template: function () {
                return '<canvas style=\'width: 100%; height: 100%;\'></canvas>';
            },
            _enableTracking: function () {
                this._searchTree = new ShapesQuadTree();
                this._cursor = new SurfaceCursor(this);
                Surface.fn._enableTracking.call(this);
            },
            _trackMouse: function (e) {
                if (this._suspendedTracking) {
                    return;
                }
                var shape = this.eventTarget(e);
                if (e.type !== 'click') {
                    var currentShape = this._currentShape;
                    if (currentShape && currentShape !== shape) {
                        this.trigger('mouseleave', {
                            element: currentShape,
                            originalEvent: e,
                            type: 'mouseleave'
                        });
                    }
                    if (shape && currentShape !== shape) {
                        this.trigger('mouseenter', {
                            element: shape,
                            originalEvent: e,
                            type: 'mouseenter'
                        });
                    }
                    this.trigger('mousemove', {
                        element: shape,
                        originalEvent: e,
                        type: 'mousemove'
                    });
                    this._currentShape = shape;
                } else if (shape) {
                    this.trigger('click', {
                        element: shape,
                        originalEvent: e,
                        type: 'click'
                    });
                }
            }
        });
        Surface$3.prototype.type = 'canvas';
        if (typeof document !== 'undefined' && document.createElement('canvas').getContext) {
            Surface.support.canvas = true;
            SurfaceFactory.current.register('canvas', Surface$3, 20);
        }
        function addGradientStops(gradient, stops) {
            for (var idx = 0; idx < stops.length; idx++) {
                var stop = stops[idx];
                var color = kendo.parseColor(stop.color());
                color.a *= stop.opacity();
                gradient.addColorStop(stop.offset(), color.toCssRgba());
            }
        }
        var PathNode$2 = Node$2.extend({
            renderTo: function (ctx) {
                ctx.save();
                this.setTransform(ctx);
                this.setClip(ctx);
                this.setOpacity(ctx);
                ctx.beginPath();
                this.renderPoints(ctx, this.srcElement);
                this.setLineDash(ctx);
                this.setLineCap(ctx);
                this.setLineJoin(ctx);
                this.setFill(ctx);
                this.setStroke(ctx);
                ctx.restore();
            },
            setFill: function (ctx) {
                var fill = this.srcElement.options.fill;
                var hasFill = false;
                if (fill) {
                    if (fill.nodeType === 'Gradient') {
                        this.setGradientFill(ctx, fill);
                        hasFill = true;
                    } else if (!isTransparent(fill.color)) {
                        ctx.fillStyle = fill.color;
                        ctx.save();
                        this.globalAlpha(ctx, fill.opacity);
                        ctx.fill();
                        ctx.restore();
                        hasFill = true;
                    }
                }
                return hasFill;
            },
            setGradientFill: function (ctx, fill) {
                var bbox = this.srcElement.rawBBox();
                var gradient;
                if (fill instanceof LinearGradient) {
                    var start = fill.start();
                    var end = fill.end();
                    gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
                } else if (fill instanceof RadialGradient) {
                    var center = fill.center();
                    gradient = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, fill.radius());
                }
                addGradientStops(gradient, fill.stops);
                ctx.save();
                if (!fill.userSpace()) {
                    ctx.transform(bbox.width(), 0, 0, bbox.height(), bbox.origin.x, bbox.origin.y);
                }
                ctx.fillStyle = gradient;
                ctx.fill();
                ctx.restore();
            },
            setStroke: function (ctx) {
                var stroke = this.srcElement.options.stroke;
                if (stroke && !isTransparent(stroke.color) && stroke.width > 0) {
                    ctx.strokeStyle = stroke.color;
                    ctx.lineWidth = valueOrDefault(stroke.width, 1);
                    ctx.save();
                    this.globalAlpha(ctx, stroke.opacity);
                    ctx.stroke();
                    ctx.restore();
                    return true;
                }
            },
            dashType: function () {
                var stroke = this.srcElement.options.stroke;
                if (stroke && stroke.dashType) {
                    return stroke.dashType.toLowerCase();
                }
            },
            setLineDash: function (ctx) {
                var dashType = this.dashType();
                if (dashType && dashType !== SOLID) {
                    var dashArray = DASH_ARRAYS[dashType];
                    if (ctx.setLineDash) {
                        ctx.setLineDash(dashArray);
                    } else {
                        ctx.mozDash = dashArray;
                        ctx.webkitLineDash = dashArray;
                    }
                }
            },
            setLineCap: function (ctx) {
                var dashType = this.dashType();
                var stroke = this.srcElement.options.stroke;
                if (dashType && dashType !== SOLID) {
                    ctx.lineCap = BUTT;
                } else if (stroke && stroke.lineCap) {
                    ctx.lineCap = stroke.lineCap;
                }
            },
            setLineJoin: function (ctx) {
                var stroke = this.srcElement.options.stroke;
                if (stroke && stroke.lineJoin) {
                    ctx.lineJoin = stroke.lineJoin;
                }
            },
            renderPoints: function (ctx, path) {
                renderPath(ctx, path);
            }
        });
        NODE_MAP$2.Path = PathNode$2;
        var ArcNode$2 = PathNode$2.extend({
            renderPoints: function (ctx) {
                var path = this.srcElement.toPath();
                renderPath(ctx, path);
            }
        });
        NODE_MAP$2.Arc = ArcNode$2;
        var CircleNode$2 = PathNode$2.extend({
            renderPoints: function (ctx) {
                var ref = this.srcElement.geometry();
                var center = ref.center;
                var radius = ref.radius;
                ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
            }
        });
        NODE_MAP$2.Circle = CircleNode$2;
        var RectNode$2 = PathNode$2.extend({
            renderPoints: function (ctx) {
                var ref = this.srcElement.geometry();
                var origin = ref.origin;
                var size = ref.size;
                ctx.rect(origin.x, origin.y, size.width, size.height);
            }
        });
        NODE_MAP$2.Rect = RectNode$2;
        var ImageNode$2 = PathNode$2.extend({
            init: function (srcElement, cors) {
                PathNode$2.fn.init.call(this, srcElement);
                this.onLoad = this.onLoad.bind(this);
                this.onError = this.onError.bind(this);
                this.loading = createPromise();
                var img = this.img = new Image();
                if (cors && !/^data:/i.test(srcElement.src())) {
                    img.crossOrigin = cors;
                }
                img.src = srcElement.src();
                if (img.complete) {
                    this.onLoad();
                } else {
                    img.onload = this.onLoad;
                    img.onerror = this.onError;
                }
            },
            renderTo: function (ctx) {
                if (this.loading.state() === 'resolved') {
                    ctx.save();
                    this.setTransform(ctx);
                    this.setClip(ctx);
                    this.drawImage(ctx);
                    ctx.restore();
                }
            },
            optionsChange: function (e) {
                if (e.field === 'src') {
                    this.loading = createPromise();
                    this.img.src = this.srcElement.src();
                } else {
                    PathNode$2.fn.optionsChange.call(this, e);
                }
            },
            onLoad: function () {
                this.loading.resolve();
                this.invalidate();
            },
            onError: function () {
                this.loading.reject(new Error('Unable to load image \'' + this.img.src + '\'. Check for connectivity and verify CORS headers.'));
            },
            drawImage: function (ctx) {
                var rect = this.srcElement.rect();
                var topLeft = rect.topLeft();
                ctx.drawImage(this.img, topLeft.x, topLeft.y, rect.width(), rect.height());
            }
        });
        NODE_MAP$2.Image = ImageNode$2;
        var TextNode$2 = PathNode$2.extend({
            renderTo: function (ctx) {
                var text = this.srcElement;
                var pos = text.position();
                var size = text.measure();
                ctx.save();
                this.setTransform(ctx);
                this.setClip(ctx);
                this.setOpacity(ctx);
                ctx.beginPath();
                ctx.font = text.options.font;
                if (this.setFill(ctx)) {
                    ctx.fillText(text.content(), pos.x, pos.y + size.baseline);
                }
                if (this.setStroke(ctx)) {
                    this.setLineDash(ctx);
                    ctx.strokeText(text.content(), pos.x, pos.y + size.baseline);
                }
                ctx.restore();
            }
        });
        NODE_MAP$2.Text = TextNode$2;
        var MultiPathNode$2 = PathNode$2.extend({
            renderPoints: function (ctx) {
                var paths = this.srcElement.paths;
                for (var i = 0; i < paths.length; i++) {
                    renderPath(ctx, paths[i]);
                }
            }
        });
        NODE_MAP$2.MultiPath = MultiPathNode$2;
        var canvas = {
            Surface: Surface$3,
            RootNode: RootNode$2,
            Node: Node$2,
            GroupNode: GroupNode$2,
            ArcNode: ArcNode$2,
            CircleNode: CircleNode$2,
            RectNode: RectNode$2,
            ImageNode: ImageNode$2,
            TextNode: TextNode$2,
            PathNode: PathNode$2,
            MultiPathNode: MultiPathNode$2
        };
        function exportImage(group, options) {
            var defaults = {
                width: '800px',
                height: '600px',
                cors: 'Anonymous'
            };
            var exportRoot = group;
            var bbox = group.clippedBBox();
            if (bbox) {
                var origin = bbox.getOrigin();
                exportRoot = new Group();
                exportRoot.transform(transform().translate(-origin.x, -origin.y));
                exportRoot.children.push(group);
                var size = bbox.getSize();
                defaults.width = size.width + 'px';
                defaults.height = size.height + 'px';
            }
            var surfaceOptions = $.extend(defaults, options);
            var container = document.createElement('div');
            var style = container.style;
            style.display = 'none';
            style.width = surfaceOptions.width;
            style.height = surfaceOptions.height;
            document.body.appendChild(container);
            var surface = new Surface$3(container, surfaceOptions);
            surface.suspendTracking();
            surface.draw(exportRoot);
            var promise = surface.image();
            var destroy = function () {
                surface.destroy();
                document.body.removeChild(container);
            };
            promise.then(destroy, destroy);
            return promise;
        }
        function exportSVG(group, options) {
            var svg = exportGroup(group);
            if (!options || !options.raw) {
                svg = 'data:image/svg+xml;base64,' + encodeBase64(svg);
            }
            return createPromise().resolve(svg);
        }
        var browser = support.browser;
        function slice$1(thing) {
            return Array.prototype.slice.call(thing);
        }
        var KENDO_PSEUDO_ELEMENT = 'KENDO-PSEUDO-ELEMENT';
        var IMAGE_CACHE = {};
        var nodeInfo = {};
        nodeInfo._root = nodeInfo;
        var TextRect = Text.extend({
            init: function (str, rect, options) {
                Text.fn.init.call(this, str, rect.getOrigin(), options);
                this._pdfRect = rect;
            },
            rect: function () {
                return this._pdfRect;
            },
            rawBBox: function () {
                return this._pdfRect;
            }
        });
        function addClass(el, cls) {
            if (el.classList) {
                el.classList.add(cls);
            } else {
                el.className += ' ' + cls;
            }
        }
        function removeClass(el, cls) {
            if (el.classList) {
                el.classList.remove(cls);
            } else {
                el.className = el.className.split(/\s+/).reduce(function (a, word) {
                    if (word != cls) {
                        a.push(word);
                    }
                    return a;
                }, []).join(' ');
            }
        }
        function setCSS(el, styles) {
            Object.keys(styles).forEach(function (key) {
                el.style[key] = styles[key];
            });
        }
        var matches = typeof Element !== 'undefined' && Element.prototype && function (p) {
            if (p.matches) {
                return function (el, selector) {
                    return el.matches(selector);
                };
            }
            if (p.webkitMatchesSelector) {
                return function (el, selector) {
                    return el.webkitMatchesSelector(selector);
                };
            }
            if (p.mozMatchesSelector) {
                return function (el, selector) {
                    return el.mozMatchesSelector(selector);
                };
            }
            if (p.msMatchesSelector) {
                return function (el, selector) {
                    return el.msMatchesSelector(selector);
                };
            }
            return function (s) {
                return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
            };
        }(Element.prototype);
        function closest(el, selector) {
            if (el.closest) {
                return el.closest(selector);
            }
            while (el && !/^\[object (?:HTML)?Document\]$/.test(String(el))) {
                if (matches(el, selector)) {
                    return el;
                }
                el = el.parentNode;
            }
        }
        var cloneNodes = function ($) {
            if ($) {
                return function cloneNodes(el) {
                    var clone = el.cloneNode(false);
                    if (el.nodeType == 1) {
                        var $el = $(el), $clone = $(clone), i;
                        var data = $el.data();
                        for (i in data) {
                            $clone.data(i, data[i]);
                        }
                        if (/^canvas$/i.test(el.tagName)) {
                            clone.getContext('2d').drawImage(el, 0, 0);
                        } else if (/^(?:input|select|textarea|option)$/i.test(el.tagName)) {
                            clone.removeAttribute('id');
                            clone.removeAttribute('name');
                            clone.value = el.value;
                            clone.checked = el.checked;
                            clone.selected = el.selected;
                        }
                        for (i = el.firstChild; i; i = i.nextSibling) {
                            clone.appendChild(cloneNodes(i));
                        }
                    }
                    return clone;
                };
            } else {
                return function cloneNodes(el) {
                    var clone = el.cloneNode(true);
                    var canvases = el.querySelectorAll('canvas');
                    if (canvases.length) {
                        slice$1(clone.querySelectorAll('canvas')).forEach(function (canvas$$1, i) {
                            canvas$$1.getContext('2d').drawImage(canvases[i], 0, 0);
                        });
                    }
                    var orig = el.querySelectorAll('input, select, textarea, option');
                    slice$1(clone.querySelectorAll('input, select, textarea, option')).forEach(function (el, i) {
                        el.removeAttribute('id');
                        el.removeAttribute('name');
                        el.value = orig[i].value;
                        el.checked = orig[i].checked;
                        el.selected = orig[i].selected;
                    });
                    return clone;
                };
            }
        }(typeof window !== 'undefined' && window.kendo && window.kendo.jQuery);
        function getXY(thing) {
            if (typeof thing == 'number') {
                return {
                    x: thing,
                    y: thing
                };
            }
            if (Array.isArray(thing)) {
                return {
                    x: thing[0],
                    y: thing[1]
                };
            }
            return {
                x: thing.x,
                y: thing.y
            };
        }
        function drawDOM(element, options) {
            if (!options) {
                options = {};
            }
            var promise = createPromise();
            if (!element) {
                return promise.reject('No element to export');
            }
            if (typeof window.getComputedStyle != 'function') {
                throw new Error('window.getComputedStyle is missing.  You are using an unsupported browser, or running in IE8 compatibility mode.  Drawing HTML is supported in Chrome, Firefox, Safari and IE9+.');
            }
            kendo.pdf.defineFont(getFontFaces(element.ownerDocument));
            var scale = getXY(options.scale || 1);
            function doOne(element) {
                var group = new Group();
                var pos = element.getBoundingClientRect();
                setTransform(group, [
                    scale.x,
                    0,
                    0,
                    scale.y,
                    -pos.left * scale.x,
                    -pos.top * scale.y
                ]);
                nodeInfo._clipbox = false;
                nodeInfo._matrix = Matrix.unit();
                nodeInfo._stackingContext = {
                    element: element,
                    group: group
                };
                if (options.avoidLinks === true) {
                    nodeInfo._avoidLinks = 'a';
                } else {
                    nodeInfo._avoidLinks = options.avoidLinks;
                }
                addClass(element, 'k-pdf-export');
                renderElement(element, group);
                removeClass(element, 'k-pdf-export');
                return group;
            }
            cacheImages(element, function () {
                var forceBreak = options && options.forcePageBreak;
                var hasPaperSize = options && options.paperSize && options.paperSize != 'auto';
                var paperOptions = kendo.pdf.getPaperOptions(function (key, def) {
                    if (key == 'paperSize') {
                        return hasPaperSize ? options[key] : 'A4';
                    }
                    return key in options ? options[key] : def;
                });
                var pageWidth = hasPaperSize && paperOptions.paperSize[0];
                var pageHeight = hasPaperSize && paperOptions.paperSize[1];
                var margin = options.margin && paperOptions.margin;
                var hasMargin = Boolean(margin);
                if (forceBreak || pageHeight) {
                    if (!margin) {
                        margin = {
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0
                        };
                    }
                    if (pageWidth) {
                        pageWidth /= scale.x;
                    }
                    if (pageHeight) {
                        pageHeight /= scale.y;
                    }
                    margin.left /= scale.x;
                    margin.right /= scale.x;
                    margin.top /= scale.y;
                    margin.bottom /= scale.y;
                    var group = new Group({
                        pdf: {
                            multiPage: true,
                            paperSize: hasPaperSize ? paperOptions.paperSize : 'auto',
                            _ignoreMargin: hasMargin
                        }
                    });
                    handlePageBreaks(function (x) {
                        if (options.progress) {
                            var canceled = false, pageNum = 0;
                            (function next() {
                                if (pageNum < x.pages.length) {
                                    var page = doOne(x.pages[pageNum]);
                                    group.append(page);
                                    options.progress({
                                        page: page,
                                        pageNum: ++pageNum,
                                        totalPages: x.pages.length,
                                        cancel: function () {
                                            canceled = true;
                                        }
                                    });
                                    if (!canceled) {
                                        setTimeout(next);
                                    } else {
                                        x.container.parentNode.removeChild(x.container);
                                    }
                                } else {
                                    x.container.parentNode.removeChild(x.container);
                                    promise.resolve(group);
                                }
                            }());
                        } else {
                            x.pages.forEach(function (page) {
                                group.append(doOne(page));
                            });
                            x.container.parentNode.removeChild(x.container);
                            promise.resolve(group);
                        }
                    }, element, forceBreak, pageWidth ? pageWidth - margin.left - margin.right : null, pageHeight ? pageHeight - margin.top - margin.bottom : null, margin, options);
                } else {
                    promise.resolve(doOne(element));
                }
            });
            function makeTemplate(template$$1) {
                if (template$$1 != null) {
                    if (typeof template$$1 == 'string') {
                        template$$1 = kendo.template(template$$1.replace(/^\s+|\s+$/g, ''));
                    }
                    if (typeof template$$1 == 'function') {
                        return function (data) {
                            var el = template$$1(data);
                            if (el && typeof el == 'string') {
                                var div = document.createElement('div');
                                div.innerHTML = el;
                                el = div.firstElementChild;
                            }
                            return el;
                        };
                    }
                    return function () {
                        return template$$1.cloneNode(true);
                    };
                }
            }
            function handlePageBreaks(callback, element, forceBreak, pageWidth, pageHeight, margin, options) {
                var template$$1 = makeTemplate(options.template);
                var doc = element.ownerDocument;
                var pages = [];
                var copy = options._destructive ? element : cloneNodes(element);
                var container = doc.createElement('KENDO-PDF-DOCUMENT');
                var adjust = 0;
                slice$1(copy.querySelectorAll('tfoot')).forEach(function (tfoot) {
                    tfoot.parentNode.appendChild(tfoot);
                });
                slice$1(copy.querySelectorAll('ol')).forEach(function (ol) {
                    slice$1(ol.children).forEach(function (li, index) {
                        li.setAttribute('kendo-split-index', index);
                    });
                });
                setCSS(container, {
                    display: 'block',
                    position: 'absolute',
                    boxSizing: 'content-box',
                    left: '-10000px',
                    top: '-10000px'
                });
                if (pageWidth) {
                    setCSS(container, {
                        width: pageWidth + 'px',
                        paddingLeft: margin.left + 'px',
                        paddingRight: margin.right + 'px'
                    });
                    setCSS(copy, { overflow: 'hidden' });
                }
                element.parentNode.insertBefore(container, element);
                container.appendChild(copy);
                if (options.beforePageBreak) {
                    setTimeout(function () {
                        options.beforePageBreak(container, doPageBreak);
                    }, 15);
                } else {
                    setTimeout(doPageBreak, 15);
                }
                function doPageBreak() {
                    if (forceBreak != '-' || pageHeight) {
                        splitElement(copy);
                    }
                    var page = makePage();
                    copy.parentNode.insertBefore(page, copy);
                    page.appendChild(copy);
                    if (template$$1) {
                        var count = pages.length;
                        pages.forEach(function (page, i) {
                            var el = template$$1({
                                element: page,
                                pageNum: i + 1,
                                totalPages: pages.length
                            });
                            if (el) {
                                page.appendChild(el);
                                cacheImages(el, function () {
                                    if (--count === 0) {
                                        next();
                                    }
                                });
                            }
                        });
                    } else {
                        next();
                    }
                    function next() {
                        whenImagesAreActuallyLoaded(pages, function () {
                            callback({
                                pages: pages,
                                container: container
                            });
                        });
                    }
                }
                function keepTogether(el) {
                    if (options.keepTogether && matches(el, options.keepTogether) && el.offsetHeight <= pageHeight - adjust) {
                        return true;
                    }
                    var tag = el.tagName;
                    if (/^h[1-6]$/i.test(tag) && el.offsetHeight >= pageHeight - adjust) {
                        return false;
                    }
                    return el.getAttribute('data-kendo-chart') || /^(?:img|tr|thead|th|tfoot|iframe|svg|object|canvas|input|textarea|select|video|h[1-6])/i.test(el.tagName);
                }
                function splitElement(element) {
                    if (element.tagName == 'TABLE') {
                        setCSS(element, { tableLayout: 'fixed' });
                    }
                    var style = getComputedStyle(element);
                    var bottomPadding = parseFloat(getPropertyValue(style, 'padding-bottom'));
                    var bottomBorder = parseFloat(getPropertyValue(style, 'border-bottom-width'));
                    var saveAdjust = adjust;
                    adjust += bottomPadding + bottomBorder;
                    var isFirst = true;
                    for (var el = element.firstChild; el; el = el.nextSibling) {
                        if (el.nodeType == 1) {
                            isFirst = false;
                            if (matches(el, forceBreak)) {
                                breakAtElement(el);
                                continue;
                            }
                            if (!pageHeight) {
                                splitElement(el);
                                continue;
                            }
                            if (!/^(?:static|relative)$/.test(getPropertyValue(getComputedStyle(el), 'position'))) {
                                continue;
                            }
                            var fall = fallsOnMargin(el);
                            if (fall == 1) {
                                breakAtElement(el);
                            } else if (fall) {
                                if (keepTogether(el)) {
                                    breakAtElement(el);
                                } else {
                                    splitElement(el);
                                }
                            } else {
                                splitElement(el);
                            }
                        } else if (el.nodeType == 3 && pageHeight) {
                            splitText(el, isFirst);
                            isFirst = false;
                        }
                    }
                    adjust = saveAdjust;
                }
                function firstInParent(el) {
                    var p = el.parentNode, first = p.firstChild;
                    if (el === first) {
                        return true;
                    }
                    if (el === p.children[0]) {
                        if (first.nodeType == 7 || first.nodeType == 8) {
                            return true;
                        }
                        if (first.nodeType == 3) {
                            return !/\S/.test(first.data);
                        }
                    }
                    return false;
                }
                function breakAtElement(el) {
                    if (el.nodeType == 1 && el !== copy && firstInParent(el)) {
                        return breakAtElement(el.parentNode);
                    }
                    var table, colgroup, thead, grid, gridHead;
                    table = closest(el, 'table');
                    colgroup = table && table.querySelector('colgroup');
                    if (options.repeatHeaders) {
                        thead = table && table.querySelector('thead');
                        grid = closest(el, '.k-grid[data-role="grid"]');
                        if (grid && grid.querySelector('.k-auto-scrollable')) {
                            gridHead = grid.querySelector('.k-grid-header');
                        }
                    }
                    var page = makePage();
                    var range = doc.createRange();
                    range.setStartBefore(copy);
                    range.setEndBefore(el);
                    page.appendChild(range.extractContents());
                    copy.parentNode.insertBefore(page, copy);
                    preventBulletOnListItem(el.parentNode);
                    if (table) {
                        table = closest(el, 'table');
                        if (options.repeatHeaders && thead) {
                            table.insertBefore(thead.cloneNode(true), table.firstChild);
                        }
                        if (colgroup) {
                            table.insertBefore(colgroup.cloneNode(true), table.firstChild);
                        }
                    }
                    if (options.repeatHeaders && gridHead) {
                        grid = closest(el, '.k-grid[data-role="grid"]');
                        grid.insertBefore(gridHead.cloneNode(true), grid.firstChild);
                    }
                }
                function makePage() {
                    var page = doc.createElement('KENDO-PDF-PAGE');
                    setCSS(page, {
                        display: 'block',
                        boxSizing: 'content-box',
                        width: pageWidth ? pageWidth + 'px' : 'auto',
                        padding: margin.top + 'px ' + margin.right + 'px ' + margin.bottom + 'px ' + margin.left + 'px',
                        position: 'relative',
                        height: pageHeight ? pageHeight + 'px' : 'auto',
                        overflow: pageHeight || pageWidth ? 'hidden' : 'visible',
                        clear: 'both'
                    });
                    if (options && options.pageClassName) {
                        page.className = options.pageClassName;
                    }
                    pages.push(page);
                    return page;
                }
                function fallsOnMargin(thing) {
                    var box = thing.getBoundingClientRect();
                    if (box.width === 0 || box.height === 0) {
                        return 0;
                    }
                    var top = copy.getBoundingClientRect().top;
                    var available = pageHeight - adjust;
                    return box.height > available ? 3 : box.top - top > available ? 1 : box.bottom - top > available ? 2 : 0;
                }
                function splitText(node, isFirst) {
                    if (!/\S/.test(node.data)) {
                        return;
                    }
                    var len = node.data.length;
                    var range = doc.createRange();
                    range.selectNodeContents(node);
                    var fall = fallsOnMargin(range);
                    if (!fall) {
                        return;
                    }
                    var nextnode = node;
                    if (fall == 1) {
                        if (isFirst) {
                            breakAtElement(node.parentNode);
                        } else {
                            breakAtElement(node);
                        }
                    } else {
                        (function findEOP(min, pos, max) {
                            range.setEnd(node, pos);
                            if (min == pos || pos == max) {
                                return pos;
                            }
                            if (fallsOnMargin(range)) {
                                return findEOP(min, min + pos >> 1, pos);
                            } else {
                                return findEOP(pos, pos + max >> 1, max);
                            }
                        }(0, len >> 1, len));
                        if (!/\S/.test(range.toString()) && isFirst) {
                            breakAtElement(node.parentNode);
                        } else {
                            nextnode = node.splitText(range.endOffset);
                            var page = makePage();
                            range.setStartBefore(copy);
                            page.appendChild(range.extractContents());
                            copy.parentNode.insertBefore(page, copy);
                            preventBulletOnListItem(nextnode.parentNode);
                        }
                    }
                    splitText(nextnode);
                }
                function preventBulletOnListItem(el) {
                    var li = closest(el, 'li');
                    if (li) {
                        li.setAttribute('kendo-no-bullet', '1');
                        preventBulletOnListItem(li.parentNode);
                    }
                }
            }
            return promise;
        }
        drawDOM.getFontFaces = getFontFaces;
        drawDOM.drawText = function (element) {
            var group = new Group();
            nodeInfo._clipbox = false;
            nodeInfo._matrix = Matrix.unit();
            nodeInfo._stackingContext = {
                element: element,
                group: group
            };
            pushNodeInfo(element, getComputedStyle(element), group);
            if (element.firstChild.nodeType == 3) {
                renderText(element, element.firstChild, group);
            } else {
                _renderElement(element, group);
            }
            popNodeInfo();
            return group;
        };
        var parseBackgroundImage = function () {
            var tok_linear_gradient = /^((-webkit-|-moz-|-o-|-ms-)?linear-gradient\s*)\(/;
            var tok_percent = /^([-0-9.]+%)/;
            var tok_length = /^([-0-9.]+px)/;
            var tok_keyword = /^(left|right|top|bottom|to|center)\W/;
            var tok_angle = /^([-0-9.]+(deg|grad|rad|turn))/;
            var tok_whitespace = /^(\s+)/;
            var tok_popen = /^(\()/;
            var tok_pclose = /^(\))/;
            var tok_comma = /^(,)/;
            var tok_url = /^(url)\(/;
            var tok_content = /^(.*?)\)/;
            var cache1 = {}, cache2 = {};
            function parse(input) {
                var orig = input;
                if (hasOwnProperty(cache1, orig)) {
                    return cache1[orig];
                }
                function skip_ws() {
                    var m = tok_whitespace.exec(input);
                    if (m) {
                        input = input.substr(m[1].length);
                    }
                }
                function read(token) {
                    skip_ws();
                    var m = token.exec(input);
                    if (m) {
                        input = input.substr(m[1].length);
                        return m[1];
                    }
                }
                function read_stop() {
                    var color = kendo.parseColor(input, true);
                    var length, percent;
                    if (color) {
                        var match = /^#[0-9a-f]+/i.exec(input) || /^rgba?\(.*?\)/i.exec(input) || /^..*?\b/.exec(input);
                        input = input.substr(match[0].length);
                        color = color.toRGB();
                        if (!(length = read(tok_length))) {
                            percent = read(tok_percent);
                        }
                        return {
                            color: color,
                            length: length,
                            percent: percent
                        };
                    }
                }
                function read_linear_gradient(propName) {
                    var angle;
                    var to1, to2;
                    var stops = [];
                    var reverse = false;
                    if (read(tok_popen)) {
                        angle = read(tok_angle);
                        if (angle) {
                            angle = parseAngle(angle);
                            read(tok_comma);
                        } else {
                            to1 = read(tok_keyword);
                            if (to1 == 'to') {
                                to1 = read(tok_keyword);
                            } else if (to1 && /^-/.test(propName)) {
                                reverse = true;
                            }
                            to2 = read(tok_keyword);
                            read(tok_comma);
                        }
                        if (/-moz-/.test(propName) && angle == null && to1 == null) {
                            var x = read(tok_percent), y = read(tok_percent);
                            reverse = true;
                            if (x == '0%') {
                                to1 = 'left';
                            } else if (x == '100%') {
                                to1 = 'right';
                            }
                            if (y == '0%') {
                                to2 = 'top';
                            } else if (y == '100%') {
                                to2 = 'bottom';
                            }
                            read(tok_comma);
                        }
                        while (input && !read(tok_pclose)) {
                            var stop = read_stop();
                            if (!stop) {
                                break;
                            }
                            stops.push(stop);
                            read(tok_comma);
                        }
                        return {
                            type: 'linear',
                            angle: angle,
                            to: to1 && to2 ? to1 + ' ' + to2 : to1 ? to1 : to2 ? to2 : null,
                            stops: stops,
                            reverse: reverse
                        };
                    }
                }
                function read_url() {
                    if (read(tok_popen)) {
                        var url = read(tok_content);
                        url = url.replace(/^['"]+|["']+$/g, '');
                        read(tok_pclose);
                        return {
                            type: 'url',
                            url: url
                        };
                    }
                }
                var tok;
                if (tok = read(tok_linear_gradient)) {
                    tok = read_linear_gradient(tok);
                } else if (tok = read(tok_url)) {
                    tok = read_url();
                }
                return cache1[orig] = tok || { type: 'none' };
            }
            return function (input) {
                if (hasOwnProperty(cache2, input)) {
                    return cache2[input];
                }
                return cache2[input] = splitProperty(input).map(parse);
            };
        }();
        var splitProperty = function () {
            var cache = {};
            return function (input, separator) {
                if (!separator) {
                    separator = /^\s*,\s*/;
                }
                var cacheKey = input + separator;
                if (hasOwnProperty(cache, cacheKey)) {
                    return cache[cacheKey];
                }
                var ret = [];
                var last$$1 = 0, pos = 0;
                var in_paren = 0;
                var in_string = false;
                var m;
                function looking_at(rx) {
                    return m = rx.exec(input.substr(pos));
                }
                function trim(str) {
                    return str.replace(/^\s+|\s+$/g, '');
                }
                while (pos < input.length) {
                    if (!in_string && looking_at(/^[\(\[\{]/)) {
                        in_paren++;
                        pos++;
                    } else if (!in_string && looking_at(/^[\)\]\}]/)) {
                        in_paren--;
                        pos++;
                    } else if (!in_string && looking_at(/^[\"\']/)) {
                        in_string = m[0];
                        pos++;
                    } else if (in_string == '\'' && looking_at(/^\\\'/)) {
                        pos += 2;
                    } else if (in_string == '"' && looking_at(/^\\\"/)) {
                        pos += 2;
                    } else if (in_string == '\'' && looking_at(/^\'/)) {
                        in_string = false;
                        pos++;
                    } else if (in_string == '"' && looking_at(/^\"/)) {
                        in_string = false;
                        pos++;
                    } else if (looking_at(separator)) {
                        if (!in_string && !in_paren && pos > last$$1) {
                            ret.push(trim(input.substring(last$$1, pos)));
                            last$$1 = pos + m[0].length;
                        }
                        pos += m[0].length;
                    } else {
                        pos++;
                    }
                }
                if (last$$1 < pos) {
                    ret.push(trim(input.substring(last$$1, pos)));
                }
                return cache[cacheKey] = ret;
            };
        }();
        var getFontURL = function (cache) {
            return function (el) {
                var url = cache[el];
                if (!url) {
                    var m;
                    if (m = /url\((['"]?)([^'")]*?)\1\)\s+format\((['"]?)truetype\3\)/.exec(el)) {
                        url = cache[el] = m[2];
                    } else if (m = /url\((['"]?)([^'")]*?\.ttf)\1\)/.exec(el)) {
                        url = cache[el] = m[2];
                    }
                }
                return url;
            };
        }(Object.create ? Object.create(null) : {});
        var getFontHeight = function (cache) {
            return function (font) {
                var height = cache[font];
                if (height == null) {
                    height = cache[font] = kendoUtil.measureText('Mapq', { font: font }).height;
                }
                return height;
            };
        }(Object.create ? Object.create(null) : {});
        function getFontFaces(doc) {
            if (doc == null) {
                doc = document;
            }
            var result = {};
            for (var i = 0; i < doc.styleSheets.length; ++i) {
                doStylesheet(doc.styleSheets[i]);
            }
            return result;
            function doStylesheet(ss) {
                if (ss) {
                    var rules = null;
                    try {
                        rules = ss.cssRules;
                    } catch (ex) {
                    }
                    if (rules) {
                        addRules(ss, rules);
                    }
                }
            }
            function findFonts(rule) {
                var src = getPropertyValue(rule.style, 'src');
                if (src) {
                    return splitProperty(src).reduce(function (a, el) {
                        var font = getFontURL(el);
                        if (font) {
                            a.push(font);
                        }
                        return a;
                    }, []);
                } else {
                    var font = getFontURL(rule.cssText);
                    return font ? [font] : [];
                }
            }
            function addRules(styleSheet, rules) {
                for (var i = 0; i < rules.length; ++i) {
                    var r = rules[i];
                    switch (r.type) {
                    case 3:
                        doStylesheet(r.styleSheet);
                        break;
                    case 5:
                        var style = r.style;
                        var family = splitProperty(getPropertyValue(style, 'font-family'));
                        var bold = /^([56789]00|bold)$/i.test(getPropertyValue(style, 'font-weight'));
                        var italic = 'italic' == getPropertyValue(style, 'font-style');
                        var src = findFonts(r);
                        if (src.length > 0) {
                            addRule(styleSheet, family, bold, italic, src[0]);
                        }
                    }
                }
            }
            function addRule(styleSheet, names, bold, italic, url) {
                if (!/^data:/i.test(url)) {
                    if (!(/^[^\/:]+:\/\//.test(url) || /^\//.test(url))) {
                        url = String(styleSheet.href).replace(/[^\/]*$/, '') + url;
                    }
                }
                names.forEach(function (name) {
                    name = name.replace(/^(['"]?)(.*?)\1$/, '$2');
                    if (bold) {
                        name += '|bold';
                    }
                    if (italic) {
                        name += '|italic';
                    }
                    result[name] = url;
                });
            }
        }
        function hasOwnProperty(obj, key) {
            return Object.prototype.hasOwnProperty.call(obj, key);
        }
        function getCounter(name) {
            name = '_counter_' + name;
            return nodeInfo[name];
        }
        function getAllCounters(name) {
            var values = [], p = nodeInfo;
            name = '_counter_' + name;
            while (p) {
                if (hasOwnProperty(p, name)) {
                    values.push(p[name]);
                }
                p = Object.getPrototypeOf(p);
            }
            return values.reverse();
        }
        function incCounter(name, inc) {
            var p = nodeInfo;
            name = '_counter_' + name;
            while (p && !hasOwnProperty(p, name)) {
                p = Object.getPrototypeOf(p);
            }
            if (!p) {
                p = nodeInfo._root;
            }
            p[name] = (p[name] || 0) + (inc == null ? 1 : inc);
        }
        function resetCounter(name, val) {
            name = '_counter_' + name;
            nodeInfo[name] = val == null ? 0 : val;
        }
        function doCounters(a, f, def) {
            for (var i = 0; i < a.length;) {
                var name = a[i++];
                var val = parseFloat(a[i]);
                if (isNaN(val)) {
                    f(name, def);
                } else {
                    f(name, val);
                    ++i;
                }
            }
        }
        function updateCounters(style) {
            var counterReset = getPropertyValue(style, 'counter-reset');
            if (counterReset) {
                doCounters(splitProperty(counterReset, /^\s+/), resetCounter, 0);
            }
            var counterIncrement = getPropertyValue(style, 'counter-increment');
            if (counterIncrement) {
                doCounters(splitProperty(counterIncrement, /^\s+/), incCounter, 1);
            }
        }
        function parseColor$1(str, css) {
            var color = kendo.parseColor(str, true);
            if (color) {
                color = color.toRGB();
                if (css) {
                    color = color.toCssRgba();
                } else if (color.a === 0) {
                    color = null;
                }
            }
            return color;
        }
        function whenImagesAreActuallyLoaded(elements, callback) {
            var pending = 0;
            elements.forEach(function (el) {
                var images = el.querySelectorAll('img');
                for (var i = 0; i < images.length; ++i) {
                    var img = images[i];
                    if (!img.complete) {
                        pending++;
                        img.onload = img.onerror = next;
                    }
                }
            });
            if (!pending) {
                next();
            }
            function next() {
                if (--pending <= 0) {
                    callback();
                }
            }
        }
        function cacheImages(element, callback) {
            var urls = [];
            function add(url) {
                if (!IMAGE_CACHE[url]) {
                    IMAGE_CACHE[url] = true;
                    urls.push(url);
                }
            }
            (function dive(element) {
                if (/^img$/i.test(element.tagName)) {
                    add(element.src);
                }
                parseBackgroundImage(getPropertyValue(getComputedStyle(element), 'background-image')).forEach(function (bg) {
                    if (bg.type == 'url') {
                        add(bg.url);
                    }
                });
                if (element.children) {
                    slice$1(element.children).forEach(dive);
                }
            }(element));
            var count = urls.length;
            function next() {
                if (--count <= 0) {
                    callback();
                }
            }
            if (count === 0) {
                next();
            }
            urls.forEach(function (url) {
                var img = IMAGE_CACHE[url] = new window.Image();
                if (!/^data:/i.test(url)) {
                    img.crossOrigin = 'Anonymous';
                }
                img.src = url;
                if (img.complete) {
                    next();
                } else {
                    img.onload = next;
                    img.onerror = function () {
                        IMAGE_CACHE[url] = null;
                        next();
                    };
                }
            });
        }
        function alphaNumeral(n) {
            var result = '';
            do {
                var r = n % 26;
                result = String.fromCharCode(97 + r) + result;
                n = Math.floor(n / 26);
            } while (n > 0);
            return result;
        }
        function pushNodeInfo(element, style, group) {
            nodeInfo = Object.create(nodeInfo);
            nodeInfo[element.tagName.toLowerCase()] = {
                element: element,
                style: style
            };
            var decoration = getPropertyValue(style, 'text-decoration');
            if (decoration && decoration != 'none') {
                var color = getPropertyValue(style, 'color');
                decoration.split(/\s+/g).forEach(function (name) {
                    if (!nodeInfo[name]) {
                        nodeInfo[name] = color;
                    }
                });
            }
            if (createsStackingContext(style)) {
                nodeInfo._stackingContext = {
                    element: element,
                    group: group
                };
            }
        }
        function popNodeInfo() {
            nodeInfo = Object.getPrototypeOf(nodeInfo);
        }
        function updateClipbox(path) {
            if (nodeInfo._clipbox != null) {
                var box = path.bbox(nodeInfo._matrix);
                if (nodeInfo._clipbox) {
                    nodeInfo._clipbox = Rect.intersect(nodeInfo._clipbox, box);
                } else {
                    nodeInfo._clipbox = box;
                }
            }
        }
        function emptyClipbox() {
            var cb = nodeInfo._clipbox;
            if (cb == null) {
                return true;
            }
            if (cb) {
                return cb.width() === 0 || cb.height() === 0;
            }
        }
        function createsStackingContext(style) {
            function prop(name) {
                return getPropertyValue(style, name);
            }
            if (prop('transform') != 'none' || prop('position') != 'static' || prop('z-index') != 'auto' || prop('opacity') < 1) {
                return true;
            }
        }
        function getComputedStyle(element, pseudoElt) {
            return window.getComputedStyle(element, pseudoElt || null);
        }
        function getPropertyValue(style, prop, defa) {
            var val = style.getPropertyValue(prop);
            if (val == null || val === '') {
                if (browser.webkit) {
                    val = style.getPropertyValue('-webkit-' + prop);
                } else if (browser.mozilla) {
                    val = style.getPropertyValue('-moz-' + prop);
                } else if (browser.opera) {
                    val = style.getPropertyValue('-o-' + prop);
                } else if (browser.msie) {
                    val = style.getPropertyValue('-ms-' + prop);
                }
            }
            if (arguments.length > 2 && (val == null || val === '')) {
                return defa;
            } else {
                return val;
            }
        }
        function pleaseSetPropertyValue(style, prop, value, important) {
            style.setProperty(prop, value, important);
            if (browser.webkit) {
                style.setProperty('-webkit-' + prop, value, important);
            } else if (browser.mozilla) {
                style.setProperty('-moz-' + prop, value, important);
            } else if (browser.opera) {
                style.setProperty('-o-' + prop, value, important);
            } else if (browser.msie) {
                style.setProperty('-ms-' + prop, value, important);
                prop = 'ms' + prop.replace(/(^|-)([a-z])/g, function (s, p1, p2) {
                    return p1 + p2.toUpperCase();
                });
                style[prop] = value;
            }
        }
        function getBorder(style, side) {
            side = 'border-' + side;
            return {
                width: parseFloat(getPropertyValue(style, side + '-width')),
                style: getPropertyValue(style, side + '-style'),
                color: parseColor$1(getPropertyValue(style, side + '-color'), true)
            };
        }
        function saveStyle(element, func) {
            var prev = element.style.cssText;
            var result = func();
            element.style.cssText = prev;
            return result;
        }
        function getBorderRadius(style, side) {
            var r = getPropertyValue(style, 'border-' + side + '-radius').split(/\s+/g).map(parseFloat);
            if (r.length == 1) {
                r.push(r[0]);
            }
            return sanitizeRadius({
                x: r[0],
                y: r[1]
            });
        }
        function getContentBox(element) {
            var box = element.getBoundingClientRect();
            box = innerBox(box, 'border-*-width', element);
            box = innerBox(box, 'padding-*', element);
            return box;
        }
        function innerBox(box, prop, element) {
            var style, wt, wr, wb, wl;
            if (typeof prop == 'string') {
                style = getComputedStyle(element);
                wt = parseFloat(getPropertyValue(style, prop.replace('*', 'top')));
                wr = parseFloat(getPropertyValue(style, prop.replace('*', 'right')));
                wb = parseFloat(getPropertyValue(style, prop.replace('*', 'bottom')));
                wl = parseFloat(getPropertyValue(style, prop.replace('*', 'left')));
            } else if (typeof prop == 'number') {
                wt = wr = wb = wl = prop;
            }
            return {
                top: box.top + wt,
                right: box.right - wr,
                bottom: box.bottom - wb,
                left: box.left + wl,
                width: box.right - box.left - wr - wl,
                height: box.bottom - box.top - wb - wt
            };
        }
        function getTransform(style) {
            var transform$$1 = getPropertyValue(style, 'transform');
            if (transform$$1 == 'none') {
                return null;
            }
            var matrix = /^\s*matrix\(\s*(.*?)\s*\)\s*$/.exec(transform$$1);
            if (matrix) {
                var origin = getPropertyValue(style, 'transform-origin');
                matrix = matrix[1].split(/\s*,\s*/g).map(parseFloat);
                origin = origin.split(/\s+/g).map(parseFloat);
                return {
                    matrix: matrix,
                    origin: origin
                };
            }
        }
        function radiansToDegrees(radians) {
            return 180 * radians / Math.PI % 360;
        }
        function parseAngle(angle) {
            var num = parseFloat(angle);
            if (/grad$/.test(angle)) {
                return Math.PI * num / 200;
            } else if (/rad$/.test(angle)) {
                return num;
            } else if (/turn$/.test(angle)) {
                return Math.PI * num * 2;
            } else if (/deg$/.test(angle)) {
                return Math.PI * num / 180;
            }
        }
        function setTransform(shape, m) {
            m = new Matrix(m[0], m[1], m[2], m[3], m[4], m[5]);
            shape.transform(m);
            return m;
        }
        function setClipping(shape, clipPath) {
            shape.clip(clipPath);
        }
        function addArcToPath(path, x, y, options) {
            var points = new Arc$2([
                    x,
                    y
                ], options).curvePoints(), i = 1;
            while (i < points.length) {
                path.curveTo(points[i++], points[i++], points[i++]);
            }
        }
        function sanitizeRadius(r) {
            if (r.x <= 0 || r.y <= 0) {
                r.x = r.y = 0;
            }
            return r;
        }
        function adjustBorderRadiusForBox(box, rTL, rTR, rBR, rBL) {
            var tl_x = Math.max(0, rTL.x), tl_y = Math.max(0, rTL.y);
            var tr_x = Math.max(0, rTR.x), tr_y = Math.max(0, rTR.y);
            var br_x = Math.max(0, rBR.x), br_y = Math.max(0, rBR.y);
            var bl_x = Math.max(0, rBL.x), bl_y = Math.max(0, rBL.y);
            var f = Math.min(box.width / (tl_x + tr_x), box.height / (tr_y + br_y), box.width / (br_x + bl_x), box.height / (bl_y + tl_y));
            if (f < 1) {
                tl_x *= f;
                tl_y *= f;
                tr_x *= f;
                tr_y *= f;
                br_x *= f;
                br_y *= f;
                bl_x *= f;
                bl_y *= f;
            }
            return {
                tl: {
                    x: tl_x,
                    y: tl_y
                },
                tr: {
                    x: tr_x,
                    y: tr_y
                },
                br: {
                    x: br_x,
                    y: br_y
                },
                bl: {
                    x: bl_x,
                    y: bl_y
                }
            };
        }
        function elementRoundBox(element, box, type) {
            var style = getComputedStyle(element);
            var rTL = getBorderRadius(style, 'top-left');
            var rTR = getBorderRadius(style, 'top-right');
            var rBL = getBorderRadius(style, 'bottom-left');
            var rBR = getBorderRadius(style, 'bottom-right');
            if (type == 'padding' || type == 'content') {
                var bt = getBorder(style, 'top');
                var br = getBorder(style, 'right');
                var bb = getBorder(style, 'bottom');
                var bl = getBorder(style, 'left');
                rTL.x -= bl.width;
                rTL.y -= bt.width;
                rTR.x -= br.width;
                rTR.y -= bt.width;
                rBR.x -= br.width;
                rBR.y -= bb.width;
                rBL.x -= bl.width;
                rBL.y -= bb.width;
                if (type == 'content') {
                    var pt = parseFloat(getPropertyValue(style, 'padding-top'));
                    var pr = parseFloat(getPropertyValue(style, 'padding-right'));
                    var pb = parseFloat(getPropertyValue(style, 'padding-bottom'));
                    var pl = parseFloat(getPropertyValue(style, 'padding-left'));
                    rTL.x -= pl;
                    rTL.y -= pt;
                    rTR.x -= pr;
                    rTR.y -= pt;
                    rBR.x -= pr;
                    rBR.y -= pb;
                    rBL.x -= pl;
                    rBL.y -= pb;
                }
            }
            if (typeof type == 'number') {
                rTL.x -= type;
                rTL.y -= type;
                rTR.x -= type;
                rTR.y -= type;
                rBR.x -= type;
                rBR.y -= type;
                rBL.x -= type;
                rBL.y -= type;
            }
            return roundBox(box, rTL, rTR, rBR, rBL);
        }
        function roundBox(box, rTL0, rTR0, rBR0, rBL0) {
            var tmp = adjustBorderRadiusForBox(box, rTL0, rTR0, rBR0, rBL0);
            var rTL = tmp.tl;
            var rTR = tmp.tr;
            var rBR = tmp.br;
            var rBL = tmp.bl;
            var path = new Path({
                fill: null,
                stroke: null
            });
            path.moveTo(box.left, box.top + rTL.y);
            if (rTL.x) {
                addArcToPath(path, box.left + rTL.x, box.top + rTL.y, {
                    startAngle: -180,
                    endAngle: -90,
                    radiusX: rTL.x,
                    radiusY: rTL.y
                });
            }
            path.lineTo(box.right - rTR.x, box.top);
            if (rTR.x) {
                addArcToPath(path, box.right - rTR.x, box.top + rTR.y, {
                    startAngle: -90,
                    endAngle: 0,
                    radiusX: rTR.x,
                    radiusY: rTR.y
                });
            }
            path.lineTo(box.right, box.bottom - rBR.y);
            if (rBR.x) {
                addArcToPath(path, box.right - rBR.x, box.bottom - rBR.y, {
                    startAngle: 0,
                    endAngle: 90,
                    radiusX: rBR.x,
                    radiusY: rBR.y
                });
            }
            path.lineTo(box.left + rBL.x, box.bottom);
            if (rBL.x) {
                addArcToPath(path, box.left + rBL.x, box.bottom - rBL.y, {
                    startAngle: 90,
                    endAngle: 180,
                    radiusX: rBL.x,
                    radiusY: rBL.y
                });
            }
            return path.close();
        }
        function formatCounter(val, style) {
            var str = String(parseFloat(val));
            switch (style) {
            case 'decimal-leading-zero':
                if (str.length < 2) {
                    str = '0' + str;
                }
                return str;
            case 'lower-roman':
                return arabicToRoman(val).toLowerCase();
            case 'upper-roman':
                return arabicToRoman(val).toUpperCase();
            case 'lower-latin':
            case 'lower-alpha':
                return alphaNumeral(val - 1);
            case 'upper-latin':
            case 'upper-alpha':
                return alphaNumeral(val - 1).toUpperCase();
            default:
                return str;
            }
        }
        function evalPseudoElementContent(element, content) {
            function displayCounter(name, style, separator) {
                if (!separator) {
                    return formatCounter(getCounter(name) || 0, style);
                }
                separator = separator.replace(/^\s*(["'])(.*)\1\s*$/, '$2');
                return getAllCounters(name).map(function (val) {
                    return formatCounter(val, style);
                }).join(separator);
            }
            var a = splitProperty(content, /^\s+/);
            var result = [], m;
            a.forEach(function (el) {
                var tmp;
                if (m = /^\s*(["'])(.*)\1\s*$/.exec(el)) {
                    result.push(m[2].replace(/\\([0-9a-f]{4})/gi, function (s, p) {
                        return String.fromCharCode(parseInt(p, 16));
                    }));
                } else if (m = /^\s*counter\((.*?)\)\s*$/.exec(el)) {
                    tmp = splitProperty(m[1]);
                    result.push(displayCounter(tmp[0], tmp[1]));
                } else if (m = /^\s*counters\((.*?)\)\s*$/.exec(el)) {
                    tmp = splitProperty(m[1]);
                    result.push(displayCounter(tmp[0], tmp[2], tmp[1]));
                } else if (m = /^\s*attr\((.*?)\)\s*$/.exec(el)) {
                    result.push(element.getAttribute(m[1]) || '');
                } else {
                    result.push(el);
                }
            });
            return result.join('');
        }
        function getCssText(style) {
            if (style.cssText) {
                return style.cssText;
            }
            var result = [];
            for (var i = 0; i < style.length; ++i) {
                result.push(style[i] + ': ' + getPropertyValue(style, style[i]));
            }
            return result.join(';\n');
        }
        function _renderWithPseudoElements(element, group) {
            if (element.tagName == KENDO_PSEUDO_ELEMENT) {
                _renderElement(element, group);
                return;
            }
            var fake = [];
            function pseudo(kind, place) {
                var style = getComputedStyle(element, kind);
                updateCounters(style);
                if (style.content && style.content != 'normal' && style.content != 'none' && style.width != '0px') {
                    var psel = element.ownerDocument.createElement(KENDO_PSEUDO_ELEMENT);
                    psel.style.cssText = getCssText(style);
                    psel.textContent = evalPseudoElementContent(element, style.content);
                    element.insertBefore(psel, place);
                    fake.push(psel);
                }
            }
            pseudo(':before', element.firstChild);
            pseudo(':after', null);
            var saveClass = element.className;
            element.className += ' kendo-pdf-hide-pseudo-elements';
            _renderElement(element, group);
            element.className = saveClass;
            fake.forEach(function (el) {
                element.removeChild(el);
            });
        }
        function _renderElement(element, group) {
            var style = getComputedStyle(element);
            var top = getBorder(style, 'top');
            var right = getBorder(style, 'right');
            var bottom = getBorder(style, 'bottom');
            var left = getBorder(style, 'left');
            var rTL0 = getBorderRadius(style, 'top-left');
            var rTR0 = getBorderRadius(style, 'top-right');
            var rBL0 = getBorderRadius(style, 'bottom-left');
            var rBR0 = getBorderRadius(style, 'bottom-right');
            var dir = getPropertyValue(style, 'direction');
            var backgroundColor = getPropertyValue(style, 'background-color');
            backgroundColor = parseColor$1(backgroundColor);
            var backgroundImage = parseBackgroundImage(getPropertyValue(style, 'background-image'));
            var backgroundRepeat = splitProperty(getPropertyValue(style, 'background-repeat'));
            var backgroundPosition = splitProperty(getPropertyValue(style, 'background-position'));
            var backgroundOrigin = splitProperty(getPropertyValue(style, 'background-origin'));
            var backgroundSize = splitProperty(getPropertyValue(style, 'background-size'));
            if (browser.msie && browser.version < 10) {
                backgroundPosition = splitProperty(element.currentStyle.backgroundPosition);
            }
            var innerbox = innerBox(element.getBoundingClientRect(), 'border-*-width', element);
            (function () {
                var clip = getPropertyValue(style, 'clip');
                var m = /^\s*rect\((.*)\)\s*$/.exec(clip);
                if (m) {
                    var a = m[1].split(/[ ,]+/g);
                    var top = a[0] == 'auto' ? innerbox.top : parseFloat(a[0]) + innerbox.top;
                    var right = a[1] == 'auto' ? innerbox.right : parseFloat(a[1]) + innerbox.left;
                    var bottom = a[2] == 'auto' ? innerbox.bottom : parseFloat(a[2]) + innerbox.top;
                    var left = a[3] == 'auto' ? innerbox.left : parseFloat(a[3]) + innerbox.left;
                    var tmp = new Group();
                    var clipPath = new Path().moveTo(left, top).lineTo(right, top).lineTo(right, bottom).lineTo(left, bottom).close();
                    setClipping(tmp, clipPath);
                    group.append(tmp);
                    group = tmp;
                    updateClipbox(clipPath);
                }
            }());
            var boxes, i, cells;
            var display = getPropertyValue(style, 'display');
            if (display == 'table-row') {
                boxes = [];
                for (i = 0, cells = element.children; i < cells.length; ++i) {
                    boxes.push(cells[i].getBoundingClientRect());
                }
            } else {
                boxes = element.getClientRects();
                if (boxes.length == 1) {
                    boxes = [element.getBoundingClientRect()];
                }
            }
            boxes = adjustBoxes(boxes);
            for (i = 0; i < boxes.length; ++i) {
                drawOneBox(boxes[i], i === 0, i == boxes.length - 1);
            }
            if (boxes.length > 0 && display == 'list-item' && !element.getAttribute('kendo-no-bullet')) {
                drawBullet(boxes[0]);
            }
            (function () {
                function clipit() {
                    var clipPath = elementRoundBox(element, innerbox, 'padding');
                    var tmp = new Group();
                    setClipping(tmp, clipPath);
                    group.append(tmp);
                    group = tmp;
                    updateClipbox(clipPath);
                }
                if (isFormField(element)) {
                    clipit();
                } else if (/^(hidden|auto|scroll)/.test(getPropertyValue(style, 'overflow'))) {
                    clipit();
                } else if (/^(hidden|auto|scroll)/.test(getPropertyValue(style, 'overflow-x'))) {
                    clipit();
                } else if (/^(hidden|auto|scroll)/.test(getPropertyValue(style, 'overflow-y'))) {
                    clipit();
                }
            }());
            if (!maybeRenderWidget(element, group)) {
                renderContents(element, group);
            }
            return group;
            function adjustBoxes(boxes) {
                if (/^td$/i.test(element.tagName)) {
                    var table = nodeInfo.table;
                    if (table && getPropertyValue(table.style, 'border-collapse') == 'collapse') {
                        var tableBorderLeft = getBorder(table.style, 'left').width;
                        var tableBorderTop = getBorder(table.style, 'top').width;
                        if (tableBorderLeft === 0 && tableBorderTop === 0) {
                            return boxes;
                        }
                        var tableBox = table.element.getBoundingClientRect();
                        var firstCell = table.element.rows[0].cells[0];
                        var firstCellBox = firstCell.getBoundingClientRect();
                        if (firstCellBox.top == tableBox.top || firstCellBox.left == tableBox.left) {
                            return slice$1(boxes).map(function (box) {
                                return {
                                    left: box.left + tableBorderLeft,
                                    top: box.top + tableBorderTop,
                                    right: box.right + tableBorderLeft,
                                    bottom: box.bottom + tableBorderTop,
                                    height: box.height,
                                    width: box.width
                                };
                            });
                        }
                    }
                }
                return boxes;
            }
            function drawEdge(color, len, Wtop, Wleft, Wright, rl, rr, transform$$1) {
                if (Wtop <= 0) {
                    return;
                }
                var path, edge = new Group();
                setTransform(edge, transform$$1);
                group.append(edge);
                sanitizeRadius(rl);
                sanitizeRadius(rr);
                path = new Path({
                    fill: { color: color },
                    stroke: null
                });
                edge.append(path);
                path.moveTo(rl.x ? Math.max(rl.x, Wleft) : 0, 0).lineTo(len - (rr.x ? Math.max(rr.x, Wright) : 0), 0).lineTo(len - Math.max(rr.x, Wright), Wtop).lineTo(Math.max(rl.x, Wleft), Wtop).close();
                if (rl.x) {
                    drawRoundCorner(Wleft, rl, [
                        -1,
                        0,
                        0,
                        1,
                        rl.x,
                        0
                    ]);
                }
                if (rr.x) {
                    drawRoundCorner(Wright, rr, [
                        1,
                        0,
                        0,
                        1,
                        len - rr.x,
                        0
                    ]);
                }
                function drawRoundCorner(Wright, r, transform$$1) {
                    var angle = Math.PI / 2 * Wright / (Wright + Wtop);
                    var ri = {
                        x: r.x - Wright,
                        y: r.y - Wtop
                    };
                    var path = new Path({
                        fill: { color: color },
                        stroke: null
                    }).moveTo(0, 0);
                    setTransform(path, transform$$1);
                    addArcToPath(path, 0, r.y, {
                        startAngle: -90,
                        endAngle: -radiansToDegrees(angle),
                        radiusX: r.x,
                        radiusY: r.y
                    });
                    if (ri.x > 0 && ri.y > 0) {
                        path.lineTo(ri.x * Math.cos(angle), r.y - ri.y * Math.sin(angle));
                        addArcToPath(path, 0, r.y, {
                            startAngle: -radiansToDegrees(angle),
                            endAngle: -90,
                            radiusX: ri.x,
                            radiusY: ri.y,
                            anticlockwise: true
                        });
                    } else if (ri.x > 0) {
                        path.lineTo(ri.x, Wtop).lineTo(0, Wtop);
                    } else {
                        path.lineTo(ri.x, Wtop).lineTo(ri.x, 0);
                    }
                    edge.append(path.close());
                }
            }
            function drawBackground(box) {
                var background = new Group();
                setClipping(background, roundBox(box, rTL0, rTR0, rBR0, rBL0));
                group.append(background);
                if (element.tagName == 'A' && element.href && !/^#?$/.test(element.getAttribute('href'))) {
                    if (!nodeInfo._avoidLinks || !matches(element, nodeInfo._avoidLinks)) {
                        background._pdfLink = {
                            url: element.href,
                            top: box.top,
                            right: box.right,
                            bottom: box.bottom,
                            left: box.left
                        };
                    }
                }
                if (backgroundColor) {
                    var path = new Path({
                        fill: { color: backgroundColor.toCssRgba() },
                        stroke: null
                    });
                    path.moveTo(box.left, box.top).lineTo(box.right, box.top).lineTo(box.right, box.bottom).lineTo(box.left, box.bottom).close();
                    background.append(path);
                }
                for (var i = backgroundImage.length; --i >= 0;) {
                    drawOneBackground(background, box, backgroundImage[i], backgroundRepeat[i % backgroundRepeat.length], backgroundPosition[i % backgroundPosition.length], backgroundOrigin[i % backgroundOrigin.length], backgroundSize[i % backgroundSize.length]);
                }
            }
            function drawOneBackground(group, box, background, backgroundRepeat, backgroundPosition, backgroundOrigin, backgroundSize) {
                if (!background || background == 'none') {
                    return;
                }
                if (background.type == 'url') {
                    if (/^url\(\"data:image\/svg/i.test(background.url)) {
                        return;
                    }
                    var img = IMAGE_CACHE[background.url];
                    if (img && img.width > 0 && img.height > 0) {
                        drawBackgroundImage(group, box, img.width, img.height, function (group, rect) {
                            group.append(new Image$1(background.url, rect));
                        });
                    }
                } else if (background.type == 'linear') {
                    drawBackgroundImage(group, box, box.width, box.height, gradientRenderer(background));
                } else {
                    return;
                }
                function drawBackgroundImage(group, box, img_width, img_height, renderBG) {
                    var aspect_ratio = img_width / img_height, f;
                    var orgBox = box;
                    if (backgroundOrigin == 'content-box') {
                        orgBox = innerBox(orgBox, 'border-*-width', element);
                        orgBox = innerBox(orgBox, 'padding-*', element);
                    } else if (backgroundOrigin == 'padding-box') {
                        orgBox = innerBox(orgBox, 'border-*-width', element);
                    }
                    if (!/^\s*auto(\s+auto)?\s*$/.test(backgroundSize)) {
                        if (backgroundSize == 'contain') {
                            f = Math.min(orgBox.width / img_width, orgBox.height / img_height);
                            img_width *= f;
                            img_height *= f;
                        } else if (backgroundSize == 'cover') {
                            f = Math.max(orgBox.width / img_width, orgBox.height / img_height);
                            img_width *= f;
                            img_height *= f;
                        } else {
                            var size = backgroundSize.split(/\s+/g);
                            if (/%$/.test(size[0])) {
                                img_width = orgBox.width * parseFloat(size[0]) / 100;
                            } else {
                                img_width = parseFloat(size[0]);
                            }
                            if (size.length == 1 || size[1] == 'auto') {
                                img_height = img_width / aspect_ratio;
                            } else if (/%$/.test(size[1])) {
                                img_height = orgBox.height * parseFloat(size[1]) / 100;
                            } else {
                                img_height = parseFloat(size[1]);
                            }
                        }
                    }
                    var pos = String(backgroundPosition);
                    switch (pos) {
                    case 'bottom':
                        pos = '50% 100%';
                        break;
                    case 'top':
                        pos = '50% 0';
                        break;
                    case 'left':
                        pos = '0 50%';
                        break;
                    case 'right':
                        pos = '100% 50%';
                        break;
                    case 'center':
                        pos = '50% 50%';
                        break;
                    }
                    pos = pos.split(/\s+/);
                    if (pos.length == 1) {
                        pos[1] = '50%';
                    }
                    if (/%$/.test(pos[0])) {
                        pos[0] = parseFloat(pos[0]) / 100 * (orgBox.width - img_width);
                    } else {
                        pos[0] = parseFloat(pos[0]);
                    }
                    if (/%$/.test(pos[1])) {
                        pos[1] = parseFloat(pos[1]) / 100 * (orgBox.height - img_height);
                    } else {
                        pos[1] = parseFloat(pos[1]);
                    }
                    var rect = new Rect([
                        orgBox.left + pos[0],
                        orgBox.top + pos[1]
                    ], [
                        img_width,
                        img_height
                    ]);
                    function rewX() {
                        while (rect.origin.x > box.left) {
                            rect.origin.x -= img_width;
                        }
                    }
                    function rewY() {
                        while (rect.origin.y > box.top) {
                            rect.origin.y -= img_height;
                        }
                    }
                    function repeatX() {
                        while (rect.origin.x < box.right) {
                            renderBG(group, rect.clone());
                            rect.origin.x += img_width;
                        }
                    }
                    if (backgroundRepeat == 'no-repeat') {
                        renderBG(group, rect);
                    } else if (backgroundRepeat == 'repeat-x') {
                        rewX();
                        repeatX();
                    } else if (backgroundRepeat == 'repeat-y') {
                        rewY();
                        while (rect.origin.y < box.bottom) {
                            renderBG(group, rect.clone());
                            rect.origin.y += img_height;
                        }
                    } else if (backgroundRepeat == 'repeat') {
                        rewX();
                        rewY();
                        var origin = rect.origin.clone();
                        while (rect.origin.y < box.bottom) {
                            rect.origin.x = origin.x;
                            repeatX();
                            rect.origin.y += img_height;
                        }
                    }
                }
            }
            function drawBullet() {
                var listStyleType = getPropertyValue(style, 'list-style-type');
                if (listStyleType == 'none') {
                    return;
                }
                var listStylePosition = getPropertyValue(style, 'list-style-position');
                function _drawBullet(f) {
                    saveStyle(element, function () {
                        element.style.position = 'relative';
                        var bullet = element.ownerDocument.createElement(KENDO_PSEUDO_ELEMENT);
                        bullet.style.position = 'absolute';
                        bullet.style.boxSizing = 'border-box';
                        if (listStylePosition == 'outside') {
                            bullet.style.width = '6em';
                            bullet.style.left = '-6.8em';
                            bullet.style.textAlign = 'right';
                        } else {
                            bullet.style.left = '0px';
                        }
                        f(bullet);
                        element.insertBefore(bullet, element.firstChild);
                        renderElement(bullet, group);
                        element.removeChild(bullet);
                    });
                }
                function elementIndex(f) {
                    var a = element.parentNode.children;
                    var k = element.getAttribute('kendo-split-index');
                    if (k != null) {
                        return f(k | 0, a.length);
                    }
                    for (var i = 0; i < a.length; ++i) {
                        if (a[i] === element) {
                            return f(i, a.length);
                        }
                    }
                }
                switch (listStyleType) {
                case 'circle':
                case 'disc':
                case 'square':
                    _drawBullet(function (bullet) {
                        bullet.style.fontSize = '60%';
                        bullet.style.lineHeight = '200%';
                        bullet.style.paddingRight = '0.5em';
                        bullet.style.fontFamily = 'DejaVu Serif';
                        bullet.innerHTML = {
                            'disc': '\u25CF',
                            'circle': '\u25EF',
                            'square': '\u25A0'
                        }[listStyleType];
                    });
                    break;
                case 'decimal':
                case 'decimal-leading-zero':
                    _drawBullet(function (bullet) {
                        elementIndex(function (idx) {
                            ++idx;
                            if (listStyleType == 'decimal-leading-zero' && idx < 10) {
                                idx = '0' + idx;
                            }
                            bullet.innerHTML = idx + '.';
                        });
                    });
                    break;
                case 'lower-roman':
                case 'upper-roman':
                    _drawBullet(function (bullet) {
                        elementIndex(function (idx) {
                            idx = arabicToRoman(idx + 1);
                            if (listStyleType == 'upper-roman') {
                                idx = idx.toUpperCase();
                            }
                            bullet.innerHTML = idx + '.';
                        });
                    });
                    break;
                case 'lower-latin':
                case 'lower-alpha':
                case 'upper-latin':
                case 'upper-alpha':
                    _drawBullet(function (bullet) {
                        elementIndex(function (idx) {
                            idx = alphaNumeral(idx);
                            if (/^upper/i.test(listStyleType)) {
                                idx = idx.toUpperCase();
                            }
                            bullet.innerHTML = idx + '.';
                        });
                    });
                    break;
                }
            }
            function drawOneBox(box, isFirst, isLast) {
                if (box.width === 0 || box.height === 0) {
                    return;
                }
                drawBackground(box);
                var shouldDrawLeft = left.width > 0 && (isFirst && dir == 'ltr' || isLast && dir == 'rtl');
                var shouldDrawRight = right.width > 0 && (isLast && dir == 'ltr' || isFirst && dir == 'rtl');
                if (top.width === 0 && left.width === 0 && right.width === 0 && bottom.width === 0) {
                    return;
                }
                if (top.color == right.color && top.color == bottom.color && top.color == left.color) {
                    if (top.width == right.width && top.width == bottom.width && top.width == left.width) {
                        if (shouldDrawLeft && shouldDrawRight) {
                            box = innerBox(box, top.width / 2);
                            var path = elementRoundBox(element, box, top.width / 2);
                            path.options.stroke = {
                                color: top.color,
                                width: top.width
                            };
                            group.append(path);
                            return;
                        }
                    }
                }
                if (rTL0.x === 0 && rTR0.x === 0 && rBR0.x === 0 && rBL0.x === 0) {
                    if (top.width < 2 && left.width < 2 && right.width < 2 && bottom.width < 2) {
                        if (top.width > 0) {
                            group.append(new Path({
                                stroke: {
                                    width: top.width,
                                    color: top.color
                                }
                            }).moveTo(box.left, box.top + top.width / 2).lineTo(box.right, box.top + top.width / 2));
                        }
                        if (bottom.width > 0) {
                            group.append(new Path({
                                stroke: {
                                    width: bottom.width,
                                    color: bottom.color
                                }
                            }).moveTo(box.left, box.bottom - bottom.width / 2).lineTo(box.right, box.bottom - bottom.width / 2));
                        }
                        if (shouldDrawLeft) {
                            group.append(new Path({
                                stroke: {
                                    width: left.width,
                                    color: left.color
                                }
                            }).moveTo(box.left + left.width / 2, box.top).lineTo(box.left + left.width / 2, box.bottom));
                        }
                        if (shouldDrawRight) {
                            group.append(new Path({
                                stroke: {
                                    width: right.width,
                                    color: right.color
                                }
                            }).moveTo(box.right - right.width / 2, box.top).lineTo(box.right - right.width / 2, box.bottom));
                        }
                        return;
                    }
                }
                var tmp = adjustBorderRadiusForBox(box, rTL0, rTR0, rBR0, rBL0);
                var rTL = tmp.tl;
                var rTR = tmp.tr;
                var rBR = tmp.br;
                var rBL = tmp.bl;
                drawEdge(top.color, box.width, top.width, left.width, right.width, rTL, rTR, [
                    1,
                    0,
                    0,
                    1,
                    box.left,
                    box.top
                ]);
                drawEdge(bottom.color, box.width, bottom.width, right.width, left.width, rBR, rBL, [
                    -1,
                    0,
                    0,
                    -1,
                    box.right,
                    box.bottom
                ]);
                function inv(p) {
                    return {
                        x: p.y,
                        y: p.x
                    };
                }
                drawEdge(left.color, box.height, left.width, bottom.width, top.width, inv(rBL), inv(rTL), [
                    0,
                    -1,
                    1,
                    0,
                    box.left,
                    box.bottom
                ]);
                drawEdge(right.color, box.height, right.width, top.width, bottom.width, inv(rTR), inv(rBR), [
                    0,
                    1,
                    -1,
                    0,
                    box.right,
                    box.top
                ]);
            }
        }
        function gradientRenderer(gradient) {
            return function (group, rect) {
                var width = rect.width(), height = rect.height();
                switch (gradient.type) {
                case 'linear':
                    var angle = gradient.angle != null ? gradient.angle : Math.PI;
                    switch (gradient.to) {
                    case 'top':
                        angle = 0;
                        break;
                    case 'left':
                        angle = -Math.PI / 2;
                        break;
                    case 'bottom':
                        angle = Math.PI;
                        break;
                    case 'right':
                        angle = Math.PI / 2;
                        break;
                    case 'top left':
                    case 'left top':
                        angle = -Math.atan2(height, width);
                        break;
                    case 'top right':
                    case 'right top':
                        angle = Math.atan2(height, width);
                        break;
                    case 'bottom left':
                    case 'left bottom':
                        angle = Math.PI + Math.atan2(height, width);
                        break;
                    case 'bottom right':
                    case 'right bottom':
                        angle = Math.PI - Math.atan2(height, width);
                        break;
                    }
                    if (gradient.reverse) {
                        angle -= Math.PI;
                    }
                    angle %= 2 * Math.PI;
                    if (angle < 0) {
                        angle += 2 * Math.PI;
                    }
                    var pxlen = Math.abs(width * Math.sin(angle)) + Math.abs(height * Math.cos(angle));
                    var scaledAngle = Math.atan(width * Math.tan(angle) / height);
                    var sin = Math.sin(scaledAngle), cos = Math.cos(scaledAngle);
                    var len = Math.abs(sin) + Math.abs(cos);
                    var x = len / 2 * sin;
                    var y = len / 2 * cos;
                    if (angle > Math.PI / 2 && angle <= 3 * Math.PI / 2) {
                        x = -x;
                        y = -y;
                    }
                    var implicit = [], right = 0;
                    var stops = gradient.stops.map(function (s, i) {
                        var offset = s.percent;
                        if (offset) {
                            offset = parseFloat(offset) / 100;
                        } else if (s.length) {
                            offset = parseFloat(s.length) / pxlen;
                        } else if (i === 0) {
                            offset = 0;
                        } else if (i == gradient.stops.length - 1) {
                            offset = 1;
                        }
                        var stop = {
                            color: s.color.toCssRgba(),
                            offset: offset
                        };
                        if (offset != null) {
                            right = offset;
                            implicit.forEach(function (s, i) {
                                var stop = s.stop;
                                stop.offset = s.left + (right - s.left) * (i + 1) / (implicit.length + 1);
                            });
                            implicit = [];
                        } else {
                            implicit.push({
                                left: right,
                                stop: stop
                            });
                        }
                        return stop;
                    });
                    var start = [
                        0.5 - x,
                        0.5 + y
                    ];
                    var end = [
                        0.5 + x,
                        0.5 - y
                    ];
                    group.append(Path.fromRect(rect).stroke(null).fill(new LinearGradient({
                        start: start,
                        end: end,
                        stops: stops,
                        userSpace: false
                    })));
                    break;
                case 'radial':
                    if (window.console && window.console.log) {
                        window.console.log('Radial gradients are not yet supported in HTML renderer');
                    }
                    break;
                }
            };
        }
        function maybeRenderWidget(element, group) {
            if (window.kendo && window.kendo.jQuery && element.getAttribute(window.kendo.attr('role'))) {
                var widget = window.kendo.widgetInstance(window.kendo.jQuery(element));
                if (widget && (widget.exportDOMVisual || widget.exportVisual)) {
                    var visual;
                    if (widget.exportDOMVisual) {
                        visual = widget.exportDOMVisual();
                    } else {
                        visual = widget.exportVisual();
                    }
                    if (!visual) {
                        return false;
                    }
                    var wrap$$1 = new Group();
                    wrap$$1.children.push(visual);
                    var bbox = element.getBoundingClientRect();
                    wrap$$1.transform(transform().translate(bbox.left, bbox.top));
                    group.append(wrap$$1);
                    return true;
                }
            }
        }
        function renderImage(element, url, group) {
            var box = getContentBox(element);
            var rect = new Rect([
                box.left,
                box.top
            ], [
                box.width,
                box.height
            ]);
            var image = new Image$1(url, rect);
            setClipping(image, elementRoundBox(element, box, 'content'));
            group.append(image);
        }
        function zIndexSort(a, b) {
            var sa = getComputedStyle(a);
            var sb = getComputedStyle(b);
            var za = parseFloat(getPropertyValue(sa, 'z-index'));
            var zb = parseFloat(getPropertyValue(sb, 'z-index'));
            var pa = getPropertyValue(sa, 'position');
            var pb = getPropertyValue(sb, 'position');
            if (isNaN(za) && isNaN(zb)) {
                if (/static|absolute/.test(pa) && /static|absolute/.test(pb)) {
                    return 0;
                }
                if (pa == 'static') {
                    return -1;
                }
                if (pb == 'static') {
                    return 1;
                }
                return 0;
            }
            if (isNaN(za)) {
                return zb === 0 ? 0 : zb > 0 ? -1 : 1;
            }
            if (isNaN(zb)) {
                return za === 0 ? 0 : za > 0 ? 1 : -1;
            }
            return parseFloat(za) - parseFloat(zb);
        }
        function isFormField(element) {
            return /^(?:textarea|select|input)$/i.test(element.tagName);
        }
        function getSelectedOption(element) {
            if (element.selectedOptions && element.selectedOptions.length > 0) {
                return element.selectedOptions[0];
            }
            return element.options[element.selectedIndex];
        }
        function renderCheckbox(element, group) {
            var style = getComputedStyle(element);
            var color = getPropertyValue(style, 'color');
            var box = element.getBoundingClientRect();
            if (element.type == 'checkbox') {
                group.append(Path.fromRect(new Rect([
                    box.left + 1,
                    box.top + 1
                ], [
                    box.width - 2,
                    box.height - 2
                ])).stroke(color, 1));
                if (element.checked) {
                    group.append(new Path().stroke(color, 1.2).moveTo(box.left + 0.22 * box.width, box.top + 0.55 * box.height).lineTo(box.left + 0.45 * box.width, box.top + 0.75 * box.height).lineTo(box.left + 0.78 * box.width, box.top + 0.22 * box.width));
                }
            } else {
                group.append(new Circle(new Circle$2([
                    (box.left + box.right) / 2,
                    (box.top + box.bottom) / 2
                ], Math.min(box.width - 2, box.height - 2) / 2)).stroke(color, 1));
                if (element.checked) {
                    group.append(new Circle(new Circle$2([
                        (box.left + box.right) / 2,
                        (box.top + box.bottom) / 2
                    ], Math.min(box.width - 8, box.height - 8) / 2)).fill(color).stroke(null));
                }
            }
        }
        function renderFormField(element, group) {
            var tag = element.tagName.toLowerCase();
            if (tag == 'input' && (element.type == 'checkbox' || element.type == 'radio')) {
                return renderCheckbox(element, group);
            }
            var p = element.parentNode;
            var doc = element.ownerDocument;
            var el = doc.createElement(KENDO_PSEUDO_ELEMENT);
            var option;
            el.style.cssText = getCssText(getComputedStyle(element));
            if (tag == 'input') {
                el.style.whiteSpace = 'pre';
            }
            if (tag == 'select' || tag == 'textarea') {
                el.style.overflow = 'auto';
            }
            if (tag == 'select') {
                if (element.multiple) {
                    for (var i = 0; i < element.options.length; ++i) {
                        option = doc.createElement(KENDO_PSEUDO_ELEMENT);
                        option.style.cssText = getCssText(getComputedStyle(element.options[i]));
                        option.style.display = 'block';
                        option.textContent = element.options[i].textContent;
                        el.appendChild(option);
                    }
                } else {
                    option = getSelectedOption(element);
                    if (option) {
                        el.textContent = option.textContent;
                    }
                }
            } else {
                el.textContent = element.value;
            }
            p.insertBefore(el, element);
            el.scrollLeft = element.scrollLeft;
            el.scrollTop = element.scrollTop;
            element.style.display = 'none';
            renderContents(el, group);
            element.style.display = '';
            p.removeChild(el);
        }
        function renderContents(element, group) {
            if (nodeInfo._stackingContext.element === element) {
                nodeInfo._stackingContext.group = group;
            }
            switch (element.tagName.toLowerCase()) {
            case 'img':
                renderImage(element, element.src, group);
                break;
            case 'canvas':
                try {
                    renderImage(element, element.toDataURL('image/png'), group);
                } catch (ex) {
                }
                break;
            case 'textarea':
            case 'input':
            case 'select':
                renderFormField(element, group);
                break;
            default:
                var children = [], floats = [], positioned = [];
                for (var i = element.firstChild; i; i = i.nextSibling) {
                    switch (i.nodeType) {
                    case 3:
                        if (/\S/.test(i.data)) {
                            renderText(element, i, group);
                        }
                        break;
                    case 1:
                        var style = getComputedStyle(i);
                        var floating = getPropertyValue(style, 'float');
                        var position = getPropertyValue(style, 'position');
                        if (position != 'static') {
                            positioned.push(i);
                        } else if (floating != 'none') {
                            floats.push(i);
                        } else {
                            children.push(i);
                        }
                        break;
                    }
                }
                mergeSort(children, zIndexSort).forEach(function (el) {
                    renderElement(el, group);
                });
                mergeSort(floats, zIndexSort).forEach(function (el) {
                    renderElement(el, group);
                });
                mergeSort(positioned, zIndexSort).forEach(function (el) {
                    renderElement(el, group);
                });
            }
        }
        function renderText(element, node, group) {
            if (emptyClipbox()) {
                return;
            }
            var style = getComputedStyle(element);
            if (parseFloat(getPropertyValue(style, 'text-indent')) < -500) {
                return;
            }
            var text = node.data;
            var start = 0;
            var end = text.search(/\S\s*$/) + 1;
            if (!end) {
                return;
            }
            var fontSize = getPropertyValue(style, 'font-size');
            var lineHeight = getPropertyValue(style, 'line-height');
            var font = [
                getPropertyValue(style, 'font-style'),
                getPropertyValue(style, 'font-variant'),
                getPropertyValue(style, 'font-weight'),
                fontSize,
                getPropertyValue(style, 'font-family')
            ].join(' ');
            fontSize = parseFloat(fontSize);
            lineHeight = parseFloat(lineHeight);
            if (fontSize === 0) {
                return;
            }
            var color = getPropertyValue(style, 'color');
            var range = element.ownerDocument.createRange();
            var align$$1 = getPropertyValue(style, 'text-align');
            var isJustified = align$$1 == 'justify';
            var columnCount = getPropertyValue(style, 'column-count', 1);
            var whiteSpace = getPropertyValue(style, 'white-space');
            var textOverflow, saveTextOverflow;
            if (browser.msie) {
                textOverflow = style.textOverflow;
                if (textOverflow == 'ellipsis') {
                    saveTextOverflow = element.style.textOverflow;
                    element.style.textOverflow = 'clip';
                }
            }
            var estimateLineLength = element.getBoundingClientRect().width / fontSize * 5;
            if (estimateLineLength === 0) {
                estimateLineLength = 500;
            }
            var prevLineBottom = null;
            var underline = nodeInfo['underline'];
            var lineThrough = nodeInfo['line-through'];
            var overline = nodeInfo['overline'];
            var hasDecoration = underline || lineThrough || overline;
            while (!doChunk()) {
            }
            if (browser.msie && textOverflow == 'ellipsis') {
                element.style.textOverflow = saveTextOverflow;
            }
            if (hasDecoration) {
                range.selectNode(node);
                slice$1(range.getClientRects()).forEach(decorate);
            }
            return;
            function actuallyGetRangeBoundingRect(range) {
                if (browser.msie || browser.chrome) {
                    var rectangles = range.getClientRects(), box = {
                            top: Infinity,
                            right: -Infinity,
                            bottom: -Infinity,
                            left: Infinity
                        };
                    for (var i = 0; i < rectangles.length; ++i) {
                        var b = rectangles[i];
                        if (b.width <= 1 || b.bottom === prevLineBottom) {
                            continue;
                        }
                        box.left = Math.min(b.left, box.left);
                        box.top = Math.min(b.top, box.top);
                        box.right = Math.max(b.right, box.right);
                        box.bottom = Math.max(b.bottom, box.bottom);
                    }
                    box.width = box.right - box.left;
                    box.height = box.bottom - box.top;
                    return box;
                }
                return range.getBoundingClientRect();
            }
            function doChunk() {
                var origStart = start;
                var box, pos = text.substr(start).search(/\S/);
                start += pos;
                if (pos < 0 || start >= end) {
                    return true;
                }
                range.setStart(node, start);
                range.setEnd(node, start + 1);
                box = actuallyGetRangeBoundingRect(range);
                var found = false;
                if (isJustified || columnCount > 1) {
                    pos = text.substr(start).search(/\s/);
                    if (pos >= 0) {
                        range.setEnd(node, start + pos);
                        var r = actuallyGetRangeBoundingRect(range);
                        if (r.bottom == box.bottom) {
                            box = r;
                            found = true;
                            start += pos;
                        }
                    }
                }
                if (!found) {
                    pos = function findEOL(min, eol, max) {
                        range.setEnd(node, eol);
                        var r = actuallyGetRangeBoundingRect(range);
                        if (r.bottom != box.bottom && min < eol) {
                            return findEOL(min, min + eol >> 1, eol);
                        } else if (r.right != box.right) {
                            box = r;
                            if (eol < max) {
                                return findEOL(eol, eol + max >> 1, max);
                            } else {
                                return eol;
                            }
                        } else {
                            return eol;
                        }
                    }(start, Math.min(end, start + estimateLineLength), end);
                    if (pos == start) {
                        return true;
                    }
                    start = pos;
                    pos = range.toString().search(/\s+$/);
                    if (pos === 0) {
                        return false;
                    }
                    if (pos > 0) {
                        range.setEnd(node, range.startOffset + pos);
                        box = actuallyGetRangeBoundingRect(range);
                    }
                }
                if (browser.msie) {
                    box = range.getClientRects()[0];
                }
                var str = range.toString();
                if (!/^(?:pre|pre-wrap)$/i.test(whiteSpace)) {
                    str = str.replace(/\s+/g, ' ');
                } else if (/\t/.test(str)) {
                    var cc = 0;
                    for (pos = origStart; pos < range.startOffset; ++pos) {
                        var code = text.charCodeAt(pos);
                        if (code == 9) {
                            cc += 8 - cc % 8;
                        } else if (code == 10 || code == 13) {
                            cc = 0;
                        } else {
                            cc++;
                        }
                    }
                    while ((pos = str.search('\t')) >= 0) {
                        var indent = '        '.substr(0, 8 - (cc + pos) % 8);
                        str = str.substr(0, pos) + indent + str.substr(pos + 1);
                    }
                }
                if (!found) {
                    prevLineBottom = box.bottom;
                }
                drawText(str, box);
            }
            function drawText(str, box) {
                if (browser.msie && !isNaN(lineHeight)) {
                    var height = getFontHeight(font);
                    var top = (box.top + box.bottom - height) / 2;
                    box = {
                        top: top,
                        right: box.right,
                        bottom: top + height,
                        left: box.left,
                        height: height,
                        width: box.right - box.left
                    };
                }
                var text = new TextRect(str, new Rect([
                    box.left,
                    box.top
                ], [
                    box.width,
                    box.height
                ]), {
                    font: font,
                    fill: { color: color }
                });
                group.append(text);
            }
            function decorate(box) {
                line(underline, box.bottom);
                line(lineThrough, box.bottom - box.height / 2.7);
                line(overline, box.top);
                function line(color, ypos) {
                    if (color) {
                        var width = fontSize / 12;
                        var path = new Path({
                            stroke: {
                                width: width,
                                color: color
                            }
                        });
                        ypos -= width;
                        path.moveTo(box.left, ypos).lineTo(box.right, ypos);
                        group.append(path);
                    }
                }
            }
        }
        function groupInStackingContext(element, group, zIndex) {
            var main;
            if (zIndex != 'auto') {
                main = nodeInfo._stackingContext.group;
                zIndex = parseFloat(zIndex);
            } else {
                main = group;
                zIndex = 0;
            }
            var a = main.children;
            for (var i = 0; i < a.length; ++i) {
                if (a[i]._dom_zIndex != null && a[i]._dom_zIndex > zIndex) {
                    break;
                }
            }
            var tmp = new Group();
            main.insert(i, tmp);
            tmp._dom_zIndex = zIndex;
            if (main !== group) {
                if (nodeInfo._clipbox) {
                    var m = nodeInfo._matrix.invert();
                    var r = nodeInfo._clipbox.transformCopy(m);
                    setClipping(tmp, Path.fromRect(r));
                }
            }
            return tmp;
        }
        function renderElement(element, container) {
            var style = getComputedStyle(element);
            updateCounters(style);
            if (/^(style|script|link|meta|iframe|svg|col|colgroup)$/i.test(element.tagName)) {
                return;
            }
            if (nodeInfo._clipbox == null) {
                return;
            }
            var opacity = parseFloat(getPropertyValue(style, 'opacity'));
            var visibility = getPropertyValue(style, 'visibility');
            var display = getPropertyValue(style, 'display');
            if (opacity === 0 || visibility == 'hidden' || display == 'none') {
                return;
            }
            var tr = getTransform(style);
            var group;
            var zIndex = getPropertyValue(style, 'z-index');
            if ((tr || opacity < 1) && zIndex == 'auto') {
                zIndex = 0;
            }
            group = groupInStackingContext(element, container, zIndex);
            if (opacity < 1) {
                group.opacity(opacity * group.opacity());
            }
            pushNodeInfo(element, style, group);
            if (!tr) {
                _renderWithPseudoElements(element, group);
            } else {
                saveStyle(element, function () {
                    pleaseSetPropertyValue(element.style, 'transform', 'none', 'important');
                    pleaseSetPropertyValue(element.style, 'transition', 'none', 'important');
                    if (getPropertyValue(style, 'position') == 'static') {
                        pleaseSetPropertyValue(element.style, 'position', 'relative', 'important');
                    }
                    var bbox = element.getBoundingClientRect();
                    var x = bbox.left + tr.origin[0];
                    var y = bbox.top + tr.origin[1];
                    var m = [
                        1,
                        0,
                        0,
                        1,
                        -x,
                        -y
                    ];
                    m = mmul(m, tr.matrix);
                    m = mmul(m, [
                        1,
                        0,
                        0,
                        1,
                        x,
                        y
                    ]);
                    m = setTransform(group, m);
                    nodeInfo._matrix = nodeInfo._matrix.multiplyCopy(m);
                    _renderWithPseudoElements(element, group);
                });
            }
            popNodeInfo();
        }
        function mmul(a, b) {
            var a1 = a[0], b1 = a[1], c1 = a[2], d1 = a[3], e1 = a[4], f1 = a[5];
            var a2 = b[0], b2 = b[1], c2 = b[2], d2 = b[3], e2 = b[4], f2 = b[5];
            return [
                a1 * a2 + b1 * c2,
                a1 * b2 + b1 * d2,
                c1 * a2 + d1 * c2,
                c1 * b2 + d1 * d2,
                e1 * a2 + f1 * c2 + e2,
                e1 * b2 + f1 * d2 + f2
            ];
        }
        var drawing = {
            svg: svg,
            canvas: canvas,
            util: util,
            PathParser: PathParser,
            Surface: Surface,
            BaseNode: BaseNode,
            SurfaceFactory: SurfaceFactory,
            OptionsStore: OptionsStore,
            exportImage: exportImage,
            exportSVG: exportSVG,
            QuadNode: QuadNode,
            ShapesQuadTree: ShapesQuadTree,
            ObserversMixin: ObserversMixin,
            Element: Element$1,
            Circle: Circle,
            Arc: Arc,
            Path: Path,
            MultiPath: MultiPath,
            Text: Text,
            Image: Image$1,
            Group: Group,
            Layout: Layout,
            Rect: Rect$2,
            align: align,
            vAlign: vAlign,
            stack: stack,
            vStack: vStack,
            wrap: wrap,
            vWrap: vWrap,
            fit: fit,
            LinearGradient: LinearGradient,
            RadialGradient: RadialGradient,
            GradientStop: GradientStop,
            Gradient: Gradient,
            Animation: Animation,
            AnimationFactory: AnimationFactory,
            drawDOM: drawDOM
        };
        kendo.deepExtend(kendo, {
            drawing: drawing,
            geometry: geometry
        });
        kendo.drawing.Segment = kendo.geometry.Segment;
        kendo.dataviz.drawing = kendo.drawing;
        kendo.dataviz.geometry = kendo.geometry;
        kendo.drawing.util.measureText = kendo.util.measureText;
        kendo.drawing.util.objectKey = kendo.util.objectKey;
        kendo.drawing.Color = kendo.Color;
        kendo.util.encodeBase64 = kendo.drawing.util.encodeBase64;
    }(window.kendo.jQuery));
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('drawing/surface-tooltip', [
        'kendo.popup',
        'drawing/kendo-drawing'
    ], f);
}(function () {
    (function ($) {
        var NS = '.kendo';
        var kendo = window.kendo;
        var deepExtend = kendo.deepExtend;
        var utils = kendo.drawing.util;
        var defined = utils.defined;
        var limitValue = utils.limitValue;
        var eventCoordinates = utils.eventCoordinates;
        var outerWidth = kendo._outerWidth;
        var outerHeight = kendo._outerHeight;
        var proxy = $.proxy;
        var TOOLTIP_TEMPLATE = '<div class="k-tooltip">' + '<div class="k-tooltip-content"></div>' + '</div>';
        var TOOLTIP_CLOSE_TEMPLATE = '<div class="k-tooltip-button"><a href="\\#" class="k-icon k-i-close">close</a></div>';
        var SurfaceTooltip = kendo.Class.extend({
            init: function (surface, options) {
                this.element = $(TOOLTIP_TEMPLATE);
                this.content = this.element.children('.k-tooltip-content');
                options = options || {};
                this.options = deepExtend({}, this.options, this._tooltipOptions(options));
                this.popupOptions = {
                    appendTo: options.appendTo,
                    animation: options.animation,
                    copyAnchorStyles: false,
                    collision: 'fit fit'
                };
                this._openPopupHandler = $.proxy(this._openPopup, this);
                this.surface = surface;
                this._bindEvents();
            },
            options: {
                position: 'top',
                showOn: 'mouseenter',
                offset: 7,
                autoHide: true,
                hideDelay: 0,
                showAfter: 100
            },
            _bindEvents: function () {
                this._showHandler = proxy(this._showEvent, this);
                this._surfaceLeaveHandler = proxy(this._surfaceLeave, this);
                this._mouseleaveHandler = proxy(this._mouseleave, this);
                this._mousemoveHandler = proxy(this._mousemove, this);
                this.surface.bind('click', this._showHandler);
                this.surface.bind('mouseenter', this._showHandler);
                this.surface.bind('mouseleave', this._mouseleaveHandler);
                this.surface.bind('mousemove', this._mousemoveHandler);
                this.surface.element.on('mouseleave' + NS, this._surfaceLeaveHandler);
                this.element.on('click' + NS, '.k-tooltip-button', proxy(this._hideClick, this));
            },
            getPopup: function () {
                if (!this.popup) {
                    this.popup = new kendo.ui.Popup(this.element, this.popupOptions);
                }
                return this.popup;
            },
            destroy: function () {
                var popup = this.popup;
                this.surface.unbind('click', this._showHandler);
                this.surface.unbind('mouseenter', this._showHandler);
                this.surface.unbind('mouseleave', this._mouseleaveHandler);
                this.surface.unbind('mousemove', this._mousemoveHandler);
                this.surface.element.off('mouseleave' + NS, this._surfaceLeaveHandler);
                this.element.off('click' + NS);
                if (popup) {
                    popup.destroy();
                    delete this.popup;
                }
                delete this.popupOptions;
                clearTimeout(this._timeout);
                delete this.element;
                delete this.content;
                delete this.surface;
            },
            _tooltipOptions: function (options) {
                options = options || {};
                return {
                    position: options.position,
                    showOn: options.showOn,
                    offset: options.offset,
                    autoHide: options.autoHide,
                    width: options.width,
                    height: options.height,
                    content: options.content,
                    shared: options.shared,
                    hideDelay: options.hideDelay,
                    showAfter: options.showAfter
                };
            },
            _tooltipShape: function (shape) {
                while (shape && !shape.options.tooltip) {
                    shape = shape.parent;
                }
                return shape;
            },
            _updateContent: function (target, shape, options) {
                var content = options.content;
                if (kendo.isFunction(content)) {
                    content = content({
                        element: shape,
                        target: target
                    });
                }
                if (content) {
                    this.content.html(content);
                    return true;
                }
            },
            _position: function (shape, options, elementSize, event) {
                var position = options.position;
                var tooltipOffset = options.offset || 0;
                var surface = this.surface;
                var offset = surface._instance._elementOffset();
                var size = surface.getSize();
                var surfaceOffset = surface._instance._offset;
                var bbox = shape.bbox();
                var width = elementSize.width;
                var height = elementSize.height;
                var left = 0, top = 0;
                bbox.origin.translate(offset.left, offset.top);
                if (surfaceOffset) {
                    bbox.origin.translate(-surfaceOffset.x, -surfaceOffset.y);
                }
                if (position == 'cursor' && event) {
                    var coord = eventCoordinates(event);
                    left = coord.x - width / 2;
                    top = coord.y - height - tooltipOffset;
                } else if (position == 'left') {
                    left = bbox.origin.x - width - tooltipOffset;
                    top = bbox.center().y - height / 2;
                } else if (position == 'right') {
                    left = bbox.bottomRight().x + tooltipOffset;
                    top = bbox.center().y - height / 2;
                } else if (position == 'bottom') {
                    left = bbox.center().x - width / 2;
                    top = bbox.bottomRight().y + tooltipOffset;
                } else {
                    left = bbox.center().x - width / 2;
                    top = bbox.origin.y - height - tooltipOffset;
                }
                return {
                    left: limitValue(left, offset.left, offset.left + size.width),
                    top: limitValue(top, offset.top, offset.top + size.height)
                };
            },
            show: function (shape, options) {
                this._show(shape, shape, deepExtend({}, this.options, this._tooltipOptions(shape.options.tooltip), options));
            },
            hide: function () {
                var popup = this.popup;
                var current = this._current;
                delete this._current;
                clearTimeout(this._showTimeout);
                if (popup && popup.visible() && current && !this.surface.trigger('tooltipClose', {
                        element: current.shape,
                        target: current.target,
                        popup: popup
                    })) {
                    popup.close();
                }
            },
            _hideClick: function (e) {
                e.preventDefault();
                this.hide();
            },
            _show: function (target, shape, options, event, delay) {
                var current = this._current;
                clearTimeout(this._timeout);
                if (current && (current.shape === shape && options.shared || current.target === target)) {
                    return;
                }
                clearTimeout(this._showTimeout);
                var popup = this.getPopup();
                if (!this.surface.trigger('tooltipOpen', {
                        element: shape,
                        target: target,
                        popup: popup
                    }) && this._updateContent(target, shape, options)) {
                    this._autoHide(options);
                    var elementSize = this._measure(options);
                    if (popup.visible()) {
                        popup.close(true);
                    }
                    this._current = {
                        options: options,
                        elementSize: elementSize,
                        shape: shape,
                        target: target,
                        position: this._position(options.shared ? shape : target, options, elementSize, event)
                    };
                    if (delay) {
                        this._showTimeout = setTimeout(this._openPopupHandler, options.showAfter || 0);
                    } else {
                        this._openPopup();
                    }
                }
            },
            _openPopup: function () {
                var current = this._current;
                var position = current.position;
                this.getPopup().open(position.left, position.top);
            },
            _autoHide: function (options) {
                if (options.autoHide && this._closeButton) {
                    this.element.removeClass('k-tooltip-closable');
                    this._closeButton.remove();
                    delete this._closeButton;
                }
                if (!options.autoHide && !this._closeButton) {
                    this.element.addClass('k-tooltip-closable');
                    this._closeButton = $(TOOLTIP_CLOSE_TEMPLATE).prependTo(this.element);
                }
            },
            _showEvent: function (e) {
                var shape = this._tooltipShape(e.element);
                if (shape) {
                    var options = deepExtend({}, this.options, this._tooltipOptions(shape.options.tooltip));
                    if (options && options.showOn == e.type) {
                        this._show(e.element, shape, options, e.originalEvent, true);
                    }
                }
            },
            _measure: function (options) {
                var popup = this.getPopup();
                var width, height;
                this.element.css({
                    width: 'auto',
                    height: 'auto'
                });
                var visible = popup.visible();
                if (!visible) {
                    popup.wrapper.show();
                }
                this.element.css({
                    width: defined(options.width) ? options.width : 'auto',
                    height: defined(options.height) ? options.height : 'auto'
                });
                width = outerWidth(this.element);
                height = outerHeight(this.element);
                if (!visible) {
                    popup.wrapper.hide();
                }
                return {
                    width: width,
                    height: height
                };
            },
            _mouseleave: function (e) {
                if (this.popup && !this._popupRelatedTarget(e.originalEvent)) {
                    var tooltip = this;
                    var current = tooltip._current;
                    if (current && current.options.autoHide) {
                        tooltip._timeout = setTimeout(function () {
                            clearTimeout(tooltip._showTimeout);
                            tooltip.hide();
                        }, current.options.hideDelay || 0);
                    }
                }
            },
            _mousemove: function (e) {
                var current = this._current;
                if (current && e.element) {
                    var options = current.options;
                    if (options.position == 'cursor') {
                        var position = this._position(e.element, options, current.elementSize, e.originalEvent);
                        current.position = position;
                        this.getPopup().wrapper.css({
                            left: position.left,
                            top: position.top
                        });
                    }
                }
            },
            _surfaceLeave: function (e) {
                if (this.popup && !this._popupRelatedTarget(e)) {
                    clearTimeout(this._showTimeout);
                    this.hide();
                }
            },
            _popupRelatedTarget: function (e) {
                return e.relatedTarget && $(e.relatedTarget).closest(this.popup.wrapper).length;
            }
        });
        kendo.drawing.SurfaceTooltip = SurfaceTooltip;
    }(window.kendo.jQuery));
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('drawing/surface', [
        'drawing/kendo-drawing',
        'drawing/surface-tooltip'
    ], f);
}(function () {
    (function ($) {
        var kendo = window.kendo;
        var draw = kendo.drawing;
        var DrawingSurface = draw.Surface;
        var Widget = kendo.ui.Widget;
        var deepExtend = kendo.deepExtend;
        var proxy = $.proxy;
        kendo.support.svg = DrawingSurface.support.svg;
        kendo.support.canvas = DrawingSurface.support.canvas;
        var Surface = Widget.extend({
            init: function (element, options) {
                this.options = deepExtend({}, this.options, options);
                Widget.fn.init.call(this, element, this.options);
                this._instance = DrawingSurface.create(this.element[0], options);
                if (this._instance.translate) {
                    this.translate = translate;
                }
                this._triggerInstanceHandler = proxy(this._triggerInstanceEvent, this);
                this._bindHandler('click');
                this._bindHandler('mouseenter');
                this._bindHandler('mouseleave');
                this._bindHandler('mousemove');
                this._enableTracking();
            },
            options: {
                name: 'Surface',
                tooltip: {}
            },
            events: [
                'click',
                'mouseenter',
                'mouseleave',
                'mousemove',
                'resize',
                'tooltipOpen',
                'tooltipClose'
            ],
            _triggerInstanceEvent: function (e) {
                this.trigger(e.type, e);
            },
            _bindHandler: function (event) {
                this._instance.bind(event, this._triggerInstanceHandler);
            },
            draw: function (element) {
                this._instance.draw(element);
            },
            clear: function () {
                if (this._instance) {
                    this._instance.clear();
                }
                this.hideTooltip();
            },
            destroy: function () {
                if (this._instance) {
                    this._instance.destroy();
                    delete this._instance;
                }
                if (this._tooltip) {
                    this._tooltip.destroy();
                    delete this._tooltip;
                }
                Widget.fn.destroy.call(this);
            },
            exportVisual: function () {
                return this._instance.exportVisual();
            },
            eventTarget: function (e) {
                return this._instance.eventTarget(e);
            },
            showTooltip: function (shape, options) {
                if (this._tooltip) {
                    this._tooltip.show(shape, options);
                }
            },
            hideTooltip: function () {
                if (this._tooltip) {
                    this._tooltip.hide();
                }
            },
            suspendTracking: function () {
                this._instance.suspendTracking();
                this.hideTooltip();
            },
            resumeTracking: function () {
                this._instance.resumeTracking();
            },
            getSize: function () {
                return {
                    width: this.element.width(),
                    height: this.element.height()
                };
            },
            setSize: function (size) {
                this.element.css({
                    width: size.width,
                    height: size.height
                });
                this._size = size;
                this._instance.currentSize(size);
                this._resize();
            },
            _resize: function () {
                this._instance.currentSize(this._size);
                this._instance._resize();
            },
            _enableTracking: function () {
                if (kendo.ui.Popup) {
                    this._tooltip = new draw.SurfaceTooltip(this, this.options.tooltip || {});
                }
            }
        });
        kendo.ui.plugin(Surface);
        Surface.create = function (element, options) {
            return new Surface(element, options);
        };
        kendo.drawing.Surface = Surface;
        function translate(offset) {
            this._instance.translate(offset);
        }
    }(window.kendo.jQuery));
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('drawing/html', ['drawing/kendo-drawing'], f);
}(function () {
    (function ($) {
        var kendo = window.kendo;
        var drawing = kendo.drawing;
        var drawDOM = drawing.drawDOM;
        drawing.drawDOM = function (element, options) {
            return drawDOM($(element)[0], options);
        };
        drawing.drawDOM.drawText = drawDOM.drawText;
        drawing.drawDOM.getFontFaces = drawDOM.getFontFaces;
    }(window.kendo.jQuery));
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('kendo.drawing', [
        'drawing/util',
        'drawing/kendo-drawing',
        'drawing/surface-tooltip',
        'drawing/surface',
        'drawing/html'
    ], f);
}(function () {
    var __meta__ = {
        id: 'drawing',
        name: 'Drawing API',
        category: 'framework',
        description: 'The Kendo UI low-level drawing API',
        depends: [
            'core',
            'color',
            'popup'
        ]
    };
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));