/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

var util = require('util'),
    config = require('../config');

module.exports = function(req, res, next) {

    //Set res.locals values that we want available in our EJS templates, including for app.config.jsx
    res.locals.config = {
        debug                   : config.get('debug'),
        logentries: {
            browser: {
                token: config.get('logentries:browser:debug')
            }
        },
        uris: {
            cdn: {
                images          : config.get('uris:cdn:root') + config.get('uris:cdn:default'),
                svg: {
                    office      : config.get('uris:cdn:root') + config.get('uris:cdn:svg:office'),
                    white       : config.get('uris:cdn:root') + config.get('uris:cdn:svg:white'),
                    dark_grey   : config.get('uris:cdn:root') + config.get('uris:cdn:svg:dark_grey')
                }
            },
            webapp: {
                home            : config.get('uris:webapp:root') + config.get('uris:webapp:home'),
                page            : config.get('uris:webapp:root') + config.get('uris:webapp:page'),
                blog            : config.get('uris:webapp:root') + config.get('uris:webapp:blog')
                //rss           : config.get('uris:webapp:root') + config.get('uris:webapp:rss'),
                //sitemap       : config.get('uris:webapp:root') + config.get('uris:webapp:sitemap')
            }
        }
    };

    // format function
    res.locals.format = function () {
        return util.format.apply(this, arguments);
    };

    //Pass the req to the next middleware
    next();

};
