/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true */
/* globals require: false, process: false */

require('./app.config.jsx?env=' + process.env.NODE_ENV);
require('./app.logger.js');
require('./app.support.js');

//TODO Consider javascript disabled
//TODO use app.support to display a message for older browsers
