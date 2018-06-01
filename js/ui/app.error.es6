/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-unresolved
import $ from 'jquery';
// import '../common/window.assert.es6';
import '../common/window.logger.es6';
import '../app.logger';
import '../app.i18n';
import '../app.common';

import '../../styles/app.page.error.less';

const {
    app: { i18n },
    history,
    location,
    Logger
} = window;
const logger = new Logger('app.error');

/**
 * Wait for document to be ready to initialize UI
 * Note: no need to use the i18n.loaded event here
 */
$(() => {
    // Add click handler on back button
    $('#back-button').click(() => {
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
