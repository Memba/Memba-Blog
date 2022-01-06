/**
 * Copyright (c) 2013-2022 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-extraneous-dependencies, import/no-unresolved
// import $ from 'jquery';
import 'kendo.binder';
import 'kendo.dropdownlist';
// import __ from '../app/app.i18n.es6';
// import config from '../app/app.config.jsx';
// import assert from '../common/window.assert.es6';
// import CONSTANTS from '../common/window.constants.es6';
// import app from '../common/window.global.es6';
// import Logger from '../common/window.logger.es6';

const { bind } = window.kendo;
// const logger = new Logger('ui.footer');

/**
 * Footer feature
 */
const feature = {
    /**
     * Name
     */
    _name: 'footer',

    /**
     * View
     */
    VIEW: {
        FOOTER: {
            _: 'footer',
        },
    },

    /**
     * Property locale
     */
    locale: 'en',

    /**
     * property theme
     */
    theme: 'urban',

    /**
     * Show
     */
    show() {
        // Init using kendo ui and kendo mobile ui (scrollers)
        // kendo.init('body', kendo.ui, kendo.mobile.ui);
        bind(this.VIEW.FOOTER._, this);
    },
};

/**
 * Default export
 */
export default feature;
