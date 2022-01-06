/**
 * Copyright (c) 2013-2022 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-extraneous-dependencies, import/no-unresolved
import $ from 'jquery';
// Bootstrap dropdowns
import '../vendor/bootstrap/dropdown';
import 'kendo.core';
import __ from '../app/app.i18n.es6';
import config from '../app/app.config.jsx';
import assert from '../common/window.assert.es6';
import CONSTANTS from '../common/window.constants.es6';
// import app from '../common/window.global.es6';
// import Logger from '../common/window.logger.es6';

const { format, keys } = window.kendo;
// const logger = new Logger('ui.appbar');

/**
 * Appbar feature
 */
const feature = {
    /**
     * Name
     */
    _name: 'appbar',

    /**
     * View
     */
    VIEW: {
        SEARCH_INPUT: 'nav.navbar input[type=search]',
    },

    /**
     * Initialize bootstrap navbar
     * @method initNavBar
     */
    show() {
        // Search input event handlers
        $(this.VIEW.SEARCH_INPUT)
            .on(CONSTANTS.BLUR, this._onSearchInputBlur.bind(this))
            .on(CONSTANTS.FOCUS, this._onSearchInputFocus.bind(this))
            .on(CONSTANTS.KEYPRESS, this._onSearchInputKeyPress.bind(this));
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
};

/**
 * Default export
 */
export default feature;