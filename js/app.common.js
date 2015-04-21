/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals require: false */

//---------------------------------------------------------------------------------
//Theming
require('./app.theme.js');
require('../styles/app.page.common.less');

//Kendo UI files
require('./vendor/kendo/kendo.binder.js');
require('./vendor/kendo/kendo.button.js');
require('./vendor/kendo/kendo.dropdownlist.js');
require('./vendor/kendo/kendo.notification.js');
require('./vendor/kendo/kendo.numerictextbox.js');
require('./vendor/kendo/kendo.tooltip.js');
require('./vendor/kendo/kendo.validator.js');
require('./vendor/kendo/kendo.window.js');

//Bootstrap files
require('./vendor/bootstrap/collapse.js');

//Localization
require('./app.locale.js');

//App files
require('./app.models.js');
//---------------------------------------------------------------------------------

(function ($, undefined) {

    'use strict';

    var kendo = window.kendo,
        app = window.app = window.app || {},
        CHANGE = 'change',
        CLICK = 'click',
        KEYPRESS = 'keypress',
        OPEN = 'open',
        COMMAND = 'command',
        OK = 'ok',
        REGEX_FIND = /^\/[a-z]{2}\/?$/,
        HASHBANG = '#!',
        LOCALE = app.locale && $.isFunction(app.locale.getValue) ? app.locale.getValue() : 'en';

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
     * Initialize viewModel
     */
    function initViewModel() {
        $.when(
            viewModel.currentUser.load(),
            viewModel.newSummary.load()
        )
            .always(function () {
                kendo.bind($('header'), viewModel);
                kendo.bind($('#create-window'), viewModel); //#create-window is moved outside header by kendo ui, so it needs to be bound specifically
                kendo.bind($('footer'), viewModel);
                viewModel.bind(CHANGE, function (e) {
                    switch (e.field) {
                        case 'locale':
                            app.locale.changeLocale(this.get('locale'));
                            break;
                        case 'theme':
                            //app.theme.changeTheme(this.get('theme'));
                            break;
                    }

                });
            })
            .fail(function (xhr, status, error) {
                app.notification.error(app.culture.common.MSG_CANNOT_GET_AUTHENTICATED_USER);
            });
    }

    /**
     * Initialize the header
     */
    function initHeader() {
        //Help button and tooltips
        $('#navbar-help')
            .on(CLICK, onHelpButtonClick);

        //Search input, button and panel
        $('#navbar-search-input')
            .on(KEYPRESS, onSearchInputKeyPress);
        $('#navbar-search')
            .on(CLICK, onSearchButtonClick);
        $('#search-panel')
            .find('button').on(CLICK, onSearchPanelButtonsClick);

        //Create button and window
        $('#navbar-create')
            .on(CLICK, onCreateButtonClick);
        $('#create-window')
            .find('form').kendoValidator({
                //TODO: Ideally, kendoValidator should use the rules defined on the NewSummary model
                rules: {
                    title: function (input) {
                        if (input.is('[name="title"]')) {
                            //matches the Regex in schemaValidators.nameOrTitle
                            return /^[^\s<>][^<>]{4,998}[^\s<>]$/.test(input.val());
                        }
                        //For any other input, return true
                        return true;
                    }
                },
                messages: {
                    title: app.locale.culture.header.create.title.messages.invalid
                }
            })
            .find('button').on(CLICK, onCreateWindowButtonsClick);

        var createWindow = $('#create-window').data('kendoWindow');
        if (createWindow instanceof kendo.ui.Window) {
            createWindow.bind(OPEN, function (e) {
                //Reset viewModel
                viewModel.newSummary.reset();
                var element = $(e.sender.element);
                //Hide validation tooltips
                element.find('span.k-tooltip-validation').hide();
                //Set focus on title
                element.find('input[name="title"]').focus();
            });
        }

        //Signin button and window
        $('#navbar-signin')
            .on(CLICK, onSignInButtonClick);
        $('#signin-window')
            .find('.btn-login').on(CLICK, onSignInWindowButtonsClick);

        //Signout
        $('#navbar-signout')
            .on(CLICK, onSignOutButtonClick);
    }

    /**
     * Initialize tooltips
     */
    function initHelpTooltips() {
        $('.help').each(function (index, target) {
            $(target).kendoTooltip({
                autoHide: true,
                position: 'bottom', // "bottom", "top", "left", "right", "center"
                show: function () {
                    //Show tooltips for visible elements only
                    if (this.element.is(':visible')) {
                        //offset tooltip from target, otherwise the arrow points to the center
                        var offset = Math.ceil(this.element.height() / 2),
                            container = this.popup.element.closest('.k-animation-container'),
                            top = window.parseInt(container.css('top'));
                        if (this.arrow.hasClass('k-callout-n')) {
                            container.css('top', (top + offset + 20) + 'px');
                        } else if (this.arrow.hasClass('k-callout-s')) {
                            container.css('top', (top - offset + 5) + 'px');
                        }
                    }
                }
            });
        });
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
     * Event handler triggered when clicking the help icon in the navbar
     * @param e
     */
    function onHelpButtonClick(e) {
        e.preventDefault();
        $('.help').each(function (index, target) {
            var tooltip = $(target).data('kendoTooltip');
            if (tooltip instanceof kendo.ui.Tooltip) {
                tooltip.show();
            }
        });
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
     * Event handler triggered when clicking the search icon in the navbar
     * @param e
     */
    function onSearchButtonClick(e) {
        e.preventDefault();
        var searchPanel = $('#search-panel');
        if (searchPanel.length) {
            if (searchPanel.height() === 0 || searchPanel.is(':visible') === false) {
                kendo.fx(searchPanel).expandVertical().play();
            } else {
                kendo.fx(searchPanel).expandVertical().reverse();
            }
        }
    }

    /**
     * Event handler triggered when clicking the search button in the expansible/collapsable search panel
     * @param e
     */
    function onSearchPanelButtonsClick(e) {
        e.preventDefault();
        if ($(e.currentTarget).data(COMMAND) === OK) { //this causes possible strict violation
            var hash = viewModel.search.toHash(true);
            if (REGEX_FIND.test(window.location.pathname)) { //on the find page?
                window.location.hash = hash;
                onSearchButtonClick({preventDefault: $.noop}); //collapse search panel
            } else { //anywhere else
                var locale = viewModel.get('locale');
                window.location.assign(kendo.format(app.uris.webapp.finder, locale) + HASHBANG + hash);
            }
        }
    }

    /**
     * Event handler triggered when clicking the create icon in the navbar
     * @param e
     */
    function onCreateButtonClick(e) {
        e.preventDefault();
        var createWindow = $('#create-window').data('kendoWindow');
        if (createWindow instanceof kendo.ui.Window) {
            createWindow.center().open();
        }
    }

    /**
     * Event handler triggered when clicking the Create or Cancel button in the create (summary) window
     * @param e
     */
    function onCreateWindowButtonsClick(e) {
        e.preventDefault();
        var createWindow = $('#create-window').data('kendoWindow');
        if (createWindow instanceof kendo.ui.Window) {
            switch ($(e.currentTarget).data(COMMAND)) { //this causes strict violation
                case OK:
                    var validator = $('#create-window form').data('kendoValidator');
                    if (validator instanceof kendo.ui.Validator && validator.validate()) {
                        viewModel.newSummary.save()
                            .done(function (summary) {
                                window.location.assign(kendo.format(app.uris.webapp.summary, summary.language, summary.id) + '?draft=true');
                            })
                            .fail(function () {
                                app.notification.error(app.culture.common.MSG_CANNOT_CREATE_SUMMARY);
                            });
                    }
                    break;
                default: //case 'cancel':
                    createWindow.close();
            }
        }
    }

    /**
     * Event handler triggered when clicking the signin icon in the navbar
     * @param e
     */
    function onSignInButtonClick(e) {
        e.preventDefault();
        var signInWindow = $('#signin-window').data('kendoWindow');
        if (signInWindow instanceof kendo.ui.Window) {
            signInWindow.center().open();
        }
    }

    /**
     * Event handler triggered when clicking any of the authentication provider buttons in the signin window
     * @param e
     */
    function onSignInWindowButtonsClick(e) {
        e.preventDefault();
        var provider = $(e.currentTarget).data('provider'); //This causes possible strcit violation
        if (provider === 'twitter') { //TODO: Implement twitter
            app.notification.warning(app.culture.general.MSG_NOT_YET_IMPLEMENTED);
        } else {
            app.rapi.oauth.getSignInUrl(provider, window.location.href)
                .done(function (url) {
                    window.location.assign(url);
                })
                .fail(function () {
                    app.notification.error(app.culture.common.MSG_SIGNIN_ERROR);
                });
        }
    }

    /**
     * Event handler triggered when clicking the signout icon in the navbar
     * @param e
     */
    function onSignOutButtonClick(e) {
        e.preventDefault();
        app.rapi.oauth.signOut()
            .always(function () {
                app.cache.removeMe();
                viewModel.currentUser.reset();
            })
            .done(function (test) {
                app.notification.success(app.culture.common.MSG_SIGNOUT_SUCCESS);
            })
            .fail(function (xhr, status, error) {
                app.notification.error(app.culture.common.MSG_SIGNOUT_FAILURE);
            });
    }

    /**
     * Common viewModel (header and footer)
     */
    var viewModel = kendo.observable({

        //UI LOCALE (footer.ejs)
        locale: LOCALE,

        //UI theme (footer.ejs)
        theme: 'en', //app.theme.getValue(),

        //The current user displayed in the navbar
        currentUser: new app.models.CurrentUser({}),

        //The dropdown search panel and search textbox in the navbar
        search: new app.models.Search({}),

        //The summary in the create window
        newSummary: new app.models.NewSummary({}),

        //Categories used in search and create window
        categories: new app.models.LazyCategoryDataSource(),

        //Types used in search and create window
        types: app.culture.TYPES

    });

    if (app.DEBUG) {
        //Make the viewModel global to watch in debugger
        window.viewModel$ = viewModel;
    }

    /**
     * Wait until document is ready to initialize UI
     */
    $(document).ready(function () {
        $(document).on('locale.loaded', function() {
            kendo.init('body'); //, kendo.mobile.ui);
            initHeader();
            initHelpTooltips();
            initNotifications();
            initViewModel();
            log('Header and footer initialized in ' + LOCALE);
            //See http://blogs.telerik.com/kendoui/posts/11-10-06/foujui_flash_of_uninitialized_javascript_ui
            $('body>div.k-loading-image').fadeOut();
            //$("#preLoad").css("opacity","0").css("visibility","hidden");
        });
    });

}(window.jQuery));
