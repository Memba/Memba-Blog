/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

import '../vendor/kendo/cultures/kendo.culture.fr-FR';
import '../vendor/kendo/messages/kendo.messages.fr-FR';
import '../messages/widgets.fr.es6';
import '../messages/tools.fr.es6';
import '../messages/dialogs.fr.es6';

window.app = window.app || {};
window.app.cultures = window.app.cultures || {};
window.app.cultures.fr = require('../../../webapp/locales/fr.json');

window.kendo.culture('fr-FR');
