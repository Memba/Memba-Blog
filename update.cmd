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
ATTRIB -R .\LICENSE-GPLv3
COPY ..\..\Kidoju\Kidoju.Webapp\LICENSE-GPLv3 .\ /Y
ATTRIB +R .\LICENSE-GPLv3

REM setup.cmd
ATTRIB -R .\setup.cmd
COPY ..\..\Kidoju\Kidoju.Webapp\setup.cmd .\ /Y
ATTRIB +R .\setup.cmd

REM UPDATE.md
ATTRIB -R .\UPDATE.md
COPY ..\..\Kidoju\Kidoju.Webapp\UPDATE.md .\ /Y
ATTRIB +R .\UPDATE.md

REM webpack
REM ATTRIB -R .\webpack.config.js
REM COPY ..\..\Kidoju\Kidoju.Webapp\webpack.config.js .\ /Y
REM ATTRIB +R .\webpack.config.js

REM ------------------------------------------------------------
REM Javascript files
REM ------------------------------------------------------------

REM Copy ./js/cultures files
XCOPY ..\..\Kidoju\Kidoju.Webapp\js\cultures\*.*  .\js\cultures\ /C /E /I /R /Y
ATTRIB +R .\js\cultures\*.* /S

REM Copy ./js/vendor files
XCOPY ..\..\Kidoju\Kidoju.Webapp\js\vendor\bootstrap\*.* .\js\vendor\bootstrap\ /C /E /I /R /Y
ATTRIB +R .\js\vendor\bootstrap\*.* /S
XCOPY ..\..\Kidoju\Kidoju.Webapp\js\vendor\kendo\*.* .\js\vendor\kendo\ /C /E /I /R /Y
ATTRIB +R .\js\vendor\kendo\*.* /S
XCOPY ..\..\Kidoju\Kidoju.Webapp\js\vendor\logentries\*.* .\js\vendor\logentries\ /C /E /I /R /Y
ATTRIB +R .\js\vendor\logentries\*.* /S

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

REM Copy ./js/vendor files
XCOPY ..\..\Kidoju\Kidoju.Webapp\styles\vendor\bootstrap\*.* .\styles\vendor\bootstrap\ /C /E /I /R /Y
ATTRIB +R .\styles\vendor\bootstrap\*.* /S
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

REM ------------------------------------------------------------
REM Tests
REM ------------------------------------------------------------

REM Copy ./test/node/lib files
ATTRIB -R .\test\node\lib\*.*
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\lib\error.test.js .\test\node\lib /Y
ATTRIB +R .\test\node\lib\error.test.js
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\lib\logger.test.js .\test\node\lib /Y
ATTRIB +R .\test\node\lib\logger.test.js
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\lib\url.test.js .\test\node\lib /Y
ATTRIB +R .\test\node\lib\url.test.js
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\lib\utils.test.js .\test\node\lib /Y
ATTRIB +R .\test\node\lib\utils.test.js

REM Copy ./test/node/middleware files
ATTRIB -R .\test\node\middleware\*.*
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\middleware\error.test.js .\test\node\middleware /Y
ATTRIB +R .\test\node\middleware\error.test.js
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\middleware\notFound.test.js .\test\node\middleware /Y
ATTRIB +R .\test\node\middleware\notFound.test.js
COPY ..\..\Kidoju\Kidoju.Webapp\test\node\middleware\params.test.js .\test\node\middleware /Y
ATTRIB +R .\test\node\middleware\params.test.js

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
ATTRIB -R .\webapp\lib\*.*
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\lib\error.js .\webapp\lib /Y
ATTRIB +R .\webapp\lib\error.js
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\lib\httpStatus.js .\webapp\lib /Y
ATTRIB +R .\webapp\lib\httpStatus.js
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\lib\logger.js .\webapp\lib /Y
ATTRIB +R .\webapp\lib\logger.js
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\lib\url.js .\webapp\lib /Y
ATTRIB +R .\webapp\lib\url.js
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\lib\utils.js .\webapp\lib /Y
ATTRIB +R .\webapp\lib\utils.js

REM Copy ./webapp/middleware files
ATTRIB -R .\webapp\middleware\*.*
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\middleware\error.js .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\error.js
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\middleware\notFound.js .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\notFound.js
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\middleware\params.js .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\params.js

REM Copy ./webapp/views files
ATTRIB -R .\webapp\views\*.*
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\views\error.ejs .\webapp\views /Y
ATTRIB +R .\webapp\views\error.ejs
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\views\footer.ejs .\webapp\views /Y
ATTRIB +R .\webapp\views\footer.ejs

REM Copy ./webapp/server.js
ATTRIB -R .\webapp\server.js
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\server.js .\webapp\ /Y
ATTRIB +R .\webapp\server.js
