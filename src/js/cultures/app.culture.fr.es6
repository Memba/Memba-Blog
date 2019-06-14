/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/**
 * Application resources
 */
import webapp from '../../../webapp/locales/fr.json';

/**
 * Kendo UI resources
 */
import '../vendor/kendo/cultures/kendo.culture.fr-FR';
import '../vendor/kendo/messages/kendo.messages.fr-FR';
import './widgets.fr.es6';

window.kendo.culture('fr-FR');

/**
 * Default export
 */
export default { webapp };
