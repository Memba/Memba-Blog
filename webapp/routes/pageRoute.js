/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var async = require('async'),
    ApplicationError = require('../lib/error'),
    convert = require('../lib/convert'),
    logger = require('../lib/logger'),
    markdown = require('../lib/markdown'),
    utils = require('../lib/utils'),
    index = require('../models/indexModel'),
    menu = require('../models/menuModel');

module.exports = {

    /**
     * Returns the user page
     * @param req
     * @param res
     * @param next
     */
    getHtmlPage: function(req, res, next) {
        try {

            //Create a sessionId that we can track in the browser
            req.sessionId = utils.uuid();

            //Log the request
            logger.info({
                message: 'requesting a page',
                module: 'routes/pageRoute',
                method: 'getHtmlPage',
                request: req
            });

            async.parallel(
                [
                    //get page data
                    function(callback) {
                        var path = convert.getPagePath(req.params.language, req.params.slug);
                        index.findOneByPath(path, callback);
                    },
                    //get menu
                    function(callback) {
                        menu.getMenu(req.params.language, callback);
                    }
                ],
                function(error, responses) {
                    if(!error && Array.isArray(responses) && responses.length > 1 && responses[0] && responses[1]) {
                        var data = utils.deepExtend({}, responses[0], { content: markdown.render(responses[0].text), menu: responses[1], sessionId: req.sessionId });
                        res
                            .set({
                                'Content-Type': 'text/html; charset=utf-8',
                                'Content-Language': res.getLocale()
                            })
                            .vary('Accept-Encoding') //See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                            .render('page', data);
                    } else {
                        next(error || new ApplicationError(404));
                    }
                }
            );

        } catch (exception) {
            next(exception);
        }
    }
};
