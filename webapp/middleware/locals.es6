/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const util = require('util');
const moment = require('moment');
const config = require('../config/index.es6');
const url = require('url');

module.exports = function handler(req, res, next) {
    // Make nconf configurations available to our EJS templates
    res.locals.config = config.get();

    // Make format function available too
    res.locals.format = function format(...args) {
        return util.format.apply(this, args);
    };

    // Make url functions, including url.resolve, available too
    res.locals.url = url;

    // Make moment available too
    res.locals.moment = moment;

    // Pass the req to the next middleware
    next();
};
