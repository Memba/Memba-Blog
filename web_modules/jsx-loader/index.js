/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, expr: true */

'use strict';

var webpack = require('webpack'),
    loaderUtils = require('loader-utils'),
    ejs = require('ejs'),
    path = require('path'),
    fs = require('fs'),
    async = require('async'),
    deepExtend = require('deep-extend');

module.exports = function(source) {
    var opts = loaderUtils.getOptions(this), // loaderUtils.parseQuery(this.query),
        params = loaderUtils.getOptions({ query: this.resourceQuery }), // loaderUtils.parseQuery(this.resourceQuery),
        configDir = path.join(__dirname, '../..', opts.config), //go up from `/web_modules/jsx-loader` to project root `/` and then down to 'webapp/config'
        configEnv = (params.env || 'production').toLowerCase(),
        callback = this.async();
    console.log('jsx-loader started with process.env.NODE_ENV="' + configEnv + '"');
    this.cacheable && this.cacheable();
    var defaultFile = path.join(configDir, 'default.json');
    var configFile = path.join(configDir, configEnv + '.json');
    this.addDependency(defaultFile);
    this.addDependency(configFile);
    async.parallel([
            function(done){
                fs.readFile(defaultFile, 'utf-8', function(err, content) {
                    if(err) {
                        return done(err);
                    } else {
                        content = JSON.parse(content);
                        done(null, content);
                    }
                });
            },
            function(done){
                fs.readFile(configFile, 'utf-8', function(err, content) {
                    if(err) {
                        return done(err);
                    } else {
                        content = JSON.parse(content);
                        done(null, content);
                    }
                });
            }
        ],
        function(err, result) {
            if(err) return callback(err);
            var config = deepExtend(result[0], result[1]);
            var output = ejs.render(source, config);
            callback(null, output);
        }
    );
    console.log('jsx-loader done');
};
