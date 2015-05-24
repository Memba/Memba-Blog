/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals require: false */

(function () {

    'use strict';

    //Load common styles
    require('../styles/bootstrap.custom.less');
    require('../styles/fonts/kidoju.less');
    require('../styles/vendor/kendo/web/kendo.common.less');
    //require('../styles/vendor/kendo/web/kendo.highcontrast.less');
    //require('../styles/app.theme.highcontrast.less');

    var app = window.app = window.app || {},
        FUNCTION = 'function',
        STRING = 'string',
        UNDEFINED = 'undefined',
        THEME = 'theme',
        DEFAULT = 'default';

    /**
     * Log a message
     * @param message
     */
    function log(message) {
        if (app.DEBUG && window.console && typeof window.console.log === FUNCTION) {
            window.console.log('app.theme: ' + message);
        }
    }

    /**
     *
     */
    app.theme = {

        /**
         *
         * @param theme
         * @param callback
         */
        _load: function (theme, callback) {
            //TODO Reject unlisted theme
            var oldTheme = localStorage.getItem(THEME), loader;
            if(typeof oldTheme === STRING && oldTheme !== theme) {
                try {
                    //See https://github.com/webpack/style-loader/issues/48
                    //See https://github.com/webpack/webpack/issues/924
                    //See //https://github.com/webpack/webpack/issues/993
                    //loader = require('bundle?name=[name]!style/useable!css!less../styles/app.theme.' + oldTheme + '.less');
                    loader = require('../styles/app.theme.' + oldTheme + '.less');
                    loader(function(style) {
                        style.unuse();
                    });
                } catch(e) {
                    log(e.message);
                }
            }
            localStorage.setItem(THEME, theme);
            try {
                //loader = require('bundle?name=[name]!style/useable!css!less!../styles/app.theme.' + theme + '.less');
                loader = require('../styles/app.theme.' + theme + '.less');
                loader(function(style) {
                    style.use();
                    if (typeof callback === FUNCTION) {
                       callback();
                    }
                });
            } catch (e) {
                log(e.message);
            }
        },

        /**
         *
         * @param theme
         */
        value: function (theme) {
            if (typeof theme === STRING) {
                app.theme._load(theme);
            } else if (typeof theme === UNDEFINED) {
                return localStorage.getItem(THEME);
            } else {
                throw new TypeError('bad theme');
            }
        }

    };

    //load theme
    var theme = app.theme.value();
    if(theme) {
        app.theme.value(theme);
    } else {
        app.theme.value(DEFAULT);
    }

}());
