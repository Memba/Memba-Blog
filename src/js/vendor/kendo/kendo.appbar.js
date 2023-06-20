/**
 * Kendo UI v2023.1.425 (http://www.telerik.com/kendo-ui)
 * Copyright 2023 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
import "./kendo.core.js";

var __meta__ = {
    id: "appbar",
    name: "AppBar",
    category: "web",
    depends: [ "core"]
};

var spacerTemplate = () => "<span class='k-appbar-spacer'></span>";

(function($) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        RESIZE = "resize";

    var AppBar = Widget.extend( {
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.element = $(element).addClass("k-appbar");

            if (that.options.position != "none") {
                that.element.addClass("k-appbar-" + that.options.position);
            }

            that.element
                .addClass("k-appbar-" + that.options.positionMode + " k-appbar-" + that.options.themeColor)
                .attr("role", "toolbar");

            that._initItems();
            that._attachEvents();
        },

        events: [
            RESIZE
        ],

        options: {
            name: "AppBar",
            positionMode: "static",
            position: "none",
            themeColor: "light",
            items: []
        },

        destroy: function() {
            if (this.resizeHandler) {
                kendo.unbindResize(this.resizeHandler);
                this.resizeHandler = null;
            }
            Widget.fn.destroy.call(this);
        },

        setOptions: function(options) {
            var that = this;

            if (that.options.position != "none") {
                that.element.removeClass("k-appbar-" + that.options.position);
            }

            that.element
                .removeClass("k-appbar-" + that.options.positionMode +
                      " k-appbar-" + that.options.themeColor);

            kendo.deepExtend(that.options, options);
            this.destroy();
            this.element.empty();
            this.init(this.element, this.options);
        },

        _initItems: function() {
            var that = this;
            var options = that.options;
            var items = options.items;
            var item;
            var html = "";
            var separator;

            for (var i = 0; i < items.length; i++) {
                item = items[i];

                if (item.type == "spacer") {
                    separator = $(kendo.template(spacerTemplate)({})).addClass(item.className);
                    if (item.width) {
                        separator.addClass("k-appbar-spacer-sized");
                        separator.css("width", typeof item.width === "string" ? item.width : item.width + "px");
                    }
                    html += separator[0].outerHTML;
                } else {
                    if (!item.template) {
                        throw new Error("Having a template for the contentItem is mandatory");
                    }
                    if (item.className) {
                        html += "<div class='k-appbar-section " + item.className + "'>";
                    } else {
                        html += "<div class='k-appbar-section'>";
                    }
                    html += kendo.template(item.template)({});
                    html += "</div>";
                }
            }

            that.element.html(html);
        },

        _resize: function() {
            this.trigger(RESIZE);
        },

        _attachEvents: function() {
            var that = this;

            that.resizeHandler = that._resize.bind(that);

            kendo.onResize(that.resizeHandler);
        }
    });

    ui.plugin(AppBar);
})(window.kendo.jQuery);

