/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
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
const DEFAULT = 'en';

/*
const LANGUAGE = 'language';
let localStorage; // = window.localStorage;
// An exception is catched when localStorage is explicitly disabled in browser settings (Safari Private Browsing)
try {
    ({ localStorage } = window);
    // localStorage.getItem(LANGUAGE);
} catch (ex) {
    // To avoid an empty block and please eslint
    localStorage = undefined;
}
*/

/**
 * Internationalization
 * @class Internationalization
 */
class Internationalization {
    /**
     * Constructor
     * @constructor
     */
    constructor() {
        this._cultures = {};
    }

    /**
     * Culture getter
     */
    get culture() {
        return this._cultures[this.locale];
    }

    // TODO get language

    /**
     * Locale getter
     */
    /* eslint-disable-next-line class-methods-use-this */
    get locale() {
        // In Kidoju-WebApp, the locale is defined in the html tag
        return (
            document.getElementsByTagName('html')[0].getAttribute('lang') ||
            DEFAULT
        );

        // Kidoju-Mobile
        // Note: cordova-plugin-globalization has method navigator.globalization.getLocaleName
        // but this method is asynchronous, so it is called in onDeviceReady to set LANGUAGE in window.localStorage
        // ret = (localStorage && localStorage.getItem(LANGUAGE)) || DEFAULT;
    }

    /**
     * Locale setter
     * @param value
     */
    /*
    set locale(value) {
        assert.type(
            CONSTANTS.STRING,
            value,
            assert.format(
                assert.messages.type.default,
                'value',
                CONSTANTS.STRING
            )
        );
        // Note: assume kendo is not yet loaded
        assert.isArray(
            config.locales,
            assert.format(assert.messages.isArray.default, 'config.locales')
        );
        assert.enum(
            config.locales,
            value,
            assert.format(
                assert.messages.enum.default,
                'value',
                config.locales
            )
        );
        assert.isUndefined(
            window.cordova,
            'This is not the way to change locale in phonegap/cordova'
        );

        const href = config.uris.webapp.locale.replace('{0}', value);
        if (window.top === window.self) {
            window.location.assign(href);
        } else {
            // This is an embedded player
            window.top.location.assign(href);
        }
    }
    */

    /**
     * Load culture file for locale
     * @param value
     */
    load(value) {
        const locale = value || this.locale;
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
        if ($.type(this._cultures[locale]) === CONSTANTS.UNDEFINED) {
            const that = this;
            // locale needs to be loaded (see https://github.com/webpack/webpack/issues/923)
            // eslint-disable-next-line global-require, import/no-dynamic-require
            const loader = require(`bundle-loader?name=[name]!../cultures/app.culture.${locale}.es6`);
            loader(module => {
                /*
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
                */
                // Load culture
                that._cultures[locale] = module.default;
                // Log readiness
                logger.debug({
                    message: `${locale} locale loaded`,
                    method: 'setLocale'
                });
                dfd.resolve();
            });
        }

        return dfd.promise();
    }
}

/**
 * Initialization
 */
/*
if ($.type(window.cordova) === CONSTANTS.UNDEFINED) {
    // In Kidoju-WebApp
    $(() => {
        // Load i18n locale
        i18n.load(i18n.locale).done(() => {
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
                    i18n.locale || window.navigator.language.substr(0, 2);
                if (config.locales.indexOf(locale) === -1) {
                    locale = DEFAULT;
                }
                i18n.load(locale).done(() => {
                    // trigger event for localization
                    $(document).trigger(CONSTANTS.LOADED);
                });
            } else {
                // Without window.navigator.language
                i18n.load(i18n.locale || DEFAULT).done(() => {
                    // trigger event for localization
                    $(document).trigger(CONSTANTS.LOADED);
                });
            }
        },
        false
    );
}
*/

/**
 * i18n singleton
 */
const i18n = new Internationalization();

/**
 * Default export
 */
export default i18n;
