/**
 * Copyright (c) 2013-2017 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var assert = require('assert');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var fileSystem = require('fs');
var logger = require('../lib/logger');

/**
 * Plug-in manager
 * @type {{register: module.exports.register, emit: module.exports.emit, unregister: module.exports.unregister}}
 */
module.exports = {

    load: function () {
        var that = this;
        fileSystem.readdirSync(__dirname + '/').forEach(function (file) {
            if (file.match(/\.js$/) !== null && file !== 'index.js') {
                var plugin = require('./' + file);
                if (typeof plugin.event === 'string' && typeof plugin.handler === 'function') {
                    that.register(plugin.event, plugin.handler);
                    // Log the plugin
                    logger.info({
                        message: 'loaded plugin `' + file + '` for event `' + plugin.event + '`',
                        method: 'load',
                        module: 'plugins/index'
                    });
                }
            }
        });
    },

    /**
     * Register an event handler
     * @param event
     * @param handler
     */
    register: function (event, handler) {

        assert.ok(typeof event === 'string', '`event` is expected to be a string');
        assert.ok(typeof handler === 'function', '`handler` is expected to be a function');

        eventEmitter.on(event, handler);
    },

    /**
     * Emit events with data
     * @param events
     * @param data
     */
    emit: function (events, data) {

        if (typeof events === 'string') {
            events = [events];
        }

        assert.ok(Array.isArray(events), '`events` is expected to be an array of strings');
        // Let plugins assert data

        for (var i = 0, length = events.length; i < length; i++) {
            eventEmitter.emit(events[i], data);
        }
    },

    /**
     * Unregister an event handler
     * @param event
     * @param handler
     */
    unregister: function (event, handler) {

        assert.ok(typeof event === 'string', '`event` is expected to be a string');
        assert.ok(typeof handler === 'undefined' || typeof handler === 'function', '`handler` is expected to be a function if not undefined');

        if (typeof handler === 'undefined') {
            eventEmitter.removeAllListeners(event);
        } else {
            eventEmitter.removeListener(event, handler);
        }
    }

};
