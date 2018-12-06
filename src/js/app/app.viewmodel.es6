/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

import 'kendo.binder';
import CONSTANTS from '../common/window.constants.es6';

const { i18n, theme } = window.app;
const { observable } = window.kendo;
const LOCALE = 'locale';
const THEME = 'theme';

/**
 * viewModel
 */
const viewModel = observable({
    // Locale (see footer)
    locale: i18n.locale(),

    // Theme (see footer)
    theme: theme.name()
});

/**
 * Bind change event for i18n locale and theme
 */
viewModel.bind(CONSTANTS.CHANGE, e => {
    if (e.field === LOCALE) {
        i18n.locale(e.sender.get(LOCALE));
    } else if (e.field === THEME) {
        theme.name(e.sender.get(THEME));
    }
});

/**
 * Default export
 */
export default viewModel;
