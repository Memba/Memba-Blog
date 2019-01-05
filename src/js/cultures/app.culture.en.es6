/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

import '../vendor/kendo/cultures/kendo.culture.en-GB';
import '../vendor/kendo/messages/kendo.messages.en-GB';
import './widgets.en.es6';
// import '../messages/tools.en.es6';
// import '../messages/dialogs.en.es6';

window.app = window.app || {};
window.app.cultures = window.app.cultures || {};
window.app.cultures.en = require('../../../webapp/locales/en.json');

window.kendo.culture('en-GB');
