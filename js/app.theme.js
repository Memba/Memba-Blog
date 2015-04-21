/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals define: false */

//Load CSS ASAP
require('../styles/bootstrap.custom.less');
require('../styles/fonts/kidoju.less');
require('../styles/vendor/kendo/web/kendo.common.less');
//require('../styles/vendor/kendo/web/kendo.highcontrast.less');
//require('../styles/app.theme.highcontrast.less');

(function(f, define){
    'use strict';
    //define(['./app.config.jsx?env=' + process.env.NODE_ENV], f); //<-------------------this won't work
    define([], f);
})(function(){

    'use strict';

    (function () {

        var app = window.app = window.app || {};

        /**
         * Log a message
         * @param message
         */
        function log(message) {
            if (app.DEBUG && window.console && (typeof window.console.log === 'function')) {
                window.console.log('app.theme: ' + message);
            }
        }

        app.theme = {

        };

    }());

    return window.app.theme;

}, typeof define === 'function' && define.amd ? define : function(_, f){ 'use strict'; f(); });
