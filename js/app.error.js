/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals require: false */

//---------------------------------------------------------------------------------
//Load CSS ASAP
require('../styles/app.page.error.less');

//App files
require('./app.common.js');
//---------------------------------------------------------------------------------

(function ($, undefined) {

    'use strict';

    var app = window.app = window.app || {},
        LOCALE = app.locale && $.isFunction(app.locale.getValue) ? app.locale.getValue() : 'en';

    /**
     * Logs a message
     * @param message
     */
    function log(message) {
        if (app.DEBUG && window.console && ($.isFunction(window.console.log))) {
            window.console.log('app.error: ' + message);
        }
    }

    /**
     * Wait until document is ready to initialize UI
     */
    $(document).ready(function () {
        $(document).on('locale.loaded', function() {
            log('Error page initialized in ' + LOCALE);
        });
    });

}(window.jQuery));
