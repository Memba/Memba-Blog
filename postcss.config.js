/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

'use strict';

// const smartImport = require('postcss-smart-import')({ /* ...options */ }),
// const precss = require('precss')({ /* ...options */ }),
const autoprefixer = require('autoprefixer')({
    /* ...options */
});

const cssnano = require('cssnano')({
    preset: [
        'default',
        {
            discardComments: {
                removeAll: true
            }
        }
    ]
});

module.exports = {
    plugins: [autoprefixer, cssnano]
};
