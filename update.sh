#!/bin/sh

# change directory to script location
cd "$(dirname "$0")"

# ************************************************************
# IMPORTANT!
# Memba-WebApp is the original project where any modifications
# of locked read-only files should be completed.
# ************************************************************

MEMBA_WEBAPP="../Memba-Webapp"

# ------------------------------------------------------------
# Root files
# ------------------------------------------------------------

# copy all dot files
# cp -f $MEMBA_WEBAPP/.* ./
cp -f $(ls -dp $MEMBA_WEBAPP/.* | grep -v /$) ./
chmod u-w $(ls -dp ./.* | grep -v /$)

# build.cmd and BUILD.md
cp -f $MEMBA_WEBAPP/build.* ./
chmod u-w ./build.*
cp -f $MEMBA_WEBAPP/BUILD.* ./
chmod u-w ./BUILD.*

# Mocha with coverage
cp -f $MEMBA_WEBAPP/coverage.cmd ./
chmod u-w ./coverage.cmd

# Karma with coverage
cp -f $MEMBA_WEBAPP/coverage.conf.* ./
chmod u-w ./coverage.conf.*

# Dockerfile
cp -f $MEMBA_WEBAPP/Dockerfile ./
chmod u-w ./Dockerfile

# LICENSE
cp -f $MEMBA_WEBAPP/LICENSE ./
chmod u-w ./LICENSE

# postcss.config.js
cp -f $MEMBA_WEBAPP/postcss.config.js ./
chmod u-w ./postcss.config.js

# setup.cmd ans setup.sh
cp -f $MEMBA_WEBAPP/setup.* ./
chmod u-w ./setup.*

# UPDATE.md
cp -f $MEMBA_WEBAPP/UPDATE.md ./
chmod u-w ./UPDATE.md

# watch.cmd
cp -f $MEMBA_WEBAPP/watch.cmd ./
chmod u-w ./watch.cmd

# wdio.conf.js
cp -f $MEMBA_WEBAPP/wdio.conf.* ./
chmod u-w ./wdio.conf.*

# webpack
# cp -f $MEMBA_WEBAPP/webpack.config.js ./
# chmod u-w ./webpack.config.js

# ------------------------------------------------------------
# Client ./src/js
# ------------------------------------------------------------

# ./src/js/.eslintrc
cp -f $MEMBA_WEBAPP/src/js/.eslint* ./src/js/
chmod u-w ./src/js/.eslint*

# ./src/js/app
cp -f $MEMBA_WEBAPP/src/js/app/app.controller.es6 ./src/js/app/
chmod u-w ./src/js/app/app.controller.es6
cp -f $MEMBA_WEBAPP/src/js/app/app.i18n.es6 ./src/js/app/
chmod u-w ./src/js/app/app.i18n.es6
cp -f $MEMBA_WEBAPP/src/js/app/app.init.es6 ./src/js/app/
chmod u-w ./src/js/app/app.init.es6
cp -f $MEMBA_WEBAPP/src/js/app/app.initializers.es6 ./src/js/app/
chmod u-w ./src/js/app/app.initializers.es6
cp -f $MEMBA_WEBAPP/src/js/app/app.logger.es6 ./src/js/app/
chmod u-w ./src/js/app/app.logger.es6
cp -f $MEMBA_WEBAPP/src/js/app/app.notification.es6 ./src/js/app/
chmod u-w ./src/js/app/app.notification.es6
cp -f $MEMBA_WEBAPP/src/js/app/app.themer.es6 ./src/js/app/
chmod u-w ./src/js/app/app.themer.es6

# ./src/js/common
cp -f $MEMBA_WEBAPP/src/js/common/window.assert.es6 ./src/js/common/
chmod u-w ./src/js/common/window.assert.es6
cp -f $MEMBA_WEBAPP/src/js/common/window.constants.es6 ./src/js/common/
chmod u-w ./src/js/common/window.constants.es6
cp -f $MEMBA_WEBAPP/src/js/common/window.global.es6 ./src/js/common/
chmod u-w ./src/js/common/window.global.es6
cp -f $MEMBA_WEBAPP/src/js/common/window.logger.es6 ./src/js/common/
chmod u-w ./src/js/common/window.logger.es6

# ./src/js/cultures
cp -f $MEMBA_WEBAPP/src/js/cultures/widgets.*.es6 ./src/js/cultures/
chmod u-w ./src/js/cultures/widgets.*.es6

# ./src/js/data
cp -f $MEMBA_WEBAPP/src/js/data/data.util.es6 ./src/js/data/
chmod u-w ./src/js/data/data.util.es6

# ./src/js/helper
cp -f $MEMBA_WEBAPP/src/js/helpers/system.config.js ./src/js/helpers/
chmod u-w ./src/js/helpers/system.config.js

# ./src/js/ui
cp -f $MEMBA_WEBAPP/src/js/ui/page.error.es6 ./src/js/ui/
chmod u-w ./src/js/ui/page.error.es6
cp -f $MEMBA_WEBAPP/src/js/ui/ui.footer.es6 ./src/js/ui/
chmod u-w ./src/js/ui/ui.footer.es6
cp -f $MEMBA_WEBAPP/src/js/ui/ui.reveal.es6 ./src/js/ui/
chmod u-w ./src/js/ui/ui.reveal.es6

# ./src/js/vendor

# bootstrap
find ./src/js/vendor/bootstrap/ -type f -exec chmod u+w {} \;
cp -f -r $MEMBA_WEBAPP/src/js/vendor/bootstrap/* ./src/js/vendor/bootstrap/
find ./src/js/vendor/bootstrap/ -type f -exec chmod u-w {} \;

# jQuery
cp -f $MEMBA_WEBAPP/src/js/vendor/jquery/* ./src/js/vendor/jquery/
chmod u-w ./src/js/vendor/jquery/*

# lazd/inobounce
cp -f $MEMBA_WEBAPP/src/js/vendor/lazd/* ./src/js/vendor/lazd/
chmod u-w ./src/js/vendor/lazd/*

# Kendo UI
find ./src/js/vendor/kendo/ -type f -exec chmod u+w {} \;
cp -f -r $MEMBA_WEBAPP/src/js/vendor/kendo/* ./src/js/vendor/kendo/
find ./src/js/vendor/kendo/ -type f -exec chmod u-w {} \;

# Modernizr
cp -f $MEMBA_WEBAPP/src/js/vendor/modernizr/* ./src/js/vendor/modernizr/
chmod u-w ./src/js/vendor/modernizr/*

# ------------------------------------------------------------
# Client ./src/styles
# ------------------------------------------------------------

# ./src/styles/dependencies
cp -f $MEMBA_WEBAPP/src/styles/dependencies/_highlightjs.scss ./src/styles/dependencies/
chmod u-w ./src/styles/dependencies/_highlightjs.scss

# ./src/styles/dialogs
# find ./src/styles/dialogs/ -type f -name "*.scss" -exec chmod u+w {} \;
# rsync -r --include="*.scss" --exclude="*" $MEMBA_WEBAPP/src/styles/dialogs/ ./src/styles/dialogs/
# find ./src/styles/dialogs/ -type f -name "*.scss" -exec chmod u-w {} \;

# ./src/styles/fonts
cp -f $MEMBA_WEBAPP/src/styles/fonts/* ./src/styles/fonts/
chmod u-w ./src/styles/fonts/*

# ./src/styles/images
cp -f ./graphics/memba.home.jpg ./src/styles/images/jumbotron.jpg
chmod u-w ./src/styles/images/*

# ./src/styles/template
cp -f $MEMBA_WEBAPP/src/styles/template/_app.theme.scss ./src/styles/template/
chmod u-w ./src/styles/template/_app.theme.scss
cp -f $MEMBA_WEBAPP/src/styles/template/_bootstrap.scss ./src/styles/template/
chmod u-w ./src/styles/template/_bootstrap.scss
cp -f $MEMBA_WEBAPP/src/styles/template/_global.scss ./src/styles/template/
chmod u-w ./src/styles/template/_global.scss

# ./src/styles/themes
find ./src/styles/themes/ -type f -name "*.scss" -exec chmod u+w {} \;
rsync -r --include="*.scss" --exclude="*" $MEMBA_WEBAPP/src/styles/themes/ ./src/styles/themes/
find ./src/styles/themes/ -type f -name "*.scss" -exec chmod u-w {} \;
# cp -f $MEMBA_WEBAPP/src/styles/themes/app.theme.nordic.css ./src/styles/themes/
# chmod u-w ./src/styles/themes/app.theme.nordic.css

# ./src/styles/ui
cp -f $MEMBA_WEBAPP/src/styles/ui/_page.common.scss ./src/styles/ui/
chmod u-w ./src/styles/ui/_page.common.scss
cp -f $MEMBA_WEBAPP/src/styles/ui/_ui.appbar.scss ./src/styles/ui/
chmod u-w ./src/styles/ui/_ui.appbar.scss
cp -f $MEMBA_WEBAPP/src/styles/ui/_ui.drawer.scss ./src/styles/ui/
chmod u-w ./src/styles/ui/_ui.drawer.scss
cp -f $MEMBA_WEBAPP/src/styles/ui/_ui.footer.scss ./src/styles/ui/
chmod u-w ./src/styles/ui/_ui.footer.scss
cp -f $MEMBA_WEBAPP/src/styles/ui/_ui.icons.scss ./src/styles/ui/
chmod u-w ./src/styles/ui/_ui.icons.scss

# ./src/styles/vendor

# animate.css
find ./src/styles/vendor/animate.css/ -type f -exec chmod u+w {} \;
cp -f -r $MEMBA_WEBAPP/src/styles/vendor/animate.css/* ./src/styles/vendor/animate.css/
find ./src/styles/vendor/animate.css/ -type f -exec chmod u-w {} \;

# bootstrap
# find ./src/styles/vendor/bootstrap/ -type f -exec chmod u+w {} \;
# cp -f -r $MEMBA_WEBAPP/src/styles/vendor/bootstrap/* ./src/styles/vendor/bootstrap/
# find ./src/styles/vendor/bootstrap/ -type f -exec chmod u-w {} \;

# highlight
find ./src/styles/vendor/highlight/ -type f -exec chmod u+w {} \;
cp -f -r $MEMBA_WEBAPP/src/styles/vendor/highlight/* ./src/styles/vendor/highlight/
find ./src/styles/vendor/highlight/ -type f -exec chmod u-w {} \;

# Kendo UI
# find ./src/styles/vendor/kendo/ -type f -exec chmod u+w {} \;
# cp -f -r $MEMBA_WIDGETS/src/styles/vendor/kendo/* ./src/styles/vendor/kendo/
# find ./src/styles/vendor/kendo/ -type f -exec chmod u-w {} \;

# Social icons
# cp -f $MEMBA_WEBAPP/webapp/public/facebook.svg ./webapp/public/
# cp -f $MEMBA_WEBAPP/webapp/public/google.svg ./webapp/public/
# cp -f $MEMBA_WEBAPP/webapp/public/linkedin.svg ./webapp/public/
# cp -f $MEMBA_WEBAPP/webapp/public/pinterest.svg ./webapp/public/
# cp -f $MEMBA_WEBAPP/webapp/public/twitter.svg ./webapp/public/
chmod u-w ./webapp/public/*.svg

# ------------------------------------------------------------
# Tests
# ------------------------------------------------------------

# ./test/browser/.eslintrc
cp -f $MEMBA_WEBAPP/test/browser/.eslintrc ./test/browser/
chmod u-w ./test/browser/.eslintrc

# ./test/node/common.es6
cp -f $MEMBA_WEBAPP/test/node/common.es6 ./test/node/
chmod u-w ./test/node/common.es6

# ./test/node/config
cp -f $MEMBA_WEBAPP/test/node/config/*.es6 ./test/node/config/
chmod u-w ./test/node/config/*.es6

# ./test/node/lib
cp -f $MEMBA_WEBAPP/test/node/lib/applicationError.test.es6 ./test/node/lib/
chmod u-w ./test/node/lib/applicationError.test.es6
cp -f $MEMBA_WEBAPP/test/node/lib/logger.test.es6 ./test/node/lib/
chmod u-w ./test/node/lib/logger.test.es6
cp -f $MEMBA_WEBAPP/test/node/lib/utils.test.es6 ./test/node/lib/
chmod u-w ./test/node/lib/utils.test.es6

# ./test/node/middleware
cp -f $MEMBA_WEBAPP/test/node/middleware/error.test.es6 ./test/node/middleware/
chmod u-w ./test/node/middleware/error.test.es6
cp -f $MEMBA_WEBAPP/test/node/middleware/locals.test.es6 ./test/node/middleware/
chmod u-w ./test/node/middleware/locals.test.es6
cp -f $MEMBA_WEBAPP/test/node/middleware/notFound.test.es6 ./test/node/middleware/
chmod u-w ./test/node/middleware/notFound.test.es6
cp -f $MEMBA_WEBAPP/test/node/middleware/params.test.es6 ./test/node/middleware/
chmod u-w ./test/node/middleware/params.test.es6
cp -f $MEMBA_WEBAPP/test/node/middleware/redirect.test.es6 ./test/node/middleware/
chmod u-w ./test/node/middleware/redirect.test.es6

# ./test/node/plugins
# cp -f $MEMBA_WEBAPP/test/node/plugins/index.test.es6 ./test/node/plugins/
# chmod u-w ./test/node/plugins/index.test.es6
cp -f $MEMBA_WEBAPP/test/node/plugins/slack.test.es6 ./test/node/plugins/
chmod u-w ./test/node/plugins/slack.test.es6

# ./test/node/route
cp -f $MEMBA_WEBAPP/test/node/routes/errorRoute.test.es6 ./test/node/routes/
chmod u-w ./test/node/routes/errorRoute.test.es6
cp -f $MEMBA_WEBAPP/test/node/routes/loggerRoute.test.es6 ./test/node/routes/
chmod u-w ./test/node/routes/loggerRoute.test.es6
cp -f $MEMBA_WEBAPP/test/node/routes/pingRoute.test.es6 ./test/node/routes/
chmod u-w ./test/node/routes/pingRoute.test.es6

# ./test/selenium
cp -f $MEMBA_WEBAPP/test/selenium/_misc/*.es6 ./test/selenium/_misc/
chmod u-w ./test/selenium/_misc/*.es6

# ./test/vendor
cp -f $MEMBA_WEBAPP/test/vendor/* ./test/vendor/
chmod u-w ./test/vendor/*

# ------------------------------------------------------------
# Web modules (webpack)
# ------------------------------------------------------------

# web_modules
find ./web_modules/ -type f -exec chmod u+w {} \;
cp -f -r $MEMBA_WEBAPP/web_modules/* ./web_modules/
find ./web_modules/ -type f -exec chmod u-w {} \;

# ------------------------------------------------------------
# Web Application
# ------------------------------------------------------------

# ./webapp/config
cp -f $MEMBA_WEBAPP/webapp/config/index.es6 ./webapp/config/
chmod u-w ./webapp/config/index.es6

# ./webapp/lib
cp -f $MEMBA_WEBAPP/webapp/lib/applicationError.es6 ./webapp/lib/
chmod u-w ./webapp/lib/applicationError.es6
cp -f $MEMBA_WEBAPP/webapp/lib/constants.es6 ./webapp/lib/
chmod u-w ./webapp/lib/constants.es6
cp -f $MEMBA_WEBAPP/webapp/lib/httpStatus.es6 ./webapp/lib/
chmod u-w ./webapp/lib/httpStatus.es6
cp -f $MEMBA_WEBAPP/webapp/lib/logger.es6 ./webapp/lib/
chmod u-w ./webapp/lib/logger.es6
cp -f $MEMBA_WEBAPP/webapp/lib/utils.es6 ./webapp/lib/
chmod u-w ./webapp/lib/utils.es6

# ./webapp/middleware
cp -f $MEMBA_WEBAPP/webapp/middleware/error.es6 ./webapp/middleware/
chmod u-w ./webapp/middleware/error.es6
cp -f $MEMBA_WEBAPP/webapp/middleware/locals.es6 ./webapp/middleware/
chmod u-w ./webapp/middleware/locals.es6
cp -f $MEMBA_WEBAPP/webapp/middleware/notFound.es6 ./webapp/middleware/
chmod u-w ./webapp/middleware/notFound.es6
cp -f $MEMBA_WEBAPP/webapp/middleware/params.es6 ./webapp/middleware/
chmod u-w ./webapp/middleware/params.es6
cp -f $MEMBA_WEBAPP/webapp/middleware/redirect.es6 ./webapp/middleware/
chmod u-w ./webapp/middleware/redirect.es6

# ./webapp/plugins
cp -f $MEMBA_WEBAPP/webapp/plugins/index.es6 ./webapp/plugins/
chmod u-w ./webapp/plugins/index.es6
cp -f $MEMBA_WEBAPP/webapp/plugins/slack.es6 ./webapp/plugins/
chmod u-w ./webapp/plugins/slack.es6

# ./webapp/routes
cp -f $MEMBA_WEBAPP/webapp/routes/errorRoute.es6 ./webapp/routes/
chmod u-w ./webapp/routes/errorRoute.es6
cp -f $MEMBA_WEBAPP/webapp/routes/loggerRoute.es6 ./webapp/routes/
chmod u-w ./webapp/routes/loggerRoute.es6
cp -f $MEMBA_WEBAPP/webapp/routes/pingRoute.es6 ./webapp/routes/
chmod u-w ./webapp/routes/pingRoute.es6

# ./webapp/views
cp -f $MEMBA_WEBAPP/webapp/views/common.ejs ./webapp/views/
chmod u-w ./webapp/views/common.ejs
cp -f $MEMBA_WEBAPP/webapp/views/error.ejs ./webapp/views/
chmod u-w ./webapp/views/error.ejs
cp -f $MEMBA_WEBAPP/webapp/views/footer.ejs ./webapp/views/
chmod u-w ./webapp/views/footer.ejs
cp -f $MEMBA_WEBAPP/webapp/views/head.ejs ./webapp/views/
chmod u-w ./webapp/views/head.ejs

# ./webapp/server.js
cp -f $MEMBA_WEBAPP/webapp/server.js ./webapp/
chmod u-w ./webapp/server.js
