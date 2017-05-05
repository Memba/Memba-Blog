/** 
 * Kendo UI v2017.2.504 (http://www.telerik.com/kendo-ui)                                                                                                                                               
 * Copyright 2017 Telerik AD. All rights reserved.                                                                                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/
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
    define('dataviz/chart/kendo-chart', [
        'kendo.core',
        'kendo.color',
        'kendo.drawing',
        'kendo.dataviz.core'
    ], f);
}(function () {
    (function ($) {
        window.kendo.dataviz = window.kendo.dataviz || {};
        var dataviz = kendo.dataviz;
        var Class = dataviz.Class;
        var isNumber = dataviz.isNumber;
        var datavizConstants = dataviz.constants;
        var MAX_VALUE = datavizConstants.MAX_VALUE;
        var MIN_VALUE = datavizConstants.MIN_VALUE;
        var VALUE = datavizConstants.VALUE;
        var CENTER = datavizConstants.CENTER;
        var TOP = datavizConstants.TOP;
        var BOTTOM = datavizConstants.BOTTOM;
        var LEFT = datavizConstants.LEFT;
        var WHITE = datavizConstants.WHITE;
        var CIRCLE = datavizConstants.CIRCLE;
        var Y = datavizConstants.Y;
        var X = datavizConstants.X;
        var RIGHT = datavizConstants.RIGHT;
        var BLACK = datavizConstants.BLACK;
        var DATE = datavizConstants.DATE;
        var DEFAULT_PRECISION = datavizConstants.DEFAULT_PRECISION;
        var ARC = datavizConstants.ARC;
        var defined = dataviz.defined;
        var getter = dataviz.getter;
        var isArray = dataviz.isArray;
        var ChartElement = dataviz.ChartElement;
        var Point = dataviz.Point;
        var Box = dataviz.Box;
        var alignPathToPixel = dataviz.alignPathToPixel;
        var setDefaultOptions = dataviz.setDefaultOptions;
        var inArray = dataviz.inArray;
        var isFunction = dataviz.isFunction;
        var valueOrDefault = dataviz.valueOrDefault;
        var isObject = dataviz.isObject;
        var deepExtend = dataviz.deepExtend;
        var eventElement = dataviz.eventElement;
        var services = dataviz.services;
        var TemplateService = services.TemplateService;
        var TextBox = dataviz.TextBox;
        var ShapeElement = dataviz.ShapeElement;
        var getSpacing = dataviz.getSpacing;
        var limitValue = dataviz.limitValue;
        var last = dataviz.last;
        var append = dataviz.append;
        var isString = dataviz.isString;
        var parseDate = dataviz.parseDate;
        var styleValue = dataviz.styleValue;
        var CategoryAxis = dataviz.CategoryAxis;
        var BoxElement = dataviz.BoxElement;
        var round = dataviz.round;
        var grep = dataviz.grep;
        var DateCategoryAxis = dataviz.DateCategoryAxis;
        var elementStyles = dataviz.elementStyles;
        var hasClasses = dataviz.hasClasses;
        var bindEvents = dataviz.bindEvents;
        var unbindEvents = dataviz.unbindEvents;
        var support = kendo.support;
        var drawing = kendo.drawing;
        var Path = drawing.Path;
        var Animation = drawing.Animation;
        var AnimationFactory = drawing.AnimationFactory;
        var Group = drawing.Group;
        var Color = kendo.Color;
        var geometry = kendo.geometry;
        var GeometryPoint = geometry.Point;
        var transform = geometry.transform;
        var ChartAxis = Class.extend({
            init: function (axis) {
                this._axis = axis;
                this.options = axis.options;
            },
            value: function (point) {
                var axis = this._axis;
                var value = axis.getCategory ? axis.getCategory(point) : axis.getValue(point);
                return value;
            },
            slot: function (from, to, limit) {
                if (limit === void 0) {
                    limit = true;
                }
                return this._axis.slot(from, to, limit);
            },
            range: function () {
                return this._axis.range();
            },
            valueRange: function () {
                return this._axis.valueRange();
            }
        });
        var ChartPlotArea = Class.extend({
            init: function (plotArea) {
                this._plotArea = plotArea;
                this.visual = plotArea.visual;
                this.backgroundVisual = plotArea._bgVisual;
            }
        });
        function countNumbers(values) {
            var length = values.length;
            var count = 0;
            for (var i = 0; i < length; i++) {
                var num = values[i];
                if (isNumber(num)) {
                    count++;
                }
            }
            return count;
        }
        var Aggregates = {
            min: function (values) {
                var length = values.length;
                var min = MAX_VALUE;
                for (var i = 0; i < length; i++) {
                    var value = values[i];
                    if (isNumber(value)) {
                        min = Math.min(min, value);
                    }
                }
                return min === MAX_VALUE ? values[0] : min;
            },
            max: function (values) {
                var length = values.length;
                var max = MIN_VALUE;
                for (var i = 0; i < length; i++) {
                    var value = values[i];
                    if (isNumber(value)) {
                        max = Math.max(max, value);
                    }
                }
                return max === MIN_VALUE ? values[0] : max;
            },
            sum: function (values) {
                var length = values.length;
                var sum = 0;
                for (var i = 0; i < length; i++) {
                    var value = values[i];
                    if (isNumber(value)) {
                        sum += value;
                    }
                }
                return sum;
            },
            sumOrNull: function (values) {
                var result = null;
                if (countNumbers(values)) {
                    result = Aggregates.sum(values);
                }
                return result;
            },
            count: function (values) {
                var length = values.length;
                var count = 0;
                for (var i = 0; i < length; i++) {
                    var value = values[i];
                    if (value !== null && defined(value)) {
                        count++;
                    }
                }
                return count;
            },
            avg: function (values) {
                var count = countNumbers(values);
                var result = values[0];
                if (count > 0) {
                    result = Aggregates.sum(values) / count;
                }
                return result;
            },
            first: function (values) {
                var length = values.length;
                for (var i = 0; i < length; i++) {
                    var value = values[i];
                    if (value !== null && defined(value)) {
                        return value;
                    }
                }
                return values[0];
            }
        };
        function getField(field, row) {
            if (row === null) {
                return row;
            }
            var get = getter(field, true);
            return get(row);
        }
        var SeriesBinder = Class.extend({
            init: function () {
                this._valueFields = {};
                this._otherFields = {};
                this._nullValue = {};
                this._undefinedValue = {};
            },
            register: function (seriesTypes, valueFields, otherFields) {
                var this$1 = this;
                if (valueFields === void 0) {
                    valueFields = [VALUE];
                }
                if (otherFields === void 0) {
                    otherFields = {};
                }
                for (var i = 0; i < seriesTypes.length; i++) {
                    var type = seriesTypes[i];
                    this$1._valueFields[type] = valueFields;
                    this$1._otherFields[type] = otherFields;
                    this$1._nullValue[type] = this$1._makeValue(valueFields, null);
                    this$1._undefinedValue[type] = this$1._makeValue(valueFields, undefined);
                }
            },
            canonicalFields: function (series) {
                return this.valueFields(series).concat(this.otherFields(series));
            },
            valueFields: function (series) {
                return this._valueFields[series.type] || [VALUE];
            },
            otherFields: function (series) {
                return this._otherFields[series.type] || [VALUE];
            },
            bindPoint: function (series, pointIx, item) {
                var data = series.data;
                var pointData = defined(item) ? item : data[pointIx];
                var result = { valueFields: { value: pointData } };
                var valueFields = this.valueFields(series);
                var otherFields = this._otherFields[series.type];
                var fields, value;
                if (pointData === null) {
                    value = this._nullValue[series.type];
                } else if (!defined(pointData)) {
                    value = this._undefinedValue[series.type];
                } else if (Array.isArray(pointData)) {
                    var fieldData = pointData.slice(valueFields.length);
                    value = this._bindFromArray(pointData, valueFields);
                    fields = this._bindFromArray(fieldData, otherFields);
                } else if (typeof pointData === 'object') {
                    var srcValueFields = this.sourceFields(series, valueFields);
                    var srcPointFields = this.sourceFields(series, otherFields);
                    value = this._bindFromObject(pointData, valueFields, srcValueFields);
                    fields = this._bindFromObject(pointData, otherFields, srcPointFields);
                }
                if (defined(value)) {
                    if (valueFields.length === 1) {
                        result.valueFields.value = value[valueFields[0]];
                    } else {
                        result.valueFields = value;
                    }
                }
                result.fields = fields || {};
                return result;
            },
            _makeValue: function (fields, initialValue) {
                var value = {};
                var length = fields.length;
                for (var i = 0; i < length; i++) {
                    var fieldName = fields[i];
                    value[fieldName] = initialValue;
                }
                return value;
            },
            _bindFromArray: function (array, fields) {
                var value = {};
                if (fields) {
                    var length = Math.min(fields.length, array.length);
                    for (var i = 0; i < length; i++) {
                        value[fields[i]] = array[i];
                    }
                }
                return value;
            },
            _bindFromObject: function (object, fields, srcFields) {
                if (srcFields === void 0) {
                    srcFields = fields;
                }
                var value = {};
                if (fields) {
                    var length = fields.length;
                    for (var i = 0; i < length; i++) {
                        var fieldName = fields[i];
                        var srcFieldName = srcFields[i];
                        value[fieldName] = getField(srcFieldName, object);
                    }
                }
                return value;
            },
            sourceFields: function (series, canonicalFields) {
                var sourceFields = [];
                if (canonicalFields) {
                    var length = canonicalFields.length;
                    for (var i = 0; i < length; i++) {
                        var fieldName = canonicalFields[i];
                        var sourceFieldName = fieldName === VALUE ? 'field' : fieldName + 'Field';
                        sourceFields.push(series[sourceFieldName] || fieldName);
                    }
                }
                return sourceFields;
            }
        });
        SeriesBinder.current = new SeriesBinder();
        var STD_ERR = 'stderr';
        var STD_DEV = 'stddev';
        var percentRegex = /percent(?:\w*)\((\d+)\)/;
        var standardDeviationRegex = new RegExp('^' + STD_DEV + '(?:\\((\\d+(?:\\.\\d+)?)\\))?$');
        var ErrorRangeCalculator = Class.extend({
            init: function (errorValue, series, field) {
                this.initGlobalRanges(errorValue, series, field);
            },
            initGlobalRanges: function (errorValue, series, field) {
                var data = series.data;
                var deviationMatch = standardDeviationRegex.exec(errorValue);
                if (deviationMatch) {
                    this.valueGetter = this.createValueGetter(series, field);
                    var average = this.getAverage(data);
                    var deviation = this.getStandardDeviation(data, average, false);
                    var multiple = deviationMatch[1] ? parseFloat(deviationMatch[1]) : 1;
                    var errorRange = {
                        low: average.value - deviation * multiple,
                        high: average.value + deviation * multiple
                    };
                    this.globalRange = function () {
                        return errorRange;
                    };
                } else if (errorValue.indexOf && errorValue.indexOf(STD_ERR) >= 0) {
                    this.valueGetter = this.createValueGetter(series, field);
                    var standardError = this.getStandardError(data, this.getAverage(data));
                    this.globalRange = function (value) {
                        return {
                            low: value - standardError,
                            high: value + standardError
                        };
                    };
                }
            },
            createValueGetter: function (series, field) {
                var data = series.data;
                var binder = SeriesBinder.current;
                var valueFields = binder.valueFields(series);
                var item = defined(data[0]) ? data[0] : {};
                var valueGetter;
                if (isArray(item)) {
                    var index = field ? valueFields.indexOf(field) : 0;
                    valueGetter = getter('[' + index + ']');
                } else if (isNumber(item)) {
                    valueGetter = getter();
                } else if (typeof item === datavizConstants.OBJECT) {
                    var srcValueFields = binder.sourceFields(series, valueFields);
                    valueGetter = getter(srcValueFields[valueFields.indexOf(field)]);
                }
                return valueGetter;
            },
            getErrorRange: function (pointValue, errorValue) {
                var low, high, value;
                if (!defined(errorValue)) {
                    return null;
                }
                if (this.globalRange) {
                    return this.globalRange(pointValue);
                }
                if (isArray(errorValue)) {
                    low = pointValue - errorValue[0];
                    high = pointValue + errorValue[1];
                } else if (isNumber(value = parseFloat(errorValue))) {
                    low = pointValue - value;
                    high = pointValue + value;
                } else if (value = percentRegex.exec(errorValue)) {
                    var percentValue = pointValue * (parseFloat(value[1]) / 100);
                    low = pointValue - Math.abs(percentValue);
                    high = pointValue + Math.abs(percentValue);
                } else {
                    throw new Error('Invalid ErrorBar value: ' + errorValue);
                }
                return {
                    low: low,
                    high: high
                };
            },
            getStandardError: function (data, average) {
                return this.getStandardDeviation(data, average, true) / Math.sqrt(average.count);
            },
            getStandardDeviation: function (data, average, isSample) {
                var this$1 = this;
                var length = data.length;
                var total = isSample ? average.count - 1 : average.count;
                var squareDifferenceSum = 0;
                for (var idx = 0; idx < length; idx++) {
                    var value = this$1.valueGetter(data[idx]);
                    if (isNumber(value)) {
                        squareDifferenceSum += Math.pow(value - average.value, 2);
                    }
                }
                return Math.sqrt(squareDifferenceSum / total);
            },
            getAverage: function (data) {
                var this$1 = this;
                var length = data.length;
                var sum = 0;
                var count = 0;
                for (var idx = 0; idx < length; idx++) {
                    var value = this$1.valueGetter(data[idx]);
                    if (isNumber(value)) {
                        sum += value;
                        count++;
                    }
                }
                return {
                    value: sum / count,
                    count: count
                };
            }
        });
        var browser = support.browser || {};
        var INITIAL_ANIMATION_DURATION = 600;
        var FADEIN = 'fadeIn';
        var GLASS = 'glass';
        var BORDER_BRIGHTNESS = 0.8;
        var TOOLTIP_OFFSET = 5;
        var START_SCALE = browser.msie ? 0.001 : 0;
        var ERROR_LOW_FIELD = 'errorLow';
        var ERROR_HIGH_FIELD = 'errorHigh';
        var X_ERROR_LOW_FIELD = 'xErrorLow';
        var X_ERROR_HIGH_FIELD = 'xErrorHigh';
        var Y_ERROR_LOW_FIELD = 'yErrorLow';
        var Y_ERROR_HIGH_FIELD = 'yErrorHigh';
        var LINE_MARKER_SIZE = 8;
        var ZERO = 'zero';
        var INTERPOLATE = 'interpolate';
        var GAP = 'gap';
        var SMOOTH = 'smooth';
        var STEP = 'step';
        var AREA = 'area';
        var BAR = 'bar';
        var BOX_PLOT = 'boxPlot';
        var BUBBLE = 'bubble';
        var BULLET = 'bullet';
        var CANDLESTICK = 'candlestick';
        var COLUMN = 'column';
        var DONUT = 'donut';
        var FUNNEL = 'funnel';
        var HORIZONTAL_WATERFALL = 'horizontalWaterfall';
        var LINE = 'line';
        var OHLC = 'ohlc';
        var PIE = 'pie';
        var POLAR_AREA = 'polarArea';
        var POLAR_LINE = 'polarLine';
        var POLAR_SCATTER = 'polarScatter';
        var RADAR_AREA = 'radarArea';
        var RADAR_COLUMN = 'radarColumn';
        var RADAR_LINE = 'radarLine';
        var RANGE_BAR = 'rangeBar';
        var RANGE_COLUMN = 'rangeColumn';
        var SCATTER = 'scatter';
        var SCATTER_LINE = 'scatterLine';
        var VERTICAL_AREA = 'verticalArea';
        var VERTICAL_BOX_PLOT = 'verticalBoxPlot';
        var VERTICAL_BULLET = 'verticalBullet';
        var VERTICAL_LINE = 'verticalLine';
        var WATERFALL = 'waterfall';
        var EQUALLY_SPACED_SERIES = [
            BAR,
            COLUMN,
            OHLC,
            CANDLESTICK,
            BOX_PLOT,
            VERTICAL_BOX_PLOT,
            BULLET,
            RANGE_COLUMN,
            RANGE_BAR,
            WATERFALL,
            HORIZONTAL_WATERFALL
        ];
        var LEGEND_ITEM_CLICK = 'legendItemClick';
        var LEGEND_ITEM_HOVER = 'legendItemHover';
        var SERIES_CLICK = 'seriesClick';
        var SERIES_HOVER = 'seriesHover';
        var PLOT_AREA_CLICK = 'plotAreaClick';
        var PLOT_AREA_HOVER = 'plotAreaHover';
        var DRAG = 'drag';
        var DRAG_END = 'dragEnd';
        var DRAG_START = 'dragStart';
        var ZOOM_START = 'zoomStart';
        var ZOOM = 'zoom';
        var ZOOM_END = 'zoomEnd';
        var SELECT_START = 'selectStart';
        var SELECT = 'select';
        var SELECT_END = 'selectEnd';
        var RENDER = 'render';
        var SHOW_TOOLTIP = 'showTooltip';
        var HIDE_TOOLTIP = 'hideTooltip';
        var LOGARITHMIC = 'log';
        var CATEGORY = 'category';
        var INSIDE_END = 'insideEnd';
        var INSIDE_BASE = 'insideBase';
        var OUTSIDE_END = 'outsideEnd';
        var MOUSEWHEEL = 'DOMMouseScroll mousewheel';
        var MOUSEWHEEL_DELAY = 150;
        var constants = {
            INITIAL_ANIMATION_DURATION: INITIAL_ANIMATION_DURATION,
            FADEIN: FADEIN,
            LEGEND_ITEM_CLICK: LEGEND_ITEM_CLICK,
            LEGEND_ITEM_HOVER: LEGEND_ITEM_HOVER,
            SERIES_CLICK: SERIES_CLICK,
            SERIES_HOVER: SERIES_HOVER,
            GLASS: GLASS,
            BORDER_BRIGHTNESS: BORDER_BRIGHTNESS,
            TOOLTIP_OFFSET: TOOLTIP_OFFSET,
            START_SCALE: START_SCALE,
            ERROR_LOW_FIELD: ERROR_LOW_FIELD,
            ERROR_HIGH_FIELD: ERROR_HIGH_FIELD,
            X_ERROR_LOW_FIELD: X_ERROR_LOW_FIELD,
            X_ERROR_HIGH_FIELD: X_ERROR_HIGH_FIELD,
            Y_ERROR_LOW_FIELD: Y_ERROR_LOW_FIELD,
            Y_ERROR_HIGH_FIELD: Y_ERROR_HIGH_FIELD,
            LINE_MARKER_SIZE: LINE_MARKER_SIZE,
            INTERPOLATE: INTERPOLATE,
            ZERO: ZERO,
            SMOOTH: SMOOTH,
            STEP: STEP,
            CATEGORY: CATEGORY,
            FUNNEL: FUNNEL,
            BAR: BAR,
            CANDLESTICK: CANDLESTICK,
            PIE: PIE,
            COLUMN: COLUMN,
            AREA: AREA,
            VERTICAL_BULLET: VERTICAL_BULLET,
            BOX_PLOT: BOX_PLOT,
            OHLC: OHLC,
            WATERFALL: WATERFALL,
            LINE: LINE,
            BULLET: BULLET,
            VERTICAL_LINE: VERTICAL_LINE,
            VERTICAL_AREA: VERTICAL_AREA,
            RANGE_COLUMN: RANGE_COLUMN,
            VERTICAL_BOX_PLOT: VERTICAL_BOX_PLOT,
            RANGE_BAR: RANGE_BAR,
            HORIZONTAL_WATERFALL: HORIZONTAL_WATERFALL,
            SCATTER: SCATTER,
            SCATTER_LINE: SCATTER_LINE,
            BUBBLE: BUBBLE,
            RADAR_AREA: RADAR_AREA,
            RADAR_LINE: RADAR_LINE,
            RADAR_COLUMN: RADAR_COLUMN,
            POLAR_LINE: POLAR_LINE,
            POLAR_AREA: POLAR_AREA,
            POLAR_SCATTER: POLAR_SCATTER,
            RENDER: RENDER,
            PLOT_AREA_CLICK: PLOT_AREA_CLICK,
            PLOT_AREA_HOVER: PLOT_AREA_HOVER,
            LOGARITHMIC: LOGARITHMIC,
            DRAG: DRAG,
            DRAG_START: DRAG_START,
            DRAG_END: DRAG_END,
            ZOOM_START: ZOOM_START,
            ZOOM: ZOOM,
            ZOOM_END: ZOOM_END,
            SELECT_START: SELECT_START,
            SELECT: SELECT,
            SELECT_END: SELECT_END,
            GAP: GAP,
            DONUT: DONUT,
            INSIDE_END: INSIDE_END,
            INSIDE_BASE: INSIDE_BASE,
            OUTSIDE_END: OUTSIDE_END,
            MOUSEWHEEL: MOUSEWHEEL,
            MOUSEWHEEL_DELAY: MOUSEWHEEL_DELAY,
            SHOW_TOOLTIP: SHOW_TOOLTIP,
            HIDE_TOOLTIP: HIDE_TOOLTIP,
            EQUALLY_SPACED_SERIES: EQUALLY_SPACED_SERIES
        };
        var DEFAULT_ERROR_BAR_WIDTH = 4;
        var ErrorBarBase = ChartElement.extend({
            init: function (low, high, isVertical, chart, series, options) {
                ChartElement.fn.init.call(this, options);
                this.low = low;
                this.high = high;
                this.isVertical = isVertical;
                this.chart = chart;
                this.series = series;
            },
            reflow: function (targetBox) {
                var endCaps = this.options.endCaps;
                var isVertical = this.isVertical;
                var axis = this.getAxis();
                var valueBox = axis.getSlot(this.low, this.high);
                var centerBox = targetBox.center();
                var capsWidth = this.getCapsWidth(targetBox, isVertical);
                var capValue = isVertical ? centerBox.x : centerBox.y;
                var capStart = capValue - capsWidth;
                var capEnd = capValue + capsWidth;
                var linePoints;
                if (isVertical) {
                    linePoints = [
                        new Point(centerBox.x, valueBox.y1),
                        new Point(centerBox.x, valueBox.y2)
                    ];
                    if (endCaps) {
                        linePoints.push(new Point(capStart, valueBox.y1), new Point(capEnd, valueBox.y1), new Point(capStart, valueBox.y2), new Point(capEnd, valueBox.y2));
                    }
                    this.box = new Box(capStart, valueBox.y1, capEnd, valueBox.y2);
                } else {
                    linePoints = [
                        new Point(valueBox.x1, centerBox.y),
                        new Point(valueBox.x2, centerBox.y)
                    ];
                    if (endCaps) {
                        linePoints.push(new Point(valueBox.x1, capStart), new Point(valueBox.x1, capEnd), new Point(valueBox.x2, capStart), new Point(valueBox.x2, capEnd));
                    }
                    this.box = new Box(valueBox.x1, capStart, valueBox.x2, capEnd);
                }
                this.linePoints = linePoints;
            },
            getCapsWidth: function (box, isVertical) {
                var boxSize = isVertical ? box.width() : box.height();
                var capsWidth = Math.min(Math.floor(boxSize / 2), DEFAULT_ERROR_BAR_WIDTH) || DEFAULT_ERROR_BAR_WIDTH;
                return capsWidth;
            },
            createVisual: function () {
                var this$1 = this;
                var options = this.options;
                var visual = options.visual;
                if (visual) {
                    this.visual = visual({
                        low: this.low,
                        high: this.high,
                        rect: this.box.toRect(),
                        sender: this.getSender(),
                        options: {
                            endCaps: options.endCaps,
                            color: options.color,
                            line: options.line
                        },
                        createVisual: function () {
                            this$1.createDefaultVisual();
                            var defaultVisual = this$1.visual;
                            delete this$1.visual;
                            return defaultVisual;
                        }
                    });
                } else {
                    this.createDefaultVisual();
                }
            },
            createDefaultVisual: function () {
                var this$1 = this;
                var ref = this;
                var options = ref.options;
                var linePoints = ref.linePoints;
                var lineOptions = {
                    stroke: {
                        color: options.color,
                        width: options.line.width,
                        dashType: options.line.dashType
                    }
                };
                ChartElement.fn.createVisual.call(this);
                for (var idx = 0; idx < linePoints.length; idx += 2) {
                    var line = new Path(lineOptions).moveTo(linePoints[idx].x, linePoints[idx].y).lineTo(linePoints[idx + 1].x, linePoints[idx + 1].y);
                    alignPathToPixel(line);
                    this$1.visual.append(line);
                }
            }
        });
        setDefaultOptions(ErrorBarBase, {
            animation: {
                type: FADEIN,
                delay: INITIAL_ANIMATION_DURATION
            },
            endCaps: true,
            line: { width: 2 },
            zIndex: 1
        });
        var CategoricalErrorBar = ErrorBarBase.extend({
            getAxis: function () {
                var axis = this.chart.seriesValueAxis(this.series);
                return axis;
            }
        });
        var MAX_EXPAND_DEPTH = 5;
        function evalOptions(options, context, state, dryRun) {
            if (state === void 0) {
                state = {};
            }
            if (dryRun === void 0) {
                dryRun = false;
            }
            var defaults = state.defaults = state.defaults || {};
            var depth = state.depth = state.depth || 0;
            var needsEval = false;
            state.excluded = state.excluded || [];
            if (depth > MAX_EXPAND_DEPTH) {
                return null;
            }
            for (var property in options) {
                if (!inArray(property, state.excluded) && options.hasOwnProperty(property)) {
                    var propValue = options[property];
                    if (isFunction(propValue)) {
                        needsEval = true;
                        if (!dryRun) {
                            options[property] = valueOrDefault(propValue(context), defaults[property]);
                        }
                    } else if (isObject(propValue)) {
                        if (!dryRun) {
                            state.defaults = defaults[property];
                        }
                        state.depth++;
                        needsEval = evalOptions(propValue, context, state, dryRun) || needsEval;
                        state.depth--;
                    }
                }
            }
            return needsEval;
        }
        function categoriesCount(series) {
            var seriesCount = series.length;
            var categories = 0;
            for (var i = 0; i < seriesCount; i++) {
                categories = Math.max(categories, series[i].data.length);
            }
            return categories;
        }
        var CategoricalChart = ChartElement.extend({
            init: function (plotArea, options) {
                ChartElement.fn.init.call(this, options);
                this.plotArea = plotArea;
                this.chartService = plotArea.chartService;
                this.categoryAxis = plotArea.seriesCategoryAxis(options.series[0]);
                this.valueAxisRanges = {};
                this.points = [];
                this.categoryPoints = [];
                this.seriesPoints = [];
                this.seriesOptions = [];
                this._evalSeries = [];
                this.render();
            },
            render: function () {
                this.traverseDataPoints(this.addValue.bind(this));
            },
            pointOptions: function (series, seriesIx) {
                var options = this.seriesOptions[seriesIx];
                if (!options) {
                    var defaults = this.pointType().prototype.defaults;
                    this.seriesOptions[seriesIx] = options = deepExtend({}, defaults, { vertical: !this.options.invertAxes }, series);
                }
                return options;
            },
            plotValue: function (point) {
                if (!point) {
                    return 0;
                }
                if (this.options.isStacked100 && isNumber(point.value)) {
                    var categoryIx = point.categoryIx;
                    var categoryPoints = this.categoryPoints[categoryIx];
                    var otherValues = [];
                    var categorySum = 0;
                    for (var i = 0; i < categoryPoints.length; i++) {
                        var other = categoryPoints[i];
                        if (other) {
                            var stack = point.series.stack;
                            var otherStack = other.series.stack;
                            if (stack && otherStack && stack.group !== otherStack.group) {
                                continue;
                            }
                            if (isNumber(other.value)) {
                                categorySum += Math.abs(other.value);
                                otherValues.push(Math.abs(other.value));
                            }
                        }
                    }
                    if (categorySum > 0) {
                        return point.value / categorySum;
                    }
                }
                return point.value;
            },
            plotRange: function (point, startValue) {
                var this$1 = this;
                if (startValue === void 0) {
                    startValue = 0;
                }
                var categoryPoints = this.categoryPoints[point.categoryIx];
                if (this.options.isStacked) {
                    var plotValue = this.plotValue(point);
                    var positive = plotValue >= 0;
                    var prevValue = startValue;
                    var isStackedBar = false;
                    for (var i = 0; i < categoryPoints.length; i++) {
                        var other = categoryPoints[i];
                        if (point === other) {
                            break;
                        }
                        var stack = point.series.stack;
                        var otherStack = other.series.stack;
                        if (stack && otherStack) {
                            if (typeof stack === datavizConstants.STRING && stack !== otherStack) {
                                continue;
                            }
                            if (stack.group && stack.group !== otherStack.group) {
                                continue;
                            }
                        }
                        var otherValue = this$1.plotValue(other);
                        if (otherValue >= 0 && positive || otherValue < 0 && !positive) {
                            prevValue += otherValue;
                            plotValue += otherValue;
                            isStackedBar = true;
                            if (this$1.options.isStacked100) {
                                plotValue = Math.min(plotValue, 1);
                            }
                        }
                    }
                    if (isStackedBar) {
                        prevValue -= startValue;
                    }
                    return [
                        prevValue,
                        plotValue
                    ];
                }
                var series = point.series;
                var valueAxis = this.seriesValueAxis(series);
                var axisCrossingValue = this.categoryAxisCrossingValue(valueAxis);
                return [
                    axisCrossingValue,
                    point.value || axisCrossingValue
                ];
            },
            stackLimits: function (axisName, stackName) {
                var this$1 = this;
                var min = MAX_VALUE;
                var max = MIN_VALUE;
                for (var i = 0; i < this.categoryPoints.length; i++) {
                    var categoryPoints = this$1.categoryPoints[i];
                    if (!categoryPoints) {
                        continue;
                    }
                    for (var pIx = 0; pIx < categoryPoints.length; pIx++) {
                        var point = categoryPoints[pIx];
                        if (point) {
                            if (point.series.stack === stackName || point.series.axis === axisName) {
                                var to = this$1.plotRange(point, 0)[1];
                                if (defined(to) && isFinite(to)) {
                                    max = Math.max(max, to);
                                    min = Math.min(min, to);
                                }
                            }
                        }
                    }
                }
                return {
                    min: min,
                    max: max
                };
            },
            updateStackRange: function () {
                var this$1 = this;
                var ref = this.options;
                var isStacked = ref.isStacked;
                var chartSeries = ref.series;
                var limitsCache = {};
                if (isStacked) {
                    for (var i = 0; i < chartSeries.length; i++) {
                        var series = chartSeries[i];
                        var axisName = series.axis;
                        var key = axisName + series.stack;
                        var limits = limitsCache[key];
                        if (!limits) {
                            limits = this$1.stackLimits(axisName, series.stack);
                            var errorTotals = this$1.errorTotals;
                            if (errorTotals) {
                                if (errorTotals.negative.length) {
                                    limits.min = Math.min(limits.min, dataviz.sparseArrayLimits(errorTotals.negative).min);
                                }
                                if (errorTotals.positive.length) {
                                    limits.max = Math.max(limits.max, dataviz.sparseArrayLimits(errorTotals.positive).max);
                                }
                            }
                            if (limits.min !== MAX_VALUE || limits.max !== MIN_VALUE) {
                                limitsCache[key] = limits;
                            } else {
                                limits = null;
                            }
                        }
                        if (limits) {
                            this$1.valueAxisRanges[axisName] = limits;
                        }
                    }
                }
            },
            addErrorBar: function (point, data, categoryIx) {
                var value = point.value;
                var series = point.series;
                var seriesIx = point.seriesIx;
                var errorBars = point.options.errorBars;
                var lowValue = data.fields[ERROR_LOW_FIELD];
                var highValue = data.fields[ERROR_HIGH_FIELD];
                var errorRange;
                if (isNumber(lowValue) && isNumber(highValue)) {
                    errorRange = {
                        low: lowValue,
                        high: highValue
                    };
                } else if (errorBars && defined(errorBars.value)) {
                    this.seriesErrorRanges = this.seriesErrorRanges || [];
                    this.seriesErrorRanges[seriesIx] = this.seriesErrorRanges[seriesIx] || new ErrorRangeCalculator(errorBars.value, series, VALUE);
                    errorRange = this.seriesErrorRanges[seriesIx].getErrorRange(value, errorBars.value);
                }
                if (errorRange) {
                    point.low = errorRange.low;
                    point.high = errorRange.high;
                    this.addPointErrorBar(point, categoryIx);
                }
            },
            addPointErrorBar: function (point, categoryIx) {
                var isVertical = !this.options.invertAxes;
                var options = point.options.errorBars;
                var series = point.series;
                var low = point.low;
                var high = point.high;
                if (this.options.isStacked) {
                    var stackedErrorRange = this.stackedErrorRange(point, categoryIx);
                    low = stackedErrorRange.low;
                    high = stackedErrorRange.high;
                } else {
                    var fields = {
                        categoryIx: categoryIx,
                        series: series
                    };
                    this.updateRange({ value: low }, fields);
                    this.updateRange({ value: high }, fields);
                }
                var errorBar = new CategoricalErrorBar(low, high, isVertical, this, series, options);
                point.errorBars = [errorBar];
                point.append(errorBar);
            },
            stackedErrorRange: function (point, categoryIx) {
                var plotValue = this.plotRange(point, 0)[1] - point.value;
                var low = point.low + plotValue;
                var high = point.high + plotValue;
                this.errorTotals = this.errorTotals || {
                    positive: [],
                    negative: []
                };
                if (low < 0) {
                    this.errorTotals.negative[categoryIx] = Math.min(this.errorTotals.negative[categoryIx] || 0, low);
                }
                if (high > 0) {
                    this.errorTotals.positive[categoryIx] = Math.max(this.errorTotals.positive[categoryIx] || 0, high);
                }
                return {
                    low: low,
                    high: high
                };
            },
            addValue: function (data, fields) {
                var categoryIx = fields.categoryIx;
                var series = fields.series;
                var seriesIx = fields.seriesIx;
                var categoryPoints = this.categoryPoints[categoryIx];
                if (!categoryPoints) {
                    this.categoryPoints[categoryIx] = categoryPoints = [];
                }
                var seriesPoints = this.seriesPoints[seriesIx];
                if (!seriesPoints) {
                    this.seriesPoints[seriesIx] = seriesPoints = [];
                }
                var point = this.createPoint(data, fields);
                if (point) {
                    $.extend(point, fields);
                    point.owner = this;
                    point.dataItem = series.data[categoryIx];
                    point.noteText = data.fields.noteText;
                    this.addErrorBar(point, data, categoryIx);
                }
                this.points.push(point);
                seriesPoints.push(point);
                categoryPoints.push(point);
                this.updateRange(data.valueFields, fields);
            },
            evalPointOptions: function (options, value, category, categoryIx, series, seriesIx) {
                var state = {
                    defaults: series._defaults,
                    excluded: [
                        'data',
                        'aggregate',
                        '_events',
                        'tooltip',
                        'template',
                        'visual',
                        'toggle',
                        '_outOfRangeMinPoint',
                        '_outOfRangeMaxPoint'
                    ]
                };
                var doEval = this._evalSeries[seriesIx];
                if (!defined(doEval)) {
                    this._evalSeries[seriesIx] = doEval = evalOptions(options, {}, state, true);
                }
                var pointOptions = options;
                if (doEval) {
                    pointOptions = deepExtend({}, pointOptions);
                    evalOptions(pointOptions, {
                        value: value,
                        category: category,
                        index: categoryIx,
                        series: series,
                        dataItem: series.data[categoryIx]
                    }, state);
                }
                return pointOptions;
            },
            updateRange: function (data, fields) {
                var axisName = fields.series.axis;
                var value = data.value;
                var axisRange = this.valueAxisRanges[axisName];
                if (isFinite(value) && value !== null) {
                    axisRange = this.valueAxisRanges[axisName] = axisRange || {
                        min: MAX_VALUE,
                        max: MIN_VALUE
                    };
                    axisRange.min = Math.min(axisRange.min, value);
                    axisRange.max = Math.max(axisRange.max, value);
                }
            },
            seriesValueAxis: function (series) {
                var plotArea = this.plotArea;
                var axisName = series.axis;
                var axis = axisName ? plotArea.namedValueAxes[axisName] : plotArea.valueAxis;
                if (!axis) {
                    throw new Error('Unable to locate value axis with name ' + axisName);
                }
                return axis;
            },
            reflow: function (targetBox) {
                var this$1 = this;
                var categorySlots = this.categorySlots = [];
                var chartPoints = this.points;
                var categoryAxis = this.categoryAxis;
                var pointIx = 0;
                this.traverseDataPoints(function (data, fields) {
                    var categoryIx = fields.categoryIx;
                    var currentSeries = fields.series;
                    var valueAxis = this$1.seriesValueAxis(currentSeries);
                    var point = chartPoints[pointIx++];
                    var categorySlot = categorySlots[categoryIx];
                    if (!categorySlot) {
                        categorySlots[categoryIx] = categorySlot = this$1.categorySlot(categoryAxis, categoryIx, valueAxis);
                    }
                    if (point) {
                        var plotRange = this$1.plotRange(point, valueAxis.startValue());
                        var valueSlot = valueAxis.getSlot(plotRange[0], plotRange[1], !this$1.options.clip);
                        if (valueSlot) {
                            var pointSlot = this$1.pointSlot(categorySlot, valueSlot);
                            point.aboveAxis = this$1.aboveAxis(point, valueAxis);
                            point.stackValue = plotRange[1];
                            if (this$1.options.isStacked100) {
                                point.percentage = this$1.plotValue(point);
                            }
                            this$1.reflowPoint(point, pointSlot);
                        } else {
                            point.visible = false;
                        }
                    }
                });
                this.reflowCategories(categorySlots);
                this.box = targetBox;
            },
            aboveAxis: function (point, valueAxis) {
                var axisCrossingValue = this.categoryAxisCrossingValue(valueAxis);
                var value = point.value;
                return valueAxis.options.reverse ? value < axisCrossingValue : value >= axisCrossingValue;
            },
            categoryAxisCrossingValue: function (valueAxis) {
                var categoryAxis = this.categoryAxis;
                var options = valueAxis.options;
                var crossingValues = [].concat(options.axisCrossingValues || options.axisCrossingValue);
                return crossingValues[categoryAxis.axisIndex || 0] || 0;
            },
            reflowPoint: function (point, pointSlot) {
                point.reflow(pointSlot);
            },
            reflowCategories: function () {
            },
            pointSlot: function (categorySlot, valueSlot) {
                var options = this.options;
                var invertAxes = options.invertAxes;
                var slotX = invertAxes ? valueSlot : categorySlot;
                var slotY = invertAxes ? categorySlot : valueSlot;
                return new Box(slotX.x1, slotY.y1, slotX.x2, slotY.y2);
            },
            categorySlot: function (categoryAxis, categoryIx) {
                return categoryAxis.getSlot(categoryIx);
            },
            traverseDataPoints: function (callback) {
                var this$1 = this;
                var series = this.options.series;
                var categories = this.categoryAxis.options.categories || [];
                var count = categoriesCount(series);
                var seriesCount = series.length;
                for (var seriesIx = 0; seriesIx < seriesCount; seriesIx++) {
                    this$1._outOfRangeCallback(series[seriesIx], '_outOfRangeMinPoint', seriesIx, callback);
                }
                for (var categoryIx = 0; categoryIx < count; categoryIx++) {
                    for (var seriesIx$1 = 0; seriesIx$1 < seriesCount; seriesIx$1++) {
                        var currentSeries = series[seriesIx$1];
                        var currentCategory = categories[categoryIx];
                        var pointData = this$1._bindPoint(currentSeries, seriesIx$1, categoryIx);
                        callback(pointData, {
                            category: currentCategory,
                            categoryIx: categoryIx,
                            series: currentSeries,
                            seriesIx: seriesIx$1
                        });
                    }
                }
                for (var seriesIx$2 = 0; seriesIx$2 < seriesCount; seriesIx$2++) {
                    this$1._outOfRangeCallback(series[seriesIx$2], '_outOfRangeMaxPoint', seriesIx$2, callback);
                }
            },
            _outOfRangeCallback: function (series, field, seriesIx, callback) {
                var outOfRangePoint = series[field];
                if (outOfRangePoint) {
                    var categoryIx = outOfRangePoint.categoryIx;
                    var pointData = this._bindPoint(series, seriesIx, categoryIx, outOfRangePoint.item);
                    callback(pointData, {
                        category: outOfRangePoint.category,
                        categoryIx: categoryIx,
                        series: series,
                        seriesIx: seriesIx
                    });
                }
            },
            _bindPoint: function (series, seriesIx, categoryIx, item) {
                if (!this._bindCache) {
                    this._bindCache = [];
                }
                var bindCache = this._bindCache[seriesIx];
                if (!bindCache) {
                    bindCache = this._bindCache[seriesIx] = [];
                }
                var data = bindCache[categoryIx];
                if (!data) {
                    data = bindCache[categoryIx] = SeriesBinder.current.bindPoint(series, categoryIx, item);
                }
                return data;
            },
            formatPointValue: function (point, format) {
                if (point.value === null) {
                    return '';
                }
                return this.chartService.format.auto(format, point.value);
            },
            pointValue: function (data) {
                return data.valueFields.value;
            }
        });
        setDefaultOptions(CategoricalChart, {
            series: [],
            invertAxes: false,
            isStacked: false,
            clip: true
        });
        var PointEventsMixin = {
            click: function (chart, e) {
                return chart.trigger(SERIES_CLICK, this.eventArgs(e));
            },
            hover: function (chart, e) {
                return chart.trigger(SERIES_HOVER, this.eventArgs(e));
            },
            eventArgs: function (e) {
                return {
                    value: this.value,
                    percentage: this.percentage,
                    stackValue: this.stackValue,
                    category: this.category,
                    series: this.series,
                    dataItem: this.dataItem,
                    runningTotal: this.runningTotal,
                    total: this.total,
                    element: eventElement(e),
                    originalEvent: e,
                    point: this
                };
            }
        };
        var NoteMixin = {
            createNote: function () {
                var options = this.options.notes;
                var text = this.noteText || options.label.text;
                if (options.visible !== false && defined(text) && text !== null) {
                    this.note = new dataviz.Note({
                        value: this.value,
                        text: text,
                        dataItem: this.dataItem,
                        category: this.category,
                        series: this.series
                    }, this.options.notes, this.owner.chartService);
                    this.append(this.note);
                }
            }
        };
        var ABOVE = 'above';
        var BELOW = 'below';
        var LinePoint = ChartElement.extend({
            init: function (value, options) {
                ChartElement.fn.init.call(this);
                this.value = value;
                this.options = options;
                this.aboveAxis = valueOrDefault(this.options.aboveAxis, true);
                this.tooltipTracking = true;
            },
            render: function () {
                var ref = this.options;
                var markers = ref.markers;
                var labels = ref.labels;
                if (this._rendered) {
                    return;
                }
                this._rendered = true;
                if (markers.visible && markers.size) {
                    this.marker = this.createMarker();
                    this.append(this.marker);
                }
                if (labels.visible) {
                    var labelText = this.value;
                    if (labels.template) {
                        var labelTemplate = TemplateService.compile(labels.template);
                        labelText = labelTemplate({
                            dataItem: this.dataItem,
                            category: this.category,
                            value: this.value,
                            percentage: this.percentage,
                            stackValue: this.stackValue,
                            series: this.series
                        });
                    } else if (labels.format) {
                        labelText = this.formatValue(labels.format);
                    }
                    this.label = new TextBox(labelText, deepExtend({
                        align: CENTER,
                        vAlign: CENTER,
                        margin: {
                            left: 5,
                            right: 5
                        },
                        zIndex: valueOrDefault(labels.zIndex, this.series.zIndex)
                    }, labels));
                    this.append(this.label);
                }
                this.createNote();
                if (this.errorBar) {
                    this.append(this.errorBar);
                }
            },
            markerBorder: function () {
                var options = this.options.markers;
                var background = options.background;
                var border = deepExtend({ color: this.color }, options.border);
                if (!defined(border.color)) {
                    border.color = new Color(background).brightness(BORDER_BRIGHTNESS).toHex();
                }
                return border;
            },
            createVisual: function () {
            },
            createMarker: function () {
                var options = this.options.markers;
                var marker = new ShapeElement({
                    type: options.type,
                    width: options.size,
                    height: options.size,
                    rotation: options.rotation,
                    background: options.background,
                    border: this.markerBorder(),
                    opacity: options.opacity,
                    zIndex: valueOrDefault(options.zIndex, this.series.zIndex),
                    animation: options.animation,
                    visual: options.visual
                }, {
                    dataItem: this.dataItem,
                    value: this.value,
                    series: this.series,
                    category: this.category
                });
                return marker;
            },
            markerBox: function () {
                if (!this.marker) {
                    this.marker = this.createMarker();
                    this.marker.reflow(this._childBox);
                }
                return this.marker.box;
            },
            reflow: function (targetBox) {
                var this$1 = this;
                var ref = this;
                var options = ref.options;
                var aboveAxis = ref.aboveAxis;
                var vertical = options.vertical;
                this.render();
                this.box = targetBox;
                var childBox = targetBox.clone();
                if (vertical) {
                    if (aboveAxis) {
                        childBox.y1 -= childBox.height();
                    } else {
                        childBox.y2 += childBox.height();
                    }
                } else {
                    if (aboveAxis) {
                        childBox.x1 += childBox.width();
                    } else {
                        childBox.x2 -= childBox.width();
                    }
                }
                this._childBox = childBox;
                if (this.marker) {
                    this.marker.reflow(childBox);
                }
                this.reflowLabel(childBox);
                if (this.errorBars) {
                    for (var i = 0; i < this.errorBars.length; i++) {
                        this$1.errorBars[i].reflow(childBox);
                    }
                }
                if (this.note) {
                    var noteTargetBox = this.markerBox();
                    if (!(options.markers.visible && options.markers.size)) {
                        var center = noteTargetBox.center();
                        noteTargetBox = new Box(center.x, center.y, center.x, center.y);
                    }
                    this.note.reflow(noteTargetBox);
                }
            },
            reflowLabel: function (box) {
                var ref = this;
                var options = ref.options;
                var label = ref.label;
                var anchor = options.labels.position;
                if (label) {
                    anchor = anchor === ABOVE ? TOP : anchor;
                    anchor = anchor === BELOW ? BOTTOM : anchor;
                    label.reflow(box);
                    label.box.alignTo(this.markerBox(), anchor);
                    label.reflow(label.box);
                }
            },
            createHighlight: function () {
                var markers = this.options.highlight.markers;
                var defaultColor = this.markerBorder().color;
                var options = this.options.markers;
                var size = options.size + (options.border.width || 0) + (markers.border.width || 0);
                var shadow = new ShapeElement({
                    type: options.type,
                    width: size,
                    height: size,
                    rotation: options.rotation,
                    background: markers.color || defaultColor,
                    border: {
                        color: markers.border.color,
                        width: markers.border.width,
                        opacity: valueOrDefault(markers.border.opacity, 1)
                    },
                    opacity: valueOrDefault(markers.opacity, 1)
                });
                shadow.reflow(this._childBox);
                return shadow.getElement();
            },
            highlightVisual: function () {
                return (this.marker || {}).visual;
            },
            highlightVisualArgs: function () {
                var marker = this.marker;
                var visual, rect;
                if (marker) {
                    rect = marker.paddingBox.toRect();
                    visual = marker.visual;
                } else {
                    var size = this.options.markers.size;
                    var halfSize = size / 2;
                    var center = this.box.center();
                    rect = new geometry.Rect([
                        center.x - halfSize,
                        center.y - halfSize
                    ], [
                        size,
                        size
                    ]);
                }
                return {
                    options: this.options,
                    rect: rect,
                    visual: visual
                };
            },
            tooltipAnchor: function () {
                var markerBox = this.markerBox();
                var clipBox = this.owner.pane.clipBox();
                var showTooltip = !clipBox || clipBox.overlaps(markerBox);
                if (showTooltip) {
                    var x = markerBox.x2 + TOOLTIP_OFFSET;
                    var horizontalAlign = LEFT;
                    var y, verticalAlign;
                    if (this.aboveAxis) {
                        y = markerBox.y1;
                        verticalAlign = BOTTOM;
                    } else {
                        y = markerBox.y2;
                        verticalAlign = TOP;
                    }
                    return {
                        point: new Point(x, y),
                        align: {
                            horizontal: horizontalAlign,
                            vertical: verticalAlign
                        }
                    };
                }
            },
            formatValue: function (format) {
                return this.owner.formatPointValue(this, format);
            },
            overlapsBox: function (box) {
                var markerBox = this.markerBox();
                return markerBox.overlaps(box);
            }
        });
        LinePoint.prototype.defaults = {
            vertical: true,
            markers: {
                visible: true,
                background: WHITE,
                size: LINE_MARKER_SIZE,
                type: CIRCLE,
                border: { width: 2 },
                opacity: 1
            },
            labels: {
                visible: false,
                position: ABOVE,
                margin: getSpacing(3),
                padding: getSpacing(4),
                animation: {
                    type: FADEIN,
                    delay: INITIAL_ANIMATION_DURATION
                }
            },
            notes: { label: {} },
            highlight: {
                markers: {
                    border: {
                        color: '#fff',
                        width: 2
                    }
                }
            },
            errorBars: { line: { width: 1 } }
        };
        deepExtend(LinePoint.prototype, PointEventsMixin);
        deepExtend(LinePoint.prototype, NoteMixin);
        var LineSegment = ChartElement.extend({
            init: function (linePoints, series, seriesIx) {
                ChartElement.fn.init.call(this);
                this.linePoints = linePoints;
                this.series = series;
                this.seriesIx = seriesIx;
            },
            points: function (visualPoints) {
                var linePoints = this.linePoints.concat(visualPoints || []);
                var points = [];
                for (var i = 0, length = linePoints.length; i < length; i++) {
                    if (linePoints[i].visible !== false) {
                        points.push(linePoints[i]._childBox.toRect().center());
                    }
                }
                return points;
            },
            createVisual: function () {
                var ref = this;
                var options = ref.options;
                var series = ref.series;
                var color = series.color;
                var defaults = series._defaults;
                if (isFunction(color) && defaults) {
                    color = defaults.color;
                }
                var line = Path.fromPoints(this.points(), {
                    stroke: {
                        color: color,
                        width: series.width,
                        opacity: series.opacity,
                        dashType: series.dashType
                    },
                    zIndex: series.zIndex
                });
                if (options.closed) {
                    line.close();
                }
                this.visual = line;
            },
            aliasFor: function (e, coords) {
                return this.parent.getNearestPoint(coords.x, coords.y, this.seriesIx);
            }
        });
        setDefaultOptions(LineSegment, { closed: false });
        var StepLineSegment = LineSegment.extend({
            points: function (visualPoints) {
                var points = this.calculateStepPoints(this.linePoints);
                if (visualPoints && visualPoints.length) {
                    points = points.concat(this.calculateStepPoints(visualPoints).reverse());
                }
                return points;
            },
            calculateStepPoints: function (points) {
                var chart = this.parent;
                var plotArea = chart.plotArea;
                var categoryAxis = plotArea.seriesCategoryAxis(this.series);
                var isInterpolate = chart.seriesMissingValues(this.series) === INTERPOLATE;
                var reverse = categoryAxis.options.reverse;
                var vertical = categoryAxis.options.vertical;
                var dir = reverse ? 2 : 1;
                var revDir = reverse ? 1 : 2;
                var length = points.length;
                var result = [];
                for (var i = 1; i < length; i++) {
                    var prevPoint = points[i - 1];
                    var point = points[i];
                    var prevMarkerBoxCenter = prevPoint.markerBox().center();
                    var markerBoxCenter = point.markerBox().center();
                    if (categoryAxis.options.justified) {
                        result.push(new GeometryPoint(prevMarkerBoxCenter.x, prevMarkerBoxCenter.y));
                        if (vertical) {
                            result.push(new GeometryPoint(prevMarkerBoxCenter.x, markerBoxCenter.y));
                        } else {
                            result.push(new GeometryPoint(markerBoxCenter.x, prevMarkerBoxCenter.y));
                        }
                        result.push(new GeometryPoint(markerBoxCenter.x, markerBoxCenter.y));
                    } else {
                        if (vertical) {
                            result.push(new GeometryPoint(prevMarkerBoxCenter.x, prevPoint.box[Y + dir]));
                            result.push(new GeometryPoint(prevMarkerBoxCenter.x, prevPoint.box[Y + revDir]));
                            if (isInterpolate) {
                                result.push(new GeometryPoint(prevMarkerBoxCenter.x, point.box[Y + dir]));
                            }
                            result.push(new GeometryPoint(markerBoxCenter.x, point.box[Y + dir]));
                            result.push(new GeometryPoint(markerBoxCenter.x, point.box[Y + revDir]));
                        } else {
                            result.push(new GeometryPoint(prevPoint.box[X + dir], prevMarkerBoxCenter.y));
                            result.push(new GeometryPoint(prevPoint.box[X + revDir], prevMarkerBoxCenter.y));
                            if (isInterpolate) {
                                result.push(new GeometryPoint(point.box[X + dir], prevMarkerBoxCenter.y));
                            }
                            result.push(new GeometryPoint(point.box[X + dir], markerBoxCenter.y));
                            result.push(new GeometryPoint(point.box[X + revDir], markerBoxCenter.y));
                        }
                    }
                }
                return result || [];
            }
        });
        var SplineSegment = LineSegment.extend({
            createVisual: function () {
                var series = this.series;
                var defaults = series._defaults;
                var color = series.color;
                if (isFunction(color) && defaults) {
                    color = defaults.color;
                }
                var curveProcessor = new dataviz.CurveProcessor(this.options.closed);
                var segments = curveProcessor.process(this.points());
                var curve = new Path({
                    stroke: {
                        color: color,
                        width: series.width,
                        opacity: series.opacity,
                        dashType: series.dashType
                    },
                    zIndex: series.zIndex
                });
                curve.segments.push.apply(curve.segments, segments);
                this.visual = curve;
            }
        });
        var LineChartMixin = {
            renderSegments: function () {
                var this$1 = this;
                var ref = this;
                var options = ref.options;
                var seriesPoints = ref.seriesPoints;
                var series = options.series;
                var seriesCount = seriesPoints.length;
                var lastSegment;
                this._segments = [];
                for (var seriesIx = 0; seriesIx < seriesCount; seriesIx++) {
                    var currentSeries = series[seriesIx];
                    var sortedPoints = this$1.sortPoints(seriesPoints[seriesIx]);
                    var pointCount = sortedPoints.length;
                    var linePoints = [];
                    for (var pointIx = 0; pointIx < pointCount; pointIx++) {
                        var point = sortedPoints[pointIx];
                        if (point) {
                            linePoints.push(point);
                        } else if (this$1.seriesMissingValues(currentSeries) !== INTERPOLATE) {
                            if (linePoints.length > 1) {
                                lastSegment = this$1.createSegment(linePoints, currentSeries, seriesIx, lastSegment);
                                this$1._addSegment(lastSegment);
                            }
                            linePoints = [];
                        }
                    }
                    if (linePoints.length > 1) {
                        lastSegment = this$1.createSegment(linePoints, currentSeries, seriesIx, lastSegment);
                        this$1._addSegment(lastSegment);
                    }
                }
                this.children.unshift.apply(this.children, this._segments);
            },
            _addSegment: function (segment) {
                this._segments.push(segment);
                segment.parent = this;
            },
            sortPoints: function (points) {
                return points;
            },
            seriesMissingValues: function (series) {
                var missingValues = series.missingValues;
                var assumeZero = !missingValues && this.options.isStacked;
                return assumeZero ? ZERO : missingValues || INTERPOLATE;
            },
            getNearestPoint: function (x, y, seriesIx) {
                var target = new Point(x, y);
                var allPoints = this.seriesPoints[seriesIx];
                var nearestPointDistance = MAX_VALUE;
                var nearestPoint;
                for (var i = 0; i < allPoints.length; i++) {
                    var point = allPoints[i];
                    if (point && defined(point.value) && point.value !== null && point.visible !== false) {
                        var pointBox = point.box;
                        var pointDistance = pointBox.center().distanceTo(target);
                        if (pointDistance < nearestPointDistance) {
                            nearestPoint = point;
                            nearestPointDistance = pointDistance;
                        }
                    }
                }
                return nearestPoint;
            }
        };
        var ClipAnimation = Animation.extend({
            setup: function () {
                this._setEnd(this.options.box.x1);
            },
            step: function (pos) {
                var box = this.options.box;
                this._setEnd(dataviz.interpolateValue(box.x1, box.x2, pos));
            },
            _setEnd: function (x) {
                var element = this.element;
                var segments = element.segments;
                var topRight = segments[1].anchor();
                var bottomRight = segments[2].anchor();
                element.suspend();
                topRight.setX(x);
                element.resume();
                bottomRight.setX(x);
            }
        });
        setDefaultOptions(ClipAnimation, { duration: INITIAL_ANIMATION_DURATION });
        AnimationFactory.current.register('clip', ClipAnimation);
        function anyHasZIndex(elements) {
            for (var idx = 0; idx < elements.length; idx++) {
                if (defined(elements[idx].zIndex)) {
                    return true;
                }
            }
        }
        var ClipAnimationMixin = {
            createAnimation: function () {
                var root = this.getRoot();
                if (root && (root.options || {}).transitions !== false) {
                    var box = root.box;
                    var clipPath = Path.fromRect(box.toRect());
                    this.visual.clip(clipPath);
                    this.animation = new ClipAnimation(clipPath, { box: box });
                    if (anyHasZIndex(this.options.series)) {
                        this._setChildrenAnimation(clipPath);
                    }
                }
            },
            _setChildrenAnimation: function (clipPath) {
                var points = this.animationPoints();
                for (var idx = 0; idx < points.length; idx++) {
                    var point = points[idx];
                    if (point && point.visual && defined(point.visual.options.zIndex)) {
                        point.visual.clip(clipPath);
                    }
                }
            }
        };
        var LineChart = CategoricalChart.extend({
            render: function () {
                CategoricalChart.fn.render.call(this);
                this.updateStackRange();
                this.renderSegments();
            },
            pointType: function () {
                return LinePoint;
            },
            createPoint: function (data, fields) {
                var categoryIx = fields.categoryIx;
                var category = fields.category;
                var series = fields.series;
                var seriesIx = fields.seriesIx;
                var missingValues = this.seriesMissingValues(series);
                var value = data.valueFields.value;
                if (!defined(value) || value === null) {
                    if (missingValues === ZERO) {
                        value = 0;
                    } else {
                        return null;
                    }
                }
                var pointOptions = this.pointOptions(series, seriesIx);
                pointOptions = this.evalPointOptions(pointOptions, value, category, categoryIx, series, seriesIx);
                var color = data.fields.color || series.color;
                if (isFunction(series.color)) {
                    color = pointOptions.color;
                }
                var point = new LinePoint(value, pointOptions);
                point.color = color;
                this.append(point);
                return point;
            },
            plotRange: function (point) {
                var this$1 = this;
                var plotValue = this.plotValue(point);
                if (this.options.isStacked) {
                    var categoryIx = point.categoryIx;
                    var categoryPoints = this.categoryPoints[categoryIx];
                    for (var i = 0; i < categoryPoints.length; i++) {
                        var other = categoryPoints[i];
                        if (point === other) {
                            break;
                        }
                        plotValue += this$1.plotValue(other);
                        if (this$1.options.isStacked100) {
                            plotValue = Math.min(plotValue, 1);
                        }
                    }
                }
                return [
                    plotValue,
                    plotValue
                ];
            },
            createSegment: function (linePoints, currentSeries, seriesIx) {
                var style = currentSeries.style;
                var pointType;
                if (style === STEP) {
                    pointType = StepLineSegment;
                } else if (style === SMOOTH) {
                    pointType = SplineSegment;
                } else {
                    pointType = LineSegment;
                }
                return new pointType(linePoints, currentSeries, seriesIx);
            },
            animationPoints: function () {
                var points = this.points;
                var result = [];
                for (var idx = 0; idx < points.length; idx++) {
                    result.push((points[idx] || {}).marker);
                }
                return result.concat(this._segments);
            }
        });
        deepExtend(LineChart.prototype, LineChartMixin, ClipAnimationMixin);
        var AreaSegmentMixin = {
            points: function () {
                var chart = this.parent;
                var plotArea = chart.plotArea;
                var invertAxes = chart.options.invertAxes;
                var valueAxis = chart.seriesValueAxis(this.series);
                var valueAxisLineBox = valueAxis.lineBox();
                var categoryAxis = plotArea.seriesCategoryAxis(this.series);
                var categoryAxisLineBox = categoryAxis.lineBox();
                var stackPoints = this.stackPoints;
                var points = this._linePoints(stackPoints);
                var pos = invertAxes ? X : Y;
                var end = invertAxes ? categoryAxisLineBox.x1 : categoryAxisLineBox.y1;
                end = limitValue(end, valueAxisLineBox[pos + 1], valueAxisLineBox[pos + 2]);
                if (!this.stackPoints && points.length > 1) {
                    var firstPoint = points[0];
                    var lastPoint = last(points);
                    if (invertAxes) {
                        points.unshift(new GeometryPoint(end, firstPoint.y));
                        points.push(new GeometryPoint(end, lastPoint.y));
                    } else {
                        points.unshift(new GeometryPoint(firstPoint.x, end));
                        points.push(new GeometryPoint(lastPoint.x, end));
                    }
                }
                return points;
            },
            createVisual: function () {
                var series = this.series;
                var defaults = series._defaults;
                var color = series.color;
                if (isFunction(color) && defaults) {
                    color = defaults.color;
                }
                this.visual = new Group({ zIndex: series.zIndex });
                this.createArea(color);
                this.createLine(color);
            },
            createLine: function (color) {
                var series = this.series;
                var lineOptions = deepExtend({
                    color: color,
                    opacity: series.opacity
                }, series.line);
                if (lineOptions.visible !== false && lineOptions.width > 0) {
                    var line = Path.fromPoints(this._linePoints(), {
                        stroke: {
                            color: lineOptions.color,
                            width: lineOptions.width,
                            opacity: lineOptions.opacity,
                            dashType: lineOptions.dashType,
                            lineCap: 'butt'
                        }
                    });
                    this.visual.append(line);
                }
            },
            createArea: function (color) {
                var series = this.series;
                var area = Path.fromPoints(this.points(), {
                    fill: {
                        color: color,
                        opacity: series.opacity
                    },
                    stroke: null
                });
                this.visual.append(area);
            }
        };
        var AreaSegment = LineSegment.extend({
            init: function (linePoints, stackPoints, currentSeries, seriesIx) {
                LineSegment.fn.init.call(this, linePoints, currentSeries, seriesIx);
                this.stackPoints = stackPoints;
            }
        });
        deepExtend(AreaSegment.prototype, AreaSegmentMixin, { _linePoints: LineSegment.prototype.points });
        var StepAreaSegment = StepLineSegment.extend({
            init: function (linePoints, stackPoints, currentSeries, seriesIx) {
                StepLineSegment.fn.init.call(this, linePoints, currentSeries, seriesIx);
                this.stackPoints = stackPoints;
            }
        });
        deepExtend(StepAreaSegment.prototype, AreaSegmentMixin, { _linePoints: StepLineSegment.prototype.points });
        var SplineAreaSegment = AreaSegment.extend({
            init: function (linePoints, prevSegment, isStacked, currentSeries, seriesIx) {
                AreaSegment.fn.init.call(this, linePoints, [], currentSeries, seriesIx);
                this.prevSegment = prevSegment;
                this.isStacked = isStacked;
            },
            strokeSegments: function () {
                var segments = this._strokeSegments;
                if (!segments) {
                    var curveProcessor = new dataviz.CurveProcessor(this.options.closed);
                    var linePoints = LineSegment.prototype.points.call(this);
                    segments = this._strokeSegments = curveProcessor.process(linePoints);
                }
                return segments;
            },
            createVisual: function () {
                var series = this.series;
                var defaults = series._defaults;
                var color = series.color;
                if (isFunction(color) && defaults) {
                    color = defaults.color;
                }
                this.visual = new Group({ zIndex: series.zIndex });
                this.createFill({
                    fill: {
                        color: color,
                        opacity: series.opacity
                    },
                    stroke: null
                });
                this.createStroke({
                    stroke: deepExtend({
                        color: color,
                        opacity: series.opacity,
                        lineCap: 'butt'
                    }, series.line)
                });
            },
            createFill: function (style) {
                var strokeSegments = this.strokeSegments();
                var fillSegments = strokeSegments.slice(0);
                var prevSegment = this.prevSegment;
                if (this.isStacked && prevSegment) {
                    var prevStrokeSegments = prevSegment.strokeSegments();
                    var prevAnchor = last(prevStrokeSegments).anchor();
                    fillSegments.push(new geometry.Segment(prevAnchor, prevAnchor, last(strokeSegments).anchor()));
                    var stackSegments = [];
                    for (var idx = prevStrokeSegments.length - 1; idx >= 0; idx--) {
                        var segment = prevStrokeSegments[idx];
                        stackSegments.push(new geometry.Segment(segment.anchor(), segment.controlOut(), segment.controlIn()));
                    }
                    append(fillSegments, stackSegments);
                    var firstAnchor = fillSegments[0].anchor();
                    fillSegments.push(new geometry.Segment(firstAnchor, firstAnchor, last(stackSegments).anchor()));
                }
                var fill = new Path(style);
                fill.segments.push.apply(fill.segments, fillSegments);
                this.closeFill(fill);
                this.visual.append(fill);
            },
            closeFill: function (fillPath) {
                var chart = this.parent;
                var prevSegment = this.prevSegment;
                var plotArea = chart.plotArea;
                var invertAxes = chart.options.invertAxes;
                var valueAxis = chart.seriesValueAxis(this.series);
                var valueAxisLineBox = valueAxis.lineBox();
                var categoryAxis = plotArea.seriesCategoryAxis(this.series);
                var categoryAxisLineBox = categoryAxis.lineBox();
                var pos = invertAxes ? X : Y;
                var segments = this.strokeSegments();
                var firstPoint = segments[0].anchor();
                var lastPoint = last(segments).anchor();
                var end = invertAxes ? categoryAxisLineBox.x1 : categoryAxisLineBox.y1;
                end = limitValue(end, valueAxisLineBox[pos + 1], valueAxisLineBox[pos + 2]);
                if (!(chart.options.isStacked && prevSegment) && segments.length > 1) {
                    if (invertAxes) {
                        fillPath.lineTo(end, lastPoint.y).lineTo(end, firstPoint.y);
                    } else {
                        fillPath.lineTo(lastPoint.x, end).lineTo(firstPoint.x, end);
                    }
                }
            },
            createStroke: function (style) {
                if (style.stroke.width > 0) {
                    var stroke = new Path(style);
                    stroke.segments.push.apply(stroke.segments, this.strokeSegments());
                    this.visual.append(stroke);
                }
            }
        });
        var AreaChart = LineChart.extend({
            createSegment: function (linePoints, currentSeries, seriesIx, prevSegment) {
                var isStacked = this.options.isStacked;
                var style = (currentSeries.line || {}).style;
                var stackPoints;
                if (isStacked && seriesIx > 0 && prevSegment) {
                    var missingValues = this.seriesMissingValues(currentSeries);
                    if (missingValues !== 'gap') {
                        stackPoints = prevSegment.linePoints;
                    } else {
                        stackPoints = this._gapStackPoints(linePoints, seriesIx, style);
                    }
                    if (style !== STEP) {
                        stackPoints = stackPoints.slice(0).reverse();
                    }
                }
                if (style === SMOOTH) {
                    return new SplineAreaSegment(linePoints, prevSegment, isStacked, currentSeries, seriesIx);
                }
                var pointType;
                if (style === STEP) {
                    pointType = StepAreaSegment;
                } else {
                    pointType = AreaSegment;
                }
                return new pointType(linePoints, stackPoints, currentSeries, seriesIx);
            },
            reflow: function (targetBox) {
                var this$1 = this;
                LineChart.fn.reflow.call(this, targetBox);
                var stackPoints = this._stackPoints;
                if (stackPoints) {
                    for (var idx = 0; idx < stackPoints.length; idx++) {
                        var stackPoint = stackPoints[idx];
                        var pointSlot = this$1.categoryAxis.getSlot(stackPoint.categoryIx);
                        stackPoint.reflow(pointSlot);
                    }
                }
            },
            _gapStackPoints: function (linePoints, seriesIx, style) {
                var this$1 = this;
                var seriesPoints = this.seriesPoints;
                var startIdx = linePoints[0].categoryIx;
                var length = linePoints.length;
                if (startIdx < 0) {
                    startIdx = 0;
                    length--;
                }
                var endIdx = startIdx + length;
                var pointOffset = this.seriesOptions[0]._outOfRangeMinPoint ? 1 : 0;
                var stackPoints = [];
                this._stackPoints = this._stackPoints || [];
                for (var categoryIx = startIdx; categoryIx < endIdx; categoryIx++) {
                    var pointIx = categoryIx + pointOffset;
                    var currentSeriesIx = seriesIx;
                    var point = void 0;
                    do {
                        currentSeriesIx--;
                        point = seriesPoints[currentSeriesIx][pointIx];
                    } while (currentSeriesIx > 0 && !point);
                    if (point) {
                        if (style !== STEP && categoryIx > startIdx && !seriesPoints[currentSeriesIx][pointIx - 1]) {
                            stackPoints.push(this$1._previousSegmentPoint(categoryIx, pointIx, pointIx - 1, currentSeriesIx));
                        }
                        stackPoints.push(point);
                        if (style !== STEP && categoryIx + 1 < endIdx && !seriesPoints[currentSeriesIx][pointIx + 1]) {
                            stackPoints.push(this$1._previousSegmentPoint(categoryIx, pointIx, pointIx + 1, currentSeriesIx));
                        }
                    } else {
                        var gapStackPoint = this$1._createGapStackPoint(categoryIx);
                        this$1._stackPoints.push(gapStackPoint);
                        stackPoints.push(gapStackPoint);
                    }
                }
                return stackPoints;
            },
            _previousSegmentPoint: function (categoryIx, pointIx, segmentIx, seriesIdx) {
                var seriesPoints = this.seriesPoints;
                var index = seriesIdx;
                var point;
                while (index > 0 && !point) {
                    index--;
                    point = seriesPoints[index][segmentIx];
                }
                if (!point) {
                    point = this._createGapStackPoint(categoryIx);
                    this._stackPoints.push(point);
                } else {
                    point = seriesPoints[index][pointIx];
                }
                return point;
            },
            _createGapStackPoint: function (categoryIx) {
                var options = this.pointOptions({}, 0);
                var point = new LinePoint(0, options);
                point.categoryIx = categoryIx;
                point.series = {};
                return point;
            },
            seriesMissingValues: function (series) {
                return series.missingValues || ZERO;
            }
        });
        var AxisGroupRangeTracker = Class.extend({
            init: function () {
                this.axisRanges = {};
            },
            update: function (chartAxisRanges) {
                var axisRanges = this.axisRanges;
                for (var axisName in chartAxisRanges) {
                    var chartRange = chartAxisRanges[axisName];
                    var range = axisRanges[axisName];
                    axisRanges[axisName] = range = range || {
                        min: MAX_VALUE,
                        max: MIN_VALUE
                    };
                    range.min = Math.min(range.min, chartRange.min);
                    range.max = Math.max(range.max, chartRange.max);
                }
            },
            reset: function (axisName) {
                this.axisRanges[axisName] = undefined;
            },
            query: function (axisName) {
                return this.axisRanges[axisName];
            }
        });
        var BarLabel = ChartElement.extend({
            init: function (content, options) {
                ChartElement.fn.init.call(this, options);
                this.textBox = new TextBox(content, this.options);
                this.append(this.textBox);
            },
            createVisual: function () {
                this.textBox.options.noclip = this.options.noclip;
            },
            reflow: function (targetBox) {
                var options = this.options;
                var vertical = options.vertical;
                var aboveAxis = options.aboveAxis;
                var text = this.children[0];
                var textOptions = text.options;
                var box = text.box;
                var padding = text.options.padding;
                var labelBox = targetBox;
                textOptions.align = vertical ? CENTER : LEFT;
                textOptions.vAlign = vertical ? TOP : CENTER;
                if (options.position === INSIDE_END) {
                    if (vertical) {
                        textOptions.vAlign = TOP;
                        if (!aboveAxis && box.height() < targetBox.height()) {
                            textOptions.vAlign = BOTTOM;
                        }
                    } else {
                        textOptions.align = aboveAxis ? RIGHT : LEFT;
                    }
                } else if (options.position === CENTER) {
                    textOptions.vAlign = CENTER;
                    textOptions.align = CENTER;
                } else if (options.position === INSIDE_BASE) {
                    if (vertical) {
                        textOptions.vAlign = aboveAxis ? BOTTOM : TOP;
                    } else {
                        textOptions.align = aboveAxis ? LEFT : RIGHT;
                    }
                } else if (options.position === OUTSIDE_END) {
                    if (vertical) {
                        if (aboveAxis) {
                            labelBox = new Box(targetBox.x1, targetBox.y1 - box.height(), targetBox.x2, targetBox.y1);
                        } else {
                            labelBox = new Box(targetBox.x1, targetBox.y2, targetBox.x2, targetBox.y2 + box.height());
                        }
                    } else {
                        textOptions.align = CENTER;
                        if (aboveAxis) {
                            labelBox = new Box(targetBox.x2, targetBox.y1, targetBox.x2 + box.width(), targetBox.y2);
                        } else {
                            labelBox = new Box(targetBox.x1 - box.width(), targetBox.y1, targetBox.x1, targetBox.y2);
                        }
                    }
                }
                if (!options.rotation) {
                    if (vertical) {
                        padding.left = padding.right = (labelBox.width() - text.contentBox.width()) / 2;
                    } else {
                        padding.top = padding.bottom = (labelBox.height() - text.contentBox.height()) / 2;
                    }
                }
                text.reflow(labelBox);
            },
            alignToClipBox: function (clipBox) {
                var vertical = this.options.vertical;
                var field = vertical ? Y : X;
                var start = field + '1';
                var end = field + '2';
                var text = this.children[0];
                var parentBox = this.parent.box;
                if (parentBox[start] < clipBox[start] || clipBox[end] < parentBox[end]) {
                    var targetBox = text.paddingBox.clone();
                    targetBox[start] = Math.max(parentBox[start], clipBox[start]);
                    targetBox[end] = Math.min(parentBox[end], clipBox[end]);
                    this.reflow(targetBox);
                }
            }
        });
        setDefaultOptions(BarLabel, {
            position: OUTSIDE_END,
            margin: getSpacing(3),
            padding: getSpacing(4),
            color: BLACK,
            background: '',
            border: {
                width: 1,
                color: ''
            },
            aboveAxis: true,
            vertical: false,
            animation: {
                type: FADEIN,
                delay: INITIAL_ANIMATION_DURATION
            },
            zIndex: 2
        });
        function hasGradientOverlay(options) {
            var overlay = options.overlay;
            return overlay && overlay.gradient && overlay.gradient !== 'none';
        }
        var BAR_ALIGN_MIN_WIDTH = 6;
        var Bar = ChartElement.extend({
            init: function (value, options) {
                ChartElement.fn.init.call(this);
                this.options = options;
                this.color = options.color || WHITE;
                this.aboveAxis = valueOrDefault(this.options.aboveAxis, true);
                this.value = value;
            },
            render: function () {
                if (this._rendered) {
                    return;
                }
                this._rendered = true;
                this.createLabel();
                this.createNote();
                if (this.errorBar) {
                    this.append(this.errorBar);
                }
            },
            createLabel: function () {
                var options = this.options;
                var labels = options.labels;
                if (labels.visible) {
                    var labelText;
                    if (labels.template) {
                        var labelTemplate = TemplateService.compile(labels.template);
                        labelText = labelTemplate({
                            dataItem: this.dataItem,
                            category: this.category,
                            value: this.value,
                            percentage: this.percentage,
                            stackValue: this.stackValue,
                            runningTotal: this.runningTotal,
                            total: this.total,
                            series: this.series
                        });
                    } else {
                        labelText = this.formatValue(labels.format);
                    }
                    this.label = new BarLabel(labelText, deepExtend({ vertical: options.vertical }, labels));
                    this.append(this.label);
                }
            },
            formatValue: function (format) {
                return this.owner.formatPointValue(this, format);
            },
            reflow: function (targetBox) {
                var this$1 = this;
                this.render();
                var label = this.label;
                this.box = targetBox;
                if (label) {
                    label.options.aboveAxis = this.aboveAxis;
                    label.reflow(targetBox);
                }
                if (this.note) {
                    this.note.reflow(targetBox);
                }
                if (this.errorBars) {
                    for (var i = 0; i < this.errorBars.length; i++) {
                        this$1.errorBars[i].reflow(targetBox);
                    }
                }
            },
            createVisual: function () {
                var this$1 = this;
                var ref = this;
                var box = ref.box;
                var options = ref.options;
                var customVisual = options.visual;
                if (this.visible !== false) {
                    ChartElement.fn.createVisual.call(this);
                    if (customVisual) {
                        var visual = this.rectVisual = customVisual({
                            category: this.category,
                            dataItem: this.dataItem,
                            value: this.value,
                            sender: this.getSender(),
                            series: this.series,
                            percentage: this.percentage,
                            stackValue: this.stackValue,
                            runningTotal: this.runningTotal,
                            total: this.total,
                            rect: box.toRect(),
                            createVisual: function () {
                                var group = new Group();
                                this$1.createRect(group);
                                return group;
                            },
                            options: options
                        });
                        if (visual) {
                            this.visual.append(visual);
                        }
                    } else if (box.width() > 0 && box.height() > 0) {
                        this.createRect(this.visual);
                    }
                }
            },
            createRect: function (visual) {
                var options = this.options;
                var border = options.border;
                var strokeOpacity = defined(border.opacity) ? border.opacity : options.opacity;
                var rect = this.box.toRect();
                rect.size.width = Math.round(rect.size.width);
                var path = this.rectVisual = Path.fromRect(rect, {
                    fill: {
                        color: this.color,
                        opacity: options.opacity
                    },
                    stroke: {
                        color: this.getBorderColor(),
                        width: border.width,
                        opacity: strokeOpacity,
                        dashType: border.dashType
                    }
                });
                var width = this.box.width();
                var height = this.box.height();
                var size = options.vertical ? width : height;
                if (size > BAR_ALIGN_MIN_WIDTH) {
                    alignPathToPixel(path);
                    if (width < 1 || height < 1) {
                        path.options.stroke.lineJoin = 'round';
                    }
                }
                visual.append(path);
                if (hasGradientOverlay(options)) {
                    var overlay = this.createGradientOverlay(path, { baseColor: this.color }, deepExtend({
                        end: !options.vertical ? [
                            0,
                            1
                        ] : undefined
                    }, options.overlay));
                    visual.append(overlay);
                }
            },
            createHighlight: function (style) {
                var highlight = Path.fromRect(this.box.toRect(), style);
                return alignPathToPixel(highlight);
            },
            highlightVisual: function () {
                return this.rectVisual;
            },
            highlightVisualArgs: function () {
                return {
                    options: this.options,
                    rect: this.box.toRect(),
                    visual: this.rectVisual
                };
            },
            getBorderColor: function () {
                var color = this.color;
                var border = this.options.border;
                var brightness = border._brightness || BORDER_BRIGHTNESS;
                var borderColor = border.color;
                if (!defined(borderColor)) {
                    borderColor = new Color(color).brightness(brightness).toHex();
                }
                return borderColor;
            },
            tooltipAnchor: function () {
                var ref = this;
                var options = ref.options;
                var box = ref.box;
                var aboveAxis = ref.aboveAxis;
                var clipBox = this.owner.pane.clipBox() || box;
                var horizontalAlign = LEFT;
                var verticalAlign = TOP;
                var x, y;
                if (options.vertical) {
                    x = Math.min(box.x2, clipBox.x2) + TOOLTIP_OFFSET;
                    if (aboveAxis) {
                        y = Math.max(box.y1, clipBox.y1);
                    } else {
                        y = Math.min(box.y2, clipBox.y2);
                        verticalAlign = BOTTOM;
                    }
                } else {
                    var x1 = Math.max(box.x1, clipBox.x1);
                    var x2 = Math.min(box.x2, clipBox.x2);
                    if (options.isStacked) {
                        verticalAlign = BOTTOM;
                        if (aboveAxis) {
                            horizontalAlign = RIGHT;
                            x = x2;
                        } else {
                            x = x1;
                        }
                        y = Math.max(box.y1, clipBox.y1) - TOOLTIP_OFFSET;
                    } else {
                        if (aboveAxis) {
                            x = x2 + TOOLTIP_OFFSET;
                        } else {
                            x = x1 - TOOLTIP_OFFSET;
                            horizontalAlign = RIGHT;
                        }
                        y = Math.max(box.y1, clipBox.y1);
                    }
                }
                return {
                    point: new Point(x, y),
                    align: {
                        horizontal: horizontalAlign,
                        vertical: verticalAlign
                    }
                };
            },
            overlapsBox: function (box) {
                return this.box.overlaps(box);
            }
        });
        deepExtend(Bar.prototype, PointEventsMixin);
        deepExtend(Bar.prototype, NoteMixin);
        Bar.prototype.defaults = {
            border: { width: 1 },
            vertical: true,
            overlay: { gradient: 'glass' },
            labels: {
                visible: false,
                format: '{0}'
            },
            opacity: 1,
            notes: { label: {} }
        };
        var ClusterLayout = ChartElement.extend({
            reflow: function (box) {
                var ref = this.options;
                var vertical = ref.vertical;
                var gap = ref.gap;
                var spacing = ref.spacing;
                var children = this.children;
                var count = children.length;
                var axis = vertical ? Y : X;
                var slots = count + gap + spacing * (count - 1);
                var slotSize = (vertical ? box.height() : box.width()) / slots;
                var position = box[axis + 1] + slotSize * (gap / 2);
                for (var i = 0; i < count; i++) {
                    var childBox = (children[i].box || box).clone();
                    childBox[axis + 1] = position;
                    childBox[axis + 2] = position + slotSize;
                    children[i].reflow(childBox);
                    if (i < count - 1) {
                        position += slotSize * spacing;
                    }
                    position += slotSize;
                }
            }
        });
        setDefaultOptions(ClusterLayout, {
            vertical: false,
            gap: 0,
            spacing: 0
        });
        var StackWrap = ChartElement.extend({
            reflow: function (targetBox) {
                var this$1 = this;
                var positionAxis = this.options.vertical ? X : Y;
                var children = this.children;
                var childrenCount = children.length;
                var box = this.box = new Box();
                for (var i = 0; i < childrenCount; i++) {
                    var currentChild = children[i];
                    if (currentChild.visible !== false) {
                        var childBox = currentChild.box.clone();
                        childBox.snapTo(targetBox, positionAxis);
                        if (i === 0) {
                            box = this$1.box = childBox.clone();
                        }
                        currentChild.reflow(childBox);
                        box.wrap(childBox);
                    }
                }
            }
        });
        setDefaultOptions(StackWrap, { vertical: true });
        var BarChart = CategoricalChart.extend({
            render: function () {
                CategoricalChart.fn.render.call(this);
                this.updateStackRange();
            },
            pointType: function () {
                return Bar;
            },
            clusterType: function () {
                return ClusterLayout;
            },
            stackType: function () {
                return StackWrap;
            },
            stackLimits: function (axisName, stackName) {
                var limits = CategoricalChart.fn.stackLimits.call(this, axisName, stackName);
                return limits;
            },
            createPoint: function (data, fields) {
                var categoryIx = fields.categoryIx;
                var category = fields.category;
                var series = fields.series;
                var seriesIx = fields.seriesIx;
                var ref = this;
                var options = ref.options;
                var children = ref.children;
                var isStacked = options.isStacked;
                var value = this.pointValue(data);
                var pointOptions = this.pointOptions(series, seriesIx);
                var labelOptions = pointOptions.labels;
                if (isStacked) {
                    if (labelOptions.position === OUTSIDE_END) {
                        labelOptions.position = INSIDE_END;
                    }
                }
                pointOptions.isStacked = isStacked;
                var color = data.fields.color || series.color;
                if (value < 0 && pointOptions.negativeColor) {
                    color = pointOptions.negativeColor;
                }
                pointOptions = this.evalPointOptions(pointOptions, value, category, categoryIx, series, seriesIx);
                if (isFunction(series.color)) {
                    color = pointOptions.color;
                }
                var pointType = this.pointType();
                var point = new pointType(value, pointOptions);
                point.color = color;
                var cluster = children[categoryIx];
                if (!cluster) {
                    var clusterType = this.clusterType();
                    cluster = new clusterType({
                        vertical: options.invertAxes,
                        gap: options.gap,
                        spacing: options.spacing
                    });
                    this.append(cluster);
                }
                if (isStacked) {
                    var stackWrap = this.getStackWrap(series, cluster);
                    stackWrap.append(point);
                } else {
                    cluster.append(point);
                }
                return point;
            },
            getStackWrap: function (series, cluster) {
                var stack = series.stack;
                var stackGroup = stack ? stack.group || stack : stack;
                var wraps = cluster.children;
                var stackWrap;
                if (typeof stackGroup === datavizConstants.STRING) {
                    for (var i = 0; i < wraps.length; i++) {
                        if (wraps[i]._stackGroup === stackGroup) {
                            stackWrap = wraps[i];
                            break;
                        }
                    }
                } else {
                    stackWrap = wraps[0];
                }
                if (!stackWrap) {
                    var stackType = this.stackType();
                    stackWrap = new stackType({ vertical: !this.options.invertAxes });
                    stackWrap._stackGroup = stackGroup;
                    cluster.append(stackWrap);
                }
                return stackWrap;
            },
            categorySlot: function (categoryAxis, categoryIx, valueAxis) {
                var options = this.options;
                var categorySlot = categoryAxis.getSlot(categoryIx);
                var startValue = valueAxis.startValue();
                if (options.isStacked) {
                    var zeroSlot = valueAxis.getSlot(startValue, startValue, true);
                    var stackAxis = options.invertAxes ? X : Y;
                    categorySlot[stackAxis + 1] = categorySlot[stackAxis + 2] = zeroSlot[stackAxis + 1];
                }
                return categorySlot;
            },
            reflowCategories: function (categorySlots) {
                var children = this.children;
                var childrenLength = children.length;
                for (var i = 0; i < childrenLength; i++) {
                    children[i].reflow(categorySlots[i]);
                }
            },
            createAnimation: function () {
                this._setAnimationOptions();
                CategoricalChart.fn.createAnimation.call(this);
                if (anyHasZIndex(this.options.series)) {
                    this._setChildrenAnimation();
                }
            },
            _setChildrenAnimation: function () {
                var this$1 = this;
                var points = this.points;
                for (var idx = 0; idx < points.length; idx++) {
                    var point = points[idx];
                    var pointVisual = point.visual;
                    if (pointVisual && defined(pointVisual.options.zIndex)) {
                        point.options.animation = this$1.options.animation;
                        point.createAnimation();
                    }
                }
            },
            _setAnimationOptions: function () {
                var options = this.options;
                var animation = options.animation || {};
                var origin;
                if (options.isStacked) {
                    var valueAxis = this.seriesValueAxis(options.series[0]);
                    origin = valueAxis.getSlot(valueAxis.startValue());
                } else {
                    origin = this.categoryAxis.getSlot(0);
                }
                animation.origin = new GeometryPoint(origin.x1, origin.y1);
                animation.vertical = !options.invertAxes;
            }
        });
        setDefaultOptions(BarChart, { animation: { type: BAR } });
        var Candlestick = ChartElement.extend({
            init: function (value, options) {
                ChartElement.fn.init.call(this, options);
                this.value = value;
            },
            reflow: function (box) {
                var ref = this;
                var options = ref.options;
                var value = ref.value;
                var chart = ref.owner;
                var valueAxis = chart.seriesValueAxis(options);
                var ocSlot = valueAxis.getSlot(value.open, value.close);
                var lhSlot = valueAxis.getSlot(value.low, value.high);
                ocSlot.x1 = lhSlot.x1 = box.x1;
                ocSlot.x2 = lhSlot.x2 = box.x2;
                this.realBody = ocSlot;
                var mid = lhSlot.center().x;
                var points = [];
                points.push([
                    [
                        mid,
                        lhSlot.y1
                    ],
                    [
                        mid,
                        ocSlot.y1
                    ]
                ]);
                points.push([
                    [
                        mid,
                        ocSlot.y2
                    ],
                    [
                        mid,
                        lhSlot.y2
                    ]
                ]);
                this.lines = points;
                this.box = lhSlot.clone().wrap(ocSlot);
                if (!this._rendered) {
                    this._rendered = true;
                    this.createNote();
                }
                this.reflowNote();
            },
            reflowNote: function () {
                if (this.note) {
                    this.note.reflow(this.box);
                }
            },
            createVisual: function () {
                ChartElement.fn.createVisual.call(this);
                this._mainVisual = this.mainVisual(this.options);
                this.visual.append(this._mainVisual);
                this.createOverlay();
            },
            mainVisual: function (options) {
                var group = new Group();
                this.createBody(group, options);
                this.createLines(group, options);
                return group;
            },
            createBody: function (container, options) {
                var body = Path.fromRect(this.realBody.toRect(), {
                    fill: {
                        color: this.color,
                        opacity: options.opacity
                    },
                    stroke: null
                });
                if (options.border.width > 0) {
                    body.options.set('stroke', {
                        color: this.getBorderColor(),
                        width: options.border.width,
                        dashType: options.border.dashType,
                        opacity: valueOrDefault(options.border.opacity, options.opacity)
                    });
                }
                alignPathToPixel(body);
                container.append(body);
                if (hasGradientOverlay(options)) {
                    container.append(this.createGradientOverlay(body, { baseColor: this.color }, deepExtend({
                        end: !options.vertical ? [
                            0,
                            1
                        ] : undefined
                    }, options.overlay)));
                }
            },
            createLines: function (container, options) {
                this.drawLines(container, options, this.lines, options.line);
            },
            drawLines: function (container, options, lines, lineOptions) {
                if (!lines) {
                    return;
                }
                var lineStyle = {
                    stroke: {
                        color: lineOptions.color || this.color,
                        opacity: valueOrDefault(lineOptions.opacity, options.opacity),
                        width: lineOptions.width,
                        dashType: lineOptions.dashType,
                        lineCap: 'butt'
                    }
                };
                for (var i = 0; i < lines.length; i++) {
                    var line = Path.fromPoints(lines[i], lineStyle);
                    alignPathToPixel(line);
                    container.append(line);
                }
            },
            getBorderColor: function () {
                var border = this.options.border;
                var borderColor = border.color;
                if (!defined(borderColor)) {
                    borderColor = new Color(this.color).brightness(border._brightness).toHex();
                }
                return borderColor;
            },
            createOverlay: function () {
                var overlay = Path.fromRect(this.box.toRect(), {
                    fill: {
                        color: WHITE,
                        opacity: 0
                    },
                    stroke: null
                });
                this.visual.append(overlay);
            },
            createHighlight: function () {
                var highlight = this.options.highlight;
                var normalColor = this.color;
                this.color = highlight.color || this.color;
                var overlay = this.mainVisual(deepExtend({}, this.options, { line: { color: this.getBorderColor() } }, highlight));
                this.color = normalColor;
                return overlay;
            },
            highlightVisual: function () {
                return this._mainVisual;
            },
            highlightVisualArgs: function () {
                return {
                    options: this.options,
                    rect: this.box.toRect(),
                    visual: this._mainVisual
                };
            },
            tooltipAnchor: function () {
                var box = this.box;
                var clipBox = this.owner.pane.clipBox() || box;
                return {
                    point: new Point(box.x2 + TOOLTIP_OFFSET, Math.max(box.y1, clipBox.y1) + TOOLTIP_OFFSET),
                    align: {
                        horizontal: LEFT,
                        vertical: TOP
                    }
                };
            },
            formatValue: function (format) {
                return this.owner.formatPointValue(this, format);
            },
            overlapsBox: function (box) {
                return this.box.overlaps(box);
            }
        });
        setDefaultOptions(Candlestick, {
            vertical: true,
            border: { _brightness: 0.8 },
            line: { width: 2 },
            overlay: { gradient: 'glass' },
            tooltip: { format: '<table>' + '<tr><th colspan=\'2\'>{4:d}</th></tr>' + '<tr><td>Open:</td><td>{0:C}</td></tr>' + '<tr><td>High:</td><td>{1:C}</td></tr>' + '<tr><td>Low:</td><td>{2:C}</td></tr>' + '<tr><td>Close:</td><td>{3:C}</td></tr>' + '</table>' },
            highlight: {
                opacity: 1,
                border: {
                    width: 1,
                    opacity: 1
                },
                line: {
                    width: 1,
                    opacity: 1
                }
            },
            notes: {
                visible: true,
                label: {}
            }
        });
        deepExtend(Candlestick.prototype, PointEventsMixin);
        deepExtend(Candlestick.prototype, NoteMixin);
        function areNumbers(values) {
            return countNumbers(values) === values.length;
        }
        var CandlestickChart = CategoricalChart.extend({
            reflowCategories: function (categorySlots) {
                var children = this.children;
                var childrenLength = children.length;
                for (var i = 0; i < childrenLength; i++) {
                    children[i].reflow(categorySlots[i]);
                }
            },
            addValue: function (data, fields) {
                var categoryIx = fields.categoryIx;
                var category = fields.category;
                var series = fields.series;
                var seriesIx = fields.seriesIx;
                var ref = this;
                var children = ref.children;
                var options = ref.options;
                var value = data.valueFields;
                var valueParts = this.splitValue(value);
                var hasValue = areNumbers(valueParts);
                var dataItem = series.data[categoryIx];
                var categoryPoints = this.categoryPoints[categoryIx];
                var point;
                if (!categoryPoints) {
                    this.categoryPoints[categoryIx] = categoryPoints = [];
                }
                if (hasValue) {
                    point = this.createPoint(data, fields);
                }
                var cluster = children[categoryIx];
                if (!cluster) {
                    cluster = new ClusterLayout({
                        vertical: options.invertAxes,
                        gap: options.gap,
                        spacing: options.spacing
                    });
                    this.append(cluster);
                }
                if (point) {
                    this.updateRange(value, fields);
                    cluster.append(point);
                    point.categoryIx = categoryIx;
                    point.category = category;
                    point.series = series;
                    point.seriesIx = seriesIx;
                    point.owner = this;
                    point.dataItem = dataItem;
                    point.noteText = data.fields.noteText;
                }
                this.points.push(point);
                categoryPoints.push(point);
            },
            pointType: function () {
                return Candlestick;
            },
            createPoint: function (data, fields) {
                var categoryIx = fields.categoryIx;
                var category = fields.category;
                var series = fields.series;
                var seriesIx = fields.seriesIx;
                var pointType = this.pointType();
                var value = data.valueFields;
                var pointOptions = deepExtend({}, series);
                var color = data.fields.color || series.color;
                pointOptions = this.evalPointOptions(pointOptions, value, category, categoryIx, series, seriesIx);
                if (series.type === CANDLESTICK) {
                    if (value.open > value.close) {
                        color = data.fields.downColor || series.downColor || series.color;
                    }
                }
                if (isFunction(series.color)) {
                    color = pointOptions.color;
                }
                pointOptions.vertical = !this.options.invertAxes;
                var point = new pointType(value, pointOptions);
                point.color = color;
                return point;
            },
            splitValue: function (value) {
                return [
                    value.low,
                    value.open,
                    value.close,
                    value.high
                ];
            },
            updateRange: function (value, fields) {
                var axisName = fields.series.axis;
                var parts = this.splitValue(value);
                var axisRange = this.valueAxisRanges[axisName];
                axisRange = this.valueAxisRanges[axisName] = axisRange || {
                    min: MAX_VALUE,
                    max: MIN_VALUE
                };
                axisRange = this.valueAxisRanges[axisName] = {
                    min: Math.min.apply(Math, parts.concat([axisRange.min])),
                    max: Math.max.apply(Math, parts.concat([axisRange.max]))
                };
            },
            formatPointValue: function (point, format) {
                var value = point.value;
                return this.chartService.format.auto(format, value.open, value.high, value.low, value.close, point.category);
            },
            animationPoints: function () {
                return this.points;
            }
        });
        deepExtend(CandlestickChart.prototype, ClipAnimationMixin);
        var BoxPlot = Candlestick.extend({
            init: function (value, options) {
                Candlestick.fn.init.call(this, value, options);
                this.createNote();
            },
            reflow: function (box) {
                var ref = this;
                var options = ref.options;
                var value = ref.value;
                var chart = ref.owner;
                var valueAxis = chart.seriesValueAxis(options);
                var whiskerSlot, boxSlot;
                this.boxSlot = boxSlot = valueAxis.getSlot(value.q1, value.q3);
                this.realBody = boxSlot;
                this.reflowBoxSlot(box);
                this.whiskerSlot = whiskerSlot = valueAxis.getSlot(value.lower, value.upper);
                this.reflowWhiskerSlot(box);
                var medianSlot = valueAxis.getSlot(value.median);
                if (value.mean) {
                    var meanSlot = valueAxis.getSlot(value.mean);
                    this.meanPoints = this.calcMeanPoints(box, meanSlot);
                }
                this.whiskerPoints = this.calcWhiskerPoints(boxSlot, whiskerSlot);
                this.medianPoints = this.calcMedianPoints(box, medianSlot);
                this.box = whiskerSlot.clone().wrap(boxSlot);
                this.reflowNote();
            },
            reflowBoxSlot: function (box) {
                this.boxSlot.x1 = box.x1;
                this.boxSlot.x2 = box.x2;
            },
            reflowWhiskerSlot: function (box) {
                this.whiskerSlot.x1 = box.x1;
                this.whiskerSlot.x2 = box.x2;
            },
            calcMeanPoints: function (box, meanSlot) {
                return [[
                        [
                            box.x1,
                            meanSlot.y1
                        ],
                        [
                            box.x2,
                            meanSlot.y1
                        ]
                    ]];
            },
            calcWhiskerPoints: function (boxSlot, whiskerSlot) {
                var mid = whiskerSlot.center().x;
                return [
                    [
                        [
                            mid - 5,
                            whiskerSlot.y1
                        ],
                        [
                            mid + 5,
                            whiskerSlot.y1
                        ],
                        [
                            mid,
                            whiskerSlot.y1
                        ],
                        [
                            mid,
                            boxSlot.y1
                        ]
                    ],
                    [
                        [
                            mid - 5,
                            whiskerSlot.y2
                        ],
                        [
                            mid + 5,
                            whiskerSlot.y2
                        ],
                        [
                            mid,
                            whiskerSlot.y2
                        ],
                        [
                            mid,
                            boxSlot.y2
                        ]
                    ]
                ];
            },
            calcMedianPoints: function (box, medianSlot) {
                return [[
                        [
                            box.x1,
                            medianSlot.y1
                        ],
                        [
                            box.x2,
                            medianSlot.y1
                        ]
                    ]];
            },
            renderOutliers: function (options) {
                var this$1 = this;
                var value = this.value;
                var outliers = value.outliers || [];
                var outerFence = Math.abs(value.q3 - value.q1) * 3;
                var elements = [];
                var markers = options.markers || {};
                for (var i = 0; i < outliers.length; i++) {
                    var outlierValue = outliers[i];
                    if (outlierValue < value.q3 + outerFence && outlierValue > value.q1 - outerFence) {
                        markers = options.outliers;
                    } else {
                        markers = options.extremes;
                    }
                    var markersBorder = deepExtend({}, markers.border);
                    if (!defined(markersBorder.color)) {
                        if (defined(this$1.color)) {
                            markersBorder.color = this$1.color;
                        } else {
                            markersBorder.color = new Color(markers.background).brightness(BORDER_BRIGHTNESS).toHex();
                        }
                    }
                    var shape = new ShapeElement({
                        type: markers.type,
                        width: markers.size,
                        height: markers.size,
                        rotation: markers.rotation,
                        background: markers.background,
                        border: markersBorder,
                        opacity: markers.opacity
                    });
                    shape.value = outlierValue;
                    elements.push(shape);
                }
                this.reflowOutliers(elements);
                return elements;
            },
            reflowOutliers: function (outliers) {
                var this$1 = this;
                var valueAxis = this.owner.seriesValueAxis(this.options);
                var center = this.box.center();
                for (var i = 0; i < outliers.length; i++) {
                    var outlierValue = outliers[i].value;
                    var markerBox = valueAxis.getSlot(outlierValue);
                    if (this$1.options.vertical) {
                        markerBox.move(center.x);
                    } else {
                        markerBox.move(undefined, center.y);
                    }
                    this$1.box = this$1.box.wrap(markerBox);
                    outliers[i].reflow(markerBox);
                }
            },
            mainVisual: function (options) {
                var group = Candlestick.fn.mainVisual.call(this, options);
                var outliers = this.renderOutliers(options);
                for (var i = 0; i < outliers.length; i++) {
                    var element = outliers[i].getElement();
                    if (element) {
                        group.append(element);
                    }
                }
                return group;
            },
            createLines: function (container, options) {
                this.drawLines(container, options, this.whiskerPoints, options.whiskers);
                this.drawLines(container, options, this.medianPoints, options.median);
                this.drawLines(container, options, this.meanPoints, options.mean);
            },
            getBorderColor: function () {
                if (this.color) {
                    return this.color;
                }
                return Candlestick.fn.getBorderColor.call(this);
            }
        });
        setDefaultOptions(BoxPlot, {
            border: { _brightness: 0.8 },
            line: { width: 2 },
            median: { color: '#f6f6f6' },
            mean: {
                width: 2,
                dashType: 'dash',
                color: '#f6f6f6'
            },
            overlay: { gradient: 'glass' },
            tooltip: { format: '<table>' + '<tr><th colspan=\'2\'>{6:d}</th></tr>' + '<tr><td>Lower:</td><td>{0:C}</td></tr>' + '<tr><td>Q1:</td><td>{1:C}</td></tr>' + '<tr><td>Median:</td><td>{2:C}</td></tr>' + '<tr><td>Mean:</td><td>{5:C}</td></tr>' + '<tr><td>Q3:</td><td>{3:C}</td></tr>' + '<tr><td>Upper:</td><td>{4:C}</td></tr>' + '</table>' },
            highlight: {
                opacity: 1,
                border: {
                    width: 1,
                    opacity: 1
                },
                line: {
                    width: 1,
                    opacity: 1
                }
            },
            notes: {
                visible: true,
                label: {}
            },
            outliers: {
                visible: true,
                size: LINE_MARKER_SIZE,
                type: datavizConstants.CROSS,
                background: WHITE,
                border: {
                    width: 2,
                    opacity: 1
                },
                opacity: 0
            },
            extremes: {
                visible: true,
                size: LINE_MARKER_SIZE,
                type: CIRCLE,
                background: WHITE,
                border: {
                    width: 2,
                    opacity: 1
                },
                opacity: 0
            }
        });
        deepExtend(BoxPlot.prototype, PointEventsMixin);
        var VerticalBoxPlot = BoxPlot.extend({
            reflowBoxSlot: function (box) {
                this.boxSlot.y1 = box.y1;
                this.boxSlot.y2 = box.y2;
            },
            reflowWhiskerSlot: function (box) {
                this.whiskerSlot.y1 = box.y1;
                this.whiskerSlot.y2 = box.y2;
            },
            calcMeanPoints: function (box, meanSlot) {
                return [[
                        [
                            meanSlot.x1,
                            box.y1
                        ],
                        [
                            meanSlot.x1,
                            box.y2
                        ]
                    ]];
            },
            calcWhiskerPoints: function (boxSlot, whiskerSlot) {
                var mid = whiskerSlot.center().y;
                return [
                    [
                        [
                            whiskerSlot.x1,
                            mid - 5
                        ],
                        [
                            whiskerSlot.x1,
                            mid + 5
                        ],
                        [
                            whiskerSlot.x1,
                            mid
                        ],
                        [
                            boxSlot.x1,
                            mid
                        ]
                    ],
                    [
                        [
                            whiskerSlot.x2,
                            mid - 5
                        ],
                        [
                            whiskerSlot.x2,
                            mid + 5
                        ],
                        [
                            whiskerSlot.x2,
                            mid
                        ],
                        [
                            boxSlot.x2,
                            mid
                        ]
                    ]
                ];
            },
            calcMedianPoints: function (box, medianSlot) {
                return [[
                        [
                            medianSlot.x1,
                            box.y1
                        ],
                        [
                            medianSlot.x1,
                            box.y2
                        ]
                    ]];
            }
        });
        var BoxPlotChart = CandlestickChart.extend({
            addValue: function (data, fields) {
                var categoryIx = fields.categoryIx;
                var category = fields.category;
                var series = fields.series;
                var seriesIx = fields.seriesIx;
                var ref = this;
                var children = ref.children;
                var options = ref.options;
                var value = data.valueFields;
                var valueParts = this.splitValue(value);
                var hasValue = areNumbers(valueParts);
                var dataItem = series.data[categoryIx];
                var categoryPoints = this.categoryPoints[categoryIx];
                var point;
                if (!categoryPoints) {
                    this.categoryPoints[categoryIx] = categoryPoints = [];
                }
                if (hasValue) {
                    point = this.createPoint(data, fields);
                }
                var cluster = children[categoryIx];
                if (!cluster) {
                    cluster = new ClusterLayout({
                        vertical: options.invertAxes,
                        gap: options.gap,
                        spacing: options.spacing
                    });
                    this.append(cluster);
                }
                if (point) {
                    this.updateRange(value, fields);
                    cluster.append(point);
                    point.categoryIx = categoryIx;
                    point.category = category;
                    point.series = series;
                    point.seriesIx = seriesIx;
                    point.owner = this;
                    point.dataItem = dataItem;
                }
                this.points.push(point);
                categoryPoints.push(point);
            },
            pointType: function () {
                if (this.options.invertAxes) {
                    return VerticalBoxPlot;
                }
                return BoxPlot;
            },
            splitValue: function (value) {
                return [
                    value.lower,
                    value.q1,
                    value.median,
                    value.q3,
                    value.upper
                ];
            },
            updateRange: function (value, fields) {
                var axisName = fields.series.axis;
                var axisRange = this.valueAxisRanges[axisName];
                var parts = this.splitValue(value).concat(this.filterOutliers(value.outliers));
                if (defined(value.mean)) {
                    parts = parts.concat(value.mean);
                }
                axisRange = this.valueAxisRanges[axisName] = axisRange || {
                    min: MAX_VALUE,
                    max: MIN_VALUE
                };
                axisRange = this.valueAxisRanges[axisName] = {
                    min: Math.min.apply(Math, parts.concat([axisRange.min])),
                    max: Math.max.apply(Math, parts.concat([axisRange.max]))
                };
            },
            formatPointValue: function (point, format) {
                var value = point.value;
                return this.chartService.format.auto(format, value.lower, value.q1, value.median, value.q3, value.upper, value.mean, point.category);
            },
            filterOutliers: function (items) {
                var length = (items || []).length;
                var result = [];
                for (var i = 0; i < length; i++) {
                    var item = items[i];
                    if (defined(item) && item !== null) {
                        result.push(item);
                    }
                }
                return result;
            }
        });
        var ScatterErrorBar = ErrorBarBase.extend({
            getAxis: function () {
                var axes = this.chart.seriesAxes(this.series);
                var axis = this.isVertical ? axes.y : axes.x;
                return axis;
            }
        });
        function hasValue(value) {
            return defined(value) && value !== null;
        }
        var ScatterChart = ChartElement.extend({
            init: function (plotArea, options) {
                ChartElement.fn.init.call(this, options);
                this.plotArea = plotArea;
                this.chartService = plotArea.chartService;
                this._initFields();
                this.render();
            },
            _initFields: function () {
                this.xAxisRanges = {};
                this.yAxisRanges = {};
                this.points = [];
                this.seriesPoints = [];
                this.seriesOptions = [];
                this._evalSeries = [];
            },
            render: function () {
                this.traverseDataPoints(this.addValue.bind(this));
            },
            addErrorBar: function (point, field, fields) {
                var value = point.value[field];
                var valueErrorField = field + 'Value';
                var lowField = field + 'ErrorLow';
                var highField = field + 'ErrorHigh';
                var seriesIx = fields.seriesIx;
                var series = fields.series;
                var errorBars = point.options.errorBars;
                var lowValue = fields[lowField];
                var highValue = fields[highField];
                if (isNumber(value)) {
                    var errorRange;
                    if (isNumber(lowValue) && isNumber(highValue)) {
                        errorRange = {
                            low: lowValue,
                            high: highValue
                        };
                    }
                    if (errorBars && defined(errorBars[valueErrorField])) {
                        this.seriesErrorRanges = this.seriesErrorRanges || {
                            x: [],
                            y: []
                        };
                        this.seriesErrorRanges[field][seriesIx] = this.seriesErrorRanges[field][seriesIx] || new ErrorRangeCalculator(errorBars[valueErrorField], series, field);
                        errorRange = this.seriesErrorRanges[field][seriesIx].getErrorRange(value, errorBars[valueErrorField]);
                    }
                    if (errorRange) {
                        this.addPointErrorBar(errorRange, point, field);
                    }
                }
            },
            addPointErrorBar: function (errorRange, point, field) {
                var low = errorRange.low;
                var high = errorRange.high;
                var series = point.series;
                var options = point.options.errorBars;
                var isVertical = field === Y;
                var item = {};
                point[field + 'Low'] = low;
                point[field + 'High'] = high;
                point.errorBars = point.errorBars || [];
                var errorBar = new ScatterErrorBar(low, high, isVertical, this, series, options);
                point.errorBars.push(errorBar);
                point.append(errorBar);
                item[field] = low;
                this.updateRange(item, series);
                item[field] = high;
                this.updateRange(item, series);
            },
            addValue: function (value, fields) {
                var x = value.x;
                var y = value.y;
                var seriesIx = fields.seriesIx;
                var series = this.options.series[seriesIx];
                var missingValues = this.seriesMissingValues(series);
                var seriesPoints = this.seriesPoints[seriesIx];
                var pointValue = value;
                if (!(hasValue(x) && hasValue(y))) {
                    pointValue = this.createMissingValue(pointValue, missingValues);
                }
                var point;
                if (pointValue) {
                    point = this.createPoint(pointValue, fields);
                    if (point) {
                        $.extend(point, fields);
                        this.addErrorBar(point, X, fields);
                        this.addErrorBar(point, Y, fields);
                    }
                    this.updateRange(pointValue, fields.series);
                }
                this.points.push(point);
                seriesPoints.push(point);
            },
            seriesMissingValues: function (series) {
                return series.missingValues;
            },
            createMissingValue: function () {
            },
            updateRange: function (value, series) {
                var intlService = this.chartService.intl;
                var xAxisName = series.xAxis;
                var yAxisName = series.yAxis;
                var x = value.x;
                var y = value.y;
                var xAxisRange = this.xAxisRanges[xAxisName];
                var yAxisRange = this.yAxisRanges[yAxisName];
                if (hasValue(x)) {
                    xAxisRange = this.xAxisRanges[xAxisName] = xAxisRange || {
                        min: MAX_VALUE,
                        max: MIN_VALUE
                    };
                    if (isString(x)) {
                        x = parseDate(intlService, x);
                    }
                    xAxisRange.min = Math.min(xAxisRange.min, x);
                    xAxisRange.max = Math.max(xAxisRange.max, x);
                }
                if (hasValue(y)) {
                    yAxisRange = this.yAxisRanges[yAxisName] = yAxisRange || {
                        min: MAX_VALUE,
                        max: MIN_VALUE
                    };
                    if (isString(y)) {
                        y = parseDate(intlService, y);
                    }
                    yAxisRange.min = Math.min(yAxisRange.min, y);
                    yAxisRange.max = Math.max(yAxisRange.max, y);
                }
            },
            evalPointOptions: function (options, value, fields) {
                var series = fields.series;
                var seriesIx = fields.seriesIx;
                var state = {
                    defaults: series._defaults,
                    excluded: [
                        'data',
                        'tooltip',
                        'template',
                        'visual',
                        'toggle',
                        '_outOfRangeMinPoint',
                        '_outOfRangeMaxPoint'
                    ]
                };
                var doEval = this._evalSeries[seriesIx];
                if (!defined(doEval)) {
                    this._evalSeries[seriesIx] = doEval = evalOptions(options, {}, state, true);
                }
                var pointOptions = options;
                if (doEval) {
                    pointOptions = deepExtend({}, options);
                    evalOptions(pointOptions, {
                        value: value,
                        series: series,
                        dataItem: fields.dataItem
                    }, state);
                }
                return pointOptions;
            },
            pointType: function () {
                return LinePoint;
            },
            pointOptions: function (series, seriesIx) {
                var options = this.seriesOptions[seriesIx];
                if (!options) {
                    var defaults = this.pointType().prototype.defaults;
                    this.seriesOptions[seriesIx] = options = deepExtend({}, defaults, {
                        markers: { opacity: series.opacity },
                        tooltip: { format: this.options.tooltip.format },
                        labels: { format: this.options.labels.format }
                    }, series);
                }
                return options;
            },
            createPoint: function (value, fields) {
                var series = fields.series;
                var pointOptions = this.pointOptions(series, fields.seriesIx);
                var color = fields.color || series.color;
                pointOptions = this.evalPointOptions(pointOptions, value, fields);
                if (isFunction(series.color)) {
                    color = pointOptions.color;
                }
                var point = new LinePoint(value, pointOptions);
                point.color = color;
                this.append(point);
                return point;
            },
            seriesAxes: function (series) {
                var xAxisName = series.xAxis;
                var yAxisName = series.yAxis;
                var plotArea = this.plotArea;
                var xAxis = xAxisName ? plotArea.namedXAxes[xAxisName] : plotArea.axisX;
                var yAxis = yAxisName ? plotArea.namedYAxes[yAxisName] : plotArea.axisY;
                if (!xAxis) {
                    throw new Error('Unable to locate X axis with name ' + xAxisName);
                }
                if (!yAxis) {
                    throw new Error('Unable to locate Y axis with name ' + yAxisName);
                }
                return {
                    x: xAxis,
                    y: yAxis
                };
            },
            reflow: function (targetBox) {
                var this$1 = this;
                var chartPoints = this.points;
                var limit = !this.options.clip;
                var pointIx = 0;
                this.traverseDataPoints(function (value, fields) {
                    var point = chartPoints[pointIx++];
                    var seriesAxes = this$1.seriesAxes(fields.series);
                    var slotX = seriesAxes.x.getSlot(value.x, value.x, limit);
                    var slotY = seriesAxes.y.getSlot(value.y, value.y, limit);
                    if (point) {
                        if (slotX && slotY) {
                            var pointSlot = this$1.pointSlot(slotX, slotY);
                            point.reflow(pointSlot);
                        } else {
                            point.visible = false;
                        }
                    }
                });
                this.box = targetBox;
            },
            pointSlot: function (slotX, slotY) {
                return new Box(slotX.x1, slotY.y1, slotX.x2, slotY.y2);
            },
            traverseDataPoints: function (callback) {
                var this$1 = this;
                var ref = this;
                var series = ref.options.series;
                var seriesPoints = ref.seriesPoints;
                for (var seriesIx = 0; seriesIx < series.length; seriesIx++) {
                    var currentSeries = series[seriesIx];
                    var currentSeriesPoints = seriesPoints[seriesIx];
                    if (!currentSeriesPoints) {
                        seriesPoints[seriesIx] = [];
                    }
                    for (var pointIx = 0; pointIx < currentSeries.data.length; pointIx++) {
                        var ref$1 = this$1._bindPoint(currentSeries, seriesIx, pointIx);
                        var value = ref$1.valueFields;
                        var fields = ref$1.fields;
                        callback(value, deepExtend({
                            pointIx: pointIx,
                            series: currentSeries,
                            seriesIx: seriesIx,
                            dataItem: currentSeries.data[pointIx],
                            owner: this$1
                        }, fields));
                    }
                }
            },
            formatPointValue: function (point, format) {
                var value = point.value;
                return this.chartService.format.auto(format, value.x, value.y);
            },
            animationPoints: function () {
                var points = this.points;
                var result = [];
                for (var idx = 0; idx < points.length; idx++) {
                    result.push((points[idx] || {}).marker);
                }
                return result;
            }
        });
        setDefaultOptions(ScatterChart, {
            series: [],
            tooltip: { format: '{0}, {1}' },
            labels: { format: '{0}, {1}' },
            clip: true
        });
        deepExtend(ScatterChart.prototype, ClipAnimationMixin, { _bindPoint: CategoricalChart.prototype._bindPoint });
        var Bubble = LinePoint.extend({
            init: function (value, options) {
                LinePoint.fn.init.call(this, value, options);
                this.category = value.category;
            },
            createHighlight: function () {
                var highlight = this.options.highlight;
                var border = highlight.border;
                var markers = this.options.markers;
                var center = this.box.center();
                var radius = (markers.size + markers.border.width + border.width) / 2;
                var highlightGroup = new Group();
                var shadow = new drawing.Circle(new geometry.Circle([
                    center.x,
                    center.y + radius / 5 + border.width / 2
                ], radius + border.width / 2), {
                    stroke: { color: 'none' },
                    fill: this.createGradient({
                        gradient: 'bubbleShadow',
                        color: markers.background,
                        stops: [
                            {
                                offset: 0,
                                color: markers.background,
                                opacity: 0.3
                            },
                            {
                                offset: 1,
                                color: markers.background,
                                opacity: 0
                            }
                        ]
                    })
                });
                var overlay = new drawing.Circle(new geometry.Circle([
                    center.x,
                    center.y
                ], radius), {
                    stroke: {
                        color: border.color || new Color(markers.background).brightness(BORDER_BRIGHTNESS).toHex(),
                        width: border.width,
                        opacity: border.opacity
                    },
                    fill: {
                        color: markers.background,
                        opacity: highlight.opacity
                    }
                });
                highlightGroup.append(shadow, overlay);
                return highlightGroup;
            }
        });
        Bubble.prototype.defaults = deepExtend({}, Bubble.prototype.defaults, {
            labels: { position: CENTER },
            highlight: {
                opacity: 1,
                border: {
                    color: '#fff',
                    width: 2,
                    opacity: 1
                }
            }
        });
        var BubbleChart = ScatterChart.extend({
            _initFields: function () {
                this._maxSize = MIN_VALUE;
                ScatterChart.fn._initFields.call(this);
            },
            addValue: function (value, fields) {
                if (value.size !== null && (value.size > 0 || value.size < 0 && fields.series.negativeValues.visible)) {
                    this._maxSize = Math.max(this._maxSize, Math.abs(value.size));
                    ScatterChart.fn.addValue.call(this, value, fields);
                } else {
                    this.points.push(null);
                    this.seriesPoints[fields.seriesIx].push(null);
                }
            },
            reflow: function (box) {
                this.updateBubblesSize(box);
                ScatterChart.fn.reflow.call(this, box);
            },
            pointType: function () {
                return Bubble;
            },
            createPoint: function (value, fields) {
                var series = fields.series;
                var pointsCount = series.data.length;
                var delay = fields.pointIx * (INITIAL_ANIMATION_DURATION / pointsCount);
                var animationOptions = {
                    delay: delay,
                    duration: INITIAL_ANIMATION_DURATION - delay,
                    type: BUBBLE
                };
                var color = fields.color || series.color;
                if (value.size < 0 && series.negativeValues.visible) {
                    color = valueOrDefault(series.negativeValues.color, color);
                }
                var pointOptions = deepExtend({
                    labels: {
                        animation: {
                            delay: delay,
                            duration: INITIAL_ANIMATION_DURATION - delay
                        }
                    }
                }, this.pointOptions(series, fields.seriesIx), {
                    markers: {
                        type: CIRCLE,
                        border: series.border,
                        opacity: series.opacity,
                        animation: animationOptions
                    }
                });
                pointOptions = this.evalPointOptions(pointOptions, value, fields);
                if (isFunction(series.color)) {
                    color = pointOptions.color;
                }
                pointOptions.markers.background = color;
                var point = new Bubble(value, pointOptions);
                point.color = color;
                this.append(point);
                return point;
            },
            updateBubblesSize: function (box) {
                var this$1 = this;
                var ref = this;
                var series = ref.options.series;
                var boxSize = Math.min(box.width(), box.height());
                for (var seriesIx = 0; seriesIx < series.length; seriesIx++) {
                    var currentSeries = series[seriesIx];
                    var seriesPoints = this$1.seriesPoints[seriesIx];
                    var minSize = currentSeries.minSize || Math.max(boxSize * 0.02, 10);
                    var maxSize = currentSeries.maxSize || boxSize * 0.2;
                    var minR = minSize / 2;
                    var maxR = maxSize / 2;
                    var minArea = Math.PI * minR * minR;
                    var maxArea = Math.PI * maxR * maxR;
                    var areaRange = maxArea - minArea;
                    var areaRatio = areaRange / this$1._maxSize;
                    for (var pointIx = 0; pointIx < seriesPoints.length; pointIx++) {
                        var point = seriesPoints[pointIx];
                        if (point) {
                            var area = Math.abs(point.value.size) * areaRatio;
                            var radius = Math.sqrt((minArea + area) / Math.PI);
                            var baseZIndex = valueOrDefault(point.options.zIndex, 0);
                            var zIndex = baseZIndex + (1 - radius / maxR);
                            deepExtend(point.options, {
                                zIndex: zIndex,
                                markers: {
                                    size: radius * 2,
                                    zIndex: zIndex
                                },
                                labels: { zIndex: zIndex + 1 }
                            });
                        }
                    }
                }
            },
            formatPointValue: function (point, format) {
                var value = point.value;
                return this.chartService.format.auto(format, value.x, value.y, value.size, point.category);
            },
            createAnimation: function () {
            },
            createVisual: function () {
            }
        });
        setDefaultOptions(BubbleChart, {
            tooltip: { format: '{3}' },
            labels: { format: '{3}' }
        });
        var Target = ShapeElement.extend({});
        deepExtend(Target.prototype, PointEventsMixin);
        var Bullet = ChartElement.extend({
            init: function (value, options) {
                ChartElement.fn.init.call(this, options);
                this.aboveAxis = this.options.aboveAxis;
                this.color = options.color || WHITE;
                this.value = value;
            },
            render: function () {
                var options = this.options;
                if (!this._rendered) {
                    this._rendered = true;
                    if (defined(this.value.target)) {
                        this.target = new Target({
                            type: options.target.shape,
                            background: options.target.color || this.color,
                            opacity: options.opacity,
                            zIndex: options.zIndex,
                            border: options.target.border,
                            vAlign: TOP,
                            align: RIGHT
                        });
                        this.target.value = this.value;
                        this.target.dataItem = this.dataItem;
                        this.target.series = this.series;
                        this.append(this.target);
                    }
                    this.createNote();
                }
            },
            reflow: function (box) {
                this.render();
                var ref = this;
                var options = ref.options;
                var target = ref.target;
                var chart = ref.owner;
                var invertAxes = options.invertAxes;
                var valueAxis = chart.seriesValueAxis(this.options);
                var categorySlot = chart.categorySlot(chart.categoryAxis, options.categoryIx, valueAxis);
                var targetValueSlot = valueAxis.getSlot(this.value.target);
                var targetSlotX = invertAxes ? targetValueSlot : categorySlot;
                var targetSlotY = invertAxes ? categorySlot : targetValueSlot;
                if (target) {
                    var targetSlot = new Box(targetSlotX.x1, targetSlotY.y1, targetSlotX.x2, targetSlotY.y2);
                    target.options.height = invertAxes ? targetSlot.height() : options.target.line.width;
                    target.options.width = invertAxes ? options.target.line.width : targetSlot.width();
                    target.reflow(targetSlot);
                }
                if (this.note) {
                    this.note.reflow(box);
                }
                this.box = box;
            },
            createVisual: function () {
                ChartElement.fn.createVisual.call(this);
                var options = this.options;
                var body = Path.fromRect(this.box.toRect(), {
                    fill: {
                        color: this.color,
                        opacity: options.opacity
                    },
                    stroke: null
                });
                if (options.border.width > 0) {
                    body.options.set('stroke', {
                        color: options.border.color || this.color,
                        width: options.border.width,
                        dashType: options.border.dashType,
                        opacity: valueOrDefault(options.border.opacity, options.opacity)
                    });
                }
                this.bodyVisual = body;
                alignPathToPixel(body);
                this.visual.append(body);
            },
            createAnimation: function () {
                if (this.bodyVisual) {
                    this.animation = Animation.create(this.bodyVisual, this.options.animation);
                }
            },
            createHighlight: function (style) {
                return Path.fromRect(this.box.toRect(), style);
            },
            highlightVisual: function () {
                return this.bodyVisual;
            },
            highlightVisualArgs: function () {
                return {
                    rect: this.box.toRect(),
                    visual: this.bodyVisual,
                    options: this.options
                };
            },
            formatValue: function (format) {
                return this.owner.formatPointValue(this, format);
            }
        });
        Bullet.prototype.tooltipAnchor = Bar.prototype.tooltipAnchor;
        setDefaultOptions(Bullet, {
            border: { width: 1 },
            vertical: false,
            opacity: 1,
            target: {
                shape: '',
                border: {
                    width: 0,
                    color: 'green'
                },
                line: { width: 2 }
            },
            tooltip: { format: 'Current: {0}<br />Target: {1}' }
        });
        deepExtend(Bullet.prototype, PointEventsMixin);
        deepExtend(Bullet.prototype, NoteMixin);
        var BulletChart = CategoricalChart.extend({
            init: function (plotArea, options) {
                wrapData(options);
                CategoricalChart.fn.init.call(this, plotArea, options);
            },
            reflowCategories: function (categorySlots) {
                var children = this.children;
                var childrenLength = children.length;
                for (var i = 0; i < childrenLength; i++) {
                    children[i].reflow(categorySlots[i]);
                }
            },
            plotRange: function (point) {
                var series = point.series;
                var valueAxis = this.seriesValueAxis(series);
                var axisCrossingValue = this.categoryAxisCrossingValue(valueAxis);
                return [
                    axisCrossingValue,
                    point.value.current || axisCrossingValue
                ];
            },
            createPoint: function (data, fields) {
                var categoryIx = fields.categoryIx;
                var category = fields.category;
                var series = fields.series;
                var seriesIx = fields.seriesIx;
                var ref = this;
                var options = ref.options;
                var children = ref.children;
                var value = data.valueFields;
                var bulletOptions = deepExtend({
                    vertical: !options.invertAxes,
                    overlay: series.overlay,
                    categoryIx: categoryIx,
                    invertAxes: options.invertAxes
                }, series);
                var color = data.fields.color || series.color;
                bulletOptions = this.evalPointOptions(bulletOptions, value, category, categoryIx, series, seriesIx);
                if (isFunction(series.color)) {
                    color = bulletOptions.color;
                }
                var bullet = new Bullet(value, bulletOptions);
                bullet.color = color;
                var cluster = children[categoryIx];
                if (!cluster) {
                    cluster = new ClusterLayout({
                        vertical: options.invertAxes,
                        gap: options.gap,
                        spacing: options.spacing
                    });
                    this.append(cluster);
                }
                cluster.append(bullet);
                return bullet;
            },
            updateRange: function (value, fields) {
                var current = value.current;
                var target = value.target;
                var axisName = fields.series.axis;
                var axisRange = this.valueAxisRanges[axisName];
                if (defined(current) && !isNaN(current) && defined(target && !isNaN(target))) {
                    axisRange = this.valueAxisRanges[axisName] = axisRange || {
                        min: MAX_VALUE,
                        max: MIN_VALUE
                    };
                    axisRange.min = Math.min(axisRange.min, current, target);
                    axisRange.max = Math.max(axisRange.max, current, target);
                }
            },
            formatPointValue: function (point, format) {
                return this.chartService.format.auto(format, point.value.current, point.value.target);
            },
            pointValue: function (data) {
                return data.valueFields.current;
            },
            aboveAxis: function (point) {
                var value = point.value.current;
                return value > 0;
            },
            createAnimation: function () {
                var this$1 = this;
                var points = this.points;
                this._setAnimationOptions();
                for (var idx = 0; idx < points.length; idx++) {
                    var point = points[idx];
                    point.options.animation = this$1.options.animation;
                    point.createAnimation();
                }
            }
        });
        BulletChart.prototype._setAnimationOptions = BarChart.prototype._setAnimationOptions;
        setDefaultOptions(BulletChart, { animation: { type: BAR } });
        function wrapData(options) {
            var series = options.series;
            for (var i = 0; i < series.length; i++) {
                var seriesItem = series[i];
                var data = seriesItem.data;
                if (data && !isArray(data[0]) && !isObject(data[0])) {
                    seriesItem.data = [data];
                }
            }
        }
        var BaseTooltip = Class.extend({
            init: function (chartService, options) {
                this.chartService = chartService;
                this.options = deepExtend({}, this.options, options);
            },
            getStyle: function (options, point) {
                var background = options.background;
                var border = options.border.color;
                if (point) {
                    var pointColor = point.color || point.options.color;
                    background = valueOrDefault(background, pointColor);
                    border = valueOrDefault(border, pointColor);
                }
                var padding = getSpacing(options.padding || {}, 'auto');
                return {
                    backgroundColor: background,
                    borderColor: border,
                    font: options.font,
                    color: options.color,
                    opacity: options.opacity,
                    borderWidth: styleValue(options.border.width),
                    paddingTop: styleValue(padding.top),
                    paddingBottom: styleValue(padding.bottom),
                    paddingLeft: styleValue(padding.left),
                    paddingRight: styleValue(padding.right)
                };
            },
            show: function (options, tooltipOptions, point) {
                options.format = tooltipOptions.format;
                var style = this.getStyle(tooltipOptions, point);
                options.style = style;
                if (!defined(tooltipOptions.color) && new Color(style.backgroundColor).percBrightness() > 180) {
                    options.className = 'k-chart-tooltip-inverse';
                }
                this.chartService.notify(SHOW_TOOLTIP, options);
            },
            hide: function () {
                if (this.chartService) {
                    this.chartService.notify(HIDE_TOOLTIP);
                }
            },
            destroy: function () {
                delete this.chartService;
            }
        });
        setDefaultOptions(BaseTooltip, {
            border: { width: 1 },
            opacity: 1
        });
        var CrosshairTooltip = BaseTooltip.extend({
            init: function (chartService, crosshair, options) {
                BaseTooltip.fn.init.call(this, chartService, options);
                this.crosshair = crosshair;
                this.formatService = chartService.format;
                this.initAxisName();
            },
            initAxisName: function () {
                var axis = this.crosshair.axis;
                var plotArea = axis.plotArea;
                var name;
                if (plotArea.categoryAxis) {
                    name = axis.getCategory ? 'categoryAxis' : 'valueAxis';
                } else {
                    name = axis.options.vertical ? 'yAxis' : 'xAxis';
                }
                this.axisName = name;
            },
            showAt: function (point) {
                var ref = this;
                var axis = ref.crosshair.axis;
                var options = ref.options;
                var value = axis[options.stickyMode ? 'getCategory' : 'getValue'](point);
                var formattedValue = value;
                if (options.format) {
                    formattedValue = this.formatService.auto(options.format, value);
                } else if (axis.options.type === DATE) {
                    formattedValue = this.formatService.auto(axis.options.labels.dateFormats[axis.options.baseUnit], value);
                }
                this.show({
                    point: point,
                    anchor: this.getAnchor(),
                    crosshair: this.crosshair,
                    value: formattedValue,
                    axisName: this.axisName,
                    axisIndex: this.crosshair.axis.axisIndex
                }, this.options);
            },
            hide: function () {
                this.chartService.notify(HIDE_TOOLTIP, {
                    crosshair: this.crosshair,
                    axisName: this.axisName,
                    axisIndex: this.crosshair.axis.axisIndex
                });
            },
            getAnchor: function () {
                var ref = this;
                var crosshair = ref.crosshair;
                var ref_options = ref.options;
                var position = ref_options.position;
                var padding = ref_options.padding;
                var vertical = !crosshair.axis.options.vertical;
                var lineBox = crosshair.line.bbox();
                var horizontalAlign, verticalAlign, point;
                if (vertical) {
                    horizontalAlign = CENTER;
                    if (position === BOTTOM) {
                        verticalAlign = TOP;
                        point = lineBox.bottomLeft().translate(0, padding);
                    } else {
                        verticalAlign = BOTTOM;
                        point = lineBox.topLeft().translate(0, -padding);
                    }
                } else {
                    verticalAlign = CENTER;
                    if (position === LEFT) {
                        horizontalAlign = RIGHT;
                        point = lineBox.topLeft().translate(-padding, 0);
                    } else {
                        horizontalAlign = LEFT;
                        point = lineBox.topRight().translate(padding, 0);
                    }
                }
                return {
                    point: point,
                    align: {
                        horizontal: horizontalAlign,
                        vertical: verticalAlign
                    }
                };
            }
        });
        setDefaultOptions(CrosshairTooltip, { padding: 10 });
        var Crosshair = ChartElement.extend({
            init: function (chartService, axis, options) {
                ChartElement.fn.init.call(this, options);
                this.axis = axis;
                this.stickyMode = axis instanceof CategoryAxis;
                var tooltipOptions = this.options.tooltip;
                if (tooltipOptions.visible) {
                    this.tooltip = new CrosshairTooltip(chartService, this, deepExtend({}, tooltipOptions, { stickyMode: this.stickyMode }));
                }
            },
            showAt: function (point) {
                this.point = point;
                this.moveLine();
                this.line.visible(true);
                if (this.tooltip) {
                    this.tooltip.showAt(point);
                }
            },
            hide: function () {
                this.line.visible(false);
                if (this.tooltip) {
                    this.tooltip.hide();
                }
            },
            moveLine: function () {
                var ref = this;
                var axis = ref.axis;
                var point = ref.point;
                var vertical = axis.options.vertical;
                var box = this.getBox();
                var dim = vertical ? Y : X;
                var lineStart = new GeometryPoint(box.x1, box.y1);
                var lineEnd;
                if (vertical) {
                    lineEnd = new GeometryPoint(box.x2, box.y1);
                } else {
                    lineEnd = new GeometryPoint(box.x1, box.y2);
                }
                if (point) {
                    if (this.stickyMode) {
                        var slot = axis.getSlot(axis.pointCategoryIndex(point));
                        lineStart[dim] = lineEnd[dim] = slot.center()[dim];
                    } else {
                        lineStart[dim] = lineEnd[dim] = point[dim];
                    }
                }
                this.box = box;
                this.line.moveTo(lineStart).lineTo(lineEnd);
            },
            getBox: function () {
                var axis = this.axis;
                var axes = axis.pane.axes;
                var length = axes.length;
                var vertical = axis.options.vertical;
                var box = axis.lineBox().clone();
                var dim = vertical ? X : Y;
                var axisLineBox;
                for (var i = 0; i < length; i++) {
                    var currentAxis = axes[i];
                    if (currentAxis.options.vertical !== vertical) {
                        if (!axisLineBox) {
                            axisLineBox = currentAxis.lineBox().clone();
                        } else {
                            axisLineBox.wrap(currentAxis.lineBox());
                        }
                    }
                }
                box[dim + 1] = axisLineBox[dim + 1];
                box[dim + 2] = axisLineBox[dim + 2];
                return box;
            },
            createVisual: function () {
                ChartElement.fn.createVisual.call(this);
                var options = this.options;
                this.line = new Path({
                    stroke: {
                        color: options.color,
                        width: options.width,
                        opacity: options.opacity,
                        dashType: options.dashType
                    },
                    visible: false
                });
                this.moveLine();
                this.visual.append(this.line);
            },
            destroy: function () {
                if (this.tooltip) {
                    this.tooltip.destroy();
                }
                ChartElement.fn.destroy.call(this);
            }
        });
        setDefaultOptions(Crosshair, {
            color: BLACK,
            width: 2,
            zIndex: -1,
            tooltip: { visible: false }
        });
        var ChartContainer = ChartElement.extend({
            init: function (options, pane) {
                ChartElement.fn.init.call(this, options);
                this.pane = pane;
            },
            shouldClip: function () {
                var children = this.children;
                var length = children.length;
                for (var i = 0; i < length; i++) {
                    if (children[i].options.clip === true) {
                        return true;
                    }
                }
                return false;
            },
            _clipBox: function () {
                return this.pane.chartsBox();
            },
            createVisual: function () {
                this.visual = new Group({ zIndex: 0 });
                if (this.shouldClip()) {
                    var clipBox = this.clipBox = this._clipBox();
                    var clipRect = clipBox.toRect();
                    var clipPath = Path.fromRect(clipRect);
                    this.visual.clip(clipPath);
                    this.unclipLabels();
                }
            },
            stackRoot: function () {
                return this;
            },
            unclipLabels: function () {
                var ref = this;
                var charts = ref.children;
                var clipBox = ref.clipBox;
                for (var i = 0; i < charts.length; i++) {
                    var points = charts[i].points || {};
                    var length = points.length;
                    for (var j = 0; j < length; j++) {
                        var point = points[j];
                        if (point && point.overlapsBox && point.overlapsBox(clipBox)) {
                            var label = point.label;
                            var note = point.note;
                            if (label && label.options.visible) {
                                if (label.alignToClipBox) {
                                    label.alignToClipBox(clipBox);
                                }
                                label.options.noclip = true;
                            }
                            if (note && note.options.visible) {
                                note.options.noclip = true;
                            }
                        }
                    }
                }
            },
            destroy: function () {
                ChartElement.fn.destroy.call(this);
                delete this.parent;
            }
        });
        ChartContainer.prototype.isStackRoot = true;
        var Pane = BoxElement.extend({
            init: function (options) {
                BoxElement.fn.init.call(this, options);
                this.id = paneID();
                this.createTitle();
                this.content = new ChartElement();
                this.chartContainer = new ChartContainer({}, this);
                this.append(this.content);
                this.axes = [];
                this.charts = [];
            },
            createTitle: function () {
                var titleOptions = this.options.title;
                if (isObject(titleOptions)) {
                    titleOptions = deepExtend({}, titleOptions, {
                        align: titleOptions.position,
                        position: TOP
                    });
                }
                this.title = dataviz.Title.buildTitle(titleOptions, this, Pane.prototype.options.title);
            },
            appendAxis: function (axis) {
                this.content.append(axis);
                this.axes.push(axis);
                axis.pane = this;
            },
            appendChart: function (chart) {
                if (this.chartContainer.parent !== this.content) {
                    this.content.append(this.chartContainer);
                }
                this.charts.push(chart);
                this.chartContainer.append(chart);
                chart.pane = this;
            },
            empty: function () {
                var this$1 = this;
                var plotArea = this.parent;
                if (plotArea) {
                    for (var i = 0; i < this.axes.length; i++) {
                        plotArea.removeAxis(this$1.axes[i]);
                    }
                    for (var i$1 = 0; i$1 < this.charts.length; i$1++) {
                        plotArea.removeChart(this$1.charts[i$1]);
                    }
                }
                this.axes = [];
                this.charts = [];
                this.content.destroy();
                this.content.children = [];
                this.chartContainer.children = [];
            },
            reflow: function (targetBox) {
                var content;
                if (last(this.children) === this.content) {
                    content = this.children.pop();
                }
                BoxElement.fn.reflow.call(this, targetBox);
                if (content) {
                    this.children.push(content);
                }
                if (this.title) {
                    this.contentBox.y1 += this.title.box.height();
                }
            },
            visualStyle: function () {
                var style = BoxElement.fn.visualStyle.call(this);
                style.zIndex = -10;
                return style;
            },
            renderComplete: function () {
                if (this.options.visible) {
                    this.createGridLines();
                }
            },
            stackRoot: function () {
                return this;
            },
            clipRoot: function () {
                return this;
            },
            createGridLines: function () {
                var axes = this.axes;
                var allAxes = axes.concat(this.parent.axes);
                var vGridLines = [];
                var hGridLines = [];
                for (var i = 0; i < axes.length; i++) {
                    var axis = axes[i];
                    var vertical = axis.options.vertical;
                    var gridLines = vertical ? vGridLines : hGridLines;
                    for (var j = 0; j < allAxes.length; j++) {
                        if (gridLines.length === 0) {
                            var altAxis = allAxes[j];
                            if (vertical !== altAxis.options.vertical) {
                                append(gridLines, axis.createGridLines(altAxis));
                            }
                        }
                    }
                }
            },
            refresh: function () {
                this.visual.clear();
                this.content.parent = null;
                this.content.createGradient = this.createGradient.bind(this);
                this.content.renderVisual();
                this.content.parent = this;
                if (this.title) {
                    this.visual.append(this.title.visual);
                }
                this.visual.append(this.content.visual);
                this.renderComplete();
            },
            chartsBox: function () {
                var axes = this.axes;
                var length = axes.length;
                var chartsBox = new Box();
                for (var idx = 0; idx < length; idx++) {
                    var axis = axes[idx];
                    var axisValueField = axis.options.vertical ? Y : X;
                    var lineBox = axis.lineBox();
                    chartsBox[axisValueField + 1] = lineBox[axisValueField + 1];
                    chartsBox[axisValueField + 2] = lineBox[axisValueField + 2];
                }
                if (chartsBox.x2 === 0) {
                    var allAxes = this.parent.axes;
                    var length$1 = allAxes.length;
                    for (var idx$1 = 0; idx$1 < length$1; idx$1++) {
                        var axis$1 = allAxes[idx$1];
                        if (!axis$1.options.vertical) {
                            var lineBox$1 = axis$1.lineBox();
                            chartsBox.x1 = lineBox$1.x1;
                            chartsBox.x2 = lineBox$1.x2;
                        }
                    }
                }
                return chartsBox;
            },
            clipBox: function () {
                return this.chartContainer.clipBox;
            }
        });
        var ID = 1;
        function paneID() {
            return 'pane' + ID++;
        }
        Pane.prototype.isStackRoot = true;
        setDefaultOptions(Pane, {
            zIndex: -1,
            shrinkToFit: true,
            title: { align: LEFT },
            visible: true
        });
        var PlotAreaBase = ChartElement.extend({
            init: function (series, options, chartService) {
                ChartElement.fn.init.call(this, options);
                this.initFields(series, options);
                this.series = series;
                this.initSeries();
                this.charts = [];
                this.options.legend.items = [];
                this.axes = [];
                this.crosshairs = [];
                this.chartService = chartService;
                this.createPanes();
                this.render();
                this.createCrosshairs();
            },
            initFields: function () {
            },
            initSeries: function () {
                var series = this.series;
                for (var i = 0; i < series.length; i++) {
                    series[i].index = i;
                }
            },
            createPanes: function () {
                var this$1 = this;
                var defaults = { title: { color: (this.options.title || {}).color } };
                var panes = [];
                var paneOptions = this.options.panes || [];
                var panesLength = Math.max(paneOptions.length, 1);
                function setTitle(options, defaults) {
                    if (isString(options.title)) {
                        options.title = { text: options.title };
                    }
                    options.title = deepExtend({}, defaults.title, options.title);
                }
                for (var i = 0; i < panesLength; i++) {
                    var options = paneOptions[i] || {};
                    setTitle(options, defaults);
                    var currentPane = new Pane(options);
                    currentPane.paneIndex = i;
                    panes.push(currentPane);
                    this$1.append(currentPane);
                }
                this.panes = panes;
            },
            createCrosshairs: function (panes) {
                var this$1 = this;
                if (panes === void 0) {
                    panes = this.panes;
                }
                for (var i = 0; i < panes.length; i++) {
                    var pane = panes[i];
                    for (var j = 0; j < pane.axes.length; j++) {
                        var axis = pane.axes[j];
                        if (axis.options.crosshair && axis.options.crosshair.visible) {
                            var currentCrosshair = new Crosshair(this$1.chartService, axis, axis.options.crosshair);
                            this$1.crosshairs.push(currentCrosshair);
                            pane.content.append(currentCrosshair);
                        }
                    }
                }
            },
            removeCrosshairs: function (pane) {
                var crosshairs = this.crosshairs;
                var axes = pane.axes;
                for (var i = crosshairs.length - 1; i >= 0; i--) {
                    for (var j = 0; j < axes.length; j++) {
                        if (crosshairs[i].axis === axes[j]) {
                            crosshairs.splice(i, 1);
                            break;
                        }
                    }
                }
            },
            hideCrosshairs: function () {
                var crosshairs = this.crosshairs;
                for (var idx = 0; idx < crosshairs.length; idx++) {
                    crosshairs[idx].hide();
                }
            },
            findPane: function (name) {
                var panes = this.panes;
                var matchingPane;
                for (var i = 0; i < panes.length; i++) {
                    if (panes[i].options.name === name) {
                        matchingPane = panes[i];
                        break;
                    }
                }
                return matchingPane || panes[0];
            },
            findPointPane: function (point) {
                var panes = this.panes;
                var matchingPane;
                for (var i = 0; i < panes.length; i++) {
                    if (panes[i].box.containsPoint(point)) {
                        matchingPane = panes[i];
                        break;
                    }
                }
                return matchingPane;
            },
            appendAxis: function (axis) {
                var pane = this.findPane(axis.options.pane);
                pane.appendAxis(axis);
                this.axes.push(axis);
                axis.plotArea = this;
            },
            removeAxis: function (axisToRemove) {
                var this$1 = this;
                var filteredAxes = [];
                for (var i = 0; i < this.axes.length; i++) {
                    var axis = this$1.axes[i];
                    if (axisToRemove !== axis) {
                        filteredAxes.push(axis);
                    } else {
                        axis.destroy();
                    }
                }
                this.axes = filteredAxes;
            },
            appendChart: function (chart, pane) {
                this.charts.push(chart);
                if (pane) {
                    pane.appendChart(chart);
                } else {
                    this.append(chart);
                }
            },
            removeChart: function (chartToRemove) {
                var this$1 = this;
                var filteredCharts = [];
                for (var i = 0; i < this.charts.length; i++) {
                    var chart = this$1.charts[i];
                    if (chart !== chartToRemove) {
                        filteredCharts.push(chart);
                    } else {
                        chart.destroy();
                    }
                }
                this.charts = filteredCharts;
            },
            addToLegend: function (series) {
                var count = series.length;
                var legend = this.options.legend;
                var labels = legend.labels || {};
                var inactiveItems = legend.inactiveItems || {};
                var inactiveItemsLabels = inactiveItems.labels || {};
                var data = [];
                for (var i = 0; i < count; i++) {
                    var currentSeries = series[i];
                    var seriesVisible = currentSeries.visible !== false;
                    if (currentSeries.visibleInLegend === false) {
                        continue;
                    }
                    var text = currentSeries.name || '';
                    var labelTemplate = seriesVisible ? labels.template : inactiveItemsLabels.template || labels.template;
                    if (labelTemplate) {
                        text = TemplateService.compile(labelTemplate)({
                            text: text,
                            series: currentSeries
                        });
                    }
                    var defaults = currentSeries._defaults;
                    var color = currentSeries.color;
                    if (isFunction(color) && defaults) {
                        color = defaults.color;
                    }
                    var itemLabelOptions = void 0, markerColor = void 0;
                    if (seriesVisible) {
                        itemLabelOptions = {};
                        markerColor = color;
                    } else {
                        itemLabelOptions = {
                            color: inactiveItemsLabels.color,
                            font: inactiveItemsLabels.font
                        };
                        markerColor = inactiveItems.markers.color;
                    }
                    if (text) {
                        data.push({
                            text: text,
                            labels: itemLabelOptions,
                            markerColor: markerColor,
                            series: currentSeries,
                            active: seriesVisible
                        });
                    }
                }
                append(legend.items, data);
            },
            groupAxes: function (panes) {
                var xAxes = [];
                var yAxes = [];
                for (var paneIx = 0; paneIx < panes.length; paneIx++) {
                    var paneAxes = panes[paneIx].axes;
                    for (var axisIx = 0; axisIx < paneAxes.length; axisIx++) {
                        var axis = paneAxes[axisIx];
                        if (axis.options.vertical) {
                            yAxes.push(axis);
                        } else {
                            xAxes.push(axis);
                        }
                    }
                }
                return {
                    x: xAxes,
                    y: yAxes,
                    any: xAxes.concat(yAxes)
                };
            },
            groupSeriesByPane: function () {
                var this$1 = this;
                var series = this.series;
                var seriesByPane = {};
                for (var i = 0; i < series.length; i++) {
                    var currentSeries = series[i];
                    var pane = this$1.seriesPaneName(currentSeries);
                    if (seriesByPane[pane]) {
                        seriesByPane[pane].push(currentSeries);
                    } else {
                        seriesByPane[pane] = [currentSeries];
                    }
                }
                return seriesByPane;
            },
            filterVisibleSeries: function (series) {
                var result = [];
                for (var i = 0; i < series.length; i++) {
                    var currentSeries = series[i];
                    if (currentSeries.visible !== false) {
                        result.push(currentSeries);
                    }
                }
                return result;
            },
            reflow: function (targetBox) {
                var options = this.options.plotArea;
                var panes = this.panes;
                var margin = getSpacing(options.margin);
                this.box = targetBox.clone().unpad(margin);
                this.reflowPanes();
                this.reflowAxes(panes);
                this.reflowCharts(panes);
            },
            redraw: function (panes) {
                var this$1 = this;
                var panesArray = [].concat(panes);
                this.initSeries();
                for (var i = 0; i < panesArray.length; i++) {
                    this$1.removeCrosshairs(panesArray[i]);
                    panesArray[i].empty();
                }
                this.render(panesArray);
                this.reflowAxes(this.panes);
                this.reflowCharts(panesArray);
                this.createCrosshairs(panesArray);
                for (var i$1 = 0; i$1 < panesArray.length; i$1++) {
                    panesArray[i$1].refresh();
                }
            },
            axisCrossingValues: function (axis, crossingAxes) {
                var options = axis.options;
                var crossingValues = [].concat(options.axisCrossingValues || options.axisCrossingValue);
                var valuesToAdd = crossingAxes.length - crossingValues.length;
                var defaultValue = crossingValues[0] || 0;
                for (var i = 0; i < valuesToAdd; i++) {
                    crossingValues.push(defaultValue);
                }
                return crossingValues;
            },
            alignAxisTo: function (axis, targetAxis, crossingValue, targetCrossingValue) {
                var slot = axis.getSlot(crossingValue, crossingValue, true);
                var slotEdge = axis.options.reverse ? 2 : 1;
                var targetSlot = targetAxis.getSlot(targetCrossingValue, targetCrossingValue, true);
                var targetEdge = targetAxis.options.reverse ? 2 : 1;
                var axisBox = axis.box.translate(targetSlot[X + targetEdge] - slot[X + slotEdge], targetSlot[Y + targetEdge] - slot[Y + slotEdge]);
                if (axis.pane !== targetAxis.pane) {
                    axisBox.translate(0, axis.pane.box.y1 - targetAxis.pane.box.y1);
                }
                axis.reflow(axisBox);
            },
            alignAxes: function (xAxes, yAxes) {
                var this$1 = this;
                var xAnchor = xAxes[0];
                var yAnchor = yAxes[0];
                var xAnchorCrossings = this.axisCrossingValues(xAnchor, yAxes);
                var yAnchorCrossings = this.axisCrossingValues(yAnchor, xAxes);
                var leftAnchors = {};
                var rightAnchors = {};
                var topAnchors = {};
                var bottomAnchors = {};
                for (var i = 0; i < yAxes.length; i++) {
                    var axis = yAxes[i];
                    var pane = axis.pane;
                    var paneId = pane.id;
                    var anchor = paneAnchor(xAxes, pane) || xAnchor;
                    var anchorCrossings = xAnchorCrossings;
                    if (anchor !== xAnchor) {
                        anchorCrossings = this$1.axisCrossingValues(anchor, yAxes);
                    }
                    this$1.alignAxisTo(axis, anchor, yAnchorCrossings[i], anchorCrossings[i]);
                    if (axis.options._overlap) {
                        continue;
                    }
                    if (round(axis.lineBox().x1) === round(anchor.lineBox().x1)) {
                        if (leftAnchors[paneId]) {
                            axis.reflow(axis.box.alignTo(leftAnchors[paneId].box, LEFT).translate(-axis.options.margin, 0));
                        }
                        leftAnchors[paneId] = axis;
                    }
                    if (round(axis.lineBox().x2) === round(anchor.lineBox().x2)) {
                        if (!axis._mirrored) {
                            axis.options.labels.mirror = !axis.options.labels.mirror;
                            axis._mirrored = true;
                        }
                        this$1.alignAxisTo(axis, anchor, yAnchorCrossings[i], anchorCrossings[i]);
                        if (rightAnchors[paneId]) {
                            axis.reflow(axis.box.alignTo(rightAnchors[paneId].box, RIGHT).translate(axis.options.margin, 0));
                        }
                        rightAnchors[paneId] = axis;
                    }
                    if (i !== 0 && yAnchor.pane === axis.pane) {
                        axis.alignTo(yAnchor);
                        axis.reflow(axis.box);
                    }
                }
                for (var i$1 = 0; i$1 < xAxes.length; i$1++) {
                    var axis$1 = xAxes[i$1];
                    var pane$1 = axis$1.pane;
                    var paneId$1 = pane$1.id;
                    var anchor$1 = paneAnchor(yAxes, pane$1) || yAnchor;
                    var anchorCrossings$1 = yAnchorCrossings;
                    if (anchor$1 !== yAnchor) {
                        anchorCrossings$1 = this$1.axisCrossingValues(anchor$1, xAxes);
                    }
                    this$1.alignAxisTo(axis$1, anchor$1, xAnchorCrossings[i$1], anchorCrossings$1[i$1]);
                    if (axis$1.options._overlap) {
                        continue;
                    }
                    if (round(axis$1.lineBox().y1) === round(anchor$1.lineBox().y1)) {
                        if (!axis$1._mirrored) {
                            axis$1.options.labels.mirror = !axis$1.options.labels.mirror;
                            axis$1._mirrored = true;
                        }
                        this$1.alignAxisTo(axis$1, anchor$1, xAnchorCrossings[i$1], anchorCrossings$1[i$1]);
                        if (topAnchors[paneId$1]) {
                            axis$1.reflow(axis$1.box.alignTo(topAnchors[paneId$1].box, TOP).translate(0, -axis$1.options.margin));
                        }
                        topAnchors[paneId$1] = axis$1;
                    }
                    if (round(axis$1.lineBox().y2, datavizConstants.COORD_PRECISION) === round(anchor$1.lineBox().y2, datavizConstants.COORD_PRECISION)) {
                        if (bottomAnchors[paneId$1]) {
                            axis$1.reflow(axis$1.box.alignTo(bottomAnchors[paneId$1].box, BOTTOM).translate(0, axis$1.options.margin));
                        }
                        bottomAnchors[paneId$1] = axis$1;
                    }
                    if (i$1 !== 0) {
                        axis$1.alignTo(xAnchor);
                        axis$1.reflow(axis$1.box);
                    }
                }
            },
            shrinkAxisWidth: function (panes) {
                var axes = this.groupAxes(panes).any;
                var axisBox = axisGroupBox(axes);
                var overflowX = 0;
                for (var i = 0; i < panes.length; i++) {
                    var currentPane = panes[i];
                    if (currentPane.axes.length > 0) {
                        overflowX = Math.max(overflowX, axisBox.width() - currentPane.contentBox.width());
                    }
                }
                if (overflowX !== 0) {
                    for (var i$1 = 0; i$1 < axes.length; i$1++) {
                        var currentAxis = axes[i$1];
                        if (!currentAxis.options.vertical) {
                            currentAxis.reflow(currentAxis.box.shrink(overflowX, 0));
                        }
                    }
                }
            },
            shrinkAxisHeight: function (panes) {
                var shrinked;
                for (var i = 0; i < panes.length; i++) {
                    var currentPane = panes[i];
                    var axes = currentPane.axes;
                    var overflowY = Math.max(0, axisGroupBox(axes).height() - currentPane.contentBox.height());
                    if (overflowY !== 0) {
                        for (var j = 0; j < axes.length; j++) {
                            var currentAxis = axes[j];
                            if (currentAxis.options.vertical) {
                                currentAxis.reflow(currentAxis.box.shrink(0, overflowY));
                            }
                        }
                        shrinked = true;
                    }
                }
                return shrinked;
            },
            fitAxes: function (panes) {
                var axes = this.groupAxes(panes).any;
                var offsetX = 0;
                for (var i = 0; i < panes.length; i++) {
                    var currentPane = panes[i];
                    var paneAxes = currentPane.axes;
                    var paneBox = currentPane.contentBox;
                    if (paneAxes.length > 0) {
                        var axisBox = axisGroupBox(paneAxes);
                        var offsetY = Math.max(paneBox.y1 - axisBox.y1, paneBox.y2 - axisBox.y2);
                        offsetX = Math.max(offsetX, paneBox.x1 - axisBox.x1);
                        for (var j = 0; j < paneAxes.length; j++) {
                            var currentAxis = paneAxes[j];
                            currentAxis.reflow(currentAxis.box.translate(0, offsetY));
                        }
                    }
                }
                for (var i$1 = 0; i$1 < axes.length; i$1++) {
                    var currentAxis$1 = axes[i$1];
                    currentAxis$1.reflow(currentAxis$1.box.translate(offsetX, 0));
                }
            },
            reflowAxes: function (panes) {
                var this$1 = this;
                var axes = this.groupAxes(panes);
                for (var i = 0; i < panes.length; i++) {
                    this$1.reflowPaneAxes(panes[i]);
                }
                if (axes.x.length > 0 && axes.y.length > 0) {
                    this.alignAxes(axes.x, axes.y);
                    this.shrinkAxisWidth(panes);
                    this.autoRotateAxisLabels(axes);
                    this.alignAxes(axes.x, axes.y);
                    if (this.shrinkAxisWidth(panes)) {
                        this.alignAxes(axes.x, axes.y);
                    }
                    this.shrinkAxisHeight(panes);
                    this.alignAxes(axes.x, axes.y);
                    if (this.shrinkAxisHeight(panes)) {
                        this.alignAxes(axes.x, axes.y);
                    }
                    this.fitAxes(panes);
                }
            },
            autoRotateAxisLabels: function (groupedAxes) {
                var this$1 = this;
                var ref = this;
                var axes = ref.axes;
                var panes = ref.panes;
                var rotated;
                for (var idx = 0; idx < axes.length; idx++) {
                    var axis = axes[idx];
                    if (axis.autoRotateLabels()) {
                        rotated = true;
                    }
                }
                if (rotated) {
                    for (var idx$1 = 0; idx$1 < panes.length; idx$1++) {
                        this$1.reflowPaneAxes(panes[idx$1]);
                    }
                    if (groupedAxes.x.length > 0 && groupedAxes.y.length > 0) {
                        this.alignAxes(groupedAxes.x, groupedAxes.y);
                        this.shrinkAxisWidth(panes);
                    }
                }
            },
            reflowPaneAxes: function (pane) {
                var axes = pane.axes;
                var length = axes.length;
                if (length > 0) {
                    for (var i = 0; i < length; i++) {
                        axes[i].reflow(pane.contentBox);
                    }
                }
            },
            reflowCharts: function (panes) {
                var charts = this.charts;
                var count = charts.length;
                var box = this.box;
                for (var i = 0; i < count; i++) {
                    var chartPane = charts[i].pane;
                    if (!chartPane || inArray(chartPane, panes)) {
                        charts[i].reflow(box);
                    }
                }
            },
            reflowPanes: function () {
                var ref = this;
                var box = ref.box;
                var panes = ref.panes;
                var panesLength = panes.length;
                var remainingHeight = box.height();
                var remainingPanes = panesLength;
                var autoHeightPanes = 0;
                var top = box.y1;
                for (var i = 0; i < panesLength; i++) {
                    var currentPane = panes[i];
                    var height = currentPane.options.height;
                    currentPane.options.width = box.width();
                    if (!currentPane.options.height) {
                        autoHeightPanes++;
                    } else {
                        if (height.indexOf && height.indexOf('%')) {
                            var percents = parseInt(height, 10) / 100;
                            currentPane.options.height = percents * box.height();
                        }
                        currentPane.reflow(box.clone());
                        remainingHeight -= currentPane.options.height;
                    }
                }
                for (var i$1 = 0; i$1 < panesLength; i$1++) {
                    var currentPane$1 = panes[i$1];
                    if (!currentPane$1.options.height) {
                        currentPane$1.options.height = remainingHeight / autoHeightPanes;
                    }
                }
                for (var i$2 = 0; i$2 < panesLength; i$2++) {
                    var currentPane$2 = panes[i$2];
                    var paneBox = box.clone().move(box.x1, top);
                    currentPane$2.reflow(paneBox);
                    remainingPanes--;
                    top += currentPane$2.options.height;
                }
            },
            backgroundBox: function () {
                var axes = this.axes;
                var axesCount = axes.length;
                var box;
                for (var i = 0; i < axesCount; i++) {
                    var axisA = axes[i];
                    for (var j = 0; j < axesCount; j++) {
                        var axisB = axes[j];
                        if (axisA.options.vertical !== axisB.options.vertical) {
                            var lineBox = axisA.lineBox().clone().wrap(axisB.lineBox());
                            if (!box) {
                                box = lineBox;
                            } else {
                                box = box.wrap(lineBox);
                            }
                        }
                    }
                }
                return box || this.box;
            },
            chartsBoxes: function () {
                var panes = this.panes;
                var boxes = [];
                for (var idx = 0; idx < panes.length; idx++) {
                    boxes.push(panes[idx].chartsBox());
                }
                return boxes;
            },
            addBackgroundPaths: function (multipath) {
                var boxes = this.chartsBoxes();
                for (var idx = 0; idx < boxes.length; idx++) {
                    multipath.paths.push(Path.fromRect(boxes[idx].toRect()));
                }
            },
            backgroundContainsPoint: function (point) {
                var boxes = this.chartsBoxes();
                for (var idx = 0; idx < boxes.length; idx++) {
                    if (boxes[idx].containsPoint(point)) {
                        return true;
                    }
                }
            },
            createVisual: function () {
                ChartElement.fn.createVisual.call(this);
                var options = this.options.plotArea;
                var opacity = options.opacity;
                var background = options.background;
                var border = options.border;
                if (border === void 0) {
                    border = {};
                }
                if (isTransparent(background)) {
                    background = WHITE;
                    opacity = 0;
                }
                var bg = this._bgVisual = new drawing.MultiPath({
                    fill: {
                        color: background,
                        opacity: opacity
                    },
                    stroke: {
                        color: border.width ? border.color : '',
                        width: border.width,
                        dashType: border.dashType
                    },
                    zIndex: -1
                });
                this.addBackgroundPaths(bg);
                this.appendVisual(bg);
            },
            pointsByCategoryIndex: function (categoryIndex) {
                var charts = this.charts;
                var result = [];
                if (categoryIndex !== null) {
                    for (var i = 0; i < charts.length; i++) {
                        var chart = charts[i];
                        if (chart.pane.options.name === '_navigator') {
                            continue;
                        }
                        var points = charts[i].categoryPoints[categoryIndex];
                        if (points && points.length) {
                            for (var j = 0; j < points.length; j++) {
                                var point = points[j];
                                if (point && defined(point.value) && point.value !== null) {
                                    result.push(point);
                                }
                            }
                        }
                    }
                }
                return result;
            },
            pointsBySeriesIndex: function (seriesIndex) {
                return this.filterPoints(function (point) {
                    return point.series.index === seriesIndex;
                });
            },
            pointsBySeriesName: function (name) {
                return this.filterPoints(function (point) {
                    return point.series.name === name;
                });
            },
            filterPoints: function (callback) {
                var charts = this.charts;
                var result = [];
                for (var i = 0; i < charts.length; i++) {
                    var chart = charts[i];
                    var points = chart.points;
                    for (var j = 0; j < points.length; j++) {
                        var point = points[j];
                        if (point && callback(point)) {
                            result.push(point);
                        }
                    }
                }
                return result;
            },
            findPoint: function (callback) {
                var charts = this.charts;
                for (var i = 0; i < charts.length; i++) {
                    var chart = charts[i];
                    var points = chart.points;
                    for (var j = 0; j < points.length; j++) {
                        var point = points[j];
                        if (point && callback(point)) {
                            return point;
                        }
                    }
                }
            },
            paneByPoint: function (point) {
                var panes = this.panes;
                for (var i = 0; i < panes.length; i++) {
                    var pane = panes[i];
                    if (pane.box.containsPoint(point)) {
                        return pane;
                    }
                }
            }
        });
        function axisGroupBox(axes) {
            var length = axes.length;
            var box;
            if (length > 0) {
                for (var i = 0; i < length; i++) {
                    var axisBox = axes[i].contentBox();
                    if (!box) {
                        box = axisBox.clone();
                    } else {
                        box.wrap(axisBox);
                    }
                }
            }
            return box || new Box();
        }
        function paneAnchor(axes, pane) {
            for (var i = 0; i < axes.length; i++) {
                var anchor = axes[i];
                if (anchor && anchor.pane === pane) {
                    return anchor;
                }
            }
        }
        function isTransparent(color) {
            return color === '' || color === null || color === 'none' || color === 'transparent' || !defined(color);
        }
        setDefaultOptions(PlotAreaBase, {
            series: [],
            plotArea: { margin: {} },
            background: '',
            border: {
                color: BLACK,
                width: 0
            },
            legend: {
                inactiveItems: {
                    labels: { color: '#919191' },
                    markers: { color: '#919191' }
                }
            }
        });
        var PlotAreaEventsMixin = {
            hover: function (chart, e) {
                this._dispatchEvent(chart, e, PLOT_AREA_HOVER);
            },
            click: function (chart, e) {
                this._dispatchEvent(chart, e, PLOT_AREA_CLICK);
            }
        };
        var SeriesAggregator = Class.extend({
            init: function (series, binder, defaultAggregates) {
                var canonicalFields = binder.canonicalFields(series);
                var valueFields = binder.valueFields(series);
                var sourceFields = binder.sourceFields(series, canonicalFields);
                var seriesFields = this._seriesFields = [];
                var defaults = defaultAggregates.query(series.type);
                var rootAggregate = series.aggregate || defaults;
                this._series = series;
                this._binder = binder;
                for (var i = 0; i < canonicalFields.length; i++) {
                    var field = canonicalFields[i];
                    var fieldAggregate = void 0;
                    if (isObject(rootAggregate)) {
                        fieldAggregate = rootAggregate[field];
                    } else if (i === 0 || inArray(field, valueFields)) {
                        fieldAggregate = rootAggregate;
                    } else {
                        break;
                    }
                    if (fieldAggregate) {
                        seriesFields.push({
                            canonicalName: field,
                            name: sourceFields[i],
                            transform: isFunction(fieldAggregate) ? fieldAggregate : Aggregates[fieldAggregate]
                        });
                    }
                }
            },
            aggregatePoints: function (srcPoints, group) {
                var this$1 = this;
                var ref = this;
                var series = ref._series;
                var seriesFields = ref._seriesFields;
                var data = this._bindPoints(srcPoints || []);
                var firstDataItem = data.dataItems[0];
                var result = {};
                if (firstDataItem && !isNumber(firstDataItem) && !isArray(firstDataItem)) {
                    var fn = function () {
                    };
                    fn.prototype = firstDataItem;
                    result = new fn();
                }
                for (var i = 0; i < seriesFields.length; i++) {
                    var field = seriesFields[i];
                    var srcValues = this$1._bindField(data.values, field.canonicalName);
                    var value = field.transform(srcValues, series, data.dataItems, group);
                    if (value !== null && isObject(value) && !defined(value.length) && !(value instanceof Date)) {
                        result = value;
                        break;
                    } else {
                        if (defined(value)) {
                            setValue(field.name, result, value);
                        }
                    }
                }
                return result;
            },
            _bindPoints: function (points) {
                var ref = this;
                var binder = ref._binder;
                var series = ref._series;
                var values = [];
                var dataItems = [];
                for (var i = 0; i < points.length; i++) {
                    var pointIx = points[i];
                    values.push(binder.bindPoint(series, pointIx));
                    dataItems.push(series.data[pointIx]);
                }
                return {
                    values: values,
                    dataItems: dataItems
                };
            },
            _bindField: function (data, field) {
                var values = [];
                var count = data.length;
                for (var i = 0; i < count; i++) {
                    var item = data[i];
                    var valueFields = item.valueFields;
                    var value = void 0;
                    if (defined(valueFields[field])) {
                        value = valueFields[field];
                    } else {
                        value = item.fields[field];
                    }
                    values.push(value);
                }
                return values;
            }
        });
        function setValue(fieldName, target, value) {
            var parentObj = target;
            var field = fieldName;
            if (fieldName.indexOf('.') > -1) {
                var parts = fieldName.split('.');
                while (parts.length > 1) {
                    field = parts.shift();
                    if (!defined(parentObj[field])) {
                        parentObj[field] = {};
                    }
                    parentObj = parentObj[field];
                }
                field = parts.shift();
            }
            parentObj[field] = value;
        }
        var DefaultAggregates = Class.extend({
            init: function () {
                this._defaults = {};
            },
            register: function (seriesTypes, aggregates) {
                var this$1 = this;
                for (var i = 0; i < seriesTypes.length; i++) {
                    this$1._defaults[seriesTypes[i]] = aggregates;
                }
            },
            query: function (seriesType) {
                return this._defaults[seriesType];
            }
        });
        DefaultAggregates.current = new DefaultAggregates();
        var RangeBar = Bar.extend({
            createLabel: function () {
                var labels = this.options.labels;
                var fromOptions = deepExtend({}, labels, labels.from);
                var toOptions = deepExtend({}, labels, labels.to);
                if (fromOptions.visible) {
                    this.labelFrom = this._createLabel(fromOptions);
                    this.append(this.labelFrom);
                }
                if (toOptions.visible) {
                    this.labelTo = this._createLabel(toOptions);
                    this.append(this.labelTo);
                }
            },
            _createLabel: function (options) {
                var labelText;
                if (options.template) {
                    var labelTemplate = TemplateService.compile(options.template);
                    labelText = labelTemplate({
                        dataItem: this.dataItem,
                        category: this.category,
                        value: this.value,
                        percentage: this.percentage,
                        runningTotal: this.runningTotal,
                        total: this.total,
                        series: this.series
                    });
                } else {
                    labelText = this.formatValue(options.format);
                }
                return new BarLabel(labelText, deepExtend({ vertical: this.options.vertical }, options));
            },
            reflow: function (targetBox) {
                this.render();
                var ref = this;
                var labelFrom = ref.labelFrom;
                var labelTo = ref.labelTo;
                var value = ref.value;
                this.box = targetBox;
                if (labelFrom) {
                    labelFrom.options.aboveAxis = value.from > value.to;
                    labelFrom.reflow(targetBox);
                }
                if (labelTo) {
                    labelTo.options.aboveAxis = value.to > value.from;
                    labelTo.reflow(targetBox);
                }
                if (this.note) {
                    this.note.reflow(targetBox);
                }
            }
        });
        RangeBar.prototype.defaults = deepExtend({}, RangeBar.prototype.defaults, {
            labels: { format: '{0} - {1}' },
            tooltip: { format: '{1}' }
        });
        var RangeBarChart = BarChart.extend({
            pointType: function () {
                return RangeBar;
            },
            pointValue: function (data) {
                return data.valueFields;
            },
            formatPointValue: function (point, format) {
                if (point.value.from === null && point.value.to === null) {
                    return '';
                }
                return this.chartService.format.auto(format, point.value.from, point.value.to);
            },
            plotRange: function (point) {
                if (!point) {
                    return 0;
                }
                return [
                    point.value.from,
                    point.value.to
                ];
            },
            updateRange: function (value, fields) {
                var axisName = fields.series.axis;
                var from = value.from;
                var to = value.to;
                var axisRange = this.valueAxisRanges[axisName];
                if (value !== null && isNumber(from) && isNumber(to)) {
                    axisRange = this.valueAxisRanges[axisName] = axisRange || {
                        min: MAX_VALUE,
                        max: MIN_VALUE
                    };
                    axisRange.min = Math.min(axisRange.min, from);
                    axisRange.max = Math.max(axisRange.max, from);
                    axisRange.min = Math.min(axisRange.min, to);
                    axisRange.max = Math.max(axisRange.max, to);
                }
            },
            aboveAxis: function (point) {
                var value = point.value;
                return value.from < value.to;
            }
        });
        RangeBarChart.prototype.plotLimits = CategoricalChart.prototype.plotLimits;
        var OHLCPoint = Candlestick.extend({
            reflow: function (box) {
                var ref = this;
                var options = ref.options;
                var value = ref.value;
                var chart = ref.owner;
                var valueAxis = chart.seriesValueAxis(options);
                var oPoints = [];
                var cPoints = [];
                var lhPoints = [];
                var lhSlot = valueAxis.getSlot(value.low, value.high);
                var oSlot = valueAxis.getSlot(value.open, value.open);
                var cSlot = valueAxis.getSlot(value.close, value.close);
                oSlot.x1 = cSlot.x1 = lhSlot.x1 = box.x1;
                oSlot.x2 = cSlot.x2 = lhSlot.x2 = box.x2;
                var mid = lhSlot.center().x;
                oPoints.push([
                    oSlot.x1,
                    oSlot.y1
                ]);
                oPoints.push([
                    mid,
                    oSlot.y1
                ]);
                cPoints.push([
                    mid,
                    cSlot.y1
                ]);
                cPoints.push([
                    cSlot.x2,
                    cSlot.y1
                ]);
                lhPoints.push([
                    mid,
                    lhSlot.y1
                ]);
                lhPoints.push([
                    mid,
                    lhSlot.y2
                ]);
                this.lines = [
                    oPoints,
                    cPoints,
                    lhPoints
                ];
                this.box = lhSlot.clone().wrap(oSlot.clone().wrap(cSlot));
                this.reflowNote();
            },
            createBody: function () {
            }
        });
        var OHLCChart = CandlestickChart.extend({
            pointType: function () {
                return OHLCPoint;
            }
        });
        var WaterfallSegment = ChartElement.extend({
            init: function (from, to, series) {
                ChartElement.fn.init.call(this);
                this.from = from;
                this.to = to;
                this.series = series;
            },
            linePoints: function () {
                var from = this.from;
                var ref = this;
                var fromBox = ref.from.box;
                var toBox = ref.to.box;
                var points = [];
                if (from.isVertical) {
                    var y = from.aboveAxis ? fromBox.y1 : fromBox.y2;
                    points.push([
                        fromBox.x1,
                        y
                    ], [
                        toBox.x2,
                        y
                    ]);
                } else {
                    var x = from.aboveAxis ? fromBox.x2 : fromBox.x1;
                    points.push([
                        x,
                        fromBox.y1
                    ], [
                        x,
                        toBox.y2
                    ]);
                }
                return points;
            },
            createVisual: function () {
                ChartElement.fn.createVisual.call(this);
                var line = this.series.line || {};
                var path = Path.fromPoints(this.linePoints(), {
                    stroke: {
                        color: line.color,
                        width: line.width,
                        opacity: line.opacity,
                        dashType: line.dashType
                    }
                });
                alignPathToPixel(path);
                this.visual.append(path);
            }
        });
        setDefaultOptions(WaterfallSegment, {
            animation: {
                type: FADEIN,
                delay: INITIAL_ANIMATION_DURATION
            }
        });
        var WaterfallChart = BarChart.extend({
            render: function () {
                BarChart.fn.render.call(this);
                this.createSegments();
            },
            traverseDataPoints: function (callback) {
                var series = this.options.series;
                var categories = this.categoryAxis.options.categories || [];
                var totalCategories = categoriesCount(series);
                var isVertical = !this.options.invertAxes;
                for (var seriesIx = 0; seriesIx < series.length; seriesIx++) {
                    var currentSeries = series[seriesIx];
                    var total = 0;
                    var runningTotal = 0;
                    for (var categoryIx = 0; categoryIx < totalCategories; categoryIx++) {
                        var data = SeriesBinder.current.bindPoint(currentSeries, categoryIx);
                        var value = data.valueFields.value;
                        var summary = data.fields.summary;
                        var from = total;
                        var to = void 0;
                        if (summary) {
                            if (summary.toLowerCase() === 'total') {
                                data.valueFields.value = total;
                                from = 0;
                                to = total;
                            } else {
                                data.valueFields.value = runningTotal;
                                to = from - runningTotal;
                                runningTotal = 0;
                            }
                        } else if (isNumber(value)) {
                            runningTotal += value;
                            total += value;
                            to = total;
                        }
                        callback(data, {
                            category: categories[categoryIx],
                            categoryIx: categoryIx,
                            series: currentSeries,
                            seriesIx: seriesIx,
                            total: total,
                            runningTotal: runningTotal,
                            from: from,
                            to: to,
                            isVertical: isVertical
                        });
                    }
                }
            },
            updateRange: function (value, fields) {
                BarChart.fn.updateRange.call(this, { value: fields.to }, fields);
            },
            aboveAxis: function (point) {
                return point.value >= 0;
            },
            plotRange: function (point) {
                return [
                    point.from,
                    point.to
                ];
            },
            createSegments: function () {
                var this$1 = this;
                var series = this.options.series;
                var seriesPoints = this.seriesPoints;
                var segments = this.segments = [];
                for (var seriesIx = 0; seriesIx < series.length; seriesIx++) {
                    var currentSeries = series[seriesIx];
                    var points = seriesPoints[seriesIx];
                    if (points) {
                        var prevPoint = void 0;
                        for (var pointIx = 0; pointIx < points.length; pointIx++) {
                            var point = points[pointIx];
                            if (point && prevPoint) {
                                var segment = new WaterfallSegment(prevPoint, point, currentSeries);
                                segments.push(segment);
                                this$1.append(segment);
                            }
                            prevPoint = point;
                        }
                    }
                }
            }
        });
        function filterSeriesByType(series, types) {
            var result = [];
            var seriesTypes = [].concat(types);
            for (var idx = 0; idx < series.length; idx++) {
                var currentSeries = series[idx];
                if (inArray(currentSeries.type, seriesTypes)) {
                    result.push(currentSeries);
                }
            }
            return result;
        }
        function equalsIgnoreCase(a, b) {
            if (a && b) {
                return a.toLowerCase() === b.toLowerCase();
            }
            return a === b;
        }
        function isDateAxis(axisOptions, sampleCategory) {
            var type = axisOptions.type;
            var dateCategory = sampleCategory instanceof Date;
            return !type && dateCategory || equalsIgnoreCase(type, DATE);
        }
        function appendIfNotNull(array, element) {
            if (element !== null) {
                array.push(element);
            }
        }
        function singleItemOrArray(array) {
            return array.length === 1 ? array[0] : array;
        }
        function getDateField(field, row, intlService) {
            if (row === null) {
                return row;
            }
            var key = '_date_' + field;
            var value = row[key];
            if (!value) {
                value = parseDate(intlService, getter(field, true)(row));
                row[key] = value;
            }
            return value;
        }
        var CategoricalPlotArea = PlotAreaBase.extend({
            initFields: function (series) {
                var this$1 = this;
                this.namedCategoryAxes = {};
                this.namedValueAxes = {};
                this.valueAxisRangeTracker = new AxisGroupRangeTracker();
                if (series.length > 0) {
                    this.invertAxes = inArray(series[0].type, [
                        BAR,
                        BULLET,
                        VERTICAL_LINE,
                        VERTICAL_AREA,
                        RANGE_BAR,
                        HORIZONTAL_WATERFALL,
                        VERTICAL_BOX_PLOT
                    ]);
                    for (var i = 0; i < series.length; i++) {
                        var stack = series[i].stack;
                        if (stack && stack.type === '100%') {
                            this$1.stack100 = true;
                            break;
                        }
                    }
                }
            },
            render: function (panes) {
                if (panes === void 0) {
                    panes = this.panes;
                }
                this.createCategoryAxes(panes);
                this.aggregateCategories(panes);
                this.createCategoryAxesLabels(panes);
                this.createCharts(panes);
                this.createValueAxes(panes);
            },
            removeAxis: function (axis) {
                var axisName = axis.options.name;
                PlotAreaBase.fn.removeAxis.call(this, axis);
                if (axis instanceof CategoryAxis) {
                    delete this.namedCategoryAxes[axisName];
                } else {
                    this.valueAxisRangeTracker.reset(axisName);
                    delete this.namedValueAxes[axisName];
                }
                if (axis === this.categoryAxis) {
                    delete this.categoryAxis;
                }
                if (axis === this.valueAxis) {
                    delete this.valueAxis;
                }
            },
            createCharts: function (panes) {
                var this$1 = this;
                var seriesByPane = this.groupSeriesByPane();
                for (var i = 0; i < panes.length; i++) {
                    var pane = panes[i];
                    var paneSeries = seriesByPane[pane.options.name || 'default'] || [];
                    this$1.addToLegend(paneSeries);
                    var visibleSeries = this$1.filterVisibleSeries(paneSeries);
                    if (!visibleSeries) {
                        continue;
                    }
                    var groups = this$1.groupSeriesByCategoryAxis(visibleSeries);
                    for (var groupIx = 0; groupIx < groups.length; groupIx++) {
                        this$1.createChartGroup(groups[groupIx], pane);
                    }
                }
            },
            createChartGroup: function (series, pane) {
                this.createAreaChart(filterSeriesByType(series, [
                    AREA,
                    VERTICAL_AREA
                ]), pane);
                this.createBarChart(filterSeriesByType(series, [
                    COLUMN,
                    BAR
                ]), pane);
                this.createRangeBarChart(filterSeriesByType(series, [
                    RANGE_COLUMN,
                    RANGE_BAR
                ]), pane);
                this.createBulletChart(filterSeriesByType(series, [
                    BULLET,
                    VERTICAL_BULLET
                ]), pane);
                this.createCandlestickChart(filterSeriesByType(series, CANDLESTICK), pane);
                this.createBoxPlotChart(filterSeriesByType(series, [
                    BOX_PLOT,
                    VERTICAL_BOX_PLOT
                ]), pane);
                this.createOHLCChart(filterSeriesByType(series, OHLC), pane);
                this.createWaterfallChart(filterSeriesByType(series, [
                    WATERFALL,
                    HORIZONTAL_WATERFALL
                ]), pane);
                this.createLineChart(filterSeriesByType(series, [
                    LINE,
                    VERTICAL_LINE
                ]), pane);
            },
            aggregateCategories: function (panes) {
                var this$1 = this;
                var series = this.srcSeries || this.series;
                var processedSeries = [];
                for (var i = 0; i < series.length; i++) {
                    var currentSeries = series[i];
                    var categoryAxis = this$1.seriesCategoryAxis(currentSeries);
                    var axisPane = this$1.findPane(categoryAxis.options.pane);
                    var dateAxis = equalsIgnoreCase(categoryAxis.options.type, DATE);
                    if ((dateAxis || currentSeries.categoryField) && inArray(axisPane, panes)) {
                        currentSeries = this$1.aggregateSeries(currentSeries, categoryAxis);
                    } else if (isNumber(categoryAxis.options.min) || isNumber(categoryAxis.options.max)) {
                        currentSeries = this$1.filterSeries(currentSeries, categoryAxis);
                    }
                    processedSeries.push(currentSeries);
                }
                this.srcSeries = series;
                this.series = processedSeries;
            },
            filterSeries: function (series, categoryAxis) {
                var range = categoryAxis.totalRangeIndices();
                var justified = categoryAxis.options.justified;
                var outOfRangePoints = inArray(series.type, [
                    LINE,
                    VERTICAL_LINE,
                    AREA,
                    VERTICAL_AREA
                ]);
                range.min = isNumber(categoryAxis.options.min) ? Math.floor(range.min) : 0;
                if (isNumber(categoryAxis.options.max)) {
                    range.max = justified ? Math.floor(range.max) + 1 : Math.ceil(range.max);
                } else {
                    range.max = series.data.length;
                }
                var currentSeries = deepExtend({}, series);
                if (outOfRangePoints) {
                    var minCategory = range.min - 1;
                    var srcCategories = categoryAxis.options.srcCategories || [];
                    if (minCategory >= 0 && minCategory < currentSeries.data.length) {
                        currentSeries._outOfRangeMinPoint = {
                            item: currentSeries.data[minCategory],
                            category: srcCategories[minCategory],
                            categoryIx: -1
                        };
                    }
                    if (range.max < currentSeries.data.length) {
                        currentSeries._outOfRangeMaxPoint = {
                            item: currentSeries.data[range.max],
                            category: srcCategories[range.max],
                            categoryIx: range.max - range.min
                        };
                    }
                }
                categoryAxis._seriesMax = Math.max(categoryAxis._seriesMax || 0, currentSeries.data.length);
                currentSeries.data = (currentSeries.data || []).slice(range.min, range.max);
                return currentSeries;
            },
            aggregateSeries: function (series, categoryAxis) {
                var this$1 = this;
                var outOfRangePoints = inArray(series.type, [
                    LINE,
                    VERTICAL_LINE,
                    AREA,
                    VERTICAL_AREA
                ]);
                var ref = categoryAxis.options;
                var categories = ref.categories;
                var srcCategories = ref.srcCategories;
                if (srcCategories === void 0) {
                    srcCategories = categories;
                }
                var dataItems = ref.dataItems;
                if (dataItems === void 0) {
                    dataItems = [];
                }
                var dateAxis = equalsIgnoreCase(categoryAxis.options.type, DATE);
                var aggregatorSeries = deepExtend({}, series);
                var result = deepExtend({}, series);
                var srcData = series.data;
                var srcPoints = [];
                var outOfRangeMinIdx = MIN_VALUE;
                var outOfRangeMaxIdx = MAX_VALUE;
                var getFn = getField;
                var outOfRangeMinCategory, outOfRangeMaxCategory;
                if (dateAxis) {
                    getFn = getDateField;
                }
                for (var i = 0; i < srcData.length; i++) {
                    var category = void 0;
                    if (series.categoryField) {
                        category = getFn(series.categoryField, srcData[i], this$1.chartService.intl);
                    } else {
                        category = srcCategories[i];
                    }
                    if (defined(category)) {
                        var categoryIx = categoryAxis.categoryIndex(category);
                        if (0 <= categoryIx && categoryIx < categories.length) {
                            srcPoints[categoryIx] = srcPoints[categoryIx] || [];
                            srcPoints[categoryIx].push(i);
                        } else if (outOfRangePoints) {
                            if (categoryIx < 0) {
                                if (categoryIx === outOfRangeMinIdx) {
                                    outOfRangeMinCategory.points.push(i);
                                } else if (categoryIx > outOfRangeMinIdx) {
                                    outOfRangeMinIdx = categoryIx;
                                    outOfRangeMinCategory = {
                                        category: category,
                                        points: [i]
                                    };
                                }
                            } else if (categoryIx >= categories.length) {
                                if (categoryIx === outOfRangeMaxIdx) {
                                    outOfRangeMaxCategory.points.push(i);
                                } else if (categoryIx < outOfRangeMaxIdx) {
                                    outOfRangeMaxIdx = categoryIx;
                                    outOfRangeMaxCategory = {
                                        category: category,
                                        points: [i]
                                    };
                                }
                            }
                        }
                    }
                }
                var aggregator = new SeriesAggregator(aggregatorSeries, SeriesBinder.current, DefaultAggregates.current);
                var data = result.data = [];
                for (var i$1 = 0; i$1 < categories.length; i$1++) {
                    data[i$1] = aggregator.aggregatePoints(srcPoints[i$1], categories[i$1]);
                    if (srcPoints[i$1]) {
                        dataItems[i$1] = data[i$1];
                    }
                }
                if (outOfRangeMinCategory && data.length) {
                    result._outOfRangeMinPoint = {
                        item: aggregator.aggregatePoints(outOfRangeMinCategory.points, outOfRangeMinCategory.category),
                        categoryIx: outOfRangeMinIdx,
                        category: outOfRangeMinCategory.category
                    };
                }
                if (outOfRangeMaxCategory && data.length) {
                    result._outOfRangeMaxPoint = {
                        item: aggregator.aggregatePoints(outOfRangeMaxCategory.points, outOfRangeMaxCategory.category),
                        categoryIx: outOfRangeMaxIdx,
                        category: outOfRangeMaxCategory.category
                    };
                }
                categoryAxis.options.dataItems = dataItems;
                return result;
            },
            appendChart: function (chart, pane) {
                var series = chart.options.series;
                var categoryAxis = this.seriesCategoryAxis(series[0]);
                var categories = categoryAxis.options.categories;
                var categoriesToAdd = Math.max(0, categoriesCount(series) - categories.length);
                while (categoriesToAdd--) {
                    categories.push('');
                }
                this.valueAxisRangeTracker.update(chart.valueAxisRanges);
                PlotAreaBase.fn.appendChart.call(this, chart, pane);
            },
            seriesPaneName: function (series) {
                var options = this.options;
                var axisName = series.axis;
                var axisOptions = [].concat(options.valueAxis);
                var axis = grep(axisOptions, function (a) {
                    return a.name === axisName;
                })[0];
                var panes = options.panes || [{}];
                var defaultPaneName = (panes[0] || {}).name || 'default';
                var paneName = (axis || {}).pane || defaultPaneName;
                return paneName;
            },
            seriesCategoryAxis: function (series) {
                var axisName = series.categoryAxis;
                var axis = axisName ? this.namedCategoryAxes[axisName] : this.categoryAxis;
                if (!axis) {
                    throw new Error('Unable to locate category axis with name ' + axisName);
                }
                return axis;
            },
            stackableChartOptions: function (firstSeries, pane) {
                var stack = firstSeries.stack;
                var isStacked100 = stack && stack.type === '100%';
                var clip = pane.options.clip;
                return {
                    isStacked: stack,
                    isStacked100: isStacked100,
                    clip: clip
                };
            },
            groupSeriesByCategoryAxis: function (series) {
                var categoryAxes = [];
                var unique = {};
                for (var idx = 0; idx < series.length; idx++) {
                    var name = series[idx].categoryAxis || '$$default$$';
                    if (!unique.hasOwnProperty(name)) {
                        unique[name] = true;
                        categoryAxes.push(name);
                    }
                }
                var groups = [];
                for (var axisIx = 0; axisIx < categoryAxes.length; axisIx++) {
                    var axis = categoryAxes[axisIx];
                    var axisSeries = groupSeries(series, axis, axisIx);
                    if (axisSeries.length === 0) {
                        continue;
                    }
                    groups.push(axisSeries);
                }
                return groups;
            },
            createBarChart: function (series, pane) {
                if (series.length === 0) {
                    return;
                }
                var firstSeries = series[0];
                var barChart = new BarChart(this, $.extend({
                    series: series,
                    invertAxes: this.invertAxes,
                    gap: firstSeries.gap,
                    spacing: firstSeries.spacing
                }, this.stackableChartOptions(firstSeries, pane)));
                this.appendChart(barChart, pane);
            },
            createRangeBarChart: function (series, pane) {
                if (series.length === 0) {
                    return;
                }
                var firstSeries = series[0];
                var rangeColumnChart = new RangeBarChart(this, {
                    series: series,
                    invertAxes: this.invertAxes,
                    gap: firstSeries.gap,
                    spacing: firstSeries.spacing
                });
                this.appendChart(rangeColumnChart, pane);
            },
            createBulletChart: function (series, pane) {
                if (series.length === 0) {
                    return;
                }
                var firstSeries = series[0];
                var bulletChart = new BulletChart(this, {
                    series: series,
                    invertAxes: this.invertAxes,
                    gap: firstSeries.gap,
                    spacing: firstSeries.spacing,
                    clip: pane.options.clip
                });
                this.appendChart(bulletChart, pane);
            },
            createLineChart: function (series, pane) {
                if (series.length === 0) {
                    return;
                }
                var firstSeries = series[0];
                var lineChart = new LineChart(this, $.extend({
                    invertAxes: this.invertAxes,
                    series: series
                }, this.stackableChartOptions(firstSeries, pane)));
                this.appendChart(lineChart, pane);
            },
            createAreaChart: function (series, pane) {
                if (series.length === 0) {
                    return;
                }
                var firstSeries = series[0];
                var areaChart = new AreaChart(this, $.extend({
                    invertAxes: this.invertAxes,
                    series: series
                }, this.stackableChartOptions(firstSeries, pane)));
                this.appendChart(areaChart, pane);
            },
            createOHLCChart: function (series, pane) {
                if (series.length === 0) {
                    return;
                }
                var firstSeries = series[0];
                var chart = new OHLCChart(this, {
                    invertAxes: this.invertAxes,
                    gap: firstSeries.gap,
                    series: series,
                    spacing: firstSeries.spacing,
                    clip: pane.options.clip
                });
                this.appendChart(chart, pane);
            },
            createCandlestickChart: function (series, pane) {
                if (series.length === 0) {
                    return;
                }
                var firstSeries = series[0];
                var chart = new CandlestickChart(this, {
                    invertAxes: this.invertAxes,
                    gap: firstSeries.gap,
                    series: series,
                    spacing: firstSeries.spacing,
                    clip: pane.options.clip
                });
                this.appendChart(chart, pane);
            },
            createBoxPlotChart: function (series, pane) {
                if (series.length === 0) {
                    return;
                }
                var firstSeries = series[0];
                var chart = new BoxPlotChart(this, {
                    invertAxes: this.invertAxes,
                    gap: firstSeries.gap,
                    series: series,
                    spacing: firstSeries.spacing,
                    clip: pane.options.clip
                });
                this.appendChart(chart, pane);
            },
            createWaterfallChart: function (series, pane) {
                if (series.length === 0) {
                    return;
                }
                var firstSeries = series[0];
                var waterfallChart = new WaterfallChart(this, {
                    series: series,
                    invertAxes: this.invertAxes,
                    gap: firstSeries.gap,
                    spacing: firstSeries.spacing
                });
                this.appendChart(waterfallChart, pane);
            },
            axisRequiresRounding: function (categoryAxisName, categoryAxisIndex) {
                var this$1 = this;
                var centeredSeries = filterSeriesByType(this.series, EQUALLY_SPACED_SERIES);
                for (var seriesIx = 0; seriesIx < this.series.length; seriesIx++) {
                    var currentSeries = this$1.series[seriesIx];
                    if (currentSeries.type === LINE || currentSeries.type === AREA) {
                        var line = currentSeries.line;
                        if (line && line.style === STEP) {
                            centeredSeries.push(currentSeries);
                        }
                    }
                }
                for (var seriesIx$1 = 0; seriesIx$1 < centeredSeries.length; seriesIx$1++) {
                    var seriesAxis = centeredSeries[seriesIx$1].categoryAxis || '';
                    if (seriesAxis === categoryAxisName || !seriesAxis && categoryAxisIndex === 0) {
                        return true;
                    }
                }
            },
            aggregatedAxis: function (categoryAxisName, categoryAxisIndex) {
                var series = this.series;
                for (var seriesIx = 0; seriesIx < series.length; seriesIx++) {
                    var seriesAxis = series[seriesIx].categoryAxis || '';
                    if ((seriesAxis === categoryAxisName || !seriesAxis && categoryAxisIndex === 0) && series[seriesIx].categoryField) {
                        return true;
                    }
                }
            },
            createCategoryAxesLabels: function () {
                var axes = this.axes;
                for (var i = 0; i < axes.length; i++) {
                    if (axes[i] instanceof CategoryAxis) {
                        axes[i].createLabels();
                    }
                }
            },
            createCategoryAxes: function (panes) {
                var this$1 = this;
                var invertAxes = this.invertAxes;
                var definitions = [].concat(this.options.categoryAxis);
                var axes = [];
                for (var i = 0; i < definitions.length; i++) {
                    var axisOptions = definitions[i];
                    var axisPane = this$1.findPane(axisOptions.pane);
                    if (inArray(axisPane, panes)) {
                        var name = axisOptions.name;
                        var categories = axisOptions.categories;
                        if (categories === void 0) {
                            categories = [];
                        }
                        axisOptions = deepExtend({
                            vertical: invertAxes,
                            axisCrossingValue: invertAxes ? MAX_VALUE : 0
                        }, axisOptions);
                        if (!defined(axisOptions.justified)) {
                            axisOptions.justified = this$1.isJustified();
                        }
                        if (this$1.axisRequiresRounding(name, i)) {
                            axisOptions.justified = false;
                        }
                        var categoryAxis = void 0;
                        if (isDateAxis(axisOptions, categories[0])) {
                            categoryAxis = new DateCategoryAxis(axisOptions, this$1.chartService);
                        } else {
                            categoryAxis = new CategoryAxis(axisOptions, this$1.chartService);
                        }
                        if (name) {
                            if (this$1.namedCategoryAxes[name]) {
                                throw new Error('Category axis with name ' + name + ' is already defined');
                            }
                            this$1.namedCategoryAxes[name] = categoryAxis;
                        }
                        categoryAxis.axisIndex = i;
                        axes.push(categoryAxis);
                        this$1.appendAxis(categoryAxis);
                    }
                }
                var primaryAxis = this.categoryAxis || axes[0];
                this.categoryAxis = primaryAxis;
                if (invertAxes) {
                    this.axisY = primaryAxis;
                } else {
                    this.axisX = primaryAxis;
                }
            },
            isJustified: function () {
                var series = this.series;
                for (var i = 0; i < series.length; i++) {
                    var currentSeries = series[i];
                    if (!inArray(currentSeries.type, [
                            AREA,
                            VERTICAL_AREA
                        ])) {
                        return false;
                    }
                }
                return true;
            },
            createValueAxes: function (panes) {
                var this$1 = this;
                var tracker = this.valueAxisRangeTracker;
                var defaultRange = tracker.query();
                var definitions = [].concat(this.options.valueAxis);
                var invertAxes = this.invertAxes;
                var baseOptions = { vertical: !invertAxes };
                var axes = [];
                if (this.stack100) {
                    baseOptions.roundToMajorUnit = false;
                    baseOptions.labels = { format: 'P0' };
                }
                for (var i = 0; i < definitions.length; i++) {
                    var axisOptions = definitions[i];
                    var axisPane = this$1.findPane(axisOptions.pane);
                    if (inArray(axisPane, panes)) {
                        var name = axisOptions.name;
                        var defaultAxisRange = equalsIgnoreCase(axisOptions.type, LOGARITHMIC) ? {
                            min: 0.1,
                            max: 1
                        } : {
                            min: 0,
                            max: 1
                        };
                        var range = tracker.query(name) || defaultRange || defaultAxisRange;
                        if (i === 0 && range && defaultRange) {
                            range.min = Math.min(range.min, defaultRange.min);
                            range.max = Math.max(range.max, defaultRange.max);
                        }
                        var axisType = void 0;
                        if (equalsIgnoreCase(axisOptions.type, LOGARITHMIC)) {
                            axisType = dataviz.LogarithmicAxis;
                        } else {
                            axisType = dataviz.NumericAxis;
                        }
                        var valueAxis = new axisType(range.min, range.max, deepExtend({}, baseOptions, axisOptions), this$1.chartService);
                        if (name) {
                            if (this$1.namedValueAxes[name]) {
                                throw new Error('Value axis with name ' + name + ' is already defined');
                            }
                            this$1.namedValueAxes[name] = valueAxis;
                        }
                        valueAxis.axisIndex = i;
                        axes.push(valueAxis);
                        this$1.appendAxis(valueAxis);
                    }
                }
                var primaryAxis = this.valueAxis || axes[0];
                this.valueAxis = primaryAxis;
                if (invertAxes) {
                    this.axisX = primaryAxis;
                } else {
                    this.axisY = primaryAxis;
                }
            },
            _dispatchEvent: function (chart, e, eventType) {
                var coords = chart._eventCoordinates(e);
                var point = new Point(coords.x, coords.y);
                var pane = this.pointPane(point);
                var categories = [];
                var values = [];
                if (!pane) {
                    return;
                }
                var allAxes = pane.axes;
                for (var i = 0; i < allAxes.length; i++) {
                    var axis = allAxes[i];
                    if (axis.getValue) {
                        appendIfNotNull(values, axis.getValue(point));
                    } else {
                        appendIfNotNull(categories, axis.getCategory(point));
                    }
                }
                if (categories.length === 0) {
                    appendIfNotNull(categories, this.categoryAxis.getCategory(point));
                }
                if (categories.length > 0 && values.length > 0) {
                    chart.trigger(eventType, {
                        element: eventElement(e),
                        originalEvent: e,
                        category: singleItemOrArray(categories),
                        value: singleItemOrArray(values)
                    });
                }
            },
            pointPane: function (point) {
                var panes = this.panes;
                for (var i = 0; i < panes.length; i++) {
                    var currentPane = panes[i];
                    if (currentPane.contentBox.containsPoint(point)) {
                        return currentPane;
                    }
                }
            },
            updateAxisOptions: function (axis, options) {
                var axesOptions = axis instanceof CategoryAxis ? [].concat(this.options.categoryAxis) : [].concat(this.options.valueAxis);
                deepExtend(axesOptions[axis.axisIndex], options);
            }
        });
        function groupSeries(series, axis, axisIx) {
            return grep(series, function (s) {
                return axisIx === 0 && !s.categoryAxis || s.categoryAxis === axis;
            });
        }
        setDefaultOptions(CategoricalPlotArea, {
            categoryAxis: { categories: [] },
            valueAxis: {}
        });
        deepExtend(CategoricalPlotArea.prototype, PlotAreaEventsMixin);
        var Highlight = Class.extend({
            init: function () {
                this._points = [];
            },
            destroy: function () {
                this._points = [];
            },
            show: function (points) {
                var this$1 = this;
                var arrayPoints = [].concat(points);
                this.hide();
                for (var i = 0; i < arrayPoints.length; i++) {
                    var point = arrayPoints[i];
                    if (point && point.toggleHighlight && point.hasHighlight()) {
                        this$1.togglePointHighlight(point, true);
                        this$1._points.push(point);
                    }
                }
            },
            togglePointHighlight: function (point, show) {
                var toggleHandler = (point.options.highlight || {}).toggle;
                if (toggleHandler) {
                    var eventArgs = {
                        category: point.category,
                        series: point.series,
                        dataItem: point.dataItem,
                        value: point.value,
                        stackValue: point.stackValue,
                        preventDefault: preventDefault,
                        visual: point.highlightVisual(),
                        show: show
                    };
                    toggleHandler(eventArgs);
                    if (!eventArgs._defaultPrevented) {
                        point.toggleHighlight(show);
                    }
                } else {
                    point.toggleHighlight(show);
                }
            },
            hide: function () {
                var this$1 = this;
                var points = this._points;
                while (points.length) {
                    this$1.togglePointHighlight(points.pop(), false);
                }
            },
            isHighlighted: function (element) {
                var points = this._points;
                for (var i = 0; i < points.length; i++) {
                    var point = points[i];
                    if (element === point) {
                        return true;
                    }
                }
                return false;
            }
        });
        function preventDefault() {
            this._defaultPrevented = true;
        }
        function acceptKey(e, mouseKey) {
            var key = (mouseKey || '').toLowerCase();
            var event = e.event;
            var accept = key === 'none' && !(event.ctrlKey || event.shiftKey || event.altKey) || event[key + 'Key'];
            return accept;
        }
        function toChartAxisRanges(axisRanges) {
            var ranges = {};
            for (var idx = 0; idx < axisRanges.length; idx++) {
                var axisRange = axisRanges[idx];
                if (axisRange.axis.options.name) {
                    ranges[axisRange.axis.options.name] = {
                        min: axisRange.range.min,
                        max: axisRange.range.max
                    };
                }
            }
            return ranges;
        }
        var Pannable = Class.extend({
            init: function (plotArea, options) {
                this.plotArea = plotArea;
                this.options = deepExtend({}, this.options, options);
            },
            start: function (e) {
                this._active = acceptKey(e, this.options.key);
                return this._active;
            },
            move: function (e) {
                if (this._active) {
                    var axisRanges = this.axisRanges = this._panAxes(e, X).concat(this._panAxes(e, Y));
                    if (axisRanges.length) {
                        this.axisRanges = axisRanges;
                        return toChartAxisRanges(axisRanges);
                    }
                }
            },
            end: function () {
                var active = this._active;
                this._active = false;
                return active;
            },
            pan: function () {
                var ref = this;
                var plotArea = ref.plotArea;
                var axisRanges = ref.axisRanges;
                if (axisRanges.length) {
                    for (var idx = 0; idx < axisRanges.length; idx++) {
                        var range = axisRanges[idx];
                        plotArea.updateAxisOptions(range.axis, range.range);
                    }
                    plotArea.redraw(plotArea.panes);
                }
            },
            destroy: function () {
                delete this.plotArea;
            },
            _panAxes: function (e, position) {
                var plotArea = this.plotArea;
                var delta = -e[position].delta;
                var lock = (this.options.lock || '').toLowerCase();
                var updatedAxes = [];
                if (delta !== 0 && (lock || '').toLowerCase() !== position) {
                    var axes = plotArea.axes;
                    for (var idx = 0; idx < axes.length; idx++) {
                        var axis = axes[idx];
                        if (position === X && !axis.options.vertical || position === Y && axis.options.vertical) {
                            var range = axis.pan(delta);
                            if (range) {
                                range.limitRange = true;
                                updatedAxes.push({
                                    axis: axis,
                                    range: range
                                });
                            }
                        }
                    }
                }
                return updatedAxes;
            }
        });
        Pannable.prototype.options = {
            key: 'none',
            lock: 'none'
        };
        var ZoomSelection = Class.extend({
            init: function (chart, options) {
                this.chart = chart;
                this.options = deepExtend({}, this.options, options);
                this.createElement();
            },
            createElement: function () {
                var marquee = this._marquee = document.createElement('div');
                marquee.className = 'k-marquee';
                var marqueeColor = document.createElement('div');
                marqueeColor.className = 'k-marquee-color';
                marquee.appendChild(marqueeColor);
            },
            removeElement: function () {
                if (this._marquee.parentNode) {
                    this._marquee.parentNode.removeChild(this._marquee);
                }
            },
            setStyles: function (styles) {
                elementStyles(this._marquee, styles);
            },
            start: function (e) {
                if (acceptKey(e, this.options.key)) {
                    var chart = this.chart;
                    var point = chart._eventCoordinates(e);
                    var zoomPane = this._zoomPane = chart._plotArea.paneByPoint(point);
                    if (zoomPane && zoomPane.clipBox()) {
                        var clipBox = zoomPane.clipBox().clone();
                        var offset = this._elementOffset();
                        clipBox.translate(offset.left, offset.top);
                        this._zoomPaneClipBox = clipBox;
                        document.body.appendChild(this._marquee);
                        this.setStyles({
                            left: e.pageX + 1,
                            top: e.pageY + 1,
                            width: 0,
                            height: 0
                        });
                        return true;
                    }
                }
                return false;
            },
            _elementOffset: function () {
                var chartElement = this.chart.element;
                var ref = elementStyles(chartElement, [
                    'paddingLeft',
                    'paddingTop'
                ]);
                var paddingLeft = ref.paddingLeft;
                var paddingTop = ref.paddingTop;
                var offset = dataviz.elementOffset(chartElement);
                return {
                    left: paddingLeft + offset.left,
                    top: paddingTop + offset.top
                };
            },
            move: function (e) {
                var zoomPane = this._zoomPane;
                if (zoomPane) {
                    this.setStyles(this._selectionPosition(e));
                }
            },
            end: function (e) {
                var zoomPane = this._zoomPane;
                if (zoomPane) {
                    var elementOffset$$1 = this._elementOffset();
                    var selectionPosition = this._selectionPosition(e);
                    selectionPosition.left -= elementOffset$$1.left;
                    selectionPosition.top -= elementOffset$$1.top;
                    var start = {
                        x: selectionPosition.left,
                        y: selectionPosition.top
                    };
                    var end = {
                        x: selectionPosition.left + selectionPosition.width,
                        y: selectionPosition.top + selectionPosition.height
                    };
                    this._updateAxisRanges(start, end);
                    this.removeElement();
                    delete this._zoomPane;
                    return toChartAxisRanges(this.axisRanges);
                }
            },
            zoom: function () {
                var axisRanges = this.axisRanges;
                if (axisRanges && axisRanges.length) {
                    var plotArea = this.chart._plotArea;
                    for (var idx = 0; idx < axisRanges.length; idx++) {
                        var axisRange = axisRanges[idx];
                        plotArea.updateAxisOptions(axisRange.axis, axisRange.range);
                    }
                    plotArea.redraw(plotArea.panes);
                }
            },
            destroy: function () {
                this.removeElement();
                delete this._marquee;
                delete this.chart;
            },
            _updateAxisRanges: function (start, end) {
                var lock = (this.options.lock || '').toLowerCase();
                var axisRanges = [];
                var axes = this._zoomPane.axes;
                for (var idx = 0; idx < axes.length; idx++) {
                    var axis = axes[idx];
                    var vertical = axis.options.vertical;
                    if (!(lock === X && !vertical) && !(lock === Y && vertical)) {
                        var range = axis.pointsRange(start, end);
                        if (range) {
                            axisRanges.push({
                                axis: axis,
                                range: range
                            });
                        }
                    }
                }
                this.axisRanges = axisRanges;
            },
            _selectionPosition: function (e) {
                var clipBox = this._zoomPaneClipBox;
                var startLocation = {
                    x: e.x.startLocation,
                    y: e.y.startLocation
                };
                var pageX = e.x.location;
                var pageY = e.y.location;
                var lock = (this.options.lock || '').toLowerCase();
                var left = Math.min(startLocation.x, pageX);
                var top = Math.min(startLocation.y, pageY);
                var width = Math.abs(startLocation.x - pageX);
                var height = Math.abs(startLocation.y - pageY);
                if (lock === X) {
                    left = clipBox.x1;
                    width = clipBox.width();
                }
                if (lock === Y) {
                    top = clipBox.y1;
                    height = clipBox.height();
                }
                if (pageX > clipBox.x2) {
                    width = clipBox.x2 - startLocation.x;
                }
                if (pageX < clipBox.x1) {
                    width = startLocation.x - clipBox.x1;
                }
                if (pageY > clipBox.y2) {
                    height = clipBox.y2 - startLocation.y;
                }
                if (pageY < clipBox.y1) {
                    height = startLocation.y - clipBox.y1;
                }
                return {
                    left: Math.max(left, clipBox.x1),
                    top: Math.max(top, clipBox.y1),
                    width: width,
                    height: height
                };
            }
        });
        ZoomSelection.prototype.options = {
            key: 'shift',
            lock: 'none'
        };
        var MousewheelZoom = Class.extend({
            init: function (chart, options) {
                this.chart = chart;
                this.options = deepExtend({}, this.options, options);
            },
            updateRanges: function (delta) {
                var lock = (this.options.lock || '').toLowerCase();
                var axisRanges = [];
                var axes = this.chart._plotArea.axes;
                for (var idx = 0; idx < axes.length; idx++) {
                    var axis = axes[idx];
                    var vertical = axis.options.vertical;
                    if (!(lock === X && !vertical) && !(lock === Y && vertical)) {
                        var range = axis.zoomRange(-delta);
                        if (range) {
                            axisRanges.push({
                                axis: axis,
                                range: range
                            });
                        }
                    }
                }
                this.axisRanges = axisRanges;
                return toChartAxisRanges(axisRanges);
            },
            zoom: function () {
                var axisRanges = this.axisRanges;
                if (axisRanges && axisRanges.length) {
                    var plotArea = this.chart._plotArea;
                    for (var idx = 0; idx < axisRanges.length; idx++) {
                        var axisRange = axisRanges[idx];
                        plotArea.updateAxisOptions(axisRange.axis, axisRange.range);
                    }
                    plotArea.redraw(plotArea.panes);
                }
            },
            destroy: function () {
                delete this.chart;
            }
        });
        var LegendLayout = ChartElement.extend({
            init: function (options, chartService) {
                ChartElement.fn.init.call(this, options);
                this.chartService = chartService;
            },
            render: function () {
                var ref = this;
                var children = ref.children;
                var options = ref.options;
                var vertical = options.vertical;
                this.visual = new drawing.Layout(null, {
                    spacing: vertical ? 0 : options.spacing,
                    lineSpacing: vertical ? options.spacing : 0,
                    orientation: vertical ? 'vertical' : 'horizontal'
                });
                for (var idx = 0; idx < children.length; idx++) {
                    var legendItem = children[idx];
                    legendItem.reflow(new Box());
                    legendItem.renderVisual();
                }
            },
            reflow: function (box) {
                this.visual.rect(box.toRect());
                this.visual.reflow();
                var bbox = this.visual.clippedBBox();
                if (bbox) {
                    this.box = dataviz.rectToBox(bbox);
                } else {
                    this.box = new Box();
                }
            },
            renderVisual: function () {
                this.addVisual();
            },
            createVisual: function () {
            }
        });
        var LegendItem = BoxElement.extend({
            init: function (options) {
                BoxElement.fn.init.call(this, options);
                this.createContainer();
                this.createMarker();
                this.createLabel();
            },
            createContainer: function () {
                this.container = new dataviz.FloatElement({
                    vertical: false,
                    wrap: false,
                    align: CENTER
                });
                this.append(this.container);
            },
            createMarker: function () {
                this.container.append(new ShapeElement(this.markerOptions()));
            },
            markerOptions: function () {
                var options = this.options;
                var markerColor = options.markerColor;
                return deepExtend({}, options.markers, {
                    background: markerColor,
                    border: { color: markerColor }
                });
            },
            createLabel: function () {
                var options = this.options;
                var labelOptions = deepExtend({}, options.labels);
                this.container.append(new TextBox(options.text, labelOptions));
            },
            renderComplete: function () {
                BoxElement.fn.renderComplete.call(this);
                var cursor = this.options.cursor || {};
                var eventSink = this._itemOverlay = Path.fromRect(this.container.box.toRect(), {
                    fill: {
                        color: WHITE,
                        opacity: 0
                    },
                    stroke: null,
                    cursor: cursor.style || cursor
                });
                this.appendVisual(eventSink);
            },
            click: function (widget, e) {
                var args = this.eventArgs(e);
                if (!widget.trigger(LEGEND_ITEM_CLICK, args)) {
                    e.preventDefault();
                }
            },
            hover: function (widget, e) {
                var args = this.eventArgs(e);
                if (!widget.trigger(LEGEND_ITEM_HOVER, args)) {
                    e.preventDefault();
                    widget._legendItemHover(args.seriesIndex, args.pointIndex);
                }
                return true;
            },
            leave: function (widget) {
                widget._unsetActivePoint();
            },
            eventArgs: function (e) {
                var options = this.options;
                return {
                    element: eventElement(e),
                    text: options.text,
                    series: options.series,
                    seriesIndex: options.series.index,
                    pointIndex: options.pointIndex
                };
            },
            renderVisual: function () {
                var this$1 = this;
                var options = this.options;
                var customVisual = options.visual;
                if (customVisual) {
                    this.visual = customVisual({
                        active: options.active,
                        series: options.series,
                        sender: this.getSender(),
                        pointIndex: options.pointIndex,
                        options: {
                            markers: this.markerOptions(),
                            labels: options.labels
                        },
                        createVisual: function () {
                            this$1.createVisual();
                            this$1.renderChildren();
                            this$1.renderComplete();
                            var defaultVisual = this$1.visual;
                            delete this$1.visual;
                            return defaultVisual;
                        }
                    });
                    this.addVisual();
                } else {
                    BoxElement.fn.renderVisual.call(this);
                }
            }
        });
        var HORIZONTAL = 'horizontal';
        var POINTER = 'pointer';
        var CUSTOM = 'custom';
        var Legend = ChartElement.extend({
            init: function (options, chartService) {
                ChartElement.fn.init.call(this, options);
                this.chartService = chartService;
                if (!inArray(this.options.position, [
                        TOP,
                        RIGHT,
                        BOTTOM,
                        LEFT,
                        CUSTOM
                    ])) {
                    this.options.position = RIGHT;
                }
                this.createContainer();
                this.createItems();
            },
            createContainer: function () {
                var options = this.options;
                var position = options.position;
                var userAlign = options.align;
                var align = position;
                var vAlign = CENTER;
                if (position === CUSTOM) {
                    align = LEFT;
                } else if (inArray(position, [
                        TOP,
                        BOTTOM
                    ])) {
                    if (userAlign === 'start') {
                        align = LEFT;
                    } else if (userAlign === 'end') {
                        align = RIGHT;
                    } else {
                        align = CENTER;
                    }
                    vAlign = position;
                } else if (userAlign) {
                    if (userAlign === 'start') {
                        vAlign = TOP;
                    } else if (userAlign === 'end') {
                        vAlign = BOTTOM;
                    }
                }
                this.container = new BoxElement({
                    margin: options.margin,
                    padding: options.padding,
                    background: options.background,
                    border: options.border,
                    vAlign: vAlign,
                    align: align,
                    zIndex: options.zIndex,
                    shrinkToFit: true
                });
                this.append(this.container);
            },
            createItems: function () {
                var chartService = this.getService();
                var options = this.options;
                var vertical = this.isVertical();
                var innerElement = new LegendLayout({
                    vertical: vertical,
                    spacing: options.spacing
                }, chartService);
                var items = options.items;
                if (options.reverse) {
                    items = items.slice(0).reverse();
                }
                var count = items.length;
                for (var i = 0; i < count; i++) {
                    var item = items[i];
                    innerElement.append(new LegendItem(deepExtend({}, {
                        markers: options.markers,
                        labels: options.labels
                    }, options.item, item)));
                }
                innerElement.render();
                this.container.append(innerElement);
            },
            isVertical: function () {
                var ref = this.options;
                var orientation = ref.orientation;
                var position = ref.position;
                var vertical = position === CUSTOM && orientation !== HORIZONTAL || (defined(orientation) ? orientation !== HORIZONTAL : inArray(position, [
                    LEFT,
                    RIGHT
                ]));
                return vertical;
            },
            hasItems: function () {
                return this.container.children[0].children.length > 0;
            },
            reflow: function (targetBox) {
                var options = this.options;
                var legendBox = targetBox.clone();
                if (!this.hasItems()) {
                    this.box = legendBox;
                    return;
                }
                if (options.position === CUSTOM) {
                    this.containerCustomReflow(legendBox);
                    this.box = legendBox;
                } else {
                    this.containerReflow(legendBox);
                }
            },
            containerReflow: function (targetBox) {
                var ref = this;
                var options = ref.options;
                var container = ref.container;
                var position = options.position;
                var width = options.width;
                var height = options.height;
                var pos = position === TOP || position === BOTTOM ? X : Y;
                var vertical = this.isVertical();
                var alignTarget = targetBox.clone();
                var containerBox = targetBox.clone();
                if (position === LEFT || position === RIGHT) {
                    containerBox.y1 = alignTarget.y1 = 0;
                }
                if (vertical && height) {
                    containerBox.y2 = containerBox.y1 + height;
                    containerBox.align(alignTarget, Y, container.options.vAlign);
                } else if (!vertical && width) {
                    containerBox.x2 = containerBox.x1 + width;
                    containerBox.align(alignTarget, X, container.options.align);
                }
                container.reflow(containerBox);
                containerBox = container.box;
                var box = containerBox.clone();
                if (options.offsetX || options.offsetY) {
                    containerBox.translate(options.offsetX, options.offsetY);
                    this.container.reflow(containerBox);
                }
                box[pos + 1] = targetBox[pos + 1];
                box[pos + 2] = targetBox[pos + 2];
                this.box = box;
            },
            containerCustomReflow: function (targetBox) {
                var ref = this;
                var options = ref.options;
                var container = ref.container;
                var offsetX = options.offsetX;
                var offsetY = options.offsetY;
                var width = options.width;
                var height = options.height;
                var vertical = this.isVertical();
                var containerBox = targetBox.clone();
                if (vertical && height) {
                    containerBox.y2 = containerBox.y1 + height;
                } else if (!vertical && width) {
                    containerBox.x2 = containerBox.x1 + width;
                }
                container.reflow(containerBox);
                containerBox = container.box;
                container.reflow(new Box(offsetX, offsetY, offsetX + containerBox.width(), offsetY + containerBox.height()));
            },
            renderVisual: function () {
                if (this.hasItems()) {
                    ChartElement.fn.renderVisual.call(this);
                }
            }
        });
        setDefaultOptions(Legend, {
            position: RIGHT,
            items: [],
            labels: { margin: { left: 6 } },
            offsetX: 0,
            offsetY: 0,
            margin: getSpacing(5),
            padding: getSpacing(5),
            border: {
                color: BLACK,
                width: 0
            },
            item: { cursor: POINTER },
            spacing: 6,
            background: '',
            zIndex: 1,
            markers: {
                border: { width: 0 },
                width: 15,
                height: 3,
                type: 'rect',
                align: LEFT,
                vAlign: CENTER
            }
        });
        var PlotAreaFactory = Class.extend({
            init: function () {
                this._registry = [];
            },
            register: function (type, seriesTypes) {
                this._registry.push({
                    type: type,
                    seriesTypes: seriesTypes
                });
            },
            create: function (srcSeries, options, chartService) {
                var registry = this._registry;
                var match = registry[0];
                var series;
                for (var idx = 0; idx < registry.length; idx++) {
                    var entry = registry[idx];
                    series = filterSeriesByType(srcSeries, entry.seriesTypes);
                    if (series.length > 0) {
                        match = entry;
                        break;
                    }
                }
                return new match.type(series, options, chartService);
            }
        });
        PlotAreaFactory.current = new PlotAreaFactory();
        var ZOOM_ACCELERATION = 3;
        var SELECTOR_HEIGHT_ADJUST = 0.1;
        function createDiv(className) {
            var element = document.createElement('div');
            if (className) {
                element.className = className;
            }
            return element;
        }
        function closestHandle(element) {
            var current = element;
            while (current && !hasClasses(current, 'k-handle')) {
                current = current.parentNode;
            }
            return current;
        }
        var Selection = Class.extend({
            init: function (chart, categoryAxis, options, observer) {
                var chartElement = chart.element;
                var valueAxis = this.getValueAxis(categoryAxis);
                this.options = deepExtend({}, this.options, options);
                this.chart = chart;
                this.observer = observer;
                this.chartElement = chartElement;
                this.categoryAxis = categoryAxis;
                this._dateAxis = this.categoryAxis instanceof DateCategoryAxis;
                this.valueAxis = valueAxis;
                this.initOptions();
                if (this.options.visible) {
                    this.createElements();
                    this.set(this._index(this.options.from), this._index(this.options.to));
                    this.bindEvents();
                }
            },
            createElements: function () {
                var options = this.options;
                var wrapper = this.wrapper = createDiv('k-selector');
                elementStyles(wrapper, {
                    top: options.offset.top,
                    left: options.offset.left,
                    width: options.width,
                    height: options.height
                });
                var selection = this.selection = createDiv('k-selection');
                this.leftMask = createDiv('k-mask');
                this.rightMask = createDiv('k-mask');
                wrapper.appendChild(this.leftMask);
                wrapper.appendChild(this.rightMask);
                wrapper.appendChild(selection);
                selection.appendChild(createDiv('k-selection-bg'));
                var leftHandle = this.leftHandle = createDiv('k-handle k-left-handle');
                var rightHandle = this.rightHandle = createDiv('k-handle k-right-handle');
                leftHandle.appendChild(createDiv());
                rightHandle.appendChild(createDiv());
                selection.appendChild(leftHandle);
                selection.appendChild(rightHandle);
                this.chartElement.appendChild(wrapper);
                var selectionStyles = elementStyles(selection, [
                    'borderLeftWidth',
                    'borderRightWidth',
                    'height'
                ]);
                var leftHandleHeight = elementStyles(leftHandle, 'height').height;
                var rightHandleHeight = elementStyles(rightHandle, 'height').height;
                options.selection = {
                    border: {
                        left: selectionStyles.borderLeftWidth,
                        right: selectionStyles.borderRightWidth
                    }
                };
                elementStyles(leftHandle, { top: (selectionStyles.height - leftHandleHeight) / 2 });
                elementStyles(rightHandle, { top: (selectionStyles.height - rightHandleHeight) / 2 });
                wrapper.style.cssText = wrapper.style.cssText;
            },
            bindEvents: function () {
                this._mousewheelHandler = this.options.mousewheel !== false ? this._mousewheel.bind(this) : stopPropagation;
                var obj;
                bindEvents(this.wrapper, (obj = {}, obj[MOUSEWHEEL] = this._mousewheelHandler, obj));
                this._domEvents = services.DomEventsBuilder.create(this.wrapper, {
                    start: this._start.bind(this),
                    move: this._move.bind(this),
                    end: this._end.bind(this),
                    tap: this._tap.bind(this),
                    press: this._press.bind(this),
                    gesturestart: this._gesturestart.bind(this),
                    gesturechange: this._gesturechange.bind(this),
                    gestureend: this._gestureend.bind(this)
                });
            },
            initOptions: function () {
                var ref = this;
                var options = ref.options;
                var categoryAxis = ref.categoryAxis;
                var valueAxis = ref.valueAxis;
                var categoryAxisLineBox = categoryAxis.lineBox();
                var valueAxisLineBox = valueAxis.lineBox();
                var intlService = this.chart.chartService.intl;
                if (this._dateAxis) {
                    deepExtend(options, {
                        min: parseDate(intlService, options.min),
                        max: parseDate(intlService, options.max),
                        from: parseDate(intlService, options.from),
                        to: parseDate(intlService, options.to)
                    });
                }
                var ref$1 = elementStyles(this.chartElement, [
                    'paddingLeft',
                    'paddingTop'
                ]);
                var paddingLeft = ref$1.paddingLeft;
                var paddingTop = ref$1.paddingTop;
                this.options = deepExtend({}, {
                    width: categoryAxisLineBox.width(),
                    height: valueAxisLineBox.height() + SELECTOR_HEIGHT_ADJUST,
                    padding: {
                        left: paddingLeft,
                        top: paddingTop
                    },
                    offset: {
                        left: valueAxisLineBox.x2 + paddingLeft,
                        top: valueAxisLineBox.y1 + paddingTop
                    },
                    from: options.min,
                    to: options.max
                }, options);
            },
            destroy: function () {
                if (this._domEvents) {
                    this._domEvents.destroy();
                    delete this._domEvents;
                }
                clearTimeout(this._mwTimeout);
                this._state = null;
                if (this.wrapper) {
                    var obj;
                    unbindEvents(this.wrapper, (obj = {}, obj[MOUSEWHEEL] = this._mousewheelHandler, obj));
                    this.chartElement.removeChild(this.wrapper);
                }
            },
            _rangeEventArgs: function (range) {
                return {
                    axis: this.categoryAxis.options,
                    from: this._value(range.from),
                    to: this._value(range.to)
                };
            },
            _start: function (e) {
                var options = this.options;
                var target = eventElement(e);
                if (this._state || !target) {
                    return;
                }
                this.chart._unsetActivePoint();
                this._state = {
                    moveTarget: closestHandle(target) || target,
                    startLocation: e.x ? e.x.location : 0,
                    range: {
                        from: this._index(options.from),
                        to: this._index(options.to)
                    }
                };
                var args = this._rangeEventArgs({
                    from: this._index(options.from),
                    to: this._index(options.to)
                });
                if (this.trigger(SELECT_START, args)) {
                    this._state = null;
                }
            },
            _press: function (e) {
                var handle;
                if (this._state) {
                    handle = this._state.moveTarget;
                } else {
                    handle = closestHandle(eventElement(e));
                }
                if (handle) {
                    dataviz.addClass(handle, 'k-handle-active');
                }
            },
            _move: function (e) {
                if (!this._state) {
                    return;
                }
                var ref = this;
                var state = ref._state;
                var options = ref.options;
                var categories = ref.categoryAxis.options.categories;
                var range = state.range;
                var target = state.moveTarget;
                var from = this._index(options.from);
                var to = this._index(options.to);
                var min = this._index(options.min);
                var max = this._index(options.max);
                var delta = state.startLocation - e.x.location;
                var oldRange = {
                    from: range.from,
                    to: range.to
                };
                var span = range.to - range.from;
                var scale = elementStyles(this.wrapper, 'width').width / (categories.length - 1);
                var offset = Math.round(delta / scale);
                if (!target) {
                    return;
                }
                if (hasClasses(target, 'k-selection k-selection-bg')) {
                    range.from = Math.min(Math.max(min, from - offset), max - span);
                    range.to = Math.min(range.from + span, max);
                } else if (hasClasses(target, 'k-left-handle')) {
                    range.from = Math.min(Math.max(min, from - offset), max - 1);
                    range.to = Math.max(range.from + 1, range.to);
                } else if (hasClasses(target, 'k-right-handle')) {
                    range.to = Math.min(Math.max(min + 1, to - offset), max);
                    range.from = Math.min(range.to - 1, range.from);
                }
                if (range.from !== oldRange.from || range.to !== oldRange.to) {
                    this.move(range.from, range.to);
                    this.trigger(SELECT, this._rangeEventArgs(range));
                }
            },
            _end: function () {
                if (this._state) {
                    var moveTarget = this._state.moveTarget;
                    if (moveTarget) {
                        dataviz.removeClass(moveTarget, 'k-handle-active');
                    }
                    var range = this._state.range;
                    this.set(range.from, range.to);
                    this.trigger(SELECT_END, this._rangeEventArgs(range));
                    delete this._state;
                }
            },
            _tap: function (e) {
                var ref = this;
                var options = ref.options;
                var categoryAxis = ref.categoryAxis;
                var coords = this.chart._eventCoordinates(e);
                var categoryIx = categoryAxis.pointCategoryIndex(new Point(coords.x, categoryAxis.box.y1));
                var from = this._index(options.from);
                var to = this._index(options.to);
                var min = this._index(options.min);
                var max = this._index(options.max);
                var span = to - from;
                var mid = from + span / 2;
                var range = {};
                var rightClick = e.event.which === 3;
                var offset = Math.round(mid - categoryIx);
                if (this._state || rightClick) {
                    return;
                }
                this.chart._unsetActivePoint();
                if (!categoryAxis.options.justified) {
                    offset--;
                }
                range.from = Math.min(Math.max(min, from - offset), max - span);
                range.to = Math.min(range.from + span, max);
                this._start(e);
                if (this._state) {
                    this._state.range = range;
                    this.trigger(SELECT, this._rangeEventArgs(range));
                    this._end();
                }
            },
            _mousewheel: function (e) {
                var this$1 = this;
                var delta = dataviz.mousewheelDelta(e);
                this._start({ target: this.selection });
                if (this._state) {
                    var range = this._state.range;
                    e.preventDefault();
                    e.stopPropagation();
                    if (Math.abs(delta) > 1) {
                        delta *= ZOOM_ACCELERATION;
                    }
                    if (this.options.mousewheel.reverse) {
                        delta *= -1;
                    }
                    if (this.expand(delta)) {
                        this.trigger(SELECT, {
                            axis: this.categoryAxis.options,
                            delta: delta,
                            originalEvent: e,
                            from: this._value(range.from),
                            to: this._value(range.to)
                        });
                    }
                    if (this._mwTimeout) {
                        clearTimeout(this._mwTimeout);
                    }
                    this._mwTimeout = setTimeout(function () {
                        this$1._end();
                    }, MOUSEWHEEL_DELAY);
                }
            },
            _gesturestart: function (e) {
                var options = this.options;
                this._state = {
                    range: {
                        from: this._index(options.from),
                        to: this._index(options.to)
                    }
                };
                var args = this._rangeEventArgs(this._state.range);
                if (this.trigger(SELECT_START, args)) {
                    this._state = null;
                } else {
                    e.preventDefault();
                }
            },
            _gestureend: function () {
                if (this._state) {
                    this.trigger(SELECT_END, this._rangeEventArgs(this._state.range));
                    delete this._state;
                }
            },
            _gesturechange: function (e) {
                var ref = this;
                var chart = ref.chart;
                var state = ref._state;
                var options = ref.options;
                var categoryAxis = ref.categoryAxis;
                var range = state.range;
                var p0 = chart._toModelCoordinates(e.touches[0].x.location).x;
                var p1 = chart._toModelCoordinates(e.touches[1].x.location).x;
                var left = Math.min(p0, p1);
                var right = Math.max(p0, p1);
                e.preventDefault();
                range.from = categoryAxis.pointCategoryIndex(new Point(left)) || options.min;
                range.to = categoryAxis.pointCategoryIndex(new Point(right)) || options.max;
                this.move(range.from, range.to);
                this.trigger(SELECT, this._rangeEventArgs(range));
            },
            _index: function (value) {
                var index = value;
                if (value instanceof Date) {
                    index = this.categoryAxis.categoryIndex(value);
                }
                return index;
            },
            _value: function (index) {
                var categories = this.categoryAxis.options.categories;
                var value = index;
                if (this._dateAxis) {
                    if (index > categories.length - 1) {
                        value = this.options.max;
                    } else {
                        value = categories[Math.ceil(index)];
                    }
                }
                return value;
            },
            _slot: function (value) {
                var categoryAxis = this.categoryAxis;
                var index = this._index(value);
                return categoryAxis.getSlot(index, index, true);
            },
            move: function (from, to) {
                var options = this.options;
                var offset = options.offset;
                var padding = options.padding;
                var border = options.selection.border;
                var box = this._slot(from);
                var leftMaskWidth = round(box.x1 - offset.left + padding.left);
                elementStyles(this.leftMask, { width: leftMaskWidth });
                elementStyles(this.selection, { left: leftMaskWidth });
                box = this._slot(to);
                var rightMaskWidth = round(options.width - (box.x1 - offset.left + padding.left));
                elementStyles(this.rightMask, { width: rightMaskWidth });
                var distance = options.width - rightMaskWidth;
                if (distance !== options.width) {
                    distance += border.right;
                }
                elementStyles(this.rightMask, { left: distance });
                elementStyles(this.selection, { width: Math.max(options.width - (leftMaskWidth + rightMaskWidth) - border.right, 0) });
            },
            set: function (from, to) {
                var options = this.options;
                var min = this._index(options.min);
                var max = this._index(options.max);
                var fromValue = limitValue(this._index(from), min, max);
                var toValue = limitValue(this._index(to), fromValue + 1, max);
                if (options.visible) {
                    this.move(fromValue, toValue);
                }
                options.from = this._value(fromValue);
                options.to = this._value(toValue);
            },
            expand: function (delta) {
                var options = this.options;
                var min = this._index(options.min);
                var max = this._index(options.max);
                var zDir = options.mousewheel.zoom;
                var from = this._index(options.from);
                var to = this._index(options.to);
                var range = {
                    from: from,
                    to: to
                };
                var oldRange = deepExtend({}, range);
                if (this._state) {
                    range = this._state.range;
                }
                if (zDir !== RIGHT) {
                    range.from = limitValue(limitValue(from - delta, 0, to - 1), min, max);
                }
                if (zDir !== LEFT) {
                    range.to = limitValue(limitValue(to + delta, range.from + 1, max), min, max);
                }
                if (range.from !== oldRange.from || range.to !== oldRange.to) {
                    this.set(range.from, range.to);
                    return true;
                }
            },
            getValueAxis: function (categoryAxis) {
                var axes = categoryAxis.pane.axes;
                var axesCount = axes.length;
                for (var i = 0; i < axesCount; i++) {
                    var axis = axes[i];
                    if (axis.options.vertical !== categoryAxis.options.vertical) {
                        return axis;
                    }
                }
            },
            trigger: function (name, args) {
                return (this.observer || this.chart).trigger(name, args);
            }
        });
        function stopPropagation(e) {
            e.stopPropagation();
        }
        setDefaultOptions(Selection, {
            visible: true,
            mousewheel: { zoom: 'both' },
            min: MIN_VALUE,
            max: MAX_VALUE
        });
        var Tooltip = BaseTooltip.extend({
            show: function (point) {
                if (!point || !point.tooltipAnchor || this._current && this._current === point) {
                    return;
                }
                var options = deepExtend({}, this.options, point.options.tooltip);
                var anchor = point.tooltipAnchor();
                if (anchor) {
                    this._current = point;
                    BaseTooltip.fn.show.call(this, {
                        point: point,
                        anchor: anchor
                    }, options, point);
                } else {
                    this.hide();
                }
            },
            hide: function () {
                delete this._current;
                BaseTooltip.fn.hide.call(this);
            }
        });
        var SharedTooltip = BaseTooltip.extend({
            init: function (plotArea, options) {
                BaseTooltip.fn.init.call(this, plotArea.chartService, options);
                this.plotArea = plotArea;
                this.formatService = plotArea.chartService.format;
            },
            showAt: function (points, coords) {
                var tooltipPoints = grep(points, function (point) {
                    var tooltip = point.series.tooltip;
                    var excluded = tooltip && tooltip.visible === false;
                    return !excluded;
                });
                if (tooltipPoints.length > 0) {
                    var point = tooltipPoints[0];
                    var slot = this.plotArea.categoryAxis.getSlot(point.categoryIx);
                    var anchor = coords ? this._slotAnchor(coords, slot) : this._defaultAnchor(point, slot);
                    this.show({
                        anchor: anchor,
                        shared: true,
                        points: points,
                        category: point.category,
                        categoryText: this.formatService.auto(this.options.categoryFormat, point.category),
                        series: this.plotArea.series
                    }, this.options);
                }
            },
            _slotAnchor: function (point, slot) {
                var axis = this.plotArea.categoryAxis;
                var align = {
                    horizontal: 'left',
                    vertical: 'center'
                };
                if (!axis.options.vertical) {
                    point.x = slot.center().x;
                }
                return {
                    point: point,
                    align: align
                };
            },
            _defaultAnchor: function (point, slot) {
                var box = point.owner.pane.chartsBox();
                var vertical = this.plotArea.categoryAxis.options.vertical;
                var center = box.center();
                var slotCenter = slot.center();
                var align = {
                    horizontal: 'center',
                    vertical: 'center'
                };
                var centerPoint;
                if (vertical) {
                    centerPoint = new Point(center.x, slotCenter.y);
                } else {
                    centerPoint = new Point(slotCenter.x, center.y);
                }
                return {
                    point: centerPoint,
                    align: align
                };
            }
        });
        setDefaultOptions(SharedTooltip, { categoryFormat: '{0:d}' });
        var BarChartAnimation = Animation.extend({
            setup: function () {
                var ref = this;
                var element = ref.element;
                var options = ref.options;
                var bbox = element.bbox();
                if (bbox) {
                    this.origin = options.origin;
                    var axis = options.vertical ? Y : X;
                    var fromScale = this.fromScale = new GeometryPoint(1, 1);
                    fromScale[axis] = START_SCALE;
                    element.transform(transform().scale(fromScale.x, fromScale.y));
                } else {
                    this.abort();
                }
            },
            step: function (pos) {
                var scaleX = dataviz.interpolateValue(this.fromScale.x, 1, pos);
                var scaleY = dataviz.interpolateValue(this.fromScale.y, 1, pos);
                this.element.transform(transform().scale(scaleX, scaleY, this.origin));
            },
            abort: function () {
                Animation.fn.abort.call(this);
                this.element.transform(null);
            }
        });
        setDefaultOptions(BarChartAnimation, { duration: INITIAL_ANIMATION_DURATION });
        AnimationFactory.current.register(BAR, BarChartAnimation);
        var BubbleAnimation = Animation.extend({
            setup: function () {
                var center = this.center = this.element.bbox().center();
                this.element.transform(transform().scale(START_SCALE, START_SCALE, center));
            },
            step: function (pos) {
                this.element.transform(transform().scale(pos, pos, this.center));
            }
        });
        setDefaultOptions(BubbleAnimation, { easing: 'easeOutElastic' });
        AnimationFactory.current.register(BUBBLE, BubbleAnimation);
        var FadeInAnimation = Animation.extend({
            setup: function () {
                this.fadeTo = this.element.opacity();
                this.element.opacity(0);
            },
            step: function (pos) {
                this.element.opacity(pos * this.fadeTo);
            }
        });
        setDefaultOptions(FadeInAnimation, {
            duration: 200,
            easing: 'linear'
        });
        AnimationFactory.current.register(FADEIN, FadeInAnimation);
        var PieAnimation = Animation.extend({
            setup: function () {
                this.element.transform(transform().scale(START_SCALE, START_SCALE, this.options.center));
            },
            step: function (pos) {
                this.element.transform(transform().scale(pos, pos, this.options.center));
            }
        });
        setDefaultOptions(PieAnimation, {
            easing: 'easeOutElastic',
            duration: INITIAL_ANIMATION_DURATION
        });
        AnimationFactory.current.register(PIE, PieAnimation);
        var ScatterLineChart = ScatterChart.extend({
            render: function () {
                ScatterChart.fn.render.call(this);
                this.renderSegments();
            },
            createSegment: function (linePoints, currentSeries, seriesIx) {
                var style = currentSeries.style;
                var pointType;
                if (style === SMOOTH) {
                    pointType = SplineSegment;
                } else {
                    pointType = LineSegment;
                }
                return new pointType(linePoints, currentSeries, seriesIx);
            },
            animationPoints: function () {
                var points = ScatterChart.fn.animationPoints.call(this);
                return points.concat(this._segments);
            },
            createMissingValue: function (value, missingValues) {
                if (missingValues === ZERO) {
                    var missingValue = {
                        x: value.x,
                        y: value.y
                    };
                    if (!hasValue(missingValue.x)) {
                        missingValue.x = 0;
                    }
                    if (!hasValue(missingValue.y)) {
                        missingValue.y = 0;
                    }
                    return missingValue;
                }
            }
        });
        deepExtend(ScatterLineChart.prototype, LineChartMixin);
        var XYPlotArea = PlotAreaBase.extend({
            initFields: function () {
                this.namedXAxes = {};
                this.namedYAxes = {};
                this.xAxisRangeTracker = new AxisGroupRangeTracker();
                this.yAxisRangeTracker = new AxisGroupRangeTracker();
            },
            render: function (panes) {
                var this$1 = this;
                if (panes === void 0) {
                    panes = this.panes;
                }
                var seriesByPane = this.groupSeriesByPane();
                for (var i = 0; i < panes.length; i++) {
                    var pane = panes[i];
                    var paneSeries = seriesByPane[pane.options.name || 'default'] || [];
                    this$1.addToLegend(paneSeries);
                    var filteredSeries = this$1.filterVisibleSeries(paneSeries);
                    if (!filteredSeries) {
                        continue;
                    }
                    this$1.createScatterChart(filterSeriesByType(filteredSeries, SCATTER), pane);
                    this$1.createScatterLineChart(filterSeriesByType(filteredSeries, SCATTER_LINE), pane);
                    this$1.createBubbleChart(filterSeriesByType(filteredSeries, BUBBLE), pane);
                }
                this.createAxes(panes);
            },
            appendChart: function (chart, pane) {
                this.xAxisRangeTracker.update(chart.xAxisRanges);
                this.yAxisRangeTracker.update(chart.yAxisRanges);
                PlotAreaBase.fn.appendChart.call(this, chart, pane);
            },
            removeAxis: function (axis) {
                var axisName = axis.options.name;
                PlotAreaBase.fn.removeAxis.call(this, axis);
                if (axis.options.vertical) {
                    this.yAxisRangeTracker.reset(axisName);
                    delete this.namedYAxes[axisName];
                } else {
                    this.xAxisRangeTracker.reset(axisName);
                    delete this.namedXAxes[axisName];
                }
                if (axis === this.axisX) {
                    delete this.axisX;
                }
                if (axis === this.axisY) {
                    delete this.axisY;
                }
            },
            seriesPaneName: function (series) {
                var options = this.options;
                var xAxisName = series.xAxis;
                var xAxisOptions = [].concat(options.xAxis);
                var xAxis = grep(xAxisOptions, function (a) {
                    return a.name === xAxisName;
                })[0];
                var yAxisName = series.yAxis;
                var yAxisOptions = [].concat(options.yAxis);
                var yAxis = grep(yAxisOptions, function (a) {
                    return a.name === yAxisName;
                })[0];
                var panes = options.panes || [{}];
                var defaultPaneName = panes[0].name || 'default';
                var paneName = (xAxis || {}).pane || (yAxis || {}).pane || defaultPaneName;
                return paneName;
            },
            createScatterChart: function (series, pane) {
                if (series.length > 0) {
                    this.appendChart(new ScatterChart(this, {
                        series: series,
                        clip: pane.options.clip
                    }), pane);
                }
            },
            createScatterLineChart: function (series, pane) {
                if (series.length > 0) {
                    this.appendChart(new ScatterLineChart(this, {
                        series: series,
                        clip: pane.options.clip
                    }), pane);
                }
            },
            createBubbleChart: function (series, pane) {
                if (series.length > 0) {
                    this.appendChart(new BubbleChart(this, {
                        series: series,
                        clip: pane.options.clip
                    }), pane);
                }
            },
            createXYAxis: function (options, vertical, axisIndex) {
                var axisName = options.name;
                var namedAxes = vertical ? this.namedYAxes : this.namedXAxes;
                var tracker = vertical ? this.yAxisRangeTracker : this.xAxisRangeTracker;
                var axisOptions = deepExtend({}, options, { vertical: vertical });
                var isLog = equalsIgnoreCase(axisOptions.type, LOGARITHMIC);
                var defaultRange = tracker.query();
                var defaultAxisRange = isLog ? {
                    min: 0.1,
                    max: 1
                } : {
                    min: 0,
                    max: 1
                };
                var range = tracker.query(axisName) || defaultRange || defaultAxisRange;
                var typeSamples = [
                    axisOptions.min,
                    axisOptions.max
                ];
                var series = this.series;
                for (var seriesIx = 0; seriesIx < series.length; seriesIx++) {
                    var currentSeries = series[seriesIx];
                    var seriesAxisName = currentSeries[vertical ? 'yAxis' : 'xAxis'];
                    if (seriesAxisName === axisOptions.name || axisIndex === 0 && !seriesAxisName) {
                        var firstPointValue = SeriesBinder.current.bindPoint(currentSeries, 0).valueFields;
                        typeSamples.push(firstPointValue[vertical ? 'y' : 'x']);
                        break;
                    }
                }
                if (axisIndex === 0 && defaultRange) {
                    range.min = Math.min(range.min, defaultRange.min);
                    range.max = Math.max(range.max, defaultRange.max);
                }
                var inferredDate;
                for (var i = 0; i < typeSamples.length; i++) {
                    if (typeSamples[i] instanceof Date) {
                        inferredDate = true;
                        break;
                    }
                }
                var axisType;
                if (equalsIgnoreCase(axisOptions.type, DATE) || !axisOptions.type && inferredDate) {
                    axisType = dataviz.DateValueAxis;
                } else if (isLog) {
                    axisType = dataviz.LogarithmicAxis;
                } else {
                    axisType = dataviz.NumericAxis;
                }
                var axis = new axisType(range.min, range.max, axisOptions, this.chartService);
                axis.axisIndex = axisIndex;
                if (axisName) {
                    if (namedAxes[axisName]) {
                        throw new Error((vertical ? 'Y' : 'X') + ' axis with name ' + axisName + ' is already defined');
                    }
                    namedAxes[axisName] = axis;
                }
                this.appendAxis(axis);
                return axis;
            },
            createAxes: function (panes) {
                var this$1 = this;
                var options = this.options;
                var xAxesOptions = [].concat(options.xAxis);
                var xAxes = [];
                var yAxesOptions = [].concat(options.yAxis);
                var yAxes = [];
                for (var idx = 0; idx < xAxesOptions.length; idx++) {
                    var axisPane = this$1.findPane(xAxesOptions[idx].pane);
                    if (inArray(axisPane, panes)) {
                        xAxes.push(this$1.createXYAxis(xAxesOptions[idx], false, idx));
                    }
                }
                for (var idx$1 = 0; idx$1 < yAxesOptions.length; idx$1++) {
                    var axisPane$1 = this$1.findPane(yAxesOptions[idx$1].pane);
                    if (inArray(axisPane$1, panes)) {
                        yAxes.push(this$1.createXYAxis(yAxesOptions[idx$1], true, idx$1));
                    }
                }
                this.axisX = this.axisX || xAxes[0];
                this.axisY = this.axisY || yAxes[0];
            },
            _dispatchEvent: function (chart, e, eventType) {
                var coords = chart._eventCoordinates(e);
                var point = new Point(coords.x, coords.y);
                var allAxes = this.axes;
                var length = allAxes.length;
                var xValues = [];
                var yValues = [];
                for (var i = 0; i < length; i++) {
                    var axis = allAxes[i];
                    var values = axis.options.vertical ? yValues : xValues;
                    var currentValue = axis.getValue(point);
                    if (currentValue !== null) {
                        values.push(currentValue);
                    }
                }
                if (xValues.length > 0 && yValues.length > 0) {
                    chart.trigger(eventType, {
                        element: eventElement(e),
                        originalEvent: e,
                        x: singleItemOrArray(xValues),
                        y: singleItemOrArray(yValues)
                    });
                }
            },
            updateAxisOptions: function (axis, options) {
                var vertical = axis.options.vertical;
                var axes = this.groupAxes(this.panes);
                var index = (vertical ? axes.y : axes.x).indexOf(axis);
                var axisOptions = [].concat(vertical ? this.options.yAxis : this.options.xAxis)[index];
                deepExtend(axisOptions, options);
            }
        });
        setDefaultOptions(XYPlotArea, {
            xAxis: {},
            yAxis: {}
        });
        deepExtend(XYPlotArea.prototype, PlotAreaEventsMixin);
        var PieSegment = ChartElement.extend({
            init: function (value, sector, options) {
                ChartElement.fn.init.call(this, options);
                this.value = value;
                this.sector = sector;
            },
            render: function () {
                var labels = this.options.labels;
                var chartService = this.owner.chartService;
                var labelText = this.value;
                if (this._rendered || this.visible === false) {
                    return;
                }
                this._rendered = true;
                if (labels.template) {
                    var labelTemplate = TemplateService.compile(labels.template);
                    labelText = labelTemplate({
                        dataItem: this.dataItem,
                        category: this.category,
                        value: this.value,
                        series: this.series,
                        percentage: this.percentage
                    });
                } else if (labels.format) {
                    labelText = chartService.format.auto(labels.format, labelText);
                }
                if (labels.visible && labelText) {
                    if (labels.position === CENTER || labels.position === INSIDE_END) {
                        if (!labels.color) {
                            var brightnessValue = new Color(this.options.color).percBrightness();
                            if (brightnessValue > 180) {
                                labels.color = BLACK;
                            } else {
                                labels.color = WHITE;
                            }
                        }
                        if (!labels.background) {
                            labels.background = this.options.color;
                        }
                    } else {
                        var themeLabels = chartService.theme.seriesDefaults.labels;
                        labels.color = labels.color || themeLabels.color;
                        labels.background = labels.background || themeLabels.background;
                    }
                    this.label = new TextBox(labelText, deepExtend({}, labels, {
                        align: CENTER,
                        vAlign: '',
                        animation: {
                            type: FADEIN,
                            delay: this.animationDelay
                        }
                    }));
                    this.append(this.label);
                }
            },
            reflow: function (targetBox) {
                this.render();
                this.box = targetBox;
                this.reflowLabel();
            },
            reflowLabel: function () {
                var ref = this;
                var labelsOptions = ref.options.labels;
                var label = ref.label;
                var sector = this.sector.clone();
                var labelsDistance = labelsOptions.distance;
                var angle = sector.middle();
                if (label) {
                    var labelHeight = label.box.height();
                    var labelWidth = label.box.width();
                    var lp;
                    if (labelsOptions.position === CENTER) {
                        sector.radius = Math.abs((sector.radius - labelHeight) / 2) + labelHeight;
                        lp = sector.point(angle);
                        label.reflow(new Box(lp.x, lp.y - labelHeight / 2, lp.x, lp.y));
                    } else if (labelsOptions.position === INSIDE_END) {
                        sector.radius = sector.radius - labelHeight / 2;
                        lp = sector.point(angle);
                        label.reflow(new Box(lp.x, lp.y - labelHeight / 2, lp.x, lp.y));
                    } else {
                        var x1;
                        lp = sector.clone().expand(labelsDistance).point(angle);
                        if (lp.x >= sector.center.x) {
                            x1 = lp.x + labelWidth;
                            label.orientation = RIGHT;
                        } else {
                            x1 = lp.x - labelWidth;
                            label.orientation = LEFT;
                        }
                        label.reflow(new Box(x1, lp.y - labelHeight, lp.x, lp.y));
                    }
                }
            },
            createVisual: function () {
                var this$1 = this;
                var ref = this;
                var sector = ref.sector;
                var options = ref.options;
                ChartElement.fn.createVisual.call(this);
                if (this.value) {
                    if (options.visual) {
                        var startAngle = (sector.startAngle + 180) % 360;
                        var visual = options.visual({
                            category: this.category,
                            dataItem: this.dataItem,
                            value: this.value,
                            series: this.series,
                            percentage: this.percentage,
                            center: new GeometryPoint(sector.center.x, sector.center.y),
                            radius: sector.radius,
                            innerRadius: sector.innerRadius,
                            startAngle: startAngle,
                            endAngle: startAngle + sector.angle,
                            options: options,
                            sender: this.getSender(),
                            createVisual: function () {
                                var group = new Group();
                                this$1.createSegmentVisual(group);
                                return group;
                            }
                        });
                        if (visual) {
                            this.visual.append(visual);
                        }
                    } else {
                        this.createSegmentVisual(this.visual);
                    }
                }
            },
            createSegmentVisual: function (group) {
                var ref = this;
                var sector = ref.sector;
                var options = ref.options;
                var borderOptions = options.border || {};
                var border = borderOptions.width > 0 ? {
                    stroke: {
                        color: borderOptions.color,
                        width: borderOptions.width,
                        opacity: borderOptions.opacity,
                        dashType: borderOptions.dashType
                    }
                } : {};
                var color = options.color;
                var fill = {
                    color: color,
                    opacity: options.opacity
                };
                var visual = this.createSegment(sector, deepExtend({
                    fill: fill,
                    stroke: { opacity: options.opacity },
                    zIndex: options.zIndex
                }, border));
                group.append(visual);
                if (hasGradientOverlay(options)) {
                    group.append(this.createGradientOverlay(visual, {
                        baseColor: color,
                        fallbackFill: fill
                    }, deepExtend({
                        center: [
                            sector.center.x,
                            sector.center.y
                        ],
                        innerRadius: sector.innerRadius,
                        radius: sector.radius,
                        userSpace: true
                    }, options.overlay)));
                }
            },
            createSegment: function (sector, options) {
                if (options.singleSegment) {
                    return new drawing.Circle(new geometry.Circle(new GeometryPoint(sector.center.x, sector.center.y), sector.radius), options);
                }
                return dataviz.ShapeBuilder.current.createRing(sector, options);
            },
            createAnimation: function () {
                var ref = this;
                var options = ref.options;
                var center = ref.sector.center;
                deepExtend(options, {
                    animation: {
                        center: [
                            center.x,
                            center.y
                        ],
                        delay: this.animationDelay
                    }
                });
                ChartElement.fn.createAnimation.call(this);
            },
            createHighlight: function (options) {
                var highlight = this.options.highlight || {};
                var border = highlight.border || {};
                return this.createSegment(this.sector, deepExtend({}, options, {
                    fill: {
                        color: highlight.color,
                        opacity: highlight.opacity
                    },
                    stroke: {
                        opacity: border.opacity,
                        width: border.width,
                        color: border.color
                    }
                }));
            },
            highlightVisual: function () {
                return this.visual.children[0];
            },
            highlightVisualArgs: function () {
                var sector = this.sector;
                return {
                    options: this.options,
                    radius: sector.radius,
                    innerRadius: sector.innerRadius,
                    center: new GeometryPoint(sector.center.x, sector.center.y),
                    startAngle: sector.startAngle,
                    endAngle: sector.angle + sector.startAngle,
                    visual: this.visual
                };
            },
            tooltipAnchor: function () {
                var sector = this.sector.clone().expand(TOOLTIP_OFFSET);
                var midAndle = sector.middle();
                var midPoint = sector.point(midAndle);
                return {
                    point: midPoint,
                    align: tooltipAlignment(midAndle + 180)
                };
            },
            formatValue: function (format) {
                return this.owner.formatPointValue(this, format);
            }
        });
        var RAD_30 = round(dataviz.rad(30), DEFAULT_PRECISION);
        var RAD_60 = round(dataviz.rad(60), DEFAULT_PRECISION);
        function tooltipAlignment(angle) {
            var radians = dataviz.rad(angle);
            var sine = round(Math.sin(radians), DEFAULT_PRECISION);
            var cosine = round(Math.cos(radians), DEFAULT_PRECISION);
            var horizontal;
            if (Math.abs(sine) > RAD_60) {
                horizontal = CENTER;
            } else if (cosine < 0) {
                horizontal = RIGHT;
            } else {
                horizontal = LEFT;
            }
            var vertical;
            if (Math.abs(sine) < RAD_30) {
                vertical = CENTER;
            } else if (sine < 0) {
                vertical = BOTTOM;
            } else {
                vertical = TOP;
            }
            return {
                horizontal: horizontal,
                vertical: vertical
            };
        }
        setDefaultOptions(PieSegment, {
            color: WHITE,
            overlay: { gradient: 'roundedBevel' },
            border: { width: 0.5 },
            labels: {
                visible: false,
                distance: 35,
                font: datavizConstants.DEFAULT_FONT,
                margin: getSpacing(0.5),
                align: CIRCLE,
                zIndex: 1,
                position: OUTSIDE_END
            },
            animation: { type: PIE },
            highlight: {
                visible: true,
                border: { width: 1 }
            },
            visible: true
        });
        deepExtend(PieSegment.prototype, PointEventsMixin);
        var PieChartMixin = {
            createLegendItem: function (value, point, options) {
                var legendOptions = this.options.legend || {};
                var labelsOptions = legendOptions.labels || {};
                var inactiveItems = legendOptions.inactiveItems || {};
                var inactiveItemsLabels = inactiveItems.labels || {};
                if (options && options.visibleInLegend !== false) {
                    var pointVisible = options.visible !== false;
                    var labelTemplate = pointVisible ? labelsOptions.template : inactiveItemsLabels.template || labelsOptions.template;
                    var text = options.category || '';
                    if (labelTemplate) {
                        text = TemplateService.compile(labelTemplate)({
                            text: text,
                            series: options.series,
                            dataItem: options.dataItem,
                            percentage: options.percentage,
                            value: value
                        });
                    }
                    var itemLabelOptions, markerColor;
                    if (pointVisible) {
                        itemLabelOptions = {};
                        markerColor = point.color;
                    } else {
                        itemLabelOptions = {
                            color: inactiveItemsLabels.color,
                            font: inactiveItemsLabels.font
                        };
                        markerColor = (inactiveItems.markers || {}).color;
                    }
                    if (text) {
                        this.legendItems.push({
                            pointIndex: options.index,
                            text: text,
                            series: options.series,
                            markerColor: markerColor,
                            labels: itemLabelOptions
                        });
                    }
                }
            }
        };
        function segmentVisible(series, fields, index) {
            var visible = fields.visible;
            if (defined(visible)) {
                return visible;
            }
            var pointVisibility = series.pointVisibility;
            if (pointVisibility) {
                return pointVisibility[index];
            }
        }
        function seriesTotal(series) {
            var data = series.data;
            var sum = 0;
            for (var i = 0; i < data.length; i++) {
                var pointData = SeriesBinder.current.bindPoint(series, i);
                var value = pointData.valueFields.value;
                if (isString(value)) {
                    value = parseFloat(value);
                }
                var visible = segmentVisible(series, pointData.fields, i);
                if (isNumber(value) && visible !== false) {
                    sum += Math.abs(value);
                }
            }
            return sum;
        }
        var PIE_SECTOR_ANIM_DELAY = 70;
        var PieChart = ChartElement.extend({
            init: function (plotArea, options) {
                ChartElement.fn.init.call(this, options);
                this.plotArea = plotArea;
                this.chartService = plotArea.chartService;
                this.points = [];
                this.legendItems = [];
                this.render();
            },
            render: function () {
                this.traverseDataPoints(this.addValue.bind(this));
            },
            traverseDataPoints: function (callback) {
                var this$1 = this;
                var ref = this;
                var options = ref.options;
                var seriesColors = ref.plotArea.options.seriesColors;
                if (seriesColors === void 0) {
                    seriesColors = [];
                }
                var colorsCount = seriesColors.length;
                var series = options.series;
                var seriesCount = series.length;
                for (var seriesIx = 0; seriesIx < seriesCount; seriesIx++) {
                    var currentSeries = series[seriesIx];
                    var data = currentSeries.data;
                    var total = seriesTotal(currentSeries);
                    var anglePerValue = 360 / total;
                    var currentAngle = void 0;
                    if (defined(currentSeries.startAngle)) {
                        currentAngle = currentSeries.startAngle;
                    } else {
                        currentAngle = options.startAngle;
                    }
                    if (seriesIx !== seriesCount - 1) {
                        if (currentSeries.labels.position === OUTSIDE_END) {
                            currentSeries.labels.position = CENTER;
                        }
                    }
                    for (var i = 0; i < data.length; i++) {
                        var pointData = SeriesBinder.current.bindPoint(currentSeries, i);
                        var value = pointData.valueFields.value;
                        var plotValue = Math.abs(value);
                        var fields = pointData.fields;
                        var angle = plotValue * anglePerValue;
                        var explode = data.length !== 1 && Boolean(fields.explode);
                        if (!isFunction(currentSeries.color)) {
                            currentSeries.color = fields.color || seriesColors[i % colorsCount];
                        }
                        var visible = segmentVisible(currentSeries, fields, i);
                        callback(value, new dataviz.Ring(null, 0, 0, currentAngle, angle), {
                            owner: this$1,
                            category: fields.category || '',
                            index: i,
                            series: currentSeries,
                            seriesIx: seriesIx,
                            dataItem: data[i],
                            percentage: total !== 0 ? plotValue / total : 0,
                            explode: explode,
                            visibleInLegend: fields.visibleInLegend,
                            visible: visible,
                            zIndex: seriesCount - seriesIx,
                            animationDelay: this$1.animationDelay(i, seriesIx, seriesCount)
                        });
                        if (visible !== false) {
                            currentAngle += angle;
                        }
                    }
                }
            },
            evalSegmentOptions: function (options, value, fields) {
                var series = fields.series;
                evalOptions(options, {
                    value: value,
                    series: series,
                    dataItem: fields.dataItem,
                    category: fields.category,
                    percentage: fields.percentage
                }, {
                    defaults: series._defaults,
                    excluded: [
                        'data',
                        'template',
                        'visual',
                        'toggle'
                    ]
                });
            },
            addValue: function (value, sector, fields) {
                var segmentOptions = deepExtend({}, fields.series, { index: fields.index });
                this.evalSegmentOptions(segmentOptions, value, fields);
                this.createLegendItem(value, segmentOptions, fields);
                if (fields.visible === false) {
                    return;
                }
                var segment = new PieSegment(value, sector, segmentOptions);
                $.extend(segment, fields);
                this.append(segment);
                this.points.push(segment);
            },
            reflow: function (targetBox) {
                var ref = this;
                var options = ref.options;
                var points = ref.points;
                var seriesConfigs = ref.seriesConfigs;
                if (seriesConfigs === void 0) {
                    seriesConfigs = [];
                }
                var count = points.length;
                var box = targetBox.clone();
                var space = 5;
                var minWidth = Math.min(box.width(), box.height());
                var halfMinWidth = minWidth / 2;
                var defaultPadding = minWidth - minWidth * 0.85;
                var newBox = new Box(box.x1, box.y1, box.x1 + minWidth, box.y1 + minWidth);
                var newBoxCenter = newBox.center();
                var boxCenter = box.center();
                var seriesCount = options.series.length;
                var leftSideLabels = [];
                var rightSideLabels = [];
                var padding = valueOrDefault(options.padding, defaultPadding);
                padding = padding > halfMinWidth - space ? halfMinWidth - space : padding;
                newBox.translate(boxCenter.x - newBoxCenter.x, boxCenter.y - newBoxCenter.y);
                var radius = halfMinWidth - padding;
                var center = new Point(radius + newBox.x1 + padding, radius + newBox.y1 + padding);
                for (var i = 0; i < count; i++) {
                    var segment = points[i];
                    var sector = segment.sector;
                    var seriesIndex = segment.seriesIx;
                    sector.radius = radius;
                    sector.center = center;
                    if (seriesConfigs.length) {
                        var seriesConfig = seriesConfigs[seriesIndex];
                        sector.innerRadius = seriesConfig.innerRadius;
                        sector.radius = seriesConfig.radius;
                    }
                    if (seriesIndex === seriesCount - 1 && segment.explode) {
                        sector.center = sector.clone().setRadius(sector.radius * 0.15).point(sector.middle());
                    }
                    segment.reflow(newBox);
                    var label = segment.label;
                    if (label) {
                        if (label.options.position === OUTSIDE_END) {
                            if (seriesIndex === seriesCount - 1) {
                                if (label.orientation === RIGHT) {
                                    rightSideLabels.push(label);
                                } else {
                                    leftSideLabels.push(label);
                                }
                            }
                        }
                    }
                }
                if (leftSideLabels.length > 0) {
                    leftSideLabels.sort(this.labelComparator(true));
                    this.leftLabelsReflow(leftSideLabels);
                }
                if (rightSideLabels.length > 0) {
                    rightSideLabels.sort(this.labelComparator(false));
                    this.rightLabelsReflow(rightSideLabels);
                }
                this.box = newBox;
            },
            leftLabelsReflow: function (labels) {
                var distances = this.distanceBetweenLabels(labels);
                this.distributeLabels(distances, labels);
            },
            rightLabelsReflow: function (labels) {
                var distances = this.distanceBetweenLabels(labels);
                this.distributeLabels(distances, labels);
            },
            distanceBetweenLabels: function (labels) {
                var segment = last(this.points);
                var sector = segment.sector;
                var count = labels.length - 1;
                var lr = sector.radius + segment.options.labels.distance;
                var distances = [];
                var firstBox = labels[0].box;
                var distance = round(firstBox.y1 - (sector.center.y - lr - firstBox.height() - firstBox.height() / 2));
                distances.push(distance);
                for (var i = 0; i < count; i++) {
                    var secondBox = labels[i + 1].box;
                    firstBox = labels[i].box;
                    distance = round(secondBox.y1 - firstBox.y2);
                    distances.push(distance);
                }
                distance = round(sector.center.y + lr - labels[count].box.y2 - labels[count].box.height() / 2);
                distances.push(distance);
                return distances;
            },
            distributeLabels: function (distances, labels) {
                var this$1 = this;
                var count = distances.length;
                var left, right, remaining;
                for (var i = 0; i < count; i++) {
                    remaining = -distances[i];
                    left = right = i;
                    while (remaining > 0 && (left >= 0 || right < count)) {
                        remaining = this$1._takeDistance(distances, i, --left, remaining);
                        remaining = this$1._takeDistance(distances, i, ++right, remaining);
                    }
                }
                this.reflowLabels(distances, labels);
            },
            _takeDistance: function (distances, anchor, position, amount) {
                var result = amount;
                if (distances[position] > 0) {
                    var available = Math.min(distances[position], result);
                    result -= available;
                    distances[position] -= available;
                    distances[anchor] += available;
                }
                return result;
            },
            reflowLabels: function (distances, labels) {
                var this$1 = this;
                var segment = last(this.points);
                var sector = segment.sector;
                var labelOptions = segment.options.labels;
                var labelsCount = labels.length;
                var labelDistance = labelOptions.distance;
                var boxY = sector.center.y - (sector.radius + labelDistance) - labels[0].box.height();
                var boxX;
                distances[0] += 2;
                for (var i = 0; i < labelsCount; i++) {
                    var label = labels[i];
                    var box = label.box;
                    boxY += distances[i];
                    boxX = this$1.hAlignLabel(box.x2, sector.clone().expand(labelDistance), boxY, boxY + box.height(), label.orientation === RIGHT);
                    if (label.orientation === RIGHT) {
                        if (labelOptions.align !== CIRCLE) {
                            boxX = sector.radius + sector.center.x + labelDistance;
                        }
                        label.reflow(new Box(boxX + box.width(), boxY, boxX, boxY));
                    } else {
                        if (labelOptions.align !== CIRCLE) {
                            boxX = sector.center.x - sector.radius - labelDistance;
                        }
                        label.reflow(new Box(boxX - box.width(), boxY, boxX, boxY));
                    }
                    boxY += box.height();
                }
            },
            createVisual: function () {
                var this$1 = this;
                var ref = this;
                var connectors = ref.options.connectors;
                var points = ref.points;
                var count = points.length;
                var space = 4;
                ChartElement.fn.createVisual.call(this);
                this._connectorLines = [];
                for (var i = 0; i < count; i++) {
                    var segment = points[i];
                    var sector = segment.sector;
                    var label = segment.label;
                    var angle = sector.middle();
                    var connectorsColor = (segment.options.connectors || {}).color || connectors.color;
                    if (label) {
                        var connectorLine = new Path({
                            stroke: {
                                color: connectorsColor,
                                width: connectors.width
                            },
                            animation: {
                                type: FADEIN,
                                delay: segment.animationDelay
                            }
                        });
                        if (label.options.position === OUTSIDE_END && segment.value !== 0) {
                            var box = label.box;
                            var centerPoint = sector.center;
                            var start = sector.point(angle);
                            var middle = new Point(box.x1, box.center().y);
                            var sr = void 0, end = void 0, crossing = void 0;
                            start = sector.clone().expand(connectors.padding).point(angle);
                            connectorLine.moveTo(start.x, start.y);
                            if (label.orientation === RIGHT) {
                                end = new Point(box.x1 - connectors.padding, box.center().y);
                                crossing = intersection(centerPoint, start, middle, end);
                                middle = new Point(end.x - space, end.y);
                                crossing = crossing || middle;
                                crossing.x = Math.min(crossing.x, middle.x);
                                if (this$1.pointInCircle(crossing, sector.center, sector.radius + space) || crossing.x < sector.center.x) {
                                    sr = sector.center.x + sector.radius + space;
                                    if (segment.options.labels.align !== COLUMN) {
                                        if (sr < middle.x) {
                                            connectorLine.lineTo(sr, start.y);
                                        } else {
                                            connectorLine.lineTo(start.x + space * 2, start.y);
                                        }
                                    } else {
                                        connectorLine.lineTo(sr, start.y);
                                    }
                                    connectorLine.lineTo(middle.x, end.y);
                                } else {
                                    crossing.y = end.y;
                                    connectorLine.lineTo(crossing.x, crossing.y);
                                }
                            } else {
                                end = new Point(box.x2 + connectors.padding, box.center().y);
                                crossing = intersection(centerPoint, start, middle, end);
                                middle = new Point(end.x + space, end.y);
                                crossing = crossing || middle;
                                crossing.x = Math.max(crossing.x, middle.x);
                                if (this$1.pointInCircle(crossing, sector.center, sector.radius + space) || crossing.x > sector.center.x) {
                                    sr = sector.center.x - sector.radius - space;
                                    if (segment.options.labels.align !== COLUMN) {
                                        if (sr > middle.x) {
                                            connectorLine.lineTo(sr, start.y);
                                        } else {
                                            connectorLine.lineTo(start.x - space * 2, start.y);
                                        }
                                    } else {
                                        connectorLine.lineTo(sr, start.y);
                                    }
                                    connectorLine.lineTo(middle.x, end.y);
                                } else {
                                    crossing.y = end.y;
                                    connectorLine.lineTo(crossing.x, crossing.y);
                                }
                            }
                            connectorLine.lineTo(end.x, end.y);
                            this$1._connectorLines.push(connectorLine);
                            this$1.visual.append(connectorLine);
                        }
                    }
                }
            },
            labelComparator: function (reverse) {
                var reverseValue = reverse ? -1 : 1;
                return function (a, b) {
                    var first = (a.parent.sector.middle() + 270) % 360;
                    var second = (b.parent.sector.middle() + 270) % 360;
                    return (first - second) * reverseValue;
                };
            },
            hAlignLabel: function (originalX, sector, y1, y2, direction) {
                var radius = sector.radius;
                var sector_center = sector.center;
                var cx = sector_center.x;
                var cy = sector_center.y;
                var t = Math.min(Math.abs(cy - y1), Math.abs(cy - y2));
                if (t > radius) {
                    return originalX;
                }
                return cx + Math.sqrt(radius * radius - t * t) * (direction ? 1 : -1);
            },
            pointInCircle: function (point, center, radius) {
                return Math.pow(center.x - point.x, 2) + Math.pow(center.y - point.y, 2) < Math.pow(radius, 2);
            },
            formatPointValue: function (point, format) {
                return this.chartService.format.auto(format, point.value);
            },
            animationDelay: function (categoryIndex) {
                return categoryIndex * PIE_SECTOR_ANIM_DELAY;
            }
        });
        function intersection(a1, a2, b1, b2) {
            var uat = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
            var ub = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);
            var result;
            if (ub !== 0) {
                var ua = uat / ub;
                result = new Point(a1.x + ua * (a2.x - a1.x), a1.y + ua * (a2.y - a1.y));
            }
            return result;
        }
        setDefaultOptions(PieChart, {
            startAngle: 90,
            connectors: {
                width: 2,
                color: '#939393',
                padding: 8
            },
            inactiveItems: {
                markers: {},
                labels: {}
            }
        });
        deepExtend(PieChart.prototype, PieChartMixin);
        var PiePlotArea = PlotAreaBase.extend({
            render: function () {
                this.createPieChart(this.series);
            },
            createPieChart: function (series) {
                var firstSeries = series[0];
                var pieChart = new PieChart(this, {
                    series: series,
                    padding: firstSeries.padding,
                    startAngle: firstSeries.startAngle,
                    connectors: firstSeries.connectors,
                    legend: this.options.legend
                });
                this.appendChart(pieChart);
            },
            appendChart: function (chart, pane) {
                PlotAreaBase.fn.appendChart.call(this, chart, pane);
                append(this.options.legend.items, chart.legendItems);
            }
        });
        var DonutSegment = PieSegment.extend({
            reflowLabel: function () {
                var ref = this;
                var labelsOptions = ref.options.labels;
                var label = ref.label;
                var sector = this.sector.clone();
                var angle = sector.middle();
                if (label) {
                    var labelHeight = label.box.height();
                    if (labelsOptions.position === CENTER) {
                        sector.radius -= (sector.radius - sector.innerRadius) / 2;
                        var lp = sector.point(angle);
                        label.reflow(new Box(lp.x, lp.y - labelHeight / 2, lp.x, lp.y));
                    } else {
                        PieSegment.fn.reflowLabel.call(this);
                    }
                }
            },
            createSegment: function (sector, options) {
                return dataviz.ShapeBuilder.current.createRing(sector, options);
            }
        });
        setDefaultOptions(DonutSegment, {
            overlay: { gradient: 'roundedGlass' },
            labels: { position: CENTER },
            animation: { type: PIE }
        });
        deepExtend(DonutSegment.prototype, PointEventsMixin);
        var DONUT_SECTOR_ANIM_DELAY = 50;
        var DonutChart = PieChart.extend({
            addValue: function (value, sector, fields) {
                var segmentOptions = deepExtend({}, fields.series, { index: fields.index });
                this.evalSegmentOptions(segmentOptions, value, fields);
                this.createLegendItem(value, segmentOptions, fields);
                if (!value || fields.visible === false) {
                    return;
                }
                var segment = new DonutSegment(value, sector, segmentOptions);
                $.extend(segment, fields);
                this.append(segment);
                this.points.push(segment);
            },
            reflow: function (targetBox) {
                var this$1 = this;
                var options = this.options;
                var box = targetBox.clone();
                var space = 5;
                var minWidth = Math.min(box.width(), box.height());
                var halfMinWidth = minWidth / 2;
                var defaultPadding = minWidth - minWidth * 0.85;
                var series = options.series;
                var seriesCount = series.length;
                var padding = valueOrDefault(options.padding, defaultPadding);
                padding = padding > halfMinWidth - space ? halfMinWidth - space : padding;
                var totalSize = halfMinWidth - padding;
                var seriesWithoutSize = 0;
                var holeSize;
                for (var i = 0; i < seriesCount; i++) {
                    var currentSeries = series[i];
                    if (i === 0) {
                        if (defined(currentSeries.holeSize)) {
                            holeSize = currentSeries.holeSize;
                            totalSize -= currentSeries.holeSize;
                        }
                    }
                    if (defined(currentSeries.size)) {
                        totalSize -= currentSeries.size;
                    } else {
                        seriesWithoutSize++;
                    }
                    if (defined(currentSeries.margin) && i !== seriesCount - 1) {
                        totalSize -= currentSeries.margin;
                    }
                }
                if (!defined(holeSize)) {
                    var currentSize = (halfMinWidth - padding) / (seriesCount + 0.75);
                    holeSize = currentSize * 0.75;
                    totalSize -= holeSize;
                }
                var innerRadius = holeSize;
                var margin = 0;
                var size, radius;
                this.seriesConfigs = [];
                for (var i$1 = 0; i$1 < seriesCount; i$1++) {
                    var currentSeries$1 = series[i$1];
                    size = valueOrDefault(currentSeries$1.size, totalSize / seriesWithoutSize);
                    innerRadius += margin;
                    radius = innerRadius + size;
                    this$1.seriesConfigs.push({
                        innerRadius: innerRadius,
                        radius: radius
                    });
                    margin = currentSeries$1.margin || 0;
                    innerRadius = radius;
                }
                PieChart.fn.reflow.call(this, targetBox);
            },
            animationDelay: function (categoryIndex, seriesIndex, seriesCount) {
                return categoryIndex * DONUT_SECTOR_ANIM_DELAY + INITIAL_ANIMATION_DURATION * (seriesIndex + 1) / (seriesCount + 1);
            }
        });
        setDefaultOptions(DonutChart, {
            startAngle: 90,
            connectors: {
                width: 2,
                color: '#939393',
                padding: 8
            }
        });
        var DonutPlotArea = PiePlotArea.extend({
            render: function () {
                this.createDonutChart(this.series);
            },
            createDonutChart: function (series) {
                var firstSeries = series[0];
                var donutChart = new DonutChart(this, {
                    series: series,
                    padding: firstSeries.padding,
                    connectors: firstSeries.connectors,
                    legend: this.options.legend
                });
                this.appendChart(donutChart);
            }
        });
        var DEFAULT_PADDING = 0.15;
        var PolarPlotAreaBase = PlotAreaBase.extend({
            initFields: function () {
                this.valueAxisRangeTracker = new AxisGroupRangeTracker();
            },
            render: function () {
                this.addToLegend(this.series);
                this.createPolarAxis();
                this.createCharts();
                this.createValueAxis();
            },
            alignAxes: function () {
                var axis = this.valueAxis;
                var range = axis.range();
                var crossingValue = axis.options.reverse ? range.max : range.min;
                var slot = axis.getSlot(crossingValue);
                var center = this.polarAxis.getSlot(0).center;
                var axisBox = axis.box.translate(center.x - slot.x1, center.y - slot.y1);
                axis.reflow(axisBox);
            },
            createValueAxis: function () {
                var tracker = this.valueAxisRangeTracker;
                var defaultRange = tracker.query();
                var axisOptions = this.valueAxisOptions({
                    roundToMajorUnit: false,
                    zIndex: -1
                });
                var axisType, axisDefaultRange;
                if (axisOptions.type === LOGARITHMIC) {
                    axisType = dataviz.RadarLogarithmicAxis;
                    axisDefaultRange = {
                        min: 0.1,
                        max: 1
                    };
                } else {
                    axisType = dataviz.RadarNumericAxis;
                    axisDefaultRange = {
                        min: 0,
                        max: 1
                    };
                }
                var range = tracker.query(name) || defaultRange || axisDefaultRange;
                if (range && defaultRange) {
                    range.min = Math.min(range.min, defaultRange.min);
                    range.max = Math.max(range.max, defaultRange.max);
                }
                var valueAxis = new axisType(range.min, range.max, axisOptions, this.chartService);
                this.valueAxis = valueAxis;
                this.appendAxis(valueAxis);
            },
            reflowAxes: function () {
                var ref = this;
                var options = ref.options.plotArea;
                var valueAxis = ref.valueAxis;
                var polarAxis = ref.polarAxis;
                var box = ref.box;
                var defaultPadding = Math.min(box.width(), box.height()) * DEFAULT_PADDING;
                var padding = getSpacing(options.padding || {}, defaultPadding);
                var axisBox = box.clone().unpad(padding);
                var valueAxisBox = axisBox.clone().shrink(0, axisBox.height() / 2);
                polarAxis.reflow(axisBox);
                valueAxis.reflow(valueAxisBox);
                var heightDiff = valueAxis.lineBox().height() - valueAxis.box.height();
                valueAxis.reflow(valueAxis.box.unpad({ top: heightDiff }));
                this.axisBox = axisBox;
                this.alignAxes(axisBox);
            },
            backgroundBox: function () {
                return this.box;
            }
        });
        var PolarScatterChart = ScatterChart.extend({
            pointSlot: function (slotX, slotY) {
                var valueRadius = slotX.center.y - slotY.y1;
                var slot = Point.onCircle(slotX.center, slotX.startAngle, valueRadius);
                return new Box(slot.x, slot.y, slot.x, slot.y);
            }
        });
        setDefaultOptions(PolarScatterChart, { clip: false });
        var PolarLineChart = ScatterLineChart.extend({});
        PolarLineChart.prototype.pointSlot = PolarScatterChart.prototype.pointSlot;
        setDefaultOptions(PolarLineChart, { clip: false });
        var SplinePolarAreaSegment = SplineAreaSegment.extend({
            closeFill: function (fillPath) {
                var center = this._polarAxisCenter();
                fillPath.lineTo(center.x, center.y);
            },
            _polarAxisCenter: function () {
                var polarAxis = this.parent.plotArea.polarAxis;
                var center = polarAxis.box.center();
                return center;
            },
            strokeSegments: function () {
                var segments = this._strokeSegments;
                if (!segments) {
                    var center = this._polarAxisCenter();
                    var curveProcessor = new dataviz.CurveProcessor(false);
                    var linePoints = LineSegment.prototype.points.call(this);
                    linePoints.push(center);
                    segments = this._strokeSegments = curveProcessor.process(linePoints);
                    segments.pop();
                }
                return segments;
            }
        });
        var PolarAreaSegment = AreaSegment.extend({
            points: function () {
                var ref = this;
                var polarAxis = ref.parent.plotArea.polarAxis;
                var stackPoints = ref.stackPoints;
                var center = polarAxis.box.center();
                var points = LineSegment.prototype.points.call(this, stackPoints);
                points.unshift([
                    center.x,
                    center.y
                ]);
                points.push([
                    center.x,
                    center.y
                ]);
                return points;
            }
        });
        var PolarAreaChart = PolarLineChart.extend({
            createSegment: function (linePoints, currentSeries, seriesIx) {
                var style = (currentSeries.line || {}).style;
                var segment;
                if (style === SMOOTH) {
                    segment = new SplinePolarAreaSegment(linePoints, null, false, currentSeries, seriesIx);
                } else {
                    segment = new PolarAreaSegment(linePoints, [], currentSeries, seriesIx);
                }
                return segment;
            },
            createMissingValue: function (value, missingValues) {
                var missingValue;
                if (hasValue(value.x) && missingValues !== INTERPOLATE) {
                    missingValue = {
                        x: value.x,
                        y: value.y
                    };
                    if (missingValues === ZERO) {
                        missingValue.y = 0;
                    }
                }
                return missingValue;
            },
            seriesMissingValues: function (series) {
                return series.missingValues || ZERO;
            },
            _hasMissingValuesGap: function () {
                var this$1 = this;
                var series = this.options.series;
                for (var idx = 0; idx < series.length; idx++) {
                    if (this$1.seriesMissingValues(series[idx]) === GAP) {
                        return true;
                    }
                }
            },
            sortPoints: function (points) {
                var this$1 = this;
                points.sort(xComparer);
                if (this._hasMissingValuesGap()) {
                    for (var idx = 0; idx < points.length; idx++) {
                        var point = points[idx];
                        if (point) {
                            var value = point.value;
                            if (!hasValue(value.y) && this$1.seriesMissingValues(point.series) === GAP) {
                                delete points[idx];
                            }
                        }
                    }
                }
                return points;
            }
        });
        function xComparer(a, b) {
            return a.value.x - b.value.x;
        }
        var PolarPlotArea = PolarPlotAreaBase.extend({
            createPolarAxis: function () {
                var polarAxis = new dataviz.PolarAxis(this.options.xAxis, this.chartService);
                this.polarAxis = polarAxis;
                this.axisX = polarAxis;
                this.appendAxis(polarAxis);
            },
            valueAxisOptions: function (defaults) {
                return deepExtend(defaults, {
                    majorGridLines: { type: ARC },
                    minorGridLines: { type: ARC }
                }, this.options.yAxis);
            },
            createValueAxis: function () {
                PolarPlotAreaBase.fn.createValueAxis.call(this);
                this.axisY = this.valueAxis;
            },
            appendChart: function (chart, pane) {
                this.valueAxisRangeTracker.update(chart.yAxisRanges);
                PlotAreaBase.prototype.appendChart.call(this, chart, pane);
            },
            createCharts: function () {
                var series = this.filterVisibleSeries(this.series);
                var pane = this.panes[0];
                this.createLineChart(filterSeriesByType(series, [POLAR_LINE]), pane);
                this.createScatterChart(filterSeriesByType(series, [POLAR_SCATTER]), pane);
                this.createAreaChart(filterSeriesByType(series, [POLAR_AREA]), pane);
            },
            createLineChart: function (series, pane) {
                if (series.length === 0) {
                    return;
                }
                var lineChart = new PolarLineChart(this, { series: series });
                this.appendChart(lineChart, pane);
            },
            createScatterChart: function (series, pane) {
                if (series.length === 0) {
                    return;
                }
                var scatterChart = new PolarScatterChart(this, { series: series });
                this.appendChart(scatterChart, pane);
            },
            createAreaChart: function (series, pane) {
                if (series.length === 0) {
                    return;
                }
                var areaChart = new PolarAreaChart(this, { series: series });
                this.appendChart(areaChart, pane);
            },
            _dispatchEvent: function (chart, e, eventType) {
                var coords = chart._eventCoordinates(e);
                var point = new Point(coords.x, coords.y);
                var xValue = this.axisX.getValue(point);
                var yValue = this.axisY.getValue(point);
                if (xValue !== null && yValue !== null) {
                    chart.trigger(eventType, {
                        element: eventElement(e),
                        x: xValue,
                        y: yValue
                    });
                }
            },
            createCrosshairs: function () {
            }
        });
        setDefaultOptions(PolarPlotArea, {
            xAxis: {},
            yAxis: {}
        });
        deepExtend(PolarPlotArea.prototype, PlotAreaEventsMixin);
        var RadarLineChart = LineChart.extend({
            pointSlot: function (categorySlot, valueSlot) {
                var valueRadius = categorySlot.center.y - valueSlot.y1;
                var slot = Point.onCircle(categorySlot.center, categorySlot.middle(), valueRadius);
                return new Box(slot.x, slot.y, slot.x, slot.y);
            },
            createSegment: function (linePoints, currentSeries, seriesIx) {
                var style = currentSeries.style;
                var pointType;
                if (style === SMOOTH) {
                    pointType = SplineSegment;
                } else {
                    pointType = LineSegment;
                }
                var segment = new pointType(linePoints, currentSeries, seriesIx);
                if (linePoints.length === currentSeries.data.length) {
                    segment.options.closed = true;
                }
                return segment;
            }
        });
        setDefaultOptions(RadarLineChart, { clip: false });
        var SplineRadarAreaSegment = SplineAreaSegment.extend({
            closeFill: function () {
            }
        });
        var RadarAreaSegment = AreaSegment.extend({
            points: function () {
                return LineSegment.prototype.points.call(this, this.stackPoints);
            }
        });
        var RadarAreaChart = RadarLineChart.extend({
            createSegment: function (linePoints, currentSeries, seriesIx, prevSegment) {
                var isStacked = this.options.isStacked;
                var style = (currentSeries.line || {}).style;
                var segment;
                if (style === SMOOTH) {
                    segment = new SplineRadarAreaSegment(linePoints, prevSegment, isStacked, currentSeries, seriesIx);
                    segment.options.closed = true;
                } else {
                    var stackPoints;
                    if (isStacked && seriesIx > 0 && prevSegment) {
                        stackPoints = prevSegment.linePoints.slice(0).reverse();
                    }
                    linePoints.push(linePoints[0]);
                    segment = new RadarAreaSegment(linePoints, stackPoints, currentSeries, seriesIx);
                }
                return segment;
            },
            seriesMissingValues: function (series) {
                return series.missingValues || ZERO;
            }
        });
        var RadarSegment = DonutSegment.extend({
            init: function (value, options) {
                DonutSegment.fn.init.call(this, value, null, options);
            }
        });
        setDefaultOptions(RadarSegment, {
            overlay: { gradient: 'none' },
            labels: { distance: 10 }
        });
        var RadarClusterLayout = ChartElement.extend({
            reflow: function (sector) {
                var ref = this;
                var options = ref.options;
                var children = ref.children;
                var gap = options.gap;
                var spacing = options.spacing;
                var count = children.length;
                var slots = count + gap + spacing * (count - 1);
                var slotAngle = sector.angle / slots;
                var angle = sector.startAngle + slotAngle * (gap / 2);
                for (var i = 0; i < count; i++) {
                    var slotSector = sector.clone();
                    slotSector.startAngle = angle;
                    slotSector.angle = slotAngle;
                    if (children[i].sector) {
                        slotSector.radius = children[i].sector.radius;
                    }
                    children[i].reflow(slotSector);
                    children[i].sector = slotSector;
                    angle += slotAngle + slotAngle * spacing;
                }
            }
        });
        setDefaultOptions(RadarClusterLayout, {
            gap: 1,
            spacing: 0
        });
        var RadarStackLayout = ChartElement.extend({
            reflow: function (sector) {
                var ref = this;
                var reverse = ref.options.reverse;
                var children = ref.children;
                var childrenCount = children.length;
                var first = reverse ? childrenCount - 1 : 0;
                var step = reverse ? -1 : 1;
                this.box = new Box();
                for (var i = first; i >= 0 && i < childrenCount; i += step) {
                    var childSector = children[i].sector;
                    childSector.startAngle = sector.startAngle;
                    childSector.angle = sector.angle;
                }
            }
        });
        var RadarBarChart = BarChart.extend({
            pointType: function () {
                return RadarSegment;
            },
            clusterType: function () {
                return RadarClusterLayout;
            },
            stackType: function () {
                return RadarStackLayout;
            },
            categorySlot: function (categoryAxis, categoryIx) {
                return categoryAxis.getSlot(categoryIx);
            },
            pointSlot: function (categorySlot, valueSlot) {
                var slot = categorySlot.clone();
                var y = categorySlot.center.y;
                slot.radius = y - valueSlot.y1;
                slot.innerRadius = y - valueSlot.y2;
                return slot;
            },
            reflowPoint: function (point, pointSlot) {
                point.sector = pointSlot;
                point.reflow();
            },
            createAnimation: function () {
                this.options.animation.center = this.box.toRect().center();
                BarChart.fn.createAnimation.call(this);
            }
        });
        RadarBarChart.prototype.reflow = CategoricalChart.prototype.reflow;
        setDefaultOptions(RadarBarChart, {
            clip: false,
            animation: { type: 'pie' }
        });
        var RadarPlotArea = PolarPlotAreaBase.extend({
            createPolarAxis: function () {
                var categoryAxis = new dataviz.RadarCategoryAxis(this.options.categoryAxis, this.chartService);
                this.polarAxis = categoryAxis;
                this.categoryAxis = categoryAxis;
                this.appendAxis(categoryAxis);
                this.aggregateCategories();
                this.createCategoryAxesLabels();
            },
            valueAxisOptions: function (defaults) {
                if (this._hasBarCharts) {
                    deepExtend(defaults, {
                        majorGridLines: { type: ARC },
                        minorGridLines: { type: ARC }
                    });
                }
                if (this._isStacked100) {
                    deepExtend(defaults, {
                        roundToMajorUnit: false,
                        labels: { format: 'P0' }
                    });
                }
                return deepExtend(defaults, this.options.valueAxis);
            },
            aggregateCategories: function () {
                CategoricalPlotArea.prototype.aggregateCategories.call(this, this.panes);
            },
            createCategoryAxesLabels: function () {
                CategoricalPlotArea.prototype.createCategoryAxesLabels.call(this, this.panes);
            },
            filterSeries: function (currentSeries) {
                return currentSeries;
            },
            createCharts: function () {
                var series = this.filterVisibleSeries(this.series);
                var pane = this.panes[0];
                this.createAreaChart(filterSeriesByType(series, [RADAR_AREA]), pane);
                this.createLineChart(filterSeriesByType(series, [RADAR_LINE]), pane);
                this.createBarChart(filterSeriesByType(series, [RADAR_COLUMN]), pane);
            },
            chartOptions: function (series) {
                var options = { series: series };
                var firstSeries = series[0];
                if (firstSeries) {
                    var filteredSeries = this.filterVisibleSeries(series);
                    var stack = firstSeries.stack;
                    options.isStacked = stack && filteredSeries.length > 1;
                    options.isStacked100 = stack && stack.type === '100%' && filteredSeries.length > 1;
                    if (options.isStacked100) {
                        this._isStacked100 = true;
                    }
                }
                return options;
            },
            createAreaChart: function (series, pane) {
                if (series.length === 0) {
                    return;
                }
                var areaChart = new RadarAreaChart(this, this.chartOptions(series));
                this.appendChart(areaChart, pane);
            },
            createLineChart: function (series, pane) {
                if (series.length === 0) {
                    return;
                }
                var lineChart = new RadarLineChart(this, this.chartOptions(series));
                this.appendChart(lineChart, pane);
            },
            createBarChart: function (series, pane) {
                if (series.length === 0) {
                    return;
                }
                var firstSeries = series[0];
                var options = this.chartOptions(series);
                options.gap = firstSeries.gap;
                options.spacing = firstSeries.spacing;
                var barChart = new RadarBarChart(this, options);
                this.appendChart(barChart, pane);
                this._hasBarCharts = true;
            },
            seriesCategoryAxis: function () {
                return this.categoryAxis;
            },
            _dispatchEvent: function (chart, e, eventType) {
                var coords = chart._eventCoordinates(e);
                var point = new Point(coords.x, coords.y);
                var category = this.categoryAxis.getCategory(point);
                var value = this.valueAxis.getValue(point);
                if (category !== null && value !== null) {
                    chart.trigger(eventType, {
                        element: eventElement(e),
                        category: category,
                        value: value
                    });
                }
            },
            createCrosshairs: function () {
            }
        });
        deepExtend(RadarPlotArea.prototype, PlotAreaEventsMixin, {
            appendChart: CategoricalPlotArea.prototype.appendChart,
            aggregateSeries: CategoricalPlotArea.prototype.aggregateSeries
        });
        setDefaultOptions(RadarPlotArea, {
            categoryAxis: { categories: [] },
            valueAxis: {}
        });
        var FunnelSegment = ChartElement.extend({
            init: function (value, options, segmentOptions) {
                ChartElement.fn.init.call(this, options);
                this.value = value;
                this.options.index = segmentOptions.index;
            },
            reflow: function (chartBox) {
                var points = this.points;
                var label = this.children[0];
                this.box = new Box(points[0].x, points[0].y, points[1].x, points[2].y);
                if (label) {
                    label.reflow(new Box(chartBox.x1, points[0].y, chartBox.x2, points[2].y));
                }
            },
            createVisual: function () {
                var this$1 = this;
                var options = this.options;
                var visual;
                ChartElement.fn.createVisual.call(this);
                if (options.visual) {
                    visual = options.visual({
                        category: this.category,
                        dataItem: this.dataItem,
                        value: this.value,
                        series: this.series,
                        percentage: this.percentage,
                        points: this.points,
                        options: options,
                        sender: this.getSender(),
                        createVisual: function () {
                            return this$1.createPath();
                        }
                    });
                } else {
                    visual = this.createPath();
                }
                if (visual) {
                    this.visual.append(visual);
                }
            },
            createPath: function () {
                var options = this.options;
                var border = options.border;
                var path = Path.fromPoints(this.points, {
                    fill: {
                        color: options.color,
                        opacity: options.opacity
                    },
                    stroke: {
                        color: border.color,
                        opacity: border.opacity,
                        width: border.width
                    }
                }).close();
                return path;
            },
            createHighlight: function (style) {
                return Path.fromPoints(this.points, style);
            },
            highlightVisual: function () {
                return this.visual.children[0];
            },
            highlightVisualArgs: function () {
                var path = Path.fromPoints(this.points).close();
                return {
                    options: this.options,
                    path: path
                };
            },
            tooltipAnchor: function () {
                var box = this.box;
                return {
                    point: new Point(box.center().x, box.y1),
                    align: {
                        horizontal: 'center',
                        vertical: 'top'
                    }
                };
            },
            formatValue: function (format) {
                var point = this;
                return point.owner.formatPointValue(point, format);
            }
        });
        setDefaultOptions(FunnelSegment, {
            color: WHITE,
            border: { width: 1 }
        });
        deepExtend(FunnelSegment.prototype, PointEventsMixin);
        var FunnelChart = ChartElement.extend({
            init: function (plotArea, options) {
                ChartElement.fn.init.call(this, options);
                this.plotArea = plotArea;
                this.points = [];
                this.labels = [];
                this.legendItems = [];
                this.render();
            },
            formatPointValue: function (point, format) {
                return this.chartService.format.auto(format, point.value);
            },
            render: function () {
                var this$1 = this;
                var ref = this;
                var options = ref.options;
                var seriesColors = ref.plotArea.options.seriesColors;
                if (seriesColors === void 0) {
                    seriesColors = [];
                }
                var series = options.series[0];
                var data = series.data;
                if (!data) {
                    return;
                }
                var total = seriesTotal(series);
                for (var i = 0; i < data.length; i++) {
                    var pointData = SeriesBinder.current.bindPoint(series, i);
                    var value = pointData.valueFields.value;
                    if (value === null || value === undefined) {
                        continue;
                    }
                    var fields = pointData.fields;
                    if (!isFunction(series.color)) {
                        series.color = fields.color || seriesColors[i % seriesColors.length];
                    }
                    var visible = segmentVisible(series, fields, i);
                    fields = deepExtend({
                        index: i,
                        owner: this$1,
                        series: series,
                        dataItem: data[i],
                        percentage: Math.abs(value) / total
                    }, fields, { visible: visible });
                    var segment = this$1.createSegment(value, fields);
                    var label = this$1.createLabel(value, fields);
                    if (segment && label) {
                        segment.append(label);
                    }
                }
            },
            evalSegmentOptions: function (options, value, fields) {
                var series = fields.series;
                evalOptions(options, {
                    value: value,
                    series: series,
                    dataItem: fields.dataItem,
                    index: fields.index
                }, {
                    defaults: series._defaults,
                    excluded: [
                        'data',
                        'toggle',
                        'visual'
                    ]
                });
            },
            createSegment: function (value, fields) {
                var seriesOptions = deepExtend({}, fields.series);
                this.evalSegmentOptions(seriesOptions, value, fields);
                this.createLegendItem(value, seriesOptions, fields);
                if (fields.visible !== false) {
                    var segment = new FunnelSegment(value, seriesOptions, fields);
                    $.extend(segment, fields);
                    this.append(segment);
                    this.points.push(segment);
                    return segment;
                }
            },
            createLabel: function (value, fields) {
                var series = fields.series;
                var dataItem = fields.dataItem;
                var labels = deepExtend({}, this.options.labels, series.labels);
                var text = value;
                if (labels.visible) {
                    if (labels.template) {
                        var labelTemplate = TemplateService.compile(labels.template);
                        text = labelTemplate({
                            dataItem: dataItem,
                            value: value,
                            percentage: fields.percentage,
                            category: fields.category,
                            series: series
                        });
                    } else if (labels.format) {
                        text = this.plotArea.chartService.format.auto(labels.format, text);
                    }
                    if (!labels.color) {
                        var brightnessValue = new Color(series.color).percBrightness();
                        if (brightnessValue > 180) {
                            labels.color = BLACK;
                        } else {
                            labels.color = WHITE;
                        }
                        if (!labels.background) {
                            labels.background = series.color;
                        }
                    }
                    this.evalSegmentOptions(labels, value, fields);
                    var textBox = new TextBox(text, deepExtend({ vAlign: labels.position }, labels));
                    this.labels.push(textBox);
                    return textBox;
                }
            },
            labelPadding: function () {
                var labels = this.labels;
                var padding = {
                    left: 0,
                    right: 0
                };
                for (var i = 0; i < labels.length; i++) {
                    var label = labels[i];
                    var align = label.options.align;
                    if (align !== CENTER) {
                        var width = labels[i].box.width();
                        if (align === LEFT) {
                            padding.left = Math.max(padding.left, width);
                        } else {
                            padding.right = Math.max(padding.right, width);
                        }
                    }
                }
                return padding;
            },
            dynamicSlopeReflow: function (box, width, totalHeight) {
                var ref = this;
                var options = ref.options;
                var segments = ref.points;
                var count = segments.length;
                var firstSegment = segments[0];
                var maxSegment = firstSegment;
                for (var idx = 0; idx < segments.length; idx++) {
                    if (segments[idx].percentage > maxSegment.percentage) {
                        maxSegment = segments[idx];
                    }
                }
                var lastUpperSide = firstSegment.percentage / maxSegment.percentage * width;
                var previousOffset = (width - lastUpperSide) / 2;
                var previousHeight = 0;
                for (var idx$1 = 0; idx$1 < count; idx$1++) {
                    var percentage = segments[idx$1].percentage;
                    var nextSegment = segments[idx$1 + 1];
                    var nextPercentage = nextSegment ? nextSegment.percentage : percentage;
                    var points = segments[idx$1].points = [];
                    var height = options.dynamicHeight ? totalHeight * percentage : totalHeight / count;
                    var offset = void 0;
                    if (!percentage) {
                        offset = nextPercentage ? 0 : width / 2;
                    } else {
                        offset = (width - lastUpperSide * (nextPercentage / percentage)) / 2;
                    }
                    offset = limitValue(offset, 0, width);
                    points.push(new GeometryPoint(box.x1 + previousOffset, box.y1 + previousHeight));
                    points.push(new GeometryPoint(box.x1 + width - previousOffset, box.y1 + previousHeight));
                    points.push(new GeometryPoint(box.x1 + width - offset, box.y1 + height + previousHeight));
                    points.push(new GeometryPoint(box.x1 + offset, box.y1 + height + previousHeight));
                    previousOffset = offset;
                    previousHeight += height + options.segmentSpacing;
                    lastUpperSide = limitValue(width - 2 * offset, 0, width);
                }
            },
            constantSlopeReflow: function (box, width, totalHeight) {
                var ref = this;
                var options = ref.options;
                var segments = ref.points;
                var count = segments.length;
                var decreasingWidth = options.neckRatio <= 1;
                var neckRatio = decreasingWidth ? options.neckRatio * width : width;
                var previousOffset = decreasingWidth ? 0 : (width - width / options.neckRatio) / 2;
                var topMostWidth = decreasingWidth ? width : width - previousOffset * 2;
                var finalNarrow = (topMostWidth - neckRatio) / 2;
                var previousHeight = 0;
                for (var idx = 0; idx < count; idx++) {
                    var points = segments[idx].points = [];
                    var percentage = segments[idx].percentage;
                    var offset = options.dynamicHeight ? finalNarrow * percentage : finalNarrow / count;
                    var height = options.dynamicHeight ? totalHeight * percentage : totalHeight / count;
                    points.push(new GeometryPoint(box.x1 + previousOffset, box.y1 + previousHeight));
                    points.push(new GeometryPoint(box.x1 + width - previousOffset, box.y1 + previousHeight));
                    points.push(new GeometryPoint(box.x1 + width - previousOffset - offset, box.y1 + height + previousHeight));
                    points.push(new GeometryPoint(box.x1 + previousOffset + offset, box.y1 + height + previousHeight));
                    previousOffset += offset;
                    previousHeight += height + options.segmentSpacing;
                }
            },
            reflow: function (chartBox) {
                var points = this.points;
                var count = points.length;
                if (!count) {
                    return;
                }
                var options = this.options;
                var box = chartBox.clone().unpad(this.labelPadding());
                var totalHeight = box.height() - options.segmentSpacing * (count - 1);
                var width = box.width();
                if (options.dynamicSlope) {
                    this.dynamicSlopeReflow(box, width, totalHeight);
                } else {
                    this.constantSlopeReflow(box, width, totalHeight);
                }
                for (var idx = 0; idx < count; idx++) {
                    points[idx].reflow(chartBox);
                }
            }
        });
        setDefaultOptions(FunnelChart, {
            neckRatio: 0.3,
            width: 300,
            dynamicSlope: false,
            dynamicHeight: true,
            segmentSpacing: 0,
            labels: {
                visible: false,
                align: CENTER,
                position: CENTER,
                zIndex: 1
            }
        });
        deepExtend(FunnelChart.prototype, PieChartMixin);
        var FunnelPlotArea = PlotAreaBase.extend({
            render: function () {
                this.createFunnelChart(this.series);
            },
            createFunnelChart: function (series) {
                var firstSeries = series[0];
                var funnelChart = new FunnelChart(this, {
                    series: series,
                    legend: this.options.legend,
                    neckRatio: firstSeries.neckRatio,
                    dynamicHeight: firstSeries.dynamicHeight,
                    dynamicSlope: firstSeries.dynamicSlope,
                    segmentSpacing: firstSeries.segmentSpacing,
                    highlight: firstSeries.highlight
                });
                this.appendChart(funnelChart);
            },
            appendChart: function (chart, pane) {
                PlotAreaBase.fn.appendChart.call(this, chart, pane);
                append(this.options.legend.items, chart.legendItems);
            }
        });
        var COLOR = 'color';
        var FIRST = 'first';
        var FROM = 'from';
        var MAX = 'max';
        var MIN = 'min';
        var NOTE_TEXT = 'noteText';
        var SUMMARY_FIELD = 'summary';
        var TO = 'to';
        PlotAreaFactory.current.register(CategoricalPlotArea, [
            BAR,
            COLUMN,
            LINE,
            VERTICAL_LINE,
            AREA,
            VERTICAL_AREA,
            CANDLESTICK,
            OHLC,
            BULLET,
            VERTICAL_BULLET,
            BOX_PLOT,
            VERTICAL_BOX_PLOT,
            RANGE_COLUMN,
            RANGE_BAR,
            WATERFALL,
            HORIZONTAL_WATERFALL
        ]);
        PlotAreaFactory.current.register(XYPlotArea, [
            SCATTER,
            SCATTER_LINE,
            BUBBLE
        ]);
        PlotAreaFactory.current.register(PiePlotArea, [PIE]);
        PlotAreaFactory.current.register(DonutPlotArea, [DONUT]);
        PlotAreaFactory.current.register(FunnelPlotArea, [FUNNEL]);
        PlotAreaFactory.current.register(PolarPlotArea, [
            POLAR_AREA,
            POLAR_LINE,
            POLAR_SCATTER
        ]);
        PlotAreaFactory.current.register(RadarPlotArea, [
            RADAR_AREA,
            RADAR_COLUMN,
            RADAR_LINE
        ]);
        SeriesBinder.current.register([
            BAR,
            COLUMN,
            LINE,
            VERTICAL_LINE,
            AREA,
            VERTICAL_AREA
        ], [VALUE], [
            CATEGORY,
            COLOR,
            NOTE_TEXT,
            ERROR_LOW_FIELD,
            ERROR_HIGH_FIELD
        ]);
        SeriesBinder.current.register([
            RANGE_COLUMN,
            RANGE_BAR
        ], [
            FROM,
            TO
        ], [
            CATEGORY,
            COLOR,
            NOTE_TEXT
        ]);
        SeriesBinder.current.register([
            WATERFALL,
            HORIZONTAL_WATERFALL
        ], [VALUE], [
            CATEGORY,
            COLOR,
            NOTE_TEXT,
            SUMMARY_FIELD
        ]);
        SeriesBinder.current.register([
            POLAR_AREA,
            POLAR_LINE,
            POLAR_SCATTER
        ], [
            X,
            Y
        ], [COLOR]);
        SeriesBinder.current.register([
            RADAR_AREA,
            RADAR_COLUMN,
            RADAR_LINE
        ], [VALUE], [COLOR]);
        SeriesBinder.current.register([FUNNEL], [VALUE], [
            CATEGORY,
            COLOR,
            'visibleInLegend',
            'visible'
        ]);
        DefaultAggregates.current.register([
            BAR,
            COLUMN,
            LINE,
            VERTICAL_LINE,
            AREA,
            VERTICAL_AREA,
            WATERFALL,
            HORIZONTAL_WATERFALL
        ], {
            value: MAX,
            color: FIRST,
            noteText: FIRST,
            errorLow: MIN,
            errorHigh: MAX
        });
        DefaultAggregates.current.register([
            RANGE_COLUMN,
            RANGE_BAR
        ], {
            from: MIN,
            to: MAX,
            color: FIRST,
            noteText: FIRST
        });
        DefaultAggregates.current.register([
            RADAR_AREA,
            RADAR_COLUMN,
            RADAR_LINE
        ], {
            value: MAX,
            color: FIRST
        });
        SeriesBinder.current.register([
            SCATTER,
            SCATTER_LINE,
            BUBBLE
        ], [
            X,
            Y
        ], [
            COLOR,
            NOTE_TEXT,
            X_ERROR_LOW_FIELD,
            X_ERROR_HIGH_FIELD,
            Y_ERROR_LOW_FIELD,
            Y_ERROR_HIGH_FIELD
        ]);
        SeriesBinder.current.register([BUBBLE], [
            X,
            Y,
            'size'
        ], [
            COLOR,
            CATEGORY,
            NOTE_TEXT
        ]);
        SeriesBinder.current.register([
            CANDLESTICK,
            OHLC
        ], [
            'open',
            'high',
            'low',
            'close'
        ], [
            CATEGORY,
            COLOR,
            'downColor',
            NOTE_TEXT
        ]);
        DefaultAggregates.current.register([
            CANDLESTICK,
            OHLC
        ], {
            open: MAX,
            high: MAX,
            low: MIN,
            close: MAX,
            color: FIRST,
            downColor: FIRST,
            noteText: FIRST
        });
        SeriesBinder.current.register([
            BOX_PLOT,
            VERTICAL_BOX_PLOT
        ], [
            'lower',
            'q1',
            'median',
            'q3',
            'upper',
            'mean',
            'outliers'
        ], [
            CATEGORY,
            COLOR,
            NOTE_TEXT
        ]);
        DefaultAggregates.current.register([
            BOX_PLOT,
            VERTICAL_BOX_PLOT
        ], {
            lower: MAX,
            q1: MAX,
            median: MAX,
            q3: MAX,
            upper: MAX,
            mean: MAX,
            outliers: FIRST,
            color: FIRST,
            noteText: FIRST
        });
        SeriesBinder.current.register([
            BULLET,
            VERTICAL_BULLET
        ], [
            'current',
            'target'
        ], [
            CATEGORY,
            COLOR,
            'visibleInLegend',
            NOTE_TEXT
        ]);
        DefaultAggregates.current.register([
            BULLET,
            VERTICAL_BULLET
        ], {
            current: MAX,
            target: MAX,
            color: FIRST,
            noteText: FIRST
        });
        SeriesBinder.current.register([
            PIE,
            DONUT
        ], [VALUE], [
            CATEGORY,
            COLOR,
            'explode',
            'visibleInLegend',
            'visible'
        ]);
        var AXIS_NAMES = [
            CATEGORY,
            VALUE,
            X,
            Y
        ];
        var MOUSEMOVE = 'mousemove';
        var CONTEXTMENU = 'contextmenu';
        var MOUSEMOVE_DELAY = 20;
        var Chart = Class.extend({
            init: function (element, userOptions, themeOptions, context) {
                var this$1 = this;
                if (context === void 0) {
                    context = {};
                }
                this.observers = [];
                this.addObserver(context.observer);
                this.chartService = new services.ChartService(this, context);
                this.chartService.theme = themeOptions;
                this._initElement(element);
                var options = deepExtend({}, this.options, userOptions);
                this._originalOptions = deepExtend({}, options);
                this._theme = themeOptions;
                this._initTheme(options, themeOptions);
                this._initSurface();
                this._initHandlers();
                this.bindCategories();
                dataviz.FontLoader.preloadFonts(userOptions, function () {
                    if (!this$1._destroyed) {
                        this$1._redraw();
                        this$1._attachEvents();
                    }
                });
            },
            _initElement: function (element) {
                this._setElementClass(element);
                element.style.position = 'relative';
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
                this.element = element;
            },
            _setElementClass: function (element) {
                dataviz.addClass(element, 'k-chart');
            },
            _initTheme: function (options, themeOptions) {
                var seriesCopies = [];
                var series = options.series || [];
                for (var i = 0; i < series.length; i++) {
                    seriesCopies.push($.extend({}, series[i]));
                }
                options.series = seriesCopies;
                resolveAxisAliases(options);
                this.applyDefaults(options, themeOptions);
                if (options.seriesColors === null) {
                    delete options.seriesColors;
                }
                this.options = deepExtend({}, themeOptions, options);
                this.applySeriesColors();
            },
            getSize: function () {
                return {
                    width: this.element.offsetWidth,
                    height: this.element.offsetHeight
                };
            },
            resize: function (force) {
                var size = this.getSize();
                var currentSize = this._size;
                if (force || (size.width > 0 || size.height > 0) && (!currentSize || size.width !== currentSize.width || size.height !== currentSize.height)) {
                    this._size = size;
                    this._resize(size, force);
                    this.trigger('resize', size);
                }
            },
            _resize: function () {
                this._noTransitionsRedraw();
            },
            redraw: function (paneName) {
                this.applyDefaults(this.options);
                this.applySeriesColors();
                if (paneName) {
                    var plotArea = this._model._plotArea;
                    var pane = plotArea.findPane(paneName);
                    plotArea.redraw(pane);
                } else {
                    this._redraw();
                }
            },
            getAxis: function (name) {
                var axes = this._plotArea.axes;
                for (var idx = 0; idx < axes.length; idx++) {
                    if (axes[idx].options.name === name) {
                        return new ChartAxis(axes[idx]);
                    }
                }
            },
            findAxisByName: function (name) {
                return this.getAxis(name);
            },
            plotArea: function () {
                return new ChartPlotArea(this._plotArea);
            },
            toggleHighlight: function (show, filter) {
                var plotArea = this._plotArea;
                var firstSeries = (plotArea.srcSeries || plotArea.series || [])[0];
                var points;
                if (isFunction(filter)) {
                    points = plotArea.filterPoints(filter);
                } else {
                    var seriesName, categoryName;
                    if (isObject(filter)) {
                        seriesName = filter.series;
                        categoryName = filter.category;
                    } else {
                        seriesName = categoryName = filter;
                    }
                    if (firstSeries.type === DONUT) {
                        points = pointByCategoryName(plotArea.pointsBySeriesName(seriesName), categoryName);
                    } else if (firstSeries.type === PIE || firstSeries.type === FUNNEL) {
                        points = pointByCategoryName((plotArea.charts[0] || {}).points, categoryName);
                    } else {
                        points = plotArea.pointsBySeriesName(seriesName);
                    }
                }
                if (points) {
                    this.togglePointsHighlight(show, points);
                }
            },
            togglePointsHighlight: function (show, points) {
                var highlight = this._highlight;
                for (var idx = 0; idx < points.length; idx++) {
                    highlight.togglePointHighlight(points[idx], show);
                }
            },
            showTooltip: function (filter) {
                var shared = this._sharedTooltip();
                var ref = this;
                var tooltip = ref._tooltip;
                var plotArea = ref._plotArea;
                var point, categoryIndex;
                if (isFunction(filter)) {
                    point = plotArea.findPoint(filter);
                    if (point && shared) {
                        categoryIndex = point.categoryIx;
                    }
                } else if (shared && defined(filter)) {
                    categoryIndex = plotArea.categoryAxis.categoryIndex(filter);
                }
                if (shared) {
                    if (categoryIndex >= 0) {
                        var points = this._plotArea.pointsByCategoryIndex(categoryIndex);
                        tooltip.showAt(points);
                    }
                } else if (point) {
                    tooltip.show(point);
                }
            },
            hideTooltip: function () {
                this._tooltip.hide();
            },
            _initSurface: function () {
                var surface = this.surface;
                var wrap = this._surfaceWrap();
                var chartArea = this.options.chartArea;
                if (chartArea.width) {
                    dataviz.elementSize(wrap, { width: chartArea.width });
                }
                if (chartArea.height) {
                    dataviz.elementSize(wrap, { height: chartArea.height });
                }
                if (!surface || surface.options.type !== this.options.renderAs) {
                    if (surface) {
                        surface.destroy();
                    }
                    this.surface = drawing.Surface.create(wrap, { type: this.options.renderAs });
                } else {
                    this.surface.clear();
                    this.surface.resize();
                }
            },
            _surfaceWrap: function () {
                return this.element;
            },
            _redraw: function () {
                var model = this._getModel();
                this._destroyView();
                this._model = model;
                this._plotArea = model._plotArea;
                model.renderVisual();
                if (this.options.transitions !== false) {
                    model.traverse(function (element) {
                        if (element.animation) {
                            element.animation.setup();
                        }
                    });
                }
                this._initSurface();
                this.surface.draw(model.visual);
                if (this.options.transitions !== false) {
                    model.traverse(function (element) {
                        if (element.animation) {
                            element.animation.play();
                        }
                    });
                }
                this._tooltip = this._createTooltip();
                this._highlight = new Highlight();
                this._setupSelection();
                this._createPannable();
                this._createZoomSelection();
                this._createMousewheelZoom();
                this.trigger(RENDER);
                if (!this._navState) {
                    this._cancelDomEvents();
                }
            },
            exportVisual: function (options) {
                var visual;
                if (options && (options.width || options.height)) {
                    var chartArea = this.options.chartArea;
                    var originalChartArea = this._originalOptions.chartArea;
                    deepExtend(chartArea, options);
                    var model = this._getModel();
                    chartArea.width = originalChartArea.width;
                    chartArea.height = originalChartArea.height;
                    model.renderVisual();
                    visual = model.visual;
                } else {
                    visual = this.surface.exportVisual();
                }
                return visual;
            },
            _sharedTooltip: function () {
                return this._plotArea instanceof CategoricalPlotArea && this.options.tooltip.shared;
            },
            _createPannable: function () {
                var options = this.options;
                if (options.pannable !== false) {
                    this._pannable = new Pannable(this._plotArea, options.pannable);
                }
            },
            _createZoomSelection: function () {
                var zoomable = this.options.zoomable;
                var selection = (zoomable || {}).selection;
                if (zoomable !== false && selection !== false) {
                    this._zoomSelection = new ZoomSelection(this, selection);
                }
            },
            _createMousewheelZoom: function () {
                var zoomable = this.options.zoomable;
                var mousewheel = (zoomable || {}).mousewheel;
                if (zoomable !== false && mousewheel !== false) {
                    this._mousewheelZoom = new MousewheelZoom(this, mousewheel);
                }
            },
            _createTooltip: function () {
                var ref = this;
                var tooltipOptions = ref.options.tooltip;
                var tooltip;
                if (this._sharedTooltip()) {
                    tooltip = this._createSharedTooltip(tooltipOptions);
                } else {
                    tooltip = new Tooltip(this.chartService, tooltipOptions);
                }
                return tooltip;
            },
            _createSharedTooltip: function (options) {
                return new SharedTooltip(this._plotArea, options);
            },
            applyDefaults: function (options, themeOptions) {
                applyAxisDefaults(options, themeOptions);
                applySeriesDefaults(options, themeOptions);
            },
            applySeriesColors: function () {
                var options = this.options;
                var series = options.series;
                var colors = options.seriesColors || [];
                for (var i = 0; i < series.length; i++) {
                    var currentSeries = series[i];
                    var seriesColor = colors[i % colors.length];
                    var defaults = currentSeries._defaults;
                    currentSeries.color = currentSeries.color || seriesColor;
                    if (defaults) {
                        defaults.color = defaults.color || seriesColor;
                    }
                }
            },
            _getModel: function () {
                var options = this.options;
                var plotArea = this._createPlotArea();
                var model = new dataviz.RootElement(this._modelOptions());
                model.chart = this;
                model._plotArea = plotArea;
                dataviz.Title.buildTitle(options.title, model);
                if (options.legend.visible) {
                    model.append(new Legend(plotArea.options.legend, this.chartService));
                }
                model.append(plotArea);
                model.reflow();
                return model;
            },
            _modelOptions: function () {
                var ref = this;
                var options = ref.options;
                var element = ref.element;
                var size = dataviz.elementSize(element);
                this._size = null;
                return deepExtend({
                    width: Math.floor(size.width) || datavizConstants.DEFAULT_WIDTH,
                    height: Math.floor(size.height) || datavizConstants.DEFAULT_HEIGHT,
                    transitions: options.transitions
                }, options.chartArea);
            },
            _createPlotArea: function (skipSeries) {
                var options = this.options;
                var plotArea = PlotAreaFactory.current.create(skipSeries ? [] : options.series, options, this.chartService);
                return plotArea;
            },
            _hasSelection: function () {
                return this._selections && this._selections.length;
            },
            _setupSelection: function () {
                var this$1 = this;
                var ref = this;
                var axes = ref._plotArea.axes;
                var selections = this._selections = [];
                for (var i = 0; i < axes.length; i++) {
                    var axis = axes[i];
                    var options = axis.options;
                    if (axis instanceof CategoryAxis && options.select && !options.vertical) {
                        var min = 0;
                        var max = options.categories.length - 1;
                        if (axis instanceof DateCategoryAxis) {
                            min = options.categories[min];
                            max = options.categories[max];
                        }
                        if (!options.justified) {
                            if (axis instanceof DateCategoryAxis) {
                                max = dataviz.addDuration(max, 1, options.baseUnit, options.weekStartDay);
                            } else {
                                max++;
                            }
                        }
                        var selection = new Selection(this$1, axis, deepExtend({
                            min: min,
                            max: max
                        }, options.select));
                        selections.push(selection);
                    }
                }
            },
            _selectStart: function (e) {
                return this.trigger(SELECT_START, e);
            },
            _select: function (e) {
                return this.trigger(SELECT, e);
            },
            _selectEnd: function (e) {
                return this.trigger(SELECT_END, e);
            },
            _initHandlers: function () {
                this._clickHandler = this._click.bind(this);
                this._mousewheelHandler = this._mousewheel.bind(this);
                this._surfaceMouseenterHandler = this._mouseover.bind(this);
                this._surfaceMouseleaveHandler = this._mouseout.bind(this);
                this._mousemove = kendo.throttle(this._mousemove.bind(this), MOUSEMOVE_DELAY);
            },
            addObserver: function (observer) {
                if (observer) {
                    this.observers.push(observer);
                }
            },
            removeObserver: function (observer) {
                var index = this.observers.indexOf(observer);
                if (index >= 0) {
                    this.observers.splice(index, 1);
                }
            },
            requiresHandlers: function (eventNames) {
                var observers = this.observers;
                for (var idx = 0; idx < observers.length; idx++) {
                    if (observers[idx].requiresHandlers(eventNames)) {
                        return true;
                    }
                }
            },
            trigger: function (name, args) {
                if (args === void 0) {
                    args = {};
                }
                if (name === SHOW_TOOLTIP) {
                    args.anchor.point = this._toDocumentCoordinates(args.anchor.point);
                }
                args.sender = this;
                var observers = this.observers;
                var isDefaultPrevented = false;
                for (var idx = 0; idx < observers.length; idx++) {
                    if (observers[idx].trigger(name, args)) {
                        isDefaultPrevented = true;
                    }
                }
                return isDefaultPrevented;
            },
            _attachEvents: function () {
                var ref = this;
                var element = ref.element;
                var surface = ref.surface;
                surface.bind('mouseenter', this._surfaceMouseenterHandler);
                surface.bind('mouseleave', this._surfaceMouseleaveHandler);
                var obj;
                bindEvents(element, (obj = {}, obj[CONTEXTMENU] = this._clickHandler, obj[MOUSEWHEEL] = this._mousewheelHandler, obj));
                if (this._shouldAttachMouseMove()) {
                    var obj$1;
                    bindEvents(element, (obj$1 = {}, obj$1[MOUSEMOVE] = this._mousemove, obj$1));
                }
                this.domEvents = services.DomEventsBuilder.create(this.element, {
                    start: this._start.bind(this),
                    move: this._move.bind(this),
                    end: this._end.bind(this),
                    tap: this._tap.bind(this),
                    gesturestart: this._gesturestart.bind(this),
                    gesturechange: this._gesturechange.bind(this),
                    gestureend: this._gestureend.bind(this)
                });
            },
            _cancelDomEvents: function () {
                if (this.domEvents && this.domEvents.cancel) {
                    this.domEvents.cancel();
                }
            },
            _gesturestart: function (e) {
                if (this._mousewheelZoom && !this._stopDragEvent(e)) {
                    this._gestureDistance = e.distance;
                    this._unsetActivePoint();
                    this.surface.suspendTracking();
                }
            },
            _gestureend: function (e) {
                if (this._zooming && !this._stopDragEvent(e)) {
                    if (this.surface) {
                        this.surface.resumeTracking();
                    }
                    this._zooming = false;
                    this.trigger(ZOOM_END, {});
                }
            },
            _gesturechange: function (e) {
                var mousewheelZoom = this._mousewheelZoom;
                if (mousewheelZoom && !this._stopDragEvent(e)) {
                    e.preventDefault();
                    var previousGestureDistance = this._gestureDistance;
                    var scaleDelta = -e.distance / previousGestureDistance + 1;
                    if (Math.abs(scaleDelta) >= 0.1) {
                        scaleDelta = Math.round(scaleDelta * 10);
                        this._gestureDistance = e.distance;
                        var args = {
                            delta: scaleDelta,
                            axisRanges: axisRanges(this._plotArea.axes),
                            originalEvent: e
                        };
                        if (this._zooming || !this.trigger(ZOOM_START, args)) {
                            if (!this._zooming) {
                                this._zooming = true;
                            }
                            var ranges = args.axisRanges = mousewheelZoom.updateRanges(scaleDelta);
                            if (ranges && !this.trigger(ZOOM, args)) {
                                mousewheelZoom.zoom();
                            }
                        }
                    }
                }
            },
            _mouseout: function (e) {
                if (e.element) {
                    var element = this._drawingChartElement(e.element, e);
                    if (element && element.leave) {
                        element.leave(this, e.originalEvent);
                    }
                }
            },
            _start: function (e) {
                var coords = this._eventCoordinates(e);
                if (this._stopDragEvent(e) || !this._plotArea.backgroundContainsPoint(coords)) {
                    return;
                }
                if (this.requiresHandlers([
                        DRAG_START,
                        DRAG,
                        DRAG_END
                    ])) {
                    this._startNavigation(e, coords, DRAG_START);
                }
                if (this._pannable && this._pannable.start(e)) {
                    this.surface.suspendTracking();
                    this._unsetActivePoint();
                    this._suppressHover = true;
                }
                if (this._zoomSelection) {
                    if (this._zoomSelection.start(e)) {
                        this.trigger(ZOOM_START, {
                            axisRanges: axisRanges(this._plotArea.axes),
                            originalEvent: e
                        });
                    }
                }
            },
            _move: function (e) {
                var ref = this;
                var state = ref._navState;
                var pannable = ref._pannable;
                if (this._stopDragEvent(e)) {
                    return;
                }
                if (pannable) {
                    var ranges = pannable.move(e);
                    if (ranges && !this.trigger(DRAG, {
                            axisRanges: ranges,
                            originalEvent: e
                        })) {
                        pannable.pan();
                    }
                } else if (state) {
                    var ranges$1 = {};
                    var axes = state.axes;
                    for (var i = 0; i < axes.length; i++) {
                        var currentAxis = axes[i];
                        var axisName = currentAxis.options.name;
                        if (axisName) {
                            var axis = currentAxis.options.vertical ? e.y : e.x;
                            var delta = axis.startLocation - axis.location;
                            if (delta !== 0) {
                                ranges$1[currentAxis.options.name] = currentAxis.translateRange(delta);
                            }
                        }
                    }
                    state.axisRanges = ranges$1;
                    this.trigger(DRAG, {
                        axisRanges: ranges$1,
                        originalEvent: e
                    });
                }
                if (this._zoomSelection) {
                    this._zoomSelection.move(e);
                }
            },
            _end: function (e) {
                if (this._stopDragEvent(e)) {
                    return;
                }
                var pannable = this._pannable;
                if (pannable && pannable.end(e)) {
                    this.surface.resumeTracking();
                    this.trigger(DRAG_END, {
                        axisRanges: axisRanges(this._plotArea.axes),
                        originalEvent: e
                    });
                    this._suppressHover = false;
                } else {
                    this._endNavigation(e, DRAG_END);
                }
                if (this._zoomSelection) {
                    var ranges = this._zoomSelection.end(e);
                    if (ranges && !this.trigger(ZOOM, {
                            axisRanges: ranges,
                            originalEvent: e
                        })) {
                        this._zoomSelection.zoom();
                        this.trigger(ZOOM_END, {
                            axisRanges: ranges,
                            originalEvent: e
                        });
                    }
                }
            },
            _stopDragEvent: function () {
                return this._hasSelection();
            },
            _mousewheel: function (e) {
                var this$1 = this;
                var delta = dataviz.mousewheelDelta(e);
                var mousewheelZoom = this._mousewheelZoom;
                var coords = this._eventCoordinates(e);
                if (!this._plotArea.backgroundContainsPoint(coords)) {
                    return;
                }
                if (mousewheelZoom) {
                    var args = {
                        delta: delta,
                        axisRanges: axisRanges(this._plotArea.axes),
                        originalEvent: e
                    };
                    if (this._zooming || !this.trigger(ZOOM_START, args)) {
                        e.preventDefault();
                        if (!this._zooming) {
                            this._unsetActivePoint();
                            this.surface.suspendTracking();
                            this._zooming = true;
                        }
                        if (this._mwTimeout) {
                            clearTimeout(this._mwTimeout);
                        }
                        args.axisRanges = mousewheelZoom.updateRanges(delta);
                        if (args.axisRanges && !this.trigger(ZOOM, args)) {
                            mousewheelZoom.zoom();
                        }
                        this._mwTimeout = setTimeout(function () {
                            this$1.trigger(ZOOM_END, args);
                            this$1._zooming = false;
                            if (this$1.surface) {
                                this$1.surface.resumeTracking();
                            }
                        }, MOUSEWHEEL_DELAY);
                    }
                } else {
                    var state = this._navState;
                    if (!state) {
                        var prevented = this._startNavigation(e, coords, ZOOM_START);
                        if (!prevented) {
                            state = this._navState;
                        }
                    }
                    if (state) {
                        var totalDelta = state.totalDelta || delta;
                        state.totalDelta = totalDelta + delta;
                        var axes = this._navState.axes;
                        var ranges = {};
                        for (var i = 0; i < axes.length; i++) {
                            var currentAxis = axes[i];
                            var axisName = currentAxis.options.name;
                            if (axisName) {
                                ranges[axisName] = currentAxis.scaleRange(-totalDelta);
                            }
                        }
                        this.trigger(ZOOM, {
                            delta: delta,
                            axisRanges: ranges,
                            originalEvent: e
                        });
                        if (this._mwTimeout) {
                            clearTimeout(this._mwTimeout);
                        }
                        this._mwTimeout = setTimeout(function () {
                            this$1._endNavigation(e, ZOOM_END);
                        }, MOUSEWHEEL_DELAY);
                    }
                }
            },
            _startNavigation: function (e, coords, chartEvent) {
                var plotArea = this._model._plotArea;
                var pane = plotArea.findPointPane(coords);
                var axes = plotArea.axes.slice(0);
                if (!pane) {
                    return;
                }
                var ranges = axisRanges(axes);
                var prevented = this.trigger(chartEvent, {
                    axisRanges: ranges,
                    originalEvent: e
                });
                if (prevented) {
                    this._cancelDomEvents();
                } else {
                    this._suppressHover = true;
                    this._unsetActivePoint();
                    this._navState = {
                        axisRanges: ranges,
                        pane: pane,
                        axes: axes
                    };
                }
            },
            _endNavigation: function (e, chartEvent) {
                if (this._navState) {
                    this.trigger(chartEvent, {
                        axisRanges: this._navState.axisRanges,
                        originalEvent: e
                    });
                    this._suppressHover = false;
                    this._navState = null;
                }
            },
            _getChartElement: function (e, match) {
                var element = this.surface.eventTarget(e);
                if (element) {
                    return this._drawingChartElement(element, e, match);
                }
            },
            _drawingChartElement: function (element, e, match) {
                var current = element;
                var chartElement;
                while (current && !chartElement) {
                    chartElement = current.chartElement;
                    current = current.parent;
                }
                if (chartElement) {
                    if (chartElement.aliasFor) {
                        chartElement = chartElement.aliasFor(e, this._eventCoordinates(e));
                    }
                    if (match) {
                        chartElement = chartElement.closest(match);
                    }
                    return chartElement;
                }
            },
            _eventCoordinates: function (e) {
                var coordinates = dataviz.eventCoordinates(e);
                return this._toModelCoordinates(coordinates.x, coordinates.y);
            },
            _elementPadding: function () {
                if (!this._padding) {
                    var ref = elementStyles(this.element, [
                        'paddingLeft',
                        'paddingTop'
                    ]);
                    var paddingLeft = ref.paddingLeft;
                    var paddingTop = ref.paddingTop;
                    this._padding = {
                        top: paddingTop,
                        left: paddingLeft
                    };
                }
                return this._padding;
            },
            _toDocumentCoordinates: function (point) {
                var padding = this._elementPadding();
                var offset = dataviz.elementOffset(this.element);
                return {
                    left: round(point.x + padding.left + offset.left),
                    top: round(point.y + padding.top + offset.top)
                };
            },
            _toModelCoordinates: function (clientX, clientY) {
                var element = this.element;
                var offset = dataviz.elementOffset(element);
                var padding = this._elementPadding();
                return new Point(clientX - offset.left - padding.left, clientY - offset.top - padding.top);
            },
            _tap: function (e) {
                var this$1 = this;
                var drawingElement = this.surface.eventTarget(e);
                var element = this._drawingChartElement(drawingElement, e);
                if (this._activePoint === element) {
                    this._propagateClick(element, e);
                } else {
                    if (!this._startHover(drawingElement, e)) {
                        this._unsetActivePoint();
                    }
                    this._propagateClick(element, e);
                }
                this.handlingTap = true;
                setTimeout(function () {
                    this$1.handlingTap = false;
                }, 0);
            },
            _click: function (e) {
                var element = this._getChartElement(e);
                this._propagateClick(element, e);
            },
            _propagateClick: function (element, e) {
                var this$1 = this;
                var current = element;
                while (current) {
                    if (current.click) {
                        current.click(this$1, e);
                    }
                    current = current.parent;
                }
            },
            _startHover: function (element, e) {
                var chartElement = this._drawingChartElement(element, e);
                var ref = this;
                var tooltip = ref._tooltip;
                var highlight = ref._highlight;
                if (this._suppressHover || !highlight || highlight.isHighlighted(chartElement) || this._sharedTooltip()) {
                    return false;
                }
                var point = this._drawingChartElement(element, e, function (element) {
                    return element.hover && !(element instanceof PlotAreaBase);
                });
                if (point && !point.hover(this, e)) {
                    this._activePoint = point;
                    var tooltipOptions = deepExtend({}, tooltipOptions, point.options.tooltip);
                    if (tooltipOptions.visible) {
                        tooltip.show(point);
                    }
                    highlight.show(point);
                    return point;
                }
            },
            _mouseover: function (e) {
                var point = this._startHover(e.element, e.originalEvent);
                if (point && point.tooltipTracking) {
                    this._mouseMoveTrackHandler = this._mouseMoveTrackHandler || this._mouseMoveTracking.bind(this);
                    var obj;
                    bindEvents(document, (obj = {}, obj[MOUSEMOVE] = this._mouseMoveTrackHandler, obj));
                }
            },
            _mouseMoveTracking: function (e) {
                var ref = this;
                var options = ref.options;
                var tooltip = ref._tooltip;
                var highlight = ref._highlight;
                var point = ref._activePoint;
                var coords = this._eventCoordinates(e);
                if (this._plotArea.box.containsPoint(coords)) {
                    if (point && point.tooltipTracking && point.series && point.parent.getNearestPoint) {
                        var seriesPoint = point.parent.getNearestPoint(coords.x, coords.y, point.seriesIx);
                        if (seriesPoint && seriesPoint !== point) {
                            seriesPoint.hover(this, e);
                            this._activePoint = seriesPoint;
                            var tooltipOptions = deepExtend({}, options.tooltip, point.options.tooltip);
                            if (tooltipOptions.visible) {
                                tooltip.show(seriesPoint);
                            }
                            highlight.show(seriesPoint);
                        }
                    }
                } else {
                    var obj;
                    unbindEvents(document, (obj = {}, obj[MOUSEMOVE] = this._mouseMoveTrackHandler, obj));
                    this._unsetActivePoint();
                }
            },
            _mousemove: function (e) {
                var coords = this._eventCoordinates(e);
                this._trackCrosshairs(coords);
                if (this._plotArea.hover) {
                    this._plotArea.hover(this, e);
                }
                if (this._sharedTooltip()) {
                    this._trackSharedTooltip(coords, e);
                }
            },
            _trackCrosshairs: function (coords) {
                var crosshairs = this._plotArea.crosshairs;
                for (var i = 0; i < crosshairs.length; i++) {
                    var current = crosshairs[i];
                    if (current.box.containsPoint(coords)) {
                        current.showAt(coords);
                    } else {
                        current.hide();
                    }
                }
            },
            _trackSharedTooltip: function (coords, e) {
                var ref = this;
                var tooltipOptions = ref.options.tooltip;
                var plotArea = ref._plotArea;
                var categoryAxis = ref._plotArea.categoryAxis;
                var tooltip = ref._tooltip;
                var highlight = ref._highlight;
                if (plotArea.box.containsPoint(coords)) {
                    var index = categoryAxis.pointCategoryIndex(coords);
                    if (index !== this._tooltipCategoryIx) {
                        var points = plotArea.pointsByCategoryIndex(index);
                        var pointArgs = points.map(function (point) {
                            return point.eventArgs(e);
                        });
                        var hoverArgs = pointArgs[0] || {};
                        hoverArgs.categoryPoints = pointArgs;
                        if (points.length > 0 && !this.trigger(SERIES_HOVER, hoverArgs)) {
                            if (tooltipOptions.visible) {
                                tooltip.showAt(points, coords);
                            }
                            highlight.show(points);
                        } else {
                            tooltip.hide();
                        }
                        this._tooltipCategoryIx = index;
                    }
                }
            },
            hideElements: function () {
                var ref = this;
                var plotArea = ref._plotArea;
                var tooltip = ref._tooltip;
                var highlight = ref._highlight;
                this._mousemove.cancel();
                plotArea.hideCrosshairs();
                highlight.hide();
                tooltip.hide();
                delete this._tooltipCategoryIx;
            },
            _unsetActivePoint: function () {
                var ref = this;
                var tooltip = ref._tooltip;
                var highlight = ref._highlight;
                this._activePoint = null;
                if (tooltip) {
                    tooltip.hide();
                }
                if (highlight) {
                    highlight.hide();
                }
            },
            _deferRedraw: function () {
                this._redraw();
            },
            _clearRedrawTimeout: function () {
                if (this._redrawTimeout) {
                    clearInterval(this._redrawTimeout);
                    this._redrawTimeout = null;
                }
            },
            bindCategories: function () {
                var this$1 = this;
                var options = this.options;
                var definitions = [].concat(options.categoryAxis);
                for (var axisIx = 0; axisIx < definitions.length; axisIx++) {
                    var axis = definitions[axisIx];
                    if (axis.autoBind !== false) {
                        this$1.bindCategoryAxisFromSeries(axis, axisIx);
                    }
                }
            },
            bindCategoryAxisFromSeries: function (axis, axisIx) {
                var this$1 = this;
                var series = this.options.series;
                var seriesLength = series.length;
                var uniqueCategories = {};
                var items = [];
                var dateAxis;
                for (var seriesIx = 0; seriesIx < seriesLength; seriesIx++) {
                    var s = series[seriesIx];
                    var onAxis = s.categoryAxis === axis.name || !s.categoryAxis && axisIx === 0;
                    var data = s.data;
                    var dataLength = data.length;
                    if (s.categoryField && onAxis && dataLength > 0) {
                        dateAxis = isDateAxis(axis, getField(s.categoryField, data[0]));
                        var getFn = dateAxis ? getDateField : getField;
                        for (var dataIx = 0; dataIx < dataLength; dataIx++) {
                            var dataRow = data[dataIx];
                            var category = getFn(s.categoryField, dataRow, this$1.chartService.intl);
                            if (dateAxis || !uniqueCategories[category]) {
                                items.push([
                                    category,
                                    dataRow
                                ]);
                                if (!dateAxis) {
                                    uniqueCategories[category] = true;
                                }
                            }
                        }
                    }
                }
                if (items.length > 0) {
                    if (dateAxis) {
                        items = uniqueDates(items, function (a, b) {
                            return dataviz.dateComparer(a[0], b[0]);
                        });
                    }
                    var result = transpose(items);
                    axis.categories = result[0];
                }
            },
            _isBindable: function (series) {
                var valueFields = SeriesBinder.current.valueFields(series);
                var result = true;
                for (var i = 0; i < valueFields.length; i++) {
                    var field = valueFields[i];
                    if (field === VALUE) {
                        field = 'field';
                    } else {
                        field = field + 'Field';
                    }
                    if (!defined(series[field])) {
                        result = false;
                        break;
                    }
                }
                return result;
            },
            _noTransitionsRedraw: function () {
                var options = this.options;
                var transitionsState;
                if (options.transitions) {
                    options.transitions = false;
                    transitionsState = true;
                }
                this._redraw();
                if (transitionsState) {
                    options.transitions = true;
                }
            },
            _legendItemHover: function (seriesIndex, pointIndex) {
                var ref = this;
                var plotArea = ref._plotArea;
                var highlight = ref._highlight;
                var currentSeries = (plotArea.srcSeries || plotArea.series)[seriesIndex];
                var items;
                if (inArray(currentSeries.type, [
                        PIE,
                        DONUT,
                        FUNNEL
                    ])) {
                    items = plotArea.findPoint(function (point) {
                        return point.series.index === seriesIndex && point.index === pointIndex;
                    });
                } else {
                    items = plotArea.pointsBySeriesIndex(seriesIndex);
                }
                highlight.show(items);
            },
            _shouldAttachMouseMove: function () {
                return this._plotArea.crosshairs.length || this._tooltip && this._sharedTooltip() || this.requiresHandlers([PLOT_AREA_HOVER]);
            },
            updateMouseMoveHandler: function () {
                var obj;
                unbindEvents(this.element, (obj = {}, obj[MOUSEMOVE] = this._mousemove, obj));
                if (this._shouldAttachMouseMove()) {
                    var obj$1;
                    bindEvents(this.element, (obj$1 = {}, obj$1[MOUSEMOVE] = this._mousemove, obj$1));
                }
            },
            applyOptions: function (options, theme) {
                clearMissingValues(this._originalOptions, options);
                this._originalOptions = deepExtend(this._originalOptions, options);
                this.options = deepExtend({}, this._originalOptions);
                if (theme) {
                    this._theme = theme;
                    this.chartService.theme = theme;
                }
                this._initTheme(this.options, this._theme);
            },
            setOptions: function (options, theme) {
                this.applyOptions(options, theme);
                this.bindCategories();
                this.redraw();
                this.updateMouseMoveHandler();
            },
            destroy: function () {
                this._destroyed = true;
                var obj;
                unbindEvents(this.element, (obj = {}, obj[CONTEXTMENU] = this._clickHandler, obj[MOUSEWHEEL] = this._mousewheelHandler, obj[MOUSEMOVE] = this._mousemove, obj));
                if (this.domEvents) {
                    this.domEvents.destroy();
                    delete this.domEvents;
                }
                var obj$1;
                unbindEvents(document, (obj$1 = {}, obj$1[MOUSEMOVE] = this._mouseMoveTrackHandler, obj$1));
                this._destroyView();
                if (this.surface) {
                    this.surface.destroy();
                    this.surface = null;
                }
                this._clearRedrawTimeout();
            },
            _destroyView: function () {
                var ref = this;
                var model = ref._model;
                var selections = ref._selections;
                if (model) {
                    model.destroy();
                    this._model = null;
                }
                if (selections) {
                    while (selections.length > 0) {
                        selections.shift().destroy();
                    }
                }
                this._unsetActivePoint();
                if (this._tooltip) {
                    this._tooltip.destroy();
                }
                if (this._highlight) {
                    this._highlight.destroy();
                }
                if (this._zoomSelection) {
                    this._zoomSelection.destroy();
                    delete this._zoomSelection;
                }
                if (this._pannable) {
                    this._pannable.destroy();
                    delete this._pannable;
                }
                if (this._mousewheelZoom) {
                    this._mousewheelZoom.destroy();
                    delete this._mousewheelZoom;
                }
            }
        });
        function resolveAxisAliases(options) {
            var aliases = AXIS_NAMES;
            for (var idx = 0; idx < aliases.length; idx++) {
                var alias = aliases[idx] + 'Axes';
                if (options[alias]) {
                    options[aliases[idx] + 'Axis'] = options[alias];
                    delete options[alias];
                }
            }
        }
        function pointByCategoryName(points, name) {
            if (points) {
                for (var idx = 0; idx < points.length; idx++) {
                    if (points[idx].category === name) {
                        return [points[idx]];
                    }
                }
            }
        }
        function applyAxisDefaults(options, themeOptions) {
            var themeAxisDefaults = (themeOptions || {}).axisDefaults || {};
            var axisName, axisDefaults, axes;
            function mapAxisOptions(axisOptions) {
                var axisColor = (axisOptions || {}).color || axisDefaults.color;
                var result = deepExtend({}, themeAxisDefaults, themeAxisDefaults[axisName], axisDefaults, axisDefaults[axisName], {
                    line: { color: axisColor },
                    labels: { color: axisColor },
                    title: { color: axisColor }
                }, axisOptions);
                delete result[axisName];
                return result;
            }
            for (var idx = 0; idx < AXIS_NAMES.length; idx++) {
                axisName = AXIS_NAMES[idx] + 'Axis';
                axisDefaults = options.axisDefaults || {};
                axes = [].concat(options[axisName]);
                axes = axes.map(mapAxisOptions);
                options[axisName] = axes.length > 1 ? axes : axes[0];
            }
        }
        function applySeriesDefaults(options, themeOptions) {
            var series = options.series;
            var seriesLength = series.length;
            var seriesDefaults = options.seriesDefaults;
            var commonDefaults = deepExtend({}, options.seriesDefaults);
            var themeSeriesDefaults = themeOptions ? deepExtend({}, themeOptions.seriesDefaults) : {};
            var commonThemeDefaults = deepExtend({}, themeSeriesDefaults);
            cleanupNestedSeriesDefaults(commonDefaults);
            cleanupNestedSeriesDefaults(commonThemeDefaults);
            for (var i = 0; i < seriesLength; i++) {
                var seriesType = series[i].type || options.seriesDefaults.type;
                var baseOptions = deepExtend({ data: [] }, commonThemeDefaults, themeSeriesDefaults[seriesType], { tooltip: options.tooltip }, commonDefaults, seriesDefaults[seriesType]);
                series[i]._defaults = baseOptions;
                series[i] = deepExtend({}, baseOptions, series[i]);
            }
        }
        function cleanupNestedSeriesDefaults(seriesDefaults) {
            delete seriesDefaults.bar;
            delete seriesDefaults.column;
            delete seriesDefaults.rangeColumn;
            delete seriesDefaults.line;
            delete seriesDefaults.verticalLine;
            delete seriesDefaults.pie;
            delete seriesDefaults.donut;
            delete seriesDefaults.area;
            delete seriesDefaults.verticalArea;
            delete seriesDefaults.scatter;
            delete seriesDefaults.scatterLine;
            delete seriesDefaults.bubble;
            delete seriesDefaults.candlestick;
            delete seriesDefaults.ohlc;
            delete seriesDefaults.boxPlot;
            delete seriesDefaults.bullet;
            delete seriesDefaults.verticalBullet;
            delete seriesDefaults.polarArea;
            delete seriesDefaults.polarLine;
            delete seriesDefaults.radarArea;
            delete seriesDefaults.radarLine;
            delete seriesDefaults.waterfall;
        }
        function axisRanges(axes) {
            var ranges = {};
            for (var i = 0; i < axes.length; i++) {
                var axis = axes[i];
                var axisName = axis.options.name;
                if (axisName) {
                    ranges[axisName] = axis.range();
                }
            }
            return ranges;
        }
        function sortDates(dates, comparer) {
            if (comparer === void 0) {
                comparer = dataviz.dateComparer;
            }
            for (var i = 1, length = dates.length; i < length; i++) {
                if (comparer(dates[i], dates[i - 1]) < 0) {
                    dates.sort(comparer);
                    break;
                }
            }
            return dates;
        }
        function uniqueDates(srcDates, comparer) {
            if (comparer === void 0) {
                comparer = dataviz.dateComparer;
            }
            var dates = sortDates(srcDates, comparer);
            var length = dates.length;
            var result = length > 0 ? [dates[0]] : [];
            for (var i = 1; i < length; i++) {
                if (comparer(dates[i], last(result)) !== 0) {
                    result.push(dates[i]);
                }
            }
            return result;
        }
        function transpose(rows) {
            var rowCount = rows.length;
            var result = [];
            for (var rowIx = 0; rowIx < rowCount; rowIx++) {
                var row = rows[rowIx];
                var colCount = row.length;
                for (var colIx = 0; colIx < colCount; colIx++) {
                    result[colIx] = result[colIx] || [];
                    result[colIx].push(row[colIx]);
                }
            }
            return result;
        }
        function clearMissingValues(originalOptions, options) {
            for (var field in options) {
                var fieldValue = options[field];
                var originalValue = originalOptions[field];
                if (defined(originalValue)) {
                    var nullValue = fieldValue === null;
                    if (nullValue || !defined(fieldValue)) {
                        delete originalOptions[field];
                        if (nullValue) {
                            delete options[field];
                        }
                    } else if (originalValue && isObject(fieldValue)) {
                        if (isObject(originalValue)) {
                            clearMissingValues(originalValue, fieldValue);
                        }
                    }
                }
            }
        }
        setDefaultOptions(Chart, {
            renderAs: '',
            chartArea: {},
            legend: {
                visible: true,
                labels: {}
            },
            categoryAxis: {},
            seriesDefaults: {
                type: COLUMN,
                data: [],
                highlight: { visible: true },
                labels: {},
                negativeValues: { visible: false }
            },
            series: [],
            seriesColors: null,
            tooltip: { visible: false },
            transitions: true,
            valueAxis: {},
            plotArea: {},
            title: {},
            xAxis: {},
            yAxis: {},
            panes: [{}],
            pannable: false,
            zoomable: false
        });
        kendo.deepExtend(kendo.dataviz, {
            constants: constants,
            Aggregates: Aggregates,
            AreaChart: AreaChart,
            AreaSegment: AreaSegment,
            AxisGroupRangeTracker: AxisGroupRangeTracker,
            Bar: Bar,
            BarChart: BarChart,
            BarLabel: BarLabel,
            BoxPlotChart: BoxPlotChart,
            BoxPlot: BoxPlot,
            BubbleChart: BubbleChart,
            Bullet: Bullet,
            BulletChart: BulletChart,
            CandlestickChart: CandlestickChart,
            Candlestick: Candlestick,
            CategoricalChart: CategoricalChart,
            CategoricalErrorBar: CategoricalErrorBar,
            CategoricalPlotArea: CategoricalPlotArea,
            Chart: Chart,
            ChartContainer: ChartContainer,
            ClipAnimation: ClipAnimation,
            ClusterLayout: ClusterLayout,
            Crosshair: Crosshair,
            CrosshairTooltip: CrosshairTooltip,
            DefaultAggregates: DefaultAggregates,
            DonutChart: DonutChart,
            DonutPlotArea: DonutPlotArea,
            DonutSegment: DonutSegment,
            ErrorBarBase: ErrorBarBase,
            ErrorRangeCalculator: ErrorRangeCalculator,
            Highlight: Highlight,
            SharedTooltip: SharedTooltip,
            Legend: Legend,
            LegendItem: LegendItem,
            LegendLayout: LegendLayout,
            LineChart: LineChart,
            LinePoint: LinePoint,
            LineSegment: LineSegment,
            Pane: Pane,
            PieAnimation: PieAnimation,
            PieChart: PieChart,
            PieChartMixin: PieChartMixin,
            PiePlotArea: PiePlotArea,
            PieSegment: PieSegment,
            PlotAreaBase: PlotAreaBase,
            PlotAreaEventsMixin: PlotAreaEventsMixin,
            PlotAreaFactory: PlotAreaFactory,
            PointEventsMixin: PointEventsMixin,
            RangeBar: RangeBar,
            RangeBarChart: RangeBarChart,
            ScatterChart: ScatterChart,
            ScatterErrorBar: ScatterErrorBar,
            ScatterLineChart: ScatterLineChart,
            Selection: Selection,
            SeriesAggregator: SeriesAggregator,
            SeriesBinder: SeriesBinder,
            SplineSegment: SplineSegment,
            SplineAreaSegment: SplineAreaSegment,
            StackWrap: StackWrap,
            Tooltip: Tooltip,
            OHLCChart: OHLCChart,
            OHLCPoint: OHLCPoint,
            WaterfallChart: WaterfallChart,
            WaterfallSegment: WaterfallSegment,
            XYPlotArea: XYPlotArea,
            MousewheelZoom: MousewheelZoom,
            ZoomSelection: ZoomSelection,
            Pannable: Pannable,
            ChartAxis: ChartAxis,
            ChartPlotArea: ChartPlotArea,
            anyHasZIndex: anyHasZIndex,
            appendIfNotNull: areNumbers,
            areNumbers: areNumbers,
            categoriesCount: categoriesCount,
            countNumbers: countNumbers,
            equalsIgnoreCase: equalsIgnoreCase,
            evalOptions: evalOptions,
            filterSeriesByType: filterSeriesByType,
            getDateField: getDateField,
            getField: getField,
            hasGradientOverlay: hasGradientOverlay,
            hasValue: hasValue,
            isDateAxis: isDateAxis,
            segmentVisible: segmentVisible,
            seriesTotal: seriesTotal,
            singleItemOrArray: singleItemOrArray
        });
    }(window.kendo.jQuery));
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('dataviz/chart/chart', [
        'dataviz/chart/kendo-chart',
        'kendo.data',
        'kendo.dataviz.core',
        'kendo.dataviz.themes',
        'kendo.drawing',
        'kendo.userevents'
    ], f);
}(function () {
    (function ($, undefined) {
        var NS = '.kendoChart';
        var kendo = window.kendo;
        var Class = kendo.Class;
        var outerWidth = kendo._outerWidth;
        var outerHeight = kendo._outerHeight;
        var dataviz = kendo.dataviz;
        var constants = dataviz.constants;
        var KendoChart = dataviz.Chart;
        var SeriesBinder = dataviz.SeriesBinder;
        var Widget = kendo.ui.Widget;
        var DataSource = kendo.data.DataSource;
        var deepExtend = kendo.deepExtend;
        var defined = dataviz.defined;
        var getField = dataviz.getField;
        var InstanceObserver = dataviz.InstanceObserver;
        var inArray = dataviz.inArray;
        var services = dataviz.services;
        var proxy = $.proxy;
        var isArray = $.isArray;
        var extend = $.extend;
        var template = kendo.template;
        var MOUSELEAVE_NS = 'mouseleave' + NS;
        var AXIS_LABEL_CLICK = constants.AXIS_LABEL_CLICK;
        var LEGEND_ITEM_CLICK = constants.LEGEND_ITEM_CLICK;
        var LEGEND_ITEM_HOVER = constants.LEGEND_ITEM_HOVER;
        var SERIES_CLICK = constants.SERIES_CLICK;
        var SERIES_HOVER = constants.SERIES_HOVER;
        var PLOT_AREA_CLICK = constants.PLOT_AREA_CLICK;
        var PLOT_AREA_HOVER = constants.PLOT_AREA_HOVER;
        var DRAG = constants.DRAG;
        var DRAG_END = constants.DRAG_END;
        var DRAG_START = constants.DRAG_START;
        var ZOOM_START = constants.ZOOM_START;
        var ZOOM = constants.ZOOM;
        var ZOOM_END = constants.ZOOM_END;
        var SELECT_START = constants.SELECT_START;
        var SELECT = constants.SELECT;
        var SELECT_END = constants.SELECT_END;
        var RENDER = constants.RENDER;
        var NOTE_CLICK = constants.NOTE_CLICK;
        var NOTE_HOVER = constants.NOTE_HOVER;
        var CHANGE = 'change';
        var DATABOUND = 'dataBound';
        var LEAVE = 'leave';
        var VALUE = constants.VALUE;
        var PIE = constants.PIE;
        var DONUT = constants.DONUT;
        var FUNNEL = constants.FUNNEL;
        var Observable = kendo.Observable;
        var TOOLTIP_ANIMATION_DURATION = 150;
        var TOOLTIP_SHOW_DELAY = 100;
        var TOOLTIP_INVERSE = 'k-chart-tooltip-inverse';
        var SHARED_TOOLTIP_CLASS = 'k-chart-shared-tooltip';
        services.DomEventsBuilder.register({
            create: function (element, events) {
                return new kendo.UserEvents(element, deepExtend({
                    global: true,
                    multiTouch: true,
                    fastTap: true
                }, events));
            }
        });
        var ChartInstanceObserver = InstanceObserver.extend({
            handlerMap: {
                showTooltip: '_showTooltip',
                hideTooltip: '_hideTooltip',
                legendItemClick: '_onLegendItemClick',
                render: '_onRender'
            }
        });
        var Chart = Widget.extend({
            init: function (element, userOptions) {
                var dataSource;
                kendo.destroy(element);
                Widget.fn.init.call(this, element);
                if (userOptions) {
                    dataSource = userOptions.dataSource;
                    delete userOptions.dataSource;
                }
                this.options = deepExtend({}, this.options, userOptions);
                this.wrapper = this.element;
                this._attachEvents();
                if (userOptions) {
                    userOptions.dataSource = dataSource;
                }
                this._seriesVisibility = new SeriesVisibilityState();
                this.bind(this.events, this.options);
                this._initDataSource(userOptions);
                kendo.notify(this, dataviz.ui);
            },
            events: [
                DATABOUND,
                SERIES_CLICK,
                SERIES_HOVER,
                AXIS_LABEL_CLICK,
                LEGEND_ITEM_CLICK,
                LEGEND_ITEM_HOVER,
                PLOT_AREA_CLICK,
                PLOT_AREA_HOVER,
                DRAG_START,
                DRAG,
                DRAG_END,
                ZOOM_START,
                ZOOM,
                ZOOM_END,
                SELECT_START,
                SELECT,
                SELECT_END,
                NOTE_CLICK,
                NOTE_HOVER,
                RENDER
            ],
            options: {
                name: 'Chart',
                renderAs: '',
                theme: 'default',
                chartArea: {},
                legend: {},
                categoryAxis: {},
                autoBind: true,
                seriesDefaults: {},
                series: [],
                seriesColors: null,
                tooltip: {},
                transitions: true,
                valueAxis: {},
                plotArea: {},
                title: {},
                xAxis: {},
                yAxis: {},
                panes: [{}],
                pannable: false,
                zoomable: false
            },
            items: function () {
                return $();
            },
            refresh: function () {
                var chart = this;
                var instance = chart._instance;
                instance.applyDefaults(chart.options);
                instance.applySeriesColors();
                chart._bindSeries();
                chart._bindCategories();
                chart.trigger(DATABOUND);
                chart._redraw();
            },
            getSize: function () {
                return kendo.dimensions(this.element);
            },
            redraw: function (paneName) {
                this._size = null;
                this._instance.redraw(paneName);
            },
            setOptions: function (options) {
                var chart = this, dataSource = options.dataSource;
                delete options.dataSource;
                Widget.fn._setEvents.call(chart, options);
                this._instance.applyOptions(options, this._getThemeOptions(options));
                this.options = this._instance.options;
                this._tooltip.setOptions(this.options.tooltip);
                this._sourceSeries = null;
                if (dataSource) {
                    chart.setDataSource(dataSource);
                }
                if (chart._hasDataSource) {
                    chart._onDataChanged();
                } else {
                    chart._bindCategories();
                    chart.redraw();
                }
                chart._instance.updateMouseMoveHandler();
            },
            setDataSource: function (dataSource) {
                var chart = this;
                chart.dataSource.unbind(CHANGE, chart._dataChangeHandler);
                chart.dataSource = dataSource = DataSource.create(dataSource);
                chart._hasDataSource = true;
                chart._hasData = false;
                dataSource.bind(CHANGE, chart._dataChangeHandler);
                if (chart.options.autoBind) {
                    dataSource.fetch();
                }
            },
            destroy: function () {
                var chart = this, dataSource = chart.dataSource;
                chart.element.off(NS);
                if (dataSource) {
                    dataSource.unbind(CHANGE, chart._dataChangeHandler);
                }
                if (chart._instance) {
                    chart._instance.destroy();
                    delete this._instance;
                }
                if (this._tooltip) {
                    this._tooltip.destroy();
                    delete this._tooltip;
                }
                this._destroyCrosshairTooltips();
                Widget.fn.destroy.call(chart);
            },
            findPaneByName: function (name) {
                var panes = this._plotArea.panes;
                for (var idx = 0; idx < panes.length; idx++) {
                    if (panes[idx].options.name === name) {
                        return new ChartPane(this, panes[idx]);
                    }
                }
            },
            findPaneByIndex: function (idx) {
                var panes = this._plotArea.panes;
                if (panes[idx]) {
                    return new ChartPane(this, panes[idx]);
                }
            },
            findSeries: function (callback) {
                var plotArea = this._plotArea;
                var series = plotArea.srcSeries || plotArea.series;
                for (var idx = 0; idx < series.length; idx++) {
                    if (callback(series[idx])) {
                        return new ChartSeries(this, series[idx]);
                    }
                }
            },
            findSeriesByName: function (name) {
                return this._createSeries({ name: name });
            },
            findSeriesByIndex: function (index) {
                return this._createSeries({ index: index });
            },
            _createSeries: function (options) {
                var seriesOptions = this._seriesOptions(options);
                if (seriesOptions) {
                    return new ChartSeries(this, seriesOptions);
                }
            },
            _seriesOptions: function (options) {
                var plotArea = this._plotArea;
                var series = plotArea.srcSeries || plotArea.series;
                var seriesOptions;
                if (defined(options.index)) {
                    seriesOptions = series[options.index];
                } else if (defined(options.name)) {
                    for (var idx = 0; idx < series.length; idx++) {
                        if (series[idx].name === options.name) {
                            seriesOptions = series[idx];
                            break;
                        }
                    }
                }
                return seriesOptions;
            },
            _attachEvents: function () {
                this.element.on(MOUSELEAVE_NS, proxy(this._mouseleave, this));
            },
            _mouseleave: function (e) {
                var instance = this._instance;
                var tooltip = this._tooltip;
                var target = e.relatedTarget;
                if (!(target && $(target).closest(tooltip.element).length) && instance && !instance.handlingTap) {
                    instance.hideElements();
                }
            },
            _getThemeOptions: function (userOptions) {
                var themeName = (userOptions || {}).theme;
                if (themeName === 'sass' || themeName === 'default-v2' || themeName === 'bootstrap-v4') {
                    return dataviz.autoTheme().chart;
                }
                if (defined(themeName)) {
                    var themes = dataviz.ui.themes || {};
                    var theme = themes[themeName] || themes[themeName.toLowerCase()] || {};
                    return theme.chart || {};
                }
            },
            _initChart: function () {
                this._createChart(this.options, this._getThemeOptions(this.options));
                this.options = this._instance.options;
            },
            _createChart: function (options, themeOptions) {
                this._instance = new KendoChart(this.element[0], options, themeOptions, {
                    observer: new ChartInstanceObserver(this),
                    sender: this
                });
            },
            _initDataSource: function (userOptions) {
                var chart = this, dataSource = (userOptions || {}).dataSource;
                chart._dataChangeHandler = proxy(chart._onDataChanged, chart);
                chart.dataSource = DataSource.create(dataSource).bind('change', chart._dataChangeHandler);
                chart._bindCategories();
                if (dataSource) {
                    chart._hasDataSource = true;
                }
                this._initChart();
                this._initTooltip();
                if (dataSource) {
                    if (chart.options.autoBind) {
                        chart.dataSource.fetch();
                    }
                }
            },
            _destroyCrosshairTooltips: function () {
                var tooltips = this._crosshairTooltips;
                if (tooltips) {
                    for (var key in tooltips) {
                        tooltips[key].destroy();
                    }
                }
                this._crosshairTooltips = {};
            },
            _getCrosshairTooltip: function (name, index) {
                var tooltips = this._crosshairTooltips = this._crosshairTooltips || {};
                var key = name + index;
                var tooltip = tooltips[key];
                if (!tooltip) {
                    tooltip = tooltips[key] = new CrosshairTooltip(this.element);
                }
                return tooltip;
            },
            _showTooltip: function (e) {
                if (e.crosshair) {
                    var tooltip = this._getCrosshairTooltip(e.axisName, e.axisIndex);
                    tooltip.show(e);
                } else if (this._tooltip) {
                    this._tooltip.show(e);
                }
            },
            _hideTooltip: function (e) {
                if (e.crosshair) {
                    var tooltip = this._getCrosshairTooltip(e.axisName, e.axisIndex);
                    tooltip.hide();
                } else if (this._tooltip) {
                    this._tooltip.hide(e);
                }
            },
            _onRender: function (e) {
                this._destroyCrosshairTooltips();
                this._copyMembers(e.sender);
                if (!this._hasDataSource || this._hasData || !this.options.autoBind) {
                    this.trigger(RENDER);
                }
            },
            _copyMembers: function (instance) {
                this._instance = instance;
                this.options = instance.options;
                this._originalOptions = instance._originalOptions;
                this.surface = instance.surface;
                this._plotArea = instance._plotArea;
                this._model = instance._model;
                this._highlight = instance._highlight;
                this._selections = instance._selections;
                this._pannable = instance._pannable;
                this._zoomSelection = instance._zoomSelection;
                this._mousewheelZoom = instance._mousewheelZoom;
            },
            requiresHandlers: function (names) {
                var events = this._events;
                for (var idx = 0; idx < names.length; idx++) {
                    if (defined(events[names[idx]])) {
                        return true;
                    }
                }
            },
            _initTooltip: function () {
                this._tooltip = this._createTooltip();
                this._tooltip.bind(LEAVE, proxy(this._tooltipleave, this));
            },
            _onLegendItemClick: function (e) {
                if (!this.trigger(LEGEND_ITEM_CLICK, e)) {
                    this._legendItemClick(e.seriesIndex, e.pointIndex);
                }
            },
            _legendItemClick: function (seriesIndex, pointIndex) {
                var chart = this._instance, plotArea = chart._plotArea, currentSeries = (plotArea.srcSeries || plotArea.series)[seriesIndex];
                if ($.inArray(currentSeries.type, [
                        PIE,
                        DONUT,
                        FUNNEL
                    ]) >= 0) {
                    var pointVisibility = currentSeries.pointVisibility = currentSeries.pointVisibility || {};
                    var visible = pointVisibility[pointIndex];
                    pointVisibility[pointIndex] = defined(visible) ? !visible : false;
                } else {
                    currentSeries.visible = !currentSeries.visible;
                    this._seriesVisibility.save(currentSeries);
                }
                chart._noTransitionsRedraw();
            },
            _createTooltip: function () {
                return new Tooltip(this.element, this.options.tooltip);
            },
            _tooltipleave: function () {
                var chart = this._instance, plotArea = chart._plotArea, highlight = chart._highlight;
                plotArea.hideCrosshairs();
                highlight.hide();
            },
            _bindData: function (e) {
                var chart = this, options = chart.options, series = chart._sourceSeries || options.series, seriesIx, seriesLength = series.length, data = chart.dataSource.view(), grouped = (chart.dataSource.group() || []).length > 0, processedSeries = [], seriesVisibility = this._seriesVisibility, currentSeries, groupedSeries;
                for (seriesIx = 0; seriesIx < seriesLength; seriesIx++) {
                    currentSeries = series[seriesIx];
                    if (chart._isBindable(currentSeries) && grouped) {
                        groupedSeries = groupSeries(currentSeries, data);
                        processedSeries = processedSeries.concat(groupedSeries);
                        seriesVisibility.applyByGroup(groupedSeries, e);
                    } else {
                        currentSeries = extend({}, currentSeries);
                        processedSeries.push(currentSeries);
                        seriesVisibility.applyByIndex(currentSeries, e);
                    }
                }
                chart._sourceSeries = series;
                options.series = processedSeries;
                this._instance.applySeriesColors();
                chart._bindSeries();
                chart._bindCategories();
                this._hasData = true;
            },
            _onDataChanged: function (e) {
                this._bindData(e);
                this.trigger(DATABOUND);
                this._redraw();
            },
            _bindSeries: function () {
                var chart = this, data = chart.dataSource.view(), series = chart.options.series, seriesIx, seriesLength = series.length, currentSeries, groupIx, seriesData;
                for (seriesIx = 0; seriesIx < seriesLength; seriesIx++) {
                    currentSeries = series[seriesIx];
                    if (chart._isBindable(currentSeries)) {
                        groupIx = currentSeries._groupIx;
                        seriesData = defined(groupIx) ? (data[groupIx] || {}).items : data;
                        if (currentSeries.autoBind !== false) {
                            currentSeries.data = seriesData;
                        }
                    }
                }
            },
            _bindCategories: function () {
                var chart = this, data = chart.dataSource.view() || [], grouped = (chart.dataSource.group() || []).length > 0, categoriesData = data, options = chart.options, definitions = [].concat(options.categoryAxis), axisIx, axis;
                if (grouped) {
                    if (data.length) {
                        categoriesData = data[0].items;
                    }
                }
                for (axisIx = 0; axisIx < definitions.length; axisIx++) {
                    axis = definitions[axisIx];
                    if (axis.autoBind !== false) {
                        chart._bindCategoryAxis(axis, categoriesData, axisIx);
                    }
                }
            },
            _bindCategoryAxis: function (axis, data, axisIx) {
                var count = (data || []).length, categoryIx, category, row;
                if (axis.field) {
                    axis.categories = [];
                    for (categoryIx = 0; categoryIx < count; categoryIx++) {
                        row = data[categoryIx];
                        category = getField(axis.field, row);
                        if (categoryIx === 0) {
                            axis.categories = [category];
                            axis.dataItems = [row];
                        } else {
                            axis.categories.push(category);
                            axis.dataItems.push(row);
                        }
                    }
                } else if (this._instance) {
                    this._instance.bindCategoryAxisFromSeries(axis, axisIx);
                }
            },
            _isBindable: function (series) {
                var valueFields = SeriesBinder.current.valueFields(series), result = true, field, i;
                for (i = 0; i < valueFields.length; i++) {
                    field = valueFields[i];
                    if (field === VALUE) {
                        field = 'field';
                    } else {
                        field = field + 'Field';
                    }
                    if (!defined(series[field])) {
                        result = false;
                        break;
                    }
                }
                return result;
            }
        });
        var proxyMembers = [
            'getAxis',
            'findAxisByName',
            'plotArea',
            'toggleHighlight',
            'showTooltip',
            'hideTooltip',
            'exportVisual',
            '_resize',
            '_redraw',
            '_noTransitionsRedraw',
            '_legendItemHover',
            '_eventCoordinates'
        ];
        function createProxyMember(name) {
            Chart.fn[name] = function () {
                var instance = this._instance;
                if (instance) {
                    return instance[name].apply(instance, arguments);
                }
            };
        }
        for (var idx = 0; idx < proxyMembers.length; idx++) {
            createProxyMember(proxyMembers[idx]);
        }
        function groupSeries(series, data) {
            var result = [], nameTemplate, legacyTemplate = series.groupNameTemplate, groupIx, dataLength = data.length, seriesClone;
            if (dataLength === 0) {
                seriesClone = deepExtend({}, series);
                seriesClone.visibleInLegend = false;
                return [seriesClone];
            }
            if (defined(legacyTemplate)) {
                kendo.logToConsole('\'groupNameTemplate\' is obsolete and will be removed in future versions. ' + 'Specify the group name template as \'series.name\'');
                if (legacyTemplate) {
                    nameTemplate = template(legacyTemplate);
                }
            } else {
                nameTemplate = template(series.name || '');
                if (nameTemplate._slotCount === 0) {
                    nameTemplate = template(defined(series.name) ? '#= group.value #: #= series.name #' : '#= group.value #');
                }
            }
            for (groupIx = 0; groupIx < dataLength; groupIx++) {
                seriesClone = deepExtend({}, series);
                if (!kendo.isFunction(seriesClone.color)) {
                    seriesClone.color = undefined;
                }
                seriesClone._groupIx = groupIx;
                seriesClone._groupValue = data[groupIx].value;
                result.push(seriesClone);
                if (nameTemplate) {
                    seriesClone.name = nameTemplate({
                        series: seriesClone,
                        group: data[groupIx]
                    });
                }
            }
            return result;
        }
        dataviz.ExportMixin.extend(Chart.fn);
        if (kendo.PDFMixin) {
            kendo.PDFMixin.extend(Chart.fn);
        }
        dataviz.ui.plugin(Chart);
        var SeriesVisibilityState = Class.extend({
            init: function () {
                this.groups = {};
                this.index = {};
            },
            applyByGroup: function (series, e) {
                if (e && e.action) {
                    for (var idx = 0; idx < series.length; idx++) {
                        if (this.groups[series[idx]._groupValue] === false) {
                            series[idx].visible = false;
                        }
                    }
                } else {
                    this.groups = {};
                }
            },
            applyByIndex: function (series, e) {
                if (e && e.action) {
                    if (this.index[series.index] === false) {
                        series.visible = false;
                    }
                } else {
                    this.index = {};
                }
            },
            save: function (series) {
                if (!series) {
                    return;
                }
                if (defined(series._groupValue)) {
                    this.groups[series._groupValue] = series.visible;
                } else {
                    this.index[series.index] = series.visible;
                }
            }
        });
        var geom = kendo.geometry;
        var Tooltip = Observable.extend({
            init: function (chartElement, options) {
                var tooltip = this;
                Observable.fn.init.call(tooltip);
                this.setOptions(options);
                tooltip.chartElement = chartElement;
                tooltip.template = Tooltip.template;
                if (!tooltip.template) {
                    tooltip.template = Tooltip.template = kendo.template('<div class=\'k-tooltip k-chart-tooltip\' ' + 'style=\'display:none; position: absolute; font: #= d.font #;' + '#if (d.border) {# border: #= d.border.width #px solid; #}#' + 'opacity: #= d.opacity #; filter: alpha(opacity=#= d.opacity * 100 #);\'>' + '</div>', {
                        useWithBlock: false,
                        paramName: 'd'
                    });
                }
                tooltip.element = $(tooltip.template(tooltip.options));
                tooltip.move = proxy(tooltip.move, tooltip);
                tooltip._mouseleave = proxy(tooltip._mouseleave, tooltip);
                var mobileScrollerSelector = kendo.format('[{0}=\'content\'],[{0}=\'scroller\']', kendo.attr('role'));
                tooltip._mobileScroller = chartElement.closest(mobileScrollerSelector).data('kendoMobileScroller');
            },
            destroy: function () {
                this._clearShowTimeout();
                if (this.element) {
                    this.element.off(MOUSELEAVE_NS).remove();
                    this.element = null;
                }
            },
            setOptions: function (options) {
                this.options = deepExtend({}, this.options, options);
            },
            options: {
                opacity: 1,
                animation: { duration: TOOLTIP_ANIMATION_DURATION },
                sharedTemplate: '<table>' + '<th colspan=\'#= colspan #\'>#= categoryText #</th>' + '# for(var i = 0; i < points.length; i++) { #' + '# var point = points[i]; #' + '<tr>' + '# if(colorMarker) { # ' + '<td><span class=\'k-chart-shared-tooltip-marker\' style=\'background-color:#:point.series.color#\'></span></td>' + '# } #' + '# if(nameColumn) { # ' + '<td> #if (point.series.name) {# #: point.series.name #: #} else {# &nbsp; #}#</td>' + '# } #' + '<td>#= content(point) #</td>' + '</tr>' + '# } #' + '</table>',
                categoryFormat: '{0:d}'
            },
            move: function () {
                var tooltip = this, options = tooltip.options, element = tooltip.element, offset;
                if (!tooltip.anchor || !tooltip.element) {
                    return;
                }
                offset = tooltip._offset();
                if (!tooltip.visible) {
                    element.css({
                        top: offset.top,
                        left: offset.left
                    });
                }
                tooltip.visible = true;
                tooltip._ensureElement(document.body);
                element.stop(true, true).show().animate({
                    left: offset.left,
                    top: offset.top
                }, options.animation.duration);
            },
            _clearShowTimeout: function () {
                if (this.showTimeout) {
                    clearTimeout(this.showTimeout);
                    this.showTimeout = null;
                }
            },
            getAnchor: function (size) {
                var anchor = this.anchor;
                var point = anchor.point;
                var align = anchor.align;
                var x = point.left;
                var y = point.top;
                if (align.horizontal === 'center') {
                    x -= size.width / 2;
                } else if (align.horizontal === 'right') {
                    x -= size.width;
                }
                if (align.vertical === 'center') {
                    y -= size.height / 2;
                } else if (align.vertical === 'bottom') {
                    y -= size.height;
                }
                return {
                    x: x,
                    y: y
                };
            },
            _offset: function () {
                var tooltip = this, size = tooltip._measure(), anchor = tooltip.getAnchor(size), top = anchor.y, left = anchor.x, zoomLevel = kendo.support.zoomLevel(), viewport = $(window), scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0, scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || 0, movable = (this._mobileScroller || {}).movable;
                if (!movable || movable.scale === 1) {
                    top += tooltip._fit(top - scrollTop, size.height, outerHeight(viewport) / zoomLevel);
                    left += tooltip._fit(left - scrollLeft, size.width, outerWidth(viewport) / zoomLevel);
                } else {
                    var transform = geom.transform().scale(movable.scale, movable.scale, [
                        movable.x,
                        movable.y
                    ]);
                    var point = new geom.Point(left, top).transform(transform);
                    left = point.x;
                    top = point.y;
                }
                return {
                    top: top,
                    left: left
                };
            },
            show: function (e) {
                this.anchor = e.anchor;
                this.element.css(e.style);
                this.element.toggleClass(TOOLTIP_INVERSE, !!e.className);
                this.element.toggleClass(SHARED_TOOLTIP_CLASS, !!e.shared);
                var content = e.shared ? this._sharedContent(e) : this._pointContent(e.point);
                this.element.html(content);
                this._clearShowTimeout();
                this.showTimeout = setTimeout(this.move, TOOLTIP_SHOW_DELAY);
            },
            hide: function () {
                var tooltip = this;
                clearTimeout(tooltip.showTimeout);
                tooltip._hideElement();
                if (tooltip.visible) {
                    tooltip.point = null;
                    tooltip.visible = false;
                    tooltip.index = null;
                }
            },
            _sharedContent: function (e) {
                var points = e.points;
                var nameColumn = dataviz.grep(points, function (point) {
                    return defined(point.series.name);
                }).length;
                var colorMarker = e.series.length > 1;
                var colspan = 1;
                if (nameColumn) {
                    colspan++;
                }
                if (colorMarker) {
                    colspan++;
                }
                var template = kendo.template(this.options.sharedTemplate);
                var content = template({
                    points: points,
                    category: e.category,
                    categoryText: e.categoryText,
                    content: this._pointContent,
                    colorMarker: colorMarker,
                    nameColumn: nameColumn,
                    colspan: colspan
                });
                return content;
            },
            _measure: function () {
                this._ensureElement();
                var size = {
                    width: outerWidth(this.element),
                    height: outerHeight(this.element)
                };
                return size;
            },
            _ensureElement: function () {
                if (this.element) {
                    this.element.appendTo(document.body).on(MOUSELEAVE_NS, this._mouseleave);
                }
            },
            _mouseleave: function (e) {
                var target = e.relatedTarget;
                var chart = this.chartElement[0];
                if (target && target !== chart && !$.contains(chart, target)) {
                    this.trigger(LEAVE);
                    this.hide();
                }
            },
            _hideElement: function () {
                var tooltip = this;
                var element = this.element;
                if (element) {
                    element.fadeOut({
                        always: function () {
                            if (!tooltip.visible) {
                                element.off(MOUSELEAVE_NS).remove();
                            }
                        }
                    });
                }
            },
            _pointContent: function (point) {
                var tooltip = this, options = deepExtend({}, tooltip.options, point.options.tooltip), content, tooltipTemplate;
                if (defined(point.value)) {
                    content = point.value.toString();
                }
                if (options.template) {
                    tooltipTemplate = template(options.template);
                    content = tooltipTemplate({
                        value: point.value,
                        category: point.category,
                        series: point.series,
                        dataItem: point.dataItem,
                        percentage: point.percentage,
                        runningTotal: point.runningTotal,
                        total: point.total,
                        low: point.low,
                        high: point.high,
                        xLow: point.xLow,
                        xHigh: point.xHigh,
                        yLow: point.yLow,
                        yHigh: point.yHigh
                    });
                } else if (options.format) {
                    content = point.formatValue(options.format);
                }
                return content;
            },
            _fit: function (offset, size, viewPortSize) {
                var output = 0;
                if (offset + size > viewPortSize) {
                    output = viewPortSize - (offset + size);
                }
                if (offset < 0) {
                    output = -offset;
                }
                return output;
            }
        });
        var CrosshairTooltip = Tooltip.extend({
            init: function (chartElement, options) {
                Tooltip.fn.init.call(this, chartElement, options);
                this.element.addClass('k-chart-crosshair-tooltip');
            },
            show: function (e) {
                var element = this.element;
                if (element) {
                    this.anchor = e.anchor;
                    this.element.css(e.style);
                    this.element.html(this.content(e));
                    this.move();
                }
            },
            move: function () {
                var tooltip = this, element = tooltip.element, offset = tooltip._offset();
                tooltip._ensureElement();
                element.css({
                    top: offset.top,
                    left: offset.left
                }).show();
            },
            content: function (e) {
                var content = e.value, options = e.crosshair.options.tooltip;
                if (options.template) {
                    content = template(options.template)({ value: content });
                }
                return content;
            },
            hide: function () {
                this.element.hide();
            }
        });
        var ChartPane = Class.extend({
            init: function (chart, pane) {
                this._chart = chart;
                this._pane = pane;
                this.visual = pane.visual;
                this.chartsVisual = pane.chartContainer.visual;
                this.name = pane.options.name;
            },
            series: function () {
                var chart = this._chart;
                var seriesByPane = chart._plotArea.groupSeriesByPane();
                var series = seriesByPane[this.name || 'default'];
                var result = [];
                if (series) {
                    for (var idx = 0; idx < series.length; idx++) {
                        result.push(new ChartSeries(chart, series[idx]));
                    }
                }
                return result;
            }
        });
        var ChartSeries = Class.extend({
            init: function (chart, options) {
                this._chart = chart;
                this._options = options;
            },
            points: function (filter) {
                var points = this._points;
                if (!points) {
                    var series = this._seriesOptions();
                    var plotArea = this._chart._plotArea;
                    this._points = points = plotArea.pointsBySeriesIndex(series.index);
                }
                if (kendo.isFunction(filter)) {
                    points = this._filterPoints(points, filter);
                }
                return points;
            },
            data: function (data) {
                var series = this._seriesOptions();
                if (data) {
                    var chart = this._chart;
                    var plotArea = chart._plotArea;
                    series.data = data;
                    if (series.categoryField) {
                        var axis = plotArea.seriesCategoryAxis(series);
                        var options = [].concat(chart.options.categoryAxis);
                        chart._instance.bindCategoryAxisFromSeries(options[axis.axisIndex], axis.axisIndex);
                    }
                    chart._noTransitionsRedraw();
                    this._clearFields();
                }
                return series.data;
            },
            findPoint: function (filter) {
                var points = this.points();
                for (var idx = 0; idx < points.length; idx++) {
                    if (filter(points[idx])) {
                        return points[idx];
                    }
                }
            },
            toggleHighlight: function (show, elements) {
                if (!elements) {
                    elements = this.points();
                } else if (kendo.isFunction(elements)) {
                    elements = this.points(elements);
                } else {
                    elements = isArray(elements) ? elements : [elements];
                }
                this._chart._instance.togglePointsHighlight(show, elements);
            },
            toggleVisibility: function (visible, filter) {
                var chart = this._chart;
                var seriesOptions = this._seriesOptions();
                var hasFilter = kendo.isFunction(filter);
                if (!hasFilter) {
                    seriesOptions.visible = visible;
                    chart._seriesVisibility.save(seriesOptions);
                } else {
                    if (inArray(seriesOptions.type, [
                            PIE,
                            DONUT,
                            FUNNEL
                        ])) {
                        var data = this._filterData(filter);
                        for (var idx = 0; idx < data.length; idx++) {
                            data[idx].visible = visible;
                        }
                    } else {
                        seriesOptions.visible = function (data) {
                            return filter(data.dataItem) ? visible : true;
                        };
                    }
                }
                chart._noTransitionsRedraw();
                this._clearFields();
            },
            _filterData: function (filter) {
                var data = this._seriesOptions().data;
                var length = data.length;
                var result = [];
                for (var idx = 0; idx < length; idx++) {
                    if (filter(data[idx])) {
                        result.push(data[idx]);
                    }
                }
                return result;
            },
            _filterPoints: function (points, filter) {
                var result = [];
                var length = points.length;
                for (var idx = 0; idx < length; idx++) {
                    if (filter(points[idx])) {
                        result.push(points[idx]);
                    }
                }
                return result;
            },
            _seriesOptions: function () {
                var series = this._series;
                if (!series) {
                    series = this._series = this._chart._seriesOptions(this._options);
                }
                return series;
            },
            _clearFields: function () {
                delete this._points;
                delete this._series;
            }
        });
        dataviz.Tooltip = Tooltip;
        dataviz.CrosshairTooltip = CrosshairTooltip;
        dataviz.ChartInstanceObserver = ChartInstanceObserver;
        dataviz.ChartPane = ChartPane;
        dataviz.ChartSeries = ChartSeries;
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('kendo.dataviz.chart', [
        'dataviz/chart/kendo-chart',
        'dataviz/chart/chart'
    ], f);
}(function () {
    var __meta__ = {
        id: 'dataviz.chart',
        name: 'Chart',
        category: 'dataviz',
        description: 'The Chart widget uses modern browser technologies to render high-quality data visualizations in the browser.',
        depends: [
            'data',
            'userevents',
            'drawing',
            'dataviz.core',
            'dataviz.themes'
        ],
        features: [{
                id: 'dataviz.chart-pdf-export',
                name: 'PDF export',
                description: 'Export Chart as PDF',
                depends: ['pdf']
            }]
    };
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));