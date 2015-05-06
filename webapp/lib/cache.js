/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var convert = require('./convert'),
    config = require('../config'),
    enabled = config.get('cache$'), //Note: `cache` breaks webpack build
    cache = {
        menu: {},
        index: {}
    };

module.exports = {

    /**
     * Checks that cache is enabled
     * @returns {*}
     */
    isEnabled: function() {
        return enabled || false;
    },

    /**
     * Get menu for designated locale
     * @param locale
     * @returns {*}
     */
    getMenu: function(locale) {
        return cache.menu[locale];
    },

    /**
     * Set menu for designated locale
     * @param locale
     * @param menu
     */
    setMenu: function(locale, menu) {
        cache.menu[locale] = menu;
    },

    /**
     * Get index for designated locale
     * @param locale
     * @returns {*}
     */
    getIndex: function(locale) {
        return cache.index[locale];
    },

    /**
     * Set index for designated locale
     * @param locale
     * @param index
     */
    setIndex: function(locale, index) {
        cache.index[locale] = index;
    },

    /**
     * Reset cache
     * @param locale
     */
    reset: function(locale) {
        if(locale) {
            cache.menu[locale] = undefined;
            cache.index[locale] = undefined;
        } else {
            cache.menu = {};
            cache.index = {};
        }
    }

};
