/**
 * Copyright (c) 2013-2016 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var assert = require('assert');
var request = require('request');
var config = require('../config');
var utils = require('./utils');
var channel = config.get('slack:channel');
var webhook = config.get('slack:webhook');
var disabled = config.get('slack:disabled');

var RX_LEVELS = /^(debug|info|warn|error|crit)$/i;
var COLORS = {
    DEBUG: '#91A3B0', // grey
    INFO: '#0073CF', // blue
    WARN: '#FFB347', // orange
    ERROR: '#DB7093', // pale red (pink)
    CRIT: '#C80815'   // bright red
};


module.exports = exports = {

    /* This function has too many statements. */
    /* jshint -W071 */

    /* This function's cyclomatic complexity is too high. */
    /* jshint -W074 */

    /**
     * Notify slack
     * @see https://api.slack.com/incoming-webhooks
     * @see https://api.slack.com/docs/messages/builder?msg=%7B%22text%22%3A%22I%20am%20a%20test%20message%20http%3A%2F%2Fslack.com%22%2C%22attachments%22%3A%5B%7B%22text%22%3A%22And%20here%27s%20an%20attachment!%22%7D%5D%7D
     * @param entry
     * @param callback
     */
    notify: function (entry, callback) {
        /* jshint maxcomplexity: 11 */
        /* jshint maxstatements: 28 */

        assert.ok(utils.isObject(entry), '`entry` is expected to be an object');
        assert.ok(typeof entry.message === 'string', '`entry` is expected to have a string property named `message`');
        assert.ok(RX_LEVELS.test(entry.level), '`entry` is expected to have a string property named `level`');
        // Note: if callback is not a function, it is discarded

        assert.ok(typeof webhook === 'string', '`slack:webhook` is not configured');
        assert.ok(typeof channel === 'string', '`slack:channel` is not configured');

        if (disabled) {
            if (typeof callback === 'function') {
                callback(null, { statusCode: 200 }); // for slack.test.js
            }
            return;
        }

        var fields = [];
        var json = {
            markdwn: false,
            // username: "ghost-bot",
            // icon_emoji: ":ghost:",
            channel: channel,
            text: entry.message,
            attachments: []
        };

        if (entry.level) {
            fields.push ({
                title: 'Level',
                value: entry.level,
                short: true // short implies display on 2 columns (assuming the next one is also short
            });
        }

        if (entry.application) {
            fields.push ({
                title: 'Application',
                value: entry.application,
                short: true
            });
        }

        if (entry.host) {
            fields.push ({
                title: 'Host',
                value: entry.host,
                short: false
            });
        }

        if (entry.module) {
            fields.push ({
                title: 'Module',
                value: entry.module,
                short: true
            });
        }

        if (entry.method) {
            fields.push ({
                title: 'Method',
                value: entry.method,
                short: true
            });
        }

        if (entry.data) {
            fields.push ({
                title: 'Data',
                value: JSON.stringify(entry.data),
                short: false
            });
        }

        if (entry.stack) {
            fields.push ({
                title: 'Stack',
                value: entry.stack,
                short: false // short implies display on 2 columns (assuming the next one is also short
            });
        }

        if (fields.length > 0) {
            // see https://api.slack.com/docs/message-attachments#attachment_structure
            json.attachments.push({
                // thumb_url: relevant icon?
                color: COLORS[entry.level.toUpperCase()],
                text: entry.originalMessage,
                fields: fields
            });
        }

        request({
            uri: webhook,
            method: 'POST',
            json: json
        }, function (error, response, body) {
            if (typeof callback === 'function') {
                callback(error, response);
            }
        });

    }

    /* jshint +W074 */
    /* jshint +W071 */

};
