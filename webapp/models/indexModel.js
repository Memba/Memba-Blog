/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true */

'use strict';

var convert = require('../lib/convert'),
    db = require('../lib/db');

module.exports = {

    /**
     * Search index for content by site_url
     * @param site_url
     * @param callback
     */
    findContentBySiteUrl: function(site_url, callback) {
        //var language = convert.site_url2language(site_url),
        //    collection = module.exports.getCollection(language);
        //collection.find({site_yrl: site_url}, function(err, contents) {
        //    callback(err, contents);
        //});

        /*
         var language = convert.site_url2language(site_url);
         module.exports.getIndex(language, function(error, index) {
            if (!error && Array.isArray(index)) {
                var results = index.filter(function(content) {
                    return (content.site_url.indexOf(site_url) === 0);
                });
                if(Array.isArray(results)) {
                    callback(null, results);
                } else {
                    callback(null, []);
                }
            } else {
                callback(error || new ApplicationError('Index is not the expected array of content data'));
            }
        });
        */
    },

    /**
     * Search index for one entry by path
     * @param path
     * @param callback
     */
    findOneByPath: function(path, callback) {
        var language = convert.path2language(path);
        db[language].find({path: path}, function(error, indexEntries) {
            if(!error && Array.isArray(indexEntries) && indexEntries.length) {
                callback(error, indexEntries[0]);
            } else {
                callback(error);
            }
        });
    }

};
