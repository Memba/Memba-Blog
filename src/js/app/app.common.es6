/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */


    // Load styles
    require('../../styles/bootstrap.custom.less');
    require('../../styles/vendor/kendo/web/kendo.common.less');
    require('../../styles/fonts/kidoju.less');
    require('../../styles/app.page.common.less');
    require('../../styles/kidoju.tools.less'); // <-- Consider merging with app.page.common.less

    // Bootstrap files (toggled navbar)
    require('../vendor/bootstrap/collapse.js');
    require('../vendor/bootstrap/dropdown.js');

        './vendor/kendo/kendo.core',
        './vendor/kendo/kendo.data',
        './vendor/kendo/kendo.binder',
        './vendor/kendo/kendo.popup',
        './vendor/kendo/kendo.list',
        './vendor/kendo/kendo.dropdownlist',
        './vendor/kendo/kendo.notification',
        './common/window.assert.es6',
        './common/window.logger.es6',
        './app.logger',
        './app.i18n',
        './app.theme'

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

        /**
         * Wait until document is ready to initialize UI
         */
        $(document)
            .one(LOADED, function () { // LOADED occurs after document ready event

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

