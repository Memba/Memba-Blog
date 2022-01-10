/**
 * Copyright (c) 2019-2022 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// TODO add app.init.es6?

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-extraneous-dependencies, import/no-unresolved
import $ from 'jquery';
import __ from './app.i18n.es6';
import themer from './app.themer.es6';

/**
 * Array of initializer promises
 * @type {*[]}
 */
const feature = {
    _name: 'initemp',

    VIEW_MODEL: {
        LOCALE: 'locale',
        THEME: 'theme',
    },

    initialize() {
        // Add initializers here
        // Make sure they all return a jQuery promise
        // Themed styles
        return $.when(
            themer.load(),
            // i18n Culture
            __.load()
        );
    },
};

/**
 * Default export
 */
export default feature;
