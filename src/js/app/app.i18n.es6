/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-unresolved
import $ from 'jquery';
import assert from '../common/window.assert.es6';
import CONSTANTS from '../common/window.constants.es6';
import Logger from '../common/window.logger.es6';
import config from './app.config.jsx';

const logger = new Logger('app.i18n');

window.app = window.app || {};
window.app.cultures = window.app.cultures || {};
const { cultures } = window.app;

const LANGUAGE = 'language';
const DEFAULT = 'en';

let localStorage; // = window.localStorage;
// An exception is catched when localStorage is explicitly disabled in browser settings (Safari Private Browsing)
try {
    ({ localStorage } = window);
} catch (ex) {
    // To avoid an empty block and please eslint
    localStorage = undefined;
}

/**
 * localization functions
 */
const i18n = {
    /**
     * Load culture file for locale
     * @param locale
     * @param callback
     */
    load(locale) {
        // Note: assume kendo is not yet loaded
        assert.isArray(
            config.locales,
            assert.format(assert.messages.isArray.default, 'config.locales')
        );
        assert.enum(
            config.locales,
            locale,
            assert.format(
                assert.messages.enum.default,
                'locale',
                config.locales
            )
        );

        const dfd = $.Deferred();

        // Setter called async by webpack bundle loader
        function setLocale() {
            try {
                localStorage.setItem(LANGUAGE, locale);
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
            // Load culture
            i18n.culture = cultures[locale];
            // Log readiness
            logger.debug({
                message: `${locale} locale loaded`,
                method: 'setLocale'
            });
            dfd.resolve();
        }

        if (cultures[locale]) {
            // locale already loaded
            setLocale();
        } else {
            // locale needs to be loaded (see https://github.com/webpack/webpack/issues/923)
            // eslint-disable-next-line global-require, import/no-dynamic-require
            const loader = require(`bundle-loader?name=[name]!../cultures/app.culture.${locale}.es6`);
            loader(setLocale);
        }

        return dfd.promise();
    },

    /**
     * Get/set locale
     * Value set by the server on the html element of the page base on the url
     * @param locale
     * @returns {string|string}
     */
    locale(locale) {
        assert.typeOrUndef(
            CONSTANTS.STRING,
            locale,
            assert.format(
                assert.messages.typeOrUndef.default,
                'locale',
                CONSTANTS.STRING
            )
        );
        let ret;
        if ($.type(locale) !== CONSTANTS.UNDEFINED) {
            // Note: assume kendo is not yet loaded
            assert.isArray(
                config.locales,
                assert.format(assert.messages.isArray.default, 'config.locales')
            );
            assert.enum(
                config.locales,
                locale,
                assert.format(
                    assert.messages.enum.default,
                    'locale',
                    config.locales
                )
            );
            assert.isUndefined(
                window.cordova,
                'This is not the way to change locale in phonegap/cordova'
            );

            const href = config.uris.webapp.locale.replace('{0}', locale);
            if (window.top === window.self) {
                window.location.assign(href);
            } else {
                // This is an embedded player
                window.top.location.assign(href);
            }
        } else if (
            $.type(locale) === CONSTANTS.UNDEFINED &&
            $.type(window.cordova) === CONSTANTS.UNDEFINED
        ) {
            // Kidoju-WebApp
            ret =
                document.getElementsByTagName('html')[0].getAttribute('lang') ||
                DEFAULT;
        } else if ($.type(locale) === CONSTANTS.UNDEFINED) {
            // Kidoju-Mobile
            // Note: cordova-plugin-globalization has method navigator.globalization.getLocaleName
            // but this method is asynchronous, so it is called in onDeviceReady to set LANGUAGE in window.localStorage
            ret = (localStorage && localStorage.getItem(LANGUAGE)) || DEFAULT;
        }
        return ret;
    }
};

/**
 * Initialization
 */
if ($.type(window.cordova) === CONSTANTS.UNDEFINED) {
    // In Kidoju-WebApp
    $(() => {
        // Load page locale (read from html tag)
        const locale = i18n.locale();

        // Add event handler to hide preload
        $(document).one(CONSTANTS.LOADED, () => {
            $('body>div.k-loading-image')
                .delay(400)
                .fadeOut();
        });

        // Load i18n locale
        i18n.load(locale).done(() => {
            // trigger event for localization
            $(document).trigger(CONSTANTS.LOADED);
        });
    });
} else {
    // In Kidoju-Mobile
    // Wait for Cordova to load
    document.addEventListener(
        'deviceready',
        () => {
            if (window.navigator && window.navigator.language) {
                // We have migrated from cordova-plugin-globalization
                // as recommended at https://cordova.apache.org/news/2017/11/20/migrate-from-cordova-globalization-plugin.html
                let locale =
                    i18n.locale() || window.navigator.language.substr(0, 2);
                if (config.locales.indexOf(locale) === -1) {
                    locale = DEFAULT;
                }
                i18n.load(locale).done(() => {
                    // trigger event for localization
                    $(document).trigger(CONSTANTS.LOADED);
                });
            } else {
                // Without window.navigator.language
                i18n.load(i18n.locale() || DEFAULT).done(() => {
                    // trigger event for localization
                    $(document).trigger(CONSTANTS.LOADED);
                });
            }
        },
        false
    );
}

/**
 * Default export
 */
export default i18n;
