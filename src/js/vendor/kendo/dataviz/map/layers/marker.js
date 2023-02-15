/**
 * Kendo UI v2023.1.117 (http://www.telerik.com/kendo-ui)
 * Copyright 2023 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
import "./base.js";
import "../location.js";
import "../../../kendo.data.js";
import "../../../kendo.tooltip.js";

(function($, undefined) {
    // Imports ================================================================
    var doc = document,
        math = Math,
        indexOf = $.inArray,

        kendo = window.kendo,
        Class = kendo.Class,
        DataSource = kendo.data.DataSource,
        Tooltip = kendo.ui.Tooltip,

        dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend,

        map = dataviz.map,
        Location = map.Location,
        Layer = map.layers.Layer;

    // Implementation =========================================================
    var MarkerLayer = Layer.extend({
        init: function(map, options) {
            Layer.fn.init.call(this, map, options);

            this._markerClick = this._markerClick.bind(this);
            this.element.on("click", ".k-marker", this._markerClick);

            this.items = [];
            this._initDataSource();
        },

        destroy: function() {
            Layer.fn.destroy.call(this);

            this.element.off("click", ".k-marker", this._markerClick);

            this.dataSource.unbind("change", this._dataChange);
            this.clear();
        },

        options: {
            zIndex: 1000,
            autoBind: true,
            dataSource: {},
            locationField: "location",
            titleField: "title"
        },

        add: function(arg) {
            if (Array.isArray(arg)) {
                for (var i = 0; i < arg.length; i++) {
                    this._addOne(arg[i]);
                }
            } else {
                return this._addOne(arg);
            }
        },

        remove: function(marker) {
            marker.destroy();

            var index = indexOf(marker, this.items);
            if (index > -1) {
                this.items.splice(index, 1);
            }
        },

        clear: function() {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].destroy();
            }

            this.items = [];
        },

        update: function(marker) {
            var loc = marker.location();
            if (loc) {
                marker.showAt(this.map.locationToView(loc));

                var args = { marker: marker, layer: this };
                this.map.trigger("markerActivate", args);
            }
        },

        _reset: function() {
            Layer.fn._reset.call(this);
            var items = this.items;
            for (var i = 0; i < items.length; i++) {
                this.update(items[i]);
            }
        },

        bind: function(options, dataItem) {
            var marker = map.Marker.create(options, this.options);
            marker.dataItem = dataItem;

            var args = { marker: marker, layer: this };
            var cancelled = this.map.trigger("markerCreated", args);
            if (!cancelled) {
                this.add(marker);
                return marker;
            }
        },

        setDataSource: function(dataSource) {
            if (this.dataSource) {
                this.dataSource.unbind("change", this._dataChange);
            }

            this.dataSource = kendo.data.DataSource.create(dataSource);
            this.dataSource.bind("change", this._dataChange);

            if (this.options.autoBind) {
                this.dataSource.fetch();
            }
        },

        _addOne: function(arg) {
            var marker = Marker.create(arg, this.options);
            marker.addTo(this);

            return marker;
        },

        _initDataSource: function() {
            var dsOptions = this.options.dataSource;
            this._dataChange = this._dataChange.bind(this);
            this.dataSource = DataSource
                .create(dsOptions)
                .bind("change", this._dataChange);

            if (dsOptions && this.options.autoBind) {
                this.dataSource.fetch();
            }
        },

        _dataChange: function(e) {
            this._load(e.sender.view());
        },

        _load: function(data) {
            this._data = data;
            this.clear();

            var getLocation = kendo.getter(this.options.locationField);
            var getTitle = kendo.getter(this.options.titleField);
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                this.bind({
                    location: getLocation(dataItem),
                    title: getTitle(dataItem)
                }, dataItem);
            }
        },

        _markerClick: function(e) {
            var args = { marker: $(e.target).data("kendoMarker"), layer: this };
            this.map.trigger("markerClick", args);
        }
    });

    var Marker = Class.extend({
        init: function(options) {
            this.options = options || {};
        },

        addTo: function(parent) {
            this.layer = parent.markers || parent;
            this.layer.items.push(this);
            this.layer.update(this);
        },

        location: function(value) {
            if (value) {
                this.options.location = Location.create(value).toArray();

                if (this.layer) {
                    this.layer.update(this);
                }

                return this;
            } else {
                return Location.create(this.options.location);
            }
        },

        showAt: function(point) {
            this.render();
            this.element.css({
                left: math.round(point.x),
                top: math.round(point.y)
            });

            if (this.tooltip && this.tooltip.popup) {
                // TODO: Expose popup/tooltip updatePosition? method
                this.tooltip.popup._position();
            }
        },

        hide: function() {
            if (this.element) {
                this.element.remove();
                this.element = null;
            }

            if (this.tooltip) {
                this.tooltip.destroy();
                this.tooltip = null;
            }
        },

        destroy: function() {
            this.layer = null;
            this.hide();
        },

        render: function() {
            if (!this.element) {
                var options = this.options;
                var layer = this.layer;

                this.element = $(doc.createElement("span"))
                    .addClass("k-marker k-icon k-i-marker-" + kendo.toHyphens(options.shape || "pin"))
                    .attr("title", options.title)
                    .attr(options.attributes || {})
                    .data("kendoMarker", this)
                    .css("zIndex", options.zIndex);

                if (layer) {
                    layer.element.append(this.element);
                }

                this.renderTooltip();
            }
        },

        renderTooltip: function() {
            var marker = this;
            var title = marker.options.title;
            var options = marker.options.tooltip || {};

            if (options && Tooltip) {
                var template = options.template;
                if (template) {
                    var contentTemplate = kendo.template(template);
                    options.content = function(e) {
                        e.location = marker.location();
                        e.marker = marker;
                        return contentTemplate(e);
                    };
                }

                if (title || options.content || options.contentUrl) {
                    this.tooltip = new Tooltip(this.element, options);
                    this.tooltip.marker = this;
                }
            }
        }
    });

    Marker.create = function(arg, defaults) {
        if (arg instanceof Marker) {
            return arg;
        }

        return new Marker(deepExtend({}, defaults, arg));
    };

    // Exports ================================================================
    deepExtend(dataviz, {
        map: {
            layers: {
                marker: MarkerLayer,
                MarkerLayer: MarkerLayer
            },
            Marker: Marker
        }
    });

})(window.kendo.jQuery);
