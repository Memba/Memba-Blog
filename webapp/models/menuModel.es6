/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

const convert = require('../lib/convert');
const github = require('../lib/github');
const ApplicationError = require('../lib/applicationError.es6');

let cache = {};

module.exports = {
    /**
     * Get menu for designated language
     * @param language
     * @param callback
     */
    getMenu(language, callback) {
        // TODO: check available locales
        let menu = cache[language];
        if (menu) {
            callback(null, menu);
        } else {
            github.getContent(
                convert.getMenuPath(language),
                (error, response) => {
                    if (!error && response) {
                        const buf = Buffer.from(response.content, 'base64');
                        const content = buf.toString();
                        menu = JSON.parse(content);
                        cache[language] = menu;
                        callback(null, menu);
                    } else {
                        // TODO Consider a better message than 500
                        callback(error || new ApplicationError(500));
                    }
                }
            );
        }
    },

    /**
     * Reset cache
     */
    resetCache() {
        cache = {};
    },
};
