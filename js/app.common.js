/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals define: false, require: false */

//Load styles
require('../styles/bootstrap.custom.less');
require('../styles/vendor/kendo/web/kendo.common.less');
require('../styles/fonts/kidoju.less');
require('../styles/app.page.common.less');

//Bootstrap files (toggled navbar)
require('./vendor/bootstrap/collapse.js');
require('./vendor/bootstrap/dropdown.js');

(function(f, define){
    'use strict';
    define([
        './vendor/kendo/kendo.binder',
        //'./vendor/kendo/kendo.button',
        './vendor/kendo/kendo.dropdownlist',
        './vendor/kendo/kendo.notification',
        './app.logger',
        './app.i18n',
        './app.theme'
    ], f);
})(function() {

    'use strict';

    (function ($, undefined) {

        var kendo = window.kendo,
            app = window.app,
            logger = app.logger,
            i18n = app.i18n,
            theme = app.theme,
            CHANGE = 'change';

        /**
         * Footer viewModel
         */
        var viewModel = kendo.observable({
            locale: i18n.locale(),
            theme: theme.name()
        });

        /**
         * Change event handler on viewModel
         */
        viewModel.bind(CHANGE, function(e) {
            if (e.field === 'locale') {
                i18n.locale(e.sender.get('locale'));
            } else if (e.field === 'theme') {
                theme.name(e.sender.get('theme'));
            }
        });

        /**
         * Make global for debugging
         */
        if (app.DEBUG) {
            //Make the viewModel global to watch in debugger
            window.viewModel1 = viewModel;
        }

        /**
         * Initialize notifications
         * Then display notifications using app.notification.show
         */
        function initNotifications() {

            var element = $('#notification');
            if (element.length) {
                element.kendoNotification({
                    position: {
                        top: 70,
                        right: 30
                    },
                    stacking: 'down',
                    // hide automatically after 7 seconds
                    autoHideAfter: 7000,
                    // prevent accidental hiding for 1 second
                    allowHideAfter: 1000,
                    // show a hide button
                    button: true,
                    // prevent hiding by clicking on the notification content
                    hideOnClick: false
                });
                app.notification = element.data('kendoNotification');
            } else {
                app.notification = { show: $.noop };
            }
        }

        /**
         * Wait until document is ready to initialize UI
         */
        $(document).ready(function() {

            kendo.init('body'); //, kendo.mobile.ui);
            initNotifications();
            kendo.bind('footer', viewModel);

            //Log page readiness
            logger.info({
                message: 'common elements initialized in ' + i18n.locale() ,
                module: 'app.common',
                method: '$(document).ready'
            });
        });


    }(window.jQuery));

    return window.app;

}, typeof define === 'function' && define.amd ? define : function(_, f){ 'use strict'; f(); });
