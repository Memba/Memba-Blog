/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-unresolved
import $ from 'jquery';
// Bootstrap dropdowns
import '../vendor/bootstrap/dropdown';
import 'kendo.binder';
import 'kendo.fx';
import 'kendo.dropdownlist';
import 'kendo.touch';
import __ from './app.i18n.es6';
import assert from '../common/window.assert.es6';
import CONSTANTS from '../common/window.constants.es6';
import Logger from '../common/window.logger.es6';
import config from './app.config.jsx';
import viewModel from './app.viewmodel.es6';

// Load common styles
import '../../styles/fonts/kidoju.less';

const {
    bind,
    format,
    fx,
    keys,
    Observable,
    ui: { Touch },
} = window.kendo;
const logger = new Logger('app.controller');
const SELECTORS = {
    DRAWER: '#id-drawer',
    LOADING: 'body>div.k-loading-image',
    SEARCH_INPUT: 'nav.navbar input[type=search]',
    TOGGLER: '#id-drawer-button',
};

/**
 * AppController
 * Controls page UI
 * @class AppController
 * @extends Observable
 */
const AppController = Observable.extend({
    /**
     * init
     * @contructor init
     */
    init() {
        Observable.fn.init.call(this);
        this.initializers = [__.load()];
        $.when(...this.initializers).then(() => {
            this.reveal();
            this.initNavBar();
            this.initFooter();

            // Log page readiness
            logger.debug({
                message: `Base controller initialized in ${__.locale}`,
                method: 'AppController.init',
            });
        });
    },

    /**
     * Reveal page
     * @method
     */
    reveal() {
        $(SELECTORS.LOADING).delay(400).fadeOut();
    },

    /**
     * Initialize bootstrap navbar
     * @method initNavBar
     */
    initNavBar() {
        // Drawer toggler event handler
        $(SELECTORS.TOGGLER).on(
            CONSTANTS.CLICK,
            this._onDrawerButtonClick.bind(this)
        );
        // Drawer swipe
        $(SELECTORS.DRAWER).kendoTouch({
            enableSwipe: true,
            swipe: this._onDrawerSwipe.bind(this),
        });
        // Search input event handlers
        $(SELECTORS.SEARCH_INPUT)
            .on(CONSTANTS.BLUR, this._onSearchInputBlur.bind(this))
            .on(CONSTANTS.FOCUS, this._onSearchInputFocus.bind(this))
            .on(CONSTANTS.KEYPRESS, this._onSearchInputKeyPress.bind(this));
    },

    /**
     * Initialize footer
     * @method initFooter
     */
    initFooter() {
        // Init using kendo ui and kendo mobile ui (scollers)
        // kendo.init('body', kendo.ui, kendo.mobile.ui);
        bind('footer', viewModel);
    },

    /**
     * Event handler triggered when clicking the drawer button
     * @private
     */
    _onDrawerButtonClick() {
        const drawer$ = $(SELECTORS.DRAWER);
        if (drawer$.is(':visible')) {
            fx(drawer$)
                .expand('horizontal')
                .duration(600) // default is 400ms
                .reverse();
        } else {
            // After clicking frenetically on the drawer button
            // It is no more possible to show the drawer
            // drawer$.show(); fixes that
            drawer$.show();
            fx(drawer$).expand('horizontal').duration(600).play();
        }
    },

    /**
     * Event handler trigger when swiping the drawer
     * @param e
     * @private
     */
    _onDrawerSwipe(e) {
        assert.isPlainObject(
            e,
            assert.format(assert.messages.isPlainObject.default, 'e')
        );
        assert.instanceof(
            Touch,
            e.sender,
            assert.format(
                assert.messages.instanceof.default,
                'e.sender',
                'kendo.ui.Touch'
            )
        );
        if (e.direction === 'left' && e.sender.element.is(':visible')) {
            this._onDrawerButtonClick();
        }
    },

    /**
     * Event handler triggered when the search input loses focus
     * @method onSearchInputBlur
     * @param e
     */
    _onSearchInputBlur(e) {
        assert.instanceof(
            $.Event,
            e,
            assert.format(
                assert.messages.instanceof.default,
                'e',
                'jQuery.Event'
            )
        );
        $(e.currentTarget)
            .closest('.k-textbox')
            .removeClass(CONSTANTS.FOCUSED_CLASS);
    },

    /**
     * Event handler triggered when the search input gets focus
     * @method onSearchInputFocus
     * @param e
     */
    _onSearchInputFocus(e) {
        assert.instanceof(
            $.Event,
            e,
            assert.format(
                assert.messages.instanceof.default,
                'e',
                'jQuery.Event'
            )
        );
        $(e.currentTarget)
            .closest('.k-textbox')
            .addClass(CONSTANTS.FOCUSED_CLASS);
    },

    /**
     * Event handler triggered when pressing any key when the search input has focus
     * @method onSearchInputKeyPress
     * @param e
     */
    _onSearchInputKeyPress(e) {
        assert.instanceof(
            $.Event,
            e,
            assert.format(
                assert.messages.instanceof.default,
                'e',
                'jQuery.Event'
            )
        );
        if (e.which === keys.ENTER || e.keyCode === keys.ENTER) {
            window.location.href = `${format(
                config.uris.webapp.pages,
                __.locale
            ).replace(/\/+$/, CONSTANTS.EMPTY)}?q=${encodeURIComponent(
                $(e.currentTarget).val()
            )}`;
            return false; // Prevent a form submission
        }
        return true; // Accept any other character
    },
});

/**
 * Default export
 */
export default AppController;
