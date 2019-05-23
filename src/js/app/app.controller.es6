/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-unresolved
import $ from 'jquery';
// Bootstrap files for navbar (toggle button)
import '../vendor/bootstrap/collapse';
import '../vendor/bootstrap/dropdown';
import 'kendo.binder';
import 'kendo.dropdownlist';
import assert from '../common/window.assert.es6';
import CONSTANTS from '../common/window.constants.es6';
import Logger from '../common/window.logger.es6';
import i18n from './app.i18n.es6';
import config from './app.config.jsx';
import viewModel from './app.viewmodel.es6';

// Load common styles
import '../../styles/fonts/kidoju.less';

const { bind, format, keys, Observable } = window.kendo;
const logger = new Logger('app.controller');
const SELECTORS = {
    SEARCH_INPUT: 'nav.navbar input[type=search]'
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
        this.initializers = [i18n.load()];
        $.when(...this.initializers).then(() => {
            this.reveal();
            this.initNavBar();
            this.initFooter();

            // Log page readiness
            logger.debug({
                message: `Base controller initialized in ${i18n.locale}`,
                method: 'AppController.init'
            });
        });
    },

    /**
     * Reveal page
     * @method
     */
    reveal() {
        $('body>div.k-loading-image')
            .delay(400)
            .fadeOut();
    },

    /**
     * Initialize bootstrap navbar
     * @method initNavBar
     */
    initNavBar() {
        // Search input event handlers
        $(SELECTORS.SEARCH_INPUT)
            .on(CONSTANTS.BLUR, this.onSearchInputBlur.bind(this))
            .on(CONSTANTS.FOCUS, this.onSearchInputFocus.bind(this))
            .on(CONSTANTS.KEYPRESS, this.onSearchInputKeyPress.bind(this));
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
     * Event handler triggered when the search input loses focus
     * @method onSearchInputBlur
     * @param e
     */
    onSearchInputBlur(e) {
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
    onSearchInputFocus(e) {
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
    onSearchInputKeyPress(e) {
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
                i18n.locale
            )}?q=${encodeURIComponent($(e.currentTarget).val())}`;
            return false; // Prevent a form submission
        }
        return true; // Accept any other character
    }
});

/**
 * Default export
 */
export default AppController;
