/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const assert = require('assert');
const request = require('request');
const config = require('../config/index.es6');
const logger = require('../lib/logger');

const SHORT_LENGTH = 15;
const RX_LEVELS = /^(debug|info|warn|error|crit|success)$/i;
const COLORS = {
    DEBUG: '#91A3B0', // grey
    INFO: '#0073CF', // blue
    WARN: '#FFB347', // orange
    ERROR: '#DB7093', // pale red (pink)
    CRIT: '#C80815', // bright red
    SUCCESS: '#0CA80C' // green
};

/**
 * Slack plugin
 * @type {{event: string, handler: module.exports.handler}}
 */
module.exports = {
    /**
     * The event name
     */
    event: 'slack',

    /**
     * The event handler
     * In your code, simply do plugins.emit(event, data);
     * @see https://api.slack.com/incoming-webhooks
     * @see https://api.slack.com/docs/messages/builder?msg=%7B%22text%22%3A%22I%20am%20a%20test%20message%20http%3A%2F%2Fslack.com%22%2C%22attachments%22%3A%5B%7B%22text%22%3A%22And%20here%27s%20an%20attachment!%22%7D%5D%7D
     * @param data
     */
    handler(data) {
        assert.ok(
            typeof data === 'object',
            '`data` is expected to be an object'
        );
        const { slack } = data;
        assert.ok(
            typeof slack === 'object',
            '`data.slack` is expected to be an object'
        );
        assert.ok(
            typeof slack.channel === 'string',
            '`data.slack.channel` is expected to be a string'
        );
        assert.ok(
            RX_LEVELS.test(slack.level),
            '`data.slack.level` is expected to be any of `debug`, `info`, `warn`, `error` or `crit`'
        );
        assert.ok(
            typeof slack.text === 'string',
            '`data.slack.text` is expected to be a string'
        );
        const webhook = config.get('slack:webhook');
        assert.ok(
            typeof webhook === 'string',
            '`slack:webhook` is not configured'
        );

        // Note: it is really important to wrap handlers in try/catch blocks
        // Otherwise, the following handlers in the event loop will not be called if a plugin raises an error
        try {
            if (!config.get('slack:disabled')) {
                const json = {
                    mrkdwn: false, // See https://api.slack.com/docs/message-formatting#disabling_markup_processing
                    // username: "ghost-bot",
                    // icon_emoji: ":ghost:",
                    channel: slack.channel,
                    text: slack.text,
                    attachments: module.exports._format(
                        slack.level,
                        slack.text,
                        data.model
                    ) // see https://api.slack.com/docs/message-attachments#attachment_structure
                };
                request(
                    {
                        uri: webhook,
                        method: 'POST',
                        json
                    },
                    (error, response, body) => {
                        if (!error && response) {
                            assert.equal(
                                'ok',
                                body,
                                '`body` should equal `ok`'
                            );
                            logger.debug({
                                message: 'Slack message posted',
                                method: 'handler',
                                module: 'plugins/slack',
                                data: {
                                    channel: slack.channel,
                                    level: slack.level,
                                    text: slack.text
                                }
                            });
                        } else {
                            logger.error({
                                error,
                                method: 'handler',
                                module: 'plugins/slack',
                                data: {
                                    channel: slack.channel,
                                    level: slack.level,
                                    text: slack.text
                                }
                            });
                        }
                    }
                );
            }
        } catch (exception) {
            logger.error({
                error: exception,
                method: 'handler',
                module: 'plugins/slack'
            });
        }
    },

    /* This function's cyclomatic complexity is too high. */
    /* jshint -W074 */

    /**
     * Format as attachment
     * @param level
     * @param text
     * @param model
     * @private
     */
    _format(level, text, model) {
        /* jshint maxcomplexity: 7 */
        const fields = [
            {
                title: 'Level',
                value: level,
                short: true
            }
        ];
        for (const prop in model) {
            if (model.hasOwnProperty(prop)) {
                const title =
                    prop.substr(0, 1).toUpperCase() +
                    prop.substr(1).toLowerCase();
                let value = model[prop];
                if (typeof value === 'object') {
                    value = JSON.stringify(value); // Beware dates
                }
                const short =
                    typeof value === 'boolean' ||
                    typeof value === 'number' ||
                    (typeof value === 'string' && value.length < SHORT_LENGTH);
                // model[prop] is an object or array
                // it needs to be encoded
                fields.push({
                    title,
                    value,
                    short // short implies display on 2 columns (assuming the next one is also short
                });
            }
        }
        if (fields.length > 0) {
            // see https://api.slack.com/docs/message-attachments#attachment_structure
            return [
                {
                    // thumb_url: relevant icon?
                    color: COLORS[level.toUpperCase()],
                    text,
                    fields
                }
            ];
        }
    }

    /* jshint +W074 */
};
