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

module.exports = {
    plugins: [autoprefixer]
};
