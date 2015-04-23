/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

var octonode = require('octonode'),
    config = require('../config'),

    github = octonode.client({
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    }),
    repository = github.repo(config.get('github:repository')),
    branch = config.get('github:branch');


module.exports = {

    getContent: function(language, fileName, callback) {
        repository.contents('README.md', branch, function(error, response) {
            if(!error && response) {
                var buf = new Buffer(response.content, 'base64');
                callback(null, buf.toString());
            } else {
                callback(error);
            }
        });

    }

};
