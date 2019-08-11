/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const deepExtend = require('deep-extend');
const config = require('../config/index.es6');
const httpStatus = require('../lib/httpStatus.es6');
const logger = require('../lib/logger.es6');
const plugins = require('../plugins/index.es6');

/**
 * Ping route
 * @type {{get: Function}}
 */
module.exports = {
    /**
     * Post handler
     * @param req
     * @param res
     */
    post(req, res) {
        // Log the request
        logger.debug({
            message: 'post a form',
            method: 'post',
            module: 'routes/formRoute',
            request: req
        });
        if (typeof req.body === 'object') {
            // Clone body when parsed successfully
            const model = deepExtend({}, req.body);

            // Keep posters honest
            const addition = (model.__a || '')
                .split('+')
                .map(num => parseInt(num, 10));
            const total = parseInt(model.__b, 10);
            if (
                addition.length === 2 &&
                !Number.isNaN(total) &&
                addition[0] + addition[1] === total
            ) {
                delete model.__a;
                delete model.__b;
                // Send to slack
                plugins.emit('slack', {
                    slack: {
                        channel: config.get('slack:channels:forms'),
                        level: 'info',
                        text: 'New form'
                    },
                    model
                });
            }
        }

        // Return success in all circumstances
        res.status(httpStatus.created).send(
            /* eslint-disable prettier/prettier */
            `<html><head><meta http-equiv="refresh" content="0; url=${
                req.headers.referer
            }#success=true"></head><script>window.location.href="${
                req.headers.referer
            }#success=true"</script></html>`
            /* eslint-enable prettier/prettier */
        );
    }
};
