/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

var util = require('util');
var moment = require('moment');
var config = require('../config');
var url = require('../lib/url');

module.exports = function (req, res, next) {

    // Make nconf configurations available to our EJS templates
    res.locals.config = config.get();

    // format function
    res.locals.format = function () {
        return util.format.apply(this, arguments);
    };

    // urljoin function
    res.locals.urljoin = function () {
        return url.join.apply(this, arguments);
    };

    // moment
    res.locals.moment = moment;

    // Pass the req to the next middleware
    next();

};
