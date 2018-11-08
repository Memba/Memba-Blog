/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-unresolved
import $ from 'jquery';
// import assert from '../common/window.assert.es6';
import Logger from '../common/window.logger.es6';

// TODO Review app.* files
import '../app.logger';
import '../app.i18n';
import '../app.common';

import '../../styles/page.error.less';

const {
    app: { i18n },
    history,
    location
} = window;
const logger = new Logger('page.error');
const SELECTORS = {
    BACK_BUTTON: '#back-button'
};

/**
 * Wait for document to be ready to initialize UI
 * Note: no need to use the i18n.loaded event here
 */
$(() => {
    // Add click handler on back button
    $(SELECTORS.BACK_BUTTON).click(e => {
        e.preventDefault();
        if (history && history.length > 1) {
            history.back();
        } else {
            location.assign('/');
        }
    });

    // Log page readiness
    logger.info({
        message: `error page initialized in ${i18n.locale()}`,
        method: 'document.ready'
    });
});
