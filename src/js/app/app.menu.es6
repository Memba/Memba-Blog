/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-unresolved
import $ from 'jquery';
import 'kendo.core';
import assert from '../common/window.assert.es6';
import CONSTANTS from '../common/window.constants.es6';
import Logger from '../common/window.logger.es6';
// Bootstrap files for navbar (toggle button)
import '../vendor/bootstrap/collapse';
import '../vendor/bootstrap/dropdown';
import './app.i18n'; // TODO review

const { i18n, uris } = window.app; // TODO review
const { format, keys } = window.kendo;
const logger = new Logger('app.menu');
const SEARCH_INPUT_SELECTOR = '#navbar-search-input';
const ACTIVE_CLASS = 'k-state-active';

/**
 * Event handler triggered when the search input loses focus
 * @param e
 */
function onSearchInputBlur(e) {
    assert.instanceof(
        $.Event,
        e,
        assert.format(assert.messages.instanceof.default, 'e', 'jQuery.Event')
    );
    $(e.currentTarget).removeClass(ACTIVE_CLASS);
}

/**
 * Event handler triggered when the search input gets focus
 * @param e
 */
function onSearchInputFocus(e) {
    assert.instanceof(
        $.Event,
        e,
        assert.format(assert.messages.instanceof.default, 'e', 'jQuery.Event')
    );
    $(e.currentTarget).addClass(ACTIVE_CLASS);
}

/**
 * Event handler triggered when pressing any key when the search input has focus
 * @param e
 */
function onSearchInputKeyPress(e) {
    assert.instanceof(
        $.Event,
        e,
        assert.format(assert.messages.instanceof.default, 'e', 'jQuery.Event')
    );
    if (e.which === keys.ENTER || e.keyCode === keys.ENTER) {
        window.location.href = `${format(
            uris.webapp.pages,
            i18n.locale()
        )}?q=${encodeURIComponent($(e.currentTarget).val())}`;
        return false; // Prevent a form submission
    }
    return true; // Accept any other character
}

/**
 * Initialization code to execute when document is ready
 */
$(() => {
    // Search input event handlers
    $(SEARCH_INPUT_SELECTOR)
        .on(CONSTANTS.BLUR, onSearchInputBlur)
        .on(CONSTANTS.FOCUS, onSearchInputFocus)
        .on(CONSTANTS.KEYPRESS, onSearchInputKeyPress);

    // Log page readiness
    logger.debug({
        message: `Menu initialized in ${i18n.locale()}`,
        method: 'document.ready'
    });
});
