/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var util = require('util'),
    config = require('../config'),
    url = require('../lib/url');

    module.exports = function(req, res, next) {

    //Set res.locals values that we want available in our EJS templates, including for app.config.jsx
    res.locals.config = {
        debug                   : config.get('debug'),
        locales                 : config.get('locales'),
        logentries: {
            browser: {
                token           : config.get('logentries:browser:token')
            }
        },
        uris: {
            cdn: {
                images          : url.join(config.get('uris:cdn:root'), config.get('uris:cdn:default')),
                svg: {
                    office      : url.join(config.get('uris:cdn:root'), config.get('uris:cdn:svg:office')),
                    white       : url.join(config.get('uris:cdn:root'), config.get('uris:cdn:svg:white')),
                    dark_grey   : url.join(config.get('uris:cdn:root'), config.get('uris:cdn:svg:dark_grey'))
                }
            },
            webapp: {
                home            : url.join(config.get('uris:webapp:root'), config.get('uris:webapp:home')),
                pages           : url.join(config.get('uris:webapp:root'), config.get('uris:webapp:pages')),
                posts           : url.join(config.get('uris:webapp:root'), config.get('uris:webapp:posts'))
                //rss           : url.join(config.get('uris:webapp:root'), config.get('uris:webapp:rss')),
                //sitemap       : url.join(config.get('uris:webapp:root'), config.get('uris:webapp:sitemap'))
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
