/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

import 'kendo.binder';
import config from './app.config.jsx';
import __ from './app.i18n.es6';
import themer from './app.themer.es6';
import CONSTANTS from '../common/window.constants.es6';

const { format, observable } = window.kendo;
const VIEW_MODEL = {
    LOCALE: 'locale',
    THEME: 'theme'
};

/**
 * viewModel
 */
const viewModel = observable({
    // Locale (see footer)
    locale: __.locale,

    // Theme (see footer)
    theme: themer.name()
});

/**
 * Bind change event for i18n locale and theme
 */
viewModel.bind(CONSTANTS.CHANGE, e => {
    if (e.field === VIEW_MODEL.LOCALE) {
        window.top.location.assign(
            format(config.uris.webapp.locale, e.sender.get(VIEW_MODEL.LOCALE))
        );
    } else if (e.field === VIEW_MODEL.THEME) {
        themer.name(e.sender.get(VIEW_MODEL.THEME));
    }
});

/**
 * Default export
 */
export default viewModel;
