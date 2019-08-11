/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const util = require('util');
const moment = require('moment');
const { URL } = require('url');
const config = require('../config/index.es6');

const version = config.get('application:version');
const cdnIcons = config.get('uris:cdn:icons');
const cdnImages = config.get('uris:cdn:images');
const cdnRoot = config.get('uris:cdn:root');
const webappPublic = config.get('uris:webapp:public');
const webappRoot = config.get('uris:webapp:root');
const webpackRoot = config.get('uris:webpack:root'); // <-- for CDN scripts

module.exports = function handler(req, res, next) {
    // Make nconf configurations available to our EJS templates
    res.locals.config = config.get();

    // Make format function available too
    function format(...args) {
        return util.format.apply(this, args);
    }
    res.locals.format = format;

    // Make URL WHATWG api available too
    res.locals.URL = URL;

    res.locals.iconPath = () =>
        new URL(cdnIcons.replace('%s.svg', ''), cdnRoot).href;

    res.locals.iconURL = icon => new URL(format(cdnIcons, icon), cdnRoot).href;

    res.locals.imageURL = image =>
        new URL(format(cdnImages, image), cdnRoot).href;

    res.locals.publicURL = item =>
        new URL(format(webappPublic, item), webappRoot).href;

    res.locals.scriptURL = script =>
        `${new URL(script, webpackRoot).href}?v=${version}`;

    // Make moment available too
    res.locals.moment = moment;

    // Pass the req to the next middleware
    next();
};
