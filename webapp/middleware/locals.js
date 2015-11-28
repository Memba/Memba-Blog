/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

var util = require('util'),
    // moment = require('moment'),
    config = require('../config'),
    url = require('../lib/url');

module.exports = function (req, res, next) {

    // Make nconf configurations available to our EJS templates
    res.locals.config = config.get();

    /*
    res.locals.config = {
        debug               : config.get('debug'),
        locales                 : config.get('locales'),
        logentries: {
            browser: {
                token           : config.get('logentries:browser:token')
            }
        },
        uris : {
            webapp: {
                editor          : url.join(config.get('uris:webapp:root'), config.get('uris:webapp:editor')),
                finder          : url.join(config.get('uris:webapp:root'), config.get('uris:webapp:finder')),
                home            : url.join(config.get('uris:webapp:root'), config.get('uris:webapp:home')),
                ping            : url.join(config.get('uris:webapp:root'), config.get('uris:webapp:ping')),
                player          : url.join(config.get('uris:webapp:root'), config.get('uris:webapp:player')),
                public          : url.join(config.get('uris:webapp:root'), config.get('uris:webapp:public')),
                rss             : url.join(config.get('uris:webapp:root'), config.get('uris:webapp:rss')),
                sitemap         : url.join(config.get('uris:webapp:root'), config.get('uris:webapp:sitemap')),
                summary         : url.join(config.get('uris:webapp:root'), config.get('uris:webapp:summary')),
                user            : url.join(config.get('uris:webapp:root'), config.get('uris:webapp:user'))
            }
        }
    };
    */

    // format function
    res.locals.format = function () {
        return util.format.apply(this, arguments);
    };

    // urljoin function
    res.locals.urljoin = function () {
        return url.join.apply(this, arguments);
    };

    // moment
    // res.locals.moment = moment;

    // Pass the req to the next middleware
    next();

};
