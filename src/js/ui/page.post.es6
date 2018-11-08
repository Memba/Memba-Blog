/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-unresolved
import $ from 'jquery';
import '../vendor/kendo/kendo.core';
import assert from '../common/window.assert.es6';
import CONSTANTS from '../common/window.constants.es6';
import Logger from '../common/window.logger.es6';

// TODO Review app.* files
import '../app.logger';
import '../app.i18n';
import '../app.common';
import '../app.menu';

import '../../styles/page.post.less';

const {
    app: { constants, i18n },
    HTMLAnchorElement,
    kendo: { attr }
} = window;
const logger = new Logger('page.post');
const SELECTORS = {
    SOCIAL: '.social',
    WRAPPER: '#post-wrapper'
};
const COMMAND = {
    FACEBOOK: 'facebook',
    GOOGLE: 'google',
    LINKEDIN: 'linkedin',
    PINTEREST: 'pinterest',
    TWITTER: 'twitter',
    EMAIL: 'email'
};
let socialWindow = null;
let socialUrl;

/**
 * Initialize social buttons
 * @see http://www.sharelinkgenerator.com/
 * Also check Kidoju.WebApp -> app.summary.js
 */
function initSocialButtons() {
    $(SELECTORS.WRAPPER)
        .find(SELECTORS.SOCIAL)
        .on(CONSTANTS.CLICK, e => {
            assert.instanceof(
                $.Event,
                e,
                assert.format(
                    assert.messages.instanceof.default,
                    'e',
                    'default'
                )
            );
            assert.instanceof(
                HTMLAnchorElement,
                e.currentTarget,
                assert.format(
                    assert.messages.instanceof.default,
                    'e.currentTarget',
                    'HTMLAnchorElement'
                )
            );
            const sharedUrl = encodeURIComponent(
                $('meta[property="og:url"]').attr('content')
            );
            const source = encodeURIComponent(
                $('meta[property="og:site_name"]').attr('content')
            );
            const title = encodeURIComponent(
                $('meta[property="og:title"]').attr('content')
            );
            const description = encodeURIComponent(
                $('meta[property="og:description"]').attr('content')
            );
            const image = encodeURIComponent(
                $('meta[property="og:image"]').attr('content')
            );
            const command = $(e.currentTarget).attr(attr('command'));
            let openUrl;
            switch (command) {
                case COMMAND.FACEBOOK:
                    // Facebook share dialog
                    // @ see https://developers.facebook.com/docs/sharing/web
                    // @ see https://developers.facebook.com/docs/sharing/reference/share-dialog
                    // @ see https://developers.facebook.com/docs/sharing/best-practices
                    // @see https://developers.facebook.com/tools/debug/ <---------------- DEBUG
                    openUrl = `${'https://www.facebook.com/dialog/share' +
                        '?display=popup' +
                        '&app_id='}${
                        constants.facebookAppId
                    }&href=${sharedUrl}&redirect_uri=${sharedUrl}`;
                    /*
                    openUrl = 'https://www.facebook.com/sharer/sharer.php' +
                        '?u=' + sharedUrl;
                    */
                    break;
                case COMMAND.GOOGLE:
                    // @see https://developers.google.com/+/web/share/
                    openUrl = `${'https://plus.google.com/share' +
                        '?url='}${sharedUrl}&hl=${i18n.locale()}`;
                    break;
                case COMMAND.LINKEDIN:
                    // @see https://developer.linkedin.com/docs/share-on-linkedin
                    // Note Linkedin uses open graph meta tags
                    openUrl = `${'https://www.linkedin.com/shareArticle' +
                        '?mini=true' +
                        '&source='}${source}&summary=${description}&title=${title}&url=${sharedUrl}`;

                    break;
                case COMMAND.PINTEREST:
                    // @see https://developers.pinterest.com/docs/widgets/pin-it/
                    openUrl = `${'https://pinterest.com/pin/create/button/' +
                        '?url='}${sharedUrl}&media=${image}&description=${description}`;
                    break;
                case COMMAND.TWITTER:
                    // Twitter web intent
                    // @ see https://dev.twitter.com/web/tweet-button/web-intent
                    openUrl = `${'https://twitter.com/intent/tweet' +
                        '?text='}${title}&url=${sharedUrl}&via=${
                        constants.twitterAccount
                    }`;
                    // TODO: hashtags (message size limit)?
                    break;
                case COMMAND.EMAIL:
                    // TODO add icon in summary.ejs
                    openUrl =
                        'mailto:info@memba.org?&subject=Shared Link&body=Hey%20loojk%20at%20that';
                    break;
                default:
                    break;
            }
            if (
                socialWindow === null ||
                socialWindow.closed ||
                socialUrl !== openUrl
            ) {
                // Most social share dialogs resize themselves from a smaller window (not from a larger one)
                // We might want to improve the (top, left) position
                socialWindow = window.open(
                    openUrl,
                    'social',
                    'toolbar=0,status=0,menubar=0,height=450,width=600'
                );
            }
            socialUrl = openUrl;
            if (socialWindow && $.isFunction(socialWindow.focus)) {
                // focus not available when this triggers mobile apps
                socialWindow.focus();
            }
        });
}

/**
 * Wait for document to be ready to initialize UI
 * Note: no need to use the i18n.loaded event here
 */
$(() => {
    // Initialize social buttons
    initSocialButtons();

    // Log page readiness
    logger.info({
        message: `post page initialized in ${i18n.locale()}`,
        method: 'document.ready'
    });
});