/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-unresolved
import $ from 'jquery';
import 'kendo.core';
import assert from '../common/window.assert.es6';
import CONSTANTS from '../common/window.constants.es6';
import Logger from '../common/window.logger.es6';

const { dataviz, roleSelector /* , support */ } = window.kendo;
const logger = new Logger('app.themer');

const THEME = 'theme';
// This list list the web theme to load for a mobile or web theme
// Attention! this theme should be imported in the corresponding app.theme.* file
/*
const THEMES = {
    'android-dark': 'black', // <------- mobile only
    'android-light': 'fiori', // <------- mobile only
    black: 'black',
    blackberry: 'black', // <------- mobile only
    blueopal: 'blueopal',
    bootstrap: 'bootstrap',
    default: 'default',
    // 'default-v2': 'default-v2',
    fiori: 'fiori',
    flat: 'flat',
    highcontrast: 'highcontrast',
    ios: 'bootstrap', // <------- mobile only
    ios7: 'bootstrap', // <------- mobile only
    material: 'material',
    'material-dark': 'materialblack', // <------- mobile only
    'material-light': 'material', // <------- mobile only
    materialblack: 'materialblack',
    meego: 'bootstrap', // <------- mobile only
    metro: 'metro',
    metroblack: 'metroblack',
    moonlight: 'moonlight',
    nova: 'nova',
    office365: 'office365',
    silver: 'silver',
    uniform: 'uniform',
    'wp-dark': 'metroblack', // <------- mobile only
    'wp-light': 'metro' // <------- mobile only
};
const DEFAULT = 'flat';
*/
const THEMES = {
    black: 'black',
    bootstrap: 'bootstrap',
    flat: 'flat',
    highcontrast: 'highcontrast',
    indigo: 'indigo',
    memba: 'memba',
    nordic: 'nordic',
    turquoise: 'turquoise',
    urban: 'urban',
    vintage: 'vintage',
};
const DEFAULT = 'flat';

let localStorage; // = window.localStorage;
// An exception is catched when localStorage is explicitly disabled
// in browser settings (Safari Private Browsing)
try {
    ({ localStorage } = window);
} catch (ex) {} // eslint-disable-line no-empty

// find a match in querystring (embedded player)
const matches = /[?|&]theme=([^&]+)/.exec(window.location.search);

/**
 * Themer
 * // TODO Consider making this a class
 */
const themer = {
    /**
     * Load a theme
     * @param theme
     */
    load(theme) {
        assert.typeOrUndef(
            CONSTANTS.STRING,
            theme,
            assert.format(
                assert.messages.typeOrUndef.default,
                theme,
                CONSTANTS.STRING
            )
        );
        const dfd = $.Deferred();
        let oldTheme = localStorage && localStorage.getItem(THEME);
        let newTheme;
        if (
            $.type(oldTheme) !== CONSTANTS.STRING ||
            $.type(THEMES[oldTheme]) === CONSTANTS.UNDEFINED
        ) {
            oldTheme = undefined;
        }
        if (
            $.type(theme) !== CONSTANTS.STRING ||
            $.type(THEMES[theme]) === CONSTANTS.UNDEFINED
        ) {
            newTheme = oldTheme || DEFAULT;
        } else {
            newTheme = theme;
        }
        let loader;
        if ($.type(oldTheme) === CONSTANTS.STRING && oldTheme !== newTheme) {
            // See https://github.com/webpack/style-loader/issues/48
            // See https://github.com/webpack/webpack/issues/924
            // See https://github.com/webpack/webpack/issues/993
            // eslint-disable-next-line global-require, import/no-dynamic-require
            loader = require(`../../styles/themes/app.theme.${oldTheme}.scss`);
            loader((style) => {
                style.default.unuse(); // Use default with style-loader@2+
            });
        }
        // eslint-disable-next-line global-require, import/no-dynamic-require
        loader = require(`../../styles/themes/app.theme.${newTheme}.scss`);
        loader((style) => {
            style.default.use(); // Use default with style-loader@2+
            if (localStorage && !$.isArray(matches)) {
                try {
                    localStorage.setItem(THEME, newTheme);
                } catch (exception) {
                    // A QuotaExceededError in raised in private browsing, which we do not care about
                    // @see https://github.com/jlchereau/Kidoju-Webapp/issues/181
                    // @see http://chrisberkhout.com/blog/localstorage-errors/
                    if (
                        !window.DOMException ||
                        !(exception instanceof window.DOMException) ||
                        exception.code !== window.DOMException.QUOTA_EXCEEDED_ERR
                    ) {
                        throw exception;
                    }
                }
            }
            // TODO Review
            // $('body>div.k-loading-image')
            //     .delay(400)
            //     .fadeIn()
            //     .fadeOut();
            $(document.documentElement)
                .removeClass(`k-${THEMES[oldTheme]}`)
                .addClass(`k-${THEMES[newTheme]}`); // Web Application
            themer.updateCharts(THEMES[newTheme]);
            themer.updateQRCodes(THEMES[newTheme]);
            logger.debug({
                message: `theme changed from ${oldTheme} to ${newTheme}`,
                method: 'load',
            });
            dfd.resolve();
        });
        return dfd.promise();
    },

    /**
     * Update dataviz charts with new theme
     * @see http://demos.telerik.com/kendo-ui/content/shared/js/theme-chooser.js
     * @param theme
     */
    updateCharts(theme) {
        assert.type(
            CONSTANTS.STRING,
            theme,
            assert.format(assert.messages.type.default, theme, CONSTANTS.STRING)
        );
        const themable = [
            'Chart',
            'TreeMap',
            'Diagram',
            'StockChart',
            'Sparkline',
            'RadialGauge',
            'LinearGauge',
        ];
        if (dataviz && $.type(theme) === CONSTANTS.STRING) {
            for (let i = 0; i < themable.length; i++) {
                // Set globally for new widgets
                const widget = dataviz.ui[themable[i]];
                if (widget) {
                    widget.fn.options.theme = theme;
                }
                // Redraw existing widgets
                const elements = $(roleSelector(themable[i].toLowerCase()));
                for (let j = 0; j < elements.length; j++) {
                    const instance = $(elements[j]).data(`kendo${themable[i]}`);
                    if (
                        instance &&
                        $.isFunction(instance.setOptions) &&
                        $.isFunction(instance.redraw)
                    ) {
                        // instance.options.theme = theme;
                        instance.setOptions({ theme });
                        instance.redraw();
                    }
                }
            }
        }
    },

    /**
     * Update QR Codes
     * QR Codes are not themable, so we need to set color and background
     * @param theme
     */
    updateQRCodes: $.noop,

    /**
     * Get/set theme
     * @param theme
     */
    name(theme) {
        assert.typeOrUndef(
            CONSTANTS.STRING,
            theme,
            assert.format(
                assert.messages.typeOrUndef.default,
                theme,
                CONSTANTS.STRING
            )
        );
        let ret;
        if ($.type(theme) !== CONSTANTS.UNDEFINED) {
            themer.load(theme);
        } else if ($.type(window.cordova) === CONSTANTS.UNDEFINED) {
            // Kidoju.WebApp
            if (
                $.isArray(matches) &&
                matches.length === 2 &&
                $.type(matches[1] === CONSTANTS.STRING)
            ) {
                // Find in query string
                ret = matches[1].trim().toLowerCase();
            } else {
                // Or get from localstorage
                try {
                    ret = localStorage && localStorage.getItem(THEME);
                } catch (ex) {} // eslint-disable-line no-empty
            }
            // Make sure we have an existing theme or revert to DEFAULT
            ret = $.type(THEMES[ret]) === CONSTANTS.STRING ? ret : DEFAULT;
        } else {
            // Kidoju.Mobile
            try {
                ret = localStorage && localStorage.getItem(THEME);
            } catch (ex) {} // eslint-disable-line no-empty

            ret = $.type(THEMES[ret]) === CONSTANTS.STRING ? ret : DEFAULT;
            /*
            // Match the theme to the OS
            if (support.mobileOS.name === 'ios' && support.mobileOS.majorVersion < 7) {
                theme = 'ios';
            } else if (support.mobileOS.name === 'ios' && support.mobileOS.majorVersion >= 7) {
                theme = 'ios7';
            } else if (THEMES[support.mobileOS.name + '-dark']) {
                theme = support.mobileOS.name + '-dark';
            } else {
                theme = support.mobileOS.name;
            }
            */
        }
        return ret;
    },
};

// TODO Remove -> use initializers
// get theme from match or from localstorage ur use DEFAULT
const theme = themer.name();
// load theme
themer.load(theme);

/**
 * Default export
 */
export default themer;
