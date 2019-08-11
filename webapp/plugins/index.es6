/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const assert = require('assert');
const Events = require('events');
const { readdirSync } = require('fs');

const eventEmitter = new Events.EventEmitter();

/**
 * Plug-in manager
 * @type {{register: module.exports.register, emit: module.exports.emit, unregister: module.exports.unregister}}
 */
module.exports = {
    /**
     * Loads plugins
     * Note: logger is passed as an arg to avoid circular dependencies since logger uses plugins
     * @param logger
     */
    load(logger) {
        const that = this;
        readdirSync(`${__dirname}/`).forEach(file => {
            if (/\.(es6|js)$/.test(file) && !file.startsWith('index.')) {
                // eslint-disable-next-line global-require, import/no-dynamic-require
                const plugin = require(`./${file}`);
                if (
                    typeof plugin.event === 'string' &&
                    typeof plugin.handler === 'function'
                ) {
                    that.register(plugin.event, plugin.handler);
                    // Log the plugin
                    if (logger && typeof logger.info === 'function') {
                        logger.info({
                            message: `loaded plugin \`${file}\` for event \`${plugin.event}\``,
                            method: 'load',
                            module: 'plugins/index'
                        });
                    }
                }
            }
        });
    },

    /**
     * Register an event handler
     * @param event
     * @param handler
     */
    register(event, handler) {
        assert.ok(
            typeof event === 'string',
            '`event` is expected to be a string'
        );
        assert.ok(
            typeof handler === 'function',
            '`handler` is expected to be a function'
        );

        eventEmitter.on(event, handler);
    },

    /**
     * Emit events with data
     * @param events
     * @param data
     */
    emit(events, data) {
        if (typeof events === 'string') {
            // eslint-disable-next-line no-param-reassign
            events = [events];
        }

        assert.ok(
            Array.isArray(events),
            '`events` is expected to be an array of strings'
        );
        // Let plugins assert data

        events.forEach(evt => {
            eventEmitter.emit(evt, data);
        });
    },

    /**
     * Unregister an event handler
     * @param event
     * @param handler
     */
    unregister(event, handler) {
        assert.ok(
            typeof event === 'string',
            '`event` is expected to be a string'
        );
        assert.ok(
            typeof handler === 'undefined' || typeof handler === 'function',
            '`handler` is expected to be a function if not undefined'
        );

        if (typeof handler === 'undefined') {
            eventEmitter.removeAllListeners(event);
        } else {
            eventEmitter.removeListener(event, handler);
        }
    }
};
