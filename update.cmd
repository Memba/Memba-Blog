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
COPY ..\..\Kidoju\Kidoju.Webapp\.* .\ /Y
ATTRIB +R .\.*

REM build.cmd and BUILD.md
ATTRIB -R .\build.*
COPY ..\..\Kidoju\Kidoju.Webapp\build.* .\ /Y
ATTRIB +R .\build.*

REM TODO Coverage

REM Dockerfile
ATTRIB -R .\Dockerfile
COPY ..\..\Kidoju\Kidoju.Webapp\Dockerfile .\ /Y
ATTRIB +R .\Dockerfile

REM gruntfile.js
ATTRIB -R .\gruntfile.js
COPY ..\..\Kidoju\Kidoju.Webapp\gruntfile.js .\ /Y
ATTRIB +R .\gruntfile.js

REM LICENSE
REM ATTRIB -R .\LICENSE-GPLv3
REM COPY ..\..\Kidoju\Kidoju.Webapp\LICENSE-GPLv3 .\ /Y
REM ATTRIB +R .\LICENSE-GPLv3

REM gruntfile.js
ATTRIB -R .\postcss.config.js
COPY ..\..\Kidoju\Kidoju.Webapp\postcss.config.js .\ /Y
ATTRIB +R .\postcss.config.js

REM setup.cmd
ATTRIB -R .\setup.cmd
COPY ..\..\Kidoju\Kidoju.Webapp\setup.cmd .\ /Y
ATTRIB +R .\setup.cmd

REM UPDATE.md
ATTRIB -R .\UPDATE.md
COPY ..\..\Kidoju\Kidoju.Webapp\UPDATE.md .\ /Y
ATTRIB +R .\UPDATE.md

REM watch.cmd
ATTRIB -R .\watch.cmd
COPY ..\..\Kidoju\Kidoju.Webapp\watch.cmd .\ /Y
ATTRIB +R .\watch.cmd

REM wdio.conf.js
ATTRIB -R .\wdio.conf.js
COPY ..\..\Kidoju\Kidoju.Webapp\wdio.conf.js .\ /Y
ATTRIB +R .\wdio.conf.js

REM webpack
REM ATTRIB -R .\webpack.config.js
REM COPY ..\..\Kidoju\Kidoju.Webapp\webpack.config.js .\ /Y
REM ATTRIB +R .\webpack.config.js

REM ------------------------------------------------------------
REM Graphics
REM ------------------------------------------------------------

REM ------------------------------------------------------------
REM Javascript files
REM ------------------------------------------------------------

REM ./src/js/.eslintrc and ./src/js/.jshintrc
ATTRIB -R .\src\js\.*
COPY ..\..\Kidoju\Kidoju.Webapp\src\js\.* .\src\js\ /Y
ATTRIB +R .\src\js\.*

REM ./src/js/app/*
ATTRIB -R .\src\js\app\*.es6
COPY ..\..\Kidoju\Kidoju.Webapp\src\js\app\app.i18n.es6 .\src\js\app /Y
ATTRIB +R .\src\js\app\app.i18n.es6
COPY ..\..\Kidoju\Kidoju.Webapp\src\js\app\app.init.es6 .\src\js\app /Y
ATTRIB +R .\src\js\app\app.init.es6
COPY ..\..\Kidoju\Kidoju.Webapp\src\js\app\app.logger.es6 .\src\js\app /Y
ATTRIB +R .\src\js\app\app.logger.es6
COPY ..\..\Kidoju\Kidoju.Webapp\src\js\app\app.notification.es6 .\src\js\app /Y
ATTRIB +R .\src\js\app\app.notification.es6
COPY ..\..\Kidoju\Kidoju.Webapp\src\js\app\app.themer.es6 .\src\js\app /Y
ATTRIB +R .\src\js\app\app.themer.es6

REM ./src/js/common/*
ATTRIB -R .\src\js\common\*.es6
COPY ..\..\Kidoju\Kidoju.Webapp\src\js\common\window.assert.es6 .\src\js\common /Y
COPY ..\..\Kidoju\Kidoju.Webapp\src\js\common\window.constants.es6 .\src\js\common /Y
COPY ..\..\Kidoju\Kidoju.Webapp\src\js\common\window.logger.es6 .\src\js\common /Y
ATTRIB +R .\src\js\common\*.es6

REM ./src/js/cultures/*
ATTRIB -R .\src\js\cultures\widgets.*.es6
COPY ..\..\Kidoju\Kidoju.Webapp\src\js\cultures\widgets.*.es6  .\src\js\cultures /Y
ATTRIB +R .\src\js\cultures\widgets.*.es6

REM ./src/js/ui/*.es6
ATTRIB -R .\src\js\ui\error.page.es6
COPY ..\..\Kidoju\Kidoju.Webapp\src\js\ui\error.page.es6 .\src\js\ui /Y
ATTRIB +R .\src\js\ui\error.page.es6

REM Copy ./src/js/vendor/*
XCOPY ..\..\Kidoju\Kidoju.Webapp\src\js\vendor\bootstrap\*.* .\src\js\vendor\bootstrap\ /C /E /I /R /Y
ATTRIB +R .\src\js\vendor\bootstrap\*.* /S
XCOPY ..\..\Kidoju\Kidoju.WebApp\src\js\vendor\jquery\*.* .\src\js\vendor\jquery /C /E /I /R /Y
ATTRIB +R .\src\js\vendor\jquery\*.* /S
XCOPY ..\..\Kidoju\Kidoju.Webapp\src\js\vendor\lazd\*.* .\src\js\vendor\lazd\ /C /E /I /R /Y
ATTRIB +R .\src\js\vendor\lazd\*.* /S
XCOPY ..\..\Kidoju\Kidoju.Webapp\src\js\vendor\kendo\*.* .\src\js\vendor\kendo\ /C /E /I /R /Y
ATTRIB +R .\src\js\vendor\kendo\*.* /S
XCOPY ..\..\Kidoju\Kidoju.Webapp\src\js\vendor\modernizr\*.* .\src\js\vendor\modernizr\ /C /E /I /R /Y
ATTRIB +R .\src\js\vendor\modernizr\*.* /S

REM ------------------------------------------------------------
REM Styles
REM ------------------------------------------------------------

REM Copy .\src\styles\dialogs
REM ATTRIB -R .\src\styles\dialogs\*.* /S
REM COPY ..\..\Kidoju\Kidoju.Webapp\src\styles\dialogs\kidoju.tools.less .\src\styles\dialogs\ /Y
REM ATTRIB +R .\src\styles\dialogs\kidoju.tools.less /S

REM Copy ./src/styles/fonts
XCOPY ..\..\Kidoju\Kidoju.WebFonts\dist\fonts\*.* .\src\styles\fonts\ /C /E /I /R /Y
ATTRIB +R .\src\styles\fonts\*.* /S

REM Copy ./src/styles/images
COPY .\graphics\memba.home.jpg .\src\styles\images\jumbotron.jpg /Y
ATTRIB +R .\src\styles\images\*.* /S

REM Copy ./src/styles/themes
XCOPY ..\..\Kidoju\Kidoju.Webapp\src\styles\themes\*.* .\src\styles\themes\ /C /E /I /R /Y
DEL .\src\styles\themes\codemirror.custom.less /F /Q
DEL .\src\styles\themes\mathquill.custom.less /F /Q
ATTRIB +R .\src\styles\themes\*.* /S

REM Copy ./src/styles/ui
ATTRIB -R .\src\styles\ui\*.less
COPY ..\..\Kidoju\Kidoju.Webapp\src\styles\ui\app.common.less .\src\styles\ui\ /Y
ATTRIB +R .\src\styles\ui\app.common.less
COPY ..\..\Kidoju\Kidoju.Webapp\src\styles\ui\app.mixins.less .\src\styles\ui\ /Y
ATTRIB +R .\src\styles\ui\app.mixins.less
COPY ..\..\Kidoju\Kidoju.Webapp\src\styles\ui\error.page.less .\src\styles\ui\ /Y
ATTRIB +R .\src\styles\ui\error.page.less

REM Copy ./src/styles/vendor
REM XCOPY ..\..\Kidoju\Kidoju.Webapp\src\styles\vendor\bootstrap\*.* .\src\styles\vendor\bootstrap\ /C /E /I /R /Y
REM ATTRIB +R .\src\styles\vendor\bootstrap\*.* /S
XCOPY ..\..\Kidoju\Kidoju.Webapp\src\styles\vendor\highlight\*.* .\src\styles\vendor\highlight\ /C /E /I /R /Y
ATTRIB +R .\src\styles\vendor\highlight\*.* /S
REM XCOPY ..\..\Kidoju\Kidoju.Webapp\src\styles\vendor\fonts\*.* .\src\styles\vendor\fonts\ /C /E /I /R /Y
REM ATTRIB +R .\src\styles\vendor\fonts\*.* /S
REM XCOPY ..\..\Kidoju\Kidoju.Webapp\src\styles\vendor\kendo\*.* .\src\styles\vendor\kendo\ /C /E /I /R /Y
REM ATTRIB +R .\src\styles\vendor\kendo\*.* /S

REM Copy social icons
ATTRIB -R .\webapp\public\*.svg
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\public\facebook.svg .\webapp\public\ /Y
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\public\google.svg .\webapp\public\ /Y
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\public\linkedin.svg .\webapp\public\ /Y
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\public\pinterest.svg .\webapp\public\ /Y
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\public\twitter.svg .\webapp\public\ /Y
ATTRIB +R .\webapp\public\*.svg

REM ------------------------------------------------------------
REM Tests
REM ------------------------------------------------------------

REM Copy ./test/browser files
ATTRIB -R .\test\browser\*.*
COPY ..\..\Kidoju\Kidoju.Webapp\test\browser\.eslintrc .\test\browser /Y
ATTRIB +R .\test\browser\.eslintrc

REM Copy ./test/node/common.es6
ATTRIB -R .\test\node\common.es6
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\common.es6 .\test\node /Y
ATTRIB +R .\test\node\common.es6

REM Copy ./test/node/config files
ATTRIB -R .\test\node\config\*.es6
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\config\*.es6 .\test\node\config /Y
ATTRIB +R .\test\node\config\*.es6

REM Copy ./test/node/lib files
ATTRIB -R .\test\node\lib\*.es6
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\lib\applicationError.test.es6 .\test\node\lib /Y
ATTRIB +R .\test\node\lib\applicationError.test.es6
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\lib\logger.test.es6 .\test\node\lib /Y
ATTRIB +R .\test\node\lib\logger.test.es6
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\lib\utils.test.es6 .\test\node\lib /Y
ATTRIB +R .\test\node\lib\utils.test.es6

REM Copy ./test/node/middleware files
ATTRIB -R .\test\node\middleware\*.es6
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\middleware\error.test.es6 .\test\node\middleware /Y
ATTRIB +R .\test\node\middleware\error.test.es6
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\middleware\locals.test.es6 .\test\node\middleware /Y
ATTRIB +R .\test\node\middleware\locals.test.es6
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\middleware\notFound.test.es6 .\test\node\middleware /Y
ATTRIB +R .\test\node\middleware\notFound.test.es6
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\middleware\params.test.es6 .\test\node\middleware /Y
ATTRIB +R .\test\node\middleware\params.test.es6
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\middleware\redirect.test.es6 .\test\node\middleware /Y
ATTRIB +R .\test\node\middleware\redirect.test.es6

REM Copy ./test/node/plugins files
ATTRIB -R .\test\node\plugins\*.*
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\plugins\index.test.es6 .\test\node\plugins /Y
ATTRIB +R .\test\node\plugins\index.test.es6
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\plugins\slack.test.es6 .\test\node\plugins /Y
ATTRIB +R .\test\node\plugins\slack.test.es6

REM Copy ./test/node/route files
ATTRIB -R .\test\node\routes\*.*
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\routes\errorRoute.test.es6 .\test\node\routes /Y
ATTRIB +R .\test\node\routes\errorRoute.test.es6
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\routes\loggerRoute.test.es6 .\test\node\routes /Y
ATTRIB +R .\test\node\routes\loggerRoute.test.es6
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\routes\pingRoute.test.es6 .\test\node\routes /Y
ATTRIB +R .\test\node\routes\pingRoute.test.es6

REM Copy ./test/selenium files
ATTRIB -R .\test\selenium\_misc\*.*
COPY ..\..\Kidoju\Kidoju.Webapp\test\selenium\_misc\selenium.util.es6 .\test\selenium\_misc /Y
ATTRIB +R .\test\selenium\_misc\selenium.util.es6

REM Copy ./test/vendor files
XCOPY ..\..\Kidoju\Kidoju.Webapp\test\vendor  .\test\vendor /C /E /I /R /Y
ATTRIB +R .\test\vendor\*.* /S

REM ------------------------------------------------------------
REM Web modules (webpack)
REM ------------------------------------------------------------

REM Copy web_modules
XCOPY ..\..\Kidoju\Kidoju.Webapp\web_modules\*.*  .\web_modules /C /E /I /R /Y
ATTRIB +R .\web_modules\*.* /S

REM ------------------------------------------------------------
REM Web Application
REM ------------------------------------------------------------

REM Copy ./webapp/config files
ATTRIB -R .\webapp\config\*.es6
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\config\index.es6 .\webapp\config /Y
ATTRIB +R .\webapp\config\*.es6

REM Copy ./webapp/lib files
ATTRIB -R .\webapp\lib\*.es6
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\lib\applicationError.es6 .\webapp\lib /Y
ATTRIB +R .\webapp\lib\applicationError.es6
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\lib\constants.es6 .\webapp\lib /Y
ATTRIB +R .\webapp\lib\constants.es6
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\lib\httpStatus.es6 .\webapp\lib /Y
ATTRIB +R .\webapp\lib\httpStatus.es6
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\lib\logger.es6 .\webapp\lib /Y
ATTRIB +R .\webapp\lib\logger.es6
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\lib\utils.es6 .\webapp\lib /Y
ATTRIB +R .\webapp\lib\utils.es6

REM Copy ./webapp/middleware files
ATTRIB -R .\webapp\middleware\*.es6
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\middleware\error.es6 .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\error.es6
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\middleware\locals.es6 .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\locals.es6
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\middleware\notFound.es6 .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\notFound.es6
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\middleware\params.es6 .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\params.es6
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\middleware\redirect.es6 .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\redirect.es6

REM Copy ./webapp/plugins files
ATTRIB -R .\webapp\plugins\*.*
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\plugins\index.es6 .\webapp\plugins /Y
ATTRIB +R .\webapp\plugins\index.es6
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\plugins\slack.es6 .\webapp\plugins /Y
ATTRIB +R .\webapp\plugins\slack.es6

REM Copy ./webapp/routes files
ATTRIB -R .\webapp\routes\*.*
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\routes\errorRoute.es6 .\webapp\routes /Y
ATTRIB +R .\webapp\routes\errorRoute.es6
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\routes\loggerRoute.es6 .\webapp\routes /Y
ATTRIB +R .\webapp\routes\loggerRoute.es6
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\routes\pingRoute.es6 .\webapp\routes /Y
ATTRIB +R .\webapp\routes\pingRoute.es6

REM Copy ./webapp/views files
ATTRIB -R .\webapp\views\*.*
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\views\common.ejs .\webapp\views /Y
ATTRIB +R .\webapp\views\common.ejs
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\views\error.ejs .\webapp\views /Y
ATTRIB +R .\webapp\views\error.ejs
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\views\footer.ejs .\webapp\views /Y
ATTRIB +R .\webapp\views\footer.ejs
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\views\head.ejs .\webapp\views /Y
ATTRIB +R .\webapp\views\head.ejs

REM Copy ./webapp/server.js
ATTRIB -R .\webapp\server.js
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\server.js .\webapp\ /Y
ATTRIB +R .\webapp\server.js
