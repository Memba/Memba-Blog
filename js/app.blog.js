/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals require: false */

(function ($, undefined) {

    'use strict';

    var app = window.app = window.app || {};

    require('../styles/app.page.blog.less');
    require('./app.common.js');

    /**
     * Logs a message
     * @param message
     */
    function log(message) {
        if (app.DEBUG && window.console && ($.isFunction(window.console.log))) {
            window.console.log('app.blog: ' + message);
        }
    }

    /**
     * Wait until document is ready to initialize UI
     */
    $(document).on('locale.loaded', function() {
        log('blog page initialized in ' + app.locale.value());
    });

}(window.jQuery));
