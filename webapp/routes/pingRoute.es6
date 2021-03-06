/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const logger = require('../lib/logger');
// `compatible` is the minimum compatible UI version
// if `compatible` is '0.3.4', then versions '0.3.4' and above of Kidoju-WebApp and Kidoju-Mobile are compatible
// if we update significantly Kidoju-Server, then we need to increase `compatible` in package.json to force UI upgrades
const { version, compatible } = require('../../package.json');

/**
 * Ping route
 * @type {{get: Function}}
 */
module.exports = {
    /**
     * Get handler
     * @param req
     * @param res
     */
    get(req, res) {
        // Log the request
        logger.debug({
            message: 'get a ping',
            method: 'get',
            module: 'routes/pingRoute',
            request: req
        });
        res.json({ ping: 'OK', version, compatible });
    }
};
