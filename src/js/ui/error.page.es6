/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-unresolved
import $ from 'jquery';
import i18n from '../app/app.i18n.es6';
import BaseController from '../app/app.controller.es6';
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
 * @extends BaseController
 */
const Controller = BaseController.extend({
    /**
     * init
     * @constructor init
     */
    init() {
        BaseController.fn.init.call(this);
        // Initialization code to execute when document is ready
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
