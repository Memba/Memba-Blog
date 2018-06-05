/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* eslint-disable no-console,  import/no-extraneous-dependencies */

const loaderUtils = require('loader-utils');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const async = require('async');
const deepExtend = require('deep-extend');

module.exports = function loader(source) {
    const opts = loaderUtils.getOptions(this); // loaderUtils.parseQuery(this.query),
    const params = loaderUtils.getOptions({ query: this.resourceQuery }); // loaderUtils.parseQuery(this.resourceQuery),
    const configDir = path.join(__dirname, '../..', opts.config); // go up from `/web_modules/jsx-loader` to project root `/` and then down to 'webapp/config'
    const configEnv = (params.env || 'production').toLowerCase();
    const callback = this.async();
    console.log(`jsx-loader started with process.env.NODE_ENV="${configEnv}"`);
    if (typeof this.cacheable === 'function') {
        this.cacheable();
    }
    const defaultFile = path.join(configDir, 'default.json');
    const configFile = path.join(configDir, `${configEnv}.json`);
    this.addDependency(defaultFile);
    this.addDependency(configFile);
    async.parallel(
        [
            done => {
                fs.readFile(defaultFile, 'utf-8', (err, content) => {
                    if (err) {
                        done(err);
                    } else {
                        done(null, JSON.parse(content));
                    }
                });
            },
            done => {
                fs.readFile(configFile, 'utf-8', (err, content) => {
                    if (err) {
                        done(err);
                    } else {
                        done(null, JSON.parse(content));
                    }
                });
            }
        ],
        (err, result) => {
            if (err) {
                callback(err);
            } else {
                const config = deepExtend(result[0], result[1]);
                const output = ejs.render(source, config);
                callback(null, output);
            }
        }
    );
    console.log('jsx-loader done');
};
