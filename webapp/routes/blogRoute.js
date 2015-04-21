/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

var model = require('../models/blogModel');

module.exports = {

    /**
     * Returns the user page
     * @param req
     * @param res
     * @param next
     */
    getHtmlPage: function(req, res, next) {
        try {

            var query = {
                language: req.params.language,
                year: req.params.language,
                month: req.params.language,
                day: req.params.language,
                slug: req.params.slug
            };

            model.getContent(query, function(err, data) {
                res
                    .set({
                        //Cache-Control
                        'Content-Type': 'text/html; charset=utf-8',
                        'Content-Language' : res.getLocale()
                        //Content-Security-Policy
                    })
                    .vary('Accept-Encoding') //See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                    .render('page', {
                        description: 'TODO',
                        title: 'TODO',
                        menu: res.locals.getCatalog().header.navbar.menu,
                        content: data
                    });

            });

        } catch (exception) {
            next(exception);
        }
    }
};
