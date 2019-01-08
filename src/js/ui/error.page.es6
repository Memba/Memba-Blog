/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-unresolved
import $ from 'jquery';
import i18n from '../app/app.i18n.es6';
import AppController from '../app/app.controller.es6';
import CONSTANTS from '../common/window.constants.es6';
import Logger from '../common/window.logger.es6';

// Import page styles
import '../../styles/ui/error.page.less';

const { history, location } = window;
const logger = new Logger('error.page');
const SELECTORS = {
    BACK_BUTTON: '#back-button'
};

/**
 * Controller
 * @class Controller
 * @extends AppController
 */
const Controller = AppController.extend({
    /**
     * init
     * @constructor init
     */
    init() {
        AppController.fn.init.call(this);
        // Wait until document is ready to initialize UI
        $(document).one(CONSTANTS.LOADED, () => {
            this.initBackButton();
            // LOADED occurs after document ready event
            logger.info({
                message: `error page initialized in ${i18n.locale()}`,
                method: 'Controller.init'
            });
        });
    },

    /**
     * initBackButton
     * @method initBackButton
     */
    initBackButton() {
        // Add click handler on back button
        $(SELECTORS.BACK_BUTTON).click(e => {
            e.preventDefault();
            if (history && history.length > 1) {
                history.back();
            } else {
                location.assign('/');
            }
        });
    }
});

/**
 * Initialize page controller
 */
const controller = new Controller();

/**
 * Default export
 */
export default controller;
