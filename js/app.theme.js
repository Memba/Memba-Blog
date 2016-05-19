/**
 * Copyright (c) 2013-2016 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals define: false, require: false */

(function (f, define) {
    'use strict';
    define([
        // We are not loading window.kendo
        './window.assert',
        './window.logger',
        './app.logger'
    ], f);
})(function () {

    'use strict';

    (function ($, undefined) {

        var app = window.app = window.app || {};
        var kendo = window.kendo;
        var logger = new window.Logger('app.theme');
        var STRING = 'string';
        var FUNCTION = 'function';
        var THEME = 'theme';
        var DEFAULT = 'flat';
        // Note: app.i18n is not yet loaded, so we need a duplicated list
        var ALL = ['black', 'blueopal', 'bootstrap', 'default', 'fiori', 'flat', 'highcontrast', 'material', 'materialblack',
            'metro', 'metroblack', 'moonlight', 'nova', 'office365', 'silver', 'uniform'];

        app.theme = {

            /**
             * Load a theme
             * @param theme
             */
            load: function (theme) {
                var dfd = $.Deferred();
                var oldTheme = localStorage.getItem(THEME);
                var loader;
                if (ALL.indexOf(theme) === -1) {
                    theme = DEFAULT;
                }
                if (typeof oldTheme === STRING && oldTheme !== theme) {
                    // See https://github.com/webpack/style-loader/issues/48
                    // See https://github.com/webpack/webpack/issues/924
                    // See https://github.com/webpack/webpack/issues/993
                    loader = require('../styles/app.theme.' + oldTheme + '.less');
                    loader(function (style) {
                        style.unuse();
                    });
                }
                loader = require('../styles/app.theme.' + theme + '.less');
                loader(function (style) {
                    style.use();
                    if (!$.isArray(matches)) {
                        localStorage.setItem(THEME, theme);
                    }
                    $(document.documentElement).removeClass('k-' + oldTheme).addClass('k-' + theme);
                    app.theme.updateCharts(theme);
                    logger.debug({
                        message: 'theme changed to ' + theme,
                        method: 'load'
                    });
                    dfd.resolve();
                });
                return dfd.promise();
            },

            /* Blocks are nested too deeply. */
            /* jshint -W073 */

            /**
             * Update dataviz charts with new theme
             * @see http://demos.telerik.com/kendo-ui/content/shared/js/theme-chooser.js
             * @param theme
             */
            updateCharts: function (theme) {
                var themable = ['Chart', 'TreeMap', 'Diagram', 'StockChart', 'Sparkline', 'RadialGauge', 'LinearGauge'];
                if (kendo.dataviz && $.type(theme) === STRING) {
                    for (var i = 0; i < themable.length; i++) {
                        // Set globally for new widgets
                        var widget = kendo.dataviz.ui[themable[i]];
                        if (widget) {
                            widget.fn.options.theme = theme;
                        }
                        // Redraw existing widgets
                        var elements = $(kendo.roleSelector(themable[i].toLowerCase()));
                        for (var j = 0; j < elements.length; j++) {
                            var instance = $(elements[j]).data('kendo' + themable[i]);
                            if (instance && $.type(instance.setOptions) === FUNCTION && $.type(instance.redraw) === FUNCTION) {
                                // instance.options.theme = theme;
                                instance.setOptions({ theme: theme });
                                instance.redraw();
                            }
                        }
                    }
                }
            },

            /* jshint +W073 */

            /**
             * Update QR Codes
             * QR Codes are not themable, so we need to set color and background
             * @param theme
             */
            updateQRCodes: function (theme) {
                // TODO
            },

            /**
             * Get/set theme name
             * @param theme
             */
            name: function (theme) {
                if ($.type(theme) === STRING) {
                    app.theme.load(theme);
                } else if (theme === undefined) {
                    if ($.isArray(matches) && matches.length === 2 && $.type(matches[1] === STRING)) {
                        return matches[1].trim().toLowerCase();
                    } else {
                        theme = localStorage.getItem(THEME);
                        return ($.type(theme) === STRING) ? theme : DEFAULT;
                    }
                } else {
                    throw new TypeError('bad theme');
                }
            }

        };

        // find a match in querystring (embedded player)
        var matches = /theme=([^&]+)/.exec(window.location.search.substr(1));
        // get theme from match or from localstorage ur use DEFAULT
        var theme = app.theme.name();
        // load theme
        app.theme.load(theme);

    }(window.jQuery));

    return window.app;

}, typeof define === 'function' && define.amd ? define : function (_, f) { 'use strict'; f(); });
