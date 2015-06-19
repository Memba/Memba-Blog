/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals define: false, require: false */

require('../styles/app.page.error.less');

(function(f, define){
    'use strict';
    define([
        './app.logger',
        './app.i18n',
        './app.common'
    ], f);
})(function() {

    'use strict';

    (function ($, undefined) {

        var app = window.app,
            logger = app.logger,
            i18n = app.i18n;

        $(document).ready(function() {

            //Add click handler on back button
            $('#back-button').click(function() {
                window.history.back();
            });

            //Log page readiness
            logger.info({
                message: 'error page initialized in ' + i18n.locale(),
                module: 'app.error',
                method: '$(document).ready'
            });

        });

    }(window.jQuery));

    return window.app;

}, typeof define === 'function' && define.amd ? define : function(_, f){ 'use strict'; f(); });
