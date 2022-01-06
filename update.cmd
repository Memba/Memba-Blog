cd /d %~dp0
REM ************************************************************
REM IMPORTANT!
REM Kidoju.WebApp is the original project where any modifications
REM of locked read-only files should be completed.
REM ************************************************************

REM ------------------------------------------------------------
REM Root files
REM ------------------------------------------------------------

REM copy all dot files
ATTRIB -R .\.*
COPY ..\Memba.Webapp\.* .\ /Y
ATTRIB +R .\.*

REM build.cmd and BUILD.md
ATTRIB -R .\build.*
COPY ..\Memba.Webapp\build.* .\ /Y
ATTRIB +R .\build.*

REM Mocha with coverage
ATTRIB -R .\coverage.cmd
COPY ..\Memba.Webapp\coverage.cmd .\ /Y
ATTRIB +R .\coverage.cmd

REM Karma with coverage
ATTRIB -R .\coverage.con*
COPY ..\Memba.Webapp\coverage.con* .\ /Y
ATTRIB +R .\coverage.con*

REM Dockerfile
ATTRIB -R .\Dockerfile
COPY ..\Memba.Webapp\Dockerfile .\ /Y
ATTRIB +R .\Dockerfile

REM LICENSE
REM ATTRIB -R .\LICENSE-GPLv3
REM COPY ..\Memba.Webapp\LICENSE-GPLv3 .\ /Y
REM ATTRIB +R .\LICENSE-GPLv3

REM postcss.config.js
ATTRIB -R .\postcss.config.js
COPY ..\Memba.Webapp\postcss.config.js .\ /Y
ATTRIB +R .\postcss.config.js

REM setup.cmd
ATTRIB -R .\setup.cmd
COPY ..\Memba.Webapp\setup.cmd .\ /Y
ATTRIB +R .\setup.cmd

REM UPDATE.md
ATTRIB -R .\UPDATE.md
COPY ..\Memba.Webapp\UPDATE.md .\ /Y
ATTRIB +R .\UPDATE.md

REM watch.cmd
ATTRIB -R .\watch.cmd
COPY ..\Memba.Webapp\watch.cmd .\ /Y
ATTRIB +R .\watch.cmd

REM wdio.conf.js
ATTRIB -R .\wdio.conf.js
COPY ..\Memba.Webapp\wdio.conf.js .\ /Y
ATTRIB +R .\wdio.conf.js

REM webpack
REM ATTRIB -R .\webpack.config.js
REM COPY ..\Memba.Webapp\webpack.config.js .\ /Y
REM ATTRIB +R .\webpack.config.js

REM ------------------------------------------------------------
REM Graphics
REM ------------------------------------------------------------

REM ------------------------------------------------------------
REM Javascript files
REM ------------------------------------------------------------

REM ./src/js/.eslintrc, etc.
ATTRIB -R .\src\js\.*
COPY ..\Memba.Webapp\src\js\.* .\src\js\ /Y
ATTRIB +R .\src\js\.*

REM ./src/js/app/*
ATTRIB -R .\src\js\app\*.es6
COPY ..\Memba.Webapp\src\js\app\app.controller.es6 .\src\js\app /Y
ATTRIB +R .\src\js\app\app.controller.es6
COPY ..\Memba.Webapp\src\js\app\app.i18n.es6 .\src\js\app /Y
ATTRIB +R .\src\js\app\app.i18n.es6
COPY ..\Memba.Webapp\src\js\app\app.init.es6 .\src\js\app /Y
ATTRIB +R .\src\js\app\app.init.es6
COPY ..\Memba.Webapp\src\js\app\app.initializers.es6 .\src\js\app /Y
ATTRIB +R .\src\js\app\app.initializers.es6
COPY ..\Memba.Webapp\src\js\app\app.logger.es6 .\src\js\app /Y
ATTRIB +R .\src\js\app\app.logger.es6
COPY ..\Memba.Webapp\src\js\app\app.notification.es6 .\src\js\app /Y
ATTRIB +R .\src\js\app\app.notification.es6
COPY ..\Memba.Webapp\src\js\app\app.themer.es6 .\src\js\app /Y
ATTRIB +R .\src\js\app\app.themer.es6

REM ./src/js/common/*
ATTRIB -R .\src\js\common\*.es6
COPY ..\Memba.Webapp\src\js\common\window.assert.es6 .\src\js\common /Y
COPY ..\Memba.Webapp\src\js\common\window.constants.es6 .\src\js\common /Y
COPY ..\Memba.Webapp\src\js\common\window.global.es6 .\src\js\common /Y
COPY ..\Memba.Webapp\src\js\common\window.logger.es6 .\src\js\common /Y
ATTRIB +R .\src\js\common\*.es6

REM ./src/js/cultures/*
ATTRIB -R .\src\js\cultures\widgets.*.es6
COPY ..\Memba.Webapp\src\js\cultures\widgets.*.es6  .\src\js\cultures /Y
ATTRIB +R .\src\js\cultures\widgets.*.es6

REM ./src/js/data/data.util.es6
ATTRIB -R .\src\js\data\data.util.es6
COPY ..\Memba.Webapp\src\js\data\data.util.es6  .\src\js\data /Y
ATTRIB +R .\src\js\data\data.util.es6

REM ./src/js/ui/*.es6
ATTRIB -R .\src\js\ui\*.es6
COPY ..\Memba.Webapp\src\js\ui\error.page.es6 .\src\js\ui /Y
ATTRIB +R .\src\js\ui\error.page.es6
COPY ..\Memba.Webapp\src\js\ui\ui.footer.es6 .\src\js\ui /Y
ATTRIB +R .\src\js\ui\ui.footer.es6
COPY ..\Memba.Webapp\src\js\ui\ui.reveal.es6 .\src\js\ui /Y
ATTRIB +R .\src\js\ui\ui.reveal.es6

REM Copy ./src/js/vendor/*
XCOPY ..\Memba.Webapp\src\js\vendor\bootstrap\*.* .\src\js\vendor\bootstrap\ /C /E /I /R /Y
ATTRIB +R .\src\js\vendor\bootstrap\*.* /S
XCOPY ..\Memba.WebApp\src\js\vendor\jquery\*.* .\src\js\vendor\jquery /C /E /I /R /Y
ATTRIB +R .\src\js\vendor\jquery\*.* /S
XCOPY ..\Memba.Webapp\src\js\vendor\lazd\*.* .\src\js\vendor\lazd\ /C /E /I /R /Y
ATTRIB +R .\src\js\vendor\lazd\*.* /S
XCOPY ..\Memba.Webapp\src\js\vendor\kendo\*.* .\src\js\vendor\kendo\ /C /E /I /R /Y
ATTRIB +R .\src\js\vendor\kendo\*.* /S
XCOPY ..\Memba.Webapp\src\js\vendor\modernizr\*.* .\src\js\vendor\modernizr\ /C /E /I /R /Y
ATTRIB +R .\src\js\vendor\modernizr\*.* /S

REM ------------------------------------------------------------
REM Styles
REM ------------------------------------------------------------

REM Copy ./src/styles/dependencises
ATTRIB -R .\src\styles\dependencies\_highlightjs.scss
COPY ..\Memba.Webapp\src\styles\dependencies\_highlightjs.scss .\src\styles\dependencies\ /Y
ATTRIB +R .\src\styles\dependencies\_highlightjs.scss

REM Copy .\src\styles\dialogs
REM ATTRIB -R .\src\styles\dialogs\*.*
REM COPY ..\Memba.Webapp\src\styles\dialogs\kidoju.tools.less .\src\styles\dialogs\ /Y
REM ATTRIB +R .\src\styles\dialogs\kidoju.tools.less

REM Copy ./src/styles/fonts
XCOPY ..\Memba.WebFonts\dist\fonts\*.* .\src\styles\fonts\ /C /E /I /R /Y
ATTRIB +R .\src\styles\fonts\*.* /S

REM Copy ./src/styles/images
COPY .\graphics\memba.home.jpg .\src\styles\images\jumbotron.jpg /Y
ATTRIB +R .\src\styles\images\*.* /S

REM Copy ./src/styles/themes
XCOPY ..\Memba.Webapp\src\styles\themes\*.scss .\src\styles\themes\ /C /E /I /R /Y
ATTRIB +R .\src\styles\themes\*.scss /S

REM Copy ./src/styles/ui
REM ATTRIB -R .\src\styles\ui\*.less
REM COPY ..\Memba.Webapp\src\styles\ui\app.common.less .\src\styles\ui\ /Y
REM ATTRIB +R .\src\styles\ui\app.common.less
REM COPY ..\Memba.Webapp\src\styles\ui\app.mixins.less .\src\styles\ui\ /Y
REM ATTRIB +R .\src\styles\ui\app.mixins.less
REM COPY ..\Memba.Webapp\src\styles\ui\error.page.less .\src\styles\ui\ /Y
REM ATTRIB +R .\src\styles\ui\error.page.less
ATTRIB -R .\src\styles\ui\*.scss
COPY ..\Memba.Webapp\src\styles\ui\_drawer.scss .\src\styles\ui\ /Y
ATTRIB +R .\src\styles\ui\_drawer.scss
COPY ..\Memba.Webapp\src\styles\ui\_footer.scss .\src\styles\ui\ /Y
ATTRIB +R .\src\styles\ui\_footer.scss
COPY ..\Memba.Webapp\src\styles\ui\_header.scss .\src\styles\ui\ /Y
ATTRIB +R .\src\styles\ui\_header.scss
COPY ..\Memba.Webapp\src\styles\ui\_icons.scss .\src\styles\ui\ /Y
ATTRIB +R .\src\styles\ui\_icons.scss
COPY ..\Memba.Webapp\src\styles\ui\_main.scss .\src\styles\ui\ /Y
ATTRIB +R .\src\styles\ui\_main.scss

REM Copy ./src/styles/vendor
XCOPY ..\Memba.Webapp\src\styles\vendor\animate.css\*.* .\src\styles\vendor\animate.css\ /C /E /I /R /Y
ATTRIB +R .\src\styles\vendor\animate.css\*.* /S
REM XCOPY ..\Memba.Webapp\src\styles\vendor\bootstrap\*.* .\src\styles\vendor\bootstrap\ /C /E /I /R /Y
REM ATTRIB +R .\src\styles\vendor\bootstrap\*.* /S
XCOPY ..\Memba.Webapp\src\styles\vendor\highlight\*.* .\src\styles\vendor\highlight\ /C /E /I /R /Y
ATTRIB +R .\src\styles\vendor\highlight\*.* /S
REM XCOPY ..\Memba.Webapp\src\styles\vendor\fonts\*.* .\src\styles\vendor\fonts\ /C /E /I /R /Y
REM ATTRIB +R .\src\styles\vendor\fonts\*.* /S
REM XCOPY ..\Memba.Webapp\src\styles\vendor\kendo\*.* .\src\styles\vendor\kendo\ /C /E /I /R /Y
REM ATTRIB +R .\src\styles\vendor\kendo\*.* /S

REM Copy social icons
ATTRIB -R .\webapp\public\*.svg
COPY ..\Memba.Webapp\webapp\public\facebook.svg .\webapp\public\ /Y
COPY ..\Memba.Webapp\webapp\public\google.svg .\webapp\public\ /Y
COPY ..\Memba.Webapp\webapp\public\linkedin.svg .\webapp\public\ /Y
COPY ..\Memba.Webapp\webapp\public\pinterest.svg .\webapp\public\ /Y
COPY ..\Memba.Webapp\webapp\public\twitter.svg .\webapp\public\ /Y
ATTRIB +R .\webapp\public\*.svg

REM ------------------------------------------------------------
REM Tests
REM ------------------------------------------------------------

REM Copy ./test/browser files
ATTRIB -R .\test\browser\*.*
COPY ..\Memba.Webapp\test\browser\.eslintrc .\test\browser /Y
ATTRIB +R .\test\browser\.eslintrc

REM Copy ./test/node/common.es6
ATTRIB -R .\test\node\common.es6
COPY ..\Memba.Webapp\test\node\common.es6 .\test\node /Y
ATTRIB +R .\test\node\common.es6

REM Copy ./test/node/config files
ATTRIB -R .\test\node\config\*.es6
COPY ..\Memba.Webapp\test\node\config\*.es6 .\test\node\config /Y
ATTRIB +R .\test\node\config\*.es6

REM Copy ./test/node/lib files
ATTRIB -R .\test\node\lib\*.es6
COPY ..\Memba.Webapp\test\node\lib\applicationError.test.es6 .\test\node\lib /Y
ATTRIB +R .\test\node\lib\applicationError.test.es6
COPY ..\Memba.Webapp\test\node\lib\logger.test.es6 .\test\node\lib /Y
ATTRIB +R .\test\node\lib\logger.test.es6
COPY ..\Memba.Webapp\test\node\lib\utils.test.es6 .\test\node\lib /Y
ATTRIB +R .\test\node\lib\utils.test.es6

REM Copy ./test/node/middleware files
ATTRIB -R .\test\node\middleware\*.es6
COPY ..\Memba.Webapp\test\node\middleware\error.test.es6 .\test\node\middleware /Y
ATTRIB +R .\test\node\middleware\error.test.es6
COPY ..\Memba.Webapp\test\node\middleware\locals.test.es6 .\test\node\middleware /Y
ATTRIB +R .\test\node\middleware\locals.test.es6
COPY ..\Memba.Webapp\test\node\middleware\notFound.test.es6 .\test\node\middleware /Y
ATTRIB +R .\test\node\middleware\notFound.test.es6
COPY ..\Memba.Webapp\test\node\middleware\params.test.es6 .\test\node\middleware /Y
ATTRIB +R .\test\node\middleware\params.test.es6
COPY ..\Memba.Webapp\test\node\middleware\redirect.test.es6 .\test\node\middleware /Y
ATTRIB +R .\test\node\middleware\redirect.test.es6

REM Copy ./test/node/plugins files
ATTRIB -R .\test\node\plugins\*.*
COPY ..\Memba.Webapp\test\node\plugins\index.test.es6 .\test\node\plugins /Y
ATTRIB +R .\test\node\plugins\index.test.es6
COPY ..\Memba.Webapp\test\node\plugins\slack.test.es6 .\test\node\plugins /Y
ATTRIB +R .\test\node\plugins\slack.test.es6

REM Copy ./test/node/route files
ATTRIB -R .\test\node\routes\*.*
COPY ..\Memba.Webapp\test\node\routes\errorRoute.test.es6 .\test\node\routes /Y
ATTRIB +R .\test\node\routes\errorRoute.test.es6
COPY ..\Memba.Webapp\test\node\routes\loggerRoute.test.es6 .\test\node\routes /Y
ATTRIB +R .\test\node\routes\loggerRoute.test.es6
COPY ..\Memba.Webapp\test\node\routes\pingRoute.test.es6 .\test\node\routes /Y
ATTRIB +R .\test\node\routes\pingRoute.test.es6

REM Copy ./test/selenium files
ATTRIB -R .\test\selenium\_misc\*.*
COPY ..\Memba.Webapp\test\selenium\_misc\selenium.util.es6 .\test\selenium\_misc /Y
ATTRIB +R .\test\selenium\_misc\selenium.util.es6

REM Copy ./test/vendor files
XCOPY ..\Memba.Webapp\test\vendor  .\test\vendor /C /E /I /R /Y
ATTRIB +R .\test\vendor\*.* /S

REM ------------------------------------------------------------
REM Web modules (webpack)
REM ------------------------------------------------------------

REM Copy web_modules
XCOPY ..\Memba.Webapp\web_modules\*.*  .\web_modules /C /E /I /R /Y
ATTRIB +R .\web_modules\*.* /S

REM ------------------------------------------------------------
REM Web Application
REM ------------------------------------------------------------

REM Copy ./webapp/config files
ATTRIB -R .\webapp\config\*.es6
COPY ..\Memba.Webapp\webapp\config\index.es6 .\webapp\config /Y
ATTRIB +R .\webapp\config\*.es6

REM Copy ./webapp/lib files
ATTRIB -R .\webapp\lib\*.es6
COPY ..\Memba.Webapp\webapp\lib\applicationError.es6 .\webapp\lib /Y
ATTRIB +R .\webapp\lib\applicationError.es6
COPY ..\Memba.Webapp\webapp\lib\constants.es6 .\webapp\lib /Y
ATTRIB +R .\webapp\lib\constants.es6
COPY ..\Memba.Webapp\webapp\lib\httpStatus.es6 .\webapp\lib /Y
ATTRIB +R .\webapp\lib\httpStatus.es6
COPY ..\Memba.Webapp\webapp\lib\logger.es6 .\webapp\lib /Y
ATTRIB +R .\webapp\lib\logger.es6
COPY ..\Memba.Webapp\webapp\lib\utils.es6 .\webapp\lib /Y
ATTRIB +R .\webapp\lib\utils.es6

REM Copy ./webapp/middleware files
ATTRIB -R .\webapp\middleware\*.es6
COPY ..\Memba.Webapp\webapp\middleware\error.es6 .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\error.es6
COPY ..\Memba.Webapp\webapp\middleware\locals.es6 .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\locals.es6
COPY ..\Memba.Webapp\webapp\middleware\notFound.es6 .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\notFound.es6
COPY ..\Memba.Webapp\webapp\middleware\params.es6 .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\params.es6
COPY ..\Memba.Webapp\webapp\middleware\redirect.es6 .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\redirect.es6

REM Copy ./webapp/plugins files
ATTRIB -R .\webapp\plugins\*.*
COPY ..\Memba.Webapp\webapp\plugins\index.es6 .\webapp\plugins /Y
ATTRIB +R .\webapp\plugins\index.es6
COPY ..\Memba.Webapp\webapp\plugins\slack.es6 .\webapp\plugins /Y
ATTRIB +R .\webapp\plugins\slack.es6

REM Copy ./webapp/routes files
ATTRIB -R .\webapp\routes\*.*
COPY ..\Memba.Webapp\webapp\routes\errorRoute.es6 .\webapp\routes /Y
ATTRIB +R .\webapp\routes\errorRoute.es6
COPY ..\Memba.Webapp\webapp\routes\loggerRoute.es6 .\webapp\routes /Y
ATTRIB +R .\webapp\routes\loggerRoute.es6
COPY ..\Memba.Webapp\webapp\routes\pingRoute.es6 .\webapp\routes /Y
ATTRIB +R .\webapp\routes\pingRoute.es6

REM Copy ./webapp/views files
ATTRIB -R .\webapp\views\*.*
COPY ..\Memba.Webapp\webapp\views\common.ejs .\webapp\views /Y
ATTRIB +R .\webapp\views\common.ejs
COPY ..\Memba.Webapp\webapp\views\error.ejs .\webapp\views /Y
ATTRIB +R .\webapp\views\error.ejs
COPY ..\Memba.Webapp\webapp\views\footer.ejs .\webapp\views /Y
ATTRIB +R .\webapp\views\footer.ejs
COPY ..\Memba.Webapp\webapp\views\head.ejs .\webapp\views /Y
ATTRIB +R .\webapp\views\head.ejs

REM Copy ./webapp/server.js
ATTRIB -R .\webapp\server.js
COPY ..\Memba.Webapp\webapp\server.js .\webapp\ /Y
ATTRIB +R .\webapp\server.js
