/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jslint node: true */
/* jshint node: true */

'use strict';

//TODO:
// Add error handling
// Add logging
// Add helmet https://www.npmjs.org/package/helmet
// Add i18n
// See https://www.npmjs.org/package/i18n
// See https://github.com/mashpie/i18n-node
// Add sitemap.sml (per category?)

var express = require('express'),
    i18n = require('i18n'),
    app = express(),
    config = require('./config'),
    router = require('./routes');

//Configure
app.disable('x-powered-by');
//TODO app.enable('trust proxy');
app.set('port', process.env.PORT || config.get('express:port'));

//i18n
i18n.configure({
    locales: config.get('locales'), //['en', 'fr'],
    directory: __dirname + '/locales',
    objectNotation: true //Use hierarchies in locales.json files
});
// Use __() in templates
app.use(i18n.init);

//File processing
app.engine('.ejs', require('ejs').__express);
// Optional since express defaults to CWD/views
app.set('views', __dirname + '/views');
// Without this you would need to supply the extension to res.render(), ex: res.render('users.html').
app.set('view engine', 'ejs');

//Routing
app.use(router);
//if (config.get('NODE:ENV') === 'test') {
//In test mode, mock the api server
//    app.use(require('./apimock'));
//}

//Start application
app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));

//Export app for further needs
//TODO: is this a good idea?
module.exports = app;
