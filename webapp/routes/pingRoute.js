/**
 * Copyright (c) 2013-2017 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var logger = require('../lib/logger');
var pkg = require('../../package.json');
var version = pkg.version;
var compatible = pkg.compatible;

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
    get: function (req, res) {

        // Log the request
        // logger.info({ // otherwise our logs get crowded with ping requests from AWS load balancer
        logger.debug({
            message: 'get a ping',
            method: 'get',
            module: 'routes/pingRoute',
            request: req
        });

        res.json({ ping: 'OK', version : version, compatible: compatible });

    }
};
