/**
 * Copyright (c) 2013-2016 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals define: false, require: false */

require('../styles/app.page.post.less');

(function (f, define) {
    'use strict';
    define([
        './window.assert',
        './window.logger',
        './app.logger',
        './app.i18n',
        './app.common',
        './app.menu'
    ], f);
})(function () {

    'use strict';

    (function ($, undefined) {

        var kendo = window.kendo;
        var app = window.app;
        var assert = window.assert;
        var logger = new window.Logger('app.post');
        var i18n = app.i18n;
        var CLICK = 'click';
        var POST_WRAPPER_SELECTOR = '#post-wrapper';
        var SOCIAL_SELECTOR = '.social';
        var COMMAND = {
            FACEBOOK: 'facebook',
            GOOGLE: 'google',
            LINKEDIN: 'linkedin',
            PINTEREST: 'pinterest',
            TWITTER: 'twitter',
            EMAIL: 'email'
        };

        /**
         * Initialize social buttons
         * @see http://www.sharelinkgenerator.com/
         * Also check Kidoju.WebApp -> app.summary.js
         */
        function initSocialButtons() {

            /* This function's cyclomatic complexity is too high. */
            /* jshint -W074 */

            $(POST_WRAPPER_SELECTOR).find(SOCIAL_SELECTOR)
                .on(CLICK, function (e) {
                    assert.instanceof($.Event, e, kendo.format(assert.messages.instanceof.default, 'e', 'default'));
                    assert.instanceof(window.HTMLAnchorElement, e.currentTarget, kendo.format(assert.messages.instanceof.default, 'e.currentTarget', 'window.HTMLAnchorElement'));
                    var sharedUrl = window.encodeURIComponent($('meta[property="og:url"]').attr('content'));
                    var source = window.encodeURIComponent($('meta[property="og:site_name"]').attr('content'));
                    var title = window.encodeURIComponent($('meta[property="og:title"]').attr('content'));
                    var description = window.encodeURIComponent($('meta[property="og:description"]').attr('content'));
                    var image = window.encodeURIComponent($('meta[property="og:image"]').attr('content'));
                    var command = $(e.currentTarget).attr(kendo.attr('command'));
                    var openUrl;
                    switch (command) {
                        case COMMAND.FACEBOOK:
                            // Facebook share dialog
                            // @ see https://developers.facebook.com/docs/sharing/web
                            // @ see https://developers.facebook.com/docs/sharing/reference/share-dialog
                            // @ see https://developers.facebook.com/docs/sharing/best-practices
                            // @see https://developers.facebook.com/tools/debug/ <---------------- DEBUG
                            openUrl = 'https://www.facebook.com/dialog/share' +
                                '?display=popup' +
                                '&app_id=' + app.facebook.clientID +
                                '&href=' + sharedUrl +
                                '&redirect_uri=' + sharedUrl;
                            /*
                            openUrl = 'https://www.facebook.com/sharer/sharer.php' +
                                '?u=' + sharedUrl;
                            */
                            break;
                        case COMMAND.GOOGLE:
                            // @see https://developers.google.com/+/web/share/
                            openUrl = 'https://plus.google.com/share' +
                                '?url=' + sharedUrl +
                                '&hl=' + i18n.locale();
                            break;
                        case COMMAND.LINKEDIN:
                            // @see https://developer.linkedin.com/docs/share-on-linkedin
                            // Note Linkedin uses open graph meta tags
                            openUrl = 'https://www.linkedin.com/shareArticle' +
                                '?mini=true' +
                                '&source=' + source +
                                '&summary=' + description +
                                '&title=' + title +
                                '&url=' + sharedUrl;

                            break;
                        case COMMAND.PINTEREST:
                            // @see https://developers.pinterest.com/docs/widgets/pin-it/
                            openUrl = 'https://pinterest.com/pin/create/button/' +
                                '?url=' + sharedUrl +
                                '&media=' + image +
                                '&description=' + description;
                            break;
                        case COMMAND.TWITTER:
                            // Twitter web intent
                            // @ see https://dev.twitter.com/web/tweet-button/web-intent
                            openUrl = 'https://twitter.com/intent/tweet' +
                                '?text=' + title +
                                '&url=' + sharedUrl +
                                '&via=' + app.twitter.account;
                            // TODO: hashtags (message size limit)?
                            break;
                        case COMMAND.EMAIL:
                            // TODO add icon in summary.ejs
                            openUrl = 'mailto:fastlec@memba.org?&subject=Shared Link&body=Hey%20loojk%20at%20that';
                            break;
                    }
                    if (socialWindow === null || socialWindow.closed || socialUrl !== openUrl) {
                        // Most social share dialogs resize themselves from a smaller window (not from a larger one)
                        // We might want to improve the (top, left) position
                        socialWindow = window.open(openUrl, 'social', 'toolbar=0,status=0,menubar=0,height=450,width=600');
                    }
                    socialUrl = openUrl;
                    socialWindow.focus();
                });

            /* jshint +W074 */
        }
        var socialWindow = null;
        var socialUrl;

        $(function () {

            initSocialButtons();

            // Log page readiness
            logger.info({
                message: 'post page initialized in ' + i18n.locale(),
                method: 'document.ready'
            });

        });

    }(window.jQuery));

    return window.app;

}, typeof define === 'function' && define.amd ? define : function (_, f) { 'use strict'; f(); });
