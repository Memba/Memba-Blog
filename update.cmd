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

REM ./js/.eslintrc and ./js/.jshintrc
ATTRIB -R .\js\.*
COPY ..\..\Kidoju\Kidoju.Webapp\js\.* .\js\ /Y
ATTRIB +R .\js\.*

REM Copy ./js/cultures files
XCOPY ..\..\Kidoju\Kidoju.Webapp\js\cultures\*.*  .\js\cultures\ /C /E /I /R /Y
ATTRIB +R .\js\cultures\*.* /S

REM Copy ./js/messages files
XCOPY ..\..\Kidoju\Kidoju.Webapp\js\messages\*.*  .\js\messages\ /C /E /I /R /Y
ATTRIB +R .\js\messages\*.* /S

REM Copy ./js/vendor files
XCOPY ..\..\Kidoju\Kidoju.Webapp\js\vendor\bootstrap\*.* .\js\vendor\bootstrap\ /C /E /I /R /Y
ATTRIB +R .\js\vendor\bootstrap\*.* /S
XCOPY ..\..\Kidoju\Kidoju.WebApp\js\vendor\jquery .\js\vendor\jquery /C /E /I /R /Y
ATTRIB +R .\js\vendor\jquery\*.* /S
XCOPY ..\..\Kidoju\Kidoju.Webapp\js\vendor\kendo\*.* .\js\vendor\kendo\ /C /E /I /R /Y
ATTRIB +R .\js\vendor\kendo\*.* /S

REM ./js/window.*.js
ATTRIB -R .\js\window.*.js
COPY ..\..\Kidoju\Kidoju.Webapp\js\window.*.js .\js\ /Y
ATTRIB +R .\js\window.*.js

REM ./js/app.common.js
ATTRIB -R .\js\app.common.js
COPY ..\..\Kidoju\Kidoju.Webapp\js\app.common.js .\js\ /Y
ATTRIB +R .\js\app.common.js

REM ./js/app.error.js
ATTRIB -R .\js\app.error.js
COPY ..\..\Kidoju\Kidoju.Webapp\js\app.error.js .\js\ /Y
ATTRIB +R .\js\app.error.js

REM ./js/app.init.js
ATTRIB -R .\js\app.init.js
COPY ..\..\Kidoju\Kidoju.Webapp\js\app.init.js .\js\ /Y
ATTRIB +R .\js\app.init.js

REM ./js/app.locale.js
ATTRIB -R .\js\app.i18n.js
COPY ..\..\Kidoju\Kidoju.Webapp\js\app.i18n.js .\js\ /Y
ATTRIB +R .\js\app.i18n.js

REM ./js/app.logger.js
ATTRIB -R .\js\app.logger.js
COPY ..\..\Kidoju\Kidoju.Webapp\js\app.logger.js .\js\ /Y
ATTRIB +R .\js\app.logger.js

REM ./js/app.support.js
ATTRIB -R .\js\app.support.js
COPY ..\..\Kidoju\Kidoju.Webapp\js\app.support.js .\js\ /Y
ATTRIB +R .\js\app.support.js

REM ./js/app.theme.js
ATTRIB -R .\js\app.theme.js
COPY ..\..\Kidoju\Kidoju.Webapp\js\app.theme.js .\js\ /Y
ATTRIB +R .\js\app.theme.js

REM ------------------------------------------------------------
REM Styles
REM ------------------------------------------------------------

REM Copy fonts
XCOPY ..\..\Kidoju\Kidoju.WebFonts\dist\fonts\*.* .\styles\fonts\ /C /E /I /R /Y
ATTRIB +R .\styles\fonts\*.* /S

REM Copy images
COPY .\graphics\memba.home.jpg .\styles\images\jumbotron.jpg
ATTRIB +R .\styles\images\*.* /S

REM Copy social icons
ATTRIB -R .\webapp\public\*.svg
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\public\facebook.svg .\webapp\public\ /Y
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\public\google.svg .\webapp\public\ /Y
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\public\linkedin.svg .\webapp\public\ /Y
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\public\pinterest.svg .\webapp\public\ /Y
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\public\twitter.svg .\webapp\public\ /Y
ATTRIB +R .\webapp\public\*.svg

REM Copy ./js/vendor files
XCOPY ..\..\Kidoju\Kidoju.Webapp\styles\vendor\bootstrap\*.* .\styles\vendor\bootstrap\ /C /E /I /R /Y
ATTRIB +R .\styles\vendor\bootstrap\*.* /S
XCOPY ..\..\Kidoju\Kidoju.Webapp\styles\vendor\highlight\*.* .\styles\vendor\highlight\ /C /E /I /R /Y
ATTRIB +R .\styles\vendor\highlight\*.* /S
XCOPY ..\..\Kidoju\Kidoju.Webapp\styles\vendor\fonts\*.* .\styles\vendor\fonts\ /C /E /I /R /Y
ATTRIB +R .\styles\vendor\fonts\*.* /S
XCOPY ..\..\Kidoju\Kidoju.Webapp\styles\vendor\kendo\*.* .\styles\vendor\kendo\ /C /E /I /R /Y
ATTRIB +R .\styles\vendor\kendo\*.* /S

REM Copy theme files
ATTRIB -R .\styles\app.*.less
COPY ..\..\Kidoju\Kidoju.Webapp\styles\app.mixins.less .\styles\ /Y
ATTRIB +R .\styles\app.mixins.less
COPY ..\..\Kidoju\Kidoju.Webapp\styles\app.page.common.less .\styles\ /Y
ATTRIB +R .\styles\app.page.common.less
COPY ..\..\Kidoju\Kidoju.Webapp\styles\app.page.error.less .\styles\ /Y
ATTRIB +R .\styles\app.page.error.less
COPY ..\..\Kidoju\Kidoju.Webapp\styles\app.template.less .\styles\ /Y
ATTRIB +R .\styles\app.template.less
COPY ..\..\Kidoju\Kidoju.Webapp\styles\app.theme.*.less .\styles\ /Y
ATTRIB +R .\styles\app.theme.*.less
COPY ..\..\Kidoju\Kidoju.Webapp\styles\highlightjs.custom.less .\styles\ /Y
ATTRIB +R .\styles\highlightjs.custom.less

REM Consider merging with app.page.common.less
ATTRIB -R .\styles\kidoju.tools.less
COPY ..\..\Kidoju\Kidoju.Webapp\styles\kidoju.tools.less .\styles\ /Y
ATTRIB +R .\styles\kidoju.tools.less

REM ------------------------------------------------------------
REM Tests
REM ------------------------------------------------------------

REM Copy ./test/bin files
ATTRIB -R .\test\bin\*.*
XCOPY ..\..\Kidoju\Kidoju.Webapp\test\bin\*.* .\test\bin\ /C /E /I /R /Y
ATTRIB +R .\test\bin\*.*

REM Copy ./test/node/common.js files
ATTRIB -R .\test\node\*.*
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\common.js .\test\node /Y
ATTRIB +R .\test\node\common.js

REM Copy ./test/node/lib files
ATTRIB -R .\test\node\lib\*.js
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\lib\error.test.js .\test\node\lib /Y
ATTRIB +R .\test\node\lib\error.test.js
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\lib\logger.test.js .\test\node\lib /Y
ATTRIB +R .\test\node\lib\logger.test.js
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\lib\url.test.js .\test\node\lib /Y
ATTRIB +R .\test\node\lib\url.test.js

ATTRIB -R .\test\node\lib\*.es6
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\lib\utils.test.es6 .\test\node\lib /Y
ATTRIB +R .\test\node\lib\utils.test.es6

REM Copy ./test/node/middleware files
ATTRIB -R .\test\node\middleware\*.js
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\middleware\error.test.js .\test\node\middleware /Y
ATTRIB +R .\test\node\middleware\error.test.js

ATTRIB -R .\test\node\middleware\*.es6
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\middleware\notFound.test.es6 .\test\node\middleware /Y
ATTRIB +R .\test\node\middleware\notFound.test.es6
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\middleware\params.test.es6 .\test\node\middleware /Y
ATTRIB +R .\test\node\middleware\params.test.es6
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\middleware\redirect.test.es6 .\test\node\middleware /Y
ATTRIB +R .\test\node\middleware\redirect.test.es6

REM Copy ./test/node/plugins files
ATTRIB -R .\test\node\plugins\*.*
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\plugins\index.test.js .\test\node\plugins /Y
ATTRIB +R .\test\node\plugins\index.test.js
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\plugins\slack.test.js .\test\node\plugins /Y
ATTRIB +R .\test\node\plugins\slack.test.js

REM Copy ./test/node/route files
ATTRIB -R .\test\node\routes\*.*
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\routes\errorRoute.test.es6 .\test\node\routes /Y
ATTRIB +R .\test\node\routes\errorRoute.test.es6
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\routes\loggerRoute.test.es6 .\test\node\routes /Y
ATTRIB +R .\test\node\routes\loggerRoute.test.es6
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\routes\pingRoute.test.es6 .\test\node\routes /Y
ATTRIB +R .\test\node\routes\pingRoute.test.es6

REM Copy ./test/selenium files
ATTRIB -R .\test\selenium\selenium.js
COPY ..\..\Kidoju\Kidoju.Webapp\test\selenium\selenium.js .\test\selenium /Y
ATTRIB +R .\test\selenium\selenium.js

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
ATTRIB -R .\webapp\config\index.js
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\config\index.js .\webapp\config /Y
ATTRIB +R .\webapp\config\index.js

REM Copy ./webapp/lib files
ATTRIB -R .\webapp\lib\*.js
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\lib\error.js .\webapp\lib /Y
ATTRIB +R .\webapp\lib\error.js
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\lib\logger.js .\webapp\lib /Y
ATTRIB +R .\webapp\lib\logger.js
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\lib\url.js .\webapp\lib /Y
ATTRIB +R .\webapp\lib\url.js

ATTRIB -R .\webapp\lib\*.es6
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\lib\constants.es6 .\webapp\lib /Y
ATTRIB +R .\webapp\lib\constants.es6
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\lib\httpStatus.es6 .\webapp\lib /Y
ATTRIB +R .\webapp\lib\httpStatus.es6
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\lib\utils.es6 .\webapp\lib /Y
ATTRIB +R .\webapp\lib\utils.es6

REM Copy ./webapp/middleware files
ATTRIB -R .\webapp\middleware\*.js
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\middleware\error.js .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\error.js
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\middleware\locals.js .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\locals.js

ATTRIB -R .\webapp\middleware\*.es6
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\middleware\notFound.es6 .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\notFound.es6
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\middleware\params.es6 .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\params.es6
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\middleware\redirect.es6 .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\redirect.es6

REM Copy ./webapp/plugins files
ATTRIB -R .\webapp\plugins\*.*
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\plugins\index.js .\webapp\plugins /Y
ATTRIB +R .\webapp\plugins\index.js
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\plugins\slack.js .\webapp\plugins /Y
ATTRIB +R .\webapp\plugins\slack.js

REM Copy ./webapp/routes files
ATTRIB -R .\webapp\routes\*.*
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\routes\loggerRoute.js .\webapp\routes /Y
ATTRIB +R .\webapp\routes\loggerRoute.js

COPY ..\..\Kidoju\Kidoju.Webapp\webapp\routes\errorRoute.es6 .\webapp\routes /Y
ATTRIB +R .\webapp\routes\errorRoute.es6
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
