cd /d %~dp0

REM ************************************************************
REM IMPORTANT!
REM Memba-WebApp is the original project where any modifications
REM of locked read-only files should be completed.
REM ************************************************************

set MEMBA_WEBAPP="../Memba-Webapp"

REM ------------------------------------------------------------
REM Root files
REM ------------------------------------------------------------

REM copy all dot files
ATTRIB -R .\.*
COPY %MEMBA_WEBAPP%\.* .\ /Y
ATTRIB +R .\.*

REM build.cmd and BUILD.md
ATTRIB -R .\build.*
COPY %MEMBA_WEBAPP%\build.* .\ /Y
ATTRIB +R .\build.*

REM Mocha with coverage
ATTRIB -R .\coverage.cmd
COPY %MEMBA_WEBAPP%\coverage.cmd .\ /Y
ATTRIB +R .\coverage.cmd

REM Karma with coverage
ATTRIB -R .\coverage.con*
COPY %MEMBA_WEBAPP%\coverage.conf.* .\ /Y
ATTRIB +R .\coverage.conf.*

REM Dockerfile
ATTRIB -R .\Dockerfile
COPY %MEMBA_WEBAPP%\Dockerfile .\ /Y
ATTRIB +R .\Dockerfile

REM LICENSE
REM ATTRIB -R .\LICENSE-GPLv3
REM COPY %MEMBA_WEBAPP%\LICENSE-GPLv3 .\ /Y
REM ATTRIB +R .\LICENSE-GPLv3

REM postcss.config.js
ATTRIB -R .\postcss.config.js
COPY %MEMBA_WEBAPP%\postcss.config.js .\ /Y
ATTRIB +R .\postcss.config.js

REM setup.cmd and setup.sh
ATTRIB -R .\setup.*
COPY %MEMBA_WEBAPP%\setup.* .\ /Y
ATTRIB +R .\setup.*

REM UPDATE.md
ATTRIB -R .\UPDATE.md
COPY %MEMBA_WEBAPP%\UPDATE.md .\ /Y
ATTRIB +R .\UPDATE.md

REM watch.cmd
ATTRIB -R .\watch.cmd
COPY %MEMBA_WEBAPP%\watch.cmd .\ /Y
ATTRIB +R .\watch.cmd

REM wdio.conf.js
ATTRIB -R .\wdio.conf.js
COPY %MEMBA_WEBAPP%\wdio.conf.js .\ /Y
ATTRIB +R .\wdio.conf.js

REM webpack
REM ATTRIB -R .\webpack.config.js
REM COPY %MEMBA_WEBAPP%\webpack.config.js .\ /Y
REM ATTRIB +R .\webpack.config.js

REM ------------------------------------------------------------
REM Client ./src/js
REM ------------------------------------------------------------

REM ./src/js/.eslintrc
ATTRIB -R .\src\js\.eslint*
COPY %MEMBA_WEBAPP%\src\js\.eslint* .\src\js\ /Y
ATTRIB +R .\src\js\.eslint*

REM ./src/js/app
ATTRIB -R .\src\js\app\*.es6
COPY %MEMBA_WEBAPP%\src\js\app\app.controller.es6 .\src\js\app /Y
ATTRIB +R .\src\js\app\app.controller.es6
COPY %MEMBA_WEBAPP%\src\js\app\app.i18n.es6 .\src\js\app /Y
ATTRIB +R .\src\js\app\app.i18n.es6
COPY %MEMBA_WEBAPP%\src\js\app\app.init.es6 .\src\js\app /Y
ATTRIB +R .\src\js\app\app.init.es6
COPY %MEMBA_WEBAPP%\src\js\app\app.initializers.es6 .\src\js\app /Y
ATTRIB +R .\src\js\app\app.initializers.es6
COPY %MEMBA_WEBAPP%\src\js\app\app.logger.es6 .\src\js\app /Y
ATTRIB +R .\src\js\app\app.logger.es6
COPY %MEMBA_WEBAPP%\src\js\app\app.notification.es6 .\src\js\app /Y
ATTRIB +R .\src\js\app\app.notification.es6
COPY %MEMBA_WEBAPP%\src\js\app\app.themer.es6 .\src\js\app /Y
ATTRIB +R .\src\js\app\app.themer.es6

REM ./src/js/common
ATTRIB -R .\src\js\common\*.es6
COPY %MEMBA_WEBAPP%\src\js\common\window.assert.es6 .\src\js\common /Y
COPY %MEMBA_WEBAPP%\src\js\common\window.constants.es6 .\src\js\common /Y
COPY %MEMBA_WEBAPP%\src\js\common\window.global.es6 .\src\js\common /Y
COPY %MEMBA_WEBAPP%\src\js\common\window.logger.es6 .\src\js\common /Y
ATTRIB +R .\src\js\common\*.es6

REM ./src/js/cultures
ATTRIB -R .\src\js\cultures\widgets.*.es6
COPY %MEMBA_WEBAPP%\src\js\cultures\widgets.*.es6  .\src\js\cultures /Y
ATTRIB +R .\src\js\cultures\widgets.*.es6

REM ./src/js/data
ATTRIB -R .\src\js\data\data.util.es6
COPY %MEMBA_WEBAPP%\src\js\data\data.util.es6  .\src\js\data /Y
ATTRIB +R .\src\js\data\data.util.es6

REM ./src/js/helper
ATTRIB -R .\src\js\helpers\system.config.js
COPY .%MEMBA_WEBAPP%\src\js\helpers\system.config.js  .\src\js\helpers /Y
ATTRIB -R .\src\js\helpers\system.config.js

REM ./src/js/ui
ATTRIB -R .\src\js\ui\*.es6
COPY %MEMBA_WEBAPP%\src\js\ui\page.error.es6 .\src\js\ui /Y
ATTRIB +R .\src\js\ui\page.error.es6
COPY %MEMBA_WEBAPP%\src\js\ui\ui.footer.es6 .\src\js\ui /Y
ATTRIB +R .\src\js\ui\ui.footer.es6
COPY %MEMBA_WEBAPP%\src\js\ui\ui.reveal.es6 .\src\js\ui /Y
ATTRIB +R .\src\js\ui\ui.reveal.es6

REM ./src/js/vendor

REM bootstrap
XCOPY %MEMBA_WEBAPP%\src\js\vendor\bootstrap\*.* .\src\js\vendor\bootstrap\ /C /E /I /R /Y
ATTRIB +R .\src\js\vendor\bootstrap\*.* /S

REM jQuery
XCOPY %MEMBA_WEBAPP%\src\js\vendor\jquery\*.* .\src\js\vendor\jquery /C /E /I /R /Y
ATTRIB +R .\src\js\vendor\jquery\*.* /S

REM lazd/inobounce
XCOPY %MEMBA_WEBAPP%\src\js\vendor\lazd\*.* .\src\js\vendor\lazd\ /C /E /I /R /Y
ATTRIB +R .\src\js\vendor\lazd\*.* /S

REM Kendo UI
XCOPY %MEMBA_WEBAPP%\src\js\vendor\kendo\*.* .\src\js\vendor\kendo\ /C /E /I /R /Y
ATTRIB +R .\src\js\vendor\kendo\*.* /S

REM Modernizr
XCOPY %MEMBA_WEBAPP%\src\js\vendor\modernizr\*.* .\src\js\vendor\modernizr\ /C /E /I /R /Y
ATTRIB +R .\src\js\vendor\modernizr\*.* /S

REM ------------------------------------------------------------
REM Client ./src/styles
REM ------------------------------------------------------------

REM ./src/styles/dependencies
ATTRIB -R .\src\styles\dependencies\_highlightjs.scss
COPY %MEMBA_WEBAPP%\src\styles\dependencies\_highlightjs.scss .\src\styles\dependencies\ /Y
ATTRIB +R .\src\styles\dependencies\_highlightjs.scss

REM .\src\styles\dialogs
REM ATTRIB -R .\src\styles\dialogs\*.*
REM COPY %MEMBA_WEBAPP%\src\styles\dialogs\kidoju.tools.less .\src\styles\dialogs\ /Y
REM ATTRIB +R .\src\styles\dialogs\kidoju.tools.less

REM ./src/styles/fonts
XCOPY %MEMBA_WEBAPP%\dist\fonts\*.* .\src\styles\fonts\ /C /E /I /R /Y
ATTRIB +R .\src\styles\fonts\*.* /S

REM ./src/styles/images
COPY .\graphics\memba.home.jpg .\src\styles\images\jumbotron.jpg /Y
ATTRIB +R .\src\styles\images\*.* /S

REM ./src/styles/template
ATTRIB -R .\src\styles\template\*.*
COPY %MEMBA_WEBAPP%\src\styles\template\_app.theme.scss .\src\styles\template\ /Y
ATTRIB +R .\src\styles\template\_app.theme.scss
COPY %MEMBA_WEBAPP%\src\styles\template\_bootstrap.scss .\src\styles\template\ /Y
ATTRIB +R .\src\styles\template\_bootstrap.scss
COPY %MEMBA_WEBAPP%\src\styles\template\_global.scss .\src\styles\template\ /Y
ATTRIB +R .\src\styles\template\_global.scss /S

REM ./src/styles/themes
XCOPY %MEMBA_WEBAPP%\src\styles\themes\*.scss .\src\styles\themes\ /C /E /I /R /Y
ATTRIB +R .\src\styles\themes\*.scss /S
REM COPY %MEMBA_WEBAPP%\src\styles\themes\app.theme.nordic.css .\src\styles\themes /Y
REM ATTRIB +R .\src\styles\themes\*.css /S

REM ./src/styles/ui
ATTRIB -R .\src\styles\ui\*.scss
COPY %MEMBA_WEBAPP%\src\styles\ui\_page.common.scss .\src\styles\ui\ /Y
ATTRIB +R .\src\styles\ui\_page.common.scss
COPY %MEMBA_WEBAPP%\src\styles\ui\_ui.appbar.scss .\src\styles\ui\ /Y
ATTRIB +R .\src\styles\ui\_ui.appbar.scss
COPY %MEMBA_WEBAPP%\src\styles\ui\_ui.drawer.scss .\src\styles\ui\ /Y
ATTRIB +R .\src\styles\ui\_ui.drawer.scss
COPY %MEMBA_WEBAPP%\src\styles\ui\_ui.footer.scss .\src\styles\ui\ /Y
ATTRIB +R .\src\styles\ui\_ui.footer.scss
COPY %MEMBA_WEBAPP%\src\styles\ui\_ui.icons.scss .\src\styles\ui\ /Y
ATTRIB +R .\src\styles\ui\_ui.icons.scss

REM ./src/styles/vendor

REM animate.css
XCOPY %MEMBA_WEBAPP%\src\styles\vendor\animate.css\*.* .\src\styles\vendor\animate.css\ /C /E /I /R /Y
ATTRIB +R .\src\styles\vendor\animate.css\*.* /S

REM bootstrap
REM XCOPY %MEMBA_WEBAPP%\src\styles\vendor\bootstrap\*.* .\src\styles\vendor\bootstrap\ /C /E /I /R /Y
REM ATTRIB +R .\src\styles\vendor\bootstrap\*.* /S

REM highlight
XCOPY %MEMBA_WEBAPP%\src\styles\vendor\highlight\*.* .\src\styles\vendor\highlight\ /C /E /I /R /Y
ATTRIB +R .\src\styles\vendor\highlight\*.* /S

REM Kendo UI
REM XCOPY %MEMBA_WEBAPP%\src\styles\vendor\kendo\*.* .\src\styles\vendor\kendo\ /C /E /I /R /Y
REM ATTRIB +R .\src\styles\vendor\kendo\*.* /S

REM Social icons
REM ATTRIB -R .\webapp\public\*.svg
REM COPY %MEMBA_WEBAPP%\webapp\public\facebook.svg .\webapp\public\ /Y
REM COPY %MEMBA_WEBAPP%\webapp\public\google.svg .\webapp\public\ /Y
REM COPY %MEMBA_WEBAPP%\webapp\public\linkedin.svg .\webapp\public\ /Y
REM COPY %MEMBA_WEBAPP%\webapp\public\pinterest.svg .\webapp\public\ /Y
REM COPY %MEMBA_WEBAPP%\webapp\public\twitter.svg .\webapp\public\ /Y
ATTRIB +R .\webapp\public\*.svg

REM ------------------------------------------------------------
REM Tests
REM ------------------------------------------------------------

REM ./test/browser/.eslintrc
ATTRIB -R .\test\browser\*.*
COPY %MEMBA_WEBAPP%\test\browser\.eslintrc .\test\browser /Y
ATTRIB +R .\test\browser\.eslintrc

REM ./test/node/common.es6
ATTRIB -R .\test\node\common.es6
COPY %MEMBA_WEBAPP%\test\node\common.es6 .\test\node /Y
ATTRIB +R .\test\node\common.es6

REM ./test/node/config
ATTRIB -R .\test\node\config\*.es6
COPY %MEMBA_WEBAPP%\test\node\config\*.es6 .\test\node\config /Y
ATTRIB +R .\test\node\config\*.es6

REM ./test/node/lib
ATTRIB -R .\test\node\lib\*.es6
COPY %MEMBA_WEBAPP%\test\node\lib\applicationError.test.es6 .\test\node\lib /Y
ATTRIB +R .\test\node\lib\applicationError.test.es6
COPY %MEMBA_WEBAPP%\test\node\lib\logger.test.es6 .\test\node\lib /Y
ATTRIB +R .\test\node\lib\logger.test.es6
COPY %MEMBA_WEBAPP%\test\node\lib\utils.test.es6 .\test\node\lib /Y
ATTRIB +R .\test\node\lib\utils.test.es6

REM ./test/node/middleware
ATTRIB -R .\test\node\middleware\*.es6
COPY %MEMBA_WEBAPP%\test\node\middleware\error.test.es6 .\test\node\middleware /Y
ATTRIB +R .\test\node\middleware\error.test.es6
COPY %MEMBA_WEBAPP%\test\node\middleware\locals.test.es6 .\test\node\middleware /Y
ATTRIB +R .\test\node\middleware\locals.test.es6
COPY %MEMBA_WEBAPP%\test\node\middleware\notFound.test.es6 .\test\node\middleware /Y
ATTRIB +R .\test\node\middleware\notFound.test.es6
COPY %MEMBA_WEBAPP%\test\node\middleware\params.test.es6 .\test\node\middleware /Y
ATTRIB +R .\test\node\middleware\params.test.es6
COPY %MEMBA_WEBAPP%\test\node\middleware\redirect.test.es6 .\test\node\middleware /Y
ATTRIB +R .\test\node\middleware\redirect.test.es6

REM ./test/node/plugins
REM ATTRIB -R .\test\node\plugins\*.*
REM COPY %MEMBA_WEBAPP%\test\node\plugins\index.test.es6 .\test\node\plugins /Y
REM ATTRIB +R .\test\node\plugins\index.test.es6
COPY %MEMBA_WEBAPP%\test\node\plugins\slack.test.es6 .\test\node\plugins /Y
ATTRIB +R .\test\node\plugins\slack.test.es6

REM ./test/node/route
ATTRIB -R .\test\node\routes\*.*
COPY %MEMBA_WEBAPP%\test\node\routes\errorRoute.test.es6 .\test\node\routes /Y
ATTRIB +R .\test\node\routes\errorRoute.test.es6
COPY %MEMBA_WEBAPP%\test\node\routes\loggerRoute.test.es6 .\test\node\routes /Y
ATTRIB +R .\test\node\routes\loggerRoute.test.es6
COPY %MEMBA_WEBAPP%\test\node\routes\pingRoute.test.es6 .\test\node\routes /Y
ATTRIB +R .\test\node\routes\pingRoute.test.es6

REM ./test/selenium
ATTRIB -R .\test\selenium\_misc\*.es6
COPY %MEMBA_WEBAPP%\test\selenium\_misc\*.es6 .\test\selenium\_misc /Y
ATTRIB +R .\test\selenium\_misc\*.es6

REM ./test/vendor
XCOPY %MEMBA_WEBAPP%\test\vendor  .\test\vendor /C /E /I /R /Y
ATTRIB +R .\test\vendor\*.* /S

REM ------------------------------------------------------------
REM Web modules (webpack)
REM ------------------------------------------------------------

REM web_modules
XCOPY %MEMBA_WEBAPP%\web_modules\*.*  .\web_modules /C /E /I /R /Y
ATTRIB +R .\web_modules\*.* /S

REM ------------------------------------------------------------
REM Web Application
REM ------------------------------------------------------------

REM ./webapp/config
ATTRIB -R .\webapp\config\index.es6
COPY %MEMBA_WEBAPP%\webapp\config\index.es6 .\webapp\config /Y
ATTRIB +R .\webapp\config\index.es6

REM ./webapp/lib
ATTRIB -R .\webapp\lib\*.es6
COPY %MEMBA_WEBAPP%\webapp\lib\applicationError.es6 .\webapp\lib /Y
ATTRIB +R .\webapp\lib\applicationError.es6
COPY %MEMBA_WEBAPP%\webapp\lib\constants.es6 .\webapp\lib /Y
ATTRIB +R .\webapp\lib\constants.es6
COPY %MEMBA_WEBAPP%\webapp\lib\httpStatus.es6 .\webapp\lib /Y
ATTRIB +R .\webapp\lib\httpStatus.es6
COPY %MEMBA_WEBAPP%\webapp\lib\logger.es6 .\webapp\lib /Y
ATTRIB +R .\webapp\lib\logger.es6
COPY %MEMBA_WEBAPP%\webapp\lib\utils.es6 .\webapp\lib /Y
ATTRIB +R .\webapp\lib\utils.es6

REM ./webapp/middleware
ATTRIB -R .\webapp\middleware\*.es6
COPY %MEMBA_WEBAPP%\webapp\middleware\error.es6 .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\error.es6
COPY %MEMBA_WEBAPP%\webapp\middleware\locals.es6 .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\locals.es6
COPY %MEMBA_WEBAPP%\webapp\middleware\notFound.es6 .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\notFound.es6
COPY %MEMBA_WEBAPP%\webapp\middleware\params.es6 .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\params.es6
COPY %MEMBA_WEBAPP%\webapp\middleware\redirect.es6 .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\redirect.es6

REM ./webapp/plugins
ATTRIB -R .\webapp\plugins\*.*
COPY %MEMBA_WEBAPP%\webapp\plugins\index.es6 .\webapp\plugins /Y
ATTRIB +R .\webapp\plugins\index.es6
COPY %MEMBA_WEBAPP%\webapp\plugins\slack.es6 .\webapp\plugins /Y
ATTRIB +R .\webapp\plugins\slack.es6

REM ./webapp/routes
ATTRIB -R .\webapp\routes\*.*
COPY %MEMBA_WEBAPP%\webapp\routes\errorRoute.es6 .\webapp\routes /Y
ATTRIB +R .\webapp\routes\errorRoute.es6
COPY %MEMBA_WEBAPP%\webapp\routes\loggerRoute.es6 .\webapp\routes /Y
ATTRIB +R .\webapp\routes\loggerRoute.es6
COPY %MEMBA_WEBAPP%\webapp\routes\pingRoute.es6 .\webapp\routes /Y
ATTRIB +R .\webapp\routes\pingRoute.es6

REM ./webapp/views
ATTRIB -R .\webapp\views\*.*
COPY %MEMBA_WEBAPP%\webapp\views\common.ejs .\webapp\views /Y
ATTRIB +R .\webapp\views\common.ejs
COPY %MEMBA_WEBAPP%\webapp\views\error.ejs .\webapp\views /Y
ATTRIB +R .\webapp\views\error.ejs
COPY %MEMBA_WEBAPP%\webapp\views\footer.ejs .\webapp\views /Y
ATTRIB +R .\webapp\views\footer.ejs
COPY %MEMBA_WEBAPP%\webapp\views\head.ejs .\webapp\views /Y
ATTRIB +R .\webapp\views\head.ejs

REM ./webapp/server.js
ATTRIB -R .\webapp\server.js
COPY %MEMBA_WEBAPP%\webapp\server.js .\webapp\ /Y
ATTRIB +R .\webapp\server.js
