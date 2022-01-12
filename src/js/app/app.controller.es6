/**
 * Copyright (c) 2013-2021 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// app.controller.es6 is the base page controller

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-extraneous-dependencies, import/no-unresolved
import $ from 'jquery';
import 'kendo.data';
import CONSTANTS from '../common/window.constants.es6';
import Logger from '../common/window.logger.es6';

const {
    data: { ObservableObject },
} = window.kendo;
const logger = new Logger('app.controller');

// TODO: Check dependencies

/**
 * AppController
 * @class AppController
 * @extends ObservableObject
 */
const AppController = ObservableObject.extend({
    /**
     * Init
     * @constructor init
     */
    init(features = []) {
        ObservableObject.fn.init.call(this);
        // Add features
        if (Array.isArray(features)) {
            this.addFeatures(features);
        }
    },

    /**
     * A list of features to check dependencies against
     */
    _features: {},

    /**
     * Event handlers
     * Bound to the change, set and get events of this ObservableObject
     * Defined as part of a feature
     *
     * events: {
     *     feature: {
     *         change: (e) => { ... },
     *         get: (e) => { ... },
     *         set: (e) => { ... },
     *         ...
     *     }
     * }
     */
    _events: {},

    /**
     * Initializers
     */
    _initializers: {},

    /**
     * Preloaders
     */
    _preloaders: {},

    /**
     * Loaders
     */
    _loaders: {},

    /**
     * Resetters
     */
    _resetters: {},

    /**
     * Showers
     */
    _showers: {},

    /**
     * Resizers
     */
    _resizers: {},

    /**
     * VIEW selectors
     */
    VIEW: {},

    /**
     * VIEW_MODEL selectors
     */
    VIEW_MODEL: {},

    /**
     * Add UI features
     * @param features
     */
    addFeatures(features) {
        const prototype = Object.getPrototypeOf(this);
        features.forEach((feature) => {
            const { _name } = feature;
            if (this._features[_name]) {
                // Avoid duplicate features
                throw new Error(`${_name} has already been added (duplicate)`);
            }
            this._features[_name] = true;
            if (feature && $.type(_name) === CONSTANTS.STRING) {
                Object.keys(feature).forEach((key) => {
                    const prop = feature[key];
                    if (key === 'events' && $.isPlainObject(prop)) {
                        // `change`, `get` and `set` events of ObservableObject
                        Object.keys(prop).forEach((event) => {
                            const handler = prop[event];
                            if (
                                // ['change', 'get', 'set'].indexOf(event) > -1 &&
                                $.isFunction(handler)
                            ) {
                                // Note cannot extend without breaking bindings
                                this._events[_name] = this._events[_name] || {};
                                this._events[_name][event] = handler.bind(this);
                                this.bind(event, this._events[_name][event]);
                            }
                        });
                    } else if (key === 'initialize' && $.isFunction(prop)) {
                        // Initializers
                        this._initializers[_name] = prop.bind(this);
                    } else if (key === 'preload' && $.isFunction(prop)) {
                        // Preloaders (viewModel data)
                        this._preloaders[_name] = prop.bind(this);
                    } else if (key === 'load' && $.isFunction(prop)) {
                        // Loaders (viewModel data)
                        this._loaders[_name] = prop.bind(this);
                    } else if (key === 'reset' && $.isFunction(prop)) {
                        // Resetters (viewModel data)
                        this._resetters[_name] = prop.bind(this);
                    } else if (key === 'show' && $.isFunction(prop)) {
                        // Showers (ui)
                        this._showers[_name] = prop.bind(this);
                    } else if (key === 'resize' && $.isFunction(prop)) {
                        // Resizers, i.e. handlers for window resize event, including orientation change
                        this._resizers[_name] = prop.bind(this);
                    } else if (key === 'VIEW' && $.isPlainObject(prop)) {
                        // VIEW selectors (ids, class names)
                        $.extend(true, this.VIEW, prop);
                    } else if (key === 'VIEW_MODEL' && $.isPlainObject(prop)) {
                        // VIEW_MODEL selectors
                        $.extend(true, this.VIEW_MODEL, prop);
                    } else if (
                        $.type(prototype[key]) === CONSTANTS.UNDEFINED &&
                        $.isFunction(prop)
                    ) {
                        // All other functions and event handlers, especially view init, view show and buttons clicks
                        // BEWARE: With MVVM, there is a chance that this will be rebound to another object this[key] = prop.bind(this);
                        prototype[key] = prop;
                    } else if ($.type(this[key]) === CONSTANTS.UNDEFINED) {
                        // Anything else
                        if (key !== '_name') {
                            this.set(key, prop);
                        }
                    } else {
                        // Avoid duplicate names across features
                        throw new Error(
                            `${feature._name} uses key ${key} which has already been added (duplicate)`
                        );
                    }
                });
            }
            logger.debug(`Added feature ${_name}`);
        });
    },

    /**
     * Initialize
     * @returns {*}
     */
    initialize() {
        const { _initializers } = this;
        const promises = [];
        logger.debug('Initializing');
        Object.keys(_initializers).forEach((key) => {
            const prop = _initializers[key];
            if ($.isFunction(prop)) {
                promises.push(prop());
            }
        });
        return $.when(...promises);
    },

    /**
     * Preload data into viewModel
     * @returns {*}
     */
    preload() {
        const { _preloaders } = this;
        const promises = [];
        logger.debug('Preloading');
        Object.keys(_preloaders).forEach((key) => {
            const prop = _preloaders[key];
            if ($.isFunction(prop)) {
                promises.push(prop());
            }
        });
        return $.when(...promises);
    },

    /**
     * Load data into viewModel
     * @returns {*}
     */
    load() {
        const { _loaders } = this;
        const promises = [];
        logger.debug('Loading');
        Object.keys(_loaders).forEach((key) => {
            const prop = _loaders[key];
            if ($.isFunction(prop)) {
                promises.push(prop());
            }
        });
        return $.when(...promises);
    },

    /**
     * Reset data in viewModel
     */
    reset() {
        const { _resetters } = this;
        logger.debug('Resetting');
        Object.keys(_resetters).forEach((key) => {
            const prop = _resetters[key];
            if ($.isFunction(prop)) {
                prop();
            }
        });
    },

    /**
     * Show after data is loaded in the viewmodel
     */
    show(e, view) {
        const { _showers } = this;
        logger.debug('Showing');
        Object.keys(_showers).forEach((key) => {
            const prop = _showers[key];
            if ($.isFunction(prop)) {
                prop(e, view);
            }
        });
    },

    /**
     * Resize view
     * @param e
     * @param view
     */
    resize(e, view) {
        const { _resizers } = this;
        logger.debug('Resizing');
        Object.keys(_resizers).forEach((key) => {
            const prop = _resizers[key];
            if ($.isFunction(prop)) {
                prop(e, view);
            }
        });
    },

    /**
     * Ready the page
     */
    ready() {
        function failCatch(a, b, c) {
            $.noop(a, b, c);
        }
        return this.initialize()
            .then(this.preload.bind(this), failCatch.bind(this))
            .then(this.load.bind(this), failCatch.bind(this))
            .then(this.show.bind(this), failCatch.bind(this));
    },
});

/**
 * Default export
 */
export default AppController;
