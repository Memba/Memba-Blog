/**
 * Kendo UI v2023.3.1010 (http://www.telerik.com/kendo-ui)
 * Copyright 2023 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
import "./crs.js";
import "./location.js";

(function($, undefined) {
    // Imports ================================================================
    var doc = document,
        math = Math,
        min = math.min,
        pow = math.pow,

        kendo = window.kendo,
        Widget = kendo.ui.Widget,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        ui = dataviz.ui,

        g = kendo.geometry,
        Point = g.Point,

        map = dataviz.map,
        Extent = map.Extent,
        Location = map.Location,
        EPSG3857 = map.crs.EPSG3857,

        util = kendo.util,
        renderPos = util.renderPos,

        drawingUtil = kendo.drawing.util,

        defined = drawingUtil.defined,
        limit = drawingUtil.limitValue,
        valueOrDefault = drawingUtil.valueOrDefault;

    // Constants ==============================================================
    var CSS_PREFIX = "k-",
        FRICTION = 0.90,
        FRICTION_MOBILE = 0.93,
        MOUSEWHEEL = "DOMMouseScroll mousewheel",
        VELOCITY_MULTIPLIER = 5,
        DEFAULT_ZOOM_RATE = 1;

    // Map widget =============================================================
    var Map = Widget.extend({
        init: function(element, options) {
            kendo.destroy(element);
            Widget.fn.init.call(this, element);

            this._initOptions(options);
            this.bind(this.events, options);

            this.crs = new EPSG3857();

            this.element
                .addClass(CSS_PREFIX + this.options.name.toLowerCase())
                .css("position", "relative")
                .empty()
                .append(doc.createElement("div"));

            this._viewOrigin = this._getOrigin();
            this._initScroller();
            this._initMarkers();
            this._initControls();
            this._initLayers();
            this._reset();

            this._mousewheel = this._mousewheel.bind(this);
            this.element.on(MOUSEWHEEL, this._mousewheel);
        },

        options: {
            name: "Map",
            controls: {
                attribution: true,
                navigator: {
                    panStep: 100
                },
                zoom: true
            },
            layers: [],
            layerDefaults: {
                shape: {
                    style: {
                        fill: {
                            color: "#fff"
                        },
                        stroke: {
                            color: "#aaa",
                            width: 0.5
                        }
                    }
                },
                bubble: {
                    style: {
                        fill: {
                            color: "#fff",
                            opacity: 0.5
                        },
                        stroke: {
                            color: "#aaa",
                            width: 0.5
                        }
                    }
                },
                marker: {
                    shape: "pinTarget",
                    tooltip: {
                        position: "top"
                    }
                }
            },
            center: [0, 0],
            zoom: 3,
            minSize: 256,
            minZoom: 1,
            maxZoom: 19,
            markers: [],
            markerDefaults: {
                shape: "pinTarget",
                tooltip: {
                    position: "top"
                }
            },
            wraparound: true,
            messages: {
                tileTitle: "Map tile"
            }
        },

        events: [
            "beforeReset",
            "click",
            "markerActivate",
            "markerClick",
            "markerCreated",
            "pan",
            "panEnd",
            "reset",
            "shapeClick",
            "shapeCreated",
            "shapeFeatureCreated",
            "shapeMouseEnter",
            "shapeMouseLeave",
            "zoomEnd",
            "zoomStart"
        ],

        destroy: function() {
            this.scroller.destroy();

            if (this.navigator) {
                this.navigator.destroy();
            }

            if (this.attribution) {
                this.attribution.destroy();
            }

            if (this.zoomControl) {
                this.zoomControl.destroy();
            }

            this.markers.destroy();

            for (var i = 0; i < this.layers.length; i++) {
                this.layers[i].destroy();
            }

            Widget.fn.destroy.call(this);
        },

        zoom: function(level) {
            var options = this.options;

            if (defined(level)) {
                level = math.round(limit(level, options.minZoom, options.maxZoom));
                if (options.zoom !== level) {
                    options.zoom = level;
                    this._reset();
                }

                return this;
            } else {
                return options.zoom;
            }
        },

        center: function(center) {
            if (center) {
                this.options.center = Location.create(center).toArray();
                this._reset();

                return this;
            } else {
                return Location.create(this.options.center);
            }
        },

        extent: function(extent) {
            if (extent) {
                this._setExtent(extent);
                return this;
            } else {
                return this._getExtent();
            }
        },

        setOptions: function(options) {
            Widget.fn.setOptions.call(this, options);
            this._reset();
        },

        locationToLayer: function(location, zoom) {
            var clamp = !this.options.wraparound;
            location = Location.create(location);
            return this.crs.toPoint(location, this._layerSize(zoom), clamp);
        },

        layerToLocation: function(point, zoom) {
            var clamp = !this.options.wraparound;
            point = Point.create(point);
            return this.crs.toLocation(point, this._layerSize(zoom), clamp);
        },

        locationToView: function(location) {
            location = Location.create(location);
            var origin = this.locationToLayer(this._viewOrigin);
            var point = this.locationToLayer(location);

            return point.translateWith(origin.scale(-1));
        },

        viewToLocation: function(point, zoom) {
            var origin = this.locationToLayer(this._getOrigin(), zoom);
            point = Point.create(point);
            point = point.clone().translateWith(origin);
            return this.layerToLocation(point, zoom);
        },

        eventOffset: function(e) {
            var point;
            var x;
            var y;
            var offset = this.element.offset();

            if (e.x || e.y) {
                var field = "location";
                x = e.x[field] - offset.left;
                y = e.y[field] - offset.top;
                point = new g.Point(x, y);
            } else {
                var event = e.originalEvent || e;
                x = valueOrDefault(event.pageX, event.clientX) - offset.left;
                y = valueOrDefault(event.pageY, event.clientY) - offset.top;
                point = new g.Point(x, y);
            }

            return point;
        },

        eventToView: function(e) {
            var cursor = this.eventOffset(e);
            return this.locationToView(this.viewToLocation(cursor));
        },

        eventToLayer: function(e) {
            return this.locationToLayer(this.eventToLocation(e));
        },

        eventToLocation: function(e) {
            var cursor = this.eventOffset(e);
            return this.viewToLocation(cursor);
        },

        viewSize: function() {
            var element = this.element;
            var scale = this._layerSize();
            var width = element.width();

            if (!this.options.wraparound) {
                width = min(scale, width);
            }
            return {
                width: width,
                height: min(scale, element.height())
            };
        },

        exportVisual: function() {
            this._reset();
            return false;
        },

        _setOrigin: function(origin, zoom) {
            var size = this.viewSize(),
                topLeft;

            origin = this._origin = Location.create(origin);
            topLeft = this.locationToLayer(origin, zoom);
            topLeft.x += size.width / 2;
            topLeft.y += size.height / 2;

            this.options.center = this.layerToLocation(topLeft, zoom).toArray();

            return this;
        },

        _getOrigin: function(invalidate) {
            var size = this.viewSize(),
                topLeft;

            if (invalidate || !this._origin) {
                topLeft = this.locationToLayer(this.center());
                topLeft.x -= size.width / 2;
                topLeft.y -= size.height / 2;

                this._origin = this.layerToLocation(topLeft);
            }

            return this._origin;
        },

        _setExtent: function(extent) {
            var raw = Extent.create(extent);
            var se = raw.se.clone();
            if (this.options.wraparound && se.lng < 0 && extent.nw.lng > 0) {
                se.lng = 180 + (180 + se.lng);
            }

            extent = new Extent(raw.nw, se);
            this.center(extent.center());

            var width = this.element.width();
            var height = this.element.height();
            for (var zoom = this.options.maxZoom; zoom >= this.options.minZoom; zoom--) {
                var topLeft = this.locationToLayer(extent.nw, zoom);
                var bottomRight = this.locationToLayer(extent.se, zoom);

                var layerWidth = math.abs(bottomRight.x - topLeft.x);
                var layerHeight = math.abs(bottomRight.y - topLeft.y);

                if (layerWidth <= width && layerHeight <= height) {
                    break;
                }
            }

            this.zoom(zoom);
        },

        _getExtent: function() {
            var nw = this._getOrigin();
            var bottomRight = this.locationToLayer(nw);
            var size = this.viewSize();

            bottomRight.x += size.width;
            bottomRight.y += size.height;

            var se = this.layerToLocation(bottomRight);
            return new Extent(nw, se);
        },

        _zoomAround: function(pivot, level) {
            this._setOrigin(this.layerToLocation(pivot, level), level);
            this.zoom(level);
        },

        _initControls: function() {
            var controls = this.options.controls;

            if (ui.Attribution && controls.attribution) {
                this._createAttribution(controls.attribution);
            }

            if (!kendo.support.mobileOS) {
                if (ui.Navigator && controls.navigator) {
                    this._createNavigator(controls.navigator);
                }

                if (ui.ZoomControl && controls.zoom) {
                    this._createZoomControl(controls.zoom);
                }
            }
        },

        _createControlElement: function(options, defaultPos) {
            var pos = options.position || defaultPos;
            var posSelector = "." + renderPos(pos).replace(" ", ".");
            var wrap = $(".k-map-controls" + posSelector, this.element);
            if (wrap.length === 0) {
                wrap = $("<div>")
                       .addClass("k-map-controls " + renderPos(pos))
                       .appendTo(this.element);
            }

            return $("<div>").appendTo(wrap);
        },

        _createAttribution: function(options) {
            var element = this._createControlElement(options, "bottomRight");
            this.attribution = new ui.Attribution(element, options);
        },

        _createNavigator: function(options) {
            var element = this._createControlElement(options, "topLeft");
            var navigator = this.navigator = new ui.Navigator(element, options);

            this._navigatorPan = this._navigatorPan.bind(this);
            navigator.bind("pan", this._navigatorPan);

            this._navigatorCenter = this._navigatorCenter.bind(this);
            navigator.bind("center", this._navigatorCenter);
        },

        _navigatorPan: function(e) {
            var map = this;
            var scroller = map.scroller;

            var x = scroller.scrollLeft + e.x;
            var y = scroller.scrollTop - e.y;

            var bounds = this._virtualSize;
            var height = this.element.height();
            var width = this.element.width();

            // TODO: Move limits in scroller
            x = limit(x, bounds.x.min, bounds.x.max - width);
            y = limit(y, bounds.y.min, bounds.y.max - height);

            map.scroller.one("scroll", function(e) { map._scrollEnd(e); });
            map.scroller.scrollTo(-x, -y);
        },

        _navigatorCenter: function() {
            this.center(this.options.center);
        },

        _createZoomControl: function(options) {
            var element = this._createControlElement(options, "topLeft");
            var zoomControl = this.zoomControl = new ui.ZoomControl(element, options);

            this._zoomControlChange = this._zoomControlChange.bind(this);
            zoomControl.bind("change", this._zoomControlChange);
        },

        _zoomControlChange: function(e) {
            if (!this.trigger("zoomStart", { originalEvent: e })) {
                this.zoom(this.zoom() + e.delta);
                this.trigger("zoomEnd", { originalEvent: e });
            }
        },

        _initScroller: function() {
            var friction = kendo.support.mobileOS ? FRICTION_MOBILE : FRICTION;
            var zoomable = this.options.zoomable !== false;
            var scroller = this.scroller = new kendo.mobile.ui.Scroller(
                this.element.children(0), {
                    friction: friction,
                    velocityMultiplier: VELOCITY_MULTIPLIER,
                    zoom: zoomable,
                    mousewheelScrolling: false,
                    supportDoubleTap: true
                });

            scroller.bind("scroll", this._scroll.bind(this));
            scroller.bind("scrollEnd", this._scrollEnd.bind(this));
            scroller.userEvents.bind("gesturestart", this._scaleStart.bind(this));
            scroller.userEvents.bind("gestureend", this._scale.bind(this));
            scroller.userEvents.bind("doubleTap", this._doubleTap.bind(this));
            scroller.userEvents.bind("tap", this._tap.bind(this));

            this.scrollElement = scroller.scrollElement;
        },

        _initLayers: function() {
            var defs = this.options.layers,
                layers = this.layers = [];

            for (var i = 0; i < defs.length; i++) {
                var options = defs[i];
                var type = options.type || "shape";
                var defaults = this.options.layerDefaults[type];
                var impl = dataviz.map.layers[type];

                layers.push(new impl(this, deepExtend({}, defaults, options)));
            }
        },

        _initMarkers: function() {
            this.markers = new map.layers.MarkerLayer(this, this.options.markerDefaults);
            this.markers.add(this.options.markers);
        },

        _scroll: function(e) {
            var origin = this.locationToLayer(this._viewOrigin).round();
            var movable = e.sender.movable;

            var offset = new g.Point(movable.x, movable.y).scale(-1).scale(1 / movable.scale);
            origin.x += offset.x;
            origin.y += offset.y;

            this._scrollOffset = offset;

            this._setOrigin(this.layerToLocation(origin));
            this.trigger("pan", {
                originalEvent: e,
                origin: this._getOrigin(),
                center: this.center()
            });
        },

        _scrollEnd: function(e) {
            if (!this._scrollOffset || !this._panComplete()) {
                return;
            }

            this._scrollOffset = null;
            this._panEndTS = new Date();

            this.trigger("panEnd", {
                originalEvent: e,
                origin: this._getOrigin(),
                center: this.center()
            });
        },

        _panComplete: function() {
            return new Date() - (this._panEndTS || 0) > 50;
        },

        _scaleStart: function(e) {
            if (this.trigger("zoomStart", { originalEvent: e })) {
                var touch = e.touches[1];
                if (touch) {
                    touch.cancel();
                }
            }
        },

        _scale: function(e) {
            var scale = this.scroller.movable.scale;
            var zoom = this._scaleToZoom(scale);
            var gestureCenter = new g.Point(e.center.x, e.center.y);
            var centerLocation = this.viewToLocation(gestureCenter, zoom);
            var centerPoint = this.locationToLayer(centerLocation, zoom);
            var originPoint = centerPoint.translate(-gestureCenter.x, -gestureCenter.y);

            this._zoomAround(originPoint, zoom);
            this.trigger("zoomEnd", { originalEvent: e });
        },

        _scaleToZoom: function(scaleDelta) {
            var scale = this._layerSize() * scaleDelta;
            var tiles = scale / this.options.minSize;
            var zoom = math.log(tiles) / math.log(2);

            return math.round(zoom);
        },

        _reset: function() {
            if (this.attribution) {
                this.attribution.filter(this.center(), this.zoom());
            }

            this._viewOrigin = this._getOrigin(true);
            this._resetScroller();
            this.trigger("beforeReset");
            this.trigger("reset", {
                tileTitle: this.options.messages.tileTitle
            });
        },

        _resetScroller: function() {
            var scroller = this.scroller;
            var x = scroller.dimensions.x;
            var y = scroller.dimensions.y;
            var scale = this._layerSize();
            var nw = this.extent().nw;
            var topLeft = this.locationToLayer(nw).round();

            scroller.movable.round = true;
            scroller.reset();
            scroller.userEvents.cancel();

            var zoom = this.zoom();
            scroller.dimensions.forcedMinScale = pow(2, this.options.minZoom - zoom);
            scroller.dimensions.maxScale = pow(2, this.options.maxZoom - zoom);

            var xBounds = { min: -topLeft.x, max: scale - topLeft.x };
            var yBounds = { min: -topLeft.y, max: scale - topLeft.y };

            if (this.options.wraparound) {
                xBounds.max = 20 * scale;
                xBounds.min = -xBounds.max;
            }

            if (this.options.pannable === false) {
                var viewSize = this.viewSize();
                xBounds.min = yBounds.min = 0;
                xBounds.max = viewSize.width;
                yBounds.max = viewSize.height;
            }

            x.makeVirtual();
            y.makeVirtual();
            x.virtualSize(xBounds.min, xBounds.max);
            y.virtualSize(yBounds.min, yBounds.max);

            this._virtualSize = { x: xBounds, y: yBounds };
        },

        _renderLayers: function() {
            var defs = this.options.layers,
                layers = this.layers = [],
                scrollWrap = this.scrollWrap;

            scrollWrap.empty();

            for (var i = 0; i < defs.length; i++) {
                var options = defs[i];
                var type = options.type || "shape";
                var defaults = this.options.layerDefaults[type];
                var impl = dataviz.map.layers[type];

                layers.push(new impl(this, deepExtend({}, defaults, options)));
            }
        },

        _layerSize: function(zoom) {
            zoom = valueOrDefault(zoom, this.options.zoom);
            return this.options.minSize * pow(2, zoom);
        },

        _tap: function(e) {
            if (!this._panComplete()) {
                return;
            }

            var cursor = this.eventOffset(e);
            this.trigger("click", {
                originalEvent: e,
                location: this.viewToLocation(cursor)
            });
        },

        _doubleTap: function(e) {
            var options = this.options;
            if (options.zoomable !== false) {
                if (!this.trigger("zoomStart", { originalEvent: e })) {
                    var toZoom = this.zoom() + DEFAULT_ZOOM_RATE;
                    var cursor = this.eventOffset(e);
                    var location = this.viewToLocation(cursor);
                    var postZoom = this.locationToLayer(location, toZoom);
                    var origin = postZoom.translate(-cursor.x, -cursor.y);
                    this._zoomAround(origin, toZoom);
                    this.trigger("zoomEnd", { originalEvent: e });
                }
            }
        },

        _mousewheel: function(e) {
            e.preventDefault();
            var delta = dataviz.mwDelta(e) > 0 ? -1 : 1;
            var options = this.options;
            var fromZoom = this.zoom();
            var toZoom = limit(fromZoom + delta, options.minZoom, options.maxZoom);

            if (options.zoomable !== false && toZoom !== fromZoom) {
                if (!this.trigger("zoomStart", { originalEvent: e })) {
                    var cursor = this.eventOffset(e);
                    var location = this.viewToLocation(cursor);
                    var postZoom = this.locationToLayer(location, toZoom);
                    var origin = postZoom.translate(-cursor.x, -cursor.y);
                    this._zoomAround(origin, toZoom);

                    this.trigger("zoomEnd", { originalEvent: e });
                }
            }
        }
    });

    // Exports ================================================================
    dataviz.ui.plugin(Map);

})(window.kendo.jQuery);
