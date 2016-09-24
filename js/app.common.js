/**
 * Copyright (c) 2013-2016 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals define: false, require: false */

if (typeof(require) === 'function') {
    // Load styles
    require('../styles/bootstrap.custom.less');
    require('../styles/vendor/kendo/web/kendo.common.less');
    require('../styles/fonts/kidoju.less');
    require('../styles/app.page.common.less');
    require('../styles/kidoju.tools.less'); // <-- Consider merging with app.page.common.less

    // Bootstrap files (toggled navbar)
    require('./vendor/bootstrap/collapse.js');
    require('./vendor/bootstrap/dropdown.js');
}

(function (f, define) {
    'use strict';
    define([
        './vendor/kendo/kendo.core',
        './vendor/kendo/kendo.data',
        './vendor/kendo/kendo.binder',
        './vendor/kendo/kendo.popup',
        './vendor/kendo/kendo.list',
        './vendor/kendo/kendo.dropdownlist',
        './vendor/kendo/kendo.notification',
        './window.assert',
        './window.logger',
        './app.logger',
        './app.i18n',
        './app.theme'
    ], f);
})(function () {

    'use strict';

    (function ($, undefined) {

        var kendo = window.kendo;
        var app = window.app;
        var assert = window.assert;
        var logger = new window.Logger('app.common');
        var i18n = app.i18n;
        var theme = app.theme;
        var LOADED = 'i18n.loaded';
        var CHANGE = 'change';
        var LOCALE = 'locale';
        var THEME = 'theme';
        var NOTIFICATION_SELECTOR = '#notification';

        /**
         * viewModel
         * viewModel contains any data functions
         * It does not interact with the UI except through MVVM bindings and app.notification
         * viewModel functions should follow the jQuery promise pattern to be called from controller and trigger UI changes when done
         */
        var viewModel = kendo.observable({

            // Locale (see footer)
            locale: i18n.locale(),

            // Theme (see footer)
            theme: theme.name()

        });

        // Make the viewModel global for debugging
        if (app.DEBUG) {
            window.viewModel1 = viewModel;
        }

        /**
         * controller
         * controller contains any UI function
         * controller can call viewModel but not the contrary
         */
        var controller = {

            /**
             * Initialize the viewModel
             */
            initViewModel: function () {
                viewModel.bind(CHANGE, function (e) {
                    if (e.field === LOCALE) {
                        i18n.locale(e.sender.get(LOCALE));
                    } else if (e.field === THEME) {
                        theme.name(e.sender.get(THEME));
                    }
                });
            },

            /**
             * Initialize notifications
             * Then display notifications using app.notification.show
             */
            initNotifications: function () {
                var element = $(NOTIFICATION_SELECTOR);
                assert.hasLength(element, kendo.format(assert.messages.hasLength.default, NOTIFICATION_SELECTOR));
                app.notification =  element.kendoNotification({
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
                }).data('kendoNotification');
            }

        };

        // Make the controller global for debugging
        if (app.DEBUG) {
            window.controller1 = controller;
        }

        /**
         * Wait until document is ready to initialize UI
         */
        $(document)
            .on(LOADED, function () { // LOADED occurs after document ready event

                // Init using kendo ui and kendo mobile ui (scollers)
                kendo.init('body', kendo.ui, kendo.mobile.ui);

                controller.initViewModel();
                controller.initNotifications();
                kendo.bind('footer', viewModel);

                // Log page readiness
                logger.debug({
                    message: 'common elements initialized in ' + i18n.locale(),
                    method: LOADED
                });
            });


    }(window.jQuery));

    return window.app;

}, typeof define === 'function' && define.amd ? define : function (_, f) { 'use strict'; f(); });
