/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

var path = require('path'),
    i18n = require("i18n"),
    config = require('../config'),
    utils = require('../lib/utils'),
    cache = require('../lib/cache'),
    github = require('../lib/github'),
    markdown = require('../lib/markdown');

function ensureYml(uri, response, yml, callback) {
    var noyml = markdown.clean(response),
        update = false;
    if (!yml.uuid) {
        yml.uuid = utils.uuid();
        update = true;
    }


    //TODO author and date



    if (!yml.description) {
        yml.description = i18n.__('meta.description');
        update = true;
    }
    if(!yml.icon) {
        yml.icon = null;
        //update = true; //no icon is fine
    }
    if (!yml.keywords) {
        yml.keywords = i18n.__('meta.keywords');
        update = true;
    }
    if (!yml.title) {
        yml.title = i18n.__('meta.title');
        update = true;
    }
    if (update) {
        var out = '---\n';
        for (var key in yml) {
            if (key !== 'icon' && yml.hasOwnProperty(key)) {
                out += key + ': ' + yml[key] + '\n';
            }
        }
        out += '---\n' + noyml;
        github.updateContent(uri, out, function(err) {
            if(err) {
                console.error(err);
            }
        });
    }
}

module.exports = {

    /**
     * Get page data
     * @param query
     * @param callback
     */
    getPageData: function(query, callback) {

        var uri = path.join(config.get('github:' + query.language + ':pages'), (query.slug || 'index') + '.md'),
            data = cache.get(uri);

        if(data) {
            callback(null, data);
        } else {
            github.getContent(uri, function (error, response) {
                if (!error && response) {
                    var yml = markdown.yml(response);
                    ensureYml(uri, response, yml);
                    data = utils.deepExtend({ content: markdown.render(response) }, yml);
                    if (config.get('cache$')) { //Note: `cache` breaks webpack build
                        cache.set(uri, data);
                    }
                    callback(null, data);
                } else {
                    callback(error); //TODO || not found
                }
            });
        }

    }

};
