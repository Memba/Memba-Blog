/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

module.exports = {

    /**
     * Ping route handler
     * @param req
     * @param res
     */
    getOK: function (req, res) {
        res.json({ ping: 'OK' });
    }

};
