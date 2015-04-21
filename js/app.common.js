/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals require: false */

(function ($, undefined) {

    'use strict';

    //Theming
    require('./app.theme.js');
    require('../styles/app.page.common.less');

    //Kendo UI files
    require('./vendor/kendo/kendo.binder.js');
    require('./vendor/kendo/kendo.button.js');
    require('./vendor/kendo/kendo.dropdownlist.js');
    require('./vendor/kendo/kendo.notification.js');
    require('./vendor/kendo/kendo.window.js');

    //Bootstrap files (toggled navbar)
    require('./vendor/bootstrap/collapse.js');
    require('./vendor/bootstrap/dropdown.js');

    //Localization
    require('./app.locale.js');

    var kendo = window.kendo,
        app = window.app = window.app || {},
        CHANGE = 'change',
        KEYPRESS = 'keypress',
        REGEX_FIND = /^\/[a-z]{2}\/?$/;

    /**
     * Logs a message
     * @param message
     */
    function log(message) {
        if (app.DEBUG && window.console && ($.isFunction(window.console.log))) {
            window.console.log('app.common: ' + message);
        }
    }

    /**
     * Initialize the header
     */
    function initHeader() {
        //Search input
        $('#navbar-search-input')
            .on(KEYPRESS, onSearchInputKeyPress);
    }

    /**
     * Initialize the footer
     */
    function initFooter() {
        //language
        var languageDropDownList = $('#footer-settings-language').data('kendoDropDownList');
        if (languageDropDownList instanceof kendo.ui.DropDownList) {
            languageDropDownList.bind(CHANGE, function(e) {
                app.locale.value(e.sender.value());
            });
        }
        //theme
        var themeDropDownList = $('#footer-settings-theme').data('kendoDropDownList');
        if (themeDropDownList instanceof kendo.ui.DropDownList) {
            themeDropDownList.bind(CHANGE, function(e) {
                app.theme.value(e.sender.value());
            });
        }
    }

    /**
     * Hide preload icon
     */
    function hidePreload() {
        //See http://blogs.telerik.com/kendoui/posts/11-10-06/foujui_flash_of_uninitialized_javascript_ui
        $('body>div.k-loading-image').fadeOut();
        //$("#preLoad").css("opacity","0").css("visibility","hidden");
    }


    /**
     * Initialize notifications
     */
    function initNotifications() {

        var element = $('#notification');
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

        //Thereafter, making notifications consists in calling app.notification.show
    }

    /**
     * Event handler triggered when pressing any key when the search input has focus
     * @param e
     */
    function onSearchInputKeyPress(e) {
        if (e.which === kendo.keys.ENTER || e.keyCode === kendo.keys.ENTER) {
            $(e.currentTarget).blur(); //to trigger the input change event otherwise the viewModel is not updated
            var hash = viewModel.search.getHash(false);
            if (REGEX_FIND.test(window.location.pathname)) { //on the find page?
                window.location.hash = hash;
            } else { //anywhere else
                var locale = viewModel.get('locale');
                window.location.assign(kendo.format(app.uris.webapp.finder, locale) + hash);
            }
            return false; // Prevent a form submission
        } else {
            return true; //accept any other character
        }
    }

    /**
     * Event handler triggered when clicking the signin icon in the navbar
     * @param e
     */
    function onResetButtonClick(e) {
        e.preventDefault();
        var resetWindow = $('#reset-window').data('kendoWindow');
        if (resetWindow instanceof kendo.ui.Window) {
            resetWindow.center().open();
        }
    }

    /**
     * Common viewModel (header and footer)
     */
    var viewModel = kendo.observable({

        //UI locale (footer.ejs)
        locale: app.locale.value(),

        //UI theme (footer.ejs)
        theme: app.theme.value()

    });

    if (app.DEBUG) {
        //Make the viewModel global to watch in debugger
        window.viewModel$ = viewModel;
    }

    /**
     * Wait until document is ready to initialize UI
     */
    $(document).on('locale.loaded', function() {
        kendo.init('body'); //, kendo.mobile.ui);
        initHeader();
        initNotifications();
        initFooter();
        kendo.bind('footer', viewModel);
        hidePreload();
        log('header and footer initialized in ' + viewModel.get('locale'));
    });

}(window.jQuery));
