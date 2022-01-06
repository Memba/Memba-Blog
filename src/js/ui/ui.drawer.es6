/**
 * Copyright (c) 2013-2022 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-extraneous-dependencies, import/no-unresolved
import $ from 'jquery';
import 'kendo.fx';
import 'kendo.touch';
// import __ from '../app/app.i18n.es6';
// import config from '../app/app.config.jsx';
import assert from '../common/window.assert.es6';
import CONSTANTS from '../common/window.constants.es6';
// import app from '../common/window.global.es6';
// import Logger from '../common/window.logger.es6';

const {
    fx,
    ui: { Touch },
} = window.kendo;
// const logger = new Logger('ui.drawer');

/**
 * Drawer feature
 */
const feature = {
    /**
     * Name
     */
    _name: 'drawer',

    /**
     * View
     */
    VIEW: {
        APPBAR: {
            TOGGLER: '#id-drawer-button',
        },
        DRAWER: {
            _: '#id-drawer',
        },
    },

    /**
     * Show drawer
     */
    show() {
        // Drawer toggler event handler
        $(this.VIEW.APPBAR.TOGGLER).on(
            CONSTANTS.CLICK,
            this._onDrawerButtonClick.bind(this)
        );
        // Drawer swipe
        $(this.VIEW.DRAWER._).kendoTouch({
            enableSwipe: true,
            swipe: this._onDrawerSwipe.bind(this),
        });
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
     * Event handler triggered when clicking the drawer button
     * @private
     */
    _onDrawerButtonClick() {
        const drawer$ = $(this.VIEW.DRAWER._);
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
};

/**
 * Default export
 */
export default feature;
