/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

module.exports = {

    /**
     * Handler for for pages not found
     * @param req
     * @param res
     * @param next
     */
    handler: function(req, res, next) {

        //Spare bandwidth by returning an empty error for missing assets (images, stylesheets, ...)
        if ((/(\.svg|\.png|\.jpg|\.gif|\.css|\.js)$/i).test(req.url)) {

            //TODO: do we want to log errors 404?
            res.status(404).end();

        //Otherwise pass control to the error middleware to display a nice error page
        } else {

            next(404);

        }
    }

};
