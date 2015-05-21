/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals require: false */

(function ($, undefined) {

    'use strict';

    require('../styles/app.page.post.less');
    require('./app.common.js');

    var app = window.app = window.app || {},
        logEntry = {
            module: 'app.post',
            sessionId: $('#session').val()
        };

    /**
     * Wait until document is ready to initialize UI
     */
    $(document).on('locale.loaded', function() {
        app.logger.info($.extend(logEntry, { message: 'post page initialized in ' + app.locale.value() }));
    });

}(window.jQuery));
