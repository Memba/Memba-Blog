/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

module.exports = {

    /**
     * Returns the user page
     * @param req
     * @param res
     * @param next
     */
    getHtmlPage: function(req, res, next) {
        try {

            res
                .set({
                    //Cache-Control
                    'Content-Type': 'text/html; charset=utf-8',
                    'Content-Language' : res.getLocale()
                    //Content-Security-Policy
                })
                .vary('Accept-Encoding') //See http://blog.maxcdn.com/accept-encoding-its-vary-important/
                .render('blog', {
                    description: 'TODO',
                    title: 'TODO'
                });

        } catch (exception) {
            next(exception);
        }
    }
};
