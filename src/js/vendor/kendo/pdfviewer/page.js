/**
 * Kendo UI v2023.1.117 (http://www.telerik.com/kendo-ui)
 * Copyright 2023 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
import "../kendo.drawing.js";

(function($, undefined) {
    var extend = $.extend,
        noop = $.noop,
        drawing = kendo.drawing,
        Group = drawing.Group,
        Surface = drawing.Surface,
        RENDER = "render",
        Class = kendo.Class,

        DEFAULT_DPR = 2;

    var geometryTypes = {
        Path: "path",
        MultiPath: "multipath",
        Rect: "rect",
        Image: "image",
        Text: "text"
    };

    var Page = Class.extend({
        init: function(options, viewer) {
            this.viewer = viewer;
            this.processor = options.processor;
            this.options = options;
            this.pageNumber = options.number;

            this.element = $("<div class='k-page' />");
            this.element.attr(kendo.attr("number"), this.pageNumber);

            this._updatePageSize(options);
            this.width = options.width;
            this.height = options.height;
        },
        resize: function(ratio) {
            var pageElement = this.element;

            this._updatePageSize({
                width: Math.min(pageElement.width() * ratio, this.width),
                height: Math.min(pageElement.height() * ratio, this.height)
            });
        },
        _updatePageSize: function(size) {
            this.element
                    .width(size.width)
                    .height(size.height);
        },
        destroy: function() {
            kendo.destroy(this.element);
        },
        render: noop
    });

    var DPLPage = Page.extend({
        draw: function() {
            var that = this,
                geometries = that.options.geometries;

            that.group = new Group();
            that.surface.draw(that.group);

            that._drawGeometries(geometries);

            that.viewer.trigger(RENDER, { page: this });
            kendo.ui.progress(that.element, false);
        },
        load: function() {
            var that = this;

            if (that.loaded || !that.processor)
            {
                return;
            }

            that.processor.fetchPageData(that.pageNumber).then(function(data) {
                that.options = data;
                that._initSurface();
                that.draw();
            });

            that.loaded = true;
        },
        _initSurface: function() {
            var size = {
                width: this.element.width(),
                height: this.element.height()
            };
            var surfaceOptions = extend({ width: this.width, height: this.height }, this.viewer.options.view);
            this.surface = new Surface(this.element, surfaceOptions);
            this._updatePageSize(size);
        },
        _drawGeometries: function(geometries) {
            var that = this,
                kGeometry;

            if (!geometries) {
                return;
            }

            for (var i = 0; i <= geometries.length; i++) {
                var geometry = geometries[i];

                if (!geometry) {
                    continue;
                }

                switch (geometry.type) {
                    case geometryTypes.Path:
                    case geometryTypes.MultiPath:
                        kGeometry = that._drawPath(geometry);
                        break;
                    case geometryTypes.Rect:
                        kGeometry = that._drawRect(geometry);
                        break;
                    case geometryTypes.Image:
                        kGeometry = that._drawImage(geometry);
                        break;
                    case geometryTypes.Text:
                        kGeometry = that._drawText(geometry);
                        break;
                    default:
                        kGeometry = null;
                        break;
                }

                if (kGeometry)
                {
                    that.group.append(kGeometry);
                }
            }
        },
        _drawRect: function(geometry)
        {
            var rectGeo = new kendo.geometry.Rect(geometry.point, geometry.size);

            return new drawing.Rect(rectGeo, {
                transform: this._getMatrix(geometry.transform),
                fill: geometry.fillOptions,
                stroke: geometry.strokeOptions
            });
        },

        _drawImage: function(geometry)
        {
            var imageRect = new kendo.geometry.Rect(geometry.point, geometry.size);
            return new drawing.Image(geometry.src, imageRect, {
                transform: this._getMatrix(geometry.transform)
            });
        },

        _drawText: function(geometry)
        {
            var options = {
                transform: this._getMatrix(geometry.transform),
                stroke: geometry.strokeOptions,
                fill: geometry.fillOptions,
                font: geometry.font
            };
            return new kendo.drawing.Text(geometry.content, geometry.point, options);
        },

        _drawPath: function(geometry)
        {
            var options = {
                transform: this._getMatrix(geometry.transform),
                stroke: geometry.strokeOptions,
                fill: geometry.fillOptions
            };
            var path = new drawing.MultiPath(options);

            for (var i = 0; i < geometry.paths.length; i++) {
                var subPath = geometry.paths[i];

                if (!subPath.segments)
                {
                    return;
                }

                path.moveTo.apply(path, subPath.point);

                for (var j = 0; j < subPath.segments.length; j++) {
                    var segment = subPath.segments[j];
                    var drawAction = segment.points.length === 1 ? path.lineTo : path.curveTo;
                    drawAction.apply(path, segment.points);
                }

                if (subPath.closed) {
                    path.close();
                }
            }

            return path;
        },

        _getMatrix: function(transform) {
            var matrix = Object.create(kendo.geometry.Matrix.prototype);
            kendo.geometry.Matrix.apply(matrix, transform);
            return matrix;
        }
    });

    var PDFJSPage = Page.extend({
        init: function(options, viewer) {
            var that = this,
                canvas;

            canvas = $("<canvas style='width: 100%; height: 100%;' />");
            that.canvas = canvas.get(0);

            Page.fn.init.call(that, options, viewer);
            that.canvas.width = that.width;
            that.canvas.height = that.height;

            that.element.append(canvas);
        },
        load: function(defaultScale, force) {
            var that = this,
                promise = $.Deferred();

            if (that._scale === defaultScale && !force)
            {
                return;
            } else if (that._scale && that._scale !== defaultScale && !force)
            {
                that._scale = defaultScale;
                that.render(defaultScale);
                return promise.resolve(that);
            }

            if (that.processor) {
                that.processor.fetchPageData(that.pageNumber).then(function(page) {
                    that._page = page;
                    that._renderPromise = that.render(defaultScale).then(function() {
                        that.viewer.trigger(RENDER, { page: that });
                    });
                    promise.resolve(that);
                });
            }

            that._scale = defaultScale;
            that.loaded = true;
            return promise;
        },
        render: function(scale) {
            var that = this;
            var dpr = window.devicePixelRatio >= DEFAULT_DPR ? window.devicePixelRatio : DEFAULT_DPR;
            var context = this.canvas.getContext('2d'),
                viewport = this._page.getViewport({
                    scale: scale
                });

            this.canvas.width = viewport.width * dpr;
            this.canvas.height = viewport.height * dpr;
            context.scale(dpr, dpr);

            this._scale = scale;
            this._dpr = dpr;

            if (this._renderTask)
            {
                this._renderTask.cancel();
                this._renderTask = null;
            }

            this._updatePageSize({
                width: viewport.width,
                height: viewport.height
            });

            this._renderTask = this._page.render({
                canvasContext: context,
                viewport: viewport
            });

            this._renderTextLayer(viewport);

            return this._renderTask.promise.then(function() {
                that._renderTask = null;

            }).catch(function() {});
        },
        _renderTextLayer: function(viewport) {
            var that = this;
            var page = that._page;

            if (that.textLayer) {
                that.textLayer.remove();
             }

            that.textLayer = $("<div class='k-text-layer'></div>").get(0);
            that.element.append(that.textLayer);

            page.getTextContent({
                normalizeWhitespace: true
            }).then(function(textContent) {
                $(that.textLayer).css({
                  height: viewport.height,
                  width: viewport.width
                }).html(""); // Clear content to make sure that refreshing the page will not cause duplication of the text content.

                var params = {
                    textContent: textContent,
                    container: that.textLayer,
                    viewport: viewport,
                    textDivs: [],
                    enhanceTextSelection: true
                };

                that.processor.renderTextLayer(params);
            });
        }
    });

    extend(kendo.pdfviewer.dpl, {
        geometryTypes: geometryTypes,
        Page: DPLPage
    });
    extend(kendo.pdfviewer.pdfjs, {
        Page: PDFJSPage
    });
})(window.kendo.jQuery);

