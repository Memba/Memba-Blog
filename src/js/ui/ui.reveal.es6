/**
 * Copyright (c) 2013-2022 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-extraneous-dependencies, import/no-unresolved
import $ from 'jquery';
// import __ from '../app/app.i18n.es6';
// import config from '../app/app.config.jsx';
// import assert from '../common/window.assert.es6';
// import CONSTANTS from '../common/window.constants.es6';
// import app from '../common/window.global.es6';
// import Logger from '../common/window.logger.es6';

// const logger = new Logger('ui.reveal');

/**
 * Reveal feature
 */
const feature = {
    /**
     * Name
     */
    _name: 'reveal',

    /**
     * View
     */
    VIEW: {
        LOADING: 'body>div.k-loading-image',
    },

    /**
     * Reveal page
     * @method
     */
    show() {
        // TODO review latest kendo ui loading widgets
        $(this.VIEW.LOADING).delay(250).fadeOut();
    },
};

/**
 * Default export
 */
export default feature;
